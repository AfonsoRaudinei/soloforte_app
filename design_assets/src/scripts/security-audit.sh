#!/bin/bash

# 🔒 SOLOFORTE - SECURITY AUDIT SCRIPT
# Verifica conformidade com padrões de segurança

echo "🔍 AUDITORIA DE SEGURANÇA - SOLOFORTE"
echo "===================================="
echo ""

# Cores para output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
CRITICAL=0
HIGH=0
MEDIUM=0
PASSED=0

# ===================================
# 1. VERIFICAR .gitignore
# ===================================
echo -e "${BLUE}[1/8] Verificando .gitignore...${NC}"
if [ -f ".gitignore" ]; then
  if grep -q "^\.env$" .gitignore && grep -q "^node_modules/$" .gitignore; then
    echo -e "${GREEN}✅ .gitignore configurado corretamente${NC}"
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠️  .gitignore existe mas incompleto${NC}"
    ((MEDIUM++))
  fi
else
  echo -e "${RED}❌ .gitignore NÃO ENCONTRADO${NC}"
  ((CRITICAL++))
fi
echo ""

# ===================================
# 2. VERIFICAR .env.example
# ===================================
echo -e "${BLUE}[2/8] Verificando .env.example...${NC}"
if [ -f ".env.example" ]; then
  echo -e "${GREEN}✅ .env.example encontrado${NC}"
  ((PASSED++))
else
  echo -e "${RED}❌ .env.example NÃO ENCONTRADO${NC}"
  ((HIGH++))
fi
echo ""

# ===================================
# 3. VERIFICAR SE .env ESTÁ NO GIT
# ===================================
echo -e "${BLUE}[3/8] Verificando se .env está no Git...${NC}"
if git ls-files --error-unmatch .env 2>/dev/null; then
  echo -e "${RED}❌ CRÍTICO: .env está commitado no Git!${NC}"
  echo -e "${RED}   Ação necessária: remover do histórico${NC}"
  ((CRITICAL++))
else
  echo -e "${GREEN}✅ .env não está no Git${NC}"
  ((PASSED++))
fi
echo ""

# ===================================
# 4. PROCURAR localStorage DIRETO
# ===================================
echo -e "${BLUE}[4/8] Procurando localStorage direto...${NC}"
LOCALSTORAGE_COUNT=$(grep -r "localStorage\." components/ App.tsx 2>/dev/null | wc -l)
if [ $LOCALSTORAGE_COUNT -gt 0 ]; then
  echo -e "${RED}❌ CRÍTICO: $LOCALSTORAGE_COUNT usos de localStorage encontrados${NC}"
  echo -e "${YELLOW}   Localizações:${NC}"
  grep -rn "localStorage\." components/ App.tsx | head -5
  echo -e "${YELLOW}   ... (mostrando primeiros 5)${NC}"
  ((CRITICAL++))
else
  echo -e "${GREEN}✅ Nenhum uso direto de localStorage${NC}"
  ((PASSED++))
fi
echo ""

# ===================================
# 5. VERIFICAR USO DE HOOKS DE SEGURANÇA
# ===================================
echo -e "${BLUE}[5/8] Verificando uso de hooks de segurança...${NC}"

# useRateLimit
RATE_LIMIT_USES=$(grep -r "useRateLimit\|useLoginRateLimit\|useSignupRateLimit" components/ 2>/dev/null | wc -l)
if [ $RATE_LIMIT_USES -eq 0 ]; then
  echo -e "${RED}❌ useRateLimit NÃO está sendo usado${NC}"
  ((CRITICAL++))
else
  echo -e "${GREEN}✅ useRateLimit usado em $RATE_LIMIT_USES local(is)${NC}"
  ((PASSED++))
fi

# useSanitizedInput
SANITIZED_USES=$(grep -r "useSanitizedInput\|useSanitizedForm" components/ 2>/dev/null | wc -l)
if [ $SANITIZED_USES -eq 0 ]; then
  echo -e "${RED}❌ useSanitizedInput NÃO está sendo usado${NC}"
  ((CRITICAL++))
else
  echo -e "${GREEN}✅ useSanitizedInput usado em $SANITIZED_USES local(is)${NC}"
  ((PASSED++))
fi
echo ""

# ===================================
# 6. PROCURAR LOGS SENSÍVEIS
# ===================================
echo -e "${BLUE}[6/8] Procurando logs de dados sensíveis...${NC}"
SENSITIVE_LOGS=$(grep -rE "console\.log.*password|console\.log.*token|logger\.log.*email" components/ 2>/dev/null | wc -l)
if [ $SENSITIVE_LOGS -gt 0 ]; then
  echo -e "${YELLOW}⚠️  $SENSITIVE_LOGS possíveis logs sensíveis encontrados${NC}"
  grep -rnE "console\.log.*password|console\.log.*token|logger\.log.*email" components/ | head -3
  ((HIGH++))
else
  echo -e "${GREEN}✅ Nenhum log sensível óbvio encontrado${NC}"
  ((PASSED++))
fi
echo ""

# ===================================
# 7. VERIFICAR CREDENCIAIS HARDCODED
# ===================================
echo -e "${BLUE}[7/8] Procurando credenciais hardcoded...${NC}"
HARDCODED=$(grep -rE "api_key\s*=\s*['\"]|password\s*=\s*['\"]|secret\s*=\s*['\"]" components/ utils/ 2>/dev/null | grep -v "// " | wc -l)
if [ $HARDCODED -gt 0 ]; then
  echo -e "${RED}❌ CRÍTICO: $HARDCODED possíveis credenciais hardcoded${NC}"
  grep -rnE "api_key\s*=\s*['\"]|password\s*=\s*['\"]|secret\s*=\s*['\"]" components/ utils/ 2>/dev/null | grep -v "// " | head -3
  ((CRITICAL++))
else
  echo -e "${GREEN}✅ Nenhuma credencial hardcoded óbvia${NC}"
  ((PASSED++))
fi
echo ""

# ===================================
# 8. VERIFICAR DEPENDÊNCIAS VULNERÁVEIS
# ===================================
echo -e "${BLUE}[8/8] Verificando dependências vulneráveis...${NC}"
if command -v npm &> /dev/null; then
  VULNS=$(npm audit --json 2>/dev/null | jq -r '.metadata.vulnerabilities.total // 0')
  if [ "$VULNS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $VULNS vulnerabilidades encontradas em dependências${NC}"
    echo -e "${YELLOW}   Execute: npm audit fix${NC}"
    ((MEDIUM++))
  else
    echo -e "${GREEN}✅ Sem vulnerabilidades em dependências${NC}"
    ((PASSED++))
  fi
else
  echo -e "${YELLOW}⚠️  npm não encontrado, pulando verificação${NC}"
fi
echo ""

# ===================================
# RELATÓRIO FINAL
# ===================================
echo "===================================="
echo -e "${BLUE}📊 RELATÓRIO FINAL${NC}"
echo "===================================="
echo ""
echo -e "✅ Passou:          $GREEN$PASSED${NC}"
echo -e "🟡 Médio:           $YELLOW$MEDIUM${NC}"
echo -e "🟠 Alto:            $YELLOW$HIGH${NC}"
echo -e "🔴 Crítico:         $RED$CRITICAL${NC}"
echo ""

# Score
TOTAL=$((PASSED + MEDIUM + HIGH + CRITICAL))
SCORE=$((PASSED * 100 / TOTAL))

echo -e "${BLUE}Score de Segurança: $SCORE%${NC}"
echo ""

if [ $CRITICAL -gt 0 ]; then
  echo -e "${RED}❌ FALHOU: $CRITICAL problema(s) crítico(s) encontrado(s)${NC}"
  echo -e "${RED}   Ação necessária URGENTE!${NC}"
  exit 1
elif [ $HIGH -gt 0 ]; then
  echo -e "${YELLOW}⚠️  AVISO: $HIGH problema(s) de alta severidade${NC}"
  echo -e "${YELLOW}   Recomenda-se correção em breve${NC}"
  exit 0
else
  echo -e "${GREEN}✅ PASSOU: Sistema em conformidade${NC}"
  exit 0
fi
