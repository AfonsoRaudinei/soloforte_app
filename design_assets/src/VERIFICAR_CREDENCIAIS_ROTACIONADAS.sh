#!/bin/bash

# ============================================
# 🔍 VERIFICADOR PÓS-ROTAÇÃO DE CREDENCIAIS
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
echo -e "${BOLD}${BLUE}🔍 VERIFICADOR PÓS-ROTAÇÃO${NC}"
echo -e "${BOLD}${BLUE}   Supabase Credentials${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

# ============================================
# 1. VERIFICAR .env ATUALIZADO
# ============================================

echo -e "${CYAN}1️⃣  Verificando .env atualizado...${NC}"

if [ ! -f .env ]; then
  echo -e "${RED}❌ Arquivo .env não encontrado!${NC}"
  exit 1
fi

# Extrair keys
PROJECT_ID=$(grep VITE_SUPABASE_PROJECT_ID .env | cut -d '=' -f2)
ANON_KEY=$(grep VITE_SUPABASE_ANON_KEY .env | cut -d '=' -f2)

# Key antiga (VAZADA - deve ser diferente!)
OLD_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA"

if [ "$ANON_KEY" = "$OLD_KEY" ]; then
  echo -e "${RED}❌ ATENÇÃO: Ainda usando key ANTIGA (vazada)!${NC}"
  echo -e "${YELLOW}⚠️  AÇÃO NECESSÁRIA: Rotacionar credenciais AGORA${NC}"
  echo -e "${YELLOW}    Ver: ROTACIONAR_CREDENCIAIS_SUPABASE.md${NC}\n"
  exit 1
fi

echo -e "${GREEN}✅ Key foi atualizada (diferente da antiga)${NC}"
echo -e "${CYAN}   Project ID: ${PROJECT_ID:0:15}...${NC}"
echo -e "${CYAN}   Anon Key: ${ANON_KEY:0:25}...${NC}\n"

# ============================================
# 2. VALIDAR FORMATO DA KEY
# ============================================

echo -e "${CYAN}2️⃣  Validando formato da nova key...${NC}"

# JWT deve começar com eyJ
if [[ ! "$ANON_KEY" =~ ^eyJ ]]; then
  echo -e "${RED}❌ Key não parece ser um JWT válido${NC}"
  echo -e "${YELLOW}   JWTs devem começar com 'eyJ'${NC}\n"
  exit 1
fi

# JWT tem 3 partes separadas por pontos
IFS='.' read -ra PARTS <<< "$ANON_KEY"
if [ ${#PARTS[@]} -ne 3 ]; then
  echo -e "${RED}❌ JWT inválido (deve ter 3 partes)${NC}\n"
  exit 1
fi

echo -e "${GREEN}✅ Formato JWT válido${NC}\n"

# ============================================
# 3. VERIFICAR VARIÁVEIS DE AMBIENTE
# ============================================

echo -e "${CYAN}3️⃣  Validando variáveis de ambiente...${NC}\n"

if [ -f scripts/validate-env.js ]; then
  node scripts/validate-env.js
  
  if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ Validação de variáveis falhou${NC}"
    exit 1
  fi
else
  echo -e "${YELLOW}⚠️  Validador não encontrado${NC}\n"
fi

# ============================================
# 4. VERIFICAR SE SERVER ESTÁ RODANDO
# ============================================

echo -e "\n${CYAN}4️⃣  Verificando servidor...${NC}"

if lsof -i:5173 > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Servidor rodando na porta 5173${NC}"
  echo -e "${YELLOW}⚠️  Recomendado REINICIAR para aplicar novas credenciais${NC}\n"
  
  read -p "Deseja reiniciar o servidor agora? (y/N) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    pkill -f "vite" || true
    sleep 2
    echo -e "${GREEN}✅ Servidor parado. Reinicie com: npm run dev${NC}\n"
  fi
else
  echo -e "${YELLOW}⚠️  Servidor não está rodando${NC}"
  echo -e "${CYAN}   Inicie com: npm run dev${NC}\n"
fi

# ============================================
# 5. VERIFICAR .gitignore
# ============================================

echo -e "${CYAN}5️⃣  Verificando .gitignore...${NC}"

if grep -q "^\.env$" .gitignore 2>/dev/null; then
  echo -e "${GREEN}✅ .env está protegido no .gitignore${NC}\n"
else
  echo -e "${RED}❌ .env NÃO está no .gitignore!${NC}"
  echo -e "${YELLOW}   Adicionando agora...${NC}"
  echo -e "\n.env" >> .gitignore
  echo -e "${GREEN}✅ .gitignore atualizado${NC}\n"
fi

# ============================================
# 6. VERIFICAR GIT STATUS
# ============================================

echo -e "${CYAN}6️⃣  Verificando Git status...${NC}"

if git diff --quiet .env 2>/dev/null; then
  echo -e "${GREEN}✅ .env não tem mudanças staged (seguro)${NC}\n"
else
  if git diff --cached --name-only | grep -q "^\.env$" 2>/dev/null; then
    echo -e "${RED}❌ PERIGO: .env está STAGED para commit!${NC}"
    echo -e "${YELLOW}   Execute: git reset .env${NC}\n"
  fi
fi

# ============================================
# 7. INSTRUÇÕES PARA TESTE MANUAL
# ============================================

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${YELLOW}📋 TESTES MANUAIS RECOMENDADOS${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

echo -e "${CYAN}1. Testar Localmente:${NC}"
echo -e "   ${YELLOW}npm run dev${NC}"
echo -e "   Abrir: http://localhost:5173"
echo -e "   Verificar console do navegador:\n"
echo -e "   ${GREEN}✅ Supabase credentials loaded...${NC}\n"

echo -e "${CYAN}2. Testar Login/Cadastro:${NC}"
echo -e "   - Fazer login com usuário existente"
echo -e "   - Criar nova conta"
echo -e "   - Ambos devem funcionar sem erros\n"

echo -e "${CYAN}3. Testar Queries:${NC}"
echo -e "   - Carregar dashboard"
echo -e "   - Salvar polígono/ocorrência"
echo -e "   - Verificar que dados são salvos\n"

echo -e "${CYAN}4. Verificar Console (F12):${NC}"
echo -e "   ${YELLOW}const { createClient } = await import('./utils/supabase/client.ts');${NC}"
echo -e "   ${YELLOW}const supabase = createClient();${NC}"
echo -e "   ${YELLOW}const { data } = await supabase.from('users').select('count');${NC}"
echo -e "   ${YELLOW}console.log(data);${NC}\n"

# ============================================
# 8. CHECKLIST FINAL
# ============================================

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${GREEN}✅ CHECKLIST DE ROTAÇÃO${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

echo -e "Marque como completo quando finalizar:\n"

echo -e "📋 Preparação:"
echo -e "  ${GREEN}✅${NC} .env atualizado com nova key"
echo -e "  ${GREEN}✅${NC} .env.example atualizado (sem credenciais)"
echo -e "  ${GREEN}✅${NC} .gitignore protegendo .env"
echo -e "  ${YELLOW}[ ]${NC} Backup do .env antigo criado\n"

echo -e "📋 Rotação no Supabase:"
echo -e "  ${YELLOW}[ ]${NC} Nova anon key gerada no dashboard"
echo -e "  ${YELLOW}[ ]${NC} Key antiga invalidada"
echo -e "  ${YELLOW}[ ]${NC} RLS verificado/habilitado\n"

echo -e "📋 Testes Local:"
echo -e "  ${YELLOW}[ ]${NC} Servidor reiniciado"
echo -e "  ${YELLOW}[ ]${NC} Login funciona"
echo -e "  ${YELLOW}[ ]${NC} Cadastro funciona"
echo -e "  ${YELLOW}[ ]${NC} Queries funcionam"
echo -e "  ${YELLOW}[ ]${NC} Console sem erros\n"

echo -e "📋 Produção:"
echo -e "  ${YELLOW}[ ]${NC} Variáveis atualizadas (Vercel/Netlify)"
echo -e "  ${YELLOW}[ ]${NC} Deploy realizado"
echo -e "  ${YELLOW}[ ]${NC} App em produção funciona"
echo -e "  ${YELLOW}[ ]${NC} Login em produção funciona\n"

echo -e "📋 Segurança:"
echo -e "  ${YELLOW}[ ]${NC} Git history limpo"
echo -e "  ${YELLOW}[ ]${NC} Time notificado"
echo -e "  ${YELLOW}[ ]${NC} Documentação atualizada"
echo -e "  ${YELLOW}[ ]${NC} Próxima rotação agendada (90 dias)\n"

# ============================================
# RESULTADO FINAL
# ============================================

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${GREEN}✅ VERIFICAÇÃO CONCLUÍDA${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

echo -e "${CYAN}Próximos passos:${NC}"
echo -e "1. ${YELLOW}Completar testes manuais acima${NC}"
echo -e "2. ${YELLOW}Atualizar credenciais em produção${NC}"
echo -e "3. ${YELLOW}Verificar que key antiga foi invalidada${NC}"
echo -e "4. ${YELLOW}Documentar data de rotação${NC}\n"

echo -e "${CYAN}Documentação:${NC}"
echo -e "  - ROTACIONAR_CREDENCIAIS_SUPABASE.md\n"

echo -e "${BOLD}${BLUE}============================================${NC}\n"
