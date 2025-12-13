import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';
import '../data/visita_repository.dart';
import '../domain/visita_model.dart';
import '../domain/check_in_state.dart';

final visitaRepositoryProvider = Provider<VisitaRepository>((ref) {
  return VisitaRepository();
});

final checkInProvider = StateNotifierProvider<CheckInNotifier, CheckInState>((
  ref,
) {
  final repository = ref.watch(visitaRepositoryProvider);
  return CheckInNotifier(repository);
});

class CheckInNotifier extends StateNotifier<CheckInState> {
  final VisitaRepository _repository;
  final _uuid = const Uuid();

  CheckInNotifier(this._repository)
    : super(const CheckInState(status: CheckInStatus.checkedOut)) {
    _loadActiveCheckIn();
  }

  Future<void> _loadActiveCheckIn() async {
    final visita = await _repository.loadActiveCheckIn();
    if (visita != null) {
      state = CheckInState(
        status: CheckInStatus.checkedIn,
        currentVisita: visita,
      );
    }
  }

  Future<void> checkIn({
    required String clienteId,
    required String fazendaId,
    required String clienteNome,
    required String fazendaNome,
    String? talhaoId,
    String? talhaoNome,
  }) async {
    final visita = Visita(
      id: _uuid.v4(),
      clienteId: clienteId,
      fazendaId: fazendaId,
      clienteNome: clienteNome,
      fazendaNome: fazendaNome,
      startTime: DateTime.now(),
      talhaoId: talhaoId,
      talhaoNome: talhaoNome,
    );

    await _repository.saveActiveCheckIn(visita);

    state = CheckInState(
      status: CheckInStatus.checkedIn,
      currentVisita: visita,
    );
  }

  Future<void> checkOut({String? observacoes}) async {
    if (state.currentVisita == null) return;

    final endTime = DateTime.now();
    final duration = endTime.difference(state.currentVisita!.startTime);

    final completedVisita = state.currentVisita!.copyWith(
      endTime: endTime,
      durationMinutes: duration.inMinutes,
      status: 'concluida',
      observacoes: observacoes,
    );

    // Salvar no histórico
    await _repository.saveToHistory(completedVisita);

    // Limpar check-in ativo
    await _repository.clearActiveCheckIn();

    state = const CheckInState(status: CheckInStatus.checkedOut);
  }

  Future<List<Visita>> getHistory() async {
    return await _repository.loadHistory();
  }
}
