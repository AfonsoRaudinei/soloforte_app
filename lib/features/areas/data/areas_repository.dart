import '../domain/area_model.dart';

class AreasRepository {
  // Mock data para desenvolvimento
  Future<List<Area>> getAreas() async {
    await Future.delayed(const Duration(milliseconds: 500));

    return [
      Area(
        id: '1',
        name: 'Talhão Norte',
        hectares: 45.5,
        clienteNome: 'João Silva',
        fazendaNome: 'Fazenda Esperança',
        status: 'active',
        culture: 'Soja',
        safra: '2024/2025',
        ndviAverage: 0.72,
        coordinates: [
          const LatLng(-23.5505, -46.6333),
          const LatLng(-23.5515, -46.6333),
          const LatLng(-23.5515, -46.6343),
          const LatLng(-23.5505, -46.6343),
        ],
        lastUpdate: DateTime.now().subtract(const Duration(days: 2)),
      ),
      Area(
        id: '2',
        name: 'Talhão Sul',
        hectares: 32.8,
        clienteNome: 'João Silva',
        fazendaNome: 'Fazenda Esperança',
        status: 'monitoring',
        culture: 'Milho',
        safra: '2024/2025',
        ndviAverage: 0.58,
        coordinates: [
          const LatLng(-23.5525, -46.6333),
          const LatLng(-23.5535, -46.6333),
          const LatLng(-23.5535, -46.6343),
          const LatLng(-23.5525, -46.6343),
        ],
        lastUpdate: DateTime.now().subtract(const Duration(days: 5)),
      ),
      Area(
        id: '3',
        name: 'Área Experimental',
        hectares: 12.3,
        clienteNome: 'Maria Santos',
        fazendaNome: 'Fazenda Vista Alegre',
        status: 'active',
        culture: 'Algodão',
        safra: '2024/2025',
        ndviAverage: 0.81,
        coordinates: [
          const LatLng(-23.5545, -46.6333),
          const LatLng(-23.5555, -46.6333),
          const LatLng(-23.5555, -46.6343),
          const LatLng(-23.5545, -46.6343),
        ],
        lastUpdate: DateTime.now().subtract(const Duration(hours: 12)),
      ),
    ];
  }
}
