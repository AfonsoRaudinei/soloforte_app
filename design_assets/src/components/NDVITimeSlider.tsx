import { memo, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Slider } from './ui/slider';

interface NDVISnapshot {
  id: string;
  date: string;
  timestamp: number;
  source: 'Sentinel-2' | 'Landsat-8' | 'Planet';
  cloudCover: number;
  avgNDVI: number;
  resolution: string;
}

interface NDVITimeSliderProps {
  visible?: boolean;
  onDateChange?: (snapshot: NDVISnapshot) => void;
}

export const NDVITimeSlider = memo(function NDVITimeSlider({ 
  visible = true,
  onDateChange 
}: NDVITimeSliderProps) {
  // Mock de snapshots NDVI em diferentes datas
  const snapshots: NDVISnapshot[] = [
    {
      id: '1',
      date: '05 Nov 2024',
      timestamp: new Date('2024-11-05').getTime(),
      source: 'Sentinel-2',
      cloudCover: 5,
      avgNDVI: 0.72,
      resolution: '10m'
    },
    {
      id: '2',
      date: '25 Out 2024',
      timestamp: new Date('2024-10-25').getTime(),
      source: 'Sentinel-2',
      cloudCover: 12,
      avgNDVI: 0.68,
      resolution: '10m'
    },
    {
      id: '3',
      date: '15 Out 2024',
      timestamp: new Date('2024-10-15').getTime(),
      source: 'Sentinel-2',
      cloudCover: 8,
      avgNDVI: 0.65,
      resolution: '10m'
    },
    {
      id: '4',
      date: '05 Out 2024',
      timestamp: new Date('2024-10-05').getTime(),
      source: 'Landsat-8',
      cloudCover: 15,
      avgNDVI: 0.61,
      resolution: '30m'
    },
    {
      id: '5',
      date: '25 Set 2024',
      timestamp: new Date('2024-09-25').getTime(),
      source: 'Sentinel-2',
      cloudCover: 3,
      avgNDVI: 0.58,
      resolution: '10m'
    },
    {
      id: '6',
      date: '15 Set 2024',
      timestamp: new Date('2024-09-15').getTime(),
      source: 'Sentinel-2',
      cloudCover: 7,
      avgNDVI: 0.54,
      resolution: '10m'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSnapshot = snapshots[currentIndex];

  // Calcular diferença de NDVI com snapshot anterior
  const getDifference = () => {
    if (currentIndex === snapshots.length - 1) return null;
    const diff = currentSnapshot.avgNDVI - snapshots[currentIndex + 1].avgNDVI;
    return diff;
  };

  const difference = getDifference();

  const handleSliderChange = (values: number[]) => {
    const newIndex = values[0];
    setCurrentIndex(newIndex);
    onDateChange?.(snapshots[newIndex]);
  };

  const handlePrevious = () => {
    if (currentIndex < snapshots.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onDateChange?.(snapshots[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onDateChange?.(snapshots[newIndex]);
    }
  };

  // Calcular dias desde a imagem mais recente
  const daysSinceLatest = currentIndex === 0 
    ? 0 
    : Math.floor((snapshots[0].timestamp - currentSnapshot.timestamp) / (1000 * 60 * 60 * 24));

  if (!visible) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#0057FF]" />
          <div>
            <h3 className="text-xs text-gray-900">Histórico NDVI</h3>
            <p className="text-[9px] text-gray-500">
              {snapshots.length} imagens disponíveis
            </p>
          </div>
        </div>
        
        {/* Indicador de dias atrás */}
        {daysSinceLatest > 0 && (
          <div className="bg-blue-50 px-2 py-0.5 rounded text-[9px] text-blue-700">
            {daysSinceLatest} dias atrás
          </div>
        )}
      </div>

      {/* Data e Fonte da Imagem Atual */}
      <div className="mb-2 p-2 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-900">
              <strong>{currentSnapshot.date}</strong>
            </p>
            <p className="text-[9px] text-gray-600 mt-0.5">
              {currentSnapshot.source} • {currentSnapshot.resolution} • {currentSnapshot.cloudCover}% nuvens
            </p>
          </div>
          
          {/* NDVI Médio e Variação */}
          <div className="text-right">
            <p className="text-xs text-[#0057FF]">
              <strong>NDVI {currentSnapshot.avgNDVI.toFixed(2)}</strong>
            </p>
            {difference !== null && (
              <div className={`flex items-center gap-1 text-[9px] mt-0.5 ${
                difference > 0 ? 'text-green-600' : 
                difference < 0 ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {difference > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : difference < 0 ? (
                  <TrendingDown className="h-3 w-3" />
                ) : (
                  <Minus className="h-3 w-3" />
                )}
                <span>
                  {difference > 0 ? '+' : ''}{difference.toFixed(3)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === snapshots.length - 1}
          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          title="Imagem anterior (mais antiga)"
        >
          <ChevronLeft className="h-3.5 w-3.5 text-gray-700" />
        </button>

        {/* Slider */}
        <div className="flex-1">
          <Slider
            value={[currentIndex]}
            onValueChange={handleSliderChange}
            max={snapshots.length - 1}
            step={1}
            className="w-full"
          />
          
          {/* Marcadores de datas no slider */}
          <div className="flex justify-between mt-1 px-0.5">
            <span className="text-[8px] text-gray-500">
              {snapshots[snapshots.length - 1].date.split(' ')[0]} {snapshots[snapshots.length - 1].date.split(' ')[1]}
            </span>
            <span className="text-[8px] text-gray-500">
              {snapshots[0].date.split(' ')[0]} {snapshots[0].date.split(' ')[1]}
            </span>
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === 0}
          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          title="Imagem mais recente"
        >
          <ChevronRight className="h-3.5 w-3.5 text-gray-700" />
        </button>
      </div>

      {/* Indicador de posição */}
      <div className="mt-2 text-center">
        <p className="text-[9px] text-gray-500">
          Imagem {currentIndex + 1} de {snapshots.length}
        </p>
      </div>

      {/* Dica de comparação */}
      {difference !== null && Math.abs(difference) > 0.05 && (
        <div className={`mt-2 p-2 rounded-lg text-[9px] ${
          difference > 0 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <p className="font-semibold">
            {difference > 0 ? '📈 Aumento de biomassa' : '📉 Redução de biomassa'}
          </p>
          <p className="mt-0.5">
            {difference > 0 
              ? 'Vigor vegetativo melhorou desde a última imagem' 
              : 'Vigor vegetativo reduziu desde a última imagem'}
          </p>
        </div>
      )}
    </div>
  );
});

export default NDVITimeSlider;