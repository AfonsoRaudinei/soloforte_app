// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'weather_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$WeatherForecastImpl _$$WeatherForecastImplFromJson(
  Map<String, dynamic> json,
) => _$WeatherForecastImpl(
  currentTemp: (json['currentTemp'] as num).toDouble(),
  feelsLike: (json['feelsLike'] as num).toDouble(),
  humidity: (json['humidity'] as num).toDouble(),
  windSpeed: (json['windSpeed'] as num).toDouble(),
  windDirection: json['windDirection'] as String,
  precipitation: (json['precipitation'] as num).toDouble(),
  visibility: (json['visibility'] as num).toDouble(),
  cloudCover: (json['cloudCover'] as num).toInt(),
  uvIndex: (json['uvIndex'] as num).toDouble(),
  condition: json['condition'] as String,
  daily: (json['daily'] as List<dynamic>)
      .map((e) => DailyForecast.fromJson(e as Map<String, dynamic>))
      .toList(),
  hourly: (json['hourly'] as List<dynamic>)
      .map((e) => HourlyForecast.fromJson(e as Map<String, dynamic>))
      .toList(),
  alerts:
      (json['alerts'] as List<dynamic>?)
          ?.map((e) => WeatherAlert.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
);

Map<String, dynamic> _$$WeatherForecastImplToJson(
  _$WeatherForecastImpl instance,
) => <String, dynamic>{
  'currentTemp': instance.currentTemp,
  'feelsLike': instance.feelsLike,
  'humidity': instance.humidity,
  'windSpeed': instance.windSpeed,
  'windDirection': instance.windDirection,
  'precipitation': instance.precipitation,
  'visibility': instance.visibility,
  'cloudCover': instance.cloudCover,
  'uvIndex': instance.uvIndex,
  'condition': instance.condition,
  'daily': instance.daily,
  'hourly': instance.hourly,
  'alerts': instance.alerts,
};

_$DailyForecastImpl _$$DailyForecastImplFromJson(Map<String, dynamic> json) =>
    _$DailyForecastImpl(
      date: DateTime.parse(json['date'] as String),
      maxTemp: (json['maxTemp'] as num).toDouble(),
      minTemp: (json['minTemp'] as num).toDouble(),
      condition: json['condition'] as String,
      precipitation: (json['precipitation'] as num).toDouble(),
      windSpeed: (json['windSpeed'] as num).toDouble(),
      rainProbability: (json['rainProbability'] as num).toInt(),
    );

Map<String, dynamic> _$$DailyForecastImplToJson(_$DailyForecastImpl instance) =>
    <String, dynamic>{
      'date': instance.date.toIso8601String(),
      'maxTemp': instance.maxTemp,
      'minTemp': instance.minTemp,
      'condition': instance.condition,
      'precipitation': instance.precipitation,
      'windSpeed': instance.windSpeed,
      'rainProbability': instance.rainProbability,
    };

_$HourlyForecastImpl _$$HourlyForecastImplFromJson(Map<String, dynamic> json) =>
    _$HourlyForecastImpl(
      time: DateTime.parse(json['time'] as String),
      temp: (json['temp'] as num).toDouble(),
      condition: json['condition'] as String,
      rainProbability: (json['rainProbability'] as num).toInt(),
      precipitation: (json['precipitation'] as num).toDouble(),
    );

Map<String, dynamic> _$$HourlyForecastImplToJson(
  _$HourlyForecastImpl instance,
) => <String, dynamic>{
  'time': instance.time.toIso8601String(),
  'temp': instance.temp,
  'condition': instance.condition,
  'rainProbability': instance.rainProbability,
  'precipitation': instance.precipitation,
};

_$WeatherAlertImpl _$$WeatherAlertImplFromJson(Map<String, dynamic> json) =>
    _$WeatherAlertImpl(
      title: json['title'] as String,
      description: json['description'] as String,
      severity: json['severity'] as String,
      effective: DateTime.parse(json['effective'] as String),
      expires: DateTime.parse(json['expires'] as String),
      type: json['type'] as String,
    );

Map<String, dynamic> _$$WeatherAlertImplToJson(_$WeatherAlertImpl instance) =>
    <String, dynamic>{
      'title': instance.title,
      'description': instance.description,
      'severity': instance.severity,
      'effective': instance.effective.toIso8601String(),
      'expires': instance.expires.toIso8601String(),
      'type': instance.type,
    };
