import { useEffect, useRef, useState, memo } from 'react';
import { MapPin } from 'lucide-react';
import { tileManager } from '../utils/TileManager';
import { OfflineMapControls } from './OfflineMapControls';
import { leafletLoader } from '../utils/leafletLoader';

interface MapTilerComponentProps {
  mapStyle?: 'streets' | 'satellite' | 'terrain';
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  onMapLoad?: (map: any) => void;
  onMapReady?: (map: any) => void;
  onMapClick?: (lat: number, lng: number) => void;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    tipo: string;
    severidade: string;
  }>;
  hideControls?: boolean;
}

const MapTilerComponent = memo(function MapTilerComponent({ 
  mapStyle = 'satellite', 
  center = [-47.9292, -15.7801],
  zoom = 4,
  minZoom = 3,
  maxZoom = 18,
  onMapLoad, 
  onMapReady,
  onMapClick,
  markers = [],
  hideControls = false
}: MapTilerComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const currentTileLayer = useRef<any>(null); // ✅ Referência para a camada de tiles ativa
  const isUpdatingLayer = useRef<boolean>(false); // ✅ Flag para evitar atualizações simultâneas
  const updateTimer = useRef<NodeJS.Timeout | null>(null); // ✅ Timer para debounce
  const currentStyle = useRef<string>(mapStyle); // ✅ Rastrear estilo atual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [leaflet, setLeaflet] = useState<any>(null);

  // Carregar Leaflet usando o LeafletLoader
  useEffect(() => {
    let mounted = true;
    
    const loadLeaflet = async () => {
      try {
        console.log('🗺️ Carregando Leaflet via LeafletLoader...');
        
        // Usar o LeafletLoader centralizado
        const L = await leafletLoader.load();
        
        if (mounted) {
          console.log('✅ Leaflet carregado com sucesso!');
          setLeaflet(L);
          setLoading(false);
        }
      } catch (err) {
        console.error('❌ Erro ao carregar Leaflet:', err);
        if (mounted) {
          setLoading(false);
          setError(true);
        }
      }
    };

    loadLeaflet();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Função para atualizar camadas (movida para antes dos useEffects que a usam)
  const updateMapLayer = (mapInstance: any, style: string) => {
    if (!leaflet) {
      console.warn('⚠️ Leaflet não disponível para atualizar camadas');
      return;
    }

    // ✅ Verificar se mapInstance é válido E tem estrutura DOM completa
    if (!mapInstance || !mapInstance._container) {
      console.warn('⚠️ MapInstance inválido, não é possível atualizar camada');
      return;
    }

    // ✅ Verificar se estrutura interna do Leaflet está pronta
    if (!mapInstance._panes || !mapInstance._panes.overlayPane) {
      console.warn('⚠️ Estrutura interna do mapa ainda não está pronta, aguardando...');
      // Tentar novamente após um pequeno delay
      setTimeout(() => {
        if (mapInstance && mapInstance._container && mapInstance._panes) {
          updateMapLayer(mapInstance, style);
        }
      }, 100);
      return;
    }

    // ✅ Prevenir múltiplas atualizações simultâneas
    if (isUpdatingLayer.current) {
      console.log('⏳ Atualização de camada já em progresso, aguardando...');
      return;
    }

    isUpdatingLayer.current = true;
    console.log(`🗺️ Atualizando camada do mapa para: ${style}`);

    // ✅ Remover TODAS as camadas de tiles (limpar completamente)
    try {
      const layersToRemove: any[] = [];
      
      // Verificar se mapInstance.eachLayer existe
      if (typeof mapInstance.eachLayer === 'function') {
        // Coletar todas as camadas de tiles primeiro
        mapInstance.eachLayer((layer: any) => {
          if (layer instanceof leaflet.TileLayer) {
            layersToRemove.push(layer);
          }
        });
        
        // Remover todas de uma vez
        layersToRemove.forEach(layer => {
          console.log('🧹 Removendo camada de tiles...');
          try {
            if (mapInstance && mapInstance._container) {
              mapInstance.removeLayer(layer);
            }
          } catch (err) {
            // Ignorar erro se camada já foi removida ou map foi destruído
          }
        });
      }
      
      currentTileLayer.current = null;
      console.log(`✅ ${layersToRemove.length} camada(s) de tiles removida(s)`);
    } catch (e) {
      console.warn('⚠️ Erro ao remover camadas anteriores:', e);
    }

    // URLs dos tiles
    let tileUrl = '';
    let attribution = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    let layerMinZoom = minZoom;
    let layerMaxZoom = 19;

    switch (style) {
      case 'satellite':
        // ✅ ESRI World Imagery - melhor cobertura em TODOS os zooms (0-19)
        // Tem satélite real desde visão global até detalhes locais
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = '© Esri, Maxar, Earthstar Geographics';
        layerMinZoom = 0; // Funciona desde zoom 0 (visão global)
        layerMaxZoom = 19;
        console.log('🛰️ Carregando camada ESRI World Imagery (cobertura completa)');
        break;
      case 'terrain':
        // OpenTopoMap (relevo)
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        attribution = '© OpenTopoMap contributors';
        layerMinZoom = 3;
        layerMaxZoom = 17; // OpenTopoMap vai até zoom 17
        console.log('🏔️ Carregando camada OpenTopoMap (terreno)');
        break;
      case 'streets':
      default:
        // OpenStreetMap padrão
        tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        attribution = '© OpenStreetMap contributors';
        layerMinZoom = 0;
        layerMaxZoom = 19;
        console.log('🗺️ Carregando camada OpenStreetMap (ruas)');
        break;
    }

    // Criar nova camada de tiles com configurações otimizadas
    const tileLayerOptions: any = {
      minZoom: layerMinZoom,
      maxZoom: layerMaxZoom,
      attribution: attribution,
      updateWhenIdle: false,
      keepBuffer: 2,
      errorTileUrl: '', // Não mostrar tiles de erro
    };

    // Adicionar subdomains apenas para camadas que usam {s}
    if (tileUrl.includes('{s}')) {
      tileLayerOptions.subdomains = ['a', 'b', 'c'];
    }

    const tileLayer = leaflet.tileLayer(tileUrl, tileLayerOptions);

    // ✅ NOVA ABORDAGEM: Usar eventos nativos do Leaflet (mais robusto)
    // Isso previne race conditions e é compatível com o sistema de tiles do Leaflet
    
    // Evento quando um tile começa a carregar
    tileLayer.on('tileloadstart', (event: any) => {
      const tile = event.tile;
      const coords = event.coords || { x: 0, y: 0, z: 0 };
      const url = tileLayer.getTileUrl(coords);
      
      // Tentar carregar do cache ANTES do navegador fazer fetch
      // Isso economiza banda e permite funcionamento offline
      tileManager.getTile(url, coords.x, coords.y, coords.z)
        .then(cachedUrl => {
          // Só aplicar se tile ainda não carregou
          if (tile && tile instanceof HTMLImageElement && !tile.complete) {
            tile.src = cachedUrl;
          }
        })
        .catch(() => {
          // Deixar Leaflet tentar carregar normalmente da rede
          // TileManager já logou o erro adequadamente
        });
    });

    // Evento quando um tile falha ao carregar
    tileLayer.on('tileerror', (event: any) => {
      const tile = event.tile;
      if (tile && tile instanceof HTMLImageElement) {
        // Esconder tile com erro (404, CORS, etc)
        tile.style.opacity = '0';
        // Prevenir que Leaflet mostre imagem quebrada
        tile.src = '';
      }
    });

    // Evento quando um tile carrega com sucesso
    tileLayer.on('tileload', () => {
      // Tile carregado com sucesso - nada a fazer
      // (TileManager já salvou no cache durante getTile)
    });

    // ✅ Verificar se mapInstance ainda está válido
    if (!mapInstance || !mapInstance._container) {
      console.warn('⚠️ MapInstance inválido, cancelando atualização de camada');
      isUpdatingLayer.current = false;
      return;
    }

    // ✅ Aguardar um frame antes de adicionar nova camada (evita flicker)
    requestAnimationFrame(() => {
      // Verificar novamente se ainda está válido
      if (!mapInstance || !mapInstance._container) {
        console.warn('⚠️ MapInstance foi destruído antes de adicionar camada');
        isUpdatingLayer.current = false;
        return;
      }

      try {
        // ✅ Verificação final antes de adicionar camada
        // (a verificação principal já foi feita no início da função)
        if (!mapInstance || !mapInstance._container || !mapInstance._panes) {
          console.warn('⚠️ Mapa foi destruído antes de adicionar camada');
          isUpdatingLayer.current = false;
          return;
        }
        
        // Adicionar nova camada ao mapa com verificação
        try {
          tileLayer.addTo(mapInstance);
          // ✅ Guardar referência da camada atual
          currentTileLayer.current = tileLayer;
          console.log(`✅ Camada ${style} adicionada com sucesso!`);
        } catch (err) {
          console.error('❌ Erro ao adicionar camada ao mapa:', err);
          isUpdatingLayer.current = false;
          return;
        }

        // Forçar o mapa a redesenhar
        setTimeout(() => {
          if (mapInstance && mapInstance._container) {
            mapInstance.invalidateSize();
            console.log('🔄 Mapa redimensionado e pronto');
          }
          isUpdatingLayer.current = false; // ✅ Liberar flag
        }, 100);
      } catch (err) {
        console.error('❌ Erro geral ao processar camada:', err);
        isUpdatingLayer.current = false;
      }
    });
  };

  // Inicializar mapa quando Leaflet estiver carregado
  useEffect(() => {
    if (!leaflet || !mapContainer.current || map.current) {
      return;
    }

    try {
      console.log('🗺️ Inicializando mapa Leaflet...');
      console.log(`📍 Centro inicial: [${center[0]}, ${center[1]}]`);
      
      // Criar mapa com configurações otimizadas
      const mapInstance = leaflet.map(mapContainer.current, {
        center: [center[1], center[0]], // Leaflet usa [lat, lng]
        zoom: zoom,
        minZoom: minZoom,
        maxZoom: maxZoom,
        zoomControl: false, // ✅ SEMPRE desabilitado - usar gestos mobile (pinch-to-zoom)
        attributionControl: !hideControls,
        preferCanvas: false, // Usar SVG (melhor para mobile)
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true,
        trackResize: true,
      });

      console.log('✅ Instância do mapa criada');

      map.current = mapInstance;

      // ✅ Aguardar o mapa estar completamente pronto antes de adicionar camadas
      // O Leaflet precisa de um frame para criar _panes e overlayPane
      requestAnimationFrame(() => {
        // Verificar se o mapa ainda existe e está montado
        if (map.current && map.current._container) {
          // Adicionar camada base inicial
          updateMapLayer(map.current, mapStyle);
        }
      });

      setLoading(false);

      console.log('✅ Mapa totalmente inicializado e pronto para uso!');

      if (onMapLoad) {
        onMapLoad(mapInstance);
      }

      if (onMapReady) {
        onMapReady(mapInstance);
      }

      // Adicionar handler de clique no mapa
      if (onMapClick) {
        mapInstance.on('click', (e: any) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        });
      }

      // Adicionar marcador de exemplo apenas se não estiver escondendo controles
      if (!hideControls) {
        const defaultMarker = leaflet.marker([-23.5505, -46.6333], {
        icon: leaflet.divIcon({
          className: 'custom-marker',
          html: '<div style="background: #0057FF; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        })
      }).addTo(mapInstance);
      defaultMarker.bindPopup('<b>📍 Localização Padrão</b><br>São Paulo - Brasil');

      console.log('📍 Marcador padrão adicionado');
      }

    } catch (err) {
      console.error('❌ Erro ao inicializar mapa:', err);
      setLoading(false);
      setError(true);
    }

    // Cleanup
    return () => {
      if (map.current) {
        console.log('🧹 Limpando instância do mapa');
        
        // Limpar todos os timers
        if (updateTimer.current) {
          clearTimeout(updateTimer.current);
          updateTimer.current = null;
        }
        
        // ✅ NOVO: Limpar Blob URLs do TileManager (previne memory leaks)
        try {
          tileManager.cleanup();
          console.log('✅ Blob URLs do TileManager limpos');
        } catch (e) {
          console.warn('⚠️ Erro ao limpar TileManager:', e);
        }
        
        // Remover todas as camadas
        try {
          if (map.current._container && typeof map.current.eachLayer === 'function') {
            map.current.eachLayer((layer: any) => {
              try {
                // Remover event listeners da camada
                if (layer.off) {
                  layer.off();
                }
                map.current.removeLayer(layer);
              } catch (err) {
                // Ignorar erros individuais
              }
            });
          }
        } catch (e) {
          console.warn('⚠️ Erro ao remover camadas na limpeza:', e);
        }
        
        // Remover o mapa
        try {
          if (map.current._container) {
            map.current.remove();
          }
        } catch (e) {
          console.warn('⚠️ Erro ao remover mapa:', e);
        }
        
        map.current = null;
        currentTileLayer.current = null;
        isUpdatingLayer.current = false;
      }
    };
  }, [leaflet]);

  // Atualizar camada quando mudar o estilo
  useEffect(() => {
    if (map.current && leaflet) {
      // ✅ Verificar se realmente mudou (evita re-renders desnecessários)
      if (currentStyle.current === mapStyle) {
        return;
      }
      
      // ✅ Verificar se map ainda está válido
      if (!map.current._container) {
        console.warn('⚠️ Mapa foi destruído, não é possível atualizar camada');
        return;
      }
      
      console.log(`🔄 Detectada mudança de camada de ${currentStyle.current} para: ${mapStyle}`);
      
      // ✅ NOVO: Limpar Blob URLs antes de trocar camada (previne memory leak)
      try {
        tileManager.cleanup();
        console.log('🧹 Blob URLs limpos antes de trocar camada');
      } catch (e) {
        console.warn('⚠️ Erro ao limpar Blob URLs:', e);
      }
      
      // ✅ Cancelar timer anterior se existir
      if (updateTimer.current) {
        clearTimeout(updateTimer.current);
      }
      
      // ✅ Debounce: aguardar 150ms antes de trocar (evita múltiplas trocas rápidas)
      updateTimer.current = setTimeout(() => {
        // Verificar novamente se map ainda é válido
        if (!isUpdatingLayer.current && map.current && map.current._container) {
          currentStyle.current = mapStyle;
          updateMapLayer(map.current, mapStyle);
        }
      }, 150);
      
      return () => {
        if (updateTimer.current) {
          clearTimeout(updateTimer.current);
        }
      };
    }
  }, [mapStyle, leaflet]);

  // Adicionar marcadores de ocorrências
  useEffect(() => {
    if (!map.current || !leaflet || markers.length === 0) return;

    // ✅ Verificar se mapa ainda é válido
    if (!map.current._container) {
      console.warn('⚠️ Mapa não está disponível para adicionar marcadores');
      return;
    }

    try {
      // Remover marcadores antigos de ocorrências
      if (typeof map.current.eachLayer === 'function') {
        map.current.eachLayer((layer: any) => {
          if (layer.options?.isOcorrenciaMarker) {
            try {
              map.current.removeLayer(layer);
            } catch (err) {
              // Ignorar erro
            }
          }
        });
      }
    } catch (err) {
      console.warn('⚠️ Erro ao remover marcadores antigos:', err);
    }

    // Adicionar novos marcadores
    try {
      markers.forEach((marker) => {
        // ✅ Verificar se mapa ainda é válido antes de adicionar cada marcador
        if (!map.current || !map.current._container) {
          return;
        }

        try {
          const color = marker.severidade === 'alta' ? '#EF4444' : 
                        marker.severidade === 'media' ? '#F59E0B' : '#10B981';
          
          const icon = marker.tipo === 'planta-daninha' ? '🌿' :
                       marker.tipo === 'doencas' ? '🦠' :
                       marker.tipo === 'inseto' ? '🐛' :
                       marker.tipo === 'nutricional' ? '🌱' : '📋';

          const markerInstance = leaflet.marker([marker.lat, marker.lng], {
            isOcorrenciaMarker: true,
            icon: leaflet.divIcon({
              className: 'custom-marker-ocorrencia',
              html: `<div style="background: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 16px;">${icon}</div>`,
              iconSize: [38, 38],
              iconAnchor: [19, 19],
            })
          }).addTo(map.current);

          const tipoLabel = marker.tipo === 'planta-daninha' ? 'Planta Daninha' :
                            marker.tipo === 'doencas' ? 'Doenças' :
                            marker.tipo === 'inseto' ? 'Inseto' :
                            marker.tipo === 'nutricional' ? 'Nutricional' : 'Outros';
          
          const severidadeLabel = marker.severidade === 'alta' ? '🔴 Alta' :
                                  marker.severidade === 'media' ? '🟡 Média' : '🟢 Baixa';

          markerInstance.bindPopup(`
            <div style="min-width: 150px;">
              <b>${icon} ${tipoLabel}</b><br>
              Severidade: ${severidadeLabel}<br>
              <small style="color: #666;">ID: ${marker.id.slice(-8)}</small>
            </div>
          `);
        } catch (err) {
          console.warn('⚠️ Erro ao adicionar marcador:', err);
        }
      });
    } catch (err) {
      console.warn('⚠️ Erro ao processar marcadores:', err);
    }
  }, [markers, leaflet]);

  if (error) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="text-gray-700 mb-2">Mapa temporariamente indisponível</p>
          <p className="text-gray-500 text-xs mb-4">Verifique sua conexão e tente novamente</p>
          <button
            onClick={() => {
              setError(false);
              setLoading(true);
              window.location.reload();
            }}
            className="px-4 py-2 bg-[#0057FF] text-white rounded-lg text-sm hover:bg-[#0046CC] transition-colors"
          >
            🔄 Tentar Novamente
          </button>
          <p className="text-gray-400 text-xs mt-4">Ou continue explorando o app normalmente</p>
        </div>
      </div>
    );
  }

  if (!leaflet || loading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-[#0057FF]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#0057FF] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-700 mb-1">Carregando mapa...</p>
          <p className="text-gray-500 text-xs">Isso pode levar alguns segundos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div 
        ref={mapContainer} 
        className="h-full w-full" 
        style={{ minHeight: '100%', minWidth: '100%', position: 'relative', zIndex: 1 }}
      />
      
      {/* ✅ Controles de Mapas Offline (ocultar se hideControls) */}
      {!hideControls && (
        <OfflineMapControls 
          map={map.current} 
          mapStyle={mapStyle}
        />
      )}
    </div>
  );
});

export default MapTilerComponent;