import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:latlong2/latlong.dart';
import 'package:soloforte_app/features/clients/domain/client_model.dart';
import '../../domain/entities/visit.dart';

part 'visit_dto.freezed.dart';
part 'visit_dto.g.dart';

List<LatLng> _latLngListFromJson(List<dynamic> list) {
  return list.map((e) {
    if (e is Map<String, dynamic>) {
      return LatLng(
        (e['latitude'] as num).toDouble(),
        (e['longitude'] as num).toDouble(),
      );
    }
    return const LatLng(0, 0);
  }).toList();
}

List<Map<String, dynamic>> _latLngListToJson(List<LatLng> list) {
  return list
      .map((e) => {'latitude': e.latitude, 'longitude': e.longitude})
      .toList();
}

@freezed
class VisitDto with _$VisitDto {
  const VisitDto._(); // Enable method addition

  const factory VisitDto({
    required String id,
    required Client client, // Assuming Client has fromJson/toJson
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
  }) = _VisitDto;

  factory VisitDto.fromJson(Map<String, dynamic> json) =>
      _$VisitDtoFromJson(json);

  factory VisitDto.fromDomain(Visit visit) {
    return VisitDto(
      id: visit.id,
      client: visit.client,
      checkInTime: visit.checkInTime,
      checkOutTime: visit.checkOutTime,
      latitude: visit.latitude,
      longitude: visit.longitude,
      checkOutNotes: visit.checkOutNotes,
      photos: visit.photos,
      occurrenceIds: visit.occurrenceIds,
      checklist: visit.checklist,
      routePoints: visit.routePoints,
      distanceTraveled: visit.distanceTraveled,
      eventId: visit.eventId,
      status: visit.status,
    );
  }

  Visit toDomain() {
    return Visit(
      id: id,
      client: client,
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      latitude: latitude,
      longitude: longitude,
      checkOutNotes: checkOutNotes,
      photos: photos,
      occurrenceIds: occurrenceIds,
      checklist: checklist,
      routePoints: routePoints,
      distanceTraveled: distanceTraveled,
      eventId: eventId,
      status: status,
    );
  }
}
