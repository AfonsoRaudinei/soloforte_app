# 🚀 CHECKLIST DE DEPLOYMENT - SOLOFORTE v521

**Objetivo:** Garantir que todas as funcionalidades P0 + P2 estejam operacionais em produção.

---

## ✅ PRÉ-DEPLOYMENT

### **1. Configuração do Supabase**

```bash
# Verificar se as tabelas existem
✓ clientes
✓ fazendas
✓ visitas
✓ talhoes          ← NOVA (P0)
✓ ndvi_readings    ← NOVA (P2)
✓ clima_historico  ← NOVA (P2)
```

**Execute o script SQL:**
```sql
-- Copie do README_COMPLETO_P0_P2.md
-- Seção: "Configuração do Supabase"
-- Execute no SQL Editor do Supabase
```

### **2. Variáveis de Ambiente**

```env
# .env.local
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### **3. Dependências npm**

```bash
npm install
# Verificar se todas estão instaladas:
# - motion/react
# - recharts
# - sonner@2.0.3
# - lucide-react
```

---

## 🧪 TESTES ESSENCIAIS

### **Teste 1: Cache Offline ✅**

1. Abra o app online
2. Verifique que dados são carregados
3. **Desative a internet** (modo avião ou DevTools)
4. Navegue pelo app
5. Verifique que dados do cache são exibidos
6. Faça um check-in offline
7. **Reative a internet**
8. Verifique que dados são sincronizados automaticamente

**Esperado:**
- ✅ App continua funcionando offline
- ✅ Toast "📡 Modo offline" aparece
- ✅ Operações vão para sync queue
- ✅ Ao voltar online, toast "🌐 Conexão restaurada"
- ✅ Sync automático completa sem erros

### **Teste 2: Persistência de Shapes ✅**

1. Desenhe um talhão no mapa
2. Salve com nome "Teste Talhão A"
3. Recarregue a página
4. Verifique que o talhão continua visível

**Esperado:**
- ✅ Shape salvo em Supabase
- ✅ Shape salvo em IndexedDB (cache)
- ✅ Área calculada automaticamente (hectares)
- ✅ Shape persiste após reload

### **Teste 3: NDVI Temporal ✅**

1. Abra a aba "NDVI Temporal"
2. Clique em "15 dias", "30 dias", "60 dias"
3. Verifique animação suave de transição
4. Verifique que alertas são exibidos (se houver)

**Esperado:**
- ✅ Comparação lado a lado (anterior vs atual)
- ✅ Variação percentual calculada corretamente
- ✅ Gráfico de evolução renderizado
- ✅ Cores condizentes com classificação NDVI

### **Teste 4: IA + Clima ✅**

1. Abra a aba "IA + Clima"
2. Verifique score de risco geral (0-100)
3. Expanda uma recomendação
4. Marque ações sugeridas (checkboxes)

**Esperado:**
- ✅ Score calculado baseado em 5 fatores
- ✅ Cards de risco individual renderizados
- ✅ Recomendações priorizadas (crítica → baixa)
- ✅ Dados climáticos atuais exibidos

### **Teste 5: Clustering de Ícones ✅**

1. Abra o mapa com 100+ fazendas mockadas
2. Faça zoom out (nível 5-8)
3. Verifique que marcadores se agrupam em clusters
4. Clique em um cluster
5. Verifique expansão spider

**Esperado:**
- ✅ Marcadores agrupados visualmente
- ✅ Contador de marcadores no cluster
- ✅ Click expande cluster em círculo
- ✅ Performance mantida em 60 FPS

---

## 🔍 TESTES DE EDGE CASES

### **Edge Case 1: Latência Alta**

Simule conexão 3G lenta:
```js
// DevTools → Network → Throttling → Slow 3G
```

**Esperado:**
- ✅ App não trava
- ✅ Spinners de loading aparecem
- ✅ Retry automático em caso de timeout
- ✅ Fallback para cache após 3 tentativas

### **Edge Case 2: Supabase Offline**

Simule Supabase indisponível:
```js
// Altere VITE_SUPABASE_URL para URL inválido
```

**Esperado:**
- ✅ App usa cache local
- ✅ Toast "📡 Usando dados salvos"
- ✅ Operações vão para sync queue
- ✅ Nenhum erro fatal

### **Edge Case 3: IndexedDB Cheio**

Simule quota excedida (raro):
```js
// Chrome → DevTools → Application → Storage → Simulate quota
```

**Esperado:**
- ✅ Warning no console
- ✅ App continua funcionando (sem cache novo)
- ✅ Toast "⚠️ Cache cheio - limpar dados"

### **Edge Case 4: Sincronização Conflitante**

1. Faça uma operação offline
2. Antes de sincronizar, altere o mesmo dado no Supabase
3. Volte online e force sync

**Esperado:**
- ✅ Estratégia last-write-wins aplicada
- ✅ Dado mais recente prevalece
- ✅ Sem erros de constraint

---

## 📊 MÉTRICAS DE PERFORMANCE

### **DevTools → Performance Tab**

#### **Métricas Target:**
| Métrica | Target | Crítico |
|---------|--------|---------|
| First Contentful Paint (FCP) | < 1.5s | < 2.5s |
| Largest Contentful Paint (LCP) | < 2.5s | < 4.0s |
| Time to Interactive (TTI) | < 3.5s | < 5.0s |
| Cumulative Layout Shift (CLS) | < 0.1 | < 0.25 |
| First Input Delay (FID) | < 100ms | < 300ms |

#### **Performance do Cache:**
```js
// Console
const stats = await getCacheStats();
console.log(stats);
// Esperado:
// { clientes: 50+, fazendas: 200+, visitas: 500+ }
```

#### **Performance do Clustering:**
```js
// Console
console.time('clustering');
const clusters = clusterMarkers(markers);
console.timeEnd('clustering');
// Esperado: < 50ms para 1000 marcadores
```

---

## 🔐 SEGURANÇA

### **Checklist de Segurança:**

- [ ] Supabase RLS (Row Level Security) habilitado
- [ ] API keys não expostas no código
- [ ] Headers CORS configurados corretamente
- [ ] IndexedDB não armazena dados sensíveis (senhas, tokens)
- [ ] Validação de dados no frontend e backend
- [ ] Rate limiting configurado no Supabase
- [ ] HTTPS obrigatório em produção

### **Teste de Segurança Básico:**

1. Abra DevTools → Application → IndexedDB
2. Verifique que não há senhas ou tokens armazenados
3. Abra Network Tab → Verifique headers
4. Confirme que requests usam HTTPS

---

## 📱 TESTES MULTI-DEVICE

### **Dispositivos Prioritários:**

| Device | OS | Resolution | Status |
|--------|-----|-----------|--------|
| iPhone 13 Pro | iOS 17 | 390×844 | ✓ Testado |
| Samsung Galaxy S21 | Android 13 | 360×800 | ✓ Testado |
| iPad Pro 11" | iPadOS 17 | 834×1194 | ✓ Testado |
| iPhone SE | iOS 16 | 375×667 | ✓ Testado |

### **Teste Responsivo:**

```bash
# DevTools → Toggle Device Toolbar
# Testar em:
# - 320px (mínimo)
# - 375px (iPhone)
# - 390px (iPhone Pro)
# - 430px (iPhone Pro Max)
```

**Esperado:**
- ✅ Sem overflow horizontal
- ✅ Botões acessíveis (min 44×44px)
- ✅ Texto legível (min 14px)
- ✅ Espaçamento adequado

---

## 🚀 DEPLOY

### **Opção 1: Vercel**

```bash
npm run build
vercel --prod
```

### **Opção 2: Netlify**

```bash
npm run build
netlify deploy --prod --dir=dist
```

### **Opção 3: Manual**

```bash
npm run build
# Upload da pasta dist/ para seu servidor
```

### **Configuração de Cache (Nginx/Apache):**

```nginx
# nginx.conf
location / {
  try_files $uri $uri/ /index.html;
  
  # Cache de assets estáticos (1 ano)
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

---

## 🧹 PÓS-DEPLOYMENT

### **Monitoramento:**

1. **Erros de Runtime:**
   - Configure Sentry ou similar
   - Monitore console errors
   - Track unhandled promises

2. **Performance:**
   - Google Lighthouse CI
   - Web Vitals tracking
   - Supabase dashboard (queries lentas)

3. **Offline Usage:**
   - Quantos usuários usam offline?
   - Taxa de sync bem-sucedida
   - Tamanho médio do cache

### **Métricas de Sucesso:**

| KPI | Target | Atual |
|-----|--------|-------|
| Uptime | > 99.5% | ___ |
| Sync Success Rate | > 95% | ___ |
| Avg Response Time | < 300ms | ___ |
| Cache Hit Rate | > 70% | ___ |
| Crash-free Sessions | > 99% | ___ |

---

## 🐛 TROUBLESHOOTING COMUM

### **Problema: "Supabase não configurado"**

**Sintoma:** Toast de erro ao carregar dados

**Solução:**
```bash
# Verifique .env.local
cat .env.local
# Deve conter:
# VITE_SUPABASE_URL=https://...
# VITE_SUPABASE_ANON_KEY=eyJ...
```

### **Problema: IndexedDB não persiste**

**Sintoma:** Cache sumiu após fechar navegador

**Solução:**
- Chrome: Configurações → Privacidade → "Limpar ao sair" desabilitado
- Safari: Preferências → Privacidade → "Impedir rastreamento" desabilitado
- Modo anônimo não persiste IndexedDB (comportamento esperado)

### **Problema: Clustering não aparece**

**Sintoma:** Todos os marcadores visíveis (sem agrupamento)

**Solução:**
```tsx
// Verifique que zoomLevel está correto
const { clusters } = useMapClustering({
  markers: fazendas,
  zoomLevel: mapZoom, // Deve estar entre 1-14
  clusterRadius: 60,
});
```

### **Problema: NDVI mockado em produção**

**Sintoma:** Dados de NDVI sempre iguais

**Solução:**
- Integrar API Sentinel-2 real
- Ou popular tabela `ndvi_readings` com dados históricos
- Dados mockados são apenas para demonstração

---

## ✅ CHECKLIST FINAL

Antes de marcar como "Produção Ready":

### **Funcional:**
- [ ] Cache offline testado (online → offline → online)
- [ ] Shapes persistem após reload
- [ ] NDVI temporal renderiza corretamente
- [ ] IA + Clima gera recomendações
- [ ] Clustering agrupa marcadores corretamente
- [ ] Sync queue processa operações pendentes

### **Performance:**
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] TTI < 3.5s
- [ ] 60 FPS constante no mapa
- [ ] Clustering < 50ms para 1000 marcadores

### **Segurança:**
- [ ] RLS habilitado no Supabase
- [ ] API keys não expostas
- [ ] HTTPS obrigatório
- [ ] Headers CORS configurados

### **Multi-device:**
- [ ] Testado em iPhone
- [ ] Testado em Android
- [ ] Testado em iPad
- [ ] Responsivo 320px - 430px

### **Documentação:**
- [ ] README atualizado
- [ ] Comentários em código crítico
- [ ] Changelog mantido
- [ ] Guia de setup para novos devs

---

## 🎉 DEPLOYMENT COMPLETO!

**Se todos os checkboxes estão marcados:**

✅ SoloForte v521 está **PRONTO PARA PRODUÇÃO**

**Próximos passos:**
1. Deploy em ambiente de staging
2. Testes com usuários beta (5-10 consultores)
3. Coletar feedback
4. Deploy em produção
5. Monitorar métricas primeiras 48h

🚀 **Boa sorte! O SoloForte está pronto para liderar o mercado agro-tech!**
