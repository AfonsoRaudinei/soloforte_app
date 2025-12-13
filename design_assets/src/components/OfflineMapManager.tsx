/**
 * 🗺️ OFFLINE MAP MANAGER
 * 
 * Gerenciador completo de mapas offline com downloads contextuais:
 * - Download por região geral
 * - Download por produtor (todas as fazendas)
 * - Download por fazenda específica
 * - Download por talhão específico
 * 
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { Download, Trash2, MapPin, User, Home, Grid3x3, Loader2, Check, X, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { tileManager } from '../utils/TileManager';
import { logger } from '../utils/logger';
import { useProdutores } from '../utils/hooks/useProdutores';

interface OfflineMapManagerProps {
  onClose: () => void;
}

interface DownloadTask {
  id: string;
  tipo: 'geral' | 'produtor' | 'fazenda' | 'talhao';
  nome: string;
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
  zoom: { min: number; max: number };
  estimatedTiles: number;
  status: 'pendente' | 'baixando' | 'concluido' | 'erro';
  progress: number;
}

export default function OfflineMapManager({ onClose }: OfflineMapManagerProps) {
  const { produtores, loading: loadingProdutores } = useProdutores();
  const [cacheStats, setCacheStats] = useState({
    totalTiles: 0,
    totalSizeMB: 0,
    oldestTile: null as Date | null,
    newestTile: null as Date | null
  });
  
  const [selectedTipo, setSelectedTipo] = useState<'geral' | 'produtor' | 'fazenda' | 'talhao'>('geral');
  const [selectedProdutor, setSelectedProdutor] = useState<string>('');
  const [selectedFazenda, setSelectedFazenda] = useState<string>('');
  const [selectedTalhao, setSelectedTalhao] = useState<string>('');
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'terrain'>('satellite');
  
  const [currentTask, setCurrentTask] = useState<DownloadTask | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Atualizar stats do cache
  useEffect(() => {
    updateCacheStats();
  }, []);

  const updateCacheStats = async () => {
    try {
      const stats = await tileManager.getCacheStats();
      setCacheStats(stats);
    } catch (error) {
      logger.error('❌ Erro ao atualizar stats:', error);
    }
  };

  // Calcular bounds baseado na seleção
  const calculateBounds = () => {
    switch (selectedTipo) {
      case 'geral':
        // Brasil inteiro (aproximado)
        return {
          minLat: -33.75,
          maxLat: 5.27,
          minLng: -73.99,
          maxLng: -34.79,
          zoom: { min: 4, max: 8 }
        };
      
      case 'produtor':
        if (!selectedProdutor) return null;
        const produtor = produtores.find(p => p.id === selectedProdutor);
        if (!produtor || !produtor.fazendas || produtor.fazendas.length === 0) return null;
        
        // Calcular bounds que engloba todas as fazendas do produtor
        let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
        produtor.fazendas.forEach(fazenda => {
          if (fazenda.talhao) {
            fazenda.talhao.forEach(point => {
              minLat = Math.min(minLat, point[1]);
              maxLat = Math.max(maxLat, point[1]);
              minLng = Math.min(minLng, point[0]);
              maxLng = Math.max(maxLng, point[0]);
            });
          }
        });
        
        // Adicionar margem de 5%
        const latMargin = (maxLat - minLat) * 0.05;
        const lngMargin = (maxLng - minLng) * 0.05;
        
        return {
          minLat: minLat - latMargin,
          maxLat: maxLat + latMargin,
          minLng: minLng - lngMargin,
          maxLng: maxLng + lngMargin,
          zoom: { min: 12, max: 18 }
        };
      
      case 'fazenda':
        if (!selectedProdutor || !selectedFazenda) return null;
        const prod = produtores.find(p => p.id === selectedProdutor);
        const fazenda = prod?.fazendas?.find(f => f.id === selectedFazenda);
        if (!fazenda || !fazenda.talhao) return null;
        
        // Calcular bounds do talhão
        let fMinLat = Infinity, fMaxLat = -Infinity, fMinLng = Infinity, fMaxLng = -Infinity;
        fazenda.talhao.forEach(point => {
          fMinLat = Math.min(fMinLat, point[1]);
          fMaxLat = Math.max(fMaxLat, point[1]);
          fMinLng = Math.min(fMinLng, point[0]);
          fMaxLng = Math.max(fMaxLng, point[0]);
        });
        
        // Margem de 10%
        const fLatMargin = (fMaxLat - fMinLat) * 0.1;
        const fLngMargin = (fMaxLng - fMinLng) * 0.1;
        
        return {
          minLat: fMinLat - fLatMargin,
          maxLat: fMaxLat + fLatMargin,
          minLng: fMinLng - fLngMargin,
          maxLng: fMaxLng + fLngMargin,
          zoom: { min: 14, max: 18 }
        };
      
      default:
        return null;
    }
  };

  // Estimar número de tiles
  const estimateTiles = (bounds: any) => {
    if (!bounds) return 0;
    
    const { minLat, maxLat, minLng, maxLng, zoom } = bounds;
    let totalTiles = 0;
    
    for (let z = zoom.min; z <= zoom.max; z++) {
      const minTileX = Math.floor(((minLng + 180) / 360) * Math.pow(2, z));
      const maxTileX = Math.floor(((maxLng + 180) / 360) * Math.pow(2, z));
      const minTileY = Math.floor(
        ((1 - Math.log(Math.tan((maxLat * Math.PI) / 180) + 1 / Math.cos((maxLat * Math.PI) / 180)) / Math.PI) / 2) *
        Math.pow(2, z)
      );
      const maxTileY = Math.floor(
        ((1 - Math.log(Math.tan((minLat * Math.PI) / 180) + 1 / Math.cos((minLat * Math.PI) / 180)) / Math.PI) / 2) *
        Math.pow(2, z)
      );
      
      totalTiles += (maxTileX - minTileX + 1) * (maxTileY - minTileY + 1);
    }
    
    return totalTiles;
  };

  // Iniciar download
  const handleStartDownload = async () => {
    const bounds = calculateBounds();
    if (!bounds) {
      toast.error('Selecione uma área válida');
      return;
    }

    const estimatedTiles = estimateTiles(bounds);
    
    // Validar tamanho (máximo 10.000 tiles para não sobrecarregar)
    if (estimatedTiles > 10000) {
      toast.error(`Área muito grande! (${estimatedTiles.toLocaleString()} tiles)\n\nTente uma área menor ou zoom reduzido.`);
      return;
    }

    // Confirmar download
    const confirmMsg = `Baixar ${estimatedTiles.toLocaleString()} tiles?\n\nTamanho estimado: ~${(estimatedTiles * 20 / 1024).toFixed(1)} MB`;
    if (!confirm(confirmMsg)) return;

    setIsDownloading(true);
    
    const task: DownloadTask = {
      id: Date.now().toString(),
      tipo: selectedTipo,
      nome: getNomeTarefa(),
      bounds: {
        minLat: bounds.minLat,
        maxLat: bounds.maxLat,
        minLng: bounds.minLng,
        maxLng: bounds.maxLng
      },
      zoom: bounds.zoom,
      estimatedTiles,
      status: 'baixando',
      progress: 0
    };

    setCurrentTask(task);

    try {
      // URL do tile baseado no estilo
      let tileUrl = '';
      switch (mapStyle) {
        case 'satellite':
          tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
          break;
        case 'terrain':
          tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
          break;
        default:
          tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      }

      await tileManager.preloadArea(
        task.bounds,
        task.zoom.min,
        task.zoom.max,
        tileUrl,
        (progress, total) => {
          const percentage = Math.round((progress / total) * 100);
          setCurrentTask(prev => prev ? { ...prev, progress: percentage } : null);
        }
      );

      setCurrentTask(prev => prev ? { ...prev, status: 'concluido', progress: 100 } : null);
      toast.success(`✅ ${task.nome} baixado com sucesso!`);
      await updateCacheStats();
      
    } catch (error) {
      logger.error('❌ Erro ao baixar mapas:', error);
      setCurrentTask(prev => prev ? { ...prev, status: 'erro' } : null);
      toast.error('Erro ao baixar mapas offline');
    } finally {
      setIsDownloading(false);
      setTimeout(() => setCurrentTask(null), 3000);
    }
  };

  const getNomeTarefa = () => {
    switch (selectedTipo) {
      case 'geral':
        return 'Brasil';
      case 'produtor':
        return produtores.find(p => p.id === selectedProdutor)?.nome || 'Produtor';
      case 'fazenda':
        const prod = produtores.find(p => p.id === selectedProdutor);
        const fazenda = prod?.fazendas?.find(f => f.id === selectedFazenda);
        return fazenda?.nome || 'Fazenda';
      case 'talhao':
        return 'Talhão';
      default:
        return 'Área';
    }
  };

  // Limpar cache
  const handleClearCache = async () => {
    if (confirm('⚠️ Tem certeza que deseja limpar todos os mapas offline?\n\nVocê precisará baixá-los novamente.')) {
      try {
        await tileManager.clearCache();
        setCacheStats({
          totalTiles: 0,
          totalSizeMB: 0,
          oldestTile: null,
          newestTile: null
        });
        toast.success('🗑️ Cache de mapas limpo');
      } catch (error) {
        logger.error('❌ Erro ao limpar cache:', error);
        toast.error('Erro ao limpar cache');
      }
    }
  };

  const bounds = calculateBounds();
  const estimatedTiles = bounds ? estimateTiles(bounds) : 0;
  const estimatedSizeMB = estimatedTiles * 20 / 1024; // ~20KB por tile

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900 dark:text-white">Mapas Offline</h2>
              <p className="text-xs text-gray-500">Baixe mapas para uso sem internet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats do Cache */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Cache Atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tiles salvos:</span>
                <span className="text-gray-900 dark:text-white">{cacheStats.totalTiles.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Espaço usado:</span>
                <span className="text-gray-900 dark:text-white">{cacheStats.totalSizeMB.toFixed(1)} MB</span>
              </div>
              {cacheStats.newestTile && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Última atualização:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(cacheStats.newestTile).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seleção de Tipo */}
          <div className="space-y-3">
            <label className="text-sm text-gray-700 dark:text-gray-300">Tipo de Download</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedTipo('geral')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTipo === 'geral'
                    ? 'border-[#0057FF] bg-blue-50 dark:bg-blue-950'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <Grid3x3 className="h-5 w-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <p className="text-xs text-gray-600 dark:text-gray-400">Região Geral</p>
              </button>
              
              <button
                onClick={() => setSelectedTipo('produtor')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTipo === 'produtor'
                    ? 'border-[#0057FF] bg-blue-50 dark:bg-blue-950'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-5 w-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <p className="text-xs text-gray-600 dark:text-gray-400">Por Produtor</p>
              </button>
              
              <button
                onClick={() => setSelectedTipo('fazenda')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTipo === 'fazenda'
                    ? 'border-[#0057FF] bg-blue-50 dark:bg-blue-950'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <Home className="h-5 w-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                <p className="text-xs text-gray-600 dark:text-gray-400">Por Fazenda</p>
              </button>
            </div>
          </div>

          {/* Seleção de Produtor */}
          {(selectedTipo === 'produtor' || selectedTipo === 'fazenda') && (
            <div className="space-y-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Produtor</label>
              <Select value={selectedProdutor} onValueChange={setSelectedProdutor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o produtor" />
                </SelectTrigger>
                <SelectContent>
                  {produtores.map(produtor => (
                    <SelectItem key={produtor.id} value={produtor.id}>
                      {produtor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Seleção de Fazenda */}
          {selectedTipo === 'fazenda' && selectedProdutor && (
            <div className="space-y-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Fazenda</label>
              <Select value={selectedFazenda} onValueChange={setSelectedFazenda}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a fazenda" />
                </SelectTrigger>
                <SelectContent>
                  {produtores.find(p => p.id === selectedProdutor)?.fazendas?.map(fazenda => (
                    <SelectItem key={fazenda.id} value={fazenda.id}>
                      {fazenda.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Estilo do Mapa */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Estilo do Mapa</label>
            <Select value={mapStyle} onValueChange={(v) => setMapStyle(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satellite">🛰️ Satélite</SelectItem>
                <SelectItem value="streets">🗺️ Ruas</SelectItem>
                <SelectItem value="terrain">🏔️ Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estimativa */}
          {bounds && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 space-y-1">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs space-y-1">
                  <p className="text-blue-900 dark:text-blue-100">
                    <strong>Tiles:</strong> {estimatedTiles.toLocaleString()}
                  </p>
                  <p className="text-blue-900 dark:text-blue-100">
                    <strong>Tamanho:</strong> ~{estimatedSizeMB.toFixed(1)} MB
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Zoom {bounds.zoom.min} até {bounds.zoom.max}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progresso do Download */}
          {currentTask && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{currentTask.nome}</span>
                {currentTask.status === 'concluido' && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {currentTask.status === 'erro' && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
              <Progress value={currentTask.progress} className="w-full" />
              <p className="text-xs text-center text-gray-500">
                {currentTask.progress}%
              </p>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-2">
            <Button
              onClick={handleStartDownload}
              disabled={isDownloading || !bounds}
              className="flex-1 bg-[#0057FF] hover:bg-[#0046CC]"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Baixando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Mapas
                </>
              )}
            </Button>

            {cacheStats.totalTiles > 0 && (
              <Button
                variant="outline"
                onClick={handleClearCache}
                disabled={isDownloading}
                className="px-4"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Aviso */}
          <p className="text-xs text-gray-500 text-center">
            💡 Os mapas ficam salvos no seu dispositivo e funcionam offline
          </p>
        </div>
      </div>
    </div>
  );
}
