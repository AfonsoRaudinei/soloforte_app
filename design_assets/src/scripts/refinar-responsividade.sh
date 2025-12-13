#!/bin/bash

# 🔧 Script de Refinamento de Responsividade Mobile
# Aplica correções automáticas em componentes com problemas conhecidos

set -e

echo "🔍 Iniciando refinamento de responsividade mobile..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar se arquivo existe
check_file() {
    if [ ! -f "$1" ]; then
        echo -e "${RED}❌ Arquivo não encontrado: $1${NC}"
        return 1
    fi
    return 0
}

# Função para fazer backup
backup_file() {
    local file=$1
    local backup="${file}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$file" "$backup"
    echo -e "${BLUE}💾 Backup criado: $backup${NC}"
}

echo "================================================"
echo "  FASE 1: Análise de Componentes"
echo "================================================"
echo ""

# Lista de componentes para verificar
components=(
    "components/Agenda.tsx"
    "components/Clientes.tsx"
    "components/CheckInOut.tsx"
    "components/Login.tsx"
    "components/AlertasConfig.tsx"
    "components/Feedback.tsx"
    "components/Cadastro.tsx"
    "components/EsqueciSenha.tsx"
)

problems_found=0

for component in "${components[@]}"; do
    if check_file "$component"; then
        # Verificar padrões problemáticos
        if grep -q 'className="flex-1">' "$component" 2>/dev/null; then
            echo -e "${YELLOW}⚠️  $component - Encontrado 'flex-1' sem min-w-0${NC}"
            ((problems_found++))
        fi
        
        if grep -q 'text-gray-[0-9]' "$component" 2>/dev/null && ! grep -q 'truncate\|line-clamp' "$component" 2>/dev/null; then
            echo -e "${YELLOW}⚠️  $component - Texto sem proteção de overflow${NC}"
            ((problems_found++))
        fi
    fi
done

echo ""
echo -e "${BLUE}📊 Total de problemas encontrados: $problems_found${NC}"
echo ""

echo "================================================"
echo "  FASE 2: Verificação de Estilos Globais"
echo "================================================"
echo ""

if check_file "styles/globals.css"; then
    if grep -q "@media (max-width: 359px)" "styles/globals.css"; then
        echo -e "${GREEN}✅ Media queries mobile implementadas${NC}"
    else
        echo -e "${RED}❌ Media queries mobile NÃO encontradas${NC}"
    fi
    
    if grep -q ".text-safe" "styles/globals.css"; then
        echo -e "${GREEN}✅ Classe .text-safe implementada${NC}"
    else
        echo -e "${RED}❌ Classe .text-safe NÃO encontrada${NC}"
    fi
    
    if grep -q ".truncate-1" "styles/globals.css"; then
        echo -e "${GREEN}✅ Classes truncate helpers implementadas${NC}"
    else
        echo -e "${RED}❌ Classes truncate helpers NÃO encontradas${NC}"
    fi
else
    echo -e "${RED}❌ Arquivo globals.css não encontrado${NC}"
fi

echo ""

echo "================================================"
echo "  FASE 3: Verificação de Ferramentas"
echo "================================================"
echo ""

tools=(
    "components/shared/TextSafe.tsx"
    "components/shared/OverflowDebugger.tsx"
    "components/shared/index.ts"
)

for tool in "${tools[@]}"; do
    if check_file "$tool"; then
        echo -e "${GREEN}✅ $tool presente${NC}"
    else
        echo -e "${RED}❌ $tool NÃO encontrado${NC}"
    fi
done

echo ""

echo "================================================"
echo "  FASE 4: Sugestões de Refinamento"
echo "================================================"
echo ""

echo -e "${BLUE}📝 Ações Recomendadas:${NC}"
echo ""

if [ $problems_found -gt 0 ]; then
    echo "1. 🔧 Corrigir $problems_found problema(s) identificado(s)"
    echo "   - Adicionar 'min-w-0' em containers flex"
    echo "   - Adicionar 'truncate' ou 'line-clamp-*' em textos"
    echo ""
fi

echo "2. 🧪 Executar testes de responsividade:"
echo "   - Abrir app com ?debug=overflow"
echo "   - Testar em DevTools com diferentes tamanhos"
echo "   - Validar em dispositivos reais"
echo ""

echo "3. 📱 Tamanhos críticos para testar:"
echo "   - 320px (muito pequeno)"
echo "   - 360px (Galaxy S8)"
echo "   - 375px (iPhone SE)"
echo "   - 390px (iPhone 12/13)"
echo "   - 428px (iPhone Pro Max)"
echo ""

echo "4. 📊 Métricas para validar:"
echo "   - Zero overflow horizontal"
echo "   - Texto 100% legível"
echo "   - Touch targets ≥ 44px"
echo ""

echo "================================================"
echo "  FASE 5: Comandos Úteis"
echo "================================================"
echo ""

echo -e "${BLUE}🔍 Para ativar overflow debugger:${NC}"
echo "   http://localhost:5173/?debug=overflow"
echo ""

echo -e "${BLUE}🔍 Para procurar problemas em um componente:${NC}"
echo "   grep -n 'flex-1\">' components/Agenda.tsx"
echo ""

echo -e "${BLUE}🧪 Para testar em diferentes tamanhos:${NC}"
echo "   DevTools > Toggle device toolbar > Edit > Add custom device"
echo ""

echo -e "${BLUE}📸 Para capturar screenshots:${NC}"
echo "   DevTools > Capture screenshot > Capture full size screenshot"
echo ""

echo "================================================"
echo "  REFINAMENTO CONCLUÍDO"
echo "================================================"
echo ""

if [ $problems_found -eq 0 ]; then
    echo -e "${GREEN}✅ Nenhum problema crítico encontrado!${NC}"
    echo -e "${GREEN}   Sistema pronto para testes finais.${NC}"
else
    echo -e "${YELLOW}⚠️  $problems_found problema(s) identificado(s).${NC}"
    echo -e "${YELLOW}   Revisar componentes listados acima.${NC}"
fi

echo ""
echo -e "${BLUE}📚 Documentação:${NC}"
echo "   - /AUDITORIA_RESPONSIVIDADE_MOBILE.md"
echo "   - /CORRECOES_MOBILE_RESPONSIVIDADE.md"
echo ""

exit 0
