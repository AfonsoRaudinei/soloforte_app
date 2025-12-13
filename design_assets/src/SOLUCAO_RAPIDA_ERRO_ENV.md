# ⚡ SOLUÇÃO RÁPIDA - Erro import.meta.env

**Erro:** `Cannot read properties of undefined (reading 'VITE_SUPABASE_PROJECT_ID')`

---

## 🎯 SOLUÇÃO EM 3 PASSOS (30 segundos)

### 1️⃣ PARAR O SERVIDOR

No terminal onde o servidor está rodando:

```bash
Ctrl+C
```

---

### 2️⃣ REINICIAR O SERVIDOR

```bash
npm run dev
```

---

### 3️⃣ RECARREGAR A PÁGINA

No navegador:

```bash
F5 ou Ctrl+R
```

---

## ✅ PRONTO!

O erro deve desaparecer. Se não:

### Diagnóstico Automatizado

```bash
# Tornar executável
chmod +x diagnostico-env.sh

# Executar
./diagnostico-env.sh
```

O script irá:
- ✅ Verificar se .env existe
- ✅ Validar formato e conteúdo
- ✅ Verificar .gitignore
- ✅ Limpar cache se necessário
- ✅ Guiar próximos passos

---

## 🆘 SE AINDA NÃO FUNCIONAR

### Opção A: Limpar Cache

```bash
rm -rf node_modules/.vite
npm run dev
```

### Opção B: Verificar .env

```bash
# Ver conteúdo
cat .env

# Deve mostrar:
# VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum
# VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

Se não mostrar ou estiver vazio:

```bash
# Copiar template
cp .env.example .env

# Editar
nano .env

# Preencher com as credenciais
# Salvar: Ctrl+X, Y, Enter
```

### Opção C: Validar Tudo

```bash
node scripts/validate-env.js
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **Guia detalhado:** `FIX_ERRO_ENV_IMPORT_META.md`
- **Diagnóstico:** `./diagnostico-env.sh`
- **Validador:** `node scripts/validate-env.js`

---

## 💡 POR QUE ISSO ACONTECEU?

O Vite **não recarrega** variáveis de ambiente automaticamente.

Quando você cria ou edita o `.env`, é **obrigatório** reiniciar o servidor para que as mudanças sejam aplicadas.

```
.env criado/editado → PRECISA reiniciar → npm run dev
```

---

**TL;DR:** `Ctrl+C` → `npm run dev` → `F5` 🎉
