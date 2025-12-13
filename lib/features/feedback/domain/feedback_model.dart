import 'package:freezed_annotation/freezed_annotation.dart';

part 'feedback_model.freezed.dart';
part 'feedback_model.g.dart';

enum FeedbackType { bug, feature, improvement, other }

@freezed
class FeedbackModel with _$FeedbackModel {
  const factory FeedbackModel({
    required String id,
    required FeedbackType type,
    required String title,
    required String description,
    required DateTime createdAt,
    required String userId,
    @Default([]) List<String> screenshots,
    @Default('pending') String status,
    String? response,
    DateTime? respondedAt,
  }) = _FeedbackModel;

  factory FeedbackModel.fromJson(Map<String, dynamic> json) =>
      _$FeedbackModelFromJson(json);
}
