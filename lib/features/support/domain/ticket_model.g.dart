// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ticket_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TicketImpl _$$TicketImplFromJson(Map<String, dynamic> json) => _$TicketImpl(
  id: json['id'] as String,
  subject: json['subject'] as String,
  description: json['description'] as String,
  category: $enumDecode(_$TicketCategoryEnumMap, json['category']),
  priority: $enumDecode(_$TicketPriorityEnumMap, json['priority']),
  status: $enumDecode(_$TicketStatusEnumMap, json['status']),
  createdAt: DateTime.parse(json['createdAt'] as String),
  lastUpdate: DateTime.parse(json['lastUpdate'] as String),
  messageIds:
      (json['messageIds'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const [],
);

Map<String, dynamic> _$$TicketImplToJson(_$TicketImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'subject': instance.subject,
      'description': instance.description,
      'category': _$TicketCategoryEnumMap[instance.category]!,
      'priority': _$TicketPriorityEnumMap[instance.priority]!,
      'status': _$TicketStatusEnumMap[instance.status]!,
      'createdAt': instance.createdAt.toIso8601String(),
      'lastUpdate': instance.lastUpdate.toIso8601String(),
      'messageIds': instance.messageIds,
    };

const _$TicketCategoryEnumMap = {
  TicketCategory.technical: 'technical',
  TicketCategory.financial: 'financial',
  TicketCategory.agronomic: 'agronomic',
  TicketCategory.featureRequest: 'featureRequest',
  TicketCategory.other: 'other',
};

const _$TicketPriorityEnumMap = {
  TicketPriority.low: 'low',
  TicketPriority.normal: 'normal',
  TicketPriority.urgent: 'urgent',
};

const _$TicketStatusEnumMap = {
  TicketStatus.open: 'open',
  TicketStatus.inProgress: 'inProgress',
  TicketStatus.resolved: 'resolved',
  TicketStatus.closed: 'closed',
};
