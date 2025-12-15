import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:soloforte_app/features/agenda/domain/event_model.dart';
import 'package:uuid/uuid.dart';

part 'agenda_controller.g.dart';

@riverpod
class AgendaController extends _$AgendaController {
  @override
  FutureOr<List<Event>> build() async {
    // Simulate initial API fetch
    await Future.delayed(const Duration(milliseconds: 500));
    return _getMockEvents();
  }

  Future<void> addEvent(Event event) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await Future.delayed(
        const Duration(milliseconds: 500),
      ); // Simulate network
      final currentEvents = state.value ?? [];
      return [...currentEvents, event];
    });
  }

  Future<void> updateEvent(Event updatedEvent) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await Future.delayed(const Duration(milliseconds: 300));
      final currentEvents = state.value ?? [];
      return currentEvents
          .map((e) => e.id == updatedEvent.id ? updatedEvent : e)
          .toList();
    });
  }

  Future<void> deleteEvent(String eventId) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await Future.delayed(const Duration(milliseconds: 300));
      final currentEvents = state.value ?? [];
      return currentEvents.where((e) => e.id != eventId).toList();
    });
  }

  List<Event> _getMockEvents() {
    return [
      Event(
        id: '1',
        title: 'Visita Técnica - Fazenda Santa Rita',
        description: 'Análise de solo e recomendação de adubação.',
        startTime: DateTime.now().add(const Duration(hours: 2)),
        endTime: DateTime.now().add(const Duration(hours: 4)),
        type: EventType.technicalVisit,
        location: 'Fazenda Santa Rita',
        status: EventStatus.scheduled,
        participants: ['João Silva', 'Maria Souza'],
        updatedAt: DateTime.now(),
        createdAt: DateTime.now(),
      ),
      Event(
        id: '2',
        title: 'Aplicação de Defensivos',
        description: 'Supervisão de aplicação no Talhão 05.',
        startTime: DateTime.now().add(const Duration(days: 1, hours: 9)),
        endTime: DateTime.now().add(const Duration(days: 1, hours: 12)),
        type: EventType.application,
        location: 'Talhão 05',
        status: EventStatus.scheduled,
        updatedAt: DateTime.now(),
        createdAt: DateTime.now(),
      ),
      Event(
        id: '3',
        title: 'Reunião Semanal',
        description: 'Alinhamento da equipe.',
        startTime: DateTime.now().subtract(const Duration(hours: 3)),
        endTime: DateTime.now().subtract(const Duration(hours: 1)),
        type: EventType.meeting,
        location: 'Escritório Central',
        status: EventStatus.completed,
        updatedAt: DateTime.now(),
        createdAt: DateTime.now(),
      ),
    ];
  }
}
