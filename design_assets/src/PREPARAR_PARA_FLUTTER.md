# 🚀 PREPARAÇÃO PARA FLUTTER - SOLOFORTE

## 🎯 Objetivo
Limpar código React/TypeScript removendo complexidade de backend, mantendo apenas UI/UX pura para facilitar conversão para Flutter.

## ✅ Mudanças Aplicadas

### 1. **Simplificação de Autenticação**
- ✅ Removida verificação `canEditCase` - botões sempre visíveis (Marketing.tsx)
- ✅ Login.tsx simplificado - mock auth com localStorage
- ✅ Cadastro.tsx simplificado - mock auth com localStorage
- ✅ EsqueciSenha.tsx simplificado - mock de envio de email
- ✅ Removido middleware `useSupabaseSafeQuery`

### 2. **Eliminação de Backend Complexo**
- ✅ Removido `utils/offlineDB.ts` (IndexedDB)
- ✅ Removido `utils/hooks/useOfflineSync.ts`
- ✅ Removido `utils/security/rate-limiter.ts`
- ✅ Removido `utils/security/supabase-sanitizer.ts`
- ⏳ Remover chamadas Supabase restantes nos componentes

### 3. **Hooks Simplificados**
- ⏳ `usePestScanner.ts` - remover GPT-4 Vision, usar apenas mock
- ⏳ `useCheckIn.ts` - remover persistência Supabase
- ⏳ `useMapShapes.ts` - remover sync com `public.talhoes`
- ⏳ `useDemo.ts` - manter (já é mock)

### 4. **Componentes Mantidos (Visual)**
- ✅ Todos os componentes UI em `/components`
- ✅ Todos os componentes shadcn/ui
- ✅ Estilos globais
- ✅ Constantes de design

### 5. **Arquivos para DELETAR**
```
/utils/supabase/client.ts
/utils/supabase/client-cookies.ts
/utils/hooks/useSupabaseSafeQuery.ts
/utils/offlineDB.ts (IndexedDB)
/utils/hooks/useOfflineSync.ts
/utils/security/rate-limiter.ts
/utils/security/supabase-sanitizer.ts
/scripts/migrate-to-cookies.sh
/scripts/security-audit.sh
```

### 6. **Arquivos para SIMPLIFICAR**
```
/components/Login.tsx - remover Supabase
/components/Cadastro.tsx - remover Supabase
/components/EsqueciSenha.tsx - remover Supabase
/utils/hooks/usePestScanner.ts - mock apenas
/utils/hooks/useCheckIn.ts - localStorage apenas
/utils/hooks/useMapShapes.ts - localStorage apenas
```

## 📦 Estrutura Final Desejada

```
/components/          ✅ MANTER (UI pura)
/components/ui/       ✅ MANTER (shadcn)
/components/pages/    ✅ MANTER (páginas)
/components/shared/   ✅ MANTER (componentes reutilizáveis)
/styles/             ✅ MANTER (CSS global)
/utils/constants.ts  ✅ MANTER (constantes)
/utils/hooks/        ⚠️ SIMPLIFICAR (remover Supabase)
/utils/storage/      ⚠️ SIMPLIFICAR (localStorage apenas)
```

## 🎨 Design System Mantido
- Cores: `#0057FF` (azul principal)
- Typography: tokens em `styles/globals.css`
- Spacing: grid 4px
- Components: shadcn/ui completo
- Icons: lucide-react
- Charts: recharts

## 🔄 Próximos Passos

1. **Deletar arquivos backend** (Supabase, IndexedDB)
2. **Simplificar Login/Cadastro** (mock de autenticação)
3. **Simplificar hooks** (remover chamadas API)
4. **Testar visual** (garantir que nada quebrou)
5. **Exportar documentação** para Flutter team

## 🎯 Resultado Esperado
Código 100% visual, sem dependências de backend, pronto para:
- Designer modificar UI sem quebrar
- Equipe Flutter replicar visual exato
- Deploy como protótipo funcional (demo)