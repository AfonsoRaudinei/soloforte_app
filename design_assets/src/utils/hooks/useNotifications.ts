/**
 * 🔔 HOOK DE NOTIFICAÇÕES - SOLOFORTE
 * 
 * Sistema completo de notificações push com:
 * - Web Notifications API
 * - Badge counter
 * - Histórico persistente
 * - Categorização por tipo
 * - Sons e vibração
 * 
 * Expansível para mobile com Capacitor Local Notifications
 */

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';
import { logger } from '../logger';
import { toast } from 'sonner@2.0.3';

// ===================================
// TIPOS
// ===================================

export type NotificationType = 
  | 'clima'        // Alertas de clima
  | 'ocorrencia'   // Ocorrências críticas
  | 'tarefa'       // Tarefas pendentes
  | 'checkin'      // Check-ins vencidos
  | 'relatorio'    // Relatórios prontos
  | 'sistema'      // Atualizações do sistema
  | 'geral';       // Notificações gerais

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string;
  icon?: string;
  image?: string;
  data?: Record<string, any>;
  timestamp: number;
  read: boolean;
  actionUrl?: string; // Rota para navegar ao clicar
}

export interface NotificationPreferences {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  badge: boolean;
  types: {
    clima: boolean;
    ocorrencia: boolean;
    tarefa: boolean;
    checkin: boolean;
    relatorio: boolean;
    sistema: boolean;
    geral: boolean;
  };
}

// ===================================
// CONSTANTES
// ===================================

const NOTIFICATION_STORAGE_KEY = 'soloforte_notifications';
const PREFERENCES_STORAGE_KEY = 'soloforte_notification_preferences';
const MAX_NOTIFICATIONS = 100; // Máximo de notificações no histórico

const DEFAULT_PREFERENCES: NotificationPreferences = {
  enabled: true,
  sound: true,
  vibration: true,
  badge: true,
  types: {
    clima: true,
    ocorrencia: true,
    tarefa: true,
    checkin: true,
    relatorio: true,
    sistema: true,
    geral: true,
  },
};

// Ícones por tipo
const NOTIFICATION_ICONS: Record<NotificationType, string> = {
  clima: '☁️',
  ocorrencia: '⚠️',
  tarefa: '✅',
  checkin: '📍',
  relatorio: '📊',
  sistema: '🔔',
  geral: '💬',
};

// ===================================
// HOOK
// ===================================

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [unreadCount, setUnreadCount] = useState(0);

  // ===================================
  // INICIALIZAÇÃO
  // ===================================

  useEffect(() => {
    loadNotifications();
    loadPreferences();
    checkPermission();
  }, []);

  // Atualizar contador de não lidas
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
    
    // Atualizar badge do navegador (se suportado)
    if (preferences.badge && 'setAppBadge' in navigator) {
      if (count > 0) {
        (navigator as any).setAppBadge(count).catch(() => {});
      } else {
        (navigator as any).clearAppBadge().catch(() => {});
      }
    }
  }, [notifications, preferences.badge]);

  // ===================================
  // CARREGAR/SALVAR
  // ===================================

  const loadNotifications = useCallback(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Notification[];
        setNotifications(parsed);
      }
    } catch (error) {
      logger.error('Erro ao carregar notificações:', error);
    }
  }, []);

  const saveNotifications = useCallback((newNotifications: Notification[]) => {
    try {
      // Limitar a MAX_NOTIFICATIONS mais recentes
      const limited = newNotifications.slice(0, MAX_NOTIFICATIONS);
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(limited));
      setNotifications(limited);
    } catch (error) {
      logger.error('Erro ao salvar notificações:', error);
    }
  }, []);

  const loadPreferences = useCallback(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as NotificationPreferences;
        setPreferences(parsed);
      }
    } catch (error) {
      logger.error('Erro ao carregar preferências:', error);
    }
  }, []);

  const savePreferences = useCallback((newPreferences: NotificationPreferences) => {
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      logger.error('Erro ao salvar preferências:', error);
    }
  }, []);

  // ===================================
  // PERMISSÕES
  // ===================================

  const checkPermission = useCallback(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      toast.error('Notificações não suportadas neste navegador');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        toast.success('Notificações ativadas! 🔔');
        return true;
      } else if (result === 'denied') {
        toast.error('Permissão de notificações negada');
        return false;
      }
      return false;
    } catch (error) {
      logger.error('Erro ao solicitar permissão:', error);
      toast.error('Erro ao ativar notificações');
      return false;
    }
  }, []);

  // ===================================
  // CRIAR NOTIFICAÇÃO
  // ===================================

  const createNotification = useCallback(async ({
    type = 'geral',
    priority = 'normal',
    title,
    body,
    icon,
    image,
    data,
    actionUrl,
    silent = false,
  }: {
    type?: NotificationType;
    priority?: NotificationPriority;
    title: string;
    body: string;
    icon?: string;
    image?: string;
    data?: Record<string, any>;
    actionUrl?: string;
    silent?: boolean;
  }): Promise<Notification | null> => {
    
    // Verificar se está habilitado nas preferências
    if (!preferences.enabled || !preferences.types[type]) {
      logger.info(`Notificação ignorada (desabilitada): ${type}`);
      return null;
    }

    // Criar objeto de notificação
    const notification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      priority,
      title,
      body,
      icon: icon || NOTIFICATION_ICONS[type],
      image,
      data,
      timestamp: Date.now(),
      read: false,
      actionUrl,
    };

    // Adicionar ao histórico
    const updated = [notification, ...notifications];
    saveNotifications(updated);

    // Mostrar notificação nativa do navegador
    if (permission === 'granted' && !silent) {
      try {
        const nativeNotif = new Notification(title, {
          body,
          icon: icon || '/logo-192.png',
          badge: '/logo-192.png',
          image,
          tag: notification.id,
          requireInteraction: priority === 'urgent',
          silent: !preferences.sound,
          vibrate: preferences.vibration ? [200, 100, 200] : undefined,
          data: { ...data, notificationId: notification.id, actionUrl },
        });

        // Evento de clique
        nativeNotif.onclick = () => {
          window.focus();
          nativeNotif.close();
          
          // Marcar como lida
          markAsRead(notification.id);
          
          // Navegar se houver URL de ação
          if (actionUrl) {
            // Disparar evento customizado para navegação
            window.dispatchEvent(new CustomEvent('notification-click', { 
              detail: { url: actionUrl, notification } 
            }));
          }
        };
      } catch (error) {
        logger.error('Erro ao mostrar notificação nativa:', error);
      }
    }

    // Toast visual (sempre mostrar)
    if (!silent) {
      const emoji = NOTIFICATION_ICONS[type];
      const toastOptions: any = {
        duration: priority === 'urgent' ? 10000 : 5000,
      };

      if (priority === 'urgent' || priority === 'high') {
        toast.error(`${emoji} ${title}`, toastOptions);
      } else {
        toast.info(`${emoji} ${title}`, toastOptions);
      }
    }

    logger.info('Notificação criada:', notification);
    return notification;
  }, [notifications, preferences, permission, saveNotifications]);

  // ===================================
  // AÇÕES
  // ===================================

  const markAsRead = useCallback((id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  }, [notifications, saveNotifications]);

  const markAllAsRead = useCallback(() => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
    toast.success('Todas as notificações marcadas como lidas');
  }, [notifications, saveNotifications]);

  const deleteNotification = useCallback((id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    saveNotifications(updated);
  }, [notifications, saveNotifications]);

  const clearAll = useCallback(() => {
    saveNotifications([]);
    toast.success('Notificações limpas');
  }, [saveNotifications]);

  const updatePreferences = useCallback((updates: Partial<NotificationPreferences>) => {
    const updated = { ...preferences, ...updates };
    savePreferences(updated);
  }, [preferences, savePreferences]);

  // ===================================
  // HELPERS
  // ===================================

  const getUnreadByType = useCallback((type: NotificationType): number => {
    return notifications.filter(n => n.type === type && !n.read).length;
  }, [notifications]);

  const getByType = useCallback((type: NotificationType): Notification[] => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  // ===================================
  // ATALHOS PARA TIPOS ESPECÍFICOS
  // ===================================

  const notifyClima = useCallback((title: string, body: string, data?: any) => {
    return createNotification({
      type: 'clima',
      priority: 'high',
      title,
      body,
      data,
      actionUrl: '/clima',
    });
  }, [createNotification]);

  const notifyOcorrencia = useCallback((title: string, body: string, severity: number, data?: any) => {
    const priority: NotificationPriority = 
      severity >= 80 ? 'urgent' :
      severity >= 50 ? 'high' :
      severity >= 30 ? 'normal' : 'low';

    return createNotification({
      type: 'ocorrencia',
      priority,
      title,
      body,
      data,
      actionUrl: '/relatorios',
    });
  }, [createNotification]);

  const notifyTarefa = useCallback((title: string, body: string, data?: any) => {
    return createNotification({
      type: 'tarefa',
      priority: 'normal',
      title,
      body,
      data,
    });
  }, [createNotification]);

  const notifyCheckin = useCallback((title: string, body: string, data?: any) => {
    return createNotification({
      type: 'checkin',
      priority: 'normal',
      title,
      body,
      data,
      actionUrl: '/checkin',
    });
  }, [createNotification]);

  const notifyRelatorio = useCallback((title: string, body: string, data?: any) => {
    return createNotification({
      type: 'relatorio',
      priority: 'low',
      title,
      body,
      data,
      actionUrl: '/relatorios',
    });
  }, [createNotification]);

  // ===================================
  // RETORNO
  // ===================================

  return {
    // Estado
    notifications,
    unreadCount,
    permission,
    preferences,

    // Ações gerais
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    requestPermission,
    updatePreferences,

    // Helpers
    getUnreadByType,
    getByType,

    // Atalhos por tipo
    notifyClima,
    notifyOcorrencia,
    notifyTarefa,
    notifyCheckin,
    notifyRelatorio,
  };
}
