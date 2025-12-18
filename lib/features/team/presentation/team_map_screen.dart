import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/team/domain/team_member_model.dart';
import 'package:soloforte_app/features/team/presentation/team_controller.dart';
import 'package:go_router/go_router.dart';

class TeamMapScreen extends ConsumerStatefulWidget {
  const TeamMapScreen({super.key});

  @override
  ConsumerState<TeamMapScreen> createState() => _TeamMapScreenState();
}

class _TeamMapScreenState extends ConsumerState<TeamMapScreen> {
  final MapController _mapController = MapController();

  @override
  Widget build(BuildContext context) {
    final teamState = ref.watch(teamControllerProvider);
    final membersWithLocation = teamState.allMembers
        .where((m) => m.lastLocation != null)
        .toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Rastreamento de Equipe'),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: const LatLng(-23.550520, -46.633308), // Default SP
              initialZoom: 13.0,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.soloforte.app',
              ),
              MarkerLayer(
                markers: membersWithLocation.map((member) {
                  return Marker(
                    point: LatLng(
                      member.lastLocation!.latitude,
                      member.lastLocation!.longitude,
                    ),
                    width: 50,
                    height: 50,
                    child: GestureDetector(
                      onTap: () => _showMemberInfoSheet(context, member),
                      child: _buildMemberMarker(member),
                    ),
                  );
                }).toList(),
              ),
            ],
          ),
          Positioned(bottom: 24, left: 16, right: 16, child: _buildLegend()),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Recenter on all markers or user location
        },
        child: const Icon(Icons.my_location),
      ),
    );
  }

  Widget _buildMemberMarker(TeamMember member) {
    final statusColor = _getStatusColor(member.status);
    return Stack(
      children: [
        Align(
          alignment: Alignment.topCenter,
          child: Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.white,
              border: Border.all(color: statusColor, width: 3),
              boxShadow: const [
                BoxShadow(
                  color: Colors.black26,
                  blurRadius: 4,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            child: CircleAvatar(
              radius: 18,
              backgroundImage: member.avatarUrl != null
                  ? NetworkImage(member.avatarUrl!)
                  : null,
              child: member.avatarUrl == null ? Text(member.name[0]) : null,
            ),
          ),
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
            decoration: BoxDecoration(
              color: statusColor,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(
              member.name.split(" ")[0], // First name only
              style: const TextStyle(
                color: Colors.white,
                fontSize: 10,
                fontWeight: FontWeight.bold,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildLegend() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildLegendItem('Online', Colors.green),
            _buildLegendItem('Campo', Colors.blue),
            _buildLegendItem('Ocupado', Colors.red),
            _buildLegendItem('Offline', Colors.grey),
          ],
        ),
      ),
    );
  }

  Widget _buildLegendItem(String label, Color color) {
    return Row(
      children: [
        CircleAvatar(radius: 4, backgroundColor: color),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
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

  void _showMemberInfoSheet(BuildContext context, TeamMember member) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: CircleAvatar(
                  backgroundImage: member.avatarUrl != null
                      ? NetworkImage(member.avatarUrl!)
                      : null,
                  child: member.avatarUrl == null ? Text(member.name[0]) : null,
                ),
                title: Text(member.name, style: AppTypography.h3),
                subtitle: Text(member.email),
                trailing: IconButton(
                  icon: const Icon(Icons.info_outline),
                  onPressed: () {
                    Navigator.pop(context);
                    context.push('/dashboard/team/${member.id}');
                  },
                ),
              ),
              const Divider(),
              if (member.lastLocation != null)
                ListTile(
                  leading: const Icon(
                    Icons.location_on,
                    color: AppColors.primary,
                  ),
                  title: Text(
                    'Lat: ${member.lastLocation!.latitude.toStringAsFixed(4)}, Long: ${member.lastLocation!.longitude.toStringAsFixed(4)}',
                  ),
                  subtitle: Text(
                    'Bateria: ${member.lastLocation!.batteryLevel}%',
                  ),
                ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    // Action
                  },
                  child: const Text('Entrar em contato'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
