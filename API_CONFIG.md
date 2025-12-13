# ⚙️ Configuração da API - Guia Completo

## ✅ Status: COMPLETO

Configuração da API totalmente implementada com environment variables dinâmicas!

---

## 📁 Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `lib/core/config/env_config.dart` | Environment configuration |
| `lib/core/api/api_client.dart` | Atualizado com EnvConfig |
| `lib/main.dart` | Atualizado com EnvConfig |
| `build.sh` | Build script unificado |

---

## 🔧 EnvConfig

### Ambientes Suportados
```dart
// Development
http://localhost:3000

// Staging
https://staging-api.soloforte.com

// Production
https://api.soloforte.com
```

### Uso
```dart
// Get current environment
EnvConfig.environment // 'dev', 'staging', 'prod'

// Get API URL
EnvConfig.apiUrl // Dynamic based on ENV

// Get API Key
EnvConfig.apiKey // Dynamic based on ENV

// Get Sentry DSN
EnvConfig.sentryDsn

// Check environment
EnvConfig.isDebug // true in dev
EnvConfig.isProduction // true in prod
```

---

## 🚀 Como Usar

### Development
```bash
# Run app
flutter run --dart-define=ENV=dev

# Ou use o script
./build.sh dev
```

### Staging
```bash
# Build APK
flutter build apk \
  --dart-define=ENV=staging \
  --dart-define=API_KEY=staging_key_67890

# Ou use o script
./build.sh staging
```

### Production
```bash
# Set environment variables
export API_KEY_PROD='your_production_key'
export SENTRY_DSN_PROD='https://...@sentry.io/...'

# Build
./build.sh production
```

---

## 📦 Build Script

### Comandos Disponíveis
```bash
./build.sh dev         # Development
./build.sh staging     # Staging
./build.sh production  # Production
./build.sh help        # Help
```

### Features
- ✅ Environment variables
- ✅ Obfuscation (prod)
- ✅ Symbol splitting
- ✅ Validation
- ✅ Color output

---

## 🔐 Variáveis de Ambiente

### Obrigatórias (Production)
```bash
API_KEY_PROD='your_production_api_key'
```

### Opcionais
```bash
SENTRY_DSN_PROD='https://xxx@sentry.io/xxx'
SENTRY_DSN_STAGING='https://xxx@sentry.io/xxx'
```

### Como Configurar
```bash
# Temporário (sessão atual)
export API_KEY_PROD='key'

# Permanente (~/.bashrc ou ~/.zshrc)
echo 'export API_KEY_PROD="key"' >> ~/.zshrc
source ~/.zshrc

# CI/CD (GitHub Actions)
# Settings > Secrets > New repository secret
```

---

## 🧪 Testar Configuração

### Verificar Environment
```dart
void main() {
  EnvConfig.printConfig();
  // Output:
  // 🔧 Environment Configuration:
  //    Environment: dev
  //    API URL: http://localhost:3000
  //    API Key: dev_key_12...
  //    Debug Mode: true
}
```

### Testar API Call
```dart
final api = ApiClient();
final response = await api.get('/health');
print('API URL: ${EnvConfig.apiUrl}');
print('Response: ${response.data}');
```

---

## 📊 Configurações por Ambiente

| Config | Dev | Staging | Production |
|--------|-----|---------|------------|
| **API URL** | localhost:3000 | staging-api | api.soloforte.com |
| **API Key** | dev_key | staging_key | prod_key (env) |
| **Sentry** | Disabled | Optional | Required |
| **Obfuscation** | No | No | Yes |
| **Debug Logs** | Yes | Yes | No |
| **SSL Pinning** | Skip | Active | Active |

---

## 🔒 Segurança

### API Keys
```dart
// ❌ NUNCA faça isso
const apiKey = 'my_secret_key_123';

// ✅ Use environment variables
final apiKey = EnvConfig.apiKey;
```

### Secrets no Git
```bash
# .gitignore
.env
.env.local
.env.production
*.key
*.jks
```

### Rotation de Keys
```bash
# 1. Gerar nova key
openssl rand -base64 32

# 2. Atualizar no servidor
# 3. Atualizar environment variable
export API_KEY_PROD='new_key'

# 4. Rebuild e deploy
./build.sh production
```

---

## 🐛 Troubleshooting

### Erro: "API_KEY_PROD not set"
```bash
# Solução
export API_KEY_PROD='your_key'
./build.sh production
```

### Erro: "Connection refused"
```bash
# Verificar URL
echo ${EnvConfig.apiUrl}

# Verificar backend está rodando
curl http://localhost:3000/health
```

### Erro: "Invalid API key"
```bash
# Verificar key
echo ${EnvConfig.apiKey}

# Testar manualmente
curl -H "X-API-Key: your_key" \
  https://api.soloforte.com/health
```

---

## 📝 Checklist

- [x] EnvConfig criado
- [x] ApiClient atualizado
- [x] main.dart atualizado
- [x] Build script criado
- [x] Permissões de execução
- [ ] Testar dev environment
- [ ] Testar staging environment
- [ ] Configurar production keys
- [ ] Testar production build

---

## 🎯 Próximos Passos

1. **Configurar backend** - Endpoints reais
2. **Testar environments** - Dev, staging, prod
3. **Configurar CI/CD** - Automated builds
4. **Deploy staging** - Testes finais
5. **Deploy production** - Go live!

---

**Status**: ✅ Configuração Completa  
**Ambientes**: 3 (dev, staging, prod)  
**Build Script**: Pronto  
**Segurança**: API keys protegidas
