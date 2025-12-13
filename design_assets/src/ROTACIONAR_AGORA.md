# 🔴 ROTACIONAR CREDENCIAIS - GUIA RÁPIDO

**⏱️ Tempo:** 10 minutos  
**🎯 Ação:** Rotacionar chaves do Supabase (VAZARAM!)

---

## 🚀 EXECUÇÃO RÁPIDA (5 PASSOS)

### 1️⃣ BACKUP (30 segundos)

```bash
# Criar backup do .env atual
cp .env .env.backup-$(date +%Y%m%d-%H%M%S)

# Confirmar backup existe
ls -la .env.backup-*
```

---

### 2️⃣ ROTACIONAR NO SUPABASE (3 minutos)

**Abrir:** https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum

1. Login
2. Settings > API
3. Localizar "anon/public" key
4. Clicar no **ícone de rotação** (🔄)
5. Confirmar
6. **COPIAR** a nova key (Ctrl+C)

---

### 3️⃣ ATUALIZAR .env (1 minuto)

```bash
# Abrir .env
nano .env
# ou
code .env
```

**Substituir a linha:**

```env
# ❌ ANTIGA (APAGAR):
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA

# ✅ NOVA (COLAR a key que você copiou):
VITE_SUPABASE_ANON_KEY=COLE_A_NOVA_KEY_AQUI
```

**Salvar:** Ctrl+O, Enter, Ctrl+X (nano) ou Ctrl+S (VSCode)

---

### 4️⃣ VALIDAR (1 minuto)

```bash
# Executar validador
node scripts/validate-env.js

# Deve mostrar:
# ✅ VITE_SUPABASE_PROJECT_ID: fqnbtglz...
# ✅ VITE_SUPABASE_ANON_KEY: [nova key diferente]...
# ✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!
```

---

### 5️⃣ TESTAR (3 minutos)

```bash
# Reiniciar servidor
npm run dev

# Abrir: http://localhost:5173

# Testar:
# 1. Login funciona? ✅
# 2. Cadastro funciona? ✅
# 3. Dashboard carrega? ✅

# Console do navegador (F12) mostra:
# ✅ Supabase credentials loaded from environment variables
```

---

## ✅ PRONTO!

Se todos os passos acima funcionaram:

- ✅ Credenciais antigas INVALIDADAS
- ✅ Novas credenciais FUNCIONANDO
- ✅ App SEGURO novamente

---

## 📋 PRÓXIMOS PASSOS (Opcional - pode fazer depois)

### Atualizar Produção (Vercel/Netlify)

```bash
# Vercel - Adicionar nova key
vercel env add VITE_SUPABASE_ANON_KEY production
# Cole a nova key

# Fazer deploy
vercel --prod
```

### Verificar RLS (Segurança Extra)

```bash
# Abrir: https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum
# Database > Tables > [cada tabela] > Policies
# Verificar que RLS está habilitado ✅
```

### Executar Scanner de Credenciais

```bash
# Verificar se credenciais antigas vazaram no Git
bash SCRIPT_SCAN_SECRETS.sh
```

---

## 🚨 EM CASO DE PROBLEMAS

### Erro: "Invalid API key"

```bash
# Restaurar backup
cp .env.backup-* .env

# Reiniciar
npm run dev

# Tentar rotação novamente
```

### App não conecta

```bash
# Verificar .env
cat .env

# Deve ter a NOVA key, não a antiga
# Se estiver com a antiga, atualizar novamente
```

### Dúvidas?

Consultar documentação completa:
- `ROTACIONAR_CREDENCIAIS_SUPABASE.md`
- `CHECKLIST_ROTACAO_CREDENCIAIS.md`

---

## 📞 SUPORTE

Se precisar de ajuda urgente:

1. ✅ Verificar logs do console (F12)
2. ✅ Executar: `node scripts/validate-env.js`
3. ✅ Restaurar backup se necessário
4. ✅ Consultar documentação completa

---

**TL;DR:**

1. Backup: `cp .env .env.backup`
2. Supabase: Gerar nova key
3. Editar: `nano .env` → Colar nova key
4. Validar: `node scripts/validate-env.js`
5. Testar: `npm run dev` → Login funciona? ✅

**Status:** 🔴 URGENTE - Fazer HOJE!

