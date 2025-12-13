# 🔴 ROTACIONAR CREDENCIAIS DO SUPABASE - URGENTE

**Data:** 31 de Outubro de 2025  
**Status:** 🔴 AÇÃO IMEDIATA NECESSÁRIA  
**Motivo:** Credenciais expostas em código-fonte (Git history)

---

## ⚠️ POR QUE ROTACIONAR?

As credenciais do Supabase estavam **hardcoded** em `/utils/supabase/info.tsx` e podem ter vazado:

1. ✅ **Código-fonte versionado** - Qualquer pessoa com acesso ao repositório viu
2. ✅ **Git history** - Credenciais podem estar em commits antigos
3. ✅ **Repositório público?** - Se sim, bots já coletaram as credenciais
4. ✅ **Compartilhado?** - Screenshots, Slack, emails podem ter exposto

**Risco:** Acesso não autorizado ao banco de dados, custos elevados, vazamento de dados.

---

## 🎯 PROCESSO DE ROTAÇÃO (15 minutos)

### FASE 1: PREPARAÇÃO (2 min)

#### 1.1 Verificar Estado Atual

```bash
# 1. Verificar se .env existe
cat .env

# 2. Deve conter (credenciais ANTIGAS - VAZADAS):
# VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum
# VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 3. Testar se app está funcionando
npm run dev
# Abrir http://localhost:5173
# Fazer login/criar conta para confirmar que conecta
```

#### 1.2 Fazer Backup

```bash
# Backup do .env atual (caso precise reverter)
cp .env .env.backup-$(date +%Y%m%d-%H%M%S)

# Confirmar backup
ls -la .env.backup-*
```

---

### FASE 2: ROTACIONAR NO SUPABASE (5 min)

#### 2.1 Acessar Dashboard do Supabase

```bash
# Abrir no navegador:
https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum
```

#### 2.2 Gerar Nova Anon Key

**Passo a passo visual:**

1. **Login** no Supabase Dashboard
2. **Selecionar projeto:** `fqnbtglzrxkgoxhndsum`
3. **Settings** (engrenagem no menu lateral)
4. **API** (no submenu de Settings)
5. Localizar seção **"Project API keys"**
6. Encontrar **"anon/public"** key
7. **IMPORTANTE:** Anotar a key atual (para rollback se necessário)
8. Clicar em **ícone de refresh/rotação** ao lado da key
9. **Confirmar** a rotação
10. **Copiar** a nova key gerada

**⚠️ ATENÇÃO:**
- A key antiga será **INVALIDADA IMEDIATAMENTE**
- Todos os apps usando a key antiga **PARARÃO DE FUNCIONAR**
- Tenha certeza de atualizar TODAS as instâncias (dev, staging, prod)

#### 2.3 Verificar RLS (Row Level Security)

Enquanto está no dashboard:

```sql
-- Verificar se RLS está habilitado
-- Database > Tables > [selecionar tabela] > Policies

-- IMPORTANTE: Todas as tabelas DEVEM ter RLS habilitado!
-- Se não tiverem, habilite AGORA:

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occurrences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polygons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
-- etc...

-- Criar política básica (exemplo):
CREATE POLICY "Users can read own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);
```

---

### FASE 3: ATUALIZAR APLICAÇÃO (3 min)

#### 3.1 Atualizar .env Local

```bash
# Editar .env
nano .env

# OU
code .env

# OU
vim .env
```

**Atualizar para:**

```env
# ============================================
# SUPABASE CONFIGURATION - CREDENCIAIS ROTACIONADAS
# ============================================

# Project ID (NÃO MUDA)
VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum

# ✅ NOVA Anon Key (rotacionada em 31/Out/2025)
VITE_SUPABASE_ANON_KEY=COLE_A_NOVA_KEY_AQUI

# ============================================
# HISTÓRICO DE ROTAÇÃO
# ============================================
# Rotação 1: 31/Out/2025 - Motivo: Exposição em código-fonte
# Próxima rotação: 31/Jan/2026 (90 dias)
```

#### 3.2 Validar Nova Configuração

```bash
# Executar validador
node scripts/validate-env.js

# Deve mostrar:
# ✅ VITE_SUPABASE_PROJECT_ID: fqnbtglz...
# ✅ VITE_SUPABASE_ANON_KEY: [nova key]...
# ✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!
```

---

### FASE 4: TESTAR (3 min)

#### 4.1 Testar Localmente

```bash
# 1. Reiniciar servidor
# Ctrl+C (se estiver rodando)
npm run dev

# 2. Abrir navegador
# http://localhost:5173

# 3. Verificar console do navegador (F12)
# Deve aparecer:
# ✅ Supabase credentials loaded from environment variables
#    Project ID: fqnbtglz...
#    Anon Key: [começa diferente da antiga]...

# 4. Testar funcionalidades críticas:
```

**Checklist de Testes:**

```markdown
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Carregar polígonos do banco
- [ ] Salvar ocorrência
- [ ] Carregar dados do dashboard
- [ ] Modo demo funciona (fallback)
```

#### 4.2 Testar Autenticação

```javascript
// No console do navegador:

// 1. Testar conexão
const { createClient } = await import('./utils/supabase/client.ts');
const supabase = createClient();

// 2. Testar query simples (deve funcionar)
const { data, error } = await supabase.from('users').select('count').limit(1);
console.log('Test query:', data, error);

// 3. Testar autenticação
const { data: session } = await supabase.auth.getSession();
console.log('Session:', session);

// Tudo deve funcionar SEM ERROS
```

---

### FASE 5: ATUALIZAR PRODUÇÃO (2 min)

#### 5.1 Vercel

```bash
# Via CLI
vercel env rm VITE_SUPABASE_ANON_KEY production
vercel env add VITE_SUPABASE_ANON_KEY production
# Cole a NOVA key quando solicitado

# Via Dashboard
# 1. https://vercel.com/seu-projeto/settings/environment-variables
# 2. Editar VITE_SUPABASE_ANON_KEY
# 3. Atualizar para NOVA key
# 4. Selecionar: Production
# 5. Save
```

#### 5.2 Netlify

```bash
# Via CLI
netlify env:unset VITE_SUPABASE_ANON_KEY
netlify env:set VITE_SUPABASE_ANON_KEY NOVA_KEY_AQUI

# Via Dashboard
# 1. Site settings > Environment variables
# 2. Editar VITE_SUPABASE_ANON_KEY
# 3. Atualizar para NOVA key
# 4. Save
```

#### 5.3 Fazer Deploy

```bash
# Trigger novo deploy para aplicar mudanças

# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Ou commit + push (se tiver CD configurado)
git add .
git commit -m "chore: update Supabase credentials (rotated)"
git push origin main
```

---

### FASE 6: VERIFICAÇÃO FINAL (2 min)

#### 6.1 Verificar Produção

```bash
# 1. Abrir app em produção
https://seu-app.vercel.app
# ou
https://seu-app.netlify.app

# 2. Abrir DevTools (F12)
# 3. Verificar console
# Deve aparecer:
# ✅ Supabase credentials loaded...

# 4. Testar login/cadastro em produção
```

#### 6.2 Verificar Key Antiga Invalidada

```javascript
// No console do navegador (em ambiente de teste):

// 1. Forçar uso da key ANTIGA (para confirmar que foi invalidada)
const oldKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA";

const { createClient } = await import('@supabase/supabase-js');
const oldClient = createClient(
  'https://fqnbtglzrxkgoxhndsum.supabase.co',
  oldKey
);

// 2. Tentar query com key antiga
const { data, error } = await oldClient.from('users').select('count');

// 3. DEVE RETORNAR ERRO:
// Error: Invalid API key
// ou
// Error: Authentication failed

console.log('Old key test:', error); // Deve ter erro!
```

---

## 📋 CHECKLIST COMPLETO

```markdown
### Preparação
- [x] .env editado manualmente
- [x] .env.example atualizado
- [x] .gitignore protegendo .env
- [ ] Backup do .env atual criado
- [ ] App funcionando com credenciais antigas

### Rotação no Supabase
- [ ] Login no dashboard do Supabase
- [ ] Acesso à seção Settings > API
- [ ] Key antiga anotada (rollback)
- [ ] Nova key gerada
- [ ] Nova key copiada
- [ ] RLS verificado/habilitado

### Atualização Local
- [ ] .env atualizado com nova key
- [ ] Validador executado (passou)
- [ ] Servidor reiniciado
- [ ] Login local funciona
- [ ] Cadastro local funciona
- [ ] Queries funcionam

### Atualização Produção
- [ ] Variáveis atualizadas em Vercel/Netlify
- [ ] Deploy realizado
- [ ] App em produção funciona
- [ ] Login em produção funciona

### Verificação Final
- [ ] Key antiga testada (deve falhar)
- [ ] Key nova funciona local
- [ ] Key nova funciona produção
- [ ] Logs sem erros
- [ ] Monitoramento configurado

### Limpeza
- [ ] Backups antigos removidos (após 7 dias)
- [ ] Git history limpo (se necessário)
- [ ] Documentação atualizada
- [ ] Time notificado
```

---

## 🚨 PROBLEMAS COMUNS

### Erro: "Invalid API key"

```bash
# Causa: Key não foi atualizada corretamente
# Solução:
1. Verificar .env: cat .env
2. Confirmar que é a NOVA key
3. Reiniciar servidor: npm run dev
4. Limpar cache do navegador: Ctrl+Shift+R
```

### Erro: "Authentication failed"

```bash
# Causa: RLS bloqueando queries
# Solução:
1. Acessar Supabase Dashboard
2. Database > Tables > [tabela] > Policies
3. Verificar políticas de RLS
4. Adicionar política permitindo queries anônimas (se apropriado)
```

### App não conecta em produção

```bash
# Causa: Variáveis não foram atualizadas
# Solução:
1. Verificar dashboard da plataforma (Vercel/Netlify)
2. Confirmar VITE_SUPABASE_ANON_KEY está atualizada
3. Fazer rebuild: vercel --prod
4. Aguardar deploy completo (2-5 min)
```

### Key antiga ainda funciona

```bash
# Causa: Cache ou rotação não efetivada
# Solução:
1. Aguardar 5 minutos (propagação)
2. Verificar Supabase Dashboard se rotação foi salva
3. Tentar gerar nova key novamente
4. Contatar suporte do Supabase se persistir
```

---

## 🔒 MEDIDAS DE SEGURANÇA ADICIONAIS

### 1. Configurar Rotação Automática (90 dias)

```bash
# Adicionar lembrete no calendário:
# Próxima rotação: 31/Janeiro/2026

# Ou configurar cronjob para lembrete:
echo "0 0 31 */3 * notify-send 'Rotacionar credenciais Supabase'" | crontab -
```

### 2. Monitorar Uso da API

```bash
# Supabase Dashboard > Settings > API
# Verificar seção "API Usage"

# Alertas para:
- Requests suspeitos (picos anormais)
- IPs desconhecidos
- Tentativas de autenticação falhadas
```

### 3. Habilitar Alertas de Segurança

```sql
-- Criar função para logar tentativas de acesso
CREATE OR REPLACE FUNCTION log_api_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO api_access_logs (
    timestamp,
    user_id,
    endpoint,
    ip_address
  ) VALUES (
    NOW(),
    auth.uid(),
    TG_TABLE_NAME,
    current_setting('request.headers')::json->>'x-forwarded-for'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar em tabelas críticas
CREATE TRIGGER log_users_access
AFTER SELECT ON public.users
FOR EACH STATEMENT
EXECUTE FUNCTION log_api_access();
```

### 4. Rate Limiting

```javascript
// Implementar no Supabase Edge Function
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: /* Redis connection */,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 req/min
});

export async function middleware(req: Request) {
  const ip = req.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

---

## 📊 VERIFICAÇÃO PÓS-ROTAÇÃO

### Dashboard de Monitoramento

Criar dashboard para monitorar:

```javascript
// utils/monitoring/supabase-health.ts

export async function checkSupabaseHealth() {
  const checks = {
    connection: false,
    authentication: false,
    rls: false,
    rateLimit: false,
  };

  try {
    // 1. Testar conexão
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    checks.connection = !error;

    // 2. Testar autenticação
    const { data: session } = await supabase.auth.getSession();
    checks.authentication = !!session;

    // 3. Verificar RLS
    // (implementar lógica específica)

    // 4. Verificar rate limit
    // (implementar lógica específica)

  } catch (err) {
    console.error('Health check failed:', err);
  }

  return checks;
}

// Executar periodicamente
setInterval(checkSupabaseHealth, 5 * 60 * 1000); // A cada 5 min
```

---

## 📝 DOCUMENTAR ROTAÇÃO

### Atualizar Changelog

```markdown
## [1.1.0] - 2025-10-31

### Security
- 🔒 **CRITICAL:** Rotacionadas credenciais do Supabase
  - Motivo: Exposição em código-fonte (Git history)
  - Ação: Nova anon key gerada
  - Impacto: Todas as instâncias atualizadas
  - Verificação: RLS habilitado em todas as tabelas
```

### Notificar Time

```markdown
# 🔒 ALERTA DE SEGURANÇA - CREDENCIAIS ROTACIONADAS

Data: 31/Out/2025
Severidade: CRÍTICA

## O que aconteceu?
Credenciais do Supabase foram expostas em código-fonte e rotacionadas.

## Ação necessária:
1. Pull do repositório: `git pull origin main`
2. Atualizar .env local com nova key (ver Slack/email)
3. Reiniciar servidor: `npm run dev`
4. Verificar que tudo funciona

## Contato:
Em caso de problemas, contatar @security-team
```

---

## ✅ CONCLUSÃO

Após completar todos os passos:

1. ✅ Key antiga **INVALIDADA**
2. ✅ Nova key **FUNCIONANDO** (local + prod)
3. ✅ RLS **HABILITADO** em todas as tabelas
4. ✅ App **TESTADO** e funcionando
5. ✅ Time **NOTIFICADO**
6. ✅ Documentação **ATUALIZADA**

**Status:** 🟢 SEGURO

**Próxima rotação:** 31/Janeiro/2026 (90 dias)

---

## 🔗 REFERÊNCIAS

- [Supabase API Credentials](https://supabase.com/docs/guides/api/api-keys)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Best Practices](https://supabase.com/docs/guides/platform/security)

---

**Data de execução:** _____/_____/_____  
**Executado por:** ___________________  
**Verificado por:** ___________________  
**Status:** [ ] Completo [ ] Pendente

