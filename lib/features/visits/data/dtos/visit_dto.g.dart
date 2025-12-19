// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'visit_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$VisitDtoImpl _$$VisitDtoImplFromJson(Map<String, dynamic> json) =>
    _$VisitDtoImpl(
      id: json['id'] as String,
      client: Client.fromJson(json['client'] as Map<String, dynamic>),
      checkInTime: DateTime.parse(json['checkInTime'] as String),
      checkOutTime: json['checkOutTime'] == null
          ? null
          : DateTime.parse(json['checkOutTime'] as String),
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      checkOutNotes: json['checkOutNotes'] as String?,
      photos:
          (json['photos'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      occurrenceIds:
          (json['occurrenceIds'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      checklist:
          (json['checklist'] as Map<String, dynamic>?)?.map(
            (k, e) => MapEntry(k, e as bool),
          ) ??
          const {},
      routePoints: json['routePoints'] == null
          ? const []
          : _latLngListFromJson(json['routePoints'] as List),
      distanceTraveled: (json['distanceTraveled'] as num?)?.toDouble() ?? 0.0,
      eventId: json['eventId'] as String?,
      status:
          $enumDecodeNullable(_$VisitStatusEnumMap, json['status']) ??
          VisitStatus.ongoing,
    );

Map<String, dynamic> _$$VisitDtoImplToJson(_$VisitDtoImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'client': instance.client,
      'checkInTime': instance.checkInTime.toIso8601String(),
      'checkOutTime': instance.checkOutTime?.toIso8601String(),
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'checkOutNotes': instance.checkOutNotes,
      'photos': instance.photos,
      'occurrenceIds': instance.occurrenceIds,
      'checklist': instance.checklist,
      'routePoints': _latLngListToJson(instance.routePoints),
      'distanceTraveled': instance.distanceTraveled,
      'eventId': instance.eventId,
      'status': _$VisitStatusEnumMap[instance.status]!,
    };

const _$VisitStatusEnumMap = {
  VisitStatus.ongoing: 'ongoing',
  VisitStatus.completed: 'completed',
  VisitStatus.synced: 'synced',
};
