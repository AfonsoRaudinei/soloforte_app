// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'event_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_EventRecurrence _$EventRecurrenceFromJson(Map<String, dynamic> json) =>
    _EventRecurrence(
      frequency: json['frequency'] as String,
      interval: (json['interval'] as num).toInt(),
      endDate: json['endDate'] == null
          ? null
          : DateTime.parse(json['endDate'] as String),
      exceptionDates:
          (json['exceptionDates'] as List<dynamic>?)
              ?.map((e) => DateTime.parse(e as String))
              .toList() ??
          const [],
    );

Map<String, dynamic> _$EventRecurrenceToJson(_EventRecurrence instance) =>
    <String, dynamic>{
      'frequency': instance.frequency,
      'interval': instance.interval,
      'endDate': instance.endDate?.toIso8601String(),
      'exceptionDates': instance.exceptionDates
          .map((e) => e.toIso8601String())
          .toList(),
    };

_ChecklistItem _$ChecklistItemFromJson(Map<String, dynamic> json) =>
    _ChecklistItem(
      id: json['id'] as String,
      label: json['label'] as String,
      isCompleted: json['isCompleted'] as bool? ?? false,
    );

Map<String, dynamic> _$ChecklistItemToJson(_ChecklistItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'label': instance.label,
      'isCompleted': instance.isCompleted,
    };

_Event _$EventFromJson(Map<String, dynamic> json) => _Event(
  id: json['id'] as String,
  title: json['title'] as String,
  description: json['description'] as String,
  startTime: DateTime.parse(json['startTime'] as String),
  endTime: DateTime.parse(json['endTime'] as String),
  type: $enumDecode(_$EventTypeEnumMap, json['type']),
  status:
      $enumDecodeNullable(_$EventStatusEnumMap, json['status']) ??
      EventStatus.scheduled,
  location: json['location'] as String,
  clientId: json['clientId'] as String?,
  clientName: json['clientName'] as String?,
  areaId: json['areaId'] as String?,
  areaName: json['areaName'] as String?,
  participants:
      (json['participants'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const [],
  checklist:
      (json['checklist'] as List<dynamic>?)
          ?.map((e) => ChecklistItem.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  attachmentUrls:
      (json['attachmentUrls'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const [],
  notes: json['notes'] as String?,
  recurrence: json['recurrence'] == null
      ? null
      : EventRecurrence.fromJson(json['recurrence'] as Map<String, dynamic>),
  weatherForecast: json['weatherForecast'] as Map<String, dynamic>?,
  completedAt: json['completedAt'] == null
      ? null
      : DateTime.parse(json['completedAt'] as String),
  createdAt: json['createdAt'] == null
      ? null
      : DateTime.parse(json['createdAt'] as String),
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$EventToJson(_Event instance) => <String, dynamic>{
  'id': instance.id,
  'title': instance.title,
  'description': instance.description,
  'startTime': instance.startTime.toIso8601String(),
  'endTime': instance.endTime.toIso8601String(),
  'type': _$EventTypeEnumMap[instance.type]!,
  'status': _$EventStatusEnumMap[instance.status]!,
  'location': instance.location,
  'clientId': instance.clientId,
  'clientName': instance.clientName,
  'areaId': instance.areaId,
  'areaName': instance.areaName,
  'participants': instance.participants,
  'checklist': instance.checklist,
  'attachmentUrls': instance.attachmentUrls,
  'notes': instance.notes,
  'recurrence': instance.recurrence,
  'weatherForecast': instance.weatherForecast,
  'completedAt': instance.completedAt?.toIso8601String(),
  'createdAt': instance.createdAt?.toIso8601String(),
  'updatedAt': instance.updatedAt?.toIso8601String(),
};

const _$EventTypeEnumMap = {
  EventType.technicalVisit: 'technicalVisit',
  EventType.application: 'application',
  EventType.consultancy: 'consultancy',
  EventType.harvest: 'harvest',
  EventType.maintenance: 'maintenance',
  EventType.meeting: 'meeting',
  EventType.reminder: 'reminder',
  EventType.custom: 'custom',
};

const _$EventStatusEnumMap = {
  EventStatus.scheduled: 'scheduled',
  EventStatus.inProgress: 'inProgress',
  EventStatus.completed: 'completed',
  EventStatus.cancelled: 'cancelled',
  EventStatus.rescheduled: 'rescheduled',
};
