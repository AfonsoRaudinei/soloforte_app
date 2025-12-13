# 📐 SPEC DE DESIGN - TODAS AS PÁGINAS SOLOFORTE
## Guia Completo Visual para Desenvolvimento Flutter

> **Plataforma**: Mobile-only (375x812px base - iPhone X)  
> **Orientação**: Portrait (vertical)  
> **Cor principal**: #0057FF (azul vibrante)  
> **Estilo**: Clean, minimalista, hierarquia clara

---

## 📚 ÍNDICE

1. [Landing Page](#1-landing-page)
2. [Home](#2-home)
3. [Login](#3-login)
4. [Cadastro](#4-cadastro)
5. [Esqueci Senha](#5-esqueci-senha)
6. [Dashboard](#6-dashboard)
7. [Agenda](#7-agenda)
8. [Clima](#8-clima)
9. [Relatórios](#9-relatórios)
10. [Editor de Relatório](#10-editor-de-relatório)
11. [Clientes](#11-clientes)
12. [Configurações](#12-configurações)
13. [Alertas Config](#13-alertas-config)
14. [Check-in/Check-out](#14-check-incheck-out)
15. [Radar Clima](#15-radar-clima)
16. [Scanner de Pragas](#16-scanner-de-pragas)
17. [Dashboard Executivo](#17-dashboard-executivo)
18. [Gestão de Equipes](#18-gestão-de-equipes)
19. [Gestão de Clientes](#19-gestão-de-clientes)
20. [Chat Suporte](#20-chat-suporte)
21. [Marketing/Publicações](#21-marketingpublicações)
22. [Mapas Offline](#22-mapas-offline)
23. [Gestão de Ocorrências](#23-gestão-de-ocorrências)

---

# 1. LANDING PAGE

### Rota: `/` ou `/landing`

## 🎨 PALETA ESPECÍFICA

```
GRADIENTE HERO
#0057FF → #0041CC (azul degradê vertical)

OVERLAY
rgba(0, 87, 255, 0.95) sobre imagem de fundo
```

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│                                 │
│         [Logo Branco]           │ ← 80px altura
│                                 │
│        SOLOFORTE                │ ← 32px bold
│                                 │
│    Transforme Dados em          │
│    Decisões Inteligentes        │ ← 20px regular
│                                 │
│    [Ilustração Fazenda]         │ ← 200px altura
│                                 │
│  ┌─────────────────────────┐   │
│  │     COMEÇAR AGORA       │   │ ← Botão primário
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │     JÁ TENHO CONTA      │   │ ← Botão secundário
│  └─────────────────────────┘   │
│                                 │
│    ✓ GPS em tempo real          │
│    ✓ IA para pragas             │ ← Features
│    ✓ Relatórios automáticos     │
│                                 │
│         v1.0.0                  │ ← Rodapé
│                                 │
└─────────────────────────────────┘
```

## 🔝 LOGO (topo)

### Posicionamento
- **Margin top**: 60px (safe area + espaço)
- **Centralizado**: Horizontal
- **Tamanho**: 80x80px

### Elementos
**Ícone do Logo**:
- **Formato**: SVG ou PNG transparente
- **Design**: 
  - Folha estilizada + pin de localização
  - Ou símbolo agrícola moderno
- **Cor**: #FFFFFF (branco)
- **Tamanho**: 80x80px

**Texto "SOLOFORTE"**:
- **Posição**: 16px abaixo do ícone
- **Fonte**: 
  - Family: "Inter" bold
  - Size: 32px
  - Weight: 800
  - Letter-spacing: 1px
  - Color: #FFFFFF
- **Text-align**: Center

### Tagline
- **Texto**: "Transforme Dados em Decisões Inteligentes"
- **Posição**: 12px abaixo do título
- **Fonte**:
  - Size: 16px
  - Weight: 400
  - Color: rgba(255, 255, 255, 0.9)
  - Line-height: 1.5
- **Max-width**: 280px
- **Text-align**: Center
- **Margin**: 0 auto

## 🖼️ ILUSTRAÇÃO HERO

### Container
- **Margin top**: 40px
- **Largura**: 100% (com padding 32px)
- **Altura**: 200px
- **Centralizado**: Horizontal

### Conteúdo
**Imagem/Ilustração**:
- **Tipo**: Ilustração vetorial ou foto
- **Tema**: 
  - Fazenda vista de cima
  - Ou smartphone com mapa
  - Ou agrônomo no campo
- **Estilo**: Flat design, cores vibrantes
- **Format**: SVG (preferível) ou PNG 2x

**Elementos visuais opcionais**:
- Pins flutuantes animados
- Linhas conectando pontos
- Efeito parallax sutil

## 🔘 BOTÕES DE AÇÃO

### Botão "COMEÇAR AGORA" (Primário)

**Posicionamento**:
- **Margin top**: 40px (abaixo da ilustração)
- **Margin horizontal**: 32px (esquerda/direita)
- **Largura**: calc(100% - 64px)

**Visual**:
- **Altura**: 56px
- **Background**: #FFFFFF (branco)
- **Border**: none
- **Border radius**: 28px (pill completo)
- **Box shadow**: 0px 8px 24px rgba(0, 0, 0, 0.15)

**Texto**:
- **Conteúdo**: "COMEÇAR AGORA"
- **Fonte**:
  - Size: 16px
  - Weight: 700
  - Color: #0057FF (azul)
  - Letter-spacing: 0.5px
- **Text-align**: Center

**Ícone (opcional)**:
- **Símbolo**: → (seta direita)
- **Tamanho**: 20x20px
- **Posição**: Direita do texto, 8px gap
- **Color**: #0057FF

**Estados**:
- **Normal**: Como descrito acima
- **Pressed**: 
  - Transform: scale(0.97)
  - Opacity: 0.9
  - Shadow reduzida
- **Transition**: 0.2s ease

**Ação**: Navega para `/cadastro`

### Botão "JÁ TENHO CONTA" (Secundário)

**Posicionamento**:
- **Margin top**: 16px (abaixo do botão primário)
- **Margin horizontal**: 32px
- **Largura**: calc(100% - 64px)

**Visual**:
- **Altura**: 56px
- **Background**: Transparente
- **Border**: 2px solid rgba(255, 255, 255, 0.5)
- **Border radius**: 28px

**Texto**:
- **Conteúdo**: "JÁ TENHO CONTA"
- **Fonte**:
  - Size: 16px
  - Weight: 600
  - Color: #FFFFFF
  - Letter-spacing: 0.5px

**Estados**:
- **Normal**: Como descrito
- **Pressed**: 
  - Background: rgba(255, 255, 255, 0.1)
  - Border: 2px solid rgba(255, 255, 255, 0.8)
- **Transition**: 0.2s ease

**Ação**: Navega para `/login`

## ✓ LISTA DE FEATURES

### Container
- **Margin top**: 48px
- **Padding horizontal**: 40px
- **Centralizado**: Horizontal

### Cada Feature (3 itens)

**Layout**:
```
✓ GPS em tempo real
```

**Espaçamento**:
- **Gap entre itens**: 16px
- **Alinhamento**: Left (dentro do container centralizado)

**Elementos**:

**Ícone Checkmark (✓)**:
- **Tamanho**: 20x20px
- **Color**: #FFFFFF
- **Estilo**: Circular filled
  - Círculo: 20x20px, background #FFFFFF 30% opacity
  - Check: Centralizado, stroke 2px, color #FFFFFF
- **Margin right**: 12px

**Texto**:
- **Fonte**:
  - Size: 15px
  - Weight: 500
  - Color: rgba(255, 255, 255, 0.95)
  - Line-height: 1.4

**Features padrão**:
1. "GPS em tempo real"
2. "IA para detecção de pragas"
3. "Relatórios automáticos"

## 📄 RODAPÉ

### Container
- **Posição**: Absoluto, bottom da tela
- **Margin bottom**: 32px (safe area)
- **Centralizado**: Horizontal

### Versão
- **Texto**: "v1.0.0"
- **Fonte**:
  - Size: 12px
  - Weight: 400
  - Color: rgba(255, 255, 255, 0.6)
- **Text-align**: Center

### Links opcionais
```
Termos de Uso  •  Privacidade
```
- **Fonte**: 12px, weight 500
- **Color**: rgba(255, 255, 255, 0.7)
- **Separador**: • (bullet point)
- **Gap**: 16px entre links

## 🎭 ANIMAÇÕES

**Entrada da tela** (mount):
1. Logo: Fade in + slide up (0.3s, delay 0s)
2. Tagline: Fade in (0.3s, delay 0.1s)
3. Ilustração: Fade in + scale (0.4s, delay 0.2s)
4. Botões: Slide up (0.3s, delay 0.3s, stagger 0.1s)
5. Features: Fade in (0.3s, delay 0.4s, stagger 0.05s)

**Background**:
- Gradient animado sutil (movimento vertical lento)
- Ou partículas flutuantes (opcional)

---

# 2. HOME

### Rota: `/home`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [X]                            │ ← Fechar
├─────────────────────────────────┤
│                                 │
│         [Avatar 80px]           │ ← Foto perfil
│                                 │
│       Olá, João Silva           │ ← Saudação
│    joao@exemplo.com             │ ← Email
│                                 │
│  ┌───────────────────────────┐ │
│  │  📊 Dashboard             │ │
│  │  ───────────────────────  │ │
│  │  Visão geral das áreas    │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │  🗺️ Mapas Offline         │ │
│  │  ───────────────────────  │ │
│  │  Gerenciar downloads      │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │  📈 Dashboard Executivo   │ │
│  │  ───────────────────────  │ │
│  │  Análise e métricas       │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │  👥 Clientes              │ │
│  │  ───────────────────────  │ │
│  │  Gerenciar produtores     │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │  ⚙️ Configurações          │ │
│  │  ───────────────────────  │ │
│  │  Ajustes do app           │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │  💬 Suporte               │ │
│  │  ───────────────────────  │ │
│  │  Fale conosco             │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │  🚪 Sair                  │ │ ← Vermelho
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER DA SIDEBAR

### Botão Fechar (X)
- **Posição**: Top-right, 16px do canto
- **Tamanho**: 40x40px (área de toque)
- **Ícone**: X (close)
  - 24x24px
  - Stroke: 2px
  - Color: #212529
- **Ação**: Fecha sidebar (slide para esquerda)

### Avatar do Usuário
- **Posição**: Centralizado horizontal
- **Margin top**: 60px (safe area)
- **Tamanho**: 80x80px (círculo)
- **Border**: 3px solid #0057FF
- **Conteúdo**:
  - Foto do usuário (se disponível)
  - Ou iniciais (2 letras, 32px bold, #FFFFFF em background #0057FF)
- **Box shadow**: 0px 4px 12px rgba(0, 87, 255, 0.2)

### Nome do Usuário
- **Posição**: 16px abaixo do avatar
- **Fonte**:
  - Size: 20px
  - Weight: 700
  - Color: #212529
- **Text-align**: Center

### Email
- **Posição**: 4px abaixo do nome
- **Fonte**:
  - Size: 14px
  - Weight: 400
  - Color: #6C757D
- **Text-align**: Center

## 📋 MENU DE NAVEGAÇÃO

### Container
- **Margin top**: 32px
- **Padding horizontal**: 16px
- **Gap entre items**: 12px

### Card de Menu Individual

**Estrutura**:
```
┌───────────────────────────┐
│  📊 Dashboard             │ ← Ícone + Título
│  ───────────────────────  │ ← Separador
│  Visão geral das áreas    │ ← Descrição
└───────────────────────────┘
```

**Dimensões**:
- **Largura**: 100% (menos padding container)
- **Altura**: auto (conteúdo + 16px padding)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px
- **Padding**: 16px
- **Box shadow**: 0px 2px 6px rgba(0, 0, 0, 0.05)

**Linha 1 - Ícone + Título**:

**Ícone**:
- **Tamanho**: 24x24px
- **Color**: #0057FF
- **Margin right**: 12px
- **Inline com título**

**Título**:
- **Fonte**:
  - Size: 16px
  - Weight: 700
  - Color: #212529
- **Vertical-align**: Middle

**Separador**:
- **Margin**: 8px vertical
- **Altura**: 1px
- **Background**: #E9ECEF

**Linha 2 - Descrição**:
- **Fonte**:
  - Size: 13px
  - Weight: 400
  - Color: #6C757D
  - Line-height: 1.4

**Estados**:
- **Normal**: Como descrito
- **Hover/Press**:
  - Background: #F8F9FA
  - Border: 1px solid #0057FF
  - Transform: translateX(4px)
  - Transition: 0.2s ease
- **Active** (rota atual):
  - Background: rgba(0, 87, 255, 0.05)
  - Border-left: 4px solid #0057FF

### Items do Menu (ordem)

1. **📊 Dashboard**
   - Ícone: Home/dashboard
   - Descrição: "Visão geral das áreas"
   - Ação: Navega para `/dashboard`

2. **🗺️ Mapas Offline**
   - Ícone: Map/layers
   - Descrição: "Gerenciar downloads"
   - Ação: Navega para `/mapas-offline`

3. **📈 Dashboard Executivo**
   - Ícone: TrendingUp/chart
   - Descrição: "Análise e métricas"
   - Ação: Navega para `/dashboard-executivo`

4. **👥 Clientes**
   - Ícone: Users
   - Descrição: "Gerenciar produtores"
   - Ação: Navega para `/clientes`

5. **⚙️ Configurações**
   - Ícone: Settings/gear
   - Descrição: "Ajustes do app"
   - Ação: Navega para `/configuracoes`

6. **💬 Suporte**
   - Ícone: MessageCircle
   - Descrição: "Fale conosco"
   - Ação: Navega para `/suporte`

### Botão SAIR (especial)

**Posicionamento**:
- **Margin top**: 24px (separado dos outros)
- **Mesma largura**: 100%

**Visual diferenciado**:
- **Background**: rgba(220, 53, 69, 0.05) (vermelho claro)
- **Border**: 1px solid #DC3545
- **Ícone color**: #DC3545
- **Título color**: #DC3545
- **Sem descrição**: Apenas título "Sair"

**Ação**: 
1. Mostra dialog de confirmação
2. Se confirmar: Limpa localStorage + navega para `/login`

## 🎭 ANIMAÇÕES

**Abertura da Sidebar**:
- Slide in from left (0.3s ease-out)
- Backdrop: Fade in (0.2s)

**Items do Menu**:
- Stagger fade in (0.05s delay entre cada)
- Slide in from left (subtle, 8px)

---

# 3. LOGIN

### Rota: `/login`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]                            │ ← Voltar
│                                 │
│         [Logo 64px]             │
│                                 │
│        Bem-vindo!               │ ← 24px bold
│    Entre na sua conta           │ ← 14px regular
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📧 Email                │   │
│  │ [___________________]   │   │ ← Input
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔒 Senha                │   │
│  │ [___________________] 👁 │   │ ← Input + toggle
│  └─────────────────────────┘   │
│                                 │
│           Esqueci a senha →     │ ← Link
│                                 │
│  ┌─────────────────────────┐   │
│  │       ENTRAR            │   │ ← Botão primário
│  └─────────────────────────┘   │
│                                 │
│        ───── OU ─────           │ ← Separador
│                                 │
│  ┌─────────────────────────┐   │
│  │  Entrar com Google  [G] │   │ ← Botão social
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Entrar com Apple   []  │   │
│  └─────────────────────────┘   │
│                                 │
│    Não tem conta? Cadastre-se   │ ← Link
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar ([←])
- **Posição**: Top-left, 16px do canto
- **Tamanho**: 40x40px (área toque)
- **Ícone**: ArrowLeft
  - 24x24px
  - Stroke: 2px
  - Color: #212529
- **Ação**: Navega para `/landing`

### Logo
- **Posição**: Centralizado horizontal
- **Margin top**: 60px
- **Tamanho**: 64x64px
- **Conteúdo**: Logo colorido (azul #0057FF)

### Título "Bem-vindo!"
- **Posição**: 24px abaixo do logo
- **Fonte**:
  - Size: 24px
  - Weight: 700
  - Color: #212529
- **Text-align**: Center

### Subtítulo
- **Texto**: "Entre na sua conta"
- **Posição**: 8px abaixo do título
- **Fonte**:
  - Size: 14px
  - Weight: 400
  - Color: #6C757D
- **Text-align**: Center

## 📝 FORMULÁRIO

### Container
- **Margin top**: 40px
- **Padding horizontal**: 24px

### Campo EMAIL

**Label + Ícone**:
- **Layout**: Inline
- **Ícone**: 📧 Mail (20x20px, #0057FF)
- **Texto**: "Email"
  - Fonte: 14px, weight 600, color #212529
  - Margin left do ícone: 8px

**Input**:
- **Margin top**: 8px
- **Largura**: 100%
- **Altura**: 48px
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px
- **Padding**: 12px 16px

**Texto interno**:
- **Placeholder**: "seu@email.com"
  - Color: #ADB5BD
  - Font: 15px, weight 400
- **Valor digitado**:
  - Color: #212529
  - Font: 15px, weight 500

**Estados**:
- **Normal**: Como descrito
- **Focus**: 
  - Border: 2px solid #0057FF
  - Box-shadow: 0px 0px 0px 4px rgba(0, 87, 255, 0.1)
- **Error**: 
  - Border: 2px solid #DC3545
  - Mensagem abaixo em vermelho

**Validação**:
- Formato de email válido
- Obrigatório

### Campo SENHA

**Label + Ícone**:
- **Ícone**: 🔒 Lock (20x20px, #0057FF)
- **Texto**: "Senha"

**Input**:
- **Mesmas specs** do email
- **Type**: password (mascarado)
- **Placeholder**: "••••••••"

**Botão Toggle Visibilidade**:
- **Posição**: Direita do input, inside
- **Coordenadas**: Right: 12px, vertical-center
- **Tamanho**: 32x32px
- **Ícone**: 
  - Eye (👁️) quando senha oculta
  - EyeOff quando senha visível
  - 20x20px, color #6C757D
- **Ação**: Alterna type="password" ↔ type="text"

### Link "Esqueci a senha"

**Posicionamento**:
- **Margin top**: 12px
- **Alinhamento**: Right

**Texto**:
- **Conteúdo**: "Esqueci a senha →"
- **Fonte**:
  - Size: 14px
  - Weight: 600
  - Color: #0057FF
- **Ícone seta**: → (inline)

**Estados**:
- **Normal**: Color #0057FF
- **Hover**: Underline, color #0041CC

**Ação**: Navega para `/esqueci-senha`

## 🔘 BOTÃO ENTRAR

**Posicionamento**:
- **Margin top**: 32px
- **Largura**: 100%

**Visual**:
- **Altura**: 56px
- **Background**: #0057FF
- **Border**: none
- **Border radius**: 28px
- **Box shadow**: 0px 4px 16px rgba(0, 87, 255, 0.3)

**Texto**:
- **Conteúdo**: "ENTRAR"
- **Fonte**:
  - Size: 16px
  - Weight: 700
  - Color: #FFFFFF
  - Letter-spacing: 0.5px

**Estados**:
- **Normal**: Como descrito
- **Hover/Press**: 
  - Background: #0041CC
  - Transform: scale(0.98)
- **Disabled** (campos vazios):
  - Background: #ADB5BD
  - Cursor: not-allowed
  - Opacity: 0.6
- **Loading** (autenticando):
  - Spinner branco centralizado
  - Texto: "ENTRANDO..."

**Ação**: 
1. Valida campos
2. Faz autenticação (mock: localStorage)
3. Navega para `/dashboard`

## ─── SEPARADOR "OU"

**Posicionamento**:
- **Margin**: 32px vertical

**Visual**:
```
───── OU ─────
```
- **Linhas**: 
  - Background: #E9ECEF
  - Altura: 1px
  - Largura: Flex (cresce)
- **Texto "OU"**:
  - Padding: 0 16px
  - Fonte: 12px, weight 600, color #6C757D

## 🌐 BOTÕES SOCIAIS

### Botão "Entrar com Google"

**Posicionamento**:
- **Margin top**: 16px (após separador)
- **Largura**: 100%

**Visual**:
- **Altura**: 52px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 26px
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.08)

**Conteúdo**:
- **Logo Google**: 
  - Tamanho: 20x20px
  - Posição: Left, 16px da borda
- **Texto**: "Entrar com Google"
  - Fonte: 15px, weight 600, color #212529
  - Centralizado (considerando espaço do logo)

**Estados**:
- **Hover/Press**: 
  - Background: #F8F9FA
  - Border: 1px solid #0057FF

**Ação**: Autenticação OAuth Google (mock)

### Botão "Entrar com Apple"

**Posicionamento**:
- **Margin top**: 12px

**Visual**: Mesmas specs do Google, mas:
- **Logo**: Apple (20x20px, preto)
- **Texto**: "Entrar com Apple"

**Ação**: Autenticação OAuth Apple (mock)

## 📄 RODAPÉ

### Link de Cadastro

**Posicionamento**:
- **Margin top**: 32px
- **Margin bottom**: 40px
- **Centralizado**: Horizontal

**Texto**:
- **Conteúdo**: "Não tem conta? **Cadastre-se**"
- **Fonte**:
  - Size: 14px
  - Weight: 400 (normal) + 700 (bold em "Cadastre-se")
  - Color: #6C757D (normal) + #0057FF (link)

**Ação**: Navega para `/cadastro`

## 🎭 ANIMAÇÕES

**Entrada**:
- Logo: Scale in (0.3s)
- Textos: Fade in stagger
- Formulário: Slide up (0.3s, delay 0.2s)
- Botões: Fade in (0.3s, delay 0.3s)

**Validação em tempo real**:
- Ícone ✓ verde aparece no input quando válido
- Shake animation se submeter com erro

---

# 4. CADASTRO

### Rota: `/cadastro`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]              [1/3]         │ ← Progress
│                                 │
│      Criar sua conta            │ ← 24px bold
│   Vamos começar pelo básico     │ ← 14px
│                                 │
│  ┌─────────────────────────┐   │
│  │ 👤 Nome completo        │   │
│  │ [___________________]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📧 Email                │   │
│  │ [___________________]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📞 Telefone             │   │
│  │ [___________________]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔒 Senha                │   │
│  │ [___________________] 👁 │   │
│  └─────────────────────────┘   │
│                                 │
│  Força da senha:                │
│  ████████░░░░ Média             │ ← Indicador
│                                 │
│  ☑ Aceito os termos de uso      │ ← Checkbox
│                                 │
│  ┌─────────────────────────┐   │
│  │     CONTINUAR           │   │ ← Botão
│  └─────────────────────────┘   │
│                                 │
│    Já tem conta? Faça login     │ ← Link
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Specs**: Iguais ao Login
- **Ação**: Navega para `/landing`

### Progress Indicator "[1/3]"

**Posicionamento**:
- **Top-right**: 16px do canto
- **Vertical-align**: Com botão voltar

**Visual**:
- **Texto**: "1/3" ou "Passo 1 de 3"
- **Fonte**:
  - Size: 14px
  - Weight: 600
  - Color: #0057FF

**Barra de progresso** (opcional):
```
████░░░░ (33%)
```
- **Posição**: Abaixo do header, full-width
- **Altura**: 3px
- **Background**: #E9ECEF
- **Fill**: #0057FF (33%, 66%, 100%)
- **Animação**: Width transition 0.3s

### Título
- **Texto**: "Criar sua conta"
- **Specs**: Iguais ao Login (24px bold)

### Subtítulo
- **Texto**: "Vamos começar pelo básico"
- **Specs**: 14px, color #6C757D

## 📝 FORMULÁRIO (Passo 1)

### Campo NOME COMPLETO

**Estrutura**: Igual aos inputs do Login

**Specs específicas**:
- **Ícone**: 👤 User (20x20px)
- **Label**: "Nome completo"
- **Placeholder**: "João Silva"
- **Validação**: 
  - Mínimo 3 caracteres
  - Obrigatório
  - Regex: apenas letras e espaços

### Campo EMAIL

**Specs**: Iguais ao Login
- **Validação adicional**: 
  - Verifica se email já existe (mock)
  - Mostra erro em tempo real

### Campo TELEFONE

**Specs do input**: Iguais aos outros

**Formatação automática**:
- **Mask**: (XX) XXXXX-XXXX
- **Exemplo**: (34) 99999-9999
- **Input type**: tel (teclado numérico)

**Validação**:
- 11 dígitos (com DDD)
- Formato brasileiro

### Campo SENHA

**Specs**: Iguais ao Login

**Validação em tempo real**:
- Mínimo 8 caracteres
- Ao menos 1 letra maiúscula
- Ao menos 1 número
- Ao menos 1 caractere especial

## 💪 INDICADOR DE FORÇA DA SENHA

**Posicionamento**:
- **Margin top**: 12px (abaixo do campo senha)

**Texto "Força da senha:"**:
- **Fonte**: 13px, weight 600, color #212529
- **Margin bottom**: 8px

**Barra de Progresso**:
- **Altura**: 6px
- **Largura**: 100%
- **Background**: #E9ECEF
- **Border radius**: 3px

**Segmentos** (4 partes):
```
██ ██ ██ ░░ (75% - Boa)
```
- **Cada segmento**: 25% da barra
- **Gap**: 4px entre segmentos

**Cores por força**:
1. **Fraca** (0-25%): #DC3545 (vermelho) - 1 segmento
2. **Média** (25-50%): #FFC107 (amarelo) - 2 segmentos
3. **Boa** (50-75%): #17A2B8 (azul claro) - 3 segmentos
4. **Forte** (75-100%): #28A745 (verde) - 4 segmentos

**Label de status**:
- **Texto**: "Fraca" / "Média" / "Boa" / "Forte"
- **Posição**: Direita da barra, inline
- **Fonte**: 13px, weight 600
- **Color**: Mesma da barra

## ✓ CHECKBOX TERMOS

**Posicionamento**:
- **Margin top**: 24px

**Estrutura**:
```
☑ Aceito os termos de uso
```

**Checkbox**:
- **Tamanho**: 20x20px
- **Border**: 2px solid #E9ECEF
- **Border radius**: 4px
- **Background** (unchecked): Transparente
- **Background** (checked): #0057FF
- **Checkmark**: ✓ branco, 14x14px

**Label**:
- **Fonte**: 14px, weight 400, color #212529
- **Margin left**: 12px
- **Link "termos de uso"**:
  - Color: #0057FF
  - Underline on hover
  - Abre modal ou webview

**Validação**:
- Obrigatório marcar para continuar

## 🔘 BOTÃO CONTINUAR

**Specs**: Iguais ao botão "ENTRAR" do Login

**Estados específicos**:
- **Disabled**: Se campos inválidos ou termos não aceitos
- **Enabled**: Azul vibrante

**Ação**:
1. Valida todos os campos
2. Armazena dados temporários
3. Navega para próximo passo (mock - ou salva e vai para /dashboard)

## 🎭 TRANSIÇÕES ENTRE PASSOS

**Se multi-step** (1/3, 2/3, 3/3):

**Passo 1**: Dados pessoais (atual)
**Passo 2**: Informações profissionais
  - Profissão (dropdown)
  - CREA/CRM (opcional)
  - Empresa/Fazenda

**Passo 3**: Preferências
  - Foto de perfil (upload)
  - Tipos de cultura
  - Região de atuação

**Animação entre passos**:
- Slide left (saída) + Slide right (entrada)
- Fade transition
- Progress bar anima

---

# 5. ESQUECI SENHA

### Rota: `/esqueci-senha`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]                            │
│                                 │
│         [🔑 Icon 64px]          │
│                                 │
│      Recuperar senha            │ ← 24px bold
│                                 │
│   Digite seu email cadastrado   │
│   e enviaremos um link para     │
│   redefinir sua senha           │ ← 14px, 3 linhas
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📧 Email                │   │
│  │ [___________________]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   ENVIAR LINK           │   │ ← Botão azul
│  └─────────────────────────┘   │
│                                 │
│      Lembrou a senha?           │
│         Fazer login →           │ ← Link
│                                 │
└─────────────────────────────────┘

--- APÓS ENVIAR ---

┌─────────────────────────────────┐
│                                 │
│         [✉️ Icon 80px]          │
│                                 │
│      Email enviado!             │ ← 24px bold
│                                 │
│   Enviamos um link para         │
│   joao@exemplo.com              │ ← Email em bold
│                                 │
│   Verifique sua caixa de        │
│   entrada e spam                │
│                                 │
│  ┌─────────────────────────┐   │
│  │   VOLTAR PARA LOGIN     │   │
│  └─────────────────────────┘   │
│                                 │
│    Não recebeu?                 │
│    Reenviar email →             │ ← Link azul
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Specs**: Padrão
- **Ação**: Navega para `/login`

### Ícone Principal
- **Posição**: Centralizado
- **Margin top**: 60px
- **Tamanho**: 64x64px
- **Símbolo**: 🔑 Chave ou cadeado desbloqueado
- **Color**: #0057FF

## 📄 CONTEÚDO

### Título
- **Texto**: "Recuperar senha"
- **Specs**: 24px bold, #212529

### Descrição (3 linhas)
- **Texto**: 
  ```
  Digite seu email cadastrado
  e enviaremos um link para
  redefinir sua senha
  ```
- **Fonte**: 14px, weight 400, color #6C757D, line-height 1.5
- **Text-align**: Center
- **Max-width**: 280px
- **Margin**: 0 auto

## 📝 FORMULÁRIO

### Campo Email
- **Specs**: Iguais ao Login
- **Autofocus**: true (cursor já no campo)
- **Autocomplete**: email

## 🔘 BOTÃO "ENVIAR LINK"

**Specs**: Iguais ao botão primário padrão

**Estados**:
- **Loading**: 
  - Spinner branco
  - Texto: "ENVIANDO..."
  - Duração: 2s (mock)

**Ação**:
1. Valida email
2. Mostra loading
3. Simula envio
4. Transiciona para tela de sucesso

## ✉️ TELA DE SUCESSO (após enviar)

### Ícone Envelope
- **Tamanho**: 80x80px
- **Símbolo**: ✉️ ou email aberto
- **Color**: #28A745 (verde sucesso)
- **Animação**: Scale in + checkmark aparece

### Título "Email enviado!"
- **Specs**: 24px bold, #28A745

### Mensagem
- **Texto**: 
  ```
  Enviamos um link para
  joao@exemplo.com
  ```
- **Email em bold**: #212529
- **Resto**: #6C757D

### Instrução adicional
- **Texto**: "Verifique sua caixa de entrada e spam"
- **Fonte**: 13px, color #6C757D

### Botão "VOLTAR PARA LOGIN"
- **Specs**: Botão primário padrão
- **Ação**: Navega para `/login`

### Link "Reenviar email"
- **Posição**: Abaixo do botão
- **Texto**: "Não recebeu? **Reenviar email →**"
- **Specs**: 14px, azul
- **Ação**: Envia novamente (com cooldown 60s)

## ⏱️ COOLDOWN DO REENVIO

**Após clicar "Reenviar"**:
- Link desabilitado por 60 segundos
- Texto muda para: "Reenviar em 59s... 58s..."
- Color: #ADB5BD (cinza)
- Após 60s: Volta ao normal

---

# 6. DASHBOARD

### Rota: `/dashboard`

## 📋 NOTA
**Layout completo já especificado em `/SPEC_DESIGN_DASHBOARD.md`**

Resumo dos elementos principais:
- Header com menu, logo, notificações, avatar
- Mapa interativo 400px
- Lista de áreas (scroll horizontal)
- Lista de ocorrências (vertical)
- FAB com menu radial
- Bottom Navigation (5 itens)

👉 **Ver arquivo completo para detalhes pixel-perfect**

---

# 7. AGENDA

### Rota: `/agenda`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  AGENDA           [+]      │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │  NOV 2025               │   │ ← Calendário
│  │  D  S  T  Q  Q  S  S    │   │
│  │     1  2  3  4  5  6    │   │
│  │  7  8 [9] 10 11 12 13   │   │ ← Dia 9 selecionado
│  │  14 15 •16 17 18 19 20  │   │ ← Dot = evento
│  └─────────────────────────┘   │
│                                 │
│  📅 Sábado, 9 de Novembro       │ ← Data selecionada
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🕐 08:00 - 10:00        │   │
│  │                         │   │
│  │ Visita Técnica          │   │
│  │ 🏢 Fazenda Boa Esperança│   │
│  │ 👤 João Silva           │   │
│  │ 📍 Talhão Norte         │   │
│  │                         │   │
│  │ [Ver detalhes]          │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🕐 14:00 - 16:00        │   │
│  │                         │   │
│  │ Aplicação de Defensivos │   │
│  │ 🏢 Sítio Verde          │   │
│  │ 👤 Maria Santos         │   │
│  │ 📍 Área Sul             │   │
│  │                         │   │
│  │ [Ver detalhes]          │   │
│  └─────────────────────────┘   │
│                                 │
│  Sem eventos após 16h           │ ← Mensagem
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar ([←])
- **Specs**: Padrão (40x40px, top-left)
- **Ação**: Navega para `/dashboard`

### Título "AGENDA"
- **Posição**: Centro
- **Fonte**: 18px, weight 700, color #212529

### Botão Adicionar ([+])
- **Posição**: Top-right, 16px
- **Tamanho**: 40x40px
- **Ícone**: Plus (24x24px, #0057FF)
- **Ação**: Abre modal "Novo Evento"

## 📅 CALENDÁRIO MENSAL

### Container
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border radius**: 12px
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.05)
- **Margin**: 16px

### Header do Calendário

**Estrutura**:
```
[<] NOV 2025 [>]
```

**Mês/Ano**:
- **Fonte**: 16px, weight 700, color #212529
- **Centralizado**: Horizontal

**Setas de navegação**:
- **Tamanho**: 32x32px cada
- **Posição**: Esquerda e direita do mês
- **Ícones**: ChevronLeft, ChevronRight (20x20px)
- **Color**: #0057FF
- **Ação**: Muda para mês anterior/próximo

### Grid de Dias da Semana

**Cabeçalho**:
```
D  S  T  Q  Q  S  S
```
- **Fonte**: 12px, weight 600, color #6C757D
- **Text-align**: Center
- **Padding bottom**: 8px
- **Border bottom**: 1px solid #E9ECEF

### Grid de Dias do Mês

**Layout**:
- **Grid**: 7 colunas (domingo a sábado)
- **Gap**: 4px
- **Padding top**: 8px

**Cada célula de dia**:
- **Tamanho**: 44x44px
- **Border radius**: 50% (círculo)
- **Text-align**: Center
- **Fonte**: 14px, weight 500

**Estados do dia**:

1. **Dia normal** (sem evento):
   - Color: #212529
   - Background: Transparente

2. **Dia com evento** (dot indicator):
   - Número: Color #212529
   - **Dot**: 
     - Tamanho: 4px (círculo)
     - Posição: Abaixo do número, 2px gap
     - Color: #0057FF
     - Pode ter múltiplos dots (máx 3)

3. **Dia selecionado**:
   - Background: #0057FF
   - Color: #FFFFFF (texto)
   - Dot: Branco
   - Box-shadow: 0px 2px 8px rgba(0, 87, 255, 0.3)

4. **Hoje** (dia atual, não selecionado):
   - Border: 2px solid #0057FF
   - Color: #0057FF (texto)

5. **Dia de outro mês**:
   - Color: #ADB5BD (cinza claro)
   - Opacity: 0.4

**Interação**:
- **Tap em dia**: Seleciona e carrega eventos

## 📋 DATA SELECIONADA

### Header da seção
- **Posição**: Abaixo do calendário
- **Margin**: 24px vertical
- **Padding horizontal**: 16px

**Texto**:
- **Formato**: "Sábado, 9 de Novembro"
- **Ícone**: 📅 (20x20px, inline)
- **Fonte**: 16px, weight 700, color #212529

## 📌 LISTA DE EVENTOS

### Container
- **Padding**: 16px
- **Gap entre cards**: 12px

### Card de Evento Individual

**Estrutura**:
```
┌─────────────────────────┐
│ 🕐 08:00 - 10:00        │ ← Horário
│                         │
│ Visita Técnica          │ ← Título
│ 🏢 Fazenda Boa Esperança│ ← Cliente
│ 👤 João Silva           │ ← Responsável
│ 📍 Talhão Norte         │ ← Localização
│                         │
│ [Ver detalhes]          │ ← Botão
└─────────────────────────┘
```

**Dimensões**:
- **Largura**: 100% (menos padding)
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-left**: 4px solid (cor por tipo)
  - Visita: #0057FF
  - Aplicação: #28A745
  - Reunião: #FFC107
  - Outro: #6C757D
- **Border radius**: 12px
- **Box shadow**: 0px 2px 6px rgba(0, 0, 0, 0.05)

**Linha 1 - Horário**:
- **Ícone**: 🕐 Clock (16x16px, #6C757D)
- **Texto**: "08:00 - 10:00"
  - Fonte: 14px, weight 600, color #212529
  - Margin left do ícone: 8px

**Linha 2 - Título do Evento**:
- **Margin top**: 12px
- **Fonte**: 16px, weight 700, color #212529

**Linha 3 - Cliente**:
- **Margin top**: 8px
- **Ícone**: 🏢 Building (16x16px)
- **Texto**: Nome da fazenda
  - Fonte: 14px, weight 500, color #212529

**Linha 4 - Responsável**:
- **Margin top**: 4px
- **Ícone**: 👤 User (16x16px)
- **Texto**: Nome do agrônomo
  - Fonte: 14px, weight 500, color #6C757D

**Linha 5 - Localização**:
- **Margin top**: 4px
- **Ícone**: 📍 MapPin (16x16px)
- **Texto**: Área/talhão
  - Fonte: 14px, weight 500, color #6C757D

**Botão "Ver detalhes"**:
- **Margin top**: 12px
- **Largura**: 100%
- **Altura**: 36px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid #0057FF
- **Border radius**: 8px
- **Texto**: "Ver detalhes →"
  - Fonte: 14px, weight 600, color #0057FF

**Ação**: Abre modal ou navega para detalhes do evento

### Mensagem "Sem eventos"

**Quando não há eventos**:
- **Texto**: "Sem eventos após 16h" ou "Nenhum evento neste dia"
- **Centralizado**: Horizontal
- **Padding**: 32px vertical
- **Fonte**: 14px, weight 400, color #ADB5BD
- **Ícone**: 📭 Mailbox empty (40x40px, centralizado acima)

## ➕ MODAL "NOVO EVENTO"

### Estrutura (Sheet bottom)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Novo Evento            [X]     │
│                                 │
│  Tipo de evento                 │
│  [Visita Técnica ▼]             │
│                                 │
│  Cliente                        │
│  [Selecione... ▼]               │
│                                 │
│  Data                           │
│  [09/11/2025]  [📅]             │
│                                 │
│  Horário início                 │
│  [08:00]  [🕐]                  │
│                                 │
│  Horário fim                    │
│  [10:00]  [🕐]                  │
│                                 │
│  Localização                    │
│  [Talhão... ▼]                  │
│                                 │
│  Observações (opcional)         │
│  [____________________]         │
│                                 │
│  [CRIAR EVENTO]                 │
│                                 │
└─────────────────────────────────┘
```

**Sheet specs**:
- **Altura**: 80% da tela
- **Border radius**: 24px (topo)
- **Background**: #FFFFFF
- **Handle** (─── drag):
  - Largura: 40px
  - Altura: 4px
  - Background: #E9ECEF
  - Margin: 12px auto

**Campos**: Mesmos padrões dos formulários anteriores

**Botão "CRIAR EVENTO"**:
- **Specs**: Botão primário padrão
- **Ação**: Salva evento + fecha modal + recarrega lista

## 🎭 ANIMAÇÕES

**Troca de mês**:
- Calendário: Slide left/right (0.3s)

**Seleção de dia**:
- Círculo: Scale animation (0.2s)
- Lista: Fade in + slide up (0.3s)

**Cards de evento**:
- Stagger fade in (0.05s delay)

---

# 8. CLIMA

### Rota: `/clima`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  CLIMA            [📍] [⚙️]│
├─────────────────────────────────┤
│                                 │
│  📍 Uberlândia, MG     [🔍]     │ ← Localização + busca
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │         ☀️             │   │ ← Ícone grande
│  │                         │   │
│  │        28°C             │   │ ← Temp grande
��  │   Parcialmente nublado  │   │
│  │                         │   │
│  │  Sensação: 30°C         │   │
│  │  Min 18° • Máx 32°      │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────┬─────┬─────┬─────┐     │
│  │💧65%│🌬️12│☀️8 │💨45│     │ ← Métricas
│  │Umid.│km/h │UV  │%Chuv│     │
│  └─────┴─────┴─────┴─────┘     │
│                                 │
│  🕐 PRÓXIMAS HORAS              │
│  ┌─────────────────────────┐   │
│  │ 14h 15h 16h 17h 18h ... │   │ ← Scroll horizontal
│  │ ☀️ ☀️ ⛅ ⛅ 🌧️         │   │
│  │ 28° 29° 27° 26° 24°     │   │
│  └─────────────────────────┘   │
│                                 │
│  📅 PREVISÃO 7 DIAS             │
│  ┌─────────────────────────┐   │
│  │ SEG  ☀️  30°/18° 💧0%  │   │
│  │ ────────────────────    │   │
│  │ TER  ⛅  28°/19° 💧20% │   │
│  │ ────────────────────    │   │
│  │ QUA  🌧️  25°/17° 💧80%│   │
│  │      💦 15mm            │   │
│  │ ────────────────────    │   │
│  │ QUI  ⛅  27°/18° 💧30% │   │
│  └─────────────────────────┘   │
│                                 │
│  🤖 ANÁLISE INTELIGENTE         │
│  ┌─────────────────────────┐   │
│  │ ✅ Condições favoráveis │   │
│  │    para aplicação nas   │   │
│  │    próximas 2 horas     │   │
│  │                         │   │
│  │ ⚠️ Chuva prevista para  │   │
│  │    amanhã. Evite        │   │
│  │    aplicações.          │   │
│  │                         │   │
│  │ 💡 Janela: Hoje 14-17h  │   │
│  └─────────────────────────┘   │
│                                 │
│  🗺️ RADAR                       │
│  ┌─────────────────────────┐   │
│  │  [Mini mapa com radar]  │   │ ← 200px altura
│  │  Nuvens se aproximando  │   │
│  │  [Ver tela cheia →]     │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Specs**: Padrão

### Título "CLIMA"
- **Specs**: 18px bold, centro

### Botão GPS ([📍])
- **Posição**: Top-right, 56px da borda
- **Tamanho**: 40x40px
- **Ícone**: MapPin (24x24px, #0057FF)
- **Ação**: Abre seletor de localizações salvas

### Botão Configurações ([⚙️])
- **Posição**: Top-right, 16px da borda
- **Tamanho**: 40x40px
- **Ícone**: Settings (24x24px, #6C757D)
- **Ação**: Configurações de clima (unidades, alertas)

## 📍 LOCALIZAÇÃO ATUAL

### Container
- **Padding**: 16px
- **Margin bottom**: 16px

**Estrutura**:
```
📍 Uberlândia, MG     [🔍]
```

**Ícone + Texto**:
- **Ícone**: 📍 (20x20px, #0057FF)
- **Texto**: "Uberlândia, MG"
  - Fonte: 16px, weight 600, color #212529
  - Tap: Abre dropdown de localizações

**Botão Busca ([🔍])**:
- **Posição**: Direita
- **Tamanho**: 36x36px
- **Ícone**: Search (20x20px)
- **Ação**: Abre campo de busca de cidade

## ☀️ CONDIÇÕES ATUAIS (Hero Card)

### Container
- **Margin**: 16px
- **Padding**: 24px
- **Background**: Linear gradient
  - Top: rgba(0, 87, 255, 0.05)
  - Bottom: #FFFFFF
- **Border**: 1px solid rgba(0, 87, 255, 0.1)
- **Border radius**: 16px
- **Box shadow**: 0px 4px 12px rgba(0, 0, 0, 0.08)

### Ícone do Tempo (animado)
- **Tamanho**: 120x120px
- **Posição**: Centralizado horizontal
- **Tipos**: 
  - ☀️ Sol (amarelo, com raios)
  - ⛅ Nublado (cinza + sol)
  - 🌧️ Chuva (azul, gotas animadas)
  - ⛈️ Tempestade (roxo, raios)
- **Animação**: Movimento sutil (float up/down 2s loop)

### Temperatura Principal
- **Margin top**: 16px
- **Fonte**:
  - Size: 56px
  - Weight: 800
  - Color: #212529
  - Letter-spacing: -2px
- **Símbolo °C**: 
  - Size: 32px (menor)
  - Vertical-align: Top
  - Color: #6C757D

### Descrição do Tempo
- **Margin top**: 8px
- **Texto**: "Parcialmente nublado"
- **Fonte**: 16px, weight 500, color #6C757D
- **Text-align**: Center

### Sensação Térmica
- **Margin top**: 16px
- **Texto**: "Sensação: 30°C"
- **Fonte**: 14px, weight 500, color #6C757D

### Mín/Máx
- **Margin top**: 4px
- **Texto**: "Min 18° • Máx 32°"
- **Fonte**: 14px, weight 600, color #212529
- **Separador**: • (bullet)

## 📊 MÉTRICAS RÁPIDAS (4 Cards)

### Container
- **Margin**: 16px
- **Display**: Grid 2x2 (2 colunas, 2 linhas)
- **Gap**: 12px

### Cada Card de Métrica

**Dimensões**:
- **Largura**: (100% - 12px) / 2
- **Altura**: 80px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px
- **Padding**: 12px
- **Text-align**: Center

**Estrutura**:
```
┌─────┐
│ 💧  │ ← Ícone
│ 65% │ ← Valor
│Umid.│ ← Label
└─────┘
```

**Ícone**:
- **Tamanho**: 28x28px
- **Margin bottom**: 8px

**Valor**:
- **Fonte**: 20px, weight 700, color #212529
- **Margin bottom**: 4px

**Label**:
- **Fonte**: 12px, weight 500, color #6C757D

**4 Métricas**:

1. **Umidade** 💧
   - Valor: "65%"
   - Color: #17A2B8

2. **Vento** 🌬️
   - Valor: "12 km/h"
   - Direção: "NE" (opcional)
   - Color: #6C757D

3. **UV** ☀️
   - Valor: "8" (índice)
   - Color: #FFC107
   - Status: "Alto"

4. **Chuva** 💨
   - Valor: "45%"
   - Color: #0057FF

## 🕐 PREVISÃO POR HORA

### Container
- **Margin**: 24px vertical
- **Padding horizontal**: 16px

### Header
- **Texto**: "PRÓXIMAS HORAS"
- **Ícone**: 🕐 (20x20px)
- **Fonte**: 14px, weight 700, color #212529, uppercase
- **Margin bottom**: 12px

### Scroll Horizontal

**Container**:
- **Overflow-x**: Scroll (ocultar scrollbar)
- **Display**: Flex
- **Gap**: 12px
- **Padding**: 4px (para sombras)

### Card de Hora Individual

**Dimensões**:
- **Largura**: 60px (fixo)
- **Altura**: 100px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px
- **Padding**: 8px
- **Text-align**: Center

**Estrutura**:
```
┌────┐
│14h │ ← Hora
│ ☀️ │ ← Ícone
│28° │ ← Temp
└────┘
```

**Hora**:
- **Fonte**: 13px, weight 600, color #212529
- **Margin bottom**: 8px

**Ícone do Tempo**:
- **Tamanho**: 32x32px
- **Margin**: 8px vertical

**Temperatura**:
- **Fonte**: 16px, weight 700, color #212529

**Estado "Agora"** (hora atual):
- **Background**: rgba(0, 87, 255, 0.1)
- **Border**: 2px solid #0057FF
- **Label**: "Agora" em vez da hora

## 📅 PREVISÃO 7 DIAS

### Container
- **Margin**: 24px vertical
- **Padding horizontal**: 16px

### Header
- **Texto**: "PREVISÃO 7 DIAS"
- **Ícone**: 📅
- **Specs**: Iguais ao header de horas

### Lista Vertical

**Gap entre itens**: 12px

### Card de Dia Individual

**Dimensões**:
- **Largura**: 100%
- **Altura**: auto (mín 60px)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px
- **Padding**: 12px 16px

**Layout** (grid 4 colunas):
```
┌──────┬────┬─────┬────┐
│ SEG  │ ☀️ │30°/18°│💧0%│
└──────┴────┴─────┴────┘
```

**Coluna 1 - Dia da Semana**:
- **Largura**: 50px
- **Texto**: "SEG", "TER", etc
- **Fonte**: 14px, weight 700, color #212529
- **Se hoje**: Color #0057FF, background rgba(0,87,255,0.1)

**Coluna 2 - Ícone**:
- **Largura**: 40px
- **Ícone**: 32x32px
- **Centralizado**: Vertical

**Coluna 3 - Temperaturas**:
- **Largura**: Flex (cresce)
- **Texto**: "30°/18°"
  - Máx: 16px, weight 700, color #212529
  - Min: 14px, weight 500, color #6C757D
  - Separador: /

**Coluna 4 - Chuva**:
- **Largura**: 60px
- **Ícone**: 💧 (16x16px)
- **Texto**: "0%", "20%", "80%"
  - Fonte: 14px, weight 600
  - Color: Baseado em %
    - 0-20%: #6C757D
    - 21-60%: #FFC107
    - 61-100%: #17A2B8
- **Alinhamento**: Right

**Linha extra** (se chuva > 60%):
- **Margin top**: 4px
- **Ícone**: 💦 Gotas (16x16px)
- **Texto**: "15mm" (volume esperado)
  - Fonte: 13px, weight 600, color #17A2B8

## 🤖 ANÁLISE INTELIGENTE (IA)

### Container
- **Margin**: 24px vertical
- **Padding**: 16px
- **Background**: Linear gradient
  - #F8F9FA → #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-left**: 4px solid #0057FF
- **Border radius**: 12px

### Header
- **Texto**: "ANÁLISE INTELIGENTE"
- **Ícone**: 🤖 (20x20px)
- **Fonte**: 14px, weight 700, color #212529, uppercase
- **Margin bottom**: 16px

### Lista de Insights

**Gap entre items**: 12px

### Card de Insight Individual

**Estrutura**:
```
✅ Condições favoráveis para
   aplicação nas próximas 2h
```

**Ícone de Status**:
- **Tamanho**: 20x20px
- **Tipos**:
  - ✅ Check verde (#28A745): Favorável
  - ⚠️ Alerta amarelo (#FFC107): Atenção
  - ❌ X vermelho (#DC3545): Desfavorável
  - 💡 Lâmpada azul (#0057FF): Dica
- **Margin right**: 12px
- **Vertical-align**: Top

**Texto**:
- **Fonte**: 14px, weight 500, color #212529, line-height 1.5
- **Negrito** em palavras-chave

**Exemplos de insights**:

1. ✅ "Condições favoráveis para aplicação de defensivos nas próximas **2 horas**"
2. ⚠️ "Chuva prevista para **amanhã**. Evite aplicações de produtos sistêmicos"
3. 💡 "Janela ideal: Hoje **14h-17h** (vento baixo, sem chuva)"
4. ❌ "Vento acima de **15 km/h**. Não recomendado pulverizar agora"

## 🗺️ RADAR DE CHUVA (Mini)

### Container
- **Margin**: 24px vertical
- **Padding**: 16px
- **Background**: #F8F9FA
- **Border radius**: 12px

### Header
- **Texto**: "RADAR DE CHUVA"
- **Ícone**: 🗺️
- **Specs**: Padrão

### Mini Mapa

**Dimensões**:
- **Altura**: 200px
- **Largura**: 100%
- **Border radius**: 8px
- **Margin**: 12px vertical

**Conteúdo**:
- **Mapa base**: Satélite ou Streets
- **Overlay**: Camada de radar (intensidade de chuva)
  - Cores: Verde (leve) → Amarelo → Vermelho (forte)
  - Opacidade: 0.6
- **Animação**: Movimento das nuvens (loop 3s)

### Status do Radar
- **Texto**: "Nuvens se aproximando de noroeste"
- **Fonte**: 13px, weight 500, color #6C757D
- **Margin bottom**: 12px

### Botão "Ver tela cheia"
- **Largura**: 100%
- **Altura**: 36px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid #0057FF
- **Border radius**: 8px
- **Texto**: "Ver em tela cheia →"
  - Fonte: 14px, weight 600, color #0057FF
- **Ação**: Navega para `/radar-clima`

## 🎭 ANIMAÇÕES

**Ícone do tempo atual**:
- Float animation (sobe/desce suavemente)
- Rotação sutil se sol

**Scroll de horas**:
- Auto-scroll até hora atual
- Smooth scroll ao arrastar

**Insights da IA**:
- Fade in stagger (0.1s delay)
- Ícones: Scale in

**Radar**:
- Nuvens: Translateanimation (lenta)
- Pulse nos pontos de alta intensidade

---

# 9. RELATÓRIOS

### Rota: `/relatorios`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  RELATÓRIOS       [🔍] [+] │
├─────────────────────────────────┤
│                                 │
│  🗂️ [Todos ▼] [Este Mês ▼]     │ ← Filtros
│                                 │
│  ┌─────────────────────────┐   │
│  │ [Imagem de capa 16:9]   │   │ ← Card 1
│  ├─────────────────────────┤   │
│  │ 📄 Visita Técnica -     │   │
│  │    Fazenda Boa Esperança│   │
│  │                         │   │
│  │ 👤 João Silva           │   │
│  │ 📅 10/11/2025 - 14:30   │   │
│  │ 📍 Talhão Norte (45ha)  │   │
│  │                         │   │
│  │ 🏷️ [Soja][Fertilização] │   │
│  │                         │   │
│  │ [👁️ Ver] [📤 Exportar]  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [📸 📸 📸]              │   │ ← Card 2 (galeria)
│  ├─────────────────────────┤   │
│  │ 📄 Análise de Solo      │   │
│  │                         │   │
│  │ 👤 Maria Santos         │   │
│  │ 📅 08/11/2025 - 10:00   │   │
│  │ 📍 Área Teste (12.5ha)  │   │
│  │                         │   │
│  │ 🏷️ [Solo][NPK]          │   │
│  │                         │   │
│  │ [👁️ Ver] [📤 Exportar]  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [Imagem de capa]        │   │ ← Card 3
│  ├─────────────────────────┤   │
│  │ 📄 Controle de Pragas   │   │
│  │                         │   │
│  │ 👤 Pedro Costa          │   │
│  │ 📅 05/11/2025 - 16:45   │   │
│  │ 📍 Lavoura Sul (32ha)   │   │
│  │                         │   │
│  │ 🏷️ [Lagarta][Aplicação] │   │
│  │                         │   │
│  │ [👁️ Ver] [📤 Exportar]  │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Specs**: Padrão

### Título "RELATÓRIOS"
- **Specs**: 18px bold, centro

### Botão Busca ([🔍])
- **Posição**: Top-right, 56px da borda
- **Tamanho**: 40x40px
- **Ícone**: Search (24x24px, #6C757D)
- **Ação**: Expande campo de busca

### Botão Adicionar ([+])
- **Posição**: Top-right, 16px da borda
- **Tamanho**: 40x40px
- **Ícone**: Plus (24x24px, #0057FF)
- **Ação**: Navega para `/relatorios/novo`

## 🔍 CAMPO DE BUSCA (expandido)

**Estado normal**: Apenas ícone [🔍]

**Estado expandido**:
```
┌─────────────────────────────┐
│ [🔍] [_________________] [X]│
└─────────────────────────────┘
```

**Container**:
- **Largura**: 100% (substitui header)
- **Altura**: 64px (mesma do header)
- **Background**: #FFFFFF
- **Border bottom**: 1px solid #E9ECEF
- **Padding horizontal**: 16px

**Input**:
- **Placeholder**: "Buscar relatórios..."
- **Autofocus**: true
- **Specs**: Padrão de inputs

**Botão Fechar ([X])**:
- **Posição**: Direita
- **Ação**: Fecha busca, limpa campo

**Sugestões** (dropdown abaixo):
- Lista de resultados em tempo real
- Destaque no texto que dá match

## 🗂️ FILTROS

### Container
- **Padding**: 16px
- **Background**: #F8F9FA
- **Border bottom**: 1px solid #E9ECEF

**Estrutura**:
```
🗂️ [Todos ▼] [Este Mês ▼]
```

### Dropdown "Tipo" ([Todos ▼])

**Botão**:
- **Largura**: Auto (fit content)
- **Altura**: 36px
- **Padding**: 8px 12px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 18px (pill)
- **Margin right**: 8px

**Conteúdo**:
- **Ícone**: 🗂️ Folder (16x16px)
- **Texto**: "Todos" (ou tipo selecionado)
  - Fonte: 14px, weight 600, color #212529
  - Margin: 0 8px (entre ícone e seta)
- **Seta**: ▼ ChevronDown (14x14px, #6C757D)

**Dropdown aberto**:
```
┌──────────────────┐
│ ✓ Todos          │
│ ○ Visita Técnica │
│ ○ Análise Solo   │
│ ○ Controle Pragas│
│ ○ Aplicação      │
│ ○ Colheita       │
│ ○ Outros         │
└──────────────────┘
```
- **Posição**: Abaixo do botão
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Box shadow**: 0px 4px 12px rgba(0, 0, 0, 0.15)
- **Item height**: 40px cada
- **Checkmark**: ✓ se selecionado (azul)

### Dropdown "Período" ([Este Mês ▼])

**Specs**: Iguais ao dropdown Tipo

**Opções**:
- Hoje
- Esta Semana
- Este Mês (default)
- Este Ano
- Personalizado (date range picker)

## 📄 LISTA DE RELATÓRIOS

### Container
- **Padding**: 16px
- **Gap entre cards**: 16px
- **Background**: #F8F9FA

### Card de Relatório

**Dimensões**:
- **Largura**: 100% (menos padding)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 16px
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.06)
- **Overflow**: Hidden (para imagem)

### 1) Imagem de Capa (topo do card)

**Variante A - Imagem única**:
- **Altura**: 180px
- **Largura**: 100%
- **Object-fit**: Cover
- **Conteúdo**: Primeira foto do relatório

**Variante B - Galeria (3 fotos)**:
```
┌────┬────┬────┐
│ 📸 │ 📸 │ 📸 │
└────┴────┴────┘
```
- **Altura**: 120px
- **Layout**: Grid 3 colunas iguais
- **Gap**: 2px
- **Object-fit**: Cover

**Variante C - Sem foto**:
- **Altura**: 120px
- **Background**: Linear gradient (#0057FF 10% → #FFFFFF)
- **Ícone central**: 📄 (60x60px, opacity 0.2)

**Overlay** (sobre imagem):
- **Posição**: Top-right, 12px
- **Badge de status**:
  - "Rascunho" (cinza)
  - "Publicado" (verde)
  - "Arquivado" (amarelo)
  - Background semi-transparente
  - Padding: 4px 8px
  - Border radius: 8px
  - Fonte: 11px, weight 600, color #FFFFFF

### 2) Conteúdo do Card

**Padding**: 16px

**Linha 1 - Ícone + Título**:
- **Ícone**: 📄 (20x20px, #0057FF)
- **Título**: 
  - Texto: "Visita Técnica - Fazenda Boa Esperança"
  - Fonte: 16px, weight 700, color #212529, line-height 1.3
  - Max lines: 2 (ellipsis)
  - Margin bottom: 12px

**Linha 2 - Autor**:
- **Ícone**: 👤 (16x16px, #6C757D)
- **Texto**: "João Silva"
  - Fonte: 14px, weight 500, color #212529
  - Margin left do ícone: 8px
  - Margin bottom: 6px

**Linha 3 - Data/Hora**:
- **Ícone**: 📅 (16x16px, #6C757D)
- **Texto**: "10/11/2025 - 14:30"
  - Fonte: 14px, weight 500, color #6C757D
  - Margin bottom: 6px

**Linha 4 - Localização**:
- **Ícone**: 📍 (16x16px, #6C757D)
- **Texto**: "Talhão Norte (45.3 ha)"
  - Fonte: 14px, weight 500, color #6C757D
  - Margin bottom: 12px

### 3) Tags

**Container**:
- **Margin top**: 12px
- **Display**: Flex wrap
- **Gap**: 8px

**Cada Tag**:
```
[Soja]
```
- **Padding**: 4px 10px
- **Background**: rgba(0, 87, 255, 0.1)
- **Border**: 1px solid rgba(0, 87, 255, 0.3)
- **Border radius**: 12px (pill)
- **Fonte**: 12px, weight 600, color #0057FF
- **Ícone**: 🏷️ (14x14px, antes do texto)

**Cores por categoria**:
- Cultura (Soja, Milho): Azul
- Processo (Fertilização, Aplicação): Verde
- Status (Urgente, Pendente): Vermelho/Amarelo

### 4) Botões de Ação

**Container**:
- **Margin top**: 16px
- **Display**: Flex
- **Gap**: 12px

**Botão "Ver"** ([👁️ Ver]):
- **Largura**: Flex 1 (50% - gap)
- **Altura**: 40px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid #0057FF
- **Border radius**: 20px
- **Ícone**: 👁️ Eye (18x18px, #0057FF)
- **Texto**: "Ver"
  - Fonte: 14px, weight 600, color #0057FF
  - Margin left do ícone: 8px
- **Ação**: Abre modal ou navega para detalhes

**Botão "Exportar"** ([📤 Exportar]):
- **Specs**: Iguais ao "Ver"
- **Ícone**: 📤 Upload (18x18px)
- **Texto**: "Exportar"
- **Ação**: Abre menu de exportação (PDF, Excel, Compartilhar)

**Menu de Exportação** (sheet bottom):
```
┌─────────────────────────────┐
│      ─── (handle)           │
│                             │
│  Exportar Relatório         │
│                             │
│  📄 Exportar como PDF       │
│  📊 Exportar como Excel     │
│  📤 Compartilhar            │
│  🖼️ Salvar como Imagem      │
│                             │
│  [X] Cancelar               │
└─────────────────────────────┘
```

## 📭 ESTADO VAZIO

**Quando não há relatórios**:
```
┌─────────────────────────────────┐
│                                 │
│         [📭 Icon 80px]          │
│                                 │
│    Nenhum relatório ainda      │
│                                 │
│  Crie seu primeiro relatório    │
│  e acompanhe suas visitas       │
│                                 │
│  ┌─────────────────────────┐   │
│  │  + CRIAR RELATÓRIO      │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Ícone**: 📭 Mailbox empty (80x80px, #ADB5BD)
**Título**: 18px, weight 700, color #212529
**Descrição**: 14px, weight 400, color #6C757D
**Botão**: Specs de botão primário

## 🎭 ANIMAÇÕES

**Entrada dos cards**:
- Stagger fade in + slide up (0.05s delay)

**Abertura de dropdown**:
- Scale Y (0 → 1) com origin no topo
- Duração: 0.2s

**Tap em card**:
- Scale down (0.98) + shadow aumenta

**Pull to refresh**:
- Atualiza lista de relatórios

---

# 10. EDITOR DE RELATÓRIO

### Rota: `/relatorios/novo`

## 📱 LAYOUT COMPLETO (Scroll vertical)

```
┌─────────────────────────────────┐
│  [X]  NOVO RELATÓRIO   [✓Salvar]│
├─────────────────────────────────┤
│                                 │
│  📋 INFORMAÇÕES BÁSICAS         │
│                                 │
│  Título *                       │
│  [_________________________]    │
│                                 │
│  Tipo de Relatório *            │
│  [Visita Técnica ▼]             │
│                                 │
│  Cliente/Fazenda *              │
│  [Fazenda Boa Esperança ▼]      │
│                                 │
│  Área/Talhão                    │
│  [Talhão Norte ▼]               │
│                                 │
│  📍 LOCALIZAÇÃO                 │
│  ┌─────────────────────────┐   │
│  │ [Mini Mapa com pin]     │   │
│  └─────────────────────────┘   │
│  📍 Lat: -18.9188               │
│      Lng: -48.2766              │
│  [📍 Usar localização atual]    │
│                                 │
│  🌤️ CONDIÇÕES DO DIA            │
│  ┌─────────────────────────┐   │
│  │ ☀️ 28°C                 │   │
│  │ Parcialmente nublado    │   │
│  │ 💧 Umidade: 65%         │   │
│  │ 🌬️ Vento: 12 km/h NE   │   │
│  └─────────────────────────┘   │
│  [🔄 Atualizar]                 │
│                                 │
│  📸 FOTOS (3/10)                │
│  ┌────┬────┬────┬────┐          │
│  │ 📷 │ 🖼️ │ 🖼️ │[+] │          │
│  └────┴────┴────┴────┘          │
│                                 │
│  📝 OBSERVAÇÕES                 │
│  ┌─────────────────────────┐   │
│  │ [B][I][U] [•][1][☐]    │   │ ← Toolbar
│  ├─────────────────────────┤   │
│  │ [Editor de texto rico]  │   │
│  │                         │   │
│  │ • Digite aqui...        │   │
│  │                         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  🏷️ TAGS                        │
│  ┌─────────────────────────┐   │
│  │ [Soja] [Fertilização]   │   │
│  │ [+ Adicionar]           │   │
│  └─────────────────────────┘   │
│                                 │
│  ✅ RECOMENDAÇÕES               │
│  ┌─────────────────────────┐   │
│  │ [Editor de texto rico]  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  💾 SALVAR RASCUNHO     │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  ✓ FINALIZAR RELATÓRIO  │   │ ← Azul
│  └─────────────────────────┘   │
│                                 │
│         (margin bottom 40px)    │
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Fechar ([X])
- **Posição**: Top-left, 16px
- **Tamanho**: 40x40px
- **Ícone**: X (24x24px, #212529)
- **Ação**: 
  1. Se há mudanças não salvas: Mostra dialog "Descartar alterações?"
  2. Se não: Fecha e volta para `/relatorios`

### Título "NOVO RELATÓRIO"
- **Posição**: Centro
- **Fonte**: 16px, weight 700, color #212529

### Botão Salvar ([✓ Salvar])
- **Posição**: Top-right, 16px
- **Tamanho**: Auto x 36px
- **Padding**: 8px 12px
- **Background**: rgba(0, 87, 255, 0.1)
- **Border**: 1px solid #0057FF
- **Border radius**: 18px
- **Ícone**: ✓ Check (18x18px, #0057FF)
- **Texto**: "Salvar"
  - Fonte: 14px, weight 600, color #0057FF
- **Ação**: Salva rascunho (auto-save já roda a cada 30s)

## 📋 SEÇÃO "INFORMAÇÕES BÁSICAS"

### Header da Seção
- **Ícone**: 📋 (20x20px, #0057FF)
- **Texto**: "INFORMAÇÕES BÁSICAS"
- **Fonte**: 14px, weight 700, color #212529, uppercase
- **Padding**: 16px
- **Border bottom**: 1px solid #E9ECEF
- **Margin bottom**: 16px

### Campo TÍTULO *

**Label**:
- **Texto**: "Título *"
- **Fonte**: 14px, weight 600, color #212529
- **Margin bottom**: 8px
- **Asterisco**: Color #DC3545 (vermelho, obrigatório)

**Input**:
- **Specs**: Padrão de inputs
- **Placeholder**: "Ex: Visita Técnica - Fazenda XYZ"
- **Max length**: 100 caracteres
- **Counter**: "0/100" (canto inferior direito)
  - Fonte: 12px, color #ADB5BD

### Campo TIPO DE RELATÓRIO * (Dropdown)

**Botão dropdown**:
```
┌─────────────────────────┐
│ Visita Técnica      [▼] │
└─────────────────────────┘
```
- **Specs**: Igual inputs
- **Ícone**: ChevronDown (20x20px, direita)
- **Valor selecionado**: Bold

**Dropdown aberto**:
```
┌──────────────────────┐
│ ✓ Visita Técnica     │
│ ○ Análise de Solo    │
│ ○ Controle de Pragas │
│ ○ Aplicação          │
│ ○ Colheita           │
│ ○ Monitoramento      │
│ ○ Outro              │
└──────────────────────┘
```
- **Item height**: 48px
- **Checkmark**: ✓ azul se selecionado
- **Hover**: Background #F8F9FA

### Campo CLIENTE/FAZENDA * (Dropdown com busca)

**Botão**:
- **Specs**: Igual Tipo
- **Valor**: Nome da fazenda selecionada

**Dropdown** (sheet bottom com busca):
```
┌─────────────────────────────┐
│      ─── (handle)           │
│                             │
│  Selecione a Fazenda        │
│                             │
│  [🔍 Buscar...]             │
│                             │
│  ✓ Fazenda Boa Esperança    │
│    João Silva • Uberlândia  │
│  ──────────────────────     │
│  ○ Sítio Verde              │
│    Maria Santos • Uberaba   │
│  ──────────────────────     │
│  ○ Fazenda Santa Clara      │
│    Pedro Costa • Araguari   │
│                             │
│  [+ Nova Fazenda]           │
└─────────────────────────────┘
```

**Cada item**:
- **Altura**: 64px
- **Linha 1**: Nome da fazenda (16px bold)
- **Linha 2**: Nome cliente • Cidade (13px, color #6C757D)
- **Avatar**: 40x40px (esquerda)
- **Checkmark**: Se selecionado (direita)

### Campo ÁREA/TALHÃO (Dropdown aninhado)

**Specs**: Iguais ao Cliente/Fazenda

**Comportamento**:
- Desabilitado até selecionar Cliente
- Carrega áreas do cliente selecionado
- Permite "Sem área vinculada"

## 📍 SEÇÃO "LOCALIZAÇÃO"

### Header
- **Specs**: Igual "Informações Básicas"
- **Ícone**: 📍

### Mini Mapa

**Dimensões**:
- **Altura**: 150px
- **Largura**: 100%
- **Border radius**: 12px
- **Border**: 1px solid #E9ECEF
- **Margin bottom**: 12px

**Conteúdo**:
- **Mapa base**: Satélite
- **Zoom**: 15 (próximo)
- **Pin azul**: Localização atual (arrastável)
- **Círculo de precisão**: Se GPS (raio baseado em precisão)

**Controles**:
- **Sem** zoom buttons (ocupa muito espaço)
- **Gesture**: Pinch to zoom habilitado
- **Pan**: Habilitado

### Coordenadas (Display)

**Estrutura**:
```
📍 Lat: -18.9188
   Lng: -48.2766
```
- **Ícone**: 📍 (16x16px)
- **Fonte**: 13px, weight 500, color #6C757D, monospace
- **Copiável**: Long press para copiar

### Botão "Usar localização atual"

**Specs**:
- **Largura**: 100%
- **Altura**: 40px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid #0057FF
- **Border radius**: 20px
- **Ícone**: 📍 (18x18px, #0057FF)
- **Texto**: "Usar localização atual"
  - Fonte: 14px, weight 600, color #0057FF

**Estados**:
- **Loading**: Spinner + "Obtendo localização..."
- **Success**: Check + coordenadas atualizadas
- **Error**: "Erro ao obter localização. Verifique permissões"

## 🌤️ SEÇÃO "CONDIÇÕES DO DIA"

### Header
- **Ícone**: 🌤️
- **Texto**: "CONDIÇÕES DO DIA"

### Card de Clima

**Dimensões**:
- **Padding**: 16px
- **Background**: Linear gradient (#F8F9FA → #FFFFFF)
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px

**Layout** (grid 2 colunas):
```
☀️ 28°C               💧 Umidade: 65%
Parcialmente nublado  🌬️ Vento: 12 km/h NE
```

**Coluna 1** (esquerda):
- **Ícone**: 40x40px (animado)
- **Temp**: 24px, weight 700
- **Descrição**: 13px, color #6C757D

**Coluna 2** (direita):
- **Umidade**: Ícone 16px + texto 13px
- **Vento**: Ícone 16px + texto 13px

### Botão "Atualizar"

**Specs**:
- **Largura**: Auto (fit content)
- **Altura**: 32px
- **Padding**: 6px 12px
- **Background**: Transparente
- **Border**: 1px solid #E9ECEF
- **Border radius**: 16px
- **Ícone**: 🔄 Refresh (16x16px, #0057FF)
- **Texto**: "Atualizar"
  - Fonte: 13px, weight 600, color #0057FF
- **Margin top**: 12px

**Estados**:
- **Loading**: Ícone rotaciona

## 📸 SEÇÃO "FOTOS"

### Header
- **Ícone**: 📸
- **Texto**: "FOTOS (3/10)"
  - Contador: (total adicionadas / máximo)

### Grid de Fotos

**Layout**:
- **Grid**: 4 colunas
- **Gap**: 8px
- **Tamanho de cada célula**: (100% - 24px) / 4 = ~85px quadrado

**Célula vazia** (botão adicionar):
```
┌────┐
│ 📷 │ ← Ícone câmera
│ +  │
└────┘
```
- **Background**: #F8F9FA
- **Border**: 1px dashed #0057FF
- **Border radius**: 8px
- **Ícone**: 📷 (32x32px, #0057FF)
- **Símbolo +**: 20px, weight 700, color #0057FF
- **Ação**: Abre actionsheet (Câmera ou Galeria)

**Célula com foto**:
```
┌────┐
│[🖼️]│ ← Thumbnail
│ [X]│ ← Botão remover
└────┘
```
- **Imagem**: Object-fit cover
- **Botão remover ([X])**:
  - Tamanho: 24x24px (círculo)
  - Posição: Top-right, -8px offset (sobrepõe)
  - Background: rgba(220, 53, 69, 0.9) (vermelho)
  - Ícone X: 14x14px, branco
  - Box-shadow: 0px 2px 4px rgba(0,0,0,0.2)
- **Tap na foto**: Abre fullscreen viewer
- **Long press**: Reordenar (drag & drop)

**ActionSheet "Adicionar Foto"**:
```
┌─────────────────────────────┐
│      ─── (handle)           │
│                             │
│  Adicionar Foto             │
│                             │
│  📷 Tirar Foto              │
│  🖼️ Escolher da Galeria     │
│                             │
│  [X] Cancelar               │
└─────────────────────────────┘
```

## 📝 SEÇÃO "OBSERVAÇÕES"

### Header
- **Ícone**: 📝
- **Texto**: "OBSERVAÇÕES"

### Editor de Texto Rico

**Toolbar** (topo do editor):
```
┌─────────────────────────────┐
│ [B][I][U] • [•][1][☐]      │
└─────────────────────────────┘
```

**Dimensões**:
- **Altura**: 36px
- **Background**: #F8F9FA
- **Border bottom**: 1px solid #E9ECEF
- **Padding**: 4px

**Botões da toolbar** (cada):
- **Tamanho**: 32x32px
- **Border radius**: 6px
- **Background** (ativo): rgba(0, 87, 255, 0.1)
- **Ícone**: 18x18px

**Botões disponíveis**:
1. **[B]** Bold - Negrito
2. **[I]** Italic - Itálico
3. **[U]** Underline - Sublinhado
4. **Separador** (•)
5. **[•]** Bullet list - Lista com bullets
6. **[1]** Numbered list - Lista numerada
7. **[☐]** Checklist - Checklist

**Área de texto**:
- **Min-height**: 200px
- **Max-height**: 400px (depois scroll)
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 0 0 12px 12px (apenas base arredondada)
- **Placeholder**: "Digite suas observações aqui..."
- **Fonte**: 15px, weight 400, line-height 1.6

**Funcionalidades**:
- Markdown support (opcional)
- Auto-save a cada 30s
- Counter de caracteres (opcional)

## 🏷️ SEÇÃO "TAGS"

### Header
- **Ícone**: 🏷️
- **Texto**: "TAGS"

### Container de Tags

**Background**: #F8F9FA
**Padding**: 12px
**Border radius**: 12px
**Display**: Flex wrap
**Gap**: 8px

**Tag existente**:
```
[Soja] [X]
```
- **Padding**: 6px 12px 6px 10px
- **Background**: rgba(0, 87, 255, 0.1)
- **Border**: 1px solid rgba(0, 87, 255, 0.3)
- **Border radius**: 16px
- **Texto**: 13px, weight 600, color #0057FF
- **Botão X**:
  - Tamanho: 16x16px
  - Margin left: 6px
  - Ícone: X (12x12px)
  - Ação: Remove tag

**Botão "+ Adicionar"**:
```
[+ Adicionar]
```
- **Padding**: 6px 12px
- **Background**: Transparente
- **Border**: 1px dashed #0057FF
- **Border radius**: 16px
- **Ícone**: + (14x14px, #0057FF)
- **Texto**: "Adicionar"
  - Fonte: 13px, weight 600, color #0057FF

**Ação**: Abre sheet com:
1. **Campo de busca**: Busca em tags existentes
2. **Sugestões**: Tags frequentes do usuário
3. **Criar nova**: Digita + Enter

**Sheet "Adicionar Tag"**:
```
┌─────────────────────────────┐
│      ─── (handle)           │
│                             │
│  Adicionar Tag              │
│                             │
│  [🔍 Buscar ou criar...]    │
│                             │
│  SUGESTÕES                  │
│  [Soja] [Milho] [Feijão]    │
│  [NPK] [Fertilização]       │
│  [Praga] [Doença]           │
│                             │
│  RECENTES                   │
│  [Lagarta] [Aplicação]      │
│                             │
└─────────────────────────────┘
```

**Tap em sugestão**: Adiciona à lista

**Digite + Enter**: Cria tag nova

## ✅ SEÇÃO "RECOMENDAÇÕES"

### Header
- **Ícone**: ✅
- **Texto**: "RECOMENDAÇÕES"

### Editor
- **Specs**: Iguais ao editor de Observações
- **Placeholder**: "Digite as recomendações para o cliente..."
- **Min-height**: 150px

## 🔘 BOTÕES FINAIS

### Botão "SALVAR RASCUNHO"

**Posicionamento**:
- **Margin top**: 32px
- **Largura**: 100%

**Visual**:
- **Altura**: 52px
- **Background**: Transparente
- **Border**: 2px solid #0057FF
- **Border radius**: 26px
- **Ícone**: 💾 (20x20px)
- **Texto**: "SALVAR RASCUNHO"
  - Fonte: 15px, weight 700, color #0057FF

**Ação**: 
1. Salva no localStorage/Supabase
2. Toast: "Rascunho salvo ✓"
3. Permanece na tela

### Botão "FINALIZAR RELATÓRIO"

**Posicionamento**:
- **Margin top**: 12px
- **Margin bottom**: 40px
- **Largura**: 100%

**Visual**:
- **Altura**: 52px
- **Background**: #0057FF
- **Border**: none
- **Border radius**: 26px
- **Box shadow**: 0px 4px 16px rgba(0, 87, 255, 0.3)
- **Ícone**: ✓ (20x20px, branco)
- **Texto**: "FINALIZAR RELATÓRIO"
  - Fonte: 15px, weight 700, color #FFFFFF

**Estados**:
- **Disabled**: Se campos obrigatórios vazios
  - Background: #ADB5BD
  - Sem shadow
- **Loading**: Spinner branco + "FINALIZANDO..."

**Ação**:
1. Valida campos obrigatórios
2. Salva relatório como "Publicado"
3. Toast: "Relatório criado com sucesso! ✓"
4. Navega para `/relatorios`

## 💾 AUTO-SAVE

**Comportamento**:
- A cada 30 segundos
- Salva no localStorage (offline)
- Toast discreto: "Rascunho salvo automaticamente"
  - Posição: Bottom, 80px (acima do nav)
  - Duração: 2s
  - Background: rgba(0, 0, 0, 0.8)
  - Texto: Branco, 13px

## 🎭 ANIMAÇÕES

**Entrada de seções**:
- Stagger fade in ao scroll

**Abertura de sheets**:
- Slide up (0.3s ease-out)

**Adição de foto**:
- Scale in animation (0.2s)

**Remoção de foto**:
- Scale out + fade (0.2s)

**Toast de auto-save**:
- Slide up + fade in
- Permanece 2s
- Fade out

---

Continuo com as próximas páginas (11-23) no próximo bloco para não exceder o limite. Deseja que eu continue?