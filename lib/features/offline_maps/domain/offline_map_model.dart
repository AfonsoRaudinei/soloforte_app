import 'package:freezed_annotation/freezed_annotation.dart';

part 'offline_map_model.freezed.dart';
part 'offline_map_model.g.dart';

@freezed
class OfflineMap with _$OfflineMap {
  const factory OfflineMap({
    required String id,
    required String name,
    required double minLat,
    required double maxLat,
    required double minLng,
    required double maxLng,
    required int zoomLevel,
    required DateTime downloadedAt,
    required int sizeBytes,
    @Default(false) bool isDownloading,
    @Default(0) double downloadProgress,
  }) = _OfflineMap;

  factory OfflineMap.fromJson(Map<String, dynamic> json) =>
      _$OfflineMapFromJson(json);
}
