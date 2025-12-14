import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/features/occurrences/data/occurrence_repository.dart';
import 'package:soloforte_app/features/occurrences/domain/occurrence_model.dart';

// Repository Provider
final occurrenceRepositoryProvider = Provider<OccurrenceRepository>((ref) {
  return MockOccurrenceRepository();
});

// List Provider (Async/Stream)
final occurrencesProvider =
    AsyncNotifierProvider<OccurrenceNotifier, List<Occurrence>>(() {
      return OccurrenceNotifier();
    });

class OccurrenceNotifier extends AsyncNotifier<List<Occurrence>> {
  @override
  Future<List<Occurrence>> build() async {
    final repository = ref.read(occurrenceRepositoryProvider);
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
    // Refresh list locally to avoid extra fetch or handle optimistic update
    final previousState = state.asData?.value ?? [];
    state = AsyncValue.data([occurrence, ...previousState]);
  }

  Future<void> updateOccurrence(Occurrence occurrence) async {
    final repository = ref.read(occurrenceRepositoryProvider);
    await repository.updateOccurrence(occurrence);

    // Optimistic update
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

// Single Occurrence Provider
final occurrenceDetailProvider = FutureProvider.family<Occurrence?, String>((
  ref,
  id,
) async {
  final repository = ref.watch(occurrenceRepositoryProvider);
  return repository.getOccurrenceById(id);
});
