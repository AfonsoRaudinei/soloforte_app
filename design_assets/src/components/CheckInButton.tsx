/**
 * ✅ CHECK-IN BUTTON - SOLOFORTE v510
 * 
 * Botão reverso polido (✔️ Check-in / 🕓 Check-out)
 * Estilo: iOS Flat + Glass (sem speed effect)
 * Paleta: #0057FF (azul) / #FF3B30 (vermelho)
 */

import { Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckInButtonProps {
  isCheckedIn: boolean;
  isVisible: boolean;
  onClick: () => void;
  className?: string;
}

export function CheckInButton({ isCheckedIn, isVisible, onClick, className = '' }: CheckInButtonProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={onClick}
          className={`
            relative h-14 w-14 rounded-full
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            hover:scale-105 active:scale-98
            border backdrop-blur-md
            ${isCheckedIn 
              ? 'bg-[#FF3B30] border-white/10 shadow-md shadow-[#FF3B30]/30' 
              : 'bg-[#0057FF] border-white/10 shadow-md shadow-[#0057FF]/30'
            }
            ${className}
          `}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: 0,
          }}
          exit={{ 
            scale: 0.8, 
            opacity: 0,
            y: -100,
            transition: { 
              duration: 0.5,
              ease: "easeInOut"
            }
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Ícone: Check (não em visita) ou Clock (em visita) */}
          {isCheckedIn ? (
            <Clock 
              className="h-7 w-7 text-white" 
              strokeWidth={2.5}
              style={{ opacity: 0.9 }}
            />
          ) : (
            <Check 
              className="h-7 w-7 text-white" 
              strokeWidth={2.5}
              style={{ opacity: 0.9 }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}