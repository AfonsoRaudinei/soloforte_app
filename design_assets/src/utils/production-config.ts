/**
 * 🚀 CONFIGURAÇÕES DE PRODUÇÃO - SOLOFORTE
 * 
 * Script para otimizar o app em ambiente de produção.
 * Remove logs desnecessários e ativa otimizações.
 */

// Detectar ambiente
export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;

/**
 * Desabilitar console.log em produção
 * Mantém apenas logger para tracking controlado
 */
export function disableConsoleLogs() {
  if (isProduction) {
    // Salvar referências originais
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    // Substituir por funções vazias
    console.log = () => {};
    console.warn = () => {};
    
    // Manter console.error apenas para erros críticos
    console.error = (...args: any[]) => {
      // Logar apenas em ambientes de staging/debug
      if (window.location.hostname.includes('staging') || window.location.hostname.includes('debug')) {
        originalError(...args);
      }
    };
    
    // Disponibilizar método para reativar logs (debug)
    (window as any).__enableLogs = () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.log('✅ Console logs reativados');
    };
  }
}

/**
 * Configurar otimizações de performance
 */
export function configureProductionOptimizations() {
  if (isProduction) {
    // Desabilitar React DevTools
    if (typeof window !== 'undefined') {
      (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
        isDisabled: true,
        supportsFiber: true,
        inject: () => {},
        onCommitFiberRoot: () => {},
        onCommitFiberUnmount: () => {},
      };
    }
  }
}

/**
 * Inicializar configurações de produção
 * Chamar no início do App.tsx
 */
export function initProductionConfig() {
  disableConsoleLogs();
  configureProductionOptimizations();
  
  if (isProduction) {
    console.log = () => {}; // Garantir que está desabilitado
  }
}
