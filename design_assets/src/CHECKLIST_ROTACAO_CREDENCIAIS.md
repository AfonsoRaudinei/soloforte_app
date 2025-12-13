# ✅ CHECKLIST - ROTAÇÃO DE CREDENCIAIS SUPABASE

**Data de início:** _____/_____/_____  
**Responsável:** ___________________  
**Motivo:** Exposição em código-fonte (Git history)

---

## 📋 PREPARAÇÃO

- [ ] Ler documentação completa (`ROTACIONAR_CREDENCIAIS_SUPABASE.md`)
- [ ] Backup do `.env` atual criado
  ```bash
  cp .env .env.backup-$(date +%Y%m%d-%H%M%S)
  ```
- [ ] Verificar app funciona com credenciais antigas
  ```bash
  npm run dev
  # Testar login/cadastro
  ```
- [ ] Anotar credenciais antigas (para rollback se necessário)
  - Project ID: `fqnbtglzrxkgoxhndsum`
  - Old Anon Key: `eyJhbGci...` (primeiros 20 chars)

---

## 🔒 ROTAÇÃO NO SUPABASE DASHBOARD

- [ ] Login no Supabase Dashboard
  - URL: https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum
  
- [ ] Navegar para Settings > API
  
- [ ] Localizar seção "Project API keys"
  
- [ ] Encontrar "anon/public" key
  
- [ ] **IMPORTANTE:** Screenshot da tela antes de rotacionar (evidência)
  
- [ ] Clicar em ícone de rotação/refresh
  
- [ ] Confirmar ação de rotação
  
- [ ] **Copiar nova key gerada** (CTRL+C)
  - Nova Anon Key: ________________________
  
- [ ] **VERIFICAR:** Key antiga foi invalidada
  - Tentar query com key antiga deve falhar

---

## 🛡️ VERIFICAR RLS (ROW LEVEL SECURITY)

Enquanto estiver no Supabase Dashboard:

- [ ] Navegar para Database > Tables
  
- [ ] **Para cada tabela, verificar RLS:**

### Tabela: `users`
- [ ] RLS Habilitado: ☑️ Sim ☐ Não
- [ ] Políticas configuradas: ☑️ Sim ☐ Não
- [ ] Políticas testadas: ☑️ Sim ☐ Não

### Tabela: `occurrences`
- [ ] RLS Habilitado: ☑️ Sim ☐ Não
- [ ] Políticas configuradas: ☑️ Sim ☐ Não
- [ ] Políticas testadas: ☑️ Sim ☐ Não

### Tabela: `polygons`
- [ ] RLS Habilitado: ☑️ Sim ☐ Não
- [ ] Políticas configuradas: ☑️ Sim ☐ Não
- [ ] Políticas testadas: ☑️ Sim ☐ Não

### Tabela: `reports`
- [ ] RLS Habilitado: ☑️ Sim ☐ Não
- [ ] Políticas configuradas: ☑️ Sim ☐ Não
- [ ] Políticas testadas: ☑️ Sim ☐ Não

### Outras tabelas:
- [ ] _________________: RLS ☑️ Habilitado
- [ ] _________________: RLS ☑️ Habilitado

---

## 💻 ATUALIZAR .env LOCAL

- [ ] Abrir arquivo `.env`
  ```bash
  nano .env
  # ou
  code .env
  ```

- [ ] Atualizar `VITE_SUPABASE_ANON_KEY` com a NOVA key
  
- [ ] **Verificar:** Project ID permanece o mesmo
  - `VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum`
  
- [ ] Adicionar comentário com data de rotação
  ```env
  # Rotacionada em: 31/Out/2025
  # Motivo: Exposição em código-fonte
  ```

- [ ] Salvar arquivo

- [ ] Executar validador
  ```bash
  node scripts/validate-env.js
  ```
  - [ ] ✅ Validação passou

---

## 🧪 TESTES LOCAIS

### Reiniciar Servidor

- [ ] Parar servidor atual (Ctrl+C)
  
- [ ] Limpar cache do navegador
  
- [ ] Reiniciar servidor
  ```bash
  npm run dev
  ```
  
- [ ] Verificar console do navegador (F12)
  - [ ] ✅ Mensagem "Supabase credentials loaded" aparece
  - [ ] ✅ Nenhum erro de autenticação
  - [ ] ✅ Nova key visível nos logs (primeiros 20 chars diferentes)

### Testar Autenticação

- [ ] **Teste 1: Login**
  - Email: _________________
  - [ ] ✅ Login bem-sucedido
  - [ ] ✅ Redirecionado para dashboard
  - [ ] ✅ Dados do usuário carregados

- [ ] **Teste 2: Cadastro**
  - Criar conta de teste: test-rotacao-@email.com
  - [ ] ✅ Cadastro bem-sucedido
  - [ ] ✅ Redirecionado para dashboard
  - [ ] ✅ Conta criada no Supabase

- [ ] **Teste 3: Logout/Login novamente**
  - [ ] ✅ Logout funciona
  - [ ] ✅ Login funciona novamente

### Testar Funcionalidades Core

- [ ] **Dashboard**
  - [ ] Polígonos carregam
  - [ ] Estatísticas carregam
  - [ ] Clima carrega

- [ ] **Salvar Dados**
  - [ ] Criar polígono de teste
  - [ ] Salvar ocorrência de teste
  - [ ] Verificar que dados foram salvos no banco

- [ ] **Modo Demo**
  - [ ] Modo demo ainda funciona
  - [ ] Dados demo não afetam dados reais

### Testar via Console (F12)

```javascript
// Copiar e colar no console do navegador:

// 1. Testar conexão
const { createClient } = await import('./utils/supabase/client.ts');
const supabase = createClient();

// 2. Query simples
const { data, error } = await supabase.from('users').select('count');
console.log('✅ Query test:', data, error);

// 3. Verificar sessão
const { data: session } = await supabase.auth.getSession();
console.log('✅ Session test:', session);
```

- [ ] ✅ Query funciona sem erros
- [ ] ✅ Sessão retorna dados corretos
- [ ] ✅ Nenhum erro 401/403

---

## 🚀 ATUALIZAR PRODUÇÃO

### Vercel

- [ ] Acessar dashboard do Vercel
  - URL: https://vercel.com/___________/settings/environment-variables
  
- [ ] Localizar `VITE_SUPABASE_ANON_KEY`
  
- [ ] Editar variável
  
- [ ] Atualizar com NOVA key
  
- [ ] Selecionar ambiente: ☑️ Production ☑️ Preview ☑️ Development
  
- [ ] Salvar
  
- [ ] Trigger novo deploy
  ```bash
  vercel --prod
  ```
  
- [ ] Aguardar deploy completo
  - Deploy URL: _______________________
  - Status: ☑️ Sucesso ☐ Falhou

### Netlify (se aplicável)

- [ ] Acessar dashboard do Netlify
  
- [ ] Site settings > Environment variables
  
- [ ] Editar `VITE_SUPABASE_ANON_KEY`
  
- [ ] Atualizar com NOVA key
  
- [ ] Salvar
  
- [ ] Trigger novo deploy
  ```bash
  netlify deploy --prod
  ```
  
- [ ] Aguardar deploy completo
  - Deploy URL: _______________________
  - Status: ☑️ Sucesso ☐ Falhou

---

## ✅ VERIFICAÇÃO PRODUÇÃO

- [ ] Abrir app em produção
  - URL: _______________________
  
- [ ] Abrir DevTools (F12)
  
- [ ] Verificar console
  - [ ] ✅ "Supabase credentials loaded" aparece
  - [ ] ✅ Sem erros de autenticação
  
- [ ] **Teste 1: Login em produção**
  - [ ] ✅ Login funciona
  - [ ] ✅ Dashboard carrega
  
- [ ] **Teste 2: Criar dados em produção**
  - [ ] ✅ Criar polígono de teste
  - [ ] ✅ Dados salvam corretamente
  
- [ ] **Teste 3: Diferentes navegadores**
  - [ ] ✅ Chrome funciona
  - [ ] ✅ Firefox funciona
  - [ ] ✅ Safari funciona (iOS)
  
- [ ] **Teste 4: Mobile**
  - [ ] ✅ App funciona em mobile
  - [ ] ✅ Login mobile funciona

---

## 🔍 VERIFICAR KEY ANTIGA INVALIDADA

### Teste com Key Antiga (deve FALHAR)

```javascript
// No console do navegador:
const { createClient } = await import('@supabase/supabase-js');

const oldKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA";

const oldClient = createClient(
  'https://fqnbtglzrxkgoxhndsum.supabase.co',
  oldKey
);

const { data, error } = await oldClient.from('users').select('count');
console.log('Old key test (should FAIL):', error);
```

- [ ] ✅ Query com key antiga FALHOU (erro de autenticação)
- [ ] ✅ Mensagem de erro: "Invalid API key" ou similar

---

## 📝 DOCUMENTAÇÃO

- [ ] Atualizar CHANGELOG.md
  ```markdown
  ## [1.1.0] - 2025-10-31
  ### Security
  - 🔒 Rotacionadas credenciais Supabase (exposição em código)
  ```

- [ ] Atualizar arquivo de rotação com data real
  - Arquivo: `ROTACIONAR_CREDENCIAIS_SUPABASE.md`
  - Data executada: _____/_____/_____

- [ ] Adicionar comentário no `.env`
  ```env
  # Última rotação: 31/Out/2025
  # Próxima rotação: 31/Jan/2026
  ```

---

## 👥 COMUNICAÇÃO

- [ ] Notificar time de desenvolvimento
  - [ ] Via Slack/Discord: #dev-team
  - [ ] Via Email
  - [ ] Mensagem:
    ```
    🔒 Credenciais do Supabase foram rotacionadas
    
    Ação necessária:
    1. git pull origin main
    2. Atualizar .env local (ver mensagem privada)
    3. npm run dev
    
    Prazo: Imediato
    ```

- [ ] Notificar time de DevOps
  - Verificar que produção está funcionando

- [ ] Notificar stakeholders
  - App continua funcionando normalmente
  - Nenhum downtime

---

## 🗓️ AGENDAMENTO

- [ ] Adicionar lembrete para próxima rotação
  - Data: 31/Janeiro/2026 (90 dias)
  - Criar evento no calendário
  - Notificação 7 dias antes

- [ ] Documentar processo aprendido
  - O que funcionou bem
  - O que pode melhorar
  - Tempo gasto: _____ minutos

---

## 🧹 LIMPEZA

### Após 7 dias

- [ ] Remover backups antigos do .env
  ```bash
  rm .env.backup-*
  ```

- [ ] Verificar Git history
  ```bash
  bash SCRIPT_SCAN_SECRETS.sh
  ```
  - [ ] ✅ Nenhuma credencial exposta

- [ ] Arquivar documentação
  - Mover para pasta `docs/security/`

---

## ✅ ASSINATURAS

### Execução

**Executado por:** _____________________  
**Data:** _____/_____/_____  
**Hora início:** _____:_____  
**Hora fim:** _____:_____  
**Duração total:** _____ minutos

### Verificação

**Verificado por:** _____________________  
**Data:** _____/_____/_____  
**Status:** ☐ Aprovado ☐ Requer correções

### Observações

```
_______________________________________________________
_______________________________________________________
_______________________________________________________
```

---

## 🚨 EM CASO DE PROBLEMAS

### Rollback de Emergência

Se algo der errado:

```bash
# 1. Restaurar .env antigo
cp .env.backup-YYYYMMDD-HHMMSS .env

# 2. Reiniciar servidor
npm run dev

# 3. Contatar suporte Supabase
# https://supabase.com/dashboard/support
```

### Contatos de Emergência

- **DevOps:** _____________________
- **Security Lead:** _____________________
- **Supabase Support:** support@supabase.io

---

**Status Final:** ☐ ✅ COMPLETO ☐ ⚠️ PENDENTE ☐ ❌ FALHOU

