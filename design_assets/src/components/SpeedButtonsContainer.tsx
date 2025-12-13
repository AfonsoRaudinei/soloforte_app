import { memo, ReactNode } from 'react';

interface SpeedButtonsContainerProps {
  children: ReactNode;
  hidden?: boolean;
}

/**
 * 🎯 Container de Speed Buttons - Lateral Direita
 * 
 * Agrupa os 3 botões flutuantes laterais (Camadas, Desenhar, Check-in)
 * com alinhamento vertical centralizado e espaçamento uniforme.
 * 
 * Design:
 * - Centralização vertical: translateY(-50%)
 * - Gap uniforme: 12px
 * - Botões 64px × 64px
 * - Animações suaves
 * - Responsivo mobile
 */
export const SpeedButtonsContainer = memo(function SpeedButtonsContainer({
  children,
  hidden = false
}: SpeedButtonsContainerProps) {
  
  if (hidden) return null;

  return (
    <div 
      className="
        fixed right-4 
        bottom-28
        z-50
        flex flex-col gap-3
        transition-all duration-300 ease-in-out
      "
    >
      {children}
    </div>
  );
});