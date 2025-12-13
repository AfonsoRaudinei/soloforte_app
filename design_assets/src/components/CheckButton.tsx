import { Check } from 'lucide-react';
import { useCheckIn } from '../utils/hooks/useCheckIn';
import { toast } from 'sonner@2.0.3';
import { QuickCheckInModal } from './QuickCheckInModal';
import { useState } from 'react';

/**
 * 🎯 Botão de Check Restaurado - Iteração 12
 * 
 * Estados dinâmicos baseados em cliente + visita:
 * - Cinza inativo: sem cliente selecionado → abre busca rápida
 * - Cinza forte: cliente selecionado, pronto para chegada
 * - Azul ativo: visita em andamento
 * 
 * Paleta SoloForte iOS Flat:
 * - Inativo: #E5E7EB
 * - Pronto: #9CA3AF
 * - Ativo: #0057FF
 */

interface CheckButtonProps {
  clienteSelecionado?: string | null;
  clienteNome?: string | null;
  fazendaNome?: string | null;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
  onSelectCliente?: (clienteId: string, clienteNome: string, fazendaId?: string) => void;
  onClearCliente?: () => void;
}

export function CheckButton({ 
  clienteSelecionado = null,
  clienteNome = null,
  fazendaNome = null,
  onCheckIn,
  onCheckOut,
  onSelectCliente,
  onClearCliente
}: CheckButtonProps) {
  
  const { isActive: emVisita, checkIn, checkOut } = useCheckIn();
  const [showQuickModal, setShowQuickModal] = useState(false);

  const handleClick = async () => {
    // Estado 1: Sem cliente selecionado → ABRIR BUSCA RÁPIDA
    if (!clienteSelecionado) {
      setShowQuickModal(true);
      return;
    }

    // Estado 2: Cliente selecionado, registrar chegada
    if (!emVisita) {
      await checkIn();
      onCheckIn?.();
      toast.success('✅ Chegada registrada', {
        description: `Check-in realizado em ${clienteSelecionado}`,
        duration: 2500,
      });
    } 
    // Estado 3: Em visita, finalizar
    else {
      await checkOut();
      onCheckOut?.();
      
      // 🔧 NOVO: Limpar cliente após saída
      onClearCliente?.();
      
      toast.success('👋 Visita finalizada', {
        description: 'Check-out registrado com sucesso',
        duration: 2500,
      });
    }
  };

  const handleSelectFromModal = async (clienteId: string, clienteNome: string, fazendaId?: string) => {
    // Notificar seleção
    onSelectCliente?.(clienteId, clienteNome, fazendaId);
    
    // Check-in automático após seleção
    await checkIn();
    onCheckIn?.();
    
    toast.success('✅ Check-in realizado', {
      description: `Chegada registrada em ${clienteNome}`,
      duration: 2500,
    });
  };

  // Determinar estado visual
  const getButtonStyle = () => {
    // Sem cliente = Cinza inativo (MAS CLICÁVEL)
    if (!clienteSelecionado) {
      return {
        bg: 'bg-[#E5E7EB]',
        hover: 'hover:bg-[#D1D5DB]',
        shadow: 'shadow-md',
        cursor: 'cursor-pointer',
        opacity: 'opacity-60',
        scale: 'active:scale-[0.98]'
      };
    }

    // Em visita = Azul ativo
    if (emVisita) {
      return {
        bg: 'bg-[#0057FF]',
        hover: 'hover:bg-[#0046CC]',
        shadow: 'shadow-md shadow-[#0057FF]/30',
        cursor: 'cursor-pointer',
        opacity: '',
        scale: 'active:scale-[0.98]'
      };
    }

    // Cliente selecionado = Cinza forte (pronto)
    return {
      bg: 'bg-[#9CA3AF]',
      hover: 'hover:bg-[#6B7280]',
      shadow: 'shadow-md',
      cursor: 'cursor-pointer',
      opacity: '',
      scale: 'active:scale-[0.98]'
    };
  };

  const style = getButtonStyle();

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          w-16 h-16 rounded-2xl
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${style.bg}
          ${style.hover}
          ${style.shadow}
          ${style.cursor}
          ${style.opacity}
          ${style.scale}
          backdrop-blur-md
          border border-white/10
        `.trim()}
        title={
          !clienteSelecionado 
            ? 'Selecione um cliente primeiro' 
            : emVisita 
              ? 'Finalizar visita' 
              : 'Registrar chegada'
        }
      >
        <Check 
          className={`h-6 w-6 ${clienteSelecionado ? 'text-white' : 'text-gray-400'} transition-colors duration-300`}
          strokeWidth={2.5} 
        />
      </button>
      <QuickCheckInModal
        isOpen={showQuickModal}
        onClose={() => setShowQuickModal(false)}
        onSelectCliente={handleSelectFromModal}
        emVisita={emVisita}
        visitaAtual={
          emVisita && clienteNome && fazendaNome
            ? { clienteNome, fazendaNome }
            : null
        }
        onEncerrarVisita={async () => {
          await checkOut();
          onCheckOut?.();
          onClearCliente?.();
          toast.success('👋 Visita finalizada', {
            description: 'Check-out registrado com sucesso',
            duration: 2500,
          });
        }}
      />
    </>
  );
}