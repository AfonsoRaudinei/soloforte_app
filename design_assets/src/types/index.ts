/**
 * TYPES CENTRALIZADOS DO SISTEMA SOLOFORTE
 * Todas as interfaces e types em um único lugar
 */

// ============================================
// GEOLOCALIZAÇÃO E MAPA
// ============================================

export interface Point {
  x: number;
  y: number;
  lat?: number;
  lng?: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export type MapLayer = 'streets' | 'satellite' | 'terrain';

export type DrawingTool = 
  | 'polygon' 
  | 'rectangle' 
  | 'circle' 
  | 'freehand' 
  | 'crop'
  | null;

// ============================================
// POLÍGONOS E ÁREAS
// ============================================

export interface Polygon {
  id: string;
  name: string;
  points: Point[];
  type: 'polygon' | 'rectangle' | 'circle' | 'freehand';
  area: number; // hectares
  perimeter: number; // metros
  color: string;
  createdAt: string;
  produtorId?: string;      // 🆕 ID do produtor (vinculado)
  produtorNome?: string;    // 🆕 Nome do produtor
  produtor?: string;        // ⚠️ Mantido para compatibilidade (DEPRECATED)
  fazenda?: string;
  cultura?: string;         // 🆕 Tipo de cultura
  thumbnail?: string;       // 🆕 Miniatura do mapa (base64)
  updatedAt?: string;
  // ✅ NOVOS: Campos Supabase
  clienteId?: string;       // ID do cliente vinculado
  fazendaId?: string;       // ID da fazenda vinculada
  clienteNome?: string;     // Nome do cliente
  fazendaNome?: string;     // Nome da fazenda
  safra?: string;           // Ex: 2024/2025
}

export interface PolygonFormData {
  produtor: string;
  fazenda: string;
  nomeArea: string;
}

// ============================================
// USUÁRIO E AUTENTICAÇÃO
// ============================================

export interface User {
  id: string;
  email: string;
  user_metadata: {
    nome: string;
    telefone?: string;
    empresa?: string;
  };
  created_at?: string;
}

export interface AuthSession {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

// ============================================
// OCORRÊNCIAS
// ============================================

export type SeveridadeType = 'baixa' | 'media' | 'alta';
export type TipoOcorrenciaType = 'planta-daninha' | 'doencas' | 'inseto' | 'nutricional' | 'outros';
export type StatusOcorrencia = 'ativa' | 'em-monitoramento' | 'controlada' | 'resolvida';

export interface OccurrenceMarker {
  id: string;
  lat: number;
  lng: number;
  tipo: TipoOcorrenciaType;
  severidade: SeveridadeType;
  severidadePercentual: number; // 0-100
  fotos?: string[];
  notas?: string;
  data?: string;
  // Integração com Produtor/Talhão
  produtorId?: string;           // 🆕 ID do produtor (vinculado)
  produtorNome?: string;         // 🆕 Nome do produtor
  fazenda?: string;              // 🆕 Fazenda
  talhaoId?: string;             // 🆕 Talhão específico
  talhaoNome?: string;           // 🆕 Nome do talhão
  checkInId?: string;            // 🆕 Vínculo com check-in
  relatorioIds?: string[];       // 🆕 Relatórios que incluem esta ocorrência
  pestDiagnosisId?: string;      // 🆕 Diagnóstico IA original
  thumbnail?: string;            // 🆕 Miniatura do pin no mapa
  // Rastreamento cronológico
  ocorrenciaOriginalId?: string; // ID da primeira ocorrência desta série
  ocorrenciaAnteriorId?: string; // ID da ocorrência anterior (follow-up)
  followUps?: string[]; // IDs das ocorrências de follow-up posteriores
  status?: StatusOcorrencia;
  recomendacoes?: string; // Recomendações de tratamento
  produtosAplicados?: string[]; // Produtos aplicados para controle
}

export interface OccurrenceFormData {
  tipo: TipoOcorrenciaType | '';
  severidade: SeveridadeType | '';
  severidadePercentual: number; // 0-100
  notas: string;
  data: string;
  fotos: string[];
  localizacao: LatLng;
  // Follow-up
  isFollowUp: boolean;
  ocorrenciaOriginalId?: string;
  ocorrenciaAnteriorId?: string;
  recomendacoes?: string;
  produtosAplicados?: string[];
}

// Histórico completo de uma ocorrência
export interface OccurrenceHistory {
  id: string; // ID da ocorrência original
  tipo: TipoOcorrenciaType;
  localizacao: LatLng;
  status: StatusOcorrencia;
  registros: OccurrenceMarker[]; // Ordenado cronologicamente
  iniciadoEm: string;
  ultimaAtualizacao: string;
  evolucao: {
    severidadeInicial: number;
    severidadeAtual: number;
    tendencia: 'melhorando' | 'piorando' | 'estavel';
    variacaoPercentual: number; // % de mudança
  };
}

// ============================================
// NDVI
// ============================================

export interface NDVIDistribution {
  veryHigh: number;  // 0.6 - 1.0
  high: number;      // 0.4 - 0.6
  medium: number;    // 0.2 - 0.4
  low: number;       // 0.0 - 0.2
  veryLow: number;   // -1.0 - 0.0
}

export interface NDVIData {
  date: string;
  cloudCover: number;
  distribution: NDVIDistribution;
  averageNDVI: number;
  imageUrl?: string;
}

export interface HistoricalNDVIData {
  date: string;
  ndvi: number;
  cloudCover: number;
  biomassaAlta: number;
  biomassaBaixa: number;
}

export interface ComparisonAreaData {
  id: string;
  name: string;
  area: number;
  color: string;
  data: HistoricalNDVIData[];
  stats: {
    avgNDVI: number;
    maxNDVI: number;
    minNDVI: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  };
}

export type DataSource = 'sentinel' | 'planet';
export type NDVITab = 'current' | 'history' | 'comparison';
export type PeriodType = '30' | '60' | '90' | '180';

// ============================================
// CLIMA
// ============================================

export interface WeatherHourly {
  time: string;
  temp: number;
  icon: string;
  description: string;
  windSpeed: number;
  humidity: number;
  precipitation: number;
}

export interface WeatherDaily {
  date: string;
  tempMax: number;
  tempMin: number;
  icon: string;
  description: string;
  precipitation: number;
  windSpeed: number;
}

export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
  };
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
  location: string;
}

// ============================================
// AGENDA E EVENTOS
// ============================================

export type EventType = 'visita' | 'plantio' | 'colheita' | 'aplicacao' | 'reuniao' | 'outro';

export interface CalendarEvent {
  id: string;
  titulo: string;
  tipo: EventType;
  data: string;
  hora: string;
  local: string;
  fazenda?: string;
  produtor?: string;
  notas?: string;
  concluido?: boolean;
  createdAt: string;
}

// ============================================
// CHECK-IN / CHECK-OUT
// ============================================

export interface CheckInRecord {
  id: string;
  userId: string;
  produtorId: string;            // 🆕 ID do produtor (vinculado)
  produtorNome: string;          // 🆕 Nome do produtor
  produtor: string;              // ⚠️ Mantido para compatibilidade (DEPRECATED)
  fazenda: string;
  talhaoId?: string;             // 🆕 Talhão específico
  talhaoNome?: string;           // 🆕 Nome do talhão
  checkInTime: string;
  checkInLocation: LatLng;
  checkOutTime?: string;
  checkOutLocation?: LatLng;
  duration?: number; // minutos
  notas?: string;
  fotos?: string[];
  relatorioId?: string;          // 🆕 Vínculo com relatório gerado
  ocorrenciaIds?: string[];      // 🆕 Ocorrências registradas durante visita
}

export type CheckInStatus = 'checked-in' | 'checked-out' | null;

// ============================================
// RELATÓRIOS
// ============================================

export type ReportType = 'tecnico' | 'visita' | 'ia' | 'ndvi' | 'ocorrencias' | 'geral';
export type ReportPeriod = '7' | '15' | '30' | '60' | '90';
export type ReportStatus = 'rascunho' | 'concluido' | 'enviado';

export interface ReportFilters {
  periodo: ReportPeriod;
  fazenda?: string;
  produtor?: string;
  tipo?: ReportType;
}

export interface ReportData {
  id: string;
  tipo: ReportType;
  periodo: string;
  geradoEm: string;
  dados: any; // Específico de cada tipo de relatório
}

// 🆕 RELATÓRIO COMPLETO INTEGRADO
export interface RelatorioCompleto {
  id: string;
  tipo: ReportType;
  titulo: string;
  produtorId: string;              // ID do produtor
  produtorNome: string;            // Nome do produtor
  fazenda: string;                 // Fazenda
  checkInId?: string;              // Vínculo com visita
  data: string;
  status: ReportStatus;
  
  // Conteúdo do relatório
  resumo?: string;
  observacoes?: string;
  
  // Dados vinculados
  talhoes: {                       // Talhões incluídos
    id: string;
    nome: string;
    area: number;
    thumbnail?: string;            // Miniatura do mapa
    cultura?: string;
  }[];
  
  ocorrencias: {                   // Ocorrências registradas
    id: string;
    tipo: string;
    severidade: string;
    location: LatLng;
    fotos: string[];
    notas?: string;
    thumbnail?: string;            // Miniatura do pin no mapa
  }[];
  
  fotos: string[];                 // Fotos gerais da visita
  
  // Análises IA (se aplicável)
  analiseIA?: {
    diagnosticos: any[];           // PestDiagnosis[]
    recomendacoes: string[];
  };
  
  // Métricas
  duracao?: number;                // Duração da visita (minutos)
  areaTotal?: number;              // Soma das áreas dos talhões
  ocorrenciasTotal?: number;       // Total de ocorrências
  
  createdAt: string;
  updatedAt?: string;
  geradoPor: string;               // userId do técnico
}

// ============================================
// ALERTAS
// ============================================

export type AlertType = 'ndvi' | 'clima' | 'ocorrencia';
export type AlertChannel = 'email' | 'whatsapp' | 'push';

export interface AlertConfig {
  id: string;
  tipo: AlertType;
  ativo: boolean;
  canais: AlertChannel[];
  condicoes: {
    ndviMinimo?: number;
    ndviMaximo?: number;
    temperatura?: number;
    precipitacao?: number;
    umidade?: number;
  };
  produtores?: string[];
  fazendas?: string[];
}

export interface Alert {
  id: string;
  tipo: AlertType;
  titulo: string;
  mensagem: string;
  severidade: SeveridadeType;
  criadoEm: string;
  lido: boolean;
  dados?: any;
}

// ============================================
// CLIENTES E PRODUTORES
// ============================================

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  fazendas?: string[];
  ativo: boolean;
  criadoEm: string;
}

export interface Produtor {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  telefone?: string;
  fazenda?: string;
  cpfCnpj?: string;
  cidade?: string;
  estado?: string;
  endereco?: string;
  ativo?: boolean;
  consultorId?: string;
  syncedFrom?: 'manual' | 'external';
  externalId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Talhao {
  id: string;
  produtorId: string;
  consultorId: string;
  nome: string;
  area: string;
  cultura?: string;
  coordenadas?: any;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================
// CONFIGURAÇÕES
// ============================================

export type ThemeMode = 'light' | 'dark';
export type VisualStyle = 'ios' | 'microsoft';
export type Language = 'pt-BR' | 'en-US' | 'es-ES';

export interface UserSettings {
  theme: ThemeMode;
  visualStyle: VisualStyle;
  language: Language;
  notificacoes: {
    email: boolean;
    whatsapp: boolean;
    push: boolean;
  };
  privacidade: {
    compartilharLocalizacao: boolean;
    compartilharDados: boolean;
  };
}

// ============================================
// COMPONENTES
// ============================================

export interface NavigateFunction {
  (path: string): void;
}

export interface FABOption {
  icon: any; // LucideIcon
  label: string;
  action: () => void;
}

// ============================================
// API
// ============================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

// ============================================
// CHAT/SUPORTE
// ============================================

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'support';
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface ChatSession {
  id: string;
  userId: string;
  status: 'open' | 'closed';
  createdAt: string;
  lastMessageAt: string;
  unreadCount: number;
  closedAt?: string;
}

// ============================================
// UTILITY TYPES
// ============================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = Omit<T, K> & Pick<Required<T>, K>;

// Status genérico
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Resultado de operação
export interface OperationResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// Paginação
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}