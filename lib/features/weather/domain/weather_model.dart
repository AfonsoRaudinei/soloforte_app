import 'package:freezed_annotation/freezed_annotation.dart';

part 'weather_model.freezed.dart';
part 'weather_model.g.dart';

@freezed
abstract class WeatherForecast with _$WeatherForecast {
  const factory WeatherForecast({
    required double currentTemp,
    required double feelsLike,
    required double humidity,
    required double windSpeed,
    required String windDirection,
    required double precipitation,
    required double visibility,
    required int cloudCover,
    required double uvIndex,
    required String condition,
    required List<DailyForecast> daily,
    required List<HourlyForecast> hourly,
    @Default([]) List<WeatherAlert> alerts,
  }) = _WeatherForecast;

  factory WeatherForecast.fromJson(Map<String, dynamic> json) =>
      _$WeatherForecastFromJson(json);
}

@freezed
abstract class DailyForecast with _$DailyForecast {
  const factory DailyForecast({
    required DateTime date,
    required double maxTemp,
    required double minTemp,
    required String condition,
    required double precipitation,
    required double windSpeed,
    required int rainProbability,
  }) = _DailyForecast;

  factory DailyForecast.fromJson(Map<String, dynamic> json) =>
      _$DailyForecastFromJson(json);
}

@freezed
abstract class HourlyForecast with _$HourlyForecast {
  const factory HourlyForecast({
    required DateTime time,
    required double temp,
    required String condition,
    required int rainProbability,
    required double precipitation,
  }) = _HourlyForecast;

  factory HourlyForecast.fromJson(Map<String, dynamic> json) =>
      _$HourlyForecastFromJson(json);
}

@freezed
abstract class WeatherAlert with _$WeatherAlert {
  const factory WeatherAlert({
    required String title,
    required String description,
    required String severity, // 'low', 'medium', 'high', 'extreme'
    required DateTime effective,
    required DateTime expires,
    required String type, // 'storm', 'heat', 'wind', 'rain', 'frost'
  }) = _WeatherAlert;

  factory WeatherAlert.fromJson(Map<String, dynamic> json) =>
      _$WeatherAlertFromJson(json);
}
