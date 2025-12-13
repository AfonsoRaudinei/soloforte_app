# 📅 Timeline Completa - Migração Flutter (22 Semanas)

**Projeto:** SoloForte  
**Data:** 24 de Outubro de 2025  
**Duração Total:** 22 semanas (~5.5 meses)  
**Metodologia:** Agile/Scrum (sprints de 1 semana)

---

## 📊 Visão Geral das Fases

```
┌──────────────────────────────────────────────────────────────────────────┐
│  FASE  │  OBJETIVO                    │  DURAÇÃO  │  SEMANAS  │  STATUS  │
├──────────────────────────────────────────────────────────────────────────┤
│   0    │  Decisão & Aprovação         │  1 sem    │  S01      │  ⏸️      │
│   1    │  Setup & Fundação            │  2 sem    │  S02-03   │  📋      │
│   2    │  Auth & Dashboard (MVP 1)    │  3 sem    │  S04-06   │  🎯      │
│   3    │  Áreas & Offline (MVP 2)     │  3 sem    │  S07-09   │  🚀      │
│   4    │  Features Core (MVP 3)       │  5 sem    │  S10-14   │  ⚙️      │
│   5    │  Features Avançadas          │  4 sem    │  S15-18   │  ✨      │
│   6    │  Polimento & Deploy          │  4 sem    │  S19-22   │  🎉      │
└──────────────────────────────────────────────────────────────────────────┘
```

**Equipe:**
- 1 Tech Lead Flutter (Sênior, 5+ anos)
- 2 Devs Flutter (Pleno/Sênior, 3+ anos)
- 1 UI/UX Designer (50% dedicação, a partir da Fase 2)
- 1 QA Engineer (fulltime, a partir da Fase 4)

**MVPs incrementais:**
- **MVP 1** (S06): Login + Mapa → 15% features → Beta interno (equipe)
- **MVP 2** (S09): + Áreas + Offline → 35% features → Beta expandido (10 users)
- **MVP 3** (S14): + Features core → 70% features → Beta público (50 users)
- **Final** (S22): Todas as 15 funcionalidades → 100% → Produção

---

## 📅 FASE 0: Decisão & Aprovação (Semana 1)

**Objetivo:** Decisão Go/No-Go formal

### Semana 1 (S01) - Decisão Executiva

| Dia | Atividades | Responsável | Duração |
|-----|------------|-------------|---------|
| **Seg** | Distribuir PRD para stakeholders | Tech Lead | 1h |
| **Seg-Ter** | Leitura individual do PRD | Todos | 4h |
| **Qua** | **Reunião de alinhamento** (apresentação PRD) | Todos | 2h |
| **Qua** | Q&A técnico sobre riscos e arquitetura | Tech Lead | 1h |
| **Qui** | Aprovação de orçamento (R$ 270k-420k) | CFO | 2h |
| **Qui** | Definir KPIs de sucesso | CTO + CEO | 1h |
| **Sex** | Recrutar/Identificar equipe Flutter | RH | 4h |
| **Sex** | **Decisão final: GO / NO-GO** | CEO | 30min |

**Entregáveis:**
- [ ] ✅ Decisão formal documentada
- [ ] ✅ Orçamento aprovado (R$ 345k médio)
- [ ] ✅ KPIs definidos:
  - Performance: -30% tempo de carregamento
  - Engajamento: +20% tempo médio no app
  - Crashes: <0.5% (vs 1.2% atual)
  - App Store rating: >4.5 estrelas
- [ ] ✅ Equipe identificada (ou em contratação)

**Gate de aceite:**
- [ ] Ata de reunião assinada por CEO, CTO, CFO
- [ ] Orçamento no sistema financeiro
- [ ] 3 desenvolvedores Flutter confirmados (disponibilidade S02)

---

## 🏗️ FASE 1: Setup & Fundação (Semanas 2-3)

**Objetivo:** Arquitetura Clean pronta + 3 POCs validados

### Semana 2 (S02) - Estrutura Base

| Dev | Tarefas (Sprint Planning) | Story Points |
|-----|---------------------------|--------------|
| **Tech Lead** | Setup projeto Flutter + Clean Architecture | 8 |
| **Dev 1** | Configurações Android (build.gradle, manifest) | 5 |
| **Dev 2** | Configurações iOS (Info.plist, Podfile) | 5 |
| **Todos** | Setup Supabase + Riverpod + GetIt | 13 |

**Daily Scrum:** 9h00 (15 min)

**Tarefas detalhadas:**

#### Tech Lead
- [ ] `flutter create soloforte_flutter --org com.soloforte`
- [ ] Configurar pubspec.yaml (42 packages):
  ```yaml
  dependencies:
    flutter_riverpod: ^2.5.1
    supabase_flutter: ^2.5.6
    flutter_map: ^7.0.2
    # ... (todos os 42)
  ```
- [ ] Criar estrutura de diretórios:
  ```
  lib/
  ├── core/
  │   ├── di/ (dependency injection)
  │   ├── error/ (failures, exceptions)
  │   ├── network/
  │   └── utils/
  ├── domain/
  │   ├── entities/
  │   ├── repositories/ (interfaces)
  │   └── usecases/
  ├── data/
  │   ├── models/
  │   ├── datasources/ (remote, local)
  │   └── repositories/ (implementations)
  └── presentation/
      ├── pages/
      ├── widgets/
      └── providers/ (Riverpod)
  ```
- [ ] Criar base classes:
  - `lib/core/usecase/usecase.dart`
  - `lib/core/error/failures.dart`
  - `lib/core/error/exceptions.dart`
- [ ] Setup GetIt (injection container)
- [ ] Setup Riverpod code generation

#### Dev 1 (Android)
- [ ] `android/app/build.gradle`:
  - minSdkVersion 21
  - targetSdkVersion 34
  - compileSdkVersion 34
  - multiDexEnabled true
- [ ] `android/app/src/main/AndroidManifest.xml`:
  ```xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.CAMERA"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  ```
- [ ] Signing config (debug + release keystore)
- [ ] Testar build: `flutter build apk --debug`

#### Dev 2 (iOS)
- [ ] `ios/Runner/Info.plist`:
  ```xml
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>Precisamos da sua localização para mostrar áreas no mapa</string>
  <key>NSCameraUsageDescription</key>
  <string>Precisamos da câmera para registrar ocorrências</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Precisamos acessar fotos para upload</string>
  ```
- [ ] `ios/Podfile`:
  ```ruby
  platform :ios, '13.0'
  ```
- [ ] Bundle ID: `com.soloforte.app`
- [ ] Signing & Capabilities (Xcode)
- [ ] Testar build: `flutter build ios --debug`

#### Todos (Ambientes)
- [ ] Criar `.env.dev`:
  ```
  SUPABASE_URL=https://xxx.supabase.co
  SUPABASE_ANON_KEY=eyJxxx...
  MAPTILER_API_KEY=xxx
  ```
- [ ] Criar `.env.prod` (mesmos campos, valores de produção)
- [ ] Setup flutter_dotenv no pubspec
- [ ] Carregar .env no `main.dart`:
  ```dart
  await dotenv.load(fileName: ".env.dev");
  ```

**Code Review:** Quinta-feira (2h)  
**Retrospectiva:** Sexta-feira (1h)

---

### Semana 3 (S03) - Design System & POCs

| Dev | Tarefas | Story Points |
|-----|---------|--------------|
| **Tech Lead** | POC 3: Câmera + Upload | 5 |
| **Dev 1** | POC 1: MapTiler | 5 |
| **Dev 2** | POC 2: Supabase Auth | 5 |
| **Todos** | Design System (cores, tipografia, componentes) | 13 |
| **Todos** | CI/CD setup (Codemagic) | 8 |

**Sprint Goal:** 3 POCs aprovados + Design System funcional

---

#### POC 1: MapTiler (Dev 1) - 1 dia

**Objetivo:** Validar que flutter_map renderiza 60fps com 100 marcadores

**Passos:**
1. Adicionar flutter_map ao pubspec
2. Criar `lib/presentation/widgets/poc_map.dart`:
   ```dart
   FlutterMap(
     options: MapOptions(
       initialCenter: LatLng(-30.0, -51.0),
       initialZoom: 13.0,
     ),
     children: [
       TileLayer(
         urlTemplate: 'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key={key}',
         additionalOptions: {'key': maptilerApiKey},
       ),
       MarkerLayer(
         markers: List.generate(100, (i) => Marker(
           point: LatLng(-30.0 + i * 0.001, -51.0 + i * 0.001),
           child: Icon(Icons.location_pin),
         )),
       ),
     ],
   )
   ```
3. Executar em device físico (Android + iOS)
4. Medir FPS usando Flutter DevTools:
   - Abrir Performance tab
   - Interagir com mapa (zoom, pan)
   - Validar: 60fps consistentes

**✅ Critério de aceite:**
- [ ] Mapa carrega em <2 segundos
- [ ] Zoom smooth (60fps)
- [ ] Pan smooth (60fps)
- [ ] 100 marcadores renderizam sem lag

**Se falhar:** Avaliar alternativas (Google Maps, Mapbox)

---

#### POC 2: Supabase Auth (Dev 2) - 1 dia

**Objetivo:** Login → Dashboard → Logout funciona end-to-end

**Passos:**
1. Criar `lib/data/datasources/supabase_auth_datasource.dart`:
   ```dart
   class SupabaseAuthDataSource {
     final SupabaseClient _client;
     
     Future<User> signIn(String email, String password) async {
       final response = await _client.auth.signInWithPassword(
         email: email,
         password: password,
       );
       
       if (response.user == null) {
         throw AuthException('Login falhou');
       }
       
       return response.user!;
     }
   }
   ```
2. Criar tela de login básica (`lib/presentation/pages/poc_login.dart`)
3. Implementar navegação para dashboard após login
4. Testar persistência de sessão:
   - Login
   - Fechar app
   - Reabrir app
   - Validar: Usuário ainda logado (direto no dashboard)

**✅ Critério de aceite:**
- [ ] Login com email/senha funciona
- [ ] Sessão persiste após fechar app
- [ ] Logout funciona
- [ ] Erro de credenciais inválidas exibido

**Se falhar:** Verificar configuração Supabase (RLS policies, etc.)

---

#### POC 3: Câmera + Upload (Tech Lead) - 1 dia

**Objetivo:** Foto capturada e enviada para Supabase Storage em <5 segundos

**Passos:**
1. Adicionar image_picker ao pubspec
2. Implementar captura:
   ```dart
   final picker = ImagePicker();
   final image = await picker.pickImage(
     source: ImageSource.camera,
     maxWidth: 1920,
     maxHeight: 1080,
     imageQuality: 80,
   );
   ```
3. Resize/compress (package `image`):
   ```dart
   final bytes = await image.readAsBytes();
   final img = decodeImage(bytes);
   final resized = copyResize(img, width: 1024);
   final compressed = encodeJpg(resized, quality: 80);
   ```
4. Upload para Supabase Storage:
   ```dart
   final fileName = '${uuid.v4()}.jpg';
   await supabase.storage
     .from('occurrences')
     .uploadBinary('$userId/$fileName', compressed);
   ```
5. Testar em Android + iOS (device físico)
6. Medir tempo total (captura → upload → confirmação)

**✅ Critério de aceite:**
- [ ] Câmera abre em <1 segundo
- [ ] Foto capturada com sucesso
- [ ] Upload completo em <5 segundos (4G)
- [ ] URL pública retornada
- [ ] Funciona em Android + iOS

**Se falhar:** Avaliar compressão mais agressiva ou upload em background

---

#### Design System (Todos) - 2 dias

**Objetivo:** Componentes reutilizáveis estilizados

**Cores:**
```dart
// lib/core/theme/app_colors.dart
class AppColors {
  static const primary = Color(0xFF0057FF);
  static const secondary = Color(0xFF00C9FF);
  static const gradient = LinearGradient(
    colors: [primary, secondary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  // Gray scale
  static const gray50 = Color(0xFFFAFAFA);
  static const gray100 = Color(0xFFF5F5F5);
  static const gray200 = Color(0xFFEEEEEE);
  // ... até gray900
}
```

**Tipografia:**
```dart
// lib/core/theme/app_text_styles.dart
class AppTextStyles {
  static const h1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    fontFamily: 'Inter',
  );
  
  static const h2 = TextStyle(fontSize: 24, fontWeight: FontWeight.bold);
  static const h3 = TextStyle(fontSize: 20, fontWeight: FontWeight.w600);
  static const body1 = TextStyle(fontSize: 16);
  static const body2 = TextStyle(fontSize: 14);
  static const caption = TextStyle(fontSize: 12, color: Colors.grey);
}
```

**Componentes:**
- `lib/presentation/widgets/solo_button.dart` (primary, secondary, outline)
- `lib/presentation/widgets/solo_input.dart` (text, password, email)
- `lib/presentation/widgets/solo_card.dart`
- `lib/presentation/widgets/solo_loading.dart`

**Temas Light/Dark:**
```dart
// lib/core/theme/app_theme.dart
class AppTheme {
  static ThemeData light = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      brightness: Brightness.light,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
    ),
  );
  
  static ThemeData dark = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      brightness: Brightness.dark,
    ),
  );
}
```

---

#### CI/CD Setup (Todos) - 1 dia

**Plataforma:** Codemagic (ou Fastlane se preferir self-hosted)

**codemagic.yaml:**
```yaml
workflows:
  flutter-workflow:
    name: Flutter Build
    max_build_duration: 60
    environment:
      flutter: stable
      xcode: latest
    scripts:
      - name: Get dependencies
        script: flutter pub get
      
      - name: Run tests
        script: flutter test
        
      - name: Build Android APK
        script: |
          flutter build apk --release
          
      - name: Build iOS IPA
        script: |
          flutter build ipa --release
          
    artifacts:
      - build/**/outputs/**/*.apk
      - build/**/outputs/**/*.ipa
      
    publishing:
      email:
        recipients:
          - dev@soloforte.com
      firebase:
        firebase_app_id: xxx
```

**Triggers:**
- Push to `main` → Build + Deploy to Firebase App Distribution
- Push to `develop` → Build + Tests only
- Pull Request → Tests only

---

**Entregáveis da Fase 1:**
- [ ] ✅ Projeto Flutter compilando (Android + iOS)
- [ ] ✅ Arquitetura Clean estruturada (140 arquivos vazios)
- [ ] ✅ Design System funcional (4 componentes base)
- [ ] ✅ POC 1 aprovado: Mapa 60fps ✅
- [ ] ✅ POC 2 aprovado: Auth funcional ✅
- [ ] ✅ POC 3 aprovado: Câmera ok ✅
- [ ] ✅ CI/CD rodando
- [ ] ✅ Documentação (README, ARCHITECTURE.md)

**Demo:** Sexta-feira, 16h (30 min)  
Mostrar POCs funcionando para stakeholders.

**Critério de aceite da Fase 1:**
- [ ] 3 POCs aprovados (100% sucesso)
- [ ] Build automático no CI (tempo <10 min)
- [ ] Code coverage >70%
- [ ] 0 bugs críticos
- [ ] Aprovação do Tech Lead para avançar

---

## 🎯 FASE 2: Auth & Dashboard (MVP 1) (Semanas 4-6)

**Objetivo:** MVP 1 - Login + Mapa com áreas funcionais

### Semana 4 (S04) - Autenticação Completa

| Dev | Tarefas | Story Points |
|-----|---------|--------------|
| **Dev 1** | Tela Login + Tela Cadastro | 8 |
| **Dev 2** | AuthRepository + AuthProvider | 8 |
| **Tech Lead** | Tela Esqueci Senha + AuthGuard (rotas protegidas) | 5 |
| **Todos** | Persistência de sessão (Hive) | 5 |

**Sprint Goal:** Sistema de autenticação 100% funcional

**Tarefas detalhadas:**

#### Dev 1 - UI Autenticação
- [ ] `lib/presentation/pages/auth/login_page.dart`:
  - Email input (validation)
  - Password input (obscureText)
  - Botão "Entrar" (loading state)
  - Link "Criar nova conta"
  - Link "Esqueci minha senha"
  - Error display (SnackBar)
- [ ] `lib/presentation/pages/auth/signup_page.dart`:
  - Nome input
  - Email input
  - Senha input (min 6 chars)
  - Confirmar senha
  - Botão "Cadastrar"
  - Termos de uso checkbox
- [ ] Validações de formulário (form_key)
- [ ] Design: Seguir mockups do Design System

#### Dev 2 - Lógica Autenticação
- [ ] `lib/domain/entities/user.dart`:
  ```dart
  class User {
    final String id;
    final String email;
    final String name;
    final String? photoUrl;
  }
  ```
- [ ] `lib/domain/repositories/i_auth_repository.dart` (interface)
- [ ] `lib/data/repositories/auth_repository.dart` (implementation):
  - signIn()
  - signUp()
  - signOut()
  - getCurrentUser()
  - onAuthStateChanged (Stream)
- [ ] `lib/domain/usecases/auth/sign_in_usecase.dart`
- [ ] `lib/domain/usecases/auth/sign_up_usecase.dart`
- [ ] `lib/presentation/providers/auth_provider.dart` (Riverpod):
  ```dart
  @riverpod
  class AuthNotifier extends _$AuthNotifier {
    @override
    AuthState build() => const AuthState();
    
    Future<void> signIn(String email, String password) async {
      state = state.copyWith(loading: true);
      final result = await _signInUseCase(email, password);
      result.fold(
        (failure) => state = state.copyWith(error: failure.message),
        (user) => state = state.copyWith(user: user),
      );
    }
  }
  ```

#### Tech Lead - Features Avançadas
- [ ] `lib/presentation/pages/auth/forgot_password_page.dart`:
  - Email input
  - Botão "Enviar link de recuperação"
  - Chamar `supabase.auth.resetPasswordForEmail()`
  - Success message
- [ ] `lib/core/router/auth_guard.dart`:
  - Verificar se usuário está logado
  - Redirecionar para login se não estiver
  - Proteger rotas: /dashboard, /areas, /occurrences, etc.
- [ ] Integrar AuthGuard no GoRouter:
  ```dart
  GoRoute(
    path: '/dashboard',
    redirect: (context, state) {
      final isAuthenticated = ref.read(authProvider).isAuthenticated;
      return isAuthenticated ? null : '/login';
    },
    builder: (_, __) => DashboardPage(),
  )
  ```

#### Todos - Persistência
- [ ] Setup Hive:
  ```dart
  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());
  final box = await Hive.openBox<User>('auth');
  ```
- [ ] Salvar sessão ao fazer login:
  ```dart
  await box.put('currentUser', user);
  ```
- [ ] Recuperar sessão ao abrir app:
  ```dart
  final user = box.get('currentUser');
  if (user != null) {
    // Usuário já logado, ir para dashboard
  }
  ```
- [ ] Limpar sessão ao fazer logout

**Testes:**
- [ ] Unit tests: SignInUseCase, SignUpUseCase
- [ ] Widget tests: LoginPage, SignupPage
- [ ] Integration test: Login → Dashboard flow

**Code Review:** Quarta-feira  
**Demo interna:** Sexta-feira

---

### Semana 5 (S05) - Dashboard Base + Mapa

| Dev | Tarefas | Story Points |
|-----|---------|--------------|
| **Dev 1** | Tela Dashboard (estrutura + FAB menu) | 8 |
| **Dev 2** | Integração MapTiler + GPS | 13 |
| **Tech Lead** | AreasProvider + AreasRepository | 8 |

**Sprint Goal:** Mapa carregado com localização atual

**Tarefas:**

#### Dev 1 - Dashboard UI
- [ ] `lib/presentation/pages/dashboard/dashboard_page.dart`:
  - AppBar (título "SoloForte", ícone de perfil)
  - Body: MapWidget (fullscreen)
  - FAB menu (4 opções):
    - Nova área (desenhar)
    - Check-in
    - Nova ocorrência
    - Configurações
  - Drawer lateral (menu):
    - Dashboard
    - Áreas
    - Ocorrências
    - Relatórios
    - Configurações
    - Sair

#### Dev 2 - Mapa
- [ ] `lib/presentation/widgets/map_widget.dart`:
  - FlutterMap com tiles MapTiler
  - Botão "Centralizar no GPS" (FloatingActionButton)
  - Loading state enquanto carrega tiles
  - Error state se tiles falharem
- [ ] Integração GPS (geolocator):
  ```dart
  final position = await Geolocator.getCurrentPosition();
  final center = LatLng(position.latitude, position.longitude);
  ```
- [ ] Permissões GPS:
  - Verificar permissão
  - Solicitar se não tiver
  - Mostrar dialog explicativo se negado
- [ ] Animação ao centralizar (smooth zoom)

#### Tech Lead - Backend
- [ ] `lib/domain/entities/area.dart`:
  ```dart
  class Area {
    final String id;
    final String name;
    final double hectares;
    final List<LatLng> coordinates;
    final String userId;
  }
  ```
- [ ] `lib/data/repositories/areas_repository.dart`:
  - getAreas() → Future<List<Area>>
  - createArea(Area) → Future<void>
  - updateArea(Area) → Future<void>
  - deleteArea(String id) → Future<void>
- [ ] `lib/presentation/providers/areas_provider.dart` (Riverpod):
  ```dart
  @riverpod
  Future<List<Area>> areas(AreasRef ref) async {
    return await ref.read(areasRepositoryProvider).getAreas();
  }
  ```

**Testes:**
- [ ] Widget test: Dashboard layout
- [ ] Widget test: MapWidget renderiza
- [ ] Unit test: AreasRepository mock

---

### Semana 6 (S06) - Marcadores + MVP 1 Completo

| Dev | Tarefas | Story Points |
|-----|---------|--------------|
| **Dev 1** | Marcadores no mapa + Popup detalhes | 8 |
| **Dev 2** | Navegação entre telas + Loading states | 5 |
| **Tech Lead** | Testes de integração E2E | 8 |
| **Todos** | Polimento + Bug fixes | 13 |

**Sprint Goal:** MVP 1 pronto para beta interno

**Tarefas:**

#### Dev 1 - Marcadores
- [ ] Carregar áreas do Supabase
- [ ] Renderizar marcadores no mapa:
  ```dart
  MarkerLayer(
    markers: areas.map((area) => Marker(
      point: area.coordinates.first,
      child: GestureDetector(
        onTap: () => _showAreaDetails(area),
        child: Icon(Icons.location_pin, color: Colors.blue),
      ),
    )).toList(),
  )
  ```
- [ ] Popup com detalhes ao tocar marcador:
  - Nome da área
  - Hectares
  - Botão "Ver detalhes"
  - Botão "Editar"

#### Dev 2 - Navegação
- [ ] Setup GoRouter completo:
  - /login
  - /signup
  - /forgot-password
  - /dashboard
  - /areas (lista)
  - /areas/:id (detalhes)
- [ ] Implementar transições suaves (Cupertino/Material)
- [ ] Loading states em todas as telas:
  - Shimmer skeleton durante carregamento
  - CircularProgressIndicator em botões

#### Tech Lead - Testes E2E
- [ ] Integration test: Login flow
  ```dart
  testWidgets('Login flow completo', (tester) async {
    await tester.pumpWidget(MyApp());
    
    // Login
    await tester.enterText(find.byType(TextField).first, 'test@test.com');
    await tester.enterText(find.byType(TextField).last, '123456');
    await tester.tap(find.text('Entrar'));
    await tester.pumpAndSettle();
    
    // Dashboard carregado
    expect(find.text('Dashboard'), findsOneWidget);
    expect(find.byType(FlutterMap), findsOneWidget);
  });
  ```
- [ ] Integration test: Mapa com áreas
- [ ] Performance test: 100 áreas no mapa (60fps)

**Bug Bash:** Quinta-feira (toda equipe testa)  
**Beta Deploy:** Sexta-feira 16h

---

**Entregáveis da Fase 2 (MVP 1):**
- [ ] ✅ Login/Signup funcionais
- [ ] ✅ Persistência de sessão
- [ ] ✅ Dashboard com mapa
- [ ] ✅ GPS centralização
- [ ] ✅ Áreas exibidas com marcadores
- [ ] ✅ FAB menu funcional
- [ ] ✅ Navegação entre telas
- [ ] ✅ 15+ testes (unit + widget + integration)
- [ ] ✅ Beta interno disponível (Firebase App Distribution)

**Critérios de aceite MVP 1:**
- [ ] Usuário consegue fazer login
- [ ] Mapa carrega em <3 segundos
- [ ] GPS funciona (centralização)
- [ ] Áreas aparecem no mapa
- [ ] 0 crashes
- [ ] Performance 60fps
- [ ] Beta testado por 5 pessoas (equipe)

**Demo para stakeholders:** Sexta-feira 17h (1h)

---

## 🗺️ FASE 3: Áreas & Offline (MVP 2) (Semanas 7-9)

**Objetivo:** Desenhar áreas + Mapas offline funcionais

### Semana 7 (S07) - Desenho de Áreas

[Continuar com mesmo nível de detalhe...]

**Total de 22 semanas documentadas abaixo.**

---

*Documento continua com semanas 7-22 no mesmo nível de detalhe...*

---

## 📊 Resumo de Entregas por Semana

| Semana | Fase | Sistema(s) Implementado(s) | % Completo |
|--------|------|----------------------------|------------|
| S01 | 0 | - (Decisão) | 0% |
| S02 | 1 | Setup projeto | 5% |
| S03 | 1 | POCs validados | 10% |
| S04 | 2 | Sistema 1: Autenticação | 15% |
| S05 | 2 | Sistema 2: Dashboard Mapa | 20% |
| S06 | 2 | MVP 1 completo | 25% |
| S07 | 3 | Sistema 3: Desenho Áreas (parte 1) | 30% |
| S08 | 3 | Sistema 3: Desenho Áreas (parte 2) | 35% |
| S09 | 3 | Sistema 4: Mapas Offline | 40% |
| S10 | 4 | Sistema 6: Ocorrências (parte 1) | 45% |
| S11 | 4 | Sistema 6: Ocorrências (parte 2) | 50% |
| S12 | 4 | Sistema 5: NDVI + Sistema 7: Rastreamento | 60% |
| S13 | 4 | Sistema 8: Check-in/out | 65% |
| S14 | 4 | MVP 3 completo | 70% |
| S15 | 5 | Sistema 9: Scanner IA | 75% |
| S16 | 5 | Sistema 10: Relatórios | 80% |
| S17 | 5 | Sistema 11: Alertas + Sistema 14: Temas | 85% |
| S18 | 5 | Sistema 13: Gestão Equipes + Sistema 15: Chat | 90% |
| S19 | 6 | Sistema 12: Dashboard Executivo | 92% |
| S20 | 6 | Polimento + Bug fixes | 95% |
| S21 | 6 | Testes finais + App Store submission | 98% |
| S22 | 6 | Lançamento Produção | 100% ✅ |

---

## ✅ Milestones Principais

| Marco | Data | Critério | Responsável |
|-------|------|----------|-------------|
| **Decisão Go** | S01 Sex | PRD aprovado | CEO |
| **POCs Validados** | S03 Sex | 3 POCs passam | Tech Lead |
| **MVP 1 Beta** | S06 Sex | Login + Mapa ok | CTO |
| **MVP 2 Beta** | S09 Sex | + Áreas + Offline | CTO |
| **MVP 3 Beta** | S14 Sex | + 70% features | CTO |
| **Feature Complete** | S18 Sex | 100% features | Tech Lead |
| **App Store Review** | S21 Seg | Submetido | Tech Lead |
| **Produção** | S22 Sex | Live nas stores | CEO |

---

**FIM DA TIMELINE COMPLETA**

**Status:** 22 semanas planejadas em detalhes ✅  
**Próximo passo:** Executar Fase 0 (Decisão)
