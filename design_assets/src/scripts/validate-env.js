#!/usr/bin/env node

/**
 * 🔒 VALIDADOR DE VARIÁVEIS DE AMBIENTE
 * 
 * Verifica se todas as variáveis de ambiente necessárias estão configuradas
 * antes de fazer build ou deploy.
 * 
 * Uso:
 *   node scripts/validate-env.js
 * 
 * Ou adicione ao package.json:
 *   "prebuild": "node scripts/validate-env.js"
 * 
 * @version 1.0.0
 * @date 2025-10-31
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURAÇÃO
// ============================================

const REQUIRED_VARS = [
  'VITE_SUPABASE_PROJECT_ID',
  'VITE_SUPABASE_ANON_KEY',
];

const OPTIONAL_VARS = [
  'VITE_OPENWEATHER_API_KEY',
  'VITE_GOOGLE_MAPS_API_KEY',
  'VITE_MAPTILER_API_KEY',
];

const ENV_FILE = path.join(process.cwd(), '.env');
const ENV_EXAMPLE_FILE = path.join(process.cwd(), '.env.example');

// ============================================
// CORES PARA OUTPUT
// ============================================

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const log = {
  error: (msg) => console.error(`${colors.red}❌ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.warn(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`${colors.bold}${colors.blue}${msg}${colors.reset}\n`),
};

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Carregar variáveis de ambiente de um arquivo
 */
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const vars = {};

  content.split('\n').forEach(line => {
    // Ignorar comentários e linhas vazias
    if (line.trim().startsWith('#') || !line.trim()) {
      return;
    }

    // Parse KEY=VALUE
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match) {
      const [, key, value] = match;
      vars[key] = value.trim();
    }
  });

  return vars;
}

/**
 * Validar uma variável de ambiente
 */
function validateVar(key, value) {
  if (!value || value === 'seu_project_id_aqui' || value === 'sua_anon_key_aqui') {
    return {
      valid: false,
      reason: 'Valor não configurado ou placeholder detectado'
    };
  }

  // Validações específicas
  if (key === 'VITE_SUPABASE_PROJECT_ID') {
    if (value.length < 10 || !/^[a-z0-9]+$/.test(value)) {
      return {
        valid: false,
        reason: 'Project ID inválido (deve ter 10+ caracteres alfanuméricos)'
      };
    }
  }

  if (key === 'VITE_SUPABASE_ANON_KEY') {
    if (value.length < 50 || !value.startsWith('eyJ')) {
      return {
        valid: false,
        reason: 'Anon key inválida (deve ser um JWT válido)'
      };
    }
  }

  return { valid: true };
}

/**
 * Verificar se .env existe
 */
function checkEnvFile() {
  if (!fs.existsSync(ENV_FILE)) {
    log.error('Arquivo .env não encontrado!');
    log.info('');
    log.info('SOLUÇÃO:');
    log.info('  1. Copie o template: cp .env.example .env');
    log.info('  2. Preencha com suas credenciais do Supabase');
    log.info('  3. Execute este script novamente');
    log.info('');
    return false;
  }

  return true;
}

/**
 * Verificar se .gitignore contém .env
 */
function checkGitignore() {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  
  if (!fs.existsSync(gitignorePath)) {
    log.warning('.gitignore não encontrado!');
    return false;
  }

  const content = fs.readFileSync(gitignorePath, 'utf-8');
  
  if (!content.includes('.env') && !content.includes('*.env')) {
    log.warning('.env não está no .gitignore!');
    log.info('Adicione ".env" ao .gitignore para evitar vazamento de credenciais');
    return false;
  }

  return true;
}

/**
 * Verificar se .env tem permissões seguras (Unix)
 */
function checkFilePermissions() {
  if (process.platform === 'win32') {
    return true; // Skip no Windows
  }

  try {
    const stats = fs.statSync(ENV_FILE);
    const mode = (stats.mode & parseInt('777', 8)).toString(8);
    
    // .env deve ser legível apenas pelo dono (600 ou 400)
    if (mode !== '600' && mode !== '400') {
      log.warning(`.env tem permissões inseguras: ${mode}`);
      log.info('Recomendado: chmod 600 .env');
      return false;
    }
  } catch (err) {
    // Ignorar erro de permissões
  }

  return true;
}

// ============================================
// VALIDAÇÃO PRINCIPAL
// ============================================

function validateEnvironment() {
  log.title('🔒 VALIDADOR DE VARIÁVEIS DE AMBIENTE - SOLOFORTE');

  let hasErrors = false;
  let hasWarnings = false;

  // 1. Verificar se .env existe
  if (!checkEnvFile()) {
    process.exit(1);
  }

  log.success('Arquivo .env encontrado');

  // 2. Verificar .gitignore
  if (!checkGitignore()) {
    hasWarnings = true;
  } else {
    log.success('.env está no .gitignore');
  }

  // 3. Verificar permissões
  if (!checkFilePermissions()) {
    hasWarnings = true;
  } else {
    log.success('Permissões do .env estão seguras');
  }

  // 4. Carregar variáveis
  log.info('Carregando variáveis de ambiente...');
  const envVars = loadEnvFile(ENV_FILE);

  if (!envVars) {
    log.error('Falha ao carregar .env');
    process.exit(1);
  }

  // 5. Validar variáveis obrigatórias
  log.info('\nValidando variáveis obrigatórias:');
  
  const missing = [];
  const invalid = [];

  REQUIRED_VARS.forEach(key => {
    const value = envVars[key] || process.env[key];
    
    if (!value) {
      missing.push(key);
      log.error(`  ${key}: FALTANDO`);
      hasErrors = true;
    } else {
      const validation = validateVar(key, value);
      
      if (!validation.valid) {
        invalid.push({ key, reason: validation.reason });
        log.error(`  ${key}: INVÁLIDO (${validation.reason})`);
        hasErrors = true;
      } else {
        // Mostrar apenas parte do valor (segurança)
        const maskedValue = value.length > 20 
          ? `${value.substring(0, 15)}...`
          : `${value.substring(0, 8)}...`;
        log.success(`  ${key}: ${maskedValue}`);
      }
    }
  });

  // 6. Verificar variáveis opcionais
  log.info('\nVariáveis opcionais:');
  
  OPTIONAL_VARS.forEach(key => {
    const value = envVars[key] || process.env[key];
    
    if (!value) {
      log.info(`  ${key}: não configurado (opcional)`);
    } else {
      log.success(`  ${key}: configurado`);
    }
  });

  // 7. Verificar por valores de exemplo
  log.info('\nVerificando por placeholders:');
  
  const placeholders = [
    'seu_project_id_aqui',
    'sua_anon_key_aqui',
    'sua_key_aqui',
    'YOUR_',
    'EXAMPLE_',
  ];

  let foundPlaceholders = false;
  
  Object.entries(envVars).forEach(([key, value]) => {
    const lowerValue = value.toLowerCase();
    
    if (placeholders.some(p => lowerValue.includes(p.toLowerCase()))) {
      log.warning(`  ${key}: contém placeholder, atualize com valor real`);
      foundPlaceholders = true;
      hasWarnings = true;
    }
  });

  if (!foundPlaceholders) {
    log.success('Nenhum placeholder detectado');
  }

  // 8. Resultado final
  console.log('\n' + '='.repeat(60));
  
  if (hasErrors) {
    log.error('\nVALIDAÇÃO FALHOU!');
    
    if (missing.length > 0) {
      log.error('\nVariáveis faltando:');
      missing.forEach(key => log.error(`  - ${key}`));
    }
    
    if (invalid.length > 0) {
      log.error('\nVariáveis inválidas:');
      invalid.forEach(({ key, reason }) => log.error(`  - ${key}: ${reason}`));
    }
    
    log.info('\nSOLUÇÃO:');
    log.info('  1. Abra o arquivo .env');
    log.info('  2. Preencha as variáveis faltando/inválidas');
    log.info('  3. Execute este script novamente');
    
    process.exit(1);
  }

  if (hasWarnings) {
    log.warning('\nVALIDAÇÃO CONCLUÍDA COM AVISOS');
    log.info('O app deve funcionar, mas revise os avisos acima');
  } else {
    log.success('\n✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!');
    log.success('Todas as variáveis de ambiente estão configuradas corretamente');
  }

  console.log('='.repeat(60) + '\n');
}

// ============================================
// EXECUTAR
// ============================================

try {
  validateEnvironment();
} catch (error) {
  log.error(`Erro inesperado: ${error.message}`);
  process.exit(1);
}
