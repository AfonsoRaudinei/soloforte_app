import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

part 'report_configuration.g.dart';

/// Modelo de configuração do relatório sendo criado no wizard
@JsonSerializable()
class ReportConfiguration {
  // Passo 1: Tipo
  ReportTemplate? template;

  // Passo 2: Configuração
  @JsonKey(fromJson: _dateRangeFromJson, toJson: _dateRangeToJson)
  DateTimeRange? dateRange;
  List<String> selectedAreaIds;
  Map<String, dynamic> filters;
  List<String> selectedMetrics;

  // Passo 3: Personalização
  String? customTitle;
  String? logoPath;
  String? headerTemplate;
  List<String> includedSections;
  String? generalNotes;

  ReportConfiguration({
    this.template,
    this.dateRange,
    this.selectedAreaIds = const [],
    this.filters = const {},
    this.selectedMetrics = const [],
    this.customTitle,
    this.logoPath,
    this.headerTemplate,
    this.includedSections = const [],
    this.generalNotes,
  });

  factory ReportConfiguration.fromJson(Map<String, dynamic> json) =>
      _$ReportConfigurationFromJson(json);

  Map<String, dynamic> toJson() => _$ReportConfigurationToJson(this);

  ReportConfiguration copyWith({
    ReportTemplate? template,
    DateTimeRange? dateRange,
    List<String>? selectedAreaIds,
    Map<String, dynamic>? filters,
    List<String>? selectedMetrics,
    String? customTitle,
    String? logoPath,
    String? headerTemplate,
    List<String>? includedSections,
    String? generalNotes,
  }) {
    return ReportConfiguration(
      template: template ?? this.template,
      dateRange: dateRange ?? this.dateRange,
      selectedAreaIds: selectedAreaIds ?? this.selectedAreaIds,
      filters: filters ?? this.filters,
      selectedMetrics: selectedMetrics ?? this.selectedMetrics,
      customTitle: customTitle ?? this.customTitle,
      logoPath: logoPath ?? this.logoPath,
      headerTemplate: headerTemplate ?? this.headerTemplate,
      includedSections: includedSections ?? this.includedSections,
      generalNotes: generalNotes ?? this.generalNotes,
    );
  }

  bool get isValid {
    return template != null && dateRange != null && selectedAreaIds.isNotEmpty;
  }

  // Conversores customizados para DateTimeRange
  static DateTimeRange? _dateRangeFromJson(Map<String, dynamic>? json) {
    if (json == null) return null;
    return DateTimeRange(
      start: DateTime.parse(json['start'] as String),
      end: DateTime.parse(json['end'] as String),
    );
  }

  static Map<String, dynamic>? _dateRangeToJson(DateTimeRange? dateRange) {
    if (dateRange == null) return null;
    return {
      'start': dateRange.start.toIso8601String(),
      'end': dateRange.end.toIso8601String(),
    };
  }
}

/// Templates de relatórios disponíveis
enum ReportTemplate { weekly, ndvi, cropSummary, pest, custom }

extension ReportTemplateExtension on ReportTemplate {
  String get name {
    switch (this) {
      case ReportTemplate.weekly:
        return 'Relatório Semanal';
      case ReportTemplate.ndvi:
        return 'Análise NDVI';
      case ReportTemplate.cropSummary:
        return 'Resumo de Safra';
      case ReportTemplate.pest:
        return 'Relatório de Pragas';
      case ReportTemplate.custom:
        return 'Relatório Personalizado';
    }
  }

  String get description {
    switch (this) {
      case ReportTemplate.weekly:
        return 'Resumo das atividades e métricas da semana';
      case ReportTemplate.ndvi:
        return 'Análise de vigor vegetativo por satélite';
      case ReportTemplate.cropSummary:
        return 'Visão geral da safra e produtividade';
      case ReportTemplate.pest:
        return 'Monitoramento de pragas e doenças';
      case ReportTemplate.custom:
        return 'Crie seu próprio relatório personalizado';
    }
  }

  IconData get icon {
    switch (this) {
      case ReportTemplate.weekly:
        return Icons.calendar_today;
      case ReportTemplate.ndvi:
        return Icons.satellite_alt;
      case ReportTemplate.cropSummary:
        return Icons.agriculture;
      case ReportTemplate.pest:
        return Icons.bug_report;
      case ReportTemplate.custom:
        return Icons.tune;
    }
  }

  Color get color {
    switch (this) {
      case ReportTemplate.weekly:
        return Colors.blue;
      case ReportTemplate.ndvi:
        return Colors.green;
      case ReportTemplate.cropSummary:
        return Colors.orange;
      case ReportTemplate.pest:
        return Colors.red;
      case ReportTemplate.custom:
        return Colors.purple;
    }
  }

  List<String> get availableMetrics {
    switch (this) {
      case ReportTemplate.weekly:
        return [
          'Ocorrências',
          'Aplicações',
          'Check-ins',
          'Clima',
          'Atividades',
        ];
      case ReportTemplate.ndvi:
        return [
          'Evolução Temporal',
          'Mapa de Calor',
          'Comparação de Áreas',
          'Correlação Climática',
          'Zonas de Atenção',
        ];
      case ReportTemplate.cropSummary:
        return [
          'Área Plantada',
          'Produtividade',
          'Custos',
          'Receita Estimada',
          'Cronograma',
        ];
      case ReportTemplate.pest:
        return [
          'Ocorrências por Tipo',
          'Severidade',
          'Áreas Afetadas',
          'Histórico',
          'Recomendações',
        ];
      case ReportTemplate.custom:
        return ['Resumo Executivo', 'Gráficos', 'Tabelas', 'Mapas', 'Métricas'];
    }
  }
}
