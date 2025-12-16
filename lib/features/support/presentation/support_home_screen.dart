import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

import 'package:soloforte_app/features/support/data/ticket_repository.dart';
import 'package:soloforte_app/features/support/domain/ticket_model.dart';
import 'package:soloforte_app/features/support/presentation/help_center_screen.dart';
import 'package:timeago/timeago.dart' as timeago;

import 'package:shake/shake.dart';

import 'package:soloforte_app/features/support/presentation/widgets/rating_dialog.dart';

class SupportHomeScreen extends StatefulWidget {
  const SupportHomeScreen({super.key});

  @override
  State<SupportHomeScreen> createState() => _SupportHomeScreenState();
}

class _SupportHomeScreenState extends State<SupportHomeScreen> {
  final _repo = TicketRepository();
  List<Ticket> _tickets = [];
  bool _isLoading = true;
  late ShakeDetector _shakeDetector;

  @override
  void initState() {
    super.initState();
    _loadTickets();
    _shakeDetector = ShakeDetector.autoStart(onPhoneShake: _onShake);
  }

  void _onShake() {
    if (!mounted) return;
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Reportar Bug?'),
        content: const Text(
          'Detectamos que você agitou o telefone. Deseja reportar um erro?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Não'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              context.push('/dashboard/support/chat');
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Iniciando relato de bug...')),
              );
            },
            child: const Text('Sim'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _shakeDetector.stopListening();
    super.dispose();
  }

  Future<void> _loadTickets() async {
    final tickets = await _repo.loadTickets();
    if (mounted) {
      setState(() {
        _tickets = tickets;
        _isLoading = false;
      });
    }
  }

  Widget _buildStatistics() {
    if (_isLoading) return const SizedBox.shrink();

    final total = _tickets.length;
    final active = _tickets
        .where(
          (t) =>
              t.status == TicketStatus.open ||
              t.status == TicketStatus.inProgress,
        )
        .length;
    final solved = _tickets
        .where(
          (t) =>
              t.status == TicketStatus.resolved ||
              t.status == TicketStatus.closed,
        )
        .length;

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        children: [
          Expanded(
            child: _StatCard(
              label: 'Total',
              count: total.toString(),
              color: Colors.blue,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: _StatCard(
              label: 'Abertos',
              count: active.toString(),
              color: Colors.orange,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: _StatCard(
              label: 'Resolvidos',
              count: solved.toString(),
              color: Colors.green,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Suporte & Ajuda')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          await context.push('/dashboard/support/create');
          _loadTickets(); // Refresh on return
        },
        label: const Text('Nova Conversa'),
        icon: const Icon(Icons.chat),
      ),
      body: RefreshIndicator(
        onRefresh: _loadTickets,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _SupportOptionCard(
              icon: Icons.book_outlined,
              title: 'Central de Ajuda',
              subtitle: 'Perguntas frequentes e tutoriais',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const HelpCenterScreen(),
                  ),
                );
              },
            ),

            _buildStatistics(),

            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Meus Chamados', style: AppTypography.h3),
                if (_isLoading)
                  const SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  ),
              ],
            ),
            const SizedBox(height: 16),
            if (!_isLoading && _tickets.isEmpty)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(32.0),
                  child: Text('Nenhum chamado aberto'),
                ),
              )
            else
              ..._tickets.map(
                (ticket) => Dismissible(
                  key: Key(ticket.id),
                  background: Container(
                    color: Colors.red,
                    alignment: Alignment.centerRight,
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: const Icon(Icons.delete, color: Colors.white),
                  ),
                  direction: DismissDirection.endToStart,
                  onDismissed: (direction) async {
                    await _repo.updateTicketStatus(
                      ticket.id,
                      TicketStatus.closed,
                    );
                    if (context.mounted) {
                      await showDialog(
                        context: context,
                        builder: (context) => const RatingDialog(),
                      );
                    }
                    _loadTickets();
                  },
                  confirmDismiss: (direction) async {
                    return await showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Fechar Chamado?'),
                        content: const Text(
                          'Tem certeza que deseja marcar este chamado como resolvido/fechado?',
                        ),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.of(context).pop(false),
                            child: const Text('Cancelar'),
                          ),
                          TextButton(
                            onPressed: () => Navigator.of(context).pop(true),
                            child: const Text('Fechar'),
                          ),
                        ],
                      ),
                    );
                  },
                  child: _TicketCard(ticket: ticket),
                ),
              ),
          ],
        ),
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
  final Ticket ticket;

  const _TicketCard({required this.ticket});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 1,
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: ticket.status.color.withOpacity(0.1),
          child: Icon(Icons.support_agent, color: ticket.status.color),
        ),
        title: Text(
          ticket.subject,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Text(
          '#${ticket.id.substring(0, 8)} • ${timeago.format(ticket.lastUpdate, locale: 'en_short')}',
        ),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: ticket.status.color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            ticket.status.label,
            style: AppTypography.caption.copyWith(
              color: ticket.status.color,
              fontWeight: AppTypography.bold,
            ),
          ),
        ),
        onTap: () => context.push('/dashboard/support/chat', extra: ticket),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final String count;
  final Color color;

  const _StatCard({
    required this.label,
    required this.count,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Column(
        children: [
          Text(count, style: AppTypography.h2.copyWith(color: color)),
          const SizedBox(height: 4),
          Text(label, style: AppTypography.caption),
        ],
      ),
    );
  }
}
