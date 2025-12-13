import { Wifi, WifiOff, RefreshCw, Cloud, CloudOff } from 'lucide-react';
import { useOfflineSync } from '../utils/hooks/useOfflineSync';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

/**
 * 📡 Indicador de Status Offline/Online
 * 
 * Mostra status de conexão e sincronização no canto superior direito.
 * 
 * Features:
 * - Ícone verde (online) / laranja (offline)
 * - Contador de operações pendentes
 * - Botão de sincronização manual
 * - Estatísticas de cache ao clicar
 * 
 * Usage:
 * ```tsx
 * <OfflineIndicator />
 * ```
 */

export function OfflineIndicator() {
  const { isOnline, isSyncing, pendingSync, lastSync, cacheStats, syncNow } = useOfflineSync();

  const handleClick = () => {
    if (!isOnline) {
      toast.warning('📡 Modo Offline', {
        description: `${pendingSync} operação(ões) aguardando sincronização`,
        duration: 4000,
      });
      return;
    }

    toast.info('📊 Estatísticas do Cache', {
      description: `${cacheStats.clientes} clientes • ${cacheStats.fazendas} fazendas • ${cacheStats.visitas} visitas • ${cacheStats.pendingSync} pendentes`,
      duration: 5000,
    });
  };

  const handleSyncClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOnline) {
      syncNow();
    } else {
      toast.warning('📡 Sem conexão', {
        description: 'Conecte-se à internet para sincronizar',
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Indicador de Status */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-200/50"
      >
        {/* Ícone de conexão */}
        <div className="relative">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-600" />
          ) : (
            <WifiOff className="w-4 h-4 text-orange-500" />
          )}
          
          {/* Pulso de sincronização */}
          <AnimatePresence>
            {isSyncing && (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-blue-500"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Badge de operações pendentes */}
        <AnimatePresence>
          {pendingSync > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 rounded-full"
            >
              <CloudOff className="w-3 h-3 text-orange-600" />
              <span className="text-xs text-orange-700">{pendingSync}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status text */}
        <span className="text-xs text-gray-700">
          {isSyncing ? 'Sincronizando...' : isOnline ? 'Online' : 'Offline'}
        </span>
      </button>

      {/* Botão de sync manual */}
      <button
        onClick={handleSyncClick}
        disabled={isSyncing}
        className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200/50 flex items-center justify-center"
        title="Sincronizar agora"
      >
        <RefreshCw
          className={`w-4 h-4 ${isOnline ? 'text-blue-600' : 'text-gray-400'} ${
            isSyncing ? 'animate-spin' : ''
          }`}
        />
      </button>
    </div>
  );
}

/**
 * 📊 Componente expandido com estatísticas detalhadas
 */
export function OfflineStats() {
  const { cacheStats, lastSync, isOnline } = useOfflineSync();

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Cloud className="w-5 h-5 text-blue-600" />
        <h3 className="text-gray-900">Cache Local</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Clientes:</span>
          <span className="text-gray-900">{cacheStats.clientes}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Fazendas:</span>
          <span className="text-gray-900">{cacheStats.fazendas}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Visitas:</span>
          <span className="text-gray-900">{cacheStats.visitas}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Talhões:</span>
          <span className="text-gray-900">{cacheStats.talhoes}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Ocorrências:</span>
          <span className="text-gray-900">{cacheStats.ocorrencias}</span>
        </div>

        {cacheStats.pendingSync > 0 && (
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <span className="text-orange-600">Pendentes:</span>
            <span className="text-orange-700 font-semibold">{cacheStats.pendingSync}</span>
          </div>
        )}

        {lastSync && (
          <div className="pt-2 border-t border-gray-100 text-xs text-gray-500">
            Última sync: {lastSync.toLocaleTimeString('pt-BR')}
          </div>
        )}

        <div className="pt-2 border-t border-gray-100">
          <div className={`flex items-center gap-2 text-xs ${isOnline ? 'text-green-600' : 'text-orange-600'}`}>
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3" />
                <span>Conectado ao servidor</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                <span>Modo offline ativado</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
