import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:go_router/go_router.dart';
import 'package:geolocator/geolocator.dart';
import 'package:soloforte_app/features/visits/presentation/visit_controller.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'widgets/map_side_controls.dart';
import 'widgets/radial_menu.dart';
import 'widgets/online_status_badge.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  final MapController _mapController = MapController();
  bool _isOnline = true;
  bool _isRadialMenuOpen = false;

  // Mock Data
  final List<Polygon> _mockAreas = [
    Polygon(
      points: [
        const LatLng(-14.2350, -51.9253),
        const LatLng(-14.2400, -51.9253),
        const LatLng(-14.2400, -51.9300),
        const LatLng(-14.2350, -51.9300),
      ],
      color: Colors.green.withOpacity(0.3),
      borderColor: Colors.green,
      borderStrokeWidth: 2,
    ),
    Polygon(
      points: [
        const LatLng(-14.2450, -51.9353),
        const LatLng(-14.2500, -51.9353),
        const LatLng(-14.2500, -51.9400),
        const LatLng(-14.2450, -51.9400),
      ],
      color: Colors.orange.withOpacity(0.3),
      borderColor: Colors.orange,
      borderStrokeWidth: 2,
    ),
  ];

  final List<Marker> _mockOccurrences = [
    Marker(
      point: const LatLng(-14.2375, -51.9275),
      width: 40,
      height: 40,
      child: Container(
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 4,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: const Icon(Icons.bug_report, color: Colors.red, size: 24),
      ),
    ),
    Marker(
      point: const LatLng(-14.2475, -51.9375),
      width: 40,
      height: 40,
      child: Container(
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 4,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: const Icon(Icons.water_drop, color: Colors.blue, size: 24),
      ),
    ),
  ];

  @override
  void dispose() {
    _mapController.dispose();
    super.dispose();
  }

  Future<void> _centerOnUserLocation() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Serviços de localização desativados.')),
        );
      }
      return;
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Permissão de localização negada.')),
          );
        }
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Permissões de localização permanentemente negadas.'),
          ),
        );
      }
      return;
    }

    final position = await Geolocator.getCurrentPosition();
    _mapController.move(LatLng(position.latitude, position.longitude), 15.0);
  }

  void _zoomIn() {
    final currentZoom = _mapController.camera.zoom;
    _mapController.move(_mapController.camera.center, currentZoom + 1);
  }

  void _zoomOut() {
    final currentZoom = _mapController.camera.zoom;
    _mapController.move(_mapController.camera.center, currentZoom - 1);
  }

  void _handleSync() {
    setState(() {
      _isOnline = !_isOnline;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(_isOnline ? 'Sincronizado' : 'Modo Offline'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _hideMenus() {
    if (_isRadialMenuOpen) {
      setState(() => _isRadialMenuOpen = false);
    }
  }

  void _toggleRadialMenu() {
    setState(() {
      _isRadialMenuOpen = !_isRadialMenuOpen;
    });
  }

  @override
  Widget build(BuildContext context) {
    // Watch active visit to show sticky card
    final activeVisitAsync = ref.watch(visitControllerProvider);
    final activeVisit = activeVisitAsync.value;

    return Scaffold(
      body: Stack(
        children: [
          // Fullscreen Map
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: const LatLng(-14.2350, -51.9253),
              initialZoom: 13.0,
              minZoom: 3.0,
              maxZoom: 18.0,
              onTap: (_, __) => _hideMenus(),
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.soloforte.app',
                maxZoom: 19,
              ),
              PolygonLayer(polygons: _mockAreas),
              MarkerLayer(markers: _mockOccurrences),
            ],
          ),

          // Occurrences List (Top Left)
          Positioned(
            top: 16,
            left: 16,
            right: 80, // Leave space for side controls
            child: SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.9),
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(
                          Icons.warning_amber_rounded,
                          size: 16,
                          color: Colors.orange,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          'Últimas Ocorrências',
                          style: Theme.of(context).textTheme.labelMedium
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    height: 180, // Limit height
                    child: ListView.separated(
                      padding: EdgeInsets.zero,
                      physics: const BouncingScrollPhysics(),
                      itemCount: 3, // Only show 3
                      separatorBuilder: (_, __) => const SizedBox(height: 8),
                      itemBuilder: (context, index) =>
                          _buildOccurrenceCard(index),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Online Status Badge (Top Center-Rightish - moved to not overlap lists)
          Positioned(
            top: 16,
            right: 16,
            child: SafeArea(
              child: OnlineStatusBadge(
                isOnline: _isOnline,
                onSyncTap: _handleSync,
              ),
            ),
          ),

          // Map Side Controls (Right Side)
          MapSideControls(
            onLocationTap: _centerOnUserLocation,
            onSyncTap: _handleSync,
            onZoomIn: _zoomIn,
            onZoomOut: _zoomOut,
            onLayersTap: () {
              ScaffoldMessenger.of(
                context,
              ).showSnackBar(const SnackBar(content: Text('Camadas')));
            },
            onDrawTap: () {
              context.push('/analysis/new');
            },
          ),

          // Area List (Bottom, above BottomBar)
          Positioned(
            bottom: 100, // Above bottom bar
            left: 0,
            right: 0,
            child: SizedBox(
              height: 140,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                itemCount: 5,
                separatorBuilder: (_, __) => const SizedBox(width: 12),
                itemBuilder: (context, index) => _buildAreaCard(index),
              ),
            ),
          ),

          // Active Visit Indicator (Bottom Center, just above areas/nav)
          if (activeVisit != null && activeVisit.status.name == 'ongoing')
            Positioned(
              top: 80, // Below header
              left: 16,
              right: 80,
              child: SafeArea(
                child: GestureDetector(
                  onTap: () => context.push('/visit/active'),
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 12,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: BorderRadius.circular(30),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.primary.withOpacity(0.4),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.timer, color: Colors.white),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            "Em andamento: ${activeVisit.client.name}",
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        const Icon(
                          Icons.arrow_forward_ios,
                          color: Colors.white,
                          size: 14,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),

          // Radial Menu Overlay
          if (_isRadialMenuOpen)
            Positioned.fill(
              child: RadialMenu(
                onDrawTap: () {
                  _toggleRadialMenu();
                  context.push('/analysis/new');
                },
                onOccurrenceTap: () {
                  _toggleRadialMenu();
                  // TODO: Handle New Occurrence
                },
                onScannerTap: () {
                  _toggleRadialMenu();
                  context.push('/dashboard/scanner');
                },
                onReportTap: () {
                  _toggleRadialMenu();
                  context.push('/dashboard/report/new');
                },
                onClose: _toggleRadialMenu,
              ),
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggleRadialMenu,
        backgroundColor: _isRadialMenuOpen
            ? Colors.grey
            : const Color(0xFF2E7D32),
        child: Icon(
          _isRadialMenuOpen ? Icons.close : Icons.add,
          color: Colors.white,
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }

  Widget _buildOccurrenceCard(int index) {
    final types = ['Praga', 'Doença', 'Daninha'];
    final titles = ['Lagarta do Cartucho', 'Ferrugem Asiática', 'Buva'];
    final colors = [Colors.red, Colors.orange, Colors.purple];

    return Container(
      width: 260,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.95),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: colors[index % 3].withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              Icons.bug_report_outlined,
              color: colors[index % 3],
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  titles[index % 3],
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  types[index % 3],
                  style: TextStyle(color: Colors.grey[600], fontSize: 11),
                ),
              ],
            ),
          ),
          Column(
            children: [
              Text(
                'Há 2h',
                style: TextStyle(color: Colors.grey[500], fontSize: 10),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAreaCard(int index) {
    return GestureDetector(
      onTap: () {
        // Zoom to area
        _mapController.move(const LatLng(-14.2350, -51.9253), 15.5);
      },
      child: Container(
        width: 160,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          children: [
            // Mini Map / Image placeholder
            Expanded(
              flex: 3,
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(16),
                  ),
                  image: const DecorationImage(
                    image: AssetImage(
                      'assets/images/field_placeholder.jpg',
                    ), // Ensure asset exists or use color
                    fit: BoxFit.cover,
                  ),
                ),
                child: Center(child: Icon(Icons.map, color: Colors.grey[400])),
              ),
            ),
            // Info
            Expanded(
              flex: 2,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Talhão ${index + 1}',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '${(120 + index * 15)} ha',
                          style: TextStyle(
                            color: Colors.grey[600],
                            fontSize: 12,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 6,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.green.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: const Text(
                            'Ativo',
                            style: TextStyle(
                              color: Colors.green,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
