import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// URL do projeto Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

// Criar cliente Supabase (singleton)
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(supabaseUrl, publicAnonKey);
  }
  return supabaseClient;
}

// URL base da API
export const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462`;

// ===================================
// CACHE DE SESSÃO PARA PERFORMANCE
// ===================================

interface SessionCache {
  session: any;
  timestamp: number;
  expiresAt: number;
}

let sessionCache: SessionCache | null = null;
const SESSION_CACHE_DURATION = 5000; // 5 segundos

/**
 * Obter sessão com cache para otimizar performance
 */
async function getCachedSession() {
  const now = Date.now();
  
  // Usar cache se válido
  if (sessionCache && (now - sessionCache.timestamp) < SESSION_CACHE_DURATION) {
    return sessionCache.session;
  }
  
  // Buscar nova sessão
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (!error && session) {
    sessionCache = {
      session,
      timestamp: now,
      expiresAt: session.expires_at || 0,
    };
  } else {
    sessionCache = null;
  }
  
  return session;
}

/**
 * Invalidar cache de sessão (chamar em logout)
 */
export function invalidateSessionCache() {
  sessionCache = null;
}

/**
 * 🔍 VERIFICAÇÃO RÁPIDA DE AUTENTICAÇÃO
 * 
 * Verifica se o usuário está autenticado sem fazer nova requisição
 * Usa cache para performance máxima
 * 
 * @returns boolean - true se autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const session = await getCachedSession();
    
    if (!session?.access_token) {
      return false;
    }
    
    // Verificar se token não expirou
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * 🎯 OBTER TOKEN ATUAL
 * 
 * Retorna o token de acesso atual se válido
 * 
 * @returns string | null - Token de acesso ou null
 */
export async function getCurrentToken(): Promise<string | null> {
  try {
    const session = await getCachedSession();
    
    if (!session?.access_token) {
      return null;
    }
    
    // Verificar se token não expirou
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      return null;
    }
    
    return session.access_token;
  } catch {
    return null;
  }
}

/**
 * 🔐 HELPER AUTENTICADO PARA REQUESTS
 * 
 * Faz requisições à API com autenticação automática.
 * PROTEÇÕES:
 * - Verifica sessão antes de fazer request
 * - Valida token de acesso
 * - Retorna silenciosamente se não autenticado
 * - Não polui console com erros desnecessários
 * 
 * @param endpoint - Rota da API (ex: '/analytics')
 * @param options - Opções do fetch + body opcional
 * @returns Promise com resposta JSON ou objeto de erro
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit & { body?: any } = {}) {
  try {
    // ✅ PROTEÇÃO 1: Verificar se cliente existe
    const supabase = createClient();
    if (!supabase) {
      return { success: false, error: 'Cliente Supabase não inicializado' };
    }

    // ✅ PROTEÇÃO 2: Obter sessão atual (com cache)
    const session = await getCachedSession();
    const sessionError = null; // getCachedSession já trata erros internamente
    
    // ✅ PROTEÇÃO 3: Verificar se sessão existe
    if (sessionError) {
      return { success: false, error: 'Erro ao obter sessão' };
    }
    
    if (!session) {
      // Retorna silenciosamente sem logar (comportamento esperado quando não logado)
      return { success: false, error: 'Não autenticado' };
    }
    
    // ✅ PROTEÇÃO 4: Verificar se token existe
    if (!session.access_token) {
      return { success: false, error: 'Token de acesso não encontrado' };
    }

    // ✅ PROTEÇÃO 5: Verificar se token não expirou
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      return { success: false, error: 'Token expirado' };
    }
    
    // ✅ Preparar headers com token válido
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...(options.headers as HeadersInit || {}),
    };

    const fetchOptions: RequestInit = {
      ...options,
      headers,
    };

    // ✅ Converter body para JSON string se for objeto
    if (options.body && typeof options.body === 'object') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    // ✅ PROTEÇÃO 6: Fazer request com timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // ✅ PROTEÇÃO 7: Tratar erros HTTP
      if (!response.ok) {
        // Tentar obter erro do backend
        const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        
        // Se for erro 401, token pode estar inválido
        if (response.status === 401) {
          return { success: false, error: 'Token inválido ou expirado' };
        }
        
        return { 
          success: false, 
          error: error.error || `Erro HTTP: ${response.status}` 
        };
      }

      // ✅ Retornar JSON parseado
      return await response.json();
      
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      // Timeout
      if (fetchError.name === 'AbortError') {
        return { success: false, error: 'Timeout na requisição' };
      }
      
      throw fetchError;
    }
    
  } catch (error: any) {
    // ✅ PROTEÇÃO 8: Tratamento de erro global
    // Só loga se for erro inesperado (não relacionado a autenticação)
    if (!error.message?.includes('auth') && !error.message?.includes('token')) {
      console.error('Erro inesperado em fetchWithAuth:', error);
    }
    
    return { 
      success: false, 
      error: error.message || 'Erro na requisição' 
    };
  }
}
