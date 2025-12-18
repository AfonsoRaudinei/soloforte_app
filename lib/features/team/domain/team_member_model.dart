import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'team_member_model.freezed.dart';
part 'team_member_model.g.dart';

enum TeamMemberRole {
  @JsonValue('manager')
  manager,
  @JsonValue('agronomist')
  agronomist,
  @JsonValue('technician')
  technician,
  @JsonValue('admin')
  admin,
}

enum TeamMemberStatus {
  @JsonValue('online')
  online,
  @JsonValue('in_field')
  inField,
  @JsonValue('offline')
  offline,
  @JsonValue('busy')
  busy,
}

@freezed
class TeamMemberLocation with _$TeamMemberLocation {
  const factory TeamMemberLocation({
    required double latitude,
    required double longitude,
    required DateTime lastUpdate,
    @Default(0) int batteryLevel,
    @Default(0.0) double speed, // km/h
    @Default(0.0) double heading,
    @Default(true) bool isGpsEnabled,
  }) = _TeamMemberLocation;

  factory TeamMemberLocation.fromJson(Map<String, dynamic> json) =>
      _$TeamMemberLocationFromJson(json);
}

@freezed
class TeamMemberStats with _$TeamMemberStats {
  const factory TeamMemberStats({
    @Default(0) int visitsThisMonth,
    @Default(0) int activeTickets,
    @Default(0.0) double averageRating,
    @Default(0.0) double distanceTraveledKm, // km
    @Default(0) int reportsSubmitted,
    // Gamification
    @Default(0) int experiencePoints,
    @Default(1) int level,
    @Default([]) List<String> badges, // e.g., 'fast_responder', 'top_visited'
  }) = _TeamMemberStats;

  factory TeamMemberStats.fromJson(Map<String, dynamic> json) =>
      _$TeamMemberStatsFromJson(json);
}

@freezed
class TeamMember with _$TeamMember {
  const factory TeamMember({
    required String id,
    required String name,
    required String email,
    String? avatarUrl,
    String? phoneNumber,
    @Default(TeamMemberRole.technician) TeamMemberRole role,
    @Default(TeamMemberStatus.offline) TeamMemberStatus status,

    // Áreas de Responsabilidade (IDs de Fazendas ou Talhões)
    @Default([]) List<String> assignedAreaIds,

    // Metadados de Rastreamento (Opcional, pois pode não ter localização recente)
    TeamMemberLocation? lastLocation,

    // Estatísticas de Desempenho
    @Default(TeamMemberStats()) TeamMemberStats stats,

    // Metadata
    DateTime? lastActiveAt,
    DateTime? joinedAt,
  }) = _TeamMember;

  factory TeamMember.fromJson(Map<String, dynamic> json) =>
      _$TeamMemberFromJson(json);
}
