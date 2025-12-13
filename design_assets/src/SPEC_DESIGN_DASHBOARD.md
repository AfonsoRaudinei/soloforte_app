# 📐 SPEC DE DESIGN - DASHBOARD PRINCIPAL
## Guia Completo para Desenho da Tela

> **Plataforma**: Mobile-only (375x812px base - iPhone X)  
> **Orientação**: Portrait (vertical)  
> **Cor principal**: #0057FF (azul vibrante)  
> **Estilo**: Clean, minimalista, com hierarquia clara

---

## 🎨 PALETA DE CORES

```
PRIMÁRIA
#0057FF - Azul principal (botões, destaques, ícones ativos)

SECUNDÁRIAS
#F8F9FA - Cinza muito claro (backgrounds)
#E9ECEF - Cinza claro (bordas, separadores)
#6C757D - Cinza médio (textos secundários)
#212529 - Cinza escuro (textos principais)

SISTEMA
#28A745 - Verde (sucesso, status OK, NDVI alto)
#FFC107 - Amarelo/Âmbar (atenção, NDVI moderado)
#DC3545 - Vermelho (erro, crítico, NDVI baixo)
#FFFFFF - Branco (cards, fundos)

TRANSPARÊNCIAS
rgba(0, 87, 255, 0.1) - Azul 10% (hovers, backgrounds sutis)
rgba(0, 0, 0, 0.5) - Preto 50% (backdrop do FAB expandido)
```

---

## 📱 ESTRUTURA GERAL DA TELA

```
┌─────────────────────────────────┐
│         HEADER (64px)           │ ← Fixo no topo
├─────────────────────────────────┤
│                                 │
│                                 │
│         CONTEÚDO                │
│         SCROLLÁVEL              │
│                                 │
│         (altura variável)       │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│     BOTTOM NAV (60px)           │ ← Fixo na base
└─────────────────────────────────┘
│                                 │
│    FAB (56x56px)                │ ← Flutuante
└─────────────────────────────────┘
```

---

## 🔝 HEADER (64px de altura)

### Posicionamento
- **Altura total**: 64px
- **Padding horizontal**: 16px (esquerda e direita)
- **Padding vertical**: 12px (topo e base)
- **Background**: #FFFFFF (branco sólido)
- **Border bottom**: 1px solid #E9ECEF
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.05)

### Layout Interno (Grid de 3 colunas)

```
┌─────────────────────────────────┐
│ [☰]    SOLOFORTE    [🔔] [👤]  │
│  ↑         ↑          ↑     ↑   │
│  A         B          C     D   │
└─────────────────────────────────┘

A = Menu Hamburger (esquerda)
B = Logo/Título (centro)
C = Notificações (direita-2)
D = Avatar (direita-1)
```

### A) ÍCONE MENU HAMBURGER (☰)
- **Posição**: Canto superior esquerdo
- **Tamanho**: 24x24px (área de toque: 40x40px)
- **Cor**: #212529 (cinza escuro)
- **Ícone**: Três linhas horizontais paralelas
  ```
  Linha 1: ━━━━━━━ (18px largura, 2px altura)
  Espaço:  4px
  Linha 2: ━━━━━━━ (18px largura, 2px altura)
  Espaço:  4px
  Linha 3: ━━━━━━━ (18px largura, 2px altura)
  ```
- **Margem**: 16px da borda esquerda
- **Alinhamento vertical**: Centralizado no header
- **Ação**: Abre sidebar (slide da esquerda)

### B) LOGO "SOLOFORTE"
- **Posição**: Centro horizontal do header
- **Fonte**: 
  - Family: "Inter" ou "SF Pro Display" (bold)
  - Weight: 700 (bold)
  - Size: 18px
  - Letter-spacing: 0.5px
  - Color: #0057FF (azul principal)
- **Texto**: "SOLOFORTE" (tudo maiúsculo)
- **Alinhamento**: Centralizado horizontal e verticalmente

### C) ÍCONE NOTIFICAÇÕES (🔔)
- **Posição**: 56px da borda direita
- **Tamanho**: 24x24px (área de toque: 40x40px)
- **Cor base**: #6C757D (cinza médio)
- **Ícone**: Sino/bell outline
  ```
  Desenho do sino:
  - Corpo: Forma de sino invertido (outline 2px)
  - Base: Pequena linha horizontal na base
  - Badalo: Pequeno círculo no centro inferior
  ```
- **Badge de contador**:
  - **Tamanho**: 16x16px (círculo)
  - **Posição**: Canto superior direito do ícone (overlap de 4px)
  - **Background**: #DC3545 (vermelho)
  - **Texto**: Número branco (fonte 10px, bold)
  - **Limite**: "9+" se mais de 9 notificações
  - **Borda**: 2px solid #FFFFFF (para destacar do ícone)
- **Ação**: Abre NotificationCenter (sheet de baixo)

### D) AVATAR DO USUÁRIO (👤)
- **Posição**: Canto superior direito, 16px da borda
- **Tamanho**: 36x36px (círculo)
- **Border**: 2px solid #0057FF
- **Conteúdo**:
  - **Se tem foto**: Imagem do usuário (circular, crop centralizado)
  - **Se não tem foto**: Iniciais em maiúsculas
    - Background: #0057FF
    - Texto: Branco, 14px, bold
    - Exemplo: "JS" para João Silva
- **Ação**: Abre menu de perfil rápido (dropdown)

---

## 🗺️ SEÇÃO DO MAPA (400px altura)

### Container do Mapa
- **Posição**: Logo abaixo do header
- **Altura**: 400px (fixo, não scroll interno)
- **Largura**: 100% da tela (edge-to-edge)
- **Background**: #E9ECEF (enquanto carrega)
- **Border radius**: 0px (ocupa toda largura)
- **Margin bottom**: 16px

### Mapa Leaflet/MapTiler
- **Camada base**: Satélite (padrão) ou Híbrido
- **Zoom inicial**: 14 (mostra fazenda completa)
- **Centro inicial**: GPS do usuário ou última visualização
- **Gestos habilitados**:
  - ✅ Pan (arrastar)
  - ✅ Pinch zoom
  - ✅ Double tap zoom
  - ✅ Two-finger rotate

### Elementos SOBRE o Mapa

#### 1) BOTÃO "MINHA LOCALIZAÇÃO" (GPS)
```
┌─────────────────────────────────┐
│                      [📍]       │ ← Aqui
│                                 │
│         MAPA                    │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- **Posição**: Canto superior direito do mapa
- **Coordenadas**: Top: 16px, Right: 16px
- **Tamanho**: 40x40px (círculo)
- **Background**: #FFFFFF (branco)
- **Border**: 1px solid #E9ECEF
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.15)
- **Ícone**: 
  - Símbolo de alvo/crosshair (24x24px)
  - Cor: #0057FF quando ativo
  - Cor: #6C757D quando inativo
  ```
  Desenho do ícone:
  ○ Círculo externo (18px diâmetro, outline 2px)
  ● Ponto central (4px diâmetro, preenchido)
  + Cruz centrada (linhas de 12px, 2px grossura)
  ```
- **Estados**:
  - **Normal**: Background branco, ícone cinza
  - **Ativo**: Background azul claro, ícone azul
  - **Carregando**: Spinner animado no lugar do ícone
- **Ação**: Centraliza mapa no GPS do usuário

#### 2) CONTROLES DE ZOOM
```
┌─────────────────────────────────┐
│                                 │
│         MAPA                    │
│                                 │
│                      [+]        │ ← Aqui
│                      [-]        │ ← Aqui
└─────────────────────────────────┘
```
- **Posição**: Canto inferior direito do mapa
- **Coordenadas**: Bottom: 80px, Right: 16px

**Botão ZOOM IN (+)**
- **Tamanho**: 40x40px (quadrado com border-radius 8px topo)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF (sem borda inferior)
- **Ícone**: "+" (plus)
  - Tamanho: 20x20px
  - Cor: #212529
  - Stroke: 2px
- **Ação**: Aumenta zoom do mapa

**Botão ZOOM OUT (-)**
- **Tamanho**: 40x40px (quadrado com border-radius 8px base)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF (sem borda superior)
- **Ícone**: "−" (minus)
  - Tamanho: 20x20px
  - Cor: #212529
  - Stroke: 2px
- **Ação**: Diminui zoom do mapa

**Separador entre botões**:
- 1px solid #E9ECEF (linha divisória)

#### 3) BOTÃO SELETOR DE CAMADAS
```
┌─────────────────────────────────┐
│ [🎨]                            │ ← Aqui
│                                 │
│         MAPA                    │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- **Posição**: Canto superior esquerdo do mapa
- **Coordenadas**: Top: 16px, Left: 16px
- **Tamanho**: 40x40px (círculo)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.15)
- **Ícone**: Camadas empilhadas
  ```
  Três retângulos sobrepostos com offset:
  Camada 1: 20x14px (topo, offset -2px)
  Camada 2: 20x14px (meio, offset 0px)
  Camada 3: 20x14px (base, offset +2px)
  Cor: #0057FF
  ```
- **Ação**: Abre menu dropdown de camadas

**Dropdown de Camadas** (quando aberto):
```
┌──────────────────┐
│ ✓ Satélite       │ ← Checkmark se ativo
│ ○ Híbrido        │
│ ○ Ruas           │
│ ───────────────  │
│ ☐ Áreas          │ ← Checkbox
│ ☑ Ocorrências    │ ← Checked
│ ☐ Radar Clima    │
│ ☐ NDVI           │
└──────────────────┘
```
- **Largura**: 180px
- **Posição**: Abaixo do botão, alinhado à esquerda
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Box shadow**: 0px 4px 12px rgba(0, 0, 0, 0.15)
- **Padding**: 8px
- **Item altura**: 36px cada

#### 4) BÚSSOLA
```
┌─────────────────────────────────┐
│          [🧭]                   │ ← Centro-topo
│                                 │
│         MAPA                    │
│                                 │
│                                 │
└─────────────────────────────────┘
```
- **Posição**: Centro horizontal, 16px do topo
- **Tamanho**: 48x48px
- **Background**: rgba(255, 255, 255, 0.9) (semi-transparente)
- **Border**: 1px solid #E9ECEF
- **Border radius**: 50% (círculo)
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.15)
- **Ícone**: Rosa dos ventos simplificada
  ```
  Círculo externo (40px diâmetro)
  Seta Norte (vermelha, apontando para cima quando alinhado)
  Seta Sul (branca/cinza)
  Letras: N (topo), S (baixo), E (direita), W (esquerda)
  Fonte: 10px, bold, #212529
  ```
- **Rotação**: Dinâmica baseada na orientação do mapa
- **Ação**: Tap para resetar rotação (norte para cima)

### Elementos DENTRO do Mapa

#### A) POLÍGONOS DE ÁREAS
- **Cor do preenchimento**: 
  - Verde (#28A745) com opacity 0.3 se saudável
  - Amarelo (#FFC107) com opacity 0.3 se atenção
  - Vermelho (#DC3545) com opacity 0.3 se crítico
- **Cor da borda**: 
  - Mesma cor do preenchimento, opacity 1.0
  - Stroke width: 2px
- **Label dentro do polígono**:
  - Texto: Nome da área
  - Fonte: 12px, bold, #FFFFFF
  - Background: rgba(0, 0, 0, 0.6) (pill/cápsula)
  - Padding: 4px 8px
  - Border radius: 12px

#### B) PINS DE OCORRÊNCIAS
- **Tamanho**: 32x32px (ícone customizado)
- **Design**: Marcador em forma de pin/gota
  ```
  Estrutura:
  - Círculo superior (20px diâmetro)
  - Ponta inferior (triângulo)
  - Sombra embaixo
  ```
- **Cores por tipo**:
  - 🐛 **Praga**: #DC3545 (vermelho)
  - 🦠 **Doença**: #FF6B6B (vermelho claro)
  - 🌿 **Nutrição**: #FFC107 (amarelo)
  - 💧 **Irrigação**: #17A2B8 (azul claro)
- **Ícone interno**:
  - Branco (#FFFFFF)
  - 16x16px
  - Centralizado no círculo
- **Animação**: Pulse sutil (scale 1.0 → 1.1 → 1.0, duração 2s, loop)
- **Ação**: Tap → Abre popup

**Popup da Ocorrência** (quando clica no pin):
```
┌──────────────────────────┐
│ 🐛 Lagarta-da-soja      │ ← Título
│ ─────────────────────   │
│ Severidade: 85% CRÍTICO │
│ ████████░░              │ ← Barra de progresso
│                         │
│ Talhão Norte            │
│ Criada há 2 horas       │
│                         │
│ [Ver Detalhes →]        │ ← Botão
└──────────────────────────┘
```
- **Largura**: 240px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 8px
- **Box shadow**: 0px 4px 16px rgba(0, 0, 0, 0.2)
- **Padding**: 12px
- **Seta**: Apontando para o pin (8px triângulo)

#### C) PIN DO USUÁRIO (localização GPS)
- **Tamanho**: 24x24px
- **Design**: Círculo com anel
  ```
  Círculo interno: 12px, #0057FF sólido
  Anel externo: 24px, #0057FF 30% opacity
  Animação: Anel pulsa (scale 1.0 → 1.5, fade 1.0 → 0, duração 2s, loop)
  ```
- **Precisão**: Círculo maior semi-transparente mostrando margem de erro
  - Raio: Varia conforme precisão do GPS (5m-50m)
  - Cor: rgba(0, 87, 255, 0.1)
  - Border: 1px solid rgba(0, 87, 255, 0.3)

---

## 🌾 SEÇÃO "MINHAS ÁREAS"

### Container
- **Posição**: Abaixo do mapa
- **Padding**: 16px (todos os lados)
- **Background**: #F8F9FA
- **Margin bottom**: 16px

### Header da Seção
```
┌─────────────────────────────────┐
│ 🌾 Minhas Áreas (5)    [+ Nova] │
└─────────────────────────────────┘
```

#### Título
- **Texto**: "Minhas Áreas (5)"
- **Ícone**: 🌾 (emoji de trigo, 20x20px)
- **Fonte**: 
  - Size: 16px
  - Weight: 700 (bold)
  - Color: #212529
- **Contador**: 
  - Entre parênteses
  - Mesma fonte, weight 600
  - Color: #6C757D

#### Botão "+ Nova"
- **Posição**: Direita, alinhado ao título
- **Tamanho**: auto x 32px
- **Padding**: 8px 12px
- **Background**: rgba(0, 87, 255, 0.1)
- **Border**: 1px solid #0057FF
- **Border radius**: 16px (pill)
- **Texto**: 
  - "+ Nova"
  - Fonte: 14px, weight 600
  - Color: #0057FF
- **Ícone "+"**: 
  - 16x16px
  - Color: #0057FF
  - Margem direita: 4px
- **Ação**: Ativa modo desenho no mapa

### Lista de Cards (Scroll Horizontal)

#### Container da Lista
- **Margin top**: 12px
- **Overflow**: Scroll horizontal (hide scrollbar)
- **Gap entre cards**: 12px
- **Padding**: 4px (para sombras)

#### Card de Área Individual
```
┌────────────────────┐
│  [Miniatura Mapa]  │ ← Thumbnail
├────────────────────┤
│ Talhão Norte       │ ← Nome
│                    │
│ 📏 45.3 ha         │ ← Área
│                    │
│ 📊 NDVI: 0.72      │ ← Saúde
│ ████████░░ Bom     │ ← Barra visual
│                    │
│ 🕐 Visitado há 2d  │ ← Última visita
└────────────────────┘
```

**Dimensões e Layout**:
- **Largura**: 160px (fixo)
- **Altura**: auto (conteúdo)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.08)
- **Padding**: 0px (imagem full-width)

**1) Miniatura do Mapa** (topo):
- **Altura**: 100px
- **Largura**: 100% (160px)
- **Border radius**: 12px 12px 0 0 (apenas topos arredondados)
- **Conteúdo**: 
  - Print do polígono da área vista de cima
  - Zoom ajustado para mostrar área completa
  - Background: Satélite
- **Overlay gradient**: 
  - linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)
  - Para melhorar legibilidade de possível texto

**2) Conteúdo (padding 12px)**:

**Nome da Área**:
- **Fonte**: 14px, weight 700, color #212529
- **Margin bottom**: 8px
- **Max lines**: 1 (ellipsis se muito longo)

**Ícone + Área em Hectares**:
- **Layout**: Inline (ícone + texto)
- **Ícone**: 📏 (régua, 16x16px)
- **Texto**: "45.3 ha"
  - Fonte: 13px, weight 600, color #212529
- **Margin bottom**: 8px

**NDVI (Saúde da Planta)**:
- **Linha 1**: "📊 NDVI: 0.72"
  - Ícone: 📊 (16x16px)
  - Texto: Fonte 12px, weight 600, color #212529
  - Valor NDVI: Bold, color verde/amarelo/vermelho conforme valor

**Barra de Progresso NDVI**:
- **Altura**: 6px
- **Largura**: 100%
- **Background**: #E9ECEF (fundo da barra)
- **Border radius**: 3px
- **Fill (preenchimento)**:
  - Largura: % baseado em NDVI (0.0 = 0%, 1.0 = 100%)
  - Cor dinâmica:
    - 0.0-0.5 (Crítico): #DC3545 (vermelho)
    - 0.5-0.7 (Moderado): #FFC107 (amarelo)
    - 0.7-1.0 (Bom): #28A745 (verde)
  - Animação: Cresce da esquerda (transition 0.5s ease)
- **Margin**: 4px 0

**Label de Status** (ao lado da barra):
- **Texto**: "Bom" / "Moderado" / "Crítico"
- **Fonte**: 11px, weight 600
- **Cor**: Mesma da barra (verde/amarelo/vermelho)
- **Posição**: Direita da barra, inline

**Última Visita**:
- **Ícone**: 🕐 (relógio, 14x14px)
- **Texto**: "Visitado há 2 dias"
  - Fonte: 11px, weight 500, color #6C757D
- **Margin top**: 8px

**Estados do Card**:
- **Normal**: Border #E9ECEF
- **Hover/Pressed**: 
  - Border: #0057FF
  - Box shadow: 0px 4px 12px rgba(0, 87, 255, 0.2)
  - Transform: translateY(-2px)
  - Transition: 0.2s ease

**Ação**: Tap → Zoom no mapa para essa área + destaque

---

## 📌 SEÇÃO "OCORRÊNCIAS ATIVAS"

### Container
- **Posição**: Abaixo de "Minhas Áreas"
- **Padding**: 16px (todos os lados)
- **Background**: #F8F9FA
- **Margin bottom**: 80px (espaço para Bottom Nav + FAB)

### Header da Seção
```
┌─────────────────────────────────┐
│ 📌 Ocorrências Ativas (3) [Ver todas →] │
└─────────────────────────────────┘
```

#### Título
- **Texto**: "Ocorrências Ativas (3)"
- **Ícone**: 📌 (pin, 20x20px)
- **Fonte**: 16px, weight 700, color #212529
- **Contador**: Entre parênteses, weight 600, color #6C757D

#### Link "Ver todas"
- **Posição**: Direita, alinhado ao título
- **Texto**: "Ver todas →"
- **Fonte**: 14px, weight 600, color #0057FF
- **Ícone seta**: → (16x16px, inline)
- **Ação**: Navega para `/ocorrencias`

### Lista de Cards (Vertical Stack)

#### Container da Lista
- **Margin top**: 12px
- **Gap entre cards**: 12px
- **Exibe**: 3 últimas ocorrências prioritárias

#### Card de Ocorrência Individual
```
┌─────────────────────────────────┐
│ 🐛 Lagarta-da-soja              │ ← Título
├─────────────────────────────────┤
│                                 │
│ ████████░░ 85% CRÍTICO          │ ← Barra severidade
│                                 │
│ 📍 Talhão Norte (45.3 ha)       │ ← Localização
│ 🕐 Criada há 2 horas            │ ← Timestamp
│ 👤 João Silva                   │ ← Autor
│                                 │
│ [Ver detalhes →]                │ ← Botão
└─────────────────────────────────┘
```

**Dimensões e Layout**:
- **Largura**: 100% (container width - 32px padding)
- **Altura**: auto (conteúdo)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-left**: 4px solid (cor dinâmica por tipo)
  - Praga: #DC3545 (vermelho)
  - Doença: #FF6B6B (vermelho claro)
  - Nutrição: #FFC107 (amarelo)
  - Irrigação: #17A2B8 (azul)
- **Border radius**: 12px
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.08)
- **Padding**: 16px

**1) Header do Card**:

**Ícone + Título da Ocorrência**:
- **Layout**: Inline (ícone + texto)
- **Ícone**: 
  - Tamanho: 24x24px
  - Tipos: 🐛 (praga), 🦠 (doença), 🌿 (nutrição), 💧 (irrigação)
  - Margem direita: 8px
- **Título**: 
  - Texto: "Lagarta-da-soja"
  - Fonte: 15px, weight 700, color #212529
  - Max lines: 1 (ellipsis)
- **Nome científico** (linha abaixo, opcional):
  - Texto: "(Anticarsia gemmatalis)"
  - Fonte: 12px, weight 400, color #6C757D, italic

**2) Barra de Severidade**:
- **Margin top**: 12px
- **Altura**: 8px
- **Largura**: 100%
- **Background**: #E9ECEF (fundo)
- **Border radius**: 4px
- **Fill (preenchimento)**:
  - Largura: Baseada em % (0-100%)
  - Cor dinâmica:
    - 0-30% (Leve): #28A745 (verde)
    - 31-60% (Moderado): #FFC107 (amarelo)
    - 61-100% (Crítico): #DC3545 (vermelho)
  - Animação: Preenchimento animado (1s ease-out)

**Label de Severidade** (à direita da barra):
- **Layout**: Inline, alinhado à direita
- **Texto**: "85% CRÍTICO"
  - Percentual: 14px, weight 700
  - Label: 12px, weight 600, uppercase
  - Cor: Mesma da barra
- **Margin left**: 8px

**3) Informações de Contexto**:
- **Margin top**: 12px
- **Layout**: Stack vertical
- **Gap entre linhas**: 6px

**Localização**:
- **Ícone**: 📍 (16x16px)
- **Texto**: "Talhão Norte (45.3 ha)"
  - Fonte: 13px, weight 500, color #212529
  - Nome em bold, área em regular

**Timestamp**:
- **Ícone**: 🕐 (16x16px)
- **Texto**: "Criada há 2 horas"
  - Fonte: 13px, weight 500, color #6C757D
  - Formato relativo: "há X tempo"

**Autor**:
- **Ícone**: 👤 (16x16px) ou mini avatar
- **Texto**: "João Silva"
  - Fonte: 13px, weight 500, color #212529

**4) Botão de Ação**:
- **Margin top**: 12px
- **Largura**: 100%
- **Altura**: 36px
- **Background**: rgba(0, 87, 255, 0.1)
- **Border**: 1px solid #0057FF
- **Border radius**: 8px
- **Texto**: "Ver detalhes →"
  - Fonte: 14px, weight 600, color #0057FF
  - Ícone seta: → (16x16px, inline)
- **Hover/Press**: 
  - Background: rgba(0, 87, 255, 0.2)
  - Transform: scale(0.98)
- **Ação**: Navega para detalhes da ocorrência

**Estados do Card**:
- **Normal**: Border padrão
- **Hover**: Box shadow aumenta
- **Swipe left**: 
  - Revela botão vermelho "Resolver" (60px width)
  - Background: #28A745
  - Ícone: ✓ (checkmark branco)

---

## 🎯 FLOATING ACTION BUTTON (FAB)

### Posição
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│                                 │
│                        [+]      │ ← Aqui
│                                 │
├─────────────────────────────────┤
│      BOTTOM NAVIGATION          │
└─────────────────────────────────┘
```
- **Coordenadas**: 
  - Bottom: 76px (16px acima do Bottom Nav)
  - Right: 16px
- **Posição**: Fixed (sempre visível, não scrolla)
- **Z-index**: 1000 (acima de tudo, exceto modals)

### Botão Principal (Collapsed)

**Visual**:
- **Tamanho**: 56x56px (círculo)
- **Background**: #0057FF (azul principal)
- **Box shadow**: 0px 4px 16px rgba(0, 87, 255, 0.4)
- **Border**: none
- **Ícone**: "+" (plus)
  - Cor: #FFFFFF (branco)
  - Tamanho: 28x28px
  - Stroke width: 3px
  - Centralizado

**Estados**:
- **Normal**: 
  - Scale: 1.0
  - Shadow: 0px 4px 16px rgba(0, 87, 255, 0.4)
  
- **Hover/Press**:
  - Scale: 0.95
  - Shadow: 0px 2px 8px rgba(0, 87, 255, 0.3)
  - Transition: 0.2s ease
  
- **Expandido**: 
  - Rotação: +45° (vira um "X")
  - Transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Menu Radial (Expanded)

**Backdrop**:
- **Cobre**: Tela inteira
- **Background**: rgba(0, 0, 0, 0.5) (escuro semi-transparente)
- **Backdrop-filter**: blur(4px)
- **Z-index**: 999
- **Ação**: Tap → Fecha menu

**Disposição dos Itens**:
```
          [🖊️] Desenhar Área
            ↗
           /
[📌] ━━━━━[+]━━━━━ [📸] Scanner
           \
            ↘
          [📄] Relatório
          
      [🔔] Notificações (abaixo)
```

**Geometria**:
- **Centro**: Posição do FAB (56x56px)
- **Raio**: 100px do centro ao centro de cada item
- **Ângulos**: 
  - Desenhar: -45° (noroeste)
  - Scanner: 0° (leste)
  - Relatório: 45° (sudeste)
  - Ocorrência: -90° (norte)
  - Notificações: 90° (sul)

**Cada Item do Menu**:

**Estrutura**:
```
┌──────────────┐
│   [Ícone]    │ ← Círculo
│              │
│    Label     │ ← Texto abaixo
└──────────────┘
```

**Botão Circular**:
- **Tamanho**: 48x48px (círculo)
- **Background**: #FFFFFF (branco)
- **Border**: 1px solid #E9ECEF
- **Box shadow**: 0px 3px 12px rgba(0, 0, 0, 0.15)
- **Ícone**: 
  - Tamanho: 24x24px
  - Cor: #0057FF
  - Centralizado

**Label (abaixo do botão)**:
- **Margin top**: 8px
- **Background**: rgba(0, 0, 0, 0.75)
- **Padding**: 4px 8px
- **Border radius**: 4px
- **Texto**:
  - Fonte: 12px, weight 600
  - Color: #FFFFFF
  - Text-align: center
  - White-space: nowrap

**Animação de Entrada**:
- **Sequência**: Staggered (50ms delay entre cada)
- **Efeito**: 
  - Scale: 0 → 1.0
  - Opacity: 0 → 1.0
  - Translate: Do centro para posição final
  - Duração: 0.3s
  - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (elastic)

**Itens do Menu**:

1. **🖊️ Desenhar Área** (noroeste, -45°)
   - Ícone: Caneta/pen tool (outline)
   - Label: "Desenhar"
   - Ação: Ativa modo desenho no mapa

2. **📌 Nova Ocorrência** (norte, -90°)
   - Ícone: Pin/marcador
   - Label: "Ocorrência"
   - Ação: Abre formulário de nova ocorrência

3. **📸 Scanner** (leste, 0°)
   - Ícone: Câmera
   - Label: "Scanner"
   - Ação: Abre câmera para GPT-4 Vision

4. **📄 Relatório** (sudeste, 45°)
   - Ícone: Documento
   - Label: "Relatório"
   - Ação: Navega para /relatorios/novo

5. **🔔 Notificações** (sul, 90°)
   - Ícone: Sino/bell
   - Label: "Avisos"
   - Badge: Contador de não lidas (se > 0)
     - Tamanho: 18x18px
     - Background: #DC3545
     - Texto: Número branco
     - Posição: Top-right do ícone
   - Ação: Abre NotificationCenter

---

## 📱 BOTTOM NAVIGATION (60px altura)

### Posição
- **Altura**: 60px (fixo)
- **Largura**: 100% (edge-to-edge)
- **Posição**: Fixed bottom
- **Background**: #FFFFFF
- **Border top**: 1px solid #E9ECEF
- **Box shadow**: 0px -2px 8px rgba(0, 0, 0, 0.05)
- **Z-index**: 100

### Layout Interno (5 itens)
```
┌─────────────────────────────────┐
│ [🏠]  [🗺️]  [📊]  [👥]  [⚙️]  │
│ Home  Mapas Relat. Clie. Config │
└─────────────────────────────────┘
```

**Grid de 5 colunas iguais**:
- Cada coluna: 20% da largura (75px)
- Centralizado vertical e horizontalmente

### Cada Item de Navegação

**Estrutura**:
```
  [Ícone]
   Label
```

**Dimensões**:
- **Área de toque**: 75px (largura) x 60px (altura)
- **Espaçamento interno**: 8px top, 12px bottom

**Ícone**:
- **Tamanho**: 24x24px
- **Stroke width**: 2px (outline)
- **Cores**:
  - **Inativo**: #6C757D (cinza médio)
  - **Ativo**: #0057FF (azul principal)
- **Margin bottom**: 4px

**Label**:
- **Fonte**: 11px, weight 600
- **Cores**:
  - **Inativo**: #6C757D
  - **Ativo**: #0057FF
- **Max width**: 70px
- **Text-align**: center

**Estado Ativo**:
- **Ícone**: Preenchido (filled) em vez de outline
- **Label**: Bold (weight 700)
- **Indicador**: Linha azul 2px acima (opcional)
  - Largura: 32px
  - Height: 2px
  - Background: #0057FF
  - Border radius: 1px
  - Posição: 2px acima do ícone

**Animação de Transição**:
- **Tap**: Scale(0.95)
- **Troca de aba**: 
  - Cor: Transition 0.2s ease
  - Ícone: Morphs de outline para filled

### Itens Individuais

**1) 🏠 Dashboard** (posição 1)
- **Ícone**: Home/casa
  - Outline: Quadrado com teto triangular
  - Filled: Mesmo shape, preenchido
- **Label**: "Home" ou "Dashboard"
- **Rota**: `/dashboard`

**2) 🗺️ Mapas** (posição 2)
- **Ícone**: Mapa dobrado
  - Outline: Retângulo com linha em zigue-zague
  - Filled: Mesmo shape, preenchido
- **Label**: "Mapas"
- **Rota**: `/mapas-offline`

**3) 📊 Relatórios** (posição 3)
- **Ícone**: Gráfico de barras
  - Outline: 3 barras de alturas diferentes
  - Filled: Mesmas barras, preenchidas
- **Label**: "Relatórios"
- **Rota**: `/relatorios`

**4) 👥 Clientes** (posição 4)
- **Ícone**: Dois perfis/pessoas
  - Outline: 2 círculos (cabeças) + 2 semicírculos (ombros)
  - Filled: Mesmo shape, preenchido
- **Label**: "Clientes"
- **Rota**: `/clientes`

**5) ⚙️ Configurações** (posição 5)
- **Ícone**: Engrenagem
  - Outline: Círculo com 6-8 dentes
  - Filled: Mesmo shape, preenchido
- **Label**: "Config"
- **Rota**: `/configuracoes`

---

## 🎭 ESTADOS E ANIMAÇÕES

### Loading States

**1) Skeleton do Dashboard Completo**:
```
┌─────────────────────────────────┐
│  [☰]  SOLOFORTE      [🔔] [👤]  │
├─────────────────────────────────┤
│                                 │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← Mapa
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                 │
│  ▓▓▓▓▓▓▓▓▓▓ ▓▓▓▓▓▓▓▓▓▓          │ ← Cards áreas
│  ▓▓▓▓▓▓▓▓▓▓ ▓▓▓▓▓▓▓▓▓▓          │
│                                 │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← Cards ocorrências
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                 │
└─────────────────────────────────┘
```
- **Cor base**: #E9ECEF
- **Cor highlight**: #F8F9FA
- **Animação**: Shimmer (onda da esquerda para direita)
  - Duração: 1.5s
  - Loop infinito
  - Linear gradient animado

**2) Spinner no Mapa**:
- **Posição**: Centro do mapa
- **Tamanho**: 40x40px
- **Cor**: #0057FF
- **Estilo**: Circular spinner (border spinner)
  - Border: 4px
  - Border-color: #0057FF transparent transparent transparent
  - Rotação: 360° em 0.8s, loop
- **Background**: rgba(255, 255, 255, 0.8) (backdrop leve)

**3) Shimmer nos Cards**:
- **Efeito**: Ondas brilhantes passando
- **Gradient**: 
  ```
  linear-gradient(
    90deg,
    #E9ECEF 0%,
    #F8F9FA 50%,
    #E9ECEF 100%
  )
  ```
- **Animação**: Background-position move -100% to 100%
- **Duração**: 1.5s, ease-in-out, loop

### Interações

**1) Pull to Refresh**:
- **Trigger**: Swipe down no topo da tela (quando scroll = 0)
- **Visual**:
  ```
  Fase 1: Pulling (puxando)
  ┌─────────────────┐
  │       ↓         │ ← Seta aparece
  │                 │
  └─────────────────┘
  
  Fase 2: Release (soltar)
  ┌─────────────────┐
  │       ⟳         │ ← Spinner circular
  │   Atualizando   │
  └─────────────────┘
  ```
- **Threshold**: 80px de pull para ativar
- **Indicador**:
  - Tamanho: 40x40px
  - Background: #FFFFFF
  - Border: 1px solid #E9ECEF
  - Box shadow: 0px 2px 8px rgba(0, 0, 0, 0.1)
  - Spinner: #0057FF

**2) Swipe em Card**:
- **Direção**: Left (esquerda)
- **Reveal**: Botões de ação (60px cada)
- **Cores**:
  - Verde (#28A745): Resolver
  - Vermelho (#DC3545): Excluir
- **Ícones**: 
  - ✓ (checkmark) para resolver
  - 🗑️ (lixeira) para excluir

**3) Long Press em Área do Mapa**:
- **Duração**: 500ms (meio segundo)
- **Feedback**: 
  - Vibração háptica (se disponível)
  - Destaque visual no polígono (pulse)
- **Menu Contextual**:
  ```
  ┌──────────────────┐
  │ ✏️ Editar área   │
  │ 📊 Ver relatório │
  │ 🗑️ Excluir       │
  └──────────────────┘
  ```
  - Posição: Próximo ao ponto de toque
  - Background: #FFFFFF
  - Shadow: 0px 4px 16px rgba(0, 0, 0, 0.2)

---

## 📐 ESPECIFICAÇÕES DE TIPOGRAFIA

### Hierarquia de Textos

```
Display (Títulos principais)
├─ 24px, weight 800, line-height 1.2
├─ Color: #212529
└─ Uso: Títulos de páginas

Heading 1
├─ 18px, weight 700, line-height 1.3
├─ Color: #212529
└─ Uso: Títulos de seções

Heading 2
├─ 16px, weight 700, line-height 1.4
├─ Color: #212529
└─ Uso: Sub-títulos

Body Large
├─ 15px, weight 500, line-height 1.5
├─ Color: #212529
└─ Uso: Textos principais

Body Regular
├─ 14px, weight 500, line-height 1.5
├─ Color: #212529
└─ Uso: Textos comuns

Body Small
├─ 13px, weight 500, line-height 1.5
├─ Color: #6C757D
└─ Uso: Legendas, metadados

Caption
├─ 12px, weight 500, line-height 1.4
├─ Color: #6C757D
└─ Uso: Labels, timestamps

Tiny
├─ 11px, weight 600, line-height 1.3
├─ Color: #6C757D
└─ Uso: Bottom nav, badges
```

### Fontes
- **Primary**: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI"
- **Fallback**: system-ui, sans-serif

---

## 🎨 ESPECIFICAÇÕES DE ESPAÇAMENTO

### Sistema de Grid (8px base)

```
4px   - Extra small (xs)
8px   - Small (sm)
12px  - Medium (md)
16px  - Large (lg)
24px  - Extra large (xl)
32px  - 2XL
48px  - 3XL
64px  - 4XL
```

### Aplicações

**Padding de Containers**:
- Tela: 16px (horizontal)
- Cards: 12px-16px
- Botões: 12px (vertical), 16px (horizontal)

**Gaps entre Elementos**:
- Seções: 24px
- Cards: 12px
- Linhas de texto: 8px
- Ícone + texto: 8px

**Margins**:
- Seções: 16px bottom
- Cards: 12px bottom
- Elementos internos: 8px

---

## 📱 RESPONSIVIDADE (Mobile-only)

### Breakpoints (bloqueio)
```
< 768px  → ✅ PERMITIDO (smartphones)
≥ 768px  → 🚫 BLOQUEADO (tablets/desktop)
```

### Tela de Bloqueio (≥ 768px)
```
┌─────────────────────────────────┐
│                                 │
│         [📱 Ícone]              │
│                                 │
│      SOLOFORTE                  │
│                                 │
│   Disponível apenas para        │
│   smartphones                   │
│                                 │
│   Por favor, acesse pelo        │
│   seu celular                   │
│                                 │
│   [QR Code - opcional]          │
│                                 │
└─────────────────────────────────┘
```

---

## ✅ CHECKLIST DE ELEMENTOS

### Header
- [ ] Menu hamburger (☰) - 24x24px, #212529
- [ ] Logo "SOLOFORTE" - 18px bold, #0057FF
- [ ] Ícone notificações (🔔) - 24x24px com badge vermelho
- [ ] Avatar usuário (👤) - 36x36px circular

### Mapa
- [ ] Container 400px altura
- [ ] Botão GPS - canto superior direito
- [ ] Controles zoom (+/-) - canto inferior direito
- [ ] Seletor camadas (🎨) - canto superior esquerdo
- [ ] Bússola (🧭) - centro-topo
- [ ] Polígonos coloridos de áreas
- [ ] Pins de ocorrências (32x32px)
- [ ] Pin do usuário (24x24px azul pulsante)

### Minhas Áreas
- [ ] Título "Minhas Áreas (5)" com ícone 🌾
- [ ] Botão "+ Nova" (pill azul)
- [ ] Scroll horizontal de cards
- [ ] Cards 160px largura
- [ ] Miniatura do mapa 100px altura
- [ ] Nome, área, NDVI, barra de progresso

### Ocorrências
- [ ] Título "Ocorrências Ativas (3)" com ícone 📌
- [ ] Link "Ver todas →"
- [ ] Cards verticais com border-left colorido
- [ ] Barra de severidade 8px altura
- [ ] Ícones 24x24px por tipo
- [ ] Botão "Ver detalhes"

### FAB
- [ ] Círculo 56x56px azul #0057FF
- [ ] Posição: bottom 76px, right 16px
- [ ] Ícone "+" 28x28px branco
- [ ] Menu radial com 5 itens
- [ ] Backdrop blur quando expandido
- [ ] Animação de rotação (45°)

### Bottom Nav
- [ ] 5 ícones 24x24px
- [ ] Labels 11px
- [ ] Altura 60px
- [ ] Ícone ativo: azul filled
- [ ] Ícone inativo: cinza outline

---

## 🎯 OBSERVAÇÕES FINAIS

### Acessibilidade
- **Área de toque mínima**: 40x40px
- **Contraste**: WCAG AA (4.5:1 para textos)
- **Labels**: Sempre presentes para screen readers
- **Focus states**: Visíveis ao navegar por teclado (acessibilidade)

### Performance
- **Imagens**: WebP com fallback PNG
- **Lazy loading**: Cards fora da viewport
- **Skeleton**: Sempre mostrar durante loading
- **Debounce**: 300ms em buscas e filtros

### Animações
- **Duração padrão**: 200-300ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Respeitar**: prefers-reduced-motion

### Dark Mode (futuro)
- Preparar tokens de cores
- Manter contraste adequado
- Testar legibilidade

---

**FIM DA ESPECIFICAÇÃO** 🎯
**Versão**: 1.0
**Data**: Novembro 2025
