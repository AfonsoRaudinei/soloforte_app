import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import '../providers/areas_provider.dart';
import 'area_card.dart';

class AreasListHorizontal extends ConsumerWidget {
  final Function(String areaId)? onAreaTap;

  const AreasListHorizontal({super.key, this.onAreaTap});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final areasAsync = ref.watch(areasProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Header
        Padding(
          padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Minhas Áreas', style: AppTypography.h3),
              areasAsync.when(
                data: (areas) => Text(
                  '${areas.length} área${areas.length != 1 ? 's' : ''}',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
                loading: () => const SizedBox.shrink(),
                error: (_, __) => const SizedBox.shrink(),
              ),
            ],
          ),
        ),
        SizedBox(height: AppSpacing.md),

        // List
        SizedBox(
          height: 220,
          child: areasAsync.when(
            data: (areas) {
              if (areas.isEmpty) {
                return Center(
                  child: Padding(
                    padding: EdgeInsets.all(AppSpacing.xl),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.crop_free,
                          size: 48,
                          color: AppColors.gray300,
                        ),
                        SizedBox(height: AppSpacing.md),
                        Text(
                          'Nenhuma área cadastrada',
                          style: AppTypography.bodyMedium.copyWith(
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                itemCount: areas.length,
                itemBuilder: (context, index) {
                  final area = areas[index];
                  return AreaCard(
                    area: area,
                    onTap: () => onAreaTap?.call(area.id),
                  );
                },
              );
            },
            loading: () => ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              itemCount: 3,
              itemBuilder: (context, index) {
                return Container(
                  width: 280,
                  margin: EdgeInsets.only(right: AppSpacing.md),
                  decoration: BoxDecoration(
                    color: AppColors.gray100,
                    borderRadius: BorderRadius.circular(AppSpacing.radiusLg),
                  ),
                );
              },
            ),
            error: (error, stack) => Center(
              child: Padding(
                padding: EdgeInsets.all(AppSpacing.xl),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.error_outline, size: 48, color: AppColors.error),
                    SizedBox(height: AppSpacing.md),
                    Text(
                      'Erro ao carregar áreas',
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.error,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
