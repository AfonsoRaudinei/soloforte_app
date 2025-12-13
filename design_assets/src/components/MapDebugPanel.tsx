/**
 * 🔍 MAP DEBUG PANEL
 * 
 * Painel de debug para monitorar sistema de mapas em tempo real
 * Mostra estatísticas de cache, requisições ativas, e Blob URLs
 * 
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { X, Activity, Database, Wifi, WifiOff } from 'lucide-react';
import { tileManager } from '../utils/TileManager';
import { logger } from '../utils/logger';

interface MapDebugPanelProps {
  onClose: () => void;
}

export default function MapDebugPanel({ onClose }: MapDebugPanelProps) {
  const [stats, setStats] = useState({
    activeRequests: 0,
    maxConcurrent: 0,
    blobUrls: 0,
    totalTiles: 0,
    totalSizeMB: 0,
    isOnline: navigator.onLine
  });

  // Atualizar stats a cada segundo
  useEffect(() => {
    const updateStats = async () => {
      try {
        const requestStats = tileManager.getRequestStats();
        const cacheStats = await tileManager.getCacheStats();
        
        setStats({
          activeRequests: requestStats.active,
          maxConcurrent: requestStats.max,
          blobUrls: requestStats.blobUrls,
          totalTiles: cacheStats.totalTiles,
          totalSizeMB: cacheStats.totalSizeMB,
          isOnline: tileManager.online
        });
      } catch (error) {
        logger.error('❌ Erro ao atualizar stats:', error);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-gray-900 dark:text-white">Map Debug</span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Status de Rede */}
        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div className="flex items-center gap-2">
            {stats.isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-xs text-gray-600 dark:text-gray-400">Status de Rede</span>
          </div>
          <span className={`text-xs ${stats.isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {stats.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Requisições Ativas */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Requisições Ativas</span>
            <span className="text-xs text-gray-900 dark:text-white">
              {stats.activeRequests} / {stats.maxConcurrent}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                stats.activeRequests >= stats.maxConcurrent
                  ? 'bg-red-500'
                  : stats.activeRequests > stats.maxConcurrent / 2
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{
                width: `${(stats.activeRequests / stats.maxConcurrent) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Blob URLs em Memória */}
        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Blob URLs</span>
          </div>
          <span className="text-xs text-gray-900 dark:text-white">
            {stats.blobUrls}
          </span>
        </div>

        {/* Cache Stats */}
        <div className="space-y-2 p-2 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-900 dark:text-blue-100">Tiles em Cache</span>
            <span className="text-xs text-blue-900 dark:text-blue-100">
              {stats.totalTiles.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-900 dark:text-blue-100">Espaço Usado</span>
            <span className="text-xs text-blue-900 dark:text-blue-100">
              {stats.totalSizeMB.toFixed(1)} MB
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              tileManager.cleanup();
              logger.log('🧹 Limpeza manual de Blob URLs executada');
            }}
            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300 transition-colors"
          >
            Limpar Blobs
          </button>
          <button
            onClick={async () => {
              if (confirm('Limpar todo o cache de mapas?')) {
                await tileManager.clearCache();
                logger.log('🗑️ Cache de mapas limpo');
              }
            }}
            className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 rounded text-xs text-red-700 dark:text-red-300 transition-colors"
          >
            Limpar Cache
          </button>
        </div>

        {/* Aviso */}
        <p className="text-xs text-gray-500 text-center">
          💡 Painel de debug - apenas desenvolvimento
        </p>
      </div>
    </div>
  );
}
