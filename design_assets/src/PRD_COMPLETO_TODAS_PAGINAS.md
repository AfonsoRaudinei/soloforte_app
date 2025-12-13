# 📱 PRD COMPLETO - SOLOFORTE
## Product Requirements Document - Todas as Páginas

> **Versão**: 1.0  
> **Data**: Novembro 2025  
> **Plataforma**: Mobile-only (100% smartphone)  
> **Design**: Clean, emocional, cor principal #0057FF

---

## 🏠 DASHBOARD PRINCIPAL

### Rota
`/dashboard`

### Layout
```
┌─────────────────────────────────┐
│  [☰]  SOLOFORTE      [🔔] [👤]  │ ← Header fixo
├─────────────────────────────────┤
│                                 │
│  ╔═══════════════════════════╗  │
│  ║                           ║  │
│  ║     MAPA INTERATIVO       ║  │
│  ║                           ║  │
│  ║  [📍] Minha Localização   ║  │
│  ║                           ║  │
│  ║  Áreas desenhadas aqui    ║  │
│  ║  Pins de ocorrências      ║  │
│  ║  Radar de clima           ║  │
│  ║                           ║  │
│  ║  [🎨] Camadas [🧭] Bússola║  │
│  ╚═══════════════════════════╝  │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌾 Minhas Áreas (5)         ││
│  │ ─────────────────────────   ││
│  │ • Talhão Norte - 45.3 ha    ││
│  │   📊 NDVI: 0.72 (Bom)       ││
│  │ • Lavoura Sul - 32.1 ha     ││
│  │   📊 NDVI: 0.65 (Moderado)  ││
│  │ • Área Teste - 12.5 ha      ││
│  │   📊 NDVI: 0.81 (Excelente) ││
│  │ [+ Nova Área]               ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📌 Ocorrências Ativas (3)   ││
│  │ ─────────────────────────   ││
│  │ 🐛 Lagarta na Soja          ││
│  │    ████████░░ 85% crítico   ││
│  │    📍 Talhão Norte          ││
│  │    🕐 Há 2 horas            ││
│  │ ─────────────────────────   ││
│  │ 🦠 Ferrugem detectada       ││
│  │    ██████░░░░ 60% moderado  ││
│  │    📍 Lavoura Sul           ││
│  │    🕐 Há 5 horas            ││
│  │ ─────────────────────────   ││
│  │ 🌿 Deficiência Nutricional  ││
│  │    ████░░░░░░ 40% leve      ││
│  │    🕐 Ontem                 ││
│  │                             ││
│  │ [Ver todas →]               ││
│  └─────────────────────────────┘│
│                                 │
│            [+] FAB              │ ← Floating Action Button
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │ ← Bottom Nav
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Mapa Interativo (Leaflet)**
- **Mapa base**: MapTiler (satélite + híbrido)
- **Controles**:
  - Zoom in/out (botões + pinch gesture)
  - Pan (arrastar com dedo)
  - Rotate (dois dedos)
  - Botão "Minha Localização" (GPS, centraliza + pin azul)
  
- **Camadas (toggleable)**:
  - ✅ Áreas desenhadas (polígonos coloridos por status)
  - ✅ Pins de ocorrências (marcadores customizados)
  - ✅ Radar de clima (overlay de chuva/temperatura)
  - ✅ NDVI (overlay de saúde das plantas)
  - ✅ Mapa de calor (clustering de ocorrências)

- **Interações no mapa**:
  - Tap em área → Popup com detalhes (nome, tamanho, NDVI, última visita)
  - Tap em pin → Detalhes da ocorrência
  - Long press → Menu contextual (editar área, adicionar ocorrência)
  - Desenhar nova área (modo desenho ativado via FAB)

#### **2. Lista de Áreas Monitoradas**
- **Scroll horizontal** (cards deslizantes)
- **Cada card mostra**:
  - Nome da área
  - Tamanho em hectares
  - Miniatura do polígono (thumbnail do mapa)
  - Status NDVI com cor (verde/amarelo/vermelho)
  - Ícone de cultura (soja, milho, etc)
  - Última atualização
  
- **Interações**:
  - Tap → Zoom no mapa + destaque da área
  - Swipe left → Opções (editar, excluir, compartilhar)
  - Long press → Menu completo

- **Ação rápida**:
  - [+ Nova Área] → Abre modo desenho no mapa

#### **3. Lista de Ocorrências Ativas**
- **Exibição**: 3 últimas ocorrências prioritárias
- **Card compacto mostra**:
  - Ícone do tipo (🐛 praga, 🦠 doença, 🌿 nutrição, 💧 irrigação)
  - Título da ocorrência
  - Barra de severidade (0-100%)
    - 0-30%: Verde (leve)
    - 31-60%: Amarelo (moderado)
    - 61-100%: Vermelho (crítico)
  - Localização (qual área/talhão)
  - Tempo decorrido (tempo relativo: "Há 2h", "Ontem", "3 dias atrás")
  
- **Interações**:
  - Tap → Abre detalhes completos da ocorrência
  - Swipe → Ações (resolver, atualizar, notificar equipe)
  - [Ver todas →] → Navega para `/ocorrencias`

#### **4. FAB (Floating Action Button)**
- **Aparência**: 
  - Círculo azul #0057FF
  - Ícone "+" branco
  - Shadow elevation 8
  - Posição: bottom-right, 16px de margem
  
- **Ao clicar**, expande menu radial com 5 opções:
  ```
        🖊️ Desenhar Área
         /
    📌 ──┼── 📸 Scanner Pragas
         \
         📄 Relatório
  ```
  - 🖊️ **Desenhar Área** → Ativa modo desenho no mapa
  - 📌 **Nova Ocorrência** → Formulário de cadastro
  - 📸 **Scanner de Pragas** → Abre câmera + GPT-4 Vision
  - 📄 **Novo Relatório** → Navega para `/relatorios/novo`
  - 🔔 **Notificações** → Abre NotificationCenter

- **Animação**: 
  - Rotação do ícone + ao expandir
  - Fade in dos itens (stagger 50ms)
  - Backdrop blur no fundo

#### **5. Header**
- **Hamburger Menu** (☰):
  - Abre sidebar com:
    - Foto de perfil
    - Nome do usuário
    - Empresa/Fazenda
    - Separador
    - Menu items:
      - 🏠 Dashboard
      - 📊 Dashboard Executivo
      - 👥 Clientes
      - 🗺️ Mapas Offline
      - ⚙️ Configurações
      - 💬 Suporte
      - 🚪 Sair
  
- **Logo**: "SOLOFORTE" centralizado

- **Notificações** (🔔):
  - Badge com contador (vermelho)
  - Tap → Abre NotificationCenter (sheet de baixo)
  
- **Avatar** (👤):
  - Foto do usuário ou iniciais
  - Tap → Menu de perfil rápido

#### **6. Bottom Navigation**
5 ícones fixos na parte inferior:
- **🏠 Dashboard** (ativo - azul #0057FF)
- **🗺️ Mapas** → `/mapas-offline`
- **📊 Relatórios** → `/relatorios`
- **👥 Clientes** → `/clientes`
- **⚙️ Configurações** → `/configuracoes`

### Componentes Usados
- `MapTilerComponent` (Leaflet customizado)
- `MapLayerSelector` (seletor de camadas)
- `NDVIViewer` (overlay NDVI)
- `RadarClimaOverlay` (overlay clima)
- `Card` (áreas e ocorrências)
- `FloatingActionButton` (FAB com menu radial)
- `Badge` (notificações)
- `Avatar` (usuário)
- `SkeletonDashboard` (loading)

### Interações Especiais
- **Pull to refresh**: Atualiza dados do servidor
- **Long press em área**: Menu contextual (editar, excluir, compartilhar)
- **Swipe em card**: Ações rápidas
- **GPS automático**: Pede permissão ao abrir primeira vez
- **Cache de tiles**: Mapas offline para áreas visitadas
- **Gesture de pinça**: Zoom no mapa
- **Double tap**: Zoom rápido

### Estados de Loading
- **Skeleton cards**: Para listas de áreas e ocorrências
- **Spinner no mapa**: Enquanto carrega tiles
- **Shimmer effect**: Nos cards durante fetch
- **Progress bar**: No header durante sync

---

## 🗺️ MAPAS OFFLINE

### Rota
`/mapas-offline`

### Layout
```
┌─────────────────────────────────┐
│  [←]  MAPAS OFFLINE             │
├─────────────────────────────────┤
│                                 │
│  📥 Áreas Baixadas (3/10 GB)    │
│  ████████░░░░░░░░░░░░ 35%      │
│                                 │
│  ┌─────────────────────────────┐│
│  │ ✅ Talhão Norte             ││
│  │ 📦 2.3 GB • Zoom 18         ││
│  │ 🕐 Atualizado há 2 dias     ││
│  │ [🗑️ Remover]                ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ✅ Lavoura Sul              ││
│  │ 📦 1.8 GB • Zoom 17         ││
│  │ 🕐 Atualizado ontem         ││
│  │ [🗑️ Remover]                ││
│  └─────────────────────────────┘│
│                                 │
│  📍 Áreas Disponíveis           │
│  ┌─────────────────────────────┐│
│  │ ⬇️ Área Teste               ││
│  │ 📦 ~800 MB                  ││
│  │ [📥 Baixar para Offline]    ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ⚙️ CONFIGURAÇÕES            ││
│  │                             ││
│  │ 📡 Baixar apenas via WiFi   ││
│  │    [🔘 Ativado]             ││
│  │                             ││
│  │ 🎯 Qualidade dos Tiles      ││
│  │    [Alta] Média Baixa       ││
│  │                             ││
│  │ 🗺️ Zoom Máximo              ││
│  │    [14] 15 16 17 18         ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Gerenciamento de Áreas Offline**
- **Lista de áreas baixadas**:
  - Nome da área
  - Tamanho do cache
  - Nível de zoom salvo
  - Data da última atualização
  - Botão remover (libera espaço)
  
- **Progress bar global**: Mostra espaço usado

#### **2. Download de Novas Áreas**
- **Seleção de área**: Escolhe qual área baixar
- **Configuração de zoom**: 14-18 (quanto maior, mais espaço)
- **Estimativa de tamanho**: Calcula antes de baixar
- **Download com progresso**: Barra de download
- **Apenas WiFi**: Opção para economizar dados móveis

#### **3. Configurações de Cache**
- **Qualidade dos tiles**: Alta/Média/Baixa
- **Zoom máximo**: Até onde baixar (14-18)
- **Auto-limpeza**: Remove áreas antigas automaticamente
- **Limite de armazenamento**: Define máximo (5/10/20 GB)

### Componentes Usados
- `OfflineMapManager` (gerenciador de cache)
- `OfflineMapControls` (controles de download)
- `ProgressBar` (progresso de download)
- `Switch` (WiFi only)
- `Slider` (qualidade e zoom)

---

## 📊 RELATÓRIOS

### Rota
`/relatorios`

### Layout
```
┌─────────────────────────────────┐
│  [←]  RELATÓRIOS                │
│              [🔍] [+]            │
├─────────────────────────────────┤
│                                 │
│  🗂️ Filtros: [Todos ▼] [Este Mês ▼] │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📄 Visita Técnica - Fazenda ││
│  │    Boa Esperança            ││
│  │                             ││
│  │ 👤 João Silva               ││
│  │ 📅 10/11/2025 - 14:30       ││
│  │ 📍 Talhão Norte (45.3 ha)   ││
│  │                             ││
│  │ 🏷️ Tags: Soja, Fertilização ││
│  │                             ││
│  │ [👁️ Ver] [📤 Exportar]      ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📄 Análise de Solo          ││
│  │                             ││
│  │ 👤 Maria Santos             ││
│  │ 📅 08/11/2025 - 10:00       ││
│  │ 📍 Área Teste (12.5 ha)     ││
│  │                             ││
│  │ 🏷️ Tags: Solo, NPK          ││
│  │                             ││
│  │ [👁️ Ver] [📤 Exportar]      ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📄 Controle de Pragas       ││
│  │                             ││
│  │ 👤 Pedro Costa              ││
│  │ 📅 05/11/2025 - 16:45       ││
│  │ 📍 Lavoura Sul (32.1 ha)    ││
│  │                             ││
│  │ 🏷️ Tags: Lagarta, Aplicação ││
│  │                             ││
│  │ [👁️ Ver] [📤 Exportar]      ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Lista de Relatórios**
- **Ordenação**: Por data (mais recentes primeiro)
- **Filtros**:
  - Tipo (visita, análise, controle, etc)
  - Período (hoje, semana, mês, custom)
  - Autor (quem criou)
  - Área (qual talhão)
  - Tags
  
- **Cada card mostra**:
  - Título do relatório
  - Autor (nome + avatar)
  - Data/hora de criação
  - Localização (área vinculada)
  - Tags coloridas
  - Ações: Ver | Exportar | Editar | Excluir

#### **2. Busca**
- **Campo de busca** (🔍):
  - Busca por título
  - Busca por tags
  - Busca por autor
  - Busca por área
  
- **Sugestões**: Autocompletar enquanto digita

#### **3. Criar Novo Relatório**
- **Botão [+]** no header
- **Navega para** `/relatorios/novo`

#### **4. Visualização de Relatório**
- **Tap em [👁️ Ver]**:
  - Abre modal com relatório completo
  - Seções:
    - Header (título, data, autor)
    - Informações gerais (área, cultura, clima)
    - Descrição detalhada
    - Fotos anexadas (galeria)
    - Observações
    - Recomendações
    - Assinatura digital

#### **5. Exportação**
- **Formatos disponíveis**:
  - PDF (formatado)
  - Excel (dados tabulares)
  - Imagem (screenshot)
  - Compartilhar (WhatsApp, Email)

### Componentes Usados
- `RelatorioEditor` (criação/edição)
- `Card` (lista de relatórios)
- `Badge` (tags)
- `Dialog` (visualização)
- `SearchInput` (busca)
- `FilterDropdown` (filtros)

---

## 📝 EDITOR DE RELATÓRIO

### Rota
`/relatorios/novo`

### Layout
```
┌─────────────────────────────────┐
│  [←]  NOVO RELATÓRIO     [✓ Salvar] │
├─────────────────────────────────┤
│                                 │
│  📋 Informações Básicas         │
│  ┌─────────────────────────────┐│
│  │ Título *                    ││
│  │ [___________________________]││
│  │                             ││
│  │ Tipo de Relatório *         ││
│  │ [Visita Técnica ▼]          ││
│  │                             ││
│  │ Cliente/Fazenda *           ││
│  │ [Fazenda Boa Esperança ▼]   ││
│  │                             ││
│  │ Área/Talhão                 ││
│  │ [Talhão Norte ▼]            ││
│  └─────────────────────────────┘│
│                                 │
│  📍 Localização                 │
│  ┌─────────────────────────────┐│
│  │ [Mini Mapa]                 ││
│  │   📍 Pin no talhão          ││
│  │ [📍 Usar localização atual] ││
│  └─────────────────────────────┘│
│                                 │
│  🌤️ Condições do Dia            │
│  ┌─────────────────────────────┐│
│  │ ☀️ 28°C • Parcialmente nublado │
│  │ 💧 Umidade: 65%             ││
│  │ 🌬️ Vento: 12 km/h NE       ││
│  └─────────────────────────────┘│
│                                 │
│  📸 Fotos (3/10)                │
│  ┌────┬────┬────┬────┐          │
│  │ 📷 │ 🖼️ │ 🖼️ │[+] │          │
│  └────┴────┴────┴────┘          │
│                                 │
│  📝 Observações                 │
│  ┌─────────────────────────────┐│
│  │ [Editor de texto rico]      ││
│  │                             ││
│  │ • Texto formatado           ││
│  │ • Listas                    ││
│  │ • Checklist ☐ ☑             ││
│  │ • Emojis 🌱                 ││
│  └─────────────────────────────┘│
│                                 │
│  🏷️ Tags                        │
│  ┌─────────────────────────────┐│
│  │ [Soja] [Fertilização] [+]   ││
│  └─────────────────────────────┘│
│                                 │
│  ✅ Recomendações               │
│  ┌─────────────────────────────┐│
│  │ [Editor de texto rico]      ││
│  └─────────────────────────────┘│
│                                 │
│  [💾 Salvar Rascunho] [✓ Finalizar] │
│                                 │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Formulário Completo**
- **Campos obrigatórios** (marcados com *):
  - Título
  - Tipo de relatório
  - Cliente/Fazenda
  
- **Campos opcionais**:
  - Área/Talhão
  - Localização (GPS)
  - Fotos
  - Observações
  - Recomendações
  - Tags

#### **2. Mini Mapa de Localização**
- **Mapa pequeno** (150px altura)
- **Pin movível**: Arrasta para ajustar
- **Botão GPS**: Usa localização atual
- **Mostra área** se selecionada

#### **3. Captura de Fotos**
- **Fonte da foto**:
  - Tirar foto (câmera)
  - Selecionar da galeria
  
- **Limite**: 10 fotos por relatório
- **Preview**: Thumbnail 80x80px
- **Tap na foto**: Visualização fullscreen
- **Swipe**: Remove foto

#### **4. Editor de Texto Rico**
- **Formatação**:
  - Negrito, itálico, sublinhado
  - Listas (bullet, numerada)
  - Checklist (☐ ☑)
  - Emojis picker
  
- **Toolbar flutuante**: Aparece ao selecionar texto

#### **5. Tags**
- **Sugestões automáticas**: Baseado no histórico
- **Cores customizadas**: Cada tag tem cor
- **Criação rápida**: Digita + Enter

#### **6. Rascunho Automático**
- **Auto-save** a cada 30 segundos
- **Notificação**: "Rascunho salvo ✓"
- **Recuperação**: Se fechar sem salvar

### Componentes Usados
- `Input` (campos de texto)
- `Select` (dropdowns)
- `Textarea` (editor rico)
- `CameraCapture` (fotos)
- `Badge` (tags)
- `Button` (salvar/finalizar)

---

## 👥 CLIENTES

### Rota
`/clientes`

### Layout
```
┌─────────────────────────────────┐
│  [←]  CLIENTES         [🔍] [+] │
├─────────────────────────────────┤
│                                 │
│  📊 Resumo                      │
│  ┌─────┬─────┬─────┬─────┐     │
│  │ 24  │ 56  │ 127 │ 4   │     │
│  │Clie.│Faz. │Vis. │Hoje │     │
│  └─────┴─────┴─────┴─────┘     │
│                                 │
│  🔤 [A-Z ▼] 🗓️ [Recentes ▼]    │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 👤 João Silva               ││
│  │ 🏢 Fazenda Boa Esperança    ││
│  │                             ││
│  │ 📍 Uberlândia, MG           ││
│  │ 📞 (34) 99999-9999          ││
│  │ 🌾 3 áreas • 120.5 ha       ││
│  │ 🕐 Última visita: 2 dias    ││
│  │                             ││
│  │ [📞] [💬] [📍] [👁️]         ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 👤 Maria Santos             ││
│  │ 🏢 Sítio Verde              ││
│  │                             ││
│  │ 📍 Uberaba, MG              ││
│  │ 📞 (34) 98888-8888          ││
│  │ 🌾 2 áreas • 85.3 ha        ││
│  │ 🕐 Última visita: 1 semana  ││
│  │                             ││
│  │ [📞] [💬] [📍] [👁️]         ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 👤 Pedro Costa              ││
│  │ 🏢 Fazenda Santa Clara      ││
│  │                             ││
│  │ 📍 Araguari, MG             ││
│  │ 📞 (34) 97777-7777          ││
│  │ 🌾 5 áreas • 210.8 ha       ││
│  │ 🕐 Última visita: 3 semanas ││
│  │                             ││
│  │ [📞] [💬] [📍] [👁️]         ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Resumo Dashboard**
- **4 Cards de métricas**:
  - Total de clientes
  - Total de fazendas
  - Visitas realizadas (mês)
  - Visitas hoje
  
#### **2. Lista de Clientes**
- **Ordenação**:
  - Alfabética (A-Z)
  - Última visita (recentes primeiro)
  - Mais áreas
  - Maior área total
  
- **Cada card mostra**:
  - Nome do cliente (avatar)
  - Nome da fazenda
  - Cidade/Estado
  - Telefone
  - Número de áreas + hectares totais
  - Última visita (tempo relativo)
  
- **Ações rápidas**:
  - 📞 Ligar (abre discador)
  - 💬 Mensagem (WhatsApp)
  - 📍 Ver no mapa
  - 👁️ Ver detalhes

#### **3. Busca de Clientes**
- **Campo de busca** (🔍):
  - Por nome do cliente
  - Por nome da fazenda
  - Por cidade
  
#### **4. Adicionar Cliente**
- **Botão [+]**: Abre formulário
- **Campos**:
  - Nome do cliente *
  - Nome da fazenda *
  - CPF/CNPJ
  - Telefone *
  - Email
  - Endereço completo
  - Foto (opcional)

#### **5. Detalhes do Cliente**
- **Tap em [👁️]**: Abre sheet
- **Tabs**:
  - 📋 **Informações**: Dados cadastrais
  - 🗺️ **Áreas**: Lista de talhões
  - 📊 **Histórico**: Visitas e relatórios
  - 📸 **Galeria**: Fotos das visitas

### Componentes Usados
- `ClienteDropdown` (seleção)
- `Card` (lista de clientes)
- `Avatar` (foto do cliente)
- `Badge` (status)
- `Sheet` (detalhes)
- `Tabs` (navegação)

---

## ⚙️ CONFIGURAÇÕES

### Rota
`/configuracoes`

### Layout
```
┌─────────────────────────────────┐
│  [←]  CONFIGURAÇÕES             │
├─────────────────────────────────┤
│                                 │
│  👤 PERFIL                      │
│  ┌─────────────────────────────┐│
│  │     [📸 Avatar]             ││
│  │                             ││
│  │ João Silva                  ││
│  │ joao@exemplo.com            ││
│  │ Agrônomo • CRM 12345        ││
│  │                             ││
│  │ [✏️ Editar Perfil]           ││
│  └─────────────────────────────┘│
│                                 │
│  🔔 NOTIFICAÇÕES                │
│  ┌─────────────────────────────┐│
│  │ Push Notifications          ││
│  │ [🔘 Ativado]                ││
│  │                             ││
│  │ Email de Resumo Diário      ││
│  │ [🔘 Ativado]                ││
│  │                             ││
│  │ Som de Alertas              ││
│  │ [🔘 Desativado]             ││
│  │                             ││
│  │ [⚙️ Gerenciar Alertas]      ││
│  └─────────────────────────────┘│
│                                 │
│  🗺️ MAPAS                       │
│  ┌─────────────────────────────┐│
│  │ Camada Padrão               ││
│  │ [Satélite ▼]                ││
│  │                             ││
│  │ Mostrar Bússola             ││
│  │ [🔘 Ativado]                ││
│  │                             ││
│  │ Auto-centralizar GPS        ││
│  │ [🔘 Ativado]                ││
│  │                             ││
│  │ [🗺️ Mapas Offline]          ││
│  └─────────────────────────────┘│
│                                 │
│  📱 APLICATIVO                  │
│  ┌─────────────────────────────┐│
│  │ Tema                        ││
│  │ [Claro] Escuro Auto         ││
│  │                             ││
│  │ Idioma                      ││
│  │ [Português 🇧🇷]             ││
│  │                             ││
│  │ Unidades                    ││
│  │ [Métrico] Imperial          ││
│  └─────────────────────────────┘│
│                                 │
│  🔒 PRIVACIDADE                 │
│  ┌─────────────────────────────┐│
│  │ [🔑 Alterar Senha]          ││
│  │ [📲 Dispositivos Conectados]││
│  │ [🗑️ Limpar Cache Local]     ││
│  └─────────────────────────────┘│
│                                 │
│  ℹ️ SOBRE                       │
│  ┌─────────────────────────────┐│
│  │ Versão 1.0.0 (Build 300)    ││
│  │ [📄 Termos de Uso]          ││
│  │ [🔒 Política de Privacidade]││
│  │ [💬 Falar com Suporte]      ││
│  │ [⭐ Avaliar App]            ││
│  └─────────────────────────────┘│
│                                 │
│  [🚪 SAIR DA CONTA]             │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Perfil do Usuário**
- **Avatar**: Foto editável (tap para trocar)
- **Informações**:
  - Nome completo
  - Email
  - Profissão + registro (CRM, CREA, etc)
  
- **Editar**: Formulário completo

#### **2. Notificações**
- **Tipos de notificação**:
  - Push (local + remote)
  - Email diário
  - Som de alerta
  
- **Gerenciar Alertas**: Link para `/alertas`

#### **3. Configurações de Mapa**
- **Camada padrão**: Satélite/Híbrido/Ruas
- **Bússola**: Mostrar/ocultar
- **GPS**: Auto-centralizar
- **Link**: Mapas Offline

#### **4. Preferências do App**
- **Tema**: Claro/Escuro/Auto
- **Idioma**: PT-BR (futuro: EN, ES)
- **Unidades**: Métrico/Imperial

#### **5. Privacidade e Segurança**
- **Alterar senha**: Dialog com campos
- **Dispositivos**: Lista de logins ativos
- **Limpar cache**: Libera espaço

#### **6. Informações do App**
- **Versão**: Número + build
- **Links**:
  - Termos de Uso (webview)
  - Política de Privacidade (webview)
  - Falar com Suporte (chat)
  - Avaliar App (store)

#### **7. Sair**
- **Botão vermelho**: Logout
- **Confirmação**: "Tem certeza?"

### Componentes Usados
- `Avatar` (foto perfil)
- `Switch` (toggles)
- `Select` (dropdowns)
- `Button` (ações)
- `Dialog` (confirmações)

---

## 📸 SCANNER DE PRAGAS

### Rota
`/pragas` (via FAB)

### Layout
```
┌──���──────────────────────────────┐
│  [X]  SCANNER DE PRAGAS         │
├─────────────────────────────────┤
│                                 │
│  ╔═══════════════════════════╗  │
│  ║                           ║  │
│  ║                           ║  │
│  ║      PREVIEW CÂMERA       ║  │
│  ║                           ║  │
│  ║   [─────────────────]     ║  │
│  ║   │                 │     ║  │
│  ║   │  Enquadre a     │     ║  │
│  ║   │  folha/planta   │     ║  │
│  ║   │                 │     ║  │
│  ║   [─────────────────]     ║  │
│  ║                           ║  │
│  ║                           ║  │
│  ╚═══════════════════════════╝  │
│                                 │
│  💡 Dica: Tire foto de perto e │
│     com boa iluminação          │
│                                 │
│         [📸 Capturar]           │
│                                 │
│  OU                             │
│                                 │
│      [🖼️ Galeria]               │
│                                 │
└─────────────────────────────────┘

--- APÓS CAPTURA ---

┌─────────────────────────────────┐
│  [X]  ANALISANDO...             │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │      [Foto capturada]       ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  🤖 IA analisando a imagem...   │
│  ████████████████░░░░ 85%       │
│                                 │
│  🔍 Identificando praga/doença  │
│                                 │
└─────────────────────────────────┘

--- RESULTADO ---

┌─────────────────────────────────┐
│  [←]  DIAGNÓSTICO               │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │      [Foto analisada]       ││
│  └─────────────────────────────┘│
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
│  ┌─────────────────────────────┐│
│  │ Praga comum em cultivos de  ││
│  │ soja, se alimenta das folhas││
│  │ causando desfolha. Mais     ││
│  │ ativa em temperaturas entre ││
│  │ 25-30°C.                    ││
│  └─────────────────────────────┘│
│                                 │
│  🌱 CULTURA AFETADA             │
│  • Soja (principal)             │
│  • Feijão                       │
│                                 │
│  💊 RECOMENDAÇÕES               │
│  ┌─────────────────────────────┐│
│  │ 1. Monitorar nível de       ││
│  │    infestação               ││
│  │                             ││
│  │ 2. Aplicar inseticida se    ││
│  │    desfolha > 30%           ││
│  │                             ││
│  │ 3. Produtos recomendados:   ││
│  │    • Lambda-cialotrina      ││
│  │    • Clorpirifós            ││
│  │                             ││
│  │ 4. Monitoramento contínuo   ││
│  │    nos próximos 7 dias      ││
│  └─────────────────────────────┘│
│                                 │
│  [📌 Registrar Ocorrência]      │
│  [📤 Compartilhar]              │
│  [🔄 Nova Análise]              │
│                                 │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Captura de Imagem**
- **Câmera nativa**: Preview em tempo real
- **Guia de enquadramento**: Retângulo centralizado
- **Dicas visuais**: "Aproxime mais", "Melhore iluminação"
- **Flash**: Automático/Ligado/Desligado
- **Botão shutter**: Centralizado na base
- **Galeria**: Selecionar foto existente

#### **2. Análise com IA (GPT-4 Vision)**
- **Upload da imagem**: Compressão automática
- **Progress bar**: Mostra etapas
  - Enviando... (0-30%)
  - Processando... (30-70%)
  - Identificando... (70-90%)
  - Finalizando... (90-100%)
  
- **Fallback**: Se falhar, opção de tentar novamente

#### **3. Resultado do Diagnóstico**
- **Thumbnail da foto**: 200x200px, arredondada
- **Nome da praga**: Comum + científico
- **Confiança**: Percentual + barra visual
  - 0-50%: Baixa (vermelho)
  - 51-75%: Média (amarelo)
  - 76-100%: Alta (verde)
  
- **Severidade**: Leve/Moderada/Crítica

#### **4. Informações Detalhadas**
- **Descrição**: Texto sobre a praga
- **Culturas afetadas**: Lista
- **Sintomas**: Checklist visual
- **Ciclo de vida**: Timeline

#### **5. Recomendações de Tratamento**
- **Passo a passo numerado**:
  1. Monitoramento
  2. Aplicação
  3. Produtos
  4. Acompanhamento
  
- **Produtos químicos**: Nome + dosagem
- **Manejo integrado**: Alternativas orgânicas

#### **6. Ações Pós-Diagnóstico**
- **Registrar Ocorrência**: 
  - Pre-preenche dados
  - Anexa foto
  - Localização GPS
  - Severidade estimada
  
- **Compartilhar**:
  - WhatsApp
  - Email
  - PDF
  
- **Nova Análise**: Limpa e volta para câmera

### Componentes Usados
- `CameraCapture` (câmera nativa)
- `PestScanner` (hook GPT-4)
- `ProgressBar` (análise)
- `Badge` (confiança, severidade)
- `Card` (informações)
- `Button` (ações)

---

## 🌦️ CLIMA

### Rota
`/clima`

### Layout
```
┌─────────────────────────────────┐
│  [←]  CLIMA                     │
│              [📍] [📊]           │
├─────────────────────────────────┤
│                                 │
│  📍 Uberlândia, MG              │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │         ☀️                  ││
│  │                             ││
│  │        28°C                 ││
│  │   Parcialmente nublado      ││
│  │                             ││
│  │  Sensação térmica: 30°C     ││
│  └─────────────────────────────┘│
│                                 │
│  📊 CONDIÇÕES ATUAIS            │
│  ┌───────┬───────┬───────┐     │
│  │ 💧65% │ 🌬️12 │ ☀️8/10││
│  │ Umid. │ km/h  │ UV   ││
│  └───────┴───────┴───────┘     │
│                                 │
│  🌡️ PRÓXIMAS HORAS              │
│  ┌─────────────────────────────┐│
│  │ 14h  15h  16h  17h  18h     ││
│  │ ☀️  ☀️  ⛅  ⛅  🌧️         ││
│  │ 28° 29° 27° 26° 24°         ││
│  └─────────────────────────────┘│
│                                 │
│  📅 PREVISÃO 7 DIAS             │
│  ┌─────────────────────────────┐│
│  │ SEG  ☀️  Max 30° Min 18°   ││
│  │      💧 0% chuva            ││
│  │ ───────────────────────     ││
│  │ TER  ⛅  Max 28° Min 19°   ││
│  │      💧 20% chuva           ││
│  │ ───────────────────────     ││
│  │ QUA  🌧️  Max 25° Min 17°  ││
│  │      💧 80% chuva           ││
│  │      💦 15mm                ││
│  │ ───────────────────────     ││
│  │ QUI  ⛅  Max 27° Min 18°   ││
│  │      💧 30% chuva           ││
│  │ ───────────────────────     ││
│  │ QUI  ☀️  Max 29° Min 19°   ││
│  │      💧 10% chuva           ││
│  └─────────────────────────────┘│
│                                 │
│  🤖 ANÁLISE INTELIGENTE         │
│  ┌─────────────────────────────┐│
│  │ ✅ Condições favoráveis para││
│  │    aplicação de defensivos  ││
│  │    nas próximas 2 horas     ││
│  │                             ││
│  │ ⚠️ Chuva prevista para      ││
│  │    amanhã. Evite aplicações ││
│  │    de produtos sistêmicos   ││
│  │                             ││
│  │ 💡 Janela ideal: Hoje 14h-17h││
│  └─────────────────────────────┘│
│                                 │
│  🗺️ RADAR DE CHUVA              │
│  ┌─────────────────────────────┐│
│  │    [Mini mapa com radar]    ││
│  │    Nuvens se aproximando    ││
│  │    [Ver em tela cheia →]    ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Localização**
- **GPS automático**: Detecta cidade atual
- **Busca manual**: Digita cidade
- **Múltiplas localizações**: Salva favoritos
- **Botão [📍]**: Troca entre localizações salvas

#### **2. Condições Atuais**
- **Card grande**:
  - Ícone do tempo (animado)
  - Temperatura atual
  - Descrição (nublado, ensolarado, etc)
  - Sensação térmica
  
- **3 Métricas rápidas**:
  - Umidade (%)
  - Vento (velocidade + direção)
  - Índice UV

#### **3. Previsão por Hora**
- **Scroll horizontal**: Próximas 12 horas
- **Cada card**:
  - Hora
  - Ícone do tempo
  - Temperatura
  
#### **4. Previsão 7 Dias**
- **Lista vertical**: Segunda a segunda
- **Cada item**:
  - Dia da semana
  - Ícone do tempo
  - Máxima e mínima
  - Probabilidade de chuva
  - Volume esperado (se > 0)

#### **5. Análise Inteligente (IA)**
- **Recomendações agrícolas**:
  - Melhor horário para aplicação
  - Avisos de chuva
  - Condições de colheita
  - Janelas de oportunidade
  
- **Baseado em**:
  - Vento (não aplicar se > 15 km/h)
  - Chuva (evitar se próximo)
  - Umidade (ideal 50-70%)
  - Temperatura (ideal 20-30°C)

#### **6. Radar de Chuva**
- **Mini mapa**: Preview do radar
- **Animação**: Movimento das nuvens
- **Tap**: Abre fullscreen `/radar-clima`
- **Overlay**: Intensidade de chuva (cores)

### Componentes Usados
- `Clima` (tela principal)
- `IAClimaPanel` (análise IA)
- `RadarClimaOverlay` (radar no mapa)
- `Card` (previsões)
- `Badge` (alertas)

---

## 🔔 CENTRAL DE NOTIFICAÇÕES

### Rota
Sheet modal (não tem rota própria)

### Layout
```
┌─────────────────────────────────┐
│  🔔 Notificações       [X]       │
├─────────────────────────────────┤
│                                 │
│  🗂️ [Todas] [Não lidas] [Alertas]│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🐛 Nova ocorrência detectada││
│  │                             ││
│  │ Lagarta-da-soja identificada││
│  │ no Talhão Norte             ││
│  │                             ││
│  │ 🕐 Há 15 minutos            ││
│  │                             ││
│  │ [Ver detalhes →]            ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌧️ Alerta de chuva          ││
│  │                             ││
│  │ Previsão de 20mm de chuva   ││
│  │ nas próximas 6 horas        ││
│  │                             ││
│  │ 🕐 Há 1 hora                ││
│  │                             ││
│  │ [Ver radar →]               ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ✅ Check-in realizado        ││
│  │                             ││
│  │ João Silva fez check-in na  ││
│  │ Fazenda Boa Esperança       ││
│  │                             ││
│  │ 🕐 Há 3 horas               ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📊 Relatório compartilhado  ││
│  │                             ││
│  │ Maria Santos compartilhou   ││
│  │ "Análise de Solo - Nov 2025"││
│  │                             ││
│  │ 🕐 Ontem                    ││
│  │                             ││
│  │ [Abrir →]                   ││
│  └─────────────────────────────┘│
│                                 │
│  [🗑️ Limpar todas]              │
│                                 │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Sheet Deslizante**
- **Abertura**: Slide up from bottom
- **Altura**: 70% da tela
- **Backdrop**: Blur + dim
- **Fechar**: 
  - Swipe down
  - Tap no backdrop
  - Botão [X]

#### **2. Filtros**
- **Tabs**:
  - Todas (default)
  - Não lidas (badge com contador)
  - Alertas (apenas críticos)

#### **3. Tipos de Notificação**
- **🐛 Ocorrência**: Nova praga detectada
- **🌧️ Clima**: Alertas meteorológicos
- **✅ Check-in**: Equipe fez check-in
- **📊 Relatório**: Compartilhamento
- **🎯 Tarefa**: Lembrete de atividade
- **💬 Mensagem**: Chat interno
- **🔄 Sync**: Dados sincronizados

#### **4. Card de Notificação**
- **Estrutura**:
  - Ícone colorido (por tipo)
  - Título bold
  - Descrição
  - Timestamp relativo
  - Ação primária (botão)
  
- **Estados**:
  - Não lida: Background azul claro
  - Lida: Background branco
  
- **Swipe left**: Marcar como lida
- **Swipe right**: Excluir

#### **5. Ações**
- **Tap na notificação**: 
  - Marca como lida
  - Navega para contexto
  
- **Botões de ação**:
  - [Ver detalhes]
  - [Abrir]
  - [Resolver]
  - [Responder]

#### **6. Gerenciamento**
- **[🗑️ Limpar todas]**: Remove todas lidas
- **Badge no ícone**: Contador de não lidas

### Componentes Usados
- `NotificationCenter` (sheet)
- `Sheet` (modal bottom)
- `Badge` (contador)
- `Tabs` (filtros)
- `Card` (notificações)

---

## 🎯 CHECK-IN / CHECK-OUT

### Rota
`/check-in`

### Layout
```
┌─────────────────────────────────┐
│  [X]  CHECK-IN                  │
├─────────────────────────────────┤
│                                 │
│  📍 LOCALIZAÇÃO                 │
│  ┌─────────────────────────────┐│
│  │ Uberlândia, MG              ││
│  │ Lat: -18.9188 Lng: -48.2766 ││
│  │ Precisão: ±5m               ││
│  └─────────────────────────────┘│
│                                 │
│  👤 CLIENTE                     │
│  ┌─────────────────────────────┐│
│  │ [João Silva ▼]              ││
│  └─────────────────────────────┘│
│                                 │
│  🏢 FAZENDA                     │
│  ┌─────────────────────────────┐│
│  │ [Fazenda Boa Esperança ▼]   ││
│  └─────────────────────────────┘│
│                                 │
│  📝 MOTIVO DA VISITA            │
│  ┌─────────────────────────────┐│
│  │ ☐ Inspeção de rotina        ││
│  │ ☐ Aplicação de defensivos   ││
│  │ ☑ Análise de pragas         ││
│  │ ☐ Coleta de solo            ││
│  │ ☐ Orientação técnica        ││
│  │ ☐ Outros: [_____________]   ││
│  └─────────────────────────────┘│
│                                 │
│  📸 FOTO (opcional)             │
│  ┌─────┐                        │
│  │ 📷  │ [Tirar foto]           │
│  └─────┘                        │
│                                 │
│  💬 OBSERVAÇÕES                 │
│  ┌─────────────────────────────┐│
│  │ [Escreva suas observações]  ││
│  │                             ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  [✓ FAZER CHECK-IN]             │
│                                 │
└─────────────────────────────────┘

--- APÓS CHECK-IN ---

┌─────────────────────────────────┐
│  ✅ CHECK-IN ATIVO              │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ 👤 João Silva               ││
│  │ 🏢 Fazenda Boa Esperança    ││
│  │                             ││
│  │ 🕐 Iniciado: 10:30          ││
│  │ ⏱️ Duração: 01:45:23        ││
│  │                             ││
│  │ 📍 Localização atual:       ││
│  │    Talhão Norte             ││
│  └─────────────────────────────┘│
│                                 │
│  📌 AÇÕES RÁPIDAS               │
│  ┌───────┬───────┬───────┐     │
│  │ 📸    │ 📝    │ 🗺️    │     │
│  │ Foto  │Relato │ Mapa  │     │
│  └───────┴───────┴───────┘     │
│                                 │
│  📋 ATIVIDADES REGISTRADAS      │
│  ┌─────────────────────────────┐│
│  │ 11:15 - Foto da lavoura     ││
│  │ 11:30 - Observação: ...     ││
│  │ 12:00 - Ocorrência criada   ││
│  └─────────────────────────────┘│
│                                 │
│  [🏁 FAZER CHECK-OUT]           │
│                                 │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. GPS Automático**
- **Captura ao abrir**: Localização atual
- **Validação**: 
  - Precisão mínima 20m
  - Se fora da fazenda, alerta
  
- **Exibe**:
  - Cidade/Estado
  - Coordenadas
  - Precisão

#### **2. Seleção de Cliente/Fazenda**
- **Dropdowns aninhados**:
  - Primeiro: Cliente
  - Segundo: Fazenda (filtra por cliente)
  
- **Sugestões inteligentes**:
  - Última visita
  - Mais próxima (GPS)
  - Recente

#### **3. Motivo da Visita**
- **Checklist de opções**:
  - Predefinidas (6 principais)
  - Campo "Outros" livre
  
- **Múltipla escolha**: Pode marcar várias

#### **4. Anexos Opcionais**
- **Foto**: Câmera ou galeria
- **Observações**: Campo de texto livre

#### **5. Cronômetro de Visita**
- **Inicia**: Ao fazer check-in
- **Conta**: Tempo real (HH:MM:SS)
- **Pausa**: Automática se sair do app
- **Resume**: Ao voltar

#### **6. Ações Durante Check-in**
- **3 Botões rápidos**:
  - 📸 Tirar foto (adiciona à visita)
  - 📝 Fazer anotação
  - 🗺️ Ver no mapa
  
#### **7. Timeline de Atividades**
- **Lista cronológica**:
  - Horário da ação
  - Tipo (foto, nota, ocorrência)
  - Descrição breve
  
#### **8. Check-out**
- **Botão [🏁]**: Finaliza visita
- **Captura**:
  - Hora de saída
  - Duração total
  - Localização de saída
  
- **Gera automaticamente**:
  - Resumo da visita
  - Relatório básico
  - Notificação para cliente

### Componentes Usados
- `CheckInOut` (tela principal)
- `CheckInModal` (modal de check-in)
- `QuickCheckInModal` (versão rápida)
- `VisitaTag` (card de visita ativa)
- `ClienteDropdown` (seleção)
- `FazendaDropdown` (seleção)

---

## 🎨 MARKETING / PUBLICAÇÕES

### Rota
`/marketing`

### Layout
```
┌─────────────────────────────────┐
│  [←]  MARKETING         [+]     │
├─────────────────────────────────┤
│                                 │
│  🗂️ [Feed] [Rascunhos] [Arquivados]│
│                                 │
│  ┌─────────────────────────────┐│
│  │ [Imagem de capa]            ││
│  │                             ││
│  │ 🌾 Resultados Incríveis na  ││
│  │    Fazenda Boa Esperança!   ││
│  │                             ││
│  │ Aumento de 35% na           ││
│  │ produtividade de soja com   ││
│  │ nosso acompanhamento...     ││
│  │                             ││
│  │ 👤 João Silva               ││
│  │ 📅 10/11/2025               ││
│  │                             ││
│  │ ❤️ 24  💬 8  📤 12          ││
│  │                             ││
│  │ [✏️ Editar] [🗑️ Excluir]    ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ [Galeria de 3 fotos]        ││
│  │                             ││
│  │ 🦠 Como Combater Ferrugem   ││
│  │                             ││
│  │ Dicas práticas para         ││
│  │ identificar e tratar...     ││
│  │                             ││
│  │ 👤 Maria Santos             ││
│  │ 📅 08/11/2025               ││
│  │                             ││
│  │ ❤️ 45  💬 15  📤 28         ││
│  │                             ││
│  │ [✏️ Editar] [🗑️ Excluir]    ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Feed de Publicações**
- **Tabs**:
  - Feed (publicadas)
  - Rascunhos (não publicadas)
  - Arquivadas (ocultadas)
  
#### **2. Card de Publicação**
- **Elementos**:
  - Imagem de capa (16:9)
  - Título (destaque)
  - Preview do texto (3 linhas)
  - Autor + avatar
  - Data de publicação
  - Métricas:
    - ❤️ Curtidas
    - 💬 Comentários
    - 📤 Compartilhamentos
  
- **Ações**:
  - ✏️ Editar (sempre visível)
  - 🗑️ Excluir (sempre visível)
  - 📤 Compartilhar
  - 📊 Ver estatísticas

#### **3. Criar Nova Publicação**
- **Botão [+]**: Abre editor
- **Campos**:
  - Título *
  - Texto *
  - Imagens (até 10)
  - Tags
  - Cliente vinculado (opcional)
  - Área vinculada (opcional)
  
- **Preview em tempo real**

#### **4. Editar Publicação**
- **Carrega dados existentes**
- **Salvar como rascunho**
- **Publicar imediatamente**

#### **5. Estatísticas**
- **Modal com gráficos**:
  - Alcance (visualizações)
  - Engajamento (curtidas + comentários)
  - Compartilhamentos
  - Gráfico de crescimento

### Componentes Usados
- `Marketing` (feed)
- `Card` (publicações)
- `Badge` (tags)
- `Dialog` (estatísticas)

---

## 👥 GESTÃO DE EQUIPES

### Rota
`/gestao-equipes`

### Layout
```
┌─────────────────────────────────┐
│  [←]  EQUIPES          [+]      │
├─────────────────────────────────┤
│                                 │
│  📊 RESUMO                      │
│  ┌────┬────┬────┬────┐          │
│  │ 8  │ 6  │ 2  │ 4  │          │
│  │Tot.│Atv.│Afas│Hoje│          │
│  └────┴────┴────┴────┘          │
│                                 │
│  🔍 [Buscar membro...]          │
│                                 │
│  🗂️ [Todos] [Ativos] [Inativos] │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 👤 João Silva               ││
│  │ 🏷️ Agrônomo Sênior          ││
│  │                             ││
│  │ 📧 joao@exemplo.com         ││
│  │ 📞 (34) 99999-9999          ││
│  │                             ││
│  │ ✅ Ativo • 127 visitas      ││
│  │ 🕐 Última visita: hoje      ││
│  │                             ││
│  │ [👁️] [✏️] [⏸️]              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 👤 Maria Santos             ││
│  │ 🏷️ Técnica Agrícola         ││
│  │                             ││
│  │ 📧 maria@exemplo.com        ││
│  │ 📞 (34) 98888-8888          ││
│  │                             ││
│  │ ✅ Ativo • 89 visitas       ││
│  │ 🕐 Última visita: ontem     ││
│  │                             ││
│  │ [👁️] [✏️] [⏸️]              ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Dashboard de Equipe**
- **4 Métricas**:
  - Total de membros
  - Ativos
  - Afastados/Inativos
  - Em campo hoje

#### **2. Lista de Membros**
- **Filtros**:
  - Todos
  - Ativos
  - Inativos
  
- **Busca**: Por nome ou cargo

#### **3. Card de Membro**
- **Informações**:
  - Nome + avatar
  - Cargo
  - Email
  - Telefone
  - Status (ativo/inativo)
  - Total de visitas
  - Última atividade
  
- **Ações**:
  - 👁️ Ver detalhes
  - ✏️ Editar
  - ⏸️ Suspender/Ativar

#### **4. Adicionar Membro**
- **Formulário**:
  - Nome *
  - Email *
  - Telefone *
  - Cargo *
  - Foto
  - Permissões
  
#### **5. Detalhes do Membro**
- **Tabs**:
  - 📋 Info (dados cadastrais)
  - 📊 Estatísticas (visitas, relatórios)
  - 📍 Localização atual (se em check-in)
  - 📅 Histórico (atividades)

### Componentes Usados
- `GestaoEquipes` (tela)
- `Card` (membros)
- `Avatar` (foto)
- `Badge` (status)
- `Dialog` (detalhes)

---

## 📊 DASHBOARD EXECUTIVO

### Rota
`/dashboard-executivo`

### Layout
```
┌─────────────────────────────────┐
│  [←]  DASHBOARD EXECUTIVO       │
│              [📅] [📤]           │
├─────────────────────────────────┤
│                                 │
│  📅 Período: [Este Mês ▼]       │
│                                 │
│  💰 RECEITA E CUSTOS            │
│  ┌─────────────────────────────┐│
│  │ R$ 450.000                  ││
│  │ Receita Total               ││
│  │ ▲ 12% vs mês anterior       ││
│  │                             ││
│  │ [Gráfico de linha]          ││
│  │  Jan Feb Mar Abr Mai Jun    ││
│  └─────────────────────────────┘│
│                                 │
│  ┌──────┬──────┬──────┐         │
│  │R$280k│R$170k│ 38%  │         │
│  │Custos│Lucro │Marg. │         │
│  └──────┴──────┴──────┘         │
│                                 │
│  👥 EQUIPE                      │
│  ┌─────────────────────────────┐│
│  │ [Gráfico de barras]         ││
│  │                             ││
│  │ João   ████████████ 127     ││
│  │ Maria  ██████████ 89        ││
│  │ Pedro  ████████ 76          ││
│  │ Ana    ██████ 54            ││
│  │                             ││
│  │ Total: 346 visitas          ││
│  └─────────────────────────────┘│
│                                 │
│  🌾 ÁREAS MONITORADAS           │
│  ┌─────────────────────────────┐│
│  │ [Gráfico de pizza]          ││
│  │                             ││
│  │ 🟢 Saudáveis: 45.3 ha (62%) ││
│  │ 🟡 Atenção: 18.2 ha (25%)   ││
│  │ 🔴 Críticas: 9.5 ha (13%)   ││
│  │                             ││
│  │ Total: 73 ha                ││
│  └─────────────────────────────┘│
│                                 │
│  🐛 OCORRÊNCIAS                 │
│  ┌─────────────────────────────┐│
│  │ [Gráfico de área]           ││
│  │                             ││
│  │ Pragas    45 (▲ 12%)        ││
│  │ Doenças   28 (▼ 5%)         ││
│  │ Nutrição  17 (→ 0%)         ││
│  │                             ││
│  │ Total: 90 ocorrências       ││
│  └─────────────────────────────┘│
│                                 │
│  [📥 Exportar Relatório]        │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Filtro de Período**
- **Opções**:
  - Hoje
  - Esta semana
  - Este mês (default)
  - Este ano
  - Custom (date range)

#### **2. Métricas Financeiras**
- **Receita total**: Gráfico de linha
- **Custos**: Card
- **Lucro**: Card
- **Margem**: Percentual

#### **3. Performance da Equipe**
- **Gráfico de barras**: Visitas por membro
- **Ranking**: Top performers
- **Comparação**: vs período anterior

#### **4. Status das Áreas**
- **Gráfico de pizza**: Distribuição por status
- **Cores**:
  - Verde: Saudáveis (NDVI > 0.7)
  - Amarelo: Atenção (NDVI 0.5-0.7)
  - Vermelho: Críticas (NDVI < 0.5)

#### **5. Análise de Ocorrências**
- **Gráfico de área**: Timeline de ocorrências
- **Categorias**: Pragas/Doenças/Nutrição
- **Tendências**: Crescimento/Decréscimo

#### **6. Exportação**
- **Formatos**: PDF, Excel
- **Conteúdo**: Todos os gráficos + tabelas
- **Compartilhar**: Email, WhatsApp

### Componentes Usados
- `DashboardExecutivo` (tela)
- `Chart` (recharts - linha, barra, pizza)
- `Card` (métricas)
- `Select` (filtro período)
- `Button` (exportar)

---

## 🗺️ GESTÃO DE OCORRÊNCIAS

### Rota
`/ocorrencias`

### Layout
```
┌─────────────────────────────────┐
│  [←]  OCORRÊNCIAS      [🔍] [+] │
├─────────────────────────────────┤
│                                 │
│  🗂️ [Ativas] [Resolvidas] [Todas]│
│                                 │
│  🏷️ Filtros: [Tipo ▼] [Área ▼] │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🐛 Lagarta-da-soja          ││
│  │                             ││
│  │ ████████░░ 85% CRÍTICO      ││
│  │                             ││
│  │ 📍 Talhão Norte (45.3 ha)   ││
│  │ 🕐 Criada há 2 horas        ││
│  │ 👤 João Silva               ││
│  │                             ││
│  │ 📸 [3 fotos]                ││
│  │                             ││
│  │ 💊 Tratamento recomendado   ││
│  │                             ││
│  │ [👁️ Detalhes] [✓ Resolver]  ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🦠 Ferrugem Asiática        ││
│  │                             ││
│  │ ██████░░░░ 60% MODERADO     ││
│  │                             ││
│  │ 📍 Lavoura Sul (32.1 ha)    ││
│  │ 🕐 Criada há 5 horas        ││
│  │ 👤 Maria Santos             ││
│  │                             ││
│  │ 📸 [2 fotos]                ││
│  │                             ││
│  │ 💊 Em tratamento            ││
│  │                             ││
│  │ [👁️ Detalhes] [✓ Resolver]  ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘

--- DETALHES DA OCORRÊNCIA ---

┌─────────────────────────────────┐
│  [←]  DETALHES          [✏️] [🗑️]│
├─────────────────────────────────┤
│                                 │
│  🐛 Lagarta-da-soja             │
│  (Anticarsia gemmatalis)        │
│                                 │
│  ████████░░ 85% CRÍTICO         │
│                                 │
│  📍 LOCALIZAÇÃO                 │
│  ┌─────────────────────────────┐│
│  │ Talhão Norte (45.3 ha)      ││
│  │ [Mini mapa com pin]         ││
│  │ Lat: -18.9188               ││
│  │ Lng: -48.2766               ││
│  └─────────────────────────────┘│
│                                 │
│  📅 HISTÓRICO                   │
│  ┌─────────────────────────────┐│
│  │ 10/11 14:30 - Criada        ││
│  │   por João Silva            ││
│  │                             ││
│  │ 10/11 15:00 - Foto adicionada│
│  │                             ││
│  │ 10/11 15:30 - Tratamento    ││
│  │   recomendado               ││
│  └─────────────────────────────┘│
│                                 │
│  📸 FOTOS (3)                   │
│  ┌────┬────┬────┐               │
│  │ 🖼️ │ 🖼️ │ 🖼️ │               │
│  └────┴────┴────┘               │
│                                 │
│  📝 OBSERVAÇÕES                 │
│  ┌─────────────────────────────┐│
│  │ Alta infestação detectada   ││
│  │ em bordadura norte. Possível││
│  │ origem de área vizinha...   ││
│  └─────────────────────────────┘│
│                                 │
│  💊 TRATAMENTO                  │
│  ┌─────────────────────────────┐│
│  │ Status: EM ANDAMENTO        ││
│  │                             ││
│  │ Produto: Lambda-cialotrina  ││
│  │ Dose: 150ml/ha              ││
│  │ Aplicação: 11/11 - 08:00    ││
│  │                             ││
│  │ Responsável: Pedro Costa    ││
│  └─────────────────────────────┘│
│                                 │
│  [📝 Adicionar Nota]            │
│  [✓ Marcar como Resolvida]      │
│                                 │
└─────────────────────────────────┘
```

### Funcionalidades

#### **1. Lista de Ocorrências**
- **Tabs**:
  - Ativas (default)
  - Resolvidas
  - Todas
  
- **Filtros**:
  - Tipo (praga, doença, nutrição, etc)
  - Área/Talhão
  - Severidade
  - Data

#### **2. Card de Ocorrência**
- **Elementos**:
  - Ícone + Nome da praga/doença
  - Barra de severidade (colorida)
  - Localização
  - Timestamp
  - Autor
  - Galeria de fotos (preview)
  - Status do tratamento
  
- **Ações**:
  - [👁️ Detalhes]
  - [✓ Resolver]

#### **3. Detalhes Completos**
- **Seções**:
  - Header (nome + severidade)
  - Localização (mini mapa + coordenadas)
  - Histórico (timeline de eventos)
  - Galeria de fotos (expandível)
  - Observações (texto livre)
  - Tratamento (produtos, doses, datas)
  
#### **4. Adicionar Ocorrência**
- **Formulário**:
  - Tipo *
  - Nome/Descrição *
  - Severidade (0-100%) *
  - Área afetada *
  - Localização (GPS)
  - Fotos
  - Observações
  - Tratamento recomendado

#### **5. Editar Ocorrência**
- **Campos editáveis**:
  - Severidade (atualizar)
  - Adicionar fotos
  - Adicionar notas
  - Atualizar tratamento

#### **6. Resolver Ocorrência**
- **Confirmação**: "Marcar como resolvida?"
- **Campos finais**:
  - Solução aplicada
  - Resultado
  - Custo
  - Data de resolução

### Componentes Usados
- `GestaoOcorrencias` (lista)
- `Card` (ocorrências)
- `Badge` (severidade)
- `Dialog` (detalhes)
- `Timeline` (histórico)

---

## 🎯 RESUMO TÉCNICO

### Total de Rotas: 18

1. `/` - Landing
2. `/home` - Home
3. `/login` - Login
4. `/cadastro` - Cadastro
5. `/esqueci-senha` - Recuperação
6. `/dashboard` - Dashboard Principal ⭐
7. `/agenda` - Agenda
8. `/clima` - Clima
9. `/relatorios` - Relatórios
10. `/relatorios/novo` - Editor
11. `/clientes` - Clientes
12. `/configuracoes` - Configurações
13. `/check-in` - Check-in
14. `/radar-clima` - Radar
15. `/pragas` - Scanner Pragas
16. `/dashboard-executivo` - Dashboard Executivo
17. `/gestao-equipes` - Equipes
18. `/marketing` - Publicações
19. `/mapas-offline` - Mapas Offline
20. `/ocorrencias` - Ocorrências

### Componentes Globais

- **FloatingActionButton**: Em todas as telas principais
- **Bottom Navigation**: Em todas as telas logadas
- **Header**: Em todas as telas logadas
- **NotificationCenter**: Modal global
- **MobileOnlyGuard**: Wrapper do app
- **Toaster**: Notificações toast

### Stack Técnico

- **UI**: React + TypeScript + Tailwind CSS
- **Mapas**: Leaflet
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Animações**: Motion React
- **Forms**: React Hook Form
- **Notificações**: Sonner
- **Storage**: localStorage (demo)

---

**FIM DO PRD** 🎯
