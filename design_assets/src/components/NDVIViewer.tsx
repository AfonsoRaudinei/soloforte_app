import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { X, Calendar, Layers, Info, Download, TrendingUp, TrendingDown, Leaf, AlertTriangle, BarChart3, Clock, GitCompare, Printer, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { fetchWithAuth } from '../utils/supabase/client';
import { logger } from '../utils/logger';
import { STORAGE_KEYS } from '../utils/constants';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { 
  NDVIData, 
  HistoricalNDVIData, 
  ComparisonAreaData, 
  DataSource, 
  NDVITab, 
  PeriodType,
  Polygon 
} from '../types';

interface NDVIViewerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedArea: Polygon; // ✅ Type-safe agora
  mapInstance: any; // Instância do Leaflet
}

const NDVIViewer = memo(function NDVIViewer({ isOpen, onClose, selectedArea, mapInstance }: NDVIViewerProps) {
  // 🔄 v3300: SEM hook useDemo - localStorage direto
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [ndviData, setNdviData] = useState<NDVIData | null>(null);
  const [opacity, setOpacity] = useState(70);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'sentinel' | 'planet'>('sentinel');
  const [ndviLayer, setNdviLayer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'comparison'>('current');
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'30' | '60' | '90' | '180'>('30');
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  
  // Estados para comparação
  const [allAreas, setAllAreas] = useState<any[]>([]);
  const [selectedAreasForComparison, setSelectedAreasForComparison] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonAreaData[]>([]);
  const [loadingComparison, setLoadingComparison] = useState(false);
  
  // Refs para captura de gráficos
  const historicalChartRef = useRef<HTMLDivElement>(null);
  const comparisonChartRef = useRef<HTMLDivElement>(null);

  // Cores NDVI padrão
  const ndviColors = {
    veryHigh: { color: '#006400', label: 'Alta Biomassa', range: '0.6 - 1.0' },
    high: { color: '#228B22', label: 'Boa Vegetação', range: '0.4 - 0.6' },
    medium: { color: '#90EE90', label: 'Vegetação Moderada', range: '0.2 - 0.4' },
    low: { color: '#FFFF00', label: 'Vegetação Baixa', range: '0.0 - 0.2' },
    veryLow: { color: '#FF4500', label: 'Sem Vegetação/Solo', range: '-1.0 - 0.0' },
  };

  // Buscar datas disponíveis quando abrir o painel
  useEffect(() => {
    if (isOpen && selectedArea) {
      loadAvailableDates();
    }
  }, [isOpen, selectedArea]);

  // Carregar datas disponíveis
  const loadAvailableDates = async () => {
    setLoading(true);
    try {
      // Extrair bounds da área selecionada
      const bounds = selectedArea.geometry?.coordinates?.[0] || selectedArea.coordinates?.[0];
      
      if (!bounds) {
        toast.error('Área inválida selecionada');
        return;
      }

      // Gerar últimos 30 dias como datas disponíveis (simulado)
      // Em produção, isso viria da API
      const dates: string[] = [];
      const today = new Date();
      for (let i = 0; i < 30; i += 3) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      
      setAvailableDates(dates);
      setSelectedDate(dates[0]); // Selecionar data mais recente

    } catch (error) {
      logger.error('Erro ao carregar datas:', error);
      toast.error('Erro ao carregar datas disponíveis');
    } finally {
      setLoading(false);
    }
  };

  // Processar imagem NDVI quando selecionar data
  useEffect(() => {
    if (selectedDate && selectedArea) {
      processNDVI();
    }
  }, [selectedDate, dataSource]);

  // Processar NDVI
  const processNDVI = useCallback(async () => {
    setLoading(true);
    try {
      const bounds = selectedArea.geometry?.coordinates?.[0] || selectedArea.coordinates?.[0];
      
      // Preparar request para o servidor
      const payload = {
        date: selectedDate,
        bounds: bounds,
        source: dataSource,
        areaId: selectedArea.id
      };

      const response = await fetchWithAuth('/make-server-b2d55462/ndvi/process', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Erro ao processar NDVI');
      }

      const data = await response.json();
      setNdviData(data);

      // Aplicar camada NDVI ao mapa
      if (data.imageUrl) {
        applyNDVILayer(data.imageUrl, bounds);
      }

      toast.success('NDVI processado com sucesso!');

    } catch (error) {
      logger.error('Erro ao processar NDVI:', error);
      
      // MODO DEMO - Gerar dados simulados
      const mockData: NDVIData = {
        date: selectedDate,
        cloudCover: Math.random() * 20,
        distribution: {
          veryHigh: 14 + Math.random() * 10,
          high: 22 + Math.random() * 10,
          medium: 31 + Math.random() * 10,
          low: 31 + Math.random() * 10,
          veryLow: 2 + Math.random() * 5,
        },
        averageNDVI: 0.45 + Math.random() * 0.3,
      };

      // Normalizar percentuais
      const total = Object.values(mockData.distribution).reduce((a, b) => a + b, 0);
      Object.keys(mockData.distribution).forEach((key) => {
        mockData.distribution[key as keyof typeof mockData.distribution] = 
          (mockData.distribution[key as keyof typeof mockData.distribution] / total) * 100;
      });

      setNdviData(mockData);
      toast.info('Usando dados simulados (modo demo)');
    } finally {
      setLoading(false);
    }
  }, [selectedDate, dataSource, selectedArea, mapInstance, ndviLayer]);

  // Aplicar camada NDVI ao mapa (clippada dentro do polígono)
  const applyNDVILayer = (imageUrl: string, bounds: any) => {
    if (!mapInstance) return;

    // Remover camada anterior se existir
    if (ndviLayer) {
      mapInstance.removeLayer(ndviLayer);
    }

    // Extrair coordenadas do polígono para clipping
    const polygonCoords = selectedArea.geometry?.coordinates?.[0] || selectedArea.coordinates?.[0];
    
    if (!polygonCoords || polygonCoords.length === 0) {
      toast.error('Coordenadas do polígono inválidas');
      return;
    }

    // Converter para formato Leaflet LatLng
    const latLngs = polygonCoords.map((coord: number[]) => [coord[1], coord[0]]);

    // Criar bounds do Leaflet para a imagem
    const leafletBounds = [
      [bounds[0][1], bounds[0][0]], // SW
      [bounds[2][1], bounds[2][0]]  // NE
    ];

    // Criar SVG overlay com clipping
    try {
      const svgLayer = createClippedNDVILayer(imageUrl, leafletBounds, latLngs);
      
      if (svgLayer) {
        svgLayer.addTo(mapInstance);
        setNdviLayer(svgLayer);
      }
    } catch (error) {
      logger.error('NDVIViewer', 'Erro ao adicionar camada NDVI', error);
      toast.error('Erro ao adicionar camada', {
        description: 'Tente novamente em alguns instantes',
      });
    }
  };

  // Criar camada NDVI clippada usando SVG
  const createClippedNDVILayer = (imageUrl: string, bounds: any, polygonLatLngs: any[]) => {
    if (!mapInstance) return null;

    const L = (window as any).L;
    
    // ✅ Verificar se Leaflet e L.SVG estão disponíveis
    if (!L || !L.SVG || !L.SVG.create || !L.SVGOverlay) {
      logger.error('NDVIViewer', 'Leaflet SVG não está disponível');
      toast.error('Erro ao carregar camada NDVI', {
        description: 'O sistema de mapas ainda não foi inicializado',
      });
      return null;
    }
    
    // Criar SVG overlay customizado
    const SvgOverlay = L.SVGOverlay.extend({
      onAdd: function(map: any) {
        // ✅ Verificar se mapa e pane estão disponíveis
        if (!map || !map.getPanes || !map.getPanes()) {
          logger.error('NDVIViewer', 'Mapa ou panes não disponíveis em onAdd');
          return;
        }
        
        this._map = map;
        
        // Inicializar caminho se ainda não foi
        if (!this._container) {
          this._initPath();
        }
        
        // ✅ Verificar se container foi criado com sucesso
        if (!this._container) {
          logger.error('NDVIViewer', 'Container não foi criado em onAdd');
          return;
        }
        
        // ✅ Adicionar ao pane correto com verificações robustas
        try {
          // Verificar se o mapa está pronto
          if (!map || typeof map.getPanes !== 'function') {
            logger.error('NDVIViewer', 'Mapa não está inicializado ou não possui getPanes()');
            return;
          }
          
          // Verificar se os panes existem
          const panes = map.getPanes();
          if (!panes) {
            logger.error('NDVIViewer', 'getPanes() retornou undefined - mapa não está pronto');
            return;
          }
          
          // Verificar se overlayPane existe
          const overlayPane = panes.overlayPane;
          if (!overlayPane) {
            logger.error('NDVIViewer', 'overlayPane não está disponível - aguardando mapa carregar');
            return;
          }
          
          // Verificar se overlayPane tem appendChild
          if (typeof overlayPane.appendChild !== 'function') {
            logger.error('NDVIViewer', 'overlayPane não possui método appendChild');
            return;
          }
          
          // Só adicionar se todos os checks passaram
          overlayPane.appendChild(this._container);
          logger.info('NDVIViewer', '✅ Container NDVI adicionado com sucesso ao overlayPane');
        } catch (error) {
          logger.error('NDVIViewer', '❌ Erro ao adicionar container ao pane:', error);
          return;
        }
        
        // Adicionar listeners e atualizar
        try {
          this._map = map;
          map.on('viewreset zoom move', this._update, this);
          this._update();
        } catch (error) {
          logger.error('NDVIViewer', 'Erro ao adicionar listeners:', error);
        }
      },
      
      onRemove: function(map: any) {
        // ✅ Remover do DOM com verificação
        if (this._container && this._container.parentNode) {
          this._container.parentNode.removeChild(this._container);
        }
        
        // Remover listeners
        if (map) {
          map.off('viewreset zoom move', this._update, this);
        }
        
        this._map = null;
      },
      
      _initPath: function() {
        // ✅ Criar container com verificação
        this._container = L.SVG.create('svg');
        
        if (!this._container) {
          logger.error('NDVIViewer', 'Falha ao criar container SVG');
          return;
        }
        
        this._container.setAttribute('pointer-events', 'none');
        
        // Criar defs para o clipPath
        const defs = L.SVG.create('defs');
        const clipPath = L.SVG.create('clipPath');
        const clipPolygon = L.SVG.create('polygon');
        
        // ✅ Verificar se todos os elementos foram criados
        if (!defs || !clipPath || !clipPolygon) {
          logger.error('NDVIViewer', 'Falha ao criar elementos SVG');
          return;
        }
        
        clipPath.setAttribute('id', 'ndvi-clip-' + Date.now());
        
        // Montar hierarquia SVG
        defs.appendChild(clipPath);
        clipPath.appendChild(clipPolygon);
        this._container.appendChild(defs);
        
        // Criar imagem
        const image = L.SVG.create('image');
        
        // ✅ Verificar se imagem foi criada
        if (!image) {
          logger.error('NDVIViewer', 'Falha ao criar elemento image SVG');
          return;
        }
        
        image.setAttribute('clip-path', `url(#${clipPath.getAttribute('id')})`);
        image.setAttribute('opacity', (opacity / 100).toString());
        this._container.appendChild(image);
        
        this._clipPath = clipPath;
        this._clipPolygon = clipPolygon;
        this._image = image;
        this._path = this._container;
      },
      
      _update: function() {
        if (!this._map) return;
        
        // ✅ Verificar se container existe antes de atualizar
        if (!this._container) {
          logger.error('NDVIViewer', 'Container não disponível em _update');
          return;
        }
        
        const bounds = this._boundsToLatLngs(this.options.bounds);
        const topLeft = this._map.latLngToLayerPoint(bounds[0]);
        const bottomRight = this._map.latLngToLayerPoint(bounds[1]);
        
        const width = bottomRight.x - topLeft.x;
        const height = bottomRight.y - topLeft.y;
        
        // Atualizar viewBox e dimensões
        this._container.setAttribute('viewBox', `0 0 ${width} ${height}`);
        this._container.setAttribute('width', width);
        this._container.setAttribute('height', height);
        L.DomUtil.setPosition(this._container, topLeft);
        
        // ✅ Verificar se imagem existe antes de atualizar
        if (!this._image) {
          logger.error('NDVIViewer', 'Imagem não disponível em _update');
          return;
        }
        
        // Atualizar imagem
        this._image.setAttribute('href', this.options.imageUrl);
        this._image.setAttribute('x', '0');
        this._image.setAttribute('y', '0');
        this._image.setAttribute('width', width.toString());
        this._image.setAttribute('height', height.toString());
        this._image.setAttribute('opacity', (this.options.opacity || 0.7).toString());
        
        // Atualizar polígono de clipping
        const polygonPoints = this.options.polygonLatLngs.map((latLng: any) => {
          const point = this._map.latLngToLayerPoint(latLng);
          return `${point.x - topLeft.x},${point.y - topLeft.y}`;
        }).join(' ');
        
        this._clipPolygon.setAttribute('points', polygonPoints);
      },
      
      _boundsToLatLngs: function(bounds: any) {
        return [
          L.latLng(bounds[0][0], bounds[0][1]),
          L.latLng(bounds[1][0], bounds[1][1])
        ];
      },
      
      setOpacity: function(newOpacity: number) {
        this.options.opacity = newOpacity;
        if (this._image) {
          this._image.setAttribute('opacity', newOpacity.toString());
        }
      }
    });

    // Criar instância do overlay
    try {
      const overlay = new SvgOverlay({
        bounds: bounds,
        imageUrl: imageUrl,
        polygonLatLngs: polygonLatLngs,
        opacity: opacity / 100,
        interactive: false,
      });

      return overlay;
    } catch (error) {
      logger.error('NDVIViewer', 'Erro ao criar instância do overlay SVG', error);
      return null;
    }
  };

  // Atualizar opacidade
  useEffect(() => {
    if (ndviLayer && ndviLayer.setOpacity) {
      ndviLayer.setOpacity(opacity / 100);
    } else if (ndviLayer && ndviLayer._image) {
      // Para SVG overlay customizado
      ndviLayer._image.setAttribute('opacity', (opacity / 100).toString());
    }
  }, [opacity]);

  // Limpar camada ao fechar
  useEffect(() => {
    if (!isOpen && ndviLayer && mapInstance) {
      mapInstance.removeLayer(ndviLayer);
      setNdviLayer(null);
    }
  }, [isOpen]);

  // Carregar histórico quando mudar para aba de histórico
  useEffect(() => {
    if (activeTab === 'history' && !hasLoadedHistory) {
      setHasLoadedHistory(true);
      loadHistoricalData();
    }
  }, [activeTab]);

  // Recarregar quando mudar período
  useEffect(() => {
    if (activeTab === 'history' && hasLoadedHistory) {
      loadHistoricalData();
    }
  }, [selectedPeriod]);

  // Carregar dados históricos
  const loadHistoricalData = async () => {
    if (!selectedArea) return;
    
    setLoadingHistory(true);
    try {
      // 🔄 v3300: Ler localStorage diretamente
      const demoMode = localStorage.getItem('soloforte_demo_mode') === 'true';
      
      // Verificar se está em modo demo
      if (demoMode) {
        // Modo demo - sempre usar dados simulados
        generateMockHistory();
        setLoadingHistory(false);
        return;
      }

      const response = await fetchWithAuth(`/make-server-b2d55462/ndvi/history/${selectedArea.id}?period=${selectedPeriod}`);
      
      if (!response.ok) {
        // Se erro, usar dados simulados
        generateMockHistory();
        toast.info('Usando dados históricos simulados (modo demo)');
        setLoadingHistory(false);
        return;
      }

      const data = await response.json();
      
      if (data.success && data.history && data.history.length > 0) {
        setHistoricalData(data.history);
      } else {
        // Gerar dados históricos simulados
        generateMockHistory();
        toast.info('Usando dados históricos simulados (modo demo)');
      }
    } catch (error) {
      logger.error('Erro ao carregar histórico:', error);
      // Gerar dados históricos simulados
      generateMockHistory();
      toast.info('Usando dados históricos simulados (modo demo)');
    } finally {
      setLoadingHistory(false);
    }
  };

  // Gerar histórico simulado
  const generateMockHistory = () => {
    const days = parseInt(selectedPeriod);
    const history: HistoricalData[] = [];
    const today = new Date();
    
    // Simular evolução realista de NDVI
    let baseNDVI = 0.45;
    
    for (let i = days; i >= 0; i -= 3) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simular sazonalidade e variação natural
      const variation = (Math.sin(i / 10) * 0.1) + (Math.random() * 0.08 - 0.04);
      const ndvi = Math.max(0.2, Math.min(0.85, baseNDVI + variation));
      
      // Ajustar base NDVI gradualmente (simular crescimento/queda)
      baseNDVI += (Math.random() - 0.45) * 0.02;
      
      history.push({
        date: date.toISOString().split('T')[0],
        ndvi: parseFloat(ndvi.toFixed(3)),
        cloudCover: Math.random() * 25,
        biomassaAlta: (ndvi > 0.6 ? 1 : 0) * (20 + Math.random() * 40),
        biomassaBaixa: (ndvi < 0.3 ? 1 : 0) * (10 + Math.random() * 30),
      });
    }
    
    setHistoricalData(history);
  };

  // Calcular tendência
  const calculateTrend = () => {
    if (historicalData.length < 2) return { direction: 'stable', percentage: 0 };
    
    const recent = historicalData.slice(-5);
    const old = historicalData.slice(0, 5);
    
    const recentAvg = recent.reduce((sum, d) => sum + d.ndvi, 0) / recent.length;
    const oldAvg = old.reduce((sum, d) => sum + d.ndvi, 0) / old.length;
    
    const diff = recentAvg - oldAvg;
    const percentage = ((diff / oldAvg) * 100);
    
    return {
      direction: diff > 0.02 ? 'up' : diff < -0.02 ? 'down' : 'stable',
      percentage: Math.abs(percentage),
      value: diff,
    };
  };

  const trend = historicalData.length > 0 ? calculateTrend() : null;

  // Carregar todas as áreas quando mudar para aba de comparação
  useEffect(() => {
    if (activeTab === 'comparison' && allAreas.length === 0) {
      loadAllAreas();
    }
  }, [activeTab]);

  // Carregar todas as áreas salvas do usuário
  const loadAllAreas = async () => {
    try {
      // 🔄 v3300: Ler localStorage diretamente
      const demoMode = localStorage.getItem('soloforte_demo_mode') === 'true';
      
      // Verificar se está em modo demo
      if (demoMode) {
        // Modo demo - gerar áreas simuladas
        const mockAreas = [
          { id: 'area1', name: 'Talhão Norte', area: 25.5 },
          { id: 'area2', name: 'Pivô Central', area: 42.3 },
          { id: 'area3', name: 'Talhão Sul', area: 18.7 },
          { id: 'area4', name: 'Área Experimental', area: 12.4 },
          { id: 'area5', name: 'Pomar', area: 8.9 },
        ];
        setAllAreas(mockAreas);
        if (selectedArea) {
          setSelectedAreasForComparison([selectedArea.id]);
        }
        return;
      }

      const response = await fetchWithAuth('/make-server-b2d55462/polygons');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar áreas');
      }

      const data = await response.json();
      if (data.polygons && data.polygons.length > 0) {
        setAllAreas(data.polygons);
        // Pré-selecionar a área atual
        if (selectedArea) {
          setSelectedAreasForComparison([selectedArea.id]);
        }
      } else {
        // Se não há áreas, usar mock
        const mockAreas = [
          { id: 'area1', name: 'Talhão Norte', area: 25.5 },
          { id: 'area2', name: 'Pivô Central', area: 42.3 },
        ];
        setAllAreas(mockAreas);
        if (selectedArea) {
          setSelectedAreasForComparison([selectedArea.id]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar áreas:', error);
      // Em caso de erro, usar áreas simuladas
      const mockAreas = [
        { id: 'area1', name: 'Talhão Norte', area: 25.5 },
        { id: 'area2', name: 'Pivô Central', area: 42.3 },
        { id: 'area3', name: 'Talhão Sul', area: 18.7 },
      ];
      setAllAreas(mockAreas);
      if (selectedArea) {
        setSelectedAreasForComparison([selectedArea.id]);
      }
      toast.info('Usando áreas simuladas (modo demo)');
    }
  };

  // Toggle seleção de área para comparação
  const toggleAreaSelection = (areaId: string) => {
    setSelectedAreasForComparison(prev => {
      if (prev.includes(areaId)) {
        return prev.filter(id => id !== areaId);
      } else {
        if (prev.length >= 5) {
          toast.warning('Máximo de 5 áreas para comparação');
          return prev;
        }
        return [...prev, areaId];
      }
    });
  };

  // Cores para as áreas no gráfico
  const areaColors = ['#0057FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Carregar dados de comparação
  const loadComparisonData = async () => {
    if (selectedAreasForComparison.length === 0) {
      toast.warning('Selecione pelo menos uma área');
      return;
    }

    setLoadingComparison(true);
    const comparisonResults: ComparisonAreaData[] = [];

    try {
      // Verificar se está em modo demo
      for (let i = 0; i < selectedAreasForComparison.length; i++) {
        const areaId = selectedAreasForComparison[i];
        const area = allAreas.find(a => a.id === areaId);
        
        if (!area) continue;

        let areaData: HistoricalData[] = [];

        // 🔄 v3300: Ler localStorage diretamente
        const demoMode = localStorage.getItem('soloforte_demo_mode') === 'true';
        
        if (!demoMode) {
          try {
            // Buscar histórico da área
            const response = await fetchWithAuth(`/make-server-b2d55462/ndvi/history/${areaId}?period=${selectedPeriod}`);
            
            if (response.ok) {
              const data = await response.json();
              areaData = data.history || [];
            }
          } catch (err) {
            console.log(`Erro ao buscar dados da área ${area.name}, usando mock`);
          }
        }

        // Se não houver dados reais, gerar simulados
        if (areaData.length === 0) {
          areaData = generateMockHistoryForArea(area);
        }

        // Calcular estatísticas
        const stats = calculateAreaStats(areaData);

        comparisonResults.push({
          id: area.id,
          name: area.name,
          area: area.area,
          color: areaColors[i % areaColors.length],
          data: areaData,
          stats,
        });
      }

      setComparisonData(comparisonResults);
      
      // 🔄 v3300: Ler localStorage diretamente
      const demoModeToast = localStorage.getItem('soloforte_demo_mode') === 'true';
      
      if (demoModeToast || comparisonResults.some(r => r.data.length > 0 && r.data[0].ndvi < 1)) {
        toast.success('Comparação gerada com sucesso!');
      } else {
        toast.success('Comparação gerada (dados simulados)');
      }
    } catch (error) {
      console.error('Erro ao carregar comparação:', error);
      // Mesmo com erro, tentar gerar com dados simulados
      for (let i = 0; i < selectedAreasForComparison.length; i++) {
        const areaId = selectedAreasForComparison[i];
        const area = allAreas.find(a => a.id === areaId);
        
        if (!area) continue;

        const areaData = generateMockHistoryForArea(area);
        const stats = calculateAreaStats(areaData);

        comparisonResults.push({
          id: area.id,
          name: area.name,
          area: area.area,
          color: areaColors[i % areaColors.length],
          data: areaData,
          stats,
        });
      }

      setComparisonData(comparisonResults);
      toast.info('Usando dados simulados (modo demo)');
    } finally {
      setLoadingComparison(false);
    }
  };

  // Gerar histórico simulado para uma área específica
  const generateMockHistoryForArea = (area: any): HistoricalData[] => {
    const days = parseInt(selectedPeriod);
    const history: HistoricalData[] = [];
    const today = new Date();
    
    // Usar hash do nome da área para consistência
    const seed = area.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseNDVI = 0.35 + (seed % 30) / 100;
    
    for (let i = days; i >= 0; i -= 3) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const variation = (Math.sin((i + seed) / 10) * 0.1) + ((Math.random() + seed % 100 / 100) * 0.08 - 0.04);
      const ndvi = Math.max(0.2, Math.min(0.85, baseNDVI + variation));
      
      history.push({
        date: date.toISOString().split('T')[0],
        ndvi: parseFloat(ndvi.toFixed(3)),
        cloudCover: Math.random() * 25,
        biomassaAlta: (ndvi > 0.6 ? 1 : 0) * (20 + Math.random() * 40),
        biomassaBaixa: (ndvi < 0.3 ? 1 : 0) * (10 + Math.random() * 30),
      });
    }
    
    return history;
  };

  // Calcular estatísticas de uma área
  const calculateAreaStats = (data: HistoricalData[]) => {
    if (data.length === 0) {
      return {
        avgNDVI: 0,
        maxNDVI: 0,
        minNDVI: 0,
        trend: 'stable' as const,
        trendPercentage: 0,
      };
    }

    const avgNDVI = data.reduce((sum, d) => sum + d.ndvi, 0) / data.length;
    const maxNDVI = Math.max(...data.map(d => d.ndvi));
    const minNDVI = Math.min(...data.map(d => d.ndvi));

    // Calcular tendência
    const recent = data.slice(-5);
    const old = data.slice(0, 5);
    const recentAvg = recent.reduce((sum, d) => sum + d.ndvi, 0) / recent.length;
    const oldAvg = old.reduce((sum, d) => sum + d.ndvi, 0) / old.length;
    const diff = recentAvg - oldAvg;
    const percentage = Math.abs((diff / oldAvg) * 100);

    return {
      avgNDVI: parseFloat(avgNDVI.toFixed(3)),
      maxNDVI: parseFloat(maxNDVI.toFixed(3)),
      minNDVI: parseFloat(minNDVI.toFixed(3)),
      trend: diff > 0.02 ? 'up' : diff < -0.02 ? 'down' : 'stable',
      trendPercentage: parseFloat(percentage.toFixed(1)),
    };
  };

  // Mesclar dados para o gráfico comparativo
  const getMergedComparisonData = () => {
    if (comparisonData.length === 0) return [];

    // Pegar todas as datas únicas
    const allDates = new Set<string>();
    comparisonData.forEach(area => {
      area.data.forEach(d => allDates.add(d.date));
    });

    const sortedDates = Array.from(allDates).sort();

    // Criar objetos com todas as áreas para cada data
    return sortedDates.map(date => {
      const dataPoint: any = { date };
      
      comparisonData.forEach(area => {
        const dateData = area.data.find(d => d.date === date);
        dataPoint[area.id] = dateData ? dateData.ndvi : null;
      });

      return dataPoint;
    });
  };

  // Exportar relatório atual
  const exportCurrentReport = () => {
    if (!ndviData || !selectedArea) {
      toast.error('Nenhum dado NDVI disponível');
      return;
    }

    const html = generateCurrentReportHTML();
    openReportWindow(html, `Relatório NDVI - ${selectedArea.name}`);
    toast.success('Relatório gerado!');
  };

  // Exportar relatório histórico
  const exportHistoricalReport = () => {
    if (historicalData.length === 0 || !selectedArea) {
      toast.error('Nenhum dado histórico disponível');
      return;
    }

    const html = generateHistoricalReportHTML();
    openReportWindow(html, `Histórico NDVI - ${selectedArea.name}`);
    toast.success('Relatório histórico gerado!');
  };

  // Exportar relatório de comparação
  const exportComparisonReport = () => {
    if (comparisonData.length === 0) {
      toast.error('Nenhuma comparação dispon��vel');
      return;
    }

    const html = generateComparisonReportHTML();
    openReportWindow(html, `Comparação de Áreas NDVI`);
    toast.success('Relatório de comparação gerado!');
  };

  // Abrir janela com relatório
  const openReportWindow = (html: string, title: string) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
      newWindow.document.title = title;
    } else {
      toast.error('Pop-up bloqueado. Permita pop-ups para exportar relatórios.');
    }
  };

  // Gerar HTML do relatório atual
  const generateCurrentReportHTML = () => {
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório NDVI - ${selectedArea.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      padding: 40px;
      background: #f9fafb;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 60px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 3px solid #0057FF;
    }
    
    .header h1 {
      font-size: 32px;
      color: #0057FF;
      margin-bottom: 10px;
    }
    
    .header .subtitle {
      font-size: 18px;
      color: #6b7280;
      margin-bottom: 20px;
    }
    
    .area-info {
      background: #f3f4f6;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 40px;
    }
    
    .area-info h2 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #374151;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
    }
    
    .info-label {
      font-size: 13px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    
    .info-value {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .ndvi-score {
      background: linear-gradient(135deg, #0057FF 0%, #0046CC 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 40px;
    }
    
    .ndvi-score h2 {
      font-size: 18px;
      margin-bottom: 10px;
      opacity: 0.9;
    }
    
    .ndvi-score .value {
      font-size: 72px;
      font-weight: 700;
      line-height: 1;
    }
    
    .section {
      margin-bottom: 40px;
    }
    
    .section h3 {
      font-size: 22px;
      margin-bottom: 20px;
      color: #111827;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .distribution-grid {
      display: grid;
      gap: 15px;
    }
    
    .distribution-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
    }
    
    .color-box {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      flex-shrink: 0;
    }
    
    .distribution-label {
      flex: 1;
    }
    
    .distribution-label strong {
      display: block;
      font-size: 15px;
      margin-bottom: 3px;
    }
    
    .distribution-label span {
      font-size: 13px;
      color: #6b7280;
    }
    
    .distribution-value {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }
    
    .alert-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    
    .alert-box h4 {
      font-size: 16px;
      margin-bottom: 10px;
      color: #92400e;
    }
    
    .alert-box ul {
      list-style: none;
      padding-left: 0;
    }
    
    .alert-box li {
      padding: 5px 0;
      color: #78350f;
    }
    
    .alert-box li:before {
      content: "• ";
      color: #f59e0b;
      font-weight: bold;
      margin-right: 8px;
    }
    
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #0057FF;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 87, 255, 0.3);
      transition: all 0.2s;
    }
    
    .print-button:hover {
      background: #0046CC;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 87, 255, 0.4);
    }
    
    @media print {
      body { 
        padding: 0; 
        background: white;
      }
      .container { 
        box-shadow: none; 
        padding: 40px;
      }
      .print-button { 
        display: none; 
      }
    }
  </style>
</head>
<body>
  <button class="print-button" onclick="window.print()">🖨️ Imprimir Relatório</button>
  
  <div class="container">
    <div class="header">
      <h1>🌿 Relatório de Análise NDVI</h1>
      <div class="subtitle">SoloForte - Análise de Vegetação por Satélite</div>
      <div style="margin-top: 15px; color: #6b7280;">Gerado em ${today}</div>
    </div>
    
    <div class="area-info">
      <h2>📍 Informações da Área</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Nome da Área</span>
          <span class="info-value">${selectedArea.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Tamanho</span>
          <span class="info-value">${selectedArea.area.toFixed(2)} hectares</span>
        </div>
        <div class="info-item">
          <span class="info-label">Data da Imagem</span>
          <span class="info-value">${new Date(ndviData.date).toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Fonte de Dados</span>
          <span class="info-value">${dataSource === 'sentinel' ? 'Sentinel-2 (ESA)' : 'Planet Labs'}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Cobertura de Nuvens</span>
          <span class="info-value">${ndviData.cloudCover.toFixed(1)}%</span>
        </div>
      </div>
    </div>
    
    <div class="ndvi-score">
      <h2>ÍNDICE NDVI MÉDIO</h2>
      <div class="value">${ndviData.averageNDVI.toFixed(3)}</div>
    </div>
    
    <div class="section">
      <h3>📊 Distribuição de Biomassa</h3>
      <div class="distribution-grid">
        <div class="distribution-item">
          <div class="color-box" style="background: #006400;"></div>
          <div class="distribution-label">
            <strong>Alta Biomassa</strong>
            <span>Vegetação muito saudável (0.6 - 1.0)</span>
          </div>
          <div class="distribution-value">${ndviData.distribution.veryHigh.toFixed(1)}%</div>
        </div>
        
        <div class="distribution-item">
          <div class="color-box" style="background: #228B22;"></div>
          <div class="distribution-label">
            <strong>Boa Vegetação</strong>
            <span>Desenvolvimento saudável (0.4 - 0.6)</span>
          </div>
          <div class="distribution-value">${ndviData.distribution.high.toFixed(1)}%</div>
        </div>
        
        <div class="distribution-item">
          <div class="color-box" style="background: #90EE90;"></div>
          <div class="distribution-label">
            <strong>Vegetação Moderada</strong>
            <span>Desenvolvimento médio (0.2 - 0.4)</span>
          </div>
          <div class="distribution-value">${ndviData.distribution.medium.toFixed(1)}%</div>
        </div>
        
        <div class="distribution-item">
          <div class="color-box" style="background: #FFFF00;"></div>
          <div class="distribution-label">
            <strong>Vegetação Baixa</strong>
            <span>Requer atenção (0.0 - 0.2)</span>
          </div>
          <div class="distribution-value">${ndviData.distribution.low.toFixed(1)}%</div>
        </div>
        
        <div class="distribution-item">
          <div class="color-box" style="background: #FF4500;"></div>
          <div class="distribution-label">
            <strong>Muito Baixa / Solo Exposto</strong>
            <span>Crítico (-1.0 - 0.0)</span>
          </div>
          <div class="distribution-value">${ndviData.distribution.veryLow.toFixed(1)}%</div>
        </div>
      </div>
      
      ${ndviData.distribution.veryLow > 10 ? `
      <div class="alert-box">
        <h4>⚠️ Atenção: Área com Biomassa Muito Baixa Detectada</h4>
        <ul>
          <li>Mais de ${ndviData.distribution.veryLow.toFixed(1)}% da área apresenta biomassa muito baixa</li>
          <li>Recomenda-se verificar o sistema de irrigação</li>
          <li>Avaliar necessidade de nutrientes no solo</li>
          <li>Inspecionar possíveis problemas com pragas ou doenças</li>
        </ul>
      </div>
      ` : ''}
    </div>
    
    <div class="section">
      <h3>💡 Interpretação e Recomendações</h3>
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0057FF;">
        ${ndviData.averageNDVI >= 0.6 ? `
          <p style="margin-bottom: 10px;">✅ <strong>Excelente!</strong> O NDVI médio de ${ndviData.averageNDVI.toFixed(3)} indica vegetação muito saudável e densa.</p>
          <p>Continue o manejo atual e documente as práticas bem-sucedidas.</p>
        ` : ndviData.averageNDVI >= 0.4 ? `
          <p style="margin-bottom: 10px;">✅ <strong>Bom!</strong> O NDVI médio de ${ndviData.averageNDVI.toFixed(3)} indica vegetação saudável.</p>
          <p>O desenvolvimento está normal, mas pode haver oportunidades de otimização.</p>
        ` : ndviData.averageNDVI >= 0.2 ? `
          <p style="margin-bottom: 10px;">⚠️ <strong>Atenção!</strong> O NDVI médio de ${ndviData.averageNDVI.toFixed(3)} indica vegetação moderada.</p>
          <p>Recomenda-se verificar necessidades nutricionais e avaliar irrigação.</p>
        ` : `
          <p style="margin-bottom: 10px;">🚨 <strong>Crítico!</strong> O NDVI médio de ${ndviData.averageNDVI.toFixed(3)} indica vegetação esparsa.</p>
          <p>Investigação imediata necessária. Verificar irrigação, nutrição e possível presença de pragas/doenças.</p>
        `}
      </div>
    </div>
    
    <div class="footer">
      <p><strong>SoloForte</strong> - Transformando complexidade em decisões simples e produtivas 🌱</p>
      <p style="margin-top: 10px; font-size: 12px;">Este relatório foi gerado automaticamente pelo sistema SoloForte de análise NDVI</p>
    </div>
  </div>
</body>
</html>
    `;
  };

  // Gerar HTML do relatório histórico
  const generateHistoricalReportHTML = () => {
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const trend = calculateTrend();
    const avgNDVI = (historicalData.reduce((sum, d) => sum + d.ndvi, 0) / historicalData.length).toFixed(3);
    const maxNDVI = Math.max(...historicalData.map(d => d.ndvi)).toFixed(3);
    const minNDVI = Math.min(...historicalData.map(d => d.ndvi)).toFixed(3);

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório Histórico NDVI - ${selectedArea.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      padding: 40px;
      background: #f9fafb;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 60px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 3px solid #0057FF;
    }
    
    .header h1 {
      font-size: 32px;
      color: #0057FF;
      margin-bottom: 10px;
    }
    
    .header .subtitle {
      font-size: 18px;
      color: #6b7280;
      margin-bottom: 20px;
    }
    
    .trend-badge {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 600;
      margin: 30px 0;
    }
    
    .trend-up {
      background: #d1fae5;
      color: #065f46;
    }
    
    .trend-down {
      background: #fee2e2;
      color: #991b1b;
    }
    
    .trend-stable {
      background: #e5e7eb;
      color: #374151;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 40px 0;
    }
    
    .stat-card {
      padding: 25px;
      border-radius: 12px;
      text-align: center;
    }
    
    .stat-card.green {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
    
    .stat-card.orange {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }
    
    .stat-card.blue {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
    }
    
    .stat-card.purple {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
    }
    
    .stat-label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 8px;
    }
    
    .stat-value {
      font-size: 36px;
      font-weight: 700;
    }
    
    .section {
      margin: 40px 0;
    }
    
    .section h3 {
      font-size: 22px;
      margin-bottom: 20px;
      color: #111827;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .timeline {
      margin: 30px 0;
    }
    
    .timeline-item {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
    }
    
    .timeline-date {
      font-weight: 600;
      color: #0057FF;
      min-width: 100px;
    }
    
    .timeline-value {
      font-size: 18px;
      font-weight: 600;
    }
    
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #0057FF;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 87, 255, 0.3);
      transition: all 0.2s;
    }
    
    .print-button:hover {
      background: #0046CC;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 87, 255, 0.4);
    }
    
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    
    @media print {
      body { padding: 0; background: white; }
      .container { box-shadow: none; padding: 40px; }
      .print-button { display: none; }
    }
  </style>
</head>
<body>
  <button class="print-button" onclick="window.print()">🖨️ Imprimir Relatório</button>
  
  <div class="container">
    <div class="header">
      <h1>📈 Relatório Histórico NDVI</h1>
      <div class="subtitle">Evolução Temporal da Vegetação</div>
      <div style="margin-top: 15px; color: #6b7280;">Gerado em ${today}</div>
      <div style="margin-top: 10px; font-weight: 600;">${selectedArea.name} (${selectedArea.area.toFixed(2)} ha)</div>
    </div>
    
    <div style="text-align: center;">
      <div class="trend-badge trend-${trend.direction === 'up' ? 'up' : trend.direction === 'down' ? 'down' : 'stable'}">
        ${trend.direction === 'up' ? '📈 Crescimento' : trend.direction === 'down' ? '📉 Declínio' : '➡️ Estável'}: 
        ${trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : '±'}${trend.percentage.toFixed(1)}%
      </div>
      <p style="color: #6b7280; margin-top: 15px;">
        ${trend.direction === 'up' ? '✅ Vegetação em crescimento saudável no período' : 
          trend.direction === 'down' ? '⚠️ Declínio na biomassa detectado no período' : 
          'ℹ️ Vegetação mantendo padrão estável no período'}
      </p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card green">
        <div class="stat-label">NDVI Máximo</div>
        <div class="stat-value">${maxNDVI}</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-label">NDVI Mínimo</div>
        <div class="stat-value">${minNDVI}</div>
      </div>
      <div class="stat-card blue">
        <div class="stat-label">NDVI Médio</div>
        <div class="stat-value">${avgNDVI}</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-label">Medições</div>
        <div class="stat-value">${historicalData.length}</div>
      </div>
    </div>
    
    <div class="section">
      <h3>📊 Evolução NDVI (Últimos ${selectedPeriod} dias)</h3>
      <div class="timeline">
        ${historicalData.slice().reverse().slice(0, 15).map(d => `
          <div class="timeline-item">
            <span class="timeline-date">${new Date(d.date).toLocaleDateString('pt-BR')}</span>
            <span class="timeline-value">NDVI: ${d.ndvi.toFixed(3)}</span>
          </div>
        `).join('')}
        ${historicalData.length > 15 ? `
          <div style="text-align: center; color: #6b7280; margin-top: 20px;">
            ... e mais ${historicalData.length - 15} medições
          </div>
        ` : ''}
      </div>
    </div>
    
    ${trend.direction === 'down' ? `
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 40px 0;">
      <h4 style="margin-bottom: 15px; color: #92400e;">⚠️ Atenção: Declínio Detectado</h4>
      <p style="color: #78350f; margin-bottom: 10px;">
        A área apresenta tendência de declínio de ${trend.percentage.toFixed(1)}% no período analisado.
      </p>
      <p style="color: #78350f; font-weight: 600; margin-bottom: 10px;">Recomendações:</p>
      <ul style="list-style: none; padding: 0; color: #78350f;">
        <li style="padding: 5px 0;">• Verificar sistema de irrigação</li>
        <li style="padding: 5px 0;">• Avaliar necessidade de nutrientes</li>
        <li style="padding: 5px 0;">• Inspecionar campo para pragas/doenças</li>
        <li style="padding: 5px 0;">• Considerar análise de solo</li>
      </ul>
    </div>
    ` : ''}
    
    <div class="footer">
      <p><strong>SoloForte</strong> - Transformando complexidade em decisões simples e produtivas 🌱</p>
      <p style="margin-top: 10px; font-size: 12px;">Este relatório foi gerado automaticamente pelo sistema SoloForte de análise NDVI</p>
    </div>
  </div>
</body>
</html>
    `;
  };

  // Gerar HTML do relatório de comparação
  const generateComparisonReportHTML = () => {
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const bestArea = comparisonData.reduce((best, current) => 
      current.stats.avgNDVI > best.stats.avgNDVI ? current : best
    );
    const worstArea = comparisonData.reduce((worst, current) => 
      current.stats.avgNDVI < worst.stats.avgNDVI ? current : worst
    );

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de Comparação NDVI</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      padding: 40px;
      background: #f9fafb;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      padding: 60px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 3px solid #0057FF;
    }
    
    .header h1 {
      font-size: 32px;
      color: #0057FF;
      margin-bottom: 10px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 30px 0;
    }
    
    th {
      background: #f3f4f6;
      padding: 15px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #e5e7eb;
    }
    
    td {
      padding: 15px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    tr:hover {
      background: #f9fafb;
    }
    
    .color-indicator {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      display: inline-block;
      margin-right: 8px;
    }
    
    .highlight-box {
      padding: 25px;
      border-radius: 12px;
      margin: 30px 0;
    }
    
    .highlight-box.success {
      background: #d1fae5;
      border-left: 4px solid #10b981;
    }
    
    .highlight-box.warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
    }
    
    .highlight-box h4 {
      margin-bottom: 10px;
      font-size: 18px;
    }
    
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #0057FF;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 87, 255, 0.3);
    }
    
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    
    @media print {
      body { padding: 0; background: white; }
      .container { box-shadow: none; padding: 40px; }
      .print-button { display: none; }
    }
  </style>
</head>
<body>
  <button class="print-button" onclick="window.print()">🖨️ Imprimir Relatório</button>
  
  <div class="container">
    <div class="header">
      <h1>🔄 Relatório de Comparação NDVI</h1>
      <div class="subtitle" style="font-size: 18px; color: #6b7280; margin: 15px 0;">
        Análise Comparativa de ${comparisonData.length} Áreas
      </div>
      <div style="color: #6b7280;">Gerado em ${today}</div>
      <div style="margin-top: 10px; font-weight: 600;">Período: Últimos ${selectedPeriod} dias</div>
    </div>
    
    <table>
      <thead>
        <tr>
          <th style="width: 40px;"></th>
          <th>Área</th>
          <th>Tamanho</th>
          <th>NDVI Médio</th>
          <th>Máximo</th>
          <th>Mínimo</th>
          <th>Tendência</th>
        </tr>
      </thead>
      <tbody>
        ${comparisonData
          .sort((a, b) => b.stats.avgNDVI - a.stats.avgNDVI)
          .map((area, index) => `
          <tr>
            <td>
              <span class="color-indicator" style="background: ${area.color};"></span>
            </td>
            <td>
              <strong>${area.name}</strong>
              ${index === 0 ? ' 🏆' : ''}
            </td>
            <td>${area.area.toFixed(2)} ha</td>
            <td style="font-weight: 600;">${area.stats.avgNDVI}</td>
            <td style="color: #10b981;">${area.stats.maxNDVI}</td>
            <td style="color: #f59e0b;">${area.stats.minNDVI}</td>
            <td>
              ${area.stats.trend === 'up' ? '📈' : area.stats.trend === 'down' ? '📉' : '➡️'}
              ${area.stats.trend === 'up' ? '+' : area.stats.trend === 'down' ? '-' : '±'}${area.stats.trendPercentage}%
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div class="highlight-box success">
      <h4>🏆 Melhor Performance</h4>
      <p>
        <strong>${bestArea.name}</strong> apresenta o melhor NDVI m��dio (${bestArea.stats.avgNDVI}), 
        indicando vegetação mais saudável e uniforme no período analisado.
      </p>
    </div>
    
    ${bestArea.id !== worstArea.id ? `
    <div class="highlight-box warning">
      <h4>⚠️ Requer Atenção</h4>
      <p style="margin-bottom: 10px;">
        <strong>${worstArea.name}</strong> apresenta NDVI médio mais baixo (${worstArea.stats.avgNDVI}). 
        Diferença de ${((bestArea.stats.avgNDVI - worstArea.stats.avgNDVI) * 100).toFixed(1)}% em relação à melhor área.
      </p>
      <p style="font-weight: 600; margin-top: 15px; margin-bottom: 5px;">Recomendações:</p>
      <ul style="list-style: none; padding: 0;">
        <li style="padding: 5px 0;">• Comparar práticas de manejo entre as áreas</li>
        <li style="padding: 5px 0;">• Verificar diferenças de solo e topografia</li>
        <li style="padding: 5px 0;">• Avaliar uniformidade de irrigação e fertilização</li>
        <li style="padding: 5px 0;">• Usar área com melhor performance como referência</li>
      </ul>
    </div>
    ` : ''}
    
    <div style="background: #f0f9ff; border-left: 4px solid #0057FF; padding: 20px; border-radius: 8px; margin: 40px 0;">
      <h4 style="margin-bottom: 15px; color: #1e40af;">💡 Recomendações Gerais</h4>
      <ul style="list-style: none; padding: 0; color: #1e3a8a;">
        <li style="padding: 5px 0;">• Use a melhor área como referência para as demais</li>
        <li style="padding: 5px 0;">• Documente as práticas da área com melhor performance</li>
        <li style="padding: 5px 0;">• Uniformize manejo nas áreas com resultados similares</li>
        <li style="padding: 5px 0;">• Priorize investimentos nas áreas com maior potencial</li>
        <li style="padding: 5px 0;">• Monitore semanalmente as áreas em declínio</li>
      </ul>
    </div>
    
    <div class="footer">
      <p><strong>SoloForte</strong> - Transformando complexidade em decisões simples e produtivas 🌱</p>
      <p style="margin-top: 10px; font-size: 12px;">Este relatório foi gerado automaticamente pelo sistema SoloForte de análise NDVI</p>
    </div>
  </div>
</body>
</html>
    `;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay escuro clicável para fechar */}
      <div 
        className="fixed inset-0 bg-black/30 z-20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Painel NDVI */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-30 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0057FF] to-[#0044CC] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Análise NDVI</h2>
              <p className="text-white/80 text-xs">Índice de Vegetação</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 p-2.5 rounded-lg transition-all active:scale-95"
            title="Fechar painel NDVI"
          >
            <X className="h-6 w-6 text-white" strokeWidth={2.5} />
          </button>
        </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 grid w-auto grid-cols-3">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            Atual
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <GitCompare className="h-4 w-4" />
            Comparar
          </TabsTrigger>
        </TabsList>

        {/* Current Analysis Tab */}
        <TabsContent value="current" className="flex-1 overflow-y-auto p-4 space-y-4 mt-0">
        {/* Fonte de Dados */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Fonte de Imagens
          </label>
          <Select value={dataSource} onValueChange={(v) => setDataSource(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sentinel">Sentinel-2 (ESA - 10m)</SelectItem>
              <SelectItem value="planet">Planet Labs (3m)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Seleção de Data */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Data da Imagem
          </label>
          <Select value={selectedDate} onValueChange={setSelectedDate} disabled={loading}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma data" />
            </SelectTrigger>
            <SelectContent>
              {availableDates.map((date) => (
                <SelectItem key={date} value={date}>
                  {new Date(date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0057FF] border-t-transparent"></div>
            <span className="text-sm text-gray-700">Processando imagem de satélite...</span>
          </div>
        )}

        {/* Dados NDVI */}
        {ndviData && !loading && (
          <>
            {/* Estatísticas Gerais */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">NDVI Médio</span>
                <span className="font-semibold text-lg text-[#0057FF]">
                  {ndviData.averageNDVI.toFixed(3)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cobertura de Nuvens</span>
                <span className="text-sm font-medium">{ndviData.cloudCover.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Data de Captura</span>
                <span className="text-sm font-medium">
                  {new Date(ndviData.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Distribuição por Biomassa */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#0057FF]" />
                <h3 className="font-semibold text-sm">Distribuição de Biomassa</h3>
              </div>

              {/* Barra de distribuição visual */}
              <div className="h-8 rounded-lg overflow-hidden flex shadow-sm">
                <div
                  style={{
                    width: `${ndviData.distribution.veryHigh}%`,
                    backgroundColor: ndviColors.veryHigh.color
                  }}
                  className="transition-all"
                  title={`${ndviData.distribution.veryHigh.toFixed(1)}%`}
                />
                <div
                  style={{
                    width: `${ndviData.distribution.high}%`,
                    backgroundColor: ndviColors.high.color
                  }}
                  className="transition-all"
                />
                <div
                  style={{
                    width: `${ndviData.distribution.medium}%`,
                    backgroundColor: ndviColors.medium.color
                  }}
                  className="transition-all"
                />
                <div
                  style={{
                    width: `${ndviData.distribution.low}%`,
                    backgroundColor: ndviColors.low.color
                  }}
                  className="transition-all"
                />
                <div
                  style={{
                    width: `${ndviData.distribution.veryLow}%`,
                    backgroundColor: ndviColors.veryLow.color
                  }}
                  className="transition-all"
                />
              </div>

              {/* Legenda com percentuais */}
              <div className="space-y-2">
                {Object.entries(ndviColors).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: data.color }}
                      />
                      <span className="text-gray-700">{data.label}</span>
                    </div>
                    <span className="font-medium">
                      {ndviData.distribution[key as keyof typeof ndviData.distribution].toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legenda NDVI */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-500" />
                <h3 className="font-semibold text-sm">Escala NDVI</h3>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                {Object.entries(ndviColors).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span>{data.label}</span>
                    <span className="font-mono text-gray-500">{data.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controle de Opacidade */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center justify-between">
                <span>Opacidade da Camada</span>
                <span className="font-medium">{opacity}%</span>
              </label>
              <Slider
                value={[opacity]}
                onValueChange={(v) => setOpacity(v[0])}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Alertas */}
            {ndviData.distribution.veryLow > 10 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-900">Atenção</p>
                  <p className="text-amber-700">
                    {ndviData.distribution.veryLow.toFixed(1)}% da área apresenta baixa biomassa.
                    Verifique possíveis problemas de irrigação ou nutrição.
                  </p>
                </div>
              </div>
            )}

            {/* Ações */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => toast.info('Recurso de download em desenvolvimento')}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </>
        )}

          {/* Estado Vazio */}
          {!ndviData && !loading && (
            <div className="text-center py-12 text-gray-500">
              <Leaf className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Selecione uma data para visualizar o NDVI</p>
            </div>
          )}
        </TabsContent>

        {/* Historical Analysis Tab */}
        <TabsContent value="history" className="flex-1 overflow-y-auto p-4 space-y-4 mt-0">
          {/* Seleção de Período */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Período de Análise
            </label>
            <Select value={selectedPeriod} onValueChange={(v) => {
              setSelectedPeriod(v as any);
              loadHistoricalData();
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="60">Últimos 60 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="180">Últimos 6 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {loadingHistory && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0057FF] border-t-transparent"></div>
              <span className="text-sm text-gray-700">Carregando histórico...</span>
            </div>
          )}

          {/* Tendência Geral */}
          {trend && !loadingHistory && (
            <div className={`rounded-lg p-4 border-2 ${
              trend.direction === 'up' ? 'bg-green-50 border-green-200' :
              trend.direction === 'down' ? 'bg-red-50 border-red-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {trend.direction === 'up' && <TrendingUp className="h-5 w-5 text-green-600" />}
                  {trend.direction === 'down' && <TrendingDown className="h-5 w-5 text-red-600" />}
                  {trend.direction === 'stable' && <BarChart3 className="h-5 w-5 text-gray-600" />}
                  <h3 className="font-semibold">Tendência do Período</h3>
                </div>
                <span className={`font-bold text-lg ${
                  trend.direction === 'up' ? 'text-green-600' :
                  trend.direction === 'down' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {trend.direction === 'up' && '+'}
                  {trend.direction === 'down' && '-'}
                  {trend.percentage.toFixed(1)}%
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {trend.direction === 'up' && '✅ Vegetação em crescimento saudável'}
                {trend.direction === 'down' && '⚠️ Declínio na biomassa detectado'}
                {trend.direction === 'stable' && 'ℹ️ Vegetação estável no período'}
              </p>
            </div>
          )}

          {/* Gráfico de Evolução NDVI */}
          {historicalData.length > 0 && !loadingHistory && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#0057FF]" />
                Evolução do NDVI
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id="colorNDVI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0057FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0057FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11 }}
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getDate()}/${d.getMonth() + 1}`;
                      }}
                    />
                    <YAxis 
                      domain={[0, 1]}
                      tick={{ fontSize: 11 }}
                      tickFormatter={(val) => val.toFixed(1)}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      labelFormatter={(date) => {
                        const d = new Date(date);
                        return d.toLocaleDateString('pt-BR');
                      }}
                      formatter={(value: any) => [value.toFixed(3), 'NDVI']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ndvi" 
                      stroke="#0057FF" 
                      strokeWidth={2}
                      fill="url(#colorNDVI)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Gráfico de Distribuição de Biomassa */}
          {historicalData.length > 0 && !loadingHistory && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#0057FF]" />
                Distribuição de Biomassa
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11 }}
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getDate()}/${d.getMonth() + 1}`;
                      }}
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      labelFormatter={(date) => {
                        const d = new Date(date);
                        return d.toLocaleDateString('pt-BR');
                      }}
                      formatter={(value: any, name: string) => [
                        `${value.toFixed(1)}%`, 
                        name === 'biomassaAlta' ? 'Alta Biomassa' : 'Baixa Biomassa'
                      ]}
                    />
                    <Legend 
                      formatter={(value) => 
                        value === 'biomassaAlta' ? 'Alta Biomassa' : 'Baixa Biomassa'
                      }
                    />
                    <Line 
                      type="monotone" 
                      dataKey="biomassaAlta" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="biomassaBaixa" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Estatísticas do Período */}
          {historicalData.length > 0 && !loadingHistory && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Estatísticas do Período</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">NDVI Máximo</p>
                  <p className="font-bold text-green-700">
                    {Math.max(...historicalData.map(d => d.ndvi)).toFixed(3)}
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">NDVI Mínimo</p>
                  <p className="font-bold text-orange-700">
                    {Math.min(...historicalData.map(d => d.ndvi)).toFixed(3)}
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">NDVI Médio</p>
                  <p className="font-bold text-blue-700">
                    {(historicalData.reduce((sum, d) => sum + d.ndvi, 0) / historicalData.length).toFixed(3)}
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Medições</p>
                  <p className="font-bold text-purple-700">
                    {historicalData.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recomendações baseadas no histórico */}
          {trend && trend.direction === 'down' && !loadingHistory && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900 mb-1">Atenção Necessária</p>
                <p className="text-amber-700">
                  Declínio de {trend.percentage.toFixed(1)}% detectado. Recomenda-se:
                </p>
                <ul className="list-disc list-inside text-amber-700 mt-2 space-y-1">
                  <li>Verificar sistema de irrigação</li>
                  <li>Avaliar necessidade de nutrientes</li>
                  <li>Inspecionar campo para pragas/doenças</li>
                  <li>Considerar análise de solo</li>
                </ul>
              </div>
            </div>
          )}

          {/* Botão Exportar Relatório Histórico */}
          {historicalData.length > 0 && !loadingHistory && (
            <Button
              onClick={exportHistoricalReport}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Exportar Relatório Histórico HTML
            </Button>
          )}

          {/* Estado Vazio */}
          {historicalData.length === 0 && !loadingHistory && (
            <div className="text-center py-12 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum dado histórico disponível</p>
              <p className="text-xs mt-2">Realize análises para gerar histórico</p>
            </div>
          )}
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="flex-1 overflow-y-auto p-4 space-y-4 mt-0">
          {/* Seleção de Período */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Período de Comparação
            </label>
            <Select value={selectedPeriod} onValueChange={(v) => setSelectedPeriod(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="60">Últimos 60 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="180">Últimos 6 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Seleção de Áreas */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <GitCompare className="h-4 w-4" />
              Selecione até 5 áreas (atual: {selectedAreasForComparison.length})
            </label>
            
            {allAreas.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-500">
                Carregando áreas...
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-3">
                {allAreas.map(area => (
                  <div
                    key={area.id}
                    className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors"
                  >
                    <Checkbox
                      checked={selectedAreasForComparison.includes(area.id)}
                      onCheckedChange={() => toggleAreaSelection(area.id)}
                      disabled={!selectedAreasForComparison.includes(area.id) && selectedAreasForComparison.length >= 5}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{area.name}</p>
                      <p className="text-xs text-gray-500">{area.area.toFixed(2)} ha</p>
                    </div>
                    {selectedAreasForComparison.includes(area.id) && (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: areaColors[selectedAreasForComparison.indexOf(area.id) % areaColors.length] 
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão Comparar */}
          <Button
            onClick={loadComparisonData}
            disabled={selectedAreasForComparison.length === 0 || loadingComparison}
            className="w-full bg-[#0057FF] hover:bg-[#0046CC]"
          >
            {loadingComparison ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <GitCompare className="h-4 w-4" />
                Comparar Áreas
              </div>
            )}
          </Button>

          {/* Resultados da Comparação */}
          {comparisonData.length > 0 && !loadingComparison && (
            <>
              {/* Gráfico Comparativo */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#0057FF]" />
                  Evolução Comparativa do NDVI
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getMergedComparisonData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 11 }}
                        tickFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getDate()}/${d.getMonth() + 1}`;
                        }}
                      />
                      <YAxis 
                        domain={[0, 1]}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(val) => val.toFixed(1)}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        labelFormatter={(date) => {
                          const d = new Date(date);
                          return d.toLocaleDateString('pt-BR');
                        }}
                        formatter={(value: any, name: string) => {
                          const area = comparisonData.find(a => a.id === name);
                          return [value?.toFixed(3) || 'N/A', area?.name || name];
                        }}
                      />
                      <Legend 
                        formatter={(value) => {
                          const area = comparisonData.find(a => a.id === value);
                          return area?.name || value;
                        }}
                      />
                      {comparisonData.map(area => (
                        <Line
                          key={area.id}
                          type="monotone"
                          dataKey={area.id}
                          stroke={area.color}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          connectNulls
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabela de Estatísticas Comparativas */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#0057FF]" />
                  Estatísticas Comparativas
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left rounded-tl-lg">Área</th>
                        <th className="p-2 text-center">NDVI Médio</th>
                        <th className="p-2 text-center">Máximo</th>
                        <th className="p-2 text-center">Mínimo</th>
                        <th className="p-2 text-center rounded-tr-lg">Tendência</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData
                        .sort((a, b) => b.stats.avgNDVI - a.stats.avgNDVI)
                        .map((area, index) => (
                        <tr key={area.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: area.color }}
                              />
                              <div>
                                <p className="font-medium truncate max-w-[100px]">{area.name}</p>
                                <p className="text-gray-500">{area.area.toFixed(1)} ha</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-center font-semibold">{area.stats.avgNDVI}</td>
                          <td className="p-2 text-center text-green-600">{area.stats.maxNDVI}</td>
                          <td className="p-2 text-center text-orange-600">{area.stats.minNDVI}</td>
                          <td className="p-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {area.stats.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
                              {area.stats.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-600" />}
                              {area.stats.trend === 'stable' && <span className="text-gray-500">→</span>}
                              <span className={
                                area.stats.trend === 'up' ? 'text-green-600' :
                                area.stats.trend === 'down' ? 'text-red-600' :
                                'text-gray-500'
                              }>
                                {area.stats.trendPercentage}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ranking e Análise */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#0057FF]" />
                  Análise Comparativa
                </h3>

                {/* Melhor Performance */}
                {(() => {
                  const bestArea = comparisonData.reduce((best, current) => 
                    current.stats.avgNDVI > best.stats.avgNDVI ? current : best
                  );
                  const worstArea = comparisonData.reduce((worst, current) => 
                    current.stats.avgNDVI < worst.stats.avgNDVI ? current : worst
                  );
                  
                  return (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-green-900 mb-1">
                              🏆 Melhor Performance
                            </p>
                            <p className="text-green-700">
                              <span className="font-semibold">{bestArea.name}</span> apresenta o melhor 
                              NDVI médio ({bestArea.stats.avgNDVI}), indicando vegetação mais saudável 
                              e uniforme no período analisado.
                            </p>
                          </div>
                        </div>
                      </div>

                      {comparisonData.length > 1 && bestArea.id !== worstArea.id && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-amber-900 mb-1">
                                ⚠️ Requer Atenção
                              </p>
                              <p className="text-amber-700">
                                <span className="font-semibold">{worstArea.name}</span> apresenta NDVI 
                                médio mais baixo ({worstArea.stats.avgNDVI}). Diferença de{' '}
                                {((bestArea.stats.avgNDVI - worstArea.stats.avgNDVI) * 100).toFixed(1)}% 
                                em relação à melhor área.
                              </p>
                              <ul className="list-disc list-inside mt-2 space-y-1 text-amber-700">
                                <li>Comparar práticas de manejo entre as áreas</li>
                                <li>Verificar diferenças de solo e topografia</li>
                                <li>Avaliar uniformidade de irrigação e fertilização</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Análise de Tendências */}
                      {(() => {
                        const areasComDeclinio = comparisonData.filter(a => a.stats.trend === 'down');
                        if (areasComDeclinio.length > 0) {
                          return (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <TrendingDown className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm">
                                  <p className="font-medium text-red-900 mb-1">
                                    📉 Áreas em Declínio
                                  </p>
                                  <p className="text-red-700 mb-2">
                                    {areasComDeclinio.length} área(s) apresentam tendência de declínio:
                                  </p>
                                  <ul className="space-y-1">
                                    {areasComDeclinio.map(area => (
                                      <li key={area.id} className="text-red-700">
                                        • <span className="font-semibold">{area.name}</span>: 
                                        -{area.stats.trendPercentage}%
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })()}
                    </>
                  );
                })()}
              </div>

              {/* Recomendações */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Leaf className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">💡 Recomendações</p>
                    <ul className="list-disc list-inside text-blue-700 space-y-1">
                      <li>Use a melhor área como referência para as demais</li>
                      <li>Documente as práticas da área com melhor performance</li>
                      <li>Uniformize manejo nas áreas com resultados similares</li>
                      <li>Priorize investimentos nas áreas com maior potencial</li>
                      <li>Monitore semanalmente as áreas em declínio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Botão Exportar Relatório de Comparação */}
          {comparisonData.length > 0 && !loadingComparison && (
            <Button
              onClick={exportComparisonReport}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Exportar Relatório de Comparação HTML
            </Button>
          )}

          {/* Estado Vazio */}
          {comparisonData.length === 0 && !loadingComparison && (
            <div className="text-center py-12 text-gray-500">
              <GitCompare className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium mb-2">Compare múltiplas áreas</p>
              <p className="text-xs">Selecione até 5 áreas e clique em "Comparar"</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Botão de Fechar Fixo (Mobile) */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={onClose}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
        >
          <X className="h-5 w-5" />
          Fechar Análise NDVI
        </button>
      </div>
    </div>
    </>
  );
});

export default NDVIViewer;
