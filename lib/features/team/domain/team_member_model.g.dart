// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'team_member_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TeamMemberLocationImpl _$$TeamMemberLocationImplFromJson(
  Map<String, dynamic> json,
) => _$TeamMemberLocationImpl(
  latitude: (json['latitude'] as num).toDouble(),
  longitude: (json['longitude'] as num).toDouble(),
  lastUpdate: DateTime.parse(json['lastUpdate'] as String),
  batteryLevel: (json['batteryLevel'] as num?)?.toInt() ?? 0,
  speed: (json['speed'] as num?)?.toDouble() ?? 0.0,
  heading: (json['heading'] as num?)?.toDouble() ?? 0.0,
  isGpsEnabled: json['isGpsEnabled'] as bool? ?? true,
);

Map<String, dynamic> _$$TeamMemberLocationImplToJson(
  _$TeamMemberLocationImpl instance,
) => <String, dynamic>{
  'latitude': instance.latitude,
  'longitude': instance.longitude,
  'lastUpdate': instance.lastUpdate.toIso8601String(),
  'batteryLevel': instance.batteryLevel,
  'speed': instance.speed,
  'heading': instance.heading,
  'isGpsEnabled': instance.isGpsEnabled,
};

_$TeamMemberStatsImpl _$$TeamMemberStatsImplFromJson(
  Map<String, dynamic> json,
) => _$TeamMemberStatsImpl(
  visitsThisMonth: (json['visitsThisMonth'] as num?)?.toInt() ?? 0,
  activeTickets: (json['activeTickets'] as num?)?.toInt() ?? 0,
  averageRating: (json['averageRating'] as num?)?.toDouble() ?? 0.0,
  distanceTraveledKm: (json['distanceTraveledKm'] as num?)?.toDouble() ?? 0.0,
  reportsSubmitted: (json['reportsSubmitted'] as num?)?.toInt() ?? 0,
  experiencePoints: (json['experiencePoints'] as num?)?.toInt() ?? 0,
  level: (json['level'] as num?)?.toInt() ?? 1,
  badges:
      (json['badges'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const [],
);

Map<String, dynamic> _$$TeamMemberStatsImplToJson(
  _$TeamMemberStatsImpl instance,
) => <String, dynamic>{
  'visitsThisMonth': instance.visitsThisMonth,
  'activeTickets': instance.activeTickets,
  'averageRating': instance.averageRating,
  'distanceTraveledKm': instance.distanceTraveledKm,
  'reportsSubmitted': instance.reportsSubmitted,
  'experiencePoints': instance.experiencePoints,
  'level': instance.level,
  'badges': instance.badges,
};

_$TeamMemberImpl _$$TeamMemberImplFromJson(Map<String, dynamic> json) =>
    _$TeamMemberImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      avatarUrl: json['avatarUrl'] as String?,
      phoneNumber: json['phoneNumber'] as String?,
      role:
          $enumDecodeNullable(_$TeamMemberRoleEnumMap, json['role']) ??
          TeamMemberRole.technician,
      status:
          $enumDecodeNullable(_$TeamMemberStatusEnumMap, json['status']) ??
          TeamMemberStatus.offline,
      assignedAreaIds:
          (json['assignedAreaIds'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      lastLocation: json['lastLocation'] == null
          ? null
          : TeamMemberLocation.fromJson(
              json['lastLocation'] as Map<String, dynamic>,
            ),
      stats: json['stats'] == null
          ? const TeamMemberStats()
          : TeamMemberStats.fromJson(json['stats'] as Map<String, dynamic>),
      lastActiveAt: json['lastActiveAt'] == null
          ? null
          : DateTime.parse(json['lastActiveAt'] as String),
      joinedAt: json['joinedAt'] == null
          ? null
          : DateTime.parse(json['joinedAt'] as String),
    );

Map<String, dynamic> _$$TeamMemberImplToJson(_$TeamMemberImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'email': instance.email,
      'avatarUrl': instance.avatarUrl,
      'phoneNumber': instance.phoneNumber,
      'role': _$TeamMemberRoleEnumMap[instance.role]!,
      'status': _$TeamMemberStatusEnumMap[instance.status]!,
      'assignedAreaIds': instance.assignedAreaIds,
      'lastLocation': instance.lastLocation,
      'stats': instance.stats,
      'lastActiveAt': instance.lastActiveAt?.toIso8601String(),
      'joinedAt': instance.joinedAt?.toIso8601String(),
    };

const _$TeamMemberRoleEnumMap = {
  TeamMemberRole.manager: 'manager',
  TeamMemberRole.agronomist: 'agronomist',
  TeamMemberRole.technician: 'technician',
  TeamMemberRole.admin: 'admin',
};

const _$TeamMemberStatusEnumMap = {
  TeamMemberStatus.online: 'online',
  TeamMemberStatus.inField: 'in_field',
  TeamMemberStatus.offline: 'offline',
  TeamMemberStatus.busy: 'busy',
};
