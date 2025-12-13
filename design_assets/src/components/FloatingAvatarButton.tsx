import { memo } from 'react';
import { User } from 'lucide-react';

interface FloatingAvatarButtonProps {
  onClick: () => void;
  userPhoto?: string | null;
}

/**
 * 👤 Botão Flutuante - Avatar
 * 
 * Posição: Canto inferior esquerdo
 * Função: Abrir perfil/configurações
 * 
 * Design:
 * - Sem base de dock
 * - Foto circular flutuante
 * - Sombra suave
 * - Position absolute
 */
export const FloatingAvatarButton = memo(function FloatingAvatarButton({
  onClick,
  userPhoto = null
}: FloatingAvatarButtonProps) {
  
  return (
    <button
      onClick={onClick}
      className="
        absolute bottom-6 left-4
        z-[999]
        flex items-center justify-center
        w-16 h-16 rounded-full
        border-2 border-white/80
        shadow-[0_3px_10px_rgba(0,0,0,0.15)]
        overflow-hidden
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]
        active:scale-95
      "
      aria-label="Perfil"
    >
      {userPhoto ? (
        <img 
          src={userPhoto} 
          alt="Perfil" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <User className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
      )}
    </button>
  );
});
