# ✅ CHECKLIST - Migração httpOnly Cookies

**Data:** _____/_____/_____  
**Responsável:** ___________________  
**Prioridade:** P1 - ALTA

---

## 📋 PRÉ-REQUISITOS

- [ ] Lido: `MIGRACAO_HTTPONLY_COOKIES.md`
- [ ] Entendido o motivo (localStorage = vulnerável a XSS)
- [ ] Backup do código atual criado
  ```bash
  git commit -am "backup: antes de migrar para httpOnly cookies"
  ```

---

## 🔧 INSTALAÇÃO

- [ ] Instalar dependência
  ```bash
  npm install @supabase/ssr
  ```
  
- [ ] Verificar instalação
  ```bash
  grep "@supabase/ssr" package.json
  ```
  Deve aparecer: `"@supabase/ssr": "^X.X.X"`

---

## 📝 ATUALIZAÇÃO DE CÓDIGO

### Opção A: Script Automatizado (Recomendado)

- [ ] Tornar script executável
  ```bash
  chmod +x scripts/migrate-to-cookies.sh
  ```

- [ ] Executar script
  ```bash
  bash scripts/migrate-to-cookies.sh
  ```

- [ ] Verificar que arquivos foram atualizados
  - [ ] Backups criados (.backup)
  - [ ] Importações substituídas
  - [ ] test-cookies.html criado

### Opção B: Manual

- [ ] Atualizar cada arquivo manualmente:

#### Arquivos Principais

- [ ] `/App.tsx`
  ```typescript
  // ❌ ANTES:
  import { createClient } from './utils/supabase/client';
  
  // ✅ DEPOIS:
  import { createClient } from './utils/supabase/client-cookies';
  ```

- [ ] `/components/Login.tsx`
- [ ] `/components/Cadastro.tsx`
- [ ] `/components/Dashboard.tsx`
- [ ] `/components/Home.tsx`

#### Hooks

- [ ] `/utils/hooks/useDemo.ts`
- [ ] `/utils/hooks/useCheckIn.ts`
- [ ] `/utils/hooks/useChat.ts`
- [ ] `/utils/hooks/useEquipes.ts`
- [ ] `/utils/hooks/useProdutores.ts`
- [ ] Outros hooks que usam Supabase

#### Outros Componentes

- [ ] `/components/Relatorios.tsx`
- [ ] `/components/Marketing.tsx`
- [ ] `/components/Clientes.tsx`
- [ ] `/components/Agenda.tsx`
- [ ] `/components/Configuracoes.tsx`
- [ ] Qualquer outro que use `createClient`

---

## 🧪 TESTES LOCAIS

### Reiniciar Servidor

- [ ] Parar servidor atual (Ctrl+C)
- [ ] Limpar cache
  ```bash
  rm -rf node_modules/.vite
  ```
- [ ] Reiniciar
  ```bash
  npm run dev
  ```

### Verificar Console

- [ ] Abrir DevTools (F12) > Console
- [ ] Procurar por mensagens de migração:
  - [ ] `✅ Sessão migrada com sucesso` (se tinha sessão)
  - [ ] `✅ Sessão já existe em cookies` (se já migrado)
  - [ ] `ℹ️ Nenhuma sessão para migrar` (se não logado)

### Testar Funcionalidades

- [ ] **Login**
  - Email: _________________
  - [ ] ✅ Login bem-sucedido
  - [ ] ✅ Redirecionado para dashboard

- [ ] **Dashboard**
  - [ ] Dados carregam corretamente
  - [ ] Gráficos aparecem
  - [ ] Sem erros no console

- [ ] **Navegação**
  - [ ] Home → Dashboard
  - [ ] Dashboard → Relatórios
  - [ ] Relatórios → Mapas
  - [ ] Sem erros de autenticação

- [ ] **Refresh de Página**
  - [ ] F5 no dashboard
  - [ ] Sessão permanece ativa
  - [ ] Não é solicitado login novamente

- [ ] **Logout**
  - [ ] Logout funciona
  - [ ] Redirecionado para landing/login
  - [ ] Cookies removidos (verificar DevTools)

---

## 🔒 TESTES DE SEGURANÇA

### Teste 1: Verificar Cookies no DevTools

- [ ] Abrir DevTools (F12)
- [ ] Ir para aba **Application**
- [ ] Expandir **Cookies**
- [ ] Procurar por: `sb-fqnbtglzrxkgoxhndsum-auth-token`

#### Verificar Flags:

- [ ] **HttpOnly:** ✅ (DEVE estar marcado)
- [ ] **Secure:** ✅ (DEVE estar marcado em HTTPS)
- [ ] **SameSite:** `Lax`
- [ ] **Path:** `/`
- [ ] **Expires:** Data futura (7 dias)

**Screenshot:** ___ (tirar print e anexar)

### Teste 2: Verificar localStorage Limpo

- [ ] DevTools (F12) > Console
- [ ] Executar:
  ```javascript
  localStorage.getItem('sb-fqnbtglzrxkgoxhndsum-auth-token')
  ```
- [ ] **Resultado esperado:** `null`
- [ ] **Se não for null:** Migração falhou, ver troubleshooting

### Teste 3: Arquivo de Teste

- [ ] Abrir: `http://localhost:5173/test-cookies.html`

#### Resultados Esperados:

- [ ] **Teste 1 (localStorage):** ✅ PASSOU
- [ ] **Teste 2 (document.cookie):** ✅ PASSOU
- [ ] **Teste 3 (XSS Simulation):** ✅ SEGURO

**Screenshot:** ___ (tirar print e anexar)

### Teste 4: Simulação de XSS

- [ ] DevTools (F12) > Console
- [ ] Tentar roubar sessão:
  ```javascript
  // Deve retornar null ou undefined
  localStorage.getItem('sb-fqnbtglzrxkgoxhndsum-auth-token')
  
  // Deve NÃO mostrar cookie de sessão
  document.cookie
  ```
- [ ] **Resultado esperado:** Não consegue acessar sessão
- [ ] ✅ **SEGURO:** XSS não pode roubar sessão

---

## 🌐 TESTES EM PRODUÇÃO (Staging)

### Deploy para Staging

- [ ] Fazer deploy para ambiente de staging
  ```bash
  # Vercel
  vercel --prod
  
  # Ou Netlify
  netlify deploy --prod
  ```

- [ ] Aguardar deploy completo
  - Deploy URL: _______________________

### Testes em Staging

- [ ] Abrir app em staging
- [ ] Fazer login
- [ ] Verificar cookies (DevTools)
  - [ ] HttpOnly: ✅
  - [ ] Secure: ✅ (DEVE estar em HTTPS)
  - [ ] SameSite: Lax

- [ ] Testar funcionalidades críticas:
  - [ ] Login/Logout
  - [ ] Dashboard
  - [ ] Salvar dados
  - [ ] Carregar dados

- [ ] Testar em diferentes navegadores:
  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile (iOS/Android)

---

## 📊 MONITORAMENTO

### Logs de Migração

- [ ] Configurar monitoramento de logs
- [ ] Verificar taxa de migração bem-sucedida
  - Meta: > 95%
- [ ] Taxa atual: ____%

### Métricas

- [ ] Sessões ativas antes: _____
- [ ] Sessões ativas depois: _____
- [ ] Sessões migradas: _____
- [ ] Sessões com erro: _____

### Erros Comuns

- [ ] Monitorar erros no console
- [ ] Documentar problemas encontrados:
  - Erro 1: _______________________
  - Erro 2: _______________________

---

## 📝 DOCUMENTAÇÃO

- [ ] Atualizar CHANGELOG.md
  ```markdown
  ## [1.2.0] - 2025-10-31
  ### Security
  - 🔒 Migrado para httpOnly cookies (P1)
  - Proteção contra XSS
  - Sessões não mais em localStorage
  ```

- [ ] Atualizar README de segurança
- [ ] Documentar processo para o time
- [ ] Criar guia para novos desenvolvedores

---

## 👥 COMUNICAÇÃO

### Notificar Time

- [ ] Dev Team (Slack/Discord)
  ```
  🔒 Migração para httpOnly Cookies concluída
  
  O que mudou:
  - Sessões agora em cookies httpOnly (não localStorage)
  - Melhor proteção contra XSS
  - Nenhuma ação necessária do usuário
  
  Para devs:
  - Usar: import from './utils/supabase/client-cookies'
  - Não usar: import from './utils/supabase/client'
  ```

- [ ] QA Team
  - Pedir testes completos de autenticação
  - Fornecer checklist de teste

- [ ] Stakeholders
  - Informar melhoria de segurança
  - Score de segurança aumentou

---

## 🔄 ROLLBACK (Se necessário)

### Plano de Rollback

- [ ] Reverter importações
  ```bash
  # Restaurar de backup
  git revert HEAD
  # ou
  git checkout HEAD~1 .
  ```

- [ ] Remover @supabase/ssr (opcional)
  ```bash
  npm uninstall @supabase/ssr
  ```

- [ ] Reiniciar servidor
  ```bash
  npm run dev
  ```

### Quando Fazer Rollback?

- [ ] > 5% de erros de autenticação
- [ ] Impossibilidade de login
- [ ] Perda de sessões em massa
- [ ] Bugs críticos não resolvidos

---

## ✅ VERIFICAÇÃO FINAL

### Checklist de Produção

- [ ] httpOnly cookies funcionando
- [ ] localStorage limpo
- [ ] Sessões persistem após refresh
- [ ] Login/Logout funcionam
- [ ] Todos os navegadores suportados
- [ ] Sem erros no console
- [ ] Testes de segurança passam
- [ ] Monitoramento configurado
- [ ] Time notificado
- [ ] Documentação atualizada

### Score de Segurança

**Antes:**
- localStorage: Sim (vulnerável)
- httpOnly cookies: Não
- Proteção XSS: Nenhuma
- **Score:** 3/10 🔴

**Depois:**
- localStorage: Não
- httpOnly cookies: Sim
- Proteção XSS: Total
- **Score:** 9/10 ✅

### Vulnerabilidades Corrigidas

- [x] **P1-02:** Sessões sem Criptografia (CVSS 7.5)
- [x] **OWASP A03:2021:** Injection (XSS via session theft)

---

## 📞 SUPORTE

### Problemas Encontrados?

1. Consultar: `MIGRACAO_HTTPONLY_COOKIES.md` (seção Troubleshooting)
2. Executar diagnóstico: `bash scripts/migrate-to-cookies.sh`
3. Verificar logs do navegador (F12 > Console)
4. Abrir issue se necessário

### Contatos

- **Security Lead:** _____________________
- **DevOps:** _____________________
- **Supabase Support:** support@supabase.io

---

## ✍️ ASSINATURAS

### Execução

**Executado por:** _____________________  
**Data:** _____/_____/_____  
**Hora início:** _____:_____  
**Hora fim:** _____:_____  
**Duração:** _____ minutos

### Verificação

**Verificado por:** _____________________  
**Data:** _____/_____/_____  
**Status:** ☐ ✅ Aprovado ☐ ⚠️ Com ressalvas ☐ ❌ Rejeitado

### Observações

```
_______________________________________________________
_______________________________________________________
_______________________________________________________
```

---

**Status Final:** ☐ ✅ COMPLETO ☐ ⚠️ PENDENTE ☐ ❌ FALHOU

**Próximo item:** Rate Limiting (P1-03)

