/**
 * 🐛 OVERFLOW DEBUGGER
 * 
 * Componente de desenvolvimento que destaca elementos com overflow
 * Para ativar: Adicionar parâmetro ?debug=overflow na URL
 * 
 * Uso: <OverflowDebugger />
 */

import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function OverflowDebugger() {
  const [isActive, setIsActive] = useState(false);
  const [overflowElements, setOverflowElements] = useState<Element[]>([]);

  useEffect(() => {
    // Verificar se está em modo debug
    const params = new URLSearchParams(window.location.search);
    const debugMode = params.get('debug') === 'overflow';
    
    setIsActive(debugMode);
    
    if (!debugMode) return;

    console.log('🐛 Overflow Debugger ativado');

    // Função para detectar overflow
    const detectOverflow = () => {
      const elements = document.querySelectorAll('*');
      const problematic: Element[] = [];

      elements.forEach((el) => {
        const computed = window.getComputedStyle(el);
        
        // Pular elementos com overflow permitido
        if (
          computed.overflow === 'auto' || 
          computed.overflow === 'scroll' ||
          computed.overflowX === 'auto' ||
          computed.overflowX === 'scroll'
        ) {
          return;
        }

        // Verificar se elemento está causando overflow horizontal
        if (el.scrollWidth > el.clientWidth) {
          problematic.push(el);
          
          // Destacar visualmente
          (el as HTMLElement).style.outline = '2px solid red';
          (el as HTMLElement).style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        }
      });

      setOverflowElements(problematic);
      
      if (problematic.length > 0) {
        console.warn(`⚠️ ${problematic.length} elementos com overflow detectados:`, problematic);
      }
    };

    // Executar detecção
    detectOverflow();

    // Observar mudanças no DOM
    const observer = new MutationObserver(detectOverflow);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      observer.disconnect();
      
      // Remover highlights
      overflowElements.forEach((el) => {
        (el as HTMLElement).style.outline = '';
        (el as HTMLElement).style.backgroundColor = '';
      });
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-red-600 text-white p-4 rounded-lg shadow-2xl max-w-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold mb-1">Overflow Debug Mode</h3>
          <p className="text-sm opacity-90 mb-2">
            {overflowElements.length > 0 
              ? `${overflowElements.length} elementos com overflow detectados` 
              : 'Nenhum overflow detectado'}
          </p>
          <div className="text-xs opacity-75">
            Elementos com overflow estão destacados em vermelho.
            <br />
            Verifique o console para detalhes.
          </div>
        </div>
        <button
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.delete('debug');
            window.location.href = url.toString();
          }}
          className="flex-shrink-0 hover:bg-red-700 rounded p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {overflowElements.length > 0 && (
        <div className="mt-3 pt-3 border-t border-red-500">
          <p className="text-xs mb-2">Elementos problemáticos:</p>
          <div className="max-h-32 overflow-y-auto text-xs space-y-1">
            {overflowElements.slice(0, 10).map((el, i) => (
              <div key={i} className="bg-red-700/50 px-2 py-1 rounded font-mono">
                {el.tagName.toLowerCase()}
                {el.className ? `.${el.className.split(' ')[0]}` : ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Hook para detectar se há overflow horizontal na página
 */
export function useOverflowDetection() {
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const hasHorizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
      setHasOverflow(hasHorizontalOverflow);
      
      if (hasHorizontalOverflow && process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Overflow horizontal detectado na página');
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return hasOverflow;
}
