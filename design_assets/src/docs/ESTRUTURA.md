# 📂 Estrutura da Documentação

## Visão Geral

A documentação do SoloForte está organizada em 6 categorias principais:

```
docs/
├── 📊 auditorias/          ~10 arquivos
├── 📖 guias/               ~35 arquivos
├── 🔧 implementacoes/      ~25 arquivos
├── 🏗️  arquitetura/         ~10 arquivos
├── 🔨 historico/           ~30 arquivos
└── 💡 decisoes/            ~15 arquivos
```

---

## 📊 Auditorias (10 arquivos)

**Propósito:** Auditorias técnicas e relatórios de qualidade do sistema

**Principais arquivos:**
- `AUDITORIA_COMPLETA_TOP_0_1_PERCENT.md` ⭐ Mais recente
- `AUDITORIA_COMPLETA_SISTEMA_2025.md`
- `AUDITORIA_FINAL_POS_REVISAO.md`
- `AUDITORIA_SISTEMA_MAPAS_COMPLETA.md`
- `INVENTARIO_COMPLETO_SISTEMA_ATUAL.md`

**Quando usar:**
- Revisar estado técnico do sistema
- Encontrar problemas identificados
- Verificar melhorias aplicadas
- Baseline para novas auditorias

---

## 📖 Guias (~35 arquivos)

**Propósito:** Documentação prática de uso e desenvolvimento

**Categorias:**

### Setup e Instalação
- `COMO_USAR.md`
- `INSTALL_CAPACITOR.md`
- `QUICK_START_CAPACITOR.md`
- `COMANDOS_CAPACITOR.md`

### Funcionalidades
- `GUIA_MAPAS_OFFLINE.md`
- `GUIA_MARKETING.md`
- `GUIA_SCANNER_PRAGAS.md`
- `GUIA_ALERTAS.md`
- `GUIA_CHECKIN.md`
- `GUIA_CHAT_SUPORTE.md`

### Performance
- `QUICK_START_PERFORMANCE.md`
- `GUIA_LIGHTHOUSE_MONITORING.md`
- `GUIA_REACT_MEMO.md`
- `GUIA_PREFETCH_HOVER.md`

### Análises
- `NDVI_GUIDE.md`
- `INTERPRETACAO_GRAFICOS.md`

**Quando usar:**
- Aprender como usar uma funcionalidade
- Setup inicial do projeto
- Troubleshooting de problemas
- Otimizar performance

---

## 🔧 Implementações (~25 arquivos)

**Propósito:** Histórico de features implementadas

**Principais implementações:**
- `IMPLEMENTACAO_INTEGRACAO_MODULOS.md`
- `IMPLEMENTACAO_CHAT_SUPORTE_COMPLETA.md`
- `IMPLEMENTACAO_NDVI_CLIPPED.md`
- `IMPLEMENTACAO_CLIMA_PREMIUM.md`
- `MOBILE_ONLY_IMPLEMENTADO.md`
- `MAPAS_OFFLINE_IMPLEMENTADO.md`
- `RADAR_CLIMA_CAMADA_IMPLEMENTADO.md`

**Quando usar:**
- Entender como uma feature foi implementada
- Ver decisões técnicas de implementação
- Replicar padrões em novas features
- Onboarding de novos desenvolvedores

---

## 🏗️ Arquitetura (~10 arquivos)

**Propósito:** Decisões arquiteturais e estrutura do sistema

**Principais arquivos:**
- `ESTRUTURA_FINAL_PROJETO.md`
- `STACK_TECNOLOGICO_COMPLETO.md`
- `ARQUITETURA_INTEGRACAO_MODULOS.md`
- `MAPEAMENTO_1_1_SISTEMAS.md`
- `SISTEMA_RASTREAMENTO_CRONOLOGICO.md`

**Quando usar:**
- Entender estrutura do projeto
- Ver decisões de arquitetura
- Planejar novas features grandes
- Documentar mudanças estruturais

---

## 🔨 Histórico (~30 arquivos)

**Propósito:** Correções, patches e mudanças aplicadas

**Categorias:**

### Correções Recentes
- `RESUMO_CORRECOES_MAPAS_29_OUT_2025.md`
- `CORRECAO_LOADING_INFINITO_MAPA.md`
- `CORRECAO_ERRO_APPENDCHILD.md`
- `CORRECOES_MAPDRAWING.md`

### Sessões de Trabalho
- `RESUMO_SESSAO_27_OUT_2025.md`
- `LIMPEZA_EXECUTADA_SUCESSO.md`

### Performance
- `PERFORMANCE_DASHBOARD.md`
- `OTIMIZACOES_CONCLUIDAS.md`

**Quando usar:**
- Investigar bug similar ao passado
- Ver histórico de correções
- Entender evolução do sistema
- Criar relatórios de progresso

---

## 💡 Decisões (~15 arquivos)

**Propósito:** Decisões de produto e análises técnicas

**Principais arquivos:**
- `TIMELINE_COMPLETA_22_SEMANAS.md`
- `DECISAO_GO_NO_GO_EXECUTIVA.md`
- `COMPARACAO_TECNICA_REACT_FLUTTER.md`
- `ANALISE_ERGONOMICA_COMPLETA_APP.md`
- `SPRINT_BACKLOG_PRIORIZADO.md`

**Quando usar:**
- Entender "por quê" de decisões
- Ver comparações técnicas
- Planejar roadmap
- Justificar escolhas para stakeholders

---

## 🔍 Como Encontrar Documentos

### Por Tipo de Tarefa

**Estou começando no projeto:**
1. [README.md](../README.md) na raiz
2. [START_HERE.md](../START_HERE.md)
3. `guias/COMO_USAR.md`
4. `arquitetura/ESTRUTURA_FINAL_PROJETO.md`

**Preciso implementar uma feature:**
1. Ver `implementacoes/` para padrões
2. Ver `arquitetura/` para estrutura
3. Ver `guias/` para funcionalidades relacionadas

**Encontrei um bug:**
1. Procurar em `historico/CORRECAO_*.md`
2. Ver `auditorias/` para problemas conhecidos
3. Criar novo documento se necessário

**Preciso otimizar performance:**
1. `guias/QUICK_START_PERFORMANCE.md`
2. `guias/GUIA_LIGHTHOUSE_MONITORING.md`
3. `historico/PERFORMANCE_DASHBOARD.md`
4. `auditorias/AUDITORIA_COMPLETA_TOP_0_1_PERCENT.md`

**Preciso justificar uma decisão:**
1. `decisoes/` - todas as decisões documentadas
2. `auditorias/` - dados técnicos
3. `arquitetura/` - escolhas estruturais

---

## 📏 Convenções

### Nomenclatura
- `GUIA_*.md` - Guias práticos
- `IMPLEMENTACAO_*.md` - Features implementadas
- `CORRECAO_*.md` - Correções de bugs
- `AUDITORIA_*.md` - Auditorias técnicas
- `DECISAO_*.md` - Decisões de produto
- `RESUMO_*.md` - Resumos e sínteses

### Estrutura de Documento
```markdown
# Título

**Data:** DD/MMM/YYYY
**Status:** Ativo/Obsoleto/Arquivado

## Contexto
[Por que este documento existe]

## Conteúdo
[Informação principal]

## Próximos Passos
[O que fazer depois]
```

---

## 📊 Estatísticas

- **Total de arquivos:** ~125 arquivos .md
- **Categorias:** 6 principais
- **Arquivos na raiz:** ~5-10 (após reorganização)
- **Tamanho total:** ~15MB de documentação
- **Última atualização:** 29/Out/2025

---

## 🔗 Links Úteis

- [README Principal](../README.md)
- [Índice de Documentação](./README.md)
- [Plano de Ação](../PLANO_ACAO_IMEDIATO.md)
- [Última Auditoria](./auditorias/AUDITORIA_COMPLETA_TOP_0_1_PERCENT.md)

---

**Dica:** Use `Ctrl+F` no seu navegador/editor para buscar dentro de um documento específico!
