/**
 * 🔄 CONVERSOR DE DIAGNÓSTICO DE PRAGAS PARA OCORRÊNCIA
 * 
 * Utilitário para converter diagnósticos do scanner de pragas
 * em ocorrências técnicas que podem ser salvas nos relatórios
 */

import type { OccurrenceMarker, TipoOcorrenciaType, SeveridadeType, StatusOcorrencia } from '../types';
import type { PestDiagnosis } from './hooks/usePestScanner';

/**
 * Converte diagnóstico de praga para ocorrência técnica
 */
export function convertPestDiagnosisToOccurrence(
  diagnosis: PestDiagnosis,
  customLocation?: { lat: number; lng: number }
): OccurrenceMarker {
  // Mapear severidade de praga para severidade de ocorrência
  const severidadeMap: Record<string, SeveridadeType> = {
    'baixa': 'baixa',
    'média': 'media',
    'alta': 'alta',
    'crítica': 'alta', // crítica também mapeia para alta
  };

  // Calcular severidade percentual baseado no tipo
  const severidadePercentualMap: Record<string, number> = {
    'baixa': 25,
    'média': 50,
    'alta': 75,
    'crítica': 90,
  };

  const severidade = severidadeMap[diagnosis.severity || 'média'] || 'media';
  const severidadePercentual = severidadePercentualMap[diagnosis.severity || 'média'] || 50;

  // Mapear para tipo de ocorrência - sempre inseto já que é scanner de pragas
  const tipo: TipoOcorrenciaType = 'inseto';

  // Determinar status baseado na severidade
  let status: StatusOcorrencia = 'ativa';
  if (severidadePercentual >= 70) {
    status = 'ativa';
  } else if (severidadePercentual >= 30) {
    status = 'em-monitoramento';
  } else {
    status = 'controlada';
  }

  // Construir notas com informações do diagnóstico
  const notas = buildNotasFromDiagnosis(diagnosis);

  // Construir recomendações a partir dos tratamentos
  const recomendacoes = buildRecomendacoesFromTreatments(diagnosis);

  // Extrair coordenadas (priorizar custom location se fornecida)
  const location = customLocation || extractLocationFromDiagnosis(diagnosis);

  // Criar ocorrência
  const occurrence: OccurrenceMarker = {
    id: `pest_occ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    lat: location.lat,
    lng: location.lng,
    tipo,
    severidade,
    severidadePercentual,
    notas,
    data: new Date().toISOString().split('T')[0],
    status,
    recomendacoes,
    fotos: diagnosis.imageUrl ? [diagnosis.imageUrl] : [],
    produtosAplicados: extractProdutosFromTreatments(diagnosis),
  };

  return occurrence;
}

/**
 * Constrói notas detalhadas a partir do diagnóstico
 */
function buildNotasFromDiagnosis(diagnosis: PestDiagnosis): string {
  const parts: string[] = [];

  // Título com nome da praga
  if (diagnosis.pestName) {
    parts.push(`🐛 PRAGA IDENTIFICADA: ${diagnosis.pestName}`);
    
    if (diagnosis.pestScientificName) {
      parts.push(`(${diagnosis.pestScientificName})`);
    }
  }

  // Confiança da IA
  if (diagnosis.confidence !== undefined) {
    parts.push(`\n✓ Confiança: ${diagnosis.confidence}%`);
  }

  // Descrição
  if (diagnosis.description) {
    parts.push(`\n📋 DESCRIÇÃO:\n${diagnosis.description}`);
  }

  // Informações de contexto
  const contextParts: string[] = [];
  if (diagnosis.cropType) {
    contextParts.push(`Cultura: ${diagnosis.cropType}`);
  }
  if (diagnosis.farmName) {
    contextParts.push(`Fazenda: ${diagnosis.farmName}`);
  }
  if (diagnosis.location) {
    contextParts.push(`Localização: ${diagnosis.location}`);
  }

  if (contextParts.length > 0) {
    parts.push(`\n📍 CONTEXTO:\n${contextParts.join(' | ')}`);
  }

  // Medidas preventivas
  if (diagnosis.preventiveMeasures && diagnosis.preventiveMeasures.length > 0) {
    parts.push('\n🛡️ MEDIDAS PREVENTIVAS:');
    diagnosis.preventiveMeasures.forEach((measure, idx) => {
      parts.push(`${idx + 1}. ${measure}`);
    });
  }

  // Práticas culturais
  if (diagnosis.culturalPractices && diagnosis.culturalPractices.length > 0) {
    parts.push('\n🌱 PRÁTICAS CULTURAIS:');
    diagnosis.culturalPractices.forEach((practice, idx) => {
      parts.push(`${idx + 1}. ${practice}`);
    });
  }

  parts.push(`\n🤖 Diagnóstico gerado por IA em ${new Date(diagnosis.timestamp).toLocaleString('pt-BR')}`);

  return parts.join('\n');
}

/**
 * Constrói recomendações de tratamento
 */
function buildRecomendacoesFromTreatments(diagnosis: PestDiagnosis): string {
  if (!diagnosis.treatments || diagnosis.treatments.length === 0) {
    return 'Nenhum tratamento específico recomendado. Consulte um agrônomo.';
  }

  const parts: string[] = ['💊 TRATAMENTOS RECOMENDADOS:\n'];

  // Ordenar por prioridade
  const sortedTreatments = [...diagnosis.treatments].sort((a, b) => a.priority - b.priority);

  sortedTreatments.forEach((treatment, idx) => {
    const typeEmoji = {
      'químico': '🧪',
      'biológico': '🌱',
      'cultural': '🚜',
      'mecânico': '⚙️',
    }[treatment.type] || '💊';

    parts.push(`\n${idx + 1}. ${typeEmoji} ${treatment.name} (Prioridade ${treatment.priority})`);
    
    if (treatment.activeIngredient) {
      parts.push(`   • Princípio ativo: ${treatment.activeIngredient}`);
    }
    
    if (treatment.dosage) {
      parts.push(`   • Dosagem: ${treatment.dosage}`);
    }
    
    if (treatment.applicationMethod) {
      parts.push(`   • Aplicação: ${treatment.applicationMethod}`);
    }
    
    if (treatment.waitingPeriod) {
      parts.push(`   • ⚠️ Carência: ${treatment.waitingPeriod}`);
    }
    
    if (treatment.notes) {
      parts.push(`   • 💡 ${treatment.notes}`);
    }
  });

  return parts.join('\n');
}

/**
 * Extrai produtos aplicados dos tratamentos
 */
function extractProdutosFromTreatments(diagnosis: PestDiagnosis): string[] {
  if (!diagnosis.treatments || diagnosis.treatments.length === 0) {
    return [];
  }

  return diagnosis.treatments
    .filter(t => t.name)
    .map(t => {
      if (t.activeIngredient) {
        return `${t.name} (${t.activeIngredient})`;
      }
      return t.name;
    });
}

/**
 * Extrai localização do diagnóstico ou usa padrão
 */
function extractLocationFromDiagnosis(diagnosis: PestDiagnosis): { lat: number; lng: number } {
  // TODO: Se o diagnóstico tiver coordenadas GPS salvas, usar aqui
  // Por enquanto, retornar localização padrão de São Paulo
  return {
    lat: -23.5505,
    lng: -46.6333,
  };
}

/**
 * Verifica se um diagnóstico pode ser convertido em ocorrência
 */
export function canConvertToOccurrence(diagnosis: PestDiagnosis): boolean {
  return diagnosis.status === 'completed' && !!diagnosis.pestName;
}

/**
 * Obtém resumo rápido do diagnóstico para preview
 */
export function getDiagnosisSummary(diagnosis: PestDiagnosis): string {
  const parts: string[] = [];

  if (diagnosis.pestName) {
    parts.push(diagnosis.pestName);
  }

  if (diagnosis.severity) {
    const severityEmoji = {
      'baixa': '🟢',
      'média': '🟡',
      'alta': '🟠',
      'crítica': '🔴',
    }[diagnosis.severity] || '⚪';
    
    parts.push(`${severityEmoji} ${diagnosis.severity}`);
  }

  if (diagnosis.confidence !== undefined) {
    parts.push(`${diagnosis.confidence}% confiança`);
  }

  return parts.join(' • ');
}
