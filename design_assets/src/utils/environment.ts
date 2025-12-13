/**
 * 🌍 DETECÇÃO DE AMBIENTE - SOLOFORTE
 * 
 * Utilitários seguros para detectar ambiente de execução
 * Funciona em qualquer contexto (Vite, webpack, etc.)
 */

/**
 * Detectar se estamos em ambiente de desenvolvimento
 * Usa múltiplas estratégias para máxima compatibilidade
 */
export function isDevelopment(): boolean {
  try {
    // Estratégia 1: Verificar hostname (desenvolvimento local)
    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname;
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.includes('preview') ||
        hostname.includes('dev') ||
        hostname.includes('staging')
      ) {
        return true;
      }
    }

    // Estratégia 2: Verificar porta (desenvolvimento local)
    if (typeof window !== 'undefined' && window.location) {
      const port = window.location.port;
      if (port && parseInt(port) >= 3000 && parseInt(port) <= 9000) {
        return true;
      }
    }

    // Padrão: produção por segurança
    return false;
  } catch {
    // Em caso de erro, assumir produção por segurança
    return false;
  }
}

/**
 * Detectar se estamos em ambiente de produção
 */
export function isProduction(): boolean {
  return !isDevelopment();
}

/**
 * Detectar se estamos em ambiente de teste
 */
export function isTest(): boolean {
  try {
    // Verificar jest
    if (typeof window !== 'undefined' && 'jest' in window) {
      return true;
    }

    // Verificar vitest
    if (typeof globalThis !== 'undefined' && 'vi' in globalThis) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Obter o modo atual do ambiente
 */
export function getMode(): 'development' | 'production' | 'test' {
  if (isTest()) return 'test';
  if (isDevelopment()) return 'development';
  return 'production';
}

/**
 * Verificar se console.log deve ser exibido
 * Em produção, apenas warnings e errors
 */
export function shouldLog(level: 'log' | 'info' | 'warn' | 'error' | 'debug' = 'log'): boolean {
  const mode = getMode();

  switch (mode) {
    case 'development':
    case 'test':
      return true; // Todos os logs em dev/test

    case 'production':
      return level === 'warn' || level === 'error'; // Apenas warnings/errors em prod

    default:
      return false;
  }
}

/**
 * Verificar se estamos rodando no mobile (Capacitor)
 */
export function isMobile(): boolean {
  try {
    // Verificar se Capacitor está disponível
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.Capacitor && typeof win.Capacitor.isNativePlatform === 'function') {
        return win.Capacitor.isNativePlatform();
      }
    }

    // Fallback: verificar user agent
    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Verificar se estamos no browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Verificar se estamos no servidor (SSR)
 */
export function isServer(): boolean {
  return !isBrowser();
}

/**
 * Obter informações completas do ambiente
 */
export function getEnvironmentInfo() {
  return {
    mode: getMode(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isTest: isTest(),
    isMobile: isMobile(),
    isBrowser: isBrowser(),
    isServer: isServer(),
    hostname: isBrowser() ? window.location.hostname : 'unknown',
    port: isBrowser() ? window.location.port : 'unknown',
    userAgent: isBrowser() ? navigator.userAgent : 'unknown',
  };
}

// Logs apenas em desenvolvimento
if (isDevelopment() && isBrowser()) {
  console.log('🌍 Environment detected:', getEnvironmentInfo());
}
