import 'dart:convert';

import 'package:sqflite/sqflite.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:soloforte_app/core/database/database_helper.dart';
import '../domain/visit_model.dart';

part 'visit_repository.g.dart';

abstract class VisitRepository {
  Future<void> saveVisit(Visit visit);
  Future<List<Visit>> getVisits();
  Future<Visit?> getActiveVisit();
}

class LocalVisitRepository implements VisitRepository {
  final DatabaseHelper _dbHelper = DatabaseHelper();

  @override
  Future<void> saveVisit(Visit visit) async {
    final db = await _dbHelper.database;
    await db.insert('visits', {
      'id': visit.id,
      'client_id': visit.client.id,
      'check_in_time': visit.checkInTime.millisecondsSinceEpoch,
      'check_out_time': visit.checkOutTime?.millisecondsSinceEpoch,
      'status': visit.status.name,
      'data': jsonEncode(visit.toJson()),
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  @override
  Future<List<Visit>> getVisits() async {
    final db = await _dbHelper.database;
    final maps = await db.query('visits', orderBy: 'check_in_time DESC');
    return maps.map((e) {
      final data = jsonDecode(e['data'] as String) as Map<String, dynamic>;
      // Ensure LatLng lists are parsed correctly if implicit conversion fails
      // But freezed generated code usually handles Map<String, dynamic> fine
      return Visit.fromJson(data);
    }).toList();
  }

  @override
  Future<Visit?> getActiveVisit() async {
    final db = await _dbHelper.database;
    final maps = await db.query(
      'visits',
      where: 'status = ?',
      whereArgs: ['ongoing'],
      limit: 1,
    );
    if (maps.isEmpty) return null;
    final data =
        jsonDecode(maps.first['data'] as String) as Map<String, dynamic>;
    return Visit.fromJson(data);
  }
}

@Riverpod(keepAlive: true)
VisitRepository visitRepository(Ref ref) {
  return LocalVisitRepository();
}
