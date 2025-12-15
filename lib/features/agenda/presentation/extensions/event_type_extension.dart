import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/agenda/domain/event_model.dart';

extension EventTypeExtension on EventType {
  String get label {
    switch (this) {
      case EventType.technicalVisit:
        return 'Visita Técnica';
      case EventType.application:
        return 'Aplicação';
      case EventType.consultancy:
        return 'Consultoria';
      case EventType.harvest:
        return 'Colheita';
      case EventType.maintenance:
        return 'Manutenção';
      case EventType.meeting:
        return 'Reunião';
      case EventType.reminder:
        return 'Lembrete';
      case EventType.custom:
        return 'Outro';
    }
  }

  Color get color {
    switch (this) {
      case EventType.technicalVisit:
        return AppColors.primary;
      case EventType.application:
        return AppColors.alert;
      case EventType.consultancy:
        return Colors.indigo;
      case EventType.harvest:
        return AppColors.secondary;
      case EventType.maintenance:
        return Colors.brown;
      case EventType.meeting:
        return Colors.purple;
      case EventType.reminder:
        return Colors.teal;
      case EventType.custom:
        return Colors.grey;
    }
  }

  IconData get icon {
    switch (this) {
      case EventType.technicalVisit:
        return Icons.agriculture;
      case EventType.application:
        return Icons.science;
      case EventType.consultancy:
        return Icons.support_agent;
      case EventType.harvest:
        return Icons.local_shipping;
      case EventType.maintenance:
        return Icons.build;
      case EventType.meeting:
        return Icons.people;
      case EventType.reminder:
        return Icons.notifications;
      case EventType.custom:
        return Icons.event;
    }
  }
}
