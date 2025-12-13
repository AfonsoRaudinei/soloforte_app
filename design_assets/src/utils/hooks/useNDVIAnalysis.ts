import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useSupabaseSafeQuery } from './useSupabaseSafeQuery';
import { toast } from 'sonner@2.0.3';

/**
 * 📊 Hook de Análise NDVI Temporal
 * 
 * Gerencia análise comparativa de NDVI em diferentes períodos:
 * - Comparação temporal (15, 30, 60 dias)
 * - Cálculo de variação percentual
 * - Detecção de anomalias (quedas >10%)
 * - Geração de alertas automáticos
 * - Histórico de evolução
 * 
 * NDVI (Normalized Difference Vegetation Index):
 * - Valor entre -1 e 1
 * - < 0.2: Solo exposto, água
 * - 0.2-0.4: Vegetação esparsa
 * - 0.4-0.6: Vegetação moderada
 * - 0.6-0.8: Vegetação densa
 * - > 0.8: Vegetação muito densa
 * 
 * Usage:
 * ```tsx
 * const { 
 *   ndviData, 
 *   comparePeriods, 
 *   variation,
 *   alerts,
 *   loading 
 * } = useNDVIAnalysis({
 *   talhaoId: 'xxx',
 *   fazendaId: 'yyy'
 * });
 * ```
 */

export interface NDVIReading {
  id: string;
  talhao_id: string;
  fazenda_id: string;
  data: string;
  ndvi_medio: number;
  ndvi_min: number;
  ndvi_max: number;
  area_ha: number;
  fonte: 'sentinel2' | 'landsat8' | 'manual';
  confiabilidade: number; // 0-100
  metadata?: {
    nuvens_percent?: number;
    temperatura?: number;
    precipitacao?: number;
  };
}

export interface NDVIComparison {
  periodo: number; // dias
  atual: NDVIReading | null;
  anterior: NDVIReading | null;
  variacao_absoluta: number;
  variacao_percentual: number;
  tendencia: 'crescimento' | 'estavel' | 'queda' | 'desconhecida';
  severidade: 'critica' | 'atencao' | 'normal' | 'positiva';
}

export interface NDVIAlert {
  id: string;
  tipo: 'queda_abrupta' | 'queda_gradual' | 'baixo' | 'crescimento_anomalo';
  severidade: 'critica' | 'atencao' | 'informativa';
  titulo: string;
  descricao: string;
  recomendacao?: string;
  data_deteccao: string;
}

interface UseNDVIAnalysisOptions {
  talhaoId?: string;
  fazendaId?: string;
  autoLoad?: boolean;
}

/**
 * Hook principal de análise NDVI
 */
export function useNDVIAnalysis(options: UseNDVIAnalysisOptions = {}) {
  const { talhaoId, fazendaId, autoLoad = true } = options;

  const [ndviData, setNdviData] = useState<NDVIReading[]>([]);
  const [comparison, setComparison] = useState<Record<number, NDVIComparison>>({});
  const [alerts, setAlerts] = useState<NDVIAlert[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30); // dias

  /**
   * Carrega dados NDVI do banco ou gera mockados
   */
  const { 
    data: fetchedData, 
    loading, 
    refetch 
  } = useSupabaseSafeQuery<NDVIReading>({
    table: 'ndvi_readings',
    query: (table) => {
      let query = table
        .select('*')
        .order('data', { ascending: false })
        .limit(100);
      
      if (talhaoId) {
        query = query.eq('talhao_id', talhaoId);
      } else if (fazendaId) {
        query = query.eq('fazenda_id', fazendaId);
      }
      
      return query;
    },
    cacheKey: 'ndvi_readings',
    enableCache: true,
    silent: true,
  });

  /**
   * Atualiza dados locais quando carregados
   */
  useEffect(() => {
    if (fetchedData && fetchedData.length > 0) {
      setNdviData(fetchedData);
      console.log(`📊 ${fetchedData.length} leituras NDVI carregadas`);
    } else if (fetchedData && fetchedData.length === 0) {
      // Gerar dados mockados para demonstração
      const mockData = generateMockNDVIData(talhaoId || 'mock-talhao', 90);
      setNdviData(mockData);
      console.log('📊 Usando dados NDVI mockados para demonstração');
    }
  }, [fetchedData, talhaoId]);

  /**
   * Compara NDVI entre dois períodos
   */
  const comparePeriods = useCallback((dias: number): NDVIComparison => {
    if (ndviData.length === 0) {
      return {
        periodo: dias,
        atual: null,
        anterior: null,
        variacao_absoluta: 0,
        variacao_percentual: 0,
        tendencia: 'desconhecida',
        severidade: 'normal',
      };
    }

    const now = new Date();
    const dataAnterior = new Date(now.getTime() - dias * 24 * 60 * 60 * 1000);

    // Leitura mais recente
    const atual = ndviData[0];

    // Leitura mais próxima da data anterior
    const anterior = ndviData.reduce((closest, reading) => {
      const readingDate = new Date(reading.data);
      const diffAnterior = Math.abs(readingDate.getTime() - dataAnterior.getTime());
      const diffClosest = closest 
        ? Math.abs(new Date(closest.data).getTime() - dataAnterior.getTime())
        : Infinity;
      
      return diffAnterior < diffClosest ? reading : closest;
    }, null as NDVIReading | null);

    if (!anterior || !atual) {
      return {
        periodo: dias,
        atual,
        anterior: null,
        variacao_absoluta: 0,
        variacao_percentual: 0,
        tendencia: 'desconhecida',
        severidade: 'normal',
      };
    }

    const variacao_absoluta = atual.ndvi_medio - anterior.ndvi_medio;
    const variacao_percentual = (variacao_absoluta / anterior.ndvi_medio) * 100;

    // Determinar tendência
    let tendencia: NDVIComparison['tendencia'] = 'estavel';
    if (variacao_percentual > 5) tendencia = 'crescimento';
    else if (variacao_percentual < -5) tendencia = 'queda';

    // Determinar severidade
    let severidade: NDVIComparison['severidade'] = 'normal';
    if (variacao_percentual < -15) severidade = 'critica';
    else if (variacao_percentual < -10) severidade = 'atencao';
    else if (variacao_percentual > 10) severidade = 'positiva';

    return {
      periodo: dias,
      atual,
      anterior,
      variacao_absoluta,
      variacao_percentual,
      tendencia,
      severidade,
    };
  }, [ndviData]);

  /**
   * Atualiza comparações quando dados mudam
   */
  useEffect(() => {
    if (ndviData.length === 0) return;

    const comparisons = {
      15: comparePeriods(15),
      30: comparePeriods(30),
      60: comparePeriods(60),
    };

    setComparison(comparisons);

    // Gerar alertas
    const newAlerts = generateAlerts(comparisons, ndviData);
    setAlerts(newAlerts);

  }, [ndviData, comparePeriods]);

  /**
   * Obtém cor baseada no valor NDVI
   */
  const getNDVIColor = useCallback((ndvi: number): string => {
    if (ndvi < 0.2) return '#8B4513'; // Marrom - solo exposto
    if (ndvi < 0.4) return '#F59E0B'; // Laranja - vegetação esparsa
    if (ndvi < 0.6) return '#84CC16'; // Verde claro - vegetação moderada
    if (ndvi < 0.8) return '#22C55E'; // Verde - vegetação densa
    return '#059669'; // Verde escuro - vegetação muito densa
  }, []);

  /**
   * Obtém classificação textual do NDVI
   */
  const getNDVIClassification = useCallback((ndvi: number): string => {
    if (ndvi < 0.2) return 'Solo exposto';
    if (ndvi < 0.4) return 'Vegetação esparsa';
    if (ndvi < 0.6) return 'Vegetação moderada';
    if (ndvi < 0.8) return 'Vegetação densa';
    return 'Vegetação muito densa';
  }, []);

  /**
   * Retorna dados para gráfico temporal
   */
  const getChartData = useCallback(() => {
    return ndviData
      .slice(0, 30) // Últimas 30 leituras
      .reverse()
      .map(reading => ({
        data: new Date(reading.data).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: 'short' 
        }),
        ndvi: reading.ndvi_medio,
        min: reading.ndvi_min,
        max: reading.ndvi_max,
      }));
  }, [ndviData]);

  return {
    ndviData,
    comparison,
    alerts,
    selectedPeriod,
    setSelectedPeriod,
    loading,
    refetch,
    getNDVIColor,
    getNDVIClassification,
    getChartData,
    comparePeriods,
  };
}

/**
 * Gera alertas baseados nas comparações NDVI
 */
function generateAlerts(
  comparisons: Record<number, NDVIComparison>,
  ndviData: NDVIReading[]
): NDVIAlert[] {
  const alerts: NDVIAlert[] = [];

  // Alerta de queda crítica (30 dias)
  const comp30 = comparisons[30];
  if (comp30 && comp30.variacao_percentual < -15) {
    alerts.push({
      id: `alert-${Date.now()}-queda-critica`,
      tipo: 'queda_abrupta',
      severidade: 'critica',
      titulo: '⚠️ Queda Crítica de NDVI',
      descricao: `O NDVI caiu ${Math.abs(comp30.variacao_percentual).toFixed(1)}% nos últimos 30 dias (${comp30.anterior?.ndvi_medio.toFixed(2)} → ${comp30.atual?.ndvi_medio.toFixed(2)})`,
      recomendacao: 'Recomenda-se vistoria imediata. Possíveis causas: estresse hídrico, pragas, doenças ou deficiência nutricional.',
      data_deteccao: new Date().toISOString(),
    });
  }

  // Alerta de queda gradual (60 dias)
  const comp60 = comparisons[60];
  if (comp60 && comp60.variacao_percentual < -10 && comp60.variacao_percentual >= -15) {
    alerts.push({
      id: `alert-${Date.now()}-queda-gradual`,
      tipo: 'queda_gradual',
      severidade: 'atencao',
      titulo: '⚠️ Declínio Gradual Detectado',
      descricao: `O NDVI apresenta queda de ${Math.abs(comp60.variacao_percentual).toFixed(1)}% em 60 dias`,
      recomendacao: 'Monitorar evolução. Avaliar necessidade de intervenção nutricional ou irrigação.',
      data_deteccao: new Date().toISOString(),
    });
  }

  // Alerta de NDVI baixo absoluto
  const atual = ndviData[0];
  if (atual && atual.ndvi_medio < 0.4) {
    alerts.push({
      id: `alert-${Date.now()}-ndvi-baixo`,
      tipo: 'baixo',
      severidade: 'atencao',
      titulo: '📉 NDVI Abaixo do Esperado',
      descricao: `NDVI atual de ${atual.ndvi_medio.toFixed(2)} indica vegetação esparsa ou estressada`,
      recomendacao: 'Verificar condições do talhão. Considerar análise de solo e avaliação fitossanitária.',
      data_deteccao: new Date().toISOString(),
    });
  }

  // Alerta positivo de crescimento
  if (comp30 && comp30.variacao_percentual > 15) {
    alerts.push({
      id: `alert-${Date.now()}-crescimento`,
      tipo: 'crescimento_anomalo',
      severidade: 'informativa',
      titulo: '✅ Crescimento Excelente',
      descricao: `O NDVI aumentou ${comp30.variacao_percentual.toFixed(1)}% nos últimos 30 dias`,
      recomendacao: 'Condições favoráveis. Manter práticas de manejo atuais.',
      data_deteccao: new Date().toISOString(),
    });
  }

  return alerts;
}

/**
 * Gera dados NDVI mockados para demonstração
 */
function generateMockNDVIData(talhaoId: string, dias: number): NDVIReading[] {
  const data: NDVIReading[] = [];
  const now = new Date();

  // Simular evolução realista de NDVI durante ciclo de cultivo
  for (let i = 0; i < dias; i++) {
    const dataLeitura = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Ciclo realista: baixo → crescimento → pico → declínio
    const diasFromStart = dias - i;
    let ndvi_medio = 0.3; // Base
    
    if (diasFromStart < 20) {
      // Fase inicial: solo exposto/germinação
      ndvi_medio = 0.2 + (diasFromStart / 20) * 0.2;
    } else if (diasFromStart < 50) {
      // Fase de crescimento vegetativo
      ndvi_medio = 0.4 + ((diasFromStart - 20) / 30) * 0.3;
    } else if (diasFromStart < 70) {
      // Pico vegetativo
      ndvi_medio = 0.7 + Math.random() * 0.1;
    } else {
      // Senescência/colheita
      ndvi_medio = 0.7 - ((diasFromStart - 70) / 20) * 0.4;
    }

    // Adicionar variação natural
    ndvi_medio += (Math.random() - 0.5) * 0.05;
    ndvi_medio = Math.max(0.15, Math.min(0.85, ndvi_medio));

    data.push({
      id: `mock-${i}`,
      talhao_id: talhaoId,
      fazenda_id: 'mock-fazenda',
      data: dataLeitura.toISOString(),
      ndvi_medio: parseFloat(ndvi_medio.toFixed(3)),
      ndvi_min: parseFloat((ndvi_medio - 0.05).toFixed(3)),
      ndvi_max: parseFloat((ndvi_medio + 0.05).toFixed(3)),
      area_ha: 25.5,
      fonte: 'sentinel2',
      confiabilidade: 85 + Math.random() * 15,
      metadata: {
        nuvens_percent: Math.random() * 20,
        temperatura: 20 + Math.random() * 15,
        precipitacao: Math.random() * 50,
      },
    });
  }

  return data;
}
