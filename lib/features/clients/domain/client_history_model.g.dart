// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'client_history_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ClientHistoryImpl _$$ClientHistoryImplFromJson(Map<String, dynamic> json) =>
    _$ClientHistoryImpl(
      id: json['id'] as String,
      clientId: json['clientId'] as String,
      actionType: json['actionType'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
      description: json['description'] as String,
      relatedId: json['relatedId'] as String?,
      userId: json['userId'] as String?,
      metadata: json['metadata'] as Map<String, dynamic>?,
    );

Map<String, dynamic> _$$ClientHistoryImplToJson(_$ClientHistoryImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'clientId': instance.clientId,
      'actionType': instance.actionType,
      'timestamp': instance.timestamp.toIso8601String(),
      'description': instance.description,
      'relatedId': instance.relatedId,
      'userId': instance.userId,
      'metadata': instance.metadata,
    };
