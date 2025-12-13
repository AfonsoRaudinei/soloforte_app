# 🌿 Guia de Uso - Sistema NDVI SoloForte

## O que é NDVI?

O **NDVI (Normalized Difference Vegetation Index)** é um índice que mede a saúde e biomassa da vegetação através de imagens de satélite. Valores variam de -1 a +1:

- **0.6 - 1.0** 🟢 Verde Escuro - Alta biomassa, vegetação muito saudável
- **0.4 - 0.6** 🟢 Verde - Boa vegetação
- **0.2 - 0.4** 🟡 Verde Claro - Vegetação moderada
- **0.0 - 0.2** 🟡 Amarelo - Vegetação baixa
- **-1.0 - 0.0** 🔴 Vermelho - Solo exposto, sem vegetação

---

## 📋 Como Usar no SoloForte

### 1️⃣ **Desenhar uma Área**
Antes de usar o NDVI, você precisa ter uma área desenhada no mapa:

1. Clique no botão **🖊️ Lápis** (lado direito do mapa)
2. Escolha uma ferramenta:
   - **Forma Livre** - Desenhar livremente
   - **Polígono** - Criar polígono com pontos
   - **Pivô** - Círculo para pivô central
   - **Retângulo** - Área retangular
   - **Importar KML/KMZ** - Importar de arquivo

3. Desenhe sua área no mapa
4. Dê um nome e salve

### 2️⃣ **Abrir o Visualizador NDVI**

1. Clique no botão **🧠 Brain** (lado direito do mapa)
2. Se não houver área desenhada, aparecerá uma mensagem pedindo para desenhar primeiro

### 3️⃣ **Configurar a Análise**

No painel NDVI que abre à direita:

1. **Fonte de Imagens:**
   - **Sentinel-2 (ESA)** - Resolução 10m, gratuito
   - **Planet Labs** - Resolução 3m, maior detalhe

2. **Data da Imagem:**
   - Selecione a data desejada
   - Datas mais recentes disponíveis no topo
   - Verifica cobertura de nuvens automaticamente

### 4️⃣ **Visualizar Resultados**

Após selecionar data e fonte, você verá:

#### **📊 Estatísticas Gerais**
- NDVI Médio da área
- Cobertura de nuvens (%)
- Data de captura da imagem

#### **🌈 Distribuição de Biomassa**
Gráfico de barras colorido mostrando percentual de cada categoria:
- Verde Escuro: Alta biomassa
- Verde: Boa vegetação
- Verde Claro: Moderada
- Amarelo: Baixa
- Vermelho: Muito baixa/solo

#### **⚠️ Alertas Automáticos**
Se mais de 10% da área tiver biomassa muito baixa, aparece alerta sugerindo:
- Verificar irrigação
- Checar nutrição do solo
- Investigar possíveis problemas

#### **🎚️ Controle de Opacidade**
Ajuste a transparência da camada NDVI sobre o mapa (0-100%)

### 5️⃣ **Comparar Múltiplas Áreas**

Clique na aba **🔄 Comparar** para analisar várias áreas simultaneamente:

#### **Seleção de Áreas**
- Lista completa das suas áreas desenhadas
- Checkbox para selecionar/desselecionar
- Até 5 áreas simultâneas
- Cor única para cada área no gráfico
- Área atual pré-selecionada

#### **Gráfico Comparativo**
- Linhas coloridas mostrando cada área
- Todas as áreas no mesmo gráfico
- Fácil identificação de diferenças
- Tooltip com nome e valor ao passar o mouse
- Legenda automática com cores

#### **Tabela de Estatísticas**
Comparação lado a lado:
- NDVI Médio de cada área
- NDVI Máximo alcançado
- NDVI Mínimo registrado
- Tendência (↗️ crescimento, ↘️ declínio, → estável)
- Percentual de variação
- Ordenado por melhor performance

#### **Análise Automática**

**🏆 Melhor Performance:**
- Identifica automaticamente a área com melhor NDVI médio
- Destaca em verde
- Mostra por que é a melhor

**⚠️ Requer Atenção:**
- Identifica área com pior performance
- Calcula diferença percentual
- Lista o que verificar

**📉 Áreas em Declínio:**
- Lista áreas com tendência negativa
- Mostra percentual de queda
- Sugere ações corretivas

#### **Recomendações Inteligentes**
- Use melhor área como referência
- Documente práticas bem-sucedidas
- Uniformize manejo
- Priorize investimentos
- Monitore áreas críticas

#### **Casos de Uso:**
- Comparar diferentes variedades
- Avaliar eficácia de manejos distintos
- Identificar áreas problemáticas
- Tomar decisões de investimento
- Replicar sucesso nas demais áreas

### 6️⃣ **Visualizar Histórico Temporal**

Clique na aba **📊 Histórico** para ver a evolução ao longo do tempo:

#### **Gráfico de Evolução NDVI**
- Gráfico de área mostrando tendência temporal
- Valores de -1 a +1 no eixo vertical
- Datas no eixo horizontal
- Hover para ver valores exatos

#### **Análise de Tendência**
Badge colorido mostrando:
- 🟢 **Crescimento**: Vegetação melhorando
- 🔴 **Declínio**: Vegetação piorando
- ⚪ **Estável**: Sem mudanças significativas
- Percentual de variação no período

#### **Gráfico de Distribuição**
Linhas mostrando evolução de:
- Verde: Alta biomassa ao longo do tempo
- Vermelho: Baixa biomassa ao longo do tempo

#### **Estatísticas do Período**
Cards com:
- NDVI Máximo alcançado
- NDVI Mínimo registrado
- NDVI Médio do período
- Número total de medições

#### **Seletor de Período**
Escolha o intervalo de análise:
- 📅 Últimos 30 dias
- 📅 Últimos 60 dias
- 📅 Últimos 90 dias
- 📅 Últimos 6 meses

#### **Alertas Inteligentes**
Se detectar declínio, mostra recomendações:
- Verificar sistema de irrigação
- Avaliar nutrientes do solo
- Inspecionar pragas/doenças
- Considerar análise laboratorial

### 7️⃣ **Exportar Relatórios em HTML**

Cada aba tem seu próprio botão de exportação:

#### **📄 Relatório de Análise Atual**
- Clique em "Exportar Relatório HTML" na aba Atual
- Abre em nova janela/aba
- Inclui:
  - Informações da área (nome, tamanho, data)
  - NDVI médio em destaque
  - Distribuição completa de biomassa
  - Gráficos coloridos
  - Alertas automáticos se houver
  - Interpretação e recomendações
- **Botão de Impressão** no topo do relatório
- Design otimizado para impressão
- Layout profissional e responsivo

#### **📈 Relatório Histórico**
- Clique em "Exportar Relatório Histórico HTML" na aba Histórico
- Inclui:
  - Badge de tendência (crescimento/declínio/estável)
  - 4 cards com estatísticas (máximo, mínimo, médio, medições)
  - Timeline com todas as datas e valores
  - Alertas se houver declínio
  - Recomendações específicas
- Perfeito para acompanhamento temporal
- Compartilhável com agrônomos e consultores

#### **🔄 Relatório de Comparação**
- Clique em "Exportar Relatório de Comparação HTML" na aba Comparar
- Inclui:
  - Tabela completa com todas as áreas
  - Cores identificando cada área
  - 🏆 Troféu na melhor área
  - Análise da melhor performance
  - Análise da área que requer atenção
  - Diferença percentual entre áreas
  - Recomendações gerais
- Ideal para tomada de decisão
- Suporte para reuniões e apresentações

#### **🖨️ Como Imprimir:**
1. Clique no botão de exportação
2. Relatório abre em nova janela
3. Clique no botão "🖨️ Imprimir Relatório" (topo direito)
4. Ou use Ctrl+P (Windows) / Cmd+P (Mac)
5. Escolha impressora ou "Salvar como PDF"
6. Configure opções e imprima/salve

#### **💾 Salvar como PDF:**
1. Exporte o relatório HTML
2. Clique em imprimir
3. Escolha "Salvar como PDF" como destino
4. Configure opções (margens, orientação)
5. Clique em "Salvar"
6. Escolha local e nome do arquivo

#### **📤 Compartilhar:**
- Copie o HTML e envie por email
- Salve como PDF e compartilhe
- Print screen para WhatsApp
- Link direto (se hospedado)

---

## 🔑 Configuração das APIs

### **Sentinel Hub API** (ESA)
1. Crie conta gratuita em https://www.sentinel-hub.com/
2. Obtenha Client ID e Client Secret
3. Configure as variáveis de ambiente:
   - `SENTINEL_HUB_CLIENT_ID`
   - `SENTINEL_HUB_CLIENT_SECRET`

### **Planet Labs API**
1. Crie conta em https://www.planet.com/
2. Obtenha API Key
3. Configure a variável de ambiente:
   - `PLANET_API_KEY`

---

## 💡 Casos de Uso

### **Monitoramento de Lavouras**
- 📈 Acompanhe o desenvolvimento da cultura ao longo do tempo
- 📊 Veja gráficos de evolução semanal/mensal
- 🔍 Identifique áreas com problemas precocemente
- 📉 **Compare até 5 talhões simultaneamente**
- 🏆 **Ranking automático de performance**
- ⚠️ Receba alertas de declínio automáticos

### **Comparação de Variedades**
- 🌱 Compare desempenho de diferentes híbridos/variedades
- 📊 Gráficos lado a lado de 2-5 áreas
- 🎯 Identifique qual variedade está melhor
- 💰 Tome decisões de compra para próxima safra
- 📈 Avalie adaptação ao seu solo/clima

### **Manejo de Irrigação**
- Detecte áreas com estresse hídrico
- Otimize o uso de água
- Reduza custos com irrigação

### **Aplicação de Insumos**
- Mapeie áreas que precisam de mais nutrientes
- **Compare resposta à adubação entre áreas**
- Faça aplicação taxa variável
- Reduza desperdício de fertilizantes
- Identifique áreas com melhor eficiência nutricional

### **Detecção de Pragas e Doenças**
- Identifique focos de infestação rapidamente
- Monitore a evolução do problema
- Tome decisões mais rápidas

---

## 📈 Interpretação dos Resultados

### **NDVI > 0.6**
✅ **Excelente!** Vegetação muito saudável e densa
- Continue o manejo atual
- Momento ideal para colheita (culturas específicas)

### **NDVI 0.4 - 0.6**
✅ **Bom!** Vegetação saudável
- Desenvolvimento normal
- Pode precisar de ajustes pontuais

### **NDVI 0.2 - 0.4**
⚠️ **Atenção!** Vegetação moderada
- Verificar necessidades nutricionais
- Avaliar irrigação
- Pode indicar estágio inicial de crescimento

### **NDVI 0.0 - 0.2**
❌ **Problema!** Vegetação esparsa
- Investigar causas imediatamente
- Possível déficit hídrico
- Possível deficiência nutricional
- Verificar pragas/doenças

### **NDVI < 0.0**
🚨 **Crítico!** Solo exposto ou água
- Área sem vegetação
- Pode indicar falha no plantio
- Requer ação imediata

---

## 🎯 Dicas Profissionais

1. **Compare ao longo do tempo** - Uma única medição não conta a história completa. Compare semanalmente.

2. **Compare entre áreas** - Use a aba Comparar para identificar padrões e diferenças entre talhões.

3. **Atenção às nuvens** - Imagens com >30% de cobertura de nuvens podem não ser confiáveis.

4. **Considere a fenologia** - NDVI varia naturalmente conforme a planta cresce. Culturas novas terão NDVI baixo.

5. **Use com outras métricas** - Combine NDVI com dados de clima, solo e manejo para decisões mais assertivas.

6. **Calibre com visitas de campo** - Visite áreas com NDVI anômalo para entender o que está acontecendo.

7. **Aprenda com a melhor área** - Use a área top como referência e replique práticas nas demais.

---

## 🔧 Resolução de Problemas

### **"Para usar o NDVI, primeiro desenhe uma área"**
➡️ Você precisa desenhar ou importar uma área no mapa primeiro. Use o botão Lápis.

### **"Erro ao processar NDVI"**
➡️ Verifique se as APIs estão configuradas corretamente nas variáveis de ambiente.

### **"Modo Demo - Dados Simulados"**
➡️ As APIs não estão configuradas. Configure Sentinel Hub ou Planet para dados reais.

### **Imagem com muitas nuvens**
➡️ Tente outra data. O sistema filtra automaticamente imagens com <30% de nuvens.

---

## 🌟 Recursos Implementados

- ✅ Histórico temporal com gráficos de evolução
- ✅ Análise de tendências automática
- ✅ Comparação entre múltiplas áreas
- ✅ **Exportação de relatórios em HTML (NOVO!)**
- ✅ **Impressão otimizada de relatórios (NOVO!)**
- ✅ Estatísticas comparativas
- ✅ Ranking automático de performance
- ✅ Alertas inteligentes
- ✅ Múltiplas fontes de satélite
- ✅ Modo demo funcional

## 🚀 Próximos Recursos (Em Desenvolvimento)

- 🎯 Mapas de aplicação taxa variável
- 📧 Alertas automáticos por email/SMS
- 🤖 IA para recomendações personalizadas
- 📱 Comparação com safras anteriores
- 📊 Exportação para Excel/CSV
- 📧 Envio automático de relatórios por email

---

## 📞 Suporte

Problemas ou dúvidas? Use o botão **💬 Feedback** no menu principal e descreva sua questão.

**SoloForte** - Transformando complexidade em decisões simples e produtivas 🌱
