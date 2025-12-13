# 🔑 Guia de Configuração de APIs - SoloForte

Este guia explica como configurar todas as APIs necessárias para o SoloForte funcionar completamente.

## 📋 APIs Necessárias

### 1. ✅ Supabase (Obrigatório - Já Configurado)
**Usado para:** Autenticação, banco de dados e backend

✓ **Status:** Conectado e configurado automaticamente
- Sistema de login/cadastro funcionando
- Armazenamento de dados (ocorrências, relatórios, eventos, perfis)
- Autenticação de usuários

**Não requer configuração adicional!**

---

### 2. 🗺️ MapTiler (Obrigatório)
**Usado para:** Mapas interativos no Dashboard e visualização de talhões

✓ **Status:** Já configurado e funcionando

#### Como foi configurado:
- API key já solicitada e salva
- Mapas com camadas Satélite, Relevo e Explorar
- Sistema de geolocalização ativo
- Bússola funcional com orientação para o norte

**Limite gratuito:** 100.000 visualizações de mapa/mês

---

### 3. 🛰️ Sentinel Hub (Recomendado para NDVI)
**Usado para:** Imagens de satélite Sentinel-2 para análise NDVI

✓ **Status:** Já configurado e pronto para uso

#### Recursos:
- Resolução: 10m por pixel
- Atualização: A cada 5 dias
- Histórico: Desde 2015
- Cobertura: Global

#### Como funciona:
1. Usuário seleciona área no mapa
2. Sistema busca imagens Sentinel-2 da data escolhida
3. Processa NDVI automaticamente
4. Exibe camada colorida e estatísticas

**Planos:**
- Trial: 30 dias gratuitos
- Basic: €0.015/request
- Professional: A partir de €200/mês

---

### 4. 🌍 Planet Labs (Opcional - NDVI Premium)
**Usado para:** Imagens de satélite de alta resolução (3m)

✓ **Status:** Já configurado e pronto para uso

#### Recursos:
- Resolução: 3m por pixel (3x mais detalhado que Sentinel)
- Atualização: Diária
- Histórico: Desde 2009
- Cobertura: Global

#### Quando usar:
- Áreas pequenas (<10 hectares)
- Quando precisar de máxima precisão
- Monitoramento diário necessário

**Planos:**
- Explorer: Gratuito para pesquisa (limitado)
- Education: Gratuito para academia
- Commercial: Consultar vendas

---

### 5. ⛅ OpenWeather (Opcional)
**Usado para:** Previsão do tempo e dados climáticos

**Status:** Pode ser configurado se necessário

#### Como configurar:
1. Acesse: https://openweathermap.org/
2. Crie conta gratuita
3. Copie API Key
4. Configure via Supabase Secrets: `OPENWEATHER_API_KEY`

**Limite gratuito:** 1.000 chamadas/dia

---

### 6. 📍 ViaCEP (Ativo - Pública)
**Usado para:** Busca automática de endereço por CEP

✓ **Status:** Já integrado e funcionando
- API pública brasileira
- Não requer chave
- Funciona automaticamente no cadastro

**Não requer configuração!**

---

## 🎯 Sistema NDVI - Como Usar

### Pré-requisitos:
- ✅ Sentinel Hub configurado (já está)
- ✅ Planet configurado (já está)
- ✅ Área desenhada no mapa

### Passo a Passo:

1. **Desenhar Área:**
   - Clique no botão 🖊️ Lápis (lado direito)
   - Escolha ferramenta (polígono, retângulo, pivô, etc)
   - Desenhe no mapa
   - Salve com nome

2. **Abrir NDVI:**
   - Clique no botão 🧠 Brain (lado direito)
   - Painel NDVI abre à direita

3. **Configurar:**
   - Escolha fonte: Sentinel-2 ou Planet
   - Selecione data da imagem
   - Sistema processa automaticamente

4. **Visualizar:**
   - Camada NDVI aparece no mapa
   - Estatísticas no painel lateral
   - Distribuição por cores
   - Alertas automáticos

5. **Exportar:**
   - Clique em "Exportar Relatório"
   - Gera PDF com análise completa

---

## 📊 Comparação NDVI

| Característica | Sentinel-2 | Planet Labs |
|---|---|---|
| **Resolução** | 10m/pixel | 3m/pixel |
| **Atualização** | 5 dias | Diária |
| **Custo** | Baixo | Alto |
| **Melhor para** | >50 ha | <10 ha |
| **Precisão** | Boa | Excelente |

**Recomendação:**
- **Grandes áreas**: Use Sentinel-2
- **Precisão máxima**: Use Planet Labs
- **Teste primeiro**: Use Sentinel no trial gratuito

---

## 🔐 Resumo de Configuração

| API | Status | Configuração | Onde Usar |
|-----|--------|--------------|-----------|
| **Supabase** | ✅ Ativo | Automática | Todo app |
| **MapTiler** | ✅ Ativo | Já configurado | Dashboard |
| **Sentinel Hub** | ✅ Ativo | Já configurado | NDVI |
| **Planet Labs** | ✅ Ativo | Já configurado | NDVI Premium |
| **ViaCEP** | ✅ Ativo | Não requer | Cadastro |
| **OpenWeather** | ⚪ Opcional | Se necessário | Clima |

---

## 💡 Modo Demo

O sistema funciona em **modo demo** se as APIs de satélite não estiverem disponíveis:
- Gera dados NDVI simulados realistas
- Mostra distribuição de biomassa
- Exibe alertas e recomendações
- Perfeito para demonstrações e testes

---

## 🔒 Segurança

**IMPORTANTE:**
- ❌ NUNCA commite API keys no código
- ❌ NUNCA compartilhe credenciais
- ✅ Use apenas variáveis de ambiente
- ✅ Configure no Supabase Edge Functions
- ✅ Rotacione chaves periodicamente

---

## 🆘 Solução de Problemas

### "Para usar o NDVI, primeiro desenhe uma área"
➡️ Desenhe um polígono no mapa usando o botão Lápis

### "Usando dados simulados (modo demo)"
➡️ As APIs de satélite não estão respondendo. Dados simulados serão usados.

### Mapa não carrega
➡️ Verifique conexão com internet e MapTiler API key

### Erro de autenticação
➡️ Faça logout e login novamente

---

## 📚 Documentação Completa

- 📖 [Guia NDVI Completo](./NDVI_GUIDE.md)
- 🔄 [Guia de Comparação de Áreas](./GUIA_COMPARACAO.md)
- 📄 [Guia de Exportação de Relatórios](./GUIA_EXPORTACAO.md)
- 📊 [Interpretação de Gráficos](./INTERPRETACAO_GRAFICOS.md)
- 📘 [Como Usar o App](./COMO_USAR.md)
- 📝 [Changelog](./CHANGELOG.md)
- 🌐 [MapTiler Docs](https://docs.maptiler.com/)
- 🛰️ [Sentinel Hub Docs](https://docs.sentinel-hub.com/)
- 🌍 [Planet Docs](https://developers.planet.com/)

---

**SoloForte** - Transformando complexidade em decisões simples e produtivas 🌱

**Desenvolvido com ❤️ para o agronegócio brasileiro**
