import { useState, useEffect } from 'react';

/**
 * 📡 MOCK: Hook de sincronização offline simplificado
 * 
 * Versão visual-only sem IndexedDB ou Supabase.
 * Apenas monitora status online/offline do navegador.
 */

export interface CacheStats {
  clientes: number;
  fazendas: number;
  visitas: number;
  talhoes: number;
  ocorrencias: number;
  pendingSync: number;
}

export interface UseOfflineSyncReturn {
  isOnline: boolean;
  isSyncing: boolean;
  pendingSync: number;
  lastSync: Date | null;
  cacheStats: CacheStats;
  syncNow: () => void;
}

export function useOfflineSync(): UseOfflineSyncReturn {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // ✅ Monitorar status online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ✅ MOCK: Estatísticas do cache (dados demo)
  const cacheStats: CacheStats = {
    clientes: 12,
    fazendas: 28,
    visitas: 156,
    talhoes: 45,
    ocorrencias: 89,
    pendingSync: 0,
  };

  // ✅ MOCK: Sincronização manual
  const syncNow = () => {
    if (!isOnline) return;
    
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync(new Date());
    }, 1500);
  };

  return {
    isOnline,
    isSyncing,
    pendingSync: 0,
    lastSync,
    cacheStats,
    syncNow,
  };
}
