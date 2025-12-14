import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:latlong2/latlong.dart';

import 'package:soloforte_app/features/map/domain/geo_area.dart';
import 'package:soloforte_app/features/map/application/geometry_utils.dart';
import 'package:soloforte_app/features/ndvi/application/ndvi_controller.dart';
import 'package:soloforte_app/features/reports/application/report_service.dart';
import 'package:soloforte_app/features/ndvi/presentation/widgets/ndvi_statistics_card.dart';
import 'package:intl/intl.dart';

class NDVIDetailScreen extends ConsumerStatefulWidget {
  final GeoArea area;

  const NDVIDetailScreen({super.key, required this.area});

  @override
  ConsumerState<NDVIDetailScreen> createState() => _NDVIDetailScreenState();
}

class _NDVIDetailScreenState extends ConsumerState<NDVIDetailScreen> {
  late final MapController _mapController;

  @override
  void initState() {
    super.initState();
    _mapController = MapController();
    // Initialize controller data
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(ndviControllerProvider.notifier).initializeForArea(widget.area);
    });
  }

  void _playTimelapse() async {
    final dates = ref.read(ndviControllerProvider).availableDates;
    if (dates.isEmpty) return;

    // Sort dates ascending for timelapse
    final sortedDates = List<DateTime>.from(dates)
      ..sort((a, b) => a.compareTo(b));

    for (final date in sortedDates) {
      if (!mounted) return;
      ref.read(ndviControllerProvider.notifier).loadNdviImage(date);
      await Future.delayed(const Duration(seconds: 2));
    }
  }

  void _exportReport() async {
    final state = ref.read(ndviControllerProvider);
    if (state.selectedDate == null) return;

    // Show loading? or just do it async (pdf generation is fast)
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Gerando relatório...')));

    try {
      await ref
          .read(reportServiceProvider)
          .generateAndShareNDVIReport(
            area: widget.area,
            date: state.selectedDate!,
            ndviImageBytes: state.currentImageBytes,
            stats: state.currentStats,
          );
    } catch (e) {
      if (mounted)
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Erro ao gerar relatório: $e')));
    }
  }

  void _showFilterSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _FilterSheet(
        currentDays: ref.read(ndviControllerProvider).dateRangeDays,
        currentCloudCover: ref.read(ndviControllerProvider).maxCloudCover,
        onApply: (days, cloudCover) {
          ref
              .read(ndviControllerProvider.notifier)
              .updateFilters(days: days, cloudCover: cloudCover);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ndviState = ref.watch(ndviControllerProvider);

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(
          widget.area.name,
          style: const TextStyle(
            color: Colors.white,
            shadows: [Shadow(color: Colors.black, blurRadius: 4)],
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
        actions: [
          IconButton(icon: const Icon(Icons.tune), onPressed: _showFilterSheet),
          IconButton(icon: const Icon(Icons.share), onPressed: _exportReport),
        ],
      ),
      body: Stack(
        children: [
          // MAP VIEWER
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter:
                  widget.area.center ??
                  (widget.area.points.isNotEmpty
                      ? widget.area.points.first
                      : const LatLng(0, 0)),
              initialZoom: 15.0,
              interactionOptions: const InteractionOptions(
                flags: InteractiveFlag.all,
              ),
            ),
            children: [
              TileLayer(
                urlTemplate:
                    'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // In pro app, use Satellite provider here!
                userAgentPackageName: 'com.soloforte.app',
              ),

              // NDVI Overlay
              if (ndviState.currentImageBytes != null)
                OverlayImageLayer(
                  overlayImages: [
                    OverlayImage(
                      bounds: _getBounds(widget.area.points),
                      imageProvider: MemoryImage(ndviState.currentImageBytes!),
                      opacity: 0.8,
                    ),
                  ],
                ),

              // Polygon Outline
              PolygonLayer(
                polygons: [
                  Polygon(
                    points: widget.area.points,
                    color: Colors.transparent,
                    borderColor: Colors.white,
                    borderStrokeWidth: 2,
                    // isFilled: false,
                  ),
                ],
              ),
            ],
          ),

          if (ndviState.isImageLoading)
            const Positioned(
              top: 100,
              right: 20,
              child: Card(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  ),
                ),
              ),
            ),

          // ERROR MESSAGE
          if (ndviState.errorMessage != null)
            Center(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 20),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.black87,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  ndviState.errorMessage!,
                  style: const TextStyle(color: Colors.white),
                  textAlign: TextAlign.center,
                ),
              ),
            ),

          // BOTTOM CONTROLS
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.only(
                bottom: 30,
                left: 16,
                right: 16,
                top: 16,
              ),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [Colors.black87, Colors.transparent],
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Stats Card
                  if (ndviState.currentStats != null)
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: NDVIStatisticsCard(stats: ndviState.currentStats),
                    ),

                  // Stats / Controls
                  Row(
                    children: [
                      FloatingActionButton.small(
                        onPressed: _playTimelapse,
                        child: const Icon(Icons.play_arrow),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: SizedBox(
                          height: 60,
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: ndviState.availableDates.length,
                            itemBuilder: (context, index) {
                              final date = ndviState.availableDates[index];
                              final isSelected = ndviState.selectedDate == date;
                              return Padding(
                                padding: const EdgeInsets.only(right: 8.0),
                                child: ChoiceChip(
                                  label: Text(DateFormat('dd/MM').format(date)),
                                  selected: isSelected,
                                  onSelected: (selected) {
                                    if (selected) {
                                      ref
                                          .read(ndviControllerProvider.notifier)
                                          .loadNdviImage(date);
                                    }
                                  },
                                  selectedColor: Colors.greenAccent,
                                  backgroundColor: Colors.white24,
                                  labelStyle: TextStyle(
                                    color: isSelected
                                        ? Colors.black
                                        : Colors.white,
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Legend
                  const Card(
                    color: Colors.white,
                    child: Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _LegendItem(color: Colors.red, label: '< 0.2'),
                          _LegendItem(color: Colors.yellow, label: '0.2-0.4'),
                          _LegendItem(
                            color: Colors.lightGreen,
                            label: '0.4-0.6',
                          ),
                          _LegendItem(color: Color(0xFF2E7D32), label: '> 0.6'),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  LatLngBounds _getBounds(List<LatLng> points) {
    if (points.isEmpty)
      return LatLngBounds(const LatLng(0, 0), const LatLng(0, 0));
    final bbox = GeometryUtils.calculateBBox(points);
    // bbox: [minLng, minLat, maxLng, maxLat]
    return LatLngBounds(
      LatLng(bbox[1], bbox[0]), // SouthWest
      LatLng(bbox[3], bbox[2]), // NorthEast
    );
  }
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendItem({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(width: 20, height: 20, color: color),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 10)),
      ],
    );
  }
}

class _FilterSheet extends StatefulWidget {
  final int currentDays;
  final double currentCloudCover;
  final Function(int, double) onApply;

  const _FilterSheet({
    required this.currentDays,
    required this.currentCloudCover,
    required this.onApply,
  });

  @override
  State<_FilterSheet> createState() => _FilterSheetState();
}

class _FilterSheetState extends State<_FilterSheet> {
  late int _selectedDays;
  late double _selectedCloudCover;

  @override
  void initState() {
    super.initState();
    _selectedDays = widget.currentDays;
    _selectedCloudCover = widget.currentCloudCover;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Filtros de Busca',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24),

          Text(
            'Período de Análise',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 12),
          Row(
            children: [30, 60, 90].map((days) {
              final isSelected = _selectedDays == days;
              return Padding(
                padding: const EdgeInsets.only(right: 12),
                child: ChoiceChip(
                  label: Text('Últimos $days dias'),
                  selected: isSelected,
                  onSelected: (selected) {
                    if (selected) setState(() => _selectedDays = days);
                  },
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: 24),
          Text(
            'Máx. Cobertura de Nuvens: ${_selectedCloudCover.round()}%',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          Slider(
            value: _selectedCloudCover,
            min: 10,
            max: 100,
            divisions: 9,
            label: '${_selectedCloudCover.round()}%',
            onChanged: (value) => setState(() => _selectedCloudCover = value),
          ),

          const SizedBox(height: 24),
          FilledButton(
            onPressed: () {
              widget.onApply(_selectedDays, _selectedCloudCover);
              Navigator.pop(context);
            },
            child: const Text('Aplicar Filtros'),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}
