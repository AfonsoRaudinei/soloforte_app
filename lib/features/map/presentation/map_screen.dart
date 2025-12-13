import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/map/application/drawing_controller.dart';
import 'package:soloforte_app/features/map/application/geometry_utils.dart';
import 'package:soloforte_app/features/map/application/kml_service.dart';
import 'package:soloforte_app/features/map/domain/geo_area.dart';
import 'widgets/map_controls.dart';
import 'widgets/drawing_toolbar.dart';
import 'widgets/area_details_sheet.dart';
import 'widgets/saved_areas_list_sheet.dart';
import 'package:soloforte_app/features/ndvi/presentation/ndvi_detail_screen.dart';

class MapScreen extends ConsumerStatefulWidget {
  const MapScreen({super.key});

  @override
  ConsumerState<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends ConsumerState<MapScreen> {
  final MapController _mapController = MapController();
  final KmlService _kmlService = KmlService();

  void _showSaveDialog(BuildContext context, DrawingController controller) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Salvar Área'),
        content: TextField(
          decoration: const InputDecoration(
            labelText: 'Nome da Área',
            hintText: 'Ex: Talhão 1 - Soja',
          ),
          autofocus: true,
          onSubmitted: (value) {
            if (value.isNotEmpty) {
              controller.saveArea(value);
              Navigator.pop(context);
            }
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final drawingState = ref.watch(drawingControllerProvider);
    final drawingController = ref.read(drawingControllerProvider.notifier);

    return Scaffold(
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: const LatLng(-14.2350, -51.9253), // Brazil Center
              initialZoom: 4.0,
              onTap: (tapPosition, point) {
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

              // Saved Areas
              PolygonLayer(
                polygons: drawingState.savedAreas.map((area) {
                  final isSelected = area.id == drawingState.selectedAreaId;
                  return Polygon(
                    points: area.points,
                    color: isSelected
                        ? AppColors.primary.withValues(alpha: 0.5)
                        : AppColors.primary.withValues(alpha: 0.3),
                    borderColor: isSelected ? Colors.white : AppColors.primary,
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
                          final p = _mapController.camera.pointToLatLng(
                            math.Point(
                              details.globalPosition.dx,
                              details.globalPosition.dy,
                            ),
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
                    // Radius Handle Marker (Calculated position: East from center)
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
                            // We need to convert screen drag to Map point
                            // flutter_map doesn't easily expose "drag to coord" in Marker without using mapController.
                            // A simpler way: Get the tap position from mapController? No.
                            // We can use the drag details delta to adjust radius? Hard to map to meters.

                            // Alternative: Use a large invisible GestureDetector on top?
                            // Or better: Just use the fact that Marker is a widget.
                            // But 'details.globalPosition' needs to be converted to LatLng.

                            final p = _mapController.camera.pointToLatLng(
                              math.Point(
                                details.globalPosition.dx,
                                details.globalPosition.dy,
                              ),
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

              // Drawing Points (Markers for vertices)
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
                          final i = drawingState.currentPoints.indexOf(point);
                          if (i != -1) {
                            final p = _mapController.camera.pointToLatLng(
                              math.Point(
                                details.globalPosition.dx,
                                details.globalPosition.dy,
                              ),
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
                              BoxShadow(color: Colors.black26, blurRadius: 4),
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
          ),

          // Top Right Controls
          Positioned(
            right: 16,
            top: 16,
            child: MapControls(
              mapController: _mapController,
              onLocationPressed: () {
                // TODO: Implement GPS location
                _mapController.move(
                  const LatLng(-15.793889, -47.882778),
                  15,
                ); // Brasilia default
              },
              onLayersPressed: () {
                // TODO: Implement Layer Switcher (Satellite vs Street)
              },
              onImportPressed: () async {
                final areas = await _kmlService.pickAndParseKml();
                if (areas.isNotEmpty) {
                  // Add to drawing state
                  // We need to access controller logic for this.
                  // Simplest is to just add to savedAreas via a new method in controller.
                  // For now, let's just add one by one or create a bulk add.
                  // Let's modify DrawingController to accept bulk add or loop.
                  // Since we are not modifying controller right now, we can loop.
                  for (final area in areas) {
                    drawingController.importArea(area);
                  }
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('${areas.length} áreas importadas')),
                  );

                  // Zoom to first area
                  if (areas.first.points.isNotEmpty) {
                    _mapController.move(areas.first.points.first, 14);
                  }
                }
              },
              onExportPressed: () async {
                if (drawingState.savedAreas.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Nenhuma área para exportar')),
                  );
                  return;
                }
                await _kmlService.exportToKml(drawingState.savedAreas);
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
                        // Calculate bounds to zoom
                        // Simple centroid move for now, or bounds fitting
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
            ),
          ),

          // Bottom Toolbar
          const DrawingToolbar(),
        ],
      ),
    );
  }
}
