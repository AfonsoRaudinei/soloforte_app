import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class ReportListItem extends StatelessWidget {
  final String title;
  final String date;
  final String type;

  const ReportListItem({
    super.key,
    required this.title,
    required this.date,
    required this.type,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: Colors.grey[100],
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(Icons.description, color: Colors.grey[700]),
      ),
      title: Text(
        title,
        style: AppTypography.bodyMedium.copyWith(fontWeight: FontWeight.bold),
      ),
      subtitle: Text(date, style: AppTypography.caption),
      trailing: Chip(
        label: Text(
          type,
          style: const TextStyle(fontSize: 10, color: Colors.white),
        ),
        backgroundColor: AppColors.primary,
        padding: EdgeInsets.zero,
        visualDensity: VisualDensity.compact,
      ),
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Abrindo relatório (Mock)...')),
        );
      },
    );
  }
}
