/**
 * ⚠️ DEPRECATED - Este arquivo foi consolidado em constants.ts
 * 
 * @deprecated Use `import { MOBILE } from './constants'` ao invés deste arquivo
 * @see /utils/constants.ts - Todas as constantes mobile agora estão em MOBILE.*
 * 
 * Data de consolidação: 29/Out/2025
 * 
 * MIGRAÇÃO:
 * - MOBILE_CONSTANTS.* → MOBILE.*
 * - Todas as funções helper foram movidas para constants.ts
 * - Este arquivo será removido em breve
 * 
 * ✅ CONSTANTES MOBILE-ONLY - SoloForte (LEGADO)
 * 
 * Substitui media queries por valores fixos mobile.
 * 
 * Benefícios:
 * - Sem re-renders ao redimensionar
 * - Valores previsíveis
 * - Type-safe
 * - Fácil manutenção
 */

export const MOBILE_CONSTANTS = {
  // ===================================
  // TAMANHOS TOUCH-FRIENDLY (WCAG)
  // ===================================
  
  // Botões e interativos
  BUTTON_HEIGHT_DEFAULT: 48,    // h-12 (confortável)
  BUTTON_HEIGHT_SM: 44,          // h-11 (mínimo WCAG)
  BUTTON_HEIGHT_LG: 56,          // h-14 (extra)
  BUTTON_ICON_SIZE: 48,          // size-12
  
  // Inputs e formulários
  INPUT_HEIGHT: 44,              // h-11 (mínimo touch)
  TEXTAREA_MIN_HEIGHT: 88,       // 2 linhas
  
  // Touch targets gerais
  TOUCH_TARGET_MIN: 44,          // Mínimo absoluto WCAG
  TOUCH_TARGET_COMFORTABLE: 48,  // Recomendado
  
  // ===================================
  // ESPAÇAMENTOS
  // ===================================
  
  PADDING_XS: 8,
  PADDING_SM: 12,
  PADDING_MD: 16,
  PADDING_LG: 24,
  PADDING_XL: 32,
  
  MARGIN_XS: 8,
  MARGIN_SM: 12,
  MARGIN_MD: 16,
  MARGIN_LG: 24,
  MARGIN_XL: 32,
  
  GAP_SM: 8,
  GAP_MD: 12,
  GAP_LG: 16,
  
  // ===================================
  // TIPOGRAFIA
  // ===================================
  
  // ⚠️ IMPORTANTE: Fonte base nunca <16px (evita zoom no iOS)
  FONT_SIZE_XS: 12,
  FONT_SIZE_SM: 14,
  FONT_SIZE_BASE: 16,     // Mínimo para inputs
  FONT_SIZE_LG: 18,
  FONT_SIZE_XL: 20,
  FONT_SIZE_2XL: 24,
  FONT_SIZE_3XL: 28,
  
  FONT_WEIGHT_NORMAL: 400,
  FONT_WEIGHT_MEDIUM: 500,
  FONT_WEIGHT_SEMIBOLD: 600,
  FONT_WEIGHT_BOLD: 700,
  
  LINE_HEIGHT_TIGHT: 1.25,
  LINE_HEIGHT_NORMAL: 1.5,
  LINE_HEIGHT_RELAXED: 1.75,
  
  // ===================================
  // LAYOUT
  // ===================================
  
  // Larguras máximas
  MAX_CONTENT_WIDTH: '100vw',
  MAX_CONTAINER_WIDTH: 428,     // iPhone 14 Pro Max
  
  // Sidebar
  SIDEBAR_WIDTH: 280,            // 18rem em px
  SIDEBAR_WIDTH_ICON: 48,        // 3rem
  
  // Header/Footer
  HEADER_HEIGHT: 56,             // 3.5rem
  FOOTER_HEIGHT: 64,             // 4rem
  TAB_BAR_HEIGHT: 64,            // Bottom navigation
  
  // FAB
  FAB_SIZE: 56,                  // Floating Action Button
  FAB_SIZE_MINI: 40,
  
  // ===================================
  // Z-INDEX
  // ===================================
  
  Z_MAP: 1,
  Z_MAP_CONTROLS: 100,
  Z_HEADER: 500,
  Z_FAB: 1000,
  Z_SIDEBAR: 1500,
  Z_DIALOG: 2000,
  Z_TOAST: 3000,
  Z_TOOLTIP: 4000,
  
  // ===================================
  // ANIMAÇÕES
  // ===================================
  
  TRANSITION_FAST: 150,          // ms
  TRANSITION_NORMAL: 300,
  TRANSITION_SLOW: 500,
  
  // ===================================
  // MAPA
  // ===================================
  
  MAP_ZOOM_DEFAULT: 15,
  MAP_ZOOM_MIN: 3,
  MAP_ZOOM_MAX: 20,
  
  MAP_MARKER_SIZE: 32,
  MAP_MARKER_ICON_SIZE: 20,
  
  // ===================================
  // DEVICE INFO
  // ===================================
  
  // Viewport safe areas (iPhone notch, etc)
  SAFE_AREA_TOP: 44,            // iPhone status bar
  SAFE_AREA_BOTTOM: 34,         // iPhone home indicator
  
  // Device sizes comuns
  DEVICE_IPHONE_14_WIDTH: 390,
  DEVICE_IPHONE_14_PLUS_WIDTH: 428,
  DEVICE_ANDROID_SMALL_WIDTH: 360,
  
  // ===================================
  // BREAKPOINTS (MOBILE-ONLY)
  // ===================================
  
  // Apenas para orientação (portrait vs landscape)
  PORTRAIT_MAX_WIDTH: 428,
  LANDSCAPE_MIN_WIDTH: 568,     // iPhone SE landscape
  
  // ===================================
  // CORES PRINCIPAIS
  // ===================================
  
  // Azul SoloForte
  PRIMARY_BLUE: '#0057FF',
  
  // Estados de severidade (ocorrências)
  SEVERITY_BAIXA: '#22c55e',    // Verde
  SEVERITY_MEDIA: '#eab308',    // Amarelo
  SEVERITY_ALTA: '#ef4444',     // Vermelho
  SEVERITY_CRITICA: '#991b1b',  // Vermelho escuro
  
  // ===================================
  // PERFORMANCE
  // ===================================
  
  // Debounce/Throttle
  DEBOUNCE_SEARCH: 300,         // ms
  DEBOUNCE_RESIZE: 150,
  THROTTLE_SCROLL: 100,
  
  // Cache
  CACHE_TILE_MAX_AGE: 604800,   // 7 dias (segundos)
  CACHE_API_MAX_AGE: 3600,      // 1 hora
  
  // ===================================
  // ACESSIBILIDADE
  // ===================================
  
  // Tamanhos mínimos WCAG
  A11Y_TOUCH_MIN: 44,
  A11Y_FONT_MIN: 16,
  A11Y_CONTRAST_MIN: 4.5,       // Ratio
  
} as const;

// ===================================
// TIPOS
// ===================================

export type MobileConstants = typeof MOBILE_CONSTANTS;

// ===================================
// HELPERS
// ===================================

/**
 * Converte px para rem
 */
export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

/**
 * Converte rem para px
 */
export function remToPx(rem: number): number {
  return rem * 16;
}

/**
 * Verifica se valor é touch-friendly
 */
export function isTouchFriendly(size: number): boolean {
  return size >= MOBILE_CONSTANTS.A11Y_TOUCH_MIN;
}

/**
 * Verifica se fonte é acessível
 */
export function isAccessibleFontSize(size: number): boolean {
  return size >= MOBILE_CONSTANTS.A11Y_FONT_MIN;
}

/**
 * Safe area insets para iOS
 */
export function getSafeAreaInsets() {
  return {
    top: MOBILE_CONSTANTS.SAFE_AREA_TOP,
    bottom: MOBILE_CONSTANTS.SAFE_AREA_BOTTOM,
    left: 0,
    right: 0,
  };
}

/**
 * Detecta orientação do device
 */
export function isLandscape(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > window.innerHeight;
}

/**
 * Detecta se é iPhone com notch
 */
export function hasNotch(): boolean {
  if (typeof window === 'undefined') return false;
  // Verifica se tem safe-area-inset-top
  const safeAreaTop = getComputedStyle(document.documentElement)
    .getPropertyValue('--sat') || '0px';
  return parseInt(safeAreaTop) > 0;
}

// ===================================
// EXPORT DEFAULT
// ===================================

export default MOBILE_CONSTANTS;
