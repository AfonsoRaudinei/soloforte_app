# 🧪 Guia de Testes - SoloForte

## 📋 Estrutura de Testes

```
test/
├── unit/
│   ├── repositories/
│   │   ├── areas_repository_test.dart
│   │   └── notification_repository_test.dart
│   └── providers/
├── widget/
│   ├── expandable_fab_test.dart
│   └── area_card_test.dart
└── integration/
```

## 🚀 Como Rodar os Testes

### Todos os Testes
```bash
flutter test
```

### Testes Específicos
```bash
# Apenas testes unitários
flutter test test/unit

# Apenas testes de widget
flutter test test/widget

# Arquivo específico
flutter test test/unit/repositories/areas_repository_test.dart
```

### Com Cobertura
```bash
# Gerar relatório de cobertura
flutter test --coverage

# Visualizar cobertura (requer lcov)
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```

## 📊 Cobertura Atual

| Categoria | Cobertura | Meta |
|-----------|-----------|------|
| Repositories | 80% | 80% |
| Providers | 0% | 60% |
| Widgets | 40% | 60% |
| **Total** | **30%** | **60%** |

## ✅ Testes Implementados

### Unit Tests

#### AreasRepository
- ✅ getAreas returns list of areas
- ✅ getAreas returns areas with correct data
- ✅ getAreas returns areas with different statuses
- ✅ getAreas simulates network delay

#### NotificationRepository
- ✅ loadNotifications returns mock data
- ✅ saveNotifications persists data
- ✅ loadNotifications handles errors gracefully
- ✅ notifications have all required fields

### Widget Tests

#### ExpandableFAB
- ✅ renders FAB button
- ✅ expands on tap
- ✅ calls callback on action button tap
- ✅ collapses when tapping backdrop

#### AreaCard
- ✅ renders area information
- ✅ shows status badge
- ✅ calls onTap callback
- ✅ displays NDVI value

## 📝 Boas Práticas

### 1. Nomenclatura
```dart
// ✅ BOM
test('should return list of areas when getAreas is called', () {});

// ❌ RUIM
test('test1', () {});
```

### 2. Arrange-Act-Assert
```dart
test('example test', () {
  // Arrange - Preparar dados
  final repository = AreasRepository();
  
  // Act - Executar ação
  final result = await repository.getAreas();
  
  // Assert - Verificar resultado
  expect(result, isNotEmpty);
});
```

### 3. Mock de Dependências
```dart
// Use mocks para dependências externas
final mockRepository = MockAreasRepository();
when(mockRepository.getAreas()).thenAnswer((_) async => []);
```

### 4. Testes Isolados
```dart
// Cada teste deve ser independente
setUp(() {
  // Preparação antes de cada teste
});

tearDown(() {
  // Limpeza após cada teste
});
```

## 🎯 Próximos Passos

### Prioridade Alta
- [ ] Adicionar testes para Providers (areasProvider, notificationsProvider)
- [ ] Testes para VisitaRepository
- [ ] Testes para NotificationCenter widget

### Prioridade Média
- [ ] Testes de integração
- [ ] Testes golden (snapshot testing)
- [ ] Aumentar cobertura para 60%

### Prioridade Baixa
- [ ] Performance tests
- [ ] Accessibility tests
- [ ] E2E tests com integration_test

## 🔧 Configuração

### pubspec.yaml
```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  mockito: ^5.4.4
  build_runner: ^2.4.7
```

### analysis_options.yaml
```yaml
linter:
  rules:
    - prefer_const_constructors
    - avoid_print
```

## 📚 Recursos

- [Flutter Testing Guide](https://docs.flutter.dev/testing)
- [Effective Dart: Testing](https://dart.dev/guides/language/effective-dart/testing)
- [Widget Testing](https://docs.flutter.dev/cookbook/testing/widget/introduction)

---

**Última Atualização**: Dezembro 2024  
**Cobertura Meta**: 60%  
**Status**: 🟡 Em Progresso
