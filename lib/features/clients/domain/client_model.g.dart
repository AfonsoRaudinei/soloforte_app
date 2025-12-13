// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'client_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Client _$ClientFromJson(Map<String, dynamic> json) => _Client(
  id: json['id'] as String,
  name: json['name'] as String,
  email: json['email'] as String,
  phone: json['phone'] as String,
  address: json['address'] as String,
  city: json['city'] as String,
  state: json['state'] as String,
  type: json['type'] as String,
  totalAreas: (json['totalAreas'] as num).toInt(),
  totalHectares: (json['totalHectares'] as num).toDouble(),
  status: json['status'] as String,
  lastActivity: DateTime.parse(json['lastActivity'] as String),
  avatarUrl: json['avatarUrl'] as String?,
);

Map<String, dynamic> _$ClientToJson(_Client instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'email': instance.email,
  'phone': instance.phone,
  'address': instance.address,
  'city': instance.city,
  'state': instance.state,
  'type': instance.type,
  'totalAreas': instance.totalAreas,
  'totalHectares': instance.totalHectares,
  'status': instance.status,
  'lastActivity': instance.lastActivity.toIso8601String(),
  'avatarUrl': instance.avatarUrl,
};
