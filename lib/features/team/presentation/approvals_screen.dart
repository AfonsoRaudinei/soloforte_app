import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/features/team/presentation/hr_controller.dart';
import 'package:soloforte_app/features/team/domain/hr_models.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:intl/intl.dart';

class ApprovalsScreen extends ConsumerWidget {
  const ApprovalsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final hrState = ref.watch(hrControllerProvider);
    final controller = ref.read(hrControllerProvider.notifier);

    return Scaffold(
      appBar: AppBar(title: const Text('Aprovações Pendentes')),
      body: hrState.isLoading
          ? const Center(child: CircularProgressIndicator())
          : hrState.pendingRequests.isEmpty
          ? const Center(child: Text('Nenhuma solicitação pendente.'))
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: hrState.pendingRequests.length,
              itemBuilder: (context, index) {
                final req = hrState.pendingRequests[index];
                return Card(
                  elevation: 2,
                  margin: const EdgeInsets.only(bottom: 16),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Chip(
                              label: Text(_getTypeLabel(req.type)),
                              backgroundColor: Colors.blue.withOpacity(0.1),
                              labelStyle: const TextStyle(color: Colors.blue),
                            ),
                            Text(
                              DateFormat('dd/MM/yyyy').format(req.date),
                              style: const TextStyle(color: Colors.grey),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          req.memberName,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(req.description),
                        if (req.amount != null)
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: Text(
                              'Valor: R\$ ${req.amount!.toStringAsFixed(2)}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        if (req.startDate != null && req.endDate != null)
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: Text(
                              'Período: ${DateFormat('dd/MM').format(req.startDate!)} a ${DateFormat('dd/MM').format(req.endDate!)}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            OutlinedButton(
                              onPressed: () => controller.rejectRequest(req.id),
                              child: const Text(
                                'Rejeitar',
                                style: TextStyle(color: Colors.red),
                              ),
                            ),
                            const SizedBox(width: 12),
                            ElevatedButton(
                              onPressed: () =>
                                  controller.approveRequest(req.id),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppColors.primary,
                              ),
                              child: const Text(
                                'Aprovar',
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }

  String _getTypeLabel(RequestType type) {
    switch (type) {
      case RequestType.vacation:
        return 'Férias';
      case RequestType.reimbursement:
        return 'Reembolso';
      case RequestType.overtime:
        return 'Horas Extras';
      case RequestType.leave:
        return 'Licença';
    }
  }
}
