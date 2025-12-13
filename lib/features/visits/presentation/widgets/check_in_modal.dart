import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/features/clients/presentation/providers/clients_provider.dart';
import '../providers/check_in_provider.dart';

class CheckInModal extends ConsumerStatefulWidget {
  const CheckInModal({super.key});

  @override
  ConsumerState<CheckInModal> createState() => _CheckInModalState();
}

class _CheckInModalState extends ConsumerState<CheckInModal> {
  String? selectedClienteId;
  String? selectedFazendaId;

  @override
  Widget build(BuildContext context) {
    final clientsAsync = ref.watch(clientsProvider);

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(AppSpacing.radius2xl),
        ),
      ),
      padding: EdgeInsets.all(AppSpacing.xl),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Handle bar
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.gray300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          SizedBox(height: AppSpacing.lg),

          // Title
          Text('Check-in', style: AppTypography.h2),
          SizedBox(height: AppSpacing.md),
          Text(
            'Selecione o cliente e fazenda para iniciar a visita',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
          SizedBox(height: AppSpacing.xl),

          // Content
          clientsAsync.when(
            data: (clients) {
              final fazendas = selectedClienteId != null
                  ? clients
                        .firstWhere((c) => c.id == selectedClienteId)
                        .fazendas
                  : <dynamic>[];

              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Cliente dropdown
                  DropdownButtonFormField<String>(
                    initialValue: selectedClienteId,
                    decoration: InputDecoration(
                      labelText: 'Cliente',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                          AppSpacing.radiusLg,
                        ),
                      ),
                    ),
                    items: clients.map((client) {
                      return DropdownMenuItem(
                        value: client.id,
                        child: Text(client.nome),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        selectedClienteId = value;
                        selectedFazendaId = null;
                      });
                    },
                  ),
                  SizedBox(height: AppSpacing.lg),

                  // Fazenda dropdown
                  DropdownButtonFormField<String>(
                    initialValue: selectedFazendaId,
                    decoration: InputDecoration(
                      labelText: 'Fazenda',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                          AppSpacing.radiusLg,
                        ),
                      ),
                    ),
                    items: fazendas.map<DropdownMenuItem<String>>((fazenda) {
                      return DropdownMenuItem(
                        value: fazenda.id,
                        child: Text(fazenda.nome),
                      );
                    }).toList(),
                    onChanged: selectedClienteId == null
                        ? null
                        : (value) {
                            setState(() {
                              selectedFazendaId = value;
                            });
                          },
                  ),
                  SizedBox(height: AppSpacing.xl),

                  // Check-in button
                  ElevatedButton(
                    onPressed:
                        selectedClienteId != null && selectedFazendaId != null
                        ? () => _handleCheckIn(clients)
                        : null,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.success,
                      padding: EdgeInsets.symmetric(vertical: AppSpacing.lg),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(
                          AppSpacing.radiusLg,
                        ),
                      ),
                    ),
                    child: Text(
                      'Iniciar Check-in',
                      style: AppTypography.button.copyWith(color: Colors.white),
                    ),
                  ),
                ],
              );
            },
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (error, stack) => Text('Erro: $error'),
          ),

          SizedBox(height: MediaQuery.of(context).viewInsets.bottom),
        ],
      ),
    );
  }

  Future<void> _handleCheckIn(List<dynamic> clients) async {
    final client = clients.firstWhere((c) => c.id == selectedClienteId);
    final fazenda = client.fazendas.firstWhere(
      (f) => f.id == selectedFazendaId,
    );

    await ref
        .read(checkInProvider.notifier)
        .checkIn(
          clienteId: selectedClienteId!,
          fazendaId: selectedFazendaId!,
          clienteNome: client.nome,
          fazendaNome: fazenda.nome,
        );

    if (mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('✅ Check-in realizado em ${fazenda.nome}'),
          backgroundColor: AppColors.success,
        ),
      );
    }
  }
}
