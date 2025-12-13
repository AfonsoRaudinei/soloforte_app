import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../domain/weather_model.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class ForecastList extends StatelessWidget {
  final List<DailyForecast> forecast;

  const ForecastList({super.key, required this.forecast});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Previsão 5 Dias',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 140,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: forecast.length,
            separatorBuilder: (_, __) => const SizedBox(width: 12),
            itemBuilder: (context, index) {
              final day = forecast[index];
              return Container(
                width: 100,
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      DateFormat('E', 'pt_BR').format(day.date).toUpperCase(),
                      style: const TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Icon(
                      _getIconForCondition(day.condition),
                      color: AppColors.primary,
                      size: 32,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${day.maxTemp.round()}° / ${day.minTemp.round()}°',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  IconData _getIconForCondition(String condition) {
    switch (condition.toLowerCase()) {
      case 'rain':
        return Icons.shower;
      case 'cloudy':
        return Icons.cloud;
      case 'sunny':
        return Icons.wb_sunny;
      default:
        return Icons.wb_cloudy_rounded;
    }
  }
}
