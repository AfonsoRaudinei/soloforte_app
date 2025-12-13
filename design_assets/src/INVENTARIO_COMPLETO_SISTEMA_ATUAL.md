# 📊 Inventário Completo: Sistema Atual SoloForte

**Data:** 24 de Outubro de 2025  
**Total de Arquivos:** 205  
**Status:** Mapeamento Completo para Migração Flutter

---

## 📈 Resumo Executivo

```
┌─────────────────────────────────────────────────┐
│  CATEGORIA              │ ARQUIVOS │ MIGRAÇÃO   │
├─────────────────────────────────────────────────┤
│  📄 Documentação        │    90+   │ ❌ Não     │
│  🎨 Componentes         │    29    │ ✅ Sim     │
│  📄 Páginas             │     4    │ ✅ Sim     │
│  🔄 Shared              │    11    │ ✅ Sim     │
│  🎨 UI Shadcn           │    46    │ ⚠️ Nativo  │
│  🪝 Hooks               │    13    │ ✅ Sim     │
│  🔧 Backend             │     4    │ 🔒 Intacto │
│  ⚙️ Utilitários         │    13    │ ✅ Sim     │
│  🖼️ Figma               │     1    │ ✅ Sim     │
│  📁 Config              │     5    │ ⚠️ Flutter │
├─────────────────────────────────────────────────┤
│  TOTAL CÓDIGO PRODUÇÃO  │   126    │ Migrar     │
│  DOCUMENTAÇÃO           │    90+   │ Manter     │
│  TOTAL GERAL            │   205+   │            │
└─────────────────────────────────────────────────┘
```

**Legenda:**
- ✅ Sim: Migrado 1:1 para Flutter
- ⚠️ Nativo: Substituído por componentes nativos Flutter
- 🔒 Intacto: Backend não muda
- ❌ Não: Documentação permanece no React

---

## 📂 1. Documentação (90+ arquivos .md)

### Auditorias (10 arquivos)
```
AUDITORIA_AUTENTICACAO_HOOKS.md
AUDITORIA_CAPACITOR.md
AUDITORIA_COMPLETA_2025.md
AUDITORIA_COMPLETA_FINAL_2025.md
AUDITORIA_SISTEMA.md
RESUMO_AUDITORIA.md
RESUMO_AUDITORIA_CAPACITOR.md
RESUMO_EXECUTIVO_AUDITORIA.md
VERIFICACOES_CONDICIONAIS_AUDITORIA.md
VERIFICACOES_CONDICIONAIS_FINALIZADAS.md
```

### Guias de Features (25 arquivos)
```
GUIA_ALERTAS.md
GUIA_CHAT_SUPORTE.md
GUIA_CHECKIN.md
GUIA_COMPARACAO.md
GUIA_COMPLETAR_CORRECOES.md
GUIA_DASHBOARD_EXECUTIVO.md
GUIA_DESENHO.md
GUIA_ERROR_BOUNDARY.md
GUIA_EXECUCAO_FASES_2_3_4.md
GUIA_EXPORTACAO.md
GUIA_FAB_DINAMICO.md
GUIA_INTEGRACAO_PRODUTORES.md
GUIA_LIGHTHOUSE_MONITORING.md
GUIA_MAPAS_OFFLINE.md
GUIA_MIGRACAO_CAPACITOR.md
GUIA_PREFETCH_HOVER.md
GUIA_RAPIDO_MAPAS_OFFLINE.md
GUIA_RAPIDO_SCANNER_PRAGAS.md
GUIA_REACT_MEMO.md
GUIA_SKELETONS.md
NDVI_GUIDE.md
QUICK_START_CAPACITOR.md
QUICK_START_PERFORMANCE.md
QUICK_WINS_ADICIONAIS.md
SISTEMA_RASTREAMENTO_CRONOLOGICO.md
```

### Correções e Fixes (20 arquivos)
```
ANALISE_BUGS_CRITICOS.md
CORRECAO_CAMERA_DIALOG.md
CORRECAO_ERROS_AMBIENTE.md
CORRECAO_ERROS_AUTENTICACAO.md
CORRECAO_PREFETCH.md
CORRECOES_ERROS_BACKEND.md
CORRECOES_FASE_1_EXECUTADAS.md
CORRECOES_REALIZADAS.md
FIX_CAMERA_WEB_ERRORS.md
FIX_HOOK_NAVIGATION.md
FIX_MENUS_EXCLUSIVOS.md
FIX_PREFETCH_FINAL.md
FIX_REMOVER_OCORRENCIA_DUPLICADA.md
PROTECAO_FETCHWITAUTH_COMPLETA.md
PROTECAO_FETCHWITHAUTHATE.md
RESUMO_CORRECOES_CAMERA.md
RESUMO_FINAL_CAPACITOR.md
SCRIPT_OTIMIZACAO_FASE1.md
VERIFICACAO_MOBILE_COMPLETA.md
UNIFICACAO_SCANNER_PRAGAS.md
```

### Implementações e Features (15 arquivos)
```
IMPLEMENTACAO_CHAT_SUPORTE_COMPLETA.md
IMPLEMENTACAO_PREFETCH_HOVER.md
IMPLEMENTACAO_RAPIDA.md
MAPAS_OFFLINE_IMPLEMENTADO.md
DASHBOARD_EXECUTIVO_PREMIUM.md
REORGANIZACAO_MENU_SIMPLIFICADO.md
SIMPLIFICACAO_INTERFACE_MAPA.md
SISTEMA_VISUAL_MELHORADO.md
DESIGN_CLEAN_FINAL.md
CONFIRMACAO_100_MOBILE.md
OTIMIZACAO_MOBILE_FIRST.md
OTIMIZACOES_CONCLUIDAS.md
COMPARACAO_ANTES_DEPOIS.md
EXEMPLO_CODIGO_REFATORADO.md
VALIDACAO_AREAS.md
```

### Testes (10 arquivos)
```
TESTE_CHAT_RAPIDO.md
TESTE_LIGHTHOUSE_AUTOMATIZADO.md
TESTE_MEDICAO_AREAS.md
TESTE_PREFETCH.md
TESTE_PREFETCH_HOVER.md
TESTE_RASTREAMENTO_CRONOLOGICO.md
QUICK_TEST_PREFETCH.md
CHECKLIST_CAPACITOR.md
```

### Documentação Técnica (10 arquivos)
```
API_SETUP.md
CHANGELOG.md
CHANGELOG_AUDITORIA_2025.md
COMANDOS_CAPACITOR.md
COMO_USAR.md
INSTALL_CAPACITOR.md
README.md
INDICE_AUDITORIA_COMPLETA.md
INDICE_DOCUMENTACAO_PERFORMANCE.md
Attributions.md
```

### Performance (5 arquivos)
```
PERFORMANCE_DASHBOARD.md
LIGHTHOUSE_TRACKING.md
INTERPRETACAO_GRAFICOS.md
PROGRESSO_OTIMIZACAO.md
RESUMO_SISTEMA_PERFORMANCE.md
RESPOSTA_PERFORMANCE_MOBILE.md
```

### Planejamento (5 arquivos)
```
FASE1_COMPLETA.md
FASES_2_3_COMPLETAS.md
FASES_2_3_PLANO.md
PRD_MIGRACAO_FLUTTER_SEGURA.md
COMPARACAO_TECNICA_REACT_FLUTTER.md
```

**Observação:** Toda esta documentação **NÃO** será migrada para Flutter. Ela permanece como histórico do projeto React.

---

## 🎨 2. Componentes Principais (29 arquivos)

### Autenticação (3 arquivos)
```
Login.tsx              → login_page.dart
Cadastro.tsx           → signup_page.dart
EsqueciSenha.tsx       → forgot_password_page.dart
```

### Dashboard & Mapa (8 arquivos)
```
Dashboard.tsx          → dashboard_page.dart
Home.tsx               → home_page.dart
MapTilerComponent.tsx  → map_widget.dart
MapDrawing.tsx         → area_drawing_widget.dart
MapLayerSelector.tsx   → map_layer_selector.dart
MapButton.tsx          → map_button.dart
OfflineMapControls.tsx → offline_map_controls.dart
FloatingActionButton.tsx → fab_menu.dart
```

### Features Core (10 arquivos)
```
CheckInOut.tsx         → checkin_page.dart
PestScanner.tsx        → pest_scanner_page.dart
NDVIViewer.tsx         → ndvi_viewer_page.dart
Relatorios.tsx         → reports_page.dart
AlertasConfig.tsx      → alerts_config_page.dart
ChatSuporteInApp.tsx   → chat_page.dart
NotificationCenter.tsx → notification_center.dart
Clientes.tsx           → clients_page.dart
Feedback.tsx           → feedback_page.dart
```

### Configurações & Extras (5 arquivos)
```
Configuracoes.tsx      → settings_page.dart
ConfiguracoesNew.tsx   → settings_new_page.dart (consolidar)
Agenda.tsx             → agenda_page.dart
Clima.tsx              → weather_page.dart
RadarClima.tsx         → weather_radar_page.dart
```

### Utilitários UI (3 arquivos)
```
LazyImage.tsx          → CachedNetworkImage (package)
CameraCapture.tsx      → camera_service.dart
PerformanceMonitor.tsx → performance_observer.dart
PrefetchDebugger.tsx   → ❌ Remover (debug only)
```

**Total migrado:** 28 arquivos (1 removido)

---

## 📄 3. Páginas (4 arquivos)

```
components/pages/DashboardExecutivo.tsx    → lib/presentation/pages/executive/
                                              executive_dashboard_page.dart

components/pages/GestaoEquipes.tsx         → ⚠️ Deprecated (usar Premium)

components/pages/GestaoEquipesPremium.tsx  → lib/presentation/pages/team/
                                              team_management_page.dart

components/pages/PragasPage.tsx            → lib/presentation/pages/pests/
                                              pests_page.dart
```

**Total migrado:** 3 arquivos (1 deprecated removido)

---

## 🔄 4. Componentes Shared (11 arquivos)

### Error Handling (1 arquivo)
```
ErrorBoundary.tsx → error_boundary.dart
```

### Loading States (1 arquivo)
```
LoadingScreen.tsx → loading_screen.dart
```

### Skeletons (9 arquivos)
```
SkeletonAgenda.tsx      → skeleton_agenda.dart
SkeletonCard.tsx        → skeleton_card.dart
SkeletonClientes.tsx    → skeleton_clients.dart
SkeletonClima.tsx       → skeleton_weather.dart
SkeletonDashboard.tsx   → skeleton_dashboard.dart
SkeletonMap.tsx         → skeleton_map.dart
SkeletonNDVI.tsx        → skeleton_ndvi.dart
SkeletonRelatorios.tsx  → skeleton_reports.dart
index.ts                → N/A (exports)
```

**Flutter alternativa:** Package `shimmer` + componentes customizados

**Total migrado:** 10 arquivos

---

## 🎨 5. UI Components Shadcn (46 arquivos)

### Inputs (8 arquivos)
```
button.tsx       → ElevatedButton / TextButton (nativo)
input.tsx        → TextField (nativo)
textarea.tsx     → TextField multiline (nativo)
checkbox.tsx     → Checkbox (nativo)
switch.tsx       → Switch (nativo)
select.tsx       → DropdownButton (nativo)
slider.tsx       → Slider (nativo)
radio-group.tsx  → RadioListTile (nativo)
```

### Feedback (7 arquivos)
```
alert.tsx        → AlertDialog (nativo)
alert-dialog.tsx → AlertDialog (nativo)
dialog.tsx       → showDialog (nativo)
sheet.tsx        → BottomSheet (nativo)
drawer.tsx       → Drawer (nativo)
sonner.tsx       → SnackBar / toast package
tooltip.tsx      → Tooltip (nativo)
```

### Layout (8 arquivos)
```
card.tsx         → Card (nativo)
separator.tsx    → Divider (nativo)
accordion.tsx    → ExpansionPanel (nativo)
collapsible.tsx  → ExpansionTile (nativo)
tabs.tsx         → TabBar + TabBarView (nativo)
scroll-area.tsx  → SingleChildScrollView (nativo)
resizable.tsx    → SplitView (package re-resizable)
sidebar.tsx      → Drawer (nativo)
```

### Navigation (5 arquivos)
```
navigation-menu.tsx → NavigationBar (nativo)
menubar.tsx         → MenuBar (nativo)
breadcrumb.tsx      → Breadcrumbs widget
dropdown-menu.tsx   → PopupMenuButton (nativo)
context-menu.tsx    → PopupMenuButton (nativo)
```

### Data Display (10 arquivos)
```
table.tsx        → DataTable (nativo)
avatar.tsx       → CircleAvatar (nativo)
badge.tsx        → Badge / Chip (nativo)
skeleton.tsx     → Shimmer package
chart.tsx        → fl_chart package
calendar.tsx     → CalendarDatePicker (nativo)
progress.tsx     → LinearProgressIndicator (nativo)
carousel.tsx     → PageView / carousel_slider package
aspect-ratio.tsx → AspectRatio (nativo)
hover-card.tsx   → Tooltip / Card (nativo)
```

### Forms (5 arquivos)
```
form.tsx         → Form widget (nativo)
label.tsx        → Text / InputDecoration (nativo)
input-otp.tsx    → PinCodeTextField package
pagination.tsx   → PageView + indicators
toggle.tsx       → ToggleButtons (nativo)
toggle-group.tsx → ToggleButtons (nativo)
```

### Utilities (3 arquivos)
```
command.tsx      → SearchBar (nativo)
popover.tsx      → PopupMenuButton (nativo)
use-mobile.ts    → MediaQuery.of(context) (nativo)
utils.ts         → Helper functions
```

**REDUÇÃO:** 46 arquivos Shadcn → **0 arquivos** (tudo nativo Flutter)  
**Economia:** ~15KB de código UI customizado

---

## 🪝 6. Hooks Customizados (13 arquivos)

### Estado Global (5 arquivos)
```
useAuthStatus.ts       → auth_provider.dart (Riverpod)
useEquipes.ts          → team_provider.dart (Riverpod)
useProdutores.ts       → producers_provider.dart (Riverpod)
useChat.ts             → chat_provider.dart (Riverpod)
useNotifications.ts    → notifications_provider.dart (Riverpod)
```

### Features (5 arquivos)
```
useCheckIn.ts          → checkin_provider.dart (Riverpod)
usePestScanner.ts      → pest_scanner_provider.dart (Riverpod)
useAutomaticAlerts.ts  → alerts_provider.dart (Riverpod)
useAnalytics.ts        → analytics_service.dart (GetIt)
useDemo.ts             → demo_service.dart (GetIt)
```

### Utilitários (3 arquivos)
```
useStorage.ts          → storage_service.dart (GetIt)
useDebounce.ts         → debounce.dart (helper function)
usePrefetchLink.ts     → ❌ Não necessário em Flutter
```

**Total migrado:** 12 arquivos (1 não necessário)

**Conversão:**
- React Hooks → Riverpod Providers (8 arquivos)
- React Hooks → GetIt Services (3 arquivos)
- React Hooks → Helper functions (1 arquivo)

---

## 🔧 7. Backend (4 arquivos) - **INTACTO** 🔒

```
supabase/functions/server/index.tsx
- Hono web server (Deno)
- CORS configurado
- Logger integrado
- Rotas RESTful

supabase/functions/server/kv_store.tsx
- Key-Value storage wrapper
- CRUD operations (get, set, del, mget, mset, mdel, getByPrefix)
- Supabase PostgreSQL integration

supabase/functions/server/pest-scanner.ts
- GPT-4 Vision API integration
- Endpoint: /make-server-b2d55462/scan-pest
- Input: base64 image
- Output: pest identification + recommendations
- OpenAI API key via environment variable

supabase/functions/server/routes.tsx
- Route definitions
- Middleware configuration
- Error handling
```

**🔒 GARANTIA ABSOLUTA:**
- ✅ **ZERO mudanças** no código backend
- ✅ Flutter chamará **as MESMAS APIs REST**
- ✅ Apenas cliente HTTP diferente (Dio em vez de fetch)
- ✅ Mesmos headers, mesmos endpoints, mesma lógica

**Exemplo:**

**React (atual):**
```typescript
const response = await fetch(
  `${supabaseUrl}/functions/v1/make-server-b2d55462/scan-pest`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: base64Image }),
  }
);
```

**Flutter (equivalente):**
```dart
final response = await dio.post(
  '${supabaseUrl}/functions/v1/make-server-b2d55462/scan-pest',
  options: Options(
    headers: {
      'Authorization': 'Bearer $supabaseAnonKey',
      'Content-Type': 'application/json',
    },
  ),
  data: {'image': base64Image},
);
```

**Resultado:** Backend não sabe qual cliente está chamando (React ou Flutter).

---

## ⚙️ 8. Utilitários (13 arquivos)

### Temas & UI (1 arquivo)
```
ThemeContext.tsx → theme_provider.dart (Riverpod)
```

### Mapas (1 arquivo)
```
TileManager.ts → tile_cache_service.dart (flutter_map_tile_caching)
```

### Constantes (2 arquivos)
```
constants.ts        → app_constants.dart
constants-mobile.ts → app_constants.dart (consolidado)
```

### Configuração (1 arquivo)
```
environment.ts → .env + flutter_dotenv package
```

### Logging & Errors (2 arquivos)
```
logger.ts         → logger.dart (package logger)
errorReporting.ts → error_handler.dart + Crashlytics
```

### Business Logic (2 arquivos)
```
pestToOccurrence.ts → pest_to_occurrence.dart (helper)
prefetch.ts         → ❌ Não necessário (Flutter)
```

### Supabase (2 arquivos)
```
supabase/client.ts → supabase_client.dart
supabase/info.tsx  → app_constants.dart (merge)
```

### Capacitor Wrappers (2 arquivos)
```
camera/capacitor-camera.ts   → camera_service.dart (image_picker)
storage/capacitor-storage.ts → storage_service.dart (shared_preferences)
```

**Total migrado:** 11 arquivos (2 consolidados/removidos)

---

## 🖼️ 9. Figma Components (1 arquivo)

```
components/figma/ImageWithFallback.tsx
```

**Uso atual:**
- Carrega imagens com fallback
- Tratamento de erros
- Lazy loading

**Flutter equivalente:**
```dart
import 'package:cached_network_image/cached_network_image.dart';

CachedNetworkImage(
  imageUrl: url,
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
)
```

**Total:** 1 arquivo substituído por package

---

## 📁 10. Arquivos de Configuração (5 arquivos)

### React (atual)
```
App.tsx              # Entry point React
tailwind.config.js   # Tailwind CSS config
styles/globals.css   # CSS global (tipografia, cores)
types/index.ts       # TypeScript types
guidelines/Guidelines.md # Coding guidelines
```

### Flutter (substituído por)
```
lib/main.dart        # Entry point Flutter
lib/app.dart         # MaterialApp root
lib/core/theme/app_theme.dart     # Theme config (cores, tipografia)
lib/domain/entities/*.dart        # Type definitions
pubspec.yaml         # Dependencies
analysis_options.yaml # Linting rules
```

**Observação:** Design tokens do `globals.css` serão convertidos para `app_theme.dart`.

---

## 📊 11. Resumo da Migração

### Arquivos por Status

```
┌──────────────────────────────────────────────┐
│  STATUS              │ ARQUIVOS │ AÇÃO       │
├──────────────────────────────────────────────┤
│  ✅ Migrar 1:1       │    78    │ Traduzir   │
│  ⚠️ Substituir       │    46    │ Nativo     │
│  🔒 Intacto          │     4    │ Manter     │
│  ❌ Remover          │     3    │ Debug      │
│  📄 Documentação     │    90+   │ Arquivar   │
├──────────────────────────────────────────────┤
│  TOTAL CÓDIGO        │   131    │            │
│  TOTAL GERAL         │   205+   │            │
└──────────────────────────────────────────────┘
```

### Redução de Complexidade

**React + Capacitor:**
- 131 arquivos de código
- 46 componentes UI customizados (Shadcn)
- 13 hooks customizados
- 29 componentes principais
- 4 backend files

**Flutter (estimativa):**
- ~90 arquivos de código (-31%)
- 0 componentes UI customizados (Material nativo)
- 12 providers (Riverpod)
- 28 pages/widgets
- 4 backend files (inalterados)

**Ganhos:**
- 📦 **-31% menos arquivos** (código mais limpo)
- 🎨 **-46 componentes UI** (menos manutenção)
- ⚡ **Performance nativa** (sem WebView)
- 🔋 **-33% bateria** (compilado AOT)

---

## 🎯 12. Priorização da Migração

### Fase 1: Core (Semanas 4-6)
```
✅ Login.tsx              → login_page.dart
✅ Cadastro.tsx           → signup_page.dart
✅ Dashboard.tsx          → dashboard_page.dart
✅ MapTilerComponent.tsx  → map_widget.dart
✅ useAuthStatus.ts       → auth_provider.dart
✅ Backend (4 arquivos)   → INTACTO
```

### Fase 2: Features Principais (Semanas 7-14)
```
✅ MapDrawing.tsx          → area_drawing_widget.dart
✅ OfflineMapControls.tsx  → offline_map_controls.dart
✅ TileManager.ts          → tile_cache_service.dart
✅ PestScanner.tsx         → pest_scanner_page.dart
✅ CheckInOut.tsx          → checkin_page.dart
✅ DashboardExecutivo.tsx  → executive_dashboard_page.dart
✅ GestaoEquipesPremium.tsx → team_management_page.dart
```

### Fase 3: Features Complementares (Semanas 15-18)
```
✅ NDVIViewer.tsx         → ndvi_viewer_page.dart
✅ Relatorios.tsx         → reports_page.dart
✅ ChatSuporteInApp.tsx   → chat_page.dart
✅ AlertasConfig.tsx      → alerts_config_page.dart
✅ NotificationCenter.tsx → notification_center.dart
```

### Fase 4: Polimento (Semanas 19-22)
```
✅ ThemeContext.tsx       → theme_provider.dart
✅ Skeletons (9 arquivos) → shimmer components
✅ Configuracoes.tsx      → settings_page.dart
✅ Clientes.tsx           → clients_page.dart
✅ Agenda.tsx             → agenda_page.dart
✅ Clima.tsx              → weather_page.dart
```

---

## 🔒 13. Garantias de Segurança

### O Que NÃO Será Alterado

```
✅ Backend Supabase: 100% INTACTO
   - index.tsx (Hono server)
   - kv_store.tsx (KV wrapper)
   - pest-scanner.ts (GPT-4 Vision)
   - routes.tsx (API routes)

✅ Banco de Dados: 100% MANTIDO
   - kv_store_b2d55462
   - users, areas, occurrences, etc.

✅ APIs Externas: 100% IGUAIS
   - MapTiler API key
   - OpenAI GPT-4 Vision API
   - Supabase endpoints

✅ Lógica de Negócio: 100% PRESERVADA
   - Cálculo de áreas (hectares)
   - Validações de check-in
   - Regras de permissões
   - Fluxos de ocorrências
```

### O Que SERÁ Modificado (Apenas UI/Tecnologia)

```
⚠️ Framework: React → Flutter
⚠️ UI: Shadcn/UI → Material Design
⚠️ Estado: React Hooks → Riverpod
⚠️ Nativo: Capacitor → Flutter direto
⚠️ Linguagem: TypeScript → Dart
```

**Mas a LÓGICA é a MESMA!**

---

## 📝 14. Checklist de Validação

Antes de considerar a migração completa, validar:

```
□ Todos os 28 componentes principais migrados
□ Todas as 3 páginas migradas
□ Todos os 12 hooks convertidos para providers
□ Todos os 11 shared components migrados
□ Backend testado e 100% funcional com Flutter
□ 0 regressões funcionais
□ Paridade visual 95%+
□ Performance superior ao React
□ Testes cobrindo 80%+ do código
□ Aprovação em beta público
```

---

**FIM DO INVENTÁRIO**

**Status:** Mapeamento Completo ✅  
**Próximo passo:** Decisão Go/No-Go na migração Flutter
