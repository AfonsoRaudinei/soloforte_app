import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/features/weather/domain/weather_model.dart';
import 'widgets/weather_radar.dart';
import 'widgets/forecast_list.dart';

class WeatherScreen extends StatelessWidget {
  const WeatherScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Mock Data
    final currentForecast = WeatherForecast(
      currentTemp: 28.5,
      humidity: 65,
      windSpeed: 12,
      condition: 'Cloudy',
      daily: List.generate(
        5,
        (index) => DailyForecast(
          date: DateTime.now().add(Duration(days: index)),
          maxTemp: 32 - (index * 0.5),
          minTemp: 22 + (index * 0.5),
          condition: index % 2 == 0 ? 'Sunny' : 'Rain',
          rainProbability: index * 10,
        ),
      ),
    );

    return Scaffold(
      appBar: AppBar(title: const Text('Clima e Tempo')),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(AppSpacing.xl),
        child: Column(
          children: [
            // Current Conditions Card
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(AppSpacing.xxl),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColors.primary, AppColors.blue600],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(AppSpacing.radius2xl),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 10,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                children: [
                  const Text(
                    'SORRISO, MT',
                    style: TextStyle(
                      color: Colors.white70,
                      letterSpacing: 1.5,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.wb_cloudy,
                        color: Colors.white,
                        size: 64,
                      ),
                      const SizedBox(width: 24),
                      Text(
                        '${currentForecast.currentTemp.round()}°',
                        style: AppTypography.h1.copyWith(color: Colors.white),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Divider(color: Colors.white24),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _WeatherDetail(
                        icon: Icons.water_drop,
                        label: '${currentForecast.humidity}%',
                        title: 'Umidade',
                      ),
                      _WeatherDetail(
                        icon: Icons.air,
                        label: '${currentForecast.windSpeed} km/h',
                        title: 'Vento',
                      ),
                      const _WeatherDetail(
                        icon: Icons.umbrella,
                        label: '30%',
                        title: 'Chuva',
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Forecast List
            Padding(
              padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text('Previsão', style: AppTypography.h3),
              ),
            ),
            const SizedBox(height: 12),
            ForecastList(forecast: currentForecast.daily),

            const SizedBox(height: 32),

            // Radar
            Text('Radar Meteorológico', style: AppTypography.h3),
            const SizedBox(height: 12),
            const WeatherRadarWidget(),
          ],
        ),
      ),
    );
  }
}

class _WeatherDetail extends StatelessWidget {
  final IconData icon;
  final String label;
  final String title;

  const _WeatherDetail({
    required this.icon,
    required this.label,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white70),
        const SizedBox(height: 4),
        Text(
          label,
          style: AppTypography.label.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          title,
          style: AppTypography.bodySmall.copyWith(color: Colors.white54),
        ),
      ],
    );
  }
}
