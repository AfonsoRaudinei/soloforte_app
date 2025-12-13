#!/bin/bash

# ============================================
# 🔍 VERIFICAÇÃO RÁPIDA DE ROTAÇÃO
# ============================================

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Verificando status da rotação de credenciais..."
echo ""

# Key antiga (VAZADA)
OLD_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA"

# Verificar se .env existe
if [ ! -f .env ]; then
  echo -e "${RED}❌ Arquivo .env não encontrado!${NC}"
  echo "Execute: cp .env.example .env"
  exit 1
fi

# Extrair key atual
CURRENT_KEY=$(grep VITE_SUPABASE_ANON_KEY .env | cut -d '=' -f2)

# Comparar
if [ "$CURRENT_KEY" = "$OLD_KEY" ]; then
  echo -e "${RED}❌ PERIGO: Ainda usando credenciais ANTIGAS (vazadas)!${NC}"
  echo ""
  echo -e "${YELLOW}AÇÃO NECESSÁRIA:${NC}"
  echo "1. Leia: ROTACIONAR_AGORA.md"
  echo "2. Execute a rotação no Supabase Dashboard"
  echo "3. Atualize o .env com a nova key"
  echo ""
  exit 1
else
  echo -e "${GREEN}✅ Credenciais foram atualizadas!${NC}"
  echo ""
  echo "Key antiga (VAZADA): ${OLD_KEY:0:30}..."
  echo "Key atual (NOVA):    ${CURRENT_KEY:0:30}..."
  echo ""
  echo -e "${GREEN}Status: SEGURO ✅${NC}"
  echo ""
  echo "Próximos passos:"
  echo "1. Testar: npm run dev"
  echo "2. Atualizar produção (Vercel/Netlify)"
  echo "3. Executar: bash VERIFICAR_CREDENCIAIS_ROTACIONADAS.sh"
  echo ""
fi
