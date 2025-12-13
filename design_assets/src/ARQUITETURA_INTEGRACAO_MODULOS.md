# 🔗 ARQUITETURA DE INTEGRAÇÃO DE MÓDULOS - SOLOFORTE

**Data:** 27 de outubro de 2025  
**Status:** Documentação Completa da Arquitetura

---

## 📋 ÍNDICE

1. [Visão Geral da Arquitetura](#visão-geral)
2. [Fluxo de Dados Entre Módulos](#fluxo-de-dados)
3. [Integrações Implementadas](#integrações-implementadas)
4. [Integrações Propostas](#integrações-propostas)
5. [Modelo de Dados Unificado](#modelo-de-dados)

---

## 🎯 VISÃO GERAL DA ARQUITETURA

### **Arquitetura Atual**

```
┌─────────────────────────────────────────────────────────┐
│                     SOLOFORTE APP                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐   ┌────────────┐ │
│  │   CLIENTES   │    │  RELATÓRIOS  │   │  DASHBOARD │ │
│  │  (Produtores)│◄──►│   (Reports)  │◄─►│   (Home)   │ │
│  └──────┬───────┘    └──────┬───────┘   └─────┬──────┘ │
│         │                   │                  │         │
│         │                   │                  │         │
│  ┌──────▼──────────────────▼──────────────────▼──────┐ │
│  │              STORAGE LAYER (LocalStorage)         │ │
│  │  - Produtores                                     │ │
│  │  - Talhões (Polígonos)                           │ │
│  │  - Ocorrências (Pragas, Doenças)                 │ │
│  │  - Check-ins/Visitas                             │ │
│  │  - Relatórios                                     │ │
│  │  - Diagnósticos de Pragas                        │ │
│  └───────────────────────────────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 FLUXO DE DADOS ENTRE MÓDULOS

### **1. PRODUTOR → TALHÕES (Mapas/Polígonos)**

#### **Estado Atual:**
- ✅ MapDrawing permite desenhar polígonos
- ✅ Polígonos são salvos no localStorage
- ❌ **Problema:** Polígonos NÃO estão vinculados ao produtor
- ❌ **Problema:** Não há seletor de produtor ao salvar polígono

#### **Estrutura Atual:**
```typescript
// MapDrawing salva assim:
localStorage.setItem('soloforte_polygons', JSON.stringify([
  {
    id: 'poly-123',
    name: 'Talhão A',
    points: [...],
    area: 50,
    createdAt: '2025-10-27',
    // ❌ FALTA: produtorId
    // ❌ FALTA: fazenda
    // ❌ FALTA: thumbnail
  }
]))
```

#### **Melhorias Propostas:**
```typescript
// ✅ NOVA ESTRUTURA:
interface Talhao {
  id: string;
  produtorId: string;        // 🆕 Vínculo com produtor
  produtorNome: string;      // 🆕 Nome do produtor
  fazenda: string;           // 🆕 Nome da fazenda
  nome: string;              // Nome do talhão
  area: number;              // Hectares
  cultura?: string;          // 🆕 Tipo de cultura
  points: Point[];           // Coordenadas do polígono
  thumbnail?: string;        // 🆕 Miniatura do mapa
  createdAt: string;
  updatedAt?: string;
}
```

#### **Fluxo Proposto:**
```
1. Usuário abre tela de Clientes
2. Seleciona um Produtor
3. Clica em "Desenhar Talhão"
   ↓
4. Abre MapDrawing com contexto do produtor
5. Desenha o polígono
6. Sistema gera miniatura do mapa
7. Salva talhão vinculado ao produtor
   ↓
8. Talhão aparece na lista do produtor
9. Relatórios filtram por produtor/talhão
```

---

### **2. CHECK-IN/OUT → PRODUTOR**

#### **Estado Atual:**
- ✅ CheckInOut funciona com geolocalização
- ✅ Permite registrar visitas com fotos e notas
- ⚠️ **Problema Parcial:** Tem campos cliente/propriedade mas não está integrado

#### **Estrutura Atual:**
```typescript
// CheckInOut salva assim:
interface Visit {
  id: string;
  type: 'checkin' | 'checkout';
  timestamp: string;
  location: { lat, lng, address };
  client?: string;     // ⚠️ String livre (não vinculado)
  property?: string;   // ⚠️ String livre (não vinculado)
  notes?: string;
  photo?: string;
  duration?: number;
}
```

#### **Melhorias Propostas:**
```typescript
// ✅ NOVA ESTRUTURA:
interface CheckInRecord {
  id: string;
  userId: string;
  produtorId: string;        // 🆕 ID do produtor (vinculado)
  produtorNome: string;      // 🆕 Nome do produtor
  fazenda: string;
  talhaoId?: string;         // 🆕 Talhão específico
  checkInTime: string;
  checkInLocation: LatLng;
  checkOutTime?: string;
  checkOutLocation?: LatLng;
  duration?: number;
  notas?: string;
  fotos?: string[];
  relatorioId?: string;      // 🆕 Vínculo com relatório gerado
}
```

#### **Fluxo Proposto:**
```
1. Usuário faz check-in em uma visita
2. Sistema sugere produtor baseado em localização
3. Usuário confirma produtor e fazenda
4. Durante a visita, pode:
   - Registrar ocorrências
   - Escanear pragas
   - Desenhar talhões
   - Tirar fotos
   ↓
5. Ao fazer check-out:
   - Calcula duração
   - Oferece gerar relatório automático
   - Vincula todas as atividades da visita
   ↓
6. Relatório é salvo vinculado ao produtor
7. Aparece no histórico do produtor
```

---

### **3. SCANNER DE PRAGAS → OCORRÊNCIAS → RELATÓRIOS**

#### **Estado Atual:**
- ✅ PestScanner analisa fotos com IA
- ✅ Gera diagnósticos detalhados
- ✅ Pode converter diagnóstico em ocorrência
- ⚠️ **Problema:** Conversão manual, não automática
- ❌ **Problema:** Ocorrências NÃO vinculam a produtor
- ❌ **Problema:** Não vai para relatórios automaticamente

#### **Estrutura Atual:**
```typescript
// PestScanner gera diagnóstico:
interface PestDiagnosis {
  id: string;
  imageUrl: string;
  pestName: string;
  scientificName: string;
  confidence: number;
  severity: 'baixa' | 'media' | 'alta';
  // ❌ FALTA: produtorId
  // ❌ FALTA: talhaoId
  // ❌ FALTA: location (GPS)
}

// Conversão para ocorrência:
interface OccurrenceMarker {
  id: string;
  lat: number;
  lng: number;
  tipo: 'inseto';
  severidade: 'baixa' | 'media' | 'alta';
  fotos?: string[];
  // ❌ FALTA: produtorId
  // ❌ FALTA: talhaoId
  // ❌ FALTA: relatorioId
}
```

#### **Melhorias Propostas:**
```typescript
// ✅ NOVA ESTRUTURA INTEGRADA:
interface OccurrenceMarker {
  id: string;
  produtorId: string;           // 🆕 Vínculo com produtor
  produtorNome: string;         // 🆕 Nome do produtor
  fazenda: string;              // 🆕 Fazenda
  talhaoId?: string;            // 🆕 Talhão específico
  talhaoNome?: string;          // 🆕 Nome do talhão
  lat: number;
  lng: number;
  tipo: TipoOcorrenciaType;
  severidade: SeveridadeType;
  severidadePercentual: number;
  fotos?: string[];
  notas?: string;
  data?: string;
  // Rastreamento
  status?: StatusOcorrencia;
  recomendacoes?: string;
  produtosAplicados?: string[];
  // Integração
  checkInId?: string;           // 🆕 Vínculo com check-in
  relatorioIds?: string[];      // 🆕 Relatórios que incluem esta ocorrência
  pestDiagnosisId?: string;     // 🆕 Diagnóstico IA original
}
```

#### **Fluxo Proposto:**
```
1. Técnico faz check-in no produtor
2. Encontra uma praga no talhão X
3. Abre Scanner de Pragas
4. Tira foto → IA analisa
   ↓
5. Sistema AUTOMATICAMENTE:
   - Captura GPS atual
   - Associa ao produtor do check-in
   - Associa ao talhão (se estiver dentro dele)
   - Cria ocorrência vinculada
   - Adiciona foto ao relatório
   ↓
6. Ao finalizar visita (check-out):
   - Gera relatório com todas as ocorrências
   - Relatório contém:
     * Miniatura do talhão
     * Pins das pragas no mapa
     * Fotos de cada ocorrência
     * Recomendações da IA
```

---

### **4. RELATÓRIOS → PRODUTOR**

#### **Estado Atual:**
- ✅ Sistema de relatórios existe
- ✅ Suporta diferentes tipos (técnico, visita, IA)
- ❌ **Problema:** Relatórios NÃO vinculam a produtor
- ❌ **Problema:** Não incluem mapas/talhões
- ❌ **Problema:** Não incluem ocorrências automaticamente

#### **Estrutura Atual:**
```typescript
// Relatorio básico:
interface Relatorio {
  id: number;
  tipo: string;
  titulo: string;
  cliente: string;  // ⚠️ String livre, não vinculado
  data: string;
  status: string;
  // ❌ FALTA: produtorId
  // ❌ FALTA: talhoes
  // ❌ FALTA: ocorrencias
  // ❌ FALTA: checkInId
}
```

#### **Melhorias Propostas:**
```typescript
// ✅ NOVA ESTRUTURA COMPLETA:
interface RelatorioCompleto {
  id: string;
  tipo: 'tecnico' | 'visita' | 'ia' | 'geral';
  titulo: string;
  produtorId: string;              // 🆕 ID do produtor
  produtorNome: string;            // 🆕 Nome do produtor
  fazenda: string;                 // 🆕 Fazenda
  checkInId?: string;              // 🆕 Vínculo com visita
  data: string;
  status: 'rascunho' | 'concluido';
  
  // Conteúdo do relatório
  resumo?: string;
  observacoes?: string;
  
  // Dados vinculados
  talhoes: {                       // 🆕 Talhões incluídos
    id: string;
    nome: string;
    area: number;
    thumbnail: string;             // 🆕 Miniatura do mapa
    cultura?: string;
  }[];
  
  ocorrencias: {                   // 🆕 Ocorrências registradas
    id: string;
    tipo: string;
    severidade: string;
    location: LatLng;
    fotos: string[];
    notas?: string;
    thumbnail?: string;            // 🆕 Miniatura do pin no mapa
  }[];
  
  fotos: string[];                 // 🆕 Fotos gerais da visita
  
  // Análises IA (se aplicável)
  analiseIA?: {
    diagnosticos: PestDiagnosis[];
    recomendacoes: string[];
  };
  
  // Métricas
  duracao?: number;                // Duração da visita (minutos)
  areaTotal?: number;              // Soma das áreas dos talhões
  ocorrenciasTotal?: number;       // Total de ocorrências
  
  createdAt: string;
  updatedAt?: string;
  geradoPor: string;               // userId do técnico
}
```

#### **Fluxo Proposto:**
```
OPÇÃO 1: Relatório Manual
1. Usuário acessa "Relatórios"
2. Clica em "Novo Relatório"
3. Seleciona tipo (Técnico, Visita, etc)
4. Seleciona produtor
5. Sistema carrega automaticamente:
   - Talhões do produtor
   - Check-ins recentes
   - Ocorrências recentes
   - Diagnósticos de pragas
6. Usuário personaliza e salva
   ↓
7. Relatório fica vinculado ao produtor

OPÇÃO 2: Relatório Automático (Check-out)
1. Técnico faz check-out de uma visita
2. Sistema detecta:
   - Talhões desenhados durante a visita
   - Ocorrências registradas
   - Pragas escaneadas
   - Fotos tiradas
   ↓
3. Oferece: "Gerar relatório automático?"
4. Se sim, cria relatório com:
   - Miniaturas dos talhões
   - Pins das ocorrências no mapa
   - Todas as fotos
   - Análises da IA
   - Recomendações
   ↓
5. Relatório é salvo e vinculado:
   - Ao produtor
   - Ao check-in
   - Às ocorrências
```

---

## 🗄️ MODELO DE DADOS UNIFICADO

### **Storage Keys (LocalStorage)**

```typescript
// Chaves atuais e novas
const STORAGE_KEYS = {
  // Existentes
  DEMO_MARKERS: 'soloforte_demo_markers',           // Ocorrências
  DEMO_POLYGONS: 'soloforte_polygons',              // Polígonos (talhões)
  CHECKINS: 'soloforte_checkins',                   // Check-ins
  PEST_DIAGNOSES: 'soloforte_pest_diagnoses',       // Diagnósticos IA
  
  // 🆕 Novos
  PRODUTORES: 'soloforte_produtores',               // Cadastro de produtores
  TALHOES: 'soloforte_talhoes',                     // Talhões vinculados
  RELATORIOS: 'soloforte_relatorios',               // Relatórios completos
  VISITAS: 'soloforte_visitas',                     // Histórico de visitas
} as const;
```

### **Relacionamentos**

```
PRODUTOR (1) ──────── (N) TALHÕES
    │                        │
    │                        │
    ├─── (N) CHECK-INS       │
    │         │              │
    │         └──── (N) OCORRÊNCIAS ──┐
    │                        │         │
    │                        │         │
    └─── (N) RELATÓRIOS ─────┴─────────┘
              │
              └─── (N) DIAGNÓSTICOS IA
```

### **Exemplo de Dados Vinculados**

```typescript
// 1. PRODUTOR
{
  id: 'prod-001',
  nome: 'João Silva',
  fazenda: 'Fazenda Boa Vista',
  email: 'joao@email.com',
  // ... outros campos
}

// 2. TALHÃO (vinculado ao produtor)
{
  id: 'talhao-001',
  produtorId: 'prod-001',          // ← Vínculo
  produtorNome: 'João Silva',
  fazenda: 'Fazenda Boa Vista',
  nome: 'Talhão A',
  area: 50,
  cultura: 'Soja',
  points: [...],
  thumbnail: 'data:image/png;base64...',  // ← Miniatura
}

// 3. CHECK-IN (vinculado ao produtor)
{
  id: 'checkin-001',
  produtorId: 'prod-001',          // ← Vínculo
  produtorNome: 'João Silva',
  fazenda: 'Fazenda Boa Vista',
  checkInTime: '2025-10-27T08:00:00',
  checkInLocation: { lat: -23.55, lng: -46.63 },
}

// 4. OCORRÊNCIA (vinculada ao produtor, talhão e check-in)
{
  id: 'occ-001',
  produtorId: 'prod-001',          // ← Vínculo
  talhaoId: 'talhao-001',          // ← Vínculo
  checkInId: 'checkin-001',        // ← Vínculo
  tipo: 'inseto',
  severidade: 'alta',
  fotos: ['photo1.jpg'],
  lat: -23.55,
  lng: -46.63,
  pestDiagnosisId: 'diag-001',     // ← Vínculo com IA
}

// 5. RELATÓRIO (vincula tudo)
{
  id: 'rel-001',
  produtorId: 'prod-001',          // ← Vínculo
  checkInId: 'checkin-001',        // ← Vínculo
  tipo: 'visita',
  talhoes: ['talhao-001'],         // ← Vincula talhões
  ocorrencias: ['occ-001'],        // ← Vincula ocorrências
  fotos: [...],
  thumbnail: 'data:image/png;base64...',  // ← Miniatura geral
}
```

---

## 🎨 MINIATURAS DE MAPAS (Thumbnails)

### **Quando Gerar:**

1. **Ao salvar talhão:** Captura do polígono desenhado
2. **Ao criar ocorrência:** Captura do pin no mapa
3. **Ao gerar relatório:** Captura geral de todos os elementos

### **Como Gerar:**

```typescript
async function generateMapThumbnail(
  element: HTMLElement,
  width: number = 300,
  height: number = 200
): Promise<string> {
  // Usa html2canvas ou similar
  const canvas = await html2canvas(element, {
    width,
    height,
    scale: 2, // Retina
  });
  
  return canvas.toDataURL('image/jpeg', 0.8);
}
```

### **Onde Usar:**

```
1. Lista de talhões → Mostra miniatura do polígono
2. Lista de ocorrências → Mostra pin no mapa
3. Relatórios → Mostra mapa completo com todos os elementos
4. Histórico de visitas → Mostra localização
```

---

## 📱 INTERFACE PROPOSTA

### **Tela de Produtor (Detalhes)**

```
┌─────────────────────────────────────┐
│ ← João Silva                     ⋮ │
├─────────────────────────────────────┤
│                                     │
│ 📍 Fazenda Boa Vista               │
│ 📧 joao@email.com                  │
│ 📱 (11) 98765-4321                 │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ TALHÕES (3)              [+ Novo]  │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ [🗺️ Miniatura]    Talhão A  │   │
│ │ 50 ha • Soja                │   │
│ │ 2 ocorrências ativas        │   │
│ └─────────────────────────────┘   │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ [🗺️ Miniatura]    Talhão B  │   │
│ │ 30 ha • Milho               │   │
│ │ Sem ocorrências             │   │
│ └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ VISITAS RECENTES                   │
│                                     │
│ • 27/10 - 2h 30min [Relatório]    │
│ • 20/10 - 1h 45min [Relatório]    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ OCORRÊNCIAS ATIVAS (2)             │
│                                     │
│ 🐛 Lagarta - Talhão A - Alta       │
│ 🍃 Ferrugem - Talhão A - Média     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ RELATÓRIOS (5)          [+ Novo]  │
│                                     │
│ • 27/10 - Visita Técnica          │
│ • 20/10 - Análise NDVI            │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **Fase 1: Integração Talhões → Produtor**
- [ ] Adicionar seletor de produtor no MapDrawing
- [ ] Vincular polígonos salvos ao produtorId
- [ ] Gerar miniatura ao salvar talhão
- [ ] Mostrar talhões na tela do produtor
- [ ] Permitir editar/excluir talhões

### **Fase 2: Integração Check-in → Produtor**
- [ ] Seletor de produtor no check-in
- [ ] Vincular visita ao produtorId
- [ ] Sugerir produtor baseado em GPS
- [ ] Mostrar histórico de visitas no produtor
- [ ] Calcular métricas (duração, frequência)

### **Fase 3: Integração Scanner → Ocorrências**
- [ ] Capturar GPS ao escanear praga
- [ ] Vincular diagnóstico ao produtorId do check-in ativo
- [ ] Auto-detectar talhão baseado em GPS
- [ ] Criar ocorrência automaticamente
- [ ] Gerar miniatura do pin no mapa

### **Fase 4: Integração Relatórios**
- [ ] Vincular relatórios ao produtorId
- [ ] Incluir talhões com miniaturas
- [ ] Incluir ocorrências com pins no mapa
- [ ] Gerar relatório automático no check-out
- [ ] Exportar PDF com mapas

### **Fase 5: Backend (Opcional)**
- [ ] Sincronizar com servidor
- [ ] Backup automático
- [ ] Compartilhamento de relatórios
- [ ] Histórico completo

---

## 🎯 BENEFÍCIOS DA INTEGRAÇÃO

### **Para o Técnico:**
✅ Contexto automático (sabe em qual produtor/talhão está)  
✅ Menos digitação manual  
✅ Relatórios gerados automaticamente  
✅ Histórico completo de cada visita  

### **Para o Produtor:**
✅ Visualiza todos os seus talhões  
✅ Vê histórico de visitas  
✅ Acompanha evolução das pragas  
✅ Recebe relatórios com mapas visuais  

### **Para a Empresa:**
✅ Dados organizados por produtor  
✅ Métricas de produtividade  
✅ Rastreabilidade completa  
✅ Compliance e auditoria  

---

## 📊 EXEMPLO DE RELATÓRIO INTEGRADO

```
╔════════════════════════════════════════════╗
║  RELATÓRIO DE VISITA TÉCNICA              ║
╠════════════════════════════════════════════╣
║                                            ║
║  Produtor: João Silva                     ║
║  Fazenda: Fazenda Boa Vista               ║
║  Data: 27/10/2025                         ║
║  Duração: 2h 30min                        ║
║                                            ║
╠════════════════════════════════════════════╣
║  TALHÕES VISITADOS                        ║
║                                            ║
║  1. Talhão A - 50 ha (Soja)              ║
║     [🗺️ Miniatura do polígono]           ║
║                                            ║
║     Ocorrências:                          ║
║     • 🐛 Lagarta (Alta) - [📍 Mapa]      ║
║       [📷 Foto 1] [📷 Foto 2]            ║
║       Recomendação IA: Inseticida X       ║
║                                            ║
║     • 🍃 Ferrugem (Média) - [📍 Mapa]    ║
║       [📷 Foto 1]                         ║
║       Recomendação IA: Fungicida Y        ║
║                                            ║
║  2. Talhão B - 30 ha (Milho)             ║
║     [🗺️ Miniatura do polígono]           ║
║     Sem ocorrências                       ║
║                                            ║
╠════════════════════════════════════════════╣
║  RESUMO                                   ║
║                                            ║
║  Área total: 80 ha                        ║
║  Ocorrências: 2 (1 alta, 1 média)        ║
║  Fotos: 3                                 ║
║  Diagnósticos IA: 2                       ║
║                                            ║
╠════════════════════════════════════════════╣
║  OBSERVAÇÕES                              ║
║                                            ║
║  [Campo de texto livre...]                ║
║                                            ║
╠════════════════════════════════════════════╣
║  Técnico: Maria Santos                    ║
║  Assinatura: ________________             ║
║                                            ║
╚════════════════════════════════════════════╝
```

---

**Última atualização:** 27/10/2025  
**Próximo passo:** Implementar Fase 1 - Integração Talhões → Produtor
