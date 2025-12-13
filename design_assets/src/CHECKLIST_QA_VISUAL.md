# ✅ CHECKLIST DE QA VISUAL - SOLOFORTE

## 🎯 Guia de Validação de Implementação

Este checklist garante que todos os componentes visuais seguem o design system e funcionam corretamente em todas as condições.

---

## 📱 1. VALIDAÇÃO GERAL

### 1.1 Responsividade Mobile

#### Small (280px - 320px)
- [ ] Todo conteúdo visível sem scroll horizontal
- [ ] Textos não quebram de forma inadequada
- [ ] Botões são clicáveis (≥ 44px)
- [ ] Imagens redimensionam corretamente
- [ ] Padding/margin adequados (12px-16px)
- [ ] FAB não sobrepõe conteúdo importante
- [ ] Menu expansível não corta na lateral

#### Medium (321px - 375px)
- [ ] Layout padrão renderiza corretamente
- [ ] Cards têm espaçamento adequado (16px gap)
- [ ] Botões têm tamanho confortável (44px)
- [ ] Ícones legíveis (24px)
- [ ] Formulários não transbordam
- [ ] Bottom sheets abrem completamente

#### Large (376px - 430px)
- [ ] Aproveita espaço extra sem ficar esticado
- [ ] Elementos mantêm proporções
- [ ] Padding aumenta proporcionalmente (16px-20px)
- [ ] Ícones maiores onde apropriado (28px)
- [ ] Grids ajustam colunas se aplicável

---

### 1.2 Cores e Contraste

#### Texto sobre Fundo
- [ ] Texto preto (#111827) em fundo branco: ≥ 21:1 ✅
- [ ] Texto cinza (#6B7280) em fundo branco: ≥ 4.5:1
- [ ] Texto branco em azul (#0057FF): ≥ 4.5:1
- [ ] Texto em botões secundários: ≥ 4.5:1
- [ ] Placeholders legíveis: ≥ 3:1

#### Ícones
- [ ] Ícones principais: ≥ 3:1 contraste
- [ ] Ícones desabilitados: claramente visível
- [ ] Ícones em FAB: branco em azul (alto contraste)

#### Estados
- [ ] Hover muda cor perceptivelmente
- [ ] Active state diferente de hover
- [ ] Disabled state opacidade 50% ou cinza
- [ ] Focus ring visível (2px azul)

---

### 1.3 Tipografia

#### Tamanhos
- [ ] Títulos H1: 24px medium
- [ ] Títulos H2: 20px medium
- [ ] Corpo padrão: 16px regular
- [ ] Corpo pequeno: 14px regular
- [ ] Captions: 12px regular
- [ ] Nenhum texto < 12px (exceto badges internos)

#### Line-height
- [ ] Títulos: 1.2 - 1.4
- [ ] Corpo: 1.5 - 1.6
- [ ] Botões: linha única ou centralizado

#### Font-weight
- [ ] Regular (400) para corpo
- [ ] Medium (500) para labels e títulos
- [ ] Bold (700) apenas onde necessário
- [ ] Sem font-weight inconsistente

---

## 🔘 2. COMPONENTES DE NAVEGAÇÃO

### 2.1 FAB (Floating Action Button)

#### Visual
- [ ] Tamanho: 64px × 64px
- [ ] Cor: #0057FF (azul SoloForte)
- [ ] Ícone: 28px × 28px branco
- [ ] Border-radius: 16px (Android) ou 32px (iOS)
- [ ] Sombra: `0 8px 24px rgba(0,87,255,0.3)`
- [ ] Posição: bottom-6 right-6

#### Comportamento
- [ ] Dashboard: Ícone "+" (abre menu)
- [ ] Outras telas: Ícone "←" (volta ao dashboard)
- [ ] Telas com header de voltar: Não aparece
- [ ] Hover: Brightness 110%
- [ ] Active: Scale 0.95
- [ ] Transição: 200ms smooth

#### Contexto
- [ ] Escondido em: /clima
- [ ] Escondido em: /relatorios/novo
- [ ] Escondido em: /configuracoes
- [ ] Escondido em: /feedback
- [ ] Visível em: /dashboard, /agenda, /clientes

---

### 2.2 Header de Navegação

#### Visual
- [ ] Altura: 64px (56px em telas < 320px)
- [ ] Background: Branco #FFFFFF
- [ ] Border-bottom: 1px solid #E5E7EB
- [ ] Sombra: Sutil ou nenhuma

#### Elementos
- [ ] Botão voltar: 40px × 40px
- [ ] Ícone voltar: 20px × 20px
- [ ] Título: 16px medium, gray-900
- [ ] Subtítulo (se houver): 14px regular, gray-600
- [ ] Alinhamento: Vertical center

#### Interação
- [ ] Botão voltar clicável
- [ ] Volta para tela anterior
- [ ] Feedback visual no click
- [ ] Não conflita com FAB

---

### 2.3 Menu Secundário (Bottom Sheet)

#### Visual
- [ ] Altura: 75vh
- [ ] Border-radius: 24px (topo)
- [ ] Background: Branco
- [ ] Sombra: `0 -4px 20px rgba(0,0,0,0.15)`
- [ ] Overlay: `rgba(0,0,0,0.5)`

#### Itens
- [ ] Altura: 72px cada
- [ ] Padding: 16px
- [ ] Ícone: 24px × 24px
- [ ] Gap ícone-texto: 16px
- [ ] Título: 16px medium
- [ ] Descrição: 14px regular, gray-500

#### Comportamento
- [ ] Abre de baixo para cima (300ms spring)
- [ ] Fecha ao clicar item
- [ ] Fecha ao clicar overlay
- [ ] Scroll suave se conteúdo longo
- [ ] Badge de notificações visível

---

## 🔘 3. BOTÕES

### 3.1 Botões Primários

#### Visual
- [ ] Altura: 44px (mínimo touch)
- [ ] Padding: 12px 24px
- [ ] Border-radius: 12px
- [ ] Background: #0057FF
- [ ] Texto: Branco 14px medium
- [ ] Sombra: `0 2px 8px rgba(0,87,255,0.2)`

#### Estados
- [ ] Normal: Azul sólido
- [ ] Hover: Brightness 110% ou bg-[#0047CC]
- [ ] Active: Scale 0.98
- [ ] Disabled: Opacity 50%, não clicável
- [ ] Loading: Spinner branco 20px

---

### 3.2 Botões Secundários

#### Visual
- [ ] Altura: 44px
- [ ] Background: #F3F4F6 (gray-100)
- [ ] Texto: #374151 (gray-700) 14px medium
- [ ] Border: 1px solid #E5E7EB
- [ ] Border-radius: 12px

#### Estados
- [ ] Hover: Background #E5E7EB
- [ ] Active: Background #D1D5DB
- [ ] Disabled: Opacity 50%

---

### 3.3 Botões Icon

#### Visual
- [ ] Tamanho: 40px × 40px (44px com padding invisível)
- [ ] Ícone: 20px × 20px
- [ ] Border-radius: 8px
- [ ] Background: Transparent ou gray-100

#### Estados
- [ ] Hover: Background gray-100
- [ ] Active: Background gray-200
- [ ] Focus: Ring 2px azul

---

### 3.4 Botões Expansíveis

#### Trigger
- [ ] Tamanho: 48px × 48px
- [ ] Border-radius: 12px
- [ ] Background: Branco
- [ ] Sombra: `0 4px 12px rgba(0,0,0,0.15)`
- [ ] Ícone: 24px × 24px

#### Menu Expandido
- [ ] Width: 200px
- [ ] Max-height: 400px
- [ ] Border-radius: 16px
- [ ] Background: `rgba(255,255,255,0.95)` + blur(10px)
- [ ] Sombra: `0 8px 24px rgba(0,0,0,0.2)`
- [ ] Padding: 8px
- [ ] Gap entre itens: 4px

#### Item Expandido
- [ ] Altura: 44px
- [ ] Padding: 12px
- [ ] Ícone: 20px
- [ ] Texto: 12px medium
- [ ] Descrição: 10px regular
- [ ] Hover: Background gray-100
- [ ] Ativo: Gradiente colorido + borda verde

---

## 📝 4. FORMULÁRIOS

### 4.1 Input Fields

#### Visual
- [ ] Altura: 44px
- [ ] Padding: 12px 16px
- [ ] Border: 1px solid #E5E7EB
- [ ] Border-radius: 8px
- [ ] Font: 14px regular

#### Estados
- [ ] Normal: Border cinza
- [ ] Focus: Border azul, ring 2px azul claro
- [ ] Error: Border vermelho, ring 2px vermelho claro
- [ ] Disabled: Background gray-100, opacity 60%
- [ ] Filled: Border cinza mais escuro

#### Validação
- [ ] Placeholder: Gray-400, 14px
- [ ] Label: Gray-700, 14px medium
- [ ] Helper text: Gray-500, 12px
- [ ] Error message: Red-600, 12px

---

### 4.2 Textarea

#### Visual
- [ ] Min-height: 88px (2 linhas)
- [ ] Padding: 12px 16px
- [ ] Border: 1px solid #E5E7EB
- [ ] Border-radius: 8px
- [ ] Resize: Vertical only

#### Comportamento
- [ ] Auto-resize em alguns contextos
- [ ] Max-height: 240px com scroll
- [ ] Focus: Ring azul

---

### 4.3 Select

#### Visual
- [ ] Altura: 44px
- [ ] Padding: 12px 16px
- [ ] Ícone chevron: 16px, direita
- [ ] Border: 1px solid #E5E7EB
- [ ] Border-radius: 8px

#### Dropdown
- [ ] Border-radius: 12px
- [ ] Sombra: `0 8px 24px rgba(0,0,0,0.15)`
- [ ] Max-height: 300px
- [ ] Scroll se necessário

#### Option
- [ ] Altura: 40px
- [ ] Padding: 8px 12px
- [ ] Hover: Background gray-100
- [ ] Selected: Background blue-50, texto azul

---

### 4.4 Checkbox e Radio

#### Visual
- [ ] Tamanho: 20px × 20px
- [ ] Border: 2px solid #E5E7EB
- [ ] Border-radius: 4px (checkbox) ou 50% (radio)

#### Estados
- [ ] Unchecked: Border cinza
- [ ] Checked: Background azul, checkmark branco
- [ ] Hover: Border azul claro
- [ ] Disabled: Opacity 50%

---

### 4.5 Switch

#### Visual
- [ ] Width: 44px
- [ ] Height: 24px
- [ ] Border-radius: 12px (pill)
- [ ] Thumb: 20px × 20px circle

#### Estados
- [ ] Off: Background gray-200, thumb esquerda
- [ ] On: Background green-500, thumb direita
- [ ] Transition: 200ms ease

---

## 🎨 5. CARDS E CONTAINERS

### 5.1 Card Padrão

#### Visual
- [ ] Border-radius: 16px
- [ ] Background: Branco
- [ ] Border: 1px solid #F3F4F6
- [ ] Sombra: `0 2px 8px rgba(0,0,0,0.08)`
- [ ] Padding: 16px

#### Conteúdo
- [ ] Header: Título 16px medium + ação opcional
- [ ] Body: Conteúdo principal
- [ ] Footer: Ações secundárias
- [ ] Gap entre seções: 12px

---

### 5.2 Card de Clima

#### Visual
- [ ] Border-radius: 20px
- [ ] Background: Gradiente azul
- [ ] Sombra: `0 8px 24px rgba(59,130,246,0.3)`
- [ ] Padding: 24px
- [ ] Texto: Branco

#### Elementos
- [ ] Temperatura: 60px (6xl)
- [ ] Descrição: 20px (xl)
- [ ] Métricas: Grid 3 colunas
- [ ] Ícones: 24px brancos com 80% opacity

---

### 5.3 Card de Localização

#### Visual
- [ ] Border-radius: 16px
- [ ] Background: Branco
- [ ] Sombra: `0 4px 16px rgba(0,0,0,0.12)`
- [ ] Padding: 16px
- [ ] Max-width: 320px

#### Comportamento
- [ ] Botão fechar (X) funcional
- [ ] Fecha ao clicar fora
- [ ] Animação de entrada: Slide down + fade
- [ ] Animação de saída: Slide up + fade

---

## 🔔 6. FEEDBACK VISUAL

### 6.1 Toast (Sonner)

#### Visual
- [ ] Width: calc(100% - 32px)
- [ ] Max-width: 400px
- [ ] Border-radius: 12px
- [ ] Padding: 16px
- [ ] Sombra: `0 8px 24px rgba(0,0,0,0.15)`

#### Variantes
- [ ] Success: Verde, ícone Check
- [ ] Error: Vermelho, ícone AlertCircle
- [ ] Info: Azul, ícone Info
- [ ] Warning: Laranja, ícone AlertTriangle

#### Comportamento
- [ ] Aparece no topo centralizado
- [ ] Auto-dismiss em 3-5s
- [ ] Swipe para dismiss
- [ ] Múltiplos toasts empilham

---

### 6.2 Badge

#### Visual
- [ ] Height: 20px
- [ ] Padding: 4px 8px
- [ ] Border-radius: 6px
- [ ] Font: 11px medium
- [ ] Uppercase: Não por padrão

#### Variantes
- [ ] Primary: Azul
- [ ] Success: Verde
- [ ] Warning: Amarelo
- [ ] Error: Vermelho
- [ ] Secondary: Cinza

---

### 6.3 Progress Bar

#### Visual
- [ ] Height: 8px
- [ ] Border-radius: 4px
- [ ] Background: Gray-200
- [ ] Fill: Azul #0057FF
- [ ] Transition: Width 300ms ease

---

### 6.4 Skeleton Loader

#### Visual
- [ ] Border-radius: Match do elemento
- [ ] Background: Gradiente cinza shimmer
- [ ] Animation: Shimmer 2s infinite

#### Tipos
- [ ] Text: Linhas horizontais
- [ ] Card: Retângulo arredondado
- [ ] Avatar: Círculo
- [ ] Image: Retângulo com aspect ratio

---

## 🗺️ 7. COMPONENTES DE MAPA

### 7.1 Bússola

#### Visual
- [ ] Tamanho: 48px × 48px
- [ ] Border-radius: 50%
- [ ] Background: Branco
- [ ] Border: 2px solid #E5E7EB
- [ ] Sombra: `0 4px 12px rgba(0,0,0,0.15)`

#### Indicador
- [ ] Norte: Vermelho
- [ ] Sul: Cinza
- [ ] Rotação: Suave (transition 300ms)
- [ ] Sempre aponta para Norte verdadeiro

---

### 7.2 Botão de Localização

#### Visual
- [ ] Tamanho: 56px × 56px
- [ ] Border-radius: 50%
- [ ] Background: Branco
- [ ] Ícone: MapPin 24px azul
- [ ] Sombra: `0 10px 40px rgba(0,0,0,0.15)`

#### Estados
- [ ] Normal: MapPin estático
- [ ] Loading: Navigation girando
- [ ] Hover: Scale 1.05
- [ ] Active: Scale 0.95
- [ ] Disabled: Opacity 50%

---

### 7.3 Botões Expansíveis de Mapa

#### Camadas
- [ ] Ícone: Map 24px
- [ ] Menu: 5 opções (Streets, Satellite, Terrain, NDVI, Radar)
- [ ] Ativo: Borda verde 4px + badge "ATIVO" + gradiente
- [ ] Inativo: Background gray-100

#### Desenho
- [ ] Ícone: Pen 24px
- [ ] Menu: 8 ferramentas + import
- [ ] Ativa: Background azul claro
- [ ] Hover: Background gray-100

#### Check-In/Out
- [ ] Verde quando ativo
- [ ] Vermelho quando checkout
- [ ] Cinza quando inativo
- [ ] Timer visível quando ativo

---

## 📱 8. TELAS ESPECÍFICAS

### 8.1 Dashboard

#### Layout
- [ ] Mapa fullscreen
- [ ] Header transparente com gradiente
- [ ] Bússola: Top-right
- [ ] Botões expansíveis: Bottom-right (stack vertical)
- [ ] Botão localização: Bottom-right (acima do FAB)
- [ ] FAB: Bottom-right

#### Funcionalidade
- [ ] Mapa carrega sem erro
- [ ] Camadas trocam corretamente
- [ ] Ferramentas de desenho funcionam
- [ ] Check-in inicia timer
- [ ] Localização centraliza mapa

---

### 8.2 Clima

#### Visual
- [ ] Header com voltar + título
- [ ] Card de clima atual: Gradiente azul
- [ ] Previsão 5 dias: Grid 5 colunas
- [ ] Ícones de clima: Legíveis
- [ ] Temperatura: Grande e clara

#### Comportamento
- [ ] FAB não aparece (header tem voltar)
- [ ] Scroll suave
- [ ] Cards responsivos

---

### 8.3 Relatórios

#### Visual
- [ ] Tabs: Técnicos, Visitas, IA
- [ ] Badge com contador em cada tab
- [ ] Lista de relatórios: 72px altura
- [ ] Status badge: Cores semânticas
- [ ] Botão "Novo": Primary azul

#### Comportamento
- [ ] Filtro por tipo funciona
- [ ] Modal de novo relatório abre
- [ ] Salvar cria relatório
- [ ] Navega para editor

---

## 🔍 9. ESTADOS GLOBAIS

### 9.1 Loading

#### Spinner
- [ ] Tamanho: 24px (small) ou 40px (large)
- [ ] Cor: Azul #0057FF
- [ ] Animação: Spin 1s linear infinite
- [ ] Centralizado quando fullscreen

#### Skeleton
- [ ] Match do layout real
- [ ] Shimmer animation
- [ ] Transição suave para conteúdo

---

### 9.2 Empty State

#### Visual
- [ ] Ícone: 64px cinza-300
- [ ] Título: 16px medium gray-700
- [ ] Descrição: 14px regular gray-500
- [ ] Ação: Botão primário
- [ ] Padding: 48px 24px
- [ ] Centralizado vertical e horizontal

---

### 9.3 Error State

#### Visual
- [ ] Ícone: AlertCircle 48px vermelho
- [ ] Título: 16px medium gray-900
- [ ] Mensagem: 14px regular gray-600
- [ ] Ação: "Tentar novamente" azul

#### Comportamento
- [ ] Retry funciona
- [ ] Mensagem de erro clara
- [ ] Não trava a UI

---

## ✅ 10. ACESSIBILIDADE

### 10.1 Touch Targets

- [ ] Todos ≥ 44px × 44px
- [ ] Espaçamento entre targets ≥ 8px
- [ ] Botões importantes ≥ 48px

### 10.2 Contraste

- [ ] Texto em fundo: ≥ 4.5:1
- [ ] Ícones: ≥ 3:1
- [ ] Estados hover: Perceptível

### 10.3 Focus States

- [ ] Focus ring visível (2px azul)
- [ ] Offset: 2px
- [ ] Todos os elementos interativos

---

## 🎬 11. ANIMAÇÕES

### 11.1 Transições

- [ ] Hover: 200ms ease-out
- [ ] Active: 100ms ease-in
- [ ] Modal open: 300ms spring
- [ ] Page transition: 300ms ease

### 11.2 Performance

- [ ] Sem jank (60fps)
- [ ] GPU accelerated quando possível
- [ ] Sem animações excessivas
- [ ] Respeitam prefers-reduced-motion

---

## 📊 12. RESUMO DE VALIDAÇÃO

### Por Tela

#### Dashboard ✅
- [ ] Layout correto
- [ ] Todos os botões funcionais
- [ ] Mapa carrega
- [ ] Sem erros no console

#### Clima ✅
- [ ] Cards renderizam
- [ ] FAB escondido
- [ ] Dados corretos
- [ ] Responsivo

#### Relatórios ✅
- [ ] Lista carrega
- [ ] Filtros funcionam
- [ ] Criar novo funciona
- [ ] Editor abre

#### (Repetir para cada tela)

---

## 🔧 FERRAMENTAS DE TESTE

### Browser DevTools
- [ ] Mobile viewport 375px
- [ ] Network throttling (3G)
- [ ] Lighthouse score > 90
- [ ] Console sem errors

### Teste Manual
- [ ] iPhone SE (320px)
- [ ] iPhone 12 (375px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Android pequeno (360px)

### Validadores
- [ ] WCAG Contrast Checker
- [ ] Touch target validator
- [ ] Lighthouse Accessibility

---

## ✅ APROVAÇÃO FINAL

### Critérios de Release
- [ ] Todos os componentes implementados
- [ ] Nenhum erro crítico no console
- [ ] Responsivo em 280px - 430px
- [ ] Acessibilidade WCAG AA
- [ ] Performance Lighthouse > 90
- [ ] Sem loops infinitos
- [ ] Sem memory leaks
- [ ] Testes manuais passam

### Sign-off
- [ ] Designer aprovou visual
- [ ] QA aprovou funcionalidade
- [ ] Dev aprovou código
- [ ] Product aprovou features

---

**Status:** 📋 CHECKLIST PRONTO  
**Uso:** Validar implementação antes de release  
**Última atualização:** 5 de novembro de 2025  
**Versão:** 1.0.0
