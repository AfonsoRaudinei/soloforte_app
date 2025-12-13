import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import '../../domain/visita_model.dart';

class VisitaTag extends StatelessWidget {
  final Visita visita;
  final VoidCallback? onTap;

  const VisitaTag({super.key, required this.visita, this.onTap});

  @override
  Widget build(BuildContext context) {
    final duration = DateTime.now().difference(visita.startTime);
    final hours = duration.inHours;
    final minutes = duration.inMinutes % 60;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: AppColors.success.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
          border: Border.all(color: AppColors.success),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.access_time, size: 16, color: AppColors.success),
            SizedBox(width: AppSpacing.xs),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  visita.fazendaNome,
                  style: AppTypography.caption.copyWith(
                    color: AppColors.success,
                    fontWeight: AppTypography.bold,
                  ),
                ),
                Text(
                  '${hours}h ${minutes}min',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.success,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
