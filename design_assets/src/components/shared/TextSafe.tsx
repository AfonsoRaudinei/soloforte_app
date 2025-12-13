/**
 * 📱 COMPONENTE TEXT SAFE
 * 
 * Wrapper para prevenir sobreposição de texto em diferentes tamanhos de celular
 * Aplica automaticamente truncate, line-clamp e outras proteções
 */

import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface TextSafeProps {
  children: ReactNode;
  lines?: 1 | 2 | 3 | 4;
  className?: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'label';
  breakWords?: boolean;
}

export function TextSafe({ 
  children, 
  lines, 
  className = '', 
  as: Component = 'p',
  breakWords = true 
}: TextSafeProps) {
  
  const baseClasses = breakWords ? 'break-words overflow-wrap-anywhere' : '';
  
  const lineClampClasses = lines 
    ? `line-clamp-${lines}` 
    : 'truncate';
  
  return (
    <Component 
      className={cn(
        baseClasses,
        lineClampClasses,
        'min-w-0', // Previne flex items de expandir além do container
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Wrapper para containers flex que podem ter problemas de texto
 */
export function FlexTextContainer({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <div className={cn('flex min-w-0', className)}>
      {children}
    </div>
  );
}

/**
 * Wrapper para grid items que podem ter problemas de texto
 */
export function GridTextContainer({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <div className={cn('min-w-0', className)}>
      {children}
    </div>
  );
}
