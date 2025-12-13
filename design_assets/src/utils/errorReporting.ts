/**
 * ERROR REPORTING UTILITIES
 * Funções auxiliares para reportar erros
 */

import { logger } from './logger';

export interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  isDemoMode: boolean;
}

/**
 * Cria um relatório de erro estruturado
 */
export function createErrorReport(
  error: Error,
  errorInfo?: React.ErrorInfo
): ErrorReport {
  return {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    isDemoMode: localStorage.getItem('soloforte_demo') === 'true',
  };
}

/**
 * Envia relatório de erro para o servidor (futuro)
 */
export async function sendErrorReport(report: ErrorReport): Promise<void> {
  try {
    logger.error('📤 Sending error report:', report);
    
    // TODO: Implementar envio para servidor
    // await fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(report),
    // });
    
    logger.log('✅ Error report sent successfully');
  } catch (err) {
    logger.error('❌ Failed to send error report:', err);
  }
}

/**
 * Salva erro no localStorage para análise posterior
 */
export function saveErrorLocally(report: ErrorReport): void {
  try {
    const errors = getLocalErrors();
    errors.push(report);
    
    // Mantém apenas os últimos 10 erros
    const recentErrors = errors.slice(-10);
    
    localStorage.setItem('soloforte_errors', JSON.stringify(recentErrors));
    logger.log('💾 Error saved locally');
  } catch (err) {
    logger.error('❌ Failed to save error locally:', err);
  }
}

/**
 * Recupera erros salvos localmente
 */
export function getLocalErrors(): ErrorReport[] {
  try {
    const errors = localStorage.getItem('soloforte_errors');
    return errors ? JSON.parse(errors) : [];
  } catch {
    return [];
  }
}

/**
 * Limpa erros salvos localmente
 */
export function clearLocalErrors(): void {
  localStorage.removeItem('soloforte_errors');
  logger.log('🗑️ Local errors cleared');
}

/**
 * Handler global de erros não capturados
 */
export function setupGlobalErrorHandlers(): void {
  // Erros JavaScript não capturados
  window.addEventListener('error', (event) => {
    logger.error('🌍 Global error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });

    const report = createErrorReport(event.error || new Error(event.message));
    saveErrorLocally(report);
  });

  // Promises rejeitadas não tratadas
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('🌍 Unhandled promise rejection:', event.reason);

    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    const report = createErrorReport(error);
    saveErrorLocally(report);
  });

  logger.log('✅ Global error handlers configured');
}

/**
 * Exporta erros para download (debug)
 */
export function downloadErrorsAsJSON(): void {
  const errors = getLocalErrors();
  const json = JSON.stringify(errors, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `soloforte-errors-${Date.now()}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
  logger.log('⬇️ Errors downloaded');
}
