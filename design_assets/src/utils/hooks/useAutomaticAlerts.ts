/**
 * 🚨 SISTEMA DE ALERTAS AUTOMÁTICOS - SOLOFORTE
 * 
 * Integra com NotificationCenter para disparar alertas baseados em:
 * - Condições climáticas críticas
 * - Ocorrências não resolvidas
 * - Check-ins vencidos
 * - Tarefas pendentes
 * - Relatórios prontos
 */

import { useEffect, useCallback, useState } from 'react';
import { useNotifications } from './useNotifications';
import { fetchWithAuth, createClient } from '../supabase/client';
import { logger } from '../logger';

interface WeatherAlert {
  type: 'rain' | 'frost' | 'hail' | 'wind' | 'temperature';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: string;
  timestamp: number;
}

interface OccurrenceAlert {
  id: string;
  type: string;
  severity: number;
  description: string;
  location: string;
  daysOpen: number;
  isUrgent: boolean;
}

export function useAutomaticAlerts() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    notifyClima,
    notifyOcorrencia,
    notifyTarefa,
    notifyCheckin,
    notifyRelatorio,
  } = useNotifications();

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    // Escutar mudanças de autenticação
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ===================================
  // ALERTAS DE CLIMA
  // ===================================

  const checkWeatherAlerts = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Buscar dados de clima da API
      const data = await fetchWithAuth('/climate/alerts');
      
      // Se não teve sucesso ou não há alertas, retornar silenciosamente
      if (!data?.success) return;
      
      const alerts = Array.isArray(data?.alerts) ? data.alerts : [];
      
      for (const alert of alerts) {
        const { type, severity, message, location } = alert as WeatherAlert;
        
        // Definir prioridade baseada na severidade
        const priority = 
          severity === 'critical' ? 'urgent' :
          severity === 'high' ? 'high' :
          severity === 'medium' ? 'normal' : 'low';

        // Emojis por tipo de alerta
        const emoji = {
          rain: '🌧️',
          frost: '❄️', 
          hail: '⛄',
          wind: '💨',
          temperature: '🌡️'
        }[type] || '⚠️';

        await notifyClima(
          `${emoji} Alerta de ${type === 'rain' ? 'Chuva' : type === 'frost' ? 'Geada' : type === 'hail' ? 'Granizo' : type === 'wind' ? 'Vento' : 'Temperatura'}`,
          `${message} em ${location}`,
          { type, severity, location }
        );

        logger.info('Alerta climático enviado:', { type, severity, location });
      }
    } catch (error) {
      // Silenciar erros se não estiver autenticado
      if (isAuthenticated) {
        logger.error('Erro ao verificar alertas climáticos:', error);
      }
    }
  }, [isAuthenticated, notifyClima]);

  // ===================================
  // ALERTAS DE OCORRÊNCIAS
  // ===================================

  const checkOccurrenceAlerts = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Buscar ocorrências em aberto há muito tempo
      const data = await fetchWithAuth('/occurrences/pending');
      
      // Se não teve sucesso, retornar silenciosamente
      if (!data?.success) return;
      
      const occurrences = Array.isArray(data?.occurrences) ? data.occurrences : [];
      
      for (const occ of occurrences) {
        const { id, type, severity, description, location, daysOpen } = occ as OccurrenceAlert;
        
        // Alertar se:
        // - Severidade alta (>70%) e aberta há mais de 3 dias
        // - Severidade crítica (>90%) e aberta há mais de 1 dia
        const shouldAlert = 
          (severity >= 90 && daysOpen >= 1) ||
          (severity >= 70 && daysOpen >= 3) ||
          (severity >= 50 && daysOpen >= 7);

        if (shouldAlert) {
          await notifyOcorrencia(
            `⚠️ Ocorrência Pendente - ${type}`,
            `${description} em ${location}. Aberta há ${daysOpen} dias. Severidade: ${severity}%`,
            severity,
            { occurrenceId: id, type, location, daysOpen }
          );

          logger.info('Alerta de ocorrência enviado:', { id, type, severity, daysOpen });
        }
      }
    } catch (error) {
      // Silenciar erros se não estiver autenticado
      if (isAuthenticated) {
        logger.error('Erro ao verificar alertas de ocorrências:', error);
      }
    }
  }, [isAuthenticated, notifyOcorrencia]);

  // ===================================
  // ALERTAS DE CHECK-IN/CHECK-OUT
  // ===================================

  const checkCheckinAlerts = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Buscar check-ins vencidos ou pendentes
      const data = await fetchWithAuth('/checkins/overdue');
      
      // Se não teve sucesso, retornar silenciosamente
      if (!data?.success) return;
      
      const overdueCheckins = Array.isArray(data?.overdueCheckins) ? data.overdueCheckins : [];
      
      for (const checkin of overdueCheckins) {
        const { farmName, daysOverdue, type } = checkin;
        
        await notifyCheckin(
          `📍 Check-in Vencido - ${farmName}`,
          `${type} vencido há ${daysOverdue} dias. Agende uma visita.`,
          { farmName, daysOverdue, type }
        );

        logger.info('Alerta de check-in enviado:', { farmName, daysOverdue });
      }
    } catch (error) {
      // Silenciar erros se não estiver autenticado
      if (isAuthenticated) {
        logger.error('Erro ao verificar alertas de check-in:', error);
      }
    }
  }, [isAuthenticated, notifyCheckin]);

  // ===================================
  // ALERTAS DE TAREFAS
  // ===================================

  const checkTaskAlerts = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Buscar tarefas vencidas ou próximas do vencimento
      const data = await fetchWithAuth('/tasks/due');
      
      // Se não teve sucesso, retornar silenciosamente
      if (!data?.success) return;
      
      const dueTasks = Array.isArray(data?.dueTasks) ? data.dueTasks : [];
      
      for (const task of dueTasks) {
        const { title, dueDate, isOverdue, farmName } = task;
        
        if (isOverdue) {
          await notifyTarefa(
            `⏰ Tarefa Vencida - ${title}`,
            `Venceu em ${new Date(dueDate).toLocaleDateString('pt-BR')} em ${farmName}`,
            { taskId: task.id, farmName, dueDate, isOverdue }
          );
        } else {
          await notifyTarefa(
            `⚠️ Tarefa Próxima do Vencimento - ${title}`,
            `Vence em ${new Date(dueDate).toLocaleDateString('pt-BR')} em ${farmName}`,
            { taskId: task.id, farmName, dueDate, isOverdue }
          );
        }

        logger.info('Alerta de tarefa enviado:', { title, isOverdue });
      }
    } catch (error) {
      // Silenciar erros se não estiver autenticado
      if (isAuthenticated) {
        logger.error('Erro ao verificar alertas de tarefas:', error);
      }
    }
  }, [isAuthenticated, notifyTarefa]);

  // ===================================
  // ALERTAS DE RELATÓRIOS
  // ===================================

  const checkReportAlerts = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      // Buscar relatórios processados e prontos
      const data = await fetchWithAuth('/reports/ready');
      
      // Se não teve sucesso, retornar silenciosamente
      if (!data?.success) return;
      
      const readyReports = Array.isArray(data?.readyReports) ? data.readyReports : [];
      
      for (const report of readyReports) {
        const { title, type, farmName, generatedAt } = report;
        
        await notifyRelatorio(
          `📊 Relatório Pronto - ${title}`,
          `${type} de ${farmName} gerado em ${new Date(generatedAt).toLocaleDateString('pt-BR')}`,
          { reportId: report.id, type, farmName, generatedAt }
        );

        logger.info('Alerta de relatório enviado:', { title, type });
      }
    } catch (error) {
      // Silenciar erros se não estiver autenticado
      if (isAuthenticated) {
        logger.error('Erro ao verificar alertas de relatórios:', error);
      }
    }
  }, [isAuthenticated, notifyRelatorio]);

  // ===================================
  // VERIFICAÇÃO PERIÓDICA
  // ===================================

  const runAllChecks = useCallback(async () => {
    // Não executar se não estiver autenticado
    if (!isAuthenticated) {
      logger.info('Usuário não autenticado - pulando verificação de alertas');
      return;
    }
    
    logger.info('Executando verificação de alertas automáticos...');
    
    await Promise.allSettled([
      checkWeatherAlerts(),
      checkOccurrenceAlerts(), 
      checkCheckinAlerts(),
      checkTaskAlerts(),
      checkReportAlerts(),
    ]);
    
    logger.info('Verificação de alertas concluída');
  }, [
    isAuthenticated,
    checkWeatherAlerts,
    checkOccurrenceAlerts,
    checkCheckinAlerts,
    checkTaskAlerts,
    checkReportAlerts,
  ]);

  // ===================================
  // SETUP DOS INTERVALS
  // ===================================

  useEffect(() => {
    // Só executar se estiver autenticado
    if (!isAuthenticated) return;
    
    // Executar imediatamente
    runAllChecks();

    // Verificar alertas a cada 5 minutos
    const alertInterval = setInterval(runAllChecks, 5 * 60 * 1000);

    // Verificar clima a cada 15 minutos (mais crítico)
    const weatherInterval = setInterval(() => {
      if (isAuthenticated) checkWeatherAlerts();
    }, 15 * 60 * 1000);

    // Verificar ocorrências a cada 30 minutos
    const occurrenceInterval = setInterval(() => {
      if (isAuthenticated) checkOccurrenceAlerts();
    }, 30 * 60 * 1000);

    return () => {
      clearInterval(alertInterval);
      clearInterval(weatherInterval);
      clearInterval(occurrenceInterval);
    };
  }, [isAuthenticated, runAllChecks, checkWeatherAlerts, checkOccurrenceAlerts]);

  // ===================================
  // ALERTAS MANUAIS (HELPERS)
  // ===================================

  const triggerWeatherAlert = useCallback(async (type: string, message: string, severity: string = 'high') => {
    const emoji = {
      rain: '🌧️',
      frost: '❄️',
      hail: '⛄',
      wind: '💨',
      temperature: '🌡️'
    }[type] || '⚠️';

    return notifyClima(
      `${emoji} Alerta Manual - ${type}`,
      message,
      { type, severity, manual: true }
    );
  }, [notifyClima]);

  const triggerOccurrenceAlert = useCallback(async (description: string, severity: number, location: string) => {
    return notifyOcorrencia(
      `⚠️ Nova Ocorrência Detectada`,
      `${description} em ${location}. Severidade: ${severity}%`,
      severity,
      { location, manual: true }
    );
  }, [notifyOcorrencia]);

  const triggerTaskAlert = useCallback(async (taskName: string, dueDate: string, farmName: string) => {
    return notifyTarefa(
      `⚠️ Lembrete de Tarefa - ${taskName}`,
      `Vence em ${dueDate} em ${farmName}`,
      { farmName, dueDate, manual: true }
    );
  }, [notifyTarefa]);

  // ===================================
  // RETORNO
  // ===================================

  return {
    // Verificações automáticas
    runAllChecks,
    checkWeatherAlerts,
    checkOccurrenceAlerts,
    checkCheckinAlerts,
    checkTaskAlerts,
    checkReportAlerts,

    // Alertas manuais
    triggerWeatherAlert,
    triggerOccurrenceAlert,
    triggerTaskAlert,
  };
}