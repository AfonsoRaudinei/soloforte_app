import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/marketing/services/scheduling_service.dart';

class SchedulingSection extends StatelessWidget {
  final bool isScheduled;
  final DateTime scheduledDate;
  final TimeOfDay scheduledTime;
  final Function(bool) onScheduledChanged;
  final Function(DateTime) onDateChanged;
  final Function(TimeOfDay) onTimeChanged;
  final Function(TimeOfDay) onSuggestionSelected;

  const SchedulingSection({
    super.key,
    required this.isScheduled,
    required this.scheduledDate,
    required this.scheduledTime,
    required this.onScheduledChanged,
    required this.onDateChanged,
    required this.onTimeChanged,
    required this.onSuggestionSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Agendamento', style: AppTypography.label),
            if (isScheduled)
              TextButton.icon(
                icon: const Icon(Icons.lightbulb, size: 16),
                label: const Text('Sugestões'),
                onPressed: () => _showSuggestedTimes(context),
              ),
          ],
        ),
        RadioListTile<bool>(
          value: false,
          groupValue: isScheduled,
          onChanged: (v) => onScheduledChanged(v!),
          title: const Text('Publicar agora'),
          contentPadding: EdgeInsets.zero,
        ),
        RadioListTile<bool>(
          value: true,
          groupValue: isScheduled,
          onChanged: (v) => onScheduledChanged(v!),
          title: const Text('Agendar para:'),
          subtitle: isScheduled
              ? Row(
                  children: [
                    TextButton(
                      onPressed: () async {
                        final date = await showDatePicker(
                          context: context,
                          initialDate: scheduledDate,
                          firstDate: DateTime.now(),
                          lastDate: DateTime.now().add(
                            const Duration(days: 365),
                          ),
                        );
                        if (date != null) onDateChanged(date);
                      },
                      child: Text(
                        '${scheduledDate.day}/${scheduledDate.month}/${scheduledDate.year}',
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final time = await showTimePicker(
                          context: context,
                          initialTime: scheduledTime,
                        );
                        if (time != null) onTimeChanged(time);
                      },
                      child: Text(scheduledTime.format(context)),
                    ),
                  ],
                )
              : null,
          contentPadding: EdgeInsets.zero,
        ),
      ],
    );
  }

  void _showSuggestedTimes(BuildContext context) {
    final suggestions = SchedulingService().getSuggestedTimes();
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Horários de Maior Engajamento 🚀',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 16),
              Wrap(
                spacing: 10,
                children: suggestions
                    .map(
                      (time) => ActionChip(
                        label: Text(time.format(context)),
                        onPressed: () {
                          onSuggestionSelected(time);
                          Navigator.pop(context);
                        },
                      ),
                    )
                    .toList(),
              ),
            ],
          ),
        );
      },
    );
  }
}
