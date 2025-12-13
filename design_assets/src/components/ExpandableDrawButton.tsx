import { useState, useRef, useEffect } from 'react';
import { PenTool, Hexagon, Circle, Square, Scissors, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandableDrawButtonProps {
  onSelectTool: (toolId: string, toolLabel: string) => void;
  onImportFile: (file: File) => void;
  isDrawActive?: boolean;
  currentTool?: string | null;
  onExpandChange?: (expanded: boolean) => void;
  isExpanded?: boolean; // Controle externo do estado expandido
  onExpand?: () => void; // Callback quando expande
  onCollapse?: () => void; // Callback quando colapsa
  className?: string;
}

export function ExpandableDrawButton({ 
  onSelectTool,
  onImportFile,
  isDrawActive = false,
  currentTool = null,
  onExpandChange,
  isExpanded: externalIsExpanded,
  onExpand,
  onCollapse,
  className = '' 
}: ExpandableDrawButtonProps) {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  
  // Usar controle externo se fornecido, senão usar estado interno
  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;
  const setIsExpanded = (value: boolean) => {
    if (externalIsExpanded === undefined) {
      setInternalIsExpanded(value);
    }
    if (value && onExpand) {
      onExpand();
    } else if (!value && onCollapse) {
      onCollapse();
    }
  };
  
  // Notificar quando o estado de expansão mudar
  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Handlers para drag/swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    
    // Só expande se arrastar para a esquerda (para dentro da tela)
    if (diff < -30) {
      setIsExpanded(true);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    startX.current = 0;
    currentX.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    currentX.current = e.clientX;
    const diff = currentX.current - startX.current;
    
    if (diff < -30) {
      setIsExpanded(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startX.current = 0;
    currentX.current = 0;
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Fechar ao clicar fora quando expandido
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isExpanded && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const tools = [
    { 
      id: 'polygon', 
      icon: Hexagon, 
      label: 'Polígono', 
      description: 'Desenho livre',
      onClick: () => onSelectTool('polygon', 'Polígono') 
    },
    { 
      id: 'circle', 
      icon: Circle, 
      label: 'Círculo', 
      description: 'Área circular',
      onClick: () => onSelectTool('circle', 'Círculo') 
    },
    { 
      id: 'rectangle', 
      icon: Square, 
      label: 'Retângulo', 
      description: 'Área retangular',
      onClick: () => onSelectTool('rectangle', 'Retângulo') 
    },
    { 
      id: 'scissors', 
      icon: Scissors, 
      label: 'Dividir', 
      description: 'Dividir talhão',
      onClick: () => onSelectTool('crop', 'Dividir') 
    },
    { 
      id: 'import', 
      icon: Upload, 
      label: 'Importar', 
      description: 'KML/KMZ',
      onClick: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.kml,.kmz';
        input.onchange = (e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onImportFile(files[0]);
          }
        };
        input.click();
      },
      special: true // Marca como ação especial (não é ferramenta de desenho)
    },
  ];

  return (
    <div className={`fixed right-0 bottom-56 z-[210] ${className}`}>
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Botão recolhido - grudado na lateral
          <motion.div
            key="collapsed"
            ref={buttonRef}
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            exit={{ x: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onClick={() => setIsExpanded(true)}
            className="cursor-grab active:cursor-grabbing"
          >
            <div className="relative">
              {/* Indicador de arrasto */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <div className="w-1 h-1 rounded-full bg-white/40"></div>
                <div className="w-1 h-1 rounded-full bg-white/40"></div>
                <div className="w-1 h-1 rounded-full bg-white/40"></div>
              </div>
              
              {/* Botão principal */}
              <div className={`
                h-16 w-11 rounded-l-2xl shadow-2xl
                flex items-center justify-center
                transition-all duration-300
                ${isDrawActive 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-[0_0_30px_rgba(249,115,22,0.5)]' 
                  : 'bg-gradient-to-br from-gray-600 to-gray-700 shadow-[0_0_30px_rgba(75,85,99,0.4)]'
                }
                hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]
                backdrop-blur-xl
                border-l-2 border-t-2 border-b-2 border-white/30
              `}>
                <PenTool className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>

              {/* Badge de atividade */}
              {isDrawActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg"
                >
                  ✏️
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          // Menu expandido - mostra ferramentas
          <motion.div
            key="expanded"
            ref={buttonRef}
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-l-3xl shadow-2xl p-3 pr-4 border-l-2 border-t-2 border-b-2 border-gray-200/30 dark:border-gray-700/30"
            style={{ minWidth: '160px' }}
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PenTool className="h-4 w-4 text-orange-600 dark:text-orange-400" strokeWidth={2} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Desenhar</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="h-7 w-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <span className="text-gray-500 text-xs">✕</span>
              </button>
            </div>

            {/* Botões de ferramentas */}
            <div className="flex flex-col gap-2">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                const isActive = !(tool as any).special && currentTool === tool.id;
                const isSpecial = (tool as any).special;
                
                return (
                  <div key={tool.id}>
                    {/* Separador antes de ferramentas especiais */}
                    {isSpecial && index > 0 && (
                      <div className="my-1 pt-1 border-t border-gray-200 dark:border-gray-600"></div>
                    )}
                    
                    <button
                      onClick={() => {
                        tool.onClick?.();
                        // Fechar após importar (ação única)
                        if (isSpecial) {
                          setIsExpanded(false);
                        }
                      }}
                      className={`
                        flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                        transition-all duration-300
                        ${isActive
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg'
                          : isSpecial
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                      <div className="flex flex-col items-start flex-1">
                        <span className="text-xs font-medium">{tool.label}</span>
                        <span className="text-[9px] opacity-80">{tool.description}</span>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Dica de uso */}
            <div className="mt-2 text-[10px] text-gray-500 dark:text-gray-400 text-center">
              👉 Arraste ou clique fora
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}