import { useState, useEffect } from 'react';
import { fetchWithAuth, createClient } from '../supabase/client';
import { logger } from '../logger';
import { STORAGE_KEYS } from '../constants';

export interface KPIData {
  totalAreas: number;
  totalHectares: number;
  ocorrenciasAtivas: number;
  ocorrenciasResolvidas: number;
  taxaResolucao: number;
  ndviMedio: number;
  produtoresAtivos: number;
  eventosProximos: number;
  checkInsHoje: number;
  alertasAtivos: number;
}

export interface TimeSeriesData {
  date: string;
  areas: number;
  ocorrencias: number;
  checkIns: number;
  ndvi: number;
}

export interface OccurrenceDistribution {
  tipo: string;
  count: number;
  severidadeBaixa: number;
  severidadeMedia: number;
  severidadeAlta: number;
}

export interface HealthStatus {
  excelente: number; // NDVI > 0.6
  boa: number;       // NDVI 0.4-0.6
  moderada: number;  // NDVI 0.2-0.4
  ruim: number;      // NDVI < 0.2
}

export interface AnalyticsData {
  kpis: KPIData;
  timeSeries: TimeSeriesData[];
  occurrenceDistribution: OccurrenceDistribution[];
  healthStatus: HealthStatus;
  topProducers: Array<{
    nome: string;
    areas: number;
    hectares: number;
    ndviMedio: number;
  }>;
  recentActivity: Array<{
    type: string;
    message: string;
    timestamp: string;
  }>;
}

// Dados mock para modo DEMO
const getMockAnalyticsData = (period: number): AnalyticsData => {
  // Gerar dados de série temporal baseado no período
  const timeSeries: TimeSeriesData[] = [];
  const today = new Date();
  
  for (let i = period - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    timeSeries.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      areas: Math.floor(Math.random() * 5) + 12,
      ocorrencias: Math.floor(Math.random() * 8) + 3,
      checkIns: Math.floor(Math.random() * 15) + 5,
      ndvi: 0.5 + (Math.random() * 0.3),
    });
  }

  return {
    kpis: {
      totalAreas: 15,
      totalHectares: 342.5,
      ocorrenciasAtivas: 8,
      ocorrenciasResolvidas: 42,
      taxaResolucao: 84,
      ndviMedio: 0.68,
      produtoresAtivos: 12,
      eventosProximos: 5,
      checkInsHoje: 7,
      alertasAtivos: 3,
    },
    timeSeries,
    occurrenceDistribution: [
      { tipo: 'Pragas', count: 12, severidadeBaixa: 5, severidadeMedia: 4, severidadeAlta: 3 },
      { tipo: 'Doenças', count: 8, severidadeBaixa: 3, severidadeMedia: 3, severidadeAlta: 2 },
      { tipo: 'Nutrição', count: 15, severidadeBaixa: 8, severidadeMedia: 5, severidadeAlta: 2 },
      { tipo: 'Irrigação', count: 10, severidadeBaixa: 6, severidadeMedia: 3, severidadeAlta: 1 },
      { tipo: 'Clima', count: 5, severidadeBaixa: 2, severidadeMedia: 2, severidadeAlta: 1 },
    ],
    healthStatus: {
      excelente: 40,
      boa: 35,
      moderada: 20,
      ruim: 5,
    },
    topProducers: [
      { nome: 'João Silva', areas: 5, hectares: 85.3, ndviMedio: 0.75 },
      { nome: 'Maria Santos', areas: 4, hectares: 72.1, ndviMedio: 0.72 },
      { nome: 'Pedro Costa', areas: 3, hectares: 58.4, ndviMedio: 0.68 },
      { nome: 'Ana Oliveira', areas: 3, hectares: 45.2, ndviMedio: 0.65 },
      { nome: 'Carlos Mendes', areas: 2, hectares: 38.7, ndviMedio: 0.62 },
    ],
    recentActivity: [
      { type: 'check-in', message: 'Check-in realizado na Área A-12', timestamp: 'Há 15 min' },
      { type: 'ocorrencia', message: 'Nova ocorrência: Praga detectada na Área B-5', timestamp: 'Há 1 hora' },
      { type: 'ndvi', message: 'Análise NDVI concluída para 3 áreas', timestamp: 'Há 2 horas' },
      { type: 'relatorio', message: 'Relatório mensal gerado', timestamp: 'Há 4 horas' },
      { type: 'alerta', message: 'Alerta: Baixa irrigação na Área C-8', timestamp: 'Há 6 horas' },
    ],
  };
};

export function useAnalytics(period: number = 30) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  // Verificar modo demo
  useEffect(() => {
    const checkDemo = () => {
      const demoMode = localStorage.getItem(STORAGE_KEYS.DEMO_MODE) === 'true';
      setIsDemo(demoMode);
    };

    checkDemo();

    // Listener para mudanças no modo demo
    const handleDemoChange = () => checkDemo();
    window.addEventListener('demo-mode-change', handleDemoChange);
    window.addEventListener('storage', handleDemoChange);

    return () => {
      window.removeEventListener('demo-mode-change', handleDemoChange);
      window.removeEventListener('storage', handleDemoChange);
    };
  }, []);

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    // Escutar mudanças de autenticação
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAnalytics = async () => {
    // Se está em modo demo OU não está autenticado, usar dados mock
    // Dashboard Executivo sempre funciona com dados demo quando não há autenticação
    if (isDemo || !isAuthenticated) {
      setLoading(true);
      // Simular delay de rede
      setTimeout(() => {
        setData(getMockAnalyticsData(period));
        setLoading(false);
        logger.log('📊 Analytics DEMO carregados com sucesso');
      }, 500);
      return;
    }

    // Só chegar aqui se estiver autenticado E não estiver em modo demo
    try {
      setLoading(true);
      setError(null);

      const result = await fetchWithAuth(
        `/analytics?period=${period}`,
        {
          method: 'GET',
        }
      );
      
      if (result.success) {
        setData(result.data);
        logger.log('Analytics carregados com sucesso');
      } else {
        throw new Error(result.error || 'Erro desconhecido');
      }
    } catch (err: any) {
      logger.error('Erro ao buscar analytics:', err);
      setError(err.message);
      // Fallback para dados demo em caso de erro
      setData(getMockAnalyticsData(period));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Sempre carrega analytics (usa dados demo quando necessário)
    fetchAnalytics();
  }, [period, isAuthenticated, isDemo]);

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}