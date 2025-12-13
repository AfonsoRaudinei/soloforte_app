import 'package:freezed_annotation/freezed_annotation.dart';
import '../../clients/domain/client_model.dart';

part 'visit_model.freezed.dart';
part 'visit_model.g.dart';

@freezed
abstract class Visit with _$Visit {
  const factory Visit({
    required String id,
    required Client client,
    required DateTime checkInTime,
    DateTime? checkOutTime,
    required double latitude,
    required double longitude,
    String? checkOutNotes,
  }) = _Visit;

  factory Visit.fromJson(Map<String, dynamic> json) => _$VisitFromJson(json);
}
