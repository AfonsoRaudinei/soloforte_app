/**
 * 🔔 CENTRAL DE NOTIFICAÇÕES - SOLOFORTE
 * 
 * Centro de notificações estilo iOS/Android com:
 * - Lista de notificações
 * - Marcar como lida
 * - Limpar tudo
 * - Badge counter
 * - Filtros por tipo
 * - Preferências
 */

import { useState, useEffect } from 'react';
import { 
  Bell, 
  BellOff, 
  Check, 
  CheckCheck, 
  Trash2, 
  Settings as SettingsIcon,
  Cloud,
  AlertTriangle,
  ClipboardCheck,
  MapPin,
  FileText,
  Info,
  MessageSquare,
  Filter,
  ChevronLeft
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useNotifications, NotificationType, Notification } from '../utils/hooks/useNotifications';
import { toast } from 'sonner@2.0.3';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  navigate?: (path: string) => void;
}

export default function NotificationCenter({ isOpen, onClose, navigate }: NotificationCenterProps) {
  const {
    notifications,
    unreadCount,
    permission,
    preferences,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    requestPermission,
    updatePreferences,
    getUnreadByType,
  } = useNotifications();

  const [view, setView] = useState<'list' | 'settings'>('list');
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');

  // Escutar evento de clique em notificação
  useEffect(() => {
    const handleNotificationClick = (event: any) => {
      const { url } = event.detail;
      if (url && navigate) {
        navigate(url);
        onClose();
      }
    };

    window.addEventListener('notification-click', handleNotificationClick);
    return () => window.removeEventListener('notification-click', handleNotificationClick);
  }, [navigate, onClose]);

  // ===================================
  // HELPERS
  // ===================================

  const getTypeIcon = (type: NotificationType) => {
    const iconClass = "h-4 w-4";
    switch (type) {
      case 'clima': return <Cloud className={iconClass} />;
      case 'ocorrencia': return <AlertTriangle className={iconClass} />;
      case 'tarefa': return <ClipboardCheck className={iconClass} />;
      case 'checkin': return <MapPin className={iconClass} />;
      case 'relatorio': return <FileText className={iconClass} />;
      case 'sistema': return <Info className={iconClass} />;
      case 'geral': return <MessageSquare className={iconClass} />;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'clima': return 'bg-cyan-500';
      case 'ocorrencia': return 'bg-orange-500';
      case 'tarefa': return 'bg-green-500';
      case 'checkin': return 'bg-blue-500';
      case 'relatorio': return 'bg-purple-500';
      case 'sistema': return 'bg-gray-500';
      case 'geral': return 'bg-blue-500';
    }
  };

  const getTypeName = (type: NotificationType) => {
    switch (type) {
      case 'clima': return 'Clima';
      case 'ocorrencia': return 'Ocorrências';
      case 'tarefa': return 'Tarefas';
      case 'checkin': return 'Check-in';
      case 'relatorio': return 'Relatórios';
      case 'sistema': return 'Sistema';
      case 'geral': return 'Geral';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    
    return new Date(timestamp).toLocaleDateString('pt-BR');
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.actionUrl && navigate) {
      navigate(notification.actionUrl);
      onClose();
    }
  };

  // Filtrar notificações
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  // ===================================
  // RENDERIZAÇÃO
  // ===================================

  return (
    <Sheet open={isOpen} onOpenChange={onClose} modal={false}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        {view === 'list' ? (
          <>
            {/* HEADER */}
            <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <SheetDescription className="sr-only">
                Central de notificações com alertas e mensagens do sistema
              </SheetDescription>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <SheetTitle>Notificações</SheetTitle>
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="rounded-full">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      title="Marcar todas como lidas"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('settings')}
                    title="Configurações"
                  >
                    <SettingsIcon className="h-4 w-4" />
                  </Button>
                  {/* ✅ Botão X removido - use o FAB para fechar */}
                </div>
              </div>
              <SheetDescription className="sr-only">
                Central de notificações do SoloForte com {unreadCount} notificações não lidas
              </SheetDescription>
            </SheetHeader>

            {/* FILTROS */}
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="shrink-0"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Todas
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
                
                {(['clima', 'ocorrencia', 'tarefa', 'checkin', 'relatorio'] as NotificationType[]).map(type => {
                  const count = getUnreadByType(type);
                  if (count === 0 && filter !== type) return null;
                  
                  return (
                    <Button
                      key={type}
                      variant={filter === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(type)}
                      className="shrink-0"
                    >
                      {getTypeIcon(type)}
                      <span className="ml-1">{getTypeName(type)}</span>
                      {count > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {count}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* PERMISSÃO */}
            {permission !== 'granted' && (
              <div className="mx-6 mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <BellOff className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">
                      Notificações desabilitadas
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                      Ative para receber alertas importantes em tempo real
                    </p>
                    <Button
                      size="sm"
                      onClick={requestPermission}
                      className="mt-2"
                    >
                      Ativar Notificações
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* LISTA */}
            <ScrollArea className="flex-1">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <Bell className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {filter === 'all' 
                      ? 'Nenhuma notificação ainda'
                      : `Nenhuma notificação de ${getTypeName(filter).toLowerCase()}`
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`
                        p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer
                        ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}
                      `}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Ícone */}
                        <div className={`
                          h-10 w-10 rounded-full flex items-center justify-center shrink-0
                          ${getTypeColor(notification.type)} text-white
                        `}>
                          {getTypeIcon(notification.type)}
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`
                              text-sm ${!notification.read ? 'font-semibold' : 'font-medium'}
                              text-gray-900 dark:text-gray-100
                            `}>
                              {notification.icon} {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                            {notification.body}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>

                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="h-7 px-2"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="h-7 px-2"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* FOOTER */}
            {notifications.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Todas
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* CONFIGURAÇÕES */}
            <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('list')}
                    className="h-8 w-8 p-0"
                    title="Voltar para lista"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <SheetTitle>Configurações</SheetTitle>
                </div>
                {/* ✅ Botão X removido - use o FAB para fechar */}
              </div>
              <SheetDescription className="sr-only">
                Configure suas preferências de notificações e tipos de alertas
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* GERAL */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Geral</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enabled" className="flex flex-col gap-1">
                      <span>Ativar Notificações</span>
                      <span className="text-xs text-gray-500 font-normal">
                        Receber alertas automáticos
                      </span>
                    </Label>
                    <Switch
                      id="enabled"
                      checked={preferences.enabled}
                      onCheckedChange={(enabled) => updatePreferences({ enabled })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound" className="flex flex-col gap-1">
                      <span>Som</span>
                      <span className="text-xs text-gray-500 font-normal">
                        Tocar som ao receber
                      </span>
                    </Label>
                    <Switch
                      id="sound"
                      checked={preferences.sound}
                      onCheckedChange={(sound) => updatePreferences({ sound })}
                      disabled={!preferences.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="vibration" className="flex flex-col gap-1">
                      <span>Vibração</span>
                      <span className="text-xs text-gray-500 font-normal">
                        Vibrar ao receber (mobile)
                      </span>
                    </Label>
                    <Switch
                      id="vibration"
                      checked={preferences.vibration}
                      onCheckedChange={(vibration) => updatePreferences({ vibration })}
                      disabled={!preferences.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="badge" className="flex flex-col gap-1">
                      <span>Badge de Contador</span>
                      <span className="text-xs text-gray-500 font-normal">
                        Mostrar número no ícone do app
                      </span>
                    </Label>
                    <Switch
                      id="badge"
                      checked={preferences.badge}
                      onCheckedChange={(badge) => updatePreferences({ badge })}
                      disabled={!preferences.enabled}
                    />
                  </div>
                </div>

                <Separator />

                {/* TIPOS */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Tipos de Notificações</h3>
                  
                  {(['clima', 'ocorrencia', 'tarefa', 'checkin', 'relatorio', 'sistema', 'geral'] as NotificationType[]).map(type => (
                    <div key={type} className="flex items-center justify-between">
                      <Label htmlFor={`type-${type}`} className="flex items-center gap-2">
                        {getTypeIcon(type)}
                        <span>{getTypeName(type)}</span>
                      </Label>
                      <Switch
                        id={`type-${type}`}
                        checked={preferences.types[type]}
                        onCheckedChange={(enabled) => updatePreferences({
                          types: { ...preferences.types, [type]: enabled }
                        })}
                        disabled={!preferences.enabled}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}