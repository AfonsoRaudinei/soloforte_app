/**
 * CONSTANTES CENTRALIZADAS - SOLOFORTE
 * ✅ CONSOLIDADO: Web + Mobile (constants.ts + constants-mobile.ts)
 * 
 * Todas as constantes do sistema em um único lugar
 * Facilita manutenção e evita valores hardcoded duplicados
 * 
 * @version 2.0 - Consolidado em 29/Out/2025
 */

// ============================================
// STORAGE KEYS (LocalStorage/SessionStorage)
// ============================================

export const STORAGE_KEYS = {
  SESSION: 'soloforte_session',
  DEMO_MODE: 'soloforte_demo',
  DEMO_POLYGONS: 'soloforte_demo_polygons',
  DEMO_MARKERS: 'soloforte_demo_markers',
  USER_PREFERENCES: 'soloforte_preferences',
  THEME: 'soloforte_theme',
  VISUAL_STYLE: 'soloforte_visual_style',
  LAST_LOCATION: 'soloforte_last_location',
  MAP_LAYER: 'soloforte_map_layer',
  PROFILE_IMAGE: 'soloforte_profile_image',
  FARM_LOGO: 'soloforte_farm_logo',
  ALERTS: 'soloforte_alerts',
  ACTIVE_VISIT: 'soloforte_active_visit',
  VISIT_HISTORY: 'soloforte_visit_history',
  ERRORS: 'soloforte_errors',
} as const;

// ============================================
// CORES DO SISTEMA
// ============================================

export const COLORS = {
  // Brand Colors
  PRIMARY: '#0057FF',
  PRIMARY_HOVER: '#0046CC',
  PRIMARY_LIGHT: '#3377FF',
  PRIMARY_DARK: '#003699',
  
  // Status Colors
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6',
  
  // Severidade (Ocorrências) - Consolidado com mobile
  SEVERITY: {
    BAIXA: '#10B981',    // Verde (ex-constants-mobile: #22c55e)
    MEDIA: '#F59E0B',    // Amarelo (ex-constants-mobile: #eab308)
    ALTA: '#EF4444',     // Vermelho
    CRITICA: '#991b1b',  // Vermelho escuro (de constants-mobile)
  },
  
  // NDVI Colors
  NDVI: {
    VERY_HIGH: '#006400',  // Verde escuro
    HIGH: '#228B22',       // Verde
    MEDIUM: '#90EE90',     // Verde claro
    LOW: '#FFFF00',        // Amarelo
    VERY_LOW: '#FF4500',   // Vermelho
  },
  
  // Map Markers
  MARKER: {
    DEFAULT: '#0057FF',
    SELECTED: '#F59E0B',
    ACTIVE: '#10B981',
  },
  
  // Background
  BG: {
    LIGHT: '#FFFFFF',
    GRAY: '#F3F4F6',
    DARK: '#1F2937',
  },
} as const;

// ============================================
// Z-INDEX LAYERS (Consolidado: Web + Mobile)
// ============================================

export const Z_INDEX = {
  // Base layers
  BASE: 1,
  MAP: 1,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
  NOTIFICATION: 80,
  FAB: 90,
  
  // Mobile specific (maior z-index para garantir sobreposição)
  MAP_CONTROLS: 100,
  HEADER_MOBILE: 500,
  FAB_MOBILE: 1000,
  SIDEBAR_MOBILE: 1500,
  DIALOG_MOBILE: 2000,
  TOAST_MOBILE: 3000,
  TOOLTIP_MOBILE: 4000,
  
  // System
  LOADING: 9998,
  ERROR_BOUNDARY: 9999,
} as const;

// ============================================
// MENSAGENS PADRÃO
// ============================================

export const MESSAGES = {
  // Success
  SUCCESS: {
    SAVE: '✅ Salvo com sucesso!',
    DELETE: '✅ Excluído com sucesso!',
    UPDATE: '✅ Atualizado com sucesso!',
    LOGIN: '✅ Login realizado com sucesso!',
    LOGOUT: '✅ Logout realizado com sucesso!',
    AREA_SAVED: (name: string) => `✅ Área "${name}" salva com sucesso!`,
    OCCURRENCE_SAVED: '✅ Ocorrência salva com sucesso!',
    LOCATION_CAPTURED: '📍 Localização capturada com sucesso!',
    LOCATION_CENTERED: '✅ Localização centralizada!',
    NDVI_PROCESSED: 'NDVI processado com sucesso!',
    EXPORT_SUCCESS: '✅ Exportação concluída!',
    CHECKIN_SUCCESS: '✅ Check-in realizado!',
    CHECKOUT_SUCCESS: '✅ Check-out realizado!',
  },
  
  // Error
  ERROR: {
    GENERIC: '❌ Erro ao processar solicitação',
    SAVE: '❌ Erro ao salvar. Tente novamente.',
    DELETE: '❌ Erro ao excluir. Tente novamente.',
    LOAD: '❌ Erro ao carregar dados',
    LOGIN: '❌ Erro ao fazer login',
    NETWORK: '❌ Erro de conexão. Verifique sua internet.',
    PERMISSION_DENIED: '🚫 Permissão negada',
    INVALID_DATA: '❌ Dados inválidos',
    AUTH_REQUIRED: '🔐 Autenticação necessária',
  },
  
  // Info
  INFO: {
    LOADING: '⏳ Carregando...',
    PROCESSING: '⚙️ Processando...',
    CAPTURING_LOCATION: '📍 Capturando localização GPS...',
    GPS_UNAVAILABLE: '📍 GPS não disponível. Usando localização padrão.',
    DEMO_MODE: '🎮 Modo demonstração ativo',
    NO_DATA: 'ℹ️ Nenhum dado disponível',
    USING_DEMO_DATA: 'Usando dados simulados (modo demo)',
  },
  
  // Warning
  WARNING: {
    UNSAVED_CHANGES: '⚠️ Você tem alterações não salvas',
    LOW_NDVI: '⚠️ NDVI baixo detectado',
    HIGH_TEMPERATURE: '⚠️ Temperatura acima do normal',
    HEAVY_RAIN: '⚠️ Previsão de chuva forte',
  },
} as const;

// ============================================
// MOBILE - Constantes Mobile-Specific (de constants-mobile.ts)
// ============================================

export const MOBILE = {
  // ===================================
  // TAMANHOS TOUCH-FRIENDLY (WCAG)
  // ===================================
  
  // Touch targets
  TOUCH_TARGET_MIN: 44,          // Mínimo absoluto WCAG
  TOUCH_TARGET_COMFORTABLE: 48,  // Recomendado
  
  // Botões e interativos
  BUTTON_HEIGHT_DEFAULT: 48,     // h-12 (confortável)
  BUTTON_HEIGHT_SM: 44,          // h-11 (mínimo WCAG)
  BUTTON_HEIGHT_LG: 56,          // h-14 (extra)
  BUTTON_ICON_SIZE: 48,          // size-12
  
  // Inputs e formulários
  INPUT_HEIGHT: 44,              // h-11 (mínimo touch)
  TEXTAREA_MIN_HEIGHT: 88,       // 2 linhas
  
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

// ============================================
// LIMITES E VALIDAÇÕES
// ============================================

export const LIMITS = {
  // Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_PHOTOS: 10,
  MAX_PHOTOS_PER_OCCURRENCE: 5,
  
  // Strings
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_NOTES_LENGTH: 1000,
  
  // Paginação
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // NDVI
  NDVI_MIN: -1.0,
  NDVI_MAX: 1.0,
  
  // Mapa
  MAX_POLYGON_POINTS: 1000,
  MIN_POLYGON_POINTS: 3,
  
  // Histórico
  MAX_HISTORY_DAYS: 365,
  DEFAULT_HISTORY_DAYS: 30,
} as const;

// ============================================
// DURAÇÕES E TIMINGS
// ============================================

export const TIMING = {
  // Animações
  ANIMATION_FAST: 150,    // ms
  ANIMATION_NORMAL: 300,  // ms
  ANIMATION_SLOW: 500,    // ms
  
  // Debounce
  DEBOUNCE_SEARCH: 300,   // ms
  DEBOUNCE_INPUT: 500,    // ms
  
  // Polling/Refresh
  REFRESH_WEATHER: 15 * 60 * 1000,  // 15 minutos
  REFRESH_NDVI: 60 * 60 * 1000,      // 1 hora
  
  // Toast
  TOAST_DURATION: 3000,   // ms
  TOAST_DURATION_LONG: 5000, // ms
  
  // Loading
  MIN_LOADING_TIME: 500,  // ms (para evitar flash)
  MAX_LOADING_TIME: 30000, // ms (timeout)
} as const;

// ============================================
// BREAKPOINTS RESPONSIVOS
// ============================================

export const BREAKPOINTS = {
  XS: 320,   // px
  SM: 640,   // px
  MD: 768,   // px
  LG: 1024,  // px
  XL: 1280,  // px
  XXL: 1536, // px
} as const;

// ============================================
// CONFIGURAÇÕES DO MAPA
// ============================================

export const MAP_CONFIG = {
  // Default Location (São Paulo)
  DEFAULT_LAT: -23.5505,
  DEFAULT_LNG: -46.6333,
  DEFAULT_ZOOM: 12,
  
  // Zoom Levels
  MIN_ZOOM: 3,
  MAX_ZOOM: 20,
  AREA_ZOOM: 16,
  
  // MapTiler
  MAPTILER_STYLES: {
    STREETS: 'streets-v2',
    SATELLITE: 'hybrid',
    TERRAIN: 'outdoor-v2',
  },
  
  // Polygon Colors
  POLYGON_COLORS: [
    '#0057FF', // Azul primário
    '#10B981', // Verde
    '#F59E0B', // Amarelo
    '#EF4444', // Vermelho
    '#8B5CF6', // Roxo
    '#EC4899', // Rosa
  ],
  
  // Drawing
  DEFAULT_STROKE_WIDTH: 3,
  DEFAULT_FILL_OPACITY: 0.2,
  SELECTED_STROKE_WIDTH: 4,
} as const;

// ============================================
// NDVI RANGES
// ============================================

export const NDVI_RANGES = {
  VERY_HIGH: { min: 0.6, max: 1.0, label: 'Biomassa Alta', color: COLORS.NDVI.VERY_HIGH },
  HIGH: { min: 0.4, max: 0.6, label: 'Vegetação Saudável', color: COLORS.NDVI.HIGH },
  MEDIUM: { min: 0.2, max: 0.4, label: 'Vegetação Moderada', color: COLORS.NDVI.MEDIUM },
  LOW: { min: 0.0, max: 0.2, label: 'Vegetação Baixa', color: COLORS.NDVI.LOW },
  VERY_LOW: { min: -1.0, max: 0.0, label: 'Sem Vegetação/Solo', color: COLORS.NDVI.VERY_LOW },
} as const;

// ============================================
// FORMATOS E PADRÕES
// ============================================

export const FORMATS = {
  // Data e Hora
  DATE: 'DD/MM/YYYY',
  TIME: 'HH:mm',
  DATETIME: 'DD/MM/YYYY HH:mm',
  DATE_ISO: 'YYYY-MM-DD',
  
  // Números
  AREA: '0.00', // hectares
  TEMPERATURE: '0°C',
  PERCENTAGE: '0.0%',
  CURRENCY: 'R$ 0,00',
  
  // Coordenadas
  COORDINATE: '0.000000',
} as const;

// ============================================
// TIPOS DE EVENTOS
// ============================================

export const EVENT_TYPES = {
  VISITA: { icon: '🌾', label: 'Visita', color: COLORS.PRIMARY },
  PLANTIO: { icon: '🌱', label: 'Plantio', color: COLORS.SUCCESS },
  COLHEITA: { icon: '🚜', label: 'Colheita', color: COLORS.WARNING },
  APLICACAO: { icon: '💧', label: 'Aplicação', color: COLORS.INFO },
  REUNIAO: { icon: '👥', label: 'Reunião', color: COLORS.PRIMARY },
  OUTRO: { icon: '📌', label: 'Outro', color: '#6B7280' },
} as const;

// ============================================
// TIPOS DE OCORRÊNCIA
// ============================================

export const OCCURRENCE_TYPES = {
  PLANTA_DANINHA: { icon: '🌿', label: 'Planta Daninha', color: '#10B981' },
  DOENCAS: { icon: '🦠', label: 'Doenças', color: '#EF4444' },
  INSETO: { icon: '🐛', label: 'Inseto', color: '#F59E0B' },
  NUTRICIONAL: { icon: '🧪', label: 'Nutricional', color: '#3B82F6' },
  OUTROS: { icon: '📌', label: 'Outros', color: '#6B7280' },
} as const;

// ============================================
// ÍCONES DE CLIMA
// ============================================

export const WEATHER_ICONS = {
  CLEAR: '☀️',
  CLOUDS: '☁️',
  RAIN: '🌧️',
  THUNDERSTORM: '⛈️',
  SNOW: '❄️',
  MIST: '🌫️',
  DRIZZLE: '🌦️',
} as const;

// ============================================
// REGEX PATTERNS
// ============================================

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  CEP: /^\d{5}-?\d{3}$/,
  COORDINATES: /^-?\d+(\.\d+)?$/,
} as const;

// ============================================
// API ENDPOINTS (relativos ao servidor)
// ============================================

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  
  // Polygons
  POLYGONS: '/polygons',
  POLYGON_BY_ID: (id: string) => `/polygons/${id}`,
  
  // Occurrences
  OCCURRENCES: '/occurrences',
  OCCURRENCE_BY_ID: (id: string) => `/occurrences/${id}`,
  
  // NDVI
  NDVI_PROCESS: '/make-server-b2d55462/ndvi/process',
  NDVI_HISTORY: (areaId: string, period: string) => 
    `/make-server-b2d55462/ndvi/history/${areaId}?period=${period}`,
  
  // Weather
  WEATHER: '/make-server-b2d55462/weather',
  ALERTS: '/make-server-b2d55462/weather/alerts',
  
  // Reports
  REPORTS: '/reports',
  EXPORT_REPORT: (id: string) => `/reports/${id}/export`,
} as const;

// ============================================
// CLASSES CSS REUTILIZÁVEIS
// ============================================

export const CSS_CLASSES = {
  // Containers
  CONTAINER: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  CONTAINER_NARROW: 'max-w-2xl mx-auto px-4',
  CONTAINER_WIDE: 'max-w-screen-2xl mx-auto px-4',
  
  // Cards
  CARD: 'bg-white rounded-lg shadow-md p-6',
  CARD_HOVER: 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow',
  
  // Buttons
  BTN_PRIMARY: 'bg-[#0057FF] hover:bg-[#0046CC] text-white rounded-lg px-4 py-2',
  BTN_SECONDARY: 'bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2',
  BTN_DANGER: 'bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2',
  
  // Loading
  SPINNER: 'animate-spin rounded-full border-4 border-gray-200 border-t-[#0057FF]',
  
  // Glassmorphism (iOS style)
  GLASS: 'backdrop-blur-xl bg-white/80 border border-white/20 shadow-lg',
  GLASS_DARK: 'backdrop-blur-xl bg-black/40 border border-white/10',
} as const;

// ============================================
// EXPORT HELPER FUNCTIONS
// ============================================

/**
 * Obtém a cor baseada na severidade
 */
export function getSeverityColor(severity: 'baixa' | 'media' | 'alta'): string {
  const map = {
    baixa: COLORS.SEVERITY.BAIXA,
    media: COLORS.SEVERITY.MEDIA,
    alta: COLORS.SEVERITY.ALTA,
  };
  return map[severity] || COLORS.SEVERITY.MEDIA;
}

/**
 * Obtém a cor NDVI baseada no valor
 */
export function getNDVIColor(ndvi: number): string {
  if (ndvi >= 0.6) return COLORS.NDVI.VERY_HIGH;
  if (ndvi >= 0.4) return COLORS.NDVI.HIGH;
  if (ndvi >= 0.2) return COLORS.NDVI.MEDIUM;
  if (ndvi >= 0.0) return COLORS.NDVI.LOW;
  return COLORS.NDVI.VERY_LOW;
}

/**
 * Formata bytes para tamanho legível
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Verifica se está em modo demo
 */
export function isDemoMode(): boolean {
  return localStorage.getItem(STORAGE_KEYS.DEMO_MODE) === 'true';
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  return REGEX.EMAIL.test(email);
}

/**
 * Valida telefone
 */
export function isValidPhone(phone: string): boolean {
  return REGEX.PHONE.test(phone);
}

/**
 * Obtém mensagem de sucesso
 */
export function getSuccessMessage(key: keyof typeof MESSAGES.SUCCESS, ...args: any[]): string {
  const msg = MESSAGES.SUCCESS[key];
  return typeof msg === 'function' ? msg(...args) : msg;
}

/**
 * Obtém z-index para camada específica
 */
export function getZIndex(layer: keyof typeof Z_INDEX): number {
  return Z_INDEX[layer];
}

// ============================================
// MOBILE HELPERS (de constants-mobile.ts)
// ============================================

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
  return size >= MOBILE.A11Y_TOUCH_MIN;
}

/**
 * Verifica se fonte é acessível
 */
export function isAccessibleFontSize(size: number): boolean {
  return size >= MOBILE.A11Y_FONT_MIN;
}

/**
 * Safe area insets para iOS
 */
export function getSafeAreaInsets() {
  return {
    top: MOBILE.SAFE_AREA_TOP,
    bottom: MOBILE.SAFE_AREA_BOTTOM,
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

// ============================================
// EXPORT DEFAULT (para import * as CONSTANTS)
// ============================================

export default {
  STORAGE_KEYS,
  COLORS,
  Z_INDEX,
  MOBILE,
  MESSAGES,
  LIMITS,
  TIMING,
  BREAKPOINTS,
  MAP_CONFIG,
  NDVI_RANGES,
  FORMATS,
  EVENT_TYPES,
  OCCURRENCE_TYPES,
  WEATHER_ICONS,
  REGEX,
  API_ENDPOINTS,
  CSS_CLASSES,
};
