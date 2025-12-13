# 🔒 Checklist de Segurança - Row Level Security (RLS) Supabase

**Prioridade:** 🚨 **CRÍTICA - AÇÃO IMEDIATA (1-2 dias)**

## ✅ Status Atual
- [ ] Auditoria de tabelas sensíveis completa
- [ ] RLS habilitado em todas as tabelas
- [ ] Policies revisadas e testadas
- [ ] Secrets rotacionados (se necessário)

---

## 📋 ETAPA 1: Inventário de Tabelas Sensíveis

### Tabelas Críticas (DADOS PESSOAIS / OPERACIONAIS)
```sql
-- Execute no SQL Editor do Supabase para listar todas as tabelas:
SELECT schemaname, tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
```

### Lista de Tabelas Esperadas (baseado no código)
- [ ] `users` / `profiles` - Dados de usuários
- [ ] `produtores` - Cadastro de produtores
- [ ] `clientes` - Dados de clientes
- [ ] `relatorios` - Relatórios de campo
- [ ] `mapas` - Mapas salvos
- [ ] `pontos_interesse` / `pins` - Pontos no mapa
- [ ] `pragas` - Ocorrências de pragas
- [ ] `fotos` - Imagens/evidências
- [ ] `checkin` - Check-in/out
- [ ] `chat_messages` - Mensagens do suporte
- [ ] `alertas` - Alertas configurados
- [ ] `equipes` - Gestão de equipes
- [ ] `agenda` - Eventos agendados

---

## 📋 ETAPA 2: Verificar Status RLS

```sql
-- Verificar quais tabelas têm RLS habilitado:
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

### 🚨 Ação Obrigatória
**TODA tabela que contém dados de usuários DEVE ter `rls_enabled = true`**

---

## 📋 ETAPA 3: Habilitar RLS em Todas as Tabelas

```sql
-- EXECUTAR PARA CADA TABELA SENSÍVEL:

-- Exemplo: produtores
ALTER TABLE produtores ENABLE ROW LEVEL SECURITY;

-- Exemplo: relatorios
ALTER TABLE relatorios ENABLE ROW LEVEL SECURITY;

-- Exemplo: mapas
ALTER TABLE mapas ENABLE ROW LEVEL SECURITY;

-- Exemplo: pragas
ALTER TABLE pragas ENABLE ROW LEVEL SECURITY;

-- Exemplo: fotos
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;

-- Exemplo: checkin
ALTER TABLE checkin ENABLE ROW LEVEL SECURITY;

-- Exemplo: chat_messages
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Exemplo: alertas
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;

-- Exemplo: equipes
ALTER TABLE equipes ENABLE ROW LEVEL SECURITY;

-- Exemplo: agenda
ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;
```

---

## 📋 ETAPA 4: Criar Policies Seguras

### ⚠️ PRINCÍPIO FUNDAMENTAL
**"Deny by default, allow explicitly"** - Após habilitar RLS, NADA é acessível até criar policies.

### 🔐 Template de Policy - Dados por Usuário

```sql
-- POLICY: Usuário só vê seus próprios dados
-- Aplicar em: produtores, relatorios, mapas, pragas, etc.

-- SELECT (leitura)
CREATE POLICY "Users can view own data"
ON produtores
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT (criação)
CREATE POLICY "Users can insert own data"
ON produtores
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- UPDATE (atualização)
CREATE POLICY "Users can update own data"
ON produtores
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE (exclusão)
CREATE POLICY "Users can delete own data"
ON produtores
FOR DELETE
USING (auth.uid() = user_id);
```

### 🔐 Policy - Dados Compartilhados (Equipes)

```sql
-- Para sistemas multi-tenant (vários usuários de uma fazenda)
CREATE POLICY "Users can view team data"
ON relatorios
FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id 
    FROM equipes 
    WHERE equipe_id = relatorios.equipe_id
  )
);
```

### 🔐 Policy - Dados Públicos (se aplicável)

```sql
-- Apenas se houver dados realmente públicos
CREATE POLICY "Public read access"
ON tabela_publica
FOR SELECT
USING (true); -- ⚠️ USE COM EXTREMA CAUTELA
```

---

## 📋 ETAPA 5: Policies Específicas por Tabela

### 1️⃣ **Tabela: `produtores`**
```sql
-- RLS
ALTER TABLE produtores ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "produtores_select_own"
ON produtores FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "produtores_insert_own"
ON produtores FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "produtores_update_own"
ON produtores FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "produtores_delete_own"
ON produtores FOR DELETE
USING (auth.uid() = user_id);
```

### 2️⃣ **Tabela: `relatorios`**
```sql
ALTER TABLE relatorios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "relatorios_select_own"
ON relatorios FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "relatorios_insert_own"
ON relatorios FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "relatorios_update_own"
ON relatorios FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "relatorios_delete_own"
ON relatorios FOR DELETE
USING (auth.uid() = user_id);
```

### 3️⃣ **Tabela: `mapas`**
```sql
ALTER TABLE mapas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mapas_select_own"
ON mapas FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "mapas_insert_own"
ON mapas FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "mapas_update_own"
ON mapas FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "mapas_delete_own"
ON mapas FOR DELETE
USING (auth.uid() = user_id);
```

### 4️⃣ **Tabela: `pragas`**
```sql
ALTER TABLE pragas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pragas_select_own"
ON pragas FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "pragas_insert_own"
ON pragas FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "pragas_update_own"
ON pragas FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "pragas_delete_own"
ON pragas FOR DELETE
USING (auth.uid() = user_id);
```

### 5️⃣ **Tabela: `fotos`**
```sql
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "fotos_select_own"
ON fotos FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "fotos_insert_own"
ON fotos FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "fotos_delete_own"
ON fotos FOR DELETE
USING (auth.uid() = user_id);
```

---

## 📋 ETAPA 6: Testar Policies

### Teste 1: Verificar Isolation
```sql
-- Conectar como Usuário A e tentar ler dados do Usuário B
-- DEVE RETORNAR VAZIO:
SELECT * FROM produtores WHERE user_id != auth.uid();
```

### Teste 2: Verificar Próprios Dados
```sql
-- Conectar como Usuário A e ler próprios dados
-- DEVE RETORNAR DADOS:
SELECT * FROM produtores WHERE user_id = auth.uid();
```

### Teste 3: Tentar Bypass
```sql
-- Tentar inserir dados com user_id diferente
-- DEVE FALHAR:
INSERT INTO produtores (user_id, nome) 
VALUES ('outro-user-id', 'Teste Hack');
```

---

## 📋 ETAPA 7: Auditoria de Secrets

### Locais Críticos para Verificar
```bash
# 1. Verificar .env e .env.local
grep -r "SUPABASE" .env* 2>/dev/null

# 2. Verificar código React/TypeScript
grep -r "supabaseUrl" src/ components/ utils/ 2>/dev/null
grep -r "supabaseKey" src/ components/ utils/ 2>/dev/null
grep -r "anon.*key" src/ components/ utils/ 2>/dev/null

# 3. Verificar se há keys hardcoded
grep -r "eyJ" . --include="*.tsx" --include="*.ts" 2>/dev/null
```

### ✅ Padrão Seguro
```typescript
// ✅ CORRETO - usar variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// ❌ ERRADO - nunca hardcode
const supabaseUrl = "https://xyz.supabase.co"; // ❌
const supabaseAnonKey = "eyJhbGc..."; // ❌
```

### 🔄 Se Encontrar Secrets Expostos
1. **ROTACIONAR IMEDIATAMENTE** no Supabase Dashboard
2. Atualizar `.env` com novas keys
3. Adicionar `.env*` ao `.gitignore`
4. Fazer commit sem as keys antigas
5. Resetar project keys no Supabase (Settings > API)

---

## 📋 ETAPA 8: Configurar Storage Policies (Fotos/Arquivos)

```sql
-- Bucket: fotos
-- Policy: Usuário só acessa suas próprias fotos
CREATE POLICY "Users can view own photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'fotos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload own photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'fotos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'fotos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 📋 ETAPA 9: Validação Final

### Checklist de Validação
- [ ] Todas as tabelas sensíveis têm RLS = ON
- [ ] Policies criadas para SELECT, INSERT, UPDATE, DELETE
- [ ] Testado isolation entre usuários
- [ ] Storage policies configuradas
- [ ] Nenhum secret hardcoded no código
- [ ] `.env` no `.gitignore`
- [ ] Documentação de policies atualizada

### Query de Validação Completa
```sql
-- Verificar status de RLS e policies
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled,
  (
    SELECT count(*) 
    FROM pg_policies 
    WHERE schemaname = pt.schemaname 
    AND tablename = pt.tablename
  ) as policy_count
FROM pg_tables pt
WHERE schemaname = 'public'
ORDER BY tablename;
```

**✅ Resultado esperado:** Todas as tabelas com dados sensíveis devem ter:
- `rls_enabled = true`
- `policy_count >= 1` (idealmente 4: SELECT, INSERT, UPDATE, DELETE)

---

## 🚨 AÇÕES IMEDIATAS (EXECUTAR HOJE)

### 1. Rodar Script de Validação
```bash
# Criar arquivo: check-rls.sql
# Copiar query de validação acima
# Executar no SQL Editor do Supabase
```

### 2. Habilitar RLS em Tabelas Críticas
```sql
-- Executar para TODAS as tabelas sensíveis
ALTER TABLE produtores ENABLE ROW LEVEL SECURITY;
ALTER TABLE relatorios ENABLE ROW LEVEL SECURITY;
ALTER TABLE mapas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pragas ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
```

### 3. Criar Policies Básicas
```sql
-- Usar os templates acima para cada tabela
-- Priorizar: produtores, relatorios, mapas, pragas
```

### 4. Testar com Usuário Real
```bash
# Login como usuário de teste
# Verificar se consegue ver apenas próprios dados
# Tentar acessar dados de outro usuário (deve falhar)
```

---

## 📞 Contato em Caso de Dúvida

- **Documentação Supabase RLS:** https://supabase.com/docs/guides/auth/row-level-security
- **Examples:** https://supabase.com/docs/guides/auth/row-level-security#examples

---

## ✅ Conclusão

Após completar este checklist:
- ✅ Zero data leaks entre usuários
- ✅ Compliance com LGPD/GDPR
- ✅ Segurança em camadas (frontend + backend)
- ✅ Auditável e testável

**Tempo estimado:** 4-8 horas para projeto completo
**Próximo passo:** Implementar CI/CD com security scanning automatizado
