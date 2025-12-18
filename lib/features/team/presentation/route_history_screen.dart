import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:soloforte_app/features/team/data/route_repository.dart';
import 'package:soloforte_app/features/team/domain/team_member_model.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class RouteHistoryScreen extends StatefulWidget {
  final String memberId;
  final String memberName;

  const RouteHistoryScreen({
    super.key,
    required this.memberId,
    required this.memberName,
  });

  @override
  State<RouteHistoryScreen> createState() => _RouteHistoryScreenState();
}

class _RouteHistoryScreenState extends State<RouteHistoryScreen> {
  final RouteRepository _repository = MockRouteRepository();
  final MapController _mapController = MapController();

  List<TeamMemberLocation> _routePoints = [];
  bool _isLoading = true;
  DateTime _selectedDate = DateTime.now();

  @override
  void initState() {
    super.initState();
    _loadRoute();
  }

  Future<void> _loadRoute() async {
    setState(() => _isLoading = true);
    final points = await _repository.getRouteHistory(
      widget.memberId,
      _selectedDate,
    );
    setState(() {
      _routePoints = points;
      _isLoading = false;
    });

    // Fit bounds if points exist
    if (points.isNotEmpty) {
      // Simple fit bounds logic or move to first point
      // In real app use CameraFit.bounds
      _mapController.move(
        LatLng(points.first.latitude, points.first.longitude),
        14,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          children: [
            Text('Histórico de Trajeto', style: TextStyle(fontSize: 16)),
            Text(
              widget.memberName,
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.normal),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.calendar_month),
            onPressed: () async {
              final date = await showDatePicker(
                context: context,
                initialDate: _selectedDate,
                firstDate: DateTime(2023),
                lastDate: DateTime.now(),
              );
              if (date != null) {
                setState(() => _selectedDate = date);
                _loadRoute();
              }
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _routePoints.isEmpty
          ? const Center(child: Text('Nenhum trajeto registrado nesta data.'))
          : Stack(
              children: [
                FlutterMap(
                  mapController: _mapController,
                  options: MapOptions(
                    initialCenter: LatLng(
                      _routePoints.first.latitude,
                      _routePoints.first.longitude,
                    ),
                    initialZoom: 14,
                  ),
                  children: [
                    TileLayer(
                      urlTemplate:
                          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                      userAgentPackageName: 'com.soloforte.app',
                    ),
                    PolylineLayer(
                      polylines: [
                        Polyline(
                          points: _routePoints
                              .map((p) => LatLng(p.latitude, p.longitude))
                              .toList(),
                          strokeWidth: 4.0,
                          color: AppColors.primary,
                        ),
                      ],
                    ),
                    MarkerLayer(
                      markers: [
                        // Start Point
                        Marker(
                          point: LatLng(
                            _routePoints.first.latitude,
                            _routePoints.first.longitude,
                          ),
                          child: Icon(
                            Icons.flag,
                            color: Colors.green,
                            size: 30,
                          ),
                        ),
                        // End Point
                        Marker(
                          point: LatLng(
                            _routePoints.last.latitude,
                            _routePoints.last.longitude,
                          ),
                          child: Icon(Icons.flag, color: Colors.red, size: 30),
                        ),
                      ],
                    ),
                  ],
                ),
                Positioned(
                  bottom: 24,
                  left: 16,
                  right: 16,
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Column(
                            children: [
                              Text(
                                'Distância',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey,
                                ),
                              ),
                              Text(
                                '12.5 km',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                'Duração',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey,
                                ),
                              ),
                              Text(
                                '4h 30m',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                'Paradas',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey,
                                ),
                              ),
                              Text(
                                '3',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}
