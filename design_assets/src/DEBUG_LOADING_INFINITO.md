# 🔍 Debug - Loading Infinito Após Login

**Data**: 1 de Novembro de 2025  
**Problema**: Tela fica em "Carregando..." após login  
**Status**: 🔧 Em investigação

---

## 🎯 OBJETIVO

Identificar por que o app fica travado em "Carregando..." após o login.

---

## ✅ CORREÇÕES JÁ APLICADAS

1. ✅ Adicionado verificação de `currentRoute` antes de chamar `prefetchByRoute`
2. ✅ Adicionados logs detalhados no fluxo de inicialização
3. ✅ Desabilitada migração automática de storage que bloqueava init

---

## 🔍 COMO DEBUGAR

### Passo 1: Abrir Console do Navegador

1. **Chrome/Edge**: `F12` ou `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. **Firefox**: `F12` ou `Ctrl+Shift+K`
3. **Safari**: `Cmd+Option+C`

### Passo 2: Recarregar a Página

1. Com o console aberto, pressione `F5` ou `Ctrl+R` para recarregar
2. Observe os logs que aparecem

### Passo 3: Analisar os Logs

Você deve ver uma sequência de logs assim:

```
✅ SEQUÊNCIA CORRETA (funcionando):
──────────────────────────────────────────

🔍 [App] Iniciando verificação de sessão... {isDemo: false}
📍 [App] Rota atual: null
⏱️ [App] Executando checkSession após delay...
🔍 [App] Verificando validade da sessão...
🔍 [App] Resultado sessão: {isSessionValid: true, isDemo: false}
✅ [App] Sessão válida detectada, navegando para dashboard
🧭 [App] Navegando para: /dashboard
📍 [App] Rota atual: /dashboard
🚀 [PREFETCH] Iniciando prefetch de DashboardExecutivo...
✅ [PREFETCH] DashboardExecutivo carregado em 45.23ms
```

```
❌ SEQUÊNCIA COM ERRO (travado):
──────────────────────────────────────────

🔍 [App] Iniciando verificação de sessão... {isDemo: false}
📍 [App] Rota atual: null
⏱️ [App] Executando checkSession após delay...
🔍 [App] Verificando validade da sessão...
❌ [App] Erro ao verificar sessão: [ERRO AQUI]
🔄 [App] Fallback para Home devido a erro
📍 [App] Rota atual: /home
[TRAVA AQUI - Não renderiza Home]
```

---

## 🐛 POSSÍVEIS CAUSAS

### 1. Erro no sessionStorage.isValid()

**Sintoma**: Log mostra `❌ [App] Erro ao verificar sessão:`

**Causa**: A função `sessionStorage.isValid()` está lançando exceção

**Solução**:
```typescript
// Verificar se o erro é no método isValid
// Abrir console e executar:
import { sessionStorage } from './utils/storage/capacitor-storage';
await sessionStorage.isValid();
```

### 2. currentRoute fica em null

**Sintoma**: Log mostra `📍 [App] Rota atual: null` mas nunca muda

**Causa**: O `setCurrentRoute()` não está sendo chamado

**Verificação**:
- Olhar no console se aparece `✅ [App] Sessão válida detectada` ou `📱 [App] Primeira visita`
- Se não aparece, o checkSession não está executando

### 3. Componente Home/Dashboard não carrega

**Sintoma**: Logs mostram navegação, mas componente não renderiza

**Causa**: Lazy loading do componente está falhando

**Verificação**:
```javascript
// No console:
import('./components/Dashboard').then(
  () => console.log('✅ Dashboard carrega OK'),
  (err) => console.error('❌ Erro ao carregar Dashboard:', err)
);
```

### 4. Supabase não inicializa

**Sintoma**: Erro ao verificar sessão do Supabase

**Verificação**:
```javascript
// No console:
import { createClient } from './utils/supabase/client';
const supabase = createClient();
supabase.auth.getSession().then(
  (result) => console.log('✅ Sessão Supabase:', result),
  (err) => console.error('❌ Erro Supabase:', err)
);
```

---

## 🔧 SOLUÇÕES POR CENÁRIO

### Cenário A: sessionStorage.isValid() lança erro

**Comando de debug**:
```javascript
// No console do navegador
localStorage.getItem('session')
```

**Se retornar `null`**:
- Problema: Não há sessão salva
- Solução: Fazer login novamente

**Se retornar um objeto JSON**:
```javascript
// Verificar estrutura
const session = JSON.parse(localStorage.getItem('session'));
console.log('Sessão:', session);
console.log('Tem expiresAt?', session.expiresAt);
console.log('Expirou?', Date.now() > session.expiresAt);
```

**Correção temporária** (executar no console):
```javascript
// Forçar modo demo (bypass de sessão)
localStorage.setItem('soloforte_demo_mode', 'true');
location.reload();
```

### Cenário B: Rota não muda de null

**Verificação**:
```javascript
// No console React DevTools
// Procurar componente App
// Verificar state currentRoute
```

**Correção temporária**:
```javascript
// Forçar navegação para home
window.dispatchEvent(new CustomEvent('force-navigate', { detail: '/home' }));
```

### Cenário C: Componente não renderiza

**Verificação de erro no componente**:
1. Abrir React DevTools
2. Procurar componente `Dashboard` ou `Home`
3. Ver se há erro no componente

**Correção**:
- Se houver erro, reportar stack trace completo

---

## 📊 CHECKLIST DE DEBUG

Execute os seguintes comandos no console e anote os resultados:

```javascript
// 1. Verificar localStorage
console.log('1. Demo mode:', localStorage.getItem('soloforte_demo_mode'));
console.log('2. Sessão:', localStorage.getItem('session'));

// 2. Verificar Capacitor
console.log('3. Capacitor disponível?', typeof window.Capacitor !== 'undefined');

// 3. Testar sessionStorage
import { sessionStorage } from './utils/storage/capacitor-storage';
sessionStorage.isValid().then(
  (valid) => console.log('4. Sessão válida?', valid),
  (err) => console.error('4. ERRO ao verificar sessão:', err)
);

// 4. Testar criação de cliente Supabase
import { createClient } from './utils/supabase/client';
const supabase = createClient();
console.log('5. Supabase criado?', !!supabase);

// 5. Verificar se Dashboard pode ser importado
import('./components/Dashboard').then(
  (module) => console.log('6. Dashboard OK:', !!module.default),
  (err) => console.error('6. ERRO ao carregar Dashboard:', err)
);

// 6. Verificar state do React (se React DevTools estiver instalado)
// Procurar componente App e ver state currentRoute
```

---

## 🚀 SOLUÇÃO RÁPIDA (WORKAROUND)

Se estiver travado e precisar acessar urgentemente:

### Opção 1: Forçar Modo Demo

```javascript
// No console
localStorage.setItem('soloforte_demo_mode', 'true');
location.reload();
```

### Opção 2: Limpar Storage e Recarregar

```javascript
// No console
localStorage.clear();
sessionStorage.clear();
location.reload();
// Depois, fazer login novamente
```

### Opção 3: Navegar Diretamente

```javascript
// No console (após App carregar)
// Forçar mudança de rota
window.history.pushState({}, '', '/dashboard');
location.reload();
```

---

## 📝 INFORMAÇÕES A COLETAR

Por favor, execute os comandos acima e me envie:

1. **Logs do console** (copiar e colar tudo)
2. **Resultado do checklist** (6 itens acima)
3. **Mensagens de erro** (se houver)
4. **Screenshot do React DevTools** mostrando state do App

---

## 🔄 PRÓXIMOS PASSOS

Após análise dos logs, posso:

1. ✅ Identificar causa raiz exata
2. ✅ Aplicar correção definitiva
3. ✅ Prevenir recorrência
4. ✅ Adicionar fallbacks robustos

---

## 📞 COMANDOS ÚTEIS

### Forçar navegação para Dashboard
```javascript
window.location.href = '/';
setTimeout(() => {
  localStorage.setItem('soloforte_demo_mode', 'true');
  location.reload();
}, 100);
```

### Ver todos os dados armazenados
```javascript
console.table({
  demo_mode: localStorage.getItem('soloforte_demo_mode'),
  session: localStorage.getItem('session'),
  current_route: 'Ver no React DevTools',
  capacitor: typeof window.Capacitor !== 'undefined'
});
```

### Resetar tudo
```javascript
// CUIDADO: Vai deslogar e limpar tudo
const confirmReset = confirm('Resetar TUDO? Isso vai deslogar você.');
if (confirmReset) {
  localStorage.clear();
  sessionStorage.clear();
  if (window.indexedDB) {
    indexedDB.databases().then(dbs => {
      dbs.forEach(db => indexedDB.deleteDatabase(db.name));
    });
  }
  location.href = '/';
}
```

---

## ✅ VALIDAÇÃO FINAL

Após aplicar correção, verificar:

- [ ] Login funciona normalmente
- [ ] Navegação para dashboard é instantânea
- [ ] Não há loading infinito
- [ ] Console não mostra erros
- [ ] React DevTools mostra currentRoute correto
- [ ] Modo demo funciona
- [ ] Logout e re-login funciona

---

**Status**: 🔧 Aguardando logs de debug do usuário  
**Última atualização**: 1 de Novembro de 2025, 20:15
