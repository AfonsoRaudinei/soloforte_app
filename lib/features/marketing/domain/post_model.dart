import 'package:freezed_annotation/freezed_annotation.dart';

part 'post_model.freezed.dart';
part 'post_model.g.dart';

enum PostStatus { draft, scheduled, published }

@freezed
class Post with _$Post {
  const factory Post({
    required String id,
    required String title,
    required String content,
    required DateTime createdAt,
    required String authorId,
    required String authorName,
    @Default([]) List<String> imageUrls,
    @Default([]) List<String> tags,
    @Default(0) int likes,
    @Default(0) int comments,
    @Default(PostStatus.draft) PostStatus status,
    DateTime? publishedAt,
    DateTime? scheduledTo,
  }) = _Post;

  factory Post.fromJson(Map<String, dynamic> json) => _$PostFromJson(json);
}
