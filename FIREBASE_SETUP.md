# 🔥 Firebase Integration - Guia Completo

## ✅ O Que Foi Implementado

**Dependencies**:
- `firebase_core` - Firebase SDK
- `firebase_auth` - Authentication
- `cloud_firestore` - Database NoSQL

**Services**:
- `FirebaseAuthService` - Auth com Firebase
- Firestore integration ready

---

## 🚀 Configuração Inicial

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Adicionar projeto"
3. Nome: `SoloForte`
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Adicionar Apps

#### Android
1. No Firebase Console, clique no ícone Android
2. **Package name**: `com.example.soloforte_app`
3. Download `google-services.json`
4. Coloque em: `android/app/google-services.json`

#### iOS
1. No Firebase Console, clique no ícone iOS
2. **Bundle ID**: `com.example.soloforteApp`
3. Download `GoogleService-Info.plist`
4. Coloque em: `ios/Runner/GoogleService-Info.plist`

### 3. Configurar Android

**Arquivo**: `android/build.gradle`
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

**Arquivo**: `android/app/build.gradle`
```gradle
apply plugin: 'com.google.gms.google-services'
```

### 4. Configurar iOS

**Arquivo**: `ios/Runner/Info.plist`
```xml
<!-- Já configurado automaticamente pelo FlutterFire CLI -->
```

---

## 🔐 Habilitar Authentication

1. Firebase Console > Authentication
2. Clique em "Get Started"
3. Sign-in method > Email/Password
4. Habilite "Email/Password"
5. Salvar

---

## 📊 Configurar Firestore

1. Firebase Console > Firestore Database
2. Clique em "Create database"
3. Escolha "Start in test mode" (por enquanto)
4. Selecione location: `southamerica-east1` (São Paulo)
5. Criar

### Security Rules (Produção)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Areas collection
    match /areas/{areaId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Visits collection
    match /visits/{visitId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 💻 Código de Inicialização

**Arquivo**: `lib/main.dart`
```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // Initialize Sentry
  await SentryFlutter.init(...);
}
```

---

## 🔧 Gerar firebase_options.dart

```bash
# Instalar FlutterFire CLI
dart pub global activate flutterfire_cli

# Configurar Firebase
flutterfire configure
```

Isso vai:
1. Detectar seus apps Android/iOS
2. Gerar `lib/firebase_options.dart`
3. Configurar automaticamente

---

## 📝 Estrutura Firestore

### Collections

#### users
```json
{
  "userId": {
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "user",
    "createdAt": "2024-12-08T00:00:00Z"
  }
}
```

#### areas
```json
{
  "areaId": {
    "nome": "Fazenda São João",
    "hectares": 150.5,
    "culture": "Soja",
    "coordinates": [
      {"lat": -23.5505, "lng": -46.6333}
    ],
    "userId": "userId",
    "createdAt": "2024-12-08T00:00:00Z"
  }
}
```

#### visits
```json
{
  "visitId": {
    "areaId": "areaId",
    "userId": "userId",
    "checkInTime": "2024-12-08T10:00:00Z",
    "checkOutTime": "2024-12-08T12:00:00Z",
    "notes": "Tudo ok",
    "photos": ["url1", "url2"]
  }
}
```

---

## 🧪 Testar

### Criar Usuário de Teste
```dart
// No app
await firebaseAuth.register(
  'Teste',
  'teste@soloforte.com',
  'senha123',
);
```

### Verificar no Console
1. Firebase Console > Authentication
2. Deve aparecer o usuário
3. Firebase Console > Firestore
4. Deve aparecer em `users/`

---

## 💰 Limites Gratuitos

| Serviço | Limite Grátis |
|---------|---------------|
| **Authentication** | 10k usuários ativos/mês |
| **Firestore Reads** | 50k/dia |
| **Firestore Writes** | 20k/dia |
| **Storage** | 1 GB |
| **Bandwidth** | 10 GB/mês |

**Suficiente para**: 1000+ usuários ativos

---

## 📈 Quando Pagar?

### Spark Plan (Grátis)
- Até 10k usuários
- Ideal para MVP

### Blaze Plan (Pay-as-you-go)
- $0.06 por 100k reads
- $0.18 por 100k writes
- Só paga o que usar

**Estimativa**: ~$20-50/mês para 5k usuários ativos

---

## 🔒 Segurança

### Boas Práticas
✅ Habilitar App Check (anti-abuse)  
✅ Configurar Security Rules  
✅ Usar índices compostos  
✅ Limitar tamanho de documentos  
✅ Monitorar uso no Console  

### App Check (Recomendado)
```bash
flutter pub add firebase_app_check
```

---

## 📝 Próximos Passos

1. **Configurar Firebase** (15 min)
   - Criar projeto
   - Adicionar apps
   - Habilitar Auth e Firestore

2. **Gerar firebase_options.dart** (5 min)
   ```bash
   flutterfire configure
   ```

3. **Atualizar main.dart** (2 min)
   - Adicionar Firebase.initializeApp()

4. **Testar** (5 min)
   - Criar usuário
   - Fazer login
   - Verificar no Console

5. **Migrar Repositories** (próxima etapa)
   - AreasRepository → Firestore
   - VisitsRepository → Firestore

---

**Tempo Total**: ~30 minutos  
**Custo**: Grátis (até 10k users)  
**Dificuldade**: Fácil  

**Vamos começar?** 🚀
