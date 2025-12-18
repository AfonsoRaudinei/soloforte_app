import 'package:soloforte_app/features/team/domain/team_member_model.dart';
import 'package:soloforte_app/features/map/domain/geo_area.dart';
import 'package:soloforte_app/features/map/application/geometry_utils.dart';
import 'package:latlong2/latlong.dart';

class GeofencingService {
  // Checks if member is inside any of the monitored areas
  // Returns the list of areas the member is currently in
  List<GeoArea> checkGeofences(
    TeamMemberLocation location,
    List<GeoArea> areas,
  ) {
    final point = LatLng(location.latitude, location.longitude);
    return areas.where((area) {
      if (area.points.isEmpty) return false;
      return GeometryUtils.isPointInPolygon(point, area.points);
    }).toList();
  }

  // Returns alert message if entered/exited
  String? verifyMovement(
    TeamMemberLocation oldLoc,
    TeamMemberLocation newLoc,
    List<GeoArea> areas,
  ) {
    final oldAreas = checkGeofences(oldLoc, areas);
    final newAreas = checkGeofences(newLoc, areas);

    // Check entry
    for (var area in newAreas) {
      if (!oldAreas.contains(area)) {
        return 'Entrou na área: ${area.name}';
      }
    }

    // Check exit
    for (var area in oldAreas) {
      if (!newAreas.contains(area)) {
        return 'Saiu da área: ${area.name}';
      }
    }

    return null;
  }
}
