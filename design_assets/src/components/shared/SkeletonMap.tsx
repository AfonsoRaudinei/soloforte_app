/**
 * SKELETON MAP - Loading Placeholder
 * Exibe um skeleton bonito enquanto o mapa carrega
 * Melhora a percepção de performance e UX
 * Otimizado com React.memo
 */

import { memo } from 'react';
import { MapPin, Compass, Layers } from 'lucide-react';
import { useTheme } from '../../utils/ThemeContext';

interface SkeletonMapProps {
  showControls?: boolean;
  message?: string;
}

const SkeletonMap = memo(function SkeletonMap({ showControls = true, message = 'Carregando mapa...' }: SkeletonMapProps) {
  const { visualStyle } = useTheme();
  
  const isIOS = visualStyle === 'ios';

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      {/* Skeleton Map Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
        
        {/* Fake Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div 
                key={i} 
                className="border border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Animated Pulse Circles (fake map markers) */}
        <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-blue-300 rounded-full opacity-40 animate-ping" />
        <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-green-300 rounded-full opacity-40 animate-ping delay-100" />
        <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-yellow-300 rounded-full opacity-40 animate-ping delay-200" />
        
        {/* Fake Roads/Lines */}
        <div className="absolute top-0 left-1/3 w-1 h-full bg-gray-300 opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 opacity-20 animate-pulse delay-150" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gray-300 opacity-20 animate-pulse delay-300" />
      </div>

      {/* Skeleton Controls (iOS vs Microsoft style) */}
      {showControls && (
        <>
          {/* Top Right Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {/* Layers Button Skeleton */}
            <div 
              className={`
                w-12 h-12 bg-white/60 backdrop-blur-sm animate-pulse
                ${isIOS ? 'rounded-full shadow-lg' : 'rounded-lg shadow-md'}
              `}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Layers className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Compass Skeleton */}
            <div 
              className={`
                w-12 h-12 bg-white/60 backdrop-blur-sm animate-pulse
                ${isIOS ? 'rounded-full shadow-lg' : 'rounded-lg shadow-md'}
              `}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Compass className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Location Button Skeleton */}
            <div 
              className={`
                w-12 h-12 bg-white/60 backdrop-blur-sm animate-pulse
                ${isIOS ? 'rounded-full shadow-lg' : 'rounded-lg shadow-md'}
              `}
            >
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Bottom Left Panel Skeleton */}
          <div className="absolute bottom-4 left-4 z-10">
            <div 
              className={`
                bg-white/60 backdrop-blur-sm p-4 animate-pulse
                ${isIOS ? 'rounded-2xl shadow-lg' : 'rounded-lg shadow-md'}
                w-64
              `}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-8 animate-pulse" />
              </div>

              {/* Panel Content Lines */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-300 rounded w-5/6 animate-pulse delay-100" />
                <div className="h-3 bg-gray-300 rounded w-4/6 animate-pulse delay-200" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Loading Message */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div 
          className={`
            bg-white/90 backdrop-blur-md px-6 py-4 shadow-xl
            ${isIOS ? 'rounded-2xl' : 'rounded-lg'}
            flex items-center gap-3
          `}
        >
          {/* Spinner */}
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
          </div>

          {/* Message */}
          <div>
            <p className="text-gray-700 font-medium">{message}</p>
            <p className="text-gray-500 text-sm">Aguarde um momento...</p>
          </div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
    </div>
  );
});

export default SkeletonMap;
