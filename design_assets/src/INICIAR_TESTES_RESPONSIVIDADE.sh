#!/bin/bash

# 🧪 Iniciar Testes de Responsividade Mobile
# Script para preparar ambiente e iniciar testes

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

clear

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║          🧪 TESTES DE RESPONSIVIDADE MOBILE 📱           ║"
echo "║                      SoloForte                             ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Verificar se servidor está rodando
echo -e "${BLUE}🔍 Verificando servidor...${NC}"
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${GREEN}✅ Servidor rodando na porta 5173${NC}"
else
    echo -e "${YELLOW}⚠️  Servidor não está rodando${NC}"
    echo -e "${BLUE}   Iniciando servidor...${NC}"
    npm run dev &
    sleep 3
fi
echo ""

# Executar análise preliminar
echo -e "${BLUE}📊 Executando análise preliminar...${NC}"
if [ -f "scripts/refinar-responsividade.sh" ]; then
    bash scripts/refinar-responsividade.sh
else
    echo -e "${YELLOW}⚠️  Script de análise não encontrado${NC}"
fi
echo ""

# Mostrar configuração de testes
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                  CONFIGURAÇÃO DE TESTES                    ║${NC}"
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${MAGENTA}📱 DISPOSITIVOS A TESTAR:${NC}"
echo ""
echo -e "  1. ${YELLOW}Galaxy Fold (Fechado)${NC}   - 280 x 653  - Muito pequeno"
echo -e "  2. ${YELLOW}Galaxy S8${NC}               - 360 x 740  - Android pequeno"
echo -e "  3. ${YELLOW}iPhone SE (2020)${NC}        - 375 x 667  - iOS pequeno"
echo -e "  4. ${YELLOW}iPhone 12/13${NC}            - 390 x 844  - iOS padrão"
echo -e "  5. ${YELLOW}iPhone 14 Pro Max${NC}       - 430 x 932  - iOS grande"
echo ""

echo -e "${MAGENTA}🎯 TELAS A VERIFICAR:${NC}"
echo ""
echo -e "  ✓ Landing/Home"
echo -e "  ✓ Login"
echo -e "  ✓ Dashboard"
echo -e "  ✓ Agenda"
echo -e "  ✓ Clientes"
echo -e "  ✓ Relatórios"
echo -e "  ✓ Clima"
echo -e "  ✓ Check-In"
echo -e "  ✓ Notificações"
echo -e "  ✓ Configurações"
echo ""

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                    INSTRUÇÕES DE TESTE                     ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}1. Abrir o aplicativo com Overflow Debugger:${NC}"
echo -e "   ${GREEN}http://localhost:5173/?debug=overflow${NC}"
echo ""

echo -e "${BLUE}2. Abrir DevTools:${NC}"
echo -e "   Windows/Linux: ${GREEN}F12${NC} ou ${GREEN}Ctrl+Shift+I${NC}"
echo -e "   Mac: ${GREEN}Cmd+Option+I${NC}"
echo ""

echo -e "${BLUE}3. Ativar Device Toolbar:${NC}"
echo -e "   Windows/Linux: ${GREEN}Ctrl+Shift+M${NC}"
echo -e "   Mac: ${GREEN}Cmd+Shift+M${NC}"
echo ""

echo -e "${BLUE}4. Testar cada tela em cada tamanho:${NC}"
echo -e "   • Verificar se há elementos destacados em ${RED}vermelho${NC}"
echo -e "   • Widget deve mostrar: ${GREEN}\"0 elementos com overflow\"${NC}"
echo -e "   • Capturar screenshots de problemas"
echo ""

echo -e "${BLUE}5. Usar checklist do guia:${NC}"
echo -e "   ${GREEN}GUIA_TESTE_VISUAL_RESPONSIVIDADE.md${NC}"
echo ""

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                    CRITÉRIOS DE SUCESSO                    ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "  ${GREEN}✓${NC} Zero overflow horizontal"
echo -e "  ${GREEN}✓${NC} Texto 100% legível (não cortado)"
echo -e "  ${GREEN}✓${NC} Touch targets ≥ 44px"
echo -e "  ${GREEN}✓${NC} Layout consistente"
echo -e "  ${GREEN}✓${NC} Sem scroll horizontal"
echo ""

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                    ATALHOS ÚTEIS                           ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "  ${BLUE}Capturar screenshot:${NC}"
echo -e "    ${GREEN}Ctrl+Shift+P${NC} (Win) / ${GREEN}Cmd+Shift+P${NC} (Mac)"
echo -e "    Digite: ${YELLOW}screenshot${NC}"
echo -e "    Selecione: ${YELLOW}Capture full size screenshot${NC}"
echo ""

echo -e "  ${BLUE}Inspecionar elemento:${NC}"
echo -e "    ${GREEN}Ctrl+Shift+C${NC} (Win) / ${GREEN}Cmd+Shift+C${NC} (Mac)"
echo ""

echo -e "  ${BLUE}Limpar cache:${NC}"
echo -e "    ${GREEN}Ctrl+Shift+Delete${NC} (Win) / ${GREEN}Cmd+Shift+Delete${NC} (Mac)"
echo ""

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                    PRÓXIMOS PASSOS                         ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}Escolha uma opção:${NC}"
echo ""
echo -e "  ${GREEN}1${NC} - Abrir app com debugger no navegador"
echo -e "  ${GREEN}2${NC} - Ver documentação completa"
echo -e "  ${GREEN}3${NC} - Executar apenas análise de código"
echo -e "  ${GREEN}4${NC} - Sair"
echo ""

read -p "$(echo -e ${CYAN}Opção [1-4]:${NC} )" opcao

case $opcao in
    1)
        echo ""
        echo -e "${GREEN}🚀 Abrindo aplicativo com debugger...${NC}"
        
        # Detectar sistema operacional e abrir navegador
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "http://localhost:5173/?debug=overflow" 2>/dev/null || true
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            open "http://localhost:5173/?debug=overflow" 2>/dev/null || true
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            start "http://localhost:5173/?debug=overflow" 2>/dev/null || true
        fi
        
        echo -e "${BLUE}📋 Lembre-se:${NC}"
        echo -e "  • Ativar DevTools (${GREEN}F12${NC})"
        echo -e "  • Ativar Device Toolbar (${GREEN}Ctrl+Shift+M${NC})"
        echo -e "  • Seguir guia de testes"
        echo ""
        echo -e "${GREEN}✅ Bons testes!${NC}"
        ;;
    2)
        echo ""
        echo -e "${GREEN}📚 Documentação disponível:${NC}"
        echo ""
        echo -e "  ${BLUE}1.${NC} GUIA_TESTE_VISUAL_RESPONSIVIDADE.md"
        echo -e "  ${BLUE}2.${NC} AUDITORIA_RESPONSIVIDADE_MOBILE.md"
        echo -e "  ${BLUE}3.${NC} CORRECOES_MOBILE_RESPONSIVIDADE.md"
        echo -e "  ${BLUE}4.${NC} RESUMO_AUDITORIA_REFINAMENTO_MOBILE.md"
        echo ""
        ;;
    3)
        echo ""
        echo -e "${GREEN}🔍 Executando análise de código...${NC}"
        if [ -f "scripts/refinar-responsividade.sh" ]; then
            bash scripts/refinar-responsividade.sh
        else
            echo -e "${RED}❌ Script não encontrado${NC}"
        fi
        ;;
    4)
        echo ""
        echo -e "${BLUE}👋 Até logo!${NC}"
        echo ""
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Opção inválida${NC}"
        echo ""
        exit 1
        ;;
esac

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""
