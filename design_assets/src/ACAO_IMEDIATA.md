# 🔴 AÇÃO IMEDIATA - ROTACIONAR CREDENCIAIS

**Data:** 31 de Outubro de 2025  
**Prioridade:** P0 - CRÍTICO  
**Status:** 🔴 PENDENTE  
**Tempo:** 10 minutos

---

## ⚠️ SITUAÇÃO

✅ **Implementado:**
- Credenciais migradas para `.env`
- Variáveis de ambiente protegidas
- Scripts de validação criados
- Documentação completa

🔴 **PENDENTE (URGENTE):**
- **ROTACIONAR credenciais antigas do Supabase**
- Credenciais antigas estavam **EXPOSTAS** em código-fonte
- Podem ter **VAZADO** no Git history

---

## 🚀 O QUE FAZER AGORA (10 minutos)

### PASSO 1: Verificar Status (30 seg)

```bash
# Executar verificador rápido
bash verificar-rotacao.sh

# Se mostrar ❌ (key antiga):
# → Continuar para PASSO 2

# Se mostrar ✅ (key nova):
# → Pronto! Nada mais a fazer
```

---

### PASSO 2: Rotacionar no Supabase (3 min)

**Abrir:** https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum

1. **Login** no Supabase
2. **Settings** (engrenagem) > **API**
3. Localizar **"anon/public"** key
4. Clicar no **ícone de rotação** 🔄
5. **Confirmar**
6. **COPIAR** a nova key (Ctrl+C)

---

### PASSO 3: Atualizar .env (1 min)

```bash
# Abrir arquivo
nano .env

# Localizar linha:
VITE_SUPABASE_ANON_KEY=...

# APAGAR a key antiga
# COLAR a nova key (Ctrl+V)

# Salvar e fechar
# Ctrl+O, Enter, Ctrl+X
```

---

### PASSO 4: Validar (1 min)

```bash
# Executar validador
node scripts/validate-env.js

# Deve mostrar:
# ✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!
```

---

### PASSO 5: Testar (3 min)

```bash
# Reiniciar servidor
npm run dev

# Abrir navegador: http://localhost:5173

# Testar:
# 1. Login funciona? ✅
# 2. Criar conta funciona? ✅
# 3. Dashboard carrega? ✅

# Console (F12) mostra:
# ✅ Supabase credentials loaded...
```

---

## ✅ PRONTO!

Se tudo acima funcionou:

✅ **Credenciais antigas INVALIDADAS**  
✅ **Novas credenciais FUNCIONANDO**  
✅ **App SEGURO novamente**

---

## 📋 PRÓXIMOS PASSOS (Opcional)

### 1. Atualizar Produção

```bash
# Vercel
vercel env add VITE_SUPABASE_ANON_KEY production
# Colar nova key
vercel --prod

# OU Netlify
netlify env:set VITE_SUPABASE_ANON_KEY nova_key
netlify deploy --prod
```

### 2. Verificar Completo

```bash
# Executar verificação completa
bash VERIFICAR_CREDENCIAIS_ROTACIONADAS.sh
```

### 3. Marcar como Concluído

```bash
# Verificar checklist
cat CHECKLIST_ROTACAO_CREDENCIAIS.md

# Documentar no CHANGELOG
echo "## Security - $(date +%Y-%m-%d)" >> CHANGELOG.md
echo "- 🔒 Rotacionadas credenciais Supabase" >> CHANGELOG.md
```

---

## 🚨 PROBLEMAS?

### App não conecta após rotação

```bash
# 1. Verificar .env
cat .env | grep VITE_SUPABASE_ANON_KEY

# 2. Confirmar que é a NOVA key
bash verificar-rotacao.sh

# 3. Reiniciar servidor
npm run dev

# 4. Limpar cache do navegador
# Ctrl+Shift+R
```

### Erro "Invalid API key"

```bash
# Possíveis causas:
# 1. Key não foi copiada corretamente → Verificar .env
# 2. Servidor não foi reiniciado → npm run dev
# 3. Cache do navegador → Ctrl+Shift+R
```

### Preciso fazer rollback

```bash
# Restaurar backup (se criou)
cp .env.backup-* .env

# Reiniciar
npm run dev

# Isso volta para a key ANTIGA (não recomendado!)
# É melhor corrigir a rotação
```

---

## 📞 AJUDA

### Documentação

- **Guia Rápido:** `ROTACIONAR_AGORA.md`
- **Guia Completo:** `ROTACIONAR_CREDENCIAIS_SUPABASE.md`
- **Checklist:** `CHECKLIST_ROTACAO_CREDENCIAIS.md`

### Scripts

```bash
# Verificar status
bash verificar-rotacao.sh

# Validar variáveis
node scripts/validate-env.js

# Verificação completa
bash VERIFICAR_CREDENCIAIS_ROTACIONADAS.sh
```

---

## ⏰ CRONOGRAMA

| Etapa | Tempo | Status |
|-------|-------|--------|
| Verificar status | 30 seg | [ ] |
| Rotacionar no Supabase | 3 min | [ ] |
| Atualizar .env | 1 min | [ ] |
| Validar | 1 min | [ ] |
| Testar | 3 min | [ ] |
| **TOTAL** | **~10 min** | [ ] |

---

## 🎯 MOTIVAÇÃO

**Por que rotacionar AGORA?**

1. ✅ Credenciais antigas estavam **EXPOSTAS** em código
2. ✅ Qualquer pessoa com acesso ao repo **VIU** as credenciais
3. ✅ Bots podem ter **COLETADO** as credenciais (se repo público)
4. ✅ **Risco de acesso não autorizado** ao banco de dados
5. ✅ **Risco de custos elevados** (bill shock)

**Rotacionar = 10 minutos**  
**Não rotacionar = Risco contínuo** ⚠️

---

## ✅ CONCLUSÃO

**Status Atual:** 🔴 URGENTE  
**Ação:** ROTACIONAR CREDENCIAIS  
**Tempo:** 10 minutos  
**Prazo:** HOJE

**Depois de rotacionar:**
- ✅ App 100% seguro
- ✅ Credenciais antigas invalidadas
- ✅ Pode dormir tranquilo 😴

---

**START NOW:** `bash verificar-rotacao.sh`

