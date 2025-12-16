import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/marketing/presentation/screens/templates_screen.dart';

class TemplatesSection extends StatelessWidget {
  const TemplatesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Templates Sugeridos:', style: AppTypography.label),
            TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const TemplatesScreen()),
                );
              },
              child: const Text('Ver todos'),
            ),
          ],
        ),
        SizedBox(height: AppSpacing.sm),
        SizedBox(
          height: 80,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              _buildTemplateCard('NDVI', Icons.bar_chart),
              _buildTemplateCard('Safra', Icons.grass),
              _buildTemplateCard('Antes/Depois', Icons.compare),
              _buildTemplateCard('Story', Icons.phone_iphone),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTemplateCard(String label, IconData icon) {
    return Container(
      width: 70,
      margin: EdgeInsets.only(right: AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border.all(color: AppColors.gray200),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: AppColors.primary),
          const SizedBox(height: 4),
          Text(
            label,
            style: AppTypography.caption,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
