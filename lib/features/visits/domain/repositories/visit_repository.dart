import '../entities/visit.dart';

abstract class VisitRepository {
  Future<void> saveVisit(Visit visit);
  Future<List<Visit>> getVisits();
  Future<Visit?> getActiveVisit();
  Future<Visit?> getVisitById(String id);
}
