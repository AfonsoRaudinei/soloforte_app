import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import '../../domain/weather_model.dart';
import 'animated_weather_icon.dart';

class HourlyForecastWidget extends StatelessWidget {
  final List<HourlyForecast> forecast;

  const HourlyForecastWidget({super.key, required this.forecast});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          child: Text('Previsão Horária (48h)', style: AppTypography.h3),
        ),
        SizedBox(height: AppSpacing.md),
        SizedBox(
          height: 160,
          child: ListView.separated(
            padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: forecast.length,
            separatorBuilder: (_, __) => SizedBox(width: AppSpacing.md),
            itemBuilder: (context, index) {
              final item = forecast[index];
              final isNow = index == 0;
              return Container(
                width: 80,
                padding: EdgeInsets.all(AppSpacing.sm),
                decoration: BoxDecoration(
                  color: isNow ? AppColors.primary : Colors.white,
                  borderRadius: BorderRadius.circular(AppSpacing.radiusXl),
                  border: Border.all(
                    color: isNow ? AppColors.primary : Colors.grey.shade200,
                  ),
                  boxShadow: isNow
                      ? [
                          BoxShadow(
                            color: AppColors.primary.withValues(alpha: 0.3),
                            blurRadius: 8,
                            offset: const Offset(0, 4),
                          ),
                        ]
                      : null,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      isNow ? 'Agora' : DateFormat('HH:mm').format(item.time),
                      style: AppTypography.label.copyWith(
                        color: isNow ? Colors.white : AppColors.textSecondary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: AppSpacing.sm),
                    AnimatedWeatherIcon(condition: item.condition, size: 32),
                    SizedBox(height: AppSpacing.sm),
                    Text(
                      '${item.temp.round()}°',
                      style: AppTypography.h3.copyWith(
                        color: isNow ? Colors.white : AppColors.textPrimary,
                      ),
                    ),
                    if (item.rainProbability > 0) ...[
                      SizedBox(height: 4),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.water_drop,
                            size: 10,
                            color: isNow ? Colors.white70 : Colors.blue,
                          ),
                          Text(
                            '${item.rainProbability}%',
                            style: TextStyle(
                              fontSize: 10,
                              color: isNow ? Colors.white70 : Colors.blue,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ],
                    if (item.precipitation > 0) ...[
                      SizedBox(height: 2),
                      Text(
                        '${item.precipitation} mm',
                        style: TextStyle(
                          fontSize: 10,
                          color: isNow ? Colors.white70 : Colors.blueGrey,
                        ),
                      ),
                    ],
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
