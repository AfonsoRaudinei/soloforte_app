import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
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
  // State from prompt preferences
  bool _notificacoesPush = true;
  bool _alertasAutomaticos = true;
  bool _modoOffline = false;
  bool _sincronizacaoAuto = true;
  bool _modoEscuro = false;

  // Style preference ('ios' or 'material')
  String _estiloVisual = 'ios';

  // Farm Logo State
  String? _logoFazenda;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundSecondary, // gray-50
      body: Column(
        children: [
          _buildHeader(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.only(
                left: AppSpacing.md,
                right: AppSpacing.md,
                top: AppSpacing.md,
                bottom: 32,
              ),
              child: Column(
                children: [
                  _buildProfileIdentitySection(),
                  const SizedBox(height: AppSpacing.lg),

                  _buildVisualStyleSection(),
                  const SizedBox(height: AppSpacing.lg),

                  _buildNotificationsSection(),
                  const SizedBox(height: AppSpacing.lg),

                  _buildMapsDataSection(),
                  const SizedBox(height: AppSpacing.lg),

                  _buildAppearanceSection(),
                  const SizedBox(height: AppSpacing.lg),

                  _buildSupportSection(),
                  const SizedBox(height: AppSpacing.lg),

                  _buildPrivacySection(),
                  const SizedBox(height: AppSpacing.lg),

                  _buildAboutSection(),
                  const SizedBox(height: AppSpacing.xl),

                  _buildLogoutSection(),
                  const SizedBox(height: AppSpacing.xl),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.only(top: 60, bottom: 24, left: 20, right: 20),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.gray700, AppColors.gray900],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Align(
            alignment: Alignment.centerLeft,
            child: IconButton(
              onPressed: () {
                if (context.canPop()) {
                  context.pop();
                } else {
                  context.go('/dashboard');
                }
              },
              icon: const Icon(Icons.arrow_back, color: Colors.white),
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
              style: IconButton.styleFrom(
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
            ),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(
                  Icons.settings,
                  color: Colors.white,
                  size: 28,
                ),
              ),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Configurações',
                    style: AppTypography.h2.copyWith(color: Colors.white),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Gerencie todas as preferências do app',
                    style: AppTypography.bodySmall.copyWith(
                      color: Colors.white.withValues(alpha: 0.7),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSectionLabel(String label) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 12),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Text(
          label.toUpperCase(),
          style: AppTypography.caption.copyWith(
            color: AppColors.textSecondary,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.2,
          ),
        ),
      ),
    );
  }

  // 1. PERFIL & IDENTIDADE
  Widget _buildProfileIdentitySection() {
    // Mock data
    const userName = 'Raudinei Silva';
    const userEmail = 'raudinei@soloforte.com.br';

    return Column(
      children: [
        _buildSectionLabel('PERFIL & IDENTIDADE'),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              // Foto Perfil Row
              InkWell(
                onTap: () {
                  _showToast('Foto de perfil atualizada!');
                },
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 60,
                        height: 60,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [AppColors.blue500, AppColors.blue700],
                          ),
                        ),
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            const Text(
                              'RS',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                color: Colors.black.withValues(alpha: 0.3),
                                shape: BoxShape.circle,
                              ),
                              child: const Center(
                                child: Icon(
                                  Icons.camera_alt,
                                  color: Colors.white,
                                  size: 20,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Foto de Perfil', style: AppTypography.h4),
                          Text(
                            'Toque para alterar',
                            style: AppTypography.bodySmall.copyWith(
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const Divider(height: 1),

              // Logo Fazenda Row
              InkWell(
                onTap: () {
                  setState(() {
                    _logoFazenda = 'Uploaded';
                  });
                  _showToast('Logo da fazenda atualizado!');
                },
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          gradient: const LinearGradient(
                            colors: [AppColors.green500, AppColors.green600],
                          ),
                        ),
                        child: _logoFazenda == null
                            ? const Icon(
                                Icons.business,
                                color: Colors.white,
                                size: 28,
                              )
                            : const Icon(
                                Icons.check,
                                color: Colors.white,
                                size: 28,
                              ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Logo da Fazenda', style: AppTypography.h4),
                            Text(
                              'Será usado como ícone do app',
                              style: AppTypography.bodySmall.copyWith(
                                color: AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const Divider(height: 1),

              // Dados do Perfil Link
              _buildNavigableRow(
                icon: Icons.person,
                iconGradient: const [Colors.purple, Colors.pink],
                title: 'Dados do Perfil',
                subtitle: '$userName, $userEmail',
                onTap: () => _showToast('Dados do Perfil'),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // 2. ESTILO VISUAL
  Widget _buildVisualStyleSection() {
    return Column(
      children: [
        _buildSectionLabel('ESTILO VISUAL'),
        Row(
          children: [
            Expanded(
              child: _buildStyleOption(
                id: 'ios',
                title: 'Estilo iOS',
                subtitle: 'Minimalista',
                icon: Icons.smartphone,
                gradient: [Colors.black87, Colors.black],
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildStyleOption(
                id: 'material',
                title: 'Material',
                subtitle: 'Geométrico',
                icon: Icons.palette,
                gradient: [AppColors.blue600, Colors.blue[800]!],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStyleOption({
    required String id,
    required String title,
    required String subtitle,
    required IconData icon,
    required List<Color> gradient,
  }) {
    final isSelected = _estiloVisual == id;
    return GestureDetector(
      onTap: () {
        setState(() => _estiloVisual = id);
        if (!isSelected) {
          _showToast('Estilo visual alterado para $title');
        }
      },
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.blue50 : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? AppColors.primary : Colors.transparent,
            width: 2,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: gradient),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: Colors.white, size: 24),
            ),
            const SizedBox(height: 12),
            Text(title, style: AppTypography.h4.copyWith(fontSize: 14)),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: AppTypography.caption.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
            if (isSelected) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.primary,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  'ATIVO',
                  style: AppTypography.caption.copyWith(
                    color: Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  // 3. NOTIFICAÇÕES
  Widget _buildNotificationsSection() {
    return Column(
      children: [
        _buildSectionLabel('NOTIFICAÇÕES'),
        _buildCardContainer([
          _buildSwitchRow(
            title: 'Notificações Push',
            subtitle: 'Receber alertas no dispositivo',
            value: _notificacoesPush,
            onChanged: (v) {
              setState(() => _notificacoesPush = v);
              _showToast(
                v
                    ? 'Notificações Push ativado'
                    : 'Notificações Push desativado',
              );
            },
            icon: Icons.notifications,
            iconGradient: [AppColors.blue500, AppColors.purple500],
          ),
          const Divider(height: 1),
          _buildSwitchRow(
            title: 'Alertas Automáticos',
            subtitle: 'Pragas, clima e condições',
            value: _alertasAutomaticos,
            onChanged: (v) => setState(() => _alertasAutomaticos = v),
            icon: Icons.warning_amber_rounded,
            iconGradient: [AppColors.orange500, AppColors.red500],
          ),
        ]),
      ],
    );
  }

  // 4. MAPAS E DADOS
  Widget _buildMapsDataSection() {
    return Column(
      children: [
        _buildSectionLabel('MAPAS E DADOS'),
        _buildCardContainer([
          _buildNavigableRow(
            title: 'Mapas Offline',
            subtitle: 'Gerenciar áreas baixadas',
            icon: Icons.download,
            iconGradient: [AppColors.orange500, AppColors.red500],
            onTap: () => context.go('/mapas-offline'), // Placeholder route
          ),
          const Divider(height: 1),
          _buildSwitchRow(
            title: 'Modo Offline',
            subtitle: 'Trabalhar sem internet',
            value: _modoOffline,
            onChanged: (v) => setState(() => _modoOffline = v),
            icon: Icons.wifi_off,
            iconGradient: [AppColors.gray500, AppColors.gray700],
          ),
          const Divider(height: 1),
          _buildSwitchRow(
            title: 'Sincronização Automática',
            subtitle: 'Atualizar dados ao conectar',
            value: _sincronizacaoAuto,
            onChanged: (v) => setState(() => _sincronizacaoAuto = v),
            icon: Icons.sync,
            iconGradient: [AppColors.green500, AppColors.green600],
          ),
        ]),
      ],
    );
  }

  // 5. APARÊNCIA
  Widget _buildAppearanceSection() {
    return Column(
      children: [
        _buildSectionLabel('APARÊNCIA'),
        _buildCardContainer([
          _buildNavigableRow(
            title: 'Idioma',
            subtitle: 'Português (Brasil)',
            icon: Icons.language,
            iconGradient: [Colors.teal, Colors.cyan],
            onTap: () => _showToast('Selecionar Idioma'),
          ),
          const Divider(height: 1),
          _buildSwitchRow(
            title: 'Modo Escuro',
            subtitle: 'Tema escuro para o app',
            value: _modoEscuro,
            onChanged: (v) => setState(() => _modoEscuro = v),
            icon: Icons.dark_mode,
            iconGradient: [Colors.indigo, Colors.deepPurple],
          ),
          const Divider(height: 1),
          _buildNavigableRow(
            title: 'Personalizar Dashboard',
            subtitle: 'Layout e widgets',
            icon: Icons.dashboard_customize,
            iconGradient: [Colors.pinkAccent, Colors.pink],
            onTap: () => _showToast('Personalizar Dashboard'),
          ),
        ]),
      ],
    );
  }

  // 6. SUPORTE
  Widget _buildSupportSection() {
    return Column(
      children: [
        _buildSectionLabel('SUPORTE'),
        _buildCardContainer([
          _buildNavigableRow(
            title: 'Suporte & Chat',
            subtitle: 'Converse com nossa equipe',
            icon: Icons.chat_bubble_outline,
            iconGradient: [AppColors.green500, Colors.teal],
            onTap: () => context.go(
              '/dashboard/support/chat',
            ), // Adjusted to likely route
          ),
          const Divider(height: 1),
          _buildNavigableRow(
            title: 'Central de Ajuda',
            subtitle: 'Tutoriais e perguntas frequentes',
            icon: Icons.help_outline,
            iconGradient: [AppColors.amber500, Colors.orange],
            onTap: () => _showToast('Central de Ajuda'),
          ),
          const Divider(height: 1),
          _buildNavigableRow(
            title: 'Enviar Feedback',
            subtitle: 'Compartilhe sua opinião',
            icon: Icons.camera_alt_outlined,
            iconGradient: [Colors.purple, Colors.pink],
            onTap: () =>
                context.go('/dashboard/feedback'), // Adjusted to likely route
          ),
        ]),
      ],
    );
  }

  // 7. PRIVACIDADE
  Widget _buildPrivacySection() {
    return Column(
      children: [
        _buildSectionLabel('PRIVACIDADE'),
        _buildCardContainer([
          _buildNavigableRow(
            title: 'Privacidade',
            subtitle: 'Seus dados e permissões',
            icon: Icons.shield_outlined,
            iconGradient: [AppColors.gray700, AppColors.gray900],
            onTap: () => _showToast('Política de Privacidade'),
          ),
          const Divider(height: 1),
          _buildNavigableRow(
            title: 'Alterar Senha',
            subtitle: 'Segurança da conta',
            icon: Icons.lock_outline,
            iconGradient: [Colors.redAccent, Colors.pinkAccent],
            onTap: () => _showToast('Alterar Senha'),
          ),
        ]),
      ],
    );
  }

  // 8. SOBRE
  Widget _buildAboutSection() {
    return Column(
      children: [
        _buildSectionLabel('SOBRE'),
        _buildCardContainer([
          _buildNavigableRow(
            title: 'Sobre o SoloForte',
            subtitle: 'Versão 2.5.0',
            icon: Icons.info_outline,
            iconGradient: [AppColors.blue500, AppColors.blue700],
            onTap: () =>
                _showToast('SoloForte v2.5.0\nÚltima atualização: 06/11/2025'),
          ),
          const Divider(height: 1),
          _buildNavigableRow(
            title: 'Termos de Uso',
            subtitle: 'Leia nossos termos',
            icon: Icons.mail_outline,
            iconGradient: [Colors.blueGrey, Colors.grey],
            onTap: () => _showToast('Termos de Uso'),
          ),
        ]),
      ],
    );
  }

  // 9. SAIR
  Widget _buildLogoutSection() {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.red50),
        boxShadow: [
          BoxShadow(
            color: Colors.red.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () {
            ref.read(authControllerProvider).logout();
            _showToast('Sair da conta: Funcionalidade em desenvolvimento');
          },
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [AppColors.red500, AppColors.red600],
                    ),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.red500.withValues(alpha: 0.3),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.logout,
                    color: Colors.white,
                    size: 20,
                  ),
                ),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Sair da Conta',
                      style: AppTypography.h4.copyWith(color: AppColors.red600),
                    ),
                    Text(
                      'Fazer logout do aplicativo',
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.red600.withValues(alpha: 0.8),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // Helpers
  Widget _buildCardContainer(List<Widget> children) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(children: children),
    );
  }

  Widget _buildNavigableRow({
    required String title,
    required String subtitle,
    required IconData icon,
    required List<Color> iconGradient,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: iconGradient),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: Colors.white, size: 22),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTypography.bodyLarge.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppColors.textTertiary),
          ],
        ),
      ),
    );
  }

  Widget _buildSwitchRow({
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
    required IconData icon,
    required List<Color> iconGradient,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: iconGradient),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: Colors.white, size: 22),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: AppTypography.bodyLarge.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  subtitle,
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeThumbColor: Colors.white,
            activeTrackColor: AppColors.primary,
          ),
        ],
      ),
    );
  }

  void _showToast(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }
}
