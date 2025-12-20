import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../domain/entities/occurrence.dart';
import '../../data/repositories/occurrence_repository_impl.dart';

part 'occurrence_controller.g.dart';

@riverpod
class OccurrenceController extends _$OccurrenceController {
  @override
  Future<List<Occurrence>> build() async {
    final repository = ref.watch(occurrenceRepositoryProvider);
    return repository.getOccurrences();
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final repository = ref.read(occurrenceRepositoryProvider);
      return repository.getOccurrences();
    });
  }

  Future<void> addOccurrence(Occurrence occurrence) async {
    final repository = ref.read(occurrenceRepositoryProvider);
    await repository.createOccurrence(occurrence);

    // Refresh list locally
    final previousState = state.asData?.value ?? [];
    state = AsyncValue.data([occurrence, ...previousState]);
  }

  Future<void> updateOccurrence(Occurrence occurrence) async {
    final repository = ref.read(occurrenceRepositoryProvider);
    await repository.updateOccurrence(occurrence);

    state.whenData((items) {
      final index = items.indexWhere((e) => e.id == occurrence.id);
      if (index != -1) {
        final newItems = List<Occurrence>.from(items);
        newItems[index] = occurrence;
        state = AsyncValue.data(newItems);
      }
    });
  }

  Future<void> deleteOccurrence(String id) async {
    final repository = ref.read(occurrenceRepositoryProvider);
    await repository.deleteOccurrence(id);

    state.whenData((items) {
      state = AsyncValue.data(items.where((e) => e.id != id).toList());
    });
  }
}
