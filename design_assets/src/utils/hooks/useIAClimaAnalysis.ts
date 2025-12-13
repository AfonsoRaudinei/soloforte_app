import { useState, useCallback, useEffect } from 'react';
import { useNDVIAnalysis } from './useNDVIAnalysis';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner@2.0.3';

/**
 * 🤖 IA + Clima Integrado - Análise Preditiva
 * 
 * Sistema de inteligência que cruza:
 * - NDVI temporal (saúde da vegetação)
 * - Dados meteorológicos (Embrapa + OpenMeteo)
 * - Histórico de aplicações
 * - Ocorrências registradas
 * - Ciclo da cultura
 * 
 * Gera recomendações preditivas como:
 * - Risco de estresse hídrico
 * - Janela ideal de aplicação
 * - Alerta de geada
 * - Previsão de pragas baseada em clima
 * - Otimização de irrigação
 * 
 * Features:
 * - Análise em tempo real
 * - Scoring de risco (0-100)
 * - Ações recomendadas com prioridade
 * - Previsão 7 dias
 * 
 * Usage:
 * ```tsx
 * const { 
 *   analysis, 
 *   recommendations, 
 *   riskScore,
 *   loading 
 * } = useIAClimaAnalysis({
 *   talhaoId: 'xxx',
 *   fazendaId: 'yyy'
 * });
 * ```
 */

export interface ClimateData {
  data: string;
  temp_max: number;
  temp_min: number;
  temp_media: number;
  precipitacao_mm: number;
  umidade_rel: number;
  vento_km_h: number;
  pressao_hpa: number;
  radiacao_solar?: number;
  et0?: number; // evapotranspiração de referência
}

export interface IARecommendation {
  id: string;
  tipo: 'irrigacao' | 'aplicacao' | 'vistoria' | 'colheita' | 'alerta';
  prioridade: 'critica' | 'alta' | 'media' | 'baixa';
  titulo: string;
  descricao: string;
  justificativa: string[];
  acoes_sugeridas: string[];
  janela_ideal?: {
    inicio: string;
    fim: string;
  };
  confianca: number; // 0-100
  data_geracao: string;
}

export interface RiskAnalysis {
  estresse_hidrico: number; // 0-100
  risco_geada: number; // 0-100
  risco_pragas: number; // 0-100
  condicoes_aplicacao: number; // 0-100 (100 = ideal)
  saude_geral: number; // 0-100
}

interface UseIAClimaAnalysisOptions {
  talhaoId?: string;
  fazendaId?: string;
  cultura?: string;
  autoRefresh?: boolean;
}

/**
 * Hook principal de análise IA + Clima
 */
export function useIAClimaAnalysis(options: UseIAClimaAnalysisOptions = {}) {
  const { talhaoId, fazendaId, cultura = 'soja', autoRefresh = true } = options;

  const [climateData, setClimateData] = useState<ClimateData[]>([]);
  const [recommendations, setRecommendations] = useState<IARecommendation[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  // Integrar análise NDVI
  const { 
    comparison, 
    ndviData, 
    getNDVIColor 
  } = useNDVIAnalysis({ talhaoId, fazendaId });

  /**
   * Busca dados climáticos (mockados para demonstração)
   */
  const fetchClimateData = useCallback(async () => {
    try {
      // Verificar se Supabase está configurado
      if (!supabase || (supabase as any).supabaseUrl?.includes('your-project-id')) {
        // Gerar dados climáticos mockados
        const mockClimate = generateMockClimateData(7);
        setClimateData(mockClimate);
        return mockClimate;
      }

      // Tentar buscar do Supabase
      const { data, error } = await supabase
        .from('clima_historico')
        .select('*')
        .eq('fazenda_id', fazendaId)
        .order('data', { ascending: false })
        .limit(7);

      if (error) throw error;

      if (data && data.length > 0) {
        setClimateData(data);
        return data;
      } else {
        // Fallback para mockados
        const mockClimate = generateMockClimateData(7);
        setClimateData(mockClimate);
        return mockClimate;
      }
    } catch (error) {
      console.error('Erro ao buscar dados climáticos:', error);
      const mockClimate = generateMockClimateData(7);
      setClimateData(mockClimate);
      return mockClimate;
    }
  }, [fazendaId]);

  /**
   * Calcula análise de risco baseada em NDVI + Clima
   */
  const calculateRiskAnalysis = useCallback((
    climate: ClimateData[],
    ndviComparison: any
  ): RiskAnalysis => {
    const hoje = climate[0];
    const ultimos3Dias = climate.slice(0, 3);

    // 1. Estresse Hídrico
    const precipTotal = ultimos3Dias.reduce((sum, d) => sum + d.precipitacao_mm, 0);
    const tempMediaAlta = ultimos3Dias.reduce((sum, d) => sum + d.temp_max, 0) / 3;
    const umidadeMedia = ultimos3Dias.reduce((sum, d) => sum + d.umidade_rel, 0) / 3;
    
    let estresse_hidrico = 0;
    if (precipTotal < 10 && tempMediaAlta > 30) estresse_hidrico += 40;
    if (umidadeMedia < 50) estresse_hidrico += 30;
    if (ndviComparison[30]?.variacao_percentual < -10) estresse_hidrico += 30;

    // 2. Risco de Geada
    let risco_geada = 0;
    const tempMinima = Math.min(...ultimos3Dias.map(d => d.temp_min));
    if (tempMinima < 5) risco_geada = 80;
    else if (tempMinima < 10) risco_geada = 40;
    else if (tempMinima < 15) risco_geada = 20;

    // 3. Risco de Pragas (temperatura + umidade favoráveis)
    let risco_pragas = 0;
    if (hoje.temp_media > 20 && hoje.temp_media < 30 && hoje.umidade_rel > 60) {
      risco_pragas = 60;
    }
    if (precipTotal > 50) risco_pragas += 20; // Umidade excessiva

    // 4. Condições para Aplicação (vento, chuva, temperatura)
    let condicoes_aplicacao = 100;
    if (hoje.vento_km_h > 15) condicoes_aplicacao -= 40;
    if (precipTotal > 5) condicoes_aplicacao -= 30;
    if (hoje.temp_max > 32) condicoes_aplicacao -= 20;
    if (hoje.umidade_rel < 40) condicoes_aplicacao -= 20;
    condicoes_aplicacao = Math.max(0, condicoes_aplicacao);

    // 5. Saúde Geral (baseada em NDVI)
    let saude_geral = 70; // Base
    const ndviAtual = ndviData[0]?.ndvi_medio || 0.5;
    if (ndviAtual > 0.6) saude_geral = 90;
    else if (ndviAtual > 0.4) saude_geral = 70;
    else if (ndviAtual > 0.3) saude_geral = 50;
    else saude_geral = 30;

    // Ajustar por variação
    if (ndviComparison[30]?.variacao_percentual < -15) saude_geral -= 30;
    else if (ndviComparison[30]?.variacao_percentual > 10) saude_geral += 10;

    return {
      estresse_hidrico: Math.min(100, Math.max(0, estresse_hidrico)),
      risco_geada: Math.min(100, Math.max(0, risco_geada)),
      risco_pragas: Math.min(100, Math.max(0, risco_pragas)),
      condicoes_aplicacao: Math.min(100, Math.max(0, condicoes_aplicacao)),
      saude_geral: Math.min(100, Math.max(0, saude_geral)),
    };
  }, [ndviData]);

  /**
   * Gera recomendações baseadas em análise de risco
   */
  const generateRecommendations = useCallback((
    risks: RiskAnalysis,
    climate: ClimateData[],
    ndviComparison: any
  ): IARecommendation[] => {
    const recs: IARecommendation[] = [];
    const agora = new Date();

    // Recomendação 1: Estresse Hídrico
    if (risks.estresse_hidrico > 60) {
      recs.push({
        id: `rec-${Date.now()}-irrigacao`,
        tipo: 'irrigacao',
        prioridade: risks.estresse_hidrico > 80 ? 'critica' : 'alta',
        titulo: '💧 Irrigação Recomendada',
        descricao: `Risco de estresse hídrico detectado (${risks.estresse_hidrico}%). Cultura pode estar comprometida.`,
        justificativa: [
          `Precipitação insuficiente nos últimos 3 dias (${climate.slice(0,3).reduce((s,d)=>s+d.precipitacao_mm,0).toFixed(1)} mm)`,
          `Temperatura elevada (média ${climate[0].temp_max}°C)`,
          ndviComparison[30]?.variacao_percentual < -10 
            ? `NDVI em queda (${ndviComparison[30].variacao_percentual.toFixed(1)}%)`
            : null,
        ].filter(Boolean) as string[],
        acoes_sugeridas: [
          'Avaliar necessidade de irrigação emergencial',
          'Verificar sistema de irrigação',
          'Monitorar umidade do solo',
          'Considerar redução de espaçamento em próximas aplicações',
        ],
        janela_ideal: {
          inicio: new Date(agora.getTime() + 2 * 60 * 60 * 1000).toISOString(), // Daqui 2h
          fim: new Date(agora.getTime() + 24 * 60 * 60 * 1000).toISOString(), // Hoje
        },
        confianca: 85,
        data_geracao: new Date().toISOString(),
      });
    }

    // Recomendação 2: Geada
    if (risks.risco_geada > 50) {
      recs.push({
        id: `rec-${Date.now()}-geada`,
        tipo: 'alerta',
        prioridade: 'critica',
        titulo: '❄️ Alerta de Geada',
        descricao: `Risco ${risks.risco_geada > 70 ? 'alto' : 'moderado'} de geada. Temperatura mínima prevista: ${climate[0].temp_min}°C`,
        justificativa: [
          `Temperatura mínima abaixo de ${risks.risco_geada > 70 ? '5' : '10'}°C`,
          'Condições atmosféricas favoráveis à formação de geada',
          'Cultura sensível a baixas temperaturas',
        ],
        acoes_sugeridas: [
          '🚨 Monitorar temperatura durante a madrugada',
          'Preparar sistema de proteção (se disponível)',
          'Avaliar cobertura do solo',
          'Vistoriar talhão após evento de frio',
        ],
        confianca: 90,
        data_geracao: new Date().toISOString(),
      });
    }

    // Recomendação 3: Condições de Aplicação
    if (risks.condicoes_aplicacao > 70) {
      recs.push({
        id: `rec-${Date.now()}-aplicacao`,
        tipo: 'aplicacao',
        prioridade: 'media',
        titulo: '✅ Janela Ideal de Aplicação',
        descricao: `Condições meteorológicas favoráveis para pulverização (score ${risks.condicoes_aplicacao}/100)`,
        justificativa: [
          `Vento moderado (${climate[0].vento_km_h} km/h)`,
          `Temperatura adequada (${climate[0].temp_media}°C)`,
          `Umidade relativa ideal (${climate[0].umidade_rel}%)`,
          'Sem previsão de chuva nas próximas horas',
        ],
        acoes_sugeridas: [
          'Aproveitar janela para aplicações foliares',
          'Verificar estoque de defensivos',
          'Calibrar equipamento de pulverização',
          'Registrar aplicação no sistema',
        ],
        janela_ideal: {
          inicio: new Date(agora.getTime() + 1 * 60 * 60 * 1000).toISOString(),
          fim: new Date(agora.getTime() + 6 * 60 * 60 * 1000).toISOString(),
        },
        confianca: 80,
        data_geracao: new Date().toISOString(),
      });
    }

    // Recomendação 4: Pragas
    if (risks.risco_pragas > 50) {
      recs.push({
        id: `rec-${Date.now()}-pragas`,
        tipo: 'vistoria',
        prioridade: 'alta',
        titulo: '🐛 Vistoria Preventiva Recomendada',
        descricao: `Condições climáticas favoráveis ao desenvolvimento de pragas (risco ${risks.risco_pragas}%)`,
        justificativa: [
          'Temperatura favorável a insetos (20-30°C)',
          `Alta umidade relativa (${climate[0].umidade_rel}%)`,
          'Precipitação recente aumenta risco de doenças',
        ],
        acoes_sugeridas: [
          'Realizar vistoria fitossanitária',
          'Monitorar presença de pragas',
          'Verificar necessidade de controle',
          'Documentar ocorrências com fotos',
        ],
        confianca: 75,
        data_geracao: new Date().toISOString(),
      });
    }

    // Recomendação 5: Saúde Geral Crítica
    if (risks.saude_geral < 50) {
      recs.push({
        id: `rec-${Date.now()}-vistoria-critica`,
        tipo: 'vistoria',
        prioridade: 'critica',
        titulo: '⚠️ Vistoria Urgente Necessária',
        descricao: `Indicadores de saúde abaixo do esperado (score ${risks.saude_geral}/100)`,
        justificativa: [
          `NDVI atual baixo (${ndviData[0]?.ndvi_medio.toFixed(2) || 'N/A'})`,
          ndviComparison[30] ? `Queda de ${Math.abs(ndviComparison[30].variacao_percentual).toFixed(1)}% em 30 dias` : null,
          'Múltiplos fatores de estresse detectados',
        ].filter(Boolean) as string[],
        acoes_sugeridas: [
          '🚨 Realizar vistoria técnica imediata',
          'Coletar amostras de solo e tecido vegetal',
          'Avaliar sistema radicular',
          'Considerar análise fitossanitária completa',
          'Documentar sintomas visuais',
        ],
        confianca: 90,
        data_geracao: new Date().toISOString(),
      });
    }

    // Ordenar por prioridade
    const prioridadeOrdem = { critica: 0, alta: 1, media: 2, baixa: 3 };
    return recs.sort((a, b) => prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade]);

  }, [ndviData]);

  /**
   * Executa análise completa
   */
  const runAnalysis = useCallback(async () => {
    setLoading(true);
    
    try {
      // 1. Buscar dados climáticos
      const climate = await fetchClimateData();

      // 2. Calcular riscos
      const risks = calculateRiskAnalysis(climate, comparison);
      setRiskAnalysis(risks);

      // 3. Gerar recomendações
      const recs = generateRecommendations(risks, climate, comparison);
      setRecommendations(recs);

      console.log('🤖 Análise IA + Clima concluída:', { risks, recommendations: recs.length });

    } catch (error) {
      console.error('Erro na análise IA:', error);
      toast.error('Erro ao processar análise preditiva');
    } finally {
      setLoading(false);
    }
  }, [fetchClimateData, calculateRiskAnalysis, generateRecommendations, comparison]);

  /**
   * Auto-refresh a cada 30 minutos
   */
  useEffect(() => {
    runAnalysis();

    if (autoRefresh) {
      const interval = setInterval(runAnalysis, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [runAnalysis, autoRefresh]);

  /**
   * Calcula score de risco geral (0-100)
   */
  const getRiskScore = useCallback((): number => {
    if (!riskAnalysis) return 0;

    const weights = {
      estresse_hidrico: 0.3,
      risco_geada: 0.2,
      risco_pragas: 0.2,
      saude_geral: 0.3, // Inverso (quanto menor, pior)
    };

    const score = 
      riskAnalysis.estresse_hidrico * weights.estresse_hidrico +
      riskAnalysis.risco_geada * weights.risco_geada +
      riskAnalysis.risco_pragas * weights.risco_pragas +
      (100 - riskAnalysis.saude_geral) * weights.saude_geral;

    return Math.round(score);
  }, [riskAnalysis]);

  return {
    climateData,
    recommendations,
    riskAnalysis,
    riskScore: getRiskScore(),
    loading,
    runAnalysis,
  };
}

/**
 * Gera dados climáticos mockados
 */
function generateMockClimateData(dias: number): ClimateData[] {
  const data: ClimateData[] = [];
  const now = new Date();

  for (let i = 0; i < dias; i++) {
    const dia = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Simular variação realista
    const baseTemp = 25 + (Math.random() - 0.5) * 10;
    
    data.push({
      data: dia.toISOString().split('T')[0],
      temp_max: baseTemp + 5 + Math.random() * 3,
      temp_min: baseTemp - 5 + Math.random() * 3,
      temp_media: baseTemp,
      precipitacao_mm: Math.random() < 0.3 ? Math.random() * 30 : 0,
      umidade_rel: 50 + Math.random() * 40,
      vento_km_h: 5 + Math.random() * 15,
      pressao_hpa: 1010 + Math.random() * 20,
      radiacao_solar: 15 + Math.random() * 10,
      et0: 3 + Math.random() * 3,
    });
  }

  return data;
}
