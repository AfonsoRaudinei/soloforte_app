import 'package:flutter/foundation.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:soloforte_app/features/map/domain/geo_area.dart';
import 'package:soloforte_app/features/map/application/geometry_utils.dart';
import 'package:soloforte_app/features/ndvi/data/services/sentinel_service.dart';
import 'package:soloforte_app/features/ndvi/data/services/ndvi_cache_service.dart';

part 'ndvi_controller.g.dart';

@riverpod
class NdviController extends _$NdviController {
  final SentinelService _sentinelService = SentinelService();
  final NdviCacheService _cacheService = NdviCacheService();

  @override
  NdviState build() {
    return const NdviState();
  }

  Future<void> updateFilters({int? days, double? cloudCover}) async {
    state = state.copyWith(dateRangeDays: days, maxCloudCover: cloudCover);
    if (state.currentArea != null) {
      await initializeForArea(state.currentArea!);
    }
  }

  Future<void> initializeForArea(GeoArea area) async {
    state = state.copyWith(
      isLoading: true,
      currentArea: area,
      availableDates: [],
    );
    try {
      final bbox = GeometryUtils.calculateBBox(area.points);
      final endDate = DateTime.now();
      final startDate = endDate.subtract(Duration(days: state.dateRangeDays));

      final features = await _sentinelService.searchImages(
        bbox: bbox,
        startDate: startDate,
        endDate: endDate,
        maxCloudCover: state.maxCloudCover,
      );

      var dates = features.map((f) {
        final dateStr = f['properties']['datetime'] as String;
        return DateTime.parse(dateStr);
      }).toList();

      state = state.copyWith(
        availableDates: dates,
        selectedDate: dates.isNotEmpty ? dates.first : null,
      );

      if (dates.isNotEmpty) {
        await loadNdviImage(dates.first);
      }
    } catch (e) {
      // Fallback to local cache if offline
      try {
        final localDates = await _cacheService.getAvailableDates(area.id);
        if (localDates.isNotEmpty) {
          state = state.copyWith(
            availableDates: localDates,
            selectedDate: localDates.first,
            errorMessage: 'Sem internet. Exibindo dados salvos.',
          );
          await loadNdviImage(localDates.first);
        } else {
          state = state.copyWith(
            errorMessage: 'Erro de conexão e cache vazio: $e',
          );
        }
      } catch (cacheError) {
        state = state.copyWith(errorMessage: 'Erro crítico: $e');
      }
    } finally {
      state = state.copyWith(isLoading: false);
    }
  }

  Future<void> loadNdviImage(DateTime date) async {
    final currentArea = state.currentArea;
    if (currentArea == null) return;

    state = state.copyWith(
      isImageLoading: true,
      selectedDate: date,
      currentImageBytes: null,
      currentStats: null,
      errorMessage: null,
    );

    try {
      // 1. Check Cache
      final cached = await _cacheService.getNdviData(
        areaId: currentArea.id,
        date: date,
      );

      if (cached != null) {
        state = state.copyWith(
          currentImageBytes: cached.imageBytes,
          currentStats: cached.stats,
        );
        // If we have both, we are done. If missing one, maybe valid to fetch?
        // Usually we fetch both together.
        if (cached.imageBytes != null && cached.stats != null) {
          return;
        }
      }

      // 2. Fetch from Network
      final geometry = GeometryUtils.toGeoJsonGeometry(currentArea.points);
      final bbox = GeometryUtils.calculateBBox(currentArea.points);

      // Calculate aspect ratio for resolution
      final width = (bbox[2] - bbox[0]); // lng diff
      final height = (bbox[3] - bbox[1]); // lat diff
      final aspectRatio = width / height;

      // Base resolution (e.g., 512px)
      const baseSize = 512;
      int reqWidth, reqHeight;
      if (aspectRatio > 1) {
        reqWidth = baseSize;
        reqHeight = (baseSize / aspectRatio).round();
      } else {
        reqHeight = baseSize;
        reqWidth = (baseSize * aspectRatio).round();
      }

      final imageBytes = await _sentinelService.fetchNDVIImage(
        bbox: bbox,
        date: date,
        geometry: geometry,
        width: reqWidth, // Dynamic width
        height: reqHeight, // Dynamic height
      );

      final stats = await _sentinelService.fetchStatistics(
        geoJsonGeometry: geometry,
        date: date,
      );

      // 3. Save to Cache
      await _cacheService.saveNdviData(
        areaId: currentArea.id,
        date: date,
        imageBytes: imageBytes,
        stats: stats,
      );

      state = state.copyWith(
        currentImageBytes: imageBytes,
        currentStats: stats,
      );
    } catch (e) {
      state = state.copyWith(errorMessage: 'Erro ao carregar imagem: $e');
    } finally {
      state = state.copyWith(isImageLoading: false);
    }
  }
}

class NdviState {
  final bool isLoading;
  final bool isImageLoading;
  final GeoArea? currentArea;
  final List<DateTime> availableDates;
  final DateTime? selectedDate;
  final Uint8List? currentImageBytes;
  final Map<String, dynamic>? currentStats;
  final String? errorMessage;

  final int dateRangeDays;
  final double maxCloudCover;

  const NdviState({
    this.isLoading = false,
    this.isImageLoading = false,
    this.currentArea,
    this.availableDates = const [],
    this.selectedDate,
    this.currentImageBytes,
    this.currentStats,
    this.errorMessage,
    this.dateRangeDays = 30,
    this.maxCloudCover = 20.0,
  });

  NdviState copyWith({
    bool? isLoading,
    bool? isImageLoading,
    GeoArea? currentArea,
    List<DateTime>? availableDates,
    DateTime? selectedDate,
    Uint8List? currentImageBytes,
    Map<String, dynamic>? currentStats,
    String? errorMessage,
    int? dateRangeDays,
    double? maxCloudCover,
  }) {
    return NdviState(
      isLoading: isLoading ?? this.isLoading,
      isImageLoading: isImageLoading ?? this.isImageLoading,
      currentArea: currentArea ?? this.currentArea,
      availableDates: availableDates ?? this.availableDates,
      selectedDate: selectedDate ?? this.selectedDate,
      currentImageBytes: currentImageBytes ?? this.currentImageBytes,
      currentStats: currentStats ?? this.currentStats,
      errorMessage: errorMessage ?? this.errorMessage,
      dateRangeDays: dateRangeDays ?? this.dateRangeDays,
      maxCloudCover: maxCloudCover ?? this.maxCloudCover,
    );
  }
}
