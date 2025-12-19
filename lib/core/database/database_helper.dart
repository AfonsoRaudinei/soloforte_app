import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static const _databaseName = "soloforte.db";
  static const _databaseVersion = 2; // Incremented version

  static const tableVisits = 'visits';
  static const tableAreas = 'areas';
  static const tableOccurrences = 'occurrences';

  // Singleton pattern
  DatabaseHelper._privateConstructor();
  static final DatabaseHelper instance = DatabaseHelper._privateConstructor();

  static Database? _database;
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  _initDatabase() async {
    String path = join(await getDatabasesPath(), _databaseName);
    return await openDatabase(
      path,
      version: _databaseVersion,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }

  Future _onCreate(Database db, int version) async {
    await _createVisitsTable(db);
    await _createAreasTable(db);
    await _createOccurrencesTable(db);
  }

  Future _onUpgrade(Database db, int oldVersion, int newVersion) async {
    // Simple strategy for dev: drop and recreate.
    // for prod, write migration logic.
    await db.execute('DROP TABLE IF EXISTS $tableVisits');
    await db.execute('DROP TABLE IF EXISTS $tableAreas');
    await db.execute('DROP TABLE IF EXISTS $tableOccurrences');
    await _onCreate(db, newVersion);
  }

  Future _createVisitsTable(Database db) async {
    await db.execute('''
      CREATE TABLE $tableVisits (
        id TEXT PRIMARY KEY,
        check_in_time INTEGER NOT NULL,
        status TEXT NOT NULL,
        is_dirty INTEGER NOT NULL DEFAULT 0,
        json_data TEXT NOT NULL
      )
    ''');
  }

  Future _createAreasTable(Database db) async {
    await db.execute('''
      CREATE TABLE $tableAreas (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        is_dirty INTEGER NOT NULL DEFAULT 0,
        json_data TEXT NOT NULL
      )
    ''');
  }

  Future _createOccurrencesTable(Database db) async {
    await db.execute('''
      CREATE TABLE $tableOccurrences (
        id TEXT PRIMARY KEY,
        area_name TEXT NOT NULL,
        date INTEGER NOT NULL,
        status TEXT NOT NULL,
        is_dirty INTEGER NOT NULL DEFAULT 0,
        json_data TEXT NOT NULL
      )
    ''');
  }
}
