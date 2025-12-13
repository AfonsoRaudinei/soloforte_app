# 📊 Sistema de Rastreamento Cronológico de Ocorrências - SoloForte

**Data**: 20 de outubro de 2025  
**Versão**: 1.0  
**Componente**: Dashboard, Tipos

---

## 🎯 Visão Geral

Sistema completo de rastreamento cronológico de ocorrências técnicas no campo (pragas, doenças, plantas daninhas) com:

- ✅ **Severidade em %** (0-100%) ao invés de apenas baixa/média/alta
- ✅ **Follow-ups** vinculados à ocorrência original
- ✅ **Histórico completo** de evolução
- ✅ **Rastreamento de tratamentos** (recomendações + produtos aplicados)
- ✅ **Status automático** baseado na severidade e evolução

---

## 📐 Estrutura de Dados

### **OccurrenceMarker** (Atualizado)

```typescript
interface OccurrenceMarker {
  id: string;
  lat: number;
  lng: number;
  tipo: TipoOcorrenciaType; // 'planta-daninha' | 'doencas' | 'inseto' | 'nutricional' | 'outros'
  
  // Severidade dupla: textual + percentual
  severidade: SeveridadeType; // 'baixa' | 'media' | 'alta'
  severidadePercentual: number; // 0-100%
  
  // Dados básicos
  fotos?: string[];
  notas?: string;
  data?: string;
  
  // 🆕 RASTREAMENTO CRONOLÓGICO
  ocorrenciaOriginalId?: string; // ID da primeira ocorrência desta série
  ocorrenciaAnteriorId?: string; // ID da ocorrência imediatamente anterior
  followUps?: string[]; // IDs das ocorrências posteriores (follow-ups)
  status?: StatusOcorrencia; // 'ativa' | 'em-monitoramento' | 'controlada' | 'resolvida'
  
  // 🆕 TRATAMENTOS
  recomendacoes?: string; // Recomendações de tratamento
  produtosAplicados?: string[]; // Produtos aplicados para controle
}
```

### **StatusOcorrencia**

```typescript
type StatusOcorrencia = 
  | 'ativa'            // Severidade >= 70% ou primeira visita alta
  | 'em-monitoramento' // 30-69% ou melhorando
  | 'controlada'       // < 30% ou grande melhoria
  | 'resolvida';       // Follow-up com < 5% (futuro)
```

### **OccurrenceHistory** (Novo)

```typescript
interface OccurrenceHistory {
  id: string; // ID da ocorrência original
  tipo: TipoOcorrenciaType;
  localizacao: LatLng;
  status: StatusOcorrencia;
  registros: OccurrenceMarker[]; // Ordenado cronologicamente (mais antigo → mais recente)
  iniciadoEm: string;
  ultimaAtualizacao: string;
  evolucao: {
    severidadeInicial: number;
    severidadeAtual: number;
    tendencia: 'melhorando' | 'piorando' | 'estavel';
    variacaoPercentual: number; // % de mudança desde a primeira visita
  };
}
```

---

## 🔄 Fluxo de Trabalho

### **1. Primeira Visita (Nova Ocorrência)**

```
Consultor encontra praga no campo (100% de infestação)
  ↓
Abre "Nova Ocorrência Técnica"
  ↓
Preenche:
  - Tipo: Inseto 🐛
  - Severidade: 100% (slider)
  - Fotos: 3 fotos da praga
  - Recomendações: "Aplicar Inseticida XYZ 2L/ha"
  - Localização: GPS capturado
  - Observações: "Lagarta alta infestação na bordadura"
  ↓
Salvar
  ↓
Sistema cria:
  - Status: 'ativa' (100% = alta)
  - ocorrenciaOriginalId: undefined (é a original)
  - ocorrenciaAnteriorId: undefined
  - followUps: []
```

### **2. Segunda Visita (Follow-up após tratamento)**

```
Consultor retorna 7 dias depois
  ↓
Abre "Nova Ocorrência Técnica"
  ↓
✅ Marca "Esta é uma visita de acompanhamento (Follow-up)"
  ↓
Seleciona ocorrência anterior:
  "🐛 inseto - 100% (14/10/2025)"
  ↓
Sistema auto-preenche:
  - Tipo: Inseto (desabilitado - mesmo da original)
  - Localização: mesma GPS (desabilitado)
  - Mostra histórico: "Última visita: 100%"
  ↓
Consultor ajusta:
  - Severidade: 20% (slider) ← 80% de melhoria!
  - Fotos: 2 fotos mostrando controle
  - Produtos Aplicados: "Inseticida XYZ - 2L/ha"
  - Observações: "Redução significativa, continuar monitoramento"
  ↓
Salvar
  ↓
Sistema cria:
  - Status: 'controlada' (20% = baixa + melhorou)
  - ocorrenciaOriginalId: [ID da primeira]
  - ocorrenciaAnteriorId: [ID da primeira]
  - followUps: []
  ↓
Sistema atualiza ocorrência anterior:
  - followUps: [ID desta nova ocorrência]
```

### **3. Terceira Visita (Follow-up de monitoramento)**

```
Consultor retorna mais 7 dias depois
  ↓
✅ Marca Follow-up
  ↓
Seleciona ocorrência anterior:
  "🐛 inseto - 20% (21/10/2025)"
  ↓
Sistema mostra:
  - Tipo: Inseto (fixo)
  - Última visita: 20%
  ↓
Consultor registra:
  - Severidade: 5% ← Quase resolvido!
  - Produtos Aplicados: "Nenhum - apenas monitoramento"
  - Observações: "Controle efetivo, sem necessidade de reaplicação"
  ↓
Sistema cria:
  - Status: 'controlada'
  - ocorrenciaOriginalId: [ID da primeira]
  - ocorrenciaAnteriorId: [ID da segunda]
```

---

## 🎨 Interface do Usuário

### **Dialog de Nova Ocorrência**

#### **Seção 1: Toggle Follow-up**
```
┌─────────────────────────────────────────────────────┐
│ ☑️ Esta é uma visita de acompanhamento (Follow-up)  │
│ Marque se você está revisitando uma ocorrência      │
│ anterior                                             │
└─────────────────────────────────────────────────────┘
```

#### **Seção 2: Seleção de Ocorrência (se Follow-up)**
```
┌─────────────────────────────────────────────────────┐
│ 📍 Qual ocorrência você está acompanhando?          │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 🐛 inseto - 100% (14/10/2025)          ▼        │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Última visita: 100%                              │ │
│ │ Lagarta alta infestação na bordadura             │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

#### **Seção 3: Severidade Percentual**
```
┌─────────────────────────────────────────────────────┐
│ Severidade (%)                    20% de área afetada│
│ ┌─────────────────────────────────────────────────┐ │
│ │ ●──────────●─────────────────────────────────── │ │  
│ │ 0%   25%   50%   75%  100%                       │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
│ Nível de Severidade:                                 │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│ │ 🟢 BAIXA │ │ 🟡 Média │ │ 🔴 Alta  │             │
│ │  0-29%   │ │  30-69%  │ │  70-100% │             │
│ └──────────┘ └──────────┘ └──────────┘             │
│    ↑ ATIVO                                           │
└─────────────────────────────────────────────────────┘
```

#### **Seção 4: Tratamentos (Visual Condicional)**

**Nova Ocorrência:**
```
┌─────────────────────────────────────────────────────┐
│ 💊 Recomendações de Tratamento                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Aplicar Inseticida XYZ 2L/ha                     │ │
│ │ Monitorar semanalmente                           │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Follow-up (campo adicional):**
```
┌─────────────────────────────────────────────────────┐
│ 🧪 Produtos Aplicados desde a última visita         │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Inseticida XYZ - 2L/ha                           │ │
│ │ Adjuvante ABC - 500ml/ha                         │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 🤖 Lógica de Status Automático

### **Primeira Ocorrência**

```typescript
if (severidadePercentual >= 70) {
  status = 'ativa'; // 🔴 Atenção urgente
} else if (severidadePercentual >= 30) {
  status = 'em-monitoramento'; // 🟡 Acompanhar
} else {
  status = 'controlada'; // 🟢 Sob controle
}
```

### **Follow-up**

```typescript
const ocorrenciaAnterior = encontrarOcorrenciaAnterior();
const severidadeAnterior = ocorrenciaAnterior.severidadePercentual;

if (severidadePercentual < 20) {
  status = 'controlada'; // Baixa absoluta
} else if (severidadePercentual < severidadeAnterior) {
  status = 'em-monitoramento'; // Melhorando
} else {
  status = 'ativa'; // Piorando ou estável alta
}
```

---

## 📈 Exemplo Real: Histórico de Lagarta

### **Visita 1 (14/10/2025)**
```
Tipo: 🐛 Inseto
Severidade: 100%
Status: ATIVA 🔴
Recomendações: "Aplicar Inseticida XYZ 2L/ha"
Fotos: [foto1.jpg, foto2.jpg, foto3.jpg]
Notas: "Lagarta alta infestação na bordadura"
```

### **Visita 2 (21/10/2025) - 7 dias depois**
```
Tipo: 🐛 Inseto (follow-up)
Severidade: 20% ↓ (-80%)
Status: CONTROLADA 🟢
Produtos Aplicados:
  - Inseticida XYZ - 2L/ha
Fotos: [foto4.jpg, foto5.jpg]
Notas: "Redução significativa, continuar monitoramento"
```

### **Visita 3 (28/10/2025) - 7 dias depois**
```
Tipo: 🐛 Inseto (follow-up)
Severidade: 5% ↓ (-15% desde última, -95% desde primeira)
Status: CONTROLADA 🟢
Produtos Aplicados: "Nenhum - apenas monitoramento"
Fotos: [foto6.jpg]
Notas: "Controle efetivo, sem necessidade de reaplicação"
```

### **Visita 4 (04/11/2025) - 7 dias depois**
```
Tipo: 🐛 Inseto (follow-up)
Severidade: 35% ↑ (+30% desde última)
Status: EM MONITORAMENTO 🟡 ⚠️ PIOROU
Produtos Aplicados: "Nenhum"
Notas: "Reinfestação detectada - nova aplicação necessária"
Recomendações: "Reaplicar Inseticida XYZ ou produto alternativo"
```

---

## 📊 Visualização de Histórico (Futuro)

### **Timeline de Evolução**

```
📅 HISTÓRICO: Lagarta na Bordadura (Gleba 5)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

14/10 ●────────────────────────────────────── 100% 🔴
      │ PRIMEIRA VISITA
      │ ➜ Recomendação: Inseticida XYZ 2L/ha
      
21/10 ●────── 20% 🟢                      (-80%)
      │ FOLLOW-UP #1
      │ ✓ Aplicado: Inseticida XYZ 2L/ha
      │ ✓ Controle efetivo
      
28/10 ●── 5% 🟢                         (-15%)
      │ FOLLOW-UP #2
      │ ✓ Apenas monitoramento
      │ ✓ Tendência: Melhorando
      
04/11 ●──────────── 35% 🟡              (+30%) ⚠️
      │ FOLLOW-UP #3
      │ ⚠️ REINFESTAÇÃO DETECTADA
      │ ➜ Nova aplicação recomendada

RESUMO:
  Total de visitas: 4
  Severidade inicial: 100%
  Severidade atual: 35%
  Melhoria geral: -65%
  Tendência: ⚠️ PIORANDO (últimas 2 semanas)
  Status: EM MONITORAMENTO
```

---

## 💾 Armazenamento

### **localStorage (Modo Demo)**

```typescript
// STORAGE_KEYS.DEMO_MARKERS
[
  {
    "id": "marker_1729123456789",
    "lat": -23.5505,
    "lng": -46.6333,
    "tipo": "inseto",
    "severidade": "alta",
    "severidadePercentual": 100,
    "data": "2025-10-14",
    "fotos": ["data:image/jpeg;base64,..."],
    "notas": "Lagarta alta infestação na bordadura",
    "status": "ativa",
    "recomendacoes": "Aplicar Inseticida XYZ 2L/ha",
    "followUps": ["marker_1729728000000"]
  },
  {
    "id": "marker_1729728000000",
    "lat": -23.5505,
    "lng": -46.6333,
    "tipo": "inseto",
    "severidade": "baixa",
    "severidadePercentual": 20,
    "data": "2025-10-21",
    "fotos": ["data:image/jpeg;base64,..."],
    "notas": "Redução significativa",
    "status": "controlada",
    "ocorrenciaOriginalId": "marker_1729123456789",
    "ocorrenciaAnteriorId": "marker_1729123456789",
    "produtosAplicados": ["Inseticida XYZ - 2L/ha"],
    "followUps": ["marker_1730246400000"]
  }
]
```

### **Supabase (Produção)**

```sql
-- Tabela: ocorrencias
CREATE TABLE ocorrencias (
  id TEXT PRIMARY KEY,
  usuario_id TEXT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  tipo TEXT NOT NULL,
  severidade TEXT NOT NULL,
  severidade_percentual INTEGER NOT NULL CHECK (severidade_percentual BETWEEN 0 AND 100),
  data DATE NOT NULL,
  fotos JSONB DEFAULT '[]',
  notas TEXT,
  status TEXT NOT NULL,
  recomendacoes TEXT,
  produtos_aplicados JSONB DEFAULT '[]',
  ocorrencia_original_id TEXT REFERENCES ocorrencias(id),
  ocorrencia_anterior_id TEXT REFERENCES ocorrencias(id),
  follow_ups JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para busca eficiente
CREATE INDEX idx_ocorrencias_usuario ON ocorrencias(usuario_id);
CREATE INDEX idx_ocorrencias_original ON ocorrencias(ocorrencia_original_id);
CREATE INDEX idx_ocorrencias_status ON ocorrencias(status);
CREATE INDEX idx_ocorrencias_data ON ocorrencias(data DESC);
```

---

## 🚀 Próximos Passos

### **Fase 2: Relatórios de Histórico**

Criar visualização de histórico completo em `/components/Relatorios.tsx`:

```typescript
<OccurrenceHistoryTimeline 
  occurrenceId="marker_1729123456789"
  showEvolution={true}
  showPhotos={true}
  showProducts={true}
/>
```

### **Fase 3: Alertas Inteligentes**

```typescript
// Detectar tendências preocupantes
if (tendencia === 'piorando' && diasDesdeUltimaVisita > 14) {
  enviarAlerta({
    tipo: 'reinfestacao',
    severidade: 'alta',
    mensagem: 'Lagarta voltou a piorar após 2 semanas'
  });
}
```

### **Fase 4: Analytics e Insights**

- Taxa de sucesso de tratamentos por tipo de praga
- Tempo médio para controle
- Produtos mais eficazes
- Padrões sazonais de ocorrências

---

## ✅ Benefícios do Sistema

### **Para o Consultor**

✅ **Rastreabilidade completa**: Histórico de cada ocorrência  
✅ **Decisões baseadas em dados**: Evolução percentual clara  
✅ **Menos retrabalho**: Tipo e localização auto-preenchidos  
✅ **Documentação rica**: Fotos + produtos + recomendações  

### **Para o Produtor**

✅ **Transparência**: Ver evolução do controle  
✅ **Confiança**: Dados precisos de severidade  
✅ **ROI de tratamentos**: Produtos aplicados vs resultados  
✅ **Histórico de fazenda**: Padrões ao longo do tempo  

### **Para Relatórios**

✅ **Métricas precisas**: % de melhoria real  
✅ **Comparações**: Antes x Depois quantificado  
✅ **Tendências**: Gráficos de evolução temporal  
✅ **Compliance**: Registro completo para auditorias  

---

## 🎓 Casos de Uso Avançados

### **Caso 1: Comparação de Produtos**

```
Ocorrência A (Inseto):
  Visita 1: 100%
  Produto: Inseticida XYZ
  Visita 2: 20% (-80%)
  
Ocorrência B (Inseto, mesmo tipo):
  Visita 1: 100%
  Produto: Inseticida ABC
  Visita 2: 60% (-40%)
  
Conclusão: Inseticida XYZ foi 2x mais eficaz!
```

### **Caso 2: Alerta de Resistência**

```
Ocorrência C (Lagarta):
  Visita 1: 100%
  Produto: Inseticida XYZ
  Visita 2: 20% ✓
  Visita 3: 15% ✓
  Visita 4: 40% ⚠️ (reinfestação rápida)
  
Sistema alerta: "Possível resistência ao Inseticida XYZ"
Recomendação: "Alternar princípio ativo"
```

---

**Desenvolvido com 💙 para SoloForte Agro-Tech**  
**Rastreamento cronológico preciso para decisões produtivas no campo** 🌾
