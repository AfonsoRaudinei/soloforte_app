import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/features/team/data/hr_repository.dart';
import 'package:soloforte_app/features/team/domain/hr_models.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'hr_controller.freezed.dart';

@freezed
class HRState with _$HRState {
  const factory HRState({
    @Default([]) List<TimeEntry> todayEntries,
    @Default([]) List<ApprovalRequest> pendingRequests,
    @Default(false) bool isLoading,
    String? error,
  }) = _HRState;
}

class HRController extends StateNotifier<HRState> {
  final HRRepository _repository;

  HRController(this._repository) : super(const HRState()) {
    loadInitialData();
  }

  Future<void> loadInitialData() async {
    state = state.copyWith(isLoading: true);
    try {
      final entries = await _repository.getTodayEntries('me');
      final requests = await _repository.getPendingRequests();
      state = state.copyWith(
        todayEntries: entries,
        pendingRequests: requests,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  Future<void> clockIn(String location) async {
    state = state.copyWith(isLoading: true);
    await _repository.clockIn('me', location);
    loadInitialData(); // Refresh
  }

  Future<void> clockOut(String entryId) async {
    state = state.copyWith(isLoading: true);
    await _repository.clockOut('me', entryId);
    loadInitialData(); // Refresh
  }

  Future<void> approveRequest(String id) async {
    // Optimistic update or refresh
    await _repository.approveRequest(id);
    loadInitialData();
  }

  Future<void> rejectRequest(String id) async {
    await _repository.rejectRequest(id);
    loadInitialData();
  }

  Future<void> sendSOS(double lat, double long) async {
    await _repository.sendSOS('me', lat, long);
    // Usually show a dialog/snackbar, handled in UI
  }
}

final hrRepositoryProvider = Provider<HRRepository>((ref) {
  return MockHRRepository();
});

final hrControllerProvider = StateNotifierProvider<HRController, HRState>((
  ref,
) {
  return HRController(ref.watch(hrRepositoryProvider));
});
