#!/bin/bash

# ============================================
# ⚡ FIX RÁPIDO - ERRO import.meta.env
# ============================================

# Cores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

clear

echo -e "${BOLD}${CYAN}⚡ FIX RÁPIDO - ERRO import.meta.env${NC}\n"

# 1. Verificar se .env existe
if [ ! -f .env ]; then
  echo -e "${YELLOW}📝 Criando .env...${NC}"
  if [ -f .env.example ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ .env criado${NC}"
    echo -e "${YELLOW}⚠️  Edite o .env e preencha suas credenciais${NC}\n"
    nano .env || vi .env || code .env
  fi
fi

# 2. Limpar cache do Vite
echo -e "${YELLOW}🧹 Limpando cache do Vite...${NC}"
rm -rf node_modules/.vite
echo -e "${GREEN}✅ Cache limpo${NC}\n"

# 3. Matar processos Node antigos
echo -e "${YELLOW}🔫 Matando processos antigos...${NC}"
pkill -f "vite" 2>/dev/null || true
echo -e "${GREEN}✅ Processos limpos${NC}\n"

# 4. Instruções finais
echo -e "${BOLD}${GREEN}✅ TUDO PRONTO!${NC}\n"

echo -e "${CYAN}Agora execute:${NC}"
echo -e "  ${BOLD}npm run dev${NC}\n"

echo -e "${CYAN}Depois:${NC}"
echo -e "  ${BOLD}F5${NC} no navegador para recarregar\n"

echo -e "${YELLOW}💡 Dica: O erro ocorreu porque o Vite não recarrega${NC}"
echo -e "${YELLOW}   variáveis de ambiente automaticamente.${NC}"
echo -e "${YELLOW}   Sempre reinicie após editar .env!${NC}\n"

# Perguntar se quer iniciar automaticamente
read -p "Deseja iniciar o servidor agora? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\n${CYAN}Iniciando servidor...${NC}\n"
  npm run dev
fi
