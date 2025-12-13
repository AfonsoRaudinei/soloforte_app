# 📣 Guia do Módulo Marketing - SoloForte

## 📋 Visão Geral

O **Módulo Marketing** é uma ferramenta premium para gerenciar ações de campo, campanhas visuais e análises georreferenciadas no setor agro-tech. 

### Principais Funcionalidades

✅ **Fotos Georreferenciadas**: Adicione fotos de ações de marketing com localização GPS automática  
✅ **Coleções/Campanhas**: Organize fotos em campanhas temáticas com cores personalizadas  
✅ **Métricas de Alcance**: Visualize o impacto de cada ação (visualizações, compartilhamentos)  
✅ **Mapa Interativo**: Veja todas as ações plotadas em mapa satelital  
✅ **Fototeca**: Biblioteca completa de todas as fotos de marketing  
✅ **Análise Visual**: Avalie resultados georreferenciados de campanhas promocionais  

---

## 🎯 Casos de Uso

### 1. **Demonstração de Produtos em Campo**
- Tire fotos durante apresentações de fertilizantes, sementes, maquinário
- Marque automaticamente a localização GPS
- Associe à campanha específica (ex: "Lançamento Primavera 2025")
- Monitore o alcance e engajamento

### 2. **Eventos e Feiras Agro-Tech**
- Documente participação em feiras e eventos
- Registre área de cobertura geográfica
- Acompanhe métricas de impacto (visitantes, interesse)
- Crie relatórios visuais georreferenciados

### 3. **Workshops e Treinamentos Regionais**
- Fotografe workshops com produtores
- Mapeie regiões de atuação
- Analise distribuição geográfica de ações educacionais
- Identifique gaps de cobertura

### 4. **Campanhas de Marketing Territorial**
- Planeje cobertura regional de campanhas
- Visualize densidade de ações por área
- Otimize distribuição de recursos de marketing
- Gere insights baseados em localização

---

## 🗺️ Interface do Módulo

### Tela Principal

```
┌─────────────────────────────────────┐
│  ← [Voltar]              📍  [3D]   │  ← Controles superiores
│                                     │
│                                     │
│         🗺️ MAPA SATELITAL          │
│                                     │
│    📷     📷                         │  ← Pins com fotos
│      1.980   981                    │  ← Contadores de alcance
│                                     │
│           📷                         │
│          3.456                      │
│                                     │
│─────────────────────────────────────│
│  📸 Fototeca  |  📁 Coleções  | 🔍  │  ← Barra inferior
└─────────────────────────────────────┘
                    [+]  ← FAB (adicionar foto)
```

### Elementos da Interface

#### 1. **Mapa Satelital Fullscreen**
- Visualização satelital em alta resolução
- Zoom e pan livres
- Pins de fotos com miniaturas

#### 2. **Pins de Marketing**
- Miniatura da foto (80x80px)
- Borda colorida por coleção/campanha
- Contador de alcance na parte inferior
- Seta apontando para baixo (estilo balão)

#### 3. **Barra de Navegação Inferior**
- **Fototeca**: Adicionar novas fotos
- **Coleções**: Ver campanhas organizadas
- **Busca**: Filtrar fotos e campanhas

#### 4. **FAB (Floating Action Button)**
- Azul (#0057FF)
- Ícone de "+"
- Abre câmera para captura

---

## 📸 Fluxo de Adicionar Foto

### 1. Clicar no FAB (+)
```
[+] → Abre Câmera
```

### 2. Capturar Foto
```
📷 Tirar Foto → Preview
```

### 3. Preencher Formulário
```
┌─────────────────────────────┐
│ 📷 Nova Foto de Marketing   │
├─────────────────────────────┤
│ [Preview da Foto]           │
│                             │
│ Título: *                   │
│ └─ Demonstração de Produto  │
│                             │
│ Coleção/Campanha: *         │
│ └─ ⚫ Campanha Primavera     │
│                             │
│ Descrição:                  │
│ └─ Apresentação nova linha  │
│                             │
│ 📍 Localização: Automática  │
│                             │
│ [Cancelar]  [Salvar]        │
└─────────────────────────────┘
```

### 4. Salvamento
- GPS captura lat/lng automático
- Foto adicionada ao mapa
- Pin criado com borda da cor da coleção
- Alcance inicial = 0

---

## 📊 Visualizar Pin Existente

### Clicar em Pin no Mapa

```
┌─────────────────────────────┐
│ 📷 Demonstração de Produto  │
├─────────────────────────────┤
│ [Foto Grande]               │
│                             │
│ ┌───────┐  ┌───────┐        │
│ │ 👁️ 1.980│  │ 🔗  238│        │
│ │ Alcance│  │Compart│        │
│ └───────┘  └───────┘        │
│                             │
│ 📁 Campanha Primavera 2025  │
│ 📅 20/10/2025               │
│                             │
│ Apresentação da nova linha  │
│ de fertilizantes orgânicos  │
│                             │
│ [Compartilhar]  [❌]         │
└─────────────────────────────┘
```

### Métricas Disponíveis
- **Alcance**: Total de visualizações
- **Compartilhamentos**: Quantas vezes foi compartilhada
- **Data**: Quando foi criada
- **Localização**: GPS exato

---

## 🎨 Coleções/Campanhas

### Estrutura de Coleção

```typescript
interface Collection {
  id: string;
  name: string;           // "Campanha Primavera 2025"
  color: string;          // "#0057FF" (cor da borda dos pins)
  pins: string[];         // IDs das fotos
  createdAt: string;      // Data de criação
}
```

### Exemplos de Coleções Demo

1. **Campanha Primavera 2025** 🔵 (Azul #0057FF)
   - 2 fotos
   - Foco: Lançamento de produtos

2. **Workshop Regional** 🟢 (Verde #10b981)
   - 2 fotos
   - Foco: Educação e capacitação

3. **Feira AgroTech** 🟡 (Amarelo #f59e0b)
   - 1 foto
   - Foco: Eventos e networking

---

## 🔧 Implementação Técnica

### Componente Principal
```typescript
/components/Marketing.tsx
```

### Estados Principais
```typescript
const [pins, setPins] = useState<MarketingPin[]>([]);
const [collections, setCollections] = useState<Collection[]>([]);
const [activeTab, setActiveTab] = useState<'fototeca' | 'colecoes'>('colecoes');
const [selectedPin, setSelectedPin] = useState<MarketingPin | null>(null);
const [userLocation, setUserLocation] = useState<{lat, lng} | null>(null);
```

### Tipos de Dados
```typescript
interface MarketingPin {
  id: string;
  lat: number;
  lng: number;
  photo: string;
  reach: number;           // Alcance/visualizações
  collectionId: string;
  date: string;
  title: string;
  description: string;
}
```

### Integração com Mapa
- **MapTilerComponent**: Mapa satelital de fundo
- **Leaflet Markers**: Pins customizados com HTML
- **GPS**: navigator.geolocation.getCurrentPosition()
- **Câmera**: CameraCapture component

---

## 📱 UX/UI - Detalhes

### Cores por Coleção
As coleções têm cores personalizadas que aparecem:
- **Borda dos pins** no mapa
- **Indicador** na lista de coleções
- **Badge** nos detalhes da foto

### Responsividade
- **100% Mobile-Only**: Bloqueado em desktop (≥768px)
- **Touch-optimized**: Botões grandes (44px min)
- **Thumb-friendly**: Controles na parte inferior

### Animações
- **Pins**: Leve pulse ao passar o mouse (desktop preview)
- **FAB**: Scale on tap (active:scale-95)
- **Modal**: Slide up animation (sheet)

---

## 🚀 Próximas Evoluções

### Fase 2 - Analytics Avançado
- [ ] Heatmap de densidade de ações
- [ ] Gráficos de alcance por região
- [ ] ROI de campanhas por área
- [ ] Exportação de relatórios PDF

### Fase 3 - Colaboração
- [ ] Compartilhar coleções com equipe
- [ ] Comentários em fotos
- [ ] Tags e categorias
- [ ] Aprovação de conteúdo

### Fase 4 - IA e Automação
- [ ] Reconhecimento de imagem (produtos, pessoas)
- [ ] Sugestão automática de coleções
- [ ] Previsão de alcance
- [ ] Otimização de cobertura geográfica

---

## 📊 Métricas e KPIs

### Indicadores Principais
1. **Total de Ações**: Número de fotos/pins
2. **Alcance Total**: Soma de visualizações
3. **Cobertura Geográfica**: km² de área coberta
4. **Campanhas Ativas**: Número de coleções
5. **Taxa de Engajamento**: Compartilhamentos / Alcance

### Cálculos
```typescript
// Alcance total
const totalReach = pins.reduce((sum, pin) => sum + pin.reach, 0);

// Compartilhamentos (12% do alcance)
const shares = Math.floor(pin.reach * 0.12);

// Densidade por região
const density = pins.length / areaKm2;
```

---

## 🎓 Tutoriais Rápidos

### Como Adicionar uma Ação de Marketing?
1. Abra o módulo Marketing
2. Clique no botão **+** (azul, canto inferior direito)
3. Tire uma foto com a câmera
4. Preencha título e escolha a campanha
5. Clique em **Salvar**
6. O pin aparecerá automaticamente no mapa!

### Como Visualizar uma Ação?
1. Clique em qualquer pin no mapa
2. Veja a foto em tamanho grande
3. Confira métricas de alcance
4. Compartilhe ou delete

### Como Organizar em Coleções?
1. Ao adicionar foto, escolha a coleção
2. Pins da mesma coleção terão a mesma cor de borda
3. Use "Coleções" na barra inferior para ver agrupadas

---

## 🔐 Segurança e Privacidade

### Dados Armazenados
- **Fotos**: Base64 ou URLs (Capacitor Camera)
- **GPS**: Lat/lng no momento da captura
- **Métricas**: Calculadas localmente (demo)

### LGPD Compliance
- ⚠️ **Não coletar PII** em fotos sem consentimento
- ✅ **GPS**: Apenas de locais públicos (eventos, campos)
- ✅ **Fotos**: Foco em produtos e cenários, não pessoas

### Boas Práticas
- Obtenha consentimento antes de fotografar pessoas
- Evite dados sensíveis em descrições
- Use apenas para fins profissionais (B2B)

---

## 📞 Suporte

### Problemas Comuns

**❌ GPS não funciona**
- Verifique permissões de localização
- Use em ambiente externo (sinal GPS)
- Aguarde alguns segundos para precisão

**❌ Câmera não abre**
- Verifique permissões de câmera
- Reinicie o app
- Teste em outro navegador

**❌ Pin não aparece no mapa**
- Aguarde carregamento do mapa
- Verifique se está na área visualizada
- Dê zoom out para ver todos os pins

---

## 🎯 Conclusão

O **Módulo Marketing** transforma a complexidade de gerenciar campanhas de campo em decisões visuais simples e produtivas. Com georreferenciamento automático, métricas de impacto e organização por coleções, você tem total controle sobre suas ações promocionais no agro-tech.

**🌱 Transformando Marketing de Campo em Insights Geográficos!**
