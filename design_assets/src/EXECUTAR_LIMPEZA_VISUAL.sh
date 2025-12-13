#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# 🎨 SCRIPT DE LIMPEZA: Manter Apenas Design/Visual
# ═══════════════════════════════════════════════════════════════
# 
# Objetivo: Manter SOMENTE docs de design visual/UX
# Remover: Toda documentação técnica de código
#
# Data: 4 de Novembro de 2025
# ═══════════════════════════════════════════════════════════════

set -e  # Parar em caso de erro

echo "════════════════════════════════════════════════════════════"
echo "🎨 LIMPEZA: Manter Apenas Design/Visual"
echo "════════════════════════════════════════════════════════════"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Criar diretório de backup
BACKUP_DIR="docs_backup_$(date +%Y%m%d_%H%M%S)"
echo -e "${YELLOW}📦 Criando backup em: ${BACKUP_DIR}${NC}"
mkdir -p "$BACKUP_DIR"

# Criar estrutura de pastas para organização
echo -e "${YELLOW}📁 Criando nova estrutura de pastas...${NC}"
mkdir -p design
mkdir -p ui-ux
mkdir -p mobile
mkdir -p componentes
mkdir -p modulos
mkdir -p guidelines

# ═══════════════════════════════════════════════════════════════
# ARQUIVOS A MANTER E REORGANIZAR
# ═══════════════════════════════════════════════════════════════

echo ""
echo -e "${GREEN}✅ MOVENDO ARQUIVOS DE DESIGN/VISUAL...${NC}"

# Design
mv -f DESIGN_CLEAN_FINAL.md design/ 2>/dev/null || true
mv -f SISTEMA_VISUAL_MELHORADO.md design/ 2>/dev/null || true
mv -f COMPARACAO_UI_ANTES_DEPOIS.md design/ 2>/dev/null || true
mv -f PROTOTIPO_COMPLETO.md design/ 2>/dev/null || true
mv -f PROTOTIPO_VISUAL_README.md design/ 2>/dev/null || true
mv -f GUIA_PROTOTIPO_VISUAL.md design/ 2>/dev/null || true
mv -f PINS_MARKETING_VISUAL.md design/ 2>/dev/null || true
mv -f TELA_ENTRADA_MAPA_FULLSCREEN.md design/ 2>/dev/null || true

# UI/UX
mv -f ANALISE_ERGONOMICA_COMPLETA_APP.md ui-ux/ 2>/dev/null || true
mv -f ANALISE_SIMPLIFICACAO_UI.md ui-ux/ 2>/dev/null || true
mv -f SIMPLIFICACAO_INTERFACE_MAPA.md ui-ux/ 2>/dev/null || true
mv -f REORGANIZACAO_MENU_SIMPLIFICADO.md ui-ux/ 2>/dev/null || true
mv -f GUIA_VISUAL_CORRECOES.md ui-ux/ 2>/dev/null || true

# Mobile
mv -f AUDITORIA_RESPONSIVIDADE_MOBILE.md mobile/ 2>/dev/null || true
mv -f CONFIRMACAO_100_MOBILE.md mobile/ 2>/dev/null || true
mv -f CORRECOES_MOBILE_RESPONSIVIDADE.md mobile/ 2>/dev/null || true
mv -f INDICE_RESPONSIVIDADE_MOBILE.md mobile/ 2>/dev/null || true
mv -f MOBILE_ONLY_IMPLEMENTADO.md mobile/ 2>/dev/null || true
mv -f OTIMIZACAO_MOBILE_FIRST.md mobile/ 2>/dev/null || true
mv -f RESPOSTA_PERFORMANCE_MOBILE.md mobile/ 2>/dev/null || true
mv -f RESUMO_AUDITORIA_REFINAMENTO_MOBILE.md mobile/ 2>/dev/null || true
mv -f GUIA_TESTE_VISUAL_RESPONSIVIDADE.md mobile/ 2>/dev/null || true

# Componentes
mv -f IMPLEMENTACAO_BOTOES_EXPANSIVEIS_SEPARADOS.md componentes/ 2>/dev/null || true
mv -f MELHORIAS_UI_LIGHT_IMPLEMENTADAS.md componentes/ 2>/dev/null || true
mv -f GUIA_FAB_DINAMICO.md componentes/ 2>/dev/null || true
mv -f BUSSOLA_IMPLEMENTADA_RESUMO.md componentes/ 2>/dev/null || true
mv -f BUSSOLA_PREMIUM_IMPLEMENTADA.md componentes/ 2>/dev/null || true
mv -f MELHORIA_BOTAO_FECHAR_NDVI.md componentes/ 2>/dev/null || true
mv -f MELHORIAS_DESENHO_TALHAO.md componentes/ 2>/dev/null || true
mv -f ZOOM_PIN_OCORRENCIA_IMPLEMENTADO.md componentes/ 2>/dev/null || true
mv -f RADAR_CLIMA_CAMADA_IMPLEMENTADO.md componentes/ 2>/dev/null || true

# Módulos
mv -f GUIA_DASHBOARD_EXECUTIVO.md modulos/ 2>/dev/null || true
mv -f GUIA_CHAT_SUPORTE.md modulos/ 2>/dev/null || true
mv -f GUIA_MARKETING.md modulos/ 2>/dev/null || true
mv -f GUIA_CHECKIN.md modulos/ 2>/dev/null || true
mv -f GUIA_DESENHO.md modulos/ 2>/dev/null || true
mv -f GUIA_ALERTAS.md modulos/ 2>/dev/null || true
mv -f GUIA_CASES_DE_SUCESSO.md modulos/ 2>/dev/null || true
mv -f GUIA_COMPARACAO.md modulos/ 2>/dev/null || true
mv -f GUIA_EXPORTACAO_VISUAL.md modulos/ 2>/dev/null || true
mv -f NDVI_GUIDE.md modulos/ 2>/dev/null || true
mv -f INTERPRETACAO_GRAFICOS.md modulos/ 2>/dev/null || true

# Guidelines
mv -f COMO_USAR.md guidelines/ 2>/dev/null || true
cp -f guidelines/Guidelines.md guidelines/Guidelines_BACKUP.md 2>/dev/null || true

# Manter na raiz
# README.md - já está
# Attributions.md - já está

echo -e "${GREEN}✅ Arquivos de design/visual organizados!${NC}"

# ═══════════════════════════════════════════════════════════════
# ARQUIVOS A REMOVER (BACKUP PRIMEIRO)
# ═══════════════════════════════════════════════════════════════

echo ""
echo -e "${YELLOW}📦 Fazendo backup de arquivos técnicos antes de remover...${NC}"

# Lista de arquivos a remover (técnicos)
REMOVE_FILES=(
    # Correções
    "CORRECAO_ERRO_APPENDCHILD.md"
    "CORRECAO_ERRO_APPENDCHILD_FINAL.md"
    "CORRECAO_ERRO_APPENDCHILD_PUBLICACAO.md"
    "CORRECAO_ERRO_COMPLETESHAPE.md"
    "CORRECAO_ERRO_MAPA_MARKETING.md"
    "CORRECAO_FINAL_LOADING_INFINITO.md"
    "CORRECAO_LOADING_INFINITO_MAPA.md"
    "CORRECAO_MAPAS_CAMADAS.md"
    "CORRECAO_PERMISSOES_CAMERA.md"
    "CORRECAO_TIMEOUT_LEAFLET.md"
    "CORRECOES_MAPDRAWING.md"
    "CORRECOES_P0_APLICADAS.md"
    "CORRECOES_V3300_COMPLETAS.md"
    
    # Erros
    "DEBUG_LOADING_INFINITO.md"
    "DEBUG_ZOOM_PIN.md"
    "ERRO_CORRIGIDO_AGORA.md"
    "ERRO_ENV_CORRIGIDO.md"
    "ERRO_ENV_CORRIGIDO_AGORA.md"
    "ERRO_RESOLVIDO_FALLBACK.md"
    "FIX_APLICADO.txt"
    "FIX_ENV_COMPLETO.md"
    "FIX_ERRO_AUTENTICACAO.md"
    "FIX_ERRO_CLIMA_SETCIDADE.md"
    "FIX_ERRO_ENV_IMPORT_META.md"
    "FIX_ERRO_MAPA_PANES.md"
    "FIX_IMPORT_META_ENV_APLICADO.md"
    "FIX_INTEGRACOES_MODULOS.md"
    "FIX_ISDEMO_DASHBOARD_APLICADO.md"
    "FIX_ISDEMO_DASHBOARD_V3300_FINAL.md"
    "FIX_ISDEMO_REFERENCIAS.md"
    "FIX_ISDEMO_TODAS_REFERENCIAS_CORRIGIDAS.md"
    "FIX_LOADING_INFINITO.md"
    "FIX_LOADING_INFINITO_v2.md"
    "FIX_TELA_BRANCA_URGENTE.md"
    "FIX_USEDEMO_IMPORT_CORRIGIDO.md"
    
    # Auditorias Técnicas
    "AUDITORIA_COMPLETA_SISTEMA_2025.md"
    "AUDITORIA_COMPLETA_TECNICA_2025.md"
    "AUDITORIA_COMPLETA_TOP_0_1_PERCENT.md"
    "AUDITORIA_FINAL_POS_REVISAO.md"
    "AUDITORIA_SEGURANCA_PENETRATION_TEST.md"
    "AUDITORIA_SISTEMA_MAPAS_COMPLETA.md"
    "AUDITORIA_SISTEMA_MAPAS_DIAGNOSTICO_COMPLETO.md"
    "AUDITORIA_TECNICA_COMPLETA_REVISAO.md"
    "CHANGELOG_AUDITORIA_2025.md"
    
    # Segurança
    "API_SETUP.md"
    "CHECKLIST_CAPACITOR.md"
    "CHECKLIST_HTTPONLY_COOKIES.md"
    "CHECKLIST_P0.md"
    "CHECKLIST_ROTACAO_CREDENCIAIS.md"
    "COMANDOS_CAPACITOR.md"
    "CREDENCIAIS_MIGRADAS_ENV.md"
    "EXECUTAR_MIGRACAO_COOKIES.md"
    "EXECUTAR_PROTECAO_XSS.md"
    "EXECUTAR_RATE_LIMITING.md"
    "FASE_P0_COMPLETA.md"
    "FASE_P1_COMPLETA.md"
    "GEOLOCALIZACAO_TROUBLESHOOTING.md"
    "GUIA_ARMAZENAMENTO_SEGURO_MOBILE.md"
    "GUIA_ERROR_BOUNDARY.md"
    "GUIA_LIGHTHOUSE_MONITORING.md"
    "GUIA_MIGRACAO_CAPACITOR.md"
    "IMPLEMENTACAO_RATE_LIMITING.md"
    "IMPLEMENTACAO_XSS_SANITIZACAO.md"
    "INDICE_SEGURANCA.md"
    "INSTALL_CAPACITOR.md"
    "LIGHTHOUSE_TRACKING.md"
    "LIMITACOES_TECNICAS_AMBIENTE.md"
    "MIGRACAO_HTTPONLY_COOKIES.md"
    "P0_CREDENCIAIS_MIGRADAS.md"
    "P1_EXECUTADO.md"
    "PATCHES_BUGS_CRITICOS.md"
    "PERFORMANCE_DASHBOARD.md"
    "PLANO_ACAO_EXECUTIVO_P0.md"
    "PLANO_ACAO_IMEDIATO.md"
    "QUICK_START_CAPACITOR.md"
    "QUICK_START_PERFORMANCE.md"
    "RESUMO_COMPLETO_SEGURANCA_P0.md"
    "RESUMO_HTTPONLY_COOKIES.md"
    "RESUMO_P0_CREDENCIAIS.md"
    "ROTACIONAR_AGORA.md"
    "ROTACIONAR_CREDENCIAIS_SUPABASE.md"
    "SCRIPT_LIMPEZA_PROJETO.md"
    "SECURITY_CHECKLIST_RLS_SUPABASE.md"
    "START_AQUI_CREDENCIAIS.md"
    "START_P0.md"
    
    # Implementações Técnicas
    "IMPLEMENTACAO_CHAT_SUPORTE_COMPLETA.md"
    "IMPLEMENTACAO_CLIMA_PREMIUM.md"
    "IMPLEMENTACAO_GEOLOCALIZACAO_CLIMA.md"
    "IMPLEMENTACAO_INTEGRACAO_MODULOS.md"
    "IMPLEMENTACAO_NDVI_CLIPPED.md"
    "IMPLEMENTACAO_PREFETCH_HOVER.md"
    "IMPLEMENTACAO_RAPIDA.md"
    "IMPLEMENTACAO_SALVAR_ANALISE_RELATORIO.md"
    "IMPLEMENTACAO_VISUALIZAR_EDITAR_RELATORIOS.md"
    "GUIA_COMPLETAR_CORRECOES.md"
    "GUIA_IMPLEMENTACAO_ERGONOMIA_FASE2.md"
    "GUIA_INTEGRACAO_PRODUTORES.md"
    "GUIA_MAPAS_OFFLINE.md"
    "GUIA_PREFETCH_HOVER.md"
    "GUIA_RAPIDO_MAPAS_OFFLINE.md"
    "GUIA_RAPIDO_SCANNER_PRAGAS.md"
    "GUIA_RAPIDO_VER_EDITAR_RELATORIO.md"
    "GUIA_REACT_MEMO.md"
    "GUIA_SKELETONS.md"
    "MAPAS_OFFLINE_IMPLEMENTADO.md"
    
    # Restaurações
    "RESTAURACAO_V3200_APLICANDO.md"
    "RESTAURACAO_V3200_COMPLETA.md"
    "RESTAURACAO_V3300_APLICADA.md"
    "RESTAURACAO_VERSAO_3300_COMPLETA.md"
    "RESTAURACAO_VERSAO_ESTAVEL.md"
    "REVERSAO_VERSAO_ESTAVEL_ANTERIOR.md"
    
    # Testes
    "TESTE_AGORA_LOADING.md"
    "TESTE_FINAL_RESTAURACAO.md"
    "TESTE_LOOP_INFINITO.md"
    "TESTE_RAPIDO_CORRECOES.md"
    "TESTE_RAPIDO_FIX.md"
    "TESTE_RASTREAMENTO_CRONOLOGICO.md"
    "TESTE_RESTAURACAO_AGORA.md"
    "TESTE_SALVAMENTO_AREA_AGORA.md"
    "TESTE_V3300_AGORA.md"
    "TESTES_VALIDACAO_MAPAS.md"
    "TESTAR_CORRECOES_P0.md"
    "TESTAR_FIX_AGORA.md"
    "VALIDACAO_AREAS.md"
    "VALIDACAO_COMPLETA_V3300.md"
    
    # Migrações
    "ANALISE_ESTADO_ATUAL_FLUTTER.md"
    "ARQUITETURA_FLUTTER_CLEAN.md"
    "ARQUITETURA_INTEGRACAO_MODULOS.md"
    "COMPARACAO_TECNICA_REACT_FLUTTER.md"
    "DECISAO_GO_NO_GO_1_PAGINA.md"
    "DECISAO_GO_NO_GO_EXECUTIVA.md"
    "DIAGRAMA_FLUXO_INTEGRACAO_COMPLETO.md"
    "DIAGRAMA_FLUXO_RELATORIOS.md"
    "EQUIVALENCIA_FLUTTER_GARANTIDA.md"
    "ESTRUTURA_FINAL_PROJETO.md"
    "EXEMPLO_CODIGO_REFATORADO.md"
    "GUIA_EXECUCAO_FASES_2_3_4.md"
    "INVENTARIO_COMPLETO_SISTEMA_ATUAL.md"
    "MAPEAMENTO_1_1_SISTEMAS.md"
    "PRD_CONCLUIDO_README.md"
    "PRD_MIGRACAO_FLUTTER_SEGURA.md"
    "PRD_MODULO_PUBLICAR_REPLICAVEL.md"
    "RESUMO_EXECUTIVO_PRD_FLUTTER.md"
    "RESUMO_INTEGRACAO_MODULOS.md"
    "STACK_TECNOLOGICO_COMPLETO.md"
    "STATUS_FINAL_PRD_COMPLETO.md"
    "TIMELINE_COMPLETA_22_SEMANAS.md"
    
    # Outros
    "ACAO_IMEDIATA.md"
    "DIFF_VISUAL_CORRECAO.md"
    "EXECUTAR_AGORA.md"
    "INDICE_CORRECAO_ISDEMO.md"
    "INSTRUCOES_REINICIO.md"
    "INSTRUCOES_REORGANIZACAO.md"
    "LEIA_ISTO_AGORA.md"
    "LEIA_PRIMEIRO_AUDITORIA.md"
    "LEIA_PRIMEIRO_ERRO_ENV.md"
    "LIMPEZA_EXECUTADA_SUCESSO.md"
    "MELHORIAS_APLICADAS_AUDITORIA.md"
    "OTIMIZACOES_CONCLUIDAS.md"
    "PROGRESSO_OTIMIZACAO.md"
    "PROXIMOS_PASSOS_UI_SIMPLIFICACAO.md"
    "PULL_REQUEST_TEMPLATE.md"
    "QUICK_TEST_PREFETCH.md"
    "QUICK_WINS_ADICIONAIS.md"
    "README_ERRO_ENV.md"
    "REINICIAR_AGORA.md"
    "RESOLVER_AGORA.sh"
    "RESUMO_CORRECAO_APPENDCHILD.md"
    "RESUMO_CORRECAO_FINAL.md"
    "RESUMO_CORRECAO_ISDEMO_FINAL.md"
    "RESUMO_CORRECAO_URGENTE.md"
    "RESUMO_CORRECOES_CAMERA.md"
    "RESUMO_CORRECOES_MAPAS_29_OUT_2025.md"
    "RESUMO_EXECUTIVO_AUDITORIA.md"
    "RESUMO_FINAL_CORRECOES.md"
    "RESUMO_MELHORIAS_PROTOTIPO.md"
    "RESUMO_REVISAO_COMPLETA.md"
    "RESUMO_SESSAO_27_OUT_2025.md"
    "RESUMO_VISUAL_FIX.md"
    "SISTEMA_RASTREAMENTO_CRONOLOGICO.md"
    "SOLUCAO_AVISO_FALLBACK.md"
    "SOLUCAO_EMERGENCIAL_LOADING.md"
    "SOLUCAO_RAPIDA_ERRO_ENV.md"
    "SPRINT_BACKLOG_PRIORIZADO.md"
    "START_HERE.md"
    "START_HERE_FIX_ISDEMO.md"
    "START_TESTE_AGORA.md"
    "SUMARIO_AUDITORIA_EXECUTIVO.md"
    "UNIFICACAO_SCANNER_PRAGAS.md"
    "VERIFICACOES_CONDICIONAIS_FINALIZADAS.md"
)

# Mover para backup e remover
for file in "${REMOVE_FILES[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/" 2>/dev/null || true
        rm "$file"
        echo -e "${RED}🗑️  Removido: ${file}${NC}"
    fi
done

# Remover scripts
echo ""
echo -e "${YELLOW}🗑️  Removendo scripts técnicos...${NC}"
rm -f diagnostico-env.sh 2>/dev/null || true
rm -f fix-env-agora.sh 2>/dev/null || true
rm -f EXECUTAR_P0_CREDENCIAIS.sh 2>/dev/null || true
rm -f INICIAR_AGORA.sh 2>/dev/null || true
rm -f INICIAR_TESTES_RESPONSIVIDADE.sh 2>/dev/null || true
rm -f reorganize-docs.py 2>/dev/null || true
rm -f reorganize-docs.sh 2>/dev/null || true
rm -f REINICIAR_SERVIDOR.sh 2>/dev/null || true
rm -f scripts-cleanup-docs.sh 2>/dev/null || true
rm -f SCRIPT_SCAN_SECRETS.sh 2>/dev/null || true
rm -f TORNAR_EXECUTAVEL.sh 2>/dev/null || true
rm -f verificar-env.sh 2>/dev/null || true
rm -f verificar-rotacao.sh 2>/dev/null || true
rm -f VERIFICAR_CREDENCIAIS_ROTACIONADAS.sh 2>/dev/null || true

# Remover arquivos de teste JS
rm -f TESTE_ERRO_CORRIGIDO.js 2>/dev/null || true
rm -f TESTE_ISDEMO_CORRIGIDO.js 2>/dev/null || true

# Remover backups tsx
rm -f App_BACKUP_ATUAL.tsx 2>/dev/null || true
rm -f Dashboard_BACKUP_ATUAL.tsx 2>/dev/null || true

# Remover dependabot e workflows
rm -f dependabot.yml 2>/dev/null || true
rm -rf workflows/ 2>/dev/null || true

# ═══════════════════════════════════════════════════════════════
# CRIAR README DE ÍNDICE
# ═══════════════════════════════════════════════════════════════

echo ""
echo -e "${GREEN}📝 Criando novo README de índice...${NC}"

cat > INDICE_DOCUMENTACAO_VISUAL.md << 'EOF'
# 📚 ÍNDICE: Documentação Visual e Design - SoloForte

**Organização**: Apenas documentos de design, UI/UX e visual  
**Data**: 4 de Novembro de 2025

---

## 🎨 DESIGN

Documentos sobre o design visual do sistema:

- [DESIGN_CLEAN_FINAL.md](design/DESIGN_CLEAN_FINAL.md) - Design system final
- [SISTEMA_VISUAL_MELHORADO.md](design/SISTEMA_VISUAL_MELHORADO.md) - Melhorias visuais
- [COMPARACAO_UI_ANTES_DEPOIS.md](design/COMPARACAO_UI_ANTES_DEPOIS.md) - Evolução visual
- [PROTOTIPO_COMPLETO.md](design/PROTOTIPO_COMPLETO.md) - Protótipo completo
- [PROTOTIPO_VISUAL_README.md](design/PROTOTIPO_VISUAL_README.md) - Guia do protótipo
- [GUIA_PROTOTIPO_VISUAL.md](design/GUIA_PROTOTIPO_VISUAL.md) - Como usar protótipo
- [PINS_MARKETING_VISUAL.md](design/PINS_MARKETING_VISUAL.md) - Pins visuais
- [TELA_ENTRADA_MAPA_FULLSCREEN.md](design/TELA_ENTRADA_MAPA_FULLSCREEN.md) - Tela fullscreen

---

## 🎯 UI/UX

Experiência do usuário e interface:

- [ANALISE_ERGONOMICA_COMPLETA_APP.md](ui-ux/ANALISE_ERGONOMICA_COMPLETA_APP.md) - Ergonomia
- [ANALISE_SIMPLIFICACAO_UI.md](ui-ux/ANALISE_SIMPLIFICACAO_UI.md) - Simplificação
- [SIMPLIFICACAO_INTERFACE_MAPA.md](ui-ux/SIMPLIFICACAO_INTERFACE_MAPA.md) - Mapa simplificado
- [REORGANIZACAO_MENU_SIMPLIFICADO.md](ui-ux/REORGANIZACAO_MENU_SIMPLIFICADO.md) - Menu
- [GUIA_VISUAL_CORRECOES.md](ui-ux/GUIA_VISUAL_CORRECOES.md) - Correções visuais

---

## 📱 MOBILE

Responsividade e mobile-first:

- [AUDITORIA_RESPONSIVIDADE_MOBILE.md](mobile/AUDITORIA_RESPONSIVIDADE_MOBILE.md) - Auditoria
- [CONFIRMACAO_100_MOBILE.md](mobile/CONFIRMACAO_100_MOBILE.md) - 100% Mobile
- [MOBILE_ONLY_IMPLEMENTADO.md](mobile/MOBILE_ONLY_IMPLEMENTADO.md) - Mobile-only
- [OTIMIZACAO_MOBILE_FIRST.md](mobile/OTIMIZACAO_MOBILE_FIRST.md) - Otimizações
- [INDICE_RESPONSIVIDADE_MOBILE.md](mobile/INDICE_RESPONSIVIDADE_MOBILE.md) - Índice mobile
- [GUIA_TESTE_VISUAL_RESPONSIVIDADE.md](mobile/GUIA_TESTE_VISUAL_RESPONSIVIDADE.md) - Testes

---

## 🧩 COMPONENTES

Componentes visuais do sistema:

- [IMPLEMENTACAO_BOTOES_EXPANSIVEIS_SEPARADOS.md](componentes/IMPLEMENTACAO_BOTOES_EXPANSIVEIS_SEPARADOS.md) - Botões
- [MELHORIAS_UI_LIGHT_IMPLEMENTADAS.md](componentes/MELHORIAS_UI_LIGHT_IMPLEMENTADAS.md) - Melhorias UI
- [GUIA_FAB_DINAMICO.md](componentes/GUIA_FAB_DINAMICO.md) - FAB dinâmico
- [BUSSOLA_PREMIUM_IMPLEMENTADA.md](componentes/BUSSOLA_PREMIUM_IMPLEMENTADA.md) - Bússola
- [ZOOM_PIN_OCORRENCIA_IMPLEMENTADO.md](componentes/ZOOM_PIN_OCORRENCIA_IMPLEMENTADO.md) - Zoom pins
- [RADAR_CLIMA_CAMADA_IMPLEMENTADO.md](componentes/RADAR_CLIMA_CAMADA_IMPLEMENTADO.md) - Radar

---

## 📦 MÓDULOS

Guias visuais de cada módulo:

- [GUIA_DASHBOARD_EXECUTIVO.md](modulos/GUIA_DASHBOARD_EXECUTIVO.md) - Dashboard
- [GUIA_CHAT_SUPORTE.md](modulos/GUIA_CHAT_SUPORTE.md) - Chat
- [GUIA_MARKETING.md](modulos/GUIA_MARKETING.md) - Marketing
- [GUIA_CHECKIN.md](modulos/GUIA_CHECKIN.md) - Check-in
- [GUIA_DESENHO.md](modulos/GUIA_DESENHO.md) - Desenho
- [GUIA_ALERTAS.md](modulos/GUIA_ALERTAS.md) - Alertas
- [NDVI_GUIDE.md](modulos/NDVI_GUIDE.md) - NDVI
- [INTERPRETACAO_GRAFICOS.md](modulos/INTERPRETACAO_GRAFICOS.md) - Gráficos

---

## 📖 GUIDELINES

Diretrizes e guias de uso:

- [COMO_USAR.md](guidelines/COMO_USAR.md) - Como usar o app
- [Guidelines.md](guidelines/Guidelines.md) - Guidelines gerais

---

## 📄 DOCS

Documentação complementar:

- [docs/ANTES_DEPOIS.md](docs/ANTES_DEPOIS.md) - Comparação antes/depois
- [docs/README.md](docs/README.md) - README da pasta docs

---

## 🗑️ BACKUP

Backup de arquivos técnicos removidos: `docs_backup_*`

---

**Última atualização**: 4 de Novembro de 2025
EOF

echo -e "${GREEN}✅ INDICE_DOCUMENTACAO_VISUAL.md criado!${NC}"

# ═══════════════════════════════════════════════════════════════
# FINALIZAÇÃO
# ═══════════════════════════════════════════════════════════════

echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ LIMPEZA CONCLUÍDA COM SUCESSO!${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📊 RESUMO:"
echo "  • Arquivos técnicos movidos para: $BACKUP_DIR"
echo "  • Arquivos de design organizados em pastas temáticas"
echo "  • Novo índice criado: INDICE_DOCUMENTACAO_VISUAL.md"
echo ""
echo "📁 ESTRUTURA FINAL:"
echo "  ├── design/          (8 arquivos)"
echo "  ├── ui-ux/           (5 arquivos)"
echo "  ├── mobile/          (8 arquivos)"
echo "  ├── componentes/     (9 arquivos)"
echo "  ├── modulos/         (11 arquivos)"
echo "  ├── guidelines/      (2 arquivos)"
echo "  ├── docs/            (2 arquivos)"
echo "  ├── README.md"
echo "  ├── Attributions.md"
echo "  └── INDICE_DOCUMENTACAO_VISUAL.md"
echo ""
echo -e "${YELLOW}💡 PRÓXIMO PASSO:${NC}"
echo "   Revisar INDICE_DOCUMENTACAO_VISUAL.md"
echo ""
echo "════════════════════════════════════════════════════════════"
