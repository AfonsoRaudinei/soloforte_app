import 'package:freezed_annotation/freezed_annotation.dart';

part 'ndvi_record.freezed.dart';
part 'ndvi_record.g.dart';

@freezed
abstract class NDVIRecord with _$NDVIRecord {
  const factory NDVIRecord({
    required String id,
    required DateTime date,
    required String imageUrl,
    required String description,
    required double averageValue,
  }) = _NDVIRecord;

  factory NDVIRecord.fromJson(Map<String, dynamic> json) =>
      _$NDVIRecordFromJson(json);
}
