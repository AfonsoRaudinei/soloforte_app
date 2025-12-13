# 🎯 PLANO DE AÇÃO EXECUTIVO - P0 (URGENTE)
## SoloForte - Correções Críticas de Segurança

**Prazo:** 3-4 dias úteis  
**Esforço Total:** 11-14 horas  
**Prioridade:** P0 (CRÍTICA)  
**Impacto:** Segurança +4.0 pontos, Performance +2.0 pontos

---

## 📋 CHECKLIST EXECUTIVO

### DIA 1: PROTEÇÃO DE CREDENCIAIS (3h)

- [x] **.gitignore criado** ✅
- [x] **.env.example criado** ✅
- [ ] **Verificar histórico Git** (30min)
  ```bash
  # Verificar se .env foi commitado
  git log --all --full-history -- ".env"
  
  # Se encontrou, limpar histórico:
  git filter-branch --force --index-filter \
    "git rm --cached --ignore-unmatch .env" \
    --prune-empty --tag-name-filter cat -- --all
  ```

- [ ] **Rotacionar credenciais Supabase** (30min)
  1. Acessar: https://app.supabase.com → Settings → API
  2. Regenerate anon key
  3. Atualizar `.env`
  4. Reiniciar servidor

- [ ] **Validar variáveis de ambiente** (30min)
  ```bash
  # Criar .env a partir do .env.example
  cp .env.example .env
  
  # Preencher credenciais
  nano .env
  
  # Validar se está funcionando
  npm run dev
  ```

- [ ] **Atualizar logger para sanitizar dados sensíveis** (1-2h)
  - Ver código em próxima seção

---

### DIA 2: MIGRAÇÃO STORAGE (5-6h)

- [ ] **Fase 1: Login.tsx** (1h)
  - Substituir `localStorage.setItem(SESSION)` por `sessionStorage.save()`
  - Testar login
  - Testar persistência

- [ ] **Fase 2: Cadastro.tsx** (1h)
  - Mesma migração
  - Testar cadastro + login automático

- [ ] **Fase 3: Dashboard.tsx** (2h)
  - Migrar DEMO_MARKERS
  - Migrar DEMO_POLYGONS
  - Testar modo demo

- [ ] **Fase 4: Outros componentes** (2h)
  - Relatorios.tsx
  - Configuracoes.tsx
  - CheckInOut.tsx
  - AlertasConfig.tsx

---

### DIA 3: HOOKS DE SEGURANÇA (3-4h)

- [ ] **Aplicar useRateLimit em Login** (1h)
  - Importar `useLoginRateLimit()`
  - Adicionar verificação no `handleLogin`
  - UI de feedback quando bloqueado

- [ ] **Aplicar useRateLimit em Cadastro** (1h)
  - Importar `useSignupRateLimit()`
  - Verificação no `handleCadastro`

- [ ] **Aplicar useSanitizedInput** (1-2h)
  - Login: email
  - Cadastro: nome, email, telefone
  - Dashboard: área name, descrição
  - Configuracoes: nome da fazenda

---

### DIA 4: VALIDAÇÃO E TESTES (2h)

- [ ] **Testes manuais de segurança**
  - Tentar XSS em formulários
  - Testar rate limiting (5 tentativas de login)
  - Verificar session persistente
  - Testar logout

- [ ] **Performance**
  - Lighthouse score > 90
  - Verificar sem localStorage bloqueante

- [ ] **Code Review**
  - Buscar `localStorage` restantes
  - Validar sanitização em todos inputs
  - Checar logs sensíveis

---

## 💻 CÓDIGO PRONTO PARA IMPLEMENTAR

### 1. Logger Seguro (Atualizar /utils/logger.ts)

```typescript
/**
 * 🔒 SECURE LOGGER
 * Sanitiza dados sensíveis automaticamente
 */

class SecureLogger {
  private isDev: boolean;
  private SENSITIVE_KEYS = [
    'password', 'senha', 'token', 'access_token', 'refresh_token',
    'email', 'cpf', 'cnpj', 'phone', 'telefone', 'session',
    'api_key', 'apikey', 'secret', 'credential'
  ];

  constructor() {
    this.isDev = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
       window.location.hostname === '127.0.0.1');
  }

  /**
   * Sanitiza objeto removendo dados sensíveis
   */
  private sanitize(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitize(item));
    }

    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      // Redact campos sensíveis
      const isSensitive = this.SENSITIVE_KEYS.some(
        sensitiveKey => key.toLowerCase().includes(sensitiveKey)
      );

      if (isSensitive) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitize(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Log normal (apenas em desenvolvimento)
   */
  log(message: string, data?: any) {
    if (!this.isDev) return;
    
    const sanitizedData = data ? this.sanitize(data) : undefined;
    console.log(message, sanitizedData);
  }

  /**
   * Log de erro (sempre loga, mas sanitizado)
   */
  error(message: string, error?: any) {
    const sanitizedError = error ? this.sanitize(error) : undefined;
    console.error(message, sanitizedError);
    
    // TODO: Enviar para Sentry/LogRocket em produção
    // if (!this.isDev) {
    //   Sentry.captureException(error, { extra: { message } });
    // }
  }

  /**
   * Log de warning
   */
  warn(message: string, data?: any) {
    const sanitizedData = data ? this.sanitize(data) : undefined;
    console.warn(message, sanitizedData);
  }

  /**
   * Log de informação
   */
  info(message: string, data?: any) {
    if (!this.isDev) return;
    
    const sanitizedData = data ? this.sanitize(data) : undefined;
    console.info(message, sanitizedData);
  }
}

export const logger = new SecureLogger();

// Exemplo de uso:
// logger.log('Login bem-sucedido', { email: 'test@test.com', token: 'abc123' });
// Output: Login bem-sucedido { email: '[REDACTED]', token: '[REDACTED]' }
```

---

### 2. Migração Login.tsx

```typescript
// ❌ ANTES
import { STORAGE_KEYS } from '../utils/constants';

const handleLogin = async () => {
  // ...
  if (data?.session) {
    logger.log('✅ Login bem-sucedido:', data.user.email);
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(data.session));
    navigate('/dashboard');
  }
};

// ✅ DEPOIS
import { sessionStorage } from '../utils/storage/capacitor-storage';

const handleLogin = async () => {
  // ...
  if (data?.session) {
    logger.log('✅ Login bem-sucedido'); // Sem email!
    
    // Salvar session de forma segura
    await sessionStorage.save({
      userId: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || data.user.email.split('@')[0],
      token: data.session.access_token,
      expiresAt: Date.now() + (data.session.expires_in * 1000)
    });
    
    navigate('/dashboard');
  }
};
```

---

### 3. Aplicar Rate Limiting em Login.tsx

```typescript
// ✅ ADICIONAR NO TOPO
import { useLoginRateLimit } from '../utils/hooks/useRateLimit';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

// ✅ NO COMPONENTE
export default function Login({ navigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // ✅ ADICIONAR HOOK
  const { 
    checkLimit, 
    isBlocked, 
    resetTimeFormatted,
    remaining 
  } = useLoginRateLimit();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    // ✅ VERIFICAR RATE LIMIT
    const rateLimitResult = checkLimit();
    if (!rateLimitResult.allowed) {
      setError(
        `❌ Muitas tentativas de login. Aguarde ${resetTimeFormatted} para tentar novamente.`
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        logger.error('Erro ao fazer login'); // Sem detalhes sensíveis
        
        if (loginError.message.includes('Invalid login credentials')) {
          setError('❌ Email ou senha incorretos.');
        } else if (loginError.message.includes('Email not confirmed')) {
          setError('⚠️ Email não confirmado. Verifique sua caixa de entrada.');
        } else {
          setError('❌ Erro ao fazer login. Tente novamente.');
        }
        
        setLoading(false);
        return;
      }

      if (data?.session) {
        logger.log('✅ Login bem-sucedido');
        
        await sessionStorage.save({
          userId: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email.split('@')[0],
          token: data.session.access_token,
          expiresAt: Date.now() + (data.session.expires_in * 1000)
        });
        
        navigate('/dashboard');
      }

    } catch (err) {
      logger.error('Erro no login');
      setError('❌ Erro ao conectar. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo e título... */}

          {/* ✅ ALERT DE RATE LIMIT */}
          {isBlocked && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                🔒 Muitas tentativas de login. Aguarde <strong>{resetTimeFormatted}</strong> para tentar novamente.
              </AlertDescription>
            </Alert>
          )}

          {/* ✅ INFO DE TENTATIVAS RESTANTES */}
          {!isBlocked && remaining < 3 && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                ⚠️ Você tem {remaining} tentativa{remaining !== 1 ? 's' : ''} restante{remaining !== 1 ? 's' : ''}.
              </AlertDescription>
            </Alert>
          )}

          {/* Resto do formulário... */}
        </div>
      </div>
    </div>
  );
}
```

---

### 4. Aplicar Sanitização em Cadastro.tsx

```typescript
// ✅ ADICIONAR NO TOPO
import { useSanitizedForm } from '../utils/hooks/useSanitizedInput';
import { useSignupRateLimit } from '../utils/hooks/useRateLimit';

export default function Cadastro({ navigate }: CadastroProps) {
  // ✅ SUBSTITUIR useState por useSanitizedForm
  const { values, setValue, reset } = useSanitizedForm({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cep: '',
    cidade: '',
    estado: '',
    senha: '',
    confirmarSenha: ''
  }, {
    nome: 'name',      // ← Apenas letras e espaços
    telefone: 'phone', // ← Apenas números e +()-
    cpf: 'document',   // ← Apenas números
    email: 'default'   // ← Remove HTML
  });

  const { checkLimit, isBlocked, resetTimeFormatted } = useSignupRateLimit();

  const handleCadastro = async () => {
    // ✅ Verificar rate limit
    const rateLimitResult = checkLimit();
    if (!rateLimitResult.allowed) {
      setError(`❌ Muitos cadastros. Aguarde ${resetTimeFormatted}.`);
      return;
    }

    // ✅ Validar senha FORTE
    const passwordValidation = validatePassword(values.senha);
    if (!passwordValidation.valid) {
      setError('❌ ' + passwordValidation.errors.join('. '));
      return;
    }

    // ... resto da lógica
  };

  return (
    // ...
    <Input
      value={values.nome}
      onChange={e => setValue('nome', e.target.value)}
      placeholder="Nome completo"
      // ✅ Usuário digita: "<script>alert(1)</script>João Silva"
      // ✅ Armazenado: "João Silva"
    />
    
    <Input
      value={values.telefone}
      onChange={e => setValue('telefone', e.target.value)}
      placeholder="(00) 00000-0000"
      // ✅ Usuário digita: "11 98765-4321 <script>"
      // ✅ Armazenado: "11 98765-4321"
    />
  );
}
```

---

## 🧪 TESTES DE VALIDAÇÃO

### Teste 1: Rate Limiting
```
1. Abrir Login
2. Tentar login com senha errada 5 vezes
3. ✅ Deve bloquear na 6ª tentativa
4. ✅ Deve mostrar tempo de espera
5. Aguardar 15 minutos (ou limpar localStorage para testar)
6. ✅ Deve permitir novas tentativas
```

### Teste 2: XSS Protection
```
1. Abrir Cadastro
2. No campo Nome, digitar: <script>alert("XSS")</script>João
3. ✅ Deve salvar apenas: João
4. No Dashboard, criar área com nome: <img src=x onerror="alert(1)">
5. ✅ Não deve executar JavaScript
```

### Teste 3: Session Storage
```
1. Fazer login
2. Abrir DevTools → Application → Storage
3. ✅ NÃO deve aparecer "soloforte_session" em localStorage
4. ✅ DEVE aparecer "session" em Preferences/Storage (Capacitor)
5. Fechar e reabrir app
6. ✅ Deve manter sessão logada
```

### Teste 4: Logger Sanitizado
```
1. Abrir DevTools → Console
2. Fazer login
3. ✅ NÃO deve logar: email, password, token
4. ✅ DEVE logar: "✅ Login bem-sucedido" (sem dados)
```

---

## 📊 MÉTRICAS DE SUCESSO

| Métrica | Antes | Depois | Meta |
|---------|-------|--------|------|
| localStorage direto | 32 usos | 0 usos | ✅ 0 |
| Rate limit aplicado | 0 | 2 componentes | ✅ Login+Cadastro |
| XSS sanitização | Parcial | Completa | ✅ Todos inputs |
| Session criptografada | ❌ Plaintext | ✅ Capacitor | ✅ Seguro |
| Logs sensíveis | Sim | Não | ✅ Sanitizados |
| .gitignore presente | ❌ | ✅ | ✅ Criado |

---

## 🚀 COMANDO RÁPIDO DE EXECUÇÃO

```bash
# 1. Setup inicial
cp .env.example .env
nano .env  # Preencher credenciais

# 2. Instalar dependências (se necessário)
npm install dompurify @types/dompurify zxcvbn @types/zxcvbn

# 3. Verificar histórico Git
git log --all --full-history -- ".env"

# 4. Executar testes
npm run dev

# 5. Lighthouse audit
npm run build
npx serve dist
# Abrir Chrome DevTools → Lighthouse → Run audit
```

---

## 📞 SUPORTE

Se encontrar problemas:

1. **Erro de import:** Verificar se arquivos foram criados em `/utils/security/`
2. **Capacitor não detectado:** Normal em web, usa fallback para localStorage
3. **Rate limit muito agressivo:** Ajustar valores em `useRateLimit.ts`
4. **Session não persiste:** Verificar `sessionStorage.isValid()`

---

**Status:** 🟡 AGUARDANDO IMPLEMENTAÇÃO  
**Próximo Review:** Após 4 dias  
**Responsável:** Equipe de Desenvolvimento
