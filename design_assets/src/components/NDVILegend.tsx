import { memo } from 'react';
import { Layers } from 'lucide-react';

interface NDVILegendProps {
  visible?: boolean;
}

export const NDVILegend = memo(function NDVILegend({ visible = true }: NDVILegendProps) {
  if (!visible) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 w-[140px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Layers className="h-3.5 w-3.5 text-[#0057FF]" />
        <div>
          <h3 className="text-xs text-gray-900">NDVI</h3>
          <p className="text-[10px] text-gray-500">Biomassa</p>
        </div>
      </div>

      {/* Gradiente Contínuo */}
      <div className="relative mb-2">
        <div 
          className="h-32 w-full rounded-md"
          style={{
            background: 'linear-gradient(to bottom, #006400 0%, #228B22 15%, #32CD32 30%, #9ACD32 45%, #FFFF00 60%, #FFD700 75%, #FF8C00 85%, #DC143C 100%)'
          }}
        />
        
        {/* Marcadores e Labels */}
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-700 py-1">
          <div className="flex items-center justify-between px-1.5">
            <span className="bg-white/80 px-1 rounded text-gray-900">1.0</span>
            <span className="bg-white/80 px-1 rounded text-[10px]">Muito Alto</span>
          </div>
          
          <div className="flex items-center justify-between px-1.5">
            <span className="bg-white/80 px-1 rounded text-gray-900">0.8</span>
          </div>
          
          <div className="flex items-center justify-between px-1.5">
            <span className="bg-white/80 px-1 rounded text-gray-900">0.6</span>
            <span className="bg-white/80 px-1 rounded text-[10px]">Alto</span>
          </div>
          
          <div className="flex items-center justify-between px-1.5">
            <span className="bg-white/80 px-1 rounded text-gray-900">0.4</span>
          </div>
          
          <div className="flex items-center justify-between px-1.5">
            <span className="bg-white/80 px-1 rounded text-gray-900">0.2</span>
            <span className="bg-white/80 px-1 rounded text-[10px]">Baixo</span>
          </div>
          
          <div className="flex items-center justify-between px-1.5">
            <span className="bg-white/80 px-1 rounded text-gray-900">0.0</span>
            <span className="bg-white/80 px-1 rounded text-[10px]">Muito Baixo</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-600">Índice:</span>
          <span className="text-[#0057FF]">-1 a +1</span>
        </div>
        <p className="text-[9px] text-gray-500 mt-1 leading-tight">
          Saúde e vigor vegetativo
        </p>
      </div>
    </div>
  );
});

export default NDVILegend;
