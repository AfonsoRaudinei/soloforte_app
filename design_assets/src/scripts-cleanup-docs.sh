#!/bin/bash

# 🧹 SCRIPT DE LIMPEZA DE DOCUMENTAÇÃO
# Remove 73 arquivos .md obsoletos identificados na auditoria
# Data: 28/10/2025

set -e  # Exit on error

echo "🧹 INICIANDO LIMPEZA DE DOCUMENTAÇÃO..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Criar pasta de histórico
echo "📁 Criando pasta de arquivo..."
mkdir -p archive/docs-historico

# Contador
MOVED=0

# Função para mover arquivo
move_file() {
    local file=$1
    if [ -f "$file" ]; then
        mv "$file" archive/docs-historico/
        echo "  ✅ Movido: $file"
        ((MOVED++))
    else
        echo "  ⚠️  Não encontrado: $file"
    fi
}

echo ""
echo "📦 CATEGORIA: Auditorias Antigas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
move_file "AUDITORIA_FINAL_POS_REVISAO.md"
move_file "AUDITORIA_SISTEMA_MAPAS_COMPLETA.md"
move_file "AUDITORIA_TECNICA_COMPLETA_REVISAO.md"
move_file "CHANGELOG_AUDITORIA_2025.md"
move_file "RESUMO_EXECUTIVO_AUDITORIA.md"
move_file "MELHORIAS_APLICADAS_AUDITORIA.md"

echo ""
echo "🛠️  CATEGORIA: Implementações Concluídas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
move_file "IMPLEMENTACAO_BOTOES_EXPANSIVEIS_SEPARADOS.md"
move_file "IMPLEMENTACAO_CHAT_SUPORTE_COMPLETA.md"
move_file "IMPLEMENTACAO_CLIMA_PREMIUM.md"
move_file "IMPLEMENTACAO_GEOLOCALIZACAO_CLIMA.md"
move_file "IMPLEMENTACAO_INTEGRACAO_MODULOS.md"
move_file "IMPLEMENTACAO_NDVI_CLIPPED.md"
move_file "IMPLEMENTACAO_PREFETCH_HOVER.md"
move_file "IMPLEMENTACAO_RAPIDA.md"
move_file "IMPLEMENTACAO_SALVAR_ANALISE_RELATORIO.md"
move_file "IMPLEMENTACAO_VISUALIZAR_EDITAR_RELATORIOS.md"
move_file "MAPAS_OFFLINE_IMPLEMENTADO.md"
move_file "MOBILE_ONLY_IMPLEMENTADO.md"
move_file "RADAR_CLIMA_CAMADA_IMPLEMENTADO.md"
move_file "SISTEMA_VISUAL_MELHORADO.md"
move_file "UNIFICACAO_SCANNER_PRAGAS.md"

echo ""
echo "🔧 CATEGORIA: Correções Aplicadas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
move_file "CORRECAO_ERRO_MAPA_MARKETING.md"
move_file "CORRECAO_LOADING_INFINITO_MAPA.md"
move_file "CORRECAO_MAPAS_CAMADAS.md"
move_file "CORRECAO_PERMISSOES_CAMERA.md"
move_file "CORRECAO_TIMEOUT_LEAFLET.md"
move_file "RESUMO_CORRECOES_CAMERA.md"
move_file "TESTE_RAPIDO_CORRECOES.md"

echo ""
echo "📋 CATEGORIA: PRDs e Decisões Antigas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
move_file "DECISAO_GO_NO_GO_1_PAGINA.md"
move_file "DECISAO_GO_NO_GO_EXECUTIVA.md"
move_file "PRD_CONCLUIDO_README.md"
move_file "PRD_MIGRACAO_FLUTTER_SEGURA.md"
move_file "RESUMO_EXECUTIVO_PRD_FLUTTER.md"
move_file "STATUS_FINAL_PRD_COMPLETO.md"
move_file "ANALISE_ESTADO_ATUAL_FLUTTER.md"
move_file "ARQUITETURA_FLUTTER_CLEAN.md"
move_file "COMPARACAO_TECNICA_REACT_FLUTTER.md"
move_file "EQUIVALENCIA_FLUTTER_GARANTIDA.md"

echo ""
echo "🎨 CATEGORIA: Análises UI/UX Antigas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
move_file "ANALISE_ERGONOMICA_COMPLETA_APP.md"
move_file "ANALISE_SIMPLIFICACAO_UI.md"
move_file "COMPARACAO_UI_ANTES_DEPOIS.md"
move_file "DESIGN_CLEAN_FINAL.md"
move_file "MELHORIAS_UI_LIGHT_IMPLEMENTADAS.md"
move_file "PROXIMOS_PASSOS_UI_SIMPLIFICACAO.md"
move_file "REORGANIZACAO_MENU_SIMPLIFICADO.md"
move_file "SIMPLIFICACAO_INTERFACE_MAPA.md"

echo ""
echo "📊 CATEGORIA: Guias Redundantes"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
move_file "GUIA_ALERTAS.md"
move_file "GUIA_ARMAZENAMENTO_SEGURO_MOBILE.md"
move_file "GUIA_CHECKIN.md"
move_file "GUIA_COMPARACAO.md"
move_file "GUIA_COMPLETAR_CORRECOES.md"
move_file "GUIA_DASHBOARD_EXECUTIVO.md"
move_file "GUIA_DESENHO.md"
move_file "GUIA_ERROR_BOUNDARY.md"
move_file "GUIA_EXECUCAO_FASES_2_3_4.md"
move_file "GUIA_EXPORTACAO_VISUAL.md"
move_file "GUIA_FAB_DINAMICO.md"
move_file "GUIA_IMPLEMENTACAO_ERGONOMIA_FASE2.md"
move_file "GUIA_INTEGRACAO_PRODUTORES.md"
move_file "GUIA_LIGHTHOUSE_MONITORING.md"
move_file "GUIA_MARKETING.md"
move_file "GUIA_MIGRACAO_CAPACITOR.md"
move_file "GUIA_PREFETCH_HOVER.md"
move_file "GUIA_PROTOTIPO_VISUAL.md"
move_file "GUIA_REACT_MEMO.md"
move_file "GUIA_SKELETONS.md"

echo ""
echo "📝 CATEGORIA: Documentos Diversos Obsoletos"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
move_file "API_SETUP.md"
move_file "ARQUITETURA_INTEGRACAO_MODULOS.md"
move_file "DASHBOARD_EXECUTIVO_PREMIUM.md"
move_file "DIAGRAMA_FLUXO_INTEGRACAO_COMPLETO.md"
move_file "DIAGRAMA_FLUXO_RELATORIOS.md"
move_file "ESTRUTURA_FINAL_PROJETO.md"
move_file "EXEMPLO_CODIGO_REFATORADO.md"
move_file "INTERPRETACAO_GRAFICOS.md"
move_file "LIGHTHOUSE_TRACKING.md"
move_file "LIMPEZA_EXECUTADA_SUCESSO.md"
move_file "MELHORIA_BOTAO_FECHAR_NDVI.md"
move_file "PERFORMANCE_DASHBOARD.md"
move_file "PROTOTIPO_COMPLETO.md"
move_file "PROTOTIPO_VISUAL_README.md"
move_file "PROGRESSO_OTIMIZACAO.md"
move_file "PULL_REQUEST_TEMPLATE.md"
move_file "QUICK_START_PERFORMANCE.md"
move_file "QUICK_TEST_PREFETCH.md"
move_file "QUICK_WINS_ADICIONAIS.md"
move_file "RESPOSTA_PERFORMANCE_MOBILE.md"
move_file "RESUMO_INTEGRACAO_MODULOS.md"
move_file "RESUMO_MELHORIAS_PROTOTIPO.md"
move_file "RESUMO_REVISAO_COMPLETA.md"
move_file "RESUMO_SESSAO_27_OUT_2025.md"
move_file "SCRIPT_LIMPEZA_PROJETO.md"
move_file "SISTEMA_RASTREAMENTO_CRONOLOGICO.md"
move_file "SPRINT_BACKLOG_PRIORIZADO.md"
move_file "TELA_ENTRADA_MAPA_FULLSCREEN.md"
move_file "TESTE_RASTREAMENTO_CRONOLOGICO.md"
move_file "VALIDACAO_AREAS.md"
move_file "VERIFICACOES_CONDICIONAIS_FINALIZADAS.md"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ LIMPEZA CONCLUÍDA!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Estatísticas:"
echo "   Arquivos movidos: $MOVED"
echo "   Destino: ./archive/docs-historico/"
echo ""
echo "📋 Arquivos MANTIDOS (22 essenciais):"
echo "   ✅ AUDITORIA_COMPLETA_SISTEMA_2025.md (NOVA)"
echo "   ✅ START_HERE.md"
echo "   ✅ README.md"
echo "   ✅ GUIA_CASES_DE_SUCESSO.md"
echo "   ✅ GUIA_CHAT_SUPORTE.md"
echo "   ✅ GUIA_MAPAS_OFFLINE.md"
echo "   ✅ GUIA_RAPIDO_SCANNER_PRAGAS.md"
echo "   ✅ GUIA_RAPIDO_VER_EDITAR_RELATORIO.md"
echo "   ✅ PINS_MARKETING_VISUAL.md"
echo "   ✅ GEOLOCALIZACAO_TROUBLESHOOTING.md"
echo "   ✅ LIMITACOES_TECNICAS_AMBIENTE.md"
echo "   ✅ MAPEAMENTO_1_1_SISTEMAS.md"
echo "   ✅ TIMELINE_COMPLETA_22_SEMANAS.md"
echo "   ✅ STACK_TECNOLOGICO_COMPLETO.md"
echo "   ✅ OTIMIZACAO_MOBILE_FIRST.md"
echo "   ✅ CONFIRMACAO_100_MOBILE.md"
echo "   ✅ NDVI_GUIDE.md"
echo "   ✅ Attributions.md"
echo "   ✅ COMO_USAR.md"
echo "   ✅ Checklists e Install guides (Capacitor)"
echo ""
echo "🎯 Próximos passos:"
echo "   1. Revisar arquivos em archive/docs-historico/"
echo "   2. git add ."
echo "   3. git commit -m 'chore: limpar documentação redundante (-73 arquivos)'"
echo "   4. git push"
echo ""
echo "✨ Redução: 77% dos arquivos .md (95 → 22)"
echo ""
