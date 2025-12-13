# 📐 SPEC DE DESIGN - SOLOFORTE (PARTE 3)
## Páginas 13-23 - Continuação Final

> **Plataforma**: Mobile-only (375x812px base)  
> **Cor principal**: #0057FF

---

# 13. ALERTAS CONFIG

### Rota: `/alertas` ou `/configuracoes/alertas`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  ALERTAS                   │
├─────────────────────────────────┤
│                                 │
│  Configure quando e como        │
│  receber notificações           │
│                                 │
│  🌧️ CLIMA                        │
│  ┌─────────────────────────┐   │
│  │ Alerta de Chuva         │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ • Avisar com 6h antes   │   │
│  │ • Mínimo: 10mm          │   │
│  │ ─────────────────────   │   │
│  │ Vento Forte             │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ • Velocidade > 15 km/h  │   │
│  │ ─────────────────────   │   │
│  │ Geada                   │   │
│  │ [🔘 Desativado]         │   │
│  └─────────────────────────┘   │
│                                 │
│  🐛 PRAGAS E DOENÇAS             │
│  ┌─────────────────────────┐   │
│  │ Nova Ocorrência         │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ • Severidade > 60%      │   │
│  │ ─────────────────────   │   │
│  │ Atualização Ocorrência  │   │
│  │ [🔘 Ativado]            │   │
│  └─────────────────────────┘   │
│                                 │
│  👥 EQUIPE                      │
│  ┌─────────────────────────┐   │
│  │ Check-in Realizado      │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ Relatório Compartilhado │   │
│  │ [🔘 Ativado]            │   │
│  └─────────────────────────┘   │
│                                 │
│  📊 DADOS                       │
│  ┌─────────────────────────┐   │
│  │ NDVI Baixo              │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ • Abaixo de 0.5         │   │
│  │ ─────────────────────   │   │
│  │ Resumo Semanal          │   │
│  │ [🔘 Ativado]            │   │
│  │ ─────────────────────   │   │
│  │ • Toda segunda 08:00h   │   │
│  └─────────────────────────┘   │
│                                 │
│  🔕 MODO NÃO PERTURBE           │
│  ┌─────────────────────────┐   │
│  │ [🔘 Desativado]         │   │
│  │ ─────────────────────   │   │
│  │ Horário: 22:00 - 07:00  │   │
│  │ [Configurar]            │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Navega para `/configuracoes`

### Título "ALERTAS"

### Descrição
- **Texto**: "Configure quando e como receber notificações"
- **Padding**: 16px
- **Fonte**: 14px, weight 400, color #6C757D
- **Text-align**: Center
- **Background**: #F8F9FA
- **Margin bottom**: 16px

## 🌧️ SEÇÃO "CLIMA"

### Container Card
- **Margin**: 16px
- **Padding**: 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px

### Header
- **Ícone**: 🌧️ (20x20px)
- **Texto**: "CLIMA"
- **Fonte**: 14px, weight 700, uppercase
- **Margin bottom**: 16px

### Item de Alerta (estrutura padrão)

**Layout**:
```
Alerta de Chuva        [🔘]
─────────────────────
• Avisar com 6h antes
• Mínimo: 10mm
```

**Linha 1 - Título + Toggle**:
- **Display**: Flex space-between
- **Título**: 15px, weight 600, color #212529
- **Toggle**: Specs padrão (48x28px)
- **Padding bottom**: 12px

**Separador**:
- **Border bottom**: 1px solid #F8F9FA
- **Margin bottom**: 8px

**Configurações** (quando ativado):
- **Display**: Lista com bullets
- **Padding left**: 20px
- **Cada item**:
  - **Bullet**: • (12px, color #0057FF)
  - **Texto**: 13px, weight 500, color #6C757D
  - **Margin**: 4px vertical
  - **Tap**: Abre configuração específica

**Espaçamento entre alertas**: 16px

### 3 Alertas de Clima

**1) Alerta de Chuva** (ON):
- Configurações:
  - Antecedência: 6h, 12h, 24h
  - Volume mínimo: 5mm, 10mm, 20mm, 50mm

**2) Vento Forte** (ON):
- Configurações:
  - Velocidade limite: 10, 15, 20, 25 km/h

**3) Geada** (OFF):
- Configurações:
  - Temperatura abaixo de: 0°C, 2°C, 5°C

## 🐛 SEÇÃO "PRAGAS E DOENÇAS"

### Specs do container: Iguais ao Clima

### 2 Alertas

**1) Nova Ocorrência** (ON):
- Configurações:
  - Apenas se severidade > 30%, 60%, 80%
  - Tipos: Todas, Pragas, Doenças, Nutrição

**2) Atualização de Ocorrência** (ON):
- Configurações:
  - Minhas ocorrências
  - Ocorrências que estou seguindo
  - Todas da fazenda

## 👥 SEÇÃO "EQUIPE"

### 2 Alertas

**1) Check-in Realizado** (ON):
- Quando membro da equipe faz check-in
- Notifica: Nome + Local + Horário

**2) Relatório Compartilhado** (ON):
- Quando alguém compartilha relatório comigo
- Mostra: Título + Autor

## 📊 SEÇÃO "DADOS"

### 2 Alertas

**1) NDVI Baixo** (ON):
- Configurações:
  - Limite: < 0.4, < 0.5, < 0.6
  - Frequência: Diária, Semanal

**2) Resumo Semanal** (ON):
- Configurações:
  - Dia: Segunda, Sexta, Domingo
  - Horário: 06:00, 08:00, 10:00
- Conteúdo:
  - Visitas da semana
  - Ocorrências ativas
  - Clima da semana

## 🔕 SEÇÃO "MODO NÃO PERTURBE"

### Container Card
- **Background**: rgba(108, 117, 125, 0.05)
- **Border**: 1px solid rgba(108, 117, 125, 0.2)

### Header
- **Ícone**: 🔕 Bell Off
- **Texto**: "MODO NÃO PERTURBE"

### Toggle principal
- **Label**: "Silenciar notificações"
- **Estado**: OFF (default)

### Configuração de horário

**Display quando toggle ON**:
```
Horário: 22:00 - 07:00
[Configurar]
```

**Botão "Configurar"**:
- **Ação**: Abre time picker (2 campos)
  - Início: 22:00
  - Fim: 07:00
- **Durante esse horário**:
  - Notificações push silenciadas
  - Apenas alertas críticos (configurável)

## ⚙️ MODAL "CONFIGURAR ALERTA"

### Estrutura (Sheet bottom)
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Alerta de Chuva        [X]     │
│                                 │
│  Status                         │
│  [🔘 Ativado]                   │
│                                 │
│  Avisar com antecedência        │
│  ○ 6 horas                      │
│  ● 12 horas                     │
│  ○ 24 horas                     │
│                                 │
│  Volume mínimo                  │
│  ┌─────────────────┐            │
│  │ [====●=====] 10mm│            │ ← Slider
│  └─────────────────┘            │
│  5mm          20mm              │
│                                 │
│  Notificar via                  │
│  ☑ Push notification            │
│  ☑ Email                        │
│  ☐ SMS                          │
│                                 │
│  [SALVAR]                       │
│                                 │
└─────────────────────────────────┘
```

**Sheet**:
- **Altura**: Auto (conteúdo + padding)
- **Max-height**: 80%

**Toggle status**: Padrão

**Radio buttons**: Specs da página Configurações

**Slider**:
- **Largura**: 100%
- **Altura**: 4px (track)
- **Background**: #E9ECEF
- **Preenchimento**: #0057FF (até thumb)
- **Thumb**: 24x24px círculo
  - Background: #FFFFFF
  - Border: 3px solid #0057FF
  - Box-shadow: 0px 2px 8px rgba(0,0,0,0.15)
- **Labels**: Min e Max abaixo do slider
- **Valor atual**: Acima do thumb (floating)

**Checkboxes**: Specs padrão (20x20px)

**Botão Salvar**:
- **Specs**: Botão primário
- **Ação**: Salva + fecha sheet + toast "Alerta configurado"

## 🎭 ANIMAÇÕES

**Expandir configurações**:
- Slide down + fade in (0.2s)

**Toggle**:
- Knob slide (0.3s)

**Slider**:
- Thumb segue dedo (smooth)
- Valor atualiza em tempo real

---

# 14. CHECK-IN/CHECK-OUT

### Rota: `/check-in`

## 📱 LAYOUT COMPLETO (CHECK-IN)

```
┌─────────────────────────────────┐
│  [X]  CHECK-IN                  │
├─────────────────────────────────┤
│                                 │
│  📍 LOCALIZAÇÃO                 │
│  ┌─────────────────────────┐   │
│  │ 📍 Uberlândia, MG       │   │
│  │ Lat: -18.9188           │   │
│  │ Lng: -48.2766           │   │
│  │ Precisão: ±5m           │   │
│  │                         │   │
│  │ [🔄 Atualizar]          │   │
│  └─────────────────────────┘   │
│                                 │
│  👤 CLIENTE                     │
│  ┌─────────────────────────┐   │
│  │ [João Silva ▼]          │   │
│  └─────────────────────────┘   │
│                                 │
│  🏢 FAZENDA                     │
│  ┌─────────────────────────┐   │
│  │ [Fazenda Boa Esperança ▼]│  │
│  └─────────────────────────┘   │
│                                 │
│  📝 MOTIVO DA VISITA            │
│  ┌─────────────────────────┐   │
│  │ ☐ Inspeção de rotina    │   │
│  │ ☐ Aplicação defensivos  │   │
│  │ ☑ Análise de pragas     │   │
│  │ ☐ Coleta de solo        │   │
│  │ ☐ Orientação técnica    │   │
│  │ ☐ Outros:               │   │
│  │   [_________________]   │   │
│  └─────────────────────────┘   │
│                                 │
│  📸 FOTO (opcional)             │
│  ┌─────┐                        │
│  │ 📷  │ [Tirar foto]           │
│  └─────┘                        │
│                                 │
│  💬 OBSERVAÇÕES                 │
│  ┌─────────────────────────┐   │
│  │ [Observações iniciais]  │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  ✓ FAZER CHECK-IN       │   │ ← Azul
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Fechar ([X])
- **Posição**: Top-left
- **Ação**: 
  - Se formulário vazio: Fecha
  - Se preenchido: Dialog "Descartar?"

### Título "CHECK-IN"
- **Fonte**: 18px bold, centro

## 📍 SEÇÃO "LOCALIZAÇÃO"

### Container
- **Margin**: 16px
- **Padding**: 16px
- **Background**: Linear gradient
  - rgba(0, 87, 255, 0.05) → #FFFFFF
- **Border**: 1px solid rgba(0, 87, 255, 0.1)
- **Border-radius**: 12px

### Dados do GPS

**Auto-captura ao abrir tela**

**Loading state**:
```
📍 Obtendo localização...
[Spinner]
```

**Success state**:
```
📍 Uberlândia, MG
Lat: -18.9188
Lng: -48.2766
Precisão: ±5m
```

**Ícone**: 📍 (24x24px, #0057FF)

**Cidade/Estado**:
- **Fonte**: 16px, weight 700, color #212529
- **Margin bottom**: 8px

**Coordenadas**:
- **Fonte**: 13px, weight 500, color #6C757D, monospace
- **Line-height**: 1.6
- **Cada linha**: Label + valor
  - Label: Opac 0.8
  - Valor: Opac 1.0

**Precisão**:
- **Color baseado em qualidade**:
  - < 10m: #28A745 (verde - ótimo)
  - 10-20m: #FFC107 (amarelo - bom)
  - > 20m: #DC3545 (vermelho - ruim)

### Botão "Atualizar"

**Specs**:
- **Margintop**: 12px
- **Largura**: 100%
- **Altura**: 36px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px solid #0057FF
- **Border-radius**: 18px

**Conteúdo**:
- **Ícone**: 🔄 Refresh (16x16px, #0057FF)
- **Texto**: "Atualizar localização"
  - Fonte: 13px, weight 600, color #0057FF

**Estados**:
- **Loading**: Ícone rotaciona
- **Error**: 
  - Ícone: ⚠️
  - Texto: "Erro ao obter GPS"
  - Color: #DC3545

**Ação**: Solicita GPS novamente

## 👤 SEÇÃO "CLIENTE"

### Label
- **Texto**: "CLIENTE"
- **Ícone**: 👤 (18x18px)
- **Fonte**: 13px, weight 700, uppercase, color #212529
- **Margin**: 24px 16px 8px 16px

### Dropdown

**Specs**: Padrão de dropdowns
**Placeholder**: "Selecione o cliente..."

**Dropdown aberto** (sheet bottom):
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Selecione o Cliente            │
│                                 │
│  [🔍 Buscar...]                 │
│                                 │
│  ● João Silva                   │
│    3 fazendas • Uberlândia      │
│  ──────────────────────────     │
│  ○ Maria Santos                 │
│    2 fazendas • Uberaba         │
│  ──────────────────────────     │
│  ○ Pedro Costa                  │
│    1 fazenda • Araguari         │
│                                 │
│  [+ Novo Cliente]               │
│                                 │
└─────────────────────────────────┘
```

**Seleção**:
- **Radio button**: ● ou ○ (20x20px)
- **Nome**: 16px, weight 700
- **Detalhes**: 13px, weight 400, color #6C757D
- **Height**: 64px por item

## 🏢 SEÇÃO "FAZENDA"

### Label + Dropdown
- **Specs**: Iguais ao Cliente

**Comportamento**:
- **Desabilitado** até selecionar cliente
- **Carrega fazendas** do cliente selecionado

**Se cliente tem 1 fazenda**:
- Auto-seleciona

**Se cliente tem múltiplas**:
- Mostra lista para escolher

## 📝 SEÇÃO "MOTIVO DA VISITA"

### Label
- **Texto**: "MOTIVO DA VISITA"
- **Ícone**: 📝
- **Specs**: Padrão

### Lista de Checkboxes (6 opções)

**Container**:
- **Margin**: 16px
- **Padding**: 12px
- **Background**: #F8F9FA
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px

**Cada checkbox**:
```
☑ Análise de pragas
```

**Layout**:
- **Display**: Flex
- **Align-items**: Center
- **Padding**: 10px 0
- **Border-bottom**: 1px solid #FFFFFF (exceto último)

**Checkbox**:
- **Tamanho**: 20x20px
- **Border-radius**: 4px
- **Margin-right**: 12px
- **Specs**: Padrão

**Label**:
- **Fonte**: 15px, weight 500, color #212529

**6 Opções predefinidas**:
1. Inspeção de rotina
2. Aplicação de defensivos
3. Análise de pragas ✓
4. Coleta de solo
5. Orientação técnica
6. Outros (com input)

### Campo "Outros"

**Quando checkbox marcado**:
- **Revela input** (slide down)
- **Placeholder**: "Descreva o motivo..."
- **Max-length**: 100 caracteres

## 📸 SEÇÃO "FOTO"

### Label
- **Texto**: "FOTO (opcional)"
- **Ícone**: 📸

### Botão "Tirar foto"

**Sem foto**:
```
┌─────┐
│ 📷  │ Tirar foto
└─────┘
```
- **Display**: Inline-flex
- **Align-items**: Center
- **Gap**: 12px
- **Padding**: 12px 16px
- **Background**: rgba(0, 87, 255, 0.05)
- **Border**: 1px dashed #0057FF
- **Border-radius**: 12px

**Com foto**:
```
┌────────┐
│ [🖼️]  │ [X]
└────────┘
```
- **Thumbnail**: 80x80px quadrado
- **Border-radius**: 8px
- **Object-fit**: Cover
- **Botão X**: Remove foto (specs padrão)

**Ação**: 
- Actionsheet (Câmera / Galeria)

## 💬 SEÇÃO "OBSERVAÇÕES"

### Label
- **Texto**: "OBSERVAÇÕES"
- **Ícone**: 💬

### Textarea
- **Min-height**: 100px
- **Max-height**: 200px (scroll)
- **Placeholder**: "Observações iniciais da visita..."
- **Specs**: Padrão de inputs

## ✓ BOTÃO "FAZER CHECK-IN"

### Specs
- **Margin**: 24px 16px 40px 16px
- **Largura**: Calc(100% - 32px)
- **Altura**: 56px
- **Background**: #0057FF
- **Border-radius**: 28px
- **Box-shadow**: 0px 4px 16px rgba(0, 87, 255, 0.3)

**Conteúdo**:
- **Ícone**: ✓ Check (22x22px, branco)
- **Texto**: "FAZER CHECK-IN"
  - Fonte: 16px, weight 700, color #FFFFFF

**Estados**:
- **Disabled** (campos obrigatórios vazios):
  - Background: #ADB5BD
  - Sem shadow
- **Loading**:
  - Spinner branco
  - Texto: "FAZENDO CHECK-IN..."

**Ação**:
1. Valida campos obrigatórios
2. Salva dados
3. Inicia cronômetro
4. Transiciona para tela "CHECK-IN ATIVO"

## 📱 TELA "CHECK-IN ATIVO"

### Layout
```
┌─────────────────────────────────┐
│  ✅ CHECK-IN ATIVO              │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ [👤 Avatar]             │   │
│  │                         │   │
│  │ 👤 João Silva           │   │
│  │ 🏢 Fazenda Boa Esperança│   │
│  │                         │   │
│  │ 🕐 Iniciado: 10:30      │   │
│  │                         │   │
│  │    ⏱️ 01:45:23          │   │ ← Cronômetro
│  │                         │   │
│  │ 📍 Localização atual:   │   │
│  │    Talhão Norte         │   │
│  │    [Atualizar GPS]      │   │
│  └─────────────────────────┘   │
│                                 │
│  📌 AÇÕES RÁPIDAS               │
│  ┌───────┬───────┬───────┐     │
│  │  📸   │  📝   │  🗺️   │     │
│  │ Foto  │ Nota  │ Mapa  │     │
│  └───────┴───────┴───────┘     │
│                                 │
│  📋 ATIVIDADES (3)              │
│  ┌─────────────────────────┐   │
│  │ 🕐 11:15                │   │
│  │ 📸 Foto da lavoura      │   │
│  │ [Ver]                   │   │
│  ├─────────────────────────┤   │
│  │ 🕐 11:30                │   │
│  │ 📝 Observação: Área...  │   │
│  │ [Ver]                   │   │
│  ├─────────────────────────┤   │
│  │ 🕐 12:00                │   │
│  │ 📌 Ocorrência criada    │   │
│  │ [Ver]                   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  🏁 FAZER CHECK-OUT     │   │ ← Verde
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## ✅ CARD DE CHECK-IN ATIVO

### Container
- **Margin**: 16px
- **Padding**: 20px
- **Background**: Linear gradient
  - rgba(40, 167, 69, 0.05) → #FFFFFF (verde suave)
- **Border**: 2px solid #28A745
- **Border-radius**: 16px
- **Box-shadow**: 0px 4px 12px rgba(40, 167, 69, 0.1)

### Avatar/Ícone
- **Tamanho**: 48x48px (círculo)
- **Background**: #28A745
- **Ícone**: ✓ Check branco (28x28px)
- **Margin-bottom**: 16px

### Informações

**Linha 1 - Cliente**:
- **Ícone**: 👤 (16px)
- **Texto**: "João Silva"
  - 15px, weight 700, color #212529

**Linha 2 - Fazenda**:
- **Ícone**: 🏢 (16px)
- **Texto**: "Fazenda Boa Esperança"
  - 14px, weight 600

**Separador**: 1px solid #E9ECEF (margin 12px)

**Linha 3 - Hora início**:
- **Ícone**: 🕐 (16px)
- **Texto**: "Iniciado: 10:30"
  - 14px, weight 500, color #6C757D

### ⏱️ CRONÔMETRO (destaque)

**Posicionamento**:
- **Margin**: 16px vertical
- **Centralizado**: Horizontal

**Tempo**:
- **Formato**: HH:MM:SS (01:45:23)
- **Fonte**: 
  - Size: 40px
  - Weight: 800
  - Color: #28A745
  - Font-family: Monospace
  - Letter-spacing: 2px

**Animação**:
- Atualiza a cada 1 segundo
- Transition suave nos números

**Background subtle**:
- Rounded rect atrás
- Background: rgba(40, 167, 69, 0.05)
- Padding: 8px 16px
- Border-radius: 8px

### Localização atual

**Label**:
- **Texto**: "Localização atual:"
- **Ícone**: 📍 (16px)
- **Margin-top**: 12px

**Área**:
- **Texto**: "Talhão Norte" (detectado via GPS)
- **Fonte**: 15px, weight 600, color #212529
- **Margin-bottom**: 8px

**Botão "Atualizar GPS"**:
- **Specs**: Botão secundário pequeno
- **Altura**: 32px
- **Ação**: Atualiza coordenadas

## 📌 AÇÕES RÁPIDAS (3 botões)

### Container
- **Margin**: 24px 16px
- **Padding**: 0

### Header
- **Ícone**: 📌
- **Texto**: "AÇÕES RÁPIDAS"
- **Margin-bottom**: 12px

### Grid de 3 botões

**Layout**:
- **Display**: Grid 3 colunas iguais
- **Gap**: 12px

**Cada botão**:
```
┌───────┐
│  📸   │
│ Foto  │
└───────┘
```

**Dimensões**:
- **Largura**: (100% - 24px) / 3
- **Altura**: 80px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px
- **Display**: Flex column
- **Align-items**: Center
- **Justify-content**: Center
- **Gap**: 8px

**Ícone**:
- **Tamanho**: 32x32px
- **Color**: #0057FF

**Label**:
- **Fonte**: 13px, weight 600, color #212529

**Estados**:
- **Hover/Press**: 
  - Border: #0057FF
  - Background: rgba(0, 87, 255, 0.02)
  - Transform: scale(0.95)

### 3 Ações

**1) 📸 Foto**:
- **Ação**: Abre câmera
- **Salva**: Anexa à visita com timestamp

**2) 📝 Nota**:
- **Ação**: Abre textarea em sheet
- **Salva**: Adiciona à timeline com timestamp

**3) 🗺️ Mapa**:
- **Ação**: Navega para Dashboard
- **Zoom**: Nas áreas do cliente
- **Mantém**: Check-in ativo

## 📋 TIMELINE DE ATIVIDADES

### Header
- **Ícone**: 📋
- **Texto**: "ATIVIDADES (3)"
  - Contador: Total de ações registradas
- **Margin**: 24px 16px 12px

### Lista Vertical

**Container**:
- **Margin**: 0 16px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px
- **Overflow**: Hidden

**Cada item**:
```
┌─────────────────────────┐
│ 🕐 11:15                │
│ 📸 Foto da lavoura      │
│ [Ver]                   │
└─────────────────────────┘
```

**Layout**:
- **Padding**: 12px 16px
- **Border-bottom**: 1px solid #F8F9FA (exceto último)

**Linha 1 - Timestamp**:
- **Ícone**: 🕐 (14px)
- **Texto**: "11:15" (HH:MM)
  - Fonte: 12px, weight 600, color #6C757D

**Linha 2 - Ação**:
- **Ícone por tipo**:
  - 📸 Foto
  - 📝 Nota
  - 📌 Ocorrência
  - 📄 Relatório
  - 🗺️ Localização
- **Texto**: Descrição (max 40 chars + ellipsis)
  - Fonte: 14px, weight 500, color #212529

**Linha 3 - Botão Ver**:
- **Specs**: Link azul (13px)
- **Ação**: Abre detalhes (modal ou navega)

**Ordenação**: Mais recente primeiro (topo)

## 🏁 BOTÃO "FAZER CHECK-OUT"

### Specs
- **Margin**: 24px 16px 40px
- **Largura**: Calc(100% - 32px)
- **Altura**: 56px
- **Background**: #28A745 (verde)
- **Border-radius**: 28px
- **Box-shadow**: 0px 4px 16px rgba(40, 167, 69, 0.3)

**Conteúdo**:
- **Ícone**: 🏁 Flag (22px, branco)
- **Texto**: "FAZER CHECK-OUT"
  - Fonte: 16px, weight 700, color #FFFFFF

**Ação**:
1. Para cronômetro
2. Captura dados finais:
   - Hora de saída
   - Duração total
   - Localização de saída
3. Abre sheet "Finalizar Visita"

## 📋 SHEET "FINALIZAR VISITA"

### Estrutura
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Finalizar Visita       [X]     │
│                                 │
│  ⏱️ Duração: 01:45:23           │
│                                 │
│  Observações Finais             │
│  ┌─────────────────────────┐   │
│  │ [Como foi a visita?]    │   │
│  │                         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  Próximos Passos (opcional)     │
│  ┌─────────────────────────┐   │
│  │ [O que fazer depois?]   │   │
│  └─────────────────────────┘   │
│                                 │
│  Criar Relatório?               │
│  ☑ Sim, criar automaticamente   │
│  ○ Não, apenas registrar        │
│                                 │
│  ┌─────────────────────────┐   │
│  │  ✓ CONCLUIR CHECK-OUT   │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Campos**:
- Observações finais (textarea)
- Próximos passos (textarea opcional)
- Checkbox criar relatório (checked default)

**Botão "CONCLUIR CHECK-OUT"**:
1. Salva dados
2. Se checkbox marcado: Abre `/relatorios/novo` com dados pre-preenchidos
3. Se não: Toast "Check-out realizado" + volta ao Dashboard
4. Notifica: Cliente e equipe (se configurado)

## 🎭 ANIMAÇÕES

**Cronômetro**:
- Flip animation nos dígitos (opcional)
- Pulse sutil a cada segundo

**Ações rápidas**:
- Scale down ao pressionar

**Timeline**:
- Novos itens: Slide in from top

**Botões**:
- Gradiente animado (shimmer opcional)

---

# 15. RADAR CLIMA

### Rota: `/radar-clima`

## 📱 LAYOUT COMPLETO

```
┌─────────────────────────────────┐
│  [←]  RADAR DE CHUVA    [⚙️]    │
├─────────────────────────────────┤
│                                 │
│  ╔═══════════════════════════╗  │
│  ║                           ║  │
│  ║                           ║  │
│  ║                           ║  │
│  ║     MAPA COM RADAR        ║  │
│  ║                           ║  │
│  ║  [Overlay de intensidade] ║  │
│  ║                           ║  │
│  ║  Verde → Amarelo → Vermelho║ │
│  ║                           ║  │
│  ║                           ║  │
│  ║  [📍] Minha Localização   ║  │
│  ║  [🎚️] Opacidade           ║  │
│  ║                           ║  │
│  ╚═══════════════════════════╝  │
│                                 │
│  ⏯️ ANIMAÇÃO                     │
│  ┌─────────────────────────┐   │
│  │ [◀◀] [▶️] [▶▶] [🔄]     │   │
│  │ ━━●━━━━━━━━━━━           │   │ ← Timeline
│  │ Agora  +30min  +1h  +2h  │   │
│  └─────────────────────────┘   │
│                                 │
│  🌧️ PREVISÃO                    │
│  ┌─────────────────────────┐   │
│  │ 14:00 - 15:00           │   │
│  │ 💧 Chuva leve (2mm/h)   │   │
│  │ ─────────────────────   │   │
│  │ 15:00 - 16:00           │   │
│  │ 🌧️ Chuva moderada(8mm/h)│  │
│  │ ─────────────────────   │   │
│  │ 16:00 - 17:00           │   │
│  │ ⛈️ Chuva forte (15mm/h) │   │
│  └─────────────────────────┘   │
│                                 │
│  📊 LEGENDA                     │
│  ┌─────────────────────────┐   │
│  │ [🟢] 0-2mm/h Leve       │   │
│  │ [🟡] 2-10mm/h Moderada  │   │
│  │ [🟠] 10-20mm/h Forte    │   │
│  │ [🔴] >20mm/h Intensa    │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│ [🏠] [🗺️] [📊] [👥] [⚙️]       │
└─────────────────────────────────┘
```

## 🔝 HEADER

### Botão Voltar
- **Ação**: Navega para `/clima`

### Título "RADAR DE CHUVA"

### Botão Configurações ([⚙️])
- **Posição**: Top-right
- **Ação**: Abre sheet de configs

## 🗺️ MAPA COM RADAR (fullscreen)

### Container
- **Altura**: 50vh (metade da tela)
- **Largura**: 100%
- **Posição**: Edge-to-edge (sem padding)

### Mapa Base
- **Provider**: MapTiler ou OpenWeatherMap
- **Estilo**: Streets ou Satélite (configurável)
- **Zoom**: 10 (visão regional)
- **Centro**: GPS do usuário

### Overlay de Radar

**Camada de intensidade de chuva**:
- **Tiles**: Atualizados a cada 5-10 min
- **Opacidade**: 0.6 (configurável via slider)

**Cores por intensidade**:
- **0-2 mm/h**: 🟢 Verde (#28A745, opacity 0.4)
- **2-10 mm/h**: 🟡 Amarelo (#FFC107, opacity 0.6)
- **10-20 mm/h**: 🟠 Laranja (#FF8800, opacity 0.7)
- **>20 mm/h**: 🔴 Vermelho (#DC3545, opacity 0.8)

**Animação da chuva**:
- Movement loop (3-5s)
- Direção: Baseada no vento
- Smooth transition entre frames

### Controles no Mapa

**Botão GPS** ([📍]):
- **Posição**: Top-right, 16px
- **Specs**: Padrão (40x40px círculo)
- **Ação**: Centraliza no usuário

**Slider Opacidade** ([🎚️]):
- **Posição**: Bottom-left, 16px
- **Orientação**: Vertical
- **Altura**: 100px
- **Largura**: 40px
- **Background**: rgba(255, 255, 255, 0.9)
- **Border-radius**: 20px
- **Padding**: 8px

**Estrutura**:
```
┌──┐
│  │ ← Mais opaco
│●─│ ← Thumb
│  │
│  │ ← Mais transparente
└──┘
```

**Range**: 0.3 - 0.9 (30% - 90% opacidade)

## ⏯️ CONTROLES DE ANIMAÇÃO

### Container
- **Margin**: 16px
- **Padding**: 12px
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px

### Linha 1 - Botões de Controle

**Layout**:
- **Display**: Flex
- **Justify-content**: Center
- **Gap**: 16px

**4 Botões**:

**1) Voltar Rápido ([◀◀])**:
- **Tamanho**: 40x40px
- **Border-radius**: 20px
- **Background**: rgba(0, 87, 255, 0.05)
- **Ícone**: ◀◀ SkipBack (20px, #0057FF)
- **Ação**: -30 minutos

**2) Play/Pause ([▶️] ou [⏸️])**:
- **Tamanho**: 48x48px (maior, destaque)
- **Background**: #0057FF
- **Ícone**: ▶️ ou ⏸️ (24px, branco)
- **Ação**: Anima timeline automaticamente

**3) Avançar Rápido ([▶▶])**:
- **Specs**: Iguais ao Voltar
- **Ícone**: ▶▶ SkipForward
- **Ação**: +30 minutos

**4) Loop ([🔄])**:
- **Specs**: Iguais aos laterais
- **Ícone**: 🔄 Repeat
- **Estado ativo**: Background azul, ícone branco
- **Ação**: Toggle loop automático

### Linha 2 - Timeline Scrubber

**Margin-top**: 16px

**Track**:
- **Largura**: 100%
- **Altura**: 4px
- **Background**: #E9ECEF
- **Border-radius**: 2px

**Thumb** (●):
- **Tamanho**: 16x16px (círculo)
- **Background**: #0057FF
- **Box-shadow**: 0px 2px 8px rgba(0, 87, 255, 0.4)
- **Draggable**: Sim

**Marcadores** (abaixo):
```
Agora  +30min  +1h  +2h
```
- **Posições**: 0%, 25%, 50%, 100%
- **Fonte**: 11px, weight 600, color #6C757D

**Comportamento**:
- **Drag**: Move thumb + atualiza radar
- **Tap**: Pula para posição
- **Auto-play**: Move thumb suavemente (2s por step)

## 🌧️ PREVISÃO POR HORA

### Container
- **Margin**: 16px
- **Padding**: 0
- **Background**: #FFFFFF
- **Border**: 1px solid #E9ECEF
- **Border-radius**: 12px
- **Overflow**: Hidden

### Header
- **Padding**: 12px 16px
- **Background**: #F8F9FA
- **Border-bottom**: 1px solid #E9ECEF

**Ícone + Texto**:
- **Ícone**: 🌧️ (18px)
- **Texto**: "PREVISÃO"
  - Fonte: 14px, weight 700, uppercase

### Lista de Horas (próximas 6 horas)

**Cada item**:
```
┌─────────────────────────┐
│ 14:00 - 15:00           │
│ 💧 Chuva leve (2mm/h)   │
└─────────────────────────┘
```

**Layout**:
- **Padding**: 12px 16px
- **Border-bottom**: 1px solid #F8F9FA (exceto último)

**Linha 1 - Horário**:
- **Formato**: "HH:MM - HH:MM"
- **Fonte**: 15px, weight 700, color #212529

**Linha 2 - Intensidade**:
- **Ícone por nível**:
  - 💧 Leve (verde)
  - 🌧️ Moderada (amarelo)
  - ⛈️ Forte/Intensa (vermelho)
- **Texto**: "Chuva [nível] (Xmm/h)"
  - Fonte: 14px, weight 500
  - Color: Verde/Amarelo/Vermelho

**Destaque** (hora atual):
- **Background**: rgba(0, 87, 255, 0.05)
- **Border-left**: 3px solid #0057FF

## 📊 LEGENDA

### Container
- **Margin**: 16px
- **Padding**: 16px
- **Background**: #F8F9FA
- **Border-radius**: 12px

### Header
- **Ícone**: 📊
- **Texto**: "LEGENDA"
- **Margin-bottom**: 12px

### Lista de 4 níveis

**Cada item**:
```
[🟢] 0-2mm/h Leve
```

**Layout**:
- **Display**: Flex
- **Align-items**: Center
- **Gap**: 12px
- **Margin**: 6px 0

**Cor indicator**:
- **Tamanho**: 24x24px (círculo)
- **Border**: 2px solid (mesma cor, mais escura)
- **Box-shadow**: 0px 2px 4px rgba(0,0,0,0.1)

**Texto**:
- **Range**: Bold (14px)
- **Descrição**: Regular (14px)

**4 Níveis**:
1. 🟢 0-2mm/h - Leve
2. 🟡 2-10mm/h - Moderada
3. 🟠 10-20mm/h - Forte
4. 🔴 >20mm/h - Intensa

## ⚙️ SHEET "CONFIGURAÇÕES DO RADAR"

### Estrutura
```
┌─────────────────────────────────┐
│      ─── (handle)               │
│                                 │
│  Configurações          [X]     │
│                                 │
│  Estilo do Mapa                 │
│  ○ Ruas                         │
│  ● Satélite                     │
│  ○ Terreno                      │
│                                 │
│  Opacidade do Radar             │
│  ┌─────────────────┐            │
│  │ [====●=====] 60%│            │
│  └─────────────────┘            │
│                                 │
│  Velocidade Animação            │
│  ○ Lenta (3s/frame)             │
│  ● Normal (2s/frame)            │
│  ○ Rápida (1s/frame)            │
│                                 │
│  Atualização Automática         │
│  [🔘 Ativado]                   │
│  A cada 5 minutos               │
│                                 │
│  [APLICAR]                      │
│                                 │
└─────────────────────────────────┘
```

## 🎭 ANIMAÇÕES

**Radar overlay**:
- **Movimento**: Translateanimation (direção do vento)
- **Loop**: 3-5s por ciclo
- **Framerate**: 10-15 fps (smooth)

**Timeline auto-play**:
- **Thumb**: Move 1px por frame (60fps)
- **Smooth**: Cubic-bezier easing

**Controles**:
- **Buttons**: Scale(0.95) ao pressionar
- **Play/Pause**: Rotate icon transition

**Previsão**:
- **Hora atual**: Pulse animation (sutil)

---

Continuo com as páginas 16-23?

