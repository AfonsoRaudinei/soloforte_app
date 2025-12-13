// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'weather_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_WeatherForecast _$WeatherForecastFromJson(Map<String, dynamic> json) =>
    _WeatherForecast(
      currentTemp: (json['currentTemp'] as num).toDouble(),
      humidity: (json['humidity'] as num).toDouble(),
      windSpeed: (json['windSpeed'] as num).toDouble(),
      condition: json['condition'] as String,
      daily: (json['daily'] as List<dynamic>)
          .map((e) => DailyForecast.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$WeatherForecastToJson(_WeatherForecast instance) =>
    <String, dynamic>{
      'currentTemp': instance.currentTemp,
      'humidity': instance.humidity,
      'windSpeed': instance.windSpeed,
      'condition': instance.condition,
      'daily': instance.daily,
    };

_DailyForecast _$DailyForecastFromJson(Map<String, dynamic> json) =>
    _DailyForecast(
      date: DateTime.parse(json['date'] as String),
      maxTemp: (json['maxTemp'] as num).toDouble(),
      minTemp: (json['minTemp'] as num).toDouble(),
      condition: json['condition'] as String,
      rainProbability: (json['rainProbability'] as num).toInt(),
    );

Map<String, dynamic> _$DailyForecastToJson(_DailyForecast instance) =>
    <String, dynamic>{
      'date': instance.date.toIso8601String(),
      'maxTemp': instance.maxTemp,
      'minTemp': instance.minTemp,
      'condition': instance.condition,
      'rainProbability': instance.rainProbability,
    };
