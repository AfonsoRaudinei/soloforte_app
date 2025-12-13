# 🔍 Debug: Zoom em Pin de Ocorrência

**Status:** Investigando  
**Issue:** Zoom não está funcionando ao adicionar novo pin

---

## 🧪 Logs Adicionados

### 1. Quando MapInstance é setado
```typescript
onMapLoad={(map) => {
  logger.log('🗺️ MapInstance recebido e setado:', !!map);
  setMapInstance(map);
}}
```

### 2. Quando tentamos fazer zoom
```typescript
logger.log('🗺️ Tentando aplicar zoom. MapInstance disponível:', !!mapInstance);
if (mapInstance && mapInstance.setView) {
  logger.log('🎯 MapInstance válido! Aplicando zoom em 300ms...');
  // ... zoom code
}
```

---

## 🔍 Como Debugar

1. Abrir DevTools (F12)
2. Ir para aba Console
3. Adicionar novo pin de ocorrência
4. Verificar logs:

```
✅ Esperado:
🗺️ MapInstance recebido e setado: true
🗺️ Tentando aplicar zoom. MapInstance disponível: true
🎯 MapInstance válido! Aplicando zoom em 300ms...
⏰ Timeout executado. Aplicando zoom agora para: {...}
✅ Zoom aplicado com sucesso!

❌ Se não funcionar:
🗺️ MapInstance recebido e setado: false  ← Problema: mapa não carregou
🗺️ Tentando aplicar zoom. MapInstance disponível: false  ← Problema: mapInstance null
⚠️ MapInstance não disponível para zoom  ← Problema: timing
```

---

## 🐛 Possíveis Problemas

### 1. MapInstance não está sendo setado
**Causa:** MapTilerComponent não está chamando onMapLoad  
**Fix:** Verificar se mapa carregou

### 2. MapInstance é null quando salvamos
**Causa:** Mapa desmonta/remonta  
**Fix:** useRef ao invés de useState

### 3. Timing incorreto
**Causa:** Pin não renderizou ainda  
**Fix:** Aumentar timeout ou usar callback

---

## 🔧 Próximos Passos

Se os logs mostrarem que mapInstance é null, vamos:

1. ✅ Mudar de useState para useRef (mais estável)
2. ✅ Adicionar verificação extra
3. ✅ Usar evento do mapa ao invés de setTimeout

---

## 📝 Teste Manual

```
1. Abrir /dashboard
2. Abrir DevTools Console
3. Clicar FAB (+)
4. Clicar "Nova Ocorrência"  
5. Preencher dados
6. Clicar "Capturar Localização GPS"
7. Clicar "Salvar"
8. Verificar logs no console
```

---

**AGUARDANDO:** Feedback do usuário com os logs
