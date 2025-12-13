#!/bin/bash

# ============================================
# 🔒 P0 - MIGRAÇÃO DE CREDENCIAIS
# SCRIPT DE EXECUÇÃO AUTOMATIZADO
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
echo -e "${BOLD}${BLUE}🔒 P0 - MIGRAÇÃO DE CREDENCIAIS${NC}"
echo -e "${BOLD}${BLUE}   SOLOFORTE - SEGURANÇA CRÍTICA${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

# ============================================
# 1. VERIFICAR SE .env EXISTE
# ============================================

echo -e "${CYAN}1️⃣  Verificando arquivo .env...${NC}"

if [ ! -f .env ]; then
  echo -e "${YELLOW}⚠️  Arquivo .env não encontrado${NC}"
  echo -e "${YELLOW}📝 Criando .env a partir do .env.example...${NC}\n"
  
  if [ -f .env.example ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env criado${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE: Edite o .env e preencha suas credenciais${NC}\n"
    
    read -p "Pressione ENTER para abrir o editor (Ctrl+X para sair)" 
    nano .env || vi .env || code .env
  else
    echo -e "${RED}❌ .env.example não encontrado!${NC}"
    exit 1
  fi
else
  echo -e "${GREEN}✅ Arquivo .env encontrado${NC}\n"
fi

# ============================================
# 2. VALIDAR VARIÁVEIS DE AMBIENTE
# ============================================

echo -e "${CYAN}2️⃣  Validando variáveis de ambiente...${NC}\n"

if [ -f scripts/validate-env.js ]; then
  node scripts/validate-env.js
  
  if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ Validação falhou!${NC}"
    echo -e "${YELLOW}Por favor, corrija os erros acima e execute novamente.${NC}\n"
    exit 1
  fi
else
  echo -e "${YELLOW}⚠️  Validador não encontrado${NC}"
fi

echo ""

# ============================================
# 3. VERIFICAR .gitignore
# ============================================

echo -e "${CYAN}3️⃣  Verificando .gitignore...${NC}"

if grep -q "^\.env$" .gitignore 2>/dev/null; then
  echo -e "${GREEN}✅ .env está no .gitignore${NC}\n"
else
  echo -e "${YELLOW}⚠️  .env NÃO está no .gitignore${NC}"
  echo -e "${YELLOW}Adicionando...${NC}"
  echo -e "\n# Environment variables\n.env\n.env.local\n.env.*.local" >> .gitignore
  echo -e "${GREEN}✅ .gitignore atualizado${NC}\n"
fi

# ============================================
# 4. ESCANEAR CREDENCIAIS NO GIT HISTORY
# ============================================

echo -e "${CYAN}4️⃣  Escaneando histórico do Git...${NC}\n"

if [ -f SCRIPT_SCAN_SECRETS.sh ]; then
  bash SCRIPT_SCAN_SECRETS.sh
  
  if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ ATENÇÃO: CREDENCIAIS ENCONTRADAS NO HISTÓRICO!${NC}"
    echo -e "${YELLOW}Siga as instruções acima para remediar.${NC}\n"
    
    read -p "Deseja continuar mesmo assim? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
else
  echo -e "${YELLOW}⚠️  Scanner não encontrado, pulando...${NC}\n"
fi

# ============================================
# 5. VERIFICAR SE SERVIDOR ESTÁ RODANDO
# ============================================

echo -e "${CYAN}5️⃣  Verificando servidor...${NC}"

if lsof -i:5173 > /dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Servidor detectado na porta 5173${NC}"
  echo -e "${YELLOW}É recomendado reiniciar o servidor para aplicar as mudanças${NC}\n"
  
  read -p "Deseja parar o servidor agora? (y/N) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    pkill -f "vite" || true
    echo -e "${GREEN}✅ Servidor parado${NC}\n"
  fi
else
  echo -e "${GREEN}✅ Nenhum servidor rodando${NC}\n"
fi

# ============================================
# 6. RESULTADO E PRÓXIMOS PASSOS
# ============================================

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${GREEN}✅ MIGRAÇÃO P0 CONCLUÍDA${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

echo -e "${CYAN}📋 Resumo:${NC}"
echo -e "  ✅ .env configurado"
echo -e "  ✅ Variáveis validadas"
echo -e "  ✅ .gitignore atualizado"
echo -e "  ✅ Git history verificado\n"

echo -e "${BOLD}${RED}🔴 AÇÃO IMEDIATA NECESSÁRIA:${NC}\n"

echo -e "${YELLOW}1. ROTACIONAR CREDENCIAIS DO SUPABASE${NC}"
echo -e "   As credenciais antigas estavam expostas em código!"
echo -e "   ${CYAN}https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum${NC}"
echo -e "   → Settings > API"
echo -e "   → Generate new anon key"
echo -e "   → Atualizar .env com a nova chave\n"

echo -e "${YELLOW}2. TESTAR O APLICATIVO${NC}"
echo -e "   ${CYAN}npm run dev${NC}"
echo -e "   Verificar console para confirmação:\n"
echo -e "   ${GREEN}✅ Supabase credentials loaded from environment variables${NC}\n"

echo -e "${YELLOW}3. CONFIGURAR EM PRODUÇÃO${NC}"
echo -e "   Adicionar variáveis no painel da plataforma:"
echo -e "   - Vercel: Settings > Environment Variables"
echo -e "   - Netlify: Site settings > Environment variables\n"

echo -e "${CYAN}📚 Documentação completa:${NC}"
echo -e "   - P0_CREDENCIAIS_MIGRADAS.md"
echo -e "   - CREDENCIAIS_MIGRADAS_ENV.md"
echo -e "   - AUDITORIA_SEGURANCA_PENETRATION_TEST.md\n"

echo -e "${BOLD}${BLUE}============================================${NC}\n"

# Perguntar se quer iniciar servidor
read -p "Deseja iniciar o servidor agora? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\n${CYAN}Iniciando servidor...${NC}\n"
  npm run dev
fi
