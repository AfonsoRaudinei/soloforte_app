# 🎯 Guia Rápido - Protótipo Visual SoloForte

## 🚀 Início Rápido (2 minutos)

### 1. Abrir o Protótipo
```
Acesse a aplicação → Tela inicial aparece
```

### 2. Entrar em Modo Demo
```
Clique no botão azul "Explorar Protótipo"
→ Você será redirecionado para o Dashboard
→ TODOS os dados são simulados localmente
```

### 3. Explorar Funcionalidades
```
Use o FAB (botão flutuante) no canto inferior direito
→ Acesso rápido a todas as 15 funcionalidades
```

---

## 🎨 Tour Guiado das Funcionalidades

### 📍 1. Dashboard com Mapa (Tela Principal)

**O que você vê:**
- Mapa interativo MapTiler (zoom, pan)
- Botões de desenho na lateral direita
- Camadas de visualização (satélite, ruas, terreno)
- Marcadores de ocorrências

**Experimente:**
- ✏️ Clique no ícone de polígono → desenhe uma área no mapa
- 📐 Use o círculo para criar áreas circulares
- 📏 Medidor de área mostra hectares em tempo real
- 🎨 Troque a camada do mapa (botão de camadas)
- 🌿 Ative NDVI para ver saúde das plantas

**Dados Demo:**
- 3 produtores fictícios já cadastrados
- 5 ocorrências ativas plotadas no mapa
- Áreas pré-desenhadas visíveis

---

### 🐛 2. Scanner de Pragas IA

**Como acessar:**
```
FAB → Ícone de Bug (besouro)
OU
Menu → Pragas
```

**O que você vê:**
- Interface de câmera
- Botão para capturar foto
- Preview da análise IA (simulada)

**Experimente:**
- 📸 "Tire uma foto" (upload de arquivo)
- 🤖 Veja análise simulada aparecer
- 📋 Recomendações de tratamento geradas

**Dados Demo:**
- Análise pré-programada: "Ferrugem Asiática - Severidade Alta"
- Recomendações: produtos e dosagens fictícias

---

### 📊 3. Dashboard Executivo

**Como acessar:**
```
FAB → Ícone de BarChart
OU  
Menu → Analytics
```

**O que você vê:**
- KPIs principais (hectares, saúde média, ocorrências)
- Gráficos interativos (Recharts)
- Timeline de eventos
- Distribuição de severidade

**Experimente:**
- 📈 Passe o mouse sobre gráficos (tooltips interativos)
- 🎯 Clique em legendas para filtrar séries
- 📱 Veja responsividade (resize a janela)

**Dados Demo:**
- 12 meses de histórico fictício
- 1.250 ha monitorados
- 23 ocorrências ativas

---

### 👥 4. Gestão de Equipes

**Como acessar:**
```
FAB → Ícone de Users
OU
Menu → Equipes
```

**O que você vê:**
- Lista de colaboradores
- Status de check-in/out
- Localização no mapa
- Histórico de atividades

**Experimente:**
- ➕ Adicione novo membro (formulário simulado)
- 📍 Veja localização dos membros no mapa
- ⏰ Histórico de check-ins

**Dados Demo:**
- 5 membros da equipe fictícios
- Check-ins de hoje simulados
- GPS com coordenadas fixas

---

### ✅ 5. Check-in / Check-out

**Como acessar:**
```
FAB → Ícone de MapPin
OU
Menu → Check-in
```

**O que você vê:**
- Botão grande de Check-in
- Localização atual (simulada)
- Histórico de check-ins
- Tempo trabalhado

**Experimente:**
- 📍 Faça check-in (GPS simulado)
- ⏱️ Veja timer iniciar
- 🏁 Faça check-out
- 📊 Veja relatório de horas

**Dados Demo:**
- GPS fixo em São Paulo (-23.5505, -46.6333)
- Histórico dos últimos 7 dias

---

### 🌿 6. Análise NDVI

**Como acessar:**
```
Dashboard → Selecione uma área desenhada → Botão NDVI
```

**O que você vê:**
- Overlay colorido no mapa (verde = saudável, vermelho = problema)
- Gráfico de distribuição de saúde
- Percentual de área saudável
- Timeline de evolução

**Experimente:**
- 🎨 Veja gradiente de cores (verde → amarelo → vermelho)
- 📊 Analise gráfico de barras
- 📅 Veja histórico de 30 dias

**Dados Demo:**
- 85% de área saudável em média
- Dados fictícios mas realistas

---

### 📝 7. Registro de Ocorrências

**Como acessar:**
```
Dashboard → Clique no mapa → Botão "Nova Ocorrência"
```

**O que você vê:**
- Formulário completo
- Upload de fotos
- Seletor de tipo de praga/doença
- Severidade (baixa/média/alta)
- Campo de notas

**Experimente:**
- 📸 Upload múltiplas fotos
- 📋 Preencha campos
- 💾 Salve (dados vão para LocalStorage)
- 🗺️ Veja marcador aparecer no mapa

**Dados Demo:**
- 10+ tipos de ocorrências pré-cadastradas
- Histórico de ocorrências anterior

---

### 📄 8. Exportação de Relatórios

**Como acessar:**
```
Menu → Relatórios → Botão "Exportar"
```

**O que você vê:**
- Opções de formato (PDF, Excel, CSV)
- Preview do relatório
- Filtros de data
- Seleção de conteúdo

**Experimente:**
- 📋 Selecione formato
- 🗓️ Escolha período
- 👁️ Preview visual
- 💾 "Download" simulado (alert de sucesso)

**Dados Demo:**
- Preview de PDF estático
- Dados simulados no Excel preview

---

### 🔔 9. Alertas Automáticos

**Como acessar:**
```
Menu → Configurações → Alertas
OU
Sino no header (notificações)
```

**O que você vê:**
- Lista de alertas ativos
- Configuração de gatilhos
- Histórico de notificações
- Toggle on/off por tipo

**Experimente:**
- 🔕 Ative/desative tipos de alerta
- ⚙️ Configure thresholds
- 📬 Veja notificações aparecerem (toasts)

**Dados Demo:**
- 3 alertas pré-configurados
- Notificações simuladas a cada 30s

---

### 🗺️ 10. Mapas Offline

**Como acessar:**
```
Dashboard → Ícone de Layers → "Download para Offline"
```

**O que você vê:**
- Interface de seleção de área
- Barra de progresso de download
- Tamanho estimado
- Status de áreas baixadas

**Experimente:**
- 📦 Selecione área para download
- ⬇️ Veja progresso simulado (0% → 100%)
- ✅ Área marcada como disponível offline

**Dados Demo:**
- Download simulado com delay de 3s
- Tamanhos fictícios (MB estimados)

---

### 💬 11. Chat / Suporte In-App

**Como acessar:**
```
FAB → Ícone de MessageSquare
OU
Menu → Chat/Suporte
```

**O que você vê:**
- Interface de chat
- Histórico de conversas
- Status online/offline
- Campo de mensagem

**Experimente:**
- 💬 Envie mensagens
- 🤖 Receba respostas automáticas (bot)
- 📎 "Anexe" arquivos (simulado)

**Dados Demo:**
- Histórico de conversas anterior
- Bot responde automaticamente

---

### ☁️ 12. Radar Climático

**Como acessar:**
```
Menu → Clima → Tab "Radar"
```

**O que você vê:**
- Mapa com overlay de precipitação
- Animação de movimento de nuvens
- Previsão próximas horas
- Alertas de tempestade

**Experimente:**
- ▶️ Play na animação
- 🎨 Veja cores de intensidade
- ⚠️ Alertas de chuva forte

**Dados Demo:**
- Overlay estático colorido
- Animação de 4 frames

---

### 📅 13. Agenda

**Como acessar:**
```
Menu → Agenda
```

**O que você vê:**
- Calendário mensal
- Lista de tarefas
- Check-ins agendados
- Eventos de plantio/colheita

**Experimente:**
- ➕ Adicione evento
- ✅ Marque como completo
- 📅 Navegue entre meses

**Dados Demo:**
- 10 eventos do mês
- Tarefas recorrentes

---

### 👨‍🌾 14. Clientes / Produtores

**Como acessar:**
```
Menu → Clientes
```

**O que você vê:**
- Lista de produtores
- Fazendas associadas
- Áreas totais
- Contatos

**Experimente:**
- ➕ Cadastre novo produtor
- 📋 Veja detalhes
- 🗺️ Visualize fazendas no mapa

**Dados Demo:**
- 3 produtores pré-cadastrados
- Total de 1.250 ha

---

### ⚙️ 15. Configurações e Temas

**Como acessar:**
```
Menu → Configurações
```

**O que você vê:**
- Toggle Dark/Light mode
- Configurações de mapa
- Preferências de notificação
- Sobre o app

**Experimente:**
- 🌓 Troque tema (escuro/claro)
- 🔔 Configure notificações
- 🗺️ Altere provedor de mapas

---

## 🎮 Interações Especiais

### Gestos no Mapa
- **Pinch:** Zoom in/out
- **Pan:** Arrastar para mover
- **Double-click:** Zoom rápido
- **Right-click:** Menu de contexto

### Atalhos de Teclado (Desktop)
- **Ctrl+M:** Performance Monitor
- **Ctrl+D:** Toggle Demo Mode
- **Ctrl+Shift+M:** Metrics Dashboard

### FAB (Floating Action Button)
- **Click:** Expandir menu
- **Hover:** Preview de ícones
- **Contextual:** Muda por tela

---

## 📊 Dados Simulados

### Produtores Demo
```
1. João Silva
   - Fazenda Boa Vista
   - 500 ha
   - Soja e Milho

2. Maria Santos
   - Fazenda Santa Clara
   - 350 ha
   - Algodão

3. Pedro Oliveira
   - Fazenda Esperança
   - 720 ha
   - Café
```

### Ocorrências Demo
```
1. Ferrugem Asiática - Alta severidade
2. Lagarta do Cartucho - Média severidade
3. Deficiência de Nitrogênio - Baixa severidade
4. Ataque de Pulgões - Média severidade
5. Mancha Foliar - Baixa severidade
```

### Métricas Dashboard
```
- Total monitorado: 1.250 ha
- Saúde média: 85%
- Ocorrências ativas: 23
- Check-ins hoje: 12
- Áreas desenhadas: 8
- Fotos registradas: 47
```

---

## 🔄 Persistência de Dados

### O que é salvo no LocalStorage:
- ✅ Modo demo ativo
- ✅ Tema (dark/light)
- ✅ Polígonos desenhados
- ✅ Ocorrências registradas
- ✅ Check-ins feitos
- ✅ Preferências de configuração

### Como resetar dados:
```javascript
// No console do navegador:
localStorage.clear();
location.reload();
```

---

## 🎯 Casos de Uso Recomendados

### Para Apresentações (15 min)
1. **Início:** Home → Modo Demo
2. **Dashboard:** Mostre mapa + desenho de áreas (2 min)
3. **Scanner IA:** Upload foto → análise (2 min)
4. **Dashboard Executivo:** Gráficos e KPIs (3 min)
5. **NDVI:** Análise de saúde de área (2 min)
6. **Gestão Equipes:** Check-in e localização (2 min)
7. **Relatórios:** Preview de exportação (2 min)
8. **Q&A:** Responda perguntas mostrando detalhes (2 min)

### Para Testes de UX (30 min)
1. **Onboarding:** Peça ao usuário explorar livremente (5 min)
2. **Tarefas Guiadas:**
   - "Desenhe uma área de 10 hectares" (5 min)
   - "Registre uma ocorrência de praga" (5 min)
   - "Analise a saúde de uma área com NDVI" (5 min)
   - "Faça check-in e visualize no mapa" (5 min)
3. **Feedback:** Colete impressões (5 min)

### Para Investidores (10 min)
1. **Visão Geral:** Mostre Home + número de sistemas (1 min)
2. **Diferencial IA:** Scanner de pragas com GPT-4 Vision (2 min)
3. **Analytics:** Dashboard Executivo com ROI simulado (3 min)
4. **Escalabilidade:** Gestão de Equipes e Produtores (2 min)
5. **Mobile-First:** Demonstre responsividade (2 min)

---

## 🐛 Troubleshooting

### Protótipo não carrega
```
1. Abra console (F12)
2. Verifique erros
3. Tente: localStorage.clear() + reload
```

### Mapa não aparece
```
1. Verifique conexão de internet (MapTiler requer online)
2. Teste em navegador diferente
3. Desative extensões de bloqueio
```

### Dados não salvam
```
1. LocalStorage pode estar cheio
2. Modo privado/anônimo bloqueia storage
3. Use navegador normal (Chrome/Firefox)
```

### Performance ruim
```
1. Feche abas desnecessárias
2. Desative Performance Monitor (Ctrl+Shift+M)
3. Use Chrome/Edge para melhor desempenho
```

---

## 🎓 Próximos Passos

### Após explorar o protótipo:

✅ **Validou a UX?** → Comece desenvolvimento real
✅ **Precisa ajustes?** → Liste feedback para iteração
✅ **Quer expandir?** → Adicione mais dados demo
✅ **Pronto para Flutter?** → Use PRD como guia

### Recursos Adicionais:
- 📄 `PRD_MIGRACAO_FLUTTER_SEGURA.md` - Plano de migração completo
- 📊 `MAPEAMENTO_1_1_SISTEMAS.md` - Equivalências React ↔ Flutter
- 💰 `ANALISE_CUSTOS_ROI_COMPLETA.md` - Análise financeira
- 🎯 `DECISAO_GO_NO_GO_EXECUTIVA.md` - Recomendação final

---

**Versão:** 1.0.0  
**Data:** 24/10/2025  
**Tempo médio de exploração:** 15-30 minutos  
**Compatibilidade:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
