// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'geo_area.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$GeoAreaImpl _$$GeoAreaImplFromJson(Map<String, dynamic> json) =>
    _$GeoAreaImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      areaHectares: (json['areaHectares'] as num?)?.toDouble() ?? 0.0,
      perimeterKm: (json['perimeterKm'] as num?)?.toDouble() ?? 0.0,
      radius: (json['radius'] as num?)?.toDouble() ?? 0.0,
      center: json['center'] == null
          ? null
          : LatLng.fromJson(json['center'] as Map<String, dynamic>),
      type: json['type'] as String? ?? 'polygon',
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$$GeoAreaImplToJson(_$GeoAreaImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'areaHectares': instance.areaHectares,
      'perimeterKm': instance.perimeterKm,
      'radius': instance.radius,
      'center': instance.center,
      'type': instance.type,
      'createdAt': instance.createdAt?.toIso8601String(),
    };
