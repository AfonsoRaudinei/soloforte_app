# 📱 INSTALAÇÃO CAPACITOR - SOLOFORTE

**Guia completo de instalação e configuração do Capacitor**

---

## 🚀 INSTALAÇÃO DOS PLUGINS

### 1. Instalar Dependências

```bash
# Core Capacitor (se ainda não instalado)
npm install @capacitor/core @capacitor/cli

# Storage (Preferences)
npm install @capacitor/preferences

# Camera
npm install @capacitor/camera

# Geolocation (para GPS em fotos)
npm install @capacitor/geolocation

# Filesystem (para salvar fotos)
npm install @capacitor/filesystem

# Opcional: Haptics (vibração)
npm install @capacitor/haptics

# Opcional: Status Bar (personalizar)
npm install @capacitor/status-bar

# Opcional: Splash Screen
npm install @capacitor/splash-screen
```

### 2. Inicializar Capacitor (se ainda não foi feito)

```bash
# Inicializar
npx cap init

# Quando perguntado:
# App name: SoloForte
# App ID: com.soloforte.app (ou seu ID)
# Web directory: dist (ou build)
```

### 3. Adicionar Plataformas

```bash
# iOS
npx cap add ios

# Android
npx cap add android

# Sync
npx cap sync
```

---

## 🍎 CONFIGURAÇÃO iOS

### 1. Info.plist

Abrir `ios/App/App/Info.plist` e adicionar:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Existing keys... -->
    
    <!-- ✅ CAMERA -->
    <key>NSCameraUsageDescription</key>
    <string>SoloForte precisa da câmera para capturar fotos de ocorrências no campo</string>
    
    <!-- ✅ PHOTO LIBRARY (Read) -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>SoloForte precisa acessar a galeria para você escolher fotos</string>
    
    <!-- ✅ PHOTO LIBRARY (Write) -->
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>SoloForte precisa salvar fotos na galeria</string>
    
    <!-- ✅ LOCATION (When in Use) -->
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>SoloForte precisa da localização para adicionar GPS às fotos e marcar ocorrências no mapa</string>
    
    <!-- ✅ LOCATION (Always) - Opcional -->
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>SoloForte precisa da localização em background para rastreamento de visitas</string>
    
    <!-- ✅ LOCATION (Always) - Opcional -->
    <key>NSLocationAlwaysUsageDescription</key>
    <string>SoloForte precisa da localização em background para rastreamento de visitas</string>
</dict>
</plist>
```

### 2. Podfile (opcional - para otimizar)

Abrir `ios/App/Podfile`:

```ruby
platform :ios, '13.0'
use_frameworks!

target 'App' do
  capacitor_pods
  # Add your Pods here
  
  # Otimizações
  pod 'SDWebImage', '~> 5.0'  # Cache de imagens
end

# Post install hook
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
    end
  end
end
```

### 3. Build iOS

```bash
# Sync
npx cap sync ios

# Abrir Xcode
npx cap open ios

# No Xcode:
# 1. Selecionar seu time de desenvolvimento
# 2. Selecionar dispositivo ou simulador
# 3. Clicar em "Run" (▶️)
```

---

## 🤖 CONFIGURAÇÃO ANDROID

### 1. AndroidManifest.xml

Abrir `android/app/src/main/AndroidManifest.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.soloforte.app">

    <!-- ✅ PERMISSIONS -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- ✅ CAMERA -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
    
    <!-- ✅ STORAGE -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" 
        android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    
    <!-- ✅ LOCATION -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <!-- ✅ VIBRATION (opcional) -->
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>

        <!-- ✅ FILE PROVIDER (para Camera) -->
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>

    </application>

</manifest>
```

### 2. file_paths.xml

Criar `android/app/src/main/res/xml/file_paths.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <external-files-path name="my_images" path="Pictures" />
    <external-files-path name="my_files" path="." />
    <cache-path name="my_cache" path="." />
</paths>
```

### 3. build.gradle (app level)

Abrir `android/app/build.gradle`:

```gradle
android {
    compileSdkVersion 33
    
    defaultConfig {
        applicationId "com.soloforte.app"
        minSdkVersion 22
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
        
        // ✅ Multidex (se app grande)
        multiDexEnabled true
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.coordinatorlayout:coordinatorlayout:1.2.0'
    implementation 'androidx.webkit:webkit:1.6.1'
    
    // ✅ Capacitor
    implementation project(':capacitor-android')
    
    // ✅ Multidex
    implementation 'androidx.multidex:multidex:2.0.1'
}
```

### 4. Build Android

```bash
# Sync
npx cap sync android

# Abrir Android Studio
npx cap open android

# No Android Studio:
# 1. Aguardar Gradle sync
# 2. Conectar dispositivo ou criar emulador
# 3. Clicar em "Run" (▶️)
```

---

## 🔧 CONFIGURAÇÃO CAPACITOR.CONFIG.TS

Criar/editar `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.soloforte.app',
  appName: 'SoloForte',
  webDir: 'dist', // ou 'build'
  
  server: {
    // Para desenvolvimento (opcional)
    // url: 'http://192.168.1.100:5173',
    // cleartext: true
  },
  
  plugins: {
    // ✅ CAMERA
    Camera: {
      presentationStyle: 'fullscreen',
      saveToGallery: false
    },
    
    // ✅ SPLASH SCREEN
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0057FF',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#FFFFFF',
      splashFullScreen: true,
      splashImmersive: true
    },
    
    // ✅ STATUS BAR
    StatusBar: {
      style: 'light',
      backgroundColor: '#0057FF'
    }
  }
};

export default config;
```

---

## 🧪 TESTE DE INSTALAÇÃO

### Script de Teste

Criar `test-capacitor.ts`:

```typescript
import { Camera } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem } from '@capacitor/filesystem';

async function testCapacitor() {
  console.log('🧪 Testing Capacitor plugins...');
  
  // ✅ Test 1: Preferences
  try {
    await Preferences.set({ key: 'test', value: 'hello' });
    const result = await Preferences.get({ key: 'test' });
    console.log('✅ Preferences working:', result.value);
  } catch (error) {
    console.error('❌ Preferences error:', error);
  }
  
  // ✅ Test 2: Camera permissions
  try {
    const permissions = await Camera.checkPermissions();
    console.log('✅ Camera permissions:', permissions);
  } catch (error) {
    console.error('❌ Camera error:', error);
  }
  
  // ✅ Test 3: Geolocation permissions
  try {
    const permissions = await Geolocation.checkPermissions();
    console.log('✅ Geolocation permissions:', permissions);
  } catch (error) {
    console.error('❌ Geolocation error:', error);
  }
  
  console.log('🎉 Capacitor tests complete!');
}

// Executar ao carregar app
if (typeof window !== 'undefined') {
  testCapacitor();
}
```

---

## 📱 BUILD PARA PRODUÇÃO

### iOS

```bash
# 1. Build web
npm run build

# 2. Sync
npx cap sync ios

# 3. Abrir Xcode
npx cap open ios

# 4. No Xcode:
# - Product > Archive
# - Distribute App
# - App Store Connect / Ad Hoc / Development
```

### Android

```bash
# 1. Build web
npm run build

# 2. Sync
npx cap sync android

# 3. Abrir Android Studio
npx cap open android

# 4. No Android Studio:
# - Build > Generate Signed Bundle / APK
# - Escolher "Android App Bundle"
# - Preencher keystore info
# - Build
```

---

## 🔍 TROUBLESHOOTING

### Erro: "Plugin not implemented"

```bash
# Re-sync
npx cap sync

# Reinstalar plugins
npm install @capacitor/camera @capacitor/preferences
npx cap sync
```

### Erro: "Permissions denied"

- ✅ Verificar Info.plist (iOS)
- ✅ Verificar AndroidManifest.xml (Android)
- ✅ Solicitar permissões em runtime

### Erro: Build failed

```bash
# Limpar cache
npx cap sync

# iOS: Limpar build
cd ios && pod install && cd ..

# Android: Limpar build
cd android && ./gradlew clean && cd ..
```

### Camera não abre

```bash
# Verificar permissões
await Camera.requestPermissions();

# Verificar se está em Capacitor
const isCapacitor = typeof window.Capacitor !== 'undefined';
console.log('Is Capacitor?', isCapacitor);
```

---

## ✅ CHECKLIST DE INSTALAÇÃO

```
[ ] Plugins instalados (npm install)
[ ] Plataformas adicionadas (npx cap add ios/android)
[ ] Info.plist configurado (iOS)
[ ] AndroidManifest.xml configurado (Android)
[ ] file_paths.xml criado (Android)
[ ] capacitor.config.ts configurado
[ ] Build successful (iOS)
[ ] Build successful (Android)
[ ] Permissões funcionando
[ ] Camera funcionando
[ ] Storage funcionando
[ ] Geolocation funcionando
```

---

## 📚 DOCUMENTAÇÃO OFICIAL

- Capacitor: https://capacitorjs.com/docs
- Camera Plugin: https://capacitorjs.com/docs/apis/camera
- Preferences Plugin: https://capacitorjs.com/docs/apis/preferences
- Geolocation Plugin: https://capacitorjs.com/docs/apis/geolocation
- Filesystem Plugin: https://capacitorjs.com/docs/apis/filesystem

---

**Status:** ✅ GUIA COMPLETO  
**Próximo:** Executar instalação e build  

🚀 **BOA SORTE COM O BUILD!**
