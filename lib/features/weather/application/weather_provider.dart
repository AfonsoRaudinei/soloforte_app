import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../data/weather_service.dart';
import '../domain/weather_model.dart';
import 'package:dio/dio.dart';
import 'package:soloforte_app/core/database/database_helper.dart';

part 'weather_provider.g.dart';

@riverpod
WeatherService weatherService(WeatherServiceRef ref) {
  return WeatherService(Dio(), DatabaseHelper());
}

@riverpod
Future<WeatherForecast> weatherForecast(
  WeatherForecastRef ref,
  double lat,
  double lon,
) {
  final service = ref.watch(weatherServiceProvider);
  return service.getWeather(lat, lon);
}
