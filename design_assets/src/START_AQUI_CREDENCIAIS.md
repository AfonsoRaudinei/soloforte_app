# 🚀 START AQUI - MIGRAÇÃO DE CREDENCIAIS

**⏱️ Tempo:** 5 minutos  
**🎯 Objetivo:** Proteger credenciais do Supabase  
**⚠️ Urgência:** CRÍTICA

---

## 📋 PASSO A PASSO

### 1️⃣ TORNAR SCRIPTS EXECUTÁVEIS

```bash
# Opção A: Script automático
chmod +x TORNAR_EXECUTAVEL.sh
./TORNAR_EXECUTAVEL.sh

# OU Opção B: Manual
chmod +x EXECUTAR_P0_CREDENCIAIS.sh
chmod +x SCRIPT_SCAN_SECRETS.sh
```

---

### 2️⃣ EXECUTAR MIGRAÇÃO AUTOMATIZADA

```bash
./EXECUTAR_P0_CREDENCIAIS.sh
```

O script irá:
- ✅ Criar/verificar .env
- ✅ Validar variáveis
- ✅ Verificar .gitignore
- ✅ Escanear Git history
- ✅ Guiar próximos passos

---

### 3️⃣ TESTAR

```bash
# Iniciar servidor
npm run dev

# No console do navegador, verificar:
# ✅ Supabase credentials loaded from environment variables
```

---

### 4️⃣ ROTACIONAR CREDENCIAIS (URGENTE!)

```bash
# 1. Acesse:
https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum

# 2. Settings > API > Generate new anon key

# 3. Atualize .env:
nano .env
# Substitua VITE_SUPABASE_ANON_KEY com a nova chave

# 4. Reinicie:
npm run dev
```

---

## 🔍 VERIFICAÇÕES

### ✅ Validar Variáveis

```bash
node scripts/validate-env.js
```

### ✅ Escanear Git History

```bash
bash SCRIPT_SCAN_SECRETS.sh
```

---

## 📚 DOCUMENTAÇÃO

| Documento | Descrição |
|-----------|-----------|
| `RESUMO_P0_CREDENCIAIS.md` | Resumo executivo |
| `P0_CREDENCIAIS_MIGRADAS.md` | Guia rápido |
| `CREDENCIAIS_MIGRADAS_ENV.md` | Documentação completa |

---

## 🚨 EM CASO DE PROBLEMAS

### Erro: "Credenciais não configuradas"

```bash
# Criar .env se não existir
cp .env.example .env

# Editar com suas credenciais
nano .env

# Reiniciar
npm run dev
```

### Erro: "Permission denied"

```bash
# Tornar executável
chmod +x EXECUTAR_P0_CREDENCIAIS.sh

# Executar novamente
./EXECUTAR_P0_CREDENCIAIS.sh
```

### Credenciais no Git History

```bash
# Escanear
bash SCRIPT_SCAN_SECRETS.sh

# Se encontrar:
# 1. ROTACIONAR imediatamente
# 2. Seguir instruções do script
```

---

## 🎯 CHECKLIST RÁPIDO

```markdown
- [ ] Executar: ./EXECUTAR_P0_CREDENCIAIS.sh
- [ ] Verificar: node scripts/validate-env.js
- [ ] Testar: npm run dev
- [ ] Rotacionar: Chaves do Supabase
- [ ] Escanear: bash SCRIPT_SCAN_SECRETS.sh
- [ ] Produção: Configurar variáveis
```

---

## ⏭️ PRÓXIMOS PASSOS

Depois de completar:

1. **Configurar em Produção**
   - Vercel: Settings > Environment Variables
   - Netlify: Site settings > Environment

2. **Habilitar RLS no Supabase**
   - Database > Tables > Enable RLS

3. **Implementar httpOnly Cookies**
   - Ver: `AUDITORIA_SEGURANCA_PENETRATION_TEST.md`

---

**TL;DR:**

```bash
./EXECUTAR_P0_CREDENCIAIS.sh && npm run dev
```

Depois: **ROTACIONAR CREDENCIAIS NO SUPABASE**

