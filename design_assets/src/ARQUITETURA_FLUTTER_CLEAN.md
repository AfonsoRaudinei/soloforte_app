# 🏗️ Arquitetura Flutter: Clean Architecture Detalhada

**Projeto:** SoloForte  
**Data:** 24 de Outubro de 2025  
**Padrão:** Clean Architecture + SOLID + DDD

---

## 📊 Visão Geral

### Princípios da Clean Architecture

```
┌─────────────────────────────────────────────────────────┐
│         EXTERNA (Frameworks & Drivers)                   │
│  - Flutter Framework                                     │
│  - Supabase SDK                                          │
│  - Packages (image_picker, geolocator, etc.)             │
└─────────────────────────────────────────────────────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────────┐
│         INTERFACE ADAPTERS                               │
│  - UI (Pages, Widgets)                                   │
│  - Providers (State Management)                          │
│  - Repository Implementations                            │
│  - DataSources (Remote, Local)                           │
└─────────────────────────────────────────────────────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────────┐
│         APPLICATION BUSINESS RULES                       │
│  - Use Cases (interactors)                               │
│  - Repository Interfaces                                 │
└─────────────────────────────────────────────────────────┘
                        ↓ ↑
┌─────────────────────────────────────────────────────────┐
│         ENTERPRISE BUSINESS RULES                        │
│  - Entities (Domain Models)                              │
│  - Business Logic pura                                   │
└─────────────────────────────────────────────────────────┘
```

**Regra fundamental:** **Dependências apontam SEMPRE para dentro (Domain)**

- ✅ Domain **NÃO** depende de nada
- ✅ Data depende de Domain
- ✅ Presentation depende de Domain
- ✅ External (Flutter, packages) é plug-and-play

---

## 📁 Estrutura Completa do Projeto

```
soloforte_flutter/
├── lib/
│   ├── main.dart                    # Entry point (runApp)
│   ├── app.dart                     # MaterialApp root + routing
│   │
│   ├── core/                        # 🔧 Cross-cutting concerns
│   │   ├── theme/
│   │   │   ├── app_theme.dart       # Light/Dark themes
│   │   │   ├── colors.dart          # #0057FF + paleta
│   │   │   └── typography.dart      # Text styles
│   │   ├── router/
│   │   │   ├── app_router.dart      # GoRouter config
│   │   │   └── route_guards.dart    # Auth guards
│   │   ├── di/
│   │   │   └── injection.dart       # GetIt DI setup
│   │   ├── constants/
│   │   │   └── app_constants.dart   # URLs, API keys, etc.
│   │   ├── error/
│   │   │   ├── failures.dart        # Failure classes
│   │   │   └── error_handler.dart   # Global error handling
│   │   ├── logging/
│   │   │   └── logger.dart          # Custom logger
│   │   ├── monitoring/
│   │   │   └── performance_observer.dart  # Performance tracking
│   │   └── utils/
│   │       ├── debounce.dart
│   │       ├── validators.dart
│   │       └── formatters.dart
│   │
│   ├── domain/                      # 🧠 Business Logic (CORE)
│   │   ├── entities/
│   │   │   ├── user.dart
│   │   │   ├── area.dart
│   │   │   ├── occurrence.dart
│   │   │   ├── pest_diagnosis.dart
│   │   │   ├── team_member.dart
│   │   │   ├── checkin.dart
│   │   │   ├── report.dart
│   │   │   ├── notification.dart
│   │   │   ├── alert_config.dart
│   │   │   └── chat_message.dart
│   │   ├── repositories/            # Interfaces (contratos)
│   │   │   ├── i_auth_repository.dart
│   │   │   ├── i_area_repository.dart
│   │   │   ├── i_occurrence_repository.dart
│   │   │   ├── i_pest_scanner_repository.dart
│   │   │   ├── i_team_repository.dart
│   │   │   ├── i_checkin_repository.dart
│   │   │   ├── i_report_repository.dart
│   │   │   └── i_chat_repository.dart
│   │   └── usecases/
│   │       ├── auth/
│   │       │   ├── sign_in_usecase.dart
│   │       │   ├── sign_up_usecase.dart
│   │       │   ├── sign_out_usecase.dart
│   │       │   ├── reset_password_usecase.dart
│   │       │   └── get_current_user_usecase.dart
│   │       ├── areas/
│   │       │   ├── create_area_usecase.dart
│   │       │   ├── get_areas_usecase.dart
│   │       │   ├── update_area_usecase.dart
│   │       │   ├── delete_area_usecase.dart
│   │       │   └── calculate_area_usecase.dart
│   │       ├── occurrences/
│   │       │   ├── create_occurrence_usecase.dart
│   │       │   ├── get_occurrences_usecase.dart
│   │       │   └── update_occurrence_usecase.dart
│   │       ├── pest_scanner/
│   │       │   ├── scan_pest_usecase.dart
│   │       │   ├── get_pest_history_usecase.dart
│   │       │   └── pest_to_occurrence_usecase.dart
│   │       ├── team/
│   │       │   ├── get_team_members_usecase.dart
│   │       │   ├── add_team_member_usecase.dart
│   │       │   └── remove_team_member_usecase.dart
│   │       ├── checkin/
│   │       │   ├── checkin_usecase.dart
│   │       │   ├── checkout_usecase.dart
│   │       │   └── get_checkin_history_usecase.dart
│   │       ├── reports/
│   │       │   ├── generate_report_usecase.dart
│   │       │   └── export_pdf_usecase.dart
│   │       └── chat/
│   │           ├── send_message_usecase.dart
│   │           └── get_messages_usecase.dart
│   │
│   ├── data/                        # 💾 Data Access Layer
│   │   ├── models/                  # DTOs (Data Transfer Objects)
│   │   │   ├── user_model.dart
│   │   │   ├── area_model.dart
│   │   │   ├── occurrence_model.dart
│   │   │   ├── pest_diagnosis_model.dart
│   │   │   ├── team_member_model.dart
│   │   │   ├── checkin_model.dart
│   │   │   ├── report_model.dart
│   │   │   ├── notification_model.dart
│   │   │   ├── alert_config_model.dart
│   │   │   └── chat_message_model.dart
│   │   ├── repositories/            # Implementations
│   │   │   ├── auth_repository.dart
│   │   │   ├── area_repository.dart
│   │   │   ├── occurrence_repository.dart
│   │   │   ├── pest_scanner_repository.dart
│   │   │   ├── team_repository.dart
│   │   │   ├── checkin_repository.dart
│   │   │   ├── report_repository.dart
│   │   │   └── chat_repository.dart
│   │   ├── datasources/
│   │   │   ├── remote/
│   │   │   │   ├── supabase_datasource.dart
│   │   │   │   ├── pest_scanner_api.dart        # Chama Edge Function
│   │   │   │   └── maptiler_api.dart            # Tiles + NDVI
│   │   │   └── local/
│   │   │       ├── hive_datasource.dart         # Cache offline
│   │   │       └── preferences_datasource.dart  # Settings
│   │   └── services/
│   │       ├── camera_service.dart
│   │       ├── storage_service.dart
│   │       ├── tile_cache_service.dart          # Mapas offline
│   │       ├── analytics_service.dart
│   │       └── demo_service.dart
│   │
│   └── presentation/                # 📱 UI Layer
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── login_page.dart
│       │   │   ├── signup_page.dart
│       │   │   └── forgot_password_page.dart
│       │   ├── home/
│       │   │   └── home_page.dart
│       │   ├── dashboard/
│       │   │   ├── dashboard_page.dart
│       │   │   └── widgets/
│       │   │       ├── map_widget.dart
│       │   │       ├── map_layer_selector.dart
│       │   │       ├── map_button.dart
│       │   │       ├── fab_menu.dart
│       │   │       └── area_list.dart
│       │   ├── executive/
│       │   │   ├── executive_dashboard_page.dart
│       │   │   └── widgets/
│       │   │       ├── kpi_card.dart
│       │   │       ├── chart_card.dart
│       │   │       └── team_stats_card.dart
│       │   ├── occurrences/
│       │   │   ├── occurrences_page.dart
│       │   │   └── create_occurrence_page.dart
│       │   ├── pest_scanner/
│       │   │   ├── scanner_page.dart
│       │   │   ├── result_page.dart
│       │   │   └── history_page.dart
│       │   ├── team/
│       │   │   ├── team_management_page.dart
│       │   │   └── widgets/
│       │   │       └── team_member_card.dart
│       │   ├── checkin/
│       │   │   ├── checkin_page.dart
│       │   │   └── checkin_history_page.dart
│       │   ├── ndvi/
│       │   │   └── ndvi_viewer_page.dart
│       │   ├── reports/
│       │   │   ├── reports_page.dart
│       │   │   └── report_preview_page.dart
│       │   ├── chat/
│       │   │   └── chat_page.dart
│       │   ├── clients/
│       │   │   └── clients_page.dart
│       │   ├── agenda/
│       │   │   └── agenda_page.dart
│       │   ├── weather/
│       │   │   ├── weather_page.dart
│       │   │   └── weather_radar_page.dart
│       │   ├── pests/
│       │   │   └── pests_page.dart
│       │   ├── feedback/
│       │   │   └── feedback_page.dart
│       │   ├── notifications/
│       │   │   └── notification_center_page.dart
│       │   └── settings/
│       │       ├── settings_page.dart
│       │       └── alerts_config_page.dart
│       │
│       ├── providers/               # State Management (Riverpod)
│       │   ├── auth_provider.dart
│       │   ├── theme_provider.dart
│       │   ├── areas_provider.dart
│       │   ├── occurrences_provider.dart
│       │   ├── pest_scanner_provider.dart
│       │   ├── team_provider.dart
│       │   ├── checkin_provider.dart
│       │   ├── notifications_provider.dart
│       │   ├── alerts_provider.dart
│       │   ├── chat_provider.dart
│       │   ├── producers_provider.dart
│       │   └── map_provider.dart
│       │
│       └── widgets/                 # Shared Widgets
│           ├── buttons/
│           │   ├── primary_button.dart
│           │   └── icon_button_custom.dart
│           ├── cards/
│           │   ├── info_card.dart
│           │   └── stat_card.dart
│           ├── loading/
│           │   ├── loading_screen.dart
│           │   └── loading_overlay.dart
│           └── skeletons/
│               ├── skeleton_card.dart
│               ├── skeleton_list.dart
│               ├── skeleton_map.dart
│               ├── skeleton_dashboard.dart
│               ├── skeleton_ndvi.dart
│               ├── skeleton_reports.dart
│               ├── skeleton_agenda.dart
│               ├── skeleton_clients.dart
│               └── skeleton_weather.dart
│
├── test/                            # 🧪 Tests
│   ├── unit/
│   │   ├── domain/
│   │   │   └── usecases/
│   │   │       └── sign_in_usecase_test.dart
│   │   └── data/
│   │       └── repositories/
│   │           └── auth_repository_test.dart
│   ├── widget/
│   │   └── presentation/
│   │       └── pages/
│   │           └── login_page_test.dart
│   └── integration/
│       └── auth_flow_test.dart
│
├── assets/                          # Static Assets
│   ├── images/
│   │   ├── logo.png
│   │   └── logo_watermark.png
│   └── icons/
│
├── pubspec.yaml                     # Dependencies
├── analysis_options.yaml            # Linting rules
└── README.md
```

**Total estimado:** ~140 arquivos (vs 131 React, mas mais organizado)

---

## 🎯 Camada por Camada

### 1️⃣ Domain Layer (🧠 CORE)

**Responsabilidade:** Lógica de negócio pura, independente de framework

**Regras:**
- ❌ **NÃO** pode importar Flutter
- ❌ **NÃO** pode importar packages externos (exceto Dart puro)
- ❌ **NÃO** pode importar Data ou Presentation
- ✅ **APENAS** Dart puro + lógica de negócio

---

#### Entities (Modelos de Domínio)

**Exemplo: User Entity**
```dart
// lib/domain/entities/user.dart
class User {
  final String id;
  final String email;
  final String? name;
  final String? phone;
  final UserRole role;
  final DateTime createdAt;
  final DateTime? lastLoginAt;

  const User({
    required this.id,
    required this.email,
    this.name,
    this.phone,
    required this.role,
    required this.createdAt,
    this.lastLoginAt,
  });

  // Business logic methods (não setters!)
  bool get isAdmin => role == UserRole.admin;
  bool get isPremium => role == UserRole.premium;
  
  String get displayName => name ?? email.split('@').first;
  
  bool canManageTeam() {
    return role == UserRole.admin || role == UserRole.manager;
  }
}

enum UserRole { admin, manager, technician, viewer }
```

**Exemplo: Area Entity**
```dart
// lib/domain/entities/area.dart
class Area {
  final String id;
  final String name;
  final List<LatLng> coordinates;
  final double areaHectares;
  final String? cropType;
  final String farmId;
  final DateTime createdAt;

  const Area({
    required this.id,
    required this.name,
    required this.coordinates,
    required this.areaHectares,
    this.cropType,
    required this.farmId,
    required this.createdAt,
  });

  // Business logic
  bool get isValid => coordinates.length >= 3 && areaHectares > 0;
  
  bool get isLarge => areaHectares > 100.0;
  
  String get formattedArea => '${areaHectares.toStringAsFixed(2)} ha';
}
```

---

#### Repository Interfaces (Contratos)

**Exemplo: IAuthRepository**
```dart
// lib/domain/repositories/i_auth_repository.dart
import 'package:dartz/dartz.dart'; // For Either<L, R>
import '../entities/user.dart';
import '../../core/error/failures.dart';

abstract class IAuthRepository {
  // Login
  Future<Either<Failure, User>> signIn({
    required String email,
    required String password,
  });
  
  // Cadastro
  Future<Either<Failure, User>> signUp({
    required String email,
    required String password,
    String? name,
  });
  
  // Logout
  Future<Either<Failure, Unit>> signOut();
  
  // Reset senha
  Future<Either<Failure, Unit>> resetPassword({
    required String email,
  });
  
  // Stream de mudanças de auth
  Stream<User?> get authStateChanges;
  
  // Pegar usuário atual
  Future<Either<Failure, User>> getCurrentUser();
}
```

**Por que usar `Either<Failure, Success>`?**
- ✅ Força tratamento de erros (não pode ignorar)
- ✅ Type-safe (compile-time checking)
- ✅ Testável (mock failures fácil)
- ✅ Funcional (Railway Oriented Programming)

---

#### Use Cases (Casos de Uso)

**Exemplo: SignInUseCase**
```dart
// lib/domain/usecases/auth/sign_in_usecase.dart
import 'package:dartz/dartz.dart';
import '../../entities/user.dart';
import '../../repositories/i_auth_repository.dart';
import '../../../core/error/failures.dart';

class SignInUseCase {
  final IAuthRepository _authRepository;

  SignInUseCase(this._authRepository);

  Future<Either<Failure, User>> call({
    required String email,
    required String password,
  }) async {
    // Validações de negócio
    if (email.isEmpty || password.isEmpty) {
      return Left(ValidationFailure('Por favor, preencha todos os campos'));
    }

    if (!_isValidEmail(email)) {
      return Left(ValidationFailure('Email inválido'));
    }

    if (password.length < 6) {
      return Left(ValidationFailure('Senha deve ter pelo menos 6 caracteres'));
    }

    // Delega para repository
    return await _authRepository.signIn(
      email: email.trim().toLowerCase(),
      password: password,
    );
  }

  bool _isValidEmail(String email) {
    return RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    ).hasMatch(email);
  }
}
```

**Exemplo: CalculateAreaUseCase**
```dart
// lib/domain/usecases/areas/calculate_area_usecase.dart
import 'package:geodesy/geodesy.dart';
import 'package:latlong2/latlong.dart';

class CalculateAreaUseCase {
  final Geodesy _geodesy = Geodesy();

  double call(List<LatLng> coordinates) {
    if (coordinates.length < 3) {
      throw ArgumentError('Área precisa ter pelo menos 3 pontos');
    }

    // Calcula área em metros quadrados
    final areaM2 = _geodesy.polygonArea(coordinates);

    // Converte para hectares (1 hectare = 10.000 m²)
    return areaM2 / 10000.0;
  }
}
```

---

### 2️⃣ Data Layer (💾 Data Access)

**Responsabilidade:** Buscar e persistir dados

**Regras:**
- ✅ Implementa interfaces do Domain
- ✅ Converte DTOs (Models) ↔ Entities
- ✅ Chama DataSources (Supabase, Hive, etc.)
- ❌ **NÃO** contém lógica de negócio

---

#### Models (DTOs)

**Exemplo: UserModel**
```dart
// lib/data/models/user_model.dart
import 'package:supabase_flutter/supabase_flutter.dart' as supabase;
import '../../domain/entities/user.dart';

class UserModel {
  final String id;
  final String email;
  final String? name;
  final String? phone;
  final String role;
  final String createdAt;
  final String? lastLoginAt;

  const UserModel({
    required this.id,
    required this.email,
    this.name,
    this.phone,
    required this.role,
    required this.createdAt,
    this.lastLoginAt,
  });

  // Serialização JSON
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      name: json['name'],
      phone: json['phone'],
      role: json['role'] ?? 'viewer',
      createdAt: json['created_at'],
      lastLoginAt: json['last_login_at'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'phone': phone,
      'role': role,
      'created_at': createdAt,
      'last_login_at': lastLoginAt,
    };
  }

  // Conversão Supabase User → UserModel
  factory UserModel.fromSupabase(supabase.User supabaseUser) {
    return UserModel(
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name: supabaseUser.userMetadata?['name'],
      phone: supabaseUser.phone,
      role: supabaseUser.userMetadata?['role'] ?? 'viewer',
      createdAt: supabaseUser.createdAt,
      lastLoginAt: supabaseUser.lastSignInAt,
    );
  }

  // Conversão UserModel → User (Entity)
  User toEntity() {
    return User(
      id: id,
      email: email,
      name: name,
      phone: phone,
      role: _parseRole(role),
      createdAt: DateTime.parse(createdAt),
      lastLoginAt: lastLoginAt != null ? DateTime.parse(lastLoginAt!) : null,
    );
  }

  UserRole _parseRole(String roleString) {
    switch (roleString.toLowerCase()) {
      case 'admin':
        return UserRole.admin;
      case 'manager':
        return UserRole.manager;
      case 'technician':
        return UserRole.technician;
      default:
        return UserRole.viewer;
    }
  }
}
```

---

#### Repository Implementations

**Exemplo: AuthRepository**
```dart
// lib/data/repositories/auth_repository.dart
import 'package:dartz/dartz.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/i_auth_repository.dart';
import '../../core/error/failures.dart';
import '../datasources/remote/supabase_datasource.dart';
import '../datasources/local/preferences_datasource.dart';
import '../models/user_model.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthRepository implements IAuthRepository {
  final SupabaseDataSource _remoteDataSource;
  final PreferencesDataSource _localDataSource;

  AuthRepository(this._remoteDataSource, this._localDataSource);

  @override
  Future<Either<Failure, User>> signIn({
    required String email,
    required String password,
  }) async {
    try {
      // Chama DataSource remoto (Supabase)
      final userModel = await _remoteDataSource.signIn(email, password);

      // Cache session local
      await _localDataSource.saveSession(userModel.toJson());

      // Converte Model → Entity
      return Right(userModel.toEntity());
    } on AuthException catch (e) {
      // Erros específicos do Supabase
      if (e.message.contains('Invalid login credentials')) {
        return Left(AuthFailure('Email ou senha incorretos'));
      }
      return Left(AuthFailure(e.message));
    } on NetworkException catch (e) {
      return Left(NetworkFailure('Erro de conexão. Verifique sua internet.'));
    } catch (e) {
      return Left(ServerFailure('Erro inesperado: $e'));
    }
  }

  @override
  Future<Either<Failure, User>> signUp({
    required String email,
    required String password,
    String? name,
  }) async {
    try {
      final userModel = await _remoteDataSource.signUp(
        email,
        password,
        name,
      );

      await _localDataSource.saveSession(userModel.toJson());

      return Right(userModel.toEntity());
    } on AuthException catch (e) {
      if (e.message.contains('already registered')) {
        return Left(AuthFailure('Este email já está cadastrado'));
      }
      return Left(AuthFailure(e.message));
    } catch (e) {
      return Left(ServerFailure('Erro ao criar conta: $e'));
    }
  }

  @override
  Future<Either<Failure, Unit>> signOut() async {
    try {
      await _remoteDataSource.signOut();
      await _localDataSource.clearSession();
      return Right(unit);
    } catch (e) {
      return Left(ServerFailure('Erro ao fazer logout: $e'));
    }
  }

  @override
  Stream<User?> get authStateChanges {
    return _remoteDataSource.authStateChanges.map((userModel) {
      return userModel?.toEntity();
    });
  }
}
```

---

#### DataSources

**Remote DataSource (Supabase):**
```dart
// lib/data/datasources/remote/supabase_datasource.dart
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../models/user_model.dart';

class SupabaseDataSource {
  final SupabaseClient _client;

  SupabaseDataSource(this._client);

  Future<UserModel> signIn(String email, String password) async {
    final response = await _client.auth.signInWithPassword(
      email: email,
      password: password,
    );

    if (response.session == null || response.user == null) {
      throw AuthException('Credenciais inválidas');
    }

    return UserModel.fromSupabase(response.user!);
  }

  Future<UserModel> signUp(String email, String password, String? name) async {
    final response = await _client.auth.signUp(
      email: email,
      password: password,
      data: name != null ? {'name': name} : null,
    );

    if (response.user == null) {
      throw AuthException('Erro ao criar conta');
    }

    return UserModel.fromSupabase(response.user!);
  }

  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  Stream<UserModel?> get authStateChanges {
    return _client.auth.onAuthStateChange.map((event) {
      final user = event.session?.user;
      return user != null ? UserModel.fromSupabase(user) : null;
    });
  }
}
```

**Local DataSource (SharedPreferences):**
```dart
// lib/data/datasources/local/preferences_datasource.dart
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class PreferencesDataSource {
  static const String _sessionKey = 'user_session';
  static const String _themeKey = 'theme_mode';

  Future<void> saveSession(Map<String, dynamic> session) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_sessionKey, jsonEncode(session));
  }

  Future<Map<String, dynamic>?> getSession() async {
    final prefs = await SharedPreferences.getInstance();
    final sessionStr = prefs.getString(_sessionKey);
    
    if (sessionStr == null) return null;
    
    return jsonDecode(sessionStr) as Map<String, dynamic>;
  }

  Future<void> clearSession() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_sessionKey);
  }

  Future<void> saveThemeMode(String themeMode) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_themeKey, themeMode);
  }

  Future<String?> getThemeMode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_themeKey);
  }
}
```

---

### 3️⃣ Presentation Layer (📱 UI)

**Responsabilidade:** Interface do usuário

**Regras:**
- ✅ Depende de Domain (UseCases, Entities)
- ✅ Usa Riverpod para estado
- ✅ **NÃO** chama Repository diretamente (apenas via UseCase)
- ✅ **NÃO** contém lógica de negócio

---

#### Providers (State Management)

**Exemplo: Auth Provider**
```dart
// lib/presentation/providers/auth_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../domain/entities/user.dart';
import '../../domain/usecases/auth/sign_in_usecase.dart';
import '../../domain/usecases/auth/sign_up_usecase.dart';
import '../../domain/usecases/auth/sign_out_usecase.dart';
import '../../core/di/injection.dart';

// State
class AuthState {
  final User? user;
  final bool loading;
  final String? error;

  const AuthState({
    this.user,
    this.loading = false,
    this.error,
  });

  bool get isAuthenticated => user != null;

  AuthState copyWith({
    User? user,
    bool? loading,
    String? error,
  }) {
    return AuthState(
      user: user ?? this.user,
      loading: loading ?? this.loading,
      error: error,
    );
  }
}

// Provider
@riverpod
class AuthNotifier extends _$AuthNotifier {
  late final SignInUseCase _signInUseCase;
  late final SignUpUseCase _signUpUseCase;
  late final SignOutUseCase _signOutUseCase;
  StreamSubscription<User?>? _authSubscription;

  @override
  AuthState build() {
    _signInUseCase = getIt<SignInUseCase>();
    _signUpUseCase = getIt<SignUpUseCase>();
    _signOutUseCase = getIt<SignOutUseCase>();
    
    _listenToAuthChanges();
    
    return const AuthState();
  }

  void _listenToAuthChanges() {
    final authRepository = getIt<IAuthRepository>();
    _authSubscription = authRepository.authStateChanges.listen((user) {
      state = state.copyWith(user: user);
    });
  }

  Future<void> signIn(String email, String password) async {
    state = state.copyWith(loading: true, error: null);

    final result = await _signInUseCase(email: email, password: password);

    result.fold(
      (failure) => state = state.copyWith(
        loading: false,
        error: failure.message,
      ),
      (user) => state = state.copyWith(
        loading: false,
        user: user,
      ),
    );
  }

  Future<void> signUp(String email, String password, String? name) async {
    state = state.copyWith(loading: true, error: null);

    final result = await _signUpUseCase(
      email: email,
      password: password,
      name: name,
    );

    result.fold(
      (failure) => state = state.copyWith(
        loading: false,
        error: failure.message,
      ),
      (user) => state = state.copyWith(
        loading: false,
        user: user,
      ),
    );
  }

  Future<void> signOut() async {
    await _signOutUseCase();
    state = const AuthState();
  }

  @override
  void dispose() {
    _authSubscription?.cancel();
    super.dispose();
  }
}
```

---

#### Pages (Screens)

**Exemplo: Login Page**
```dart
// lib/presentation/pages/auth/login_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/auth_provider.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    // Watch auth state
    final authState = ref.watch(authNotifierProvider);

    // Listen to errors
    ref.listen<AuthState>(authNotifierProvider, (previous, next) {
      if (next.error != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(next.error!)),
        );
      }

      if (next.isAuthenticated) {
        Navigator.of(context).pushReplacementNamed('/dashboard');
      }
    });

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFFAFAFA), Color(0xFFE5E5E5)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: EdgeInsets.all(24),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Logo
                    Image.asset('assets/images/logo.png', height: 80),
                    SizedBox(height: 48),

                    // Email
                    TextFormField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        labelText: 'Email',
                        prefixIcon: Icon(Icons.mail),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Digite seu email';
                        }
                        return null;
                      },
                    ),
                    SizedBox(height: 16),

                    // Password
                    TextFormField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        labelText: 'Senha',
                        prefixIcon: Icon(Icons.lock),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Digite sua senha';
                        }
                        return null;
                      },
                    ),
                    SizedBox(height: 24),

                    // Login Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: authState.loading ? null : _handleLogin,
                        child: authState.loading
                            ? SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : Text('Entrar'),
                      ),
                    ),
                    SizedBox(height: 16),

                    // Cadastro
                    TextButton(
                      onPressed: () {
                        Navigator.of(context).pushNamed('/signup');
                      },
                      child: Text('Criar conta'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _handleLogin() async {
    if (_formKey.currentState!.validate()) {
      await ref.read(authNotifierProvider.notifier).signIn(
            _emailController.text,
            _passwordController.text,
          );
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
```

---

## ✅ Vantagens da Clean Architecture

### 1. Testabilidade

**Fácil testar cada camada isoladamente:**

```dart
// test/unit/domain/usecases/sign_in_usecase_test.dart
void main() {
  late SignInUseCase useCase;
  late MockAuthRepository mockRepository;

  setUp(() {
    mockRepository = MockAuthRepository();
    useCase = SignInUseCase(mockRepository);
  });

  test('deve retornar User quando credenciais válidas', () async {
    // Arrange
    when(() => mockRepository.signIn(
          email: any(named: 'email'),
          password: any(named: 'password'),
        )).thenAnswer((_) async => Right(testUser));

    // Act
    final result = await useCase(
      email: 'test@test.com',
      password: '123456',
    );

    // Assert
    expect(result, Right(testUser));
    verify(() => mockRepository.signIn(
          email: 'test@test.com',
          password: '123456',
        )).called(1);
  });

  test('deve retornar ValidationFailure quando email vazio', () async {
    // Act
    final result = await useCase(email: '', password: '123456');

    // Assert
    expect(result.isLeft(), true);
    result.fold(
      (failure) => expect(failure, isA<ValidationFailure>()),
      (_) => fail('Deveria retornar failure'),
    );
    verifyNever(() => mockRepository.signIn(
          email: any(named: 'email'),
          password: any(named: 'password'),
        ));
  });
}
```

---

### 2. Manutenibilidade

**Mudanças isoladas:**

- Trocar Supabase por Firebase? → Só muda Data Layer
- Trocar Riverpod por GetX? → Só muda Presentation Layer
- Mudar regra de validação? → Só muda Domain Layer (UseCase)

---

### 3. Escalabilidade

**Adicionar nova feature é simples:**

1. Criar Entity (Domain)
2. Criar Repository Interface (Domain)
3. Criar UseCases (Domain)
4. Implementar Repository (Data)
5. Criar Provider (Presentation)
6. Criar Page (Presentation)

**Cada passo é independente e testável.**

---

## 📊 Comparação Final

| Aspecto | React Atual | Flutter Clean | Vantagem |
|---------|-------------|--------------|----------|
| **Organização** | Flat (por tipo) | Hierárquica (por feature + camada) | ✅ Flutter |
| **Testabilidade** | 40-60% | 80-95% | ✅ Flutter |
| **Lógica isolada** | ❌ Misturada com UI | ✅ Domain Layer | ✅ Flutter |
| **Reusabilidade** | Hooks limitados | UseCases reutilizáveis | ✅ Flutter |
| **Manutenção** | Difícil (acoplamento) | Fácil (isolamento) | ✅ Flutter |
| **Curva aprendizado** | Baixa | Média-Alta | ⚠️ React |
| **Escalabilidade** | Limitada | Infinita | ✅ Flutter |

---

**FIM DO DOCUMENTO**

**Status:** Arquitetura Completa Detalhada ✅  
**Próximo:** Stack Tecnológico Completo
