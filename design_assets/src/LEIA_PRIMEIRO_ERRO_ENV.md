# 🚨 ERRO: import.meta.env undefined

## ⚡ SOLUÇÃO RÁPIDA (escolha uma)

### Opção 1: Script Automatizado (Recomendado)

```bash
chmod +x fix-env-agora.sh
./fix-env-agora.sh
```

### Opção 2: Manual (30 segundos)

```bash
# 1. Parar servidor
Ctrl+C

# 2. Limpar cache (opcional)
rm -rf node_modules/.vite

# 3. Reiniciar
npm run dev

# 4. Recarregar página
F5
```

---

## 📚 GUIAS DISPONÍVEIS

| Arquivo | Descrição | Quando usar |
|---------|-----------|-------------|
| **Este arquivo** | Início rápido | Agora! |
| `SOLUCAO_RAPIDA_ERRO_ENV.md` | Solução em 3 passos | Se o erro persistir |
| `FIX_ERRO_ENV_IMPORT_META.md` | Guia completo | Para entender o problema |
| `diagnostico-env.sh` | Diagnóstico automatizado | Se nada funcionar |
| `README_ERRO_ENV.md` | Visão geral | Documentação |

---

## 🔍 POR QUE ISSO ACONTECEU?

Você editou o arquivo `.env`, mas o servidor Vite não recarrega variáveis de ambiente automaticamente.

**Solução:** Sempre reinicie o servidor após editar `.env`

```
.env editado → Precisa reiniciar → Ctrl+C → npm run dev
```

---

## ✅ COMO SABER SE FUNCIONOU?

Após reiniciar, abra o console do navegador (F12). Você deve ver:

```
✅ Supabase credentials loaded from environment variables
   Project ID: fqnbtglz...
   Anon Key: eyJhbGci...
```

**Se não ver isso:** Execute `./diagnostico-env.sh`

---

## 🆘 PRECISA DE AJUDA?

```bash
# Diagnóstico completo
./diagnostico-env.sh

# Validar variáveis
node scripts/validate-env.js

# Ver logs detalhados
cat FIX_ERRO_ENV_IMPORT_META.md
```

---

**TL;DR:**

```bash
./fix-env-agora.sh
```

ou

```bash
Ctrl+C && npm run dev && F5
```

🎉
