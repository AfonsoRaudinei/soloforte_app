import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:path_provider/path_provider.dart';
import 'package:soloforte_app/core/database/database_helper.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart' as p;

class NdviCacheEntry {
  final Uint8List? imageBytes;
  final Map<String, dynamic>? stats;

  NdviCacheEntry({this.imageBytes, this.stats});
}

class NdviCacheService {
  final DatabaseHelper _dbHelper = DatabaseHelper();

  Future<void> saveNdviData({
    required String areaId,
    required DateTime date,
    required Uint8List? imageBytes,
    required Map<String, dynamic>? stats,
  }) async {
    final db = await _dbHelper.database;
    final dateStr = date.toIso8601String().split('T')[0]; // Store as YYYY-MM-DD

    String? imagePath;
    if (imageBytes != null) {
      final directory = await getApplicationDocumentsDirectory();
      final imagesDir = Directory(p.join(directory.path, 'ndvi_images'));
      if (!await imagesDir.exists()) {
        await imagesDir.create(recursive: true);
      }

      final fileName = '${areaId}_$dateStr.png';
      final file = File(p.join(imagesDir.path, fileName));
      await file.writeAsBytes(imageBytes);
      imagePath = file.path;
    }

    final statsJson = stats != null ? jsonEncode(stats) : null;

    await db.insert('ndvi_cache', {
      'area_id': areaId,
      'date': dateStr,
      'image_path': imagePath,
      'stats': statsJson,
      'created_at': DateTime.now().millisecondsSinceEpoch,
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<NdviCacheEntry?> getNdviData({
    required String areaId,
    required DateTime date,
  }) async {
    final db = await _dbHelper.database;
    final dateStr = date.toIso8601String().split('T')[0];

    final List<Map<String, dynamic>> maps = await db.query(
      'ndvi_cache',
      where: 'area_id = ? AND date = ?',
      whereArgs: [areaId, dateStr],
    );

    if (maps.isEmpty) return null;

    final row = maps.first;

    Uint8List? imageBytes;
    final imagePath = row['image_path'] as String?;
    if (imagePath != null) {
      final file = File(imagePath);
      if (await file.exists()) {
        imageBytes = await file.readAsBytes();
      }
    }

    Map<String, dynamic>? stats;
    final statsStr = row['stats'] as String?;
    if (statsStr != null) {
      try {
        stats = jsonDecode(statsStr);
      } catch (e) {
        // ignore error
      }
    }

    if (imageBytes == null && stats == null) return null;

    return NdviCacheEntry(imageBytes: imageBytes, stats: stats);
  }

  Future<List<DateTime>> getAvailableDates(String areaId) async {
    final db = await _dbHelper.database;
    final List<Map<String, dynamic>> maps = await db.query(
      'ndvi_cache',
      columns: ['date'],
      where: 'area_id = ?',
      whereArgs: [areaId],
      orderBy: 'date DESC',
    );

    return maps.map((row) => DateTime.parse(row['date'] as String)).toList();
  }
}
