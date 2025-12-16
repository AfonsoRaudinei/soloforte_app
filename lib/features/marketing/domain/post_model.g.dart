// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'post_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$PostImpl _$$PostImplFromJson(Map<String, dynamic> json) => _$PostImpl(
  id: json['id'] as String,
  title: json['title'] as String,
  content: json['content'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  authorId: json['authorId'] as String,
  authorName: json['authorName'] as String,
  imageUrls:
      (json['imageUrls'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const [],
  tags:
      (json['tags'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const [],
  likes: (json['likes'] as num?)?.toInt() ?? 0,
  comments: (json['comments'] as num?)?.toInt() ?? 0,
  status:
      $enumDecodeNullable(_$PostStatusEnumMap, json['status']) ??
      PostStatus.draft,
  publishedAt: json['publishedAt'] == null
      ? null
      : DateTime.parse(json['publishedAt'] as String),
  scheduledTo: json['scheduledTo'] == null
      ? null
      : DateTime.parse(json['scheduledTo'] as String),
);

Map<String, dynamic> _$$PostImplToJson(_$PostImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'content': instance.content,
      'createdAt': instance.createdAt.toIso8601String(),
      'authorId': instance.authorId,
      'authorName': instance.authorName,
      'imageUrls': instance.imageUrls,
      'tags': instance.tags,
      'likes': instance.likes,
      'comments': instance.comments,
      'status': _$PostStatusEnumMap[instance.status]!,
      'publishedAt': instance.publishedAt?.toIso8601String(),
      'scheduledTo': instance.scheduledTo?.toIso8601String(),
    };

const _$PostStatusEnumMap = {
  PostStatus.draft: 'draft',
  PostStatus.scheduled: 'scheduled',
  PostStatus.published: 'published',
};
