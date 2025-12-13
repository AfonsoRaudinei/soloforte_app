/**
 * 🐛 HOOK DE SCANNER DE PRAGAS - SOLOFORTE
 * 
 * Sistema completo de identificação de pragas com IA:
 * - Upload de fotos
 * - Análise com GPT-4 Vision
 * - Histórico de diagnósticos
 * - Recomendações de tratamento
 * - Cache de resultados
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth, createClient } from '../supabase/client';
import { logger } from '../logger';
import { toast } from 'sonner@2.0.3';

// ===================================
// TIPOS
// ===================================

export interface PestDiagnosis {
  id: string;
  imageUrl: string;
  imageName: string;
  timestamp: number;
  status: 'analyzing' | 'completed' | 'error';
  
  // Resultado da IA
  pestName?: string;
  pestScientificName?: string;
  confidence?: number; // 0-100%
  severity?: 'baixa' | 'média' | 'alta' | 'crítica';
  description?: string;
  
  // Recomendações
  treatments?: Treatment[];
  preventiveMeasures?: string[];
  culturalPractices?: string[];
  
  // Metadados
  cropType?: string;
  location?: string;
  farmName?: string;
  
  // Erro (se houver)
  error?: string;
}

export interface Treatment {
  type: 'químico' | 'biológico' | 'cultural' | 'mecânico';
  name: string;
  activeIngredient?: string;
  dosage?: string;
  applicationMethod?: string;
  waitingPeriod?: string; // Período de carência
  notes?: string;
  priority: number; // 1-5
}

export interface ScanOptions {
  cropType?: string;
  location?: string;
  farmName?: string;
  additionalInfo?: string;
}

// ===================================
// CONSTANTES
// ===================================

const STORAGE_KEY = 'soloforte_pest_diagnoses';
const MAX_HISTORY = 50;
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias

// ===================================
// HOOK
// ===================================

export function usePestScanner() {
  const [diagnoses, setDiagnoses] = useState<PestDiagnosis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<PestDiagnosis | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // ===================================
  // CARREGAR HISTÓRICO
  // ===================================

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PestDiagnosis[];
        
        // Filtrar diagnósticos antigos (mais de 7 dias)
        const now = Date.now();
        const filtered = parsed.filter(d => now - d.timestamp < CACHE_DURATION);
        
        setDiagnoses(filtered);
        
        // Atualizar storage se houve limpeza
        if (filtered.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        }
      }
    } catch (error) {
      logger.error('Erro ao carregar histórico de diagnósticos:', error);
    }
  }, []);

  const saveHistory = useCallback((newDiagnoses: PestDiagnosis[]) => {
    try {
      const limited = newDiagnoses.slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      setDiagnoses(limited);
    } catch (error) {
      logger.error('Erro ao salvar histórico de diagnósticos:', error);
    }
  }, []);

  // ===================================
  // SCAN DE IMAGEM
  // ===================================

  const scanImage = useCallback(async (
    imageDataUrl: string,
    imageName: string,
    options: ScanOptions = {}
  ): Promise<PestDiagnosis> => {
    
    if (!isAuthenticated) {
      throw new Error('Usuário não autenticado');
    }
    
    setIsAnalyzing(true);
    
    // Criar diagnóstico inicial
    const diagnosis: PestDiagnosis = {
      id: `pest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      imageUrl: imageDataUrl,
      imageName,
      timestamp: Date.now(),
      status: 'analyzing',
      cropType: options.cropType,
      location: options.location,
      farmName: options.farmName,
    };

    // Adicionar ao histórico
    const updated = [diagnosis, ...diagnoses];
    saveHistory(updated);
    setCurrentDiagnosis(diagnosis);

    try {
      logger.info('Iniciando análise de praga:', { imageName, options });

      // Enviar para API
      const result = await fetchWithAuth('/pest-scanner/analyze', {
        method: 'POST',
        body: {
          image: imageDataUrl,
          imageName,
          ...options,
        },
      });

      if (!result.success) {
        throw new Error(result.error || 'Erro ao analisar imagem');
      }
      
      // Atualizar diagnóstico com resultado
      const completed: PestDiagnosis = {
        ...diagnosis,
        status: 'completed',
        pestName: result.data?.pestName,
        pestScientificName: result.data?.pestScientificName,
        confidence: result.data?.confidence,
        severity: result.data?.severity,
        description: result.data?.description,
        treatments: result.data?.treatments,
        preventiveMeasures: result.data?.preventiveMeasures,
        culturalPractices: result.data?.culturalPractices,
      };

      // Atualizar no histórico
      const updatedWithResult = updated.map(d => 
        d.id === diagnosis.id ? completed : d
      );
      saveHistory(updatedWithResult);
      setCurrentDiagnosis(completed);

      logger.info('Análise de praga concluída:', { pestName: result.data?.pestName, confidence: result.data?.confidence });
      
      toast.success(`🐛 Praga identificada: ${result.data?.pestName}`, {
        description: `Confiança: ${result.data?.confidence}%`,
      });

      return completed;

    } catch (error) {
      logger.error('Erro ao analisar imagem:', error);
      
      // Atualizar diagnóstico com erro
      const failed: PestDiagnosis = {
        ...diagnosis,
        status: 'error',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };

      // Atualizar no histórico
      const updatedWithError = updated.map(d => 
        d.id === diagnosis.id ? failed : d
      );
      saveHistory(updatedWithError);
      setCurrentDiagnosis(failed);

      toast.error('Erro ao analisar imagem', {
        description: error instanceof Error ? error.message : 'Tente novamente',
      });

      throw error;

    } finally {
      setIsAnalyzing(false);
    }
  }, [isAuthenticated, diagnoses, saveHistory]);

  // ===================================
  // GERENCIAR DIAGNÓSTICOS
  // ===================================

  const deleteDiagnosis = useCallback((id: string) => {
    const updated = diagnoses.filter(d => d.id !== id);
    saveHistory(updated);
    
    if (currentDiagnosis?.id === id) {
      setCurrentDiagnosis(null);
    }
    
    toast.success('Diagnóstico removido');
  }, [diagnoses, currentDiagnosis, saveHistory]);

  const clearHistory = useCallback(() => {
    saveHistory([]);
    setCurrentDiagnosis(null);
    toast.success('Histórico limpo');
  }, [saveHistory]);

  const getDiagnosisByPest = useCallback((pestName: string): PestDiagnosis[] => {
    return diagnoses.filter(d => 
      d.pestName?.toLowerCase().includes(pestName.toLowerCase())
    );
  }, [diagnoses]);

  const getDiagnosisByFarm = useCallback((farmName: string): PestDiagnosis[] => {
    return diagnoses.filter(d => 
      d.farmName?.toLowerCase().includes(farmName.toLowerCase())
    );
  }, [diagnoses]);

  const getRecentDiagnoses = useCallback((count: number = 10): PestDiagnosis[] => {
    return diagnoses.slice(0, count);
  }, [diagnoses]);

  const getSeverityCount = useCallback(() => {
    const counts = {
      baixa: 0,
      média: 0,
      alta: 0,
      crítica: 0,
    };

    diagnoses.forEach(d => {
      if (d.severity) {
        counts[d.severity]++;
      }
    });

    return counts;
  }, [diagnoses]);

  // ===================================
  // ESTATÍSTICAS
  // ===================================

  const getStats = useCallback(() => {
    const total = diagnoses.filter(d => d.status === 'completed').length;
    const severityCounts = getSeverityCount();
    
    // Pragas mais comuns
    const pestCounts: Record<string, number> = {};
    diagnoses.forEach(d => {
      if (d.pestName) {
        pestCounts[d.pestName] = (pestCounts[d.pestName] || 0) + 1;
      }
    });
    
    const mostCommonPests = Object.entries(pestCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Confiança média
    const avgConfidence = diagnoses
      .filter(d => d.confidence !== undefined)
      .reduce((sum, d) => sum + (d.confidence || 0), 0) / total || 0;

    return {
      total,
      severityCounts,
      mostCommonPests,
      avgConfidence: Math.round(avgConfidence),
      totalAnalyzing: diagnoses.filter(d => d.status === 'analyzing').length,
      totalErrors: diagnoses.filter(d => d.status === 'error').length,
    };
  }, [diagnoses, getSeverityCount]);

  // ===================================
  // RETORNO
  // ===================================

  return {
    // Estado
    diagnoses,
    isAnalyzing,
    currentDiagnosis,

    // Ações
    scanImage,
    deleteDiagnosis,
    clearHistory,

    // Consultas
    getDiagnosisByPest,
    getDiagnosisByFarm,
    getRecentDiagnoses,
    getSeverityCount,
    getStats,

    // Helpers
    setCurrentDiagnosis,
  };
}
