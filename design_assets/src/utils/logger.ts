/**
 * 🔒 LOGGER CENTRALIZADO SEGURO
 * - Remove console.logs em produção automaticamente
 * - Sanitiza dados sensíveis (passwords, tokens, emails)
 * - Protege contra vazamento de informações
 */

import { isDevelopment, shouldLog } from './environment';

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

interface LoggerOptions {
  prefix?: string;
  timestamp?: boolean;
}

class Logger {
  private options: LoggerOptions;
  
  // Lista de campos sensíveis que devem ser sanitizados
  private SENSITIVE_KEYS = [
    'password', 'senha', 'token', 'access_token', 'refresh_token',
    'email', 'cpf', 'cnpj', 'phone', 'telefone', 'session',
    'api_key', 'apikey', 'secret', 'credential', 'authorization',
    'bearer', 'jwt', 'key', 'private'
  ];

  constructor(options: LoggerOptions = {}) {
    this.options = {
      timestamp: true,
      ...options
    };
  }

  /**
   * Sanitiza dados sensíveis recursivamente
   */
  private sanitize(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    // Arrays
    if (Array.isArray(data)) {
      return data.map(item => this.sanitize(item));
    }

    // Objetos
    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      // Verificar se a chave é sensível
      const isSensitive = this.SENSITIVE_KEYS.some(
        sensitiveKey => key.toLowerCase().includes(sensitiveKey)
      );

      if (isSensitive) {
        // Redact campo sensível
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        // Recursão para objetos aninhados
        sanitized[key] = this.sanitize(value);
      } else {
        // Valor normal
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  private format(level: LogLevel, args: any[]): any[] {
    const parts: any[] = [];

    // Timestamp
    if (this.options.timestamp) {
      const time = new Date().toLocaleTimeString('pt-BR');
      parts.push(`[${time}]`);
    }

    // Prefix customizado
    if (this.options.prefix) {
      parts.push(`[${this.options.prefix}]`);
    }

    // Level
    parts.push(`[${level.toUpperCase()}]`);

    // Sanitizar argumentos
    const sanitizedArgs = args.map(arg => this.sanitize(arg));

    return [...parts, ...sanitizedArgs];
  }

  /**
   * Log normal - apenas em desenvolvimento
   */
  log(...args: any[]): void {
    if (shouldLog('log')) {
      console.log(...this.format('log', args));
    }
  }

  /**
   * Info - apenas em desenvolvimento
   */
  info(...args: any[]): void {
    if (shouldLog('info')) {
      console.info(...this.format('info', args));
    }
  }

  /**
   * Warning - sempre exibe
   */
  warn(...args: any[]): void {
    if (shouldLog('warn')) {
      console.warn(...this.format('warn', args));
    }
  }

  /**
   * Error - sempre exibe
   */
  error(...args: any[]): void {
    if (shouldLog('error')) {
      console.error(...this.format('error', args));
    }
  }

  /**
   * Debug - apenas em desenvolvimento
   */
  debug(...args: any[]): void {
    if (shouldLog('debug')) {
      console.debug(...this.format('debug', args));
    }
  }

  /**
   * Group - agrupar logs relacionados
   */
  group(label: string, callback: () => void): void {
    if (isDevelopment()) {
      console.group(label);
      callback();
      console.groupEnd();
    }
  }

  /**
   * Table - exibir dados em tabela
   */
  table(data: any): void {
    if (isDevelopment()) {
      console.table(data);
    }
  }

  /**
   * Time - medir performance
   */
  time(label: string): void {
    if (isDevelopment()) {
      console.time(label);
    }
  }

  timeEnd(label: string): void {
    if (isDevelopment()) {
      console.timeEnd(label);
    }
  }
}

// ============================================
// INSTÂNCIAS PRÉ-CONFIGURADAS
// ============================================

/**
 * Logger geral do sistema
 */
export const logger = new Logger();

/**
 * Logger específico para autenticação
 */
export const authLogger = new Logger({ prefix: 'AUTH' });

/**
 * Logger específico para API
 */
export const apiLogger = new Logger({ prefix: 'API' });

/**
 * Logger específico para mapa
 */
export const mapLogger = new Logger({ prefix: 'MAP' });

/**
 * Logger específico para NDVI
 */
export const ndviLogger = new Logger({ prefix: 'NDVI' });

// ============================================
// EXEMPLOS DE USO
// ============================================

/*
// Substituir:
console.log('Polígono salvo:', polygon);
// Por:
logger.log('Polígono salvo:', polygon);

// Substituir:
console.log('Usuário autenticado:', user);
// Por:
authLogger.log('Usuário autenticado:', user);

// Erros sempre são exibidos:
logger.error('Erro ao salvar:', error);

// Agrupar logs relacionados:
logger.group('Carregamento de Polígonos', () => {
  logger.log('Iniciando carregamento...');
  logger.log('Polígonos carregados:', count);
  logger.log('Tempo total:', time);
});

// Medir performance:
logger.time('Cálculo de NDVI');
// ... código ...
logger.timeEnd('Cálculo de NDVI');

// Tabela:
logger.table(polygons);
*/

export default logger;
