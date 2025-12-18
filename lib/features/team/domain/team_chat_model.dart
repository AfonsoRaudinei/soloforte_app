import 'package:freezed_annotation/freezed_annotation.dart';

part 'team_chat_model.freezed.dart';
part 'team_chat_model.g.dart';

@freezed
class TeamMessage with _$TeamMessage {
  const factory TeamMessage({
    required String id,
    required String conversationId,
    required String senderId,
    required String content,
    @Default(TeamMessageType.text) TeamMessageType type,
    required DateTime timestamp,
    @Default(false) bool isRead,
  }) = _TeamMessage;

  factory TeamMessage.fromJson(Map<String, dynamic> json) =>
      _$TeamMessageFromJson(json);
}

@freezed
class TeamConversation with _$TeamConversation {
  const factory TeamConversation({
    required String id,
    required List<String> participantIds,
    @Default(false) bool isGroup,
    String? groupName,
    TeamMessage? lastMessage,
    @Default(0) int unreadCount,
    DateTime? updatedAt,
  }) = _TeamConversation;

  factory TeamConversation.fromJson(Map<String, dynamic> json) =>
      _$TeamConversationFromJson(json);
}

enum TeamMessageType { text, image, file, system }
