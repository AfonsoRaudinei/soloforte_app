import 'package:soloforte_app/features/team/domain/team_member_model.dart';
import 'dart:math';

abstract class TeamRepository {
  Future<List<TeamMember>> getTeamMembers();
  Future<TeamMember?> getMemberById(String id);
}

class MockTeamRepository implements TeamRepository {
  @override
  Future<List<TeamMember>> getTeamMembers() async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 800));

    final now = DateTime.now();
    final random = Random();

    return [
      TeamMember(
        id: '1',
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@soloforte.com',
        role: TeamMemberRole.manager,
        status: TeamMemberStatus.online,
        avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
        lastActiveAt: now,
        stats: const TeamMemberStats(
          visitsThisMonth: 12,
          activeTickets: 2,
          averageRating: 4.8,
          experiencePoints: 1250,
          level: 3,
          badges: ['lider', 'pontual'],
        ),
      ),
      TeamMember(
        id: '2',
        name: 'Ana Silva',
        email: 'ana.silva@soloforte.com',
        role: TeamMemberRole.agronomist,
        status: TeamMemberStatus.inField,
        avatarUrl: 'https://i.pravatar.cc/150?u=ana',
        lastLocation: TeamMemberLocation(
          latitude: -23.550520 + (random.nextDouble() * 0.01),
          longitude: -46.633308 + (random.nextDouble() * 0.01),
          lastUpdate: now.subtract(const Duration(minutes: 5)),
          batteryLevel: 78,
          speed: 12.5,
          isGpsEnabled: true,
        ),
        stats: const TeamMemberStats(
          visitsThisMonth: 28,
          activeTickets: 5,
          averageRating: 4.9,
          distanceTraveledKm: 152.0,
          experiencePoints: 3400,
          level: 5,
          badges: ['top_visitas', 'especialista', 'explorer'],
        ),
      ),
      TeamMember(
        id: '3',
        name: 'Roberto Santos',
        email: 'roberto.santos@soloforte.com',
        role: TeamMemberRole.technician,
        status: TeamMemberStatus.offline,
        avatarUrl: 'https://i.pravatar.cc/150?u=roberto',
        lastActiveAt: now.subtract(const Duration(hours: 2)),
        stats: const TeamMemberStats(
          visitsThisMonth: 45,
          activeTickets: 0,
          averageRating: 4.5,
          experiencePoints: 2100,
          level: 4,
          badges: ['focado'],
        ),
      ),
      TeamMember(
        id: '4',
        name: 'Fernanda Lima',
        email: 'fernanda.lima@soloforte.com',
        role: TeamMemberRole.agronomist,
        status: TeamMemberStatus.inField,
        avatarUrl: 'https://i.pravatar.cc/150?u=fernanda',
        lastLocation: TeamMemberLocation(
          latitude: -23.555520,
          longitude: -46.643308,
          lastUpdate: now.subtract(const Duration(minutes: 12)),
          batteryLevel: 42,
          isGpsEnabled: true,
        ),
        stats: const TeamMemberStats(
          visitsThisMonth: 31,
          activeTickets: 3,
          averageRating: 4.7,
          experiencePoints: 1800,
          level: 4,
          badges: ['agronomo_mes'],
        ),
      ),
      TeamMember(
        id: '5',
        name: 'Pedro Costa',
        email: 'pedro.costa@soloforte.com',
        role: TeamMemberRole.technician,
        status: TeamMemberStatus.online,
        avatarUrl: 'https://i.pravatar.cc/150?u=pedro',
        lastActiveAt: now,
        stats: const TeamMemberStats(
          visitsThisMonth: 15,
          activeTickets: 1,
          averageRating: 4.2,
          experiencePoints: 800,
          level: 2,
          badges: ['iniciante'],
        ),
      ),
    ];
  }

  @override
  Future<TeamMember?> getMemberById(String id) async {
    final members = await getTeamMembers();
    try {
      return members.firstWhere((m) => m.id == id);
    } catch (_) {
      return null;
    }
  }
}
