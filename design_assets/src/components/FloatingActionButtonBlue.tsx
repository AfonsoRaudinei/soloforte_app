import { memo } from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonBlueProps {
  onClick: () => void;
  isExpanded: boolean;
}

/**
 * 🔵 FAB Azul Original - SoloForte
 * 
 * Botão de ação flutuante fixo no canto inferior direito.
 * Abre o Speed Dial com opções principais.
 * 
 * Design:
 * - Cor: #0057FF (azul SoloForte)
 * - Tamanho: 64px × 64px
 * - Ícone: Plus (rotaciona 45° quando expandido)
 * - Posição: Canto inferior direito
 */
export const FloatingActionButtonBlue = memo(function FloatingActionButtonBlue({
  onClick,
  isExpanded
}: FloatingActionButtonBlueProps) {
  
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        z-[999]
        flex items-center justify-center
        w-16 h-16 rounded-full
        bg-[#0057FF]
        shadow-[0_6px_18px_rgba(0,87,255,0.4)]
        transition-all duration-300 ease-in-out
        hover:bg-[#0046CC] hover:scale-110
        active:scale-95
      "
      aria-label="Menu de ações"
    >
      <Plus 
        className={`
          w-8 h-8 text-white
          transition-transform duration-300 ease-in-out
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}
        strokeWidth={3}
      />
    </button>
  );
});
