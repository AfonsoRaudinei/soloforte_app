import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/material.dart';
import 'package:soloforte_app/features/reports/domain/report_configuration.dart';

part 'report_history.freezed.dart';
part 'report_history.g.dart';

/// Modelo de relatório salvo no histórico
@freezed
class SavedReport with _$SavedReport {
  const factory SavedReport({
    required String id,
    required String title,
    required ReportTemplate template,
    required DateTime createdAt,
    required ReportConfiguration configuration,
    String? pdfPath,
    int? fileSizeBytes,
    @Default(false) bool isFavorite,
    String? sharedLink,
    DateTime? lastViewedAt,
    @Default(0) int viewCount,
  }) = _SavedReport;

  factory SavedReport.fromJson(Map<String, dynamic> json) =>
      _$SavedReportFromJson(json);
}

/// Modelo de agendamento de relatório
@freezed
class ReportSchedule with _$ReportSchedule {
  const factory ReportSchedule({
    required String id,
    required String title,
    required ReportTemplate template,
    required ReportConfiguration configuration,
    required ScheduleFrequency frequency,
    required DateTime nextRunAt,
    DateTime? lastRunAt,
    @Default(true) bool isActive,
    List<String>? emailRecipients,
    String? notes,
  }) = _ReportSchedule;

  factory ReportSchedule.fromJson(Map<String, dynamic> json) =>
      _$ReportScheduleFromJson(json);
}

/// Frequência de agendamento
enum ScheduleFrequency { daily, weekly, monthly, custom }

extension ScheduleFrequencyExtension on ScheduleFrequency {
  String get name {
    switch (this) {
      case ScheduleFrequency.daily:
        return 'Diário';
      case ScheduleFrequency.weekly:
        return 'Semanal';
      case ScheduleFrequency.monthly:
        return 'Mensal';
      case ScheduleFrequency.custom:
        return 'Personalizado';
    }
  }

  IconData get icon {
    switch (this) {
      case ScheduleFrequency.daily:
        return Icons.today;
      case ScheduleFrequency.weekly:
        return Icons.view_week;
      case ScheduleFrequency.monthly:
        return Icons.calendar_month;
      case ScheduleFrequency.custom:
        return Icons.tune;
    }
  }
}
