import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../domain/entities/area.dart';
import '../../data/repositories/areas_repository_impl.dart';

part 'areas_controller.g.dart';

@riverpod
class AreasController extends _$AreasController {
  @override
  Future<List<Area>> build() async {
    final repository = ref.watch(areasRepositoryProvider);
    return repository.getAreas();
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final repository = ref.read(areasRepositoryProvider);
      return repository.getAreas();
    });
  }
}
