import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/auth/presentation/auth_provider.dart';

class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  bool _pushNotifications = true;
  bool _emailNotifications = true;
  bool _darkMode = false;
  bool _isMetric = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Configurações'), centerTitle: false),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          children: [
            _buildProfileSection(),
            const SizedBox(height: AppSpacing.lg),

            _buildSectionHeader('Notificações'),
            _buildSwitchTile(
              'Notificações Push',
              'Receba alertas importantes no seu dispositivo',
              _pushNotifications,
              (val) => setState(() => _pushNotifications = val),
            ),
            _buildSwitchTile(
              'E-mails',
              'Receba relatórios e novidades por e-mail',
              _emailNotifications,
              (val) => setState(() => _emailNotifications = val),
            ),

            const SizedBox(height: AppSpacing.lg),

            _buildSectionHeader('Aparência'),
            _buildSwitchTile(
              'Modo Escuro',
              'Utilize o tema escuro no aplicativo',
              _darkMode,
              (val) => setState(() => _darkMode = val),
            ),

            const SizedBox(height: AppSpacing.lg),

            _buildSectionHeader('Preferências de Unidade'),
            _buildSwitchTile(
              'Sistema Métrico',
              _isMetric
                  ? 'Utilizando Celsius (°C), Milímetros (mm) e km/h'
                  : 'Utilizando Fahrenheit (°F), Polegadas (in) e mph',
              _isMetric,
              (val) => setState(() => _isMetric = val),
            ),

            const SizedBox(height: AppSpacing.lg),

            _buildSectionHeader('Conta'),
            _buildActionTile(
              icon: Icons.lock_outline,
              title: 'Alterar Senha',
              onTap: () {
                // Navigate to change password screen
              },
            ),
            _buildActionTile(
              icon: Icons.privacy_tip_outlined,
              title: 'Política de Privacidade',
              onTap: () {
                // Open Privacy Policy
              },
            ),
            _buildActionTile(
              icon: Icons.description_outlined,
              title: 'Termos de Uso',
              onTap: () {
                // Open Terms
              },
            ),

            const SizedBox(height: AppSpacing.xl),

            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {
                  ref.read(authControllerProvider).logout();
                },
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.error,
                  side: const BorderSide(color: AppColors.error),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                icon: const Icon(Icons.logout),
                label: const Text('SAIR DA CONTA'),
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            const Text('Versão 1.0.0', style: TextStyle(color: Colors.grey)),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileSection() {
    // Mock user data or get from provider
    const userName = 'Raudinei Silva';
    const userEmail = 'raudinei@soloforte.com.br';

    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 30,
            backgroundColor: AppColors.primary,
            child: Text(
              'RS',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 24,
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(userName, style: AppTypography.h3),
                Text(
                  userEmail,
                  style: AppTypography.bodySmall.copyWith(color: Colors.grey),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.edit_outlined, color: AppColors.primary),
            onPressed: () {
              // Edit profile navigation
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.only(bottom: 8, left: 4),
      child: Text(
        title.toUpperCase(),
        style: AppTypography.label.copyWith(
          color: Colors.grey[600],
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildSwitchTile(
    String title,
    String subtitle,
    bool value,
    ValueChanged<bool> onChanged,
  ) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: BorderSide(color: Colors.grey.shade200),
      ),
      child: SwitchListTile(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 12)),
        value: value,
        onChanged: onChanged,
        activeThumbColor: AppColors.primary,
      ),
    );
  }

  Widget _buildActionTile({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: BorderSide(color: Colors.grey.shade200),
      ),
      child: ListTile(
        leading: Icon(icon, color: Colors.grey[700]),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        trailing: const Icon(Icons.chevron_right, color: Colors.grey),
        onTap: onTap,
      ),
    );
  }
}
