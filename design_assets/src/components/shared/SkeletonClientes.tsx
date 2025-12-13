/**
 * SKELETON CLIENTES
 * Loading placeholder para a tela de Clientes
 * Otimizado com React.memo
 */

import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '../../utils/ThemeContext';

const SkeletonClientes = memo(function SkeletonClientes() {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';

  return (
    <div className="h-full w-full bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <Skeleton className={`h-12 w-full ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
          <Skeleton className="h-10 w-32 rounded-t-lg" />
          <Skeleton className="h-10 w-32 rounded-t-lg" />
        </div>

        {/* Lista de Clientes */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={`
                bg-gray-50 p-4 border border-gray-200
                ${isIOS ? 'rounded-2xl' : 'rounded-lg'}
              `}
            >
              <div className="flex items-center gap-4 mb-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                
                <div className="flex-1">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
              </div>

              {/* Talhões */}
              <div className="ml-16 space-y-2">
                {[1, 2, 3].map((j) => (
                  <div 
                    key={j} 
                    className={`
                      bg-white p-3 border border-gray-200
                      ${isIOS ? 'rounded-xl' : 'rounded-lg'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded" />
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SkeletonClientes;
