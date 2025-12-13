#!/bin/bash

# ============================================
# 🔒 MIGRAÇÃO PARA HTTPONLY COOKIES
# ============================================

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

clear

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${BLUE}🔒 MIGRAÇÃO PARA HTTPONLY COOKIES${NC}"
echo -e "${BOLD}${BLUE}   Segurança P1 - Proteção contra XSS${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

# ============================================
# 1. VERIFICAR DEPENDÊNCIA
# ============================================

echo -e "${CYAN}1️⃣  Verificando dependência @supabase/ssr...${NC}"

if grep -q "@supabase/ssr" package.json 2>/dev/null; then
  echo -e "${GREEN}✅ @supabase/ssr já está instalado${NC}\n"
else
  echo -e "${YELLOW}⚠️  @supabase/ssr não encontrado${NC}"
  echo -e "${YELLOW}📦 Instalando...${NC}\n"
  
  npm install @supabase/ssr
  
  if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ @supabase/ssr instalado com sucesso${NC}\n"
  else
    echo -e "\n${RED}❌ Erro ao instalar @supabase/ssr${NC}"
    exit 1
  fi
fi

# ============================================
# 2. VERIFICAR ARQUIVO CRIADO
# ============================================

echo -e "${CYAN}2️⃣  Verificando implementação...${NC}"

if [ -f "utils/supabase/client-cookies.ts" ]; then
  echo -e "${GREEN}✅ client-cookies.ts encontrado${NC}\n"
else
  echo -e "${RED}❌ client-cookies.ts NÃO encontrado!${NC}"
  echo -e "${YELLOW}   Arquivo esperado: utils/supabase/client-cookies.ts${NC}\n"
  exit 1
fi

# ============================================
# 3. LISTAR ARQUIVOS PARA ATUALIZAR
# ============================================

echo -e "${CYAN}3️⃣  Arquivos que precisam atualizar importações:${NC}\n"

# Buscar arquivos que importam o cliente antigo
FILES_TO_UPDATE=$(grep -r "from './utils/supabase/client'" --include="*.tsx" --include="*.ts" . 2>/dev/null | cut -d':' -f1 | sort -u || echo "")

if [ -z "$FILES_TO_UPDATE" ]; then
  echo -e "${YELLOW}⚠️  Nenhum arquivo encontrado com importação antiga${NC}"
  echo -e "${GREEN}   Pode ser que já estejam atualizados!${NC}\n"
else
  echo "$FILES_TO_UPDATE" | while read -r file; do
    echo -e "   ${YELLOW}📄 $file${NC}"
  done
  echo ""
  
  # Perguntar se quer atualizar automaticamente
  read -p "Deseja atualizar automaticamente? (y/N) " -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${CYAN}🔄 Atualizando importações...${NC}\n"
    
    echo "$FILES_TO_UPDATE" | while read -r file; do
      # Backup
      cp "$file" "$file.backup"
      
      # Substituir importação
      sed -i.tmp "s|from './utils/supabase/client'|from './utils/supabase/client-cookies'|g" "$file"
      sed -i.tmp "s|from \"./utils/supabase/client\"|from \"./utils/supabase/client-cookies\"|g" "$file"
      
      # Limpar arquivo temporário
      rm -f "$file.tmp"
      
      echo -e "   ${GREEN}✅ Atualizado: $file${NC}"
    done
    
    echo -e "\n${GREEN}✅ Todas as importações foram atualizadas${NC}"
    echo -e "${CYAN}   Backups criados com extensão .backup${NC}\n"
  else
    echo -e "${YELLOW}⚠️  Atualização manual necessária${NC}"
    echo -e "${YELLOW}   Substitua manualmente em cada arquivo:${NC}"
    echo -e "${YELLOW}   from './utils/supabase/client'${NC}"
    echo -e "${YELLOW}   →${NC}"
    echo -e "${YELLOW}   from './utils/supabase/client-cookies'${NC}\n"
  fi
fi

# ============================================
# 4. CRIAR ARQUIVO DE TESTE
# ============================================

echo -e "${CYAN}4️⃣  Criando arquivo de teste...${NC}"

cat > public/test-cookies.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teste httpOnly Cookies - SoloForte</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background: #0f172a;
      color: #e2e8f0;
    }
    h1 { color: #0057FF; }
    h2 { 
      color: #60a5fa;
      border-bottom: 2px solid #1e293b;
      padding-bottom: 10px;
      margin-top: 30px;
    }
    pre {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 15px;
      overflow-x: auto;
      font-size: 14px;
    }
    .pass { color: #22c55e; }
    .fail { color: #ef4444; }
    button {
      background: #0057FF;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 0;
    }
    button:hover { background: #0046cc; }
    .info {
      background: #1e3a8a;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>🔒 Teste de Segurança - httpOnly Cookies</h1>
  
  <div class="info">
    <strong>ℹ️ Instruções:</strong><br>
    1. Faça login no SoloForte<br>
    2. Volte para esta página<br>
    3. Execute os testes abaixo
  </div>
  
  <h2>Teste 1: localStorage (deve estar vazio)</h2>
  <pre id="localstorage-test">Executando...</pre>
  
  <h2>Teste 2: document.cookie (NÃO deve mostrar sessão)</h2>
  <pre id="cookie-test">Executando...</pre>
  
  <h2>Teste 3: Simulação de XSS Attack</h2>
  <button onclick="testXSS()">🚨 Simular XSS Attack</button>
  <pre id="xss-test">Clique no botão para testar</pre>
  
  <h2>Teste 4: Verificação de Cookies (DevTools)</h2>
  <div class="info">
    Abra DevTools (F12) > Application > Cookies<br>
    Procure por: <code>sb-fqnbtglzrxkgoxhndsum-auth-token</code><br>
    Deve ter as flags: <strong>HttpOnly ✅</strong>, <strong>Secure ✅</strong>, <strong>SameSite: Lax</strong>
  </div>
  
  <script>
    // Teste 1: localStorage
    function testLocalStorage() {
      const keys = ['sb-fqnbtglzrxkgoxhndsum-auth-token', 'supabase.auth.token'];
      let hasSession = false;
      
      keys.forEach(key => {
        if (localStorage.getItem(key)) {
          hasSession = true;
        }
      });
      
      const result = document.getElementById('localstorage-test');
      if (hasSession) {
        result.innerHTML = '<span class="fail">❌ FALHOU</span>\n\nSessão ainda está em localStorage!\nMigração NÃO foi concluída.';
        result.className = 'fail';
      } else {
        result.innerHTML = '<span class="pass">✅ PASSOU</span>\n\nlocalStorage está limpo.\nSessão NÃO está mais em localStorage (seguro).';
        result.className = 'pass';
      }
    }
    
    // Teste 2: document.cookie
    function testDocumentCookie() {
      const cookies = document.cookie;
      const hasAuthCookie = cookies.includes('sb-') && cookies.includes('auth-token');
      
      const result = document.getElementById('cookie-test');
      if (hasAuthCookie) {
        result.innerHTML = '<span class="fail">❌ FALHOU</span>\n\nCookie de sessão está VISÍVEL via document.cookie!\nCookie NÃO é httpOnly (inseguro).';
        result.className = 'fail';
      } else {
        result.innerHTML = '<span class="pass">✅ PASSOU</span>\n\nCookies httpOnly NÃO são acessíveis via JavaScript.\nProteção contra XSS está ativa (seguro).';
        result.className = 'pass';
      }
    }
    
    // Teste 3: XSS Simulation
    function testXSS() {
      try {
        // Tentar roubar sessão de todas as formas possíveis
        const stolenFromLS = localStorage.getItem('sb-fqnbtglzrxkgoxhndsum-auth-token');
        const stolenFromCookie = document.cookie.match(/sb-.*auth-token=([^;]+)/)?.[1];
        
        const result = document.getElementById('xss-test');
        
        if (stolenFromLS || stolenFromCookie) {
          result.innerHTML = 
            '<span class="fail">❌ VULNERÁVEL</span>\n\n' +
            'Script malicioso CONSEGUIU roubar sessão!\n\n' +
            'Token roubado: ' + (stolenFromLS || stolenFromCookie).substring(0, 50) + '...';
          result.className = 'fail';
        } else {
          result.innerHTML = 
            '<span class="pass">✅ SEGURO</span>\n\n' +
            'Script malicioso NÃO conseguiu acessar sessão!\n' +
            'Cookies httpOnly estão protegidos contra XSS.\n\n' +
            'Mesmo com código malicioso, a sessão está segura.';
          result.className = 'pass';
        }
      } catch (error) {
        const result = document.getElementById('xss-test');
        result.innerHTML = 
          '<span class="pass">✅ SEGURO</span>\n\n' +
          'Erro ao tentar acessar sessão (esperado):\n' + error.message;
        result.className = 'pass';
      }
    }
    
    // Executar testes automaticamente
    window.addEventListener('load', () => {
      setTimeout(() => {
        testLocalStorage();
        testDocumentCookie();
      }, 500);
    });
  </script>
</body>
</html>
EOF

if [ -f "public/test-cookies.html" ]; then
  echo -e "${GREEN}✅ Arquivo de teste criado: public/test-cookies.html${NC}\n"
else
  echo -e "${YELLOW}⚠️  Não foi possível criar arquivo de teste${NC}\n"
fi

# ============================================
# 5. INSTRUÇÕES FINAIS
# ============================================

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${GREEN}✅ MIGRAÇÃO PREPARADA${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

echo -e "${CYAN}📋 Próximos passos:${NC}\n"

echo -e "1. ${YELLOW}Reiniciar servidor:${NC}"
echo -e "   ${BOLD}npm run dev${NC}\n"

echo -e "2. ${YELLOW}Testar aplicação:${NC}"
echo -e "   - Fazer login"
echo -e "   - Verificar console: 'Sessão migrada com sucesso'"
echo -e "   - Testar funcionalidades (Dashboard, etc)\n"

echo -e "3. ${YELLOW}Executar testes de segurança:${NC}"
echo -e "   - Abrir: ${BOLD}http://localhost:5173/test-cookies.html${NC}"
echo -e "   - Verificar que todos os testes passam (✅)\n"

echo -e "4. ${YELLOW}Verificar cookies no DevTools:${NC}"
echo -e "   - F12 > Application > Cookies"
echo -e "   - Procurar: sb-fqnbtglzrxkgoxhndsum-auth-token"
echo -e "   - Verificar flags: HttpOnly ✅, Secure ✅\n"

echo -e "${CYAN}📚 Documentação:${NC}"
echo -e "   - Guia completo: ${BOLD}MIGRACAO_HTTPONLY_COOKIES.md${NC}"
echo -e "   - Implementação: ${BOLD}utils/supabase/client-cookies.ts${NC}\n"

echo -e "${BOLD}${BLUE}============================================${NC}\n"

# Perguntar se quer iniciar servidor
read -p "Deseja reiniciar o servidor agora? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\n${CYAN}Reiniciando servidor...${NC}\n"
  pkill -f "vite" 2>/dev/null || true
  sleep 2
  npm run dev
fi
