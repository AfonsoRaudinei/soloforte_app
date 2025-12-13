# ⚡ Quick Commands - Capacitor

Comandos essenciais para trabalhar com Capacitor no SoloForte.

---

## 🚀 SETUP INICIAL

```bash
# 1. Instalar Capacitor Core
npm install @capacitor/core @capacitor/cli

# 2. Inicializar projeto Capacitor
npx cap init SoloForte com.soloforte.app

# 3. Adicionar plataformas
npx cap add android
npx cap add ios

# 4. Instalar plugins essenciais
npm install @capacitor/preferences @capacitor/camera @capacitor/geolocation @capacitor/network @capacitor/share @capacitor/filesystem @capacitor/device

# 5. Sincronizar
npx cap sync
```

---

## 📱 DESENVOLVIMENTO

### Build e Sync

```bash
# Build do projeto React
npm run build

# Sincronizar com plataformas nativas
npx cap sync

# Sync específico
npx cap sync android
npx cap sync ios

# Copiar web assets sem rebuild nativo
npx cap copy
```

### Abrir IDEs Nativas

```bash
# Android Studio
npx cap open android

# Xcode
npx cap open ios
```

### Rodar em Dispositivo

```bash
# Android (via ADB)
npx cap run android

# iOS (via Xcode)
npx cap run ios

# Com live reload
npx cap run android --livereload
npx cap run ios --livereload
```

---

## 🔧 PLUGINS

### Instalar Plugin

```bash
# Exemplo: Camera
npm install @capacitor/camera
npx cap sync
```

### Listar Plugins Instalados

```bash
npx cap ls
```

### Atualizar Plugins

```bash
npm update @capacitor/core @capacitor/cli
npx cap sync
```

---

## 🐛 DEBUG

### Logs Android

```bash
# Via ADB (dispositivo conectado)
adb logcat

# Filtrar por app
adb logcat | grep "SoloForte"

# Limpar logs
adb logcat -c

# Ver crashes
adb logcat *:E
```

### Logs iOS

```bash
# Via console do macOS
# Devices → Seu iPhone → Console

# Ou via Xcode
# Window → Devices and Simulators → Open Console
```

### DevTools no Dispositivo

```bash
# Android - Chrome DevTools
# 1. Conectar device via USB
# 2. Abrir chrome://inspect no Chrome desktop
# 3. Inspecionar WebView

# iOS - Safari DevTools
# 1. Conectar device via USB
# 2. Habilitar Web Inspector no iPhone (Settings → Safari → Advanced)
# 3. Safari → Develop → [Seu iPhone] → [SoloForte]
```

---

## 🧹 LIMPEZA

### Limpar Cache

```bash
# Limpar build web
rm -rf dist

# Limpar node_modules
rm -rf node_modules
npm install

# Limpar Android
cd android
./gradlew clean
cd ..

# Limpar iOS
cd ios/App
xcodebuild clean
cd ../..
```

### Reset Completo

```bash
# ⚠️ CUIDADO: Apaga tudo
rm -rf node_modules
rm -rf android
rm -rf ios
rm -rf dist

npm install
npx cap add android
npx cap add ios
npm run build
npx cap sync
```

---

## 📦 BUILD PRODUÇÃO

### Android APK

```bash
# 1. Build do web
npm run build

# 2. Sync
npx cap sync android

# 3. Build APK
cd android
./gradlew assembleRelease
cd ..

# APK estará em: android/app/build/outputs/apk/release/app-release.apk
```

### Android AAB (Google Play)

```bash
cd android
./gradlew bundleRelease
cd ..

# AAB estará em: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS IPA

```bash
# 1. Build do web
npm run build

# 2. Sync
npx cap sync ios

# 3. Abrir Xcode
npx cap open ios

# 4. No Xcode:
# - Product → Archive
# - Distribute App → App Store Connect
```

---

## 🔐 ASSINATURA

### Android - Gerar Keystore

```bash
# Gerar keystore
keytool -genkey -v -keystore soloforte-release.keystore -alias soloforte -keyalg RSA -keysize 2048 -validity 10000

# Adicionar ao android/app/build.gradle:
android {
    signingConfigs {
        release {
            storeFile file("../../soloforte-release.keystore")
            storePassword "SUA_SENHA"
            keyAlias "soloforte"
            keyPassword "SUA_SENHA"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### iOS - Certificados

```bash
# Via Xcode:
# 1. Xcode → Preferences → Accounts
# 2. Adicionar Apple ID
# 3. Download Manual Profiles
# 4. Signing & Capabilities → Automatically manage signing
```

---

## 📊 ANÁLISE

### Tamanho do Build

```bash
# Android APK
du -h android/app/build/outputs/apk/release/app-release.apk

# Android AAB
du -h android/app/build/outputs/bundle/release/app-release.aab

# iOS IPA
du -h ios/App/build/SoloForte.ipa
```

### Bundle Analyzer

```bash
# Analisar bundle web
npm run build -- --analyze

# Ver o que está ocupando espaço
npx source-map-explorer dist/**/*.js
```

---

## 🧪 TESTES

### Emuladores

```bash
# Listar emuladores Android
emulator -list-avds

# Iniciar emulador Android
emulator -avd Pixel_5_API_33

# Listar simuladores iOS
xcrun simctl list devices

# Iniciar simulador iOS
xcrun simctl boot "iPhone 14 Pro"
open -a Simulator
```

### Dispositivo Real

```bash
# Android - Verificar conexão
adb devices

# Android - Instalar APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Android - Desinstalar
adb uninstall com.soloforte.app

# iOS - Via Xcode
# Devices & Simulators → Conectar iPhone → Run
```

---

## 🔄 UPDATES

### Atualizar Capacitor

```bash
# Ver versão atual
npx cap --version

# Atualizar para latest
npm install @capacitor/core@latest @capacitor/cli@latest
npm install @capacitor/android@latest @capacitor/ios@latest

# Atualizar todos os plugins
npm update @capacitor/camera @capacitor/geolocation @capacitor/preferences

# Migrar (se mudou major version)
npx cap migrate
```

### Verificar Compatibilidade

```bash
# Ver incompatibilidades
npx cap doctor

# Verificar configuração
npx cap ls
```

---

## 🛠️ TROUBLESHOOTING RÁPIDO

### "Plugin não encontrado"

```bash
npx cap sync
```

### "Build failed"

```bash
# Android
cd android
./gradlew clean
cd ..
npx cap sync android

# iOS
cd ios/App
xcodebuild clean
cd ../..
npx cap sync ios
```

### "White screen" no app

```bash
# Verificar se build existe
ls -la dist/

# Rebuild
npm run build
npx cap copy
```

### "Permission denied"

```bash
# Android - Verificar AndroidManifest.xml
# iOS - Verificar Info.plist
```

### App muito lento

```bash
# Build de produção minificado
npm run build -- --mode production

# Verificar se sourcemaps estão desabilitados
```

---

## 📝 SCRIPTS ÚTEIS

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "cap:sync": "npx cap sync",
    "cap:android": "npm run build && npx cap sync android && npx cap open android",
    "cap:ios": "npm run build && npx cap sync ios && npx cap open ios",
    "cap:run:android": "npm run build && npx cap sync android && npx cap run android",
    "cap:run:ios": "npm run build && npx cap sync ios && npx cap run ios",
    "cap:build:android": "npm run build && npx cap sync android && cd android && ./gradlew assembleRelease",
    "cap:build:ios": "npm run build && npx cap sync ios && npx cap open ios",
    "cap:clean": "rm -rf android ios && npx cap add android && npx cap add ios"
  }
}
```

Usar:

```bash
npm run cap:android     # Build + Abrir Android Studio
npm run cap:ios         # Build + Abrir Xcode
npm run cap:run:android # Build + Rodar em device
```

---

## 🎯 WORKFLOW DIÁRIO RECOMENDADO

### Durante Desenvolvimento

```bash
# Terminal 1 - Dev server
npm run dev

# Terminal 2 - Sync automático ao salvar
npx cap run android --livereload
# ou
npx cap run ios --livereload
```

### Antes de Commitar

```bash
# 1. Build de produção
npm run build

# 2. Testar em ambas plataformas
npx cap run android
npx cap run ios

# 3. Verificar warnings
npx cap doctor

# 4. Commit
git add .
git commit -m "feat: sua feature"
```

### Antes de Release

```bash
# 1. Atualizar versão
npm version patch  # ou minor, ou major

# 2. Build de produção
npm run build

# 3. Sync
npx cap sync

# 4. Build APK/IPA
npm run cap:build:android
npm run cap:build:ios

# 5. Testar builds
# 6. Tag e push
git tag v1.0.0
git push --tags
```

---

## 🔗 LINKS ÚTEIS

- **Docs Capacitor:** https://capacitorjs.com/docs
- **Plugins Oficiais:** https://capacitorjs.com/docs/plugins
- **Community Plugins:** https://github.com/capacitor-community
- **Troubleshooting:** https://capacitorjs.com/docs/troubleshooting
- **Forum:** https://forum.ionicframework.com/c/capacitor/28

---

## 💡 DICAS PRO

### Performance

```bash
# Usar build otimizado
npm run build -- --mode production

# Habilitar minificação
# vite.config.ts
build: {
  minify: 'terser',
  terserOptions: {
    compress: { drop_console: true }
  }
}
```

### Debug Avançado

```bash
# Android - Ver todas as threads
adb shell ps | grep soloforte

# Android - Profile de CPU
adb shell dumpsys cpuinfo | grep soloforte

# Android - Memory usage
adb shell dumpsys meminfo com.soloforte.app
```

### Cache

```bash
# Limpar cache do device (teste offline)
# Android
adb shell pm clear com.soloforte.app

# iOS
# Settings → SoloForte → Clear Data
```

---

**Última atualização:** 19/10/2025  
**Mantenha este arquivo aberto durante desenvolvimento!** 🚀
