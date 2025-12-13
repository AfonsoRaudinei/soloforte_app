# 📐 SPEC DE DESIGN - SOLOFORTE (PARTE 2)
## Páginas 11-23 - Continuação

> **Plataforma**: Mobile-only (375x812px base - iPhone X)  
> **Cor principal**: #0057FF (azul vibrante)

---

# 11. CLIENTES

### Rota: `/clientes`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  CLIENTES         [🔍] [+] │
├─────────────────────────────────┤
│                                 │
│  📊 RESUMO                      │
│  ┌────┬────┬────┬────┐          │
│  │ 24 │ 56 │127 │ 4  │          │
│  │Cli.│Faz.│Vis.│Hoje│          │
│  └────┴────┴────┴────┘          │
│                                 │
│  🔤 [A-Z ▼] 🗓️ [Recentes ▼]    │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [👤]  João Silva        │   │
│  │       ───────────────   │   │
│  │ 🏢 Fazenda Boa Esperança│   │
│  │                         │   │
│  │ 📍 Uberlândia, MG       │   │
│  │ 📞 (34) 99999-9999      │   │
│  │                         │   │
│  │ 🌾 3 áreas • 120.5 ha   │   │
│  │ 🕐 Última: há 2 dias    │   │
│  │                         │   │
│  │ [📞] [💬] [📍] [👁️]     │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [👤]  Maria Santos      │   │
│  │       ───────────────   │   │
│  │ 🏢 Sítio Verde          │   │
│  │                         │   │
│  │ 📍 Uberaba, MG          │   │
│  │ 📞 (34) 98888-8888      │   │
│  │                         │   │
│  │ 🌾 2 áreas • 85.3 ha    │   │
│  │ 🕐 Última: há 1 semana  │   │
│  │                         │   │
│  │ [📞] [💬] [📍] [👁️]     │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Specs**: Padrão (40x40px, top-left)
- **Ação**: Navega para `/dashboard`

### Título "CLIENTES"
- **Posição**: Centro
- **Fonte**: 18px, weight 700, color #212529

### Botão Busca ([🔍])
- **Posição**: Top-right, 56px da borda
- **Tamanho**: 40x40px
- **Ícone**: Search (24x24px, #6C757D)
- **Ação**: Expande campo de busca (igual página Relatórios)

### Botão Adicionar ([+])
- **Posição**: Top-right, 16px
- **Tamanho**: 40x40px
- **Ícone**: Plus (24x24px, #0057FF)
- **Ação**: Abre modal "Novo Cliente"

## 📊 RESUMO DASHBOARD

### Container
- **Padding**: 16px
- **Background**: #F8F9FA
- **Margin bottom**: 16px

### Header
- **Ícone**: 📊 (20x20px)
- **Texto**: "RESUMO"
- **Fonte**: 14px, weight 700, uppercase
- **Margin bottom**: 12px

### Grid de Métricas (4 Cards)

**Layout**:
- **Display**: Grid 4 colunas
- **Gap**: 8px

**Cada Card**:
```
┌────┐
│ 24 │ ← Número
│Cli.│ ← Label
└────┘
```

**Dimensões**:
- **Largura**: (100% - 24px) / 4
- **Altura**: 70px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 12px
- **Padding**: 8px
- **Text-align**: Center

**Número**:
- **Fonte**: 24px, weight 800, color #0057FF
- **Margin bottom**: 4px

**Label**:
- **Fonte**: 11px, weight 600, color #6C757D
- **Abbreviation**: 
  - "Cli." = Clientes
  - "Faz." = Fazendas
  - "Vis." = Visitas (mês)
  - "Hoje" = Visitas hoje

**4 Métricas**:
1. **24** - Total de Clientes
2. **56** - Total de Fazendas
3. **127** - Visitas no mês
4. **4** - Visitas hoje

## 🔤 FILTROS

### Container
- **Padding**: 0 16px 16px 16px
- **Background**: #F8F9FA
- **Display**: Flex
- **Gap**: 12px

### Dropdown "Ordenação" ([A-Z ▼])

**Botão**:
- **Largura**: Flex 1 (50% - 6px)
- **Altura**: 36px
- **Padding**: 8px 12px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 18px

**Conteúdo**:
- **Ícone**: 🔤 (16x16px)
- **Texto**: "A-Z" ou "Z-A" ou "Mais áreas"
  - Fonte: 14px, weight 600, color #212529
- **Seta**: ▼ (14x14px, #6C757D)

**Opções**:
- Alfabética (A-Z)
- Alfabética (Z-A)
- Última visita (recentes primeiro)
- Mais áreas
- Maior área total (ha)

### Dropdown "Filtro Data" ([Recentes ▼])

**Specs**: Iguais ao dropdown Ordenação

**Opções**:
- Todos
- Visitados hoje
- Visitados esta semana
- Visitados este mês
- Sem visita há mais de 30 dias

## 📋 LISTA DE CLIENTES

### Container
- **Padding**: 16px
- **Gap entre cards**: 16px

### Card de Cliente

**Dimensões**:
- **Largura**: 100% (menos padding)
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border radius**: 16px
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.06)
- **Padding**: 16px

### Estrutura Interna do Card

**Linha 1 - Avatar + Nome**:
```
[👤]  João Silva
      ───────────────
```

**Avatar**:
- **Tamanho**: 48x48px (círculo)
- **Posição**: Left
- **Border**: 2px solid #E9ECEF
- **Conteúdo**:
  - Foto do cliente (se tiver)
  - Ou iniciais: "JS" (20px bold, #FFFFFF em background #0057FF)
- **Margin right**: 12px

**Nome**:
- **Fonte**: 18px, weight 700, color #212529
- **Max lines**: 1 (ellipsis)
- **Vertical-align**: Center com avatar

**Separador**:
- **Margin**: 8px vertical
- **Altura**: 1px
- **Background**: #E9ECEF

**Linha 2 - Nome da Fazenda**:
- **Ícone**: 🏢 Building (18x18px, #6C757D)
- **Texto**: "Fazenda Boa Esperança"
  - Fonte: 15px, weight 600, color #212529
  - Margin left do ícone: 8px
- **Margin bottom**: 8px

**Linha 3 - Cidade**:
- **Ícone**: 📍 MapPin (16x16px, #6C757D)
- **Texto**: "Uberlândia, MG"
  - Fonte: 14px, weight 500, color #6C757D
- **Margin bottom**: 6px

**Linha 4 - Telefone**:
- **Ícone**: 📞 Phone (16x16px, #6C757D)
- **Texto**: "(34) 99999-9999"
  - Fonte: 14px, weight 500, color #6C757D
  - Format: Mask brasileiro
- **Margin bottom**: 12px

**Separador fino**:
- **Background**: #F8F9FA
- **Altura**: 1px
- **Margin**: 12px vertical

**Linha 5 - Estatísticas**:
- **Ícone**: 🌾 (16x16px)
- **Texto**: "3 áreas • 120.5 ha"
  - Fonte: 14px, weight 600, color #212529
  - Separador: • (bullet)
- **Margin bottom**: 6px

**Linha 6 - Última Visita**:
- **Ícone**: 🕐 Clock (16x16px, #6C757D)
- **Texto**: "Última visita: há 2 dias"
  - Fonte: 13px, weight 500, color #6C757D
  - Formato relativo
- **Margin bottom**: 16px

### Botões de Ação Rápida (4 botões inline)

**Container**:
- **Display**: Flex
- **Gap**: 8px
- **Justify-content**: Space-between

**Cada botão**:
- **Largura**: (100% - 24px) / 4
- **Altura**: 48px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid rgba(0, 87, 255, 0.2)
- **Border radius**: 12px
- **Display**: Flex column
- **Align-items**: Center
- **Justify-content**: Center

**1) Botão Ligar ([📞])**:
- **Ícone**: 📞 Phone (22x22px, #0057FF)
- **Ação**: 
  1. Abre dialer nativo
  2. Tel: href="tel:+5534999999999"

**2) Botão Mensagem ([💬])**:
- **Ícone**: 💬 MessageCircle (22x22px, #28A745)
- **Border color**: rgba(40, 167, 69, 0.2)
- **Background**: rgba(40, 167, 69, 0.05)
- **Ação**: 
  1. Abre WhatsApp
  2. URL: "https://wa.me/5534999999999"

**3) Botão Localização ([📍])**:
- **Ícone**: 📍 MapPin (22x22px, #FFC107)
- **Border color**: rgba(255, 193, 7, 0.2)
- **Background**: rgba(255, 193, 7, 0.05)
- **Ação**: 
  1. Navega para Dashboard
  2. Zoom nas áreas do cliente

**4) Botão Ver Detalhes ([👁️])**:
- **Ícone**: 👁️ Eye (22x22px, #6C757D)
- **Border color**: rgba(108, 117, 125, 0.2)
- **Background**: rgba(108, 117, 125, 0.05)
- **Ação**: 
  1. Abre Sheet "Detalhes do Cliente"

**Estados dos botões**:
- **Hover/Press**: 
  - Transform: scale(0.95)
  - Opacity: 0.8
  - Transition: 0.2s

## 📱 SHEET "DETALHES DO CLIENTE"

### Estrutura (Sheet bottom, altura 85%)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  [👤 Avatar 64px]               │
│  João Silva                     │
│  joao@exemplo.com               │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [📋] [🗺️] [📊] [📸]     │   │ ← Tabs
│  └─────────────────────────┘   │
│                                 │
│  --- CONTEÚDO DA TAB ---        │
│                                 │
│                                 │
│                                 │
│  [✏️ Editar Cliente]            │
│                                 │
└─────────────────────────────────┘
```

### Header do Sheet

**Handle** (─── drag):
- **Specs**: Padrão (40x4px, #E9ECEF)

**Avatar**:
- **Tamanho**: 64x64px (círculo)
- **Centralizado**: Horizontal
- **Margin**: 16px vertical

**Nome**:
- **Fonte**: 20px, weight 700, color #212529
- **Text-align**: Center
- **Margin bottom**: 4px

**Email**:
- **Fonte**: 14px, weight 400, color #6C757D
- **Text-align**: Center
- **Margin bottom**: 24px

### Tabs de Navegação (4 tabs)

**Container**:
- **Display**: Flex
- **Background**: #F8F9FA
- **Border radius**: 12px
- **Padding**: 4px
- **Margin**: 0 16px 24px 16px

**Cada Tab**:
- **Largura**: 25%
- **Altura**: 44px
- **Border radius**: 8px
- **Display**: Flex column
- **Align-items**: Center
- **Justify-content**: Center

**Estado Inativo**:
- **Background**: Transparente
- **Color**: #6C757D

**Estado Ativo**:
- **Background**: #FFFFFF
- **Box shadow**: 0px 2px 4px rgba(0, 0, 0, 0.08)
- **Color**: #0057FF

**Ícone**:
- **Tamanho**: 20x20px
- **Margin bottom**: 4px

**Label**:
- **Fonte**: 11px, weight 600

**4 Tabs**:
1. **📋 Info** - Informações cadastrais
2. **🗺️ Áreas** - Lista de talhões/fazendas
3. **📊 Histórico** - Timeline de visitas
4. **📸 Galeria** - Fotos das visitas

### TAB 1: INFO (Informações)

**Scroll vertical**

**Seções**:

**📋 Dados Pessoais**:
```
┌─────────────────────────┐
│ Nome Completo           │
│ João Silva              │
│ ─────────────────────   │
│ CPF/CNPJ                │
│ 123.456.789-00          │
│ ─────────────────────   │
│ Email                   │
│ joao@exemplo.com        │
│ ─────────────────────   │
│ Telefone                │
│ (34) 99999-9999         │
│ ─────────────────────   │
│ Celular 2 (opcional)    │
│ (34) 98888-8888         │
└─────────────────────────┘
```

**Cada Campo**:
- **Label**: 13px, weight 600, color #6C757D, uppercase
- **Valor**: 15px, weight 500, color #212529
- **Separador**: 1px solid #E9ECEF
- **Padding**: 12px vertical

**📍 Endereço**:
```
┌─────────────────────────┐
│ Rua                     │
│ Av. João Naves, 1234    │
│ ─────────────────────   │
│ Bairro                  │
│ Centro                  │
│ ─────────────────────   │
│ Cidade/Estado           │
│ Uberlândia, MG          │
│ ─────────────────────   │
│ CEP                     │
│ 38400-000               │
└─────────────────────────┘
```

**🏢 Fazendas Vinculadas**:
```
┌─────────────────────────┐
│ • Fazenda Boa Esperança │
│   120.5 ha total        │
│ ─────────────────────   │
│ • Sítio Santa Clara     │
│   45.8 ha total         │
└─────────────────────────┘
```

### TAB 2: ÁREAS (Lista de talhões)

**Lista vertical de cards**

**Card de Área**:
```
┌─────────────────────────┐
│ [Mini mapa thumbnail]   │
├─────────────────────────┤
│ Talhão Norte            │
│ 📏 45.3 ha              │
│ 📊 NDVI: 0.72 (Bom)     │
│ 🌾 Soja                 │
│ 🕐 Visitado há 2 dias   │
│                         │
│ [Ver no Mapa →]         │
└─────────────────────────┘
```

**Specs**:
- **Thumbnail**: 100px altura, border-radius topo
- **Conteúdo**: Padding 12px
- **Botão**: 100% width, 36px altura

### TAB 3: HISTÓRICO (Timeline)

**Timeline vertical**

```
┌─────────────────────────┐
│ ●─── 10/11/2025         │
│ │    14:30              │
│ │                       │
│ │    Visita Técnica     │
│ │    por João Silva     │
│ │    Talhão Norte       │
│ │    [Ver relatório →]  │
│ │                       │
│ ●─── 05/11/2025         │
│ │    08:00              │
│ │                       │
│ │    Check-in           │
│ │    por Maria Santos   │
│ │                       │
│ ●─── 01/11/2025         │
│      16:00              │
│                         │
│      Aplicação          │
│      por Pedro Costa    │
└─────────────────────────┘
```

**Linha do tempo**:
- **Linha vertical**: 2px solid #E9ECEF
- **Margin left**: 16px

**Cada evento**:
- **Círculo**: 12x12px
  - Visita: #0057FF
  - Check-in: #28A745
  - Aplicação: #FFC107
  - Outros: #6C757D
- **Card à direita**: 
  - Background: #F8F9FA
  - Padding: 12px
  - Border-radius: 8px
  - Margin bottom: 16px

### TAB 4: GALERIA (Fotos)

**Grid de fotos 3 colunas**

```
┌────┬────┬────┐
│ 🖼️ │ 🖼️ │ 🖼️ │
├────┼────┼────┤
│ 🖼️ │ 🖼️ │ 🖼️ │
├────┼────┼────┤
│ 🖼️ │ 🖼️ │ 🖼️ │
└────┴────┴────┘
```

**Cada foto**:
- **Tamanho**: (100% - 16px) / 3 (quadrado)
- **Gap**: 8px
- **Border-radius**: 8px
- **Object-fit**: Cover
- **Tap**: Abre fullscreen viewer

**Agrupamento**:
- Por relatório
- Header com data + título
- Galeria embaixo

### Botão "Editar Cliente" (footer do sheet)

**Posicionamento**:
- **Fixed bottom**: 16px acima do safe area
- **Largura**: Calc(100% - 32px)
- **Margin**: 0 16px

**Visual**:
- **Altura**: 52px
- **Background**: #0057FF
- **Border-radius**: 26px
- **Box shadow**: 0px 4px 16px rgba(0, 87, 255, 0.3)

**Conteúdo**:
- **Ícone**: ✏️ Edit (20x20px, branco)
- **Texto**: "Editar Cliente"
  - Fonte: 15px, weight 700, color #FFFFFF

**Ação**: Abre formulário de edição

## ➕ MODAL "NOVO CLIENTE"

### Estrutura (Sheet bottom, altura 90%)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Novo Cliente           [X]     │
│                                 │
│  📸 [Adicionar Foto]            │ ← Upload avatar
│                                 │
│  Nome completo *                │
│  [_____________________]        │
│                                 │
│  CPF/CNPJ                       │
│  [_____________________]        │
│                                 │
│  Email *                        │
│  [_____________________]        │
│                                 │
│  Telefone *                     │
│  [_____________________]        │
│                                 │
│  Celular 2                      │
│  [_____________________]        │
│                                 │
│  🏢 FAZENDA                     │
│                                 │
│  Nome da Fazenda *              │
│  [_____________________]        │
│                                 │
│  📍 ENDEREÇO                    │
│                                 │
│  CEP                            │
│  [_____________________]        │
│  [Buscar CEP]                   │
│                                 │
│  Rua                            │
│  [_____________________]        │
│                                 │
│  Número                         │
│  [_____________________]        │
│                                 │
│  Bairro                         │
│  [_____________________]        │
│                                 │
│  Cidade                         │
│  [_____________________]        │
│                                 │
│  Estado                         │
│  [UF ▼]                         │
│                                 │
│  [CANCELAR] [CRIAR CLIENTE]     │
│                                 │
└─────────────────────────────────┘
```

**Botão "Adicionar Foto"**:
- **Tamanho**: 80x80px (círculo)
- **Border**: 2px dashed #0057FF
- **Background**: rgba(0, 87, 255, 0.05)
- **Ícone**: 📸 (32x32px)
- **Centralizado**: Horizontal
- **Margin**: 16px vertical

**Campos**: Specs padrão de formulários

**Botão "Buscar CEP"**:
- Consulta API ViaCEP
- Preenche automaticamente rua, bairro, cidade, estado

**Botões finais**:
- **Cancelar**: Secundário (outline)
- **Criar Cliente**: Primário (azul)

## 🎭 ANIMAÇÕES

**Entrada de cards**:
- Stagger fade in + slide up (0.05s delay)

**Abertura do sheet**:
- Slide up (0.3s ease-out)
- Backdrop fade in

**Troca de tabs**:
- Cross-fade entre conteúdos (0.2s)

**Botões de ação**:
- Scale down ao pressionar (0.95)

---

# 12. CONFIGURAÇÕES

### Rota: `/configuracoes`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  CONFIGURAÇÕES             │
├─────────────────────────────────┤
│                                 │
│  👤 PERFIL                      │
│  ┌─────────────────────────┐   │
│  │     [📸 Avatar 80px]    │   │
│  │                         │   │
│  │   João Silva            │   │
│  │   joao@exemplo.com      │   │
│  │   Agrônomo • CREA 12345 │   │
│  │                         │   │
│  │   [✏️ Editar Perfil]     │   │
│  └─────────────────────────┘   │
│                                 │
│  🔔 NOTIFICAÇÕES                │
│  ┌─────────────────────────┐   │
│  │ Push Notifications      │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ Email Resumo Diário     │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ Som de Alertas          │   │
│  │ [🔘 Desativado]         │   │
│  │ ─────────────────────   │   │
│  │ [⚙️ Gerenciar Alertas]  │   │
│  └─────────────────────────┘   │
│                                 │
│  🗺️ MAPAS                       │
│  ┌─────────────────────────┐   │
│  │ Camada Padrão           │   │
│  │ [Satélite ▼]            │   │
│  │ ─────────────────────   │   │
│  │ Mostrar Bússola         │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ Auto-centralizar GPS    │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ [🗺️ Mapas Offline]      │   │
│  └─────────────────────────┘   │
│                                 │
│  📱 APLICATIVO                  │
│  ┌─────────────────────────┐   │
│  │ Tema                    │   │
│  │ [○ Claro] [●Escuro]     │   │
│  │ [○ Auto]                │   │
│  │ ─────────────────────   │   │
│  │ Idioma                  │   │
│  │ [Português 🇧🇷 ▼]       │   │
│  │ ─────────────────────   │   │
│  │ Unidades                │   │
│  │ [● Métrico] [○Imperial] │   │
│  └─────────────────────────┘   │
│                                 │
│  🔒 PRIVACIDADE                 │
│  ┌─────────────────────────┐   │
│  │ [🔑 Alterar Senha]      │   │
│  │ [📲 Dispositivos]       │   │
│  │ [🗑️ Limpar Cache]       │   │
│  └─────────────────────────┘   │
│                                 │
│  ℹ️ SOBRE                       │
│  ┌─────────────────────────┐   │
│  │ Versão 1.0.0 (Build 300)│   │
│  │ [📄 Termos de Uso]      │   │
│  │ [🔒 Privacidade]        │   │
│  │ [💬 Suporte]            │   │
│  │ [⭐ Avaliar App]        │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  🚪 SAIR DA CONTA       │   │ ← Vermelho
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Specs**: Padrão
- **Ação**: Navega para `/dashboard`

### Título "CONFIGURAÇÕES"
- **Specs**: 18px bold, centro

## 👤 SEÇÃO "PERFIL"

### Container
- **Margin**: 16px
- **Padding**: 20px
- **Background**: Linear gradient
  - Top: rgba(0, 87, 255, 0.05)
  - Bottom: #FFFFFF
- **Border**: 1px solid rgba(0, 87, 255, 0.1)
- **Border radius**: 16px
- **Box shadow**: 0px 2px 8px rgba(0, 0, 0, 0.06)

### Avatar (editável)

**Tamanho**: 80x80px (círculo)
**Posição**: Centralizado horizontal
**Border**: 3px solid #0057FF
**Margin bottom**: 16px

**Overlay de edição** (ao hover/press):
- **Background**: rgba(0, 0, 0, 0.6)
- **Ícone**: 📸 Camera (28x28px, branco)
- **Centralizado**: Absolute center
- **Border-radius**: 50%

**Ação**: Abre actionsheet (Câmera / Galeria / Remover)

### Nome
- **Texto**: "João Silva"
- **Fonte**: 20px, weight 700, color #212529
- **Text-align**: Center
- **Margin bottom**: 4px

### Email
- **Texto**: "joao@exemplo.com"
- **Fonte**: 14px, weight 400, color #6C757D
- **Text-align**: Center
- **Margin bottom**: 4px

### Profissão + Registro
- **Texto**: "Agrônomo • CREA 12345"
- **Fonte**: 13px, weight 500, color #6C757D
- **Text-align**: Center
- **Separador**: • (bullet)
- **Margin bottom**: 20px

### Botão "Editar Perfil"

**Largura**: 100%
**Altura**: 44px
**Background**: rgba(0, 87, 255, 0.1)
**Border**: 1px solid #0057FF
**Border-radius**: 22px

**Conteúdo**:
- **Ícone**: ✏️ Edit (18x18px, #0057FF)
- **Texto**: "Editar Perfil"
  - Fonte: 15px, weight 600, color #0057FF

**Ação**: Abre formulário de edição

## 🔔 SEÇÃO "NOTIFICAÇÕES"

### Container Card
- **Margin**: 16px
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px

### Header
- **Ícone**: 🔔 (20x20px, #0057FF)
- **Texto**: "NOTIFICAÇÕES"
- **Fonte**: 14px, weight 700, uppercase, color #212529
- **Margin bottom**: 16px

### Item de Configuração (3 toggles)

**Estrutura**:
```
Push Notifications     [🔘]
```

**Layout**:
- **Display**: Flex (space-between)
- **Padding**: 12px vertical
- **Border-bottom**: 1px solid #F8F9FA (exceto último)

**Label** (esquerda):
- **Fonte**: 15px, weight 500, color #212529

**Toggle Switch** (direita):

**Dimensões**:
- **Largura**: 48px
- **Altura**: 28px
- **Border-radius**: 14px (pill)

**Estado OFF**:
- **Background**: #E9ECEF
- **Knob**: 24x24px círculo branco
- **Posição knob**: Left (2px padding)

**Estado ON**:
- **Background**: #0057FF
- **Knob**: 24x24px círculo branco
- **Posição knob**: Right (2px padding)

**Animação**:
- **Transition**: 0.3s ease
- **Knob**: Slide left/right
- **Background**: Color transition

**3 Toggles**:
1. "Push Notifications" (ON)
2. "Email Resumo Diário" (ON)
3. "Som de Alertas" (OFF)

### Botão "Gerenciar Alertas"

**Margin top**: 16px
**Largura**: 100%
**Altura**: 40px
**Background**: rgba(0, 87, 255, 0.05)
**Border**: 1px solid #0057FF
**Border-radius**: 20px

**Conteúdo**:
- **Ícone**: ⚙️ Settings (18x18px, #0057FF)
- **Texto**: "Gerenciar Alertas"
  - Fonte: 14px, weight 600, color #0057FF

**Ação**: Navega para `/alertas`

## 🗺️ SEÇÃO "MAPAS"

### Container Card
- **Specs**: Iguais ao card Notificações

### Header
- **Ícone**: 🗺️
- **Texto**: "MAPAS"

### Item 1: Dropdown "Camada Padrão"

**Estrutura**:
```
Camada Padrão
[Satélite        ▼]
```

**Label**:
- **Fonte**: 15px, weight 500, color #212529
- **Margin bottom**: 8px

**Dropdown**:
- **Largura**: 100%
- **Altura**: 44px
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px
- **Padding**: 12px 16px

**Valor selecionado**:
- **Fonte**: 15px, weight 600, color #212529

**Seta**:
- **Ícone**: ▼ ChevronDown (18x18px, #6C757D)
- **Posição**: Right, vertical-center

**Opções**:
- Satélite
- Híbrido (satélite + ruas)
- Ruas (OpenStreetMap)
- Terreno

### Item 2 e 3: Toggles

**Mesmas specs** do toggle de Notificações

**2 Toggles**:
1. "Mostrar Bússola" (ON)
2. "Auto-centralizar GPS" (ON)

### Botão "Mapas Offline"

**Specs**: Igual "Gerenciar Alertas"
**Ícone**: 🗺️
**Texto**: "Mapas Offline"
**Ação**: Navega para `/mapas-offline`

## 📱 SEÇÃO "APLICATIVO"

### Container Card
- **Specs**: Padrão

### Header
- **Ícone**: 📱
- **Texto**: "APLICATIVO"

### Item 1: Seletor de Tema (Radio buttons)

**Label**:
- **Texto**: "Tema"
- **Margin bottom**: 12px

**Container de opções**:
- **Display**: Flex
- **Gap**: 8px
- **Wrap**: Sim

**Cada opção** (radio button pill):
```
[● Claro]
```

**Dimensões**:
- **Padding**: 10px 16px
- **Border**: 2px solid
- **Border-radius**: 20px
- **Display**: Inline-flex
- **Align-items**: Center
- **Gap**: 8px

**Estado NÃO selecionado**:
- **Border color**: #E9ECEF
- **Background**: Transparente
- **Radio**: ○ Círculo vazio (16px, #ADB5BD)
- **Texto**: 14px, weight 500, color #6C757D

**Estado SELECIONADO**:
- **Border color**: #0057FF
- **Background**: rgba(0, 87, 255, 0.05)
- **Radio**: ● Círculo preenchido (16px, #0057FF)
- **Texto**: 14px, weight 600, color #0057FF

**3 Opções**:
1. ○ Claro
2. ● Escuro (selecionado)
3. ○ Auto (segue sistema)

### Item 2: Dropdown "Idioma"

**Specs**: Igual dropdown Camada

**Opções**:
- 🇧🇷 Português (Brasil)
- 🇺🇸 English (futuro)
- 🇪🇸 Español (futuro)

### Item 3: Radio buttons "Unidades"

**Specs**: Iguais ao Tema

**2 Opções**:
1. ● Métrico (km, ha, °C)
2. ○ Imperial (mi, ac, °F)

## 🔒 SEÇÃO "PRIVACIDADE"

### Container Card
- **Specs**: Padrão

### Header
- **Ícone**: 🔒
- **Texto**: "PRIVACIDADE"

### Lista de Ações (3 botões)

**Cada botão**:
- **Largura**: 100%
- **Altura**: 48px
- **Padding**: 12px 16px
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px
- **Margin bottom**: 8px
- **Display**: Flex
- **Justify-content**: Space-between
- **Align-items**: Center

**Lado esquerdo**:
- **Ícone**: 20x20px
- **Texto**: 15px, weight 600, color #212529
- **Gap**: 12px

**Lado direito**:
- **Seta**: → ChevronRight (18x18px, #ADB5BD)

**3 Botões**:

1. **🔑 Alterar Senha**
   - Ação: Abre modal com formulário
     - Senha atual
     - Nova senha
     - Confirmar nova senha

2. **📲 Dispositivos Conectados**
   - Ação: Lista de logins ativos
     - Nome do dispositivo
     - Data do último acesso
     - Opção de desconectar

3. **🗑️ Limpar Cache Local**
   - Ação: Dialog de confirmação
     - "Isso irá remover dados temporários"
     - Mostra tamanho (ex: "230 MB")
     - [Cancelar] [Limpar]

## ℹ️ SEÇÃO "SOBRE"

### Container Card
- **Specs**: Padrão

### Header
- **Ícone**: ℹ️
- **Texto**: "SOBRE"

### Versão do App

**Posicionamento**:
- **Padding**: 12px 16px
- **Background**: #F8F9FA
- **Border-radius**: 8px
- **Margin bottom**: 12px

**Texto**:
- **Linha 1**: "Versão 1.0.0"
  - Fonte: 14px, weight 600, color #212529
- **Linha 2**: "Build 300"
  - Fonte: 12px, weight 400, color #6C757D

### Lista de Links (4 itens)

**Specs**: Iguais aos botões de Privacidade

**4 Links**:

1. **📄 Termos de Uso**
   - Ação: Abre webview ou PDF

2. **🔒 Política de Privacidade**
   - Ação: Abre webview ou PDF

3. **💬 Falar com Suporte**
   - Ação: Navega para `/suporte` (chat)

4. **⭐ Avaliar App**
   - Ação: Abre loja (App Store / Play Store)
     - iOS: StoreKit review prompt
     - Android: In-app review API

## 🚪 BOTÃO "SAIR DA CONTA"

### Posicionamento
- **Margin**: 24px 16px 40px 16px
- **Largura**: Calc(100% - 32px)

### Visual (diferente - alerta)

**Dimensões**:
- **Altura**: 52px
- **Background**: rgba(220, 53, 69, 0.05) (vermelho claro)
- **Border**: 2px solid #DC3545
- **Border-radius**: 26px

**Conteúdo**:
- **Ícone**: 🚪 (20x20px)
- **Texto**: "SAIR DA CONTA"
  - Fonte: 15px, weight 700, color #DC3545

**Estados**:
- **Hover/Press**: 
  - Background: rgba(220, 53, 69, 0.1)
  - Transform: scale(0.98)

### Ação

**Dialog de Confirmação**:
```
┌─────────────────────────┐
│                         │
│  Sair da Conta?         │
│                         │
│  Você precisará fazer   │
│  login novamente        │
│                         │
│  [Cancelar] [Sair]      │
│                         │
└─────────────────────────┘
```

**Dialog specs**:
- **Background**: #FFFFFF
- **Border-radius**: 16px
- **Padding**: 24px
- **Max-width**: 300px
- **Centralizado**: Vertical e horizontal

**Título**:
- **Fonte**: 18px, weight 700, color #212529

**Descrição**:
- **Fonte**: 14px, weight 400, color #6C757D
- **Margin**: 12px vertical

**Botões**:
- **Cancelar**: Outline cinza
- **Sair**: Preenchido vermelho

**Se confirmar**:
1. Limpa localStorage
2. Limpa tokens de auth
3. Navega para `/login`
4. Toast: "Logout realizado com sucesso"

## 🎭 ANIMAÇÕES

**Toggles**:
- Knob slide (0.3s cubic-bezier)
- Background color transition (0.3s)

**Radio buttons**:
- Border + background transition (0.2s)
- Scale subtle no radio (1.0 → 1.1 → 1.0)

**Botões**:
- Hover: Background opacity aumenta
- Press: Scale 0.98

**Dialog**:
- Backdrop: Fade in (0.2s)
- Card: Scale in (0.3s ease-out)

---

Continuo com as páginas 13-23 em seguida?

