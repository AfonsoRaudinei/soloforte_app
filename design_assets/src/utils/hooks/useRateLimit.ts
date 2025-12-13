/**
 * 🔒 HOOK: USE RATE LIMIT
 * 
 * Hook React para rate limiting com feedback visual
 * 
 * @example
 * ```tsx
 * const { checkLimit, isBlocked, resetTime } = useRateLimit('login', LOGIN_RATE_LIMIT);
 * 
 * const handleLogin = async () => {
 *   const result = checkLimit();
 *   if (!result.allowed) {
 *     toast.error(result.message);
 *     return;
 *   }
 *   // Prosseguir com login
 * };
 * ```
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  RateLimiter, 
  RateLimitConfig, 
  RateLimitResult,
  getRateLimitIdentifier,
  formatResetTime 
} from '../security/rate-limiter';

export interface UseRateLimitOptions extends RateLimitConfig {
  /** Identificador customizado (padrão: fingerprint) */
  identifier?: string;
  
  /** Callback quando bloqueado */
  onBlocked?: (resetTime: number) => void;
  
  /** Callback quando permitido */
  onAllowed?: () => void;
  
  /** Auto-reset quando janela expirar */
  autoReset?: boolean;
}

export interface UseRateLimitReturn {
  /** Verificar se requisição é permitida */
  checkLimit: () => RateLimitResult;
  
  /** Se está bloqueado */
  isBlocked: boolean;
  
  /** Requisições restantes */
  remaining: number;
  
  /** Tempo até reset (ms) */
  resetTime: number;
  
  /** Tempo até reset (formatado) */
  resetTimeFormatted: string;
  
  /** Total de requisições na janela */
  totalRequests: number;
  
  /** Resetar manualmente */
  reset: () => void;
  
  /** Último resultado */
  lastResult: RateLimitResult | null;
}

/**
 * Hook para rate limiting
 */
export function useRateLimit(
  context: string,
  options: UseRateLimitOptions
): UseRateLimitReturn {
  const limiterRef = useRef<RateLimiter | null>(null);
  const [lastResult, setLastResult] = useState<RateLimitResult | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [resetTime, setResetTime] = useState(0);
  const [remaining, setRemaining] = useState(options.maxRequests);
  const [totalRequests, setTotalRequests] = useState(0);
  
  // Identificador único
  const identifier = options.identifier || getRateLimitIdentifier(context);
  
  // Criar limiter
  useEffect(() => {
    limiterRef.current = new RateLimiter({
      ...options,
      onLimitReached: (id) => {
        options.onLimitReached?.(id);
        options.onBlocked?.(resetTime);
      },
    });
  }, [context]);
  
  // Auto-reset quando janela expirar
  useEffect(() => {
    if (!options.autoReset || !isBlocked || resetTime <= 0) {
      return;
    }
    
    const timer = setTimeout(() => {
      setIsBlocked(false);
      setResetTime(0);
      setRemaining(options.maxRequests);
      setTotalRequests(0);
    }, resetTime);
    
    return () => clearTimeout(timer);
  }, [isBlocked, resetTime, options.autoReset, options.maxRequests]);
  
  // Countdown do resetTime
  useEffect(() => {
    if (resetTime <= 0) {
      return;
    }
    
    const interval = setInterval(() => {
      setResetTime(prev => Math.max(0, prev - 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [resetTime]);
  
  /**
   * Verificar limite
   */
  const checkLimit = useCallback((): RateLimitResult => {
    if (!limiterRef.current) {
      return {
        allowed: true,
        remaining: options.maxRequests,
        resetTime: options.windowMs,
        totalRequests: 0,
      };
    }
    
    const result = limiterRef.current.check(identifier);
    
    setLastResult(result);
    setIsBlocked(!result.allowed);
    setResetTime(result.resetTime);
    setRemaining(result.remaining);
    setTotalRequests(result.totalRequests);
    
    if (result.allowed) {
      options.onAllowed?.();
    } else {
      options.onBlocked?.(result.resetTime);
    }
    
    return result;
  }, [identifier, options]);
  
  /**
   * Reset manual
   */
  const reset = useCallback(() => {
    if (limiterRef.current) {
      limiterRef.current.reset(identifier);
    }
    
    setLastResult(null);
    setIsBlocked(false);
    setResetTime(0);
    setRemaining(options.maxRequests);
    setTotalRequests(0);
  }, [identifier, options.maxRequests]);
  
  return {
    checkLimit,
    isBlocked,
    remaining,
    resetTime,
    resetTimeFormatted: formatResetTime(resetTime),
    totalRequests,
    reset,
    lastResult,
  };
}

/**
 * Hook para rate limit de login
 */
export function useLoginRateLimit() {
  return useRateLimit('login', {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 min
    message: 'Muitas tentativas de login. Aguarde 15 minutos.',
    strategy: 'sliding',
    storage: 'localStorage',
    autoReset: true,
  });
}

/**
 * Hook para rate limit de cadastro
 */
export function useSignupRateLimit() {
  return useRateLimit('signup', {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hora
    message: 'Muitos cadastros. Aguarde 1 hora.',
    strategy: 'sliding',
    storage: 'localStorage',
    autoReset: true,
  });
}

/**
 * Hook para rate limit de formulário
 */
export function useFormRateLimit(formName: string) {
  return useRateLimit(`form:${formName}`, {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hora
    message: 'Muitos envios. Aguarde antes de enviar novamente.',
    strategy: 'fixed',
    storage: 'localStorage',
    autoReset: true,
  });
}

/**
 * Hook para rate limit de API
 */
export function useApiRateLimit(endpoint: string) {
  return useRateLimit(`api:${endpoint}`, {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minuto
    message: 'Muitas requisições. Aguarde 1 minuto.',
    strategy: 'sliding',
    storage: 'memory',
    autoReset: true,
  });
}

export default useRateLimit;
