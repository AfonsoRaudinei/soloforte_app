import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/team/presentation/hr_controller.dart';
import 'package:soloforte_app/features/team/domain/hr_models.dart';
import 'dart:async';

class TimeClockScreen extends ConsumerStatefulWidget {
  const TimeClockScreen({super.key});

  @override
  ConsumerState<TimeClockScreen> createState() => _TimeClockScreenState();
}

class _TimeClockScreenState extends ConsumerState<TimeClockScreen> {
  late Timer _timer;
  DateTime _now = DateTime.now();

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (mounted) setState(() => _now = DateTime.now());
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final hrState = ref.watch(hrControllerProvider);
    final controller = ref.read(hrControllerProvider.notifier);

    // Determine current status (Open entry without end time?)
    final activeEntry = hrState.todayEntries.firstWhere(
      (e) => e.endTime == null,
      orElse: () => TimeEntry(
        id: '',
        memberId: '',
        startTime: DateTime.fromMicrosecondsSinceEpoch(0),
      ), // Dummy
    );
    final isClockedIn =
        activeEntry.id.isNotEmpty &&
        activeEntry.startTime != DateTime.fromMicrosecondsSinceEpoch(0);

    return Scaffold(
      appBar: AppBar(title: const Text('Ponto Eletrônico')),
      body: hrState.isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  // Digital Clock
                  Text(
                    DateFormat('HH:mm:ss').format(_now),
                    style: const TextStyle(
                      fontSize: 64,
                      fontWeight: FontWeight.bold,
                      color: Colors.blueGrey,
                    ),
                  ),
                  Text(
                    DateFormat(
                      'EEEE, d MMMM y',
                      'pt_BR',
                    ).format(_now).toUpperCase(),
                    style: AppTypography.bodyLarge.copyWith(color: Colors.grey),
                  ),
                  const SizedBox(height: 48),

                  // Action Button
                  GestureDetector(
                    onLongPress: () {
                      // Prevent accidental taps?
                    },
                    onTap: () {
                      if (isClockedIn) {
                        controller.clockOut(activeEntry.id);
                      } else {
                        controller.clockIn('Sede (GPS)');
                      }
                    },
                    child: Container(
                      height: 200,
                      width: 200,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: isClockedIn ? Colors.redAccent : Colors.green,
                        boxShadow: [
                          BoxShadow(
                            color: (isClockedIn ? Colors.red : Colors.green)
                                .withOpacity(0.4),
                            blurRadius: 20,
                            offset: const Offset(0, 10),
                          ),
                        ],
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            isClockedIn ? Icons.stop : Icons.play_arrow,
                            size: 64,
                            color: Colors.white,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            isClockedIn ? 'ENCERRAR' : 'INICIAR',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          if (isClockedIn)
                            Text(
                              'Turno em andamento...',
                              style: const TextStyle(
                                color: Colors.white70,
                                fontSize: 12,
                              ),
                            ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 48),
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      "Histórico de Hoje",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                  const Divider(),
                  Expanded(
                    child: ListView.builder(
                      itemCount: hrState.todayEntries.length,
                      itemBuilder: (context, index) {
                        final entry = hrState.todayEntries[index];
                        return ListTile(
                          leading: const Icon(Icons.access_time),
                          title: Text(
                            entry.type == TimeEntryType.regular
                                ? 'Jornada Regular'
                                : 'Hora Extra',
                          ),
                          subtitle: Text(entry.location ?? 'Sem local'),
                          trailing: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                'Início: ${DateFormat('HH:mm').format(entry.startTime)}',
                                style: const TextStyle(color: Colors.green),
                              ),
                              if (entry.endTime != null)
                                Text(
                                  'Fim: ${DateFormat('HH:mm').format(entry.endTime!)}',
                                  style: const TextStyle(color: Colors.red),
                                ),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
