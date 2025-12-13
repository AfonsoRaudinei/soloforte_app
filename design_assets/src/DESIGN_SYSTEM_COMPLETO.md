# 🎨 DESIGN SYSTEM COMPLETO - SOLOFORTE

## 📱 Visão Geral

Design system premium para aplicativo mobile-only agro-tech, focado em **transformar complexidade em decisões simples e produtivas**.

---

## 🎯 PRINCÍPIOS DE DESIGN

### Hierarquia Visual
1. **Primário**: Azul #0057FF (ações principais, FAB, links)
2. **Secundário**: Cinzas (estrutura, hierarquia)
3. **Destaque**: Verde #4ADE80 (sucesso, feedback positivo)
4. **Alerta**: Vermelho #EF4444 (erros, urgência)

### Design Emocional
- **Clean**: Espaços em branco generosos
- **Profissional**: Sombras suaves, bordas arredondadas
- **Confiável**: Consistência visual rigorosa
- **Acessível**: Contraste adequado, touch targets grandes

---

## 📐 1. COMPONENTES DE NAVEGAÇÃO

### 1.1 FAB (Floating Action Button)

#### **Especificações**
```
Tamanho: 64px × 64px
Border-radius: 16px (Android) | 32px (iOS)
Background: #0057FF
Shadow: 0 8px 24px rgba(0,87,255,0.3)
Icon: 28px × 28px
Z-index: 100
```

#### **Estados**
- **Normal**: Azul sólido
- **Hover**: `brightness(110%)`
- **Active**: `scale(0.95)`
- **Dashboard**: Ícone "+" (abre menu)
- **Outras telas**: Ícone "←" (volta ao dashboard)
- **Telas com header**: Oculto (sem redundância)

#### **Posicionamento**
```
Position: fixed
Bottom: 24px
Right: 24px
```

#### **Wireframe**
```
┌─────────────────────────┐
│                         │
│                         │
│                         │
│                         │
│                         │
│                         │
│                         │
│                    [🔵]│ ← FAB
└─────────────────────────┘
```

---

### 1.2 Header de Navegação

#### **Especificações**
```
Height: 64px (56px mobile small)
Background: #FFFFFF
Border-bottom: 1px solid #E5E7EB
Padding: 16px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
```

#### **Anatomia**
```
┌───────────────────────────────┐
│ ← [Título]            [Ação] │
│ 40px  16px medium     icon    │
└───────────────────────────────┘
```

#### **Elementos**
1. **Botão Voltar**: 40px × 40px, ícone 20px
2. **Título**: 16px medium, gray-900
3. **Subtítulo** (opcional): 14px regular, gray-600
4. **Ação** (opcional): Botão icon ou text

---

### 1.3 Menu Secundário (Bottom Sheet)

#### **Especificações**
```
Height: 75vh
Border-radius: 24px 24px 0 0
Background: #FFFFFF
Shadow: 0 -4px 20px rgba(0,0,0,0.15)
```

#### **Item do Menu**
```
Height: 72px
Padding: 16px
Gap: 16px (ícone → texto)

┌──────────────────────────────┐
│ 🔵  Título               › │
│     Descrição              │
└──────────────────────────────┘
```

#### **Estados**
- **Normal**: background transparent
- **Hover**: background gray-50
- **Active**: background gray-100
- **Com badge**: Contador vermelho no ícone

---

## 📐 2. COMPONENTES DE INTERAÇÃO

### 2.1 Botões Primários

#### **Especificações**
```
Height: 44px (mínimo WCAG)
Padding: 12px 24px
Border-radius: 12px
Font: 14px medium
```

#### **Variantes**

**Primary (Azul)**
```
Background: #0057FF
Text: #FFFFFF
Shadow: 0 2px 8px rgba(0,87,255,0.2)
Hover: brightness(110%)
Active: scale(0.98)
```

**Secondary (Cinza)**
```
Background: #F3F4F6
Text: #374151
Border: 1px solid #E5E7EB
Hover: background #E5E7EB
```

**Destructive (Vermelho)**
```
Background: #EF4444
Text: #FFFFFF
Shadow: 0 2px 8px rgba(239,68,68,0.2)
```

**Ghost (Transparente)**
```
Background: transparent
Text: #374151
Hover: background #F3F4F6
```

---

### 2.2 Botões Icon

#### **Especificações**
```
Size: 40px × 40px (44px para touch)
Border-radius: 8px
Icon: 20px × 20px
```

#### **Estados**
```
Normal: transparent ou gray-100
Hover: gray-200
Active: gray-300
Disabled: opacity 50%
```

---

### 2.3 Botões Expansíveis

#### **Trigger**
```
Width: 48px
Height: 48px
Border-radius: 12px
Background: white
Shadow: 0 4px 12px rgba(0,0,0,0.15)
Icon: 24px × 24px
```

#### **Menu Expandido**
```
Width: 200px
Max-height: 400px
Border-radius: 16px
Background: white/95% blur(10px)
Shadow: 0 8px 24px rgba(0,0,0,0.2)
Padding: 8px
Gap: 4px
```

#### **Item Expandido**
```
Height: 44px
Padding: 12px
Border-radius: 12px
Gap: 10px

┌──────────────────────────┐
│ 🔵 Título          [⚡] │
│    Descrição            │
└──────────────────────────┘
```

#### **Tipos**
1. **Check-In/Out**: Verde/Vermelho
2. **Desenho**: Ferramentas de mapa
3. **Camadas**: Tipos de visualização

---

## 📐 3. CARDS E CONTAINERS

### 3.1 Card Padrão

#### **Especificações**
```
Border-radius: 16px
Background: #FFFFFF
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Padding: 16px
Border: 1px solid #F3F4F6
```

#### **Anatomia**
```
┌────────────────────────┐
│ [Título]          [?] │ ← Header (opcional)
├────────────────────────┤
│                        │
│  Conteúdo              │ ← Body
│                        │
├────────────────────────┤
│ [Ação]         [Ação] │ ← Footer (opcional)
└────────────────────────┘
```

---

### 3.2 Card de Clima

#### **Especificações**
```
Border-radius: 20px
Background: linear-gradient(135deg, #3B82F6, #2563EB)
Shadow: 0 8px 24px rgba(59,130,246,0.3)
Padding: 24px
Text: #FFFFFF
```

#### **Layout**
```
┌────────────────────────┐
│ 28°C            ☀️    │ ← Temperatura + ícone
│ Parcialmente nublado  │ ← Descrição
│ Sensação: 30°C        │ ← Detalhes
├────────────────────────┤
│ 💧65%  💨15  ☁️1013  │ ← Métricas
└────────────────────────┘
```

---

### 3.3 Card de Localização

#### **Especificações**
```
Border-radius: 16px
Background: white
Shadow: 0 4px 16px rgba(0,0,0,0.12)
Padding: 16px
Max-width: 320px
```

#### **Conteúdo**
```
┌────────────────────────┐
│ 📍 Localização Atual  ×│
├────────────────────────┤
│ São Paulo, SP          │
│ Brasil                 │
│                        │
│ 📊 -23.5505, -46.6333 │
└────────────────────────┘
```

---

## 📐 4. COMPONENTES DE FORMULÁRIO

### 4.1 Input Field

#### **Especificações**
```
Height: 44px
Border-radius: 8px
Border: 1px solid #E5E7EB
Padding: 12px 16px
Font: 14px regular
```

#### **Estados**
```
Normal: border gray-200
Focus: border blue-500, ring 2px blue-200
Error: border red-500, ring 2px red-200
Disabled: background gray-100, opacity 60%
```

---

### 4.2 Textarea

#### **Especificações**
```
Min-height: 88px
Border-radius: 8px
Border: 1px solid #E5E7EB
Padding: 12px 16px
Font: 14px regular
Resize: vertical
```

---

### 4.3 Select

#### **Trigger**
```
Height: 44px
Border-radius: 8px
Border: 1px solid #E5E7EB
Padding: 12px 16px
```

#### **Dropdown**
```
Border-radius: 12px
Background: white
Shadow: 0 8px 24px rgba(0,0,0,0.15)
Max-height: 300px
Overflow: auto
```

#### **Option**
```
Height: 40px
Padding: 8px 12px
Hover: background gray-100
Selected: background blue-50
```

---

### 4.4 Checkbox e Radio

#### **Especificações**
```
Size: 20px × 20px
Border-radius: 4px (checkbox) | 50% (radio)
Border: 2px solid #E5E7EB
```

#### **Estados**
```
Unchecked: border gray-300
Checked: background blue-500, border blue-500
Hover: border blue-400
Disabled: opacity 50%
```

---

## 📐 5. COMPONENTES DE FEEDBACK

### 5.1 Toast (Sonner)

#### **Especificações**
```
Width: calc(100% - 32px)
Max-width: 400px
Border-radius: 12px
Padding: 16px
Shadow: 0 8px 24px rgba(0,0,0,0.15)
```

#### **Variantes**

**Success**
```
Background: #10B981
Text: white
Icon: Check (20px)
```

**Error**
```
Background: #EF4444
Text: white
Icon: AlertCircle (20px)
```

**Info**
```
Background: #0057FF
Text: white
Icon: Info (20px)
```

**Warning**
```
Background: #F59E0B
Text: white
Icon: AlertTriangle (20px)
```

---

### 5.2 Badge

#### **Especificações**
```
Height: 20px
Padding: 4px 8px
Border-radius: 6px
Font: 11px medium
```

#### **Variantes**
```
Primary: bg-blue-500, text-white
Success: bg-green-500, text-white
Warning: bg-yellow-500, text-white
Error: bg-red-500, text-white
Secondary: bg-gray-200, text-gray-700
```

---

### 5.3 Progress Bar

#### **Especificações**
```
Height: 8px
Border-radius: 4px
Background: gray-200
```

#### **Fill**
```
Background: blue-500
Border-radius: 4px
Transition: width 300ms ease
```

---

### 5.4 Skeleton Loader

#### **Especificações**
```
Border-radius: 8px
Background: linear-gradient(
  90deg,
  #F3F4F6 0%,
  #E5E7EB 50%,
  #F3F4F6 100%
)
Animation: shimmer 2s infinite
```

---

## 📐 6. COMPONENTES DE MAPA

### 6.1 Bússola

#### **Especificações**
```
Size: 48px × 48px
Border-radius: 50%
Background: white
Shadow: 0 4px 12px rgba(0,0,0,0.15)
Border: 2px solid #E5E7EB
```

#### **Indicador**
```
Cor Norte: #EF4444 (vermelho)
Cor Sul: #6B7280 (cinza)
Rotação: Dinâmica
```

---

### 6.2 Botão de Localização

#### **Especificações**
```
Size: 56px × 56px
Border-radius: 50%
Background: white
Shadow: 0 10px 40px rgba(0,0,0,0.15)
Icon: 24px × 24px, azul #0057FF
```

#### **Estados**
```
Normal: MapPin icon
Loading: Navigation icon (rotating)
Hover: scale 1.05
Active: scale 0.95
```

---

### 6.3 Controles de Zoom

#### **Especificações**
```
Width: 40px
Height: 88px (2 botões)
Border-radius: 8px
Background: white
Shadow: 0 2px 8px rgba(0,0,0,0.1)
```

#### **Botões**
```
Height: 40px cada
Icon: Plus/Minus (20px)
Separator: 1px solid gray-200
```

---

## 📐 7. COMPONENTES DE LISTA

### 7.1 List Item

#### **Especificações**
```
Height: 72px (com subtítulo) | 56px (sem)
Padding: 12px 16px
Border-bottom: 1px solid #F3F4F6
```

#### **Anatomia**
```
┌────────────────────────────┐
│ 🔵 Título            [›] │
│    Subtítulo              │
│    Meta (data/status)     │
└────────────────────────────┘
```

---

### 7.2 Grid de Cards

#### **Especificações**
```
Gap: 16px
Columns: 1 (mobile) | 2 (tablet)
Padding: 16px
```

---

## 📐 8. COMPONENTES ESPECÍFICOS

### 8.1 Scanner de Pragas

#### **Especificações**
```
Camera Viewfinder:
  Border-radius: 16px
  Overlay: rgba(0,0,0,0.3)
  Grid: 3×3, white 1px

Botão Captura:
  Size: 72px × 72px
  Border-radius: 50%
  Background: white
  Border: 4px solid blue-500
  Shadow: 0 4px 16px rgba(0,87,255,0.3)
```

---

### 8.2 NDVI Viewer

#### **Especificações**
```
Container:
  Border-radius: 16px
  Background: white
  Shadow: 0 8px 24px rgba(0,0,0,0.12)

Legenda:
  Height: 32px
  Gradient: Verde → Amarelo → Vermelho
  Labels: 12px, gray-600
```

---

### 8.3 Radar de Clima

#### **Especificações**
```
Overlay:
  Opacity: 60%
  Animation: Pulse 2s infinite

Controles:
  Play/Pause: 40px × 40px
  Timeline: Slider 100% width
```

---

## 📐 9. ESTADOS GLOBAIS

### 9.1 Loading States

#### **Spinner**
```
Size: 24px × 24px (small) | 40px (large)
Color: blue-500
Animation: spin 1s linear infinite
```

#### **Skeleton**
```
Background: gray-200
Animation: shimmer 2s infinite
Border-radius: Match do elemento
```

---

### 9.2 Empty States

#### **Especificações**
```
Icon: 64px × 64px, gray-300
Título: 16px medium, gray-700
Descrição: 14px regular, gray-500
Ação: Botão primário
Padding: 48px 24px
```

---

### 9.3 Error States

#### **Especificações**
```
Icon: AlertCircle (48px), red-500
Título: 16px medium, gray-900
Mensagem: 14px regular, gray-600
Ação: "Tentar novamente" (botão)
```

---

## 📐 10. ANIMAÇÕES E TRANSIÇÕES

### Timing Functions
```
Ease: transition-all 200ms ease
Ease-in: active states 100ms ease-in
Ease-out: hover states 200ms ease-out
Spring: modals/sheets 300ms cubic-bezier(0.34,1.56,0.64,1)
```

### Micro-interações
```
Hover: brightness(110%) ou scale(1.05)
Active: scale(0.95) ou brightness(90%)
Focus: ring 2px, offset 2px
Enter: fade-in + slide-up 300ms
Exit: fade-out + slide-down 200ms
```

---

## 📐 11. RESPONSIVIDADE MOBILE

### Breakpoints
```
Small: 280px - 320px
Medium: 321px - 375px
Large: 376px - 430px
```

### Ajustes por Tamanho

**Small (280px)**
```
Padding: 12px → 16px
Font: 14px → 16px
Buttons: 40px → 44px height
Icons: 20px → 24px
```

**Medium (375px)**
```
Padding: 16px
Font: 16px
Buttons: 44px height
Icons: 24px
```

**Large (430px)**
```
Padding: 16px → 20px
Font: 16px
Buttons: 44px height
Icons: 24px → 28px
```

---

## 📐 12. ACESSIBILIDADE

### Touch Targets
```
Mínimo WCAG: 44px × 44px
Recomendado: 48px × 48px
SoloForte: 44px - 56px
```

### Contraste
```
Texto normal: ≥ 4.5:1
Texto grande: ≥ 3:1
Ícones: ≥ 3:1
```

### Focus States
```
Outline: 2px solid blue-500
Offset: 2px
Border-radius: Match do elemento
```

---

## 📐 13. DARK MODE (Futuro)

### Cores de Fundo
```
Background: #111827 (gray-900)
Surface: #1F2937 (gray-800)
Card: #374151 (gray-700)
```

### Cores de Texto
```
Primary: #F9FAFB (gray-50)
Secondary: #E5E7EB (gray-200)
Disabled: #9CA3AF (gray-400)
```

---

## ✅ CHECKLIST DE COMPONENTES

### Navegação
- [x] FAB
- [x] Header com botão voltar
- [x] Menu secundário (bottom sheet)
- [x] Tabs

### Botões
- [x] Primary
- [x] Secondary
- [x] Ghost
- [x] Icon
- [x] Expansíveis

### Formulários
- [x] Input
- [x] Textarea
- [x] Select
- [x] Checkbox
- [x] Radio
- [x] Switch

### Feedback
- [x] Toast
- [x] Badge
- [x] Progress
- [x] Skeleton
- [x] Empty state
- [x] Error state

### Mapa
- [x] Bússola
- [x] Localização
- [x] Zoom
- [x] Camadas
- [x] Desenho

### Específicos
- [x] Scanner de pragas
- [x] NDVI Viewer
- [x] Radar clima
- [x] Cards de clima
- [x] Lista de relatórios

---

## 📊 RESUMO EXECUTIVO

**Total de Componentes:** 50+  
**Componentes ShadCN:** 30+  
**Componentes Custom:** 20+  
**Estados por Componente:** 3-5 (normal, hover, active, disabled)  
**Variantes:** 2-4 por componente  
**Responsividade:** 3 breakpoints (280px - 430px)  
**Acessibilidade:** WCAG 2.1 AA  

---

**Status:** ✅ DESIGN SYSTEM COMPLETO  
**Última atualização:** 5 de novembro de 2025  
**Versão:** 1.0.0
