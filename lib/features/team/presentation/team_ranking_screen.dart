import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/team/domain/team_member_model.dart';
import 'package:soloforte_app/features/team/presentation/team_controller.dart';
import 'package:go_router/go_router.dart';

class TeamRankingScreen extends ConsumerWidget {
  const TeamRankingScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final teamState = ref.watch(teamControllerProvider);

    // Sort Members by XP (Highest to Lowest)
    final sortedMembers = List<TeamMember>.from(teamState.allMembers)
      ..sort(
        (a, b) => b.stats.experiencePoints.compareTo(a.stats.experiencePoints),
      );

    if (sortedMembers.isEmpty) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final top3 = sortedMembers.take(3).toList();
    final rest = sortedMembers.skip(3).toList();

    return Scaffold(
      backgroundColor: Colors.grey[50], // Light background
      appBar: AppBar(
        title: const Text('Ranking & Gamificação'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 16),
            _buildPodium(context, top3),
            const SizedBox(height: 24),
            _buildLeaderboardHeader(),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: rest.length,
              itemBuilder: (context, index) {
                final member = rest[index];
                return _buildLeaderboardItem(context, member, index + 4);
              },
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildPodium(BuildContext context, List<TeamMember> topMembers) {
    if (topMembers.isEmpty) return const SizedBox.shrink();

    return SizedBox(
      height: 280,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (topMembers.length >= 2)
            _buildPodiumPlace(context, topMembers[1], 2),
          _buildPodiumPlace(context, topMembers[0], 1),
          if (topMembers.length >= 3)
            _buildPodiumPlace(context, topMembers[2], 3),
        ],
      ),
    );
  }

  Widget _buildPodiumPlace(BuildContext context, TeamMember member, int place) {
    final isFirst = place == 1;
    final size = isFirst ? 110.0 : 80.0;
    final height = isFirst ? 160.0 : 120.0;
    final color = isFirst
        ? AppColors.primary
        : (place == 2 ? Colors.blueGrey : Colors.orangeAccent);
    final placeLabel = place == 1 ? '1º' : (place == 2 ? '2º' : '3º');

    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Stack(
          alignment: Alignment.topRight,
          children: [
            GestureDetector(
              onTap: () => context.push('/dashboard/team/${member.id}'),
              child: CircleAvatar(
                radius: size / 2,
                backgroundImage: member.avatarUrl != null
                    ? NetworkImage(member.avatarUrl!)
                    : null,
                child: member.avatarUrl == null
                    ? Text(member.name[0], style: TextStyle(fontSize: size / 3))
                    : null,
              ),
            ),
            if (place == 1)
              const Positioned(
                right: 0,
                child: CircleAvatar(
                  backgroundColor: Colors.amber,
                  radius: 14,
                  child: Icon(
                    Icons.emoji_events,
                    size: 16,
                    color: Colors.white,
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(height: 8),
        Text(
          member.name.split(' ')[0],
          style: AppTypography.h3.copyWith(fontSize: isFirst ? 18 : 16),
        ),
        Text(
          '${member.stats.experiencePoints} XP',
          style: AppTypography.caption,
        ),
        const SizedBox(height: 8),
        Container(
          width: size,
          height: height * 0.6,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [color.withOpacity(0.8), color],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
          ),
          alignment: Alignment.center,
          child: Text(
            placeLabel,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildLeaderboardHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Row(
        children: [
          Text('CLASSIFICAÇÃO GERAL', style: AppTypography.label),
          const Spacer(),
          Text('XP TOTAL', style: AppTypography.label),
        ],
      ),
    );
  }

  Widget _buildLeaderboardItem(
    BuildContext context,
    TeamMember member,
    int rank,
  ) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 24,
              child: Text(
                '#$rank',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.grey,
                ),
              ),
            ),
            const SizedBox(width: 8),
            CircleAvatar(
              backgroundImage: member.avatarUrl != null
                  ? NetworkImage(member.avatarUrl!)
                  : null,
              child: member.avatarUrl == null ? Text(member.name[0]) : null,
            ),
          ],
        ),
        title: Text(
          member.name,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Row(
          children: [
            Text('Nível ${member.stats.level}'),
            const SizedBox(width: 8),
            ...member.stats.badges.take(3).map((b) => _buildBadgeIcon(b)),
          ],
        ),
        trailing: Text(
          '${member.stats.experiencePoints}',
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: AppColors.primary,
          ),
        ),
        onTap: () => context.push('/dashboard/team/${member.id}'),
      ),
    );
  }

  Widget _buildBadgeIcon(String badgeName) {
    // Map badge strings to icons/colors
    IconData iconData = Icons.star;
    Color color = Colors.amber;

    if (badgeName.contains('visitas')) {
      iconData = Icons.place;
      color = Colors.blue;
    } else if (badgeName.contains('lider')) {
      iconData = Icons.workspace_premium;
      color = Colors.purple;
    } else if (badgeName.contains('focado')) {
      iconData = Icons.center_focus_strong;
      color = Colors.red;
    }

    return Padding(
      padding: const EdgeInsets.only(right: 4.0),
      child: Icon(iconData, size: 16, color: color),
    );
  }
}
