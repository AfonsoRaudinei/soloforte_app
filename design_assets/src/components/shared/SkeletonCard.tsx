/**
 * SKELETON CARD - Componente Genérico
 * Card skeleton reutilizável para diversos contextos
 * Otimizado com React.memo (props raramente mudam)
 */

import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '../../utils/ThemeContext';

interface SkeletonCardProps {
  showImage?: boolean;
  lines?: number;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const SkeletonCard = memo(function SkeletonCard({ 
  showImage = true, 
  lines = 3,
  showActions = false,
  variant = 'default'
}: SkeletonCardProps) {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';

  if (variant === 'compact') {
    return (
      <div 
        className={`
          bg-white p-4 border border-gray-200
          ${isIOS ? 'rounded-2xl' : 'rounded-lg'}
        `}
      >
        <div className="flex items-center gap-3">
          {showImage && (
            <Skeleton className={`h-10 w-10 flex-shrink-0 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
          )}
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          {showActions && (
            <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
          )}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div 
        className={`
          bg-white p-6 border border-gray-200
          ${isIOS ? 'rounded-3xl shadow-lg' : 'rounded-xl shadow-md'}
        `}
      >
        {showImage && (
          <Skeleton className={`h-40 w-full mb-4 ${isIOS ? 'rounded-2xl' : 'rounded-lg'}`} />
        )}
        
        <Skeleton className="h-6 w-3/4 mb-3" />
        
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={`h-4 mb-2 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} 
          />
        ))}

        {showActions && (
          <div className="flex gap-2 mt-4">
            <Skeleton className={`h-10 flex-1 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
            <Skeleton className={`h-10 flex-1 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div 
      className={`
        bg-white p-5 border border-gray-200
        ${isIOS ? 'rounded-2xl shadow-md' : 'rounded-lg shadow-sm'}
      `}
    >
      <div className="flex gap-4">
        {showImage && (
          <Skeleton className={`h-16 w-16 flex-shrink-0 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
        )}
        
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton 
              key={i} 
              className={`h-4 mb-2 ${i === lines - 1 ? 'w-1/2' : 'w-full'}`} 
            />
          ))}
        </div>

        {showActions && (
          <div className="flex flex-col gap-2">
            <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
            <Skeleton className={`h-8 w-8 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
          </div>
        )}
      </div>
    </div>
  );
});

export default SkeletonCard;
