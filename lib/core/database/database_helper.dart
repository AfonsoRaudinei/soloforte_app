import 'dart:async';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  static Database? _database;

  factory DatabaseHelper() => _instance;

  DatabaseHelper._internal();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB();
    return _database!;
  }

  Future<Database> _initDB() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'soloforte.db');

    return await openDatabase(
      path,
      version: 3,
      onCreate: _createDB,
      onUpgrade: _onUpgrade,
    );
  }

  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    if (oldVersion < 2) {
      await db.execute('''
        CREATE TABLE weather_cache (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          data TEXT NOT NULL,
          timestamp INTEGER NOT NULL
        )
      ''');
    }
    if (oldVersion < 3) {
      await db.execute('''
        CREATE TABLE visits (
          id TEXT PRIMARY KEY,
          client_id TEXT NOT NULL,
          check_in_time INTEGER NOT NULL,
          check_out_time INTEGER,
          status TEXT NOT NULL,
          data TEXT NOT NULL
        )
      ''');
    }
  }

  Future<void> _createDB(Database db, int version) async {
    await db.execute('''
      CREATE TABLE ndvi_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        area_id TEXT NOT NULL,
        date TEXT NOT NULL,
        image_path TEXT,
        stats TEXT,
        created_at INTEGER NOT NULL,
        UNIQUE(area_id, date)
      )
    ''');

    // Index for faster search
    await db.execute(
      'CREATE INDEX idx_ndvi_area_date ON ndvi_cache (area_id, date)',
    );

    // Weather Cache
    await db.execute('''
      CREATE TABLE weather_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        data TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    ''');

    // Visits
    await db.execute('''
      CREATE TABLE visits (
        id TEXT PRIMARY KEY,
        client_id TEXT NOT NULL,
        check_in_time INTEGER NOT NULL,
        check_out_time INTEGER,
        status TEXT NOT NULL,
        data TEXT NOT NULL
      )
    ''');
  }

  Future<void> close() async {
    final db = _database;
    if (db != null) {
      await db.close();
    }
  }
}
