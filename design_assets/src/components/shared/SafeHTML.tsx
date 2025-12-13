/**
 * 🔒 SAFE HTML COMPONENT
 * 
 * Componente React para renderizar HTML sanitizado
 * Protege contra XSS automaticamente
 * 
 * @example
 * ```tsx
 * <SafeHTML html={userInput} />
 * <SafeHTML html={richText} config="richText" />
 * <SafeHTML html={description} tag="p" className="text-gray-600" />
 * ```
 */

import React from 'react';
import { sanitizeHTML, sanitizeRichText, sanitizeText } from '../../utils/security/xss-sanitizer';

interface SafeHTMLProps {
  /** HTML potencialmente perigoso para renderizar */
  html: string;
  
  /** Tag HTML para usar como wrapper (padrão: div) */
  tag?: keyof JSX.IntrinsicElements;
  
  /** Classe CSS para aplicar */
  className?: string;
  
  /** Tipo de sanitização */
  config?: 'default' | 'richText' | 'textOnly';
  
  /** Props adicionais para o elemento */
  [key: string]: any;
}

/**
 * Componente que renderiza HTML sanitizado
 */
export function SafeHTML({
  html,
  tag = 'div',
  className,
  config = 'default',
  ...props
}: SafeHTMLProps) {
  // Escolher função de sanitização
  const sanitize = React.useMemo(() => {
    switch (config) {
      case 'richText':
        return sanitizeRichText;
      case 'textOnly':
        return sanitizeText;
      default:
        return sanitizeHTML;
    }
  }, [config]);
  
  // Sanitizar HTML
  const safeHTML = React.useMemo(() => {
    if (!html || typeof html !== 'string') {
      return '';
    }
    return sanitize(html);
  }, [html, sanitize]);
  
  // Criar elemento dinamicamente
  const Tag = tag;
  
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHTML }}
      {...props}
    />
  );
}

/**
 * Variante para texto puro (sem HTML)
 */
export function SafeText({ html, ...props }: SafeHTMLProps) {
  return <SafeHTML {...props} html={html} config="textOnly" />;
}

/**
 * Variante para rich text (mais permissiva)
 */
export function SafeRichText({ html, ...props }: SafeHTMLProps) {
  return <SafeHTML {...props} html={html} config="richText" />;
}

export default SafeHTML;
