import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import '../providers/check_in_provider.dart';
import 'check_in_modal.dart';

class CheckInButton extends ConsumerWidget {
  const CheckInButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final checkInState = ref.watch(checkInProvider);
    final isCheckedIn = checkInState.isCheckedIn;

    return FloatingActionButton.extended(
      onPressed: () {
        if (isCheckedIn) {
          _showCheckOutDialog(context, ref);
        } else {
          _showCheckInModal(context);
        }
      },
      backgroundColor: isCheckedIn ? AppColors.error : AppColors.success,
      icon: Icon(isCheckedIn ? Icons.logout : Icons.login, color: Colors.white),
      label: Text(
        isCheckedIn ? 'Check-out' : 'Check-in',
        style: AppTypography.label.copyWith(color: Colors.white),
      ),
    );
  }

  void _showCheckInModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const CheckInModal(),
    );
  }

  void _showCheckOutDialog(BuildContext context, WidgetRef ref) {
    final visita = ref.read(checkInProvider).currentVisita;
    if (visita == null) return;

    final duration = DateTime.now().difference(visita.startTime);
    final hours = duration.inHours;
    final minutes = duration.inMinutes % 60;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Finalizar Visita', style: AppTypography.h3),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${visita.clienteNome} - ${visita.fazendaNome}',
              style: AppTypography.bodyLarge,
            ),
            SizedBox(height: AppSpacing.md),
            Text(
              'Duração: ${hours}h ${minutes}min',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              await ref.read(checkInProvider.notifier).checkOut();
              if (context.mounted) {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('✅ Check-out realizado com sucesso!'),
                  ),
                );
              }
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.error),
            child: const Text('Confirmar Check-out'),
          ),
        ],
      ),
    );
  }
}
