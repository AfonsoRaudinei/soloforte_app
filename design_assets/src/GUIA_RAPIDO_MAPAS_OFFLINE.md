# 🗺️ GUIA RÁPIDO - Mapas Offline

**Para:** Usuários e Desenvolvedores  
**Tempo de leitura:** 3 minutos

---

## 🚀 INÍCIO RÁPIDO (Usuário)

### Como Baixar Mapas para Uso Offline

1. **Abra o Dashboard**
   - Login → Dashboard

2. **Navegue até a área desejada**
   - Mova e dê zoom até a fazenda/região que você quer usar offline

3. **Clique em "Baixar Offline"**
   - Botão no canto superior direito (ícone ⬇️)
   - Aguarde o download (barra de progresso)
   - ✅ Pronto! Você pode usar offline agora

4. **Teste o modo offline**
   - Ative o modo avião
   - Mova o mapa
   - Áreas baixadas aparecem normalmente
   - Áreas não baixadas = cinza com "Offline"

---

## 💡 DICAS DE USO

### ✅ FAZER

- ✅ Baixar áreas importantes **antes** de ir para o campo
- ✅ Conectar ao WiFi para downloads grandes
- ✅ Dar zoom nas áreas que você realmente usa
- ✅ Atualizar cache a cada 7 dias (expiram automaticamente)

### ❌ NÃO FAZER

- ❌ Baixar o país inteiro (muito grande!)
- ❌ Usar dados móveis para downloads (use WiFi)
- ❌ Esperar funcionar sem pré-carregar
- ❌ Limpar cache sem necessidade

---

## 🎯 CENÁRIOS DE USO

### Cenário 1: Produtor no Campo

```
PROBLEMA: 
Preciso consultar o mapa no campo, mas não tem sinal.

SOLUÇÃO:
1. Antes de sair: Abrir app em casa (WiFi)
2. Navegar até fazenda no mapa
3. Clicar "Baixar Offline"
4. Aguardar download completo
5. No campo: Mapa funciona sem internet!
```

### Cenário 2: Agrônomo Visitando Fazendas

```
PROBLEMA:
Visito 5 fazendas por dia, nem todas têm sinal.

SOLUÇÃO:
1. Segunda de manhã: Baixar todas as 5 áreas
2. Durante a semana: Usar mapas offline
3. Próxima segunda: Atualizar cache
```

### Cenário 3: Análise de Dados Offline

```
PROBLEMA:
Quero mostrar relatórios para cliente offline.

SOLUÇÃO:
1. Baixar área da fazenda
2. Exportar relatórios em PDF (já funciona offline)
3. Apresentar tudo sem internet
```

---

## 📊 QUANTO ESPAÇO OCUPA?

### Estimativas

| Área | Tiles | Espaço |
|------|-------|--------|
| **1 fazenda pequena** | ~50-100 tiles | ~2-4 MB |
| **1 fazenda média** | ~200-500 tiles | ~8-15 MB |
| **1 fazenda grande** | ~500-1000 tiles | ~15-30 MB |
| **Região (10km²)** | ~2000-5000 tiles | ~60-100 MB |

**Limite do app:** 100 MB (limpeza automática)

---

## 🔧 DESENVOLVEDORES

### Uso Programático

```typescript
import { tileManager } from './utils/TileManager';

// ===================================
// PRÉ-CARREGAR ÁREA
// ===================================

await tileManager.preloadArea(
  {
    minLat: -23.6,
    maxLat: -23.5,
    minLng: -46.7,
    maxLng: -46.6
  },
  12, // Zoom mín
  16, // Zoom máx
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  (progress, total) => {
    console.log(`${Math.round(progress/total*100)}%`);
  }
);

// ===================================
// VERIFICAR CACHE
// ===================================

const stats = await tileManager.getCacheStats();
console.log(`${stats.totalTiles} tiles (${stats.totalSizeMB.toFixed(1)} MB)`);

// ===================================
// LIMPAR CACHE
// ===================================

await tileManager.clearCache();

// ===================================
// VERIFICAR STATUS ONLINE
// ===================================

console.log(tileManager.online ? 'ONLINE' : 'OFFLINE');
```

---

## 🐛 RESOLUÇÃO DE PROBLEMAS

### "Não consigo baixar mapas"

**Possíveis causas:**
1. Você está offline (precisa estar online para baixar)
2. Navegador bloqueou IndexedDB (saia do modo anônimo)
3. Quota de armazenamento esgotada (limpe cache antigo)

**Solução:**
```
1. Verificar se está online (ícone WiFi verde)
2. Sair do modo anônimo/privado
3. Limpar cache antigo (botão "Limpar Cache")
```

---

### "Mapas não aparecem offline"

**Possíveis causas:**
1. Área não foi pré-carregada
2. Cache expirou (>7 dias)
3. IndexedDB foi limpo pelo navegador

**Solução:**
```
1. Pré-carregar área novamente
2. Verificar stats do cache (deve ter tiles)
3. Baixar área antes de ficar offline
```

---

### "App está lento"

**Possíveis causas:**
1. Download em progresso
2. Cache muito grande (>100MB)
3. Muitos tiles sendo carregados

**Solução:**
```
1. Aguardar download terminar
2. Limpar cache (automático acima de 100MB)
3. Reduzir área de pré-carregamento
```

---

## 📱 CAPACITOR (Mobile)

### Diferenças no App Mobile

```
BROWSER (Web):
  ├─ IndexedDB: ~50 MB típico
  ├─ Limpeza: Navegador pode limpar
  └─ Persistência: Boa

CAPACITOR (Mobile):
  ├─ IndexedDB: ~100-500 MB possível
  ├─ Limpeza: App controla
  └─ Persistência: Excelente ✅
```

### Permissões Necessárias

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- iOS: Automático -->
```

---

## ✅ CHECKLIST PRÉ-CAMPO

Antes de ir para o campo sem internet:

```
[ ] App instalado e testado
[ ] Login feito (salvo localmente)
[ ] Áreas das fazendas pré-carregadas
[ ] Cache verificado (stats > 0 tiles)
[ ] Teste offline realizado (modo avião)
[ ] Bateria carregada (GPS consome bateria)
```

---

## 🎓 PERGUNTAS FREQUENTES

### 1. Preciso estar online para usar o mapa?

**Não!** Desde que a área tenha sido pré-carregada, você pode usar 100% offline.

---

### 2. Quanto tempo leva para baixar?

```
Fazenda pequena:  ~30 segundos
Fazenda média:    ~1-2 minutos
Fazenda grande:   ~3-5 minutos
Região (10km²):   ~10-15 minutos
```

---

### 3. O cache expira?

**Sim**, após **7 dias**. Tiles antigos são removidos automaticamente para economizar espaço.

---

### 4. Posso usar dados móveis?

**Pode**, mas não é recomendado. Downloads consomem ~2-30 MB dependendo da área. Use WiFi sempre que possível.

---

### 5. Posso baixar o Brasil inteiro?

**Tecnicamente sim, mas não é prático.** O cache tem limite de 100 MB (limpeza automática). Baixe apenas as áreas que você realmente usa.

---

### 6. Funciona em todos os estilos de mapa?

**Sim!** Funciona em:
- 🗺️ Ruas (OpenStreetMap)
- 🛰️ Satélite (Google)
- 🏔️ Terreno (OpenTopoMap)

Cada estilo tem cache separado.

---

### 7. Posso usar GPS offline?

**Sim!** GPS funciona sem internet. Apenas os tiles do mapa precisam ser pré-carregados.

---

## 📞 SUPORTE

Problemas ou dúvidas?

```
1. Verificar documentação: /MAPAS_OFFLINE_IMPLEMENTADO.md
2. Verificar console (F12) para logs
3. Limpar cache e tentar novamente
4. Reportar bug com logs do console
```

---

**Última atualização:** 20/10/2025  
**Versão:** 1.0
