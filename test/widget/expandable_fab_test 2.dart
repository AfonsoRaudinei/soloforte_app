import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:soloforte_app/core/widgets/expandable_fab.dart';

void main() {
  group('ExpandableFAB Widget', () {
    testWidgets('renders FAB button', (WidgetTester tester) async {
      // Arrange & Act
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ExpandableFAB(
              onDrawArea: () {},
              onNewOccurrence: () {},
              onPestScanner: () {},
              onNewReport: () {},
            ),
          ),
        ),
      );

      // Assert
      expect(find.byType(FloatingActionButton), findsOneWidget);
      expect(find.byIcon(Icons.add), findsOneWidget);
    });

    testWidgets('expands on tap', (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ExpandableFAB(
              onDrawArea: () {},
              onNewOccurrence: () {},
              onPestScanner: () {},
              onNewReport: () {},
            ),
          ),
        ),
      );

      // Act
      await tester.tap(find.byType(FloatingActionButton));
      await tester.pumpAndSettle();

      // Assert
      expect(find.byIcon(Icons.close), findsOneWidget);
      expect(find.text('Desenhar Área'), findsOneWidget);
      expect(find.text('Nova Ocorrência'), findsOneWidget);
      expect(find.text('Scanner de Pragas'), findsOneWidget);
      expect(find.text('Novo Relatório'), findsOneWidget);
    });

    testWidgets('calls callback on action button tap', (
      WidgetTester tester,
    ) async {
      // Arrange
      bool drawAreaCalled = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ExpandableFAB(
              onDrawArea: () => drawAreaCalled = true,
              onNewOccurrence: () {},
              onPestScanner: () {},
              onNewReport: () {},
            ),
          ),
        ),
      );

      // Act - Expand FAB
      await tester.tap(find.byType(FloatingActionButton));
      await tester.pumpAndSettle();

      // Act - Tap action button
      await tester.tap(find.text('Desenhar Área'));
      await tester.pumpAndSettle();

      // Assert
      expect(drawAreaCalled, isTrue);
    });

    testWidgets('collapses when tapping backdrop', (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ExpandableFAB(
              onDrawArea: () {},
              onNewOccurrence: () {},
              onPestScanner: () {},
              onNewReport: () {},
            ),
          ),
        ),
      );

      // Act - Expand
      await tester.tap(find.byType(FloatingActionButton));
      await tester.pumpAndSettle();

      // Act - Tap backdrop (outside action buttons)
      await tester.tapAt(const Offset(10, 10));
      await tester.pumpAndSettle();

      // Assert
      expect(find.byIcon(Icons.add), findsOneWidget);
      expect(find.text('Desenhar Área'), findsNothing);
    });
  });
}
