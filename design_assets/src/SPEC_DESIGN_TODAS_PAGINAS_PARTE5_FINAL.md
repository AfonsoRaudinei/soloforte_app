# 📐 SPEC DE DESIGN - SOLOFORTE (PARTE 5 - FINAL)
## Páginas 18-23 - Conclusão Definitiva

> **Plataforma**: Mobile-only (375x812px base)  
> **Cor principal**: #0057FF

---

# 18. GESTÃO DE EQUIPES

### Rota: `/gestao-equipes` ou `/equipes`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  EQUIPES          [+]      │
├─────────────────────────────────┤
│                                 │
│  📊 RESUMO                      │
│  ┌────┬────┬────┬────┐          │
│  │ 8  │ 6  │ 2  │ 4  │          │
│  │Tot.│Atv.│Inac│Hoje│          │
│  └────┴────┴────┴────┘          │
│                                 │
│  [🔍 Buscar membro...]          │
│                                 │
│  🗂️ [Todos] [Ativos] [Inativos] │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [👤] João Silva         │   │
│  │      ─────────────────  │   │
│  │ 🏷️ Agrônomo Sênior      │   │
│  │                         │   │
│  │ 📧 joao@exemplo.com     │   │
│  │ 📞 (34) 99999-9999      │   │
│  │                         │   │
│  │ ✅ Ativo • 127 visitas  │   │
│  │ 🕐 Última: hoje 14:30   │   │
│  │                         │   │
│  │ [👁️] [✏️] [⏸️]          │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [👤] Maria Santos       │   │
│  │      ─────────────────  │   │
│  │ 🏷️ Técnica Agrícola     │   │
│  │                         │   │
│  │ 📧 maria@exemplo.com    │   │
│  │ 📞 (34) 98888-8888      │   │
│  │                         │   │
│  │ ✅ Ativo • 89 visitas   │   │
│  │ 🕐 Última: ontem 16:00  │   │
│  │                         │   │
│  │ [👁️] [✏️] [⏸️]          │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Navega para `/dashboard` ou `/home`

### Título "EQUIPES"

### Botão Adicionar ([+])
- **Ação**: Abre modal "Novo Membro"

## 📊 RESUMO DASHBOARD

### Grid de 4 Métricas
- **Specs**: Iguais à página Clientes
- **Layout**: Grid 4 colunas

**4 Métricas**:
1. **8** - Total de Membros
2. **6** - Ativos
3. **2** - Inativos/Afastados
4. **4** - Em campo hoje

## 🔍 CAMPO DE BUSCA

### Container
- **Margin**: 16px
- **Specs**: Input padrão
- **Placeholder**: "Buscar membro..."
- **Ícone**: 🔍 (esquerda, 20px)
- **Busca em**: Nome, email, cargo

## 🗂️ FILTROS (Tabs)

### Container
- **Margin**: 0 16px 16px
- **Display**: Flex
- **Gap**: 8px

**3 Tabs** (radio buttons pill):
- **[● Todos]** - Mostra todos
- **[○ Ativos]** - Apenas ativos
- **[○ Inativos]** - Apenas inativos/afastados

**Specs**: Radio buttons da página Configurações

## 📋 LISTA DE MEMBROS

### Card de Membro

**Dimensões**:
- **Margin**: 0 16px 16px
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 16px
- **Box-shadow**: 0px 2px 8px rgba(0,0,0,0.06)

### Estrutura Interna

**Linha 1 - Avatar + Nome**:
```
[👤]  João Silva
      ───────────────
```

**Avatar**:
- **Tamanho**: 56x56px (círculo)
- **Border**: 2px solid #E9ECEF
- **Conteúdo**: Foto ou iniciais
- **Margin-right**: 12px

**Nome**:
- **Fonte**: 18px, weight 700, color #212529
- **Vertical-align**: Center

**Separador**:
- **Margin**: 8px vertical
- **Border-bottom**: 1px solid #E9ECEF

**Linha 2 - Cargo**:
- **Ícone**: 🏷️ Tag (18px, #0057FF)
- **Texto**: "Agrônomo Sênior"
  - Fonte: 15px, weight 600, color #0057FF
- **Margin-bottom**: 12px

**Linha 3 - Email**:
- **Ícone**: 📧 Mail (16px, #6C757D)
- **Texto**: "joao@exemplo.com"
  - Fonte: 14px, weight 400, color #6C757D
- **Margin-bottom**: 6px

**Linha 4 - Telefone**:
- **Ícone**: 📞 Phone (16px)
- **Texto**: "(34) 99999-9999"
  - Fonte: 14px, weight 400, color #6C757D
- **Margin-bottom**: 12px

**Separador fino**:
- **Background**: #F8F9FA
- **Margin**: 12px vertical

**Linha 5 - Status + Estatísticas**:
```
✅ Ativo • 127 visitas
```

**Status badge**:
- **Ícone**: ✅ ou ⏸️
- **Texto**: "Ativo" ou "Inativo"
  - Fonte: 14px, weight 700
  - Color: #28A745 (ativo) / #ADB5BD (inativo)
- **Separador**: • (bullet)
- **Visitas**: "127 visitas"
  - Fonte: 14px, weight 600, color #212529

**Linha 6 - Última Atividade**:
- **Ícone**: 🕐 Clock (16px)
- **Texto**: "Última visita: hoje 14:30"
  - Fonte: 13px, weight 500, color #6C757D
  - Formato relativo
- **Margin-bottom**: 16px

### Botões de Ação (3 botões inline)

**Layout**:
- **Display**: Flex
- **Gap**: 8px
- **Justify-content**: Space-between

**Cada botão**:
- **Largura**: (100% - 16px) / 3
- **Altura**: 44px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid rgba(0, 87, 255, 0.2)
- **Border-radius**: 12px
- **Display**: Flex column
- **Align**: Center

**1) Ver Detalhes ([👁️])**:
- **Ícone**: 👁️ Eye (20px, #0057FF)
- **Ação**: Abre sheet de detalhes

**2) Editar ([✏️])**:
- **Ícone**: ✏️ Edit (20px, #0057FF)
- **Ação**: Abre formulário de edição

**3) Suspender/Ativar ([⏸️] ou [▶️])**:
- **Ícone**: ⏸️ Pause (inativar) ou ▶️ Play (ativar)
  - Color: #DC3545 (suspender) / #28A745 (ativar)
- **Border color**: Vermelho ou verde
- **Background**: rgba(220,53,69,0.05) ou rgba(40,167,69,0.05)
- **Ação**: Dialog de confirmação

## 📱 SHEET "DETALHES DO MEMBRO"

### Estrutura (altura 85%)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  [👤 Avatar 72px]               │
│  João Silva                     │
│  joao@exemplo.com               │
│  ✅ Ativo                       │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [📋] [📊] [📍] [📅]     │   │ ← Tabs
│  └─────────────────────────┘   │
│                                 │
│  --- CONTEÚDO DA TAB ---        │
│                                 │
│  [✏️ Editar Membro]             │
│                                 │
└─────────────────────────────────┘
```

### Header do Sheet

**Avatar**:
- **Tamanho**: 72x72px
- **Centralizado**: Horizontal
- **Margin**: 16px vertical

**Nome**:
- **Fonte**: 22px, weight 800, color #212529
- **Margin-bottom**: 4px

**Email**:
- **Fonte**: 14px, weight 400, color #6C757D
- **Margin-bottom**: 8px

**Status Badge**:
- **Padding**: 6px 12px
- **Border-radius**: 12px
- **Background**: Baseado no status
- **Fonte**: 13px, weight 700

### Tabs (4 tabs)

**Layout**: Specs padrão de tabs

**4 Tabs**:
1. **📋 Info** - Dados cadastrais
2. **📊 Estatísticas** - Performance
3. **📍 Localização** - Última posição
4. **📅 Histórico** - Timeline de atividades

### TAB 1: INFO

**Seções**:

**📋 Dados Pessoais**:
- Nome completo
- CPF
- Email
- Telefone principal
- Telefone secundário

**💼 Dados Profissionais**:
- Cargo
- CREA/CRM (se tiver)
- Data de admissão
- Departamento

**📍 Endereço**:
- Rua, número, complemento
- Bairro
- Cidade/Estado
- CEP

**Formato**: Lista de campos (label + valor)

### TAB 2: ESTATÍSTICAS

**Cards de métricas** (grid 2x2):
1. **127** - Total de Visitas
2. **45** - Este Mês
3. **8.5h** - Tempo Médio por Visita
4. **92%** - Taxa de Conclusão

**Gráfico de barras** (últimos 6 meses):
- Visitas por mês
- Comparativo com meta

**Top 5 Clientes** (lista):
- Nome do cliente
- Número de visitas

### TAB 3: LOCALIZAÇÃO

**Mapa pequeno** (200px altura):
- Última posição conhecida
- Pin com avatar do membro
- Timestamp: "Atualizado há 15min"

**Detalhes**:
- Endereço aproximado
- Coordenadas
- Precisão do GPS

**Botão**: "Solicitar localização atual" (se em check-in)

### TAB 4: HISTÓRICO

**Timeline vertical**: 
- Últimas 20 atividades
- Check-ins
- Relatórios criados
- Ocorrências registradas
- Configurações alteradas

**Formato**: Igual timeline do Cliente

## ➕ MODAL "NOVO MEMBRO"

### Estrutura (Sheet bottom, 90%)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Novo Membro da Equipe  [X]     │
│                                 │
│  📸 [Adicionar Foto]            │
│                                 │
│  Nome Completo *                │
│  [_____________________]        │
│                                 │
│  CPF                            │
│  [_____________________]        │
│                                 │
│  Email *                        │
│  [_____________________]        │
│                                 │
│  Telefone *                     │
│  [_____________________]        │
│                                 │
│  Cargo *                        │
│  [Agrônomo ▼]                   │
│                                 │
│  CREA/CRM                       │
│  [_____________________]        │
│                                 │
│  Data de Admissão               │
│  [10/11/2025]  [📅]             │
│                                 │
│  Permissões                     │
│  ☑ Criar relatórios             │
│  ☑ Gerenciar ocorrências        │
│  ☐ Gerenciar clientes           │
│  ☐ Dashboard executivo          │
│                                 │
│  [CANCELAR] [ADICIONAR MEMBRO]  │
│                                 │
└─────────────────────────────────┘
```

**Campos**: Specs padrão

**Dropdown Cargo**:
- Agrônomo
- Técnico Agrícola
- Consultor
- Gerente
- Outro (campo texto)

**Checkboxes Permissões**:
- Define o que o membro pode acessar/fazer

---

# 19. GESTÃO DE CLIENTES (PÁGINA ESTENDIDA)

### Rota: `/gestao-clientes`

> **Nota**: Página similar à `/clientes` mas com funcionalidades avançadas

## 📱 DIFERENCIAIS

### Funcionalidades extras

**1. Filtros Avançados**:
- Por cultura (Soja, Milho, etc)
- Por região
- Por status (Ativo, Inativo, Inadimplente)
- Por tamanho (hectares)

**2. Agrupamento**:
- Por cidade
- Por consultor responsável
- Por rota (geográfico)

**3. Ações em Massa**:
- Selecionar múltiplos (checkbox)
- Enviar mensagem coletiva
- Exportar selecionados
- Agendar visitas em lote

### Layout com Seleção

```
┌─────────────────────────────────┐
│  [←]  GESTÃO CLIENTES  [☑️] [+] │ ← Checkbox de seleção
├─────────────────────────────────┤
│                                 │
│  [3 selecionados]   [X Limpar]  │ ← Barra de ações
│  [✉️ Msg] [📤 Exp] [🗑️ Del]     │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ☑ [👤] João Silva       │   │ ← Checkbox por card
│  │       (restante igual)  │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### Barra de Ações (quando há seleção)

**Fixa no topo** (abaixo do header)
- **Background**: #0057FF
- **Padding**: 12px 16px
- **Display**: Flex space-between

**Esquerda**:
- **Texto**: "3 selecionados"
  - Fonte: 15px, weight 600, color #FFFFFF
- **Botão [X]**: Limpa seleção
  - Color: #FFFFFF, opacity 0.8

**Direita** (3 botões icon-only):
1. **✉️ Enviar Mensagem**: Abre composer WhatsApp/Email
2. **📤 Exportar**: Exporta dados dos selecionados
3. **🗑️ Deletar**: Dialog de confirmação

**Specs dos botões**:
- **Tamanho**: 36x36px
- **Background**: rgba(255,255,255,0.2)
- **Border-radius**: 18px
- **Ícone**: 20px, #FFFFFF
- **Gap**: 8px

### Agrupamento por Cidade

**Toggle** (switch no header):
- ON: Agrupa por cidade
- OFF: Lista normal

**Quando agrupado**:
```
📍 UBERLÂNDIA (5 clientes)
┌─────────────────────────┐
│ [Cliente 1]             │
│ [Cliente 2]             │
└─────────────────────────┘

📍 UBERABA (3 clientes)
┌─────────────────────────┐
│ [Cliente 3]             │
│ [Cliente 4]             │
└─────────────────────────┘
```

**Header do grupo**:
- **Background**: #F8F9FA
- **Padding**: 8px 16px
- **Font**: 13px, weight 700, uppercase
- **Sticky**: Fixa ao scroll

---

# 20. CHAT SUPORTE

### Rota: `/suporte` ou `/chat`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  SUPORTE           [•••]   │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐ │
│  │ [👤] Suporte SoloForte    │ │ ← Info do chat
│  │      Online agora         │ │
│  └───────────────────────────┘ │
│                                 │
│ ┌─ ONTEM ─────────────────────┐│
│ │                             ││
│ │ ┌─────────────────┐         ││
│ │ │ Olá! Como posso │ 10:30   ││ ← Mensagem deles
│ │ │ ajudar?         │         ││
│ │ └─────────────────┘         ││
│ │                             ││
│ │         ┌─────────────────┐ ││
│ │   11:15 │ Preciso de ajuda│ ││ ← Mensagem minha
│ │         │ com relatórios  │ ││
│ │         └─────────────────┘ ││
│ │                             ││
│ └─────────────────────────────┘│
│                                 │
│ ┌─ HOJE ───────────────────────┐│
│ │                             ││
│ │ ┌─────────────────┐         ││
│ │ │ Claro! Vou te   │ 14:20   ││
│ │ │ orientar...     │         ││
│ │ └─────────────────┘         ││
│ │                             ││
│ │ ┌─────────────────┐         ││
│ │ │ [📎 arquivo.pdf]│ 14:21   ││ ← Anexo
│ │ │ 📄 Manual.pdf   │         ││
│ │ │ 2.3 MB          │         ││
│ │ └─────────────────┘         ││
│ │                             ││
│ │ ● Digitando...              ││ ← Typing indicator
│ │                             ││
│ └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────┐   │
│  │[+][Escreva uma mensagem]│   │ ← Input
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Navega para `/configuracoes`

### Info do Chat

**Avatar + Status**:
- **Avatar**: 40x40px, logo SoloForte
- **Nome**: "Suporte SoloForte"
  - Fonte: 16px, weight 700
- **Status**: "Online agora" ou "Última vez: há 5min"
  - Fonte: 12px, color #28A745 (online) / #6C757D (offline)
  - Indicador: ● (8px, verde se online)

### Menu ([•••])
- **Ação**: Abre menu
  - Limpar conversa
  - Arquivar chat
  - Bloquear (se necessário)

## 💬 ÁREA DE MENSAGENS

### Container
- **Background**: #F8F9FA
- **Padding**: 16px
- **Overflow**: Scroll vertical
- **Scroll**: Auto para última mensagem

### Separador de Data

**Formato**: "ONTEM", "HOJE", "DD/MM/YYYY"

**Estilo**:
- **Background**: rgba(0,0,0,0.05)
- **Padding**: 4px 12px
- **Border-radius**: 12px
- **Margin**: 16px auto
- **Font**: 11px, weight 600, uppercase, color #6C757D
- **Display**: Inline-block
- **Centralizado**: Horizontal

### Balão de Mensagem (DELES - esquerda)

**Container**:
- **Max-width**: 75% (da tela)
- **Align**: Left
- **Margin-bottom**: 8px

**Balão**:
- **Background**: #FFFFFF
- **Padding**: 10px 14px
- **Border-radius**: 18px 18px 18px 4px (canto inferior esquerdo cortado)
- **Box-shadow**: 0px 1px 2px rgba(0,0,0,0.08)

**Texto**:
- **Fonte**: 15px, weight 400, color #212529, line-height 1.4
- **Word-wrap**: Break-word

**Timestamp**:
- **Posição**: Direita, fora do balão
- **Texto**: "10:30"
- **Fonte**: 11px, weight 500, color #ADB5BD
- **Margin-left**: 8px
- **Vertical-align**: Bottom

### Balão de Mensagem (MINHA - direita)

**Container**:
- **Max-width**: 75%
- **Align**: Right

**Balão**:
- **Background**: #0057FF
- **Padding**: 10px 14px
- **Border-radius**: 18px 18px 4px 18px (canto inferior direito cortado)

**Texto**:
- **Color**: #FFFFFF
- **Demais specs**: Iguais

**Timestamp**:
- **Margin-right**: 8px (esquerda do balão)

**Status de Leitura** (abaixo do timestamp):
- **Ícones**: 
  - ✓ Enviado (cinza)
  - ✓✓ Entregue (cinza)
  - ✓✓ Lido (azul)
- **Tamanho**: 12px
- **Color**: #ADB5BD ou #0057FF

### Mensagem com Anexo (Arquivo)

**Balão especial**:
```
┌─────────────────┐
│ [📎 arquivo.pdf]│
│ 📄 Manual.pdf   │
│ 2.3 MB          │
└─────────────────┘
```

**Estrutura**:
- **Ícone clip**: 📎 (20px, topo-esquerda)
- **Ícone tipo**: 📄 PDF, 🖼️ Imagem, 🎥 Vídeo
  - Tamanho: 40x40px
  - Margin-right: 12px
- **Nome arquivo**: 14px, weight 600
- **Tamanho**: 13px, weight 400, color #6C757D
- **Background**: rgba(0,0,0,0.05) dentro do balão
- **Padding**: 12px
- **Border-radius**: 8px

**Tap**: Abre ou download

### Mensagem com Imagem

**Thumbnail**:
- **Max-width**: 240px
- **Max-height**: 300px
- **Border-radius**: 12px
- **Object-fit**: Cover
- **Padding**: 0 (sem padding no balão)
- **Tap**: Abre fullscreen

### Typing Indicator (● Digitando...)

**Posição**: Esquerda (como mensagem deles)

**Balão**:
- **Background**: #FFFFFF
- **Padding**: 12px 16px
- **Border-radius**: 18px

**Conteúdo**:
- **3 Dots animados**: ● ● ●
  - Color: #ADB5BD
  - Tamanho: 8px cada
  - Animação: Bounce (up/down, stagger 0.2s, loop)
- **Texto**: "Digitando..." (opcional)
  - Fonte: 13px, italic, color #6C757D

## ⌨️ ÁREA DE INPUT (fixo bottom)

### Container
- **Position**: Fixed bottom
- **Background**: #FFFFFF
- **Border-top**: 1px solid #E9ECEF
- **Padding**: 12px 16px (+ safe area)
- **Box-shadow**: 0px -2px 8px rgba(0,0,0,0.05)

### Layout Interno

```
[+]  [____________Input_____________]  [🎤]
```

**Botão Anexar ([+])**:
- **Tamanho**: 36x36px (círculo)
- **Background**: rgba(0, 87, 255, 0.1)
- **Ícone**: + Plus (20px, #0057FF)
- **Margin-right**: 8px
- **Ação**: Abre actionsheet (Câmera, Galeria, Arquivo)

**Input de Texto**:
- **Largura**: Flex (cresce)
- **Min-height**: 36px
- **Max-height**: 120px (depois scroll)
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 18px
- **Padding**: 8px 16px
- **Placeholder**: "Escreva uma mensagem..."
  - Font: 15px, color #ADB5BD
- **Fonte texto**: 15px, weight 400, color #212529
- **Auto-grow**: Altura aumenta com conteúdo

**Botão Enviar/Áudio** (condicional):

**Quando input VAZIO** → Mostrar Áudio ([🎤]):
- **Tamanho**: 36x36px
- **Background**: rgba(0, 87, 255, 0.1)
- **Ícone**: 🎤 Mic (20px, #0057FF)
- **Margin-left**: 8px
- **Long press**: Inicia gravação de áudio
  - Muda para ícone ⏹️ Stop vermelho
  - Mostra contador de tempo
  - Release: Envia
  - Swipe left: Cancela

**Quando input TEM TEXTO** → Mostrar Enviar ([➤]):
- **Ícone**: ➤ Send (20px, branco)
- **Background**: #0057FF (cheio, não transparente)
- **Ação**: Envia mensagem

**Transição**: 
- Fade + rotate entre Mic ↔ Send (0.2s)

## 📎 ACTIONSHEET "ANEXAR"

### Estrutura
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Anexar                 [X]     │
│                                 │
│  ┌─────┬─────┬─────┬─────┐     │
│  │ 📷  │ 🖼️  │ 📄  │ 📍  │     │
│  │Câm. │Gal. │Arqu.│Loc. │     │
│  └─────┴─────┴─────┴─────┘     │
│                                 │
└─────────────────────────────────┘
```

**Grid de 4 opções**:

**Cada botão**:
- **Tamanho**: 70x70px
- **Border-radius**: 16px
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF

**Ícone**: 32x32px, centralizado
**Label**: 12px, weight 600, centralizado

**4 Opções**:
1. **📷 Câmera** - Tira foto
2. **🖼️ Galeria** - Escolhe imagem
3. **📄 Arquivo** - Escolhe documento
4. **📍 Localização** - Envia pin do mapa

## 🎭 ANIMAÇÕES

**Envio de mensagem**:
1. Balão aparece com slide up + fade in
2. Input limpa
3. Scroll auto para baixo (smooth)

**Recebimento de mensagem**:
1. Som de notificação (se app em foreground)
2. Balão aparece com slide up
3. Typing indicator some (fade out)
4. Auto-scroll para baixo

**Typing indicator**:
- Dots bounce (0.6s loop, stagger 0.2s)

**Long press áudio**:
- Botão cresce (scale 1.2)
- Vibração háptica ao iniciar
- Waveform animado enquanto grava

---

# 21. MARKETING/PUBLICAÇÕES

### Rota: `/marketing`

**Página já especificada em `/SPEC_DESIGN_TODAS_PAGINAS.md` (Parte 1)**

Resumo: Feed de publicações com filtros, estatísticas, criação e compartilhamento.

---

# 22. MAPAS OFFLINE

### Rota: `/mapas-offline`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  MAPAS OFFLINE             │
├─────────────────────────────────┤
│                                 │
│  📥 Áreas Baixadas (3/10 GB)    │
│  ████████░░░░░░░░░░░░ 35%      │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ✅ Talhão Norte         │   │
│  │ ────────────────────    │   │
│  │ 📦 2.3 GB • Zoom 18     │   │
│  │ 🕐 Há 2 dias            │   │
│  │ 🗺️ 456 tiles            │   │
│  │                         │   │
│  │ [🔄 Atualizar] [🗑️]     │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ✅ Lavoura Sul          │   │
│  │ ────────────────────    │   │
│  │ 📦 1.8 GB • Zoom 17     │   │
│  │ 🕐 Ontem                │   │
│  │ 🗺️ 328 tiles            │   │
│  │                         │   │
│  │ [🔄 Atualizar] [🗑️]     │   │
│  └─────────────────────────┘   │
│                                 │
│  📍 ÁREAS DISPONÍVEIS           │
│  ┌─────────────────────────┐   │
│  │ ⬇️ Área Teste           │   │
│  │ 📦 ~800 MB (estimado)   │   │
│  │ 🗺️ Zoom 16              │   │
│  │                         │   │
│  │ [📥 Baixar Offline]     │   │
│  └─────────────────────────┘   │
│                                 │
│  ⚙️ CONFIGURAÇÕES               │
│  ┌─────────────────────────┐   │
│  │ 📡 Baixar só via WiFi   │   │
│  │    [🔘 Ativado]         │   │
│  │ ────────────────────    │   │
│  │ 🎯 Qualidade            │   │
│  │    [●Alta] Média Baixa  │   │
│  │ ────────────────────    │   │
│  │ 🗺️ Zoom Máximo          │   │
│  │    14 15 16 [●17] 18    │   │
│  │ ────────────────────    │   │
│  │ 🗑️ Auto-Limpeza         │   │
│  │    [🔘 Ativado]         │   │
│  │    Após 30 dias         │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Navega para `/configuracoes` ou `/dashboard`

### Título "MAPAS OFFLINE"

## 📥 SEÇÃO "ÁREAS BAIXADAS"

### Header com Progress

**Label**:
- **Ícone**: 📥 Download
- **Texto**: "Áreas Baixadas (3/10 GB)"
  - 3 áreas baixadas
  - 10 GB limite total
- **Fonte**: 16px, weight 700
- **Margin**: 16px

**Progress Bar Global**:
- **Largura**: Calc(100% - 32px)
- **Altura**: 8px
- **Background**: #E9ECEF
- **Border-radius**: 4px
- **Fill**: #0057FF
  - Width: 35% (3.5GB usado / 10GB)
- **Label**: "35%" à direita

### Card de Área Baixada

**Container**:
- **Margin**: 16px
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px
- **Border-left**: 4px solid #28A745 (verde = baixado)

**Linha 1 - Nome**:
- **Ícone**: ✅ Check (18px, #28A745)
- **Texto**: "Talhão Norte"
  - Fonte: 16px, weight 700, color #212529

**Separador**: 1px solid #F8F9FA

**Linha 2 - Tamanho + Zoom**:
- **Ícone**: 📦 Package (16px)
- **Texto**: "2.3 GB • Zoom 18"
  - Fonte: 14px, weight 500, color #6C757D

**Linha 3 - Data Download**:
- **Ícone**: 🕐 Clock (16px)
- **Texto**: "Baixado há 2 dias"
  - Fonte: 13px, weight 400, color #ADB5BD

**Linha 4 - Detalhes Técnicos**:
- **Ícone**: 🗺️ Map (16px)
- **Texto**: "456 tiles armazenados"
  - Fonte: 13px, weight 400, color #ADB5BD
- **Margin-bottom**: 12px

**Botões de Ação** (2 inline):

**Layout**:
- **Display**: Flex
- **Gap**: 12px

**1) Atualizar ([🔄])**:
- **Largura**: Flex 1
- **Altura**: 36px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid #0057FF
- **Border-radius**: 18px
- **Ícone**: 🔄 RefreshCw (16px, #0057FF)
- **Texto**: "Atualizar"
  - Fonte: 14px, weight 600, color #0057FF
- **Ação**: 
  1. Verifica se há tiles novos
  2. Baixa apenas diferenças
  3. Progress bar

**2) Remover ([🗑️])**:
- **Largura**: 36px (apenas ícone)
- **Altura**: 36px
- **Background**: rgba(220, 53, 69, 0.05)
- **Border**: 1px solid #DC3545
- **Border-radius**: 18px
- **Ícone**: 🗑️ Trash (18px, #DC3545)
- **Ação**: 
  1. Dialog: "Remover X GB?"
  2. Se confirmar: Deleta tiles
  3. Toast: "Espaço liberado!"

## 📍 SEÇÃO "ÁREAS DISPONÍVEIS"

### Header
- **Ícone**: 📍 MapPin
- **Texto**: "ÁREAS DISPONÍVEIS"
- **Margin**: 24px 16px 12px

### Card de Área Não Baixada

**Container**: Specs iguais ao card baixado
**Border-left**: 4px solid #FFC107 (amarelo = disponível)

**Conteúdo**:
- **Ícone**: ⬇️ Download (cinza, não verde)
- **Nome**: "Área Teste"
- **Estimativa**: "~800 MB (estimado)"
  - Cálculo baseado em: Área em ha × zoom × qualidade
- **Zoom**: "Zoom 16 (padrão)"

**Botão "Baixar Offline"**:
- **Largura**: 100%
- **Altura**: 44px
- **Background**: #0057FF
- **Border-radius**: 22px
- **Ícone**: 📥 (20px, branco)
- **Texto**: "Baixar para Offline"
  - Fonte: 15px, weight 700, color #FFFFFF
- **Ação**:
  1. Verifica conexão WiFi (se config ativo)
  2. Mostra progress bar
  3. Download em background
  4. Notificação ao concluir

### Progress de Download (quando ativo)

**Substitui botão**:
```
┌─────────────────────────┐
│ Baixando... 45%         │
│ ████████████░░░░░░░░    │
│ 360 MB / 800 MB         │
│                         │
│ [⏸️ Pausar] [X Cancelar]│
└─────────────────────────┘
```

**Progress bar**:
- **Altura**: 6px
- **Animada**: Width transition

**Texto**:
- **Percentual**: Bold
- **Tamanho**: "360 MB / 800 MB"
- **Velocidade**: "2.5 MB/s" (opcional)

**Botões**:
- **Pausar**: Ícone ⏸️
- **Cancelar**: Ícone X vermelho

## ⚙️ SEÇÃO "CONFIGURAÇÕES"

### Container Card
- **Margin**: 24px 16px 40px
- **Padding**: 16px
- **Background**: #F8F9FA
- **Border-radius**: 12px

### Header
- **Ícone**: ⚙️ Settings
- **Texto**: "CONFIGURAÇÕES"
- **Margin-bottom**: 16px

### 4 Configurações

**1) Baixar só via WiFi** (Toggle):
- **Label**: "Baixar apenas via WiFi"
- **Sublabel**: "Economiza dados móveis"
  - Fonte: 12px, color #ADB5BD
- **Toggle**: Specs padrão
- **Default**: ON

**2) Qualidade dos Tiles** (Radio buttons):
- **Label**: "Qualidade dos Tiles"
- **3 Opções**:
  - ○ **Alta** (mais espaço, melhor imagem)
  - ● **Média** (equilibrado) ← Default
  - ○ **Baixa** (menos espaço, comprimido)
- **Specs**: Radio pills

**3) Zoom Máximo** (Radio buttons):
- **Label**: "Zoom Máximo para Download"
- **5 Opções**: 14, 15, 16, **17** (default), 18
- **Avisos**:
  - Zoom 18: "Muito espaço (~3GB/área)"
  - Zoom 14: "Baixa qualidade para zoom próximo"

**4) Auto-Limpeza** (Toggle + Config):
- **Toggle**: ON/OFF
- **Config** (quando ON):
  - **Label**: "Remover áreas antigas após:"
  - **Dropdown**: 15 dias, **30 dias**, 60 dias, 90 dias
- **Descrição**: "Áreas não acessadas serão removidas"

## 🎭 ANIMAÇÕES

**Download progress**:
- **Bar fill**: Width transition (smooth)
- **Percentual**: Count up animation

**Remoção**:
- **Card**: Slide out + fade (0.3s)
- **Progress bar global**: Ajusta (transition 0.5s)

**Conclusão de download**:
- **Card**: Border-left muda cinza → verde
- **Ícone**: ⬇️ → ✅ (scale animation)
- **Toast**: "Área baixada com sucesso!"

---

# 23. GESTÃO DE OCORRÊNCIAS

### Rota: `/ocorrencias`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  OCORRÊNCIAS      [🔍] [+] │
├─────────────────────────────────┤
│                                 │
│  🗂️ [Ativas] [Resolvidas] [Todas]│
│                                 │
│  🏷️ [Tipo ▼] [Área ▼] [⚙️]     │ ← Filtros
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🐛 Lagarta-da-soja      │   │
│  │                         │   │
│  │ ████████░░ 85% CRÍTICO  │   │
│  │                         │   │
│  │ 📍 Talhão Norte (45ha)  │   │
│  │ 🕐 Há 2 horas           │   │
│  │ 👤 João Silva           │   │
│  │                         │   │
│  │ 📸 [3 fotos]            │   │
│  │                         │   │
│  │ 💊 Tratamento pendente  │   │
│  │                         │   │
│  │ [👁️ Detalhes] [✓ Resolver]│  │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🦠 Ferrugem Asiática    │   │
│  │                         │   │
│  │ ██████░░░░ 60% MODERADO │   │
│  │                         │   │
│  │ 📍 Lavoura Sul (32ha)   │   │
│  │ 🕐 Há 5 horas           │   │
│  │ 👤 Maria Santos         │   │
│  │                         │   │
│  │ 📸 [2 fotos]            │   │
│  │                         │   │
│  │ 💊 Em tratamento        │   │
│  │                         │   │
│  │ [👁️ Detalhes] [✓ Resolver]│  │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Navega para `/dashboard`

### Título "OCORRÊNCIAS"

### Botão Busca ([🔍])
- **Ação**: Expande campo de busca

### Botão Adicionar ([+])
- **Ação**: Abre formulário "Nova Ocorrência"

## 🗂️ TABS DE STATUS (3 tabs)

**Specs**: Padrão de tabs

**3 Tabs**:
1. **[● Ativas]** - Ocorrências não resolvidas (default)
2. **[○ Resolvidas]** - Já tratadas
3. **[○ Todas]** - Histórico completo

## 🏷️ FILTROS

### Container
- **Padding**: 0 16px 16px
- **Display**: Flex
- **Gap**: 8px

**3 Filtros**:

**1) Tipo ([Tipo ▼])**:
- **Opções**:
  - Todos
  - Pragas
  - Doenças
  - Nutrição
  - Irrigação
  - Outros

**2) Área ([Área ▼])**:
- **Opções**:
  - Todas as áreas
  - Lista de talhões do usuário

**3) Mais Filtros ([⚙️])**:
- **Ação**: Abre sheet com filtros avançados
  - Severidade (Leve/Moderada/Crítica)
  - Data (Hoje/Semana/Mês/Custom)
  - Autor
  - Status tratamento

## 📋 LISTA DE OCORRÊNCIAS

### Card de Ocorrência

**Container**:
- **Margin**: 0 16px 16px
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-left**: 4px solid (cor por tipo)
  - Praga: #DC3545 (vermelho)
  - Doença: #FF6B6B (vermelho claro)
  - Nutrição: #FFC107 (amarelo)
  - Irrigação: #17A2B8 (azul)
- **Border-radius**: 12px
- **Box-shadow**: 0px 2px 8px rgba(0,0,0,0.06)

### Estrutura Interna

**Linha 1 - Ícone + Nome**:
```
🐛 Lagarta-da-soja
```
- **Ícone**: 24x24px (emoji ou SVG)
  - 🐛 Praga
  - 🦠 Doença
  - 🌿 Nutrição
  - 💧 Irrigação
- **Nome**: 
  - Fonte: 17px, weight 700, color #212529
  - Max lines: 1
- **Nome científico** (linha abaixo, opcional):
  - Fonte: 13px, italic, color #6C757D

**Linha 2 - Barra de Severidade**:

**Container**:
- **Margin**: 12px vertical
- **Altura**: 8px
- **Border-radius**: 4px
- **Background**: #E9ECEF

**Fill**:
- **Width**: Baseado em % (85%)
- **Height**: 100%
- **Border-radius**: 4px
- **Colors**:
  - 0-30%: #28A745 (verde - Leve)
  - 31-60%: #FFC107 (amarelo - Moderado)
  - 61-100%: #DC3545 (vermelho - Crítico)
- **Animação**: Width 0 → 85% (0.5s ease-out)

**Label** (inline direita):
- **Texto**: "85% CRÍTICO"
  - Percentual: 15px, weight 700
  - Status: 13px, weight 600, uppercase
  - Color: Mesma da barra

**Linha 3 - Localização**:
- **Ícone**: 📍 (16px)
- **Texto**: "Talhão Norte (45.3 ha)"
  - Fonte: 14px, weight 500
  - Nome da área em bold

**Linha 4 - Timestamp**:
- **Ícone**: 🕐 (16px)
- **Texto**: "Criada há 2 horas"
  - Fonte: 13px, weight 400, color #6C757D
  - Formato relativo

**Linha 5 - Autor**:
- **Ícone**: 👤 (16px) ou avatar pequeno
- **Texto**: "João Silva"
  - Fonte: 13px, weight 500, color #212529

**Separador**: 1px solid #F8F9FA (margin 12px)

**Galeria de Fotos** (se tiver):

**Layout**:
- **Display**: Flex horizontal
- **Gap**: 8px
- **Overflow-x**: Scroll (hide scrollbar)

**Cada foto**:
- **Tamanho**: 64x64px (quadrado)
- **Border-radius**: 8px
- **Object-fit**: Cover
- **Tap**: Abre galeria fullscreen

**Label**:
- **Ícone**: 📸 (14px)
- **Texto**: "[3 fotos]"
  - Fonte: 13px, weight 500, color #0057FF

**Separador**: Margin 12px

**Status do Tratamento**:

**Badge inline**:
- **Ícone**: 💊 Pill (16px)
- **Texto**: Status
  - "Tratamento pendente" (vermelho)
  - "Em tratamento" (amarelo)
  - "Tratamento concluído" (verde)
- **Padding**: 6px 12px
- **Border-radius**: 12px
- **Background**: rgba(cor, 0.1)
- **Border**: 1px solid rgba(cor, 0.3)
- **Fonte**: 13px, weight 600

### Botões de Ação (2 botões)

**Layout**:
- **Margin-top**: 16px
- **Display**: Flex
- **Gap**: 12px

**1) Ver Detalhes ([👁️])**:
- **Largura**: Flex 1
- **Altura**: 40px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid #0057FF
- **Border-radius**: 20px
- **Ícone**: 👁️ Eye (18px, #0057FF)
- **Texto**: "Detalhes"
  - Fonte: 14px, weight 600, color #0057FF
- **Ação**: Abre sheet de detalhes completos

**2) Resolver ([✓])**:
- **Largura**: Flex 1
- **Altura**: 40px
- **Background**: rgba(40, 167, 69, 0.05)
- **Border**: 1px solid #28A745
- **Border-radius**: 20px
- **Ícone**: ✓ Check (18px, #28A745)
- **Texto**: "Resolver"
  - Fonte: 14px, weight 600, color #28A745
- **Ação**: Abre formulário de resolução

## 📱 SHEET "DETALHES DA OCORRÊNCIA"

### Estrutura (altura 90%)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│  Detalhes        [✏️] [🗑️]      │
│                                 │
│  🐛 Lagarta-da-soja             │
│  (Anticarsia gemmatalis)        │
│                                 │
│  ████████░░ 85% CRÍTICO         │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [📸 📸 📸]              │   │ ← Galeria
│  └─────────────────────────┘   │
│                                 │
│  📍 LOCALIZAÇÃO                 │
│  ┌─────────────────────────┐   │
│  │ [Mini mapa com pin]     │   │
│  │ Talhão Norte (45.3 ha)  │   │
│  │ Lat: -18.9188           │   │
│  │ Lng: -48.2766           │   │
│  └─────────────────────────┘   │
│                                 │
│  📅 HISTÓRICO                   │
│  ┌─────────────────────────┐   │
│  │ ● 10/11 14:30           │   │
│  │   Criada por João Silva │   │
│  │                         │   │
│  │ ● 10/11 15:00           │   │
│  │   Foto adicionada       │   │
│  │                         │   │
│  │ ● 10/11 15:30           │   │
│  │   Tratamento recomendado│   │
│  └─────────────────────────┘   │
│                                 │
│  📝 OBSERVAÇÕES                 │
│  Alta infestação detectada      │
│  em bordadura norte...          │
│                                 │
│  💊 TRATAMENTO                  │
│  ┌─────────────────────────┐   │
│  │ Status: EM ANDAMENTO    │   │
│  │                         │   │
│  │ Produto: Lambda-cial... │   │
│  │ Dose: 150ml/ha          │   │
│  │ Aplicação: 11/11 08:00  │   │
│  │ Responsável: Pedro Costa│   │
│  └─────────────────────────┘   │
│                                 │
│  [📝 Adicionar Nota]            │
│  [✓ Marcar como Resolvida]      │
│                                 │
└─────────────────────────────────┘
```

### Header do Sheet

**Botões action** (direita):
- **✏️ Editar**: Abre formulário de edição
- **🗑️ Excluir**: Dialog de confirmação

### Galeria de Fotos (fullwidth)

**Carousel horizontal**:
- **Altura**: 240px
- **Swipe**: Navega entre fotos
- **Indicators**: Dots abaixo (ativo = azul)
- **Zoom**: Pinch to zoom habilitado
- **Fullscreen**: Tap abre viewer

### Mini Mapa (igual Check-in)

**Altura**: 150px
**Pin**: Localização da ocorrência
**Zoom**: 16 (próximo)

### Timeline de Histórico

**Format**: Vertical timeline (igual Cliente)

**Eventos**:
- Criação
- Fotos adicionadas
- Notas adicionadas
- Tratamento iniciado
- Tratamento atualizado
- Resolução

### Card de Tratamento

**Background**: rgba(0, 87, 255, 0.05)
**Border-left**: 4px solid #0057FF
**Padding**: 16px
**Border-radius**: 12px

**Campos**:
- Status (badge)
- Produto aplicado
- Dose
- Data/hora aplicação
- Responsável
- Observações

### Botões Finais (2 botões stack)

**1) Adicionar Nota**:
- **Outline azul**
- **Ação**: Abre textarea em modal
  - Salva nota com timestamp
  - Adiciona ao histórico

**2) Marcar como Resolvida** (se ativa):
- **Primário verde**
- **Ação**: Abre formulário de resolução
  - Solução aplicada (textarea)
  - Data de resolução
  - Custo (opcional)
  - Eficácia (1-5 estrelas)

## ➕ MODAL "NOVA OCORRÊNCIA"

### Estrutura (Sheet 90%)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│  Nova Ocorrência        [X]     │
│                                 │
│  Tipo *                         │
│  [Praga ▼]                      │
│                                 │
│  Nome/Descrição *               │
│  [________________________]     │
│                                 │
│  Severidade (0-100%) *          │
│  ┌─────────────────┐            │
│  │ [====●=====] 85%│            │ ← Slider
│  └─────────────────┘            │
│  🔴 Crítico                     │ ← Label dinâmico
│                                 │
│  Área Afetada *                 │
│  [Talhão Norte ▼]               │
│                                 │
│  📍 Localização                 │
│  [📍 Usar GPS Atual]            │
│  Lat: -18.9188                  │
│  Lng: -48.2766                  │
│                                 │
│  📸 Fotos (0/5)                 │
│  ┌────┬────┬────┐               │
│  │ 📷 │    │    │               │
│  └────┴────┴────┘               │
│                                 │
│  📝 Observações                 │
│  [________________________]     │
│                                 │
│  💊 Tratamento Recomendado      │
│  [________________________]     │
│                                 │
│  [CANCELAR] [CRIAR OCORRÊNCIA]  │
│                                 │
└─────────────────────────────────┘
```

**Campos**: Specs padrão

**Slider de Severidade**:
- **Range**: 0-100%
- **Thumb**: Draggable
- **Colors dinâmicos**:
  - 0-30%: Verde + "Leve"
  - 31-60%: Amarelo + "Moderado"
  - 61-100%: Vermelho + "Crítico"
- **Update em tempo real**: Cor + label mudam

**Botão "CRIAR"**:
1. Valida campos obrigatórios
2. Salva ocorrência
3. Toast: "Ocorrência criada!"
4. Volta para lista
5. Nova ocorrência no topo (destaque)

---

## 🎉 FIM DA ESPECIFICAÇÃO COMPLETA!

### 📊 RESUMO FINAL

**Total de Páginas Especificadas**: 23

**Arquivos Criados**:
1. `/SPEC_DESIGN_DASHBOARD.md` - Dashboard Principal (detalhado)
2. `/SPEC_DESIGN_TODAS_PAGINAS.md` - Páginas 1-10
3. `/SPEC_DESIGN_TODAS_PAGINAS_PARTE2.md` - Páginas 11-12
4. `/SPEC_DESIGN_TODAS_PAGINAS_PARTE3.md` - Páginas 13-15
5. `/SPEC_DESIGN_TODAS_PAGINAS_PARTE4.md` - Páginas 16-17
6. `/SPEC_DESIGN_TODAS_PAGINAS_PARTE5_FINAL.md` - Páginas 18-23

**Detalhamento**:
- ✅ Medidas exatas (px, %, rem)
- ✅ Cores específicas (hex codes)
- ✅ Fontes (tamanho, peso, family)
- ✅ Espaçamentos (margin, padding, gap)
- ✅ Borders e shadows
- ✅ Estados (normal, hover, pressed, disabled)
- ✅ Animações (duração, easing, tipo)
- ✅ Interações (tap, swipe, long-press, drag)
- ✅ Componentes utilizados
- ✅ Ações de cada botão
- ✅ Layouts responsivos (mobile-only)

**Pronto para**: 
- Desenvolvimento Flutter
- Design no Figma
- Desenvolvimento React Native
- Qualquer plataforma mobile

🎯 **Especificação 100% completa e pixel-perfect!**

