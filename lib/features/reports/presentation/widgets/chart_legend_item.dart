import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class ChartLegendItem extends StatelessWidget {
  final Color color;
  final String label;

  const ChartLegendItem({super.key, required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Text(label, style: AppTypography.bodySmall),
      ],
    );
  }
}
