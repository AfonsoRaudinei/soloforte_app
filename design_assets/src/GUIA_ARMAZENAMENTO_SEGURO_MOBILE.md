# 🔐 Guia de Armazenamento Seguro Mobile - SoloForte

**Prioridade:** 🟡 **ALTA** (1-2 semanas)  
**Plataformas:** iOS, Android (Capacitor)

---

## 🎯 Objetivo

Migrar armazenamento de tokens e credenciais de `localStorage` (inseguro) para armazenamento nativo seguro usando **Keychain** (iOS) e **Keystore** (Android) via Capacitor Secure Storage.

---

## ⚠️ Problema Atual

### ❌ Armazenamento Inseguro (localStorage)

```typescript
// ❌ INSEGURO - Atualmente no código
localStorage.setItem('supabase.auth.token', accessToken);
localStorage.setItem('user_id', userId);
```

**Riscos:**
- 📱 Acessível via USB debugging (Android)
- 💻 Acessível via backup do iTunes (iOS)
- 🔓 Não criptografado
- 🐛 Vulnerável a XSS attacks
- 🔍 Acessível por outras apps maliciosas (em devices rooteados/jailbroken)

---

## ✅ Solução: Capacitor Secure Storage

### Benefícios
- 🔒 **Criptografia nativa** (AES-256)
- 🍎 **iOS:** usa Keychain (hardware-backed em devices com Secure Enclave)
- 🤖 **Android:** usa Keystore (hardware-backed em devices com TEE)
- 🛡️ **Isolamento por app** (namespace seguro)
- ♿ **API simples** e consistente entre plataformas

---

## 📦 Instalação

### 1. Instalar Plugin

```bash
npm install @capacitor-community/secure-storage
npx cap sync
```

### 2. Configuração iOS (Xcode)

Adicionar permissão no `ios/App/App/Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>SoloForte usa Face ID para proteger seus dados</string>
```

### 3. Configuração Android

Nenhuma configuração adicional necessária (Keystore é automático).

---

## 🔧 Implementação

### 1. Criar Wrapper Seguro

Criar arquivo `utils/storage/secure-storage.ts`:

```typescript
/**
 * 🔐 SECURE STORAGE WRAPPER
 * 
 * Abstração sobre Capacitor SecureStorage para uso consistente
 * no app. Fallback para localStorage em web (dev only).
 */

import { SecureStorage } from '@capacitor-community/secure-storage';
import { Capacitor } from '@capacitor/core';

const STORAGE_PREFIX = 'soloforte_secure_';

export const secureStorage = {
  /**
   * Salvar valor de forma segura
   */
  async set(key: string, value: string): Promise<void> {
    const fullKey = STORAGE_PREFIX + key;
    
    if (Capacitor.isNativePlatform()) {
      // Mobile: usar Keychain/Keystore
      await SecureStorage.set({
        key: fullKey,
        value
      });
    } else {
      // Web (dev only): fallback localStorage com warning
      console.warn('⚠️ Using localStorage (dev only). Use secure storage in production!');
      localStorage.setItem(fullKey, value);
    }
  },

  /**
   * Recuperar valor seguro
   */
  async get(key: string): Promise<string | null> {
    const fullKey = STORAGE_PREFIX + key;
    
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await SecureStorage.get({ key: fullKey });
        return result.value;
      } else {
        return localStorage.getItem(fullKey);
      }
    } catch (error) {
      // Key não existe
      return null;
    }
  },

  /**
   * Remover valor
   */
  async remove(key: string): Promise<void> {
    const fullKey = STORAGE_PREFIX + key;
    
    if (Capacitor.isNativePlatform()) {
      await SecureStorage.remove({ key: fullKey });
    } else {
      localStorage.removeItem(fullKey);
    }
  },

  /**
   * Limpar todo o storage seguro
   */
  async clear(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await SecureStorage.clear();
    } else {
      // Limpar apenas keys do SoloForte
      Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    }
  },

  /**
   * Verificar se key existe
   */
  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  },

  /**
   * Salvar objeto (JSON serialization)
   */
  async setObject<T>(key: string, value: T): Promise<void> {
    await this.set(key, JSON.stringify(value));
  },

  /**
   * Recuperar objeto
   */
  async getObject<T>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    if (!raw) return null;
    
    try {
      return JSON.parse(raw) as T;
    } catch (error) {
      console.error('Error parsing JSON from secure storage:', error);
      return null;
    }
  }
};
```

---

### 2. Atualizar Supabase Client

Modificar `utils/supabase/client.ts` para usar secure storage:

```typescript
import { createClient } from '@supabase/supabase-js';
import { secureStorage } from '../storage/secure-storage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // ✅ Storage seguro personalizado
    storage: {
      async getItem(key: string) {
        return await secureStorage.get(key);
      },
      async setItem(key: string, value: string) {
        await secureStorage.set(key, value);
      },
      async removeItem(key: string) {
        await secureStorage.remove(key);
      }
    },
    
    // Configurações de token
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Mobile não usa URL para session
    
    // Tokens de curta duração (1 hora)
    storageKey: 'auth_token', // Será prefixado automaticamente
  }
});
```

---

### 3. Migrar Dados Existentes

Criar script de migração `utils/storage/migrate-to-secure.ts`:

```typescript
/**
 * 🔄 MIGRATION SCRIPT
 * 
 * Migra dados de localStorage para SecureStorage
 * Executar UMA VEZ na primeira abertura do app atualizado
 */

import { secureStorage } from './secure-storage';
import { Capacitor } from '@capacitor/core';

export async function migrateToSecureStorage(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    console.log('⏭️ Skipping migration (not native platform)');
    return;
  }

  const MIGRATION_KEY = 'migration_v1_completed';
  
  // Verificar se já migrou
  const migrated = await secureStorage.get(MIGRATION_KEY);
  if (migrated === 'true') {
    console.log('✅ Migration already completed');
    return;
  }

  console.log('🔄 Starting migration to secure storage...');

  try {
    // Lista de keys para migrar
    const keysToMigrate = [
      'supabase.auth.token',
      'sb-auth-token',
      'user_id',
      'user_session',
      'refresh_token'
    ];

    let migratedCount = 0;

    for (const key of keysToMigrate) {
      const oldValue = localStorage.getItem(key);
      
      if (oldValue) {
        // Migrar para storage seguro
        await secureStorage.set(key, oldValue);
        
        // Remover do localStorage
        localStorage.removeItem(key);
        
        migratedCount++;
        console.log(`✓ Migrated: ${key}`);
      }
    }

    // Marcar migração como completa
    await secureStorage.set(MIGRATION_KEY, 'true');
    
    console.log(`✅ Migration completed! Migrated ${migratedCount} items`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}
```

---

### 4. Executar Migração no App.tsx

```typescript
import { useEffect } from 'react';
import { migrateToSecureStorage } from './utils/storage/migrate-to-secure';

function App() {
  useEffect(() => {
    // Executar migração na primeira carga
    migrateToSecureStorage().catch(error => {
      console.error('Migration error:', error);
    });
  }, []);

  return (
    // ... resto do app
  );
}
```

---

## 🧪 Testes

### Teste 1: Verificar Armazenamento Seguro

```typescript
// Test no device real (não funciona em browser)
import { secureStorage } from './utils/storage/secure-storage';

async function testSecureStorage() {
  // 1. Salvar
  await secureStorage.set('test_token', 'abc123xyz');
  
  // 2. Recuperar
  const token = await secureStorage.get('test_token');
  console.assert(token === 'abc123xyz', 'Token retrieved correctly');
  
  // 3. Remover
  await secureStorage.remove('test_token');
  const removed = await secureStorage.get('test_token');
  console.assert(removed === null, 'Token removed correctly');
  
  console.log('✅ All tests passed!');
}
```

### Teste 2: Verificar Isolamento iOS/Android

**iOS (Xcode):**
1. Rodar app
2. Salvar token
3. Abrir `Keychain Access` (macOS Simulator)
4. Procurar por `soloforte_secure_*`
5. Verificar que está criptografado

**Android (Android Studio):**
1. Rodar app
2. Salvar token
3. `adb shell run-as com.soloforte.app`
4. Verificar que não há arquivos de texto plano
5. Keystore é acessível apenas pelo app

---

## 🔒 Boas Práticas de Segurança

### 1. ✅ O Que Armazenar Seguramente

```typescript
// Tokens e credenciais
await secureStorage.set('access_token', accessToken);
await secureStorage.set('refresh_token', refreshToken);
await secureStorage.set('user_id', userId);

// Preferências sensíveis
await secureStorage.set('biometric_enabled', 'true');
await secureStorage.set('pin_hash', hashedPin);
```

### 2. ❌ O Que NÃO Armazenar Seguramente

```typescript
// ❌ Dados não-sensíveis (usar localStorage)
localStorage.setItem('theme', 'dark'); // OK
localStorage.setItem('language', 'pt-BR'); // OK
localStorage.setItem('onboarding_completed', 'true'); // OK

// ❌ Dados que exigem queries (usar SQLite/Supabase)
// Não use secure storage como banco de dados!
```

### 3. ⏱️ Refresh Token Rotation

```typescript
import { supabase } from './utils/supabase/client';
import { secureStorage } from './utils/storage/secure-storage';

// Supabase já gerencia automaticamente com o custom storage
// Mas você pode implementar lógica adicional:

supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'TOKEN_REFRESHED' && session) {
    console.log('🔄 Token refreshed automatically');
    
    // Tokens são salvos automaticamente no secure storage
    // via custom storage adapter configurado
  }
  
  if (event === 'SIGNED_OUT') {
    // Limpar storage seguro
    await secureStorage.clear();
    console.log('🗑️ Secure storage cleared on logout');
  }
});
```

---

## 📊 Checklist de Implementação

### Fase 1: Setup (1-2 horas)
- [ ] Instalar `@capacitor-community/secure-storage`
- [ ] Criar `utils/storage/secure-storage.ts`
- [ ] Configurar permissões iOS (Face ID)
- [ ] Sync Capacitor (`npx cap sync`)

### Fase 2: Integração (2-4 horas)
- [ ] Atualizar `supabase/client.ts` com custom storage
- [ ] Criar script de migração
- [ ] Executar migração no `App.tsx`
- [ ] Testar em iOS Simulator
- [ ] Testar em Android Emulator

### Fase 3: Testes (2-4 horas)
- [ ] Teste de salvamento/recuperação
- [ ] Teste de logout (limpar storage)
- [ ] Teste de refresh token
- [ ] Teste em device real iOS
- [ ] Teste em device real Android

### Fase 4: Validação (1-2 horas)
- [ ] Verificar que localStorage não contém tokens
- [ ] Verificar Keychain no iOS (Xcode)
- [ ] Verificar Keystore no Android (adb)
- [ ] Code review de segurança
- [ ] Documentação atualizada

---

## 🚨 Troubleshooting

### Problema: "Plugin not implemented" no Web

**Solução:** Secure Storage só funciona em plataformas nativas. O wrapper usa localStorage como fallback para dev.

```typescript
// Adicionar guard no código
if (!Capacitor.isNativePlatform()) {
  console.warn('Secure storage not available on web');
  // Fallback ou bloqueio
}
```

---

### Problema: Dados perdidos após reinstalar app

**Comportamento esperado:** Secure storage é limpo ao desinstalar o app (iOS/Android).

**Solução:** Implementar backup na nuvem (Supabase) para dados críticos.

---

### Problema: Performance lenta

**Causa:** Secure storage usa criptografia nativa (mais lento que localStorage).

**Solução:** 
- Cache dados em memória (React state)
- Evitar reads/writes excessivos
- Usar batch operations quando possível

---

## 📈 Métricas de Sucesso

Após implementação:
- ✅ **0 tokens em localStorage** (verificar com DevTools)
- ✅ **100% tokens em Keychain/Keystore** (verificar com adb/Xcode)
- ✅ **Logout limpa secure storage**
- ✅ **Refresh token rotation funciona**
- ✅ **Performance < 50ms** para get/set

---

## 📚 Referências

- [Capacitor Secure Storage Docs](https://github.com/capacitor-community/secure-storage)
- [iOS Keychain Services](https://developer.apple.com/documentation/security/keychain_services)
- [Android Keystore System](https://developer.android.com/training/articles/keystore)
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-top-10/)

---

## ✅ Conclusão

Armazenamento seguro é **CRÍTICO** para apps mobile que lidam com autenticação e dados sensíveis. 

**Próximos passos:**
1. ✅ Implementar secure storage (esta issue)
2. ✅ Adicionar biometria (Face ID/Touch ID) - próxima issue
3. ✅ Implementar pin/password como fallback
4. ✅ Audit de segurança completo

**Tempo total estimado:** 8-12 horas
