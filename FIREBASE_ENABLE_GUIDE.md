# 🔥 Guia Passo a Passo: Habilitar Firebase

## 📋 Passo 1: Acessar Firebase Console

1. Abra seu navegador
2. Acesse: **https://console.firebase.google.com/project/flowagro-8c3bc**
3. Faça login com sua conta Google (se necessário)

---

## 🔐 Passo 2: Habilitar Authentication

### 2.1 Acessar Authentication
1. No menu lateral esquerdo, clique em **"Authentication"**
2. Você verá uma tela de boas-vindas

### 2.2 Iniciar Authentication
1. Clique no botão azul **"Get Started"**
2. Aguarde carregar (~5 segundos)

### 2.3 Habilitar Email/Password
1. Você verá a aba **"Sign-in method"** (já selecionada)
2. Na lista de provedores, procure **"Email/Password"**
3. Clique em **"Email/Password"**
4. Um modal vai abrir

### 2.4 Ativar
1. No modal, você verá dois toggles:
   - **Email/Password** ← Habilite este
   - Email link (passwordless sign-in) ← Deixe desabilitado
2. Clique no toggle **"Email/Password"** para ativar (fica azul)
3. Clique no botão **"Save"** no canto inferior direito

✅ **Pronto!** Authentication está habilitado!

---

## 📊 Passo 3: Criar Firestore Database

### 3.1 Acessar Firestore
1. No menu lateral esquerdo, clique em **"Firestore Database"**
2. Você verá uma tela de boas-vindas

### 3.2 Criar Database
1. Clique no botão **"Create database"**
2. Um modal vai abrir com opções de segurança

### 3.3 Escolher Modo
Você verá duas opções:
- **Production mode** (requer regras de segurança)
- **Test mode** (permite leitura/escrita sem auth)

**Escolha**: **"Start in test mode"**
- ⚠️ Isso é apenas para desenvolvimento!
- Você pode mudar depois

Clique em **"Next"**

### 3.4 Escolher Location
1. Você verá uma lista de regiões
2. Procure e selecione: **"southamerica-east1 (São Paulo)"**
   - Isso dá melhor performance no Brasil
3. Clique em **"Enable"**

### 3.5 Aguardar Criação
- Aguarde ~30-60 segundos
- Você verá uma barra de progresso
- Quando terminar, verá a tela do Firestore vazia

✅ **Pronto!** Firestore está criado!

---

## 🧪 Passo 4: Testar no App

### 4.1 Rodar o App
No terminal, execute:
```bash
cd /Users/raudineisilvapereira/Documents/SoloForte/soloforte_app
flutter run -d chrome
```

### 4.2 Criar Usuário de Teste
1. No app, vá para a tela de **Registro**
2. Preencha:
   - **Nome**: Teste SoloForte
   - **Email**: teste@soloforte.com
   - **Senha**: senha123456
3. Clique em **"Registrar"**

### 4.3 Verificar no Console

#### Authentication
1. Firebase Console > Authentication > Users
2. Você deve ver: **teste@soloforte.com**
3. Com data de criação

#### Firestore
1. Firebase Console > Firestore Database
2. Você deve ver uma collection **"users"**
3. Clique para expandir
4. Deve ter um documento com:
   - name: "Teste SoloForte"
   - email: "teste@soloforte.com"
   - role: "user"
   - createdAt: timestamp

✅ **Funcionou!** Backend real está ativo!

---

## 📊 Resumo Visual

```
Firebase Console
├── Authentication ✅
│   └── Email/Password habilitado
│
└── Firestore Database ✅
    ├── Location: São Paulo
    ├── Mode: Test
    └── Collections:
        └── users/
            └── {userId}
                ├── name
                ├── email
                ├── role
                └── createdAt
```

---

## ⚠️ Avisos Importantes

### Test Mode
- **Firestore em Test Mode** permite leitura/escrita SEM autenticação
- Isso é **apenas para desenvolvimento**
- **ANTES de produção**, você DEVE mudar para regras de segurança

### Mudar para Production Mode
Quando estiver pronto para produção:

1. Firestore > Rules
2. Substitua por:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    match /areas/{areaId} {
      allow read, write: if request.auth != null;
    }
    
    match /visits/{visitId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🎯 Checklist Final

- [ ] Firebase Console acessado
- [ ] Authentication habilitado
- [ ] Firestore criado
- [ ] App rodando
- [ ] Usuário criado
- [ ] Dados no Firestore
- [ ] Tudo funcionando!

---

## 💡 Dicas

### Se der erro no app:
```bash
# Limpar e rebuild
flutter clean
flutter pub get
flutter run -d chrome
```

### Ver logs do Firebase:
```dart
// No código, adicione:
print('Firebase initialized: ${Firebase.apps.length}');
```

### Verificar conexão:
1. Firebase Console > Firestore
2. Aba "Usage"
3. Deve mostrar atividade

---

**Tempo Total**: ~10 minutos  
**Dificuldade**: Fácil  
**Resultado**: Backend real funcionando! 🎉
