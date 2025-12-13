# 📋 Sprint Backlog Priorizado - SoloForte Auditoria 2025

**Data:** 28 de Outubro de 2025  
**Baseado em:** AUDITORIA_TECNICA_COMPLETA_REVISAO.md

---

## 🚨 SPRINT 1: CRÍTICO - SEGURANÇA IMEDIATA (1-2 dias)

### Issue #1: 🔒 Auditoria e Rotação de Secrets
**Prioridade:** 🔴 **CRÍTICA**  
**Tempo estimado:** 2-4 horas  
**Responsável:** DevOps + Security Lead

**Descrição:**
Executar scan completo do repositório para detectar secrets hardcoded e rotacionar imediatamente qualquer credencial exposta.

**Tarefas:**
- [ ] Rodar `./SCRIPT_SCAN_SECRETS.sh` no repositório
- [ ] Revisar manualmente todos os alertas críticos
- [ ] Identificar todos os secrets expostos (Supabase keys, API tokens, JWT)
- [ ] Rotacionar imediatamente no Supabase Dashboard (Settings > API)
- [ ] Atualizar `.env.example` com placeholders
- [ ] Adicionar `.env*` ao `.gitignore` (se ainda não está)
- [ ] Fazer commit SEM as credenciais antigas
- [ ] Documentar processo de rotação em `SECURITY_PROCEDURES.md`

**Critérios de Aceitação:**
- ✅ 0 secrets hardcoded no código
- ✅ Todas as keys rotacionadas (se necessário)
- ✅ `.env` não está no git history recente
- ✅ Script de scan passa sem erros críticos

**Riscos:**
- 🚨 Se houver keys expostas publicamente, sistema pode estar comprometido
- ⚠️ Rotação pode quebrar ambiente de dev temporariamente

---

### Issue #2: 🛡️ Habilitar Row Level Security (RLS) no Supabase
**Prioridade:** 🔴 **CRÍTICA**  
**Tempo estimado:** 4-8 horas  
**Responsável:** Backend Lead + DBA

**Descrição:**
Habilitar RLS em todas as tabelas sensíveis do Supabase e criar policies para evitar data leaks entre usuários.

**Tarefas:**
- [ ] Seguir `SECURITY_CHECKLIST_RLS_SUPABASE.md`
- [ ] Executar query de inventário de tabelas
- [ ] Habilitar RLS em: `produtores`, `relatorios`, `mapas`, `pragas`, `fotos`, `checkin`, `chat_messages`
- [ ] Criar policies de SELECT, INSERT, UPDATE, DELETE para cada tabela
- [ ] Criar policies de Storage para bucket `fotos`
- [ ] Testar isolation entre usuários (user A não vê dados de user B)
- [ ] Testar acesso próprio (user A vê seus dados)
- [ ] Documentar policies criadas
- [ ] Validar com query final de verificação

**Critérios de Aceitação:**
- ✅ 100% das tabelas sensíveis com RLS = ON
- ✅ Policies testadas e funcionando
- ✅ Usuário A não consegue acessar dados de Usuário B
- ✅ Queries de validação passam

**Riscos:**
- ⚠️ Policies mal configuradas podem bloquear usuários legítimos
- ⚠️ Migração de dados existentes pode ter inconsistências

---

### Issue #3: ✅ PR Checklist e Templates
**Prioridade:** 🟡 **ALTA**  
**Tempo estimado:** 1 hora  
**Responsável:** Tech Lead

**Descrição:**
Configurar templates de PR com checklist de segurança obrigatório.

**Tarefas:**
- [ ] Usar template criado em `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] Configurar Branch Protection no GitHub (require PR reviews)
- [ ] Adicionar CODEOWNERS para áreas críticas (`utils/supabase/*`, `*.env*`)
- [ ] Testar template criando PR de teste
- [ ] Comunicar time sobre novo processo

**Critérios de Aceitação:**
- ✅ Todo PR usa template automaticamente
- ✅ Branch `main` protegida (require 1+ approvals)
- ✅ CODEOWNERS configurado

---

## 🔥 SPRINT 2: ALTA PRIORIDADE - CI/CD & AUTOMAÇÃO (1-2 semanas)

### Issue #4: 🤖 Configurar GitHub Actions CI Pipeline
**Prioridade:** 🟡 **ALTA**  
**Tempo estimado:** 1 dia  
**Responsável:** DevOps

**Descrição:**
Implementar pipeline de CI/CD com lint, tests, security scans e build automatizado.

**Tarefas:**
- [ ] Usar workflow `.github/workflows/ci-security-performance.yml`
- [ ] Configurar secrets no GitHub (SNYK_TOKEN, CODECOV_TOKEN)
- [ ] Testar cada job individualmente
- [ ] Configurar Dependabot (`.github/dependabot.yml`)
- [ ] Configurar status checks obrigatórios no GitHub
- [ ] Documentar processo de CI em README

**Jobs do Pipeline:**
1. ✅ Lint (ESLint + Prettier)
2. 🔒 Security Scan (Trufflehog + npm audit + custom script)
3. 🧪 Tests (Jest + Coverage >= 80%)
4. 🏗️ Build (Vite production)
5. 🚦 Lighthouse CI (Performance >= 88)
6. 🎭 E2E Tests (Cypress - opcional)
7. 📱 Mobile Build Check (Capacitor sync)

**Critérios de Aceitação:**
- ✅ Pipeline rodando em PRs e pushes
- ✅ Todos os jobs passando
- ✅ Lighthouse score >= 88 mantido
- ✅ Status checks bloqueando merges com falhas

**Riscos:**
- ⚠️ Lighthouse pode falhar em CI (networking issues)
- ⚠️ Coverage pode estar abaixo de 80% inicialmente

---

### Issue #5: 📊 Configurar Lighthouse CI Monitoring
**Prioridade:** 🟡 **ALTA**  
**Tempo estimado:** 4 horas  
**Responsável:** Frontend Lead

**Descrição:**
Configurar Lighthouse CI para monitorar performance em cada PR e prevenir regressões.

**Tarefas:**
- [ ] Usar `.lighthouserc.json` configurado
- [ ] Integrar Lighthouse no workflow de CI
- [ ] Configurar budgets de performance (FCP < 2s, LCP < 3s)
- [ ] Adicionar comment no PR com scores
- [ ] Criar dashboard no Lighthouse Server (opcional)
- [ ] Documentar interpretação de métricas

**Critérios de Aceitação:**
- ✅ Lighthouse roda em todo PR
- ✅ Comentário automático com scores
- ✅ Performance >= 88 (mobile)
- ✅ Alerts se score cair abaixo de threshold

**Riscos:**
- ⚠️ CI runners podem ter variação de performance
- ⚠️ Lighthouse pode ser lento (aumenta tempo de CI)

---

### Issue #6: 🔐 Dependency Scanning & Updates
**Prioridade:** 🟡 **ALTA**  
**Tempo estimado:** 2 horas  
**Responsável:** DevOps

**Descrição:**
Configurar Dependabot e SCA (Software Composition Analysis) para alertas de vulnerabilidades.

**Tarefas:**
- [ ] Criar `.github/dependabot.yml`
- [ ] Habilitar Dependabot Alerts no GitHub
- [ ] Configurar Snyk (ou GitHub Advanced Security)
- [ ] Revisar vulnerabilidades atuais (`npm audit`)
- [ ] Criar processo de review de PRs do Dependabot
- [ ] Agendar updates semanais

**Critérios de Aceitação:**
- ✅ Dependabot criando PRs de updates
- ✅ SCA scans rodando em CI
- ✅ 0 vulnerabilidades HIGH/CRITICAL
- ✅ Processo documentado

---

## ⚙️ SPRINT 3: MÉDIA PRIORIDADE - QUALIDADE & TESTES (2-6 semanas)

### Issue #7: 🧪 Aumentar Cobertura de Testes para >= 80%
**Prioridade:** 🟢 **MÉDIA**  
**Tempo estimado:** 2 semanas  
**Responsável:** QA + Dev Team

**Descrição:**
Escrever testes unitários e de integração para atingir meta de 80% de coverage.

**Tarefas:**
- [ ] Audit de coverage atual (`npm test -- --coverage`)
- [ ] Priorizar módulos críticos (auth, mapas, relatórios, pragas)
- [ ] Escrever unit tests para utils e hooks
- [ ] Escrever integration tests para componentes principais
- [ ] Configurar coverage threshold em `package.json`
- [ ] Bloquear merges com coverage < 80%

**Módulos Prioritários:**
1. 🔐 `utils/supabase/client.ts` (auth, RLS)
2. 🗺️ `components/MapTilerComponent.tsx` (mapas)
3. 📝 `components/Relatorios.tsx` (relatórios)
4. 🐛 `components/PestScanner.tsx` (scanner de pragas)
5. 💾 `utils/storage/capacitor-storage.ts` (storage seguro)

**Critérios de Aceitação:**
- ✅ Coverage >= 80% (lines, statements, branches)
- ✅ Testes passando consistentemente
- ✅ CI bloqueando merges abaixo de threshold
- ✅ Documentação de testes atualizada

---

### Issue #8: 🎭 Implementar E2E Tests (Cypress)
**Prioridade:** 🟢 **MÉDIA**  
**Tempo estimado:** 1 semana  
**Responsável:** QA Lead

**Descrição:**
Criar suíte de testes E2E para fluxos críticos do usuário.

**Tarefas:**
- [ ] Instalar e configurar Cypress (`npm install -D cypress`)
- [ ] Criar `cypress.config.ts`
- [ ] Escrever testes para fluxos críticos
- [ ] Integrar Cypress no CI workflow
- [ ] Configurar visual regression testing (Percy - opcional)
- [ ] Documentar processo de E2E testing

**Fluxos Críticos para Testar:**
1. 🔐 Login/Logout
2. 📝 Criar novo relatório
3. 🗺️ Salvar mapa offline
4. 🐛 Scan de praga + foto + salvamento
5. 📍 Criar pin no mapa
6. 📊 Visualizar dashboard executivo

**Critérios de Aceitação:**
- ✅ 6+ fluxos críticos testados
- ✅ E2E tests passando em CI
- ✅ Videos/screenshots salvos em falhas
- ✅ Testes rodando em < 10 minutos

---

### Issue #9: 📦 Otimização de Bundle Size
**Prioridade:** 🟢 **MÉDIA**  
**Tempo estimado:** 3 dias  
**Responsável:** Frontend Lead

**Descrição:**
Reduzir bundle size através de code-splitting, tree-shaking e lazy loading.

**Tarefas:**
- [ ] Analisar bundle atual (`npx vite-bundle-visualizer`)
- [ ] Implementar lazy loading em rotas pesadas
- [ ] Implementar code-splitting em componentes grandes
- [ ] Remover dependências não utilizadas
- [ ] Otimizar imports (named imports vs default)
- [ ] Configurar performance budgets no Lighthouse

**Alvos de Otimização:**
- Leaflet (lazy load apenas quando necessário)
- Chart libraries (Recharts - code split)
- Shadcn/UI (apenas componentes usados)
- Imagens (WebP conversion + lazy loading)

**Critérios de Aceitação:**
- ✅ Bundle inicial < 200KB (gzip)
- ✅ First Contentful Paint < 2s
- ✅ Time to Interactive < 3.5s
- ✅ Lighthouse Performance >= 90

---

### Issue #10: 🖼️ Otimização de Imagens (WebP/AVIF)
**Prioridade:** 🟢 **MÉDIA**  
**Tempo estimado:** 2 dias  
**Responsável:** Frontend Dev

**Descrição:**
Converter todas as imagens para formatos modernos e implementar lazy loading.

**Tarefas:**
- [ ] Audit de imagens atuais (formato, tamanho)
- [ ] Converter PNG/JPG para WebP (fallback JPG)
- [ ] Implementar `<picture>` com srcset
- [ ] Configurar Vite plugin para otimização automática
- [ ] Implementar lazy loading com Intersection Observer
- [ ] Adicionar loading="lazy" em todas as imagens
- [ ] Configurar responsive images (srcset)

**Critérios de Aceitação:**
- ✅ 100% imagens em WebP (com fallback)
- ✅ Lazy loading implementado
- ✅ Imagens responsivas (srcset)
- ✅ Lighthouse "Properly size images" passa

---

## 🔮 SPRINT 4: BAIXA PRIORIDADE - MELHORIAS CONTÍNUAS (6+ semanas)

### Issue #11: 🎯 Implementar Feature Flags
**Prioridade:** 🔵 **BAIXA**  
**Tempo estimado:** 3 dias  
**Responsável:** Backend Lead

**Descrição:**
Implementar sistema de feature flags para releases graduais e A/B testing.

**Tarefas:**
- [ ] Escolher solução (LaunchDarkly vs custom)
- [ ] Integrar SDK no projeto
- [ ] Criar flags para features principais
- [ ] Implementar rollout canary (5% → 25% → 50% → 100%)
- [ ] Criar dashboard de feature flags
- [ ] Documentar processo de rollout

**Features para Flag:**
- Nova UI de radar de clima
- Sistema de chat suporte
- Dashboard executivo premium
- Modo offline expandido

**Critérios de Aceitação:**
- ✅ Sistema de flags funcionando
- ✅ Rollout granular possível
- ✅ Killswitch para features críticas
- ✅ Analytics de uso de features

---

### Issue #12: 📈 Configurar Observability (Sentry + Logs)
**Prioridade:** 🔵 **BAIXA**  
**Tempo estimado:** 2 dias  
**Responsável:** DevOps

**Descrição:**
Implementar monitoramento de errors, performance e logs centralizados.

**Tarefas:**
- [ ] Configurar Sentry para frontend
- [ ] Configurar Sentry para Supabase Edge Functions
- [ ] Implementar performance tracing
- [ ] Configurar alertas (Slack/Email)
- [ ] Criar dashboards de métricas
- [ ] Implementar structured logging

**Métricas para Monitorar:**
- Error rate (por feature)
- Performance (LCP, FCP, TTI)
- API latency
- Offline/Online transitions
- Capacitor native errors

**Critérios de Aceitação:**
- ✅ Errors sendo capturados em Sentry
- ✅ Performance traces visíveis
- ✅ Alertas configurados
- ✅ Dashboards funcionais

---

### Issue #13: 📱 Armazenamento Seguro Mobile (Capacitor)
**Prioridade:** 🔵 **BAIXA**  
**Tempo estimado:** 2 dias  
**Responsável:** Mobile Dev

**Descrição:**
Migrar armazenamento de tokens para solução segura (Keychain/Keystore).

**Tarefas:**
- [ ] Instalar `@capacitor/secure-storage`
- [ ] Migrar tokens de localStorage para SecureStorage
- [ ] Implementar refresh token rotation
- [ ] Testar em iOS (Keychain)
- [ ] Testar em Android (Keystore)
- [ ] Documentar estratégia de storage

**Dados para Armazenar Seguramente:**
- Access tokens (Supabase)
- Refresh tokens
- User ID / session data
- API keys (se houver)

**Critérios de Aceitação:**
- ✅ Tokens não estão mais em localStorage
- ✅ SecureStorage funcionando em iOS/Android
- ✅ Tokens criptografados
- ✅ Logout limpa storage seguro

---

### Issue #14: 🧪 Testes de Mapas Offline (Estratégia de Cache)
**Prioridade:** 🔵 **BAIXA**  
**Tempo estimado:** 1 semana  
**Responsável:** Mobile + Backend

**Descrição:**
Implementar estratégia robusta de cache offline para mapas com LRU e quotas.

**Tarefas:**
- [ ] Definir quota de storage (ex: 500MB max)
- [ ] Implementar LRU eviction policy
- [ ] Testar integridade de tiles (checksums)
- [ ] Implementar compressão de tiles
- [ ] Criar UI para gerenciamento de cache
- [ ] Testar em dispositivos com storage limitado

**Estratégias a Considerar:**
- MBTiles (SQLite compactado)
- IndexedDB LRU com quotas
- Service Worker caching
- Differential updates (apenas tiles novos)

**Critérios de Aceitação:**
- ✅ Cache respeitando quota definida
- ✅ LRU eviction funcionando
- ✅ UI mostrando uso de storage
- ✅ Performance mantida (<50ms tile load)

---

### Issue #15: 🚀 Migração Flutter POC (Incremental)
**Prioridade:** 🔵 **BAIXA**  
**Tempo estimado:** 4-6 semanas  
**Responsável:** Flutter Team

**Descrição:**
Criar POC de 2-3 páginas críticas em Flutter para validar migração incremental.

**Tarefas:**
- [ ] Escolher 3 páginas para POC (ex: Mapas, Auth, Scanner)
- [ ] Configurar projeto Flutter com Clean Architecture
- [ ] Implementar DI (GetIt/Riverpod)
- [ ] Implementar state management (BLoC/Riverpod)
- [ ] Migrar telas escolhidas
- [ ] Testar performance (60fps, memory)
- [ ] Comparar bundle size (Flutter vs React)
- [ ] Documentar decisão Go/No-Go

**Critérios de Decisão:**
- ✅ Performance >= React version
- ✅ DX (Developer Experience) adequado
- ✅ Time tem expertise Flutter
- ✅ ROI justifica migração

---

## 📊 Métricas de Sucesso do Backlog

### Segurança
- 🎯 **0 secrets hardcoded** (Issue #1)
- 🎯 **100% tabelas com RLS** (Issue #2)
- 🎯 **0 vulnerabilidades HIGH/CRITICAL** (Issue #6)

### Qualidade
- 🎯 **Coverage >= 80%** (Issue #7)
- 🎯 **E2E tests para 6+ fluxos** (Issue #8)

### Performance
- 🎯 **Lighthouse >= 88** (Issue #5)
- 🎯 **Bundle < 200KB gzip** (Issue #9)
- 🎯 **FCP < 2s, LCP < 3s** (Issue #9)

### CI/CD
- 🎯 **Pipeline rodando em < 10 min** (Issue #4)
- 🎯 **100% PRs passando por CI** (Issue #4)

---

## 🗓️ Timeline Recomendada

```
Semana 1-2:   Sprint 1 (Segurança Crítica)
Semana 3-4:   Sprint 2 (CI/CD)
Semana 5-10:  Sprint 3 (Testes & Otimização)
Semana 11+:   Sprint 4 (Melhorias Contínuas)
```

---

## 📞 Próximos Passos

1. ✅ **HOJE:** Executar Issues #1 e #2 (Segurança)
2. ✅ **Esta semana:** Configurar CI (Issue #4)
3. ✅ **Próximas 2 semanas:** Lighthouse CI + Dependabot (Issues #5, #6)
4. ✅ **Próximo mês:** Aumentar coverage (Issue #7)

---

**Pronto para começar? Execute primeiro:**
```bash
# 1. Scan de secrets
./SCRIPT_SCAN_SECRETS.sh

# 2. Verificar RLS no Supabase
# (usar queries do SECURITY_CHECKLIST_RLS_SUPABASE.md)

# 3. Criar primeira PR com template novo
# (.github/PULL_REQUEST_TEMPLATE.md)
```
