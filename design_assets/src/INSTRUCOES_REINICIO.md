# ⚡ INSTRUÇÕES DE REINÍCIO - 30 SEGUNDOS

**Situação:** Você vê aviso sobre fallback  
**Motivo:** Servidor precisa reiniciar para carregar .env  
**Tempo:** 30 segundos

---

## 🎯 FAÇA AGORA

### No Terminal Onde o Servidor Está Rodando:

```
1. Pressione: Ctrl+C
   (Aguarde parar completamente)

2. Digite: npm run dev
   (Pressione Enter)

3. Aguarde mensagem: "ready in xxx ms"

4. No navegador: F5
   (Recarregar página)
```

---

## ✅ CONFIRMAR QUE FUNCIONOU

Abra o console do navegador (F12) e procure:

**✅ SUCESSO (mensagem correta):**
```
✅ Supabase credentials loaded from .env variables
   Project ID: fqnbtglz...
   Anon Key: eyJhbGci...
```

**❌ AINDA COM AVISO:**
```
⚠️ Supabase credentials using FALLBACK
```
→ Se ainda aparecer, execute: `./REINICIAR_SERVIDOR.sh`

---

## 🚀 SCRIPT AUTOMATIZADO (Alternativa)

Se preferir executar automaticamente:

```bash
# Tornar executável (apenas uma vez)
chmod +x REINICIAR_SERVIDOR.sh

# Executar
./REINICIAR_SERVIDOR.sh
```

---

## 💡 POR QUE PRECISA REINICIAR?

O Vite lê o arquivo `.env` **apenas no startup**.

```
Editar .env → Precisa reiniciar → npm run dev
```

Simples assim! Não é bug, é como o Vite funciona.

---

## 🆘 PROBLEMAS?

Se mesmo após reiniciar o aviso persistir:

```bash
# 1. Verificar .env existe
ls -la .env

# 2. Validar conteúdo
node scripts/validate-env.js

# 3. Ver guia completo
cat SOLUCAO_AVISO_FALLBACK.md
```

---

**TL;DR:** `Ctrl+C` → `npm run dev` → `F5` → ✅ Pronto!

