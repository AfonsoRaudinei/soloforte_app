import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X, Minimize2 } from 'lucide-react';

/**
 * 🎨 Card de Instruções de Desenho - UX Otimizada
 * 
 * Card flutuante com instruções para desenho de shapes no mapa.
 * 
 * Características Premium:
 * - ✅ pointer-events: none no container (permite clicar no mapa abaixo)
 * - ✅ pointer-events: auto apenas nos botões (interativos)
 * - ✅ Posicionado no canto superior esquerdo (não atrapalha)
 * - ✅ Minimização automática após 3 pontos
 * - ✅ Animação suave de expansão/colapso
 * 
 * Usage:
 * ```tsx
 * <DrawingInstructionCard 
 *   isDrawing={activeTool !== null}
 *   pointCount={drawnPoints.length}
 *   toolType="polygon"
 * />
 * ```
 */

interface DrawingInstructionCardProps {
  isDrawing: boolean;
  pointCount?: number;
  toolType?: 'polygon' | 'rectangle' | 'circle';
}

export function DrawingInstructionCard({
  isDrawing,
  pointCount = 0,
  toolType = 'polygon',
}: DrawingInstructionCardProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasAutoMinimized, setHasAutoMinimized] = useState(false);

  /**
   * ✅ SOLUÇÃO 3: Minimização automática após 3 pontos
   */
  useEffect(() => {
    if (pointCount >= 3 && !hasAutoMinimized && !isMinimized) {
      // Auto-minimizar após 3 pontos
      setTimeout(() => {
        setIsMinimized(true);
        setHasAutoMinimized(true);
      }, 800); // Delay para não ser abrupto
    }
  }, [pointCount, hasAutoMinimized, isMinimized]);

  /**
   * Reset ao trocar ferramenta ou parar de desenhar
   */
  useEffect(() => {
    if (!isDrawing) {
      setIsMinimized(false);
      setHasAutoMinimized(false);
    }
  }, [isDrawing]);

  // Instruções por tipo de ferramenta
  const instructions = {
    polygon: {
      title: '✏️ Desenho Livre',
      steps: [
        'Clique no mapa para adicionar pontos',
        'Clique em qualquer ponto para remover',
        'Enter ou botão verde para finalizar',
        'Esc ou botão vermelho para cancelar',
      ],
    },
    rectangle: {
      title: '◻️ Retângulo',
      steps: [
        'Clique no primeiro canto',
        'Clique no canto oposto',
        'Enter ou botão verde para finalizar',
        'Esc ou botão vermelho para cancelar',
      ],
    },
    circle: {
      title: '⭕ Pivô Circular',
      steps: [
        'Clique no centro do pivô',
        'Arraste para definir o raio',
        'Enter ou botão verde para finalizar',
        'Esc ou botão vermelho para cancelar',
      ],
    },
  };

  const currentInstructions = instructions[toolType];

  if (!isDrawing) return null;

  return (
    <>
      {/* ✅ SOLUÇÃO 2: Posicionado no canto superior esquerdo */}
      {/* ✅ SOLUÇÃO 1: pointer-events: none no container */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="absolute top-24 left-4 z-[900] max-w-xs"
        style={{ pointerEvents: 'none' }} // 🔥 Permite clicar no mapa abaixo
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            /* Card Minimizado - Ícone compacto */
            <motion.button
              key="minimized"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsMinimized(false)}
              className="group relative"
              style={{ pointerEvents: 'auto' }} // ✅ Botão é clicável
              title="Clique para ver instruções"
            >
              {/* Ícone principal */}
              <div className="w-12 h-12 rounded-full bg-[#0057FF] hover:bg-[#0046CC] shadow-lg flex items-center justify-center transition-all group-hover:scale-110">
                <Info className="w-6 h-6 text-white" />
              </div>

              {/* Badge de contador de pontos */}
              {pointCount > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-md">
                  <span className="text-xs text-white">{pointCount}</span>
                </div>
              )}

              {/* Tooltip no hover */}
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                💡 Clique para expandir instruções
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
              </div>
            </motion.button>
          ) : (
            /* Card Expandido - Instruções completas */
            <motion.div
              key="expanded"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50"
              style={{ pointerEvents: 'none' }} // 🔥 Card transparente ao clique
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0057FF]/10 flex items-center justify-center">
                    <Info className="w-4 h-4 text-[#0057FF]" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900">{currentInstructions.title}</h4>
                    {pointCount > 0 && (
                      <div className="text-xs text-gray-500">
                        {pointCount} {pointCount === 1 ? 'ponto' : 'pontos'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Botão de minimizar - ✅ Clicável */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                  style={{ pointerEvents: 'auto' }} // ✅ Botão é clicável
                  title="Minimizar"
                >
                  <Minimize2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Instruções */}
              <div className="px-4 py-3">
                <ul className="space-y-2">
                  {currentInstructions.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0057FF]/10 text-[#0057FF] flex items-center justify-center text-xs mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer com dica */}
              {pointCount >= 3 && (
                <div className="px-4 py-2 bg-green-50 border-t border-green-100 rounded-b-2xl">
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <span className="text-base">✅</span>
                    <span>Pronto! Você pode finalizar o desenho agora.</span>
                  </div>
                </div>
              )}

              {/* Auto-minimização aviso */}
              {pointCount === 3 && !hasAutoMinimized && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-2 bg-blue-50 border-t border-blue-100"
                >
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <span className="text-base">💡</span>
                    <span>Este card será minimizado automaticamente...</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/**
 * 🎯 Card de Atalhos de Teclado (Opcional)
 * 
 * Exibe atalhos disponíveis durante o desenho
 */
interface KeyboardShortcutsCardProps {
  isVisible: boolean;
}

export function KeyboardShortcutsCard({ isVisible }: KeyboardShortcutsCardProps) {
  if (!isVisible) return null;

  const shortcuts = [
    { key: 'Enter', action: 'Finalizar desenho' },
    { key: 'Esc', action: 'Cancelar desenho' },
    { key: 'Click', action: 'Adicionar ponto' },
    { key: 'Click no ponto', action: 'Remover ponto' },
    { key: 'Arraste', action: 'Mover mapa' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-4 left-4 z-[900]"
      style={{ pointerEvents: 'none' }}
    >
      <div className="bg-gray-900/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl">
        <div className="text-xs text-gray-300 mb-2">⌨️ Atalhos</div>
        <div className="space-y-1.5">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="flex items-center gap-3 text-xs">
              <kbd className="px-2 py-1 bg-gray-800 text-white rounded border border-gray-700 min-w-[60px] text-center">
                {shortcut.key}
              </kbd>
              <span className="text-gray-300">{shortcut.action}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * 🎨 Mini Tooltip (aparece ao passar o mouse sobre o ícone minimizado)
 */
export function DrawingTooltip({ 
  pointCount, 
  isVisible 
}: { 
  pointCount: number; 
  isVisible: boolean;
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute top-full mt-2 left-0 z-[950]"
      style={{ pointerEvents: 'none' }}
    >
      <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
        💡 {pointCount} {pointCount === 1 ? 'ponto' : 'pontos'} • 
        Clique em qualquer ponto para remover • 
        Enter finaliza • Esc cancela
        
        {/* Seta apontando para cima */}
        <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-900" />
      </div>
    </motion.div>
  );
}
