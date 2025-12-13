import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/occurrences/domain/occurrence_model.dart';
import 'package:soloforte_app/shared/widgets/primary_button.dart';

class OccurrenceDetailScreen extends StatelessWidget {
  final String occurrenceId;

  // Mock data fetching based on ID would happen here
  // For now we use a static mock object for demonstration
  final Occurrence occurrence = Occurrence(
    id: '1',
    title: 'Lagarta na Soja',
    description:
        'Infestação severa na borda leste. Desfolha estimada em 30%. Recomenda-se aplicação imediata de inseticida.',
    type: 'pest',
    severity: 0.85,
    areaName: 'Talhão Norte',
    date: DateTime.now().subtract(const Duration(hours: 2)),
    status: 'active',
    imageUrl:
        'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=600&auto=format&fit=crop',
    latitude: -23.5505,
    longitude: -46.6333,
  );

  OccurrenceDetailScreen({super.key, required this.occurrenceId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Detalhes'),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert)),
        ],
      ),
      body: SingleChildScrollView(
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
                          color: AppColors.error,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(occurrence.title, style: AppTypography.h2),
                ],
              ),
            ),

            // Image Gallery (Mock)
            SizedBox(
              height: 250,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _ImageCard(occurrence.imageUrl),
                  const SizedBox(width: 8),
                  const _ImageCard(
                    'https://plus.unsplash.com/premium_photo-1661962360809-548de84dfb50?q=80&w=200&auto=format&fit=crop',
                  ),
                  const SizedBox(width: 8),
                  _AddPhotoCard(),
                ],
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
                        valueColor: AppColors.error,
                      ),
                      const SizedBox(height: 8),
                      _InfoRow(label: 'Área', value: occurrence.areaName),
                      const SizedBox(height: 8),
                      _InfoRow(
                        label: 'Localização',
                        value:
                            '${occurrence.latitude}, ${occurrence.longitude}',
                      ),
                      const SizedBox(height: 8),
                      _InfoRow(label: 'Registrado por', value: 'João Silva'),
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

            // Actions Taken Timeline (Mock)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Ações Tomadas (2)', style: AppTypography.h4),
                  const SizedBox(height: 16),
                  _TimelineItem(
                    date: '28/Out 15:00',
                    title: 'Aplicação Inseticida',
                    subtitle: 'Produto XYZ (2L/ha)',
                  ),
                  _TimelineItem(
                    date: '29/Out 09:00',
                    title: 'Follow-up',
                    subtitle: 'Melhora observada na borda.',
                    isLast: true,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),

            // Map Button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: PrimaryButton(
                text: 'Ver no Mapa',
                onPressed: () {},
                icon: Icons.map,
                backgroundColor: Colors.white,
                textColor: AppColors.primary,
                borderColor: AppColors.primary,
              ),
            ),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: PrimaryButton(
                text: 'Marcar como Resolvida',
                onPressed: () {},
                icon: Icons.check,
                backgroundColor: AppColors.success,
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
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
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: Image.network(
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
      ),
    );
  }
}

class _AddPhotoCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: Colors.grey.shade300,
          style: BorderStyle.solid,
        ),
      ),
      child: const Center(child: Icon(Icons.add_a_photo, color: Colors.grey)),
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
