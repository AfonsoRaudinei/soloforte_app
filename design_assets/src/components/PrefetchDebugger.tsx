/**
 * 🔍 PREFETCH DEBUGGER
 * 
 * Componente de debug para visualizar o status do prefetch em tempo real.
 * Útil para desenvolvimento e testes.
 * 
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { Card } from './ui/card';

interface PrefetchLog {
  timestamp: string;
  type: 'hover' | 'start' | 'success' | 'error';
  componentName: string;
  duration?: string;
  message?: string;
}

export function PrefetchDebugger() {
  const [logs, setLogs] = useState<PrefetchLog[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Interceptar console.log para capturar logs de prefetch
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args: any[]) => {
      originalLog(...args);
      
      const message = args.join(' ');
      
      // Detectar logs de prefetch
      if (message.includes('[PREFETCH')) {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        
        // Detectar prefetch on hover/touch
        if (message.includes('🎯') && message.includes('[PREFETCH HOVER]')) {
          const componentName = message.match(/Acionado para (.+)/)?.[1] || 'Unknown';
          setLogs(prev => [...prev, {
            timestamp,
            type: 'hover',
            componentName,
            message
          }]);
        }
        // Detectar prefetch multi
        else if (message.includes('🎯') && message.includes('[PREFETCH MULTI]')) {
          const componentName = message.match(/\[PREFETCH MULTI\] (.+)/)?.[1] || 'Unknown';
          setLogs(prev => [...prev, {
            timestamp,
            type: 'hover',
            componentName,
            message
          }]);
        }
        // Detectar início do prefetch
        else if (message.includes('🚀') && message.includes('Iniciando prefetch')) {
          const componentName = message.match(/Iniciando prefetch de (.+?) \(/)?.[1] || 'Unknown';
          setLogs(prev => [...prev, {
            timestamp,
            type: 'start',
            componentName,
            message
          }]);
        }
        // Detectar sucesso
        else if (message.includes('✅') && message.includes('carregado em')) {
          const match = message.match(/✅ \[PREFETCH\] (.+?) carregado em (.+?)ms/);
          const componentName = match?.[1] || 'Unknown';
          const duration = match?.[2] || '0';
          setLogs(prev => [...prev, {
            timestamp,
            type: 'success',
            componentName,
            duration: `${duration}ms`,
            message
          }]);
        }
      }
    };

    console.error = (...args: any[]) => {
      originalError(...args);
      
      const message = args.join(' ');
      
      if (message.includes('[PREFETCH]') && message.includes('❌')) {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const componentName = message.match(/Falha ao carregar (.+?):/)?.[1] || 'Unknown';
        setLogs(prev => [...prev, {
          timestamp,
          type: 'error',
          componentName,
          message
        }]);
      }
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  // Atalho de teclado para mostrar/ocultar (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 z-[9999] w-96 max-h-96 overflow-auto bg-white dark:bg-gray-900 shadow-2xl">
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <h3 className="font-semibold">Prefetch Debugger</h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-white/20 rounded px-2 py-1 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-3">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2 text-center">
            <div className="text-xs text-purple-600 dark:text-purple-400">Hover</div>
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
              {logs.filter(l => l.type === 'hover').length}
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 text-center">
            <div className="text-xs text-blue-600 dark:text-blue-400">Iniciados</div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {logs.filter(l => l.type === 'start').length}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 text-center">
            <div className="text-xs text-green-600 dark:text-green-400">Sucessos</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">
              {logs.filter(l => l.type === 'success').length}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded p-2 text-center">
            <div className="text-xs text-red-600 dark:text-red-400">Erros</div>
            <div className="text-lg font-bold text-red-700 dark:text-red-300">
              {logs.filter(l => l.type === 'error').length}
            </div>
          </div>
        </div>

        {/* Logs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Logs ({logs.length})
            </h4>
            {logs.length > 0 && (
              <button
                onClick={() => setLogs([])}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Limpar
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              Nenhum prefetch detectado ainda.
              <br />
              Navegue entre páginas para ver os logs.
            </div>
          ) : (
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {logs.slice().reverse().map((log, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded border ${
                    log.type === 'start'
                      ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                      : log.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {log.type === 'start' ? '🚀' : log.type === 'success' ? '✅' : '❌'}{' '}
                      {log.componentName}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {log.timestamp}
                    </span>
                  </div>
                  {log.duration && (
                    <div className="text-gray-600 dark:text-gray-300">
                      ⏱️ {log.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <p>💡 Pressione <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Shift+P</kbd> para ocultar</p>
          <p className="mt-1">📊 Prefetch usa requestIdleCallback para não bloquear UI</p>
        </div>
      </div>
    </Card>
  );
}

export default PrefetchDebugger;
