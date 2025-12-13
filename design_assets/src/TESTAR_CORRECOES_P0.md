# 🧪 TESTES DE VALIDAÇÃO - CORREÇÕES P0
## Guia Rápido de Testes para Segurança

**Tempo Total:** 15-20 minutos  
**Pré-requisito:** Aplicação rodando (`npm run dev`)

---

## 📋 CHECKLIST DE TESTES

### ✅ TESTE 1: Rate Limiting no Login (5 min)

**Objetivo:** Verificar proteção contra brute force

**Passos:**
1. Acesse: `http://localhost:5173/login`
2. Digite qualquer email (ex: `test@test.com`)
3. Digite senha incorreta (ex: `senhaerrada`)
4. Clique em "Entrar" **5 vezes**

**Resultado Esperado:**
- ✅ Primeiras 5 tentativas: Mostra erro "Email ou senha incorretos"
- ✅ 6ª tentativa: Bloqueia com mensagem:
  ```
  🔒 Muitas tentativas de login. Aguarde 15 minutos para tentar novamente.
  ```
- ✅ Botão "Entrar" fica desabilitado
- ✅ Alert vermelho aparece no topo do formulário
- ✅ Após 2-3 tentativas, mostra aviso amarelo: "⚠️ Você tem X tentativas restantes"

**Como Resetar (para testar novamente):**
```javascript
// Abrir DevTools (F12) → Console → Executar:
localStorage.clear()
location.reload()
```

---

### ✅ TESTE 2: Sanitização XSS no Login (3 min)

**Objetivo:** Verificar proteção contra XSS

**Passos:**
1. Acesse: `http://localhost:5173/login`
2. No campo **Email**, digite:
   ```
   <script>alert('XSS')</script>test@test.com
   ```
3. Abra DevTools (F12) → Console
4. Observe o valor armazenado

**Resultado Esperado:**
- ✅ NÃO executa o JavaScript
- ✅ Email sanitizado para: `test@test.com`
- ✅ Remove completamente `<script>` e `</script>`

**Teste Adicional - Imagem Maliciosa:**
```
<img src=x onerror="alert('XSS')">user@test.com
```

**Resultado Esperado:**
- ✅ Sanitizado para: `user@test.com`

---

### ✅ TESTE 3: Logger Sanitizado (2 min)

**Objetivo:** Verificar que dados sensíveis não aparecem nos logs

**Passos:**
1. Abra DevTools (F12) → Console
2. Faça login com credenciais válidas (ou modo demo)
3. Observe os logs no console

**Resultado Esperado:**
- ✅ DEVE aparecer: `✅ Login bem-sucedido`
- ❌ NÃO deve aparecer: email, password, token, session

**Exemplo OK:**
```
[15:30:42] [LOG] ✅ Login bem-sucedido
```

**Exemplo ERRADO (não deve acontecer):**
```
❌ [15:30:42] [LOG] ✅ Login bem-sucedido: usuario@empresa.com
❌ [15:30:42] [LOG] Session: { access_token: "eyJhbG..." }
```

---

### ✅ TESTE 4: Capacitor Storage no Login (3 min)

**Objetivo:** Verificar que session não está em localStorage

**Passos:**
1. Faça login normalmente
2. Abra DevTools (F12) → Application → Local Storage
3. Verifique se `soloforte_session` existe

**Resultado Esperado:**
- ❌ NÃO deve existir `soloforte_session` em localStorage
- ✅ Session deve estar no Capacitor Storage (Preferences)

**Como Verificar Capacitor Storage:**
```javascript
// DevTools → Console → Executar:
const { Preferences } = await import('@capacitor/preferences');
const session = await Preferences.get({ key: 'session' });
console.log('Session no Capacitor:', session);
// ✅ Deve mostrar a session
```

**Fallback Web:**
Se estiver rodando no navegador (não Capacitor), vai usar localStorage como fallback, mas com a API do Capacitor Storage.

---

### ✅ TESTE 5: Rate Limiting no Cadastro (4 min)

**Objetivo:** Verificar proteção contra spam de cadastros

**Passos:**
1. Acesse: `http://localhost:5173/cadastro`
2. Preencha o formulário 3 vezes com emails diferentes
3. Tente cadastrar pela 4ª vez

**Resultado Esperado:**
- ✅ Primeiros 3 cadastros: OK (ou erro se email já existe)
- ✅ 4º cadastro: Bloqueia com mensagem:
  ```
  🔒 Muitos cadastros realizados. Aguarde 1 hora para tentar novamente.
  ```
- ✅ Alert vermelho no topo
- ✅ Botão "Criar Conta" desabilitado

**Como Resetar:**
```javascript
// Console:
localStorage.clear()
location.reload()
```

---

### ✅ TESTE 6: Validação Forte de Senha (5 min)

**Objetivo:** Verificar que senhas fracas são rejeitadas

**Passos:**
1. Acesse: `http://localhost:5173/cadastro`
2. Tente as seguintes senhas:

**Teste 6.1 - Senha Muito Curta:**
```
Senha: 123456
Resultado Esperado: ❌ "A senha deve ter no mínimo 8 caracteres"
```

**Teste 6.2 - Sem Maiúscula:**
```
Senha: senhafraca123
Resultado Esperado: ❌ "A senha deve conter letras maiúsculas, minúsculas e números"
```

**Teste 6.3 - Sem Número:**
```
Senha: SenhaFraca
Resultado Esperado: ❌ "A senha deve conter letras maiúsculas, minúsculas e números"
```

**Teste 6.4 - Senha Válida:**
```
Senha: SenhaForte123
Resultado Esperado: ✅ Aceita a senha
```

---

### ✅ TESTE 7: Sanitização no Cadastro (3 min)

**Objetivo:** Verificar sanitização em todos os campos

**Passos:**
1. Acesse: `http://localhost:5173/cadastro`
2. Preencha os campos com dados maliciosos:

**Nome:**
```
<script>alert('XSS')</script>João Silva
Resultado Esperado: "João Silva" ✅
```

**Telefone:**
```
11 98765-4321 <img src=x>
Resultado Esperado: "11 98765-4321" ✅
```

**Email:**
```
<b>test@test.com</b>
Resultado Esperado: "test@test.com" ✅
```

3. Abra DevTools → Console
4. Verifique se valores estão sanitizados

---

## 🔍 TESTES AVANÇADOS (Opcional)

### TESTE A: Performance do Capacitor Storage

**Objetivo:** Verificar que não bloqueia a UI

**Passos:**
1. Abra DevTools → Performance
2. Inicie gravação
3. Faça login
4. Pare gravação
5. Verifique o tempo de `sessionStorage.save()`

**Resultado Esperado:**
- ✅ Operação < 10ms
- ✅ Não bloqueia thread principal
- ✅ UI permanece responsiva

---

### TESTE B: Verificar Histórico Git

**Objetivo:** Garantir que .env não foi commitado

**Passos:**
```bash
# Terminal:
git log --all --full-history -- ".env"

# Resultado Esperado:
# (vazio) - nenhum commit encontrado ✅
```

**Se encontrar commits com .env:**
```bash
# ⚠️ AÇÃO URGENTE: Limpar histórico
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Rotacionar TODAS as credenciais no Supabase
```

---

### TESTE C: Lighthouse Security Score

**Objetivo:** Verificar melhorias de segurança

**Passos:**
1. Abra DevTools (F12) → Lighthouse
2. Selecione:
   - ✅ Performance
   - ✅ Best Practices
   - ✅ SEO
3. Clique "Analyze page load"

**Resultado Esperado:**
- Performance: > 85
- Best Practices: > 90 (CSP, HTTPS, etc)
- SEO: > 85

---

## 📊 RELATÓRIO DE TESTES

**Preencha após executar todos os testes:**

```
┌────────────────────────────────────────────┐
│ RELATÓRIO DE TESTES P0                     │
├────────────────────────────────────────────┤
│ [ ] 1. Rate Limiting Login        PASSOU   │
│ [ ] 2. Sanitização XSS Login      PASSOU   │
│ [ ] 3. Logger Sanitizado          PASSOU   │
│ [ ] 4. Capacitor Storage          PASSOU   │
│ [ ] 5. Rate Limiting Cadastro     PASSOU   │
│ [ ] 6. Validação Senha Forte      PASSOU   │
│ [ ] 7. Sanitização Cadastro       PASSOU   │
├────────────────────────────────────────────┤
│ Score: __/7 (___%)                         │
└────────────────────────────────────────────┘
```

---

## ⚠️ PROBLEMAS COMUNS

### Problema 1: Rate limit não funciona
**Sintoma:** Pode tentar login infinitamente

**Solução:**
```javascript
// Verificar se hook foi importado:
import { useLoginRateLimit } from '../utils/hooks/useRateLimit';

// Verificar se checkLimit() está sendo chamado
const rateLimitResult = checkLimit();
if (!rateLimitResult.allowed) { return; }
```

---

### Problema 2: XSS ainda funciona
**Sintoma:** `<script>` é executado

**Solução:**
```javascript
// Verificar se hook foi importado:
import { useSanitizedInput } from '../utils/hooks/useSanitizedInput';

// Verificar uso:
const [email, setEmail] = useSanitizedInput('', 'default');
```

---

### Problema 3: Session ainda em localStorage
**Sintoma:** `soloforte_session` aparece em localStorage

**Solução:**
```javascript
// Verificar se foi migrado:
import { sessionStorage } from '../utils/storage/capacitor-storage';

await sessionStorage.save({ ... }); // ✅ Correto
localStorage.setItem(...); // ❌ Errado
```

---

### Problema 4: Logs ainda expõem dados
**Sintoma:** Email/token aparecem no console

**Solução:**
```javascript
// Verificar se logger foi atualizado:
logger.log('✅ Login bem-sucedido'); // ✅ Sem dados
logger.log('✅ Login:', data.user.email); // ❌ Com email
```

---

## ✅ CRITÉRIO DE SUCESSO

**Para considerar P0 completo:**
- ✅ Todos os 7 testes básicos passam
- ✅ Nenhum dado sensível nos logs
- ✅ Rate limiting funciona em Login e Cadastro
- ✅ XSS bloqueado em todos inputs
- ✅ Session não está em localStorage (ou usa Capacitor API)
- ✅ .env não está no Git

**Se algum teste falhar:**
1. Verificar `CORRECOES_P0_APLICADAS.md`
2. Revisar código do componente
3. Comparar com código no `PLANO_ACAO_EXECUTIVO_P0.md`

---

## 🚀 PRÓXIMOS PASSOS

Após validar P0:
1. Migrar Dashboard.tsx (2h)
2. Migrar componentes restantes (2-3h)
3. Executar testes completos
4. Code review de segurança
5. Lighthouse audit completo

---

**Data:** 31/10/2025  
**Responsável:** Equipe de Desenvolvimento  
**Prazo:** Validar em 1 dia
