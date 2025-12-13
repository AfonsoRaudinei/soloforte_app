import { Settings, FileText, CloudRain, Megaphone, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { memo, useEffect, useState } from 'react';

interface SecondaryMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
  onFABStateChange?: (hidden: boolean) => void;
}

const SecondaryMenu = memo(function SecondaryMenu({ 
  isOpen, 
  onClose, 
  onNavigate,
  onOpenNotifications,
  unreadCount = 0,
  onFABStateChange
}: SecondaryMenuProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  
  // Notificar parent quando menu abre/fecha para controlar FAB
  useEffect(() => {
    if (onFABStateChange) {
      onFABStateChange(isOpen);
    }
  }, [isOpen, onFABStateChange]);
  
  const menuItems = [
    {
      icon: Settings,
      label: 'Configurações',
      description: 'Preferências e ajustes do app',
      route: '/configuracoes',
      gradient: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-50'
    },
    {
      icon: FileText,
      label: 'Relatórios',
      description: 'Visualizar e criar relatórios',
      route: '/relatorios',
      gradient: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: CloudRain,
      label: 'Clima Detalhado',
      description: 'Previsões e radar meteorológico',
      route: '/clima',
      gradient: 'from-sky-500 to-blue-600',
      bgColor: 'bg-sky-50'
    },
    {
      icon: Megaphone,
      label: 'Publicação',
      description: 'Campanhas, fotos e análises georreferenciadas',
      route: '/marketing',
      gradient: 'from-[#0057FF] to-[#0041CC]',
      bgColor: 'bg-blue-50'
    }
  ];

  const handleItemClick = (item: any) => {
    if (item.action === 'notifications') {
      onOpenNotifications?.();
    } else if (item.route) {
      onNavigate(item.route);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop Premium com Blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[190] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}
      
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="bottom" 
          className="h-[85vh] rounded-t-[32px] z-[200] border-0 shadow-2xl bg-white/95 backdrop-blur-xl p-0 overflow-hidden"
        >
          {/* Accessibility Headers - Hidden but required */}
          <SheetHeader className="sr-only">
            <SheetTitle>Mais Opções</SheetTitle>
            <SheetDescription>
              Menu com opções adicionais: Configurações, Relatórios, Clima e Publicação
            </SheetDescription>
          </SheetHeader>

          {/* Handle Bar */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-4 mb-4 opacity-60" />

          {/* Menu Items com Scroll Suave */}
          <ScrollArea className="h-[calc(85vh-48px)] px-4">
            <div className="space-y-3 py-4 pb-32 pb-safe">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="w-full group relative overflow-hidden"
                  style={{
                    animation: isOpen ? `slideInUp 0.4s ease-out ${index * 0.05}s both` : 'none'
                  }}
                >
                  {/* Card Premium */}
                  <div className={`
                    relative flex items-center gap-4 p-4 rounded-2xl
                    transition-all duration-300 ease-out
                    ${activeItem === index 
                      ? 'bg-white shadow-xl scale-[1.02] -translate-y-1' 
                      : 'bg-white/60 shadow-md hover:shadow-lg'
                    }
                  `}>
                    {/* Ícone com Gradiente */}
                    <div className={`
                      relative flex-shrink-0 w-14 h-14 rounded-2xl
                      bg-gradient-to-br ${item.gradient}
                      flex items-center justify-center
                      shadow-lg
                      transition-all duration-300
                      ${activeItem === index ? 'scale-110 rotate-3' : 'scale-100'}
                    `}>
                      <item.icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                      
                      {/* Badge de Notificação */}
                      {item.showBadge && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg ring-2 ring-white animate-pulse">
                          {item.badgeCount > 9 ? '9+' : item.badgeCount}
                        </div>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className={`
                        font-semibold text-gray-900 truncate
                        transition-colors duration-200
                        ${activeItem === index ? 'text-[#0057FF]' : ''}
                      `}>
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Ícone Chevron */}
                    <ChevronRight 
                      className={`
                        h-5 w-5 text-gray-400 flex-shrink-0
                        transition-all duration-300
                        ${activeItem === index ? 'translate-x-1 text-[#0057FF]' : ''}
                      `}
                    />

                    {/* Ripple Effect Background */}
                    <div className={`
                      absolute inset-0 rounded-2xl
                      bg-gradient-to-br ${item.gradient}
                      opacity-0 transition-opacity duration-300
                      ${activeItem === index ? 'opacity-5' : ''}
                    `} />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
});

export default SecondaryMenu;