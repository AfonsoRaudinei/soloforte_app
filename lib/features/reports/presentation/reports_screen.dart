import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/shared/widgets/app_card.dart';
import 'package:soloforte_app/shared/widgets/primary_button.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({super.key});

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  String _selectedPeriod = 'Últimos 30 dias';
  final List<String> _periods = [
    'Últimos 7 dias',
    'Últimos 30 dias',
    'Esta Safra',
    'Ano Passado',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text('Relatórios'),
        actions: [
          IconButton(
            icon: const Icon(Icons.download),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Exportando relatório (Mock)...')),
              );
            },
            tooltip: 'Exportar PDF',
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Filters
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.grey.shade300),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _selectedPeriod,
                        isExpanded: true,
                        items: _periods.map((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                        onChanged: (newValue) {
                          setState(() {
                            _selectedPeriod = newValue!;
                          });
                        },
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                PrimaryButton(
                  text: 'Filtrar',
                  onPressed: () {},
                  isFullWidth: false,
                  icon: Icons.filter_list,
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Summary Cards
            Row(
              children: [
                Expanded(
                  child: _SummaryCard(
                    title: 'Produtividade Média',
                    value: '58 sc/ha',
                    trend: '+5%',
                    isPositive: true,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _SummaryCard(
                    title: 'Custo por Hectare',
                    value: 'R\$ 3.200',
                    trend: '-2%',
                    isPositive: true,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Charts Placeholder (Mocking Chart visualization)
            Text('Produtividade por Talhão', style: AppTypography.h3),
            const SizedBox(height: 12),
            const _MockBarChart(),
            const SizedBox(height: 24),

            Text('Distribuição de Custos', style: AppTypography.h3),
            const SizedBox(height: 12),
            const _MockPieChart(),
            const SizedBox(height: 24),

            // Recent Reports List
            Text('Relatórios Recentes', style: AppTypography.h3),
            const SizedBox(height: 12),
            AppCard(
              child: Column(
                children: [
                  _ReportItem(
                    title: 'Relatório Final Safra 23/24',
                    date: '10/Nov/2024',
                    type: 'PDF',
                  ),
                  const Divider(),
                  _ReportItem(
                    title: 'Análise de Solo Completa',
                    date: '05/Out/2024',
                    type: 'CSV',
                  ),
                  const Divider(),
                  _ReportItem(
                    title: 'Custos Operacionais Q3',
                    date: '01/Out/2024',
                    type: 'XLS',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SummaryCard extends StatelessWidget {
  final String title;
  final String value;
  final String trend;
  final bool isPositive;

  const _SummaryCard({
    required this.title,
    required this.value,
    required this.trend,
    required this.isPositive,
  });

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: AppTypography.caption),
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

class _MockBarChart extends StatelessWidget {
  const _MockBarChart();

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: SizedBox(
        height: 200,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _Bar(height: 0.6, label: 'T1'),
            _Bar(height: 0.8, label: 'T2'),
            _Bar(height: 0.5, label: 'T3'),
            _Bar(height: 0.9, label: 'T4'),
            _Bar(height: 0.7, label: 'T5'),
          ],
        ),
      ),
    );
  }
}

class _Bar extends StatelessWidget {
  final double height;
  final String label;

  const _Bar({required this.height, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        FractionallySizedBox(
          heightFactor: height,
          child: Container(
            width: 30,
            decoration: BoxDecoration(
              color: AppColors.primary,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(label, style: AppTypography.caption),
      ],
    );
  }
}

class _MockPieChart extends StatelessWidget {
  const _MockPieChart();

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: SizedBox(
        height: 200,
        child: Row(
          children: [
            // Circle
            Expanded(
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 120,
                    height: 120,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.primary, width: 20),
                    ),
                  ),
                  Container(
                    width: 120,
                    height: 120,
                    decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      // Mocking a segment
                      border: Border.fromBorderSide(BorderSide.none),
                    ),
                    // In real app use fl_chart or charts_flutter
                  ),
                ],
              ),
            ),
            // Legend
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _LegendItem(color: AppColors.primary, label: 'Insumos (45%)'),
                  const SizedBox(height: 8),
                  _LegendItem(
                    color: AppColors.secondary,
                    label: 'Operacional (30%)',
                  ),
                  const SizedBox(height: 8),
                  _LegendItem(
                    color: AppColors.alert,
                    label: 'Manutenção (15%)',
                  ),
                  const SizedBox(height: 8),
                  _LegendItem(color: Colors.grey, label: 'Outros (10%)'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendItem({required this.color, required this.label});

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

class _ReportItem extends StatelessWidget {
  final String title;
  final String date;
  final String type;

  const _ReportItem({
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
