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
  }) = _Message;

  factory Message.fromJson(Map<String, dynamic> json) =>
      _$MessageFromJson(json);
}
