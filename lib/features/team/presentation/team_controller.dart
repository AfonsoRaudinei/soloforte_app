import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:soloforte_app/features/team/data/team_repository.dart';
import 'package:soloforte_app/features/team/domain/team_member_model.dart';

part 'team_controller.freezed.dart';

@freezed
class TeamState with _$TeamState {
  const factory TeamState({
    @Default([]) List<TeamMember> allMembers,
    @Default([]) List<TeamMember> filteredMembers,
    @Default(true) bool isLoading,
    @Default(null) String? error,
    @Default(null) TeamMemberStatus? statusFilter,
    @Default(null) TeamMemberRole? roleFilter,
    @Default('') String searchQuery,
  }) = _TeamState;
}

class TeamController extends StateNotifier<TeamState> {
  final TeamRepository _repository;

  TeamController(this._repository) : super(const TeamState()) {
    loadMembers();
  }

  Future<void> loadMembers() async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final members = await _repository.getTeamMembers();
      state = state.copyWith(
        isLoading: false,
        allMembers: members,
        filteredMembers: members,
      );
      _applyFilters();
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  void setStatusFilter(TeamMemberStatus? status) {
    state = state.copyWith(statusFilter: status);
    _applyFilters();
  }

  void setRoleFilter(TeamMemberRole? role) {
    state = state.copyWith(roleFilter: role);
    _applyFilters();
  }

  void setSearchQuery(String query) {
    state = state.copyWith(searchQuery: query);
    _applyFilters();
  }

  void _applyFilters() {
    var result = state.allMembers;

    if (state.statusFilter != null) {
      result = result.where((m) => m.status == state.statusFilter).toList();
    }

    if (state.roleFilter != null) {
      result = result.where((m) => m.role == state.roleFilter).toList();
    }

    if (state.searchQuery.isNotEmpty) {
      final query = state.searchQuery.toLowerCase();
      result = result.where((m) {
        return m.name.toLowerCase().contains(query) ||
            m.email.toLowerCase().contains(query);
      }).toList();
    }

    state = state.copyWith(filteredMembers: result);
  }
}

final teamRepositoryProvider = Provider<TeamRepository>((ref) {
  return MockTeamRepository();
});

final teamControllerProvider = StateNotifierProvider<TeamController, TeamState>(
  (ref) {
    final repo = ref.watch(teamRepositoryProvider);
    return TeamController(repo);
  },
);
