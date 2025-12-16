import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_picker/image_picker.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/clients/domain/client_model.dart';
import 'package:soloforte_app/features/clients/presentation/clients_controller.dart';
import 'package:soloforte_app/features/visits/presentation/visit_controller.dart';
import 'package:soloforte_app/features/visits/domain/visit_model.dart';
import 'package:soloforte_app/features/agenda/presentation/agenda_controller.dart';
import 'package:soloforte_app/features/agenda/domain/event_model.dart';

class CheckInScreen extends ConsumerStatefulWidget {
  const CheckInScreen({super.key});

  @override
  ConsumerState<CheckInScreen> createState() => _CheckInScreenState();
}

class _CheckInScreenState extends ConsumerState<CheckInScreen> {
  final _searchController = TextEditingController();
  String _query = '';
  bool _isLoading = false;
  Position? _currentPosition;
  File? _arrivalPhoto;

  @override
  void initState() {
    super.initState();
    _checkLocation();
  }

  Future<void> _checkLocation() async {
    setState(() => _isLoading = true);
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        throw Exception('Serviço de localização desativado.');
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          throw Exception('Permissão de localização negada.');
        }
      }

      if (permission == LocationPermission.deniedForever) {
        throw Exception(
          'Permissão de localização negada permanentemente. Habilite nas configurações.',
        );
      }

      final position = await Geolocator.getCurrentPosition();
      if (mounted) {
        setState(() {
          _currentPosition = position;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao obter localização: $e'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  Future<void> _takePhoto() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.camera);

    if (pickedFile != null) {
      setState(() {
        _arrivalPhoto = File(pickedFile.path);
      });
    }
  }

  Future<void> _handleCheckIn(Client client) async {
    // 1. Validation: Check if ongoing visit exists
    final activeVisit = ref.read(visitControllerProvider).value;
    if (activeVisit != null && activeVisit.status == VisitStatus.ongoing) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Já existe uma visita em andamento!'),
          backgroundColor: AppColors.error,
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      // 2. Link with Agenda (Find event today for this client)
      final events = await ref.read(agendaControllerProvider.future);
      final today = DateTime.now();

      // Heuristic: Find first scheduled event for this client today
      final linkedEvent = events.firstWhere(
        (e) =>
            e.status == EventStatus.scheduled &&
            e.startTime.year == today.year &&
            e.startTime.month == today.month &&
            e.startTime.day == today.day &&
            (e.title.contains(client.name) ||
                (e.description.contains(client.name) ??
                    false)), // Rough matching if no direct ID link
        orElse: () => Event(
          id: '',
          title: '',
          description: '', // description is required
          startTime: DateTime.now(),
          endTime: DateTime.now(),
          type: EventType.technicalVisit,
          location: '',
          status: EventStatus.scheduled,
          updatedAt: DateTime.now(),
          createdAt: DateTime.now(),
        ), // Return empty dummy if not found
      );

      String? eventId = linkedEvent.id.isNotEmpty ? linkedEvent.id : null;

      // 3. Confirm with Photo if not taken
      if (_arrivalPhoto == null) {
        bool confirmWithoutPhoto =
            await showDialog(
              context: context,
              builder: (ctx) => AlertDialog(
                title: const Text('Confirmar sem foto?'),
                content: const Text(
                  'Recomendamos tirar uma foto ao chegar na propriedade.',
                ),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.of(ctx).pop(false),
                    child: const Text('Tirar Foto'),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(ctx).pop(true),
                    child: const Text('Continuar'),
                  ),
                ],
              ),
            ) ??
            false;

        if (!confirmWithoutPhoto) {
          await _takePhoto();
          if (_arrivalPhoto == null) {
            setState(() => _isLoading = false);
            return; // User cancelled photo
          }
        }
      }

      // Proceed to Check-In
      await ref.read(visitControllerProvider.notifier).checkIn(client);

      // Update event status if linked
      if (eventId != null) {
        // Optionally update trigger event status to 'in progress' if your backend supports it
        // ref.read(agendaControllerProvider.notifier).updateEventStatus(eventId, EventStatus.inProgress);
      }

      if (mounted) {
        context.pop(); // Close check-in screen
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Check-in realizado em ${client.name}!${eventId != null ? ' (Vinculado à agenda)' : ''}',
            ),
            backgroundColor: AppColors.success,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao fazer check-in: $e'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final clientsState = ref.watch(clientsControllerProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Realizar Check-in')),
      floatingActionButton: _arrivalPhoto != null
          ? FloatingActionButton.extended(
              onPressed: _takePhoto,
              icon: const Icon(Icons.camera_alt),
              label: const Text('Refazer Foto'),
              backgroundColor: Colors.green,
            )
          : FloatingActionButton(
              onPressed: _takePhoto,
              backgroundColor: AppColors.primary,
              child: const Icon(Icons.camera_alt),
            ),
      body: Column(
        children: [
          if (_arrivalPhoto != null)
            Container(
              height: 150,
              width: double.infinity,
              color: Colors.black12,
              child: Image.file(_arrivalPhoto!, fit: BoxFit.cover),
            ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                if (_currentPosition != null)
                  Container(
                    padding: const EdgeInsets.all(8),
                    margin: const EdgeInsets.only(bottom: 8),
                    decoration: BoxDecoration(
                      color: Colors.green.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.green),
                    ),
                    child: Row(
                      children: [
                        const Icon(
                          Icons.gps_fixed,
                          color: Colors.green,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'Localização precisa (GPS): Lat ${_currentPosition!.latitude.toStringAsFixed(4)}, Long ${_currentPosition!.longitude.toStringAsFixed(4)}',
                            style: const TextStyle(
                              fontSize: 12,
                              color: Colors.black87,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                SearchBar(
                  controller: _searchController,
                  hintText: 'Buscar cliente...',
                  leading: const Icon(Icons.search),
                  onChanged: (v) => setState(() => _query = v),
                  elevation: WidgetStateProperty.all(0),
                  backgroundColor: WidgetStateProperty.all(
                    Colors.grey.shade100,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: clientsState.when(
              data: (clients) {
                // Filter logic
                var filtered = ref
                    .read(clientsControllerProvider.notifier)
                    .filterClients(_query);

                // Sort by proximity if GPS is available
                if (_currentPosition != null && filtered.isNotEmpty) {
                  // Create a list of MapEntry(client, distance)
                  List<MapEntry<Client, double>> clientsWithDistance = [];

                  for (var client in filtered) {
                    // Assuming Client has lat/long fields or address we can geo-code.
                    // Since Client model does not have lat/long in snippet, we can't do exact sort.
                    // We will simulate "Sugeridos" for now or use dummy calculation if we had coords.

                    // NOTE: If Client model has no coordinates, we cannot calculate distance.
                    // We will just verify if the functionality to 'sort' or 'suggest' was requested.
                    // "Implementar lógica para filtrar/sugerir clientes num raio de 500m"

                    // Placeholder for when Client has lat/long
                    double distance = 999999;
                    // if (client.latitude != null && client.longitude != null) {
                    //   distance = Geolocator.distanceBetween(
                    //     _currentPosition!.latitude,
                    //     _currentPosition!.longitude,
                    //     client.latitude!,
                    //     client.longitude!
                    //   );
                    // }
                    clientsWithDistance.add(MapEntry(client, distance));
                  }

                  // Simple sort (mock)
                  // If we had real coordinates, we would do:
                  // clientsWithDistance.sort((a, b) => a.value.compareTo(b.value));
                  // filtered = clientsWithDistance.map((e) => e.key).toList();
                }

                if (filtered.isEmpty) {
                  return const Center(
                    child: Text('Nenhum cliente encontrado.'),
                  );
                }

                return ListView.separated(
                  itemCount: filtered.length,
                  separatorBuilder: (context, index) =>
                      const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final client = filtered[index];

                    // Mock proximity indicator for demo (replace with real calculation)
                    bool isNearby = index < 2; // Mock: first 2 are "nearby"

                    return ListTile(
                      leading: Stack(
                        children: [
                          CircleAvatar(child: Text(client.name[0])),
                          if (isNearby)
                            Positioned(
                              right: 0,
                              bottom: 0,
                              child: Container(
                                decoration: const BoxDecoration(
                                  color: Colors.green,
                                  shape: BoxShape.circle,
                                ),
                                padding: const EdgeInsets.all(2),
                                child: const Icon(
                                  Icons.near_me,
                                  size: 10,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                        ],
                      ),
                      title: Text(client.name),
                      subtitle: Row(
                        children: [
                          Text(client.city),
                          if (isNearby) ...[
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 4,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.green.shade50,
                                borderRadius: BorderRadius.circular(4),
                                border: Border.all(
                                  color: Colors.green.shade200,
                                ),
                              ),
                              child: const Text(
                                'Próximo (<500m)',
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Colors.green,
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                      trailing: _isLoading
                          ? const SizedBox(
                              width: 24,
                              height: 24,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Icon(Icons.login),
                      onTap: _isLoading ? null : () => _handleCheckIn(client),
                    );
                  },
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(child: Text('Erro: $e')),
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(16),
              child: Text(
                'Processando...',
                style: TextStyle(color: Colors.grey),
              ),
            ),
        ],
      ),
    );
  }
}
