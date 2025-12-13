# 📋 PRD - Módulo "Publicar" (Cases de Sucesso)
## Product Requirements Document - Modelo Replicável

**Versão**: 2.0.0  
**Data**: 1 de Novembro de 2025  
**Status**: ✅ Implementado e Funcionando  
**Autor**: SoloForte Team  
**Tipo**: Documentação Técnica + Guia de Replicação

---

## 📑 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Objetivos e Valor](#objetivos-e-valor)
3. [Especificações Técnicas](#especificações-técnicas)
4. [Arquitetura e Componentes](#arquitetura-e-componentes)
5. [Fluxos de Usuário](#fluxos-de-usuário)
6. [Interface e Design](#interface-e-design)
7. [Modelo de Monetização](#modelo-de-monetização)
8. [Guia de Replicação Passo a Passo](#guia-de-replicação-passo-a-passo)
9. [Checklist de Implementação](#checklist-de-implementação)
10. [Troubleshooting](#troubleshooting)

---

## 📊 VISÃO GERAL

### O Que É?

**Módulo Publicar** (antigo Marketing) é um sistema de **gestão visual de cases de sucesso agro-tech** com georreferenciamento, permitindo que consultores, vendedores e técnicos agrícolas **compartilhem resultados tangíveis** de suas recomendações/produtos através de:

- 📸 **Fotos Antes/Depois** ou **Fotos de Resultado**
- 📍 **Pins no Mapa** com informações visuais
- 📊 **Métricas de Impacto** (produtividade, economia, etc)
- 🎯 **Campanhas Organizadas** por safra/produto
- 💰 **Modelo de Monetização** por tamanho de pin (Small/Medium/Large)

### Problema Que Resolve

**ANTES** ❌:
- Cases de sucesso em planilhas perdidas
- Fotos desorganizadas no WhatsApp
- Sem contexto geográfico dos resultados
- Difícil provar ROI para clientes
- Impossível visualizar cobertura regional

**DEPOIS** ✅:
- Cases visuais no mapa (georreferenciados)
- Comparações Antes/Depois impactantes
- Métricas claras ("+38% produtividade", "R$ 22k economizados")
- Biblioteca organizada por campanha
- Monetização por destaque (pins grandes = premium)

### Público-Alvo

1. **Consultores Agronômicos** - Mostram resultados para clientes
2. **Vendedores de Insumos** - Comprovam eficácia de produtos
3. **Técnicos de Campo** - Documentam progressos
4. **Gestores Regionais** - Visualizam cobertura geográfica
5. **Marketing Agro-Tech** - Criam conteúdo de sucesso

---

## 🎯 OBJETIVOS E VALOR

### Objetivos de Negócio

| Objetivo | Métrica | Meta |
|----------|---------|------|
| Aumentar conversão de vendas | Taxa de fechamento | +25% |
| Provar ROI de produtos | Cases documentados | 100+ por trimestre |
| Expandir cobertura regional | Área geográfica | +30% |
| Gerar receita recorrente | Assinaturas premium | R$ 50k/mês |
| Reduzir churn de clientes | Retenção | +15% |

### Valor Para o Usuário

#### 💼 Valor Profissional
- ✅ Portfólio visual de resultados
- ✅ Credibilidade com dados reais
- ✅ Ferramenta de venda consultiva
- ✅ Organização de cases por campanha

#### 📈 Valor Estratégico
- ✅ Insights geográficos (onde funciona melhor)
- ✅ Benchmark de resultados por região
- ✅ Identificação de gaps de cobertura
- ✅ Previsibilidade de ROI

#### 🎨 Valor Emocional
- ✅ Orgulho de mostrar resultados tangíveis
- ✅ Reconhecimento por bons cases
- ✅ Simplicidade de compartilhar conquistas

---

## 🔧 ESPECIFICAÇÕES TÉCNICAS

### Stack Tecnológico

```typescript
// Frontend
React 18+ + TypeScript
Tailwind CSS v4.0
ShadCN UI Components

// Mapa
MapTiler (satelital)
Leaflet.js (markers customizados)

// Storage
Capacitor Storage (offline-first)
Base64 para imagens (ou Capacitor Camera URLs)

// State Management
React Hooks (useState, useEffect, useMemo, useCallback)
Zustand (opcional para global state)

// UI/UX
Sonner (toast notifications)
Lucide Icons
Motion/React (animações)
```

### Estrutura de Dados

#### 1️⃣ **ResultCase** (Case de Sucesso)

```typescript
interface ResultCase {
  // Identificação
  id: string;                         // UUID
  createdBy?: string;                 // ID do usuário criador
  
  // Tipo e Tamanho (Monetização)
  type: 'antes-depois' | 'resultado'; // Tipo de case
  cardSize: 'small' | 'medium' | 'large'; // Tamanho do pin (plano)
  
  // Localização
  lat: number;                        // Latitude GPS
  lng: number;                        // Longitude GPS
  location: string;                   // Nome da cidade/fazenda
  
  // Mídia
  photoBefore?: string;               // Base64 ou URL (tipo 'antes-depois')
  photoAfter?: string;                // Base64 ou URL (tipo 'antes-depois')
  photoResult?: string;               // Base64 ou URL (tipo 'resultado')
  
  // Informações do Produtor
  producer: string;                   // Nome da fazenda/produtor
  
  // Produto/Serviço
  product: string;                    // Nome do produto/serviço
  productDetail?: string;             // Detalhes (ex: "material olimpo")
  
  // Vendedor/Consultor
  seller: {
    name: string;                     // Nome do vendedor
    phone: string;                    // Telefone de contato
    company: string;                  // Empresa
  };
  
  // Resultados
  results: {
    // Para tipo 'antes-depois'
    productivity?: string;            // Ex: "+38% produtividade"
    productivityValue?: string;       // Ex: "80" (numérico)
    productivityUnit?: string;        // Ex: "sc/ha"
    
    // Para tipo 'resultado'
    quantity?: string;                // Ex: "100"
    unit?: string;                    // Ex: "sacas", "toneladas"
    metric?: string;                  // Ex: "produção", "rendimento"
    
    // Comuns
    economy?: string;                 // Ex: "R$ 15.000 economizados"
    period?: string;                  // Ex: "90 dias", "6 meses"
  };
  
  // Descrição e Metadados
  description: string;                // Descrição detalhada do case
  date: string;                       // Data de criação (ISO 8601)
  campaign: string;                   // Nome da campanha/safra
  views: number;                      // Número de visualizações
}
```

#### 2️⃣ **FormData** (Estado do Formulário)

```typescript
interface FormData {
  producer: string;
  location: string;
  product: string;
  productDetail: string;
  
  sellerName: string;
  sellerPhone: string;
  sellerCompany: string;
  
  productivity: string;
  productivityValue: string;
  productivityUnit: string;
  
  economy: string;
  period: string;
  description: string;
  campaign: string;
  
  quantity: string;
  unit: string;
  metric: string;
}
```

### Capacitor Plugins Necessários

```bash
# Geolocalização
npm install @capacitor/geolocation

# Câmera
npm install @capacitor/camera

# Storage Persistente
npm install @capacitor/preferences
```

### APIs e Integrações

1. **MapTiler API** (Mapa Satelital)
   - Endpoint: `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg`
   - Autenticação: API Key via env
   - Rate Limit: 100k requests/mês (free tier)

2. **Geolocation API** (Nativa do Browser)
   ```javascript
   navigator.geolocation.getCurrentPosition(
     (position) => { /* success */ },
     (error) => { /* fallback */ }
   )
   ```

3. **Capacitor Camera API**
   ```typescript
   import { Camera } from '@capacitor/camera';
   const photo = await Camera.getPhoto({
     quality: 90,
     resultType: CameraResultType.Base64
   });
   ```

---

## 🏗️ ARQUITETURA E COMPONENTES

### Estrutura de Arquivos

```
/components
├── Marketing.tsx                    # ✅ Componente principal (renomear para Publicar.tsx)
├── MapTilerComponent.tsx            # ✅ Mapa satelital reutilizável
├── CameraCapture.tsx                # ✅ Wrapper da câmera
└── /shared
    └── LoadingScreen.tsx            # ✅ Loading state

/utils
├── /storage
│   └── capacitor-storage.ts         # ✅ Storage wrapper
└── constants.ts                     # ✅ Z_INDEX, STORAGE_KEYS

/types
└── index.ts                         # ✅ Interfaces globais
```

### Componentes Principais

#### 1️⃣ **Marketing.tsx** (Componente Principal)

**Responsabilidades**:
- ✅ Renderizar mapa fullscreen
- ✅ Gerenciar estado de cases
- ✅ Criar/editar/deletar cases
- ✅ Renderizar pins customizados no mapa
- ✅ Abrir modais de detalhes/formulário
- ✅ Busca e filtro de cases

**Estados Principais**:
```typescript
const [cases, setCases] = useState<ResultCase[]>([]); // Lista de cases
const [selectedCase, setSelectedCase] = useState<ResultCase | null>(null); // Case aberto
const [showAddCase, setShowAddCase] = useState(false); // Modal de adicionar
const [showCamera, setShowCamera] = useState(false); // Câmera aberta
const [caseType, setCaseType] = useState<'antes-depois' | 'resultado'>('antes-depois');
const [cardSize, setCardSize] = useState<'small' | 'medium' | 'large'>('medium');
const [searchQuery, setSearchQuery] = useState(''); // Busca
const [formData, setFormData] = useState<FormData>({ /* ... */ });
```

**Hooks Utilizados**:
- `useState` - Estados locais
- `useEffect` - Side effects (GPS, renderizar pins)
- `useMemo` - Filtro de cases (performance)
- `useCallback` - Funções memorizadas (editar, deletar)
- `useRef` - Referência do mapa (`mapInstanceRef`)

#### 2️⃣ **MapTilerComponent.tsx** (Mapa Reutilizável)

**Props**:
```typescript
interface MapTilerComponentProps {
  center: [number, number];        // [lat, lng]
  zoom: number;                    // Nível de zoom inicial
  minZoom?: number;
  maxZoom?: number;
  onMapReady: () => void;          // Callback quando mapa carrega
  hideControls?: boolean;          // Esconder controles de zoom
}
```

**Funcionalidades**:
- ✅ Carrega Leaflet.js assíncrono
- ✅ Renderiza mapa satelital MapTiler
- ✅ Expõe instância do mapa via ref
- ✅ Controles de zoom/pan
- ✅ Fallback para erro de carregamento

#### 3️⃣ **CameraCapture.tsx** (Câmera)

**Props**:
```typescript
interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void; // Callback com Base64
  onClose: () => void;                       // Fechar câmera
}
```

**Funcionalidades**:
- ✅ Integração com Capacitor Camera
- ✅ Modo foto (não vídeo)
- ✅ Qualidade 90%
- ✅ Retorna Base64
- ✅ Fallback para input file (web)

### Fluxo de Dados

```
┌────────────────────────────────────────────────────────────┐
│                       MARKETING.TSX                        │
│                    (Estado Central)                        │
└────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  MapTiler       │  │  CameraCapture  │  │  Dialog         │
│  (Mapa)         │  │  (Fotos)        │  │  (Modais)       │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌────────────────────────────────────────────────────────────┐
│                   CAPACITOR STORAGE                        │
│              (Persistência Local - Offline)                │
└────────────────────────────────────────────────────────────┘
```

### Padrões Arquiteturais

#### 🎯 **Single Responsibility Principle**
- Cada componente tem **1 responsabilidade clara**
- MapTiler = Apenas mapa
- CameraCapture = Apenas câmera
- Marketing = Orquestração e estado

#### 🔄 **Unidirectional Data Flow**
- Dados fluem de **pai → filho** (props)
- Eventos fluem de **filho → pai** (callbacks)
- Estado centralizado no componente principal

#### 📦 **Composition Over Inheritance**
- Componentes compostos de componentes menores
- Sem herança de classe
- Functional components + hooks

#### ⚡ **Performance Optimization**
- `useMemo` para filtros pesados
- `useCallback` para callbacks estáveis
- `memo()` para evitar re-renders
- Lazy loading de imagens

---

## 🎨 INTERFACE E DESIGN

### Layout Principal

```
┌─────────────────────────────────────────────────────────┐
│ ← Voltar                    [Busca] [👤]     [Filtro]  │ ← Header (60px)
├─────────────────────────────────────────────────────────┤
│                                                         │
│                                                         │
│                   🗺️ MAPA SATELITAL                    │
│                                                         │
│     📌 [Small]    📌 [Medium]     📌 [Large]           │ ← Pins com tamanhos
│                                                         │
│        ★ Premium      +38%          R$ 22k             │ ← Badges nos pins
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           [+]                             ← FAB (adicionar case)
```

### Design System

#### 🎨 **Paleta de Cores**

```css
/* Cores Principais */
--primary: #0057FF;          /* Azul SoloForte (botões, FAB) */
--primary-dark: #0046CC;     /* Hover/Active */
--primary-light: #3378FF;    /* Backgrounds sutis */

/* Badges de Resultado */
--success: #10b981;          /* Verde (produtividade positiva) */
--warning: #f59e0b;          /* Âmbar (economia/dinheiro) */
--info: #3b82f6;             /* Azul (redução/economia água) */
--purple: #6366f1;           /* Roxo/Indigo (tipo 'resultado') */

/* Premium */
--gold: linear-gradient(135deg, #FFD700, #FFA500); /* Badge premium */

/* Neutros */
--background: #ffffff;
--foreground: #000000;
--muted: #f3f4f6;
--border: #e5e7eb;
```

#### 📐 **Tamanhos de Pin (Monetização)**

| Tamanho | Width | Height | Icon Size | Plano | Preço/mês |
|---------|-------|--------|-----------|-------|-----------|
| **Small** | 90px | 90px | 98x110px | Básico | R$ 0 (grátis) |
| **Medium** | 120px | 120px | 128x140px | Padrão | R$ 99 |
| **Large** | 150px | 150px | 158x170px | Premium | R$ 249 |

**Diferenças Visuais**:
- ✅ **Small**: Pin discreto, sem badge premium, fonte menor
- ✅ **Medium**: Pin padrão, boa visibilidade, fonte média
- ✅ **Large**: Pin destaque, badge "★ Premium", fonte grande, borda mais grossa

#### 🖼️ **Anatomia de um Pin**

```html
<!-- Pin no Mapa -->
<div class="pin-container">
  <!-- Balão com Foto -->
  <div class="pin-balloon" style="width: {size}px; height: {size}px;">
    <!-- Foto de Fundo -->
    <img src="{photo}" />
    
    <!-- Badge Premium (apenas LARGE) -->
    <div class="premium-badge">★ Premium</div>
    
    <!-- Nome do Produtor (topo) -->
    <div class="producer-name">Fazenda Santa Rita</div>
    
    <!-- Resultado (bottom) -->
    <div class="result-badge" style="background: {color};">
      +38%
    </div>
  </div>
  
  <!-- Pontinha do Balão -->
  <div class="pin-tip"></div>
</div>
```

**Cores do Badge de Resultado**:
- 🟢 **Verde** (`#10b981`): Produtividade positiva (ex: "+38%")
- 🟡 **Âmbar** (`#f59e0b`): Economia em dinheiro (ex: "R$ 22k")
- 🔵 **Azul** (`#3b82f6`): Redução/economia (ex: "-65% água")
- 🟣 **Roxo** (`#6366f1`): Tipo 'resultado' (ex: "75 sc/ha")

### Modal de Detalhes do Case

```
┌──────────────────────────────────────────────────┐
│  📷 Fazenda Santa Rita                     [X]   │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────┐    ┌──────────────┐           │
│  │              │    │              │           │
│  │   ANTES      │    │   DEPOIS     │           │ ← Fotos lado a lado
│  │              │    │              │           │
│  └──────────────┘    └──────────────┘           │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ 🎯 RESULTADOS                           │    │
│  ├─────────────────────────────────────────┤    │
│  │ 📈 +38% produtividade                   │    │
│  │ 💰 R$ 22.000 economizados               │    │
│  │ ⏱️  120 dias de acompanhamento          │    │
│  │ 🌾 80 sc/ha (rendimento final)          │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  📦 Produto: Soja Olimpo (material olimpo)      │
│  📍 Jataizinho - PR                              │
│  📅 15/10/2025                                   │
│  🏢 Campanha: Safra Verão 2025                   │
│                                                  │
│  "Aplicação de fertilizante de liberação        │
│   controlada resultou em aumento significativo   │
│   na produtividade da safra de soja."           │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ 👤 VENDEDOR                             │    │
│  │ Carlos Silva - AgroTech Solutions       │    │
│  │ 📞 (43) 99876-5432                      │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ 👁️ 3.421│  │ 🔗  411 │  │ Editar  │         │ ← Métricas + Ações
│  │ Alcance │  │ Compart.│  │         │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                  │
│  [ Compartilhar WhatsApp ]  [ 🗑️ Excluir ]      │
└──────────────────────────────────────────────────┘
```

### Modal de Adicionar/Editar Case

```
┌──────────────────────────────────────────────────┐
│  ➕ Novo Case de Sucesso                   [X]   │
├──────────────────────────────────────────────────┤
│                                                  │
│  1️⃣ TIPO DE CASE                                 │
│  ⚪ Antes/Depois    ⚫ Resultado Único            │ ← Tabs
│                                                  │
│  2️⃣ TAMANHO DO PIN (PLANO)                       │
│  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │ 90px │  │120px │  │150px │                   │
│  │BASIC │  │PADRÃO│  │★ PREM│                   │ ← Cards de tamanho
│  │ R$ 0 │  │ R$99 │  │ R$249│                   │
│  └──────┘  └──────┘  └──────┘                   │
│     ○          ●          ○                      │
│                                                  │
│  3️⃣ FOTOS                                        │
│  ┌──────────────┐    ┌──────────────┐           │
│  │ [ANTES]      │    │ [DEPOIS]     │           │
│  │  📷 Tirar    │    │  📷 Tirar    │           │ ← Botões de câmera
│  └──────────────┘    └──────────────┘           │
│                                                  │
│  4️⃣ INFORMAÇÕES                                  │
│  Produtor/Fazenda *                              │
│  └─ Fazenda Santa Rita                           │
│                                                  │
│  Cidade/Região                                   │
│  └─ Jataizinho - PR                              │
│                                                  │
│  Produto Utilizado *                             │
│  └─ Soja Olimpo                                  │
│                                                  │
│  Detalhes do Produto                             │
│  └─ material olimpo                              │
│                                                  │
│  5️⃣ VENDEDOR/CONSULTOR                           │
│  Nome *                                          │
│  └─ Carlos Silva                                 │
│                                                  │
│  Telefone                                        │
│  └─ (43) 99876-5432                              │
│                                                  │
│  Empresa                                         │
│  └─ AgroTech Solutions                           │
│                                                  │
│  6️⃣ RESULTADOS                                   │
│  Produtividade                                   │
│  └─ +38% produtividade                           │
│                                                  │
│  Valor (numérico) │ Unidade                      │
│  └─ 80            │ sc/ha  ▼                     │ ← Select de unidades
│                                                  │
│  Economia                                        │
│  └─ R$ 22.000 economizados                       │
│                                                  │
│  Período de Acompanhamento                       │
│  └─ 120 dias                                     │
│                                                  │
│  7️⃣ DESCRIÇÃO                                    │
│  ┌────────────────────────────────────────┐     │
│  │ Aplicação de fertilizante de           │     │
│  │ liberação controlada resultou em       │     │ ← Textarea
│  │ aumento significativo...               │     │
│  └────────────────────────────────────────┘     │
│                                                  │
│  Campanha/Safra                                  │
│  └─ Safra Verão 2025                             │
│                                                  │
│  📍 Localização GPS: Automática (GPS atual)      │
│                                                  │
│  ┌─────────────┐  ┌─────────────┐               │
│  │  Cancelar   │  │  💾 Salvar  │               │ ← Ações
│  └─────────────┘  └─────────────┘               │
└──────────────────────────────────────────────────┘
```

### Responsividade Mobile

**Breakpoints**:
- **280px - 360px**: Celulares pequenos (iPhone SE, Android básico)
- **360px - 390px**: Celulares padrão (maioria)
- **390px - 430px**: Celulares grandes (iPhone 15 Pro Max)

**Ajustes por Tamanho**:
```typescript
// Exemplo de responsividade no código
const getPinSize = (screenWidth: number, cardSize: 'small' | 'medium' | 'large') => {
  if (screenWidth < 360) {
    // Celulares pequenos: reduzir 20%
    return {
      small: 72,   // 90 * 0.8
      medium: 96,  // 120 * 0.8
      large: 120   // 150 * 0.8
    }[cardSize];
  }
  
  return {
    small: 90,
    medium: 120,
    large: 150
  }[cardSize];
};
```

### Animações e Interações

```css
/* Hover no Pin (desktop preview) */
.case-pin-marker:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.5));
  transition: all 0.2s ease;
}

/* Tap no Pin (mobile) */
.case-pin-marker:active {
  transform: scale(0.98);
  transition: all 0.1s ease;
}

/* FAB Pulse */
.fab {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 87, 255, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(0, 87, 255, 0); }
}

/* Modal Slide Up */
.modal-enter {
  transform: translateY(100%);
  opacity: 0;
}

.modal-enter-active {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.3s ease-out;
}
```

---

## 💰 MODELO DE MONETIZAÇÃO

### Planos de Assinatura

| Plano | Preço/mês | Pins Incluídos | Tamanho Máximo | Features |
|-------|-----------|----------------|----------------|----------|
| **🆓 Básico** | R$ 0 | 10 | Small (90px) | - Pins pequenos<br>- Sem badge premium<br>- 10 cases/mês |
| **💼 Padrão** | R$ 99 | 50 | Medium (120px) | - Pins médios<br>- Busca avançada<br>- 50 cases/mês<br>- Analytics básico |
| **⭐ Premium** | R$ 249 | Ilimitado | Large (150px) | - Pins grandes<br>- Badge "★ Premium"<br>- Cases ilimitados<br>- Analytics avançado<br>- Exportar PDF<br>- Prioridade suporte |
| **🏢 Empresarial** | R$ 999 | Ilimitado | Large (150px) | - Multi-usuários<br>- White label<br>- API access<br>- Treinamento<br>- Gerente de conta |

### Lógica de Upgrade

```typescript
// Verificar limite do plano
const canAddCase = (currentPlan: 'basic' | 'standard' | 'premium', casesThisMonth: number): boolean => {
  const limits = {
    basic: 10,
    standard: 50,
    premium: Infinity
  };
  
  return casesThisMonth < limits[currentPlan];
};

// Bloquear tamanho de pin
const canUseCardSize = (currentPlan: 'basic' | 'standard' | 'premium', size: 'small' | 'medium' | 'large'): boolean => {
  const maxSizes = {
    basic: 'small',
    standard: 'medium',
    premium: 'large'
  };
  
  const sizeOrder = ['small', 'medium', 'large'];
  const maxIndex = sizeOrder.indexOf(maxSizes[currentPlan]);
  const selectedIndex = sizeOrder.indexOf(size);
  
  return selectedIndex <= maxIndex;
};
```

### Estratégia de Conversão

1. **Freemium** → Premium
   - Mostrar preview de pins grandes
   - "Upgrade para destacar seus cases"
   - Trial de 7 dias grátis

2. **Padrão** → Premium
   - "Seus melhores cases merecem destaque"
   - Analytics mostrando potencial de impacto
   - Caso de sucesso de clientes premium

3. **Upsell Features**
   - Exportar PDF: R$ 29 (one-time)
   - Analytics avançado: R$ 49/mês
   - White label: R$ 199/mês

### Gamificação

```typescript
// Sistema de badges e conquistas
interface Achievement {
  id: string;
  name: string;
  description: string;
  reward: string; // "Upgrade grátis por 1 mês"
}

const achievements: Achievement[] = [
  {
    id: 'first_case',
    name: '🎯 Primeiro Case',
    description: 'Publique seu primeiro case de sucesso',
    reward: '1 pin Large grátis'
  },
  {
    id: 'ten_cases',
    name: '🔥 10 Cases',
    description: 'Publique 10 cases em um mês',
    reward: 'Upgrade para Padrão por 1 mês'
  },
  {
    id: 'viral_case',
    name: '🚀 Case Viral',
    description: 'Tenha um case com 5.000+ visualizações',
    reward: '3 pins Large grátis'
  }
];
```

---

## 📖 GUIA DE REPLICAÇÃO PASSO A PASSO

### 🎯 Objetivo
Ensinar como **replicar este módulo** para criar novos módulos similares (ex: Eventos, Treinamentos, Fazendas Visitadas, etc).

### 🛠️ PASSO 1: Preparação

#### 1.1 - Definir o Conceito

**Perguntas a responder**:
- ❓ Qual o objetivo do módulo? (Ex: "Gerenciar eventos agro-tech")
- ❓ O que será plotado no mapa? (Ex: "Locais de eventos")
- ❓ Quais dados cada pin terá? (Ex: "Título, data, participantes")
- ❓ Haverá monetização? (Ex: "Pins grandes para eventos patrocinados")

**Exemplo: Módulo "Eventos"**
```
Objetivo: Gerenciar eventos, workshops, feiras agro-tech
Pin: Local do evento com foto, data, participantes
Dados: Título, descrição, organizador, capacidade, inscritos
Monetização: Pins grandes para eventos patrocinados
```

#### 1.2 - Definir a Interface de Dados

```typescript
// Exemplo: Módulo Eventos
interface EventPin {
  id: string;
  type: 'workshop' | 'feira' | 'dia-campo';
  cardSize: 'small' | 'medium' | 'large';
  
  lat: number;
  lng: number;
  location: string;
  
  photo: string;
  title: string;
  description: string;
  
  organizer: {
    name: string;
    company: string;
    phone: string;
  };
  
  event: {
    date: string;          // Data do evento
    capacity: number;      // Capacidade
    registered: number;    // Inscritos
    status: 'aberto' | 'lotado' | 'encerrado';
  };
  
  category: string;        // Categoria do evento
  views: number;
  createdBy?: string;
}
```

#### 1.3 - Criar Pasta e Arquivos

```bash
# Estrutura de arquivos
/components
├── Eventos.tsx              # ← Componente principal (COPIAR de Marketing.tsx)
├── MapTilerComponent.tsx    # ✅ Já existe (reutilizar)
└── CameraCapture.tsx        # ✅ Já existe (reutilizar)

/types
└── eventos.ts               # ← Interface EventPin
```

---

### 🛠️ PASSO 2: Copiar e Adaptar o Componente

#### 2.1 - Copiar Marketing.tsx

```bash
# No terminal
cd components
cp Marketing.tsx Eventos.tsx
```

#### 2.2 - Renomear Funções e Estados

**ANTES** (Marketing.tsx):
```typescript
export default function Publicacao({ navigate }: PublicacaoProps) {
  const [cases, setCases] = useState<ResultCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<ResultCase | null>(null);
  const [showAddCase, setShowAddCase] = useState(false);
  // ...
}
```

**DEPOIS** (Eventos.tsx):
```typescript
export default function Eventos({ navigate }: EventosProps) {
  const [events, setEvents] = useState<EventPin[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventPin | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  // ...
}
```

**Substituições Automáticas** (Find & Replace):
```
ResultCase → EventPin
cases → events
case → event
showAddCase → showAddEvent
selectedCase → selectedEvent
```

#### 2.3 - Atualizar Interface de Dados

```typescript
// REMOVER (do Marketing.tsx)
interface ResultCase {
  type: 'antes-depois' | 'resultado';
  photoBefore?: string;
  photoAfter?: string;
  // ...
}

// ADICIONAR (Eventos.tsx)
interface EventPin {
  type: 'workshop' | 'feira' | 'dia-campo';
  photo: string; // Apenas 1 foto
  event: {
    date: string;
    capacity: number;
    registered: number;
    status: 'aberto' | 'lotado' | 'encerrado';
  };
  // ...
}
```

#### 2.4 - Atualizar Dados Demo

```typescript
// Marketing.tsx (ANTES)
const [cases, setCases] = useState<ResultCase[]>([
  {
    id: '1',
    type: 'antes-depois',
    photoBefore: 'https://...',
    photoAfter: 'https://...',
    // ...
  }
]);

// Eventos.tsx (DEPOIS)
const [events, setEvents] = useState<EventPin[]>([
  {
    id: '1',
    type: 'workshop',
    photo: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', // Evento
    title: 'Workshop Soja Tecnológica',
    location: 'Londrina - PR',
    lat: -23.3045,
    lng: -51.1696,
    organizer: {
      name: 'João Mendes',
      company: 'AgroEventos',
      phone: '(43) 99123-4567'
    },
    event: {
      date: '2025-11-15',
      capacity: 50,
      registered: 38,
      status: 'aberto'
    },
    description: 'Workshop sobre manejo de soja com palestrantes renomados.',
    category: 'Capacitação',
    views: 1234,
    cardSize: 'medium'
  }
]);
```

---

### 🛠️ PASSO 3: Customizar Renderização dos Pins

#### 3.1 - Localizar Código de Renderização de Pins

No arquivo original (Marketing.tsx), procure por:
```typescript
// Linha ~283 (pode variar)
useEffect(() => {
  if (!mapReady || !mapInstanceRef.current || !(window as any).L) {
    return;
  }
  
  // ... código de renderização de pins
  filteredCases.forEach(caseItem => {
    const marker = L.marker([caseItem.lat, caseItem.lng], {
      icon: L.divIcon({
        html: `<!-- HTML do pin -->`
      })
    });
  });
}, [filteredCases, mapReady]);
```

#### 3.2 - Adaptar HTML do Pin

**Marketing.tsx** (Case de Sucesso):
```html
<!-- Pin de Case -->
<div style="width: {size}px; height: {size}px;">
  <img src="{photoAfter}" />
  <div class="result-badge">+38%</div>
  <div class="producer-name">Fazenda Santa Rita</div>
</div>
```

**Eventos.tsx** (Evento):
```html
<!-- Pin de Evento -->
<div style="width: {size}px; height: {size}px;">
  <img src="{event.photo}" />
  
  <!-- Badge de Status -->
  <div class="status-badge" style="background: {statusColor};">
    {event.event.status === 'aberto' ? '✅ ABERTO' : '🔴 LOTADO'}
  </div>
  
  <!-- Data do Evento -->
  <div class="event-date">
    📅 {formatDate(event.event.date)}
  </div>
  
  <!-- Vagas Disponíveis -->
  <div class="event-capacity">
    {event.event.registered}/{event.event.capacity} inscritos
  </div>
</div>
```

#### 3.3 - Cores Dinâmicas por Status

```typescript
// Determinar cor do badge baseado no status
const getBadgeColor = (status: string): string => {
  switch (status) {
    case 'aberto':
      return 'rgba(16, 185, 129, 0.95)'; // Verde
    case 'lotado':
      return 'rgba(239, 68, 68, 0.95)';  // Vermelho
    case 'encerrado':
      return 'rgba(107, 114, 128, 0.95)'; // Cinza
    default:
      return 'rgba(59, 130, 246, 0.95)'; // Azul
  }
};

// Usar no HTML do pin
const badgeColor = getBadgeColor(event.event.status);
```

---

### 🛠️ PASSO 4: Adaptar Formulário de Criação

#### 4.1 - Atualizar FormData

**Marketing.tsx** (ANTES):
```typescript
const [formData, setFormData] = useState({
  producer: '',
  product: '',
  productivity: '',
  economy: '',
  // ...
});
```

**Eventos.tsx** (DEPOIS):
```typescript
const [formData, setFormData] = useState({
  title: '',
  description: '',
  organizerName: '',
  organizerCompany: '',
  organizerPhone: '',
  eventDate: '',
  capacity: '50',
  category: 'workshop',
  // ...
});
```

#### 4.2 - Atualizar JSX do Modal

**Marketing.tsx** (Formulário de Case):
```tsx
<Label>Produtor/Fazenda</Label>
<Input 
  value={formData.producer}
  onChange={(e) => setFormData({...formData, producer: e.target.value})}
/>

<Label>Produto Utilizado</Label>
<Input 
  value={formData.product}
  onChange={(e) => setFormData({...formData, product: e.target.value})}
/>
```

**Eventos.tsx** (Formulário de Evento):
```tsx
<Label>Título do Evento</Label>
<Input 
  value={formData.title}
  onChange={(e) => setFormData({...formData, title: e.target.value})}
/>

<Label>Data do Evento</Label>
<Input 
  type="date"
  value={formData.eventDate}
  onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
/>

<Label>Capacidade (pessoas)</Label>
<Input 
  type="number"
  value={formData.capacity}
  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
/>

<Label>Tipo de Evento</Label>
<Select 
  value={formData.category}
  onValueChange={(value) => setFormData({...formData, category: value})}
>
  <SelectItem value="workshop">Workshop</SelectItem>
  <SelectItem value="feira">Feira</SelectItem>
  <SelectItem value="dia-campo">Dia de Campo</SelectItem>
  <SelectItem value="treinamento">Treinamento</SelectItem>
</Select>
```

#### 4.3 - Adaptar Lógica de Salvamento

**Marketing.tsx** (handleSaveCase):
```typescript
const handleSaveCase = () => {
  if (!photoBefore || !photoAfter) {
    toast.error('Adicione foto ANTES e DEPOIS');
    return;
  }
  
  const newCase: ResultCase = {
    id: Date.now().toString(),
    type: caseType,
    photoBefore,
    photoAfter,
    producer: formData.producer,
    product: formData.product,
    // ...
  };
  
  setCases([newCase, ...cases]);
};
```

**Eventos.tsx** (handleSaveEvent):
```typescript
const handleSaveEvent = () => {
  if (!photo) {
    toast.error('Adicione foto do evento');
    return;
  }
  
  if (!formData.title || !formData.eventDate) {
    toast.error('Preencha título e data do evento');
    return;
  }
  
  const newEvent: EventPin = {
    id: Date.now().toString(),
    type: formData.category as 'workshop' | 'feira' | 'dia-campo',
    photo,
    title: formData.title,
    description: formData.description,
    location: formData.location || 'Localização GPS',
    lat: userLocation?.lat || -23.3045,
    lng: userLocation?.lng || -51.1696,
    organizer: {
      name: formData.organizerName,
      company: formData.organizerCompany,
      phone: formData.organizerPhone
    },
    event: {
      date: formData.eventDate,
      capacity: parseInt(formData.capacity),
      registered: 0, // Inicia com 0 inscritos
      status: 'aberto'
    },
    category: formData.category,
    views: 0,
    cardSize,
    createdBy: currentUserId
  };
  
  setEvents([newEvent, ...events]);
  toast.success('Evento publicado!');
  setShowAddEvent(false);
  resetForm();
};
```

---

### 🛠️ PASSO 5: Adaptar Modal de Detalhes

#### 5.1 - Localizar JSX do Modal

No Marketing.tsx, procure por:
```tsx
{selectedCase && (
  <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
    <DialogContent>
      {/* Conteúdo do modal */}
    </DialogContent>
  </Dialog>
)}
```

#### 5.2 - Customizar Layout

**Marketing.tsx** (Modal de Case):
```tsx
<DialogHeader>
  <DialogTitle>📷 {selectedCase.producer}</DialogTitle>
</DialogHeader>

<!-- Fotos Antes/Depois -->
<div className="grid grid-cols-2 gap-2">
  <img src={selectedCase.photoBefore} />
  <img src={selectedCase.photoAfter} />
</div>

<!-- Resultados -->
<div className="bg-green-50 p-4 rounded-lg">
  <h3>🎯 RESULTADOS</h3>
  <p>📈 {selectedCase.results.productivity}</p>
  <p>💰 {selectedCase.results.economy}</p>
</div>
```

**Eventos.tsx** (Modal de Evento):
```tsx
<DialogHeader>
  <DialogTitle>📅 {selectedEvent.title}</DialogTitle>
</DialogHeader>

<!-- Foto do Evento -->
<img src={selectedEvent.photo} className="w-full rounded-lg" />

<!-- Status e Vagas -->
<div className={`p-4 rounded-lg ${
  selectedEvent.event.status === 'aberto' ? 'bg-green-50' : 'bg-red-50'
}`}>
  <h3>📊 STATUS DO EVENTO</h3>
  <p>✅ {selectedEvent.event.status.toUpperCase()}</p>
  <p>👥 {selectedEvent.event.registered}/{selectedEvent.event.capacity} inscritos</p>
  <p>📅 {formatDate(selectedEvent.event.date)}</p>
</div>

<!-- Organizador -->
<div className="border-t pt-4">
  <h3>👤 ORGANIZADOR</h3>
  <p>{selectedEvent.organizer.name} - {selectedEvent.organizer.company}</p>
  <p>📞 {selectedEvent.organizer.phone}</p>
</div>

<!-- Ações -->
<div className="flex gap-2">
  <Button onClick={() => handleInscricao(selectedEvent)}>
    ✅ Fazer Inscrição
  </Button>
  <Button variant="outline" onClick={() => handleCompartilhar(selectedEvent)}>
    🔗 Compartilhar
  </Button>
</div>
```

---

### 🛠️ PASSO 6: Adicionar Funcionalidades Específicas

#### 6.1 - Inscrição em Evento (Exemplo)

```typescript
// Eventos.tsx
const handleInscricao = (event: EventPin) => {
  // Verificar se ainda há vagas
  if (event.event.registered >= event.event.capacity) {
    toast.error('Evento lotado!', {
      description: 'Não há mais vagas disponíveis'
    });
    return;
  }
  
  // Incrementar inscritos
  const updatedEvent = {
    ...event,
    event: {
      ...event.event,
      registered: event.event.registered + 1,
      status: (event.event.registered + 1) >= event.event.capacity ? 'lotado' : 'aberto'
    }
  };
  
  // Atualizar state
  setEvents(events.map(e => e.id === event.id ? updatedEvent : e));
  
  toast.success('Inscrição realizada!', {
    description: `Você está inscrito em "${event.title}"`
  });
  
  // Fechar modal
  setSelectedEvent(null);
};
```

#### 6.2 - Filtro por Tipo de Evento

```typescript
// Estado para filtro
const [filterType, setFilterType] = useState<'all' | 'workshop' | 'feira' | 'dia-campo'>('all');

// Filtrar eventos
const filteredEvents = useMemo(() => {
  let filtered = events;
  
  // Filtro por tipo
  if (filterType !== 'all') {
    filtered = filtered.filter(e => e.type === filterType);
  }
  
  // Filtro por busca (se houver)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(e => 
      e.title.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query) ||
      e.location.toLowerCase().includes(query)
    );
  }
  
  return filtered;
}, [events, filterType, searchQuery]);

// JSX do filtro
<div className="flex gap-2 overflow-x-auto pb-2">
  <Button 
    variant={filterType === 'all' ? 'default' : 'outline'}
    onClick={() => setFilterType('all')}
  >
    Todos
  </Button>
  <Button 
    variant={filterType === 'workshop' ? 'default' : 'outline'}
    onClick={() => setFilterType('workshop')}
  >
    Workshops
  </Button>
  <Button 
    variant={filterType === 'feira' ? 'default' : 'outline'}
    onClick={() => setFilterType('feira')}
  >
    Feiras
  </Button>
  <Button 
    variant={filterType === 'dia-campo' ? 'default' : 'outline'}
    onClick={() => setFilterType('dia-campo')}
  >
    Dia de Campo
  </Button>
</div>
```

#### 6.3 - Notificação de Evento Próximo

```typescript
// Hook para verificar eventos próximos
useEffect(() => {
  const checkUpcomingEvents = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.event.date);
      const today = new Date();
      
      // Eventos nos próximos 3 dias
      const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 3;
    });
    
    if (upcomingEvents.length > 0) {
      toast.info(`Você tem ${upcomingEvents.length} evento(s) próximo(s)!`, {
        description: upcomingEvents[0].title,
        action: {
          label: 'Ver',
          onClick: () => setSelectedEvent(upcomingEvents[0])
        }
      });
    }
  };
  
  // Verificar ao carregar
  checkUpcomingEvents();
  
  // Verificar a cada 1 hora
  const interval = setInterval(checkUpcomingEvents, 1000 * 60 * 60);
  
  return () => clearInterval(interval);
}, [events]);
```

---

### 🛠️ PASSO 7: Integrar no App.tsx

#### 7.1 - Importar o Componente

```typescript
// App.tsx
import Eventos from './components/Eventos';
```

#### 7.2 - Adicionar Rota

```typescript
// App.tsx - dentro de renderPage()
case '/eventos':
  return <Eventos navigate={navigate} />;
```

#### 7.3 - Adicionar no Menu de Navegação

```typescript
// FloatingActionButton.tsx ou SecondaryMenu.tsx
<Button onClick={() => navigate('/eventos')}>
  📅 Eventos
</Button>
```

---

### 🛠️ PASSO 8: Testar e Validar

#### 8.1 - Checklist de Testes

- [ ] **Carregar mapa**: Mapa carrega corretamente?
- [ ] **GPS funciona**: Localização automática funciona?
- [ ] **Adicionar evento**: Consegue criar novo evento?
- [ ] **Câmera funciona**: Foto é capturada?
- [ ] **Pin aparece**: Pin é renderizado no mapa?
- [ ] **Clicar em pin**: Modal de detalhes abre?
- [ ] **Editar evento**: Consegue editar evento criado?
- [ ] **Deletar evento**: Consegue deletar evento?
- [ ] **Busca funciona**: Busca filtra corretamente?
- [ ] **Filtro por tipo**: Filtro funciona?
- [ ] **Responsivo**: Funciona em todos tamanhos de tela?
- [ ] **Performance**: Não trava com muitos pins?

#### 8.2 - Testes de Edge Cases

```typescript
// Teste: Muitos eventos (performance)
const generateMockEvents = (count: number): EventPin[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i}`,
    type: ['workshop', 'feira', 'dia-campo'][i % 3] as any,
    cardSize: ['small', 'medium', 'large'][i % 3] as any,
    lat: -23.3045 + (Math.random() - 0.5) * 2,
    lng: -51.1696 + (Math.random() - 0.5) * 2,
    photo: `https://picsum.photos/200/200?random=${i}`,
    title: `Evento de Teste ${i + 1}`,
    // ...
  }));
};

// Adicionar 100 eventos para testar
// setEvents(generateMockEvents(100));
```

#### 8.3 - Debugging

```typescript
// Adicionar logs para debug
useEffect(() => {
  console.log('🐛 [Eventos] State atualizado:', {
    eventsCount: events.length,
    filteredCount: filteredEvents.length,
    mapReady,
    selectedEvent: selectedEvent?.id
  });
}, [events, filteredEvents, mapReady, selectedEvent]);
```

---

### 🛠️ PASSO 9: Otimizações de Performance

#### 9.1 - Memoização de Componentes

```typescript
// Pin Component (se extrair do useEffect)
const EventPin = memo(({ event, onClick }: { event: EventPin; onClick: () => void }) => {
  // Renderizar HTML do pin
  return <div onClick={onClick}>{/* ... */}</div>;
});
```

#### 9.2 - Debounce na Busca

```typescript
import { useState, useEffect, useMemo } from 'react';

// Hook customizado de debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// Usar no componente
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useDebounce(searchQuery, 300);

const filteredEvents = useMemo(() => {
  // Usar debouncedSearch ao invés de searchQuery
  if (!debouncedSearch.trim()) return events;
  // ...
}, [events, debouncedSearch]);
```

#### 9.3 - Lazy Loading de Imagens

```typescript
// Usar ImageWithFallback (já existe no projeto)
import { ImageWithFallback } from './figma/ImageWithFallback';

<ImageWithFallback 
  src={event.photo}
  alt={event.title}
  className="w-full h-full object-cover"
  fallback="https://via.placeholder.com/400x300?text=Sem+Foto"
/>
```

#### 9.4 - Virtualização de Lista (se houver lista)

```typescript
// Se tiver lista de eventos (não apenas mapa)
import { useVirtualizer } from '@tanstack/react-virtual';

const EventList = ({ events }: { events: EventPin[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: events.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Altura estimada de cada item
  });
  
  return (
    <div ref={parentRef} className="h-[400px] overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const event = events[virtualRow.index];
          return (
            <div
              key={event.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <EventCard event={event} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

---

### 🛠️ PASSO 10: Persistência e Sincronização

#### 10.1 - Salvar no Capacitor Storage

```typescript
import { storage } from '../utils/storage/capacitor-storage';

// Salvar eventos
const saveEventsToStorage = async (events: EventPin[]) => {
  try {
    await storage.set('eventos', events);
    console.log('✅ Eventos salvos no storage');
  } catch (error) {
    console.error('❌ Erro ao salvar eventos:', error);
  }
};

// Carregar eventos
useEffect(() => {
  const loadEvents = async () => {
    try {
      const savedEvents = await storage.get<EventPin[]>('eventos');
      if (savedEvents && savedEvents.length > 0) {
        setEvents(savedEvents);
        console.log(`✅ ${savedEvents.length} eventos carregados do storage`);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar eventos:', error);
    }
  };
  
  loadEvents();
}, []);

// Salvar automaticamente quando events mudar
useEffect(() => {
  if (events.length > 0) {
    saveEventsToStorage(events);
  }
}, [events]);
```

#### 10.2 - Sincronização com Backend (Opcional)

```typescript
// Exemplo de sincronização com Supabase
import { supabase } from '../utils/supabase/client';

// Salvar no backend
const saveEventToBackend = async (event: EventPin) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        id: event.id,
        type: event.type,
        lat: event.lat,
        lng: event.lng,
        photo: event.photo,
        title: event.title,
        description: event.description,
        organizer: event.organizer,
        event_data: event.event,
        category: event.category,
        card_size: event.cardSize,
        created_by: event.createdBy
      }]);
    
    if (error) throw error;
    
    console.log('✅ Evento salvo no backend:', data);
    toast.success('Evento sincronizado!');
  } catch (error) {
    console.error('❌ Erro ao salvar no backend:', error);
    toast.error('Erro ao sincronizar evento');
  }
};

// Carregar do backend
const loadEventsFromBackend = async () => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Transformar dados do backend para EventPin
    const events: EventPin[] = data.map(row => ({
      id: row.id,
      type: row.type,
      lat: row.lat,
      lng: row.lng,
      photo: row.photo,
      title: row.title,
      description: row.description,
      location: row.location,
      organizer: row.organizer,
      event: row.event_data,
      category: row.category,
      cardSize: row.card_size,
      views: row.views || 0,
      createdBy: row.created_by
    }));
    
    setEvents(events);
    console.log(`✅ ${events.length} eventos carregados do backend`);
  } catch (error) {
    console.error('❌ Erro ao carregar do backend:', error);
  }
};
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Setup Inicial
- [ ] Definir conceito do módulo
- [ ] Criar interface de dados (TypeScript)
- [ ] Copiar Marketing.tsx para [NomeModulo].tsx
- [ ] Renomear funções e estados
- [ ] Atualizar imports

### Fase 2: Dados e Estado
- [ ] Criar dados demo (mínimo 3 exemplos)
- [ ] Configurar estados principais
- [ ] Implementar formData
- [ ] Configurar GPS/localização

### Fase 3: Mapa e Pins
- [ ] Integrar MapTilerComponent
- [ ] Customizar HTML dos pins
- [ ] Definir cores por status/tipo
- [ ] Implementar tamanhos de pin (monetização)
- [ ] Testar renderização de pins

### Fase 4: Formulários
- [ ] Adaptar modal de criação
- [ ] Configurar validação de campos
- [ ] Integrar câmera (se necessário)
- [ ] Implementar lógica de salvamento
- [ ] Testar criação de novo item

### Fase 5: Detalhes e Ações
- [ ] Customizar modal de detalhes
- [ ] Adicionar ações específicas (ex: inscrição)
- [ ] Implementar edição
- [ ] Implementar exclusão
- [ ] Testar todas as ações

### Fase 6: Busca e Filtros
- [ ] Implementar busca por texto
- [ ] Adicionar filtros por tipo
- [ ] Configurar filtros por data (se aplicável)
- [ ] Otimizar com useMemo
- [ ] Testar performance com muitos itens

### Fase 7: Integração
- [ ] Adicionar rota no App.tsx
- [ ] Criar botão no menu de navegação
- [ ] Configurar lazy loading
- [ ] Adicionar no prefetch (opcional)
- [ ] Testar navegação

### Fase 8: Persistência
- [ ] Implementar save no Capacitor Storage
- [ ] Implementar load do storage
- [ ] Configurar auto-save
- [ ] Testar offline-first
- [ ] (Opcional) Integrar com backend

### Fase 9: UX/UI
- [ ] Ajustar responsividade mobile
- [ ] Adicionar animações
- [ ] Configurar toasts de feedback
- [ ] Testar em dispositivos reais
- [ ] Validar acessibilidade

### Fase 10: Testes e QA
- [ ] Testar todos os fluxos
- [ ] Testar edge cases
- [ ] Verificar performance
- [ ] Corrigir bugs encontrados
- [ ] Documentar funcionalidades

---

## 🐛 TROUBLESHOOTING

### Problema: Pins não aparecem no mapa

**Possíveis Causas**:
1. ❌ Mapa não carregou completamente
2. ❌ Coordenadas lat/lng inválidas
3. ❌ Leaflet não foi carregado
4. ❌ mapInstanceRef está null

**Solução**:
```typescript
// Adicionar logs para debug
useEffect(() => {
  console.log('🗺️ Debug Mapa:', {
    mapReady,
    mapInstanceExists: !!mapInstanceRef.current,
    leafletExists: !!(window as any).L,
    eventsCount: events.length,
    mapPanesExists: mapInstanceRef.current?._panes?.overlayPane
  });
}, [mapReady, events]);

// Aguardar mapa estar completamente pronto
useEffect(() => {
  if (!mapReady || !mapInstanceRef.current || !(window as any).L) {
    console.log('⏳ Aguardando mapa...');
    return;
  }
  
  // Adicionar timeout para garantir DOM pronto
  const timeout = setTimeout(() => {
    // Renderizar pins aqui
  }, 100);
  
  return () => clearTimeout(timeout);
}, [mapReady, events]);
```

### Problema: GPS não funciona

**Possíveis Causas**:
1. ❌ Permissão de localização negada
2. ❌ GPS desabilitado no dispositivo
3. ❌ Navegador não suporta Geolocation API
4. ❌ App não está em HTTPS (required para GPS)

**Solução**:
```typescript
useEffect(() => {
  if (!('geolocation' in navigator)) {
    toast.error('GPS não suportado neste navegador');
    setUserLocation({ lat: -23.3045, lng: -51.1696 }); // Fallback
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      console.log('✅ GPS obtido:', position.coords);
    },
    (error) => {
      console.error('❌ Erro GPS:', error);
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toast.error('Permissão de localização negada');
          break;
        case error.POSITION_UNAVAILABLE:
          toast.error('Localização não disponível');
          break;
        case error.TIMEOUT:
          toast.error('Timeout ao obter localização');
          break;
      }
      
      // Fallback para localização padrão
      setUserLocation({ lat: -23.3045, lng: -51.1696 });
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}, []);
```

### Problema: Câmera não abre

**Possíveis Causas**:
1. ❌ Permissão de câmera negada
2. ❌ Capacitor não inicializado
3. ❌ Dispositivo não tem câmera
4. ❌ App não está em contexto seguro (HTTPS)

**Solução**:
```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const handleOpenCamera = async () => {
  try {
    // Verificar permissões
    const permissions = await Camera.checkPermissions();
    
    if (permissions.camera === 'denied') {
      toast.error('Permissão de câmera negada', {
        description: 'Ative nas configurações do app'
      });
      return;
    }
    
    if (permissions.camera === 'prompt') {
      const request = await Camera.requestPermissions();
      if (request.camera === 'denied') {
        toast.error('Permissão de câmera negada');
        return;
      }
    }
    
    // Abrir câmera
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    
    const imageUrl = `data:image/jpeg;base64,${photo.base64String}`;
    setPhoto(imageUrl);
    
    console.log('✅ Foto capturada');
    toast.success('Foto capturada!');
    
  } catch (error) {
    console.error('❌ Erro ao abrir câmera:', error);
    toast.error('Erro ao abrir câmera');
  }
};
```

### Problema: Performance ruim com muitos pins

**Possíveis Causas**:
1. ❌ Re-renderização desnecessária
2. ❌ Imagens muito grandes
3. ❌ Muitos pins visíveis simultaneamente
4. ❌ Falta de memoização

**Solução**:
```typescript
// 1. Memoizar filtro de eventos
const filteredEvents = useMemo(() => {
  return events.filter(/* ... */);
}, [events, searchQuery, filterType]);

// 2. Clustering de pins (muitos pins próximos)
import L from 'leaflet';
import 'leaflet.markercluster';

const markerClusterGroup = L.markerClusterGroup({
  maxClusterRadius: 50,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false
});

filteredEvents.forEach(event => {
  const marker = L.marker([event.lat, event.lng], {
    icon: customIcon
  });
  markerClusterGroup.addLayer(marker);
});

mapInstance.addLayer(markerClusterGroup);

// 3. Limitar número de pins renderizados
const MAX_VISIBLE_PINS = 50;

const visibleEvents = useMemo(() => {
  return filteredEvents.slice(0, MAX_VISIBLE_PINS);
}, [filteredEvents]);

// 4. Otimizar imagens
const optimizeImage = (base64: string, maxWidth = 400): string => {
  // Redimensionar imagem no lado do cliente
  const img = new Image();
  img.src = base64;
  
  const canvas = document.createElement('canvas');
  const ratio = maxWidth / img.width;
  canvas.width = maxWidth;
  canvas.height = img.height * ratio;
  
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return canvas.toDataURL('image/jpeg', 0.8);
};
```

### Problema: Modal não abre/fecha corretamente

**Possíveis Causas**:
1. ❌ Estado do modal inconsistente
2. ❌ z-index conflitando
3. ❌ Overlay do mapa bloqueando cliques
4. ❌ DialogContent não configurado corretamente

**Solução**:
```typescript
// 1. Garantir z-index alto para modais
import { Z_INDEX } from '../utils/constants';

<Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
  <DialogContent 
    className="z-[9999]" // z-index maior que o mapa
    style={{ zIndex: Z_INDEX.MODAL }}
  >
    {/* Conteúdo */}
  </DialogContent>
</Dialog>

// 2. Garantir que FAB não interfira
const showFab = !showAddEvent && !selectedEvent;

// 3. Usar estado controlado
const handleOpenModal = () => {
  setShowAddEvent(true);
};

const handleCloseModal = () => {
  setShowAddEvent(false);
  resetForm();
};

// 4. Evitar clicks no mapa quando modal aberto
useEffect(() => {
  if (mapInstanceRef.current) {
    if (showAddEvent || selectedEvent) {
      mapInstanceRef.current.dragging.disable();
      mapInstanceRef.current.touchZoom.disable();
    } else {
      mapInstanceRef.current.dragging.enable();
      mapInstanceRef.current.touchZoom.enable();
    }
  }
}, [showAddEvent, selectedEvent]);
```

---

## 📚 EXEMPLOS DE MÓDULOS REPLICÁVEIS

### 1. Módulo "Fazendas Visitadas"

**Conceito**: Registrar visitas a fazendas/propriedades com fotos, notas e localização.

**Pin Data**:
```typescript
interface FazendaPin {
  id: string;
  lat: number;
  lng: number;
  photo: string;
  fazenda: string;
  produtor: string;
  area: number; // hectares
  culturas: string[]; // ['soja', 'milho']
  ultimaVisita: string; // Data
  proximaVisita?: string; // Data agendada
  notas: string;
  contato: {
    telefone: string;
    email: string;
  };
  status: 'ativo' | 'inativo' | 'prospecto';
}
```

**Badge do Pin**: Status da fazenda (ativo/inativo/prospecto)

### 2. Módulo "Treinamentos"

**Conceito**: Documentar treinamentos realizados com equipes, fotos e certificados.

**Pin Data**:
```typescript
interface TreinamentoPin {
  id: string;
  lat: number;
  lng: number;
  photo: string;
  titulo: string;
  instrutor: string;
  tema: string;
  participantes: number;
  data: string;
  duracao: number; // horas
  certificados: string[]; // URLs dos certificados
  material: string; // URL do material didático
  avaliacao: number; // 1-5 estrelas
}
```

**Badge do Pin**: Avaliação média (⭐⭐⭐⭐⭐)

### 3. Módulo "Colheitas"

**Conceito**: Registrar colheitas com produtividade, fotos e dados técnicos.

**Pin Data**:
```typescript
interface ColheitaPin {
  id: string;
  lat: number;
  lng: number;
  photo: string;
  talhao: string;
  cultura: 'soja' | 'milho' | 'trigo' | 'cafe';
  area: number; // hectares
  produtividade: number; // sc/ha ou ton/ha
  dataColheita: string;
  umidade: number; // %
  impurezas: number; // %
  custoProducao: number; // R$/ha
  receitaBruta: number; // R$
}
```

**Badge do Pin**: Produtividade (ex: "80 sc/ha")

### 4. Módulo "Análises de Solo"

**Conceito**: Mapear análises de solo com resultados e recomendações.

**Pin Data**:
```typescript
interface AnalisePin {
  id: string;
  lat: number;
  lng: number;
  photo?: string;
  talhao: string;
  dataColeta: string;
  laboratorio: string;
  ph: number;
  materiaOrganica: number; // %
  fosforo: number; // ppm
  potassio: number; // ppm
  recomendacao: string; // Texto da recomendação
  statusCorrecao: 'pendente' | 'em_andamento' | 'concluido';
}
```

**Badge do Pin**: pH (ex: "pH 6.2")

---

## 🎯 CONCLUSÃO

Este PRD fornece **tudo que você precisa** para:

1. ✅ **Entender** como o módulo Publicar funciona
2. ✅ **Replicar** para criar novos módulos similares
3. ✅ **Customizar** para casos de uso específicos
4. ✅ **Otimizar** performance e UX
5. ✅ **Monetizar** com modelo de pins premium

### Próximos Passos Sugeridos

1. **Escolha um módulo** para replicar (ex: Eventos, Fazendas, Treinamentos)
2. **Siga o guia passo a passo** da seção "Guia de Replicação"
3. **Adapte interfaces e lógica** para seu caso de uso
4. **Teste extensivamente** todos os fluxos
5. **Documente** as customizações específicas
6. **Compartilhe** melhorias com o time

### Recursos Adicionais

- 📄 **Código-fonte**: `/components/Marketing.tsx`
- 📖 **Guia de uso**: `/GUIA_MARKETING.md`
- 🎨 **Design System**: `/styles/globals.css`
- 🔧 **Utils**: `/utils/storage/capacitor-storage.ts`
- 🗺️ **Mapa**: `/components/MapTilerComponent.tsx`

---

**Versão**: 2.0.0  
**Última atualização**: 1 de Novembro de 2025  
**Autor**: SoloForte Team  
**Status**: ✅ Produção Ready
