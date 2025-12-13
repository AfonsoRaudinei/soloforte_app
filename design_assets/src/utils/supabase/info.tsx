/**
 * 🔒 SUPABASE CREDENTIALS - ENVIRONMENT VARIABLES
 * 
 * As credenciais agora vêm de variáveis de ambiente (.env)
 * 
 * Para configurar:
 * 1. Copie .env.example para .env
 * 2. Preencha com suas credenciais do Supabase
 * 3. Reinicie o servidor de desenvolvimento
 * 
 * @version 2.2 - Fallback silencioso
 * @date 2025-10-31
 */

// Fallback temporário (caso .env não esteja configurado)
const FALLBACK_PROJECT_ID = 'fqnbtglzrxkgoxhndsum';
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA';

/**
 * Obter variável de ambiente com fallback
 */
function getEnvVar(key: string, fallback: string): string {
  // Verificar se import.meta.env está disponível
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const value = import.meta.env[key];
    if (value) {
      return value;
    }
  }
  
  // Usar fallback silenciosamente
  return fallback;
}

// Exportar credenciais
export const projectId = getEnvVar('VITE_SUPABASE_PROJECT_ID', FALLBACK_PROJECT_ID);
export const publicAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', FALLBACK_ANON_KEY);

// Log de confirmação (apenas em dev, uma única vez)
if (typeof window !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
  const usingEnv = import.meta.env.VITE_SUPABASE_PROJECT_ID ? true : false;
  
  // Mostrar apenas uma vez usando sessionStorage
  const key = 'supabase_env_logged';
  if (!sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, 'true');
    
    if (usingEnv) {
      console.log('✅ Supabase: Credenciais carregadas do .env');
    } else {
      console.warn('⚠️ Supabase: Usando fallback (arquivo .env não encontrado)');
      console.warn('   Solução: cp .env.example .env e reinicie o servidor');
    }
  }
}
