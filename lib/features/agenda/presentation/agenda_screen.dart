import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/agenda/domain/event_model.dart';
import 'package:soloforte_app/shared/widgets/app_card.dart';
import 'package:intl/intl.dart';

class AgendaScreen extends StatefulWidget {
  const AgendaScreen({super.key});

  @override
  State<AgendaScreen> createState() => _AgendaScreenState();
}

class _AgendaScreenState extends State<AgendaScreen> {
  DateTime _selectedDay = DateTime.now();

  // Mock Data
  final List<Event> _events = [
    Event(
      id: '1',
      title: 'Visita Técnica - Fazenda Santa Rita',
      description: 'Análise de solo e recomendação de adubação.',
      startTime: DateTime.now().add(const Duration(hours: 2)),
      endTime: DateTime.now().add(const Duration(hours: 4)),
      type: 'visit',
      location: 'Fazenda Santa Rita',
      status: 'scheduled',
      participants: ['João Silva', 'Maria Souza'],
    ),
    Event(
      id: '2',
      title: 'Aplicação de Defensivos',
      description: 'Supervisão de aplicação no Talhão 05.',
      startTime: DateTime.now().add(const Duration(days: 1, hours: 9)),
      endTime: DateTime.now().add(const Duration(days: 1, hours: 12)),
      type: 'application',
      location: 'Talhão 05',
      status: 'scheduled',
    ),
    Event(
      id: '3',
      title: 'Reunião Semanal',
      description: 'Alignamento da equipe.',
      startTime: DateTime.now().subtract(const Duration(hours: 3)),
      endTime: DateTime.now().subtract(const Duration(hours: 1)),
      type: 'meeting',
      location: 'Escritório Central',
      status: 'completed',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    // Filter events for selected day (ignoring time for simplicity in this mock filter)
    final dailyEvents = _events
        .where((e) => isSameDay(e.startTime, _selectedDay))
        .toList();

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
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(const SnackBar(content: Text('Novo Evento (Mock)')));
        },
        backgroundColor: AppColors.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: Column(
        children: [
          // Weekly Calendar Strip (Mock)
          Container(
            height: 100,
            color: Colors.white,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: 14, // 2 weeks
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              itemBuilder: (context, index) {
                final date = DateTime.now()
                    .subtract(const Duration(days: 3))
                    .add(Duration(days: index));
                final isSelected = isSameDay(date, _selectedDay);
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      _selectedDay = date;
                    });
                  },
                  child: Container(
                    width: 60,
                    margin: const EdgeInsets.only(right: 12),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppColors.primary
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                      border: isSelected
                          ? null
                          : Border.all(color: Colors.grey.shade300),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          DateFormat(
                            'E',
                            'pt_BR',
                          ).format(date).toUpperCase(), // Weekday
                          style: AppTypography.caption.copyWith(
                            color: isSelected ? Colors.white : Colors.grey,
                            fontWeight: AppTypography.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          date.day.toString(),
                          style: AppTypography.h2.copyWith(
                            color: isSelected
                                ? Colors.white
                                : AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          const Divider(height: 1),

          // Events List
          Expanded(
            child: dailyEvents.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.event_busy,
                          size: 64,
                          color: Colors.grey[300],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Nenhum evento para este dia.',
                          style: AppTypography.bodyLarge.copyWith(
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: dailyEvents.length,
                    itemBuilder: (context, index) {
                      return _EventCard(event: dailyEvents[index]);
                    },
                  ),
          ),
        ],
      ),
    );
  }

  bool isSameDay(DateTime a, DateTime b) {
    return a.year == b.year && a.month == b.month && a.day == b.day;
  }
}

class _EventCard extends StatelessWidget {
  final Event event;

  const _EventCard({required this.event});

  Color _getTypeColor(String type) {
    switch (type) {
      case 'visit':
        return AppColors.primary;
      case 'application':
        return AppColors.alert; // Warning/Alert color for caution
      case 'harvest':
        return AppColors.secondary;
      case 'meeting':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Time Column
          SizedBox(
            width: 60,
            child: Column(
              children: [
                Text(
                  DateFormat('HH:mm').format(event.startTime),
                  style: AppTypography.bodyMedium.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  DateFormat('HH:mm').format(event.endTime),
                  style: AppTypography.caption,
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),

          // Card
          Expanded(
            child: AppCard(
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Detalhes do Evento (Mock)')),
                );
              },
              child: IntrinsicHeight(
                child: Row(
                  children: [
                    Container(
                      width: 4,
                      decoration: BoxDecoration(
                        color: _getTypeColor(event.type),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            event.title,
                            style: AppTypography.h4.copyWith(fontSize: 16),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            event.description,
                            style: AppTypography.bodySmall,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Icon(
                                Icons.location_on,
                                size: 14,
                                color: Colors.grey[600],
                              ),
                              const SizedBox(width: 4),
                              Expanded(
                                child: Text(
                                  event.location,
                                  style: AppTypography.caption,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
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
