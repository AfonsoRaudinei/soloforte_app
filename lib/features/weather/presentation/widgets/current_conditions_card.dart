import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import '../../domain/weather_model.dart';
import 'animated_weather_icon.dart';

class CurrentConditionsCard extends StatelessWidget {
  final WeatherForecast forecast;
  final String location;
  final VoidCallback onLocationTap;

  const CurrentConditionsCard({
    super.key,
    required this.forecast,
    required this.location,
    required this.onLocationTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.xxl),
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
          GestureDetector(
            onTap: onLocationTap,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  location,
                  style: const TextStyle(
                    color: Colors.white70,
                    letterSpacing: 1.5,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 4),
                const Icon(Icons.arrow_drop_down, color: Colors.white70),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AnimatedWeatherIcon(condition: forecast.condition, size: 64),
              const SizedBox(width: 24),
              Text(
                '${forecast.currentTemp.round()}°',
                style: AppTypography.h1.copyWith(color: Colors.white),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Sensação térmica ${forecast.feelsLike.round()}°',
            style: AppTypography.bodyMedium.copyWith(color: Colors.white70),
          ),
          const SizedBox(height: 16),
          const Divider(color: Colors.white24),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _WeatherDetail(
                icon: Icons.water_drop,
                label: '${forecast.humidity}%',
                title: 'Umidade',
              ),
              _WeatherDetail(
                icon: Icons.air,
                label: '${forecast.windSpeed} km/h ${forecast.windDirection}',
                title: 'Vento',
              ),
              _WeatherDetail(
                icon: Icons.umbrella,
                label: '${forecast.precipitation} mm',
                title: 'Precipitação',
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _WeatherDetail(
                icon: Icons.visibility,
                label: '${forecast.visibility} km',
                title: 'Visibilidade',
              ),
              _WeatherDetail(
                icon: Icons.cloud_queue,
                label: '${forecast.cloudCover}%',
                title: 'Nuvens',
              ),
              _WeatherDetail(
                icon: Icons.sunny,
                label: '${forecast.uvIndex.round()}',
                title: 'Índice UV',
              ),
            ],
          ),
        ],
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
