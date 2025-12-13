/**
 * SKELETON DASHBOARD
 * Loading placeholder para o Dashboard (lista de áreas salvas)
 * Otimizado com React.memo
 */

import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '../../utils/ThemeContext';

const SkeletonDashboard = memo(function SkeletonDashboard() {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <div 
        className={`
          bg-white/80 backdrop-blur-md p-4 w-80
          ${isIOS ? 'rounded-2xl shadow-lg' : 'rounded-lg shadow-md'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-md'}`} />
        </div>

        {/* Lista de Áreas */}
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`
                p-3 bg-gray-50 border border-gray-200
                ${isIOS ? 'rounded-xl' : 'rounded-lg'}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
});

export default SkeletonDashboard;
