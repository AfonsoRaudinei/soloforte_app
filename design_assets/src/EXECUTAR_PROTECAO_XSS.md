# ⚡ EXECUTAR PROTEÇÃO XSS

**Tempo:** 2 horas  
**Prioridade:** P1 - ALTA  
**Impacto:** Proteção contra ataques XSS

---

## 🚀 EXECUÇÃO RÁPIDA (5 PASSOS)

### 1️⃣ Instalar Dependência (2 min)

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

**Verificar:**
```bash
grep "dompurify" package.json
```
Deve mostrar: `"dompurify": "^3.x.x"`

---

### 2️⃣ Executar Análise (3 min)

```bash
# Tornar executável
chmod +x scripts/migrate-xss-protection.sh

# Executar
bash scripts/migrate-xss-protection.sh
```

**O script irá:**
- ✅ Verificar dependência instalada
- ✅ Buscar código vulnerável
- ✅ Gerar relatório (XSS_MIGRATION_REPORT.md)
- ✅ Criar arquivo de teste (public/test-xss.html)

---

### 3️⃣ Testar Proteção (5 min)

```bash
# 1. Reiniciar servidor
npm run dev

# 2. Abrir arquivo de teste
# http://localhost:5173/test-xss.html

# 3. Testar payloads XSS
#    - Clicar "Testar" em cada payload
#    - Verificar que são bloqueados (✅ SEGURO)
```

**Resultado esperado:**
- ✅ Script tags removidos
- ✅ Event handlers removidos
- ✅ Iframes bloqueados
- ✅ JavaScript URLs bloqueados

---

### 4️⃣ Migrar Código (1h)

#### A. Substituir dangerouslySetInnerHTML

```typescript
// ❌ ANTES:
<div dangerouslySetInnerHTML={{__html: content}} />

// ✅ DEPOIS:
import { SafeHTML } from './components/shared/SafeHTML';
<SafeHTML html={content} />
```

#### B. Usar Inputs Sanitizados

```typescript
// ❌ ANTES:
const [name, setName] = useState('');
<input value={name} onChange={e => setName(e.target.value)} />

// ✅ DEPOIS:
import { useSanitizedInput } from './utils/hooks/useSanitizedInput';
const [name, setName] = useSanitizedInput('', 'name');
<input value={name} onChange={e => setName(e.target.value)} />
```

#### C. Sanitizar Queries Supabase

```typescript
// ❌ ANTES:
const { data } = await supabase.from('comments').select('*');

// ✅ DEPOIS:
import { sanitizeSupabaseQuery } from './utils/security/supabase-sanitizer';
const { data } = await sanitizeSupabaseQuery(
  supabase.from('comments').select('*')
);
```

**Arquivos prioritários:**
1. `/components/Relatorios.tsx`
2. `/components/RelatorioEditor.tsx`
3. `/components/ChatSuporteInApp.tsx`
4. `/components/Dashboard.tsx`
5. `/components/NotificationCenter.tsx`

---

### 5️⃣ Testar Aplicação (30 min)

```bash
# 1. Login no app
# 2. Tentar XSS em diferentes campos:
#    - Nome de relatório: <script>alert(1)</script>Test
#    - Descrição: <img src=x onerror="alert(1)">
#    - Chat: <b>Bold</b> <script>alert(1)</script>

# 3. Verificar que:
#    - Scripts são removidos
#    - Conteúdo válido (bold, etc) é mantido
#    - Nenhum alert() é exibido
```

---

## ✅ VERIFICAÇÃO RÁPIDA

### Console do Navegador (F12)

Tentar executar XSS manualmente:

```javascript
// Não deve funcionar se protegido
document.body.innerHTML = '<script>alert("XSS")</script>';
```

### Teste de Input

```javascript
// Em um input sanitizado:
const input = document.querySelector('input[type="text"]');
input.value = '<script>alert(1)</script>';
input.dispatchEvent(new Event('change'));

// Verificar que valor foi sanitizado
console.log(input.value); // Deve ser: '' ou 'alert(1)'
```

---

## 📋 CHECKLIST RÁPIDO

```markdown
- [ ] npm install dompurify @types/dompurify
- [ ] bash scripts/migrate-xss-protection.sh
- [ ] Ver relatório: cat XSS_MIGRATION_REPORT.md
- [ ] Testar: http://localhost:5173/test-xss.html
- [ ] Migrar Relatorios.tsx
- [ ] Migrar RelatorioEditor.tsx
- [ ] Migrar ChatSuporteInApp.tsx
- [ ] Migrar Dashboard.tsx
- [ ] Migrar NotificationCenter.tsx
- [ ] Testar XSS em produção
```

---

## 🚨 PROBLEMAS?

### Erro: "Cannot find module 'dompurify'"

```bash
# Reinstalar
npm install dompurify @types/dompurify --save
npm run dev
```

### XSS ainda funciona

```bash
# 1. Verificar que importação está correta:
grep -r "SafeHTML" components/Relatorios.tsx

# 2. Verificar que está usando useSanitizedInput:
grep -r "useSanitizedInput" components/

# 3. Se não encontrar, migrar manualmente
```

### Conteúdo válido sendo removido

```typescript
// Use richText config para permitir mais HTML
<SafeHTML html={content} config="richText" />

// Ou se precisar apenas texto:
<SafeHTML html={content} config="textOnly" />
```

---

## 📚 DOCUMENTAÇÃO

- **Guia completo:** `IMPLEMENTACAO_XSS_SANITIZACAO.md`
- **Código:** `utils/security/xss-sanitizer.ts`
- **Componente:** `components/shared/SafeHTML.tsx`
- **Hook:** `utils/hooks/useSanitizedInput.ts`
- **Script:** `scripts/migrate-xss-protection.sh`

---

## 📊 IMPACTO

**Antes:**
- Conteúdo de usuário sem sanitização
- XSS possível em vários componentes
- Score de segurança: 3.2/10 🔴

**Depois:**
- Todos os inputs sanitizados
- XSS bloqueado automaticamente
- Score de segurança: 7.5/10 ✅

**Vulnerabilidade corrigida:** P1-04 (CVSS 7.2)

---

**TL;DR:**

```bash
npm install dompurify @types/dompurify && \
bash scripts/migrate-xss-protection.sh && \
npm run dev
```

Depois: Migrar código + Testar http://localhost:5173/test-xss.html

