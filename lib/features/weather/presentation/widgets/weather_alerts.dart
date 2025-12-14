import 'package:flutter/material.dart';
import '../../domain/weather_model.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:intl/intl.dart';

class WeatherAlertsWidget extends StatelessWidget {
  final List<WeatherAlert> alerts;

  const WeatherAlertsWidget({super.key, required this.alerts});

  @override
  Widget build(BuildContext context) {
    if (alerts.isEmpty) {
      return const SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          child: Row(
            children: [
              Icon(
                Icons.warning_amber_rounded,
                color: AppColors.error,
                size: 24,
              ),
              SizedBox(width: AppSpacing.sm),
              Text(
                'Alertas Meteorológicos (${alerts.length})',
                style: AppTypography.h3.copyWith(color: AppColors.error),
              ),
            ],
          ),
        ),
        SizedBox(height: AppSpacing.md),
        SizedBox(
          height: 140, // Height for horizontal scrolling alerts
          child: ListView.separated(
            padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
            scrollDirection: Axis.horizontal,
            itemCount: alerts.length,
            separatorBuilder: (_, __) => SizedBox(width: AppSpacing.md),
            itemBuilder: (context, index) {
              final alert = alerts[index];
              return _buildAlertCard(context, alert);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildAlertCard(BuildContext context, WeatherAlert alert) {
    Color cardColor;
    Color textColor;
    IconData icon;

    // Icon based on type
    switch (alert.type.toLowerCase()) {
      case 'storm':
        icon = Icons.thunderstorm;
        break;
      case 'heat':
        icon = Icons.local_fire_department;
        break;
      case 'cold':
      case 'frost':
        icon = Icons.ac_unit;
        break;
      case 'rain':
      case 'flood':
        icon = Icons.flood;
        break;
      case 'wind':
        icon = Icons.air;
        break;
      default:
        icon = Icons.warning;
    }

    // Color based on severity
    switch (alert.severity.toLowerCase()) {
      case 'extreme':
        cardColor = AppColors.error;
        textColor = Colors.white;
        break;
      case 'high':
        cardColor = Colors.orange;
        textColor = Colors.white;
        break;
      case 'medium':
        cardColor = Colors.amber;
        textColor = Colors.black87;
        break;
      default:
        cardColor = Colors.blueGrey;
        textColor = Colors.white;
    }

    return GestureDetector(
      onTap: () => _showAlertDetails(context, alert),
      child: Container(
        width: 280,
        padding: EdgeInsets.all(AppSpacing.lg),
        decoration: BoxDecoration(
          color: cardColor,
          borderRadius: BorderRadius.circular(AppSpacing.radiusXl),
          boxShadow: [
            BoxShadow(
              color: cardColor.withValues(alpha: 0.4),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Icon(icon, color: textColor, size: 20),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    alert.title,
                    style: AppTypography.h4.copyWith(color: textColor),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            Text(
              alert.description,
              style: AppTypography.bodySmall.copyWith(
                color: textColor.withValues(alpha: 0.9),
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            Text(
              'Expira em: ${DateFormat('dd/MM HH:mm').format(alert.expires)}',
              style: AppTypography.label.copyWith(
                color: textColor.withValues(alpha: 0.8),
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showAlertDetails(BuildContext context, WeatherAlert alert) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 24),
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.error.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    _getAlertIcon(alert.type),
                    color: AppColors.error,
                    size: 32,
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(alert.title, style: AppTypography.h3),
                      Text(
                        'Severidade: ${alert.severity.toUpperCase()}',
                        style: AppTypography.label.copyWith(
                          color: AppColors.error,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 24),
            Text(alert.description, style: AppTypography.bodyMedium),
            SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildAlertInfo('Início', alert.effective),
                _buildAlertInfo('Término', alert.expires),
              ],
            ),
            SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildAlertInfo(String label, DateTime time) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AppTypography.label.copyWith(color: AppColors.textSecondary),
        ),
        Text(
          DateFormat('dd/MM/yyyy HH:mm').format(time),
          style: AppTypography.bodyMedium.copyWith(fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  IconData _getAlertIcon(String type) {
    switch (type.toLowerCase()) {
      case 'storm':
        return Icons.thunderstorm;
      case 'heat':
        return Icons.local_fire_department;
      case 'cold':
      case 'frost':
        return Icons.ac_unit;
      case 'rain':
      case 'flood':
        return Icons.flood;
      case 'wind':
        return Icons.air;
      default:
        return Icons.warning;
    }
  }
}

class HighPriorityAlertBanner extends StatelessWidget {
  final List<WeatherAlert> alerts;

  const HighPriorityAlertBanner({super.key, required this.alerts});

  @override
  Widget build(BuildContext context) {
    // Find highest priority alert (extreme or high)
    final highPriority = alerts
        .where(
          (a) =>
              a.severity.toLowerCase() == 'high' ||
              a.severity.toLowerCase() == 'extreme',
        )
        .toList();

    if (highPriority.isEmpty) {
      return const SizedBox.shrink();
    }

    final alert = highPriority.first;
    final isExtreme = alert.severity.toLowerCase() == 'extreme';

    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(bottom: AppSpacing.md),
      child: Material(
        color: isExtreme ? AppColors.error : Colors.orange,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
        child: InkWell(
          onTap: () {
            // Re-use logic to show details from WeatherAlertsWidget logic
            // But since it's private there, we can copy it or ideally refactor.
            // For now, let's just duplicate the modal logic slightly modified or
            // simply instantiate WeatherAlertsWidget's method logic if refactored.
            // To keep it simple in this step, I'll copy the showModal logic inside here
            // or better make _showAlertDetails public static or similar.
            // Let's just create a quick local show method.
            _showBannerAlertDetails(context, alert);
          },
          borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
          child: Padding(
            padding: EdgeInsets.symmetric(
              horizontal: AppSpacing.md,
              vertical: AppSpacing.sm,
            ),
            child: Row(
              children: [
                Icon(
                  Icons.warning_amber_rounded,
                  color: Colors.white,
                  size: 20,
                ),
                SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Text(
                    alert.title.toUpperCase(),
                    style: AppTypography.label.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.5,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Icon(Icons.chevron_right, color: Colors.white, size: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _showBannerAlertDetails(BuildContext context, WeatherAlert alert) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 24),
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.error.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    // Simple warning icon here to avoid dep on private method
                    Icons.warning_amber_rounded,
                    color: AppColors.error,
                    size: 32,
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(alert.title, style: AppTypography.h3),
                      Text(
                        'Severidade: ${alert.severity.toUpperCase()}',
                        style: AppTypography.label.copyWith(
                          color: AppColors.error,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 24),
            Text(alert.description, style: AppTypography.bodyMedium),
            SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pop(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.error,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Entendido'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
