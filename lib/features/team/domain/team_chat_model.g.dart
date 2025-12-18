// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'team_chat_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TeamMessageImpl _$$TeamMessageImplFromJson(Map<String, dynamic> json) =>
    _$TeamMessageImpl(
      id: json['id'] as String,
      conversationId: json['conversationId'] as String,
      senderId: json['senderId'] as String,
      content: json['content'] as String,
      type:
          $enumDecodeNullable(_$TeamMessageTypeEnumMap, json['type']) ??
          TeamMessageType.text,
      timestamp: DateTime.parse(json['timestamp'] as String),
      isRead: json['isRead'] as bool? ?? false,
    );

Map<String, dynamic> _$$TeamMessageImplToJson(_$TeamMessageImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'conversationId': instance.conversationId,
      'senderId': instance.senderId,
      'content': instance.content,
      'type': _$TeamMessageTypeEnumMap[instance.type]!,
      'timestamp': instance.timestamp.toIso8601String(),
      'isRead': instance.isRead,
    };

const _$TeamMessageTypeEnumMap = {
  TeamMessageType.text: 'text',
  TeamMessageType.image: 'image',
  TeamMessageType.file: 'file',
  TeamMessageType.system: 'system',
};

_$TeamConversationImpl _$$TeamConversationImplFromJson(
  Map<String, dynamic> json,
) => _$TeamConversationImpl(
  id: json['id'] as String,
  participantIds: (json['participantIds'] as List<dynamic>)
      .map((e) => e as String)
      .toList(),
  isGroup: json['isGroup'] as bool? ?? false,
  groupName: json['groupName'] as String?,
  lastMessage: json['lastMessage'] == null
      ? null
      : TeamMessage.fromJson(json['lastMessage'] as Map<String, dynamic>),
  unreadCount: (json['unreadCount'] as num?)?.toInt() ?? 0,
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$$TeamConversationImplToJson(
  _$TeamConversationImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  'participantIds': instance.participantIds,
  'isGroup': instance.isGroup,
  'groupName': instance.groupName,
  'lastMessage': instance.lastMessage,
  'unreadCount': instance.unreadCount,
  'updatedAt': instance.updatedAt?.toIso8601String(),
};
