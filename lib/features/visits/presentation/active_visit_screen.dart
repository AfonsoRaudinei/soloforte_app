import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';

import 'package:soloforte_app/features/visits/presentation/visit_controller.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/active_visit_header.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/visit_action_card.dart';
import 'package:workmanager/workmanager.dart';

class ActiveVisitScreen extends ConsumerStatefulWidget {
  const ActiveVisitScreen({super.key});

  @override
  ConsumerState<ActiveVisitScreen> createState() => _ActiveVisitScreenState();
}

class _ActiveVisitScreenState extends ConsumerState<ActiveVisitScreen> {
  Timer? _timer;
  Duration _elapsed = Duration.zero;

  @override
  void initState() {
    super.initState();
    _startTimer();
    _initBackgroundLocation();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      final visit = ref.read(visitControllerProvider).value;
      if (visit != null) {
        setState(() {
          _elapsed = DateTime.now().difference(visit.checkInTime);
        });
      }
    });
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, "0");
    String twoDigitMinutes = twoDigits(duration.inMinutes.remainder(60));
    String twoDigitSeconds = twoDigits(duration.inSeconds.remainder(60));
    return "${twoDigits(duration.inHours)}:$twoDigitMinutes:$twoDigitSeconds";
  }

  Future<void> _initBackgroundLocation() async {
    // Basic setup for Workmanager to simulate background tracking
    // In a real app this would store coordinates to a local DB periodically
    try {
      await Workmanager().registerPeriodicTask(
        "location_tracking",
        "locationTrackingTask",
        frequency: const Duration(minutes: 15),
      );
    } catch (e) {
      debugPrint("Workmanager error (normal if on web or simulator): $e");
    }
  }

  Future<void> _takePhoto() async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(source: ImageSource.camera);

    if (picked != null) {
      await ref.read(visitControllerProvider.notifier).addPhoto(picked.path);

      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Foto salva na visita!')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final visitState = ref.watch(visitControllerProvider);

    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text(
          'Visita em Andamento',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () =>
              context.pop(), // Just minimizes/closes screen, doesn't end visit
        ),
      ),
      body: visitState.when(
        data: (visit) {
          if (visit == null) {
            return const Center(
              child: Text("Nenhuma visita ativa no momento."),
            );
          }
          return Column(
            children: [
              // Header Status Card
              ActiveVisitHeader(
                clientName: visit.client.name,
                clientCity: visit.client.city,
                durationText: _formatDuration(_elapsed),
              ),

              // Quick Actions Grid
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: GridView.count(
                    crossAxisCount: 2,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                    childAspectRatio: 1.3,
                    children: [
                      VisitActionCard(
                        icon: Icons.add_circle_outline,
                        color: Colors.orange,
                        label: 'Nova Ocorrência',
                        onTap: () {
                          // Link to new occurrence
                          context.push('/occurrences/new');
                        },
                      ),
                      VisitActionCard(
                        icon: Icons.camera_alt_outlined,
                        color: Colors.blue,
                        label: 'Tirar Foto',
                        onTap: _takePhoto,
                      ),
                      VisitActionCard(
                        icon: Icons.wb_sunny_outlined,
                        color: Colors.amber,
                        label: 'Ver Clima',
                        onTap: () => context.push('/dashboard/weather'),
                      ),
                      VisitActionCard(
                        icon: Icons.note_add_outlined,
                        color: Colors.purple,
                        label: 'Anotação',
                        onTap: () {
                          // Simple dialog for quick note
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text('Nova Anotação'),
                              content: const TextField(
                                decoration: InputDecoration(
                                  hintText: 'Digite aqui...',
                                ),
                                maxLines: 3,
                              ),
                              actions: [
                                TextButton(
                                  onPressed: () => context.pop(),
                                  child: const Text('Cancelar'),
                                ),
                                TextButton(
                                  onPressed: () => context.pop(),
                                  child: const Text('Salvar'),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),

              // Sticky Checkout Button
              SafeArea(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        context.push('/visit/checkout');
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.redAccent,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 4,
                      ),
                      icon: const Icon(Icons.exit_to_app, color: Colors.white),
                      label: const Text(
                        'CHECK-OUT',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.1,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, st) => Center(child: Text('Erro: $e')),
      ),
    );
  }
}
