import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:soloforte_app/features/map/domain/geo_area.dart';
import 'package:soloforte_app/features/map/application/geometry_utils.dart';
import 'package:soloforte_app/features/ndvi/data/services/sentinel_service.dart';

part 'ndvi_comparison_controller.g.dart';

@riverpod
class NdviComparisonController extends _$NdviComparisonController {
  final SentinelService _sentinelService = SentinelService();

  @override
  NdviComparisonState build() {
    return const NdviComparisonState();
  }

  Future<void> initializeForAreas(List<GeoArea> areas) async {
    state = state.copyWith(isLoading: true, areas: areas);

    // We want to fetch statistics for the last 90 days for all areas
    final endDate = DateTime.now();
    final startDate = endDate.subtract(const Duration(days: 90));

    final Map<String, List<NdviDataPoint>> allStats = {};

    try {
      for (final area in areas) {
        // Prepare geometry
        final geometry = GeometryUtils.toGeoJsonGeometry(area.points);
        if (geometry.isEmpty) continue; // Skip bad areas

        // Sentinel Statistics API can accept an aggregation interval (e.g. P1D)
        // We reuse fetchStatistics logic but we need to process the response differently
        // The current fetchStatistics in service is a bit simplistic, returning raw JSON map.
        // We might need to iterate over days?
        // Actually, Sentinel FIS requests can return a time series if we specify aggregation interval.

        // Let's assume we call fetchStatistics for the whole range and it returns time series.
        // Wait, my SentinelService.fetchStatistics calls with "timeRange" and "aggregationInterval": "P1D".
        // So it SHOULD return a list of results for each interval.

        final response = await _sentinelService.fetchStatistics(
          geoJsonGeometry: geometry,
          startDate: startDate,
          endDate: endDate,
        );

        if (response['data'] != null) {
          final dataList = response['data'] as List;
          final points = <NdviDataPoint>[];

          for (var item in dataList) {
            try {
              final intervalFrom = DateTime.parse(item['interval']['from']);
              final stats = item['outputs']['ndvi']['bands']['B0']['stats'];
              final mean = stats['mean'];

              if (mean != null) {
                points.add(
                  NdviDataPoint(intervalFrom, (mean as num).toDouble()),
                );
              }
            } catch (e) {
              // Skip malformed point
            }
          }
          // Sort by date just in case
          points.sort((a, b) => a.date.compareTo(b.date));
          allStats[area.id] = points;
        }
      }
      state = state.copyWith(areaStats: allStats);
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
    } finally {
      state = state.copyWith(isLoading: false);
    }
  }
}

class NdviDataPoint {
  final DateTime date;
  final double meanNdvi;
  NdviDataPoint(this.date, this.meanNdvi);
}

class NdviComparisonState {
  final bool isLoading;
  final List<GeoArea> areas;
  final Map<String, List<NdviDataPoint>> areaStats; // Map<AreaId, List<Point>>
  final String? errorMessage;

  const NdviComparisonState({
    this.isLoading = false,
    this.areas = const [],
    this.areaStats = const {},
    this.errorMessage,
  });

  NdviComparisonState copyWith({
    bool? isLoading,
    List<GeoArea>? areas,
    Map<String, List<NdviDataPoint>>? areaStats,
    String? errorMessage,
  }) {
    return NdviComparisonState(
      isLoading: isLoading ?? this.isLoading,
      areas: areas ?? this.areas,
      areaStats: areaStats ?? this.areaStats,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}
