import 'package:freezed_annotation/freezed_annotation.dart';

part 'harvest_model.freezed.dart';
part 'harvest_model.g.dart';

@freezed
abstract class Harvest with _$Harvest {
  const factory Harvest({
    required String id,
    required String clientId,
    required String clientName,
    required DateTime date,
    required String cropType, // e.g., 'Soja', 'Milho', 'Algodão'
    required double quantityTon,
    required String storageLocation,
  }) = _Harvest;

  factory Harvest.fromJson(Map<String, dynamic> json) =>
      _$HarvestFromJson(json);
}
