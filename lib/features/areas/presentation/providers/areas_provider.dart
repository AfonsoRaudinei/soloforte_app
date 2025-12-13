import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/areas_repository.dart';
import '../domain/area_model.dart';

final areasRepositoryProvider = Provider<AreasRepository>((ref) {
  return AreasRepository();
});

final areasProvider = FutureProvider<List<Area>>((ref) async {
  final repository = ref.watch(areasRepositoryProvider);
  return await repository.getAreas();
});
