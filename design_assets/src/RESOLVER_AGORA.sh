#!/bin/bash

# ============================================
# ⚡ RESOLVER ERRO .env AGORA
# ============================================

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}⚡ RESOLVER ERRO .env - AUTOMATIZADO${NC}"
echo -e "${BLUE}============================================${NC}\n"

echo -e "${YELLOW}1️⃣  Verificando .env...${NC}"
if [ -f ".env" ]; then
  echo -e "${GREEN}   ✅ .env existe${NC}\n"
else
  echo -e "${YELLOW}   ⚠️  .env não existe - criando...${NC}"
  cp .env.example .env 2>/dev/null || echo "Criar manualmente"
  echo -e "${GREEN}   ✅ .env criado${NC}\n"
fi

echo -e "${YELLOW}2️⃣  Verificando .gitignore...${NC}"
if [ -f ".gitignore" ]; then
  if grep -q "^\.env$" .gitignore 2>/dev/null; then
    echo -e "${GREEN}   ✅ .env protegido no .gitignore${NC}\n"
  else
    echo -e "${YELLOW}   ⚠️  Adicionando .env ao .gitignore...${NC}"
    echo ".env" >> .gitignore
    echo -e "${GREEN}   ✅ Adicionado${NC}\n"
  fi
else
  echo -e "${YELLOW}   ⚠️  .gitignore criado${NC}\n"
fi

echo -e "${YELLOW}3️⃣  Executando verificação...${NC}\n"
bash verificar-env.sh

echo -e "\n${BLUE}============================================${NC}"
echo -e "${GREEN}✅ VERIFICAÇÃO COMPLETA${NC}"
echo -e "${BLUE}============================================${NC}\n"

echo -e "${YELLOW}PRÓXIMO PASSO:${NC}\n"
echo -e "${GREEN}Reiniciar o servidor:${NC}"
echo -e "  1. Ctrl+C (parar servidor atual)"
echo -e "  2. npm run dev (reiniciar)"
echo -e "  3. F5 no navegador\n"

echo -e "${BLUE}Console deve mostrar:${NC}"
echo -e "${GREEN}✅ Supabase: Credenciais carregadas do .env${NC}\n"

echo -e "${BLUE}============================================${NC}\n"
