import { useState, useRef, useEffect, forwardRef, HTMLAttributes } from 'react';
import { LucideIcon, Check, X, LogIn, LogOut } from 'lucide-react';
import { useCheckIn } from '../utils/hooks/useCheckIn';
import { motion, AnimatePresence } from 'motion/react';
import { CompassIcon } from './CompassIcon';
import compassImage from 'figma:asset/506a7eccc802ffbf838ccd3f4cbc37844dc2743c.png';

// ===== PROPS UNIFICADAS =====
interface ExpandableCheckButtonProps extends HTMLAttributes<HTMLButtonElement> {
  // Props do MapButton original
  icon?: LucideIcon;
  label?: string;
  isActive?: boolean;
  disabled?: boolean;
  visualStyle?: 'ios' | 'microsoft';
  variant?: 'circular' | 'rounded';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'red' | 'gray';
  compassRotation?: number;
  
  // Props específicas do modo expansível
  mode?: 'static' | 'expandable-checkin'; // static = botão fixo (MapButton) | expandable = expansível
  position?: 'bottom-right' | 'bottom-left' | 'custom'; // Posição quando expansível
  onExpandChange?: (expanded: boolean) => void; // Callback quando expande/colapsa
  isExpanded?: boolean; // Controle externo do estado expandido
  onExpand?: () => void; // Callback quando expande
  onCollapse?: () => void; // Callback quando colapsa
}

export const ExpandableCheckButton = forwardRef<HTMLButtonElement, ExpandableCheckButtonProps>(
  ({ 
    icon: Icon = Check,
    label = '',
    isActive: externalIsActive,
    disabled = false,
    visualStyle = 'ios',
    variant = 'circular',
    color = 'blue',
    compassRotation = 0,
    mode = 'static',
    position = 'bottom-right',
    className = '',
    onClick,
    onExpandChange,
    isExpanded: externalIsExpanded,
    onExpand,
    onCollapse,
    ...props
  }, ref) => {
    
    // ========== MODO EXPANSÍVEL (Check-In) ==========
    if (mode === 'expandable-checkin') {
      const [internalIsExpanded, setInternalIsExpanded] = useState(false);
      const [isDragging, setIsDragging] = useState(false);
      const startX = useRef(0);
      const currentX = useRef(0);
      const buttonRef = useRef<HTMLDivElement>(null);
      
      const { isActive, checkIn, checkOut, formattedTime } = useCheckIn();

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

      // Handlers para drag/swipe
      const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        startX.current = e.touches[0].clientX;
      };

      const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        currentX.current = e.touches[0].clientX;
        const diff = currentX.current - startX.current;
        
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

      // Fechar automaticamente após check-in
      useEffect(() => {
        let timeout: NodeJS.Timeout;
        
        if (isActive && isExpanded) {
          // Fechar após 2 segundos do check-in
          timeout = setTimeout(() => {
            setIsExpanded(false);
          }, 2000);
        }
        
        return () => clearTimeout(timeout);
      }, [isActive, isExpanded]);

      const handleCheckIn = async () => {
        await checkIn();
        // Feedback visual antes de fechar
        setTimeout(() => {
          setIsExpanded(false);
        }, 1500);
      };

      const handleCheckOut = async () => {
        await checkOut();
        setIsExpanded(false);
      };

      const handleCollapse = () => {
        if (!isActive) {
          setIsExpanded(false);
        }
      };

      return (
        <div className={`fixed right-5 bottom-28 z-[60] ${className}`}>
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="collapsed"
                ref={buttonRef}
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                exit={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onClick={() => setIsExpanded(true)}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="relative">
                  {/* Badge de status - apenas quando ativo, sem pulse ring */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -left-1 z-10"
                    >
                      <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-md" />
                    </motion.div>
                  )}
                  
                  <button className={`
                    h-16 w-11 rounded-l-2xl 
                    flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    active:scale-[0.98]
                    ${isActive 
                      ? 'bg-[#FF3B30] shadow-md shadow-[#FF3B30]/30' 
                      : 'bg-[#0057FF] shadow-md shadow-[#0057FF]/30'
                    }
                    backdrop-blur-md
                    border border-white/10
                  `}>
                    <Check className="h-6 w-6 text-white opacity-90" strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ x: 300, y: 0 }}
                animate={{ x: 0, y: -80 }}
                exit={{ x: 300, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-l-3xl shadow-2xl p-3 pr-4 border-l-2 border-t-2 border-b-2 border-gray-200/30 dark:border-gray-700/30"
                style={{ minWidth: '220px' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${isActive ? 'text-[#FF3B30]' : 'text-[#0057FF]'}`} strokeWidth={2} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Check-In/Out</span>
                  </div>
                  {!isActive && (
                    <button
                      onClick={handleCollapse}
                      className="h-7 w-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                    >
                      <X className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                  )}
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-emerald-700 dark:text-emerald-300 text-xs">Check-in ativo</span>
                    </div>
                    <div className="text-xl text-emerald-600 dark:text-emerald-400 font-mono">
                      {formattedTime}
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-col gap-2.5">
                  {!isActive ? (
                    <button
                      onClick={handleCheckIn}
                      className="bg-[#0057FF] text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-[#0046CC] transition-all duration-300 ease-in-out flex items-center justify-center gap-2.5 group active:scale-[0.98]"
                    >
                      <LogIn className="h-4 w-4 opacity-90 group-hover:scale-110 transition-transform" strokeWidth={2} />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">Chegada</span>
                        <span className="text-[10px] opacity-80">Iniciar check-in</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckOut}
                      className="bg-[#FF3B30] text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-[#E5342A] transition-all duration-300 ease-in-out flex items-center justify-center gap-2.5 group active:scale-[0.98]"
                    >
                      <LogOut className="h-4 w-4 opacity-90 group-hover:scale-110 transition-transform" strokeWidth={2} />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">Saída</span>
                        <span className="text-[10px] opacity-80">Finalizar check-out</span>
                      </div>
                    </button>
                  )}
                </div>

                <div className="mt-2 text-[10px] text-gray-500 dark:text-gray-400 text-center">
                  {!isActive ? '👉 Arraste ou clique fora' : '⏱️ Timer ativo'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    
    // ========== MODO ESTÁTICO (MapButton) ==========
    // Verificar se deve usar bússola
    const useCompass = label === 'Localização' || label === 'Localizacao';
    
    // Cores temáticas
    const colorThemes = {
      blue: {
        active: 'bg-gradient-to-br from-blue-500 to-blue-600',
        shadow: 'shadow-[0_0_20px_rgba(0,87,255,0.4)]',
        glow: 'hover:shadow-[0_0_28px_rgba(0,87,255,0.5)]'
      },
      green: {
        active: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
        glow: 'hover:shadow-[0_0_28px_rgba(16,185,129,0.5)]'
      },
      purple: {
        active: 'bg-gradient-to-br from-purple-500 to-purple-600',
        shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
        glow: 'hover:shadow-[0_0_28px_rgba(168,85,247,0.5)]'
      },
      orange: {
        active: 'bg-gradient-to-br from-orange-500 to-orange-600',
        shadow: 'shadow-[0_0_20px_rgba(249,115,22,0.4)]',
        glow: 'hover:shadow-[0_0_28px_rgba(249,115,22,0.5)]'
      },
      cyan: {
        active: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
        shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]',
        glow: 'hover:shadow-[0_0_28px_rgba(6,182,212,0.5)]'
      },
      red: {
        active: 'bg-gradient-to-br from-red-500 to-red-600',
        shadow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
        glow: 'hover:shadow-[0_0_28px_rgba(239,68,68,0.5)]'
      },
      gray: {
        active: 'bg-gradient-to-br from-gray-500 to-gray-600',
        shadow: 'shadow-[0_0_20px_rgba(107,114,128,0.3)]',
        glow: 'hover:shadow-[0_0_28px_rgba(107,114,128,0.4)]'
      }
    };

    const theme = colorThemes[color];
    
    // ===== ESTILOS iOS =====
    if (visualStyle === 'ios') {
      const baseStyles = 'flex items-center justify-center transition-all duration-300';
      
      const shapeStyles = variant === 'circular' 
        ? 'h-12 w-12 rounded-full' 
        : 'h-11 w-11 rounded-2xl';
      
      const glassStyles = externalIsActive
        ? `${theme.active} ${theme.shadow} backdrop-blur-xl border-2 border-white/30`
        : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 shadow-md hover:bg-white/90 dark:hover:bg-gray-800/90';
      
      const interactionStyles = disabled
        ? 'opacity-50 cursor-not-allowed'
        : `hover:scale-105 ${externalIsActive ? '' : 'hover:border-gray-300 dark:hover:border-gray-600'} active:scale-95 cursor-pointer transform ${!externalIsActive && theme.glow}`;
      
      const iconColor = externalIsActive 
        ? 'text-white' 
        : 'text-gray-600 dark:text-gray-400';

      return (
        <button
          ref={ref}
          disabled={disabled}
          className={`${baseStyles} ${shapeStyles} ${glassStyles} ${interactionStyles} ${className}`.trim()}
          title={label}
          onClick={onClick}
          {...props}
        >
          {Icon && <Icon 
            className={`h-6 w-6 ${iconColor} transition-all duration-300 group-hover:scale-110`} 
            strokeWidth={2.5} 
          />}
        </button>
      );
    }
    
    // ===== ESTILOS MICROSOFT =====
    else {
      const baseStyles = 'flex items-center justify-center transition-all duration-200 relative';
      
      const shapeStyles = variant === 'circular' 
        ? 'h-12 w-12 rounded-xl' 
        : 'h-11 w-11 rounded-lg';
      
      const fluentStyles = externalIsActive
        ? `${theme.active} shadow-lg border-2 border-white/30`
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600';
      
      const interactionStyles = disabled
        ? 'opacity-50 cursor-not-allowed'
        : `hover:shadow-xl hover:-translate-y-0.5 cursor-pointer ${!externalIsActive && 'hover:shadow-' + color + '-200/20'}`;
      
      const iconColor = externalIsActive 
        ? 'text-white' 
        : 'text-gray-600 dark:text-gray-400';

      return (
        <button
          ref={ref}
          disabled={disabled}
          className={`${baseStyles} ${shapeStyles} ${fluentStyles} ${interactionStyles} ${className}`.trim()}
          title={label}
          onClick={onClick}
          {...props}
        >
          {useCompass ? (
            <CompassIcon className={`h-6 w-6 ${iconColor} transition-all duration-300`} rotation={compassRotation} />
          ) : (
            Icon && <Icon className={`h-5 w-5 ${iconColor} transition-colors duration-200`} strokeWidth={2} />
          )}
        </button>
      );
    }
  }
);

ExpandableCheckButton.displayName = 'ExpandableCheckButton';