import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

// --- Wrapper Card ---
class DashboardChartCard extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget child;
  final VoidCallback? onMoreTap;

  const DashboardChartCard({
    super.key,
    required this.title,
    required this.child,
    this.subtitle,
    this.onMoreTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
        border: Border.all(color: AppColors.gray100),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: AppTypography.label.copyWith(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    if (subtitle != null)
                      Text(subtitle!, style: AppTypography.caption),
                  ],
                ),
              ),
              if (onMoreTap != null)
                IconButton(
                  icon: const Icon(
                    Icons.more_horiz,
                    color: AppColors.textSecondary,
                  ),
                  onPressed: onMoreTap,
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
            ],
          ),
          const SizedBox(height: 16),
          child,
        ],
      ),
    );
  }
}

// --- 1. NDVI Evolution Line Chart ---
class NdviLineChart extends StatelessWidget {
  const NdviLineChart({super.key});

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.7,
      child: LineChart(
        LineChartData(
          gridData: FlGridData(
            show: true,
            drawVerticalLine: false,
            horizontalInterval: 0.2,
            getDrawingHorizontalLine: (value) {
              return FlLine(
                color: AppColors.gray200,
                strokeWidth: 1,
                dashArray: [5, 5],
              );
            },
          ),
          titlesData: FlTitlesData(
            show: true,
            rightTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
            topTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 30,
                interval: 1,
                getTitlesWidget: (value, meta) {
                  const titles = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
                  if (value.toInt() >= 0 && value.toInt() < titles.length) {
                    return Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        titles[value.toInt()],
                        style: AppTypography.caption,
                      ),
                    );
                  }
                  return const SizedBox.shrink();
                },
              ),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                interval: 0.2,
                reservedSize: 30,
                getTitlesWidget: (value, meta) {
                  return Text(
                    value.toStringAsFixed(1),
                    style: AppTypography.caption,
                  );
                },
              ),
            ),
          ),
          borderData: FlBorderData(show: false),
          minX: 0,
          maxX: 5,
          minY: 0,
          maxY: 1.0,
          lineBarsData: [
            // Current Season
            LineChartBarData(
              spots: const [
                FlSpot(0, 0.3),
                FlSpot(1, 0.45),
                FlSpot(2, 0.6),
                FlSpot(3, 0.75),
                FlSpot(4, 0.72),
                FlSpot(5, 0.65),
              ],
              isCurved: true,
              color: AppColors.primary,
              barWidth: 3,
              isStrokeCapRound: true,
              dotData: const FlDotData(show: false),
              belowBarData: BarAreaData(
                show: true,
                color: AppColors.primary.withOpacity(0.1),
              ),
            ),
            // Previous Season (Dashed ideally, but simplified color here)
            LineChartBarData(
              spots: const [
                FlSpot(0, 0.25),
                FlSpot(1, 0.4),
                FlSpot(2, 0.55),
                FlSpot(3, 0.65),
                FlSpot(4, 0.6),
                FlSpot(5, 0.5),
              ],
              isCurved: true,
              color: AppColors.gray400,
              barWidth: 2,
              isStrokeCapRound: true,
              dotData: const FlDotData(show: false),
              dashArray: [5, 5],
            ),
          ],
          lineTouchData: LineTouchData(
            touchTooltipData: LineTouchTooltipData(
              getTooltipItems: (List<LineBarSpot> touchedBarSpots) {
                return touchedBarSpots.map((barSpot) {
                  final flSpot = barSpot;
                  return LineTooltipItem(
                    '${flSpot.y}',
                    const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  );
                }).toList();
              },
            ),
          ),
        ),
      ),
    );
  }
}

// --- 2. Crop Distribution Pie Chart ---
class CropPieChart extends StatelessWidget {
  const CropPieChart({super.key});

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.3,
      child: Row(
        children: [
          Expanded(
            child: PieChart(
              PieChartData(
                sectionsSpace: 0,
                centerSpaceRadius: 40,
                sections: [
                  PieChartSectionData(
                    color: AppColors.primary,
                    value: 45,
                    title: '45%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.secondary,
                    value: 30,
                    title: '30%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.warning,
                    value: 15,
                    title: '15%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.gray300,
                    value: 10,
                    title: '10%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildLegend(AppColors.primary, 'Soja (450ha)'),
              const SizedBox(height: 4),
              _buildLegend(AppColors.secondary, 'Milho (300ha)'),
              const SizedBox(height: 4),
              _buildLegend(AppColors.warning, 'Trigo (150ha)'),
              const SizedBox(height: 4),
              _buildLegend(AppColors.gray300, 'Pousio (100ha)'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLegend(Color color, String text) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Text(text, style: AppTypography.caption),
      ],
    );
  }
}

// --- 3. Occurrences Bar Chart (Horizontal) ---
class OccurrencesBarChart extends StatelessWidget {
  const OccurrencesBarChart({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildBar('Pragas (Lagartas, Percevejos)', 15, 20, AppColors.error),
        const SizedBox(height: 12),
        _buildBar('Doenças (Ferrugem, Mancha)', 8, 20, AppColors.warning),
        const SizedBox(height: 12),
        _buildBar('Ervas Daninhas', 12, 20, AppColors.secondary),
        const SizedBox(height: 12),
        _buildBar('Deficiências Nutricionais', 5, 20, AppColors.info),
      ],
    );
  }

  Widget _buildBar(String label, double value, double max, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: AppTypography.caption),
            Text(
              '${value.toInt()} oc.',
              style: AppTypography.caption.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: value / max,
            backgroundColor: AppColors.gray100,
            valueColor: AlwaysStoppedAnimation(color),
            minHeight: 8,
          ),
        ),
      ],
    );
  }
}

// --- 4. Productivity Heatmap (Grid) ---
class ProductionHeatmap extends StatelessWidget {
  const ProductionHeatmap({super.key});

  @override
  Widget build(BuildContext context) {
    // Mock 3x3 grid
    final data = [
      {'id': 'T1', 'val': 65.0, 'color': AppColors.secondaryDark}, // High
      {'id': 'T2', 'val': 62.0, 'color': AppColors.secondary}, // Good
      {'id': 'T3', 'val': 58.0, 'color': AppColors.warning}, // Avg
      {'id': 'T4', 'val': 70.0, 'color': AppColors.secondaryDark},
      {'id': 'T5', 'val': 45.0, 'color': AppColors.error}, // Low
      {'id': 'T6', 'val': 60.0, 'color': AppColors.secondary},
      {'id': 'T7', 'val': 55.0, 'color': AppColors.warning},
      {'id': 'T8', 'val': 63.0, 'color': AppColors.secondary},
      {'id': 'T9', 'val': 68.0, 'color': AppColors.secondaryDark},
    ];

    return GridView.builder(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
        childAspectRatio: 1.5,
      ),
      itemCount: data.length,
      itemBuilder: (context, index) {
        final item = data[index];
        return Container(
          decoration: BoxDecoration(
            color: (item['color'] as Color).withOpacity(0.2),
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: item['color'] as Color),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                item['id'] as String,
                style: AppTypography.caption.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                '${item['val']}',
                style: AppTypography.bodySmall.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// --- 6. Costs Pie Chart ---
class CostPieChart extends StatelessWidget {
  const CostPieChart({super.key});

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.3,
      child: Row(
        children: [
          Expanded(
            child: PieChart(
              PieChartData(
                sectionsSpace: 0,
                centerSpaceRadius: 40,
                sections: [
                  PieChartSectionData(
                    color: AppColors.error,
                    value: 40,
                    title: '40%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.warning,
                    value: 35,
                    title: '35%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    color: AppColors.primary,
                    value: 25,
                    title: '25%',
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildLegend(AppColors.error, 'Insumos'),
              const SizedBox(height: 4),
              _buildLegend(AppColors.warning, 'Maquinário'),
              const SizedBox(height: 4),
              _buildLegend(AppColors.primary, 'Mão de Obra'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLegend(Color color, String text) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Text(text, style: AppTypography.caption),
      ],
    );
  }
}

// --- 5. Harvest Gantt ---
class HarvestGantt extends StatelessWidget {
  const HarvestGantt({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        SimpleGanttRow(
          label: 'Soja Precoce',
          date: 'Dez - Jan',
          startFlex: 2,
          durationFlex: 3,
          endFlex: 7,
          color: Colors.orange,
        ),
        SizedBox(height: 12),
        SimpleGanttRow(
          label: 'Soja Tardia',
          date: 'Jan - Fev',
          startFlex: 4,
          durationFlex: 3,
          endFlex: 5,
          color: Colors.green,
        ),
        SizedBox(height: 12),
        SimpleGanttRow(
          label: 'Milho Safrinha',
          date: 'Fev - Jun',
          startFlex: 6,
          durationFlex: 4,
          endFlex: 2,
          color: Colors.blue,
        ),
      ],
    );
  }
}

// Better Gantt Implementation with Row and Flex
class SimpleGanttRow extends StatelessWidget {
  final String label;
  final String date;
  final int startFlex;
  final int durationFlex;
  final int endFlex;
  final Color color;

  const SimpleGanttRow({
    super.key,
    required this.label,
    required this.date,
    required this.startFlex,
    required this.durationFlex,
    required this.endFlex,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: AppTypography.caption),
            Text(
              date,
              style: AppTypography.caption.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        SizedBox(
          height: 12,
          child: Row(
            children: [
              if (startFlex > 0)
                Expanded(
                  flex: startFlex,
                  child: Container(color: AppColors.gray50),
                ),
              Expanded(
                flex: durationFlex,
                child: Container(
                  decoration: BoxDecoration(
                    color: color,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
              if (endFlex > 0)
                Expanded(
                  flex: endFlex,
                  child: Container(color: AppColors.gray50),
                ),
            ],
          ),
        ),
      ],
    );
  }
}
