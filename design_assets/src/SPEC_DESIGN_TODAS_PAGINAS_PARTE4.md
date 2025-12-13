# 📐 SPEC DE DESIGN - SOLOFORTE (PARTE 4 - FINAL)
## Páginas 16-23 - Conclusão

> **Plataforma**: Mobile-only (375x812px base)  
> **Cor principal**: #0057FF

---

# 16. SCANNER DE PRAGAS

### Rota: `/pragas` (via FAB)

## 📱 LAYOUT - CÂMERA ATIVA

```
┌─────────────────────────────────┐
│  [X]  SCANNER DE PRAGAS         │
├─────────────────────────────────┤
│                                 │
│  ╔═══════════════════════════╗  │
│  ║                           ║  │
│  ║                           ║  │
│  ║   PREVIEW DA CÂMERA       ║  │
│  ║                           ║  │
│  ║   ┌─────────────────┐     ║  │
│  ║   │                 │     ║  │
│  ║   │  Enquadre a     │     ║  │
│  ║   │  folha/planta   │     ║  │
│  ║   │  aqui           │     ║  │
│  ║   │                 │     ║  │
│  ║   └─────────────────┘     ║  │ ← Guia
│  ║                           ║  │
│  ║                           ║  │
│  ║   [💡] [⚡]               ║  │ ← Controles
│  ╚═══════════════════════════╝  │
│                                 │
│  💡 DICA                        │
│  ┌─────────────────────────┐   │
│  │ • Tire foto de perto    │   │
│  │ • Use boa iluminação    │   │
│  │ • Foque na folha        │   │
│  └─────────────────────────┘   │
│                                 │
│         [📸 CAPTURAR]           │ ← Botão grande
│                                 │
│  OU                             │
│                                 │
│      [🖼️ Escolher da Galeria]   │
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Fechar ([X])
- **Posição**: Top-left
- **Color**: #FFFFFF (sobre câmera)
- **Background**: rgba(0, 0, 0, 0.5) (backdrop)
- **Border-radius**: 50%
- **Size**: 40x40px
- **Ação**: Fecha scanner

### Título "SCANNER DE PRAGAS"
- **Color**: #FFFFFF
- **Text-shadow**: 0px 2px 4px rgba(0,0,0,0.5)

## 📷 PREVIEW DA CÂMERA

### Container
- **Altura**: 55vh (maior parte da tela)
- **Largura**: 100%
- **Background**: #000000 (fallback)
- **Posição**: Relative

### Camera Stream
- **Source**: Câmera traseira (default)
- **Resolution**: Máxima disponível
- **Aspect**: Cover (preenche container)
- **Mirror**: Não (câmera traseira)

### Guia de Enquadramento

**Retângulo central**:
- **Tamanho**: 280x200px
- **Posição**: Centralizado
- **Border**: 2px solid #FFFFFF
- **Border-radius**: 12px
- **Box-shadow**: 
  - Interno: inset 0px 0px 0px 2px rgba(0, 87, 255, 0.3)
  - Externo: 0px 0px 0px 2000px rgba(0, 0, 0, 0.5) (dimexterna)
- **Cantos decorativos**:
  ```
  ┌─   ─┐  ← L-shapes nos 4 cantos
  
  
  └─   ─┘
  ```
  - Tamanho: 20px cada L
  - Stroke: 4px
  - Color: #0057FF
  - Offset: -4px (para fora do rect)

**Label dentro**:
- **Texto**: "Enquadre a folha/planta aqui"
- **Posição**: Centro do retângulo
- **Background**: rgba(0, 0, 0, 0.6)
- **Padding**: 8px 16px
- **Border-radius**: 8px
- **Fonte**: 13px, weight 600, color #FFFFFF
- **Text-align**: Center

### Controles da Câmera (sobre preview)

**Posição**: Bottom-left do preview, 16px

**Botão Flash** ([💡]):
- **Tamanho**: 44x44px (círculo)
- **Background**: rgba(0, 0, 0, 0.6)
- **Border**: 2px solid rgba(255, 255, 255, 0.3)
- **Ícone**: 💡 Zap (24px)
  - Color: #FFC107 (se ON)
  - Color: #FFFFFF (se OFF)
- **Ação**: Toggle flash (Auto/On/Off)

**Botão Virar Câmera** ([⚡]):
- **Posição**: 16px à direita do Flash
- **Specs**: Iguais ao Flash
- **Ícone**: ⚡ RefreshCw (24px, #FFFFFF)
- **Ação**: Alterna frontal ↔ traseira

## 💡 SEÇÃO "DICA"

### Container
- **Margin**: 16px
- **Padding**: 12px 16px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid rgba(0, 87, 255, 0.2)
- **Border-radius**: 12px

### Header
- **Ícone**: 💡 (18px)
- **Texto**: "DICA"
  - Fonte: 13px, weight 700, uppercase, color #0057FF
- **Margin-bottom**: 8px

### Lista de Dicas (3 bullets)

**Cada item**:
- **Bullet**: • (color #0057FF)
- **Texto**: 13px, weight 500, color #212529
- **Line-height**: 1.6
- **Margin**: 4px 0

**3 Dicas**:
1. "Tire foto de perto e com foco"
2. "Use boa iluminação natural"
3. "Foque na área afetada da folha"

## 📸 BOTÃO "CAPTURAR"

### Specs
- **Margin**: 24px 16px 16px
- **Largura**: Calc(100% - 32px)
- **Altura**: 64px (grande!)
- **Background**: #0057FF
- **Border**: 4px solid #FFFFFF
- **Border-radius**: 32px
- **Box-shadow**: 
  - 0px 4px 16px rgba(0, 87, 255, 0.4)
  - 0px 0px 0px 2px #0057FF (outline)

**Conteúdo**:
- **Ícone**: 📸 Camera (28px, branco)
- **Texto**: "CAPTURAR"
  - Fonte: 18px, weight 800, color #FFFFFF

**Estados**:
- **Press**: 
  - Scale(0.95)
  - Flash branco (simula foto)
  - Vibração háptica

**Ação**:
1. Captura frame da câmera
2. Para preview
3. Mostra tela de análise

## 🖼️ BOTÃO "GALERIA"

### Separador "OU"
- **Margin**: 16px vertical
- **Text-align**: Center
- **Fonte**: 13px, weight 600, color #6C757D

### Botão
- **Largura**: Calc(100% - 32px)
- **Altura**: 48px
- **Background**: Transparente
- **Border**: 2px solid #E9ECEF
- **Border-radius**: 24px

**Conteúdo**:
- **Ícone**: 🖼️ Image (20px, #6C757D)
- **Texto**: "Escolher da Galeria"
  - Fonte: 15px, weight 600, color #6C757D

**Ação**: Abre seletor de fotos

---

## 📱 LAYOUT - ANALISANDO

```
┌─────────────────────────────────┐
│  [X]  ANALISANDO...             │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │  [Foto capturada]       │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  🤖 IA analisando a imagem...   │
│                                 │
│  ████████████████░░░░ 85%       │ ← Progress
│                                 │
│  🔍 Identificando praga/doença  │
│                                 │
│         [⏳ Aguarde]            │
│                                 │
└─────────────────────────────────┘
```

## 📸 FOTO CAPTURADA

### Container
- **Margin**: 16px
- **Aspect-ratio**: 4:3
- **Border-radius**: 16px
- **Overflow**: Hidden
- **Box-shadow**: 0px 4px 16px rgba(0,0,0,0.15)

### Imagem
- **Object-fit**: Cover
- **Width**: 100%

## 🤖 STATUS DE ANÁLISE

### Ícone IA
- **Tamanho**: 48x48px
- **Color**: #0057FF
- **Animação**: Pulse (scale 1.0 → 1.1 → 1.0, 1.5s loop)
- **Centralizado**: Horizontal
- **Margin**: 24px vertical

### Texto Status
- **Texto**: "IA analisando a imagem..."
- **Fonte**: 16px, weight 600, color #212529
- **Text-align**: Center
- **Margin-bottom**: 16px

### Progress Bar

**Container**:
- **Margin**: 0 24px
- **Altura**: 8px
- **Background**: #E9ECEF
- **Border-radius**: 4px
- **Overflow**: Hidden

**Fill**:
- **Background**: Linear gradient
  - Left: #0057FF
  - Right: #00C9FF
- **Height**: 100%
- **Width**: 0% → 100% (animado)
- **Animation**: 3-5s (duração da análise)
- **Transition**: Width 0.3s ease-out

**Percentual**:
- **Posição**: Direita da barra
- **Texto**: "85%"
- **Fonte**: 14px, weight 700, color #0057FF
- **Margin-left**: 12px

### Label da Etapa

**Textos dinâmicos** (mudam durante análise):
1. "🔍 Processando imagem..." (0-30%)
2. "🧠 Analisando com IA..." (30-70%)
3. "🐛 Identificando praga/doença..." (70-90%)
4. "✅ Finalizando..." (90-100%)

**Specs**:
- **Fonte**: 14px, weight 500, color #6C757D
- **Text-align**: Center
- **Margin-top**: 16px

### Botão "Aguarde"
- **Disabled**: Não clicável
- **Background**: #F8F9FA
- **Color**: #ADB5BD
- **Ícone**: ⏳ Hourglass (rotacionando)

---

## 📱 LAYOUT - RESULTADO

```
┌─────────────────────────────────┐
│  [←]  DIAGNÓSTICO               │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │  [Foto analisada]       │   │
│  └─────────────────────────┘   │
│                                 │
│  🐛 LAGARTA-DA-SOJA             │
│  (Anticarsia gemmatalis)        │
│                                 │
│  📊 Confiança: 87%              │
│  ████████░░ (Alta)              │
│                                 │
│  ⚠️ Severidade: MODERADA        │
│                                 │
│  📖 DESCRIÇÃO                   │
│  ┌─────────────────────────┐   │
│  │ Praga comum em cultivos │   │
│  │ de soja, se alimenta... │   │
│  └─────────────────────────┘   │
│                                 │
│  🌱 CULTURA AFETADA             │
│  • Soja (principal)             │
│  • Feijão                       │
│                                 │
│  💊 RECOMENDAÇÕES               │
│  ┌─────────────────────────┐   │
│  │ 1. Monitorar nível de   │   │
│  │    infestação           │   │
│  │                         │   │
│  │ 2. Aplicar inseticida   │   │
│  │    se desfolha > 30%    │   │
│  │                         │   │
│  │ 3. Produtos:            │   │
│  │    • Lambda-cialotrina  │   │
│  │    • Clorpirifós        │   │
│  │                         │   │
│  │ 4. Monitorar próximos   │   │
│  │    7 dias               │   │
│  └─────────────────────────┘   │
│                                 │
│  [📌 Registrar Ocorrência]      │
│  [📤 Compartilhar]              │
│  [🔄 Nova Análise]              │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Volta para Scanner (nova foto)

### Título "DIAGNÓSTICO"

## 📸 FOTO ANALISADA
- **Specs**: Iguais à tela anterior
- **Badges**: Overlay com tags detectadas

## 🐛 IDENTIFICAÇÃO

### Nome da Praga

**Nome Comum**:
- **Ícone**: Emoji da categoria (🐛🦠🌿💧)
- **Texto**: "LAGARTA-DA-SOJA"
- **Fonte**: 22px, weight 800, color #212529, uppercase
- **Margin-bottom**: 4px

**Nome Científico**:
- **Texto**: "(Anticarsia gemmatalis)"
- **Fonte**: 14px, weight 400, color #6C757D, italic
- **Margin-bottom**: 20px

## 📊 CONFIANÇA DA IA

### Label
- **Ícone**: 📊 (18px)
- **Texto**: "Confiança: 87%"
- **Fonte**: 15px, weight 600
- **Margin-bottom**: 8px

### Barra de Confiança

**Track**: 
- **Height**: 8px
- **Background**: #E9ECEF
- **Border-radius**: 4px

**Fill**:
- **Width**: Baseado no % (87%)
- **Height**: 100%
- **Border-radius**: 4px
- **Color por nível**:
  - 0-50%: #DC3545 (vermelho - Baixa)
  - 51-75%: #FFC107 (amarelo - Média)
  - 76-100%: #28A745 (verde - Alta)
- **Animação**: Width 0 → 87% (0.5s ease-out)

**Label Status**:
- **Texto**: "(Alta)" ou "(Média)" ou "(Baixa)"
- **Posição**: Direita inline
- **Color**: Mesma da barra
- **Fonte**: 13px, weight 700

## ⚠️ SEVERIDADE

### Badge
- **Margin**: 20px vertical
- **Padding**: 10px 20px
- **Border-radius**: 20px
- **Display**: Inline-flex
- **Align-items**: Center
- **Gap**: 8px

**Ícone**: ⚠️ (20px)

**Texto**: "Severidade: MODERADA"
- **Fonte**: 15px, weight 700, uppercase

**Cores por nível**:
- **LEVE**: 
  - Background: rgba(40, 167, 69, 0.1)
  - Border: 2px solid #28A745
  - Color: #28A745
- **MODERADA**: 
  - Background: rgba(255, 193, 7, 0.1)
  - Border: 2px solid #FFC107
  - Color: #FF8800
- **CRÍTICA**: 
  - Background: rgba(220, 53, 69, 0.1)
  - Border: 2px solid #DC3545
  - Color: #DC3545

## 📖 SEÇÃO "DESCRIÇÃO"

### Container
- **Margin**: 24px 16px 16px
- **Padding**: 0

### Header
- **Ícone**: 📖 (18px)
- **Texto**: "DESCRIÇÃO"
- **Fonte**: 14px, weight 700, uppercase
- **Margin-bottom**: 12px

### Texto
- **Padding**: 16px
- **Background**: #F8F9FA
- **Border-radius**: 12px
- **Fonte**: 14px, weight 400, color #212529, line-height 1.6
- **Max-height**: 150px
- **Overflow**: Scroll (se longo)

**Conteúdo exemplo**:
"Praga comum em cultivos de soja, se alimenta das folhas causando desfolha. Mais ativa em temperaturas entre 25-30°C. Pode causar perdas significativas se não controlada."

## 🌱 SEÇÃO "CULTURA AFETADA"

### Header
- **Specs**: Padrão
- **Ícone**: 🌱
- **Texto**: "CULTURA AFETADA"

### Lista de Culturas

**Cada item**:
```
• Soja (principal)
```
- **Bullet**: • (color #28A745)
- **Cultura**: Bold 14px
- **Nota**: "(principal)" ou "(secundária)" em 13px color #6C757D
- **Margin**: 6px 0

## 💊 SEÇÃO "RECOMENDAÇÕES"

### Header
- **Ícone**: 💊
- **Texto**: "RECOMENDAÇÕES"
- **Background**: rgba(0, 87, 255, 0.05)
- **Padding**: 12px 16px
- **Border-radius**: 12px 12px 0 0

### Container
- **Background**: #F8F9FA
- **Border**: 2px solid rgba(0, 87, 255, 0.1)
- **Border-radius**: 0 0 12px 12px
- **Padding**: 16px

### Lista Numerada (4 passos)

**Cada passo**:
```
1. Monitorar nível de
   infestação
```

**Número**:
- **Size**: 20px
- **Weight**: 800
- **Color**: #0057FF
- **Background**: rgba(0, 87, 255, 0.1)
- **Width/Height**: 32px (círculo)
- **Text-align**: Center
- **Margin-right**: 12px

**Texto**:
- **Fonte**: 14px, weight 500, color #212529, line-height 1.5
- **Margin-bottom**: 12px

**Sub-items** (produtos, doses):
- **Indent**: 44px (alinha com texto)
- **Bullet**: • (color #0057FF)
- **Fonte**: 13px, weight 400

## 🔘 BOTÕES DE AÇÃO (3 botões)

### Container
- **Margin**: 24px 16px 40px
- **Display**: Flex column
- **Gap**: 12px

### 1) Botão "Registrar Ocorrência" (Primário)

**Specs**:
- **Largura**: 100%
- **Altura**: 52px
- **Background**: #0057FF
- **Border-radius**: 26px
- **Box-shadow**: 0px 4px 16px rgba(0, 87, 255, 0.3)

**Conteúdo**:
- **Ícone**: 📌 Pin (20px, branco)
- **Texto**: "Registrar Ocorrência"
  - Fonte: 15px, weight 700, color #FFFFFF

**Ação**:
1. Abre formulário de nova ocorrência
2. Pre-preenche:
   - Tipo: Detectado (ex: Lagarta)
   - Severidade: Baseado na análise
   - Foto: Anexa automaticamente
   - Descrição: Resume IA
   - Recomendações: Inclui sugestões

### 2) Botão "Compartilhar" (Secundário)

**Specs**:
- **Background**: Transparente
- **Border**: 2px solid #0057FF
- **Demais**: Iguais ao primário

**Conteúdo**:
- **Ícone**: 📤 Share (20px, #0057FF)
- **Texto**: "Compartilhar Diagnóstico"
  - Color: #0057FF

**Ação**: Abre share sheet
- WhatsApp
- Email
- Salvar PDF
- Copiar link (se tiver backend)

### 3) Botão "Nova Análise" (Terciário)

**Specs**:
- **Background**: Transparente
- **Border**: 1px solid #E9ECEF
- **Demais**: Iguais

**Conteúdo**:
- **Ícone**: 🔄 RefreshCw (18px, #6C757D)
- **Texto**: "Fazer Nova Análise"
  - Color: #6C757D

**Ação**: Volta para câmera

## 🎭 ANIMAÇÕES

**Entrada da tela**:
1. Foto: Fade in (0.2s)
2. Título: Slide down + fade (0.3s, delay 0.1s)
3. Confiança: Barra anima (0.5s, delay 0.2s)
4. Seções: Stagger fade in (0.1s delay cada)
5. Botões: Slide up (0.3s, delay 0.5s)

**Barra de confiança**:
- Width animada (0.5s ease-out)

**Severidade badge**:
- Scale in (0.3s ease-out)

---

# 17. DASHBOARD EXECUTIVO

### Rota: `/dashboard-executivo`

## 📱 LAYOUT COMPLETO (Scroll vertical)

```
┌─────────────────────────────────┐
│  [←]  DASHBOARD EXECUTIVO       │
│              [📅] [📤]           │
├─────────────────────────────────┤
│                                 │
│  📅 Período: [Este Mês ▼]       │
│                                 │
│  💰 RECEITA E CUSTOS            │
│  ┌─────────────────────────┐   │
│  │ R$ 450.000              │   │
│  │ Receita Total           │   │
│  │ ▲ 12% vs mês anterior   │   │
│  │                         │   │
│  │ [Gráfico de Linha]      │   │
│  │  /\  /\                 │   │
│  │ /  \/  \                │   │
│  │ Jan Feb Mar Abr Mai Jun │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌────┬────┬────┐               │
│  │R$  │R$  │38% │               │
│  │280k│170k│    │               │
│  │Cust│Lucr│Marg│               │
│  └────┴────┴────┘               │
│                                 │
│  👥 PERFORMANCE DA EQUIPE       │
│  ┌─────────────────────────┐   │
│  │ [Gráfico de Barras]     │   │
│  │                         │   │
│  │ João   ████████ 127     │   │
│  │ Maria  ██████ 89        │   │
│  │ Pedro  █████ 76         │   │
│  │ Ana    ████ 54          │   │
│  │                         │   │
│  │ Total: 346 visitas      │   │
│  └─────────────────────────┘   │
│                                 │
│  🌾 ÁREAS MONITORADAS           │
│  ┌─────────────────────────┐   │
│  │ [Gráfico de Pizza]      │   │
│  │                         │   │
│  │ 🟢 Saudáveis: 45.3ha(62%)│  │
│  │ 🟡 Atenção: 18.2ha (25%)│   │
│  │ 🔴 Críticas: 9.5ha (13%)│   │
│  │                         │   │
│  │ Total: 73 hectares      │   │
│  └─────────────────────────┘   │
│                                 │
│  🐛 OCORRÊNCIAS                 │
│  ┌─────────────────────────┐   │
│  │ [Gráfico de Área]       │   │
│  │                         │   │
│  │ Pragas   45 (▲ 12%)     │   │
│  │ Doenças  28 (▼ 5%)      │   │
│  │ Nutrição 17 (→ 0%)      │   │
│  │                         │   │
│  │ Total: 90 ocorrências   │   │
│  └─────────────────────────┘   │
│                                 │
│  [📥 Exportar Relatório]        │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Navega para `/dashboard`

### Título "DASHBOARD EXECUTIVO"

### Botão Calendário ([📅])
- **Posição**: Top-right, 56px
- **Ação**: Abre seletor de período

### Botão Exportar ([📤])
- **Posição**: Top-right, 16px
- **Ação**: Exporta dashboard (PDF/Excel)

## 📅 FILTRO DE PERÍODO

### Dropdown
- **Margin**: 16px
- **Largura**: 100%
- **Specs**: Padrão de dropdowns

**Opções**:
- Hoje
- Esta Semana
- Este Mês (default)
- Último Trimestre
- Este Ano
- Personalizado (date range picker)

**Ao mudar**: Recarrega todos os gráficos

## 💰 SEÇÃO "RECEITA E CUSTOS"

### Container Card
- **Margin**: 16px
- **Padding**: 16px
- **Background**: Linear gradient
  - Top: rgba(0, 87, 255, 0.05)
  - Bottom: #FFFFFF
- **Border**: 1px solid rgba(0, 87, 255, 0.1)
- **Border-radius**: 16px
- **Box-shadow**: 0px 4px 12px rgba(0,0,0,0.06)

### Header
- **Ícone**: 💰 (20px)
- **Texto**: "RECEITA E CUSTOS"
- **Margin-bottom**: 16px

### Receita Total (destaque)

**Valor**:
- **Texto**: "R$ 450.000"
- **Fonte**: 32px, weight 800, color #28A745 (verde)
- **Margin-bottom**: 4px

**Label**:
- **Texto**: "Receita Total"
- **Fonte**: 14px, weight 600, color #6C757D

**Comparação**:
- **Ícone**: ▲ ou ▼ (18px)
  - Verde se cresceu
  - Vermelho se caiu
- **Texto**: "12% vs mês anterior"
  - Fonte: 13px, weight 600
  - Color: Verde/Vermelho
- **Margin-bottom**: 20px

### Gráfico de Linha (Receita ao Longo do Tempo)

**Biblioteca**: Recharts

**Container**:
- **Altura**: 200px
- **Largura**: 100%
- **Margin**: 20px vertical

**Config**:
- **Tipo**: LineChart
- **Data**: 6 meses de dados
- **X-Axis**: Meses (Jan, Fev, Mar...)
  - Font: 11px, color #6C757D
- **Y-Axis**: Valores (formatados: R$ 100k)
  - Font: 11px, color #6C757D
- **Grid**: Horizontal lines (#F8F9FA, dashed)
- **Line**: 
  - Color: #0057FF
  - Stroke-width: 3px
  - Dot: Círculo 6px nos pontos
  - Smooth: Curva suave (cardinal)
- **Tooltip**:
  - Background: #FFFFFF
  - Border: 1px solid #E9ECEF
  - Padding: 8px
  - Font: 13px
  - Shadow: 0px 2px 8px rgba(0,0,0,0.1)

**Responsivo**: Ajusta ao container

### Grid de Métricas (3 cards)

**Layout**:
- **Margin-top**: 16px
- **Display**: Grid 3 colunas
- **Gap**: 12px

**Cada Card**:
```
┌────┐
│R$  │
│280k│
│Cust│
└────┘
```

**Dimensões**:
- **Altura**: 80px
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px
- **Padding**: 12px
- **Text-align**: Center

**Valor**:
- **Fonte**: 22px, weight 800
- **Color por tipo**:
  - Custos: #DC3545 (vermelho)
  - Lucro: #28A745 (verde)
  - Margem: #0057FF (azul)

**Label**:
- **Fonte**: 11px, weight 600, color #6C757D, uppercase

**3 Cards**:
1. **Custos**: R$ 280k
2. **Lucro**: R$ 170k
3. **Margem**: 38%

## 👥 SEÇÃO "PERFORMANCE DA EQUIPE"

### Container Card
- **Specs**: Iguais ao card Receita

### Header
- **Ícone**: 👥
- **Texto**: "PERFORMANCE DA EQUIPE"

### Gráfico de Barras Horizontal

**Biblioteca**: Recharts (BarChart)

**Container**:
- **Altura**: 240px (auto-ajusta por membros)
- **Largura**: 100%

**Config**:
- **Tipo**: BarChart layout="vertical"
- **Data**: Top 4-6 membros da equipe
- **Y-Axis**: Nomes
  - Font: 13px, weight 600, color #212529
  - Width: 60px
- **X-Axis**: Número de visitas
  - Font: 11px, color #6C757D
- **Bars**:
  - Color: Gradiente (#0057FF → #00C9FF)
  - Border-radius: 0 8px 8px 0 (arredonda direita)
  - Height: 32px
  - Gap: 12px entre barras
- **Labels**: 
  - Valor no final da barra (fora)
  - Font: 14px, weight 700, color #212529
  - Exemplo: "127"

**Dados exemplo**:
1. João: 127 visitas
2. Maria: 89 visitas
3. Pedro: 76 visitas
4. Ana: 54 visitas

### Footer do Card

**Total**:
- **Texto**: "Total: 346 visitas"
- **Margin-top**: 16px
- **Padding-top**: 16px
- **Border-top**: 1px solid #E9ECEF
- **Fonte**: 15px, weight 700, color #212529
- **Text-align**: Center

## 🌾 SEÇÃO "ÁREAS MONITORADAS"

### Header
- **Ícone**: 🌾
- **Texto**: "ÁREAS MONITORADAS"

### Gráfico de Pizza (Donut)

**Biblioteca**: Recharts (PieChart)

**Container**:
- **Altura**: 240px
- **Largura**: 100%

**Config**:
- **Tipo**: PieChart com innerRadius (donut)
- **Data**: 3 categorias por status
- **Colors**:
  - Saudáveis: #28A745 (verde)
  - Atenção: #FFC107 (amarelo)
  - Críticas: #DC3545 (vermelho)
- **Inner Radius**: 60% (donut hole)
- **Outer Radius**: 90%
- **Padding Angle**: 2 (gap entre slices)
- **Labels**: 
  - Percentual dentro do slice
  - Font: 14px, weight 700, color #FFFFFF
- **Legend**: Personalizada abaixo (não usar padrão)

**Centro do Donut**:
- **Texto**: "73 ha"
  - Total de hectares
  - Fonte: 24px, weight 800, color #212529
- **Subtexto**: "Total"
  - Fonte: 13px, weight 500, color #6C757D
- **Posição**: Absolute center

### Legenda Customizada (abaixo)

**Layout**:
- **Margin-top**: 16px
- **Display**: Flex column
- **Gap**: 8px

**Cada item**:
```
🟢 Saudáveis: 45.3 ha (62%)
```

**Estrutura**:
- **Indicador**: Círculo 12x12px (cor correspondente)
- **Label**: "Saudáveis"
  - Fonte: 14px, weight 600
- **Valor**: "45.3 ha"
  - Fonte: 14px, weight 700
- **Percentual**: "(62%)"
  - Fonte: 13px, weight 500, color #6C757D

## 🐛 SEÇÃO "OCORRÊNCIAS"

### Header
- **Ícone**: 🐛
- **Texto**: "OCORRÊNCIAS"

### Gráfico de Área (Stacked Area Chart)

**Biblioteca**: Recharts (AreaChart)

**Container**:
- **Altura**: 200px
- **Largura**: 100%

**Config**:
- **Tipo**: AreaChart
- **Data**: Últimas 4 semanas
- **X-Axis**: Semanas
- **Y-Axis**: Quantidade
- **3 Áreas empilhadas**:
  1. **Pragas**: 
     - Color: #DC3545 (vermelho)
     - Fill opacity: 0.6
  2. **Doenças**: 
     - Color: #FF8800 (laranja)
     - Fill opacity: 0.6
  3. **Nutrição**: 
     - Color: #FFC107 (amarelo)
     - Fill opacity: 0.6
- **Gradient**: Cada área com gradient vertical
- **Grid**: Horizontal lines

### Resumo por Categoria (abaixo)

**Layout**:
- **Margin-top**: 16px
- **Display**: Flex column
- **Gap**: 8px

**Cada categoria**:
```
Pragas   45 (▲ 12%)
```

**Estrutura**:
- **Label**: "Pragas"
  - Fonte: 14px, weight 600
- **Valor**: "45"
  - Fonte: 16px, weight 700
- **Tendência**: "(▲ 12%)" ou "(▼ 5%)" ou "(→ 0%)"
  - Ícone: ▲▼→
  - Color: Verde/Vermelho/Cinza
  - Fonte: 13px, weight 600

**Total**:
- **Separador**: Border-top
- **Texto**: "Total: 90 ocorrências"
- **Specs**: 15px bold, centro

## 📥 BOTÃO "EXPORTAR RELATÓRIO"

### Specs
- **Margin**: 24px 16px 40px
- **Largura**: Calc(100% - 32px)
- **Altura**: 56px
- **Background**: #0057FF
- **Border-radius**: 28px
- **Box-shadow**: 0px 4px 16px rgba(0, 87, 255, 0.3)

**Conteúdo**:
- **Ícone**: 📥 Download (22px, branco)
- **Texto**: "Exportar Relatório Completo"
  - Fonte: 15px, weight 700, color #FFFFFF

**Ação**: Abre sheet de exportação

## 📄 SHEET "EXPORTAR"

### Estrutura
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Exportar Relatório     [X]     │
│                                 │
│  Formato                        │
│  ○ PDF (completo)               │
│  ● Excel (dados tabulares)      │
│  ○ Imagem (PNG)                 │
│                                 │
│  Período                        │
│  [Este Mês ▼]                   │
│                                 │
│  Incluir                        │
│  ☑ Gráficos                     │
│  ☑ Tabelas de dados             │
│  ☑ Análises e insights          │
│  ☐ Fotos de visitas             │
│                                 │
│  [GERAR E BAIXAR]               │
│                                 │
└─────────────────────────────────┘
```

**Campos**: Specs padrão

**Botão**: 
1. Gera arquivo
2. Progress (0-100%)
3. Abre share sheet ou salva

## 🎭 ANIMAÇÕES

**Entrada de gráficos**:
- Stagger (0.1s delay entre cada)
- Fade in + slide up

**Gráfico de linha**:
- Draw animation (linha se desenha)
- Duração: 1s

**Barras**:
- Width 0 → valor final (0.8s ease-out)
- Stagger 0.1s

**Pizza**:
- Rotate in (360° em 0.8s)
- Slices aparecem um por vez

**Valores**:
- Count up animation (0 → valor)
- Duração: 1s

---

Continuo com as páginas finais 18-23?

