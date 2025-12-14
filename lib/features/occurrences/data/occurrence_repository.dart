import 'package:soloforte_app/features/occurrences/domain/occurrence_model.dart';

abstract class OccurrenceRepository {
  Future<List<Occurrence>> getOccurrences();
  Future<Occurrence?> getOccurrenceById(String id);
  Future<void> createOccurrence(Occurrence occurrence);
  Future<void> updateOccurrence(Occurrence occurrence);
  Future<void> deleteOccurrence(String id);
}

class MockOccurrenceRepository implements OccurrenceRepository {
  final List<Occurrence> _items = [
    Occurrence(
      id: '1',
      title: 'Lagarta na Soja',
      description:
          'Infestação severa na borda leste. Desfolha estimada em 30%. Recomenda-se aplicação imediata de inseticida.',
      type: 'pest',
      severity: 0.85,
      areaName: 'Talhão Norte',
      date: DateTime.now().subtract(const Duration(hours: 2)),
      status: 'active',
      images: [
        'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=200&auto=format&fit=crop',
      ],
      latitude: -23.5505,
      longitude: -46.6333,
      timeline: [
        TimelineEvent(
          id: '1',
          title: 'Aplicação Inseticida',
          description: 'Produto XYZ (2L/ha)',
          date: DateTime.now().subtract(const Duration(days: 2)),
          type: 'action',
          authorName: 'João Silva',
        ),
      ],
    ),
    Occurrence(
      id: '2',
      title: 'Ferrugem Asiática',
      description: 'Primeiros sinais detectados.',
      type: 'disease',
      severity: 0.60,
      areaName: 'Lavoura Sul',
      date: DateTime.now().subtract(const Duration(days: 1)),
      status: 'monitoring',
      images: [
        'https://plus.unsplash.com/premium_photo-1661962360809-548de84dfb50?q=80&w=200&auto=format&fit=crop',
      ],
      latitude: -23.5505,
      longitude: -46.6333,
    ),
    Occurrence(
      id: '3',
      title: 'Falta de Nitrogênio',
      description: 'Folhas amareladas no centro da área.',
      type: 'deficiency',
      severity: 0.40,
      areaName: 'Área Teste',
      date: DateTime.now().subtract(const Duration(days: 3)),
      status: 'resolved',
      images: [
        'https://images.unsplash.com/photo-1592864696472-3c139db08c3e?q=80&w=200&auto=format&fit=crop',
      ],
      latitude: -23.5505,
      longitude: -46.6333,
    ),
  ];

  @override
  Future<List<Occurrence>> getOccurrences() async {
    await Future.delayed(const Duration(milliseconds: 800)); // Simula network
    return _items;
  }

  @override
  Future<Occurrence?> getOccurrenceById(String id) async {
    await Future.delayed(const Duration(milliseconds: 500));
    try {
      return _items.firstWhere((e) => e.id == id);
    } catch (e) {
      return null;
    }
  }

  @override
  Future<void> createOccurrence(Occurrence occurrence) async {
    await Future.delayed(const Duration(seconds: 1));
    _items.insert(0, occurrence);
  }

  @override
  Future<void> updateOccurrence(Occurrence occurrence) async {
    await Future.delayed(const Duration(seconds: 1));
    final index = _items.indexWhere((e) => e.id == occurrence.id);
    if (index >= 0) {
      _items[index] = occurrence;
    }
  }

  @override
  Future<void> deleteOccurrence(String id) async {
    await Future.delayed(const Duration(seconds: 1));
    _items.removeWhere((e) => e.id == id);
  }
}
