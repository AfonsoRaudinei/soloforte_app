# ⚡ QUICK START - CAPACITOR

**Comandos rápidos para começar a usar Capacitor no SoloForte**

---

## 🚀 INSTALAÇÃO RÁPIDA (5 minutos)

```bash
# 1. Instalar plugins
npm install @capacitor/preferences @capacitor/camera @capacitor/geolocation @capacitor/filesystem

# 2. Adicionar plataformas
npx cap add ios
npx cap add android

# 3. Sync
npx cap sync

# ✅ Pronto!
```

---

## 💾 USO: STORAGE

### Opção 1: React Hook (Recomendado)

```typescript
import { useStorage } from './utils/hooks/useStorage';

function MyComponent() {
  const [user, setUser] = useStorage('user', null);
  
  // Usar como useState normal
  setUser({ name: 'João', email: 'joao@email.com' });
  
  return <div>{user?.name}</div>;
}
```

### Opção 2: API Direta

```typescript
import { storage } from './utils/storage/capacitor-storage';

// Set
await storage.set('key', 'value');

// Get
const value = await storage.get('key');

// Remove
await storage.remove('key');
```

### Opção 3: Type-Safe Helpers

```typescript
import { sessionStorage, settingsStorage } from './utils/storage/capacitor-storage';

// Session
await sessionStorage.save({ 
  userId: '123', 
  token: 'abc', 
  expiresAt: Date.now() + 86400000 
});

const session = await sessionStorage.get();
const isValid = await sessionStorage.isValid();

// Settings
await settingsStorage.save({ theme: 'dark' });
const settings = await settingsStorage.get();
```

---

## 📸 USO: CAMERA

### Tirar Foto

```typescript
import { camera } from './utils/camera/capacitor-camera';

const photo = await camera.takePhoto({
  quality: 90,
  withGeolocation: true
});

if (photo) {
  console.log(photo.imageUrl);  // Data URL
  console.log(photo.latitude);  // GPS
  console.log(photo.longitude); // GPS
}
```

### Escolher da Galeria

```typescript
const photo = await camera.pickFromGallery({
  quality: 90
});
```

### Usar no Componente

```typescript
import { CameraCapture } from './components/CameraCapture';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Camera
      </button>
      
      <CameraCapture
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCapture={(imageUrl) => {
          console.log('Foto capturada!', imageUrl);
          setIsOpen(false);
        }}
      />
    </>
  );
}
```

---

## 🖼️ USO: LAZY IMAGE

```typescript
import { LazyImage } from './components/LazyImage';

<LazyImage 
  src="/path/to/large-image.png"
  alt="Descrição"
  className="w-full h-auto"
/>

// Carrega apenas quando visível!
```

---

## ⏱️ USO: DEBOUNCE

```typescript
import { useDebounce } from './utils/hooks/useDebounce';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  
  useEffect(() => {
    // Só executa após 300ms sem digitar
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

---

## 🏗️ BUILD

### Web (Desenvolvimento)

```bash
npm run dev
```

### Web (Produção)

```bash
npm run build
npm run preview
```

### iOS

```bash
# Build web
npm run build

# Sync
npx cap sync ios

# Abrir Xcode
npx cap open ios

# No Xcode: Run (⌘R)
```

### Android

```bash
# Build web
npm run build

# Sync
npx cap sync android

# Abrir Android Studio
npx cap open android

# No Android Studio: Run (Shift+F10)
```

---

## 🧪 TESTE RÁPIDO

### Testar Storage

```typescript
// No console do navegador ou app:
import { storage } from './utils/storage/capacitor-storage';

await storage.set('test', { hello: 'world' });
await storage.get('test'); // { hello: 'world' }
```

### Testar Camera

```typescript
import { camera } from './utils/camera/capacitor-camera';

const photo = await camera.takePhoto({ quality: 90 });
console.log(photo);
```

---

## 🔧 TROUBLESHOOTING

### Plugin não funciona

```bash
npx cap sync
```

### Build falha

```bash
# iOS
cd ios && pod install && cd ..
npx cap sync ios

# Android
cd android && ./gradlew clean && cd ..
npx cap sync android
```

### Permissões negadas

Verificar:
- iOS: `ios/App/App/Info.plist`
- Android: `android/app/src/main/AndroidManifest.xml`

---

## 📚 DOCUMENTAÇÃO COMPLETA

| Guia | Descrição |
|------|-----------|
| **GUIA_MIGRACAO_CAPACITOR.md** | API completa + exemplos |
| **INSTALL_CAPACITOR.md** | Instalação detalhada |
| **FASES_2_3_COMPLETAS.md** | Resumo implementação |
| **RESUMO_FINAL_CAPACITOR.md** | Overview executivo |

---

## 🎯 CHEAT SHEET

### Imports Principais

```typescript
// Storage
import { storage, sessionStorage, settingsStorage } from './utils/storage/capacitor-storage';
import { useStorage, useStorageObject, useStorageArray } from './utils/hooks/useStorage';

// Camera
import { camera, gallery } from './utils/camera/capacitor-camera';

// Utilities
import { useDebounce } from './utils/hooks/useDebounce';
import { LazyImage } from './components/LazyImage';
import { prefetchByRoute } from './utils/prefetch';
```

### Comandos Principais

```bash
# Instalar
npm install @capacitor/[plugin-name]

# Sync
npx cap sync

# Build
npm run build

# iOS
npx cap open ios

# Android
npx cap open android

# Logs
npx cap run ios --livereload
npx cap run android --livereload
```

---

**⚡ PRONTO PARA USAR!**

Veja os guias completos para mais detalhes.
