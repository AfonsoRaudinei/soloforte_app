import { useEffect, useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

/**
 * 🚫 MOBILE-ONLY GUARD
 * 
 * Bloqueia acesso desktop e exibe mensagem profissional
 * O SoloForte é exclusivamente mobile-first
 */

const MOBILE_MAX_WIDTH = 768; // Breakpoint tablet/desktop

export function MobileOnlyGuard({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      const isMobileDevice = width < MOBILE_MAX_WIDTH;
      
      setIsMobile(isMobileDevice);
      
      // Mostrar aviso se desktop
      if (!isMobileDevice) {
        setShowWarning(true);
      }
    };

    // Check inicial
    checkViewport();

    // Monitor resize
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // 🚫 Tela de bloqueio para desktop
  if (showWarning && !isMobile) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center space-y-6">
          {/* Ícones animados */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Smartphone className="h-16 w-16 text-[#0057FF] animate-pulse" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="text-4xl text-gray-300 dark:text-gray-600">→</div>
            <Monitor className="h-16 w-16 text-gray-300 dark:text-gray-600 opacity-50" />
          </div>

          {/* Mensagem principal */}
          <div className="space-y-3">
            <h1 className="text-2xl text-gray-900 dark:text-white">
              📱 Aplicativo Mobile
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              O <strong className="text-[#0057FF]">SoloForte</strong> foi desenvolvido exclusivamente para smartphones.
            </p>
          </div>

          {/* Instruções */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Para acessar:</strong>
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left">
              <li>• Abra no seu smartphone</li>
              <li>• Use o modo responsivo do navegador</li>
              <li>• Redimensione a janela para &lt; 768px</li>
            </ul>
          </div>

          {/* QR Code placeholder (opcional) */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Design exclusivo para smartphones<br />
              Ergonomia mobile-first • Touch-optimized
            </p>
          </div>

          {/* Botão de override (desenvolvimento) */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={() => setShowWarning(false)}
              className="text-xs text-gray-400 hover:text-[#0057FF] transition-colors underline"
            >
              [DEV] Continuar mesmo assim
            </button>
          )}
        </div>
      </div>
    );
  }

  // ✅ Mobile: renderiza normalmente
  return <>{children}</>;
}
