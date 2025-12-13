/**
 * SKELETON AGENDA
 * Loading placeholder para a tela de Agenda
 * Otimizado com React.memo
 */

import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTheme } from '../../utils/ThemeContext';

const SkeletonAgenda = memo(function SkeletonAgenda() {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className={`h-12 w-12 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
        </div>

        {/* Navegação Semana */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className={`h-10 w-10 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
          <Skeleton className="h-6 w-40" />
          <Skeleton className={`h-10 w-10 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
        </div>

        {/* Dias da Semana */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-4 w-full mb-2 mx-auto" />
              <Skeleton 
                className={`
                  h-12 w-full mx-auto
                  ${isIOS ? 'rounded-full' : 'rounded-lg'}
                `} 
              />
            </div>
          ))}
        </div>

        {/* Lista de Eventos */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-32 mb-4" />
          
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`
                bg-white p-4
                ${isIOS ? 'rounded-2xl shadow-lg' : 'rounded-lg shadow-md'}
              `}
            >
              <div className="flex items-start gap-4">
                <Skeleton className={`h-12 w-12 flex-shrink-0 ${isIOS ? 'rounded-full' : 'rounded-lg'}`} />
                
                <div className="flex-1">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>

                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SkeletonAgenda;
