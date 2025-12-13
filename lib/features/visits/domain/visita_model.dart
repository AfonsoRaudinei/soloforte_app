import 'package:freezed_annotation/freezed_annotation.dart';

part 'visita_model.freezed.dart';
part 'visita_model.g.dart';

@freezed
class Visita with _$Visita {
  const factory Visita({
    required String id,
    required String clienteId,
    required String fazendaId,
    required String clienteNome,
    required String fazendaNome,
    required DateTime startTime,
    DateTime? endTime,
    int? durationMinutes,
    @Default('em_andamento')
    String status, // em_andamento, concluida, cancelada
    String? observacoes,
    List<String>? fotos,
    String? talhaoId,
    String? talhaoNome,
  }) = _Visita;

  factory Visita.fromJson(Map<String, dynamic> json) => _$VisitaFromJson(json);
}
