import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import '../../domain/weather_model.dart';

class HourlyForecastChart extends StatelessWidget {
  final List<HourlyForecast> forecast;

  const HourlyForecastChart({super.key, required this.forecast});

  @override
  Widget build(BuildContext context) {
    // Only take the first 24 points for better visibility, or 48 if scrollable.
    // Let's show all 48 but maybe make it scrollable if crowded,
    // or just show them compressed. 48 points on a phone screen might be tight.
    // Let's stick to the visible chart container.

    // Find min and max for Y axis
    double minTemp = 100;
    double maxTemp = -100;
    for (var f in forecast) {
      if (f.temp < minTemp) minTemp = f.temp;
      if (f.temp > maxTemp) maxTemp = f.temp;
    }
    // Add some padding
    minTemp -= 2;
    maxTemp += 2;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Tendência de Temperatura', style: AppTypography.h4),
          SizedBox(height: AppSpacing.md),
          AspectRatio(
            aspectRatio: 2, // Wider than tall
            child: LineChart(
              LineChartData(
                gridData: FlGridData(
                  show: true,
                  drawVerticalLine: false,
                  horizontalInterval: 5,
                  getDrawingHorizontalLine: (value) {
                    return FlLine(
                      color: Colors.grey.withValues(alpha: 0.1),
                      strokeWidth: 1,
                    );
                  },
                ),
                titlesData: FlTitlesData(
                  show: true,
                  rightTitles: AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  topTitles: AxisTitles(
                    sideTitles: SideTitles(showTitles: false),
                  ),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      reservedSize: 30,
                      interval: 6, // Show label every 6 hours
                      getTitlesWidget: (value, meta) {
                        final index = value.toInt();
                        if (index >= 0 && index < forecast.length) {
                          final date = forecast[index].time;
                          return Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: Text(
                              DateFormat('HH:mm').format(date),
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 10,
                              ),
                            ),
                          );
                        }
                        return const Text('');
                      },
                    ),
                  ),
                  leftTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      reservedSize: 40,
                      interval: 5,
                      getTitlesWidget: (value, meta) {
                        return Text(
                          '${value.toInt()}°',
                          style: const TextStyle(
                            color: Colors.grey,
                            fontSize: 10,
                          ),
                        );
                      },
                    ),
                  ),
                ),
                borderData: FlBorderData(show: false),
                minX: 0,
                maxX: (forecast.length - 1).toDouble(),
                minY: minTemp,
                maxY: maxTemp,
                lineBarsData: [
                  LineChartBarData(
                    spots: forecast.asMap().entries.map((e) {
                      return FlSpot(e.key.toDouble(), e.value.temp);
                    }).toList(),
                    isCurved: true,
                    gradient: const LinearGradient(
                      colors: [AppColors.secondary, AppColors.primary],
                    ),
                    barWidth: 3,
                    isStrokeCapRound: true,
                    dotData: FlDotData(show: false),
                    belowBarData: BarAreaData(
                      show: true,
                      gradient: LinearGradient(
                        colors: [
                          AppColors.primary.withValues(alpha: 0.3),
                          AppColors.primary.withValues(alpha: 0.0),
                        ],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                ],
                lineTouchData: LineTouchData(
                  touchTooltipData: LineTouchTooltipData(
                    getTooltipColor: (touchedSpot) => Colors.black87,
                    getTooltipItems: (List<LineBarSpot> touchedBarSpots) {
                      return touchedBarSpots.map((barSpot) {
                        final flSpot = barSpot;
                        if (flSpot.x < 0 || flSpot.x >= forecast.length) {
                          return null;
                        }
                        return LineTooltipItem(
                          '${flSpot.y.round()}°\n',
                          const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                          children: [
                            TextSpan(
                              text: DateFormat(
                                'HH:mm',
                              ).format(forecast[flSpot.x.toInt()].time),
                              style: const TextStyle(
                                color: Colors.white70,
                                fontWeight: FontWeight.normal,
                                fontSize: 10,
                              ),
                            ),
                          ],
                        );
                      }).toList();
                    },
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
