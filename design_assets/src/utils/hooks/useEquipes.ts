import { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth, createClient } from '../supabase/client';
import { STORAGE_KEYS } from '../constants';
import { logger } from '../logger';

export interface MembroEquipe {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cargo: string;
  foto?: string;
  status: 'ativo' | 'inativo';
  especialidades: string[];
  criadoEm: string;
}

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  membroId: string;
  membroNome?: string;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  tipo: 'vistoria' | 'manutencao' | 'analise' | 'relatorio' | 'outro';
  dataInicio: string;
  dataVencimento: string;
  dataConclusao?: string;
  localizacao?: {
    latitude: number;
    longitude: number;
    area?: string;
  };
  anexos?: string[];
  observacoes?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface EstatisticasEquipe {
  totalMembros: number;
  membrosAtivos: number;
  totalTarefas: number;
  tarefasPendentes: number;
  tarefasAndamento: number;
  tarefasConcluidas: number;
  tarefasAtrasadas: number;
  taxaConclusao: number;
  tempoMedioConclusao: number; // em horas
  produtividadeMedia: number;
  tarefasUrgentes: number;
  tarefasAlta: number;
  tarefasMedia: number;
  tarefasBaixa: number;
  produtividadePorMembro: {
    membroId: string;
    membroNome: string;
    tarefasConcluidas: number;
    tarefasEmAndamento: number;
    tarefasPendentes: number;
    tempoMedio: number;
  }[];
}

// Dados mock para modo DEMO
const getMockMembros = (): MembroEquipe[] => [
  {
    id: 'demo-1',
    nome: 'João Silva',
    email: 'joao.silva@demo.com',
    telefone: '(11) 98765-4321',
    cargo: 'Técnico Agrícola Sênior',
    especialidades: ['NDVI', 'Irrigação', 'Solos'],
    status: 'ativo',
    criadoEm: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-2',
    nome: 'Maria Santos',
    email: 'maria.santos@demo.com',
    telefone: '(11) 98765-1234',
    cargo: 'Engenheira Agrônoma',
    especialidades: ['Pragas', 'Doenças', 'Análise NDVI'],
    status: 'ativo',
    criadoEm: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-3',
    nome: 'Pedro Costa',
    email: 'pedro.costa@demo.com',
    telefone: '(11) 98765-5678',
    cargo: 'Técnico de Campo',
    especialidades: ['Vistoria', 'Manutenção', 'Check-in'],
    status: 'ativo',
    criadoEm: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-4',
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@demo.com',
    telefone: '(11) 98765-9012',
    cargo: 'Consultora Técnica',
    especialidades: ['Nutrição', 'Fertilização', 'Relatórios'],
    status: 'ativo',
    criadoEm: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const getMockTarefas = (): Tarefa[] => {
  const hoje = new Date();
  return [
    {
      id: 'tarefa-1',
      titulo: 'Vistoria na Área A-12',
      descricao: 'Realizar vistoria completa verificando irrigação e presença de pragas',
      membroId: 'demo-1',
      membroNome: 'João Silva',
      status: 'em_andamento',
      prioridade: 'alta',
      tipo: 'vistoria',
      dataInicio: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      dataVencimento: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      criadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      atualizadoEm: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'tarefa-2',
      titulo: 'Análise NDVI - Áreas B',
      descricao: 'Processar imagens de satélite e gerar relatório de saúde das culturas',
      membroId: 'demo-2',
      membroNome: 'Maria Santos',
      status: 'em_andamento',
      prioridade: 'urgente',
      tipo: 'analise',
      dataInicio: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      dataVencimento: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      criadoEm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      atualizadoEm: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: 'tarefa-3',
      titulo: 'Manutenção Sistema de Irrigação',
      descricao: 'Verificar e reparar sistema de irrigação da Área C-8',
      membroId: 'demo-3',
      membroNome: 'Pedro Costa',
      status: 'pendente',
      prioridade: 'alta',
      tipo: 'manutencao',
      dataInicio: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      dataVencimento: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      criadoEm: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      atualizadoEm: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'tarefa-4',
      titulo: 'Relatório Mensal de Produtividade',
      descricao: 'Compilar dados e gerar relatório mensal para apresentação aos produtores',
      membroId: 'demo-4',
      membroNome: 'Ana Oliveira',
      status: 'pendente',
      prioridade: 'media',
      tipo: 'relatorio',
      dataInicio: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      criadoEm: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      atualizadoEm: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'tarefa-5',
      titulo: 'Aplicação de Fertilizantes - Área D',
      descricao: 'Supervisionar aplicação de fertilizantes NPK conforme análise de solo',
      membroId: 'demo-1',
      membroNome: 'João Silva',
      status: 'concluida',
      prioridade: 'alta',
      tipo: 'outro',
      dataInicio: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      dataVencimento: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      dataConclusao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      criadoEm: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      atualizadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'tarefa-6',
      titulo: 'Inspeção de Pragas - Área E',
      descricao: 'Verificar presença de lagarta-do-cartucho e recomendar tratamento',
      membroId: 'demo-2',
      membroNome: 'Maria Santos',
      status: 'concluida',
      prioridade: 'urgente',
      tipo: 'vistoria',
      dataInicio: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      dataVencimento: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      dataConclusao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      criadoEm: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      atualizadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

const getMockEstatisticas = (tarefas: Tarefa[]): any => {
  const totalTarefas = tarefas.length;
  const tarefasPendentes = tarefas.filter(t => t.status === 'pendente').length;
  const tarefasAndamento = tarefas.filter(t => t.status === 'em_andamento').length;
  const tarefasConcluidas = tarefas.filter(t => t.status === 'concluida').length;
  
  const agora = new Date();
  const tarefasAtrasadas = tarefas.filter(t => 
    (t.status === 'pendente' || t.status === 'em_andamento') && 
    new Date(t.dataVencimento) < agora
  ).length;

  return {
    totalMembros: 4,
    membrosAtivos: 4,
    totalTarefas,
    tarefasPendentes,
    tarefasAndamento,
    tarefasConcluidas,
    tarefasAtrasadas,
    taxaConclusao: Math.round((tarefasConcluidas / totalTarefas) * 100),
    tempoMedioConclusao: 24,
    produtividadeMedia: 85,
    tarefasUrgentes: tarefas.filter(t => t.prioridade === 'urgente').length,
    tarefasAlta: tarefas.filter(t => t.prioridade === 'alta').length,
    tarefasMedia: tarefas.filter(t => t.prioridade === 'media').length,
    tarefasBaixa: tarefas.filter(t => t.prioridade === 'baixa').length,
    produtividadePorMembro: [],
  };
};

export function useEquipes() {
  const [membros, setMembros] = useState<MembroEquipe[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [estatisticas, setEstatisticas] = useState<any>(null);
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

  // Carregar membros
  const carregarMembros = useCallback(async () => {
    if (isDemo) {
      setMembros(getMockMembros());
      return;
    }
    
    if (!isAuthenticated) return;
    
    try {
      const data = await fetchWithAuth('/equipes/membros');
      
      if (data.success) {
        setMembros(data.membros || []);
      }
    } catch (err) {
      if (isAuthenticated) {
        console.error('Erro ao carregar membros:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    }
  }, [isAuthenticated, isDemo]);

  // Carregar tarefas
  const carregarTarefas = useCallback(async (filtros?: {
    membroId?: string;
    status?: string;
    prioridade?: string;
    tipo?: string;
    dataInicio?: string;
    dataFim?: string;
  }) => {
    if (isDemo) {
      let mockTarefas = getMockTarefas();
      
      // Aplicar filtros se fornecidos
      if (filtros) {
        if (filtros.membroId) {
          mockTarefas = mockTarefas.filter(t => t.membroId === filtros.membroId);
        }
        if (filtros.status) {
          mockTarefas = mockTarefas.filter(t => t.status === filtros.status);
        }
        if (filtros.prioridade) {
          mockTarefas = mockTarefas.filter(t => t.prioridade === filtros.prioridade);
        }
        if (filtros.tipo) {
          mockTarefas = mockTarefas.filter(t => t.tipo === filtros.tipo);
        }
      }
      
      setTarefas(mockTarefas);
      return;
    }
    
    if (!isAuthenticated) return;
    
    try {
      const params = new URLSearchParams();
      if (filtros) {
        Object.entries(filtros).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
      }

      const data = await fetchWithAuth(`/equipes/tarefas?${params}`);
      
      if (data.success) {
        setTarefas(data.tarefas || []);
      }
    } catch (err) {
      if (isAuthenticated) {
        console.error('Erro ao carregar tarefas:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    }
  }, [isAuthenticated, isDemo]);

  // Carregar estatísticas
  const carregarEstatisticas = useCallback(async (periodo?: string) => {
    if (isDemo) {
      const mockTarefas = getMockTarefas();
      setEstatisticas(getMockEstatisticas(mockTarefas));
      return;
    }
    
    if (!isAuthenticated) return;
    
    try {
      const params = periodo ? `?periodo=${periodo}` : '';
      const data = await fetchWithAuth(`/equipes/estatisticas${params}`);
      
      if (data.success) {
        setEstatisticas(data);
      }
    } catch (err) {
      if (isAuthenticated) {
        console.error('Erro ao carregar estatísticas:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    }
  }, [isAuthenticated, isDemo]);

  // Adicionar membro
  const adicionarMembro = useCallback(async (membro: Omit<MembroEquipe, 'id' | 'criadoEm'>) => {
    if (isDemo) {
      const novoMembro: MembroEquipe = {
        ...membro,
        id: `demo-${Date.now()}`,
        criadoEm: new Date().toISOString(),
      };
      setMembros(prev => [...prev, novoMembro]);
      logger.log('👥 Membro DEMO adicionado:', novoMembro.nome);
      return novoMembro;
    }

    try {
      const data = await fetchWithAuth('/equipes/membros', {
        method: 'POST',
        body: membro,
      });

      if (data.success) {
        await carregarMembros();
        return data.membro;
      } else {
        throw new Error(data.error || 'Erro ao adicionar membro');
      }
    } catch (err) {
      console.error('Erro ao adicionar membro:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    }
  }, [carregarMembros, isDemo]);

  // Atualizar membro
  const atualizarMembro = useCallback(async (id: string, dados: Partial<MembroEquipe>) => {
    if (isDemo) {
      setMembros(prev => prev.map(m => m.id === id ? { ...m, ...dados } : m));
      logger.log('👥 Membro DEMO atualizado:', id);
      return;
    }

    try {
      const data = await fetchWithAuth(`/equipes/membros/${id}`, {
        method: 'PUT',
        body: dados,
      });

      if (data.success) {
        await carregarMembros();
      } else {
        throw new Error(data.error || 'Erro ao atualizar membro');
      }
    } catch (err) {
      console.error('Erro ao atualizar membro:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    }
  }, [carregarMembros, isDemo]);

  // Remover membro
  const removerMembro = useCallback(async (id: string) => {
    if (isDemo) {
      setMembros(prev => prev.filter(m => m.id !== id));
      setTarefas(prev => prev.filter(t => t.membroId !== id));
      logger.log('👥 Membro DEMO removido:', id);
      return;
    }

    try {
      const data = await fetchWithAuth(`/equipes/membros/${id}`, {
        method: 'DELETE',
      });

      if (data.success) {
        await carregarMembros();
      } else {
        throw new Error(data.error || 'Erro ao remover membro');
      }
    } catch (err) {
      console.error('Erro ao remover membro:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    }
  }, [carregarMembros, isDemo]);

  // Adicionar tarefa
  const adicionarTarefa = useCallback(async (tarefa: Omit<Tarefa, 'id' | 'criadoEm' | 'atualizadoEm'>) => {
    if (isDemo) {
      const novaTarefa: Tarefa = {
        ...tarefa,
        id: `tarefa-${Date.now()}`,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };
      setTarefas(prev => [...prev, novaTarefa]);
      setEstatisticas(getMockEstatisticas([...tarefas, novaTarefa]));
      logger.log('✅ Tarefa DEMO adicionada:', novaTarefa.titulo);
      return novaTarefa;
    }

    try {
      const data = await fetchWithAuth('/equipes/tarefas', {
        method: 'POST',
        body: tarefa,
      });

      if (data.success) {
        await carregarTarefas();
        await carregarEstatisticas();
        return data.tarefa;
      } else {
        throw new Error(data.error || 'Erro ao adicionar tarefa');
      }
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    }
  }, [carregarTarefas, carregarEstatisticas, isDemo, tarefas]);

  // Atualizar tarefa
  const atualizarTarefa = useCallback(async (id: string, dados: Partial<Tarefa>) => {
    if (isDemo) {
      setTarefas(prev => {
        const updated = prev.map(t => t.id === id ? { ...t, ...dados, atualizadoEm: new Date().toISOString() } : t);
        setEstatisticas(getMockEstatisticas(updated));
        return updated;
      });
      logger.log('✅ Tarefa DEMO atualizada:', id);
      return;
    }

    try {
      const data = await fetchWithAuth(`/equipes/tarefas/${id}`, {
        method: 'PUT',
        body: dados,
      });

      if (data.success) {
        await carregarTarefas();
        await carregarEstatisticas();
      } else {
        throw new Error(data.error || 'Erro ao atualizar tarefa');
      }
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    }
  }, [carregarTarefas, carregarEstatisticas, isDemo]);

  // Remover tarefa
  const removerTarefa = useCallback(async (id: string) => {
    if (isDemo) {
      setTarefas(prev => {
        const filtered = prev.filter(t => t.id !== id);
        setEstatisticas(getMockEstatisticas(filtered));
        return filtered;
      });
      logger.log('✅ Tarefa DEMO removida:', id);
      return;
    }

    try {
      const data = await fetchWithAuth(`/equipes/tarefas/${id}`, {
        method: 'DELETE',
      });

      if (data.success) {
        await carregarTarefas();
        await carregarEstatisticas();
      } else {
        throw new Error(data.error || 'Erro ao remover tarefa');
      }
    } catch (err) {
      console.error('Erro ao remover tarefa:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    }
  }, [carregarTarefas, carregarEstatisticas, isDemo]);

  // Carregar dados iniciais
  useEffect(() => {
    if (!isAuthenticated && !isDemo) {
      setLoading(false);
      return;
    }
    
    const carregarDados = async () => {
      setLoading(true);
      try {
        if (isDemo) {
          // Simular delay de rede para modo demo
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        await Promise.all([
          carregarMembros(),
          carregarTarefas(),
          carregarEstatisticas(),
        ]);
        if (isDemo) {
          logger.log('👥 Dados de equipes DEMO carregados');
        }
      } catch (err) {
        if (isAuthenticated) {
          console.error('Erro ao carregar dados:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [isAuthenticated, isDemo, carregarMembros, carregarTarefas, carregarEstatisticas]);

  return {
    membros,
    tarefas,
    estatisticas,
    loading,
    error,
    carregarMembros,
    carregarTarefas,
    carregarEstatisticas,
    adicionarMembro,
    atualizarMembro,
    removerMembro,
    adicionarTarefa,
    atualizarTarefa,
    removerTarefa,
  };
}
