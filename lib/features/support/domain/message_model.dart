import 'package:freezed_annotation/freezed_annotation.dart';

part 'message_model.freezed.dart';
part 'message_model.g.dart';

@freezed
abstract class Message with _$Message {
  const factory Message({
    required String id,
    required String senderId,
    required String text,
    required DateTime timestamp,
    required bool isMe,
    @Default(MessageStatus.sent) MessageStatus status,
    @Default(MessageType.text) MessageType type,
    String? attachmentUrl,
  }) = _Message;

  factory Message.fromJson(Map<String, dynamic> json) =>
      _$MessageFromJson(json);
}

enum MessageStatus { sending, sent, delivered, read }

enum MessageType { text, image, file, audio, location, system }
