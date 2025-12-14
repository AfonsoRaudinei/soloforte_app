import 'dart:math' as math;
import 'package:latlong2/latlong.dart';

class GeometryUtils {
  static double calculatePerimeterKm(List<LatLng> points) {
    if (points.length < 2) return 0.0;
    double perimeter = 0.0;
    const distance = Distance();

    for (int i = 0; i < points.length; i++) {
      perimeter += distance.as(
        LengthUnit.Kilometer,
        points[i],
        points[(i + 1) % points.length],
      );
    }
    return perimeter;
  }

  static double calculateAreaHectares(List<LatLng> points) {
    if (points.length < 3) return 0.0;
    // Calculate area in square meters and convert to hectares (1 ha = 10,000 sqm)
    return _calculateSphericalArea(points) / 10000.0;
  }

  // Implementation of spherical polygon area calculation
  static double _calculateSphericalArea(List<LatLng> points) {
    const double radius =
        6378137.0; // Earth radius in meters (WGS84 semi-major axis)
    double area = 0.0;

    if (points.length > 2) {
      for (int i = 0; i < points.length; i++) {
        final p1 = points[i];
        final p2 = points[(i + 1) % points.length];

        area +=
            (_degToRad(p2.longitude) - _degToRad(p1.longitude)) *
            (2 +
                math.sin(_degToRad(p1.latitude)) +
                math.sin(_degToRad(p2.latitude)));
      }
      area = area * radius * radius / 2.0;
    }

    return area.abs();
  }

  static LatLng calculateCentroid(List<LatLng> points) {
    if (points.isEmpty) return const LatLng(0, 0);

    double latSum = 0.0;
    double longSum = 0.0;

    for (final point in points) {
      latSum += point.latitude;
      longSum += point.longitude;
    }

    return LatLng(latSum / points.length, longSum / points.length);
  }

  static double _degToRad(double deg) {
    return deg * (math.pi / 180.0);
  }

  // Check if the new point is close enough to start point to close the polygon
  static bool isClosingPoint(
    LatLng start,
    LatLng current, {
    double thresholdMeters = 20,
  }) {
    const distance = Distance();
    return distance.as(LengthUnit.Meter, start, current) <= thresholdMeters;
  }

  static bool isPointInPolygon(LatLng point, List<LatLng> polygon) {
    if (polygon.isEmpty) return false;
    bool isInside = false;
    int j = polygon.length - 1;
    for (int i = 0; i < polygon.length; j = i++) {
      if (((polygon[i].latitude > point.latitude) !=
              (polygon[j].latitude > point.latitude)) &&
          (point.longitude <
              (polygon[j].longitude - polygon[i].longitude) *
                      (point.latitude - polygon[i].latitude) /
                      (polygon[j].latitude - polygon[i].latitude) +
                  polygon[i].longitude)) {
        isInside = !isInside;
      }
    }
    return isInside;
  }

  static double calculateDistance(LatLng p1, LatLng p2) {
    const distance = Distance();
    return distance.as(LengthUnit.Meter, p1, p2);
  }

  static double calculateCircleAreaHectares(double radiusMeters) {
    if (radiusMeters <= 0) return 0.0;
    // Area = pi * r^2
    final areaSqMeters = math.pi * math.pow(radiusMeters, 2);
    return areaSqMeters / 10000.0;
  }

  static List<LatLng> createCirclePolygon(
    LatLng center,
    double radiusMeters, {
    int steps = 60,
  }) {
    final List<LatLng> points = [];
    const distance = Distance();

    for (int i = 0; i < steps; i++) {
      final double bearing = (i * 360 / steps);
      points.add(distance.offset(center, radiusMeters, bearing));
    }
    return points;
  }

  static List<LatLng> createRectanglePolygon(LatLng p1, LatLng p2) {
    // Determine corners to ensure correct winding order
    // We simple create a box: p1.lat/p1.lon, p1.lat/p2.lon, p2.lat/p2.lon, p2.lat/p1.lon
    // But we need to make sure we don't cross?
    // Actually, just going P1 -> (P1.lat, P2.lon) -> P2 -> (P2.lat, P1.lon) works for axis aligned.

    return [
      p1,
      LatLng(p1.latitude, p2.longitude),
      p2,
      LatLng(p2.latitude, p1.longitude),
      // p1 // Do we need to close it? Usually FlutterMap Polygon doesn't need explicit closing point if isFilled is true, but standard is to close.
      // Our GeoArea points usually end with start point?
      // Looking at `saveArea` in Polygon mode, we rely on `currentPoints` which users manually close.
      // Let's not close it here, checking if `Polygon` widget closes it. It usually does visually.
    ];
  }

  static List<double> calculateBBox(List<LatLng> points) {
    if (points.isEmpty) return [0, 0, 0, 0];
    double minLat = 90;
    double maxLat = -90;
    double minLng = 180;
    double maxLng = -180;

    for (final p in points) {
      if (p.latitude < minLat) minLat = p.latitude;
      if (p.latitude > maxLat) maxLat = p.latitude;
      if (p.longitude < minLng) minLng = p.longitude;
      if (p.longitude > maxLng) maxLng = p.longitude;
    }

    // BBox format: [minLng, minLat, maxLng, maxLat] for GeoJSON/Sentinel
    return [minLng, minLat, maxLng, maxLat];
  }

  static Map<String, dynamic> toGeoJsonGeometry(List<LatLng> points) {
    if (points.isEmpty) return {};
    return {
      "type": "Polygon",
      "coordinates": [
        points.map((p) => [p.longitude, p.latitude]).toList()
          ..add([points.first.longitude, points.first.latitude]), // Close loop
      ],
    };
  }
}
