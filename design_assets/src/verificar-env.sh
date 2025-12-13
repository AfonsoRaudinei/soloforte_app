#!/bin/bash

# ============================================
# 🔍 VERIFICAR CONFIGURAÇÃO .env
# ============================================

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

clear

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}🔍 VERIFICAÇÃO DO ARQUIVO .env${NC}"
echo -e "${BLUE}============================================${NC}\n"

# 1. Verificar se .env existe
if [ -f ".env" ]; then
  echo -e "${GREEN}✅ Arquivo .env encontrado${NC}\n"
else
  echo -e "${RED}❌ Arquivo .env NÃO encontrado${NC}\n"
  echo -e "${YELLOW}Solução:${NC}"
  echo -e "  cp .env.example .env"
  echo -e "  # Edite .env com suas credenciais"
  echo -e "  npm run dev\n"
  exit 1
fi

# 2. Verificar conteúdo
echo -e "${BLUE}📋 Conteúdo do .env:${NC}\n"

if grep -q "VITE_SUPABASE_PROJECT_ID" .env; then
  PROJECT_ID=$(grep "VITE_SUPABASE_PROJECT_ID" .env | cut -d '=' -f 2)
  echo -e "  ${GREEN}✅ VITE_SUPABASE_PROJECT_ID${NC}"
  echo -e "     Valor: ${PROJECT_ID:0:10}...${NC}"
else
  echo -e "  ${RED}❌ VITE_SUPABASE_PROJECT_ID não encontrado${NC}"
fi

echo ""

if grep -q "VITE_SUPABASE_ANON_KEY" .env; then
  ANON_KEY=$(grep "VITE_SUPABASE_ANON_KEY" .env | cut -d '=' -f 2)
  echo -e "  ${GREEN}✅ VITE_SUPABASE_ANON_KEY${NC}"
  echo -e "     Valor: ${ANON_KEY:0:30}...${NC}"
else
  echo -e "  ${RED}❌ VITE_SUPABASE_ANON_KEY não encontrado${NC}"
fi

echo ""

# 3. Verificar .gitignore
if [ -f ".gitignore" ]; then
  if grep -q "^\.env$" .gitignore; then
    echo -e "${GREEN}✅ .env está no .gitignore (seguro)${NC}\n"
  else
    echo -e "${YELLOW}⚠️  .env NÃO está no .gitignore${NC}"
    echo -e "   Adicionando agora...\n"
    echo ".env" >> .gitignore
    echo -e "${GREEN}✅ Adicionado!${NC}\n"
  fi
else
  echo -e "${YELLOW}⚠️  .gitignore não encontrado${NC}\n"
fi

# 4. Instruções
echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}✅ VERIFICAÇÃO CONCLUÍDA${NC}"
echo -e "${BLUE}============================================${NC}\n"

echo -e "${YELLOW}Próximos passos:${NC}\n"
echo -e "1. ${GREEN}Se o servidor está rodando:${NC}"
echo -e "   Ctrl+C (parar)"
echo -e "   npm run dev (reiniciar)\n"

echo -e "2. ${GREEN}Verificar no navegador:${NC}"
echo -e "   Abra DevTools (F12) > Console"
echo -e "   Procure por: ${GREEN}✅ Supabase: Credenciais carregadas do .env${NC}\n"

echo -e "3. ${GREEN}Se aparecer aviso:${NC}"
echo -e "   ${YELLOW}⚠️  Supabase: Usando fallback${NC}"
echo -e "   Significa que o .env não foi carregado"
echo -e "   Solução: Reinicie o servidor\n"

echo -e "${BLUE}============================================${NC}\n"
