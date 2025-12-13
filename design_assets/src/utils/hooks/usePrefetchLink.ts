/**
 * 🚀 HOOK DE PREFETCH ON HOVER/TOUCH
 * 
 * Hook customizado para fazer prefetch de componentes quando usuário
 * interage com links/botões (hover no desktop ou touch no mobile).
 * 
 * Estratégia:
 * - Desktop: Prefetch no mouseenter (hover)
 * - Mobile: Prefetch no touchstart com debounce de 100ms
 * - Usa requestIdleCallback para não bloquear thread principal
 * - Executa apenas uma vez por elemento (once: true)
 * 
 * @version 1.0.0
 */

import { useEffect, useRef } from 'react';
import { prefetchRoute } from '../prefetch';
import { logger } from '../logger';

interface UsePrefetchLinkOptions {
  /** Função de import do componente (lazy load) */
  importFn: () => Promise<any>;
  /** Nome do componente para logging */
  componentName: string;
  /** Habilitar/desabilitar prefetch (útil para condicionais) */
  enabled?: boolean;
  /** Delay em ms para touch (evita prefetch em scrolls acidentais) */
  touchDelay?: number;
}

/**
 * Hook para fazer prefetch de componentes em interações de hover/touch
 * 
 * @example
 * ```tsx
 * const buttonRef = usePrefetchLink({
 *   importFn: () => import('./components/Dashboard'),
 *   componentName: 'Dashboard',
 *   enabled: true
 * });
 * 
 * <button ref={buttonRef} onClick={() => navigate('/dashboard')}>
 *   Dashboard
 * </button>
 * ```
 */
export const usePrefetchLink = <T extends HTMLElement>({
  importFn,
  componentName,
  enabled = true,
  touchDelay = 100
}: UsePrefetchLinkOptions) => {
  const elementRef = useRef<T>(null);
  const touchTimerRef = useRef<number>();
  const hasPrefetched = useRef(false);

  useEffect(() => {
    if (!enabled || !elementRef.current || hasPrefetched.current) {
      return;
    }

    const element = elementRef.current;

    /**
     * Função para executar o prefetch
     */
    const executePrefetch = () => {
      if (hasPrefetched.current) return;
      
      hasPrefetched.current = true;
      logger.log(`🎯 [PREFETCH HOVER] Acionado para ${componentName}`);
      prefetchRoute(importFn, componentName);
    };

    /**
     * Handler para mouseenter (desktop)
     * Executa imediatamente quando usuário passa o mouse
     */
    const handleMouseEnter = () => {
      executePrefetch();
    };

    /**
     * Handler para touchstart (mobile)
     * Executa após um pequeno delay para evitar prefetch em scrolls
     */
    const handleTouchStart = () => {
      // Limpar timer anterior se existir
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }

      // Executar prefetch após delay
      touchTimerRef.current = window.setTimeout(() => {
        executePrefetch();
      }, touchDelay);
    };

    /**
     * Handler para touchend/touchcancel (mobile)
     * Limpa o timer se o toque for cancelado (scroll)
     */
    const handleTouchEnd = () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    };

    // Adicionar event listeners
    // passive: true - melhora performance de scroll
    // once: true para mouseenter - remove automaticamente após executar
    element.addEventListener('mouseenter', handleMouseEnter, { once: true });
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    // Cleanup
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
      
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    };
  }, [importFn, componentName, enabled, touchDelay]);

  return elementRef;
};

/**
 * 🎯 HOOK SIMPLIFICADO PARA MÚLTIPLOS LINKS
 * 
 * Cria múltiplas refs com prefetch para uso em listas de navegação
 * 
 * @example
 * ```tsx
 * const { refs, createPrefetchProps } = usePrefetchLinks([
 *   { importFn: () => import('./Dashboard'), name: 'Dashboard' },
 *   { importFn: () => import('./Clima'), name: 'Clima' }
 * ]);
 * 
 * <button ref={refs[0]}>Dashboard</button>
 * <button ref={refs[1]}>Clima</button>
 * ```
 */
export const usePrefetchLinks = (
  links: Array<{ importFn: () => Promise<any>; name: string }>
) => {
  const refs = links.map(() => useRef<HTMLButtonElement>(null));

  useEffect(() => {
    links.forEach((link, index) => {
      const element = refs[index].current;
      if (!element) return;

      let hasPrefetched = false;
      const executePrefetch = () => {
        if (hasPrefetched) return;
        hasPrefetched = true;
        logger.log(`🎯 [PREFETCH MULTI] ${link.name}`);
        prefetchRoute(link.importFn, link.name);
      };

      const handleMouseEnter = () => executePrefetch();
      const handleTouchStart = () => {
        setTimeout(executePrefetch, 100);
      };

      element.addEventListener('mouseenter', handleMouseEnter, { once: true });
      element.addEventListener('touchstart', handleTouchStart, { passive: true, once: true });
    });
  }, [links, refs]);

  return refs;
};
