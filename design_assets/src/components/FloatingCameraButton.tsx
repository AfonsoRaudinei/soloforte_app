import { memo } from 'react';
import { Camera } from 'lucide-react';

interface FloatingCameraButtonProps {
  onClick: () => void;
}

/**
 * 📷 Botão Flutuante - Câmera
 * 
 * Posição: Centro inferior da tela
 * Função: Abrir scanner técnico / captura de campo
 * 
 * Design:
 * - Sem base de dock
 * - Gradiente azul SoloForte
 * - Centralizado com translateX(-50%)
 * - Sombra azul brilhante
 * - Position absolute
 */
export const FloatingCameraButton = memo(function FloatingCameraButton({
  onClick
}: FloatingCameraButtonProps) {
  
  return (
    <button
      onClick={onClick}
      className="
        absolute bottom-6 left-1/2 -translate-x-1/2
        z-[999]
        flex items-center justify-center
        w-16 h-16 rounded-full
        bg-gradient-to-b from-[#0057FF] to-[#0070FF]
        shadow-[0_4px_10px_rgba(0,87,255,0.25)]
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,87,255,0.35)] hover:brightness-110
        active:scale-95
      "
      aria-label="Scanner"
    >
      <Camera className="w-8 h-8 text-white drop-shadow-md" strokeWidth={2.5} />
    </button>
  );
});
