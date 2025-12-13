# 📋 Pull Request - SoloForte

## 📝 Descrição
<!-- Descreva as mudanças realizadas neste PR -->



## 🎯 Tipo de Mudança
<!-- Marque com 'x' os itens aplicáveis -->

- [ ] 🐛 Bug fix (correção de problema)
- [ ] ✨ Feature (nova funcionalidade)
- [ ] 💄 UI/UX (mudança visual/interface)
- [ ] ♻️ Refactor (reestruturação de código sem alterar comportamento)
- [ ] 🚀 Performance (melhoria de performance)
- [ ] 🔒 Security (correção de segurança)
- [ ] 📝 Docs (atualização de documentação)
- [ ] 🧪 Tests (adição ou correção de testes)
- [ ] 🔧 Chore (build, configs, dependências)

## 🔗 Issue Relacionada
<!-- Link para a issue que este PR resolve -->

Closes #

## 📸 Screenshots (se aplicável)
<!-- Adicione prints antes/depois para mudanças visuais -->

| Antes | Depois |
|-------|--------|
| ...   | ...    |

## ✅ Checklist de Qualidade

### 🧹 Código
- [ ] O código segue os padrões do projeto (ESLint/Prettier)
- [ ] Nomes de variáveis/funções são descritivos
- [ ] Código está comentado onde necessário
- [ ] Não há console.logs esquecidos (exceto logger)
- [ ] Não há código comentado desnecessário

### 🧪 Testes
- [ ] Testes unitários foram adicionados/atualizados
- [ ] Testes E2E foram adicionados (se necessário)
- [ ] Todos os testes passam localmente (`npm test`)
- [ ] Coverage está >= 80% (verificar com `npm test -- --coverage`)

### 🔒 Segurança
- [ ] **CRÍTICO:** Nenhum secret/key hardcoded no código
- [ ] Variáveis sensíveis estão em `.env` (não commitado)
- [ ] RLS/Policies do Supabase foram atualizadas (se aplicável)
- [ ] Inputs são validados e sanitizados
- [ ] Não há vulnerabilidades conhecidas (`npm audit`)

### 🚀 Performance
- [ ] Componentes React otimizados (memo, useCallback, useMemo)
- [ ] Imagens otimizadas (WebP/AVIF, lazy loading)
- [ ] Não há re-renders desnecessários
- [ ] Bundle size não aumentou significativamente
- [ ] Lighthouse score >= 88 (mobile)

### 📱 Mobile/Responsividade
- [ ] Testado em viewport mobile (375px)
- [ ] Testado em viewport tablet (768px)
- [ ] Bloqueio desktop funciona corretamente (>= 768px)
- [ ] Touch targets >= 44x44px
- [ ] Acessível ao polegar (bottom action bar)

### ♿ Acessibilidade
- [ ] Contraste de cores adequado (WCAG AA)
- [ ] Elementos focáveis com outline visível
- [ ] Labels em inputs e botões
- [ ] Imagens têm alt text
- [ ] Navegação por teclado funciona

### 📝 Documentação
- [ ] README atualizado (se necessário)
- [ ] Comentários JSDoc em funções complexas
- [ ] CHANGELOG atualizado (se mudança significativa)
- [ ] Tipos TypeScript bem definidos

## 🧪 Como Testar

### Passos para Reproduzir
1. 
2. 
3. 

### Resultado Esperado
<!-- O que deve acontecer após as mudanças -->



## 📊 Métricas

### Performance (antes → depois)
- **Lighthouse Performance:** __%  → __%
- **Bundle size:** ___KB → ___KB
- **First Contentful Paint:** ___ms → ___ms

### Cobertura de Testes
- **Coverage anterior:** __%
- **Coverage atual:** __%

## ⚠️ Breaking Changes
<!-- Liste qualquer mudança que quebra compatibilidade -->

- [ ] Não há breaking changes
- [ ] Há breaking changes (descreva abaixo):


## 🔍 Revisão de Segurança

### Self-Review Checklist
- [ ] Rodei `./SCRIPT_SCAN_SECRETS.sh` (sem alertas)
- [ ] Verifiquei que não há `.env` commitado
- [ ] Confirmo que uso `import.meta.env.VITE_*` para env vars
- [ ] RLS policies foram testadas (se aplicável)
- [ ] Armazenamento seguro usado para tokens/keys (se aplicável)

## 📦 Dependências
<!-- Liste novas dependências adicionadas -->

- [ ] Nenhuma dependência nova
- [ ] Dependências adicionadas (liste abaixo):


## 🎯 Próximos Passos (Pós-Merge)
<!-- O que precisa ser feito após o merge -->

- [ ] Deploy para staging
- [ ] Testar em dispositivos reais
- [ ] Monitorar Sentry por 24h
- [ ] Atualizar documentação externa

---

## 📝 Notas Adicionais
<!-- Qualquer informação adicional relevante -->



---

**Reviewers:** Por favor verificar especialmente:
- [ ] 🔒 Segurança (secrets, RLS, validações)
- [ ] 🚀 Performance (Lighthouse, bundle size)
- [ ] 📱 Mobile UX (responsividade, ergonomia)
- [ ] ✅ Qualidade do código (clean code, tipos)

/cc @seu-time-aqui
