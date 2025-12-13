import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';

/**
 * Hook REATIVO para verificar se o app está em modo demonstração
 * ✅ Atualiza automaticamente quando modo demo muda
 * ✅ Funciona entre tabs/janelas
 * ✅ Usa STORAGE_KEYS centralizado
 * 
 * Uso:
 * const isDemo = useDemo();
 */
export function useDemo(): boolean {
  const [isDemo, setIsDemo] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.DEMO_MODE) === 'true'
  );

  useEffect(() => {
    // Listener para mudanças em outras tabs/janelas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.DEMO_MODE) {
        setIsDemo(e.newValue === 'true');
      }
    };

    // Listener para mudanças na mesma tab
    const handleCustomEvent = () => {
      setIsDemo(localStorage.getItem(STORAGE_KEYS.DEMO_MODE) === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('demo-mode-change', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('demo-mode-change', handleCustomEvent);
    };
  }, []);

  return isDemo;
}

/**
 * Hook para ativar/desativar modo demo
 * ✅ Atualiza todos os componentes automaticamente (sem reload!)
 * ✅ Usa STORAGE_KEYS centralizado
 */
export function useDemoToggle() {
  const isDemo = useDemo();
  
  const enableDemo = () => {
    localStorage.setItem(STORAGE_KEYS.DEMO_MODE, 'true');
    // Dispara evento customizado para atualizar componentes na mesma tab
    window.dispatchEvent(new Event('demo-mode-change'));
    // Dispara storage event para outras tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.DEMO_MODE,
      newValue: 'true',
      url: window.location.href,
    }));
  };
  
  const disableDemo = () => {
    localStorage.removeItem(STORAGE_KEYS.DEMO_MODE);
    // Dispara evento customizado para atualizar componentes na mesma tab
    window.dispatchEvent(new Event('demo-mode-change'));
    // Dispara storage event para outras tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.DEMO_MODE,
      newValue: null,
      url: window.location.href,
    }));
  };
  
  return {
    isDemo,
    enableDemo,
    disableDemo
  };
}
