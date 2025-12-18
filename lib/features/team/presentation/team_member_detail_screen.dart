import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/team/domain/team_member_model.dart';
import 'package:soloforte_app/features/team/presentation/team_controller.dart';

import 'package:intl/intl.dart';
import 'package:go_router/go_router.dart';

class TeamMemberDetailScreen extends ConsumerWidget {
  final String memberId;

  const TeamMemberDetailScreen({super.key, required this.memberId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final teamState = ref.watch(teamControllerProvider);

    // Find member in state or fetch (mock fetch from state for now)
    final member = teamState.allMembers.firstWhere(
      (m) => m.id == memberId,
      orElse: () => throw Exception('Member not found'),
    );

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          _buildSliverAppBar(context, member),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildStatusSection(member),
                  const SizedBox(height: 24),
                  _buildStatsGrid(member),
                  const SizedBox(height: 24),
                  _buildLocationSection(member),
                  const SizedBox(height: 24),
                  _buildActionButtons(context, member),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSliverAppBar(BuildContext context, TeamMember member) {
    return SliverAppBar(
      expandedHeight: 200.0,
      floating: false,
      pinned: true,
      backgroundColor: AppColors.primary,
      flexibleSpace: FlexibleSpaceBar(
        title: Text(
          member.name,
          style: const TextStyle(color: Colors.white, fontSize: 16),
        ),
        background: Stack(
          fit: StackFit.expand,
          children: [
            // Background Image or Pattern
            Container(color: AppColors.primary),
            Center(
              child: CircleAvatar(
                radius: 50,
                backgroundImage: member.avatarUrl != null
                    ? NetworkImage(member.avatarUrl!)
                    : null,
                child: member.avatarUrl == null
                    ? Text(member.name[0], style: const TextStyle(fontSize: 40))
                    : null,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusSection(TeamMember member) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: _getStatusColor(member.status).withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.circle,
                color: _getStatusColor(member.status),
                size: 16,
              ),
            ),
            const SizedBox(width: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Status Atual', style: AppTypography.caption),
                Text(
                  _getStatusLabel(member.status),
                  style: AppTypography.h3.copyWith(
                    color: _getStatusColor(member.status),
                  ),
                ),
              ],
            ),
            const Spacer(),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text('Cargo', style: AppTypography.caption),
                Text(
                  _getRoleLabel(member.role),
                  style: AppTypography.bodyLarge.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatsGrid(TeamMember member) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Desempenho (Mês Atual)', style: AppTypography.h3),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _buildStatCard(
                'Visitas',
                '${member.stats.visitsThisMonth}',
                Icons.place,
                Colors.blue,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildStatCard(
                'Avaliação',
                member.stats.averageRating.toStringAsFixed(1),
                Icons.star,
                Colors.amber,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _buildStatCard(
                'Relatórios',
                '${member.stats.reportsSubmitted}',
                Icons.description,
                Colors.purple,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildStatCard(
                'Tickets',
                '${member.stats.activeTickets}',
                Icons.confirmation_number,
                Colors.redAccent,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatCard(
    String title,
    String value,
    IconData icon,
    Color color,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 28),
          const SizedBox(height: 12),
          Text(value, style: AppTypography.h2),
          Text(title, style: AppTypography.caption),
        ],
      ),
    );
  }

  Widget _buildLocationSection(TeamMember member) {
    if (member.lastLocation == null) {
      return const SizedBox.shrink();
    }

    final loc = member.lastLocation!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Localização Recente', style: AppTypography.h3),
        const SizedBox(height: 8),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Row(
                  children: [
                    const Icon(Icons.location_on, color: AppColors.primary),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Lat: ${loc.latitude.toStringAsFixed(4)}, Long: ${loc.longitude.toStringAsFixed(4)}',
                        style: AppTypography.bodyMedium,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Atualizado: ${DateFormat('HH:mm').format(loc.lastUpdate)}',
                      style: AppTypography.caption,
                    ),
                    Row(
                      children: [
                        Icon(
                          Icons.battery_std,
                          size: 16,
                          color: _getBatteryColor(loc.batteryLevel),
                        ),
                        Text(
                          '${loc.batteryLevel}%',
                          style: AppTypography.caption,
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildActionButtons(BuildContext context, TeamMember member) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () => _showTaskAssignmentModal(context, member),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              padding: const EdgeInsets.all(16),
            ),
            child: const Text(
              'ATRIBUIR TAREFA',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {
                  // Message logic
                },
                icon: const Icon(Icons.chat_bubble_outline),
                label: const Text('Mensagem'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {
                  // Call logic
                },
                icon: const Icon(Icons.phone),
                label: const Text('Ligar'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: TextButton.icon(
            onPressed: () {
              context.push(
                '/dashboard/team/${member.id}/history',
                extra: {'name': member.name},
              );
            },
            icon: const Icon(Icons.history),
            label: const Text('Ver Histórico de Trajeto'),
          ),
        ),
      ],
    );
  }

  void _showTaskAssignmentModal(BuildContext context, TeamMember member) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom + 20,
          top: 20,
          left: 20,
          right: 20,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Nova Tarefa para ${member.name.split(" ")[0]}',
              style: AppTypography.h3,
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'Título da Tarefa',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'Descrição',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              decoration: const InputDecoration(
                labelText: 'Prioridade',
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(value: 'low', child: Text('Baixa')),
                DropdownMenuItem(value: 'normal', child: Text('Normal')),
                DropdownMenuItem(value: 'high', child: Text('Alta')),
                DropdownMenuItem(value: 'urgent', child: Text('Urgente')),
              ],
              onChanged: (val) {},
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Tarefa atribuída a ${member.name}!'),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  padding: const EdgeInsets.all(16),
                ),
                child: const Text(
                  'CONFIRMAR ATRIBUIÇÃO',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getStatusLabel(TeamMemberStatus status) {
    switch (status) {
      case TeamMemberStatus.online:
        return 'Online';
      case TeamMemberStatus.inField:
        return 'Em Campo';
      case TeamMemberStatus.offline:
        return 'Offline';
      case TeamMemberStatus.busy:
        return 'Ocupado';
    }
  }

  Color _getStatusColor(TeamMemberStatus status) {
    switch (status) {
      case TeamMemberStatus.online:
        return Colors.green;
      case TeamMemberStatus.inField:
        return Colors.blue;
      case TeamMemberStatus.offline:
        return Colors.grey;
      case TeamMemberStatus.busy:
        return Colors.red;
    }
  }

  String _getRoleLabel(TeamMemberRole role) {
    switch (role) {
      case TeamMemberRole.manager:
        return 'Gerente';
      case TeamMemberRole.agronomist:
        return 'Agrônomo';
      case TeamMemberRole.technician:
        return 'Técnico';
      case TeamMemberRole.admin:
        return 'Admin';
    }
  }

  Color _getBatteryColor(int level) {
    if (level > 20) return Colors.green;
    return Colors.red;
  }
}
