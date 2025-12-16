import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/map/application/drawing_controller.dart';
import 'package:soloforte_app/features/map/application/geometry_utils.dart';
import 'package:soloforte_app/features/map/application/kml_service.dart';
import 'package:soloforte_app/features/map/domain/geo_area.dart';
import 'package:soloforte_app/core/presentation/widgets/premium_dialog.dart';
import 'package:soloforte_app/features/map/presentation/widgets/save_area_dialog.dart';
import 'widgets/map_controls.dart';
import 'widgets/drawing_toolbar.dart';
import 'widgets/area_details_sheet.dart';
import 'widgets/saved_areas_list_sheet.dart';
import 'package:soloforte_app/features/ndvi/presentation/ndvi_detail_screen.dart';

class MapScreen extends ConsumerStatefulWidget {
  final LatLng? initialLocation;

  const MapScreen({super.key, this.initialLocation});

  @override
  ConsumerState<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends ConsumerState<MapScreen> {
  final MapController _mapController = MapController();
  final KmlService _kmlService = KmlService();

  @override
  void initState() {
    super.initState();
    // If initial location provided, we might need to wait for map readiness or set option
    // MapOptions has initialCenter, so we can pass it there.
  }

  void _showSaveDialog(BuildContext context, DrawingController controller) {
    PremiumDialog.show(
      context: context,
      builder: (context) =>
          SaveAreaDialog(onSave: (name) => controller.saveArea(name)),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Only read notifier references here, do NOT watch state at top level to avoid full rebuilds
    final drawingController = ref.read(drawingControllerProvider.notifier);

    return Scaffold(
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter:
                  widget.initialLocation ??
                  const LatLng(-14.2350, -51.9253), // Brazil Center or provided
              initialZoom: widget.initialLocation != null ? 16.0 : 4.0,
              onTap: (tapPosition, point) {
                // Read current state efficiently without triggering rebuilds
                final drawingState = ref.read(drawingControllerProvider);

                if (drawingState.isDrawing) {
                  if (drawingState.activeTool == 'circle') {
                    if (drawingState.circleCenter == null) {
                      drawingController.addPoint(point); // Set center
                      // Optionally set a default radius immediately so user sees something
                      const distance = Distance();
                      final defaultRadiusPoint = distance.offset(
                        point,
                        100,
                        90,
                      ); // 100m east
                      drawingController.updateCircleRadius(defaultRadiusPoint);
                    }
                    return;
                  }

                  // Polygon logic
                  // Check if closing polygon
                  if (drawingState.currentPoints.isNotEmpty &&
                      drawingState.currentPoints.length >= 3 &&
                      GeometryUtils.isClosingPoint(
                        drawingState.currentPoints.first,
                        point,
                      )) {
                    _showSaveDialog(context, drawingController);
                  } else {
                    drawingController.addPoint(point);
                  }
                } else {
                  // Check for tap on existing area
                  GeoArea? tappedArea;
                  for (final area in drawingState.savedAreas.reversed) {
                    if (GeometryUtils.isPointInPolygon(point, area.points)) {
                      tappedArea = area;
                      break;
                    }
                  }

                  drawingController.selectArea(tappedArea?.id);

                  if (tappedArea != null) {
                    showModalBottomSheet(
                      context: context,
                      backgroundColor: Colors.transparent,
                      builder: (ctx) => AreaDetailsSheet(
                        area: tappedArea!,
                        onDelete: () =>
                            drawingController.deleteArea(tappedArea!.id),
                        onEdit: () {
                          Navigator.pop(ctx);
                          drawingController.startEditingArea(tappedArea!);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Modo de edição ativado'),
                              duration: Duration(seconds: 1),
                            ),
                          );
                        },
                        onAnalyze: () {
                          Navigator.pop(ctx);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) =>
                                  NDVIDetailScreen(area: tappedArea!),
                            ),
                          );
                        },
                      ),
                    ).whenComplete(() => drawingController.selectArea(null));
                  }
                }
              },
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.soloforte.app',
                maxZoom: 19,
              ),

              // Reactive Layers wrapped in Consumer
              Consumer(
                builder: (context, ref, child) {
                  final drawingState = ref.watch(drawingControllerProvider);
                  return Stack(
                    children: [
                      // Saved Areas
                      PolygonLayer(
                        polygons: drawingState.savedAreas.map((area) {
                          final isSelected =
                              area.id == drawingState.selectedAreaId;
                          return Polygon(
                            points: area.points,
                            color: isSelected
                                ? AppColors.primary.withValues(alpha: 0.5)
                                : AppColors.primary.withValues(alpha: 0.3),
                            borderColor: isSelected
                                ? Colors.white
                                : AppColors.primary,
                            borderStrokeWidth: isSelected ? 3 : 2,
                          );
                        }).toList(),
                      ),

                      // Current Drawing Polygon (Preview)
                      if (drawingState.isDrawing &&
                          drawingState.currentPoints.isNotEmpty)
                        PolygonLayer(
                          polygons: [
                            Polygon(
                              points: drawingState.currentPoints,
                              color: AppColors.secondary.withValues(alpha: 0.2),
                              borderColor: AppColors.secondary,
                              borderStrokeWidth: 2,
                            ),
                          ],
                        ),

                      // Current Drawing Circle (Preview)
                      if (drawingState.isDrawing &&
                          drawingState.activeTool == 'circle' &&
                          drawingState.circleCenter != null) ...[
                        CircleLayer(
                          circles: [
                            CircleMarker(
                              point: drawingState.circleCenter!,
                              radius: drawingState.circleRadius,
                              useRadiusInMeter: true,
                              color: AppColors.secondary.withValues(alpha: 0.2),
                              borderColor: AppColors.secondary,
                              borderStrokeWidth: 2,
                            ),
                          ],
                        ),
                        MarkerLayer(
                          markers: [
                            // Center Marker
                            Marker(
                              point: drawingState.circleCenter!,
                              width: 24,
                              height: 24,
                              child: GestureDetector(
                                onPanUpdate: (details) {
                                  final p = _mapController.camera
                                      .screenOffsetToLatLng(
                                        details.globalPosition,
                                      );
                                  drawingController.moveCircleCenter(p);
                                },
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: AppColors.secondary,
                                      width: 2,
                                    ),
                                  ),
                                  child: const Icon(
                                    Icons.open_with,
                                    size: 14,
                                    color: AppColors.secondary,
                                  ),
                                ),
                              ),
                            ),
                            // Radius Handle
                            if (drawingState.circleRadius > 0)
                              Marker(
                                point: const Distance().offset(
                                  drawingState.circleCenter!,
                                  drawingState.circleRadius,
                                  90,
                                ),
                                width: 24,
                                height: 24,
                                child: GestureDetector(
                                  onPanUpdate: (details) {
                                    final p = _mapController.camera
                                        .screenOffsetToLatLng(
                                          details.globalPosition,
                                        );
                                    drawingController.updateCircleRadius(p);
                                  },
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      shape: BoxShape.circle,
                                      border: Border.all(
                                        color: AppColors.secondary,
                                        width: 2,
                                      ),
                                      boxShadow: [
                                        BoxShadow(
                                          color: Colors.black.withOpacity(0.2),
                                          blurRadius: 4,
                                        ),
                                      ],
                                    ),
                                    child: const Icon(
                                      Icons.drag_handle,
                                      size: 16,
                                      color: AppColors.secondary,
                                    ),
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ],

                      // Drawing Points
                      if (drawingState.isDrawing &&
                          drawingState.activeTool == 'polygon')
                        MarkerLayer(
                          markers: drawingState.currentPoints.map((point) {
                            return Marker(
                              point: point,
                              width: 24,
                              height: 24,
                              child: GestureDetector(
                                onPanUpdate: (details) {
                                  final i = drawingState.currentPoints.indexOf(
                                    point,
                                  );
                                  if (i != -1) {
                                    final p = _mapController.camera
                                        .screenOffsetToLatLng(
                                          details.globalPosition,
                                        );
                                    drawingController.moveVertex(i, p);
                                  }
                                },
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: AppColors.secondary,
                                      width: 2,
                                    ),
                                    boxShadow: const [
                                      BoxShadow(
                                        color: Colors.black26,
                                        blurRadius: 4,
                                      ),
                                    ],
                                  ),
                                  child: const Center(
                                    child: Icon(
                                      Icons.drag_indicator,
                                      size: 14,
                                      color: AppColors.secondary,
                                    ),
                                  ),
                                ),
                              ),
                            );
                          }).toList(),
                        ),
                    ],
                  );
                },
              ),
            ],
          ),

          // Top Right Controls
          Positioned(
            right: 16,
            top: 16,
            child: Consumer(
              builder: (context, ref, _) {
                // MapControls logic might need state if it highlights buttons?
                // Currently it doesn't seem to depend on drawingState for UI, only for callbacks.
                // But wait, "Import" button callbacks?
                // We kept MapControls as stateless widget receiving callbacks from MapScreen.
                // So we need to access state inside the callbacks passed to MapControls.
                // The callbacks are defined below.
                return MapControls(
                  mapController: _mapController,
                  onLocationPressed: () {
                    _mapController.move(
                      const LatLng(-15.793889, -47.882778),
                      15,
                    );
                  },
                  onLayersPressed: () {},
                  onImportPressed: () async {
                    final areas = await _kmlService.pickAndParseKml();
                    if (areas.isNotEmpty) {
                      for (final area in areas) {
                        drawingController.importArea(area);
                      }
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('${areas.length} áreas importadas'),
                        ),
                      );

                      if (areas.first.points.isNotEmpty) {
                        _mapController.move(areas.first.points.first, 14);
                      }
                    }
                  },
                  onExportPressed: () async {
                    // Here we need current state. ref.read is safer.
                    final state = ref.read(drawingControllerProvider);
                    if (state.savedAreas.isEmpty) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Nenhuma área para exportar'),
                        ),
                      );
                      return;
                    }
                    await _kmlService.exportToKml(state.savedAreas);
                  },
                  onListPressed: () {
                    showModalBottomSheet(
                      context: context,
                      isScrollControlled: true,
                      backgroundColor: Colors.transparent,
                      builder: (ctx) => SavedAreasListSheet(
                        onAreaSelected: (area) {
                          Navigator.pop(ctx);
                          drawingController.selectArea(area.id);
                          if (area.points.isNotEmpty) {
                            _mapController.move(
                              area.center ?? area.points.first,
                              15,
                            );
                          } else if (area.center != null) {
                            _mapController.move(area.center!, 15);
                          }
                        },
                      ),
                    );
                  },
                );
              },
            ),
          ),

          // Bottom Toolbar
          const DrawingToolbar(),
        ],
      ),
    );
  }
}
