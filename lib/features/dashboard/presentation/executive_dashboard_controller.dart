import 'dart:math';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'executive_dashboard_controller.freezed.dart';

// --- Models ---

enum AlertSeverity { info, warning, critical }

enum AlertType { ndvi, occurrence, budget, weather }

@freezed
class DashboardAlert with _$DashboardAlert {
  const factory DashboardAlert({
    required String id,
    required String title,
    required String message,
    required AlertSeverity severity,
    required AlertType type,
    DateTime? date,
    String? actionRoute, // Onde ir ao clicar
  }) = _DashboardAlert;
}

@freezed
class ExecutiveDashboardState with _$ExecutiveDashboardState {
  const factory ExecutiveDashboardState({
    @Default([]) List<DashboardAlert> alerts,
    @Default(true) bool isLoading,
    @Default(null) String? error,
    // Add KPI data holders here if we want them dynamic later
    @Default(0.0) double averageNdvi,
    @Default(0) int overdueOccurrencesCount,
    @Default(0) int todayEventsCount,
    @Default([]) List<Map<String, dynamic>> teamProductivity,
    @Default({}) Map<String, dynamic> summaryData,
    @Default([]) List<Map<String, dynamic>> goals,
  }) = _ExecutiveDashboardState;
}

// --- Controller ---

class ExecutiveDashboardController
    extends StateNotifier<ExecutiveDashboardState> {
  ExecutiveDashboardController() : super(const ExecutiveDashboardState()) {
    _loadData(); // Load initial mock data & logic
  }

  Future<void> updatePeriod(String period) async {
    // In real app, we would store the period and refetch with date range parameters
    state = state.copyWith(isLoading: true);
    await _loadData();
  }

  Future<void> _loadData() async {
    state = state.copyWith(isLoading: true);

    // Simulating delay for API call or calculation
    await Future.delayed(const Duration(milliseconds: 800));

    try {
      final random = Random();

      // Mock Agenda Data (Integration 1)
      // final todayEvents = 3 + random.nextInt(3); // Unused in fixed layout

      // Mock Team Productivity (Integration 2)
      final teamMetrics = [
        {'name': 'João Silva', 'visits': 45, 'rating': 5.0, 'isTop': true},
        {'name': 'Ana Souza', 'visits': 32, 'rating': 4.8, 'isTop': false},
        {'name': 'Carlos Lima', 'visits': 28, 'rating': 4.7, 'isTop': false},
      ];

      // New: Summary Data matching ASCII
      final summary = {
        'totalArea': '1.250 ha',
        'fields': '42',
        'producers': '15',
        'harvest': '2024/2025',
      };

      // New: Goals Data matching ASCII
      final goalsData = [
        {
          'title': 'Produtividade',
          'value': 85.0,
          'label': '55 sc',
          'color': 0xFF4CAF50,
        }, // Green
        {
          'title': 'Redução Perdas',
          'value': 92.0,
          'label': '<8%',
          'color': 0xFF2196F3,
        }, // Blue
        {
          'title': 'NDVI Médio',
          'value': 82.0,
          'label': '>0.7',
          'color': 0xFFFF9800,
        }, // Orange
        {
          'title': 'Visitas/mês',
          'value': 105.0,
          'label': '120',
          'color': 0xFF9C27B0,
        }, // Purple
      ];

      // 1. Calculate Alerts
      final alerts = <DashboardAlert>[];

      // ALERT 1: Critical Areas (NDVI < 0.45) -> Logic Simulation
      // Making it conditional based on random luck for demo
      final criticalAreasFound = 1;
      if (criticalAreasFound > 0) {
        alerts.add(
          DashboardAlert(
            id: 'alert_ndvi_1',
            title: 'Área Crítica',
            message: 'Talhão 5: NDVI 0.42',
            severity: AlertSeverity.critical,
            type: AlertType.ndvi,
            date: DateTime.now(),
            actionRoute: '/dashboard/ndvi',
          ),
        );
      }

      // Adding mock alerts to fill the list as per layout
      alerts.add(
        DashboardAlert(
          id: 'a2',
          title: 'Ferrugem Detectada',
          message: 'Talhão 12: Foco inicial',
          severity: AlertSeverity.critical,
          type: AlertType.occurrence,
        ),
      );
      alerts.add(
        DashboardAlert(
          id: 'a3',
          title: 'Estresse Hídrico',
          message: 'Talhão 23: Seca moderada',
          severity: AlertSeverity.critical,
          type: AlertType.weather,
        ),
      );

      alerts.add(
        DashboardAlert(
          id: 'w1',
          title: 'Atenção NDVI',
          message: 'Talhão 8 abaixo de 0.60',
          severity: AlertSeverity.warning,
          type: AlertType.ndvi,
        ),
      );
      alerts.add(
        DashboardAlert(
          id: 'w2',
          title: 'Manutenção',
          message: 'Trator A3 precisa de revisão',
          severity: AlertSeverity.warning,
          type: AlertType.budget,
        ),
      );

      state = state.copyWith(
        isLoading: false,
        alerts: alerts,
        averageNdvi: 0.72, // Match ASCII
        overdueOccurrencesCount: 12, // Match ASCII
        criticalAreasCount: 38, // Match "Areas Ativas" 38/42
        todayEventsCount: 28, // Using ASCII "Visitas Campo" value context
        teamProductivity: teamMetrics,
        summaryData: summary,
        goals: goalsData,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  void refresh() {
    _loadData();
  }
}

final executiveDashboardControllerProvider =
    StateNotifierProvider<
      ExecutiveDashboardController,
      ExecutiveDashboardState
    >((ref) {
      return ExecutiveDashboardController();
    });
