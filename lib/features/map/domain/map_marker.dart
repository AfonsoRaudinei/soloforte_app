import 'package:latlong2/latlong.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'map_marker.freezed.dart';
part 'map_marker.g.dart';

@freezed
abstract class MapPoint with _$MapPoint {
  const factory MapPoint({
    required String id,
    required String title,
    required String description,
    required double latitude,
    required double longitude,
    required String type, // 'pest', 'disease', 'observation'
    DateTime? timestamp,
  }) = _MapPoint;

  factory MapPoint.fromJson(Map<String, dynamic> json) =>
      _$MapPointFromJson(json);
}

extension MapPointLatLng on MapPoint {
  LatLng get location => LatLng(latitude, longitude);
}
