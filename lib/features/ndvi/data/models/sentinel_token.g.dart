// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sentinel_token.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$SentinelTokenImpl _$$SentinelTokenImplFromJson(Map<String, dynamic> json) =>
    _$SentinelTokenImpl(
      accessToken: json['access_token'] as String,
      expiresIn: (json['expires_in'] as num).toInt(),
      receivedAt: (json['receivedAt'] as num?)?.toInt() ?? 0,
    );

Map<String, dynamic> _$$SentinelTokenImplToJson(_$SentinelTokenImpl instance) =>
    <String, dynamic>{
      'access_token': instance.accessToken,
      'expires_in': instance.expiresIn,
      'receivedAt': instance.receivedAt,
    };
