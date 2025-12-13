import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/clients/domain/client_model.dart';
import 'package:soloforte_app/features/clients/presentation/clients_controller.dart';
import 'package:soloforte_app/features/visits/presentation/visit_controller.dart';

class CheckInScreen extends ConsumerStatefulWidget {
  const CheckInScreen({super.key});

  @override
  ConsumerState<CheckInScreen> createState() => _CheckInScreenState();
}

class _CheckInScreenState extends ConsumerState<CheckInScreen> {
  final _searchController = TextEditingController();
  String _query = '';
  bool _isLoading = false;

  Future<void> _handleCheckIn(Client client) async {
    setState(() => _isLoading = true);
    try {
      await ref.read(visitControllerProvider.notifier).checkIn(client);
      if (mounted) {
        context.pop(); // Close check-in screen
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Check-in realizado em ${client.name}!'),
            backgroundColor: AppColors.success,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao fazer check-in: $e'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final clientsState = ref.watch(clientsControllerProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Realizar Check-in')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: SearchBar(
              controller: _searchController,
              hintText: 'Buscar cliente...',
              leading: const Icon(Icons.search),
              onChanged: (v) => setState(() => _query = v),
              elevation: WidgetStateProperty.all(0),
              backgroundColor: WidgetStateProperty.all(Colors.grey.shade100),
            ),
          ),
          Expanded(
            child: clientsState.when(
              data: (clients) {
                final filtered = ref
                    .read(clientsControllerProvider.notifier)
                    .filterClients(_query);

                if (filtered.isEmpty) {
                  return const Center(
                    child: Text('Nenhum cliente encontrado.'),
                  );
                }

                return ListView.separated(
                  itemCount: filtered.length,
                  separatorBuilder: (context, index) =>
                      const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final client = filtered[index];
                    return ListTile(
                      leading: CircleAvatar(child: Text(client.name[0])),
                      title: Text(client.name),
                      subtitle: Text(client.city),
                      trailing: _isLoading
                          ? const SizedBox(
                              width: 24,
                              height: 24,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Icon(Icons.login),
                      onTap: _isLoading ? null : () => _handleCheckIn(client),
                    );
                  },
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(child: Text('Erro: $e')),
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(16),
              child: Text(
                'Obtendo localização...',
                style: TextStyle(color: Colors.grey),
              ),
            ),
        ],
      ),
    );
  }
}
