import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class NotificationSettingsModal extends StatelessWidget {
  const NotificationSettingsModal({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 24),
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(
                  Icons.notifications_active,
                  color: AppColors.primary,
                  size: 32,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Configurar Alertas', style: AppTypography.h3),
                    Text(
                      'Gerencie suas notificações push',
                      style: AppTypography.bodyMedium.copyWith(
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          // Toggle Switches
          _buildSwitch(
            'Tempestades Severas',
            'Alertas de raios, granizo e ventos fortes',
            true,
            (val) {},
          ),
          _buildSwitch(
            'Chuva',
            'Início e fim de precipitação na sua área',
            true,
            (val) {},
          ),
          _buildSwitch(
            'Mudanças Bruscas',
            'Queda ou aumento repentino de temperatura',
            false,
            (val) {},
          ),
          _buildSwitch(
            'Resumo Diário',
            'Previsão do tempo todas as manhãs às 07:00',
            true,
            (val) {},
          ),
          const SizedBox(height: 24),
          // Test Button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    behavior: SnackBarBehavior.floating,
                    backgroundColor: AppColors.error,
                    content: Row(
                      children: [
                        const Icon(Icons.warning, color: Colors.white),
                        const SizedBox(width: 12),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                'Alerta de Tempestade',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              Text('Detectada formação de tempestade severa.'),
                            ],
                          ),
                        ),
                      ],
                    ),
                    action: SnackBarAction(
                      label: 'VER',
                      textColor: Colors.white,
                      onPressed: () {},
                    ),
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: Colors.grey.shade100,
                foregroundColor: AppColors.textPrimary,
                elevation: 0,
              ),
              icon: const Icon(Icons.touch_app),
              label: const Text('Simular Notificação Push'),
            ),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _buildSwitch(
    String title,
    String subtitle,
    bool value,
    ValueChanged<bool> onChanged,
  ) {
    return SwitchListTile(
      value: value,
      onChanged: onChanged,
      activeColor: AppColors.primary,
      contentPadding: EdgeInsets.zero,
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(subtitle, style: const TextStyle(color: Colors.grey)),
    );
  }
}
