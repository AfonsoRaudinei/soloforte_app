import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../domain/client_model.dart';
import '../data/clients_repository.dart';

part 'clients_controller.g.dart';

@riverpod
class ClientsController extends _$ClientsController {
  @override
  Future<List<Client>> build() {
    return ref.read(clientsRepositoryProvider).getClients();
  }

  Future<void> addClient(Client client) async {
    state = const AsyncValue.loading();
    try {
      await ref.read(clientsRepositoryProvider).addClient(client);
      // Refresh the list locally to show the new item immediately
      final currentList = state.value ?? [];
      state = AsyncValue.data([...currentList, client]);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  // Method to facilitate filtering in the UI
  List<Client> filterClients(String query) {
    final clients = state.value ?? [];
    if (query.isEmpty) return clients;

    return clients.where((client) {
      return client.name.toLowerCase().contains(query.toLowerCase()) ||
          client.city.toLowerCase().contains(query.toLowerCase()) ||
          client.phone.contains(query);
    }).toList();
  }
}
