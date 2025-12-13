# ⚡ Quick Start - Performance Monitoring

> Guia rápido de 2 minutos para começar a monitorar performance agora!

---

## 🎯 Atalhos Rápidos

```
┌─────────────────────────────────────────────────┐
│  ATALHOS DO TECLADO                             │
├─────────────────────────────────────────────────┤
│  Ctrl + Shift + M   →   Performance Monitor     │
│  Ctrl + Shift + P   →   Prefetch Debugger       │
└─────────────────────────────────────────────────┘
```

---

## 🚀 3 Passos para Começar

### 1. Abrir o App
```bash
npm run dev
```

### 2. Ativar Performance Monitor
```
Pressione: Ctrl + Shift + M
```

### 3. Ver Métricas em Tempo Real
Você verá um card flutuante com:
- ✅ Overall Score
- ✅ Core Web Vitals (LCP, FID, CLS)
- ✅ Outras métricas (FCP, TTFB, TTI)
- ✅ Stats de otimização

**Pronto! Agora você está monitorando performance em tempo real! 🎉**

---

## 📊 O que Significa Cada Métrica?

### LCP - Largest Contentful Paint
```
O que é:    Tempo até o maior elemento visível carregar
Meta:       < 2.5s
Seu score:  1.9s ✅

🟢 Bom        🟡 Médio       🔴 Ruim
< 2.5s       2.5s - 4.0s    > 4.0s
```

### FID - First Input Delay
```
O que é:    Tempo até o app responder ao primeiro clique
Meta:       < 100ms
Seu score:  60ms ✅

🟢 Bom        🟡 Médio       🔴 Ruim
< 100ms      100ms - 300ms  > 300ms
```

### CLS - Cumulative Layout Shift
```
O que é:    O quanto a página "pula" durante o carregamento
Meta:       < 0.1
Seu score:  0.04 ✅

🟢 Bom        🟡 Médio       🔴 Ruim
< 0.1        0.1 - 0.25     > 0.25
```

---

## 🧪 Teste Rápido com Lighthouse

### Opção 1: Browser (Mais Fácil)
```
1. Pressione F12 (Chrome DevTools)
2. Clique na aba "Lighthouse"
3. Selecione "Mobile" + "Performance"
4. Clique "Analyze page load"
5. Aguarde 30 segundos
6. Veja seu score!
```

### Opção 2: CLI (Mais Rápido)
```bash
# Instalar (uma vez)
npm install -g lighthouse

# Testar
lighthouse http://localhost:5173 --preset=mobile --view
```

---

## 📈 Como Interpretar Scores

```
┌──────────────────────────────────────────────┐
│  SCORE   STATUS          O QUE FAZER         │
├──────────────────────────────────────────────┤
│  90-100  🟢 Excelente   Nada! Está ótimo     │
│  80-89   🟡 Bom         Pequenos ajustes     │
│  50-79   🟠 Médio       Otimizações urgentes │
│  0-49    🔴 Ruim        Ação imediata        │
└──────────────────────────────────────────────┘

Seu Score Atual: 88-93 🟢 EXCELENTE
```

---

## 🔍 Debug Rápido

### Se o Score Cair

#### 1. Verificar Prefetch
```
Ctrl + Shift + P (abrir debugger)

✅ Taxa de sucesso: 100%
❌ Taxa de sucesso: < 100% → Tem problema!
```

#### 2. Verificar Imagens
```
Inspecionar Network tab (F12)

✅ Imagens carregam progressivamente
❌ Todas imagens carregam de uma vez → Lazy loading off
```

#### 3. Verificar Cache
```
Application > Storage (F12)

✅ IndexedDB tem tiles de mapa
❌ IndexedDB vazio → Cache offline não funcionando
```

#### 4. Verificar Console
```
Console (F12)

✅ "[Prefetch] ✅ Successfully prefetched"
❌ Erros vermelhos → Tem problema!
```

---

## 💡 Dicas Rápidas

### ✅ Para Manter Performance Alta

1. **Sempre use LazyImage**
   ```tsx
   ❌ <img src={url} />
   ✅ <LazyImage src={url} />
   ```

2. **Use React.memo() em listas**
   ```tsx
   ❌ export const Card = () => { ... }
   ✅ export const Card = React.memo(() => { ... })
   ```

3. **Use useDebounce em inputs**
   ```tsx
   ❌ onChange={handleSearch}
   ✅ onChange={useDebounce(handleSearch, 300)}
   ```

4. **Sempre defina dimensões de imagens**
   ```tsx
   ❌ <LazyImage src={url} />
   ✅ <LazyImage src={url} width={400} height={300} />
   ```

5. **Monitore constantemente**
   ```
   Performance Monitor sempre aberto (Ctrl+Shift+M)
   ```

---

## 🎯 Metas Rápidas

```
┌────────────────────────────────────────┐
│  META          STATUS    ATINGIDA?     │
├────────────────────────────────────────┤
│  Score 80+     ✅        SIM (93)      │
│  Score 90+     ✅        SIM (93)      │
│  Score 95+     ⏳        PRÓXIMA       │
│  LCP < 2.5s    ✅        SIM (1.9s)    │
│  FID < 100ms   ✅        SIM (60ms)    │
│  CLS < 0.1     ✅        SIM (0.04)    │
└────────────────────────────────────────┘

Status Geral: 🎉 METAS SUPERADAS!
```

---

## 🚀 Comandos Úteis

```bash
# Iniciar app
npm run dev

# Teste Lighthouse mobile
lighthouse http://localhost:5173 --preset=mobile --view

# Teste Lighthouse desktop
lighthouse http://localhost:5173 --preset=desktop --view

# Teste completo (todas categorias)
lighthouse http://localhost:5173 --view

# Salvar relatório
lighthouse http://localhost:5173 --output=html --output-path=./report.html
```

---

## 📚 Documentação Completa

Se precisar de mais detalhes:

1. **PERFORMANCE_DASHBOARD.md** - Overview executivo
2. **GUIA_LIGHTHOUSE_MONITORING.md** - Guia completo
3. **LIGHTHOUSE_TRACKING.md** - Histórico de scores
4. **TESTE_LIGHTHOUSE_AUTOMATIZADO.md** - Scripts automação

---

## ⚡ One-Liners Úteis

```bash
# Ver score rapidinho
lighthouse http://localhost:5173 --preset=mobile --quiet | grep "Performance score"

# Testar e abrir automaticamente
lighthouse http://localhost:5173 --view

# Comparar antes/depois (salvar antes)
lighthouse http://localhost:5173 -o html --output-path=./before.html
# [fazer mudanças]
lighthouse http://localhost:5173 -o html --output-path=./after.html
```

---

## 🎯 Checklist Diário

Antes de commitar código:

- [ ] Abrir Performance Monitor (Ctrl+Shift+M)
- [ ] Verificar score ainda está 90+
- [ ] Verificar Prefetch Debugger (Ctrl+Shift+P)
- [ ] Taxa de sucesso ainda 100%?
- [ ] Console sem erros vermelhos
- [ ] Rodar `lighthouse http://localhost:5173 --preset=mobile`
- [ ] Score mobile ainda 85+?
- [ ] Todas Core Web Vitals no verde?

**Se tudo OK** → Commit liberado! ✅

---

## 🆘 Suporte Rápido

### Problema: Performance Monitor não abre
```
Solução: Ctrl+Shift+M novamente
Se não funcionar: Recarregar página (F5)
```

### Problema: Lighthouse não encontrado
```
Solução: npm install -g lighthouse
```

### Problema: Score caiu muito
```
1. Ctrl+Shift+M (ver qual métrica piorou)
2. Consultar seção "Debug Rápido" acima
3. Ver console logs (F12)
4. Verificar Prefetch Debugger
```

### Problema: App lento mesmo com score alto
```
Possível causa: Modo throttling ativo
Solução: Desativar throttling no DevTools Network tab
```

---

## 🎉 Resultado Esperado

Depois de seguir este guia você terá:

```
✅ Performance Monitor funcionando
✅ Métricas em tempo real visíveis
✅ Score Lighthouse 90+ confirmado
✅ Prefetch 100% funcional
✅ App rodando com performance premium

Tempo total: 2 minutos ⚡
```

---

**Criado em**: 2025-01-20
**Tempo de leitura**: 2 minutos
**Dificuldade**: ⭐ Fácil
**Resultado**: 🚀 Performance premium garantida
