// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'feed_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$FeedItemImpl _$$FeedItemImplFromJson(Map<String, dynamic> json) =>
    _$FeedItemImpl(
      id: json['id'] as String,
      title: json['title'] as String,
      imageUrl: json['imageUrl'] as String,
      type: json['type'] as String,
      linkUrl: json['linkUrl'] as String,
      summary: json['summary'] as String,
      publishDate: DateTime.parse(json['publishDate'] as String),
    );

Map<String, dynamic> _$$FeedItemImplToJson(_$FeedItemImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'imageUrl': instance.imageUrl,
      'type': instance.type,
      'linkUrl': instance.linkUrl,
      'summary': instance.summary,
      'publishDate': instance.publishDate.toIso8601String(),
    };
