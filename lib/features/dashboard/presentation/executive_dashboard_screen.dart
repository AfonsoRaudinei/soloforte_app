import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class ExecutiveDashboardScreen extends StatelessWidget {
  const ExecutiveDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard Executivo')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.analytics, size: 64, color: AppColors.primary),
            const SizedBox(height: 16),
            Text('Dashboard Executivo', style: AppTypography.h2),
            const SizedBox(height: 8),
            Text(
              'Em breve: métricas avançadas e KPIs.',
              style: AppTypography.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}
