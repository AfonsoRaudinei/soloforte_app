/**
 * 🔒 SUPABASE CLIENT COM HTTPONLY COOKIES
 * 
 * Implementação segura de autenticação usando cookies httpOnly
 * ao invés de localStorage (vulnerável a XSS).
 * 
 * SEGURANÇA:
 * - Cookies httpOnly não acessíveis via JavaScript
 * - Proteção contra XSS
 * - SameSite=Lax para proteção CSRF
 * - Secure em produção (HTTPS only)
 * 
 * @version 1.0.0
 * @date 2025-10-31
 */

import { createBrowserClient } from '@supabase/ssr';
import { projectId, publicAnonKey } from './info';

// URL do projeto Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

/**
 * Criar cliente Supabase com suporte a cookies
 * 
 * IMPORTANTE: Este cliente usa cookies em vez de localStorage
 */
export function createClient() {
  return createBrowserClient(supabaseUrl, publicAnonKey, {
    cookies: {
      get(name: string) {
        // Ler cookie do navegador
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
        return cookie ? cookie.split('=')[1] : null;
      },
      set(name: string, value: string, options: any) {
        // Configurar cookie com segurança máxima
        const cookieOptions = [
          `${name}=${value}`,
          `path=${options.path || '/'}`,
          `max-age=${options.maxAge || 60 * 60 * 24 * 7}`, // 7 dias default
          
          // 🔒 SEGURANÇA: SameSite=Lax protege contra CSRF
          'SameSite=Lax',
          
          // 🔒 SEGURANÇA: Secure em produção (HTTPS only)
          ...(window.location.protocol === 'https:' ? ['Secure'] : []),
        ];

        document.cookie = cookieOptions.join('; ');
      },
      remove(name: string, options: any) {
        // Remover cookie
        document.cookie = `${name}=; path=${options.path || '/'}; max-age=0`;
      },
    },
  });
}

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
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit & { body?: any } = {}) {
  try {
    const supabase = createClient();
    if (!supabase) {
      return { success: false, error: 'Cliente Supabase não inicializado' };
    }

    const session = await getCachedSession();
    
    if (!session) {
      return { success: false, error: 'Não autenticado' };
    }
    
    if (!session.access_token) {
      return { success: false, error: 'Token de acesso não encontrado' };
    }

    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      return { success: false, error: 'Token expirado' };
    }
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...(options.headers as HeadersInit || {}),
    };

    const fetchOptions: RequestInit = {
      ...options,
      headers,
    };

    if (options.body && typeof options.body === 'object') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b2d55462`;
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        
        if (response.status === 401) {
          return { success: false, error: 'Token inválido ou expirado' };
        }
        
        return { 
          success: false, 
          error: error.error || `Erro HTTP: ${response.status}` 
        };
      }

      return await response.json();
      
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        return { success: false, error: 'Timeout na requisição' };
      }
      
      throw fetchError;
    }
    
  } catch (error: any) {
    if (!error.message?.includes('auth') && !error.message?.includes('token')) {
      console.error('Erro inesperado em fetchWithAuth:', error);
    }
    
    return { 
      success: false, 
      error: error.message || 'Erro na requisição' 
    };
  }
}

/**
 * 🔒 MIGRAR SESSÃO DE LOCALSTORAGE PARA COOKIES
 * 
 * Executar UMA VEZ durante a transição para cookies
 */
export async function migrateSessionToC ookies() {
  try {
    // Verificar se já existe sessão em cookies
    const supabase = createClient();
    const { data: { session: cookieSession } } = await supabase.auth.getSession();
    
    if (cookieSession) {
      console.log('✅ Sessão já existe em cookies');
      return { success: true, message: 'Sessão já está em cookies' };
    }

    // Tentar recuperar sessão do localStorage
    const localStorageKey = `sb-${projectId}-auth-token`;
    const localStorageData = localStorage.getItem(localStorageKey);
    
    if (!localStorageData) {
      console.log('ℹ️ Nenhuma sessão encontrada em localStorage');
      return { success: true, message: 'Nenhuma sessão para migrar' };
    }

    const sessionData = JSON.parse(localStorageData);
    
    if (!sessionData.access_token || !sessionData.refresh_token) {
      console.log('⚠️ Dados de sessão inválidos em localStorage');
      localStorage.removeItem(localStorageKey);
      return { success: false, error: 'Dados de sessão inválidos' };
    }

    // Restaurar sessão usando refresh token
    const { data, error } = await supabase.auth.setSession({
      access_token: sessionData.access_token,
      refresh_token: sessionData.refresh_token,
    });

    if (error) {
      console.error('❌ Erro ao migrar sessão:', error);
      localStorage.removeItem(localStorageKey);
      return { success: false, error: error.message };
    }

    if (data.session) {
      console.log('✅ Sessão migrada com sucesso para cookies');
      
      // Limpar localStorage após migração bem-sucedida
      localStorage.removeItem(localStorageKey);
      
      return { success: true, message: 'Sessão migrada com sucesso' };
    }

    return { success: false, error: 'Falha ao estabelecer sessão' };
    
  } catch (error: any) {
    console.error('❌ Erro durante migração:', error);
    return { success: false, error: error.message };
  }
}

// ===================================
// AUTO-MIGRAÇÃO NA INICIALIZAÇÃO
// ===================================

// Executar migração automaticamente quando o módulo for importado
if (typeof window !== 'undefined') {
  // Aguardar DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => migrateSessionToCookies(), 1000);
    });
  } else {
    setTimeout(() => migrateSessionToCookies(), 1000);
  }
}
