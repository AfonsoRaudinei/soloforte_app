import '../domain/harvest_model.dart';

abstract class HarvestRepository {
  Future<List<Harvest>> getHarvests();
  Future<Harvest?> getHarvestById(String id);
  Future<void> saveHarvest(Harvest harvest);
}
