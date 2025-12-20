import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/occurrences/presentation/providers/occurrence_detail_provider.dart';
import 'package:soloforte_app/features/occurrences/presentation/providers/occurrence_controller.dart';
import 'package:soloforte_app/features/occurrences/domain/entities/occurrence.dart';
import 'package:soloforte_app/shared/widgets/primary_button.dart';
import 'package:go_router/go_router.dart';
import 'package:latlong2/latlong.dart';
import 'package:share_plus/share_plus.dart';
import 'dart:io';

class OccurrenceDetailScreen extends ConsumerWidget {
  final String occurrenceId;
  const OccurrenceDetailScreen({super.key, required this.occurrenceId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final occurrenceAsync = ref.watch(occurrenceDetailProvider(occurrenceId));

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Detalhes'),
        actions: [
          if (occurrenceAsync.asData?.value != null)
            PopupMenuButton<String>(
              onSelected: (value) => _handleAction(
                context,
                ref,
                value,
                occurrenceAsync.asData!.value!,
              ),
              itemBuilder: (context) => [
                const PopupMenuItem(
                  value: 'edit',
                  child: Row(
                    children: [
                      Icon(Icons.edit, size: 20),
                      SizedBox(width: 8),
                      Text('Editar'),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'share',
                  child: Row(
                    children: [
                      Icon(Icons.share, size: 20),
                      SizedBox(width: 8),
                      Text('Compartilhar'),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'delete',
                  child: Row(
                    children: [
                      Icon(Icons.delete, size: 20, color: Colors.red),
                      SizedBox(width: 8),
                      Text('Excluir', style: TextStyle(color: Colors.red)),
                    ],
                  ),
                ),
              ],
            ),
        ],
      ),
      body: occurrenceAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) =>
            Center(child: Text('Erro: $err', style: AppTypography.bodyMedium)),
        data: (occurrence) {
          if (occurrence == null) {
            return const Center(child: Text('Ocorrência não encontrada'));
          }

          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.primary.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              occurrence.type.toUpperCase(),
                              style: AppTypography.caption.copyWith(
                                color: AppColors.primary,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          const Spacer(),
                          Text(
                            'Severidade: ${(occurrence.severity * 100).toInt()}%',
                            style: AppTypography.h4.copyWith(
                              color: _getSeverityColor(occurrence.severity),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(occurrence.title, style: AppTypography.h2),
                    ],
                  ),
                ),

                // Image Gallery
                if (occurrence.images.isNotEmpty)
                  SizedBox(
                    height: 250,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      children: [
                        ...occurrence.images.map(
                          (url) => Padding(
                            padding: const EdgeInsets.only(right: 8),
                            child: _ImageCard(url),
                          ),
                        ),
                        // Only show Add Photo if needed
                        // _AddPhotoCard(),
                      ],
                    ),
                  )
                else
                  Container(
                    height: 200,
                    margin: const EdgeInsets.symmetric(horizontal: 16),
                    decoration: BoxDecoration(
                      color: Colors.grey[100],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.image_not_supported,
                            size: 48,
                            color: Colors.grey[400],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Sem fotos registradas',
                            style: AppTypography.bodySmall,
                          ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Info Section
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Card(
                    elevation: 0,
                    color: Colors.grey[50],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: BorderSide(color: Colors.grey.shade200),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        children: [
                          _InfoRow(
                            label: 'Status',
                            value: occurrence.status.toUpperCase(),
                            valueColor: _getStatusColor(occurrence.status),
                          ),
                          const SizedBox(height: 8),
                          _InfoRow(label: 'Área', value: occurrence.areaName),
                          const SizedBox(height: 8),
                          _InfoRow(
                            label: 'Localização',
                            value:
                                '${occurrence.latitude.toStringAsFixed(4)}, ${occurrence.longitude.toStringAsFixed(4)}',
                          ),
                          if (occurrence.assignedTo != null) ...[
                            const SizedBox(height: 8),
                            _InfoRow(
                              label: 'Atribuído a',
                              value: occurrence.assignedTo!,
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Description
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Descrição', style: AppTypography.h4),
                      const SizedBox(height: 8),
                      Text(
                        occurrence.description,
                        style: AppTypography.bodyMedium.copyWith(
                          color: Colors.grey[700],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Timeline
                if (occurrence.timeline.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Histórico (${occurrence.timeline.length})',
                          style: AppTypography.h4,
                        ),
                        const SizedBox(height: 16),
                        ...occurrence.timeline.asMap().entries.map((entry) {
                          final index = entry.key;
                          final event = entry.value;
                          return _TimelineItem(
                            date:
                                '${event.date.day}/${event.date.month} ${event.date.hour}:${event.date.minute}',
                            title: event.title,
                            subtitle: event.description,
                            isLast: index == occurrence.timeline.length - 1,
                          );
                        }),
                      ],
                    ),
                  ),

                const SizedBox(height: 32),

                // Actions
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Column(
                    children: [
                      PrimaryButton(
                        text: 'Ver no Mapa',
                        onPressed: () {
                          context.push(
                            '/dashboard/map',
                            extra: LatLng(
                              occurrence.latitude,
                              occurrence.longitude,
                            ),
                          );
                        },
                        icon: Icons.map,
                        backgroundColor: Colors.white,
                        textColor: AppColors.primary,
                        borderColor: AppColors.primary,
                      ),
                      const SizedBox(height: 12),
                      if (occurrence.status != 'resolved')
                        PrimaryButton(
                          text: 'Marcar como Resolvida',
                          onPressed: () async {
                            final updated = occurrence.copyWith(
                              status: 'resolved',
                            );
                            await ref
                                .read(occurrenceControllerProvider.notifier)
                                .updateOccurrence(updated);
                            if (context.mounted) {
                              context.pop();
                            }
                          },
                          icon: Icons.check,
                          backgroundColor: AppColors.success,
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          );
        },
      ),
    );
  }

  Color _getSeverityColor(double severity) {
    if (severity > 0.7) return AppColors.error;
    if (severity > 0.4) return AppColors.warning;
    return AppColors.success;
  }

  Color _getStatusColor(String status) {
    if (status == 'active') return AppColors.error;
    if (status == 'monitoring') return AppColors.warning;
    if (status == 'resolved') return AppColors.success;
    return Colors.grey;
  }

  Future<void> _handleAction(
    BuildContext context,
    WidgetRef ref,
    String value,
    Occurrence occurrence,
  ) async {
    switch (value) {
      case 'edit':
        context.push('/occurrences/edit', extra: occurrence);
        break;
      case 'share':
        Share.share(
          'Ocorrência: ${occurrence.title}\n'
          'Tipo: ${occurrence.type}\n'
          'Severidade: ${(occurrence.severity * 100).toInt()}%\n'
          'Status: ${occurrence.status}\n'
          'Descrição: ${occurrence.description}',
        );
        break;
      case 'delete':
        final confirm = await showDialog<bool>(
          context: context,
          builder: (ctx) => AlertDialog(
            title: const Text('Excluir Ocorrência'),
            content: const Text(
              'Tem certeza que deseja excluir esta ocorrência?',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx, false),
                child: const Text('Cancelar'),
              ),
              TextButton(
                onPressed: () => Navigator.pop(ctx, true),
                child: const Text(
                  'Excluir',
                  style: TextStyle(color: Colors.red),
                ),
              ),
            ],
          ),
        );

        if (confirm == true) {
          await ref
              .read(occurrenceControllerProvider.notifier)
              .deleteOccurrence(occurrence.id);
          if (context.mounted) {
            context.pop(); // Close detail screen
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Ocorrência excluída.')),
            );
          }
        }
        break;
    }
  }
}

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;
  final Color? valueColor;

  const _InfoRow({required this.label, required this.value, this.valueColor});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: AppTypography.bodyMedium.copyWith(color: Colors.grey),
        ),
        Text(
          value,
          style: AppTypography.bodyMedium.copyWith(
            fontWeight: FontWeight.bold,
            color: valueColor ?? AppColors.textPrimary,
          ),
        ),
      ],
    );
  }
}

class _ImageCard extends StatelessWidget {
  final String url;
  const _ImageCard(this.url);

  @override
  Widget build(BuildContext context) {
    bool isNetwork = url.startsWith('http') || url.startsWith('https');
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: isNetwork
          ? Image.network(
              url,
              width: 150,
              height: 200,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(
                width: 150,
                color: Colors.grey[200],
                child: const Center(
                  child: Icon(Icons.broken_image, color: Colors.grey),
                ),
              ),
            )
          : Image.file(
              File(url),
              width: 150,
              height: 200,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(
                width: 150,
                color: Colors.grey[200],
                child: const Center(
                  child: Icon(Icons.broken_image, color: Colors.grey),
                ),
              ),
            ),
    );
  }
}

class _TimelineItem extends StatelessWidget {
  final String date;
  final String title;
  final String subtitle;
  final bool isLast;

  const _TimelineItem({
    required this.date,
    required this.title,
    required this.subtitle,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 12,
              height: 12,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
            ),
            if (!isLast)
              Container(width: 2, height: 50, color: Colors.grey[300]),
          ],
        ),
        const SizedBox(width: 16),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              date,
              style: AppTypography.caption.copyWith(color: Colors.grey),
            ),
            Text(
              title,
              style: AppTypography.bodyMedium.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(subtitle, style: AppTypography.bodySmall),
            const SizedBox(height: 16),
          ],
        ),
      ],
    );
  }
}
