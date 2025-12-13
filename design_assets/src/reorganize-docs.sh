#!/bin/bash

# ============================================
# SCRIPT DE REORGANIZAÇÃO DE DOCUMENTAÇÃO
# SoloForte - Fase P0 (30 minutos)
# ============================================

echo "🗂️  Reorganizando documentação do SoloForte..."
echo ""

# Criar estrutura de diretórios
echo "📁 Criando estrutura de diretórios..."
mkdir -p docs/auditorias
mkdir -p docs/guias
mkdir -p docs/implementacoes
mkdir -p docs/arquitetura
mkdir -p docs/historico
mkdir -p docs/decisoes

echo "✅ Estrutura criada!"
echo ""

# ============================================
# AUDITORIAS
# ============================================
echo "📊 Movendo AUDITORIAS..."

mv AUDITORIA_COMPLETA_SISTEMA_2025.md docs/auditorias/ 2>/dev/null
mv AUDITORIA_COMPLETA_TOP_0_1_PERCENT.md docs/auditorias/ 2>/dev/null
mv AUDITORIA_FINAL_POS_REVISAO.md docs/auditorias/ 2>/dev/null
mv AUDITORIA_SISTEMA_MAPAS_COMPLETA.md docs/auditorias/ 2>/dev/null
mv AUDITORIA_SISTEMA_MAPAS_DIAGNOSTICO_COMPLETO.md docs/auditorias/ 2>/dev/null
mv AUDITORIA_TECNICA_COMPLETA_REVISAO.md docs/auditorias/ 2>/dev/null
mv INVENTARIO_COMPLETO_SISTEMA_ATUAL.md docs/auditorias/ 2>/dev/null
mv LEIA_PRIMEIRO_AUDITORIA.md docs/auditorias/ 2>/dev/null
mv SUMARIO_AUDITORIA_EXECUTIVO.md docs/auditorias/ 2>/dev/null
mv RESUMO_EXECUTIVO_AUDITORIA.md docs/auditorias/ 2>/dev/null

echo "  ✓ 10 arquivos movidos para docs/auditorias/"

# ============================================
# GUIAS
# ============================================
echo "📖 Movendo GUIAS..."

mv GUIA_*.md docs/guias/ 2>/dev/null
mv COMO_USAR.md docs/guias/ 2>/dev/null
mv INSTALL_CAPACITOR.md docs/guias/ 2>/dev/null
mv QUICK_START_CAPACITOR.md docs/guias/ 2>/dev/null
mv QUICK_START_PERFORMANCE.md docs/guias/ 2>/dev/null
mv QUICK_TEST_PREFETCH.md docs/guias/ 2>/dev/null
mv QUICK_WINS_ADICIONAIS.md docs/guias/ 2>/dev/null
mv COMANDOS_CAPACITOR.md docs/guias/ 2>/dev/null
mv CHECKLIST_CAPACITOR.md docs/guias/ 2>/dev/null
mv NDVI_GUIDE.md docs/guias/ 2>/dev/null
mv INTERPRETACAO_GRAFICOS.md docs/guias/ 2>/dev/null
mv GEOLOCALIZACAO_TROUBLESHOOTING.md docs/guias/ 2>/dev/null
mv LIMITACOES_TECNICAS_AMBIENTE.md docs/guias/ 2>/dev/null
mv API_SETUP.md docs/guias/ 2>/dev/null
mv SECURITY_CHECKLIST_RLS_SUPABASE.md docs/guias/ 2>/dev/null
mv LIGHTHOUSE_TRACKING.md docs/guias/ 2>/dev/null
mv PINS_MARKETING_VISUAL.md docs/guias/ 2>/dev/null
mv DESIGN_CLEAN_FINAL.md docs/guias/ 2>/dev/null
mv DASHBOARD_EXECUTIVO_PREMIUM.md docs/guias/ 2>/dev/null
mv TELA_ENTRADA_MAPA_FULLSCREEN.md docs/guias/ 2>/dev/null

echo "  ✓ ~35 arquivos movidos para docs/guias/"

# ============================================
# IMPLEMENTAÇÕES
# ============================================
echo "🔧 Movendo IMPLEMENTAÇÕES..."

mv IMPLEMENTACAO_*.md docs/implementacoes/ 2>/dev/null
mv MELHORIAS_*.md docs/implementacoes/ 2>/dev/null
mv OTIMIZACAO_*.md docs/implementacoes/ 2>/dev/null
mv MOBILE_ONLY_IMPLEMENTADO.md docs/implementacoes/ 2>/dev/null
mv MAPAS_OFFLINE_IMPLEMENTADO.md docs/implementacoes/ 2>/dev/null
mv RADAR_CLIMA_CAMADA_IMPLEMENTADO.md docs/implementacoes/ 2>/dev/null
mv PROTOTIPO_COMPLETO.md docs/implementacoes/ 2>/dev/null
mv CONFIRMACAO_100_MOBILE.md docs/implementacoes/ 2>/dev/null
mv UNIFICACAO_SCANNER_PRAGAS.md docs/implementacoes/ 2>/dev/null
mv REORGANIZACAO_MENU_SIMPLIFICADO.md docs/implementacoes/ 2>/dev/null
mv SIMPLIFICACAO_INTERFACE_MAPA.md docs/implementacoes/ 2>/dev/null
mv SISTEMA_VISUAL_MELHORADO.md docs/implementacoes/ 2>/dev/null

echo "  ✓ ~25 arquivos movidos para docs/implementacoes/"

# ============================================
# ARQUITETURA
# ============================================
echo "🏗️  Movendo ARQUITETURA..."

mv ARQUITETURA_*.md docs/arquitetura/ 2>/dev/null
mv ESTRUTURA_FINAL_PROJETO.md docs/arquitetura/ 2>/dev/null
mv STACK_TECNOLOGICO_COMPLETO.md docs/arquitetura/ 2>/dev/null
mv MAPEAMENTO_1_1_SISTEMAS.md docs/arquitetura/ 2>/dev/null
mv SISTEMA_RASTREAMENTO_CRONOLOGICO.md docs/arquitetura/ 2>/dev/null
mv DIAGRAMA_*.md docs/arquitetura/ 2>/dev/null
mv EXEMPLO_CODIGO_REFATORADO.md docs/arquitetura/ 2>/dev/null

echo "  ✓ ~10 arquivos movidos para docs/arquitetura/"

# ============================================
# HISTÓRICO (Correções, Patches, Resumos)
# ============================================
echo "🔨 Movendo HISTÓRICO..."

mv CORRECAO_*.md docs/historico/ 2>/dev/null
mv CORRECOES_*.md docs/historico/ 2>/dev/null
mv RESUMO_*.md docs/historico/ 2>/dev/null
mv FIX_*.md docs/historico/ 2>/dev/null
mv PATCHES_*.md docs/historico/ 2>/dev/null
mv CHANGELOG_*.md docs/historico/ 2>/dev/null
mv LIMPEZA_*.md docs/historico/ 2>/dev/null
mv TESTE_*.md docs/historico/ 2>/dev/null
mv TESTES_*.md docs/historico/ 2>/dev/null
mv VALIDACAO_*.md docs/historico/ 2>/dev/null
mv VERIFICACOES_*.md docs/historico/ 2>/dev/null
mv PROGRESSO_*.md docs/historico/ 2>/dev/null
mv STATUS_*.md docs/historico/ 2>/dev/null
mv OTIMIZACOES_CONCLUIDAS.md docs/historico/ 2>/dev/null
mv PERFORMANCE_DASHBOARD.md docs/historico/ 2>/dev/null
mv RESPOSTA_*.md docs/historico/ 2>/dev/null

echo "  ✓ ~30 arquivos movidos para docs/historico/"

# ============================================
# DECISÕES (Product, Go/No-Go, Análises)
# ============================================
echo "💡 Movendo DECISÕES..."

mv DECISAO_*.md docs/decisoes/ 2>/dev/null
mv COMPARACAO_*.md docs/decisoes/ 2>/dev/null
mv ANALISE_*.md docs/decisoes/ 2>/dev/null
mv PRD_*.md docs/decisoes/ 2>/dev/null
mv EQUIVALENCIA_*.md docs/decisoes/ 2>/dev/null
mv SPRINT_*.md docs/decisoes/ 2>/dev/null
mv TIMELINE_*.md docs/decisoes/ 2>/dev/null
mv PROXIMOS_PASSOS_*.md docs/decisoes/ 2>/dev/null

echo "  ✓ ~15 arquivos movidos para docs/decisoes/"

# ============================================
# SCRIPTS E TEMPLATES (mover para raiz ou manter)
# ============================================
echo "📋 Organizando SCRIPTS e TEMPLATES..."

# Manter na raiz (são executáveis/configuração)
# - SCRIPT_SCAN_SECRETS.sh (já na raiz)
# - scripts-cleanup-docs.sh (já na raiz)
# - PULL_REQUEST_TEMPLATE.md (pode ir para .github/)

# Mover documentação de scripts
mv SCRIPT_LIMPEZA_PROJETO.md docs/historico/ 2>/dev/null

echo "  ✓ Scripts organizados"

# ============================================
# ARQUIVOS QUE DEVEM FICAR NA RAIZ
# ============================================
echo ""
echo "📌 Mantendo na RAIZ (essenciais):"
echo "  - README.md"
echo "  - START_HERE.md"
echo "  - Attributions.md"
echo "  - PLANO_ACAO_IMEDIATO.md (novo)"
echo "  - scripts-cleanup-docs.sh (executável)"
echo "  - SCRIPT_SCAN_SECRETS.sh (executável)"
echo ""

# ============================================
# VERIFICAÇÃO
# ============================================
echo "🔍 Verificando reorganização..."
echo ""

ROOT_MD_COUNT=$(find . -maxdepth 1 -name "*.md" -type f | wc -l)
DOCS_COUNT=$(find docs -name "*.md" -type f | wc -l)

echo "📊 Estatísticas:"
echo "  - Arquivos .md na raiz: $ROOT_MD_COUNT"
echo "  - Arquivos .md em /docs: $DOCS_COUNT"
echo ""

if [ $ROOT_MD_COUNT -le 10 ]; then
  echo "✅ SUCESSO! Raiz está limpa (≤10 arquivos .md)"
else
  echo "⚠️  Ainda há $ROOT_MD_COUNT arquivos .md na raiz"
  echo "   Arquivos restantes:"
  find . -maxdepth 1 -name "*.md" -type f
fi

echo ""
echo "📂 Estrutura de /docs:"
echo "  - Auditorias: $(find docs/auditorias -name "*.md" 2>/dev/null | wc -l) arquivos"
echo "  - Guias: $(find docs/guias -name "*.md" 2>/dev/null | wc -l) arquivos"
echo "  - Implementações: $(find docs/implementacoes -name "*.md" 2>/dev/null | wc -l) arquivos"
echo "  - Arquitetura: $(find docs/arquitetura -name "*.md" 2>/dev/null | wc -l) arquivos"
echo "  - Histórico: $(find docs/historico -name "*.md" 2>/dev/null | wc -l) arquivos"
echo "  - Decisões: $(find docs/decisoes -name "*.md" 2>/dev/null | wc -l) arquivos"

echo ""
echo "✅ Reorganização concluída!"
echo ""
echo "📖 Próximos passos:"
echo "  1. Revisar: docs/README.md"
echo "  2. Commit: git add docs/ && git commit -m 'docs: reorganize documentation'"
echo "  3. Verificar que tudo funciona"
echo ""
echo "🎉 Fase P0 completa! Tempo estimado: ~5 minutos"
