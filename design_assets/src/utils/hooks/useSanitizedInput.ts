/**
 * 🔒 HOOK: SANITIZED INPUT
 * 
 * Hook para inputs sanitizados automaticamente
 * Protege formulários contra XSS
 * 
 * @example
 * ```tsx
 * const [name, setName] = useSanitizedInput('');
 * <input value={name} onChange={e => setName(e.target.value)} />
 * ```
 */

import { useState, useCallback, useMemo } from 'react';
import { 
  sanitizeInput, 
  sanitizeName, 
  sanitizePhone, 
  sanitizeDocument,
  sanitizeNumber,
  sanitizeURL 
} from '../security/xss-sanitizer';

type SanitizerType = 
  | 'default'    // Sanitização padrão
  | 'name'       // Apenas letras e espaços
  | 'phone'      // Telefone
  | 'document'   // CPF/CNPJ
  | 'number'     // Números
  | 'url';       // URLs

/**
 * Hook para input sanitizado
 */
export function useSanitizedInput(
  initialValue: string = '',
  type: SanitizerType = 'default'
) {
  const [value, setValue] = useState(initialValue);
  
  // Selecionar sanitizador
  const sanitizer = useMemo(() => {
    switch (type) {
      case 'name': return sanitizeName;
      case 'phone': return sanitizePhone;
      case 'document': return sanitizeDocument;
      case 'number': return sanitizeNumber;
      case 'url': return (v: string) => sanitizeURL(v) || '';
      default: return sanitizeInput;
    }
  }, [type]);
  
  // Setter sanitizado
  const setSanitizedValue = useCallback((newValue: string | ((prev: string) => string)) => {
    setValue(prev => {
      const valueToSanitize = typeof newValue === 'function' 
        ? newValue(prev) 
        : newValue;
      
      return sanitizer(valueToSanitize);
    });
  }, [sanitizer]);
  
  return [value, setSanitizedValue] as const;
}

/**
 * Hook para múltiplos inputs sanitizados
 */
export function useSanitizedForm<T extends Record<string, string>>(
  initialValues: T,
  sanitizers?: Partial<Record<keyof T, SanitizerType>>
) {
  const [values, setValues] = useState<T>(initialValues);
  
  const setValue = useCallback((field: keyof T, value: string) => {
    setValues(prev => {
      const type = sanitizers?.[field] || 'default';
      
      let sanitized: string;
      switch (type) {
        case 'name': sanitized = sanitizeName(value); break;
        case 'phone': sanitized = sanitizePhone(value); break;
        case 'document': sanitized = sanitizeDocument(value); break;
        case 'number': sanitized = sanitizeNumber(value); break;
        case 'url': sanitized = sanitizeURL(value) || ''; break;
        default: sanitized = sanitizeInput(value);
      }
      
      return {
        ...prev,
        [field]: sanitized,
      };
    });
  }, [sanitizers]);
  
  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);
  
  return { values, setValue, reset };
}

export default useSanitizedInput;
