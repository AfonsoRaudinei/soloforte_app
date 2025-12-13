#!/bin/bash

# ============================================
# ⚡ REINICIAR SERVIDOR - CARREGAR .env
# ============================================

# Cores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

clear

echo -e "${BOLD}${CYAN}⚡ REINICIANDO SERVIDOR${NC}\n"

# 1. Parar processos antigos
echo -e "${YELLOW}🔫 Parando processos Vite...${NC}"
pkill -f "vite" 2>/dev/null || true
sleep 1

# 2. Limpar cache
echo -e "${YELLOW}🧹 Limpando cache...${NC}"
rm -rf node_modules/.vite 2>/dev/null || true

# 3. Validar .env
echo -e "${YELLOW}✅ Validando .env...${NC}"
if [ -f scripts/validate-env.js ]; then
  node scripts/validate-env.js
fi

echo ""
echo -e "${BOLD}${GREEN}✅ PRONTO PARA REINICIAR!${NC}\n"

echo -e "${CYAN}Agora execute:${NC}"
echo -e "  ${BOLD}npm run dev${NC}\n"

echo -e "${CYAN}Depois:${NC}"
echo -e "  ${BOLD}F5${NC} no navegador\n"

echo -e "${CYAN}Você deve ver no console:${NC}"
echo -e "  ${GREEN}✅ Supabase credentials loaded from .env variables${NC}\n"

# Perguntar se quer iniciar automaticamente
read -p "Deseja iniciar o servidor agora? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\n${CYAN}Iniciando servidor...${NC}\n"
  npm run dev
fi
