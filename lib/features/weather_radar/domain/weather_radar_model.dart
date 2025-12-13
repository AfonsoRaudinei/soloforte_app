import 'package:freezed_annotation/freezed_annotation.dart';

part 'weather_radar_model.freezed.dart';
part 'weather_radar_model.g.dart';

@freezed
class WeatherRadar with _$WeatherRadar {
  const factory WeatherRadar({
    required String id,
    required DateTime timestamp,
    required double latitude,
    required double longitude,
    required int zoom,
    required String radarType, // precipitation, clouds, temperature
    String? imageUrl,
    Map<String, dynamic>? metadata,
  }) = _WeatherRadar;

  factory WeatherRadar.fromJson(Map<String, dynamic> json) =>
      _$WeatherRadarFromJson(json);
}
