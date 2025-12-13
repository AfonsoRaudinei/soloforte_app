/**
 * 🗺️ MAPAS OFFLINE - DESIGN PREMIUM MOBILE
 * 
 * Sistema de mapas offline com:
 * - Download de áreas
 * - Gerenciamento de mapas baixados
 * - Visualização de espaço ocupado
 * - Exclusão de mapas
 */

import { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  HardDrive,
  MapPin,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface MapasOfflineProps {
  navigate: (path: string) => void;
}

interface OfflineMap {
  id: string;
  name: string;
  area: string;
  size: string;
  downloadDate: string;
  status: 'downloaded' | 'downloading' | 'available';
  progress?: number;
}

export default function MapasOffline({ navigate }: MapasOfflineProps) {
  const [maps, setMaps] = useState<OfflineMap[]>([
    {
      id: '1',
      name: 'Fazenda São João',
      area: '~ 2.500 ha',
      size: '245 MB',
      downloadDate: '10/11/2025',
      status: 'downloaded'
    },
    {
      id: '2',
      name: 'Região Sul - Paraná',
      area: '~ 15.000 ha',
      size: '1.2 GB',
      downloadDate: '05/11/2025',
      status: 'downloaded'
    },
    {
      id: '3',
      name: 'Mato Grosso - Sorriso',
      area: '~ 8.000 ha',
      size: '780 MB',
      downloadDate: '',
      status: 'available'
    }
  ]);

  const handleDownload = (mapId: string) => {
    setMaps(maps.map(m => 
      m.id === mapId 
        ? { ...m, status: 'downloading', progress: 0 }
        : m
    ));

    // Simular download
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setMaps(prev => prev.map(m => 
        m.id === mapId 
          ? { ...m, progress }
          : m
      ));

      if (progress >= 100) {
        clearInterval(interval);
        setMaps(prev => prev.map(m => 
          m.id === mapId 
            ? { ...m, status: 'downloaded', downloadDate: new Date().toLocaleDateString('pt-BR') }
            : m
        ));
        toast.success('✅ Mapa baixado com sucesso!');
      }
    }, 300);
  };

  const handleDelete = (mapId: string) => {
    const map = maps.find(m => m.id === mapId);
    if (window.confirm(`Excluir "${map?.name}"?`)) {
      setMaps(maps.map(m => 
        m.id === mapId 
          ? { ...m, status: 'available', downloadDate: '' }
          : m
      ));
      toast.success('🗑️ Mapa removido');
    }
  };

  const totalSize = maps
    .filter(m => m.status === 'downloaded')
    .reduce((acc, m) => {
      const size = parseFloat(m.size.replace(' GB', '').replace(' MB', ''));
      const multiplier = m.size.includes('GB') ? 1024 : 1;
      return acc + (size * multiplier);
    }, 0);

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-100 bg-gradient-to-br from-orange-50 to-red-50">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-white/50"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-900">Mapas Offline</h1>
          <p className="text-xs text-gray-500">Gerenciar áreas baixadas</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
          <Download className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Storage Info */}
      <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="flex items-center gap-3 mb-3">
          <HardDrive className="h-5 w-5 text-orange-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-900">Espaço Usado</p>
            <p className="text-xs text-gray-500">{totalSize.toFixed(0)} MB de 5 GB</p>
          </div>
          <span className="text-xs text-orange-600">
            {((totalSize / (5 * 1024)) * 100).toFixed(1)}%
          </span>
        </div>
        <Progress 
          value={(totalSize / (5 * 1024)) * 100} 
          className="h-2 bg-white/50"
        />
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-900">Mapas para uso offline</p>
            <p className="text-xs text-gray-500 mt-1">
              Baixe mapas para usar sem conexão com internet. Ideal para áreas remotas.
            </p>
          </div>
        </div>
      </div>

      {/* Maps List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3 pb-32">
          {maps.map((map) => (
            <div
              key={map.id}
              className={`p-4 rounded-2xl border transition-all ${
                map.status === 'downloaded'
                  ? 'bg-green-50 border-green-200'
                  : map.status === 'downloading'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    map.status === 'downloaded'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : map.status === 'downloading'
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-600'
                  }`}
                >
                  {map.status === 'downloaded' ? (
                    <Check className="h-6 w-6 text-white" />
                  ) : map.status === 'downloading' ? (
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  ) : (
                    <MapPin className="h-6 w-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{map.name}</p>
                  <p className="text-xs text-gray-500">{map.area}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{map.size}</span>
                    {map.downloadDate && (
                      <span className="text-xs text-gray-400">• {map.downloadDate}</span>
                    )}
                  </div>
                  
                  {map.status === 'downloading' && (
                    <Progress 
                      value={map.progress || 0} 
                      className="h-1.5 mt-2 bg-white/50"
                    />
                  )}
                </div>

                <div className="flex-shrink-0">
                  {map.status === 'downloaded' ? (
                    <Button
                      onClick={() => handleDelete(map.id)}
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  ) : map.status === 'available' ? (
                    <Button
                      onClick={() => handleDownload(map.id)}
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-orange-100"
                    >
                      <Download className="h-4 w-4 text-orange-600" />
                    </Button>
                  ) : (
                    <div className="h-9 w-9 flex items-center justify-center">
                      <span className="text-xs text-blue-600">
                        {map.progress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Action */}
      <div className="p-4 border-t border-gray-100">
        <Button
          onClick={() => toast.info('🗺️ Selecionar nova área')}
          className="w-full h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-xl"
        >
          <Download className="h-5 w-5 mr-2" />
          Baixar Nova Área
        </Button>
      </div>
    </div>
  );
}