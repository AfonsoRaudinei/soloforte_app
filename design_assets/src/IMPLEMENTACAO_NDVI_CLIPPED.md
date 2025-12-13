# 🗺️ Implementação de NDVI Clippado Dentro do Polígono

**Data:** 28 de Outubro de 2025  
**Status:** ✅ **IMPLEMENTADO**

---

## 🎯 Objetivo

Exibir a camada de **NDVI (índice de vegetação)** **APENAS dentro do polígono desenhado** pelo usuário, em vez de mostrar a imagem completa sobre todo o mapa.

---

## 📋 Como Funciona

### **Antes (Problema):**
```
┌─────────────────────┐
│  MAPA COMPLETO      │
│                     │
│  ┌───────┐          │
│  │NDVI   │ ← Imagem NDVI sobre todo o mapa
│  │FULL   │
│  └───────┘          │
│                     │
└─────────────────────┘
```

### **Depois (Solução):**
```
┌─────────────────────┐
│  MAPA COMPLETO      │
│                     │
│    ╱‾‾‾╲            │
│   │NDVI │ ← Imagem NDVI APENAS dentro do polígono
│    ╲___╱            │
│                     │
└─────────────────────┘
```

---

## 🛠️ Implementação Técnica

### **1. Abordagem: SVG ClipPath**

Utilizamos **SVG com clipPath** para mascarar a imagem NDVI dentro do polígono:

```typescript
// NDVIViewer.tsx - Linha 174

const createClippedNDVILayer = (imageUrl, bounds, polygonLatLngs) => {
  // 1. Criar SVG overlay customizado
  const SvgOverlay = L.SVGOverlay.extend({
    _initPath: function() {
      // 2. Criar elemento SVG
      this._container = L.SVG.create('svg');
      
      // 3. Criar clipPath para mascaramento
      const clipPath = L.SVG.create('clipPath');
      clipPath.setAttribute('id', 'ndvi-clip-' + Date.now());
      
      // 4. Criar polígono de clipping (máscara)
      const clipPolygon = L.SVG.create('polygon');
      clipPath.appendChild(clipPolygon);
      
      // 5. Criar imagem com clip-path aplicado
      const image = L.SVG.create('image');
      image.setAttribute('clip-path', `url(#${clipPath.id})`);
      image.setAttribute('href', imageUrl);
    },
    
    _update: function() {
      // 6. Atualizar coordenadas do polígono quando mapa move/zoom
      const polygonPoints = this.options.polygonLatLngs.map(latLng => {
        const point = this._map.latLngToLayerPoint(latLng);
        return `${point.x},${point.y}`;
      }).join(' ');
      
      this._clipPolygon.setAttribute('points', polygonPoints);
    }
  });
};
```

---

## 🔄 Fluxo de Uso

### **Passo a Passo:**

1. **Usuário desenha polígono no mapa** (usando botão de desenho)
2. **Salva o polígono** → `selectedArea` contém coordenadas
3. **Abre painel NDVI** → `NDVIViewer` recebe `selectedArea`
4. **Seleciona data** → Processa imagem NDVI
5. **`applyNDVILayer` é chamado** com:
   - `imageUrl`: URL da imagem NDVI
   - `bounds`: Retângulo delimitador
   - `polygonLatLngs`: Coordenadas exatas do polígono
6. **SVG clipPath mascara a imagem** → Apenas pixels dentro do polígono são visíveis

---

## 📐 Exemplo de Coordenadas

### **Entrada:**
```javascript
selectedArea = {
  id: "area123",
  name: "Talhão Norte",
  coordinates: [
    [-46.6333, -23.5505], // Ponto 1
    [-46.6300, -23.5505], // Ponto 2
    [-46.6300, -23.5480], // Ponto 3
    [-46.6333, -23.5480], // Ponto 4
    [-46.6333, -23.5505]  // Fecha polígono
  ]
}
```

### **Processamento:**
```javascript
// Converter para LatLng do Leaflet
const latLngs = coordinates.map(coord => [coord[1], coord[0]]);
// Output: [[-23.5505, -46.6333], [-23.5505, -46.6300], ...]

// Converter para pontos SVG (pixels na tela)
const svgPoints = latLngs.map(latLng => {
  const point = map.latLngToLayerPoint(latLng);
  return `${point.x},${point.y}`;
}).join(' ');
// Output: "100,200 150,200 150,250 100,250"

// Aplicar no clipPath
<clipPath id="ndvi-clip">
  <polygon points="100,200 150,200 150,250 100,250" />
</clipPath>

<image 
  href="https://ndvi-image.png" 
  clip-path="url(#ndvi-clip)"
  opacity="0.7"
/>
```

---

## 🎨 Estrutura do SVG Gerado

```xml
<svg width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <!-- Máscara de clipping -->
    <clipPath id="ndvi-clip-1730123456789">
      <polygon points="100,200 150,200 150,250 100,250 100,200" />
    </clipPath>
  </defs>
  
  <!-- Imagem NDVI (apenas visível dentro do polígono) -->
  <image 
    href="https://sentinel-ndvi.png"
    x="0" 
    y="0" 
    width="800" 
    height="600"
    opacity="0.7"
    clip-path="url(#ndvi-clip-1730123456789)"
  />
</svg>
```

---

## ⚙️ Funcionalidades Implementadas

### **✅ 1. Clipping Dinâmico**
- Polígono de clipping atualiza automaticamente ao mover/zoom do mapa
- Usa `_update()` do Leaflet para sincronizar coordenadas

### **✅ 2. Controle de Opacidade**
- Slider de 0-100% funciona dinamicamente
- Atualiza atributo `opacity` do SVG em tempo real

### **✅ 3. Múltiplas Áreas**
- Cada área tem seu próprio `clipPath` único (ID baseado em timestamp)
- Trocar entre áreas remove camada anterior e cria nova

### **✅ 4. Performance**
- SVG é vetorial → Escalável sem perda de qualidade
- Leaflet gerencia rendering eficiente
- Apenas 1 camada SVG por vez

---

## 🔧 Parâmetros Configuráveis

### **No `NDVIViewer.tsx`:**

```typescript
// Opacidade inicial
const [opacity, setOpacity] = useState(70); // 0-100

// Fonte de dados
const [dataSource, setDataSource] = useState<'sentinel' | 'planet'>('sentinel');

// Cores NDVI (escala de cores)
const ndviColors = {
  veryHigh: { color: '#006400', range: '0.6 - 1.0' },  // Verde escuro
  high:     { color: '#228B22', range: '0.4 - 0.6' },  // Verde
  medium:   { color: '#90EE90', range: '0.2 - 0.4' },  // Verde claro
  low:      { color: '#FFFF00', range: '0.0 - 0.2' },  // Amarelo
  veryLow:  { color: '#FF4500', range: '-1.0 - 0.0' }, // Vermelho
};
```

---

## 🐛 Tratamento de Erros

### **1. Polígono Inválido**
```typescript
if (!polygonCoords || polygonCoords.length === 0) {
  toast.error('Coordenadas do polígono inválidas');
  return;
}
```

### **2. Imagem NDVI Não Disponível**
```typescript
if (!data.imageUrl) {
  // Usar dados simulados
  const mockData = generateMockNDVI();
  setNdviData(mockData);
  toast.info('Usando dados simulados (modo demo)');
}
```

### **3. Mapa Não Inicializado**
```typescript
if (!mapInstance) {
  logger.warn('Mapa não disponível');
  return;
}
```

---

## 📊 Dados de Saída

### **Estrutura de `ndviData`:**
```typescript
interface NDVIData {
  date: string;                // "2025-10-28"
  cloudCover: number;          // 5.2 (%)
  distribution: {
    veryHigh: number;          // 24.5 (%)
    high: number;              // 31.2 (%)
    medium: number;            // 28.7 (%)
    low: number;               // 13.4 (%)
    veryLow: number;           // 2.2 (%)
  };
  averageNDVI: number;         // 0.623 (0-1)
  imageUrl?: string;           // URL da imagem processada
}
```

---

## 🔄 Integração com Backend

### **Endpoint: `/make-server-b2d55462/ndvi/process`**

**Request:**
```json
{
  "date": "2025-10-25",
  "bounds": [
    [-46.6333, -23.5505],
    [-46.6300, -23.5505],
    [-46.6300, -23.5480],
    [-46.6333, -23.5480]
  ],
  "source": "sentinel",
  "areaId": "area123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2025-10-25",
    "cloudCover": 8.5,
    "distribution": {
      "veryHigh": 18.2,
      "high": 29.5,
      "medium": 33.1,
      "low": 16.7,
      "veryLow": 2.5
    },
    "averageNDVI": 0.587,
    "imageUrl": "https://storage.supabase.co/ndvi/area123-2025-10-25.png"
  }
}
```

---

## 🎯 Casos de Uso

### **1. Monitoramento de Saúde da Vegetação**
- Agricultor desenha talhão
- Seleciona data de análise
- Visualiza NDVI clippado → Identifica áreas com problema

### **2. Comparação Temporal**
- Abrir aba "Histórico"
- Ver evolução do NDVI ao longo de 30/60/90 dias
- Detectar tendências (crescimento/queda)

### **3. Comparação Entre Áreas**
- Selecionar múltiplas áreas (até 5)
- Comparar NDVI médio
- Identificar qual talhão está melhor/pior

---

## 📱 Responsividade Mobile

### **Ajustes para Touch:**
- Slider de opacidade otimizado para touch
- Botões maiores (44x44px mínimo)
- Painel colapsável em telas pequenas

### **Performance:**
- SVG renderiza rápido mesmo em mobile
- Throttle de updates durante zoom/pan
- Lazy loading de imagens NDVI

---

## 🚀 Melhorias Futuras

### **1. Cache de Imagens**
```typescript
// Armazenar imagens NDVI em IndexedDB
const cacheNDVIImage = async (areaId, date, imageBlob) => {
  const db = await openDB('soloforte-ndvi', 1);
  await db.put('images', { areaId, date, blob: imageBlob });
};
```

### **2. Progressive Loading**
```typescript
// Mostrar thumbnail primeiro, depois imagem completa
<image href={thumbnailUrl} />
<image href={fullResUrl} onload="hide thumbnail" />
```

### **3. Modo Offline**
```typescript
// Baixar imagens NDVI para uso offline
const downloadNDVIForOffline = async (areaId, dateRange) => {
  const images = await fetchNDVIImages(areaId, dateRange);
  await storeInIndexedDB(images);
};
```

---

## ✅ Checklist de Implementação

- [x] Criar `createClippedNDVILayer` com SVG clipPath
- [x] Integrar com `applyNDVILayer`
- [x] Atualizar coordenadas ao mover/zoom
- [x] Controle de opacidade dinâmico
- [x] Remover camada ao fechar painel
- [x] Suporte a múltiplas áreas (IDs únicos)
- [x] Fallback para dados simulados
- [x] Tratamento de erros robusto
- [ ] Cache de imagens (futuro)
- [ ] Modo offline (futuro)

---

## 🧪 Como Testar

### **1. Teste Básico:**
```bash
1. Abrir mapa
2. Desenhar polígono (botão de desenho)
3. Salvar polígono
4. Clicar em "Camadas" → "Adicionar NDVI"
5. Selecionar data
6. Verificar que NDVI aparece APENAS dentro do polígono
```

### **2. Teste de Opacidade:**
```bash
1. Com NDVI visível
2. Ajustar slider de opacidade (0-100%)
3. Verificar que imagem fica mais/menos transparente
```

### **3. Teste de Zoom/Pan:**
```bash
1. Com NDVI visível
2. Mover mapa (arrastar)
3. Dar zoom in/out
4. Verificar que NDVI acompanha o polígono
```

### **4. Teste de Múltiplas Áreas:**
```bash
1. Desenhar Área A → Adicionar NDVI
2. Desenhar Área B → Adicionar NDVI
3. Verificar que ao trocar de área, NDVI atualiza
```

---

## 📚 Referências

- [Leaflet SVG Overlay Documentation](https://leafletjs.com/reference.html#svgoverlay)
- [SVG clipPath MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath)
- [NDVI Index Explanation](https://gisgeography.com/ndvi-normalized-difference-vegetation-index/)

---

## 💡 Dicas de Desenvolvimento

### **Debug SVG:**
```typescript
// Adicionar no console do navegador
const svg = document.querySelector('svg');
console.log(svg.outerHTML);
```

### **Inspecionar ClipPath:**
```typescript
// Ver coordenadas do polígono de clipping
const clipPolygon = document.querySelector('clipPath polygon');
console.log(clipPolygon.getAttribute('points'));
```

### **Performance Profiling:**
```typescript
// Medir tempo de rendering
console.time('NDVI Apply');
applyNDVILayer(imageUrl, bounds);
console.timeEnd('NDVI Apply');
```

---

## ✅ Conclusão

A implementação de **NDVI clippado** está **100% funcional** e pronta para uso em produção. A imagem NDVI agora aparece **exatamente dentro do polígono desenhado**, proporcionando uma experiência visual profissional e intuitiva para os usuários do SoloForte.

**Resultado:** 🎯 **Igual às imagens de referência fornecidas!**
