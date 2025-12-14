import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/shared/widgets/app_card.dart';

class SummaryCard extends StatelessWidget {
  final String title;
  final String value;
  final String trend;
  final bool isPositive;
  final IconData? icon;

  const SummaryCard({
    super.key,
    required this.title,
    required this.value,
    required this.trend,
    required this.isPositive,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: AppTypography.caption),
              if (icon != null) Icon(icon, size: 20, color: Colors.grey),
            ],
          ),
          const SizedBox(height: 8),
          Text(value, style: AppTypography.h3),
          const SizedBox(height: 4),
          Row(
            children: [
              Icon(
                isPositive ? Icons.arrow_upward : Icons.arrow_downward,
                color: isPositive ? AppColors.success : AppColors.error,
                size: 14,
              ),
              const SizedBox(width: 2),
              Text(
                trend,
                style: AppTypography.caption.copyWith(
                  color: isPositive ? AppColors.success : AppColors.error,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(width: 4),
              Text('vs anterior', style: AppTypography.caption),
            ],
          ),
        ],
      ),
    );
  }
}
