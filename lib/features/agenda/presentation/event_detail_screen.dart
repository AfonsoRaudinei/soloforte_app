import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/agenda/domain/event_model.dart';
import 'package:soloforte_app/features/agenda/presentation/extensions/event_type_extension.dart';
import 'package:soloforte_app/shared/widgets/primary_button.dart';
import 'package:soloforte_app/shared/widgets/app_card.dart';

class EventDetailScreen extends StatefulWidget {
  final Event event;

  const EventDetailScreen({super.key, required this.event});

  @override
  State<EventDetailScreen> createState() => _EventDetailScreenState();
}

class _EventDetailScreenState extends State<EventDetailScreen> {
  late Event _event;

  @override
  void initState() {
    super.initState();
    _event = widget.event;
  }

  @override
  Widget build(BuildContext context) {
    final typeColor = _event.type.color;
    final duration = _event.endTime.difference(_event.startTime);

    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text('Detalhes do Evento'),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Editar evento (Em breve)')),
              );
            },
          ),
          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header Card
            AppCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: typeColor.withOpacity(0.1),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          _event.type.icon,
                          color: typeColor,
                          size: 32,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(_event.title, style: AppTypography.h3),
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: typeColor.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                _event.type.label.toUpperCase(),
                                style: AppTypography.caption.copyWith(
                                  color: typeColor,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const Divider(height: 32),
                  _buildInfoRow(
                    Icons.access_time,
                    'Horário',
                    '${DateFormat('HH:mm').format(_event.startTime)} - ${DateFormat('HH:mm').format(_event.endTime)} (${duration.inHours}h ${duration.inMinutes % 60}min)',
                  ),
                  const SizedBox(height: 16),
                  _buildInfoRow(
                    Icons.calendar_today,
                    'Data',
                    DateFormat(
                      "d 'de' MMMM 'de' y",
                      'pt_BR',
                    ).format(_event.startTime),
                  ),
                  const SizedBox(height: 16),
                  _buildInfoRow(
                    Icons.location_on,
                    'Localização',
                    _event.location,
                    action: TextButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Abrindo Rota...')),
                        );
                      },
                      child: const Text('Ver no Mapa'),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Description
            if (_event.description.isNotEmpty) ...[
              Text('Descrição', style: AppTypography.h4),
              const SizedBox(height: 8),
              AppCard(
                child: Text(
                  _event.description,
                  style: AppTypography.bodyMedium,
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Checklist (Mock for now, can be updated to use real ChecklistItem from model)
            Text('Checklist de Atividades', style: AppTypography.h4),
            const SizedBox(height: 8),
            AppCard(
              child: Column(
                children: [
                  _buildChecklistItem('Verificar condições climáticas', true),
                  const Divider(),
                  _buildChecklistItem('Inspecionar equipamentos', false),
                  const Divider(),
                  _buildChecklistItem('Coletar amostras', false),
                  const Divider(),
                  _buildChecklistItem('Preencher relatório de visita', false),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Weather (Mock)
            Text('Previsão do Tempo', style: AppTypography.h4),
            const SizedBox(height: 8),
            AppCard(
              child: Row(
                children: [
                  const Icon(Icons.wb_sunny, size: 48, color: Colors.orange),
                  const SizedBox(width: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Ensolarado', style: AppTypography.h4),
                      Text(
                        '28°C - Vento N 12km/h',
                        style: AppTypography.bodySmall,
                      ),
                    ],
                  ),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.green.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      'Favorável',
                      style: AppTypography.caption.copyWith(
                        color: Colors.green,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 100), // Space for bottom sheet/buttons
          ],
        ),
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: SafeArea(
          child: Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    side: BorderSide(color: Colors.red.shade300),
                    foregroundColor: Colors.red,
                  ),
                  child: const Text('Cancelar'),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                flex: 2,
                child: PrimaryButton(
                  text: 'Iniciar Visita (Check-in)',
                  icon: Icons.play_arrow,
                  onPressed: () {
                    context.push('/check-in');
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow(
    IconData icon,
    String label,
    String value, {
    Widget? action,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, size: 20, color: Colors.grey[600]),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: AppTypography.caption),
              Text(
                value,
                style: AppTypography.bodyMedium.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
        if (action != null) action,
      ],
    );
  }

  Widget _buildChecklistItem(String title, bool isCompleted) {
    return Row(
      children: [
        Checkbox(
          value: isCompleted,
          onChanged: (val) {},
          activeColor: AppColors.primary,
        ),
        Text(
          title,
          style: AppTypography.bodyMedium.copyWith(
            decoration: isCompleted ? TextDecoration.lineThrough : null,
            color: isCompleted ? Colors.grey : AppColors.textPrimary,
          ),
        ),
      ],
    );
  }
}
