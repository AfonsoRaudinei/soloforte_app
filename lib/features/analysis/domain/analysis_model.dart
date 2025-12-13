import 'package:freezed_annotation/freezed_annotation.dart';
import '../../clients/domain/client_model.dart';
import '../../map/domain/geo_area.dart';

part 'analysis_model.freezed.dart';
part 'analysis_model.g.dart';

enum AnalysisType { chemical, physical, biological }

enum AnalysisStatus { pending, collecting, processing, completed }

@freezed
abstract class Analysis with _$Analysis {
  const factory Analysis({
    required String id,
    required String code, // e.g., AN-2023-001
    required Client client, // Snapshot of client
    required GeoArea area, // Snapshot of area
    required AnalysisType type,
    required AnalysisStatus status,
    required DateTime date,
    String? notes,
  }) = _Analysis;

  factory Analysis.fromJson(Map<String, dynamic> json) =>
      _$AnalysisFromJson(json);
}
