import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'widgets/weather_radar.dart';
import 'widgets/forecast_list.dart';
import 'widgets/hourly_forecast.dart';
import 'widgets/hourly_forecast_chart.dart';
import 'widgets/weather_alerts.dart';
import 'widgets/current_conditions_card.dart';
import 'widgets/notification_settings_modal.dart';
import 'widgets/farm_management_modal.dart';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../application/weather_provider.dart';

class WeatherScreen extends ConsumerStatefulWidget {
  const WeatherScreen({super.key});

  @override
  ConsumerState<WeatherScreen> createState() => _WeatherScreenState();
}

class _WeatherScreenState extends ConsumerState<WeatherScreen>
    with TickerProviderStateMixin {
  String _location = 'CARREGANDO...';
  double? _latitude;
  double? _longitude;
  List<String> _savedFarms = ['FAZENDA MODELO - SORRISO', 'SEDE - SINOP'];

  @override
  void initState() {
    super.initState();
    _initLocation();
  }

  Future<void> _initLocation() async {
    try {
      bool serviceEnabled;
      LocationPermission permission;

      // Test if location services are enabled.
      serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        setState(() {
          _location = 'GPS DESATIVADO';
        });
        return;
      }

      permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          setState(() {
            _location = 'PERMISSÃO NEGADA';
          });
          return;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        setState(() {
          _location = 'PERMISSÃO NEGADA';
        });
        return;
      }

      final position = await Geolocator.getCurrentPosition();

      if (mounted) {
        setState(() {
          _latitude = position.latitude;
          _longitude = position.longitude;
        });
      }

      try {
        List<Placemark> placemarks = await placemarkFromCoordinates(
          position.latitude,
          position.longitude,
        );

        if (placemarks.isNotEmpty) {
          final place = placemarks.first;
          final city =
              place.subAdministrativeArea ?? place.locality ?? 'Desconhecido';
          final state = place.administrativeArea ?? '';
          setState(() {
            _location = '$city, $state'.toUpperCase();
          });
        }
      } catch (e) {
        // Fallback if geocoding fails (e.g. no internet)
        setState(() {
          _location =
              '${position.latitude.toStringAsFixed(4)}, ${position.longitude.toStringAsFixed(4)}';
        });
      }
    } catch (e) {
      setState(() {
        _location = 'ERRO AO OBTER LOCAL';
      });
      debugPrint('Location error: $e');
    }
  }

  Future<void> _showSearchDialog(BuildContext context) async {
    final TextEditingController searchController = TextEditingController();

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Buscar Cidade'),
        content: TextField(
          controller: searchController,
          decoration: const InputDecoration(
            hintText: 'Digite o nome da cidade...',
            prefixIcon: Icon(Icons.location_city),
          ),
          autofocus: true,
          textInputAction: TextInputAction.search,
          onSubmitted: (value) {
            Navigator.pop(context);
            _searchLocation(value);
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('CANCELAR'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _searchLocation(searchController.text);
            },
            child: const Text('BUSCAR'),
          ),
        ],
      ),
    );
  }

  Future<void> _searchLocation(String query) async {
    if (query.isEmpty) return;

    setState(() {
      _location = 'BUSCANDO...';
    });

    try {
      List<Location> locations = await locationFromAddress(query);
      if (locations.isNotEmpty) {
        // Get the first result coordinates
        final loc = locations.first;

        // Reverse geocode to get formatted address
        List<Placemark> placemarks = await placemarkFromCoordinates(
          loc.latitude,
          loc.longitude,
        );

        if (placemarks.isNotEmpty) {
          final place = placemarks.first;
          final city = place.subAdministrativeArea ?? place.locality ?? query;
          final state = place.administrativeArea ?? '';

          if (mounted) {
            setState(() {
              _location = '$city, $state'.toUpperCase();
              _latitude = loc.latitude;
              _longitude = loc.longitude;
            });
          }
        }
      } else {
        if (mounted) {
          setState(() {
            _location = 'NÃO ENCONTRADO';
          });
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _location = 'ERRO NA BUSCA';
        });
        debugPrint('Search error: $e');
      }
    }
  }

  Future<void> _refresh() async {
    // Refresh location (real fetch)
    await _initLocation();
    if (_latitude != null && _longitude != null) {
      return ref.refresh(
        weatherForecastProvider(_latitude!, _longitude!).future,
      );
    }
  }

  void _showFarmManagementModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return FarmManagementModal(
          currentLocation: _location,
          savedFarms: _savedFarms,
          onLocationSelected: (location) {
            setState(() {
              _location = location;
            });
          },
          onFarmsUpdated: (farms) {
            setState(() {
              _savedFarms = farms;
            });
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_latitude == null || _longitude == null) {
      // Check if location is error
      if (_location.contains('ERRO') ||
          _location.contains('NEGADA') ||
          _location.contains('DESATIVADO')) {
        return Scaffold(
          appBar: AppBar(title: const Text('Clima e Tempo')),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.location_off, size: 48, color: Colors.grey),
                const SizedBox(height: 16),
                Text(_location),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _initLocation,
                  child: const Text('Tentar Novamente'),
                ),
              ],
            ),
          ),
        );
      }
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final weatherAsync = ref.watch(
      weatherForecastProvider(_latitude!, _longitude!),
    );

    return weatherAsync.when(
      loading: () =>
          const Scaffold(body: Center(child: CircularProgressIndicator())),
      error: (err, stack) => Scaffold(
        appBar: AppBar(title: const Text('Clima e Tempo')),
        body: Center(child: Text('Erro ao carregar clima: $err')),
      ),
      data: (currentForecast) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Clima e Tempo'),
            actions: [
              IconButton(
                icon: const Icon(Icons.search),
                onPressed: () => _showSearchDialog(context),
              ),
              IconButton(
                icon: const Icon(Icons.notifications_active_outlined),
                onPressed: () => _showNotificationSettings(context),
              ),
            ],
          ),
          body: DefaultTabController(
            length: 3,
            child: RefreshIndicator(
              onRefresh: _refresh,
              child: NestedScrollView(
                headerSliverBuilder: (context, innerBoxIsScrolled) {
                  return [
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.all(AppSpacing.xl),
                        child: Column(
                          children: [
                            // High Priority Alert Banner
                            HighPriorityAlertBanner(
                              alerts: currentForecast.alerts,
                            ),

                            // Current Conditions Card
                            CurrentConditionsCard(
                              forecast: currentForecast,
                              location: _location,
                              onLocationTap: () =>
                                  _showFarmManagementModal(context),
                            ),

                            // Alerts
                            if (currentForecast.alerts.isNotEmpty) ...[
                              const SizedBox(height: 24),
                              WeatherAlertsWidget(
                                alerts: currentForecast.alerts,
                              ),
                            ],
                          ],
                        ),
                      ),
                    ),
                    SliverPersistentHeader(
                      delegate: _SliverAppBarDelegate(
                        TabBar(
                          labelColor: AppColors.primary,
                          unselectedLabelColor: Colors.grey,
                          indicatorColor: AppColors.primary,
                          tabs: const [
                            Tab(text: '24 Horas'),
                            Tab(text: '7 Dias'),
                            Tab(text: 'Radar'),
                          ],
                        ),
                      ),
                      pinned: true,
                    ),
                  ];
                },
                body: TabBarView(
                  children: [
                    // Hourly Tab
                    SingleChildScrollView(
                      padding: const EdgeInsets.all(AppSpacing.lg),
                      child: Column(
                        children: [
                          HourlyForecastWidget(
                            forecast: currentForecast.hourly,
                          ),
                          const SizedBox(height: 24),
                          HourlyForecastChart(forecast: currentForecast.hourly),
                        ],
                      ),
                    ),
                    // Daily Tab
                    SingleChildScrollView(
                      padding: const EdgeInsets.all(AppSpacing.lg),
                      child: ForecastList(forecast: currentForecast.daily),
                    ),
                    // Radar Tab
                    const WeatherRadarWidget(),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  void _showNotificationSettings(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => const NotificationSettingsModal(),
    );
  }
}

class _SliverAppBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar _tabBar;

  _SliverAppBarDelegate(this._tabBar);

  @override
  double get minExtent => _tabBar.preferredSize.height + 1;

  @override
  double get maxExtent => _tabBar.preferredSize.height + 1;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return Container(
      color: Colors.grey[50], // Match background color to scaffold
      child: Column(
        children: [
          _tabBar,
          const Divider(height: 1, color: Colors.grey),
        ],
      ),
    );
  }

  @override
  bool shouldRebuild(_SliverAppBarDelegate oldDelegate) {
    return false;
  }
}
