# 🧪 TESTE RÁPIDO - FIX AUTENTICAÇÃO

**Tempo Total:** 2 minutos  
**Status:** 🟢 PRONTO PARA TESTAR

---

## ⚡ TESTE RÁPIDO (2 min)

### 1. Iniciar Aplicação
```bash
npm run dev
```

### 2. Abrir no Navegador
```
http://localhost:5173
```

### 3. Fazer Login

**Opção A - Modo Demo (mais rápido):**
```
1. Na tela inicial, clicar em "✨ Acessar Modo Demonstração"
2. ✅ Deve entrar no dashboard SEM erro
```

**Opção B - Login Real:**
```
1. Clicar em "Entrar"
2. Email: test@test.com (ou qualquer)
3. Senha: SenhaForte123 (ou qualquer)
4. ✅ Deve mostrar erro "Email ou senha incorretos" (normal)
5. ✅ NÃO deve mostrar "Usuário não autenticado"
```

### 4. Verificar Console (F12)

**Console deve estar limpo:**
```
✅ SEM erros de "Usuário não autenticado"
✅ SEM erros de "Cannot read 'isDemoMode'"
✅ SEM erros de sessão
```

---

## ✅ RESULTADO ESPERADO

### Tela Home
```
┌────────────────────────────────────┐
│                                    │
│         🌱 SoloForte               │
│                                    │
│    [✨ Modo Demonstração]          │
│    [Entrar]                        │
│    [Criar Conta]                   │
│                                    │
│ ✅ Sem erros no console            │
└────────────────────────────────────┘
```

### Após Login/Demo
```
┌────────────────────────────────────┐
│  🏠 Dashboard                       │
│                                    │
│  📊 Resumo do Dia                  │
│  🗺️ Mapa Interativo                │
│                                    │
│ ✅ Dashboard carregado             │
│ ✅ Sessão salva no Capacitor       │
│ ✅ Sem erro de autenticação        │
└────────────────────────────────────┘
```

---

## 🔍 TESTES DETALHADOS

### Teste 1: AlertasConfig (30 seg)
```
1. Login com modo demo
2. Dashboard → Menu → Alertas (/alertas)
3. ✅ Email do usuário deve aparecer
4. ✅ Sem erro "Usuário não autenticado"
```

### Teste 2: Marketing (30 seg)
```
1. Login com modo demo
2. Dashboard → Menu → Marketing (/marketing)
3. ✅ Página carrega normalmente
4. ✅ Sem erro no console
```

### Teste 3: Persistência de Sessão (1 min)
```
1. Fazer login/demo
2. Recarregar página (F5)
3. ✅ Deve permanecer logado
4. ✅ Deve voltar para /dashboard automaticamente
```

---

## 🐛 SE DER ERRO

### Erro 1: "Usuário não autenticado" persiste

**Solução:**
```javascript
// DevTools (F12) → Console:
localStorage.clear();
location.reload();
```

### Erro 2: "Cannot read 'isDemoMode'"

**Verificar:**
```bash
# Verificar se App.tsx foi atualizado:
grep -n "isDemo.isDemoMode" App.tsx

# Não deve retornar nada (foi corrigido)
```

### Erro 3: Sessão não persiste

**Debug:**
```javascript
// Console:
const { Preferences } = await import('@capacitor/preferences');
const session = await Preferences.get({ key: 'session' });
console.log('Sessão salva:', session);

// Deve retornar objeto com userId, email, token
```

---

## 📊 CHECKLIST DE VALIDAÇÃO

```
[ ] Servidor rodando (npm run dev)
[ ] Página abre sem erros
[ ] Modo demo funciona
[ ] Login não dá erro de autenticação
[ ] Dashboard carrega
[ ] Console limpo (sem erros)
[ ] Sessão persiste após reload
[ ] AlertasConfig carrega email
[ ] Marketing funciona
```

**Score: __/9 testes passaram**

---

## 🎯 PRÓXIMO PASSO

Se todos os testes passaram:
✅ **Erro corrigido com sucesso!**

Continue com:
- `CORRECOES_P0_APLICADAS.md` - Ver o que foi feito
- `START_TESTE_AGORA.md` - Testar outras correções de segurança

Se algum teste falhou:
- Ver `FIX_ERRO_AUTENTICACAO.md` - Detalhes técnicos
- Verificar logs do console
- Limpar cache e testar novamente

---

**Data:** 31/10/2025  
**Status:** 🟢 CORRIGIDO E TESTÁVEL
