import 'package:freezed_annotation/freezed_annotation.dart';

part 'weather_model.freezed.dart';
part 'weather_model.g.dart';

@freezed
abstract class WeatherForecast with _$WeatherForecast {
  const factory WeatherForecast({
    required double currentTemp,
    required double humidity,
    required double windSpeed,
    required String condition,
    required List<DailyForecast> daily,
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
    required int rainProbability,
  }) = _DailyForecast;

  factory DailyForecast.fromJson(Map<String, dynamic> json) =>
      _$DailyForecastFromJson(json);
}
