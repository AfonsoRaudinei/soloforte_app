/**
 * SKELETON NDVI
 * Loading placeholder para o NDVI Viewer
 * Otimizado com React.memo
 */

import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '../../utils/ThemeContext';

const SkeletonNDVI = memo(function SkeletonNDVI() {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';

  return (
    <div className="p-6 space-y-4">
      {/* Header com Tabs */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-md'}`} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Skeleton className={`h-10 w-28 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
        <Skeleton className={`h-10 w-28 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
        <Skeleton className={`h-10 w-28 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
      </div>

      {/* Controles */}
      <div 
        className={`
          bg-gray-50 p-4 space-y-4
          ${isIOS ? 'rounded-2xl' : 'rounded-lg'}
        `}
      >
        {/* Date Selector */}
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Data Source */}
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Opacity Slider */}
        <div>
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-6 w-full rounded-full" />
        </div>
      </div>

      {/* NDVI Distribution Card */}
      <div 
        className={`
          bg-white border border-gray-200 p-4
          ${isIOS ? 'rounded-2xl' : 'rounded-lg'}
        `}
      >
        <Skeleton className="h-5 w-40 mb-4" />
        
        {/* Legend Items */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          className={`
            bg-blue-50 p-4
            ${isIOS ? 'rounded-2xl' : 'rounded-lg'}
          `}
        >
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div 
          className={`
            bg-green-50 p-4
            ${isIOS ? 'rounded-2xl' : 'rounded-lg'}
          `}
        >
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
});

export default SkeletonNDVI;
