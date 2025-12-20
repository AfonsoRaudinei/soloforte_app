import '../entities/area.dart';

abstract class AreasRepository {
  Future<void> saveArea(Area area);
  Future<List<Area>> getAreas();
  Future<Area?> getAreaById(String id);
}
