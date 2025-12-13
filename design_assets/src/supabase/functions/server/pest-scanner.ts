/**
 * 🐛 API DE SCANNER DE PRAGAS - SOLOFORTE
 * 
 * Sistema completo de identificação de pragas com GPT-4 Vision:
 * - Análise de imagens com IA
 * - Base de conhecimento agronômico
 * - Recomendações de tratamento
 * - Medidas preventivas
 */

import { Hono } from 'npm:hono';

// ===================================
// TIPOS
// ===================================

interface AnalysisRequest {
  image: string; // Base64 data URL
  imageName: string;
  cropType?: string;
  location?: string;
  farmName?: string;
  additionalInfo?: string;
}

interface PestAnalysisResult {
  pestName: string;
  pestScientificName: string;
  confidence: number; // 0-100%
  severity: 'baixa' | 'média' | 'alta' | 'crítica';
  description: string;
  treatments: Treatment[];
  preventiveMeasures: string[];
  culturalPractices: string[];
}

interface Treatment {
  type: 'químico' | 'biológico' | 'cultural' | 'mecânico';
  name: string;
  activeIngredient?: string;
  dosage?: string;
  applicationMethod?: string;
  waitingPeriod?: string;
  notes?: string;
  priority: number; // 1-5
}

// ===================================
// BASE DE CONHECIMENTO
// ===================================

const PEST_DATABASE = {
  // Lepidópteros
  lagarta_cartucho: {
    scientificName: 'Spodoptera frugiperda',
    commonTreatments: [
      {
        type: 'biológico',
        name: 'Bacillus thuringiensis',
        dosage: '1-2 kg/ha',
        applicationMethod: 'Pulverização foliar',
        priority: 1
      },
      {
        type: 'químico',
        name: 'Clorantraniliprole',
        activeIngredient: 'Clorantraniliprole 200 g/L',
        dosage: '0.15-0.20 L/ha',
        applicationMethod: 'Pulverização foliar',
        waitingPeriod: '28 dias',
        priority: 2
      }
    ]
  },
  lagarta_soja: {
    scientificName: 'Anticarsia gemmatalis',
    commonTreatments: [
      {
        type: 'biológico',
        name: 'Vírus NPV',
        dosage: '2-4 mL/ha',
        applicationMethod: 'Pulverização foliar',
        priority: 1
      }
    ]
  },
  
  // Hemípteros
  percevejo_soja: {
    scientificName: 'Nezara viridula',
    commonTreatments: [
      {
        type: 'químico',
        name: 'Acefato',
        activeIngredient: 'Acefato 750 g/kg',
        dosage: '1.0-1.5 kg/ha',
        applicationMethod: 'Pulverização foliar',
        waitingPeriod: '30 dias',
        priority: 2
      }
    ]
  },
  
  // Coleópteros
  vaquinha: {
    scientificName: 'Diabrotica speciosa',
    commonTreatments: [
      {
        type: 'cultural',
        name: 'Rotação de culturas',
        notes: 'Rotação com gramíneas',
        priority: 1
      }
    ]
  },
  
  // Ácaros
  acaro_rajado: {
    scientificName: 'Tetranychus urticae',
    commonTreatments: [
      {
        type: 'biológico',
        name: 'Phytoseiulus persimilis',
        notes: 'Ácaro predador',
        priority: 1
      }
    ]
  },
  
  // Pulgões
  pulgao_soja: {
    scientificName: 'Aphis glycines',
    commonTreatments: [
      {
        type: 'biológico',
        name: 'Joaninha (Coccinellidae)',
        notes: 'Controle biológico natural',
        priority: 1
      }
    ]
  }
};

// ===================================
// SISTEMA DE PROMPT ESPECIALIZADO
// ===================================

function createPestAnalysisPrompt(cropType?: string, location?: string, additionalInfo?: string): string {
  return `Você é um especialista em Entomologia Agrícola e Proteção de Plantas. Analise esta imagem para identificar pragas agrícolas.

CONTEXTO:
- Cultura: ${cropType || 'Não especificada'}
- Localização: ${location || 'Não especificada'}
- Informações adicionais: ${additionalInfo || 'Nenhuma'}

INSTRUÇÕES DE ANÁLISE:
1. Identifique a praga ou pragas presentes na imagem
2. Analise sintomas de danos nas plantas
3. Considere o estágio de desenvolvimento da praga
4. Avalie a severidade da infestação
5. Considere o contexto da cultura e região

RESPONDA APENAS EM JSON VÁLIDO com esta estrutura:
{
  "pestName": "Nome comum da praga principal identificada",
  "pestScientificName": "Nome científico (Gênero espécie)",
  "confidence": "Nível de confiança de 0-100%",
  "severity": "baixa|média|alta|crítica",
  "description": "Descrição detalhada da praga, sintomas observados e danos causados",
  "reasoning": "Explicação do diagnóstico e características observadas",
  "additionalPests": ["Outras pragas identificadas, se houver"],
  "damageSymptoms": ["Lista de sintomas de dano observados"],
  "developmentStage": "Estágio de desenvolvimento observado (ovo, larva, ninfa, adulto)",
  "riskFactors": ["Fatores de risco identificados"],
  "urgency": "baixa|média|alta|crítica - urgência de controle"
}

CRITÉRIOS DE CONFIANÇA:
- 90-100%: Identificação muito clara com características diagnósticas evidentes
- 70-89%: Identificação provável com boa visibilidade das características
- 50-69%: Identificação possível mas com características parcialmente visíveis
- 30-49%: Identificação incerta, necessita mais informações
- 0-29%: Não foi possível identificar com certeza

CRITÉRIOS DE SEVERIDADE:
- Baixa: Poucas pragas, danos mínimos, controle preventivo
- Média: Presença moderada, alguns danos visíveis, monitoramento necessário
- Alta: Infestação significativa, danos evidentes, controle urgente
- Crítica: Infestação severa, danos extensos, controle imediato

Seja preciso, técnico e focado no manejo integrado de pragas (MIP).`;
}

// ===================================
// FUNÇÕES DE TRATAMENTO
// ===================================

function generateTreatments(pestKey: string): Treatment[] {
  const pestData = PEST_DATABASE[pestKey as keyof typeof PEST_DATABASE];
  
  if (pestData?.commonTreatments) {
    return pestData.commonTreatments as Treatment[];
  }
  
  // Tratamentos genéricos baseados no tipo de praga
  if (pestKey.includes('lagarta')) {
    return [
      {
        type: 'biológico',
        name: 'Bacillus thuringiensis',
        dosage: '1-2 kg/ha',
        applicationMethod: 'Pulverização foliar',
        notes: 'Mais eficaz em lagartas jovens',
        priority: 1
      },
      {
        type: 'cultural',
        name: 'Monitoramento com armadilhas',
        notes: 'Armadilhas com feromônio para monitoramento',
        priority: 2
      }
    ];
  }
  
  if (pestKey.includes('percevejo')) {
    return [
      {
        type: 'cultural',
        name: 'Manejo de plantas daninhas',
        notes: 'Controle hospedeiros alternativos',
        priority: 1
      },
      {
        type: 'químico',
        name: 'Inseticida específico',
        notes: 'Aplicar conforme nível de dano econômico',
        waitingPeriod: '30 dias',
        priority: 2
      }
    ];
  }
  
  // Padrão genérico
  return [
    {
      type: 'cultural',
      name: 'Monitoramento regular',
      notes: 'Inspeção semanal das culturas',
      priority: 1
    },
    {
      type: 'biológico',
      name: 'Controle biológico',
      notes: 'Preservar inimigos naturais',
      priority: 2
    }
  ];
}

function generatePreventiveMeasures(): string[] {
  return [
    'Realizar monitoramento regular das culturas',
    'Manter plantas daninhas controladas',
    'Implementar rotação de culturas adequada',
    'Preservar inimigos naturais',
    'Usar variedades resistentes quando disponíveis',
    'Realizar tratamento de sementes',
    'Manter registros de aplicações e infestações',
    'Seguir os princípios do Manejo Integrado de Pragas (MIP)'
  ];
}

function generateCulturalPractices(): string[] {
  return [
    'Eliminar restos culturais após a colheita',
    'Realizar aração profunda para expor pupas',
    'Manter bordaduras com plantas repelentes',
    'Implementar consórcio com culturas armadilha',
    'Ajustar densidade de plantio adequada',
    'Realizar adubação equilibrada',
    'Manter irrigação controlada',
    'Estabelecer período de vazio sanitário'
  ];
}

// ===================================
// ROTA PRINCIPAL
// ===================================

export function createPestScannerRoutes(app: Hono) {
  // Análise de imagem
  app.post('/pest-scanner/analyze', async (c) => {
    try {
      const body = await c.req.json() as AnalysisRequest;
      const { image, imageName, cropType, location, farmName, additionalInfo } = body;

      console.log('Iniciando análise de praga:', { imageName, cropType, location });

      // Validações
      if (!image || !image.startsWith('data:image/')) {
        return c.json({ error: 'Imagem inválida' }, 400);
      }

      // Configurar OpenAI
      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openaiApiKey) {
        console.error('OPENAI_API_KEY não configurada');
        return c.json({ error: 'Serviço de IA não configurado' }, 500);
      }

      // Criar prompt especializado
      const systemPrompt = createPestAnalysisPrompt(cropType, location, additionalInfo);

      // Chamar GPT-4 Vision
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analise esta imagem para identificar pragas agrícolas:'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: image,
                    detail: 'high'
                  }
                }
              ]
            }
          ],
          max_tokens: 1500,
          temperature: 0.1, // Baixa temperatura para maior precisão
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erro na API OpenAI:', error);
        return c.json({ error: 'Erro na análise de IA' }, 500);
      }

      const result = await response.json();
      const content = result.choices[0]?.message?.content;

      if (!content) {
        return c.json({ error: 'Resposta vazia da IA' }, 500);
      }

      // Parse do JSON retornado
      let aiAnalysis;
      try {
        aiAnalysis = JSON.parse(content);
      } catch (parseError) {
        console.error('Erro ao parsear resposta da IA:', parseError);
        console.error('Conteúdo:', content);
        return c.json({ error: 'Erro ao processar resposta da IA' }, 500);
      }

      // Gerar tratamentos baseados na praga identificada
      const pestKey = aiAnalysis.pestName?.toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[áàâã]/g, 'a')
        .replace(/[éêë]/g, 'e')
        .replace(/[íîï]/g, 'i')
        .replace(/[óôõ]/g, 'o')
        .replace(/[úûü]/g, 'u')
        .replace(/ç/g, 'c') || 'unknown';

      const treatments = generateTreatments(pestKey);
      const preventiveMeasures = generatePreventiveMeasures();
      const culturalPractices = generateCulturalPractices();

      // Resultado final
      const finalResult: PestAnalysisResult = {
        pestName: aiAnalysis.pestName || 'Praga não identificada',
        pestScientificName: aiAnalysis.pestScientificName || 'Não determinado',
        confidence: Math.max(0, Math.min(100, aiAnalysis.confidence || 50)),
        severity: aiAnalysis.severity || 'média',
        description: aiAnalysis.description || 'Não foi possível determinar características específicas.',
        treatments,
        preventiveMeasures,
        culturalPractices,
      };

      console.log('Análise concluída:', { 
        pestName: finalResult.pestName, 
        confidence: finalResult.confidence 
      });

      return c.json(finalResult);

    } catch (error) {
      console.error('Erro ao analisar praga:', error);
      return c.json({ 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      }, 500);
    }
  });

  // Listar pragas comuns por cultura
  app.get('/pest-scanner/common-pests/:cropType', async (c) => {
    try {
      const cropType = c.req.param('cropType').toLowerCase();
      
      // Base de dados de pragas por cultura
      const commonPests = {
        soja: [
          { name: 'Lagarta da soja', scientific: 'Anticarsia gemmatalis' },
          { name: 'Percevejo da soja', scientific: 'Nezara viridula' },
          { name: 'Lagarta falsa-medideira', scientific: 'Chrysodeixis includens' },
          { name: 'Ácaro rajado', scientific: 'Tetranychus urticae' },
          { name: 'Pulgão da soja', scientific: 'Aphis glycines' }
        ],
        milho: [
          { name: 'Lagarta do cartucho', scientific: 'Spodoptera frugiperda' },
          { name: 'Lagarta da espiga', scientific: 'Helicoverpa zea' },
          { name: 'Cigarrinha do milho', scientific: 'Dalbulus maidis' },
          { name: 'Percevejo barriga-verde', scientific: 'Dichelops melacanthus' },
          { name: 'Broca do colmo', scientific: 'Diatraea saccharalis' }
        ],
        algodao: [
          { name: 'Bicudo do algodão', scientific: 'Anthonomus grandis' },
          { name: 'Lagarta rosada', scientific: 'Pectinophora gossypiella' },
          { name: 'Curuquerê do algodão', scientific: 'Alabama argillacea' },
          { name: 'Pulgão do algodão', scientific: 'Aphis gossypii' },
          { name: 'Ácaro rajado', scientific: 'Tetranychus urticae' }
        ]
      };

      const pests = commonPests[cropType as keyof typeof commonPests] || [];
      
      return c.json({ 
        cropType, 
        commonPests: pests 
      });

    } catch (error) {
      console.error('Erro ao listar pragas comuns:', error);
      return c.json({ error: 'Erro interno do servidor' }, 500);
    }
  });
}