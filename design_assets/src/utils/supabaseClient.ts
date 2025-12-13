/**
 * 🔧 CLIENTE SUPABASE - SOLOFORTE
 * 
 * Export simplificado do cliente Supabase para uso em toda a aplicação
 */

import { createClient } from './supabase/client';

// Criar e exportar cliente Supabase (singleton)
export const supabase = createClient();

// Export default para compatibilidade
export default supabase;
