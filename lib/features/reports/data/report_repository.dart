import 'package:flutter_riverpod/flutter_riverpod.dart';

class ReportSummary {
  final String id;
  final String title;
  final String type; // 'Semanal', 'NDVI', 'Safra'
  final String period;
  final int areaCount;
  final int occurrenceCount;
  final DateTime createdAt;
  final String author;
  final String status; // 'completed', 'draft'

  ReportSummary({
    required this.id,
    required this.title,
    required this.type,
    required this.period,
    required this.areaCount,
    required this.occurrenceCount,
    required this.createdAt,
    required this.author,
    this.status = 'completed',
  });
}

class ReportRepository {
  final List<ReportSummary> _mockReports = [
    ReportSummary(
      id: '1',
      title: 'Relatório Semanal',
      type: 'Semanal',
      period: '22-28/Out/2025',
      areaCount: 3,
      occurrenceCount: 8,
      createdAt: DateTime(2025, 10, 28, 18, 0),
      author: 'João Silva',
    ),
    ReportSummary(
      id: '2',
      title: 'Análise NDVI Mensal',
      type: 'NDVI',
      period: 'Out/2025',
      areaCount: 5,
      occurrenceCount: 0,
      createdAt: DateTime(2025, 10, 25, 10, 30),
      author: 'Maria Santos',
    ),
    ReportSummary(
      id: '3',
      title: 'Resumo de Safra',
      type: 'Safra',
      period: 'Set-Out/2025',
      areaCount: 12,
      occurrenceCount: 45,
      createdAt: DateTime(2025, 10, 20, 14, 15),
      author: 'João Silva',
    ),
  ];

  Future<List<ReportSummary>> getReports() async {
    await Future.delayed(const Duration(milliseconds: 500)); // Simulate network
    return _mockReports;
  }

  Future<ReportSummary?> getReportById(String id) async {
    await Future.delayed(const Duration(milliseconds: 500));
    try {
      return _mockReports.firstWhere((element) => element.id == id);
    } catch (e) {
      return null;
    }
  }
}

final reportRepositoryProvider = Provider((ref) => ReportRepository());

final reportByIdProvider = FutureProvider.family<ReportSummary?, String>((
  ref,
  id,
) async {
  final repo = ref.watch(reportRepositoryProvider);
  return repo.getReportById(id);
});
