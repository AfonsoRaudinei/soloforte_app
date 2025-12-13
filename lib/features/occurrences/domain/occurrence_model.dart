import 'package:freezed_annotation/freezed_annotation.dart';

part 'occurrence_model.freezed.dart';
part 'occurrence_model.g.dart';

@freezed
abstract class Occurrence with _$Occurrence {
  const factory Occurrence({
    required String id,
    required String title,
    required String description,
    required String type, // 'pest', 'disease', 'deficiency', 'weed', 'other'
    required double severity, // 0.0 to 1.0
    required String areaName,
    required DateTime date,
    required String status, // 'active', 'monitoring', 'resolved'
    required String imageUrl,
    required double latitude,
    required double longitude,
  }) = _Occurrence;

  factory Occurrence.fromJson(Map<String, dynamic> json) =>
      _$OccurrenceFromJson(json);
}
