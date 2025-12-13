import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class SupportHomeScreen extends StatelessWidget {
  const SupportHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Suporte & Ajuda')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => context.push('/dashboard/support/chat'),
        label: const Text('Nova Conversa'),
        icon: const Icon(Icons.chat),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _SupportOptionCard(
            icon: Icons.book_outlined,
            title: 'Central de Ajuda',
            subtitle: 'Perguntas frequentes e tutoriais',
            onTap: () {},
          ),
          const SizedBox(height: 16),
          Text('Como podemos ajudar?', style: AppTypography.h3),
          const SizedBox(height: 8),
          _TicketCard(
            id: '#1234',
            subject: 'Dúvida sobre análise de solo',
            status: 'Resolvido',
            statusColor: AppColors.success,
            date: 'Há 2 dias',
          ),
          const SizedBox(height: 8),
          _TicketCard(
            id: '#1235',
            subject: 'Erro ao sincronizar safra',
            status: 'Em Aberto',
            statusColor: Colors.orange,
            date: 'Hoje',
          ),
        ],
      ),
    );
  }
}

class _SupportOptionCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _SupportOptionCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Icon(icon, color: AppColors.primary),
        title: Text(title, style: AppTypography.label),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }
}

class _TicketCard extends StatelessWidget {
  final String id;
  final String subject;
  final String status;
  final Color statusColor;
  final String date;

  const _TicketCard({
    required this.id,
    required this.subject,
    required this.status,
    required this.statusColor,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 1,
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Colors.grey.shade200,
          child: const Icon(Icons.support_agent, color: Colors.grey),
        ),
        title: Text(subject),
        subtitle: Text('$id • $date'),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: statusColor.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            status,
            style: AppTypography.caption.copyWith(
              color: statusColor,
              fontWeight: AppTypography.bold,
            ),
          ),
        ),
        onTap: () => context.push('/dashboard/support/chat'),
      ),
    );
  }
}
