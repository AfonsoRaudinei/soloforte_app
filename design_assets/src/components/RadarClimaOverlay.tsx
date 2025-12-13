import { memo, useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface RadarClimaOverlayProps {
  onClose: () => void;
  map?: any; // Instância do Leaflet
}

interface RadarFrame {
  time: number;
  path: string;
  host: string;
}

const RadarClimaOverlay = memo(function RadarClimaOverlay({ onClose, map }: RadarClimaOverlayProps) {
  const [frames, setFrames] = useState<RadarFrame[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [radarType, setRadarType] = useState<'past' | 'forecast'>('past');
  const [showDropdown, setShowDropdown] = useState(false);
  const radarLayerRef = useRef<any>(null);
  const animationInterval = useRef<NodeJS.Timeout | null>(null);

  // Buscar dados do RainViewer API
  useEffect(() => {
    fetchRadarData();
  }, []);

  const fetchRadarData = async () => {
    try {
      console.log('🌧️ Buscando dados do radar RainViewer...');
      const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
      const data = await response.json();
      
      const radarFrames: RadarFrame[] = [];
      
      // Frames do passado (últimas 2 horas)
      if (data.radar && data.radar.past) {
        data.radar.past.slice(-10).forEach((frame: any) => {
          radarFrames.push({
            time: frame.time,
            path: frame.path,
            host: data.host
          });
        });
      }
      
      // Frame atual
      if (data.radar && data.radar.nowcast && data.radar.nowcast.length > 0) {
        radarFrames.push({
          time: data.radar.nowcast[0].time,
          path: data.radar.nowcast[0].path,
          host: data.host
        });
      }
      
      // Frames futuros (próximas 2 horas - previsão)
      if (data.radar && data.radar.nowcast) {
        data.radar.nowcast.slice(1, 11).forEach((frame: any) => {
          radarFrames.push({
            time: frame.time,
            path: frame.path,
            host: data.host
          });
        });
      }

      console.log(`✅ ${radarFrames.length} frames de radar carregados`);
      setFrames(radarFrames);
      
      // Começar no frame atual (meio da timeline)
      setCurrentFrameIndex(10);
      setLoading(false);
    } catch (error) {
      console.error('❌ Erro ao carregar dados do radar:', error);
      setLoading(false);
    }
  };

  // Atualizar camada do radar no mapa quando mudar o frame
  useEffect(() => {
    if (!map || !frames.length || loading) return;

    const currentFrame = frames[currentFrameIndex];
    if (!currentFrame) return;

    // Remover camada anterior
    if (radarLayerRef.current) {
      try {
        map.removeLayer(radarLayerRef.current);
      } catch (error) {
        console.warn('⚠️ Erro ao remover camada anterior do radar:', error);
      }
    }

    // Criar URL completa do tile
    const tileUrl = `${currentFrame.host}${currentFrame.path}/256/{z}/{x}/{y}/2/1_1.png`;

    // Adicionar nova camada de radar com verificações
    const L = (window as any).L;
    if (!L) {
      console.error('❌ Leaflet não está disponível');
      return;
    }

    try {
      // Verificar se o mapa está pronto antes de adicionar camada
      if (!map.getPanes || !map.getPanes()) {
        console.warn('⚠️ Mapa não está pronto para receber camadas - aguardando...');
        return;
      }

      radarLayerRef.current = L.tileLayer(tileUrl, {
        opacity: 0.7,
        zIndex: 200,
        attribution: ''
      });
      
      radarLayerRef.current.addTo(map);
      console.log('✅ Camada de radar adicionada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao adicionar camada de radar:', error);
    }

    return () => {
      if (radarLayerRef.current) {
        try {
          map.removeLayer(radarLayerRef.current);
          radarLayerRef.current = null;
        } catch (error) {
          console.warn('⚠️ Erro ao remover camada do radar no cleanup:', error);
        }
      }
    };
  }, [currentFrameIndex, frames, map, loading]);

  // Auto-play automático (sempre ligado)
  useEffect(() => {
    if (frames.length > 0) {
      animationInterval.current = setInterval(() => {
        setCurrentFrameIndex(prev => {
          const next = prev + 1;
          if (next >= frames.length) {
            return 0;
          }
          return next;
        });
      }, 400);
    }

    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
    };
  }, [frames.length]);

  // Formatar timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 pointer-events-auto">
          <div className="flex items-center gap-3 text-white">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            <p className="text-sm">Carregando radar...</p>
          </div>
        </div>
      </div>
    );
  }

  if (frames.length === 0) return null;

  const currentTime = formatTime(frames[currentFrameIndex]?.time || 0);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Header Compacto - Igual às imagens */}
      <div className="absolute top-0 left-0 right-0 pointer-events-auto bg-white dark:bg-gray-900 shadow-md">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-[#0057FF] flex items-center gap-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Voltar</span>
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-gray-900 dark:text-white font-medium">Radar</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Operação de JOSE AUGUSTO MIRANDA</p>
          </div>

          <button className="text-[#0057FF]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>

        {/* Dropdown Tipo de Radar */}
        <div className="px-4 pb-3">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-gray-800 dark:bg-gray-700 text-white rounded-lg px-3 py-2.5 flex items-center justify-between"
          >
            <span className="text-sm">
              {radarType === 'past' ? 'Chuva - Últimas 24 Horas' : 'Radar - Próximas 6 Horas'}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {showDropdown && (
            <div className="absolute left-4 right-4 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <button
                onClick={() => {
                  setRadarType('past');
                  setShowDropdown(false);
                  setCurrentFrameIndex(0);
                }}
                className="w-full px-3 py-2.5 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Chuva - Últimas 24 Horas
              </button>
              <button
                onClick={() => {
                  setRadarType('forecast');
                  setShowDropdown(false);
                  setCurrentFrameIndex(11);
                }}
                className="w-full px-3 py-2.5 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Radar - Próximas 6 Horas
              </button>
            </div>
          )}
        </div>

        {/* Escala de Cores Horizontal - Exatamente como nas imagens */}
        <div className="px-4 pb-3">
          <div className="relative">
            {/* Barra de gradiente */}
            <div className="h-3 rounded-sm overflow-hidden flex shadow-sm">
              <div className="flex-1 bg-gradient-to-r from-[#4ade80] via-[#86efac] to-[#bbf7d0]" />
              <div className="flex-1 bg-gradient-to-r from-[#bbf7d0] via-[#fde047] to-[#facc15]" />
              <div className="flex-1 bg-gradient-to-r from-[#facc15] via-[#fb923c] to-[#f97316]" />
              <div className="flex-1 bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#dc2626]" />
              <div className="flex-1 bg-gradient-to-r from-[#dc2626] via-[#a855f7] to-[#9333ea]" />
            </div>
            
            {/* Labels de quantidade - como na imagem */}
            <div className="flex justify-between mt-0.5 px-0.5">
              <span className="text-[9px] text-gray-700 dark:text-gray-300">25</span>
              <span className="text-[9px] text-gray-700 dark:text-gray-300">25</span>
              <span className="text-[9px] text-gray-700 dark:text-gray-300">50</span>
              <span className="text-[9px] text-gray-700 dark:text-gray-300">75</span>
              <span className="text-[9px] text-gray-700 dark:text-gray-300">100</span>
              <span className="text-[9px] text-gray-700 dark:text-gray-300">150</span>
              <span className="text-[9px] text-gray-700 dark:text-gray-300">200mm</span>
            </div>
          </div>
        </div>

        {/* NORTE - canto superior esquerdo */}
        <div className="absolute left-3 top-[110px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-gray-800 dark:text-gray-200 font-medium tracking-[0.2em]">
          NORTE
        </div>
      </div>

      {/* Timestamp Discreto - Canto Inferior Direito (como na imagem 2) */}
      <div className="absolute bottom-20 right-4 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white font-medium">
          {currentTime}
        </div>
      </div>
    </div>
  );
});

export default RadarClimaOverlay;
