import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/features/visits/presentation/check_out_screen.dart';
import 'package:soloforte_app/features/visits/domain/visit_model.dart';
import 'package:soloforte_app/features/clients/domain/client_model.dart';
import 'package:mockito/mockito.dart';

// Mock VisitRepository
import 'package:soloforte_app/features/visits/data/visit_repository.dart';

class MockVisitRepository extends Mock implements VisitRepository {
  @override
  Future<void> saveVisit(Visit visit) async {}

  @override
  Future<List<Visit>> getVisits() async {
    return [];
  }

  @override
  Future<Visit?> getActiveVisit() async {
    return Visit(
      id: '123',
      client: Client(
        id: '1',
        name: 'Cliente Teste',
        email: 'test@client.com',
        phone: '123456789',
        cpfCnpj: '12345678900',
        address: 'Rua Teste',
        city: 'Cidade Teste',
        state: 'ST',
        type: 'producer',
        status: 'active',
        lastActivity: DateTime.now(),
      ),
      checkInTime: DateTime.now().subtract(const Duration(hours: 1)),
      latitude: 0,
      longitude: 0,
    );
  }
}

void main() {
  testWidgets('CheckOutScreen renders correctly', (WidgetTester tester) async {
    // Override dependency
    final mockRepo = MockVisitRepository();

    await tester.pumpWidget(
      ProviderScope(
        overrides: [visitRepositoryProvider.overrideWithValue(mockRepo)],
        child: const MaterialApp(home: CheckOutScreen()),
      ),
    );

    // Initial pump might show loading
    await tester.pump();
    // Wait for future to complete
    await tester.pump(const Duration(seconds: 1));

    // Assert Summary UI
    expect(find.text('Cliente Teste'), findsOneWidget);
    expect(find.textContaining('1h 0m'), findsOneWidget);

    // Assert Checklist
    expect(find.text('Atividades Realizadas'), findsOneWidget);
    expect(find.text('Verificação de pragas'), findsOneWidget);

    // Assert Observations
    expect(find.text('Observações Finais'), findsOneWidget);
    expect(find.byType(TextField), findsOneWidget);

    // Assert Button
    expect(find.text('Encerrar Visita & Salvar'), findsOneWidget);
  });
}
