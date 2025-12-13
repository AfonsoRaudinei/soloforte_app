# ✅ CREDENCIAIS MIGRADAS PARA .env

**Data:** 31 de Outubro de 2025  
**Prioridade:** P0 - CRÍTICO  
**Status:** ✅ CONCLUÍDO

---

## 🎯 O QUE FOI FEITO

Migração completa das credenciais do Supabase de código hardcoded para variáveis de ambiente seguras.

### Arquivos Criados/Modificados

1. **`.env`** ✅ CRIADO
   - Contém as credenciais atuais
   - **NUNCA** deve ser commitado no Git
   - Já está no `.gitignore`

2. **`.env.example`** ✅ CRIADO
   - Template sem valores sensíveis
   - Pode ser commitado no Git
   - Serve como documentação

3. **`.gitignore`** ✅ ATUALIZADO
   - Garante que `.env` nunca será commitado
   - Protege outros arquivos sensíveis
   - Inclui patterns de segurança

4. **`/utils/supabase/info.tsx`** ✅ ATUALIZADO
   - Remove credenciais hardcoded
   - Lê de `import.meta.env`
   - Adiciona validação robusta
   - Logs informativos em desenvolvimento

---

## 🔴 AÇÃO IMEDIATA NECESSÁRIA

### 1. ROTACIONAR CREDENCIAIS DO SUPABASE

As credenciais antigas **DEVEM** ser rotacionadas porque estavam expostas em código-fonte:

```bash
# 1. Acesse o dashboard do Supabase
https://supabase.com/dashboard/project/fqnbtglzrxkgoxhndsum

# 2. Vá em: Settings > API

# 3. Clique em "Generate new anon key"

# 4. Copie a nova chave e atualize no .env:
VITE_SUPABASE_ANON_KEY=nova_chave_aqui
```

### 2. VERIFICAR GIT HISTORY

Verificar se credenciais vazaram no histórico do Git:

```bash
# Procurar por credenciais no histórico
git log --all --full-history -- "**/info.tsx"

# Se encontrar commits com credenciais expostas:
# OPÇÃO 1: Remover do histórico (requer force push)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch utils/supabase/info.tsx" \
  --prune-empty --tag-name-filter cat -- --all

# OPÇÃO 2: Se o repositório for público, considere criar um novo
# e migrar o código limpo
```

### 3. HABILITAR RLS (ROW LEVEL SECURITY)

Garantir que todas as tabelas do Supabase têm RLS habilitado:

```sql
-- Verificar tabelas sem RLS
SELECT schemaname, tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename NOT IN (
  SELECT tablename 
  FROM pg_policies
)
AND rowsecurity = false;

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occurrences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polygons ENABLE ROW LEVEL SECURITY;
-- etc...

-- Criar políticas básicas (exemplo)
CREATE POLICY "Users can only read their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);
```

---

## 📋 COMO USAR

### Para Desenvolvimento Local

```bash
# 1. Copiar template
cp .env.example .env

# 2. Editar .env com suas credenciais
nano .env  # ou seu editor preferido

# 3. Preencher as variáveis:
VITE_SUPABASE_PROJECT_ID=seu_project_id
VITE_SUPABASE_ANON_KEY=sua_anon_key

# 4. Reiniciar o servidor
npm run dev
```

### Para Produção (Vercel/Netlify/etc)

```bash
# Adicionar variáveis de ambiente no painel da plataforma

# Vercel:
vercel env add VITE_SUPABASE_PROJECT_ID
vercel env add VITE_SUPABASE_ANON_KEY

# Netlify:
netlify env:set VITE_SUPABASE_PROJECT_ID seu_project_id
netlify env:set VITE_SUPABASE_ANON_KEY sua_anon_key

# Ou via interface web:
# - Vercel: Settings > Environment Variables
# - Netlify: Site settings > Environment variables
```

---

## 🔍 VALIDAÇÃO

### Verificar que está funcionando:

```bash
# 1. Iniciar o servidor
npm run dev

# 2. Verificar console do navegador:
# Deve aparecer:
# ✅ Supabase credentials loaded from environment variables
#    Project ID: fqnbtglz...
#    Anon Key: eyJhbGci...

# 3. Se aparecer erro:
# 🔴 ERRO DE CONFIGURAÇÃO - CREDENCIAIS FALTANDO
# Significa que .env não está configurado corretamente
```

### Testar funcionalidade:

```javascript
// No console do navegador:
import { createClient } from './utils/supabase/client';
const supabase = createClient();

// Deve funcionar sem erros
const { data, error } = await supabase.from('users').select('*').limit(1);
console.log(data); // Deve retornar dados (com RLS aplicado)
```

---

## 🛡️ SEGURANÇA ADICIONAL

### 1. Variáveis de Ambiente por Ambiente

Crie arquivos específicos (opcional):

```bash
.env.development  # Desenvolvimento local
.env.staging      # Staging
.env.production   # Produção
```

Vite automaticamente carrega o arquivo correto baseado em `NODE_ENV`.

### 2. Criptografia de Variáveis Sensíveis

Para dados extra-sensíveis (não aplicável a Supabase anon key):

```bash
# Gerar chave de criptografia
openssl rand -base64 32

# Adicionar ao .env
VITE_ENCRYPTION_KEY=sua_chave_aqui

# Usar no código:
import CryptoJS from 'crypto-js';

const encrypt = (data: string) => {
  const key = import.meta.env.VITE_ENCRYPTION_KEY;
  return CryptoJS.AES.encrypt(data, key).toString();
};
```

### 3. Validação em Tempo de Build

Adicionar script de validação:

```json
// package.json
{
  "scripts": {
    "prebuild": "node scripts/validate-env.js",
    "build": "vite build"
  }
}
```

```javascript
// scripts/validate-env.js
const requiredVars = [
  'VITE_SUPABASE_PROJECT_ID',
  'VITE_SUPABASE_ANON_KEY'
];

const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length > 0) {
  console.error('❌ Missing environment variables:', missing);
  process.exit(1);
}

console.log('✅ All environment variables validated');
```

---

## 🔄 PRÓXIMOS PASSOS (Recomendados)

### P0 - Imediato (Hoje)
- [x] Migrar credenciais para .env
- [ ] **ROTACIONAR chaves do Supabase**
- [ ] Verificar Git history
- [ ] Adicionar .env ao .gitignore
- [ ] Testar app localmente

### P1 - Esta Semana
- [ ] Habilitar RLS em todas as tabelas
- [ ] Configurar variáveis em produção
- [ ] Adicionar script de validação de env
- [ ] Documentar processo para o time

### P2 - Este Mês
- [ ] Implementar vault de secrets (HashiCorp Vault, AWS Secrets Manager)
- [ ] Rotação automática de credenciais
- [ ] Monitoramento de acesso a credenciais
- [ ] Auditoria de uso de APIs

---

## 📚 REFERÊNCIAS

### Documentação

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

### Ferramentas

- **git-secrets**: Previne commits com credenciais
  ```bash
  brew install git-secrets
  git secrets --install
  git secrets --register-aws
  ```

- **truffleHog**: Scanner de credenciais no Git history
  ```bash
  docker run --rm -v $(pwd):/repo trufflesecurity/trufflehog:latest github --repo /repo
  ```

- **detect-secrets**: Pre-commit hook
  ```bash
  pip install detect-secrets
  detect-secrets scan > .secrets.baseline
  ```

---

## ✅ CHECKLIST DE SEGURANÇA

```markdown
### Migração de Credenciais
- [x] Criar .env com credenciais
- [x] Criar .env.example (template)
- [x] Atualizar .gitignore
- [x] Modificar código para ler de variáveis de ambiente
- [x] Adicionar validação de credenciais
- [ ] **ROTACIONAR credenciais antigas**
- [ ] Verificar Git history
- [ ] Testar localmente
- [ ] Configurar em produção

### Proteções Adicionais
- [ ] Habilitar RLS no Supabase
- [ ] Configurar políticas de acesso
- [ ] Adicionar rate limiting
- [ ] Implementar CSRF protection
- [ ] Adicionar CSP headers
- [ ] Configurar HTTPS only
- [ ] Implementar audit logging

### Monitoramento
- [ ] Configurar alertas de uso anormal
- [ ] Monitorar tentativas de acesso
- [ ] Dashboard de métricas de segurança
- [ ] Logs de auditoria
```

---

## 🚨 EM CASO DE VAZAMENTO

Se descobrir que credenciais vazaram:

### 1. RESPOSTA IMEDIATA

```bash
# 1. Rotacionar TODAS as credenciais imediatamente
# 2. Revogar chaves antigas
# 3. Verificar logs de acesso suspeito
# 4. Notificar o time

# 5. Verificar se houve acesso não autorizado:
# No Supabase Dashboard:
# Auth > Logs
# Database > Logs
# API > Logs
```

### 2. INVESTIGAÇÃO

```bash
# Quando vazou?
git log --all --full-history -S "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

# Quem teve acesso?
git log --all --pretty=format:"%h %an %ae %ad" -- "**/info.tsx"

# Onde foi compartilhado?
# - GitHub público?
# - Slack?
# - Email?
# - Screenshot?
```

### 3. REMEDIAÇÃO

```bash
# Limpar histórico do Git (CUIDADO!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch utils/supabase/info.tsx" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (requer coordenação com time)
git push origin --force --all
git push origin --force --tags

# Ou considere criar novo repositório
```

### 4. PREVENÇÃO FUTURA

```bash
# Instalar git-secrets
git secrets --install
git secrets --register-aws

# Pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
if git diff --cached --name-only | xargs grep -l "VITE_SUPABASE_ANON_KEY"; then
  echo "❌ ERRO: Tentativa de commit de credenciais!"
  exit 1
fi
EOF

chmod +x .git/hooks/pre-commit
```

---

## 📞 SUPORTE

Se tiver problemas:

1. Verificar este documento primeiro
2. Consultar documentação do Vite sobre env vars
3. Verificar console do navegador para erros
4. Abrir issue no projeto (sem incluir credenciais!)

---

**Status:** ✅ Migração concluída  
**Próxima ação:** ROTACIONAR credenciais do Supabase  
**Responsável:** Dev Team  
**Prazo:** IMEDIATO (hoje)

