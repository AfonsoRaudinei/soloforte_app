/**
 * 🗺️ OFFLINE MAP CONTROLS
 * 
 * Controles para gerenciar cache de mapas offline
 * 
 * Funcionalidades:
 * - Pré-carregar área visível
 * - Visualizar estatísticas do cache
 * - Limpar cache
 * - Indicador de status online/offline
 * 
 * @version 1.0.0
 */

import { useState, useEffect, memo } from 'react';
import { Download, Database, Trash2, WifiOff, Wifi, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { tileManager } from '../utils/TileManager';
import { logger } from '../utils/logger';

interface OfflineMapControlsProps {
  map: L.Map | null;
  mapStyle: 'streets' | 'satellite' | 'terrain';
  onPreloadStart?: () => void;
  onPreloadComplete?: () => void;
}

export const OfflineMapControls = memo(function OfflineMapControls({
  map,
  mapStyle,
  onPreloadStart,
  onPreloadComplete
}: OfflineMapControlsProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [cacheStats, setCacheStats] = useState({
    totalTiles: 0,
    totalSizeMB: 0,
    oldestTile: null as Date | null,
    newestTile: null as Date | null
  });
  const [showDetails, setShowDetails] = useState(false);

  // ===================================
  // LISTENERS
  // ===================================

  useEffect(() => {
    // Listener de status de rede
    const handleOnline = () => {
      setIsOnline(true);
      logger.log('📶 ONLINE');
      toast.success('Conexão restaurada!');
    };

    const handleOffline = () => {
      setIsOnline(false);
      logger.log('📵 OFFLINE');
      toast.info('Você está offline. Usando cache local.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Atualizar stats inicialmente
    updateCacheStats();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ===================================
  // ATUALIZAR ESTATÍSTICAS DO CACHE
  // ===================================

  const updateCacheStats = async () => {
    try {
      const stats = await tileManager.getCacheStats();
      setCacheStats(stats);
    } catch (error) {
      logger.error('❌ Erro ao atualizar stats do cache:', error);
    }
  };

  // ===================================
  // PRÉ-CARREGAR ÁREA VISÍVEL
  // ===================================

  const handlePreloadArea = async () => {
    if (!map) {
      toast.error('Mapa não está pronto');
      return;
    }

    if (!isOnline) {
      toast.error('Você precisa estar online para baixar mapas');
      return;
    }

    setIsPreloading(true);
    setPreloadProgress(0);
    if (onPreloadStart) onPreloadStart();

    try {
      const bounds = map.getBounds();
      const currentZoom = map.getZoom();

      // Pré-carregar área visível + 2 zooms acima/abaixo
      const minZoom = Math.max(currentZoom - 2, 10);
      const maxZoom = Math.min(currentZoom + 2, 18);

      // URL do tile baseado no estilo
      let tileUrl = '';
      switch (mapStyle) {
        case 'satellite':
          tileUrl = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
          break;
        case 'terrain':
          tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
          break;
        default:
          tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      }

      logger.log('📦 Iniciando download de área offline...');

      await tileManager.preloadArea(
        {
          minLat: bounds.getSouth(),
          maxLat: bounds.getNorth(),
          minLng: bounds.getWest(),
          maxLng: bounds.getEast()
        },
        minZoom,
        maxZoom,
        tileUrl,
        (progress, total) => {
          const percentage = Math.round((progress / total) * 100);
          setPreloadProgress(percentage);
          logger.log(`📥 Progresso: ${progress}/${total} tiles (${percentage}%)`);
        }
      );

      toast.success('✅ Área carregada para uso offline!');
      await updateCacheStats();
      
      if (onPreloadComplete) onPreloadComplete();
      
    } catch (error) {
      logger.error('❌ Erro ao pré-carregar área:', error);
      toast.error('Erro ao baixar mapas offline');
    } finally {
      setIsPreloading(false);
      setPreloadProgress(0);
    }
  };

  // ===================================
  // LIMPAR CACHE
  // ===================================

  const handleClearCache = async () => {
    if (confirm('⚠️ Tem certeza que deseja limpar o cache de mapas offline?\n\nVocê precisará baixar os mapas novamente.')) {
      try {
        await tileManager.clearCache();
        setCacheStats({
          totalTiles: 0,
          totalSizeMB: 0,
          oldestTile: null,
          newestTile: null
        });
        toast.success('🗑️ Cache de mapas limpo');
        logger.log('🗑️ Cache limpo pelo usuário');
      } catch (error) {
        logger.error('❌ Erro ao limpar cache:', error);
        toast.error('Erro ao limpar cache');
      }
    }
  };

  // ===================================
  // RENDER
  // ===================================

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      {/* Painel de Controles - OCULTO */}
      <div className="hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 space-y-3 min-w-[220px]">
        {/* Header com Stats */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Cache Offline</span>
          </div>
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
            {cacheStats.totalTiles} tiles
          </span>
        </button>

        {/* Detalhes (Expandível) */}
        {showDetails && (
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 border-t border-gray-200 dark:border-gray-700 pt-2">
            <div className="flex justify-between">
              <span>Tamanho:</span>
              <span className="font-medium">{cacheStats.totalSizeMB.toFixed(1)} MB</span>
            </div>
            {cacheStats.newestTile && (
              <div className="flex justify-between">
                <span>Atualizado:</span>
                <span className="font-medium">
                  {new Date(cacheStats.newestTile).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Botão de Download */}
        <Button
          size="sm"
          onClick={handlePreloadArea}
          disabled={isPreloading || !isOnline}
          className="w-full"
        >
          {isPreloading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Baixando...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Baixar Offline
            </>
          )}
        </Button>

        {/* Barra de Progresso */}
        {isPreloading && (
          <div className="space-y-1">
            <Progress value={preloadProgress} className="w-full h-2" />
            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              {preloadProgress}%
            </p>
          </div>
        )}

        {/* Botão de Limpar Cache */}
        {cacheStats.totalTiles > 0 && !isPreloading && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleClearCache}
            className="w-full text-xs"
          >
            <Trash2 className="h-3 w-3 mr-2" />
            Limpar Cache
          </Button>
        )}

        {/* Mensagem de Ajuda */}
        {!isOnline && cacheStats.totalTiles === 0 && (
          <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
            ⚠️ Sem mapas offline. Conecte-se à internet para baixar.
          </div>
        )}
      </div>
    </div>
  );
});