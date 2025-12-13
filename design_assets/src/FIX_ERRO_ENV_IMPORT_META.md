# 🔧 FIX - ERRO import.meta.env undefined

**Erro:** `TypeError: Cannot read properties of undefined (reading 'VITE_SUPABASE_PROJECT_ID')`  
**Causa:** Servidor não foi reiniciado após criar .env  
**Status:** ✅ CORREÇÃO IMPLEMENTADA

---

## 🎯 SOLUÇÃO RÁPIDA (30 segundos)

```bash
# 1. Pare o servidor
# Pressione: Ctrl+C

# 2. Limpe o cache do Vite (opcional, mas recomendado)
rm -rf node_modules/.vite

# 3. Reinicie o servidor
npm run dev

# 4. Recarregue a página no navegador
# Pressione: Ctrl+R ou F5
```

**Pronto!** O erro deve desaparecer.

---

## 🔍 DIAGNÓSTICO COMPLETO

### Passo 1: Verificar se .env existe

```bash
ls -la .env
```

**Resultado esperado:**
```
-rw------- 1 user user 500 Oct 31 10:00 .env
```

**Se não existir:**
```bash
cp .env.example .env
nano .env  # Preencher com suas credenciais
```

---

### Passo 2: Verificar conteúdo do .env

```bash
cat .env
```

**Deve conter (formato correto):**
```env
VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA
```

**❌ ERRADO (não funciona):**
```env
# Espaços ao redor do =
VITE_SUPABASE_PROJECT_ID = fqnbtglzrxkgoxhndsum

# Aspas desnecessárias
VITE_SUPABASE_ANON_KEY="eyJhbGci..."

# Comentário inline
VITE_SUPABASE_PROJECT_ID=abc123 # meu projeto
```

**✅ CORRETO:**
```env
VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

---

### Passo 3: Verificar localização do .env

O arquivo `.env` DEVE estar na **raiz do projeto**, não em subpastas:

```
✅ CORRETO:
/
├── .env          ← AQUI!
├── package.json
├── App.tsx
└── utils/
    └── supabase/
        └── info.tsx

❌ ERRADO:
/
├── package.json
├── App.tsx
└── utils/
    ├── .env      ← NÃO AQUI!
    └── supabase/
        └── info.tsx
```

---

### Passo 4: Reiniciar o servidor

**IMPORTANTE:** O Vite **NÃO** recarrega variáveis de ambiente automaticamente!

```bash
# Parar servidor
Ctrl+C

# Opcional: Limpar cache do Vite
rm -rf node_modules/.vite

# Reiniciar
npm run dev
```

---

### Passo 5: Verificar no console do navegador

Após reiniciar, abra o console (F12) e procure por:

**✅ Sucesso:**
```
✅ Supabase credentials loaded from environment variables
   Project ID: fqnbtglz...
   Anon Key: eyJhbGci...
```

**❌ Erro:**
```
🔴 ERRO CRÍTICO: import.meta.env não está disponível!
```

Se ver o erro, volte ao Passo 1.

---

## 🐛 PROBLEMAS COMUNS

### Problema 1: "import.meta.env is undefined"

**Causa:** Servidor não foi reiniciado  
**Solução:**
```bash
# Parar (Ctrl+C) e reiniciar
npm run dev
```

---

### Problema 2: "VITE_SUPABASE_PROJECT_ID is undefined"

**Causa:** Variável não está no .env ou tem nome errado  
**Solução:**
```bash
# Verificar .env
cat .env | grep VITE_SUPABASE

# Deve mostrar:
# VITE_SUPABASE_PROJECT_ID=...
# VITE_SUPABASE_ANON_KEY=...
```

**Atenção:** Variáveis DEVEM começar com `VITE_` para serem expostas ao frontend!

---

### Problema 3: Cache do Vite corrompido

**Causa:** Cache antigo com valores incorretos  
**Solução:**
```bash
# Limpar cache
rm -rf node_modules/.vite

# Reiniciar
npm run dev
```

---

### Problema 4: .env não está sendo lido

**Causa:** Arquivo com encoding errado ou BOM  
**Solução:**
```bash
# Recriar .env
rm .env
cp .env.example .env

# Editar com editor simples (sem formatação)
nano .env
```

---

## 🔬 TESTE DE VALIDAÇÃO

Execute este comando para validar tudo:

```bash
node scripts/validate-env.js
```

**Resultado esperado:**
```
🔒 VALIDADOR DE VARIÁVEIS DE AMBIENTE - SOLOFORTE

✅ Arquivo .env encontrado
✅ .env está no .gitignore
✅ Permissões do .env estão seguras
✅ VITE_SUPABASE_PROJECT_ID: fqnbtglz...
✅ VITE_SUPABASE_ANON_KEY: eyJhbGci...
✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!
```

---

## 📝 CHECKLIST DE VERIFICAÇÃO

```markdown
- [ ] .env existe na raiz do projeto
- [ ] .env contém VITE_SUPABASE_PROJECT_ID
- [ ] .env contém VITE_SUPABASE_ANON_KEY
- [ ] Formato correto (sem espaços, sem aspas)
- [ ] .env está no .gitignore
- [ ] Servidor foi reiniciado (Ctrl+C + npm run dev)
- [ ] Cache do Vite foi limpo (rm -rf node_modules/.vite)
- [ ] Página foi recarregada (F5)
- [ ] Console mostra "credentials loaded"
- [ ] App está funcionando
```

---

## 🚀 SOLUÇÃO AUTOMATIZADA

Use o script automatizado:

```bash
# Tornar executável
chmod +x EXECUTAR_P0_CREDENCIAIS.sh

# Executar
./EXECUTAR_P0_CREDENCIAIS.sh
```

O script irá:
1. ✅ Verificar/criar .env
2. ✅ Validar formato
3. ✅ Verificar .gitignore
4. ✅ Instruir sobre reiniciar servidor

---

## 💡 DICA PRO

Adicione ao seu `.bashrc` ou `.zshrc`:

```bash
# Alias para reiniciar com limpeza de cache
alias dev-clean="rm -rf node_modules/.vite && npm run dev"
```

Uso:
```bash
dev-clean  # Limpa cache e reinicia
```

---

## 📞 SE NADA FUNCIONAR

### Opção 1: Verificação Manual Completa

```bash
# 1. Verificar estrutura
pwd  # Deve estar na raiz do projeto
ls -la .env  # Deve existir

# 2. Verificar conteúdo
cat .env

# 3. Verificar se variáveis estão corretas
cat .env | grep VITE_

# 4. Matar TODOS os processos Node
pkill -9 node

# 5. Limpar TUDO
rm -rf node_modules/.vite
rm -rf dist

# 6. Reinstalar (se necessário)
npm install

# 7. Reiniciar
npm run dev
```

---

### Opção 2: Criar .env do Zero

```bash
# 1. Backup do antigo
mv .env .env.backup

# 2. Criar novo
cat > .env << 'EOF'
VITE_SUPABASE_PROJECT_ID=fqnbtglzrxkgoxhndsum
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbmJ0Z2x6cnhrZ294aG5kc3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTUwNDgsImV4cCI6MjA2NjUzMTA0OH0.pgFCyS_fn2nlmokmEVzECgBx8PyhHwLUsL86tFSzGPA
NODE_ENV=development
EOF

# 3. Verificar
cat .env

# 4. Reiniciar
npm run dev
```

---

### Opção 3: Verificar Vite Config

Se o erro persistir, pode ser problema no `vite.config.ts`:

```bash
# Verificar se existe
cat vite.config.ts

# Deve conter:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Não precisa configurar envPrefix, 'VITE_' é o padrão
})
```

---

## ✅ CORREÇÃO IMPLEMENTADA

O código foi atualizado com:

1. ✅ Verificação robusta de `import.meta.env`
2. ✅ Mensagens de erro claras e acionáveis
3. ✅ Instruções passo a passo no console
4. ✅ Fallback seguro
5. ✅ Logs informativos

**Agora, quando o erro ocorrer, você verá instruções claras no console.**

---

## 📚 REFERÊNCIAS

- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vite Config](https://vitejs.dev/config/)
- [Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)

---

**TL;DR:**
```bash
# Parar servidor
Ctrl+C

# Limpar cache
rm -rf node_modules/.vite

# Reiniciar
npm run dev

# Recarregar página
F5
```

Pronto! 🎉
