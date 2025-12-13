# ✅ Checklist - Implementação Capacitor

**Objetivo:** Converter SoloForte para app mobile nativo  
**Prazo:** 10 dias úteis  
**Status Atual:** 🟡 Em Planejamento

---

## 📅 DIA 1-3: BLOQUEADORES CRÍTICOS

### ✅ DIA 1: Setup Inicial + Storage (8h)

- [ ] **Setup Capacitor** (2h)
  ```bash
  npm install @capacitor/core @capacitor/cli
  npm install @capacitor/android @capacitor/ios
  npx cap init SoloForte com.soloforte.app
  npx cap add android
  npx cap add ios
  ```
  
- [ ] **Migrar localStorage → Capacitor Storage** (6h)
  ```bash
  npm install @capacitor/preferences
  ```
  - [ ] Criar wrapper de storage em `/utils/storage.ts`
  - [ ] Atualizar `/App.tsx:33` - Sessão
  - [ ] Atualizar `/components/Login.tsx:55,69` - Login/Demo
  - [ ] Atualizar `/components/Cadastro.tsx:125` - Cadastro
  - [ ] Atualizar `/components/Dashboard.tsx:136,178,224,269` - Polígonos
  - [ ] Atualizar `/utils/supabase/client.ts:24` - Check demo
  - [ ] Testar: Fechar app → Reabrir → Sessão deve persistir ✅

---

### ✅ DIA 2: Sistema de Mapas Offline (8h)

- [ ] **Instalar Dependências** (0.5h)
  ```bash
  npm install leaflet @types/leaflet
  npm install localforage
  npm install @capacitor/network
  ```

- [ ] **Criar TileManager** (4h)
  - [ ] Copiar código de `/GUIA_MAPAS_OFFLINE.md`
  - [ ] Criar arquivo `/utils/TileManager.ts`
  - [ ] Implementar cache com IndexedDB
  - [ ] Implementar detecção de rede
  - [ ] Implementar fallback para offline

- [ ] **Integrar no Mapa** (3h)
  - [ ] Atualizar `/components/MapTilerComponent.tsx`
  - [ ] Remover carregamento dinâmico de Leaflet (linhas 22-98)
  - [ ] Importar Leaflet como dependência
  - [ ] Adicionar TileManager ao tile loading
  - [ ] Adicionar botão "Baixar Offline"

- [ ] **Testar** (0.5h)
  - [ ] Carregar mapa online ✅
  - [ ] Pré-carregar área ✅
  - [ ] Modo avião → Mapa deve aparecer ✅
  - [ ] Verificar cache no DevTools → Application → IndexedDB ✅

---

### ✅ DIA 3: Câmera Nativa + Permissões (8h)

- [ ] **Implementar Câmera** (3h)
  ```bash
  npm install @capacitor/camera
  ```
  - [ ] Atualizar `/components/CameraCapture.tsx`
  - [ ] Substituir `navigator.mediaDevices` por `Camera.getPhoto()`
  - [ ] Adicionar seleção de câmera frontal/traseira
  - [ ] Adicionar suporte a galeria de fotos

- [ ] **Permissões Android** (1h)
  - [ ] Editar `android/app/src/main/AndroidManifest.xml`
  - [ ] Adicionar permissão CAMERA
  - [ ] Adicionar permissão READ_EXTERNAL_STORAGE
  - [ ] Adicionar permissão WRITE_EXTERNAL_STORAGE

- [ ] **Permissões iOS** (1h)
  - [ ] Editar `ios/App/App/Info.plist`
  - [ ] Adicionar NSCameraUsageDescription
  - [ ] Adicionar NSPhotoLibraryUsageDescription
  - [ ] Adicionar textos descritivos em português

- [ ] **Geolocalização com Permissões** (2h)
  ```bash
  npm install @capacitor/geolocation
  ```
  - [ ] Criar hook `useGeolocation` em `/utils/hooks/`
  - [ ] Atualizar `/components/Dashboard.tsx:288,304,537,571`
  - [ ] Atualizar `/components/Clima.tsx:133,136`
  - [ ] Adicionar check de permissões ANTES de usar GPS

- [ ] **Testar** (1h)
  - [ ] Câmera abre em Android ✅
  - [ ] Câmera abre em iOS ✅
  - [ ] GPS solicita permissão ✅
  - [ ] Ocorrência salva com foto ✅

---

## 📅 DIA 4-7: PROBLEMAS MODERADOS

### ✅ DIA 4: Detecção de Rede + Share API (8h)

- [ ] **Status de Rede** (3h)
  ```bash
  npm install @capacitor/network
  ```
  - [ ] Criar hook `useNetworkStatus` em `/utils/hooks/`
  - [ ] Adicionar listener de mudanças de rede
  - [ ] Mostrar toast quando ficar offline/online
  - [ ] Adicionar indicador de status na UI
  - [ ] Desabilitar features que requerem internet quando offline

- [ ] **Share API Nativa** (3h)
  ```bash
  npm install @capacitor/share
  npm install @capacitor/filesystem
  ```
  - [ ] Atualizar `/components/NDVIViewer.tsx:629`
  - [ ] Substituir `window.open()` por `Share.share()`
  - [ ] Salvar HTML no filesystem temporário
  - [ ] Compartilhar via menu nativo
  - [ ] Adicionar opção de salvar em Documents

- [ ] **Device Info** (1h)
  ```bash
  npm install @capacitor/device
  ```
  - [ ] Detectar dispositivos low-end
  - [ ] Ajustar qualidade de animações
  - [ ] Ajustar qualidade de imagens

- [ ] **Testar** (1h)
  - [ ] Avisos de offline/online funcionam ✅
  - [ ] Relatórios compartilhados via WhatsApp/Email ✅
  - [ ] Animações suaves em dispositivo antigo ✅

---

### ✅ DIA 5: Otimizações de Bundle (8h)

- [ ] **Análise de Bundle** (1h)
  ```bash
  npm run build -- --analyze
  ```
  - [ ] Identificar pacotes mais pesados
  - [ ] Listar componentes não usados

- [ ] **Lazy Loading Agressivo** (3h)
  - [ ] Verificar `/App.tsx` - já tem lazy load ✅
  - [ ] Adicionar lazy load em subcomponentes pesados
  - [ ] NDVIViewer como lazy
  - [ ] MapDrawing como lazy
  - [ ] Charts como lazy

- [ ] **Otimizar Imagens** (2h)
  ```bash
  npm install browser-image-compression
  ```
  - [ ] Comprimir fotos antes de upload
  - [ ] Converter para WebP quando possível
  - [ ] Redimensionar para max 1920px

- [ ] **Tree Shaking** (2h)
  - [ ] Verificar imports `import * as` 
  - [ ] Trocar por imports nomeados
  - [ ] Remover código morto
  - [ ] Verificar reducação de bundle

---

### ✅ DIA 6: Sincronização Background (8h)

- [ ] **Background Task** (4h)
  ```bash
  npm install @capacitor/background-task
  ```
  - [ ] Implementar fila de sincronização
  - [ ] Sincronizar polígonos demo → backend
  - [ ] Sincronizar marcadores demo → backend
  - [ ] Sincronizar check-ins pendentes

- [ ] **Retry Logic** (2h)
  - [ ] Implementar retry exponencial
  - [ ] Salvar falhas em fila
  - [ ] Retentar quando voltar online
  - [ ] Notificar usuário de sucessos/falhas

- [ ] **Conflict Resolution** (2h)
  - [ ] Detectar conflitos de dados
  - [ ] Estratégia: last-write-wins
  - [ ] Backup de dados conflitantes
  - [ ] Log de conflitos para debug

---

### ✅ DIA 7: Polimento e UX (8h)

- [ ] **Logger em Produção** (0.5h)
  - [ ] Atualizar `/utils/logger.ts`
  - [ ] Desabilitar COMPLETAMENTE em prod mobile
  - [ ] Manter apenas error logs

- [ ] **Splash Screen** (1h)
  ```bash
  npm install @capacitor/splash-screen
  ```
  - [ ] Configurar splash iOS
  - [ ] Configurar splash Android
  - [ ] Esconder após app carregar

- [ ] **Status Bar** (0.5h)
  ```bash
  npm install @capacitor/status-bar
  ```
  - [ ] Configurar cor da status bar
  - [ ] Modo dark/light automático

- [ ] **Haptic Feedback** (1h)
  ```bash
  npm install @capacitor/haptics
  ```
  - [ ] Adicionar feedback tátil em botões críticos
  - [ ] Vibração ao capturar foto
  - [ ] Vibração ao salvar polígono

- [ ] **Animações Performáticas** (3h)
  - [ ] Atualizar `/components/RadarClima.tsx`
  - [ ] Atualizar `/components/FloatingActionButton.tsx`
  - [ ] Usar `will-change` em CSS
  - [ ] Reduzir blur/shadow em low-end

- [ ] **Offline Indicator** (1h)
  - [ ] Banner fixo quando offline
  - [ ] Mostrar features indisponíveis
  - [ ] Sincronização pendente counter

- [ ] **Testar UX** (1h)
  - [ ] App parece nativo ✅
  - [ ] Transições suaves ✅
  - [ ] Sem lags perceptíveis ✅

---

## 📅 DIA 8-10: TESTES E BUILD

### ✅ DIA 8: Testes Manuais (8h)

- [ ] **Android - Emulador** (3h)
  ```bash
  npx cap sync android
  npx cap open android
  ```
  - [ ] Login funciona ✅
  - [ ] Cadastro funciona ✅
  - [ ] Mapa carrega ✅
  - [ ] Mapa funciona offline ✅
  - [ ] Câmera funciona ✅
  - [ ] GPS funciona ✅
  - [ ] Ocorrências salvam ✅
  - [ ] Polígonos desenham ✅
  - [ ] NDVI funciona ✅
  - [ ] Relatórios exportam ✅
  - [ ] Check-in funciona ✅
  - [ ] FAB funciona ✅

- [ ] **iOS - Simulador** (3h)
  ```bash
  npx cap sync ios
  npx cap open ios
  ```
  - [ ] Todos os testes acima ✅
  - [ ] Especial atenção à câmera ✅
  - [ ] Especial atenção ao GPS ✅

- [ ] **Teste em Dispositivo Real Android** (1h)
  - [ ] Conectar via USB
  - [ ] Habilitar Developer Mode
  - [ ] Rodar via Android Studio
  - [ ] Testar todos os fluxos ✅

- [ ] **Teste em Dispositivo Real iOS** (1h)
  - [ ] Cadastrar device no Apple Developer
  - [ ] Rodar via Xcode
  - [ ] Testar todos os fluxos ✅

---

### ✅ DIA 9: Testes de Stress (8h)

- [ ] **Performance** (3h)
  - [ ] Lighthouse mobile score > 80 ✅
  - [ ] FPS > 55 ao mover mapa ✅
  - [ ] Tempo de carregamento < 3s ✅
  - [ ] Memory leaks: nenhum detectado ✅

- [ ] **Offline Completo** (2h)
  - [ ] Modo avião → App funciona ✅
  - [ ] Criar 10 ocorrências offline ✅
  - [ ] Desenhar 5 polígonos offline ✅
  - [ ] Voltar online → Tudo sincroniza ✅

- [ ] **Bateria** (2h)
  - [ ] Usar app por 1 hora
  - [ ] Consumo de bateria < 10% ✅
  - [ ] App não aquece device ✅

- [ ] **Dados** (1h)
  - [ ] Usar app por 1 hora
  - [ ] Consumo de dados < 10MB ✅
  - [ ] Cache funciona bem ✅

---

### ✅ DIA 10: Build de Produção (8h)

- [ ] **Configurações Finais Android** (2h)
  - [ ] Atualizar `android/app/build.gradle`
  - [ ] Versão: 1.0.0 (versionCode: 1)
  - [ ] minSdkVersion: 22 (Android 5.1+)
  - [ ] targetSdkVersion: 34 (Android 14)
  - [ ] Configurar ProGuard (obfuscação)
  - [ ] Assinar APK com release key

- [ ] **Build Android** (1h)
  ```bash
  cd android
  ./gradlew assembleRelease
  ```
  - [ ] Gerar APK assinado
  - [ ] Testar APK em dispositivo
  - [ ] Verificar tamanho < 50MB ✅

- [ ] **Configurações Finais iOS** (2h)
  - [ ] Atualizar `ios/App/App.xcodeproj`
  - [ ] Versão: 1.0.0 (Build: 1)
  - [ ] Deployment Target: 13.0+
  - [ ] Configurar App Icon
  - [ ] Configurar Launch Screen
  - [ ] Ativar BitCode

- [ ] **Build iOS** (1h)
  - [ ] Archive via Xcode
  - [ ] Validate via App Store Connect
  - [ ] Testar IPA via TestFlight

- [ ] **Documentação** (2h)
  - [ ] Criar `/GUIA_BUILD_MOBILE.md`
  - [ ] Screenshots para lojas
  - [ ] Descrição do app
  - [ ] Changelog da versão 1.0

---

## 🎯 VALIDAÇÃO FINAL

Antes de publicar, confirmar:

### Funcionalidades Core
- [ ] Login/Cadastro/Logout ✅
- [ ] Modo Demo ✅
- [ ] Dashboard com mapa ✅
- [ ] Desenho de polígonos ✅
- [ ] Ocorrências com foto e GPS ✅
- [ ] NDVI básico ✅
- [ ] Check-in/Check-out ✅
- [ ] Relatórios exportáveis ✅
- [ ] Temas (claro/escuro) ✅

### Offline
- [ ] Mapas funcionam offline ✅
- [ ] Dados persistem ao fechar app ✅
- [ ] Sincronização automática ✅
- [ ] Indicador de status offline ✅

### Performance
- [ ] Lighthouse Score > 80 ✅
- [ ] Sem crashes em 1h de uso ✅
- [ ] Bateria < 10%/hora ✅
- [ ] Dados < 10MB/hora ✅

### Segurança
- [ ] Tokens não em localStorage ✅
- [ ] HTTPS em todas APIs ✅
- [ ] Sem console.log em produção ✅
- [ ] Dados sensíveis criptografados ✅

### Compatibilidade
- [ ] Android 5.1+ ✅
- [ ] iOS 13+ ✅
- [ ] Tablets suportados ✅
- [ ] Landscape/Portrait ✅

---

## 📊 PROGRESSO GERAL

```
[████████░░░░░░░░░░░░] 40% - DIA 1-3 Completo
[░░░░░░░░░░░░░░░░░░░░]  0% - DIA 4-7 Pendente
[░░░░░░░░░░░░░░░░░░░░]  0% - DIA 8-10 Pendente
```

**Próximo Passo:** Começar DIA 1 - Setup + Storage

---

## 🆘 EM CASO DE PROBLEMAS

### Build falha
1. Limpar cache: `npx cap sync`
2. Rebuild: `npm run build`
3. Verificar logs em `android/` ou `ios/`

### App crasha
1. Ver logs: `npx cap run android/ios`
2. Verificar permissões no manifest
3. Verificar compatibilidade de plugins

### Features quebram
1. Testar no navegador primeiro
2. Verificar se plugin está instalado
3. Verificar imports corretos

### Dúvidas técnicas
- Consultar `/AUDITORIA_CAPACITOR.md`
- Consultar `/GUIA_MAPAS_OFFLINE.md`
- Docs Capacitor: https://capacitorjs.com

---

**Última atualização:** 19/10/2025  
**Status:** 🟡 Pronto para iniciar implementação
