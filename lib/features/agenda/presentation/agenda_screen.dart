import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:flutter_slidable/flutter_slidable.dart';

import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/agenda/domain/event_model.dart';
import 'package:soloforte_app/features/agenda/presentation/agenda_controller.dart';

import 'package:soloforte_app/features/agenda/presentation/widgets/daily_timeline.dart';
import 'package:soloforte_app/features/agenda/presentation/widgets/event_card.dart';
import 'package:soloforte_app/features/agenda/presentation/extensions/event_type_extension.dart';

class AgendaScreen extends ConsumerStatefulWidget {
  const AgendaScreen({super.key});

  @override
  ConsumerState<AgendaScreen> createState() => _AgendaScreenState();
}

class _AgendaScreenState extends ConsumerState<AgendaScreen> {
  DateTime _selectedDay = DateTime.now();
  CalendarFormat _calendarFormat = CalendarFormat.month;
  bool _isTimelineView = false;
  // Note: Local _events state is replaced by Riverpod Provider

  Widget _buildViewToggleButton({
    required IconData icon,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ]
              : null,
        ),
        child: Icon(
          icon,
          size: 20,
          color: isSelected ? AppColors.primary : Colors.grey,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final eventsState = ref.watch(agendaControllerProvider);

    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text('Agenda'),
        actions: [
          IconButton(
            icon: const Icon(Icons.today),
            onPressed: () {
              setState(() {
                _selectedDay = DateTime.now();
              });
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.push('/dashboard/calendar/new', extra: _selectedDay);
          // Provider automatically updates UI when event is added
        },
        backgroundColor: AppColors.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: eventsState.when(
        data: (allEvents) {
          final dailyEvents = allEvents
              .where((e) => isSameDay(e.startTime, _selectedDay))
              .toList();
          // Sort by start time
          dailyEvents.sort((a, b) => a.startTime.compareTo(b.startTime));

          return Column(
            children: [
              // Month Calendar
              TableCalendar<Event>(
                firstDay: DateTime.now().subtract(const Duration(days: 365)),
                lastDay: DateTime.now().add(const Duration(days: 365)),
                focusedDay: _selectedDay,
                currentDay: DateTime.now(),
                calendarFormat: _calendarFormat,
                selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
                onDaySelected: (selectedDay, focusedDay) {
                  setState(() {
                    _selectedDay = selectedDay;
                  });
                },
                onFormatChanged: (format) {
                  if (_calendarFormat != format) {
                    setState(() {
                      _calendarFormat = format;
                    });
                  }
                },
                eventLoader: (day) {
                  return allEvents
                      .where((e) => isSameDay(e.startTime, day))
                      .toList();
                },

                // Styles & Builders
                headerStyle: HeaderStyle(
                  formatButtonVisible: true,
                  titleCentered: true,
                  formatButtonShowsNext: false,
                  formatButtonDecoration: BoxDecoration(
                    border: Border.all(color: AppColors.primary),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  formatButtonTextStyle: AppTypography.caption.copyWith(
                    color: AppColors.primary,
                    fontWeight: FontWeight.bold,
                  ),
                  titleTextStyle: AppTypography.h3,
                ),
                calendarStyle: CalendarStyle(
                  selectedDecoration: const BoxDecoration(
                    color: AppColors.primary,
                    shape: BoxShape.circle,
                  ),
                  todayDecoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.3),
                    shape: BoxShape.circle,
                  ),
                  markersMaxCount: 4,
                ),

                // Custom Marker Builder for Colored Dots
                calendarBuilders: CalendarBuilders(
                  markerBuilder: (context, day, events) {
                    if (events.isEmpty) return null;

                    return Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: events.take(4).map((event) {
                        return Container(
                          width: 6,
                          height: 6,
                          margin: const EdgeInsets.symmetric(horizontal: 1.0),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: event.type.color,
                          ),
                        );
                      }).toList(),
                    );
                  },
                ),
              ),

              const Divider(height: 1),

              // Events List Header & View Toggle
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            DateFormat(
                              "d 'de' MMMM",
                              'pt_BR',
                            ).format(_selectedDay),
                            style: AppTypography.h3,
                          ),
                          Text(
                            DateFormat("EEEE", 'pt_BR')
                                .format(_selectedDay)
                                .replaceFirst(
                                  DateFormat(
                                    "EEEE",
                                    'pt_BR',
                                  ).format(_selectedDay)[0],
                                  DateFormat(
                                    "EEEE",
                                    'pt_BR',
                                  ).format(_selectedDay)[0].toUpperCase(),
                                ),
                            style: AppTypography.bodyMedium.copyWith(
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.grey[200],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          _buildViewToggleButton(
                            icon: Icons.list,
                            isSelected: !_isTimelineView,
                            onTap: () =>
                                setState(() => _isTimelineView = false),
                          ),
                          _buildViewToggleButton(
                            icon: Icons.schedule,
                            isSelected: _isTimelineView,
                            onTap: () => setState(() => _isTimelineView = true),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // Events Content
              Expanded(
                child: dailyEvents.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.event_note,
                              size: 64,
                              color: Colors.grey[300],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'Nenhum evento agendado',
                              style: AppTypography.bodyLarge.copyWith(
                                color: Colors.grey,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Toque no + para adicionar',
                              style: AppTypography.caption,
                            ),
                          ],
                        ),
                      )
                    : _isTimelineView
                    ? DailyTimeline(
                        events: dailyEvents,
                        date: _selectedDay,
                        onEventTap: (event) {
                          context.go(
                            '/dashboard/calendar/detail',
                            extra: event,
                          );
                        },
                        onEventRescheduled: (event, newStartTime) {
                          final duration = event.endTime.difference(
                            event.startTime,
                          );
                          final newEndTime = newStartTime.add(duration);

                          final updatedEvent = event.copyWith(
                            startTime: newStartTime,
                            endTime: newEndTime,
                            status: EventStatus.rescheduled,
                          );

                          ref
                              .read(agendaControllerProvider.notifier)
                              .updateEvent(updatedEvent);

                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Evento reagendado com sucesso!'),
                            ),
                          );
                        },
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        itemCount: dailyEvents.length,
                        itemBuilder: (context, index) {
                          final event = dailyEvents[index];
                          return Slidable(
                            key: ValueKey(event.id),
                            startActionPane: ActionPane(
                              motion: const ScrollMotion(),
                              children: [
                                SlidableAction(
                                  onPressed: (context) {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text(
                                          'Adiar/Reagendar: ${event.title}',
                                        ),
                                      ),
                                    );
                                  },
                                  backgroundColor: Colors.orange,
                                  foregroundColor: Colors.white,
                                  icon: Icons.access_time,
                                  label: 'Adiar',
                                  borderRadius: const BorderRadius.horizontal(
                                    left: Radius.circular(12),
                                  ),
                                ),
                              ],
                            ),
                            endActionPane: ActionPane(
                              motion: const ScrollMotion(),
                              children: [
                                SlidableAction(
                                  onPressed: (context) {
                                    ref
                                        .read(agendaControllerProvider.notifier)
                                        .deleteEvent(event.id);
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text(
                                          'Cancelado: ${event.title}',
                                        ),
                                      ),
                                    );
                                  },
                                  backgroundColor: Colors.red,
                                  foregroundColor: Colors.white,
                                  icon: Icons.cancel,
                                  label: 'Cancelar',
                                  borderRadius: const BorderRadius.horizontal(
                                    right: Radius.circular(12),
                                  ),
                                ),
                              ],
                            ),
                            child: EventCard(
                              event: event,
                              onTap: () => context.go(
                                '/dashboard/calendar/detail',
                                extra: event,
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(child: Text('Erro: $error')),
      ),
    );
  }
}
