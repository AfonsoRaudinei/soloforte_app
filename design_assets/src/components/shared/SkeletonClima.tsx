/**
 * SKELETON CLIMA
 * Loading placeholder para a tela de Clima
 * Otimizado com React.memo
 */

import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '../../utils/ThemeContext';

const SkeletonClima = memo(function SkeletonClima() {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Clima Atual Card */}
        <div 
          className={`
            bg-white p-6 mb-6
            ${isIOS ? 'rounded-3xl shadow-lg' : 'rounded-xl shadow-md'}
          `}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className={`h-16 w-16 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
          </div>

          <div className="flex items-center gap-6">
            <Skeleton className="h-20 w-20" />
            <div className="flex-1">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>

        {/* Timeline Horizontal (24h) */}
        <div 
          className={`
            bg-white p-4 mb-6
            ${isIOS ? 'rounded-3xl shadow-lg' : 'rounded-xl shadow-md'}
          `}
        >
          <Skeleton className="h-5 w-32 mb-4" />
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
                <Skeleton className="h-3 w-12" />
                <Skeleton className={`h-10 w-10 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Previsão 7 Dias */}
        <div 
          className={`
            bg-white p-4
            ${isIOS ? 'rounded-3xl shadow-lg' : 'rounded-xl shadow-md'}
          `}
        >
          <Skeleton className="h-5 w-40 mb-4" />
          
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <div className="flex items-center gap-3">
                  <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SkeletonClima;
