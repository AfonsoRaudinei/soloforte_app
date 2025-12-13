import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import '../../domain/area_model.dart';

class AreaCard extends StatelessWidget {
  final Area area;
  final VoidCallback? onTap;

  const AreaCard({super.key, required this.area, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 280,
        margin: EdgeInsets.only(right: AppSpacing.md),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(AppSpacing.radiusLg),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Miniatura/Preview
            Container(
              height: 120,
              decoration: BoxDecoration(
                color: _getStatusColor().withValues(alpha: 0.1),
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(AppSpacing.radiusLg),
                ),
              ),
              child: Stack(
                children: [
                  // Simplified polygon preview
                  Center(
                    child: CustomPaint(
                      size: const Size(100, 100),
                      painter: _PolygonPainter(
                        coordinates: area.coordinates,
                        color: _getStatusColor(),
                      ),
                    ),
                  ),

                  // Status badge
                  Positioned(
                    top: AppSpacing.sm,
                    right: AppSpacing.sm,
                    child: Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: AppSpacing.sm,
                        vertical: AppSpacing.xs,
                      ),
                      decoration: BoxDecoration(
                        color: _getStatusColor(),
                        borderRadius: BorderRadius.circular(
                          AppSpacing.radiusSm,
                        ),
                      ),
                      child: Text(
                        _getStatusLabel(),
                        style: AppTypography.caption.copyWith(
                          color: Colors.white,
                          fontWeight: AppTypography.bold,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Info
            Padding(
              padding: EdgeInsets.all(AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Nome
                  Text(
                    area.name,
                    style: AppTypography.h4,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: AppSpacing.xs),

                  // Cliente/Fazenda
                  Text(
                    '${area.clienteNome} • ${area.fazendaNome}',
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.textSecondary,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: AppSpacing.sm),

                  // Stats
                  Row(
                    children: [
                      // Hectares
                      Expanded(
                        child: _StatItem(
                          icon: Icons.crop_square,
                          label: '${area.hectares.toStringAsFixed(1)} ha',
                          color: AppColors.primary,
                        ),
                      ),

                      // NDVI
                      if (area.ndviAverage > 0)
                        Expanded(
                          child: _StatItem(
                            icon: Icons.eco,
                            label: area.ndviAverage.toStringAsFixed(2),
                            color: _getNdviColor(area.ndviAverage),
                          ),
                        ),

                      // Culture
                      if (area.culture != null)
                        Expanded(
                          child: _StatItem(
                            icon: Icons.grass,
                            label: area.culture!,
                            color: AppColors.success,
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor() {
    switch (area.status) {
      case 'active':
        return AppColors.success;
      case 'monitoring':
        return AppColors.warning;
      case 'inactive':
        return AppColors.gray400;
      default:
        return AppColors.primary;
    }
  }

  String _getStatusLabel() {
    switch (area.status) {
      case 'active':
        return 'Ativa';
      case 'monitoring':
        return 'Monitorando';
      case 'inactive':
        return 'Inativa';
      default:
        return area.status;
    }
  }

  Color _getNdviColor(double ndvi) {
    if (ndvi >= 0.6) return AppColors.success;
    if (ndvi >= 0.4) return AppColors.warning;
    return AppColors.error;
  }
}

class _StatItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;

  const _StatItem({
    required this.icon,
    required this.label,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16, color: color),
        SizedBox(width: AppSpacing.xs),
        Flexible(
          child: Text(
            label,
            style: AppTypography.caption.copyWith(
              color: color,
              fontWeight: AppTypography.medium,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}

class _PolygonPainter extends CustomPainter {
  final List<LatLng> coordinates;
  final Color color;

  _PolygonPainter({required this.coordinates, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    if (coordinates.isEmpty) return;

    final paint = Paint()
      ..color = color.withValues(alpha: 0.3)
      ..style = PaintingStyle.fill;

    final strokePaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    // Normalize coordinates to fit in canvas
    final path = Path();

    // Simple square representation for now
    path.moveTo(size.width * 0.2, size.height * 0.2);
    path.lineTo(size.width * 0.8, size.height * 0.2);
    path.lineTo(size.width * 0.8, size.height * 0.8);
    path.lineTo(size.width * 0.2, size.height * 0.8);
    path.close();

    canvas.drawPath(path, paint);
    canvas.drawPath(path, strokePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
