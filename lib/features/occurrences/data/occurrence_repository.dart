import 'dart:convert';
import 'package:sqflite/sqflite.dart';
import 'package:soloforte_app/core/database/database_helper.dart';
import 'package:soloforte_app/features/occurrences/domain/occurrence_model.dart';

abstract class OccurrenceRepository {
  Future<List<Occurrence>> getOccurrences();
  Future<Occurrence?> getOccurrenceById(String id);
  Future<void> createOccurrence(Occurrence occurrence);
  Future<void> updateOccurrence(Occurrence occurrence);
  Future<void> deleteOccurrence(String id);
}

class LocalOccurrenceRepository implements OccurrenceRepository {
  final DatabaseHelper _dbHelper = DatabaseHelper.instance;

  @override
  Future<List<Occurrence>> getOccurrences() async {
    final db = await _dbHelper.database;
    final maps = await db.query('occurrences', orderBy: 'date DESC');

    if (maps.isEmpty) {
      await _seedMocks();
      return _getMocks(); // Return mocks directly for this call
    }

    return maps.map((e) {
      final jsonStr = e['json_data'] as String;
      final data = jsonDecode(jsonStr) as Map<String, dynamic>;
      return Occurrence.fromJson(data);
    }).toList();
  }

  @override
  Future<Occurrence?> getOccurrenceById(String id) async {
    final db = await _dbHelper.database;
    final maps = await db.query(
      'occurrences',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    if (maps.isEmpty) return null;
    final jsonStr = maps.first['json_data'] as String;
    final data = jsonDecode(jsonStr) as Map<String, dynamic>;
    return Occurrence.fromJson(data);
  }

  @override
  Future<void> createOccurrence(Occurrence occurrence) async {
    final db = await _dbHelper.database;
    await db.insert('occurrences', {
      'id': occurrence.id,
      'area_name': occurrence.areaName,
      'date': occurrence.date.millisecondsSinceEpoch,
      'status': occurrence.status,
      'is_dirty': 1,
      'json_data': jsonEncode(occurrence.toJson()),
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  @override
  Future<void> updateOccurrence(Occurrence occurrence) async {
    // Same as create (Upsert)
    await createOccurrence(occurrence);
  }

  @override
  Future<void> deleteOccurrence(String id) async {
    final db = await _dbHelper.database;
    await db.delete('occurrences', where: 'id = ?', whereArgs: [id]);
  }

  Future<void> _seedMocks() async {
    final mocks = _getMocks();
    for (var item in mocks) {
      await createOccurrence(item);
    }
  }

  List<Occurrence> _getMocks() {
    return [
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
  }
}
