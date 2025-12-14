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
    required List<String> images,
    required double latitude,
    required double longitude,
    @Default([]) List<TimelineEvent> timeline,
    String? assignedTo,
    @Default([]) List<String> recommendations,
  }) = _Occurrence;

  factory Occurrence.fromJson(Map<String, dynamic> json) =>
      _$OccurrenceFromJson(json);
}

@freezed
abstract class TimelineEvent with _$TimelineEvent {
  const factory TimelineEvent({
    required String id,
    required String title,
    required String description,
    required DateTime date,
    required String type, // 'action', 'update', 'photo', 'complete'
    required String authorName,
  }) = _TimelineEvent;

  factory TimelineEvent.fromJson(Map<String, dynamic> json) =>
      _$TimelineEventFromJson(json);
}
