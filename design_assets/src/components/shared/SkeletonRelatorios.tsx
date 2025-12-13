/**
 * SKELETON RELATÓRIOS
 * Loading placeholder para a tela de Relatórios
 * Otimizado com React.memo
 */

import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '../../utils/ThemeContext';

const SkeletonRelatorios = memo(function SkeletonRelatorios() {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className={`h-12 w-12 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
        </div>

        {/* Filtros */}
        <div 
          className={`
            bg-white p-4 mb-6
            ${isIOS ? 'rounded-2xl shadow-lg' : 'rounded-lg shadow-md'}
          `}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Lista de Relatórios */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={`
                bg-white p-6
                ${isIOS ? 'rounded-2xl shadow-lg' : 'rounded-lg shadow-md'}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <Skeleton className={`h-12 w-12 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
                  
                  <div className="flex-1">
                    <Skeleton className="h-5 w-64 mb-2" />
                    <Skeleton className="h-4 w-40 mb-3" />
                    
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
                  <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SkeletonRelatorios;
