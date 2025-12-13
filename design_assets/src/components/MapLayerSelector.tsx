import { memo } from 'react';
import { Check, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import type { MapLayer } from '../types';

interface MapLayerSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLayer: MapLayer;
  onLayerChange: (layer: MapLayer) => void;
  onNDVIOpen?: () => void; // Callback para abrir NDVI
  onRadarOpen?: () => void; // Callback para abrir Radar de Clima
}

const MapLayerSelector = memo(function MapLayerSelector({
  open,
  onOpenChange,
  currentLayer,
  onLayerChange,
  onNDVIOpen,
  onRadarOpen,
}: MapLayerSelectorProps) {
  const layers = [
    {
      id: 'streets' as const,
      name: 'Explorar',
      description: 'Mapa de ruas e navegação',
      icon: '🗺️',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'satellite' as const,
      name: 'Satélite',
      description: 'Imagens de satélite reais',
      icon: '🛰️',
      preview: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    },
    {
      id: 'terrain' as const,
      name: 'Relevo',
      description: 'Mapa topográfico com elevação',
      icon: '⛰️',
      preview: 'linear-gradient(135deg, #5f72bd 0%, #9b23ea 100%)',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 gap-0 bg-white/95 backdrop-blur-xl border-gray-200">
        {/* Título e descrição para acessibilidade */}
        <DialogTitle className="px-5 pt-5 pb-3 text-center text-gray-900">
          Tipo de Mapa
        </DialogTitle>
        <DialogDescription className="sr-only">
          Selecione o tipo de visualização do mapa: Explorar, Satélite ou Relevo
        </DialogDescription>

        {/* Opções de camadas - Compactas */}
        <div className="px-4 pb-2 space-y-2">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => {
                onLayerChange(layer.id);
                onOpenChange(false);
              }}
              className={`w-full relative overflow-hidden rounded-xl transition-all ${
                currentLayer === layer.id
                  ? 'ring-2 ring-[#0057FF] shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 p-3 bg-white">
                {/* Preview visual compacto */}
                <div
                  className="h-14 w-14 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                  style={{ background: layer.preview }}
                >
                  {/* Overlay pattern sutil */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 20 20" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`pattern-${layer.id}`} width="4" height="4" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="0.5" fill="white" opacity="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="20" height="20" fill={`url(#pattern-${layer.id})`} />
                    </svg>
                  </div>

                  {/* Ícone da camada */}
                  <span className="text-2xl drop-shadow-lg relative z-10">{layer.icon}</span>
                </div>

                {/* Info da camada */}
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-0.5">{layer.name}</h3>
                  <p className="text-xs text-gray-600">{layer.description}</p>
                </div>

                {/* Checkmark se selecionado */}
                {currentLayer === layer.id && (
                  <div className="flex-shrink-0 h-6 w-6 bg-[#0057FF] rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Divisor */}
        <div className="px-4 py-2">
          <div className="h-px bg-gray-200"></div>
          <p className="text-xs text-gray-500 text-center mt-2 mb-1">Análises Avançadas</p>
        </div>

        {/* Opção NDVI */}
        <div className="px-4 pb-2">
          <button
            onClick={() => {
              if (onNDVIOpen) {
                onNDVIOpen();
              }
              onOpenChange(false);
            }}
            className="w-full relative overflow-hidden rounded-xl hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 p-3 bg-white">
              {/* Preview NDVI */}
              <div className="h-14 w-14 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-500 via-green-500 to-yellow-500">
                {/* Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="h-full w-full" viewBox="0 0 20 20" preserveAspectRatio="none">
                    <defs>
                      <pattern id="pattern-ndvi" width="4" height="4" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="0.5" fill="white" opacity="0.7"/>
                      </pattern>
                    </defs>
                    <rect width="20" height="20" fill="url(#pattern-ndvi)" />
                  </svg>
                </div>

                {/* Ícone */}
                <Brain className="h-6 w-6 text-white drop-shadow-lg relative z-10" />
              </div>

              {/* Info */}
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 mb-0.5">Análise NDVI</h3>
                <p className="text-xs text-gray-600">Índice de vegetação por satélite</p>
              </div>

              {/* Badge */}
              <div className="flex-shrink-0 px-2 py-1 bg-purple-100 rounded-full">
                <span className="text-xs text-purple-700">IA</span>
              </div>
            </div>
          </button>
        </div>

        {/* Opção Radar de Clima */}
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              if (onRadarOpen) {
                onRadarOpen();
              }
              onOpenChange(false);
            }}
            className="w-full relative overflow-hidden rounded-xl hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 p-3 bg-white">
              {/* Preview Radar */}
              <div className="h-14 w-14 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600">
                {/* Pattern animado */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="h-full w-full" viewBox="0 0 20 20" preserveAspectRatio="none">
                    <defs>
                      <pattern id="pattern-radar" width="4" height="4" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="0.5" fill="white" opacity="0.7"/>
                      </pattern>
                    </defs>
                    <rect width="20" height="20" fill="url(#pattern-radar)" />
                  </svg>
                </div>

                {/* Círculos do radar */}
                <svg className="absolute inset-2 opacity-40" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="white" strokeWidth="0.5" />
                  <circle cx="10" cy="10" r="5" fill="none" stroke="white" strokeWidth="0.5" />
                  <line x1="10" y1="2" x2="10" y2="18" stroke="white" strokeWidth="0.3" />
                  <line x1="2" y1="10" x2="18" y2="10" stroke="white" strokeWidth="0.3" />
                </svg>

                {/* Ícone */}
                <svg 
                  className="h-6 w-6 text-white drop-shadow-lg relative z-10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
                  <path d="M12 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" opacity="0.5" />
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 mb-0.5">Radar de Clima</h3>
                <p className="text-xs text-gray-600">Precipitação em tempo real</p>
              </div>

              {/* Badge */}
              <div className="flex-shrink-0 px-2 py-1 bg-blue-100 rounded-full">
                <span className="text-xs text-blue-700">Ao vivo</span>
              </div>
            </div>
          </button>
        </div>

        {/* Footer compacto */}
        <div className="px-4 pb-4">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full h-10 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm transition-colors"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default MapLayerSelector;
