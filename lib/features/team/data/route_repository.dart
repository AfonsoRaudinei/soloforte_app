import 'package:soloforte_app/features/team/domain/team_member_model.dart';

abstract class RouteRepository {
  Future<List<TeamMemberLocation>> getRouteHistory(
    String memberId,
    DateTime date,
  );
}

class MockRouteRepository implements RouteRepository {
  @override
  Future<List<TeamMemberLocation>> getRouteHistory(
    String memberId,
    DateTime date,
  ) async {
    await Future.delayed(const Duration(milliseconds: 600));

    // Generate a mock path around SP
    final List<TeamMemberLocation> points = [];
    final startLat = -23.550520;
    final startLng = -46.633308;

    // Simulate a path
    for (int i = 0; i < 20; i++) {
      points.add(
        TeamMemberLocation(
          latitude: startLat + (i * 0.001) + (memberId.hashCode % 10 * 0.0001),
          longitude: startLng + (i * 0.0005) - (memberId.hashCode % 5 * 0.0001),
          lastUpdate: date.add(Duration(minutes: i * 30)),
          speed: 10.0 + (i % 5),
          batteryLevel: 100 - (i * 2),
          isGpsEnabled: true,
        ),
      );
    }

    return points;
  }
}
