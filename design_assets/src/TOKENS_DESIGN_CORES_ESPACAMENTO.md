# 🎨 TOKENS DE DESIGN - CORES E ESPAÇAMENTO

## 📐 Sistema de Tokens - SoloForte

Design tokens são as **variáveis de design fundamentais** que garantem consistência visual em todo o aplicativo.

---

## 🎨 1. CORES

### 1.1 Paleta Primária

#### **Azul SoloForte (Brand)**
```
--primary-50:  #EFF6FF   /* Fundo claro */
--primary-100: #DBEAFE   /* Hover suave */
--primary-200: #BFDBFE   /* Bordas ativas */
--primary-300: #93C5FD   /* Elementos secundários */
--primary-400: #60A5FA   /* Hover states */
--primary-500: #0057FF   /* ⭐ COR PRINCIPAL */
--primary-600: #0047CC   /* Active states */
--primary-700: #003799   /* Pressed states */
--primary-800: #002766   /* Textos em contraste */
--primary-900: #001733   /* Títulos escuros */
```

#### **Uso**
- `500`: FAB, botões primários, links
- `600`: FAB active, hover de botões
- `700`: Pressed states
- `100`: Fundos de destaque claro
- `200`: Bordas de foco

---

### 1.2 Paleta de Grays (Neutrals)

#### **Escala Completa**
```
--gray-50:  #F9FAFB   /* Fundos subtle */
--gray-100: #F3F4F6   /* Fundos de cards */
--gray-200: #E5E7EB   /* Bordas padrão */
--gray-300: #D1D5DB   /* Bordas hover */
--gray-400: #9CA3AF   /* Texto desabilitado */
--gray-500: #6B7280   /* Texto secundário */
--gray-600: #4B5563   /* Texto terciário */
--gray-700: #374151   /* Texto principal */
--gray-800: #1F2937   /* Títulos */
--gray-900: #111827   /* Texto enfático */
```

#### **Uso**
- `50-100`: Fundos de containers
- `200-300`: Bordas e separadores
- `400-500`: Ícones e texto secundário
- `700-900`: Texto principal e títulos

---

### 1.3 Paleta Semântica

#### **Success (Verde)**
```
--success-50:  #F0FDF4
--success-100: #DCFCE7
--success-200: #BBF7D0
--success-300: #86EFAC
--success-400: #4ADE80   /* ⭐ PRINCIPAL */
--success-500: #22C55E
--success-600: #16A34A
--success-700: #15803D
--success-800: #166534
--success-900: #14532D
```

#### **Uso**
- Check-in ativo
- Mensagens de sucesso
- Indicadores positivos
- Camada NDVI (saudável)

---

#### **Warning (Amarelo/Laranja)**
```
--warning-50:  #FFFBEB
--warning-100: #FEF3C7
--warning-200: #FDE68A
--warning-300: #FCD34D
--warning-400: #FBBF24   /* ⭐ PRINCIPAL */
--warning-500: #F59E0B
--warning-600: #D97706
--warning-700: #B45309
--warning-800: #92400E
--warning-900: #78350F
```

#### **Uso**
- Alertas de atenção
- Status pendente
- NDVI (moderado)

---

#### **Error/Danger (Vermelho)**
```
--error-50:  #FEF2F2
--error-100: #FEE2E2
--error-200: #FECACA
--error-300: #FCA5A5
--error-400: #F87171
--error-500: #EF4444   /* ⭐ PRINCIPAL */
--error-600: #DC2626
--error-700: #B91C1C
--error-800: #991B1B
--error-900: #7F1D1D
```

#### **Uso**
- Mensagens de erro
- Botões destrutivos
- Badges de urgência
- NDVI (crítico)

---

#### **Info (Azul Claro)**
```
--info-50:  #F0F9FF
--info-100: #E0F2FE
--info-200: #BAE6FD
--info-300: #7DD3FC
--info-400: #38BDF8
--info-500: #0EA5E9   /* ⭐ PRINCIPAL */
--info-600: #0284C7
--info-700: #0369A1
--info-800: #075985
--info-900: #0C4A6E
```

#### **Uso**
- Mensagens informativas
- Tooltips
- Badges informativos

---

### 1.4 Cores Funcionais

#### **Camadas de Mapa**
```
--layer-street:    #8B5CF6 → #7C3AED  /* Purple gradient */
--layer-satellite: #3B82F6 → #2563EB  /* Blue gradient */
--layer-terrain:   #6366F1 → #4F46E5  /* Indigo gradient */
--layer-ndvi:      #10B981 → #059669  /* Green gradient */
--layer-radar:     #0EA5E9 → #0284C7  /* Sky gradient */
```

#### **Check-In/Out**
```
--checkin-active:   #22C55E  /* Verde */
--checkout-active:  #EF4444  /* Vermelho */
```

#### **NDVI Scale**
```
--ndvi-critical:  #EF4444   /* Vermelho */
--ndvi-low:       #F59E0B   /* Laranja */
--ndvi-moderate:  #FBBF24   /* Amarelo */
--ndvi-good:      #84CC16   /* Lima */
--ndvi-excellent: #22C55E   /* Verde */
```

---

### 1.5 Cores de Fundo

#### **Backgrounds**
```
--bg-page:        #F9FAFB   /* gray-50 */
--bg-card:        #FFFFFF   /* white */
--bg-elevated:    #FFFFFF   /* white com shadow */
--bg-subtle:      #F3F4F6   /* gray-100 */
--bg-overlay:     rgba(0,0,0,0.5)  /* Modais */
--bg-blur:        rgba(255,255,255,0.95) /* Glassmorphism */
```

---

### 1.6 Cores de Texto

#### **Text Colors**
```
--text-primary:     #111827  /* gray-900 */
--text-secondary:   #6B7280  /* gray-500 */
--text-tertiary:    #9CA3AF  /* gray-400 */
--text-disabled:    #D1D5DB  /* gray-300 */
--text-inverse:     #FFFFFF  /* white */
--text-link:        #0057FF  /* primary-500 */
--text-success:     #15803D  /* success-700 */
--text-warning:     #B45309  /* warning-700 */
--text-error:       #B91C1C  /* error-700 */
```

---

### 1.7 Cores de Borda

#### **Border Colors**
```
--border-default:   #E5E7EB  /* gray-200 */
--border-hover:     #D1D5DB  /* gray-300 */
--border-focus:     #0057FF  /* primary-500 */
--border-error:     #EF4444  /* error-500 */
--border-success:   #4ADE80  /* success-400 */
```

---

## 📏 2. ESPAÇAMENTO

### 2.1 Escala Base (4px)

```
--space-0:   0px
--space-1:   4px    /* 0.25rem */
--space-2:   8px    /* 0.5rem */
--space-3:   12px   /* 0.75rem */
--space-4:   16px   /* 1rem ⭐ UNIDADE BASE */
--space-5:   20px   /* 1.25rem */
--space-6:   24px   /* 1.5rem */
--space-8:   32px   /* 2rem */
--space-10:  40px   /* 2.5rem */
--space-12:  48px   /* 3rem */
--space-16:  64px   /* 4rem */
--space-20:  80px   /* 5rem */
--space-24:  96px   /* 6rem */
```

### 2.2 Uso por Contexto

#### **Padding Interno**
```
Card: space-4 (16px)
Button: space-3 space-6 (12px 24px)
Input: space-3 space-4 (12px 16px)
Modal: space-6 (24px)
List item: space-3 space-4 (12px 16px)
```

#### **Margin/Gap**
```
Entre componentes: space-4 (16px)
Entre seções: space-6 (24px)
Entre grupos: space-8 (32px)
Entre páginas: space-12 (48px)
```

#### **Touch Spacing**
```
Mínimo entre targets: space-2 (8px)
Recomendado: space-3 (12px)
Confortável: space-4 (16px)
```

---

## 📐 3. TIPOGRAFIA

### 3.1 Escala de Fonte

```
--text-xs:   12px  /* 0.75rem */   line-height: 16px
--text-sm:   14px  /* 0.875rem */  line-height: 20px
--text-base: 16px  /* 1rem */      line-height: 24px ⭐
--text-lg:   18px  /* 1.125rem */  line-height: 28px
--text-xl:   20px  /* 1.25rem */   line-height: 28px
--text-2xl:  24px  /* 1.5rem */    line-height: 32px
--text-3xl:  30px  /* 1.875rem */  line-height: 36px
--text-4xl:  36px  /* 2.25rem */   line-height: 40px
```

### 3.2 Font Weights

```
--font-light:     300
--font-regular:   400  /* ⭐ PADRÃO */
--font-medium:    500
--font-semibold:  600
--font-bold:      700
```

### 3.3 Font Families

```
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', 
             sans-serif
             
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', 
             Consolas, 'Courier New', monospace
```

### 3.4 Hierarquia Tipográfica

#### **Títulos**
```
H1: 24px medium, gray-900, line-height 32px
H2: 20px medium, gray-900, line-height 28px
H3: 18px medium, gray-800, line-height 28px
H4: 16px medium, gray-800, line-height 24px
```

#### **Corpo**
```
Body Large:  16px regular, gray-700, line-height 24px
Body:        14px regular, gray-700, line-height 20px
Body Small:  12px regular, gray-600, line-height 16px
```

#### **Labels**
```
Label:       14px medium, gray-700, line-height 20px
Caption:     12px regular, gray-500, line-height 16px
Overline:    11px medium, gray-500, uppercase, letter-spacing 0.5px
```

---

## 📦 4. DIMENSÕES DE COMPONENTES

### 4.1 Heights

```
--height-input:      44px   /* Inputs, selects */
--height-button:     44px   /* Botões primários */
--height-button-sm:  36px   /* Botões pequenos */
--height-button-lg:  52px   /* Botões grandes */
--height-icon:       40px   /* Botões icon */
--height-fab:        64px   /* FAB */
--height-header:     64px   /* Header de navegação */
--height-tab:        48px   /* Tab bar */
--height-list-item:  56px   /* Item de lista simples */
--height-list-2line: 72px   /* Item com subtítulo */
```

### 4.2 Widths (Máximos)

```
--width-xs:   320px
--width-sm:   384px
--width-md:   448px
--width-lg:   512px
--width-xl:   576px
--width-2xl:  672px
--width-full: 100%
```

### 4.3 Touch Targets

```
--touch-min:     44px   /* WCAG mínimo */
--touch-comfort: 48px   /* Recomendado */
--touch-large:   56px   /* Confortável */
```

---

## 🎯 5. BORDER RADIUS

### 5.1 Escala

```
--radius-none: 0px
--radius-sm:   4px    /* Badges pequenos */
--radius-md:   8px    /* Inputs, botões ⭐ */
--radius-lg:   12px   /* Cards, modais */
--radius-xl:   16px   /* Cards grandes */
--radius-2xl:  24px   /* Bottom sheets */
--radius-full: 9999px /* Circular */
```

### 5.2 Uso por Componente

```
Input/Select:    8px
Button:          12px
Card:            16px
Modal:           24px
Bottom Sheet:    24px (topo)
FAB (Android):   16px
FAB (iOS):       32px (full)
Avatar:          9999px (full)
Badge:           6px
```

---

## 🌑 6. SOMBRAS (SHADOWS)

### 6.1 Elevações

```
--shadow-xs:
  0 1px 2px rgba(0,0,0,0.05)
  /* Bordas suaves */

--shadow-sm:
  0 1px 3px rgba(0,0,0,0.1),
  0 1px 2px rgba(0,0,0,0.06)
  /* Cards simples */

--shadow-md:
  0 4px 6px rgba(0,0,0,0.07),
  0 2px 4px rgba(0,0,0,0.05)
  /* Cards hover */

--shadow-lg:
  0 10px 15px rgba(0,0,0,0.1),
  0 4px 6px rgba(0,0,0,0.05)
  /* Modais, dropdowns */

--shadow-xl:
  0 20px 25px rgba(0,0,0,0.1),
  0 10px 10px rgba(0,0,0,0.04)
  /* FAB, botões flutuantes */

--shadow-2xl:
  0 25px 50px rgba(0,0,0,0.15)
  /* Modais grandes */
```

### 6.2 Sombras Coloridas

```
--shadow-primary:
  0 8px 24px rgba(0,87,255,0.3)
  /* FAB, botões primários hover */

--shadow-success:
  0 4px 12px rgba(74,222,128,0.3)
  /* Check-in ativo */

--shadow-error:
  0 4px 12px rgba(239,68,68,0.3)
  /* Checkout ativo, erros */
```

---

## ⚡ 7. Z-INDEX

### 7.1 Escala

```
--z-base:      0    /* Conteúdo normal */
--z-elevated:  5    /* Bússola, widgets */
--z-sticky:    10   /* Headers sticky */
--z-floating:  50   /* Botões expansíveis */
--z-fab:       100  /* FAB */
--z-overlay:   150  /* Overlay de modais */
--z-modal:     200  /* Modais, bottom sheets */
--z-toast:     300  /* Toast notifications */
--z-tooltip:   400  /* Tooltips */
```

---

## 🎬 8. ANIMAÇÕES

### 8.1 Duration

```
--duration-fast:    100ms  /* Active states */
--duration-normal:  200ms  /* Hover, transitions ⭐ */
--duration-slow:    300ms  /* Modais, sheets */
--duration-slower:  500ms  /* Grandes mudanças */
```

### 8.2 Easing

```
--ease-linear:      linear
--ease-in:          cubic-bezier(0.4, 0, 1, 1)
--ease-out:         cubic-bezier(0, 0, 0.2, 1) ⭐
--ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1)
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1)
```

### 8.3 Keyframes Comuns

```
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
```

---

## 📱 9. BREAKPOINTS MOBILE

### 9.1 Escala

```
--bp-xs:   280px   /* Small phones */
--bp-sm:   320px   /* iPhone SE */
--bp-md:   375px   /* iPhone 12/13 ⭐ */
--bp-lg:   430px   /* iPhone 14 Pro Max */
```

### 9.2 Media Queries

```css
/* Small phones */
@media (max-width: 320px) {
  /* Ajustes para telas pequenas */
}

/* Standard */
@media (min-width: 321px) and (max-width: 375px) {
  /* Faixa mais comum */
}

/* Large phones */
@media (min-width: 376px) {
  /* Telas maiores */
}
```

---

## 🎨 10. OPACITY

### 10.1 Escala

```
--opacity-0:    0      /* Invisível */
--opacity-5:    0.05
--opacity-10:   0.10
--opacity-20:   0.20
--opacity-30:   0.30
--opacity-40:   0.40
--opacity-50:   0.50   /* Semi-transparente */
--opacity-60:   0.60
--opacity-70:   0.70
--opacity-80:   0.80
--opacity-90:   0.90
--opacity-95:   0.95
--opacity-100:  1      /* Opaco ⭐ */
```

### 10.2 Uso Semântico

```
--opacity-disabled:  0.50   /* Elementos desabilitados */
--opacity-overlay:   0.50   /* Overlay de modais */
--opacity-hover:     0.80   /* Hover de imagens */
--opacity-subtle:    0.60   /* Texto secundário */
```

---

## 🔲 11. BLUR

### 11.1 Escala

```
--blur-none:  0px
--blur-sm:    4px    /* Subtle */
--blur-md:    8px    /* Glassmorphism ⭐ */
--blur-lg:    12px   /* Strong blur */
--blur-xl:    16px   /* Very blurred */
```

### 11.2 Uso

```
Bottom sheet backdrop: blur(10px)
Glassmorphism cards: blur(8px)
Image placeholders: blur(20px)
```

---

## 📐 12. ASPECT RATIOS

```
--aspect-square:  1 / 1     /* Avatars, ícones */
--aspect-video:   16 / 9    /* Vídeos */
--aspect-photo:   4 / 3     /* Fotos */
--aspect-wide:    21 / 9    /* Banners */
```

---

## 🎯 13. GAPS E SPACING ESPECÍFICOS

### 13.1 Stack (Vertical)

```
--stack-xs:   4px
--stack-sm:   8px
--stack-md:   12px  ⭐
--stack-lg:   16px
--stack-xl:   24px
```

### 13.2 Inline (Horizontal)

```
--inline-xs:  4px
--inline-sm:  8px
--inline-md:  12px  ⭐
--inline-lg:  16px
--inline-xl:  24px
```

---

## 🎨 14. COMO USAR OS TOKENS

### 14.1 Em CSS

```css
.button-primary {
  background: var(--primary-500);
  color: var(--text-inverse);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  box-shadow: var(--shadow-primary);
  transition: all var(--duration-normal) var(--ease-out);
}

.button-primary:hover {
  background: var(--primary-600);
}
```

### 14.2 Em Tailwind

```jsx
<button className="
  bg-[#0057FF] 
  text-white 
  px-6 py-3 
  rounded-xl 
  text-base 
  font-medium 
  shadow-xl
  transition-all 
  duration-200 
  ease-out
  hover:bg-[#0047CC]
">
  Botão Primário
</button>
```

---

## 📊 RESUMO EXECUTIVO

### Tokens Principais
```
Cores: 100+ variações
Espaçamento: 13 tamanhos (0-96px)
Tipografia: 8 tamanhos (12px-36px)
Border Radius: 7 tamanhos (0-24px)
Sombras: 6 elevações
Z-index: 9 camadas
Animações: 4 durações, 5 easings
```

### Uso no Projeto
- **Consistência**: Sempre usar tokens, nunca valores hardcoded
- **Manutenção**: Alterar tokens propaga mudanças globalmente
- **Escalabilidade**: Adicionar novos tokens quando necessário
- **Documentação**: Manter tokens documentados e atualizados

---

**Status:** ✅ TOKENS COMPLETOS  
**Última atualização:** 5 de novembro de 2025  
**Versão:** 1.0.0
