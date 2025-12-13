import { useState, useRef, useEffect } from 'react';
import { Layers, Satellite, Leaf, CloudRain, Map, Mountain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandableLayersButtonProps {
  onStreetsClick: () => void;
  onSatelliteClick: () => void;
  onTerrainClick: () => void;
  onNDVIClick: () => void;
  onRadarClick: () => void;
  isLayersActive?: boolean;
  currentLayer?: 'streets' | 'satellite' | 'terrain' | 'ndvi' | 'radar' | null;
  onExpandChange?: (expanded: boolean) => void; // Callback quando expande/colapsa
  isExpanded?: boolean; // Controle externo do estado expandido
  onExpand?: () => void; // Callback quando expande
  onCollapse?: () => void; // Callback quando colapsa
  className?: string;
}

export function ExpandableLayersButton({ 
  onStreetsClick,
  onSatelliteClick,
  onTerrainClick,
  onNDVIClick,
  onRadarClick,
  isLayersActive = false,
  currentLayer = null,
  onExpandChange,
  isExpanded: externalIsExpanded,
  onExpand,
  onCollapse,
  className = '' 
}: ExpandableLayersButtonProps) {
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

  const layers = [
    { 
      id: 'streets', 
      icon: Map, 
      label: 'Explorar', 
      description: 'Mapa de ruas',
      onClick: onStreetsClick,
      color: 'purple'
    },
    { 
      id: 'satellite', 
      icon: Satellite, 
      label: 'Satélite', 
      description: 'Imagem aérea',
      onClick: onSatelliteClick,
      color: 'blue'
    },
    { 
      id: 'terrain', 
      icon: Mountain, 
      label: 'Relevo', 
      description: 'Topográfico',
      onClick: onTerrainClick,
      color: 'indigo'
    },
    { 
      id: 'ndvi', 
      icon: Leaf, 
      label: 'NDVI', 
      description: 'Saúde vegetal',
      onClick: onNDVIClick,
      color: 'green'
    },
    { 
      id: 'radar', 
      icon: CloudRain, 
      label: 'Radar Clima', 
      description: 'Precipitação',
      onClick: onRadarClick,
      color: 'sky'
    },
  ];

  return (
    <div className={`fixed right-0 bottom-[296px] z-[60] ${className}`}>
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
                ${isLayersActive 
                  ? 'bg-gradient-to-br from-[#0057FF] to-[#0046CC]' 
                  : 'bg-gradient-to-br from-gray-600 to-gray-700'
                }
                hover:brightness-110
                backdrop-blur-xl
                border-l-2 border-t-2 border-b-2 border-white/30
              `}>
                <Layers className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>

              {/* Badge de atividade */}
              {isLayersActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -left-1 bg-[#0057FF] text-white w-3 h-3 rounded-full shadow-lg"
                />
              )}
            </div>
          </motion.div>
        ) : (
          // Menu expandido - mostra camadas
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
                <Layers className="h-4 w-4 text-green-600 dark:text-green-400" strokeWidth={2} />
                <span className="text-sm text-gray-700 dark:text-gray-300">Camadas</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="h-7 w-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <span className="text-gray-500 text-xs">✕</span>
              </button>
            </div>

            {/* Botões de camadas */}
            <div className="flex flex-col gap-2">
              {layers.map((layer) => {
                const Icon = layer.icon;
                const isActive = currentLayer === layer.id;
                
                // Cores dinâmicas por tipo de camada
                const getColors = () => {
                  if (layer.color === 'purple') return {
                    active: 'from-purple-500 to-purple-600',
                    inactive: 'bg-gray-100 dark:bg-gray-700'
                  };
                  if (layer.color === 'blue') return {
                    active: 'from-blue-500 to-blue-600',
                    inactive: 'bg-gray-100 dark:bg-gray-700'
                  };
                  if (layer.color === 'indigo') return {
                    active: 'from-indigo-500 to-indigo-600',
                    inactive: 'bg-gray-100 dark:bg-gray-700'
                  };
                  if (layer.color === 'green') return {
                    active: 'from-green-500 to-green-600',
                    inactive: 'bg-gray-100 dark:bg-gray-700'
                  };
                  if (layer.color === 'sky') return {
                    active: 'from-sky-500 to-sky-600',
                    inactive: 'bg-gray-100 dark:bg-gray-700'
                  };
                  return {
                    active: 'from-gray-500 to-gray-600',
                    inactive: 'bg-gray-100 dark:bg-gray-700'
                  };
                };

                const colors = getColors();
                
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      layer.onClick();
                      // Opcional: fechar após selecionar
                      // setIsExpanded(false);
                    }}
                    className={`
                      flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                      transition-all duration-300
                      ${isActive
                        ? `bg-gradient-to-br ${colors.active} text-white shadow-lg`
                        : `${colors.inactive} text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600`
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    <div className="flex flex-col items-start flex-1">
                      <span className="text-xs font-medium">{layer.label}</span>
                      <span className="text-[9px] opacity-80">{layer.description}</span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                    )}
                  </button>
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