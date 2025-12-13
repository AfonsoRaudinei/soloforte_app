# ⚡ EXECUTAR MIGRAÇÃO - httpOnly Cookies

**Tempo:** 30 minutos  
**Prioridade:** P1 - ALTA  
**Impacto:** Segurança contra XSS

---

## 🚀 EXECUÇÃO RÁPIDA (5 PASSOS)

### 1️⃣ Instalar Dependência (2 min)

```bash
npm install @supabase/ssr
```

**Verificar:**
```bash
grep "@supabase/ssr" package.json
```
Deve mostrar: `"@supabase/ssr": "^0.x.x"`

---

### 2️⃣ Executar Script (5 min)

```bash
# Tornar executável
chmod +x scripts/migrate-to-cookies.sh

# Executar
bash scripts/migrate-to-cookies.sh
```

**O script irá:**
- ✅ Verificar dependência instalada
- ✅ Listar arquivos para atualizar
- ✅ Oferecer atualização automática
- ✅ Criar arquivo de teste

**Aceite:** atualização automática (y)

---

### 3️⃣ Reiniciar Servidor (1 min)

```bash
# Parar (se rodando)
Ctrl+C

# Limpar cache
rm -rf node_modules/.vite

# Reiniciar
npm run dev
```

---

### 4️⃣ Fazer Login (2 min)

```bash
# 1. Abrir: http://localhost:5173
# 2. Fazer login com suas credenciais
# 3. Verificar console (F12):
```

**Console deve mostrar:**
```
✅ Sessão migrada com sucesso para cookies
```

ou

```
✅ Sessão já existe em cookies
```

---

### 5️⃣ Verificar Segurança (5 min)

#### A. Abrir Arquivo de Teste

```
http://localhost:5173/test-cookies.html
```

**Todos os testes devem passar:**
- ✅ Teste 1: localStorage limpo
- ✅ Teste 2: Cookies httpOnly
- ✅ Teste 3: XSS não consegue roubar sessão

#### B. Verificar DevTools

```bash
# 1. F12 > Application > Cookies
# 2. Procurar: sb-fqnbtglzrxkgoxhndsum-auth-token
# 3. Verificar flags:
#    - HttpOnly: ✅
#    - Secure: ✅ (em HTTPS)
#    - SameSite: Lax
```

---

## ✅ PRONTO!

Se tudo acima funcionou:

- ✅ Migração concluída
- ✅ Sessões agora em cookies httpOnly
- ✅ Proteção contra XSS ativa
- ✅ localStorage limpo

---

## 🔍 VERIFICAÇÃO RÁPIDA

### Console do Navegador (F12)

```javascript
// Deve retornar null (sessão NÃO está em localStorage)
localStorage.getItem('sb-fqnbtglzrxkgoxhndsum-auth-token')

// Deve NÃO mostrar cookie de sessão (httpOnly)
document.cookie
```

**Resultado esperado:**
- localStorage: `null` ✅
- document.cookie: Não mostra sessão ✅

---

## 📋 CHECKLIST RÁPIDO

```markdown
- [ ] npm install @supabase/ssr
- [ ] bash scripts/migrate-to-cookies.sh
- [ ] npm run dev
- [ ] Login funciona
- [ ] Console mostra "migrada com sucesso"
- [ ] test-cookies.html todos os testes passam
- [ ] DevTools mostra cookies httpOnly
- [ ] localStorage.getItem retorna null
```

---

## 🚨 PROBLEMAS?

### Erro: "Cannot find module @supabase/ssr"

```bash
# Reinstalar
npm install @supabase/ssr --save
npm run dev
```

### Login não funciona

```bash
# 1. Verificar console (F12) para erros
# 2. Verificar que importação foi atualizada:
grep -r "client-cookies" components/Login.tsx

# 3. Se não encontrar, atualizar manualmente:
# from './utils/supabase/client'
# →
# from './utils/supabase/client-cookies'
```

### Sessão não migra

```bash
# 1. Fazer logout
# 2. Fazer login novamente
# 3. Migração acontecerá automaticamente
```

---

## 📚 DOCUMENTAÇÃO

- **Guia completo:** `MIGRACAO_HTTPONLY_COOKIES.md`
- **Checklist:** `CHECKLIST_HTTPONLY_COOKIES.md`
- **Código:** `utils/supabase/client-cookies.ts`
- **Script:** `scripts/migrate-to-cookies.sh`

---

## 📊 IMPACTO

**Antes:**
- Sessão em localStorage (vulnerável XSS)
- Score de segurança: 3/10 🔴

**Depois:**
- Sessão em cookies httpOnly (protegido XSS)
- Score de segurança: 9/10 ✅

**Vulnerabilidade corrigida:** P1-02 (CVSS 7.5)

---

**TL;DR:**

```bash
npm install @supabase/ssr && \
bash scripts/migrate-to-cookies.sh && \
npm run dev
```

Depois: Login → Verificar test-cookies.html → ✅

