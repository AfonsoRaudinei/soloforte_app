// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'occurrence_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Occurrence _$OccurrenceFromJson(Map<String, dynamic> json) => _Occurrence(
  id: json['id'] as String,
  title: json['title'] as String,
  description: json['description'] as String,
  type: json['type'] as String,
  severity: (json['severity'] as num).toDouble(),
  areaName: json['areaName'] as String,
  date: DateTime.parse(json['date'] as String),
  status: json['status'] as String,
  imageUrl: json['imageUrl'] as String,
  latitude: (json['latitude'] as num).toDouble(),
  longitude: (json['longitude'] as num).toDouble(),
);

Map<String, dynamic> _$OccurrenceToJson(_Occurrence instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'description': instance.description,
      'type': instance.type,
      'severity': instance.severity,
      'areaName': instance.areaName,
      'date': instance.date.toIso8601String(),
      'status': instance.status,
      'imageUrl': instance.imageUrl,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
    };
