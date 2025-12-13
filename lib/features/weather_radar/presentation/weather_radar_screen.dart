import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';

class WeatherRadarScreen extends StatelessWidget {
  const WeatherRadarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Radar Meteorológico')),
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.radar,
                size: 80,
                color: AppColors.primary.withValues(alpha: 0.3),
              ),
              SizedBox(height: AppSpacing.xl),
              Text(
                'Radar Meteorológico',
                style: AppTypography.h2,
                textAlign: TextAlign.center,
              ),
              SizedBox(height: AppSpacing.md),
              Text(
                'Visualize chuvas, nuvens e condições climáticas em tempo real',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: AppSpacing.xxl),
              ElevatedButton.icon(
                onPressed: () {
                  // TODO: Implementar radar
                },
                icon: const Icon(Icons.play_arrow),
                label: const Text('Visualizar Radar'),
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(
                    horizontal: AppSpacing.xl,
                    vertical: AppSpacing.lg,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
