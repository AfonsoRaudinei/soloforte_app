#!/bin/bash

# ============================================
# 🔍 DIAGNÓSTICO DE VARIÁVEIS DE AMBIENTE
# ============================================

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

clear

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${BLUE}🔍 DIAGNÓSTICO DE VARIÁVEIS DE AMBIENTE${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

# ============================================
# 1. VERIFICAR .env
# ============================================

echo -e "${CYAN}1️⃣  Verificando arquivo .env...${NC}"

if [ -f .env ]; then
  echo -e "${GREEN}✅ Arquivo .env encontrado${NC}"
  
  # Verificar permissões (Unix)
  if [ "$(uname)" != "Darwin" ] && [ "$(uname)" != "Linux" ]; then
    echo -e "${YELLOW}⚠️  Verificação de permissões desabilitada no Windows${NC}"
  else
    perms=$(stat -f "%OLp" .env 2>/dev/null || stat -c "%a" .env 2>/dev/null)
    if [ "$perms" = "600" ] || [ "$perms" = "400" ]; then
      echo -e "${GREEN}✅ Permissões seguras: ${perms}${NC}"
    else
      echo -e "${YELLOW}⚠️  Permissões inseguras: ${perms}${NC}"
      echo -e "${YELLOW}   Recomendado: chmod 600 .env${NC}"
    fi
  fi
else
  echo -e "${RED}❌ Arquivo .env NÃO encontrado!${NC}"
  echo -e "${YELLOW}📝 Criando .env a partir do .env.example...${NC}\n"
  
  if [ -f .env.example ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env criado${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE: Edite o .env e preencha suas credenciais${NC}"
  else
    echo -e "${RED}❌ .env.example não encontrado!${NC}"
    exit 1
  fi
fi

echo ""

# ============================================
# 2. VERIFICAR CONTEÚDO DO .env
# ============================================

echo -e "${CYAN}2️⃣  Verificando conteúdo do .env...${NC}"

if [ -f .env ]; then
  # Verificar se tem as variáveis necessárias
  if grep -q "VITE_SUPABASE_PROJECT_ID" .env; then
    project_id=$(grep "VITE_SUPABASE_PROJECT_ID" .env | cut -d '=' -f2)
    if [ -n "$project_id" ] && [ "$project_id" != "seu_project_id_aqui" ]; then
      echo -e "${GREEN}✅ VITE_SUPABASE_PROJECT_ID: ${project_id:0:10}...${NC}"
    else
      echo -e "${RED}❌ VITE_SUPABASE_PROJECT_ID: não configurado ou placeholder${NC}"
    fi
  else
    echo -e "${RED}❌ VITE_SUPABASE_PROJECT_ID: FALTANDO${NC}"
  fi
  
  if grep -q "VITE_SUPABASE_ANON_KEY" .env; then
    anon_key=$(grep "VITE_SUPABASE_ANON_KEY" .env | cut -d '=' -f2)
    if [ -n "$anon_key" ] && [ "$anon_key" != "sua_anon_key_aqui" ]; then
      echo -e "${GREEN}✅ VITE_SUPABASE_ANON_KEY: ${anon_key:0:20}...${NC}"
    else
      echo -e "${RED}❌ VITE_SUPABASE_ANON_KEY: não configurado ou placeholder${NC}"
    fi
  else
    echo -e "${RED}❌ VITE_SUPABASE_ANON_KEY: FALTANDO${NC}"
  fi
  
  # Verificar formato (espaços, aspas)
  if grep -q "= " .env; then
    echo -e "${YELLOW}⚠️  Espaços após '=' detectados (pode causar problemas)${NC}"
  fi
  
  if grep -q '="' .env; then
    echo -e "${YELLOW}⚠️  Aspas desnecessárias detectadas${NC}"
  fi
else
  echo -e "${RED}❌ .env não existe${NC}"
fi

echo ""

# ============================================
# 3. VERIFICAR .gitignore
# ============================================

echo -e "${CYAN}3️⃣  Verificando .gitignore...${NC}"

if [ -f .gitignore ]; then
  if grep -q "^\.env$" .gitignore || grep -q "^\*\.env$" .gitignore; then
    echo -e "${GREEN}✅ .env está no .gitignore${NC}"
  else
    echo -e "${RED}❌ .env NÃO está no .gitignore!${NC}"
    echo -e "${YELLOW}   Adicionando...${NC}"
    echo -e "\n# Environment variables\n.env\n.env.local\n.env.*.local" >> .gitignore
    echo -e "${GREEN}✅ .gitignore atualizado${NC}"
  fi
else
  echo -e "${RED}❌ .gitignore não encontrado${NC}"
fi

echo ""

# ============================================
# 4. VERIFICAR CACHE DO VITE
# ============================================

echo -e "${CYAN}4️⃣  Verificando cache do Vite...${NC}"

if [ -d "node_modules/.vite" ]; then
  cache_size=$(du -sh node_modules/.vite 2>/dev/null | cut -f1)
  echo -e "${YELLOW}⚠️  Cache do Vite existe: ${cache_size}${NC}"
  
  read -p "Deseja limpar o cache? (y/N) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf node_modules/.vite
    echo -e "${GREEN}✅ Cache limpo${NC}"
  fi
else
  echo -e "${GREEN}✅ Sem cache do Vite${NC}"
fi

echo ""

# ============================================
# 5. VERIFICAR SERVIDOR RODANDO
# ============================================

echo -e "${CYAN}5️⃣  Verificando servidor...${NC}"

if lsof -i:5173 > /dev/null 2>&1 || netstat -an 2>/dev/null | grep -q ":5173"; then
  echo -e "${YELLOW}⚠️  Servidor detectado na porta 5173${NC}"
  echo -e "${YELLOW}   IMPORTANTE: O servidor PRECISA ser reiniciado!${NC}"
  
  read -p "Deseja parar o servidor agora? (y/N) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    pkill -f "vite" || true
    echo -e "${GREEN}✅ Servidor parado${NC}"
    echo -e "${CYAN}   Execute: npm run dev${NC}"
  else
    echo -e "${YELLOW}   Lembre-se: Ctrl+C para parar, npm run dev para reiniciar${NC}"
  fi
else
  echo -e "${GREEN}✅ Nenhum servidor rodando${NC}"
  echo -e "${CYAN}   Execute: npm run dev${NC}"
fi

echo ""

# ============================================
# 6. EXECUTAR VALIDADOR NODEJS
# ============================================

echo -e "${CYAN}6️⃣  Executando validador Node.js...${NC}\n"

if [ -f scripts/validate-env.js ]; then
  node scripts/validate-env.js
  
  if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Validação Node.js passou${NC}"
  else
    echo -e "\n${RED}❌ Validação Node.js falhou${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  Validador não encontrado: scripts/validate-env.js${NC}"
fi

echo ""

# ============================================
# 7. RESUMO E AÇÕES
# ============================================

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${BLUE}📋 RESUMO E PRÓXIMAS AÇÕES${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

echo -e "${CYAN}✅ Checklist:${NC}"
echo -e "  - .env existe: $([ -f .env ] && echo '✅' || echo '❌')"
echo -e "  - .env configurado: $(grep -q "VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum" .env 2>/dev/null && echo '✅' || echo '❌')"
echo -e "  - .gitignore protege .env: $(grep -q "^\.env$" .gitignore 2>/dev/null && echo '✅' || echo '❌')"
echo -e "  - Cache limpo: $([ ! -d "node_modules/.vite" ] && echo '✅' || echo '⚠️')"

echo ""

echo -e "${BOLD}${YELLOW}🔴 AÇÕES NECESSÁRIAS:${NC}\n"

# Verificar se precisa de ação
needs_action=0

if [ ! -f .env ]; then
  echo -e "${RED}1. Criar .env:${NC}"
  echo -e "   cp .env.example .env"
  echo -e "   nano .env"
  needs_action=1
fi

if ! grep -q "VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum" .env 2>/dev/null; then
  echo -e "${RED}2. Configurar .env com credenciais corretas${NC}"
  needs_action=1
fi

if lsof -i:5173 > /dev/null 2>&1 || netstat -an 2>/dev/null | grep -q ":5173"; then
  echo -e "${RED}3. Reiniciar servidor:${NC}"
  echo -e "   Ctrl+C (parar)"
  echo -e "   npm run dev (reiniciar)"
  needs_action=1
fi

if [ $needs_action -eq 0 ]; then
  echo -e "${GREEN}✅ Tudo pronto!${NC}"
  echo -e "${CYAN}Execute: npm run dev${NC}"
else
  echo -e "\n${YELLOW}Após completar as ações, execute:${NC}"
  echo -e "   ${CYAN}npm run dev${NC}"
fi

echo ""

echo -e "${BOLD}${BLUE}============================================${NC}\n"

# Perguntar se quer ver o .env
read -p "Deseja ver o conteúdo do .env? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo -e "${CYAN}Conteúdo do .env:${NC}"
  echo -e "${YELLOW}----------------------------------------${NC}"
  cat .env | grep -v "^#" | grep -v "^$"
  echo -e "${YELLOW}----------------------------------------${NC}"
fi
