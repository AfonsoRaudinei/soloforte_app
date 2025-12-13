import 'package:flutter/material.dart';

import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/occurrences/domain/occurrence_model.dart';
import 'package:soloforte_app/shared/widgets/app_card.dart';
import 'package:soloforte_app/shared/widgets/custom_text_input.dart';

class OccurrenceListScreen extends StatefulWidget {
  const OccurrenceListScreen({super.key});

  @override
  State<OccurrenceListScreen> createState() => _OccurrenceListScreenState();
}

class _OccurrenceListScreenState extends State<OccurrenceListScreen> {
  final TextEditingController _searchController = TextEditingController();

  // Mock Data
  final List<Occurrence> _occurrences = [
    Occurrence(
      id: '1',
      title: 'Lagarta na Soja',
      description: 'Infestação severa na borda leste.',
      type: 'pest',
      severity: 0.85,
      areaName: 'Talhão Norte',
      date: DateTime.now().subtract(const Duration(hours: 2)),
      status: 'active',
      imageUrl:
          'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=200&auto=format&fit=crop',
      latitude: -23.5505,
      longitude: -46.6333,
    ),
    Occurrence(
      id: '2',
      title: 'Ferrugem Asiática',
      description: 'Primeiros sinais detectados.',
      type: 'disease',
      severity: 0.60,
      areaName: 'Lavoura Sul',
      date: DateTime.now().subtract(const Duration(days: 1)),
      status: 'monitoring',
      imageUrl:
          'https://plus.unsplash.com/premium_photo-1661962360809-548de84dfb50?q=80&w=200&auto=format&fit=crop',
      latitude: -23.5505,
      longitude: -46.6333,
    ),
    Occurrence(
      id: '3',
      title: 'Falta de Nitrogênio',
      description: 'Folhas amareladas no centro da área.',
      type: 'deficiency',
      severity: 0.40,
      areaName: 'Área Teste',
      date: DateTime.now().subtract(const Duration(days: 3)),
      status: 'resolved',
      imageUrl:
          'https://images.unsplash.com/photo-1592864696472-3c139db08c3e?q=80&w=200&auto=format&fit=crop',
      latitude: -23.5505,
      longitude: -46.6333,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text('Ocorrências'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              // Navigate to New Occurrence
              // context.go('/dashboard/occurrences/new');
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Nova Ocorrência (Mock)')),
              );
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Filters
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _FilterChip(label: 'Todas', isSelected: true),
                  const SizedBox(width: 8),
                  _FilterChip(label: 'Ativas', isSelected: false),
                  const SizedBox(width: 8),
                  _FilterChip(label: 'Monitorando', isSelected: false),
                  const SizedBox(width: 8),
                  _FilterChip(label: 'Resolvidas', isSelected: false),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Search
            CustomTextInput(
              controller: _searchController,
              label: '',
              hint: 'Buscar ocorrências...',
              prefixIcon: Icons.search,
            ),
            const SizedBox(height: 16),

            // List
            Expanded(
              child: ListView.builder(
                itemCount: _occurrences.length,
                itemBuilder: (context, index) {
                  final occurrence = _occurrences[index];
                  return _OccurrenceCard(occurrence: occurrence);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool isSelected;

  const _FilterChip({required this.label, required this.isSelected});

  @override
  Widget build(BuildContext context) {
    return Chip(
      label: Text(
        label,
        style: TextStyle(
          color: isSelected ? Colors.white : AppColors.textPrimary,
        ),
      ),
      backgroundColor: isSelected ? AppColors.primary : Colors.white,
      side: isSelected ? BorderSide.none : const BorderSide(color: Colors.grey),
    );
  }
}

class _OccurrenceCard extends StatelessWidget {
  final Occurrence occurrence;

  const _OccurrenceCard({required this.occurrence});

  Color _getStatusColor(String status) {
    switch (status) {
      case 'active':
        return AppColors.error;
      case 'monitoring':
        return AppColors.warning;
      case 'resolved':
        return AppColors.success;
      default:
        return Colors.grey;
    }
  }

  String _getStatusLabel(String status) {
    switch (status) {
      case 'active':
        return 'ATIVA';
      case 'monitoring':
        return 'MONITORANDO';
      case 'resolved':
        return 'RESOLVIDA';
      default:
        return status.toUpperCase();
    }
  }

  IconData _getTypeIcon(String type) {
    switch (type) {
      case 'pest':
        return Icons.bug_report;
      case 'disease':
        return Icons.coronavirus;
      case 'deficiency':
        return Icons.spa;
      default:
        return Icons.warning;
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppCard(
      margin: const EdgeInsets.only(bottom: 16),
      onTap: () {
        // Navigate to details
        // context.go('/dashboard/occurrences/${occurrence.id}');
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Detalhes (Mock)')));
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Type Icon
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  _getTypeIcon(occurrence.type),
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 12),

              // Title & Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(occurrence.title, style: AppTypography.h4),
                    const SizedBox(height: 4),
                    Text(
                      '📍 ${occurrence.areaName}',
                      style: AppTypography.bodySmall,
                    ),
                    Text(
                      '🕐 há ${_getRelativeTime(occurrence.date)}',
                      style: AppTypography.bodySmall.copyWith(
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),

              // Status Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: _getStatusColor(
                    occurrence.status,
                  ).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: _getStatusColor(occurrence.status)),
                ),
                child: Text(
                  _getStatusLabel(occurrence.status),
                  style: AppTypography.caption.copyWith(
                    color: _getStatusColor(occurrence.status),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(),
          const SizedBox(height: 8),

          // Severity Bar
          Row(
            children: [
              Text('Severidade:', style: AppTypography.caption),
              const SizedBox(width: 8),
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: occurrence.severity,
                    backgroundColor: Colors.grey[200],
                    valueColor: AlwaysStoppedAnimation<Color>(
                      occurrence.severity > 0.7
                          ? AppColors.error
                          : (occurrence.severity > 0.4
                                ? AppColors.warning
                                : AppColors.success),
                    ),
                    minHeight: 8,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '${(occurrence.severity * 100).toInt()}%',
                style: AppTypography.caption.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _getRelativeTime(DateTime date) {
    final diff = DateTime.now().difference(date);
    if (diff.inDays > 0) return '${diff.inDays} dias atrás';
    if (diff.inHours > 0) return '${diff.inHours} horas atrás';
    return '${diff.inMinutes} min atrás';
  }
}
