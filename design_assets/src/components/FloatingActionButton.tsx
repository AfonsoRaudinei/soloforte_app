import { memo } from 'react';
import { Plus, ArrowLeft, X } from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';
import { usePrefetchLink } from '../utils/hooks/usePrefetchLink';

interface FloatingActionButtonProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  fabExpanded?: boolean;
  onToggleFab?: () => void;
  dashboardModalOpen?: boolean;
  onCloseDashboardModal?: () => void;
  onOpenNotifications?: () => void;
  onCloseNotifications?: () => void;
  notificationCenterOpen?: boolean;
}

const FloatingActionButton = memo(function FloatingActionButton({ 
  currentRoute, 
  onNavigate,
  fabExpanded = false,
  onToggleFab,
  dashboardModalOpen = false,
  onCloseDashboardModal,
  onOpenNotifications,
  onCloseNotifications,
  notificationCenterOpen = false
}: FloatingActionButtonProps) {
  const { visualStyle } = useTheme();
  const isIOS = visualStyle === 'ios';
  
  // Verifica se está no Dashboard
  const isDashboard = currentRoute === '/dashboard';
  
  // ✅ HOOKS DEVEM SER CHAMADOS SEMPRE, ANTES DE QUALQUER RETURN
  // ✅ Prefetch do Dashboard quando estiver em outras páginas (hover/touch no botão de voltar)
  const backButtonRef = usePrefetchLink<HTMLButtonElement>({
    importFn: () => import('./Dashboard'),
    componentName: 'Dashboard',
    enabled: !isDashboard, // Só ativa quando não está no dashboard
  });
  
  // 🚫 Não mostrar FAB na página inicial "/" e "/home" (primeira página)
  if (currentRoute === '/' || currentRoute === '/home') {
    return null;
  }
  
  // ✅ Se NotificationCenter estiver aberto, mostra botão de fechar
  if (notificationCenterOpen) {
    console.log('🔵 FAB: Renderizando botão de FECHAR (NotificationCenter aberto)', {
      notificationCenterOpen,
      hasCallback: !!onCloseNotifications
    });
    
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🔵 FAB: CLIQUE no botão de fechar NotificationCenter', {
            hasCallback: !!onCloseNotifications,
            callbackType: typeof onCloseNotifications
          });
          if (onCloseNotifications) {
            onCloseNotifications();
            console.log('✅ FAB: Callback onCloseNotifications() executada com sucesso');
          } else {
            console.error('❌ FAB: onCloseNotifications não está definida!');
          }
        }}
        className={`fixed bottom-6 right-6 z-[99999] h-16 w-16 bg-[#0057FF] text-white shadow-2xl flex items-center justify-center hover:brightness-110 transition-all pointer-events-auto ${
          isIOS
            ? 'rounded-full hover:scale-110 active:scale-95' 
            : 'rounded-2xl hover:shadow-[0_12px_40px_rgba(0,87,255,0.4)]'
        }`}
        title="Fechar Notificações"
        style={{ touchAction: 'manipulation' }}
      >
        <ArrowLeft className="h-7 w-7" />
      </button>
    );
  }
  
  // Se está no Dashboard, mostra o botão "+" que abre o menu OU botão de fechar modal
  if (isDashboard) {
    // ✅ Se há modal aberto no Dashboard, mostra botão de voltar para fechar o modal
    if (dashboardModalOpen) {
      return (
        <button
          onClick={() => {
            // Enviar mensagem para Dashboard fechar todos os modais
            window.postMessage('CLOSE_DASHBOARD_MODALS', '*');
            // Também chamar callback se fornecido
            if (onCloseDashboardModal) {
              onCloseDashboardModal();
            }
          }}
          className={`fixed bottom-6 right-6 z-[9999] h-16 w-16 bg-[#0057FF] text-white shadow-2xl flex items-center justify-center hover:brightness-110 transition-all ${
            isIOS
              ? 'rounded-full hover:scale-110 active:scale-95' 
              : 'rounded-2xl hover:shadow-[0_12px_40px_rgba(0,87,255,0.4)]'
          }`}
          title="Fechar"
        >
          <X className="h-7 w-7" />
        </button>
      );
    }
    
    // ✅ Botão que transforma de + para X quando expandido
    return (
      <button
        onClick={onToggleFab}
        className={`fixed bottom-6 right-6 z-[9999] h-16 w-16 bg-[#0057FF] text-white shadow-2xl flex items-center justify-center hover:brightness-110 transition-all ${
          isIOS
            ? 'rounded-full hover:scale-110 active:scale-95' 
            : 'rounded-2xl hover:shadow-[0_12px_40px_rgba(0,87,255,0.4)]'
        } ${fabExpanded ? 'rotate-45' : ''}`}
        title={fabExpanded ? 'Fechar Menu' : 'Abrir Menu'}
      >
        {fabExpanded ? <X className="h-7 w-7" /> : <Plus className="h-7 w-7" />}
      </button>
    );
  }
  
  // Em outras telas, mostra o botão "←" que volta para o Dashboard
  return (
    <button
      ref={backButtonRef}
      onClick={() => onNavigate('/dashboard')}
      className={`fixed bottom-6 right-6 z-[9999] h-16 w-16 bg-[#0057FF] text-white shadow-2xl flex items-center justify-center hover:brightness-110 transition-all ${
        isIOS
          ? 'rounded-full hover:scale-110 active:scale-95' 
          : 'rounded-2xl hover:shadow-[0_12px_40px_rgba(0,87,255,0.4)]'
      }`}
      title="Voltar para Dashboard"
    >
      <ArrowLeft className="h-7 w-7" />
    </button>
  );
});

export default FloatingActionButton;