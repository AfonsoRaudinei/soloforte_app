#!/bin/bash

# ============================================
# 🔍 SCANNER DE CREDENCIAIS NO GIT HISTORY
# ============================================
#
# Este script verifica se credenciais foram
# expostas no histórico do Git
#
# Uso:
#   bash SCRIPT_SCAN_SECRETS.sh
#
# ============================================

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}🔍 SCANNER DE CREDENCIAIS - SOLOFORTE${NC}"
echo -e "${BLUE}============================================${NC}\n"

# ============================================
# 1. VERIFICAR SE ESTÁ EM UM REPOSITÓRIO GIT
# ============================================

if [ ! -d .git ]; then
  echo -e "${RED}❌ Não é um repositório Git${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Repositório Git detectado${NC}\n"

# ============================================
# 2. PROCURAR POR CREDENCIAIS NO HISTÓRICO
# ============================================

echo -e "${YELLOW}🔍 Procurando por credenciais expostas...${NC}\n"

# Padrões para procurar
PATTERNS=(
  "VITE_SUPABASE_PROJECT_ID"
  "VITE_SUPABASE_ANON_KEY"
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"  # JWT header
  "fqnbtglzrxkgoxhndsum"  # Project ID específico
  "api_key"
  "API_KEY"
  "secret"
  "SECRET"
  "password"
  "PASSWORD"
  "token"
  "TOKEN"
)

FOUND_SECRETS=0

for pattern in "${PATTERNS[@]}"; do
  echo -e "${BLUE}Procurando: ${pattern}${NC}"
  
  # Procurar no histórico inteiro
  RESULTS=$(git log --all --full-history -S "$pattern" --pretty=format:"%H %an %ad" -- || true)
  
  if [ ! -z "$RESULTS" ]; then
    echo -e "${RED}  ❌ ENCONTRADO em commits:${NC}"
    echo "$RESULTS" | while read -r line; do
      echo -e "${RED}     $line${NC}"
    done
    FOUND_SECRETS=$((FOUND_SECRETS + 1))
  else
    echo -e "${GREEN}  ✅ Não encontrado${NC}"
  fi
  echo ""
done

# ============================================
# 3. VERIFICAR ARQUIVOS ESPECÍFICOS
# ============================================

echo -e "\n${YELLOW}📁 Verificando arquivos sensíveis...${NC}\n"

SENSITIVE_FILES=(
  "utils/supabase/info.tsx"
  ".env"
  ".env.local"
  ".env.production"
  "config/credentials.json"
)

for file in "${SENSITIVE_FILES[@]}"; do
  echo -e "${BLUE}Verificando: ${file}${NC}"
  
  # Verificar se arquivo está no histórico
  FILE_HISTORY=$(git log --all --full-history --pretty=format:"%H %an %ad" -- "$file" 2>/dev/null || true)
  
  if [ ! -z "$FILE_HISTORY" ]; then
    echo -e "${RED}  ❌ Arquivo rastreado no histórico:${NC}"
    echo "$FILE_HISTORY" | head -3 | while read -r line; do
      echo -e "${RED}     $line${NC}"
    done
    
    # Verificar se está no .gitignore atual
    if git check-ignore -q "$file" 2>/dev/null; then
      echo -e "${GREEN}  ✅ Agora está no .gitignore${NC}"
    else
      echo -e "${RED}  ❌ NÃO está no .gitignore!${NC}"
    fi
    
    FOUND_SECRETS=$((FOUND_SECRETS + 1))
  else
    echo -e "${GREEN}  ✅ Nunca foi commitado${NC}"
  fi
  echo ""
done

# ============================================
# 4. VERIFICAR .gitignore ATUAL
# ============================================

echo -e "\n${YELLOW}📋 Verificando .gitignore...${NC}\n"

GITIGNORE_ENTRIES=(
  ".env"
  ".env.local"
  "*.key"
  "*.pem"
  "secrets/"
  "credentials/"
)

for entry in "${GITIGNORE_ENTRIES[@]}"; do
  if grep -q "$entry" .gitignore 2>/dev/null; then
    echo -e "${GREEN}✅ .gitignore contém: ${entry}${NC}"
  else
    echo -e "${RED}❌ .gitignore NÃO contém: ${entry}${NC}"
    FOUND_SECRETS=$((FOUND_SECRETS + 1))
  fi
done

# ============================================
# 5. VERIFICAR COMMITS RECENTES
# ============================================

echo -e "\n${YELLOW}🕐 Últimos 10 commits:${NC}\n"

git log --oneline -10

# ============================================
# 6. RESULTADO FINAL
# ============================================

echo -e "\n${BLUE}============================================${NC}"

if [ $FOUND_SECRETS -gt 0 ]; then
  echo -e "${RED}❌ ATENÇÃO: CREDENCIAIS PODEM TER VAZADO!${NC}\n"
  
  echo -e "${YELLOW}PROBLEMAS ENCONTRADOS: ${FOUND_SECRETS}${NC}\n"
  
  echo -e "${YELLOW}🔴 AÇÃO IMEDIATA NECESSÁRIA:${NC}\n"
  
  echo -e "1. ${RED}ROTACIONAR IMEDIATAMENTE${NC} todas as credenciais expostas:"
  echo -e "   - Acesse: https://supabase.com/dashboard"
  echo -e "   - Vá em Settings > API"
  echo -e "   - Clique em 'Generate new anon key'\n"
  
  echo -e "2. ${YELLOW}LIMPAR HISTÓRICO DO GIT${NC} (CUIDADO!):"
  echo -e "   ${RED}OPÇÃO 1: BFG Repo-Cleaner (recomendado)${NC}"
  echo -e "   brew install bfg"
  echo -e "   bfg --delete-files info.tsx"
  echo -e "   git reflog expire --expire=now --all"
  echo -e "   git gc --prune=now --aggressive\n"
  
  echo -e "   ${YELLOW}OPÇÃO 2: git filter-branch${NC}"
  echo -e "   git filter-branch --force --index-filter \\"
  echo -e "     'git rm --cached --ignore-unmatch utils/supabase/info.tsx' \\"
  echo -e "     --prune-empty --tag-name-filter cat -- --all\n"
  
  echo -e "3. ${YELLOW}FORCE PUSH${NC} (requer coordenação com time):"
  echo -e "   git push origin --force --all"
  echo -e "   git push origin --force --tags\n"
  
  echo -e "4. ${YELLOW}OU CONSIDERE${NC} criar um novo repositório limpo\n"
  
  echo -e "${RED}⚠️  Se o repositório for público, as credenciais já vazaram!${NC}"
  echo -e "${RED}⚠️  Bots podem ter coletado em minutos!${NC}\n"
  
  exit 1
else
  echo -e "${GREEN}✅ NENHUMA CREDENCIAL EXPOSTA DETECTADA!${NC}\n"
  echo -e "${GREEN}O histórico do Git está limpo.${NC}\n"
  
  echo -e "${BLUE}Próximos passos recomendados:${NC}"
  echo -e "1. Manter .env no .gitignore"
  echo -e "2. Usar pre-commit hooks para prevenir commits acidentais"
  echo -e "3. Revisar .gitignore regularmente"
  echo -e "4. Rotacionar credenciais periodicamente (90 dias)\n"
  
  exit 0
fi

echo -e "${BLUE}============================================${NC}\n"
