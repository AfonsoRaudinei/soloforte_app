import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:latlong2/latlong.dart';
import '../../clients/domain/client_model.dart';

part 'visit_model.freezed.dart';
part 'visit_model.g.dart';

enum VisitStatus { ongoing, completed, synced }

List<LatLng> _latLngListFromJson(List<dynamic> list) {
  return list.map((e) {
    if (e is Map<String, dynamic>) {
      return LatLng(
        (e['latitude'] as num).toDouble(),
        (e['longitude'] as num).toDouble(),
      );
    }
    // Fallback or handle other formats if necessary
    return const LatLng(0, 0);
  }).toList();
}

List<Map<String, dynamic>> _latLngListToJson(List<LatLng> list) {
  return list
      .map((e) => {'latitude': e.latitude, 'longitude': e.longitude})
      .toList();
}

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
    @Default([]) List<String> photos,
    @Default([]) List<String> occurrenceIds,
    @Default({}) Map<String, bool> checklist,
    @Default([])
    @JsonKey(fromJson: _latLngListFromJson, toJson: _latLngListToJson)
    List<LatLng> routePoints,
    @Default(0.0) double distanceTraveled,
    String? eventId,
    @Default(VisitStatus.ongoing) VisitStatus status,
  }) = _Visit;

  factory Visit.fromJson(Map<String, dynamic> json) => _$VisitFromJson(json);
}
