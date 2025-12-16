import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:soloforte_app/features/support/domain/ticket_model.dart';
import 'package:uuid/uuid.dart';

class TicketRepository {
  static const String _storageKey = 'soloforte_tickets';
  final _uuid = const Uuid();

  Future<List<Ticket>> loadTickets() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_storageKey);

    if (jsonString == null) {
      return _generateMockTickets();
    }

    try {
      final List<dynamic> jsonList = jsonDecode(jsonString);
      return jsonList.map((e) => Ticket.fromJson(e)).toList();
    } catch (e) {
      return _generateMockTickets();
    }
  }

  Future<Ticket> createTicket({
    required String subject,
    required String description,
    required TicketCategory category,
    required TicketPriority priority,
  }) async {
    final tickets = await loadTickets();

    final newTicket = Ticket(
      id: _uuid.v4(),
      subject: subject,
      description: description,
      category: category,
      priority: priority,
      status: TicketStatus.open,
      createdAt: DateTime.now(),
      lastUpdate: DateTime.now(),
    );

    tickets.insert(0, newTicket);
    await _saveTickets(tickets);

    return newTicket;
  }

  Future<void> updateTicketStatus(String id, TicketStatus status) async {
    final tickets = await loadTickets();
    final index = tickets.indexWhere((t) => t.id == id);

    if (index != -1) {
      tickets[index] = tickets[index].copyWith(
        status: status,
        lastUpdate: DateTime.now(),
      );
      await _saveTickets(tickets);
    }
  }

  Future<void> _saveTickets(List<Ticket> tickets) async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = jsonEncode(tickets.map((t) => t.toJson()).toList());
    await prefs.setString(_storageKey, jsonString);
  }

  List<Ticket> _generateMockTickets() {
    return [
      Ticket(
        id: '1234',
        subject: 'Erro na sincronização',
        description: 'Não consigo enviar os dados da visita.',
        category: TicketCategory.technical,
        priority: TicketPriority.urgent,
        status: TicketStatus.inProgress,
        createdAt: DateTime.now().subtract(const Duration(days: 1)),
        lastUpdate: DateTime.now().subtract(const Duration(hours: 4)),
      ),
      Ticket(
        id: '5678',
        subject: 'Dúvida sobre adubação',
        description: 'Qual a quantidade recomendada para milho?',
        category: TicketCategory.agronomic,
        priority: TicketPriority.normal,
        status: TicketStatus.resolved,
        createdAt: DateTime.now().subtract(const Duration(days: 5)),
        lastUpdate: DateTime.now().subtract(const Duration(days: 2)),
      ),
    ];
  }
}
