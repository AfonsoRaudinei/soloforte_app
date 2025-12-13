/**
 * 🚀 PREFETCH UTILITY
 * 
 * Pré-carrega componentes lazy antes de serem necessários.
 * Usa requestIdleCallback para não bloquear thread principal.
 * 
 * Estratégia:
 * - Prefetch quando usuário está no Login → carrega Dashboard
 * - Prefetch quando está no Dashboard → carrega Relatórios
 * - Usa tempo idle do browser para não afetar performance
 * 
 * @version 1.0.0
 */

import { logger } from './logger';

// Polyfill para requestIdleCallback (não suportado em Safari)
const requestIdleCallback =
  window.requestIdleCallback ||
  function (cb: IdleRequestCallback) {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      } as IdleDeadline);
    }, 1);
  };

/**
 * ✅ PREFETCH COM FUNÇÃO DE IMPORT
 * 
 * Pré-carrega componente lazy quando browser está idle
 * Recebe função de import ao invés de path string
 */
export const prefetchRoute = (
  importFn: () => Promise<any>,
  componentName: string = 'Component'
): void => {
  requestIdleCallback(() => {
    const startTime = performance.now();
    logger.log(`🚀 [PREFETCH] Iniciando prefetch de ${componentName}...`);
    
    importFn()
      .then(() => {
        const duration = (performance.now() - startTime).toFixed(2);
        logger.log(`✅ [PREFETCH] ${componentName} carregado em ${duration}ms`);
      })
      .catch((err) => {
        logger.error(`❌ [PREFETCH] Falha ao carregar ${componentName}:`, err);
      });
  });
};

/**
 * ✅ PREFETCH MÚLTIPLOS
 * 
 * Pré-carrega vários componentes de uma vez
 */
export const prefetchMultiple = (
  routes: Array<{ importFn: () => Promise<any>; name: string }>
): void => {
  routes.forEach(({ importFn, name }) => {
    prefetchRoute(importFn, name);
  });
};

/**
 * ✅ PREFETCH BASEADO EM ROTA ATUAL
 * 
 * Inteligência para prefetch baseado na navegação
 * Recebe mapa de rotas com funções de import
 */
export const prefetchByRoute = (
  currentRoute: string,
  routeImports: Record<string, Array<{ importFn: () => Promise<any>; name: string }>>
): void => {
  const routesToPrefetch = routeImports[currentRoute];
  
  if (routesToPrefetch) {
    logger.group(`🎯 [PREFETCH] Rota atual: ${currentRoute}`, () => {
      logger.log(`📦 Componentes para prefetch:`, routesToPrefetch.map(r => r.name).join(', '));
      logger.log(`⏱️ Usando requestIdleCallback para não bloquear UI`);
    });
    prefetchMultiple(routesToPrefetch);
  } else {
    logger.log(`ℹ️ [PREFETCH] Nenhum prefetch configurado para rota: ${currentRoute}`);
  }
};

/**
 * ✅ PREFETCH ON HOVER
 * 
 * Pré-carrega quando usuário passa mouse sobre link
 * (Mobile: pode ser adaptado para touch com delay)
 */
export const prefetchOnHover = (
  element: HTMLElement,
  componentPath: string,
  componentName: string
): (() => void) => {
  const handleHover = () => {
    prefetchRoute(componentPath, componentName);
  };

  element.addEventListener('mouseenter', handleHover, { once: true });

  // Retorna cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleHover);
  };
};
