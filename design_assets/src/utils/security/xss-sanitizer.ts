/**
 * 🔒 XSS SANITIZER
 * 
 * Sanitização completa contra ataques XSS (Cross-Site Scripting)
 * 
 * PROTEÇÕES:
 * - Sanitiza HTML malicioso
 * - Remove scripts inline
 * - Valida URLs
 * - Escapa caracteres especiais
 * - Protege atributos HTML
 * 
 * @version 1.0.0
 * @date 2025-10-31
 */

import DOMPurify from 'dompurify';

// ===================================
// CONFIGURAÇÃO DOMPUTRIFY
// ===================================

/**
 * Configuração padrão estrita
 */
const DEFAULT_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [
    'b', 'i', 'em', 'strong', 'u', 'p', 'br', 'span',
    'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'code', 'pre'
  ],
  ALLOWED_ATTR: ['href', 'title', 'class', 'id', 'target'],
  ALLOW_DATA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
  SAFE_FOR_TEMPLATES: true,
  WHOLE_DOCUMENT: false,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  FORCE_BODY: false,
  SANITIZE_DOM: true,
  KEEP_CONTENT: true,
  IN_PLACE: false,
};

/**
 * Configuração ultra-restritiva (apenas texto)
 */
const TEXT_ONLY_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
  ALLOW_DATA_ATTR: false,
  KEEP_CONTENT: true,
};

/**
 * Configuração para rich text (mais permissiva)
 */
const RICH_TEXT_CONFIG: DOMPurify.Config = {
  ...DEFAULT_CONFIG,
  ALLOWED_TAGS: [
    ...DEFAULT_CONFIG.ALLOWED_TAGS!,
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'img', 'div', 'section', 'article'
  ],
  ALLOWED_ATTR: [
    ...DEFAULT_CONFIG.ALLOWED_ATTR!,
    'src', 'alt', 'width', 'height', 'style'
  ],
};

// ===================================
// SANITIZAÇÃO DE HTML
// ===================================

/**
 * Sanitizar HTML com configuração padrão
 * 
 * @param dirty - HTML potencialmente perigoso
 * @returns HTML sanitizado
 * 
 * @example
 * ```typescript
 * const userInput = '<script>alert("XSS")</script>Hello';
 * const safe = sanitizeHTML(userInput);
 * // Resultado: 'Hello'
 * ```
 */
export function sanitizeHTML(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(dirty, DEFAULT_CONFIG);
}

/**
 * Sanitizar para apenas texto (remove todas as tags)
 * 
 * @param dirty - Input potencialmente perigoso
 * @returns Texto puro sem HTML
 * 
 * @example
 * ```typescript
 * const input = '<b>Bold</b> text';
 * const safe = sanitizeText(input);
 * // Resultado: 'Bold text'
 * ```
 */
export function sanitizeText(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(dirty, TEXT_ONLY_CONFIG);
}

/**
 * Sanitizar rich text (permite mais tags)
 * 
 * @param dirty - HTML rico potencialmente perigoso
 * @returns HTML rico sanitizado
 */
export function sanitizeRichText(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(dirty, RICH_TEXT_CONFIG);
}

// ===================================
// SANITIZAÇÃO DE INPUTS
// ===================================

/**
 * Sanitizar input de usuário (formulários)
 * 
 * Remove tags HTML mas mantém o conteúdo
 * 
 * @param input - Input do usuário
 * @returns Input sanitizado
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove tags HTML mas mantém conteúdo
  let sanitized = sanitizeText(input);
  
  // Remove caracteres de controle
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Trim espaços em branco
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Sanitizar múltiplos inputs (objeto)
 * 
 * @param inputs - Objeto com inputs
 * @returns Objeto com inputs sanitizados
 * 
 * @example
 * ```typescript
 * const data = {
 *   name: '<script>alert(1)</script>João',
 *   email: 'test@example.com'
 * };
 * const safe = sanitizeInputs(data);
 * // { name: 'João', email: 'test@example.com' }
 * ```
 */
export function sanitizeInputs<T extends Record<string, any>>(inputs: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as T[keyof T];
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key as keyof T] = sanitizeInputs(value) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}

// ===================================
// VALIDAÇÃO DE URLs
// ===================================

/**
 * Lista de protocolos permitidos
 */
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

/**
 * Validar e sanitizar URL
 * 
 * @param url - URL potencialmente perigosa
 * @returns URL sanitizada ou null se inválida
 * 
 * @example
 * ```typescript
 * sanitizeURL('javascript:alert(1)'); // null
 * sanitizeURL('https://example.com'); // 'https://example.com'
 * ```
 */
export function sanitizeURL(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }
  
  try {
    const parsed = new URL(url);
    
    // Verificar protocolo permitido
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      console.warn(`Protocolo não permitido: ${parsed.protocol}`);
      return null;
    }
    
    // Prevenir javascript: e data: URLs
    if (parsed.protocol === 'javascript:' || parsed.protocol === 'data:') {
      return null;
    }
    
    return parsed.href;
    
  } catch (error) {
    // URL relativa ou inválida
    // Permitir URLs relativas se começarem com / ou #
    if (url.startsWith('/') || url.startsWith('#')) {
      return url;
    }
    
    console.warn('URL inválida:', url);
    return null;
  }
}

/**
 * Validar email
 * 
 * @param email - Email para validar
 * @returns true se válido
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===================================
// ESCAPE DE CARACTERES ESPECIAIS
// ===================================

/**
 * Escapar caracteres HTML
 * 
 * @param str - String para escapar
 * @returns String escapada
 */
export function escapeHTML(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  const escapeMap: Record<string, string> = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return str.replace(/[&<>"'/]/g, (char) => escapeMap[char]);
}

/**
 * Unescape caracteres HTML
 * 
 * @param str - String escapada
 * @returns String original
 */
export function unescapeHTML(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  const unescapeMap: Record<string, string> = {
    '&': '&',
    '<': '<',
    '>': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  };
  
  return str.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, (entity) => unescapeMap[entity]);
}

/**
 * Escapar atributos HTML
 * 
 * Mais restritivo que escapeHTML
 */
export function escapeAttribute(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#96;')
    .replace(/=/g, '&#61;');
}

// ===================================
// SANITIZAÇÃO DE DADOS DO BANCO
// ===================================

/**
 * Sanitizar dados vindos do Supabase
 * 
 * Sanitiza todos os campos string recursivamente
 * 
 * @param data - Dados do banco
 * @returns Dados sanitizados
 */
export function sanitizeDatabaseData<T>(data: T): T {
  if (!data) {
    return data;
  }
  
  // Array
  if (Array.isArray(data)) {
    return data.map(item => sanitizeDatabaseData(item)) as T;
  }
  
  // Objeto
  if (typeof data === 'object') {
    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Sanitizar strings
        sanitized[key] = sanitizeHTML(value);
      } else if (typeof value === 'object' && value !== null) {
        // Recursão para objetos aninhados
        sanitized[key] = sanitizeDatabaseData(value);
      } else {
        // Outros tipos (números, booleanos, null)
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
  
  return data;
}

// ===================================
// VALIDAÇÕES ESPECÍFICAS
// ===================================

/**
 * Validar nome (apenas letras, espaços e acentos)
 */
export function sanitizeName(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }
  
  // Remove HTML
  let sanitized = sanitizeText(name);
  
  // Permite apenas letras, espaços e acentos
  sanitized = sanitized.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
  
  // Remove espaços múltiplos
  sanitized = sanitized.replace(/\s+/g, ' ');
  
  return sanitized.trim();
}

/**
 * Validar CPF/CNPJ (apenas números)
 */
export function sanitizeDocument(doc: string): string {
  if (!doc || typeof doc !== 'string') {
    return '';
  }
  
  // Remove tudo exceto números
  return doc.replace(/\D/g, '');
}

/**
 * Validar telefone (apenas números e +)
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  
  // Remove tudo exceto números, + e espaços
  let sanitized = phone.replace(/[^\d\s+()-]/g, '');
  
  // Remove espaços múltiplos
  sanitized = sanitized.replace(/\s+/g, ' ');
  
  return sanitized.trim();
}

/**
 * Validar número (apenas dígitos e ponto decimal)
 */
export function sanitizeNumber(num: string): string {
  if (!num || typeof num !== 'string') {
    return '';
  }
  
  // Remove tudo exceto números, ponto e vírgula
  let sanitized = num.replace(/[^\d.,-]/g, '');
  
  // Troca vírgula por ponto
  sanitized = sanitized.replace(',', '.');
  
  return sanitized;
}

// ===================================
// VALIDAÇÃO DE CONTEÚDO
// ===================================

/**
 * Detectar conteúdo potencialmente malicioso
 * 
 * @param content - Conteúdo para verificar
 * @returns true se suspeito
 */
export function isSuspiciousContent(content: string): boolean {
  if (!content || typeof content !== 'string') {
    return false;
  }
  
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onload=, onclick=, etc
    /data:text\/html/i,
    /<iframe/i,
    /<embed/i,
    /<object/i,
    /eval\(/i,
    /expression\(/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(content));
}

/**
 * Sanitizar com warning se conteúdo suspeito
 * 
 * @param content - Conteúdo para sanitizar
 * @param context - Contexto (para logging)
 * @returns Conteúdo sanitizado
 */
export function sanitizeWithWarning(content: string, context: string = 'unknown'): string {
  if (isSuspiciousContent(content)) {
    console.warn(`⚠️ XSS: Conteúdo suspeito detectado em ${context}:`, content.substring(0, 100));
  }
  
  return sanitizeHTML(content);
}

// ===================================
// HELPERS PARA REACT
// ===================================

/**
 * Props para componente que renderiza HTML
 */
export interface SafeHTMLProps {
  html: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  config?: DOMPurify.Config;
}

/**
 * Sanitizar props de componente React
 * 
 * Remove props perigosos antes de spread
 */
export function sanitizeProps<T extends Record<string, any>>(props: T): Partial<T> {
  const dangerous = ['dangerouslySetInnerHTML', 'innerHTML', 'outerHTML'];
  const sanitized = { ...props };
  
  dangerous.forEach(prop => {
    delete sanitized[prop];
  });
  
  return sanitized;
}

// ===================================
// CACHE DE SANITIZAÇÃO
// ===================================

/**
 * Cache de strings já sanitizadas (performance)
 */
const sanitizationCache = new Map<string, string>();
const CACHE_MAX_SIZE = 1000;

/**
 * Sanitizar com cache
 * 
 * Melhora performance para strings repetidas
 */
export function sanitizeHTMLCached(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }
  
  // Verificar cache
  if (sanitizationCache.has(dirty)) {
    return sanitizationCache.get(dirty)!;
  }
  
  // Sanitizar
  const clean = sanitizeHTML(dirty);
  
  // Adicionar ao cache
  if (sanitizationCache.size >= CACHE_MAX_SIZE) {
    // Limpar metade do cache se muito grande
    const keysToDelete = Array.from(sanitizationCache.keys()).slice(0, CACHE_MAX_SIZE / 2);
    keysToDelete.forEach(key => sanitizationCache.delete(key));
  }
  
  sanitizationCache.set(dirty, clean);
  
  return clean;
}

/**
 * Limpar cache de sanitização
 */
export function clearSanitizationCache(): void {
  sanitizationCache.clear();
}

// ===================================
// EXPORTAÇÕES
// ===================================

export default {
  // Sanitização
  sanitizeHTML,
  sanitizeText,
  sanitizeRichText,
  sanitizeInput,
  sanitizeInputs,
  sanitizeDatabaseData,
  
  // URLs
  sanitizeURL,
  isValidEmail,
  
  // Escape
  escapeHTML,
  unescapeHTML,
  escapeAttribute,
  
  // Validações específicas
  sanitizeName,
  sanitizeDocument,
  sanitizePhone,
  sanitizeNumber,
  
  // Detecção
  isSuspiciousContent,
  sanitizeWithWarning,
  
  // Helpers
  sanitizeProps,
  sanitizeHTMLCached,
  clearSanitizationCache,
};
