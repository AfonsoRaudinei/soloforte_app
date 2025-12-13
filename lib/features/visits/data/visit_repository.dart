import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../domain/visit_model.dart';

part 'visit_repository.g.dart';

abstract class VisitRepository {
  Future<void> saveVisit(Visit visit);
  Future<List<Visit>> getVisits();
}

class MockVisitRepository implements VisitRepository {
  final List<Visit> _visits = [];

  @override
  Future<void> saveVisit(Visit visit) async {
    await Future.delayed(const Duration(milliseconds: 500));
    final index = _visits.indexWhere((v) => v.id == visit.id);
    if (index != -1) {
      _visits[index] = visit;
    } else {
      _visits.add(visit);
    }
  }

  @override
  Future<List<Visit>> getVisits() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return [..._visits];
  }
}

@Riverpod(keepAlive: true)
VisitRepository visitRepository(Ref ref) {
  return MockVisitRepository();
}
