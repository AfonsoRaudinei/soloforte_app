import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/team/domain/team_member_model.dart';
import 'package:soloforte_app/features/team/presentation/team_controller.dart';
import 'package:soloforte_app/shared/widgets/custom_text_input.dart';
import 'package:go_router/go_router.dart';

class TeamListScreen extends ConsumerWidget {
  const TeamListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final teamState = ref.watch(teamControllerProvider);
    final controller = ref.read(teamControllerProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Gestão de Equipes'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.map),
            onPressed: () {
              context.push('/dashboard/team/map');
            },
          ),
          IconButton(
            icon: const Icon(Icons.leaderboard, color: Colors.orange),
            onPressed: () => context.push('/dashboard/team/ranking'),
            tooltip: 'Ranking',
          ),
          IconButton(
            icon: const Icon(Icons.chat_bubble),
            onPressed: () => context.push('/dashboard/team/chat'),
            tooltip: 'Chat da Equipe',
          ),
          IconButton(
            icon: const Icon(Icons.person_add),
            onPressed: () {
              // Add Member (Future implementation)
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Filters & Search
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: Column(
              children: [
                CustomTextInput(
                  label: '',
                  hint: 'Buscar membro...',
                  prefixIcon: Icons.search,
                  onChanged: controller.setSearchQuery,
                ),
                const SizedBox(height: 12),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(right: 8.0),
                        child: FilterChip(
                          label: const Text('Todos'),
                          selected: teamState.statusFilter == null,
                          onSelected: (val) {
                            if (val) controller.setStatusFilter(null);
                          },
                        ),
                      ),
                      ...TeamMemberStatus.values.map((status) {
                        return Padding(
                          padding: const EdgeInsets.only(right: 8.0),
                          child: FilterChip(
                            label: Text(_getStatusLabel(status)),
                            selected: teamState.statusFilter == status,
                            onSelected: (val) {
                              controller.setStatusFilter(val ? status : null);
                            },
                            backgroundColor: _getStatusColor(
                              status,
                            ).withOpacity(0.1),
                            labelStyle: TextStyle(
                              color: _getStatusColor(status),
                              fontWeight: FontWeight.bold,
                            ),
                            selectedColor: _getStatusColor(
                              status,
                            ).withOpacity(0.2),
                          ),
                        );
                      }),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // List
          Expanded(
            child: teamState.isLoading
                ? const Center(child: CircularProgressIndicator())
                : teamState.filteredMembers.isEmpty
                ? Center(
                    child: Text(
                      'Nenhum membro encontrado',
                      style: AppTypography.bodyLarge,
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: teamState.filteredMembers.length,
                    itemBuilder: (context, index) {
                      final member = teamState.filteredMembers[index];
                      return _TeamMemberCard(member: member);
                    },
                  ),
          ),
        ],
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
}

class _TeamMemberCard extends StatelessWidget {
  final TeamMember member;

  const _TeamMemberCard({required this.member});

  @override
  Widget build(BuildContext context) {
    final statusColor = _getStatusColor(member.status);

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        contentPadding: const EdgeInsets.all(12),
        leading: Stack(
          children: [
            CircleAvatar(
              radius: 28,
              backgroundImage: member.avatarUrl != null
                  ? NetworkImage(member.avatarUrl!)
                  : null,
              child: member.avatarUrl == null
                  ? Text(member.name[0], style: const TextStyle(fontSize: 20))
                  : null,
            ),
            Positioned(
              bottom: 0,
              right: 0,
              child: Container(
                width: 14,
                height: 14,
                decoration: BoxDecoration(
                  color: statusColor,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 2),
                ),
              ),
            ),
          ],
        ),
        title: Text(
          member.name,
          style: AppTypography.bodyLarge.copyWith(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              _getRoleLabel(member.role),
              style: AppTypography.caption.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
            if (member.status == TeamMemberStatus.inField &&
                member.lastLocation != null)
              Padding(
                padding: const EdgeInsets.only(top: 4.0),
                child: Row(
                  children: [
                    const Icon(
                      Icons.location_on,
                      size: 12,
                      color: AppColors.primary,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      'Última ativ: ${_formatTime(member.lastLocation!.lastUpdate)}',
                      style: AppTypography.caption,
                    ),
                  ],
                ),
              ),
          ],
        ),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {
          context.push('/dashboard/team/${member.id}');
        },
      ),
    );
  }

  String _formatTime(DateTime date) {
    return "${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}";
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
}
