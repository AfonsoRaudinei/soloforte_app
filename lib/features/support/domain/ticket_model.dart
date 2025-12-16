import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'ticket_model.freezed.dart';
part 'ticket_model.g.dart';

enum TicketStatus { open, inProgress, resolved, closed }

enum TicketPriority { low, normal, urgent }

enum TicketCategory { technical, financial, agronomic, featureRequest, other }

@freezed
class Ticket with _$Ticket {
  const factory Ticket({
    required String id,
    required String subject,
    required String description,
    required TicketCategory category,
    required TicketPriority priority,
    required TicketStatus status,
    required DateTime createdAt,
    required DateTime lastUpdate,
    @Default([]) List<String> messageIds,
  }) = _Ticket;

  factory Ticket.fromJson(Map<String, dynamic> json) => _$TicketFromJson(json);
}

extension TicketStatusExtension on TicketStatus {
  String get label {
    switch (this) {
      case TicketStatus.open:
        return 'Aberto';
      case TicketStatus.inProgress:
        return 'Em Andamento';
      case TicketStatus.resolved:
        return 'Resolvido';
      case TicketStatus.closed:
        return 'Fechado';
    }
  }

  Color get color {
    switch (this) {
      case TicketStatus.open:
        return Colors.blue;
      case TicketStatus.inProgress:
        return Colors.orange;
      case TicketStatus.resolved:
        return Colors.green;
      case TicketStatus.closed:
        return Colors.grey;
    }
  }
}

extension TicketCategoryExtension on TicketCategory {
  String get label {
    switch (this) {
      case TicketCategory.technical:
        return 'Suporte Técnico';
      case TicketCategory.financial:
        return 'Financeiro';
      case TicketCategory.agronomic:
        return 'Dúvida Agronômica';
      case TicketCategory.featureRequest:
        return 'Sugestão';
      case TicketCategory.other:
        return 'Outro';
    }
  }
}
