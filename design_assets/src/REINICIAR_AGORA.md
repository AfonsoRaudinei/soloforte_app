# ⚡ REINICIAR SERVIDOR AGORA

---

## 🎯 PASSO 1: Parar Servidor

No terminal onde está rodando `npm run dev`:

```
Ctrl+C
```

Aguarde aparecer o prompt novamente.

---

## 🎯 PASSO 2: Reiniciar

No mesmo terminal, digite:

```bash
npm run dev
```

Pressione Enter e aguarde mensagem:
```
VITE ready in xxx ms
```

---

## 🎯 PASSO 3: Recarregar Navegador

No navegador onde o app está aberto:

```
F5
```

ou

```
Ctrl+R
```

---

## ✅ VERIFICAR

Abra console do navegador (F12).

Você deve ver:

```
✅ Supabase credentials loaded from .env variables
   Project ID: fqnbtglz...
   Anon Key: eyJhbGci...
```

**Se ver isso: ✅ PRONTO!**

Se ainda ver aviso de fallback: Executar `./REINICIAR_SERVIDOR.sh`

---

**Tempo total:** 30 segundos

**Motivo:** Vite só lê `.env` no startup, não em tempo real.

---

**Alternativa automatizada:**

```bash
chmod +x REINICIAR_SERVIDOR.sh
./REINICIAR_SERVIDOR.sh
```

