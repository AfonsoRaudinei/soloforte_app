import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class NDVIStatisticsCard extends StatelessWidget {
  final Map<String, dynamic>? stats;

  const NDVIStatisticsCard({super.key, this.stats});

  @override
  Widget build(BuildContext context) {
    if (stats == null ||
        stats!['data'] == null ||
        (stats!['data'] as List).isEmpty) {
      return const Card(
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Text('Estatísticas indisponíveis para esta data.'),
        ),
      );
    }

    // Parse histogram data from Sentinel FIS response
    // Response structure: data[0].outputs.ndvi.bands.B0.histogram
    // bins: list of values, counts: list of counts

    try {
      final histogramData =
          stats!['data'][0]['outputs']['ndvi']['bands']['B0']['histogram'];
      final bins = List<double>.from(
        histogramData['bins'].map((e) => (e as num).toDouble()),
      );
      final counts = List<int>.from(
        histogramData['counts'].map((e) => (e as num).toInt()),
      );

      final barGroups = <BarChartGroupData>[];
      for (int i = 0; i < bins.length - 1; i++) {
        // Group bins into simpler categories? Or display all 100 bins?
        // 100 bins is too much for mobile. Let's aggregate into 5 classes.
        // Or simply display full resolution if it fits.
        // Let's sample every 5th bin to keep it clean.
        if (i % 5 == 0) {
          barGroups.add(
            BarChartGroupData(
              x: i,
              barRods: [
                BarChartRodData(
                  toY: counts[i].toDouble(),
                  color: _getColorForNdvi(bins[i]),
                  width: 4,
                  borderRadius: BorderRadius.circular(2),
                ),
              ],
            ),
          );
        }
      }

      // Calculate simple stats
      double maxCount = 0;
      for (var c in counts) {
        if (c > maxCount) maxCount = c.toDouble();
      }

      final mean =
          stats!['data'][0]['outputs']['ndvi']['bands']['B0']['stats']['mean'];

      return Card(
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Distribuição de Vigor (NDVI)', style: AppTypography.h3),
              if (mean != null)
                Text(
                  'Média da área: ${mean.toStringAsFixed(2)}',
                  style: const TextStyle(color: Colors.grey),
                ),
              const SizedBox(height: 16),
              AspectRatio(
                aspectRatio: 1.7,
                child: BarChart(
                  BarChartData(
                    alignment: BarChartAlignment.spaceBetween,
                    maxY: maxCount * 1.1,
                    barTouchData: BarTouchData(enabled: false),
                    titlesData: FlTitlesData(
                      show: true,
                      bottomTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          getTitlesWidget: (value, meta) {
                            // Map index back to real NDVI value (-1 to 1 or 0 to 1)
                            int index = value.toInt();
                            if (index >= 0 && index < bins.length) {
                              // Only show some labels
                              if (index == 0 ||
                                  index == bins.length ~/ 2 ||
                                  index == bins.length - 1 ||
                                  index % 20 == 0) {
                                return Padding(
                                  padding: const EdgeInsets.only(top: 4),
                                  child: Text(
                                    bins[index].toStringAsFixed(1),
                                    style: const TextStyle(fontSize: 10),
                                  ),
                                );
                              }
                            }
                            return const SizedBox.shrink();
                          },
                          reservedSize: 20,
                        ),
                      ),
                      leftTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                      topTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                      rightTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                    ),
                    gridData: const FlGridData(show: false),
                    borderData: FlBorderData(show: false),
                    barGroups: barGroups,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    } catch (e) {
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text('Erro ao processar estatísticas: $e'),
        ),
      );
    }
  }

  Color _getColorForNdvi(double value) {
    if (value < 0.2) return Colors.red;
    if (value < 0.4) return Colors.yellow;
    if (value < 0.6) return Colors.lightGreen;
    return const Color(0xFF2E7D32); // Dark Green
  }
}
