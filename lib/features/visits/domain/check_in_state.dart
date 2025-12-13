import 'visita_model.dart';

enum CheckInStatus { checkedOut, checkedIn }

class CheckInState {
  final CheckInStatus status;
  final Visita? currentVisita;

  const CheckInState({required this.status, this.currentVisita});

  bool get isCheckedIn => status == CheckInStatus.checkedIn;

  CheckInState copyWith({CheckInStatus? status, Visita? currentVisita}) {
    return CheckInState(
      status: status ?? this.status,
      currentVisita: currentVisita ?? this.currentVisita,
    );
  }
}
