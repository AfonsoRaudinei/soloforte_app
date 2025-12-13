import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';

class FeedbackScreen extends StatelessWidget {
  const FeedbackScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Enviar Feedback')),
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.feedback,
                size: 80,
                color: AppColors.primary.withValues(alpha: 0.3),
              ),
              SizedBox(height: AppSpacing.xl),
              Text(
                'Feedback',
                style: AppTypography.h2,
                textAlign: TextAlign.center,
              ),
              SizedBox(height: AppSpacing.md),
              Text(
                'Envie sugestões, reporte bugs ou solicite novas funcionalidades',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: AppSpacing.xxl),
              ElevatedButton.icon(
                onPressed: () {
                  // TODO: Implementar envio de feedback
                },
                icon: const Icon(Icons.send),
                label: const Text('Enviar Feedback'),
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
