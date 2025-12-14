import 'package:freezed_annotation/freezed_annotation.dart';

part 'harvest_model.freezed.dart';
part 'harvest_model.g.dart';

@freezed
abstract class Harvest with _$Harvest {
  const factory Harvest({
    required String id,
    required String areaId,
    required String areaName,
    required String cropType, // e.g. "Soybean", "Corn"
    required DateTime plantedDate,
    required DateTime? harvestDate,
    required double plantedAreaHa,
    required double totalProductionBags, // Sacas
    required double totalCost,
    required String status, // 'planned', 'active', 'harvested'
    @Default([]) List<String> notes,
  }) = _Harvest;

  factory Harvest.fromJson(Map<String, dynamic> json) =>
      _$HarvestFromJson(json);
}
