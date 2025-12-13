/**
 * 🔒 RATE LIMIT BLOCK COMPONENT
 * 
 * Componente visual para mostrar quando rate limit é atingido
 * 
 * @example
 * ```tsx
 * {isBlocked && (
 *   <RateLimitBlock 
 *     resetTime={resetTime}
 *     message="Muitas tentativas de login"
 *   />
 * )}
 * ```
 */

import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Shield } from 'lucide-react';

// ✅ MOCK: Função helper movida para dentro do arquivo
function formatResetTime(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds}s`;
}

export interface RateLimitBlockProps {
  /** Tempo até reset (ms) */
  resetTime: number;
  
  /** Mensagem customizada */
  message?: string;
  
  /** Mostrar ícone */
  showIcon?: boolean;
  
  /** Variante visual */
  variant?: 'inline' | 'modal' | 'banner';
  
  /** Callback quando tempo expira */
  onExpire?: () => void;
  
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente de bloqueio por rate limit
 */
export function RateLimitBlock({
  resetTime: initialResetTime,
  message = 'Muitas tentativas. Por favor, aguarde.',
  showIcon = true,
  variant = 'inline',
  onExpire,
  className = '',
}: RateLimitBlockProps) {
  const [timeLeft, setTimeLeft] = useState(initialResetTime);
  
  // Countdown
  useEffect(() => {
    setTimeLeft(initialResetTime);
  }, [initialResetTime]);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - 1000);
        if (newTime === 0) {
          onExpire?.();
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);
  
  const formattedTime = formatResetTime(timeLeft);
  
  // Variante inline
  if (variant === 'inline') {
    return (
      <div className={`
        flex items-center gap-3 p-4 rounded-lg
        bg-red-500/10 border border-red-500/20
        text-red-600
        ${className}
      `}>
        {showIcon && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
        <div className="flex-1">
          <p className="text-sm">{message}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" />
            <p className="text-xs opacity-80">
              Tente novamente em: <strong>{formattedTime}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Variante modal
  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className={`
          bg-[#0a0f1a] border border-red-500/20 rounded-xl p-6
          max-w-md w-full shadow-2xl
          ${className}
        `}>
          {showIcon && (
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
            </div>
          )}
          
          <h3 className="text-lg text-center mb-2">
            Limite de Requisições Atingido
          </h3>
          
          <p className="text-sm text-gray-400 text-center mb-6">
            {message}
          </p>
          
          <div className="flex items-center justify-center gap-2 p-4 bg-red-500/5 rounded-lg">
            <Clock className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-xs text-gray-400">Tente novamente em:</p>
              <p className="text-lg text-red-500">{formattedTime}</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            Esta é uma medida de segurança para proteger sua conta.
          </p>
        </div>
      </div>
    );
  }
  
  // Variante banner
  return (
    <div className={`
      fixed top-0 left-0 right-0 z-50
      bg-red-600 text-white p-4
      shadow-lg
      ${className}
    `}>
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        {showIcon && <AlertCircle className="w-6 h-6 flex-shrink-0" />}
        <div className="flex-1">
          <p className="">{message}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" />
            <p className="text-sm opacity-90">
              Tente novamente em: <strong>{formattedTime}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Variante inline compacta
 */
export function RateLimitInline(props: RateLimitBlockProps) {
  return <RateLimitBlock {...props} variant="inline" />;
}

/**
 * Variante modal
 */
export function RateLimitModal(props: RateLimitBlockProps) {
  return <RateLimitBlock {...props} variant="modal" />;
}

/**
 * Variante banner
 */
export function RateLimitBanner(props: RateLimitBlockProps) {
  return <RateLimitBlock {...props} variant="banner" />;
}

export default RateLimitBlock;