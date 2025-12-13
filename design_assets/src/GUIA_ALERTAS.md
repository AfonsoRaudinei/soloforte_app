# ⚡ Guia Completo - Alertas Automáticos

## 🎯 Visão Geral

O sistema de alertas automáticos do SoloForte permite receber notificações por **Email** e **WhatsApp** para:
- 📊 **Alertas NDVI** - Quando a vegetação precisar de atenção
- ☁️ **Previsão do Tempo** - Diariamente, com 7 dias de antecedência

---

## 🚀 Como Acessar

1. No Dashboard, clique em **⚙️ Configurações**
2. Na seção "Notificações", clique em **⚡ Alertas Automáticos**
3. Configure seus alertas e contatos

---

## 📧 Configurar Envio por Email

### Usando Resend (Recomendado)

**Passo 1: Criar Conta no Resend**
1. Acesse https://resend.com
2. Crie uma conta gratuita
3. Verifique seu email

**Passo 2: Obter API Key**
1. No dashboard do Resend, vá em "API Keys"
2. Clique em "Create API Key"
3. Dê um nome: "SoloForte Production"
4. Copie a chave gerada

**Passo 3: Configurar no SoloForte**
1. No Supabase, vá em Project Settings → Secrets
2. Adicione variável: `RESEND_API_KEY`
3. Cole a chave copiada
4. Salve

**Passo 4: Testar**
1. Volte para Alertas Automáticos
2. Adicione seu email
3. Clique em "Testar" ao lado do campo de email
4. Verifique sua caixa de entrada

**Planos Resend:**
- 🆓 **Gratuito**: 100 emails/dia
- 💰 **Pro**: $20/mês - 50.000 emails/mês
- 🏢 **Enterprise**: Custom pricing

---

## 💬 Configurar Envio por WhatsApp

### Usando Twilio

**Passo 1: Criar Conta no Twilio**
1. Acesse https://www.twilio.com
2. Crie uma conta gratuita (crédito inicial de $15)
3. Verifique seu telefone

**Passo 2: Ativar WhatsApp Sandbox**
1. No console do Twilio, vá em "Messaging" → "Try it out" → "Send a WhatsApp message"
2. Siga as instruções para conectar seu WhatsApp:
   - Envie "join [código]" para o número do Twilio
   - Aguarde mensagem de confirmação
3. Copie o número do WhatsApp Sandbox

**Passo 3: Obter Credenciais**
1. No Dashboard do Twilio, localize:
   - **Account SID** (começa com AC...)
   - **Auth Token** (clique em "Show" para revelar)
2. Copie ambos

**Passo 4: Configurar no SoloForte**
No Supabase, adicione as variáveis:
- `TWILIO_ACCOUNT_SID`: Cole o Account SID
- `TWILIO_AUTH_TOKEN`: Cole o Auth Token
- `TWILIO_WHATSAPP_NUMBER`: Cole o número do Sandbox (formato: +14155238886)

**Passo 5: Testar**
1. Volte para Alertas Automáticos
2. Adicione seu número (formato: +55 11 99999-9999)
3. Clique em "Testar" ao lado do campo de WhatsApp
4. Verifique seu WhatsApp

**IMPORTANTE:** 
- Sandbox é apenas para testes
- Para produção, precisa solicitar número oficial ao Twilio
- Processo de aprovação leva ~1-2 semanas

**Planos Twilio:**
- 🆓 **Trial**: $15 de crédito inicial
- 💬 **Pay-as-you-go**: $0.005/mensagem WhatsApp
- 📦 **Pacotes**: A partir de $20/mês

---

## 🔔 Tipos de Alertas

### 1. Previsão do Tempo

**O que é:**
- Receba a previsão dos próximos 7 dias
- Temperaturas máximas e mínimas
- Chance de chuva
- Umidade relativa

**Quando receber:**
- 🌅 Manhã (7h)
- 🌆 Noite (19h)
- 🌅🌆 Ambos

**Frequência:**
- ⚡ Tempo Real (sempre que houver mudança significativa)
- 📅 Diário (uma vez por dia)
- 📆 Semanal (resumo semanal)

**Formato Email:**
- Cards coloridos por dia
- Ícones de clima visual
- Temperaturas destacadas
- Recomendações automáticas

**Formato WhatsApp:**
- Texto compacto
- Emojis para clima
- Próximos 5 dias
- Informação essencial

**Exemplo de uso:**
```
☁️ Previsão do Tempo - SoloForte

Dom 14/01: ☀️ 32°/21° - 10% chuva
Seg 15/01: ⛅ 30°/20° - 30% chuva
Ter 16/01: 🌧️ 25°/19° - 80% chuva
Qua 17/01: ☁️ 27°/18° - 40% chuva
Qui 18/01: ☀️ 31°/22° - 5% chuva

💡 Dica: Evite aplicações na terça!
```

---

### 2. Alerta NDVI

**O que é:**
- Monitoramento contínuo da vegetação
- Alerta quando NDVI cai abaixo do esperado
- Notificação de mudanças bruscas

**Condições:**
- 📉 **Abaixo de**: NDVI < valor definido
- 📈 **Acima de**: NDVI > valor definido
- 🔄 **Mudança**: Variação > 10% em 7 dias

**Valores de Referência:**
- < 0.2: 🚨 Crítico
- 0.2 - 0.4: ⚠️ Atenção
- 0.4 - 0.6: ✅ Normal
- 0.6 - 0.8: ✅ Bom
- > 0.8: 🌟 Excelente

**Formato Email:**
- Card de alerta vermelho/amarelo
- NDVI médio da área
- Distribuição de biomassa
- Lista de recomendações:
  - Verificar irrigação
  - Avaliar nutrientes
  - Inspecionar pragas
  - Análise de solo

**Formato WhatsApp:**
```
⚠️ Alerta NDVI - Talhão Norte

Vegetação abaixo do esperado!

📊 NDVI Médio: 0.325

🔍 Recomendações:
• Verificar irrigação
• Avaliar nutrientes
• Inspecionar pragas
• Análise de solo

🌱 Acesse o app para detalhes
```

---

## 📤 Envio Rápido de Previsão

**Sem configurar alertas automáticos:**

1. Acesse Alertas Automáticos
2. Configure seu email/WhatsApp
3. Na seção "Enviar Previsão do Tempo Agora"
4. Clique em **Enviar por Email** ou **Enviar por WhatsApp**
5. Receba instantaneamente!

**Casos de uso:**
- Antes de reunião de planejamento
- Compartilhar com equipe
- Decisão rápida de manejo
- Planejar semana de trabalho

---

## ⚙️ Configurações Avançadas

### Múltiplos Alertas

Você pode ter vários alertas simultâneos:
- ✅ Previsão do tempo de manhã por email
- ✅ Previsão do tempo à noite por WhatsApp
- ✅ NDVI do Talhão Norte abaixo de 0.4
- ✅ NDVI do Pivô Central com mudança >10%
- ✅ NDVI da Área Experimental acima de 0.7

**Limite:** Até 10 alertas ativos

### Canais de Notificação

**Email:**
- ✅ Relatórios HTML completos
- ✅ Gráficos e visualizações
- ✅ Formatação profissional
- ✅ Fácil de arquivar
- ❌ Pode cair em spam

**WhatsApp:**
- ✅ Instantâneo
- ✅ Notificação no celular
- ✅ Fácil de compartilhar
- ✅ Alta taxa de abertura
- ❌ Limitado em formatação

**Ambos:**
- ✅ Melhor dos dois mundos
- ✅ Redundância (se um falhar)
- ✅ Email para arquivo, WhatsApp para urgência

### Frequências

**Tempo Real:**
- Notificação imediata quando condição atende
- NDVI: Assim que análise terminar
- Clima: Quando houver mudança significativa
- Pode gerar muitas notificações

**Diário:**
- Uma vez por dia
- Horário configurável
- Resumo de todas as condições
- Recomendado para maioria

**Semanal:**
- Resumo semanal
- Domingo à noite (padrão)
- Preparação para semana
- Bom para gestores

---

## 💡 Casos de Uso

### Caso 1: Produtor Rural Solo

**Objetivo:** Monitorar lavoura sozinho

**Configuração:**
- 📧 Email: previsão diária às 7h
- 💬 WhatsApp: alertas NDVI críticos
- 📊 NDVI < 0.4 em todas as áreas
- Frequência: Tempo real

**Benefícios:**
- Acordar já sabendo o clima do dia
- WhatsApp alerta no celular se problema
- Pode planejar dia de trabalho

---

### Caso 2: Fazenda com Equipe

**Objetivo:** Manter equipe informada

**Configuração:**
- 📧 Email time previsão para equipe@fazenda.com
- 💬 WhatsApp time agrônomo para +55 11 99999-9999
- 📊 Alertas NDVI de todas as áreas
- Frequência: Diário de manhã

**Benefícios:**
- Equipe recebe mesma informação
- Alinhamento automático
- Decisões baseadas em dados

---

### Caso 3: Consultor Agronômico

**Objetivo:** Monitorar múltiplos clientes

**Configuração:**
- 📧 Email: resumos semanais
- 💬 WhatsApp: apenas urgências (NDVI < 0.3)
- 📊 Um alerta por propriedade
- Frequência: Semanal + críticos em tempo real

**Benefícios:**
- Não é bombardeado
- Urgências chegam imediatamente
- Resumo semanal para planejamento

---

### Caso 4: Gestor/Proprietário

**Objetivo:** Acompanhamento executivo

**Configuração:**
- 📧 Email: relatórios semanais
- 💬 WhatsApp: apenas crítico (NDVI < 0.2)
- Frequência: Semanal

**Benefícios:**
- Visão geral sem detalhes
- Alerta apenas de problemas sérios
- Delega operação para equipe

---

## 🔧 Resolução de Problemas

### Email não chegou

**Problema:** Cliquei em enviar mas não recebi

**Checklist:**
1. ✅ Verifique sua caixa de spam
2. ✅ Confirme que RESEND_API_KEY está configurada
3. ✅ Teste com email pessoal (Gmail, etc.)
4. ✅ Verifique logs do Supabase Functions
5. ✅ Email digitado corretamente?

**Solução:**
- Adicione noreply@soloforte.com aos contatos
- Marque email como "Não é spam"
- Use domínio verificado no Resend (produção)

---

### WhatsApp não chegou

**Problema:** Testei mas não recebi WhatsApp

**Checklist:**
1. ✅ Número com código do país (+55)?
2. ✅ Enviou "join [código]" para Twilio?
3. ✅ Twilio credenciais configuradas?
4. ✅ Tem créditos no Twilio?
5. ✅ Número correto no Twilio Sandbox?

**Solução:**
- Refaça processo de join no Twilio Sandbox
- Verifique saldo de créditos
- Teste com número diferente

---

### Alerta não disparou

**Problema:** Condição atendida mas não recebi

**Checklist:**
1. ✅ Alerta está ativado (switch verde)?
2. ✅ Já processou NDVI da área?
3. ✅ Email/WhatsApp configurados?
4. ✅ Frequência é adequada?

**Solução:**
- Verifique se condição realmente foi atendida
- Teste manualmente com "Enviar Agora"
- Aguarde próximo ciclo de verificação

---

### Muitas notificações

**Problema:** Recebendo muitos alertas

**Solução:**
- Mude frequência de "Tempo Real" para "Diário"
- Ajuste threshold de NDVI (mais baixo = menos alertas)
- Desative alertas não essenciais
- Use "Ambos" apenas para críticos

---

## 📊 Logs e Monitoramento

### Ver Histórico de Envios

1. Acesse Supabase Dashboard
2. Vá em Functions → Logs
3. Filtre por "notification"
4. Veja todos os envios

### Verificar Status de Entrega

**Resend:**
- Dashboard Resend → Emails
- Veja status: Sent, Delivered, Bounced

**Twilio:**
- Console Twilio → Monitor → Logs
- Status: Queued, Sent, Delivered, Failed

---

## 💰 Custos Estimados

### Cenário 1: Produtor Pequeno
- 1 área monitorada
- Previsão diária por email
- 2 alertas NDVI/mês
- **Custo:** $0/mês (plano gratuito Resend)

### Cenário 2: Fazenda Média
- 5 áreas monitoradas
- Previsão diária email + WhatsApp
- 10 alertas NDVI/mês
- **Custo:** ~$1-2/mês (Twilio pay-as-you-go)

### Cenário 3: Consultoria
- 20 propriedades
- Previsão + alertas para todas
- ~100 notificações/mês
- **Custo:** ~$20/mês (Resend Pro + Twilio)

### Cenário 4: Cooperativa
- 50+ propriedades
- Milhares de notificações
- **Custo:** ~$50-100/mês (planos profissionais)

---

## 🔒 Segurança e Privacidade

### Dados Enviados

- ✅ Apenas dados agregados (NDVI médio)
- ✅ Nenhuma imagem de satélite enviada
- ✅ Previsão pública (não sensível)
- ✅ Criptografia TLS em trânsito

### Armazenamento

- ✅ Resend: 90 dias de retenção
- ✅ Twilio: 12 meses de logs
- ✅ Possível desabilitar logs

### LGPD e Privacidade

- ✅ Você controla seus dados
- ✅ Pode exportar histórico
- ✅ Pode deletar alertas
- ✅ Opt-out a qualquer momento

---

## 🎓 Melhores Práticas

### 1. Comece Simples
- Configure apenas previsão do tempo
- Teste por 1 semana
- Adicione alertas NDVI gradualmente

### 2. Use Email para Arquivo
- Emails são fáceis de buscar depois
- Crie pasta "SoloForte" no email
- Filtro automático para organizar

### 3. WhatsApp para Urgências
- Reserve para alertas críticos
- Evite saturar seu WhatsApp
- Use silencioso para notificações

### 4. Revise Configurações
- Mensalmente, revise alertas
- Desative os que não usa
- Ajuste thresholds conforme aprende

### 5. Compartilhe com Equipe
- Adicione emails de equipe
- Crie grupos de WhatsApp
- Mantenha todos alinhados

---

## 📞 Suporte

Problemas com alertas?
- 💬 Use botão Feedback no app
- 📧 Email: suporte@soloforte.com
- 📱 WhatsApp: +55 11 99999-9999

**Documentação Adicional:**
- [Resend Docs](https://resend.com/docs)
- [Twilio WhatsApp Docs](https://www.twilio.com/docs/whatsapp)

---

**SoloForte** - Sempre conectado com sua lavoura 🌱📱⚡

*Última atualização: 14/01/2025*
