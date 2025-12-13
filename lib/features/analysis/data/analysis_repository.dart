import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../domain/analysis_model.dart';

part 'analysis_repository.g.dart';

abstract class AnalysisRepository {
  Future<List<Analysis>> getAnalyses();
  Future<void> saveAnalysis(Analysis analysis);
}

class MockAnalysisRepository implements AnalysisRepository {
  final List<Analysis> _analyses = [];

  @override
  Future<List<Analysis>> getAnalyses() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return [..._analyses];
  }

  @override
  Future<void> saveAnalysis(Analysis analysis) async {
    await Future.delayed(const Duration(milliseconds: 800));
    _analyses.add(analysis);
  }
}

@Riverpod(keepAlive: true)
AnalysisRepository analysisRepository(Ref ref) {
  return MockAnalysisRepository();
}
