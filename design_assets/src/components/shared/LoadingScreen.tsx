/**
 * LOADING SCREEN
 * Tela de carregamento padrão para lazy loading
 */

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingScreen({ 
  message = 'Carregando...', 
  fullScreen = true 
}: LoadingScreenProps) {
  const containerClass = fullScreen 
    ? 'h-screen w-screen' 
    : 'h-full w-full';
  
  // 🚨 Mostrar botão de emergência após 3 segundos
  const [showEmergencyButton, setShowEmergencyButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmergencyButton(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleEmergencyAccess = () => {
    console.log('🚨 [LoadingScreen] Botão de emergência acionado');
    // Ativar modo demo e recarregar
    localStorage.setItem('soloforte_demo_mode', 'true');
    window.location.href = '/#/home';
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className={`${containerClass} flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800`}>
      <div className="text-center space-y-4 px-6">
        {/* Logo animado */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-[#0057FF] rounded-2xl animate-pulse" />
          <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-[#0057FF]">SF</span>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center">
          <div className="h-10 w-10 border-4 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Mensagem */}
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {message}
        </p>
        
        {/* 🚨 Botão de Emergência (aparece após 3s) */}
        {showEmergencyButton && (
          <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Está demorando muito?
            </p>
            <button
              onClick={handleEmergencyAccess}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-lg transition-all active:scale-95"
            >
              🚨 Acesso de Emergência
            </button>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              (Ativa modo demonstração)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * LOADING SPINNER INLINE
 * Versão pequena para uso inline
 */
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className={`${sizes[size]} border-[#0057FF] border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

/**
 * SKELETON PARA MAPA
 */
export function SkeletonMap() {
  return (
    <div className="h-full w-full bg-gray-100 dark:bg-gray-800 animate-pulse relative">
      {/* Controles superiores esquerdos */}
      <div className="absolute top-6 left-6 space-y-3">
        <div className="h-14 w-14 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="h-14 w-14 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="h-14 w-14 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>

      {/* Controles superiores direitos */}
      <div className="absolute top-6 right-6 space-y-3">
        <div className="h-14 w-32 bg-gray-300 dark:bg-gray-700 rounded-xl" />
        <div className="h-14 w-32 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      </div>

      {/* Centro - Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-20 w-20 bg-gray-300 dark:bg-gray-700 rounded-2xl mx-auto" />
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 dark:text-gray-400">Carregando mapa...</p>
        </div>
      </div>

      {/* Controle inferior direito (FAB) */}
      <div className="absolute bottom-6 right-6">
        <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  );
}

/**
 * SKELETON PARA LISTA
 */
export function SkeletonList({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * SKELETON PARA CARD
 */
export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
