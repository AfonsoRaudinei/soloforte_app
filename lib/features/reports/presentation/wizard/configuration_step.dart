import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/reports/application/report_wizard_provider.dart';
import 'package:soloforte_app/features/reports/application/date_filter_provider.dart';
import 'package:soloforte_app/features/map/application/drawing_controller.dart';
import 'package:soloforte_app/shared/widgets/app_card.dart';
import 'package:intl/intl.dart';

/// Passo 2 do Wizard: Configuração
class ConfigurationStep extends ConsumerStatefulWidget {
  const ConfigurationStep({super.key});

  @override
  ConsumerState<ConfigurationStep> createState() => _ConfigurationStepState();
}

class _ConfigurationStepState extends ConsumerState<ConfigurationStep> {
  final Set<String> _selectedAreaIds = {};
  final Set<String> _selectedMetrics = {};

  @override
  void initState() {
    super.initState();
    // Inicializa com valores já configurados
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final config = ref.read(reportWizardProvider).configuration;
      _selectedAreaIds.addAll(config.selectedAreaIds);
      _selectedMetrics.addAll(config.selectedMetrics);
    });
  }

  @override
  Widget build(BuildContext context) {
    final wizard = ref.watch(reportWizardProvider);
    final template = wizard.configuration.template;
    final dateFilterState = ref.watch(dateFilterProvider);
    final drawingState = ref.watch(drawingControllerProvider);

    if (template == null) {
      return const Center(child: Text('Selecione um template primeiro'));
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Configuração', style: AppTypography.h2),
          const SizedBox(height: 8),
          Text(
            'Defina o período, áreas e métricas do relatório',
            style: AppTypography.bodySmall.copyWith(color: Colors.grey[600]),
          ),
          const SizedBox(height: 32),

          // Período
          _buildPeriodSection(dateFilterState),
          const SizedBox(height: 24),

          // Áreas
          _buildAreasSection(drawingState),
          const SizedBox(height: 24),

          // Métricas
          _buildMetricsSection(template),
          const SizedBox(height: 24),

          // Filtros específicos (opcional)
          _buildFiltersSection(template),
        ],
      ),
    );
  }

  Widget _buildPeriodSection(DateFilterState dateFilterState) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.calendar_today, color: AppColors.primary, size: 20),
              const SizedBox(width: 8),
              Text('Período', style: AppTypography.h3),
            ],
          ),
          const SizedBox(height: 16),

          // Filtros predefinidos
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: DateRangeFilter.values.map((filter) {
              final isSelected = dateFilterState.filter == filter;
              return ChoiceChip(
                label: Text(_getFilterLabel(filter)),
                selected: isSelected,
                onSelected: (selected) {
                  if (selected) {
                    ref.read(dateFilterProvider.notifier).setFilter(filter);
                    final range = ref.read(dateFilterProvider).dateRange;
                    ref
                        .read(reportWizardProvider)
                        .setDateRange(
                          DateTimeRange(start: range.start, end: range.end),
                        );
                  }
                },
                selectedColor: AppColors.primary.withValues(alpha: 0.2),
                labelStyle: TextStyle(
                  color: isSelected ? AppColors.primary : Colors.grey[700],
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: 16),

          // Data selecionada
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.blue[50],
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.blue[200]!),
            ),
            child: Row(
              children: [
                Icon(Icons.info_outline, size: 16, color: Colors.blue[700]),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Período: ${DateFormat('dd/MM/yyyy').format(dateFilterState.dateRange.start)} - ${DateFormat('dd/MM/yyyy').format(dateFilterState.dateRange.end)}',
                    style: TextStyle(fontSize: 13, color: Colors.blue[900]),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAreasSection(DrawingState drawingState) {
    final areas = drawingState.savedAreas;

    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(Icons.map, color: AppColors.primary, size: 20),
                  const SizedBox(width: 8),
                  Text('Áreas', style: AppTypography.h3),
                ],
              ),
              Text(
                '${_selectedAreaIds.length} selecionada(s)',
                style: AppTypography.caption.copyWith(
                  color: AppColors.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          if (areas.isEmpty)
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.orange[50],
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.orange[200]!),
              ),
              child: Row(
                children: [
                  Icon(Icons.warning_amber, color: Colors.orange[700]),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Nenhuma área salva. Crie áreas no mapa primeiro.',
                      style: TextStyle(color: Colors.orange[900]),
                    ),
                  ),
                ],
              ),
            )
          else
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: areas.length,
              separatorBuilder: (context, index) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final area = areas[index];
                final isSelected = _selectedAreaIds.contains(area.id);

                return CheckboxListTile(
                  value: isSelected,
                  onChanged: (value) {
                    setState(() {
                      if (value == true) {
                        _selectedAreaIds.add(area.id);
                      } else {
                        _selectedAreaIds.remove(area.id);
                      }
                    });
                    ref
                        .read(reportWizardProvider)
                        .setSelectedAreas(_selectedAreaIds.toList());
                  },
                  title: Text(
                    area.name,
                    style: AppTypography.bodySmall.copyWith(
                      fontWeight: isSelected
                          ? FontWeight.bold
                          : FontWeight.normal,
                    ),
                  ),
                  subtitle: Text(
                    '${area.areaHectares.toStringAsFixed(2)} ha',
                    style: AppTypography.caption,
                  ),
                  secondary: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.primary, width: 2),
                    ),
                    child: Icon(
                      area.type == 'polygon' ? Icons.pentagon : Icons.circle,
                      color: AppColors.primary,
                      size: 20,
                    ),
                  ),
                  activeColor: AppColors.primary,
                  contentPadding: EdgeInsets.zero,
                );
              },
            ),
        ],
      ),
    );
  }

  Widget _buildMetricsSection(template) {
    final availableMetrics = template.availableMetrics;

    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(Icons.analytics, color: AppColors.primary, size: 20),
                  const SizedBox(width: 8),
                  Text('Métricas', style: AppTypography.h3),
                ],
              ),
              Text(
                '${_selectedMetrics.length}/${availableMetrics.length}',
                style: AppTypography.caption.copyWith(
                  color: AppColors.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Selecione as métricas a incluir no relatório',
            style: AppTypography.caption.copyWith(color: Colors.grey[600]),
          ),
          const SizedBox(height: 16),

          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: availableMetrics.map((metric) {
              final isSelected = _selectedMetrics.contains(metric);
              return FilterChip(
                label: Text(metric),
                selected: isSelected,
                onSelected: (selected) {
                  setState(() {
                    if (selected) {
                      _selectedMetrics.add(metric);
                    } else {
                      _selectedMetrics.remove(metric);
                    }
                  });
                  ref
                      .read(reportWizardProvider)
                      .setSelectedMetrics(_selectedMetrics.toList());
                },
                selectedColor: AppColors.primary.withValues(alpha: 0.2),
                checkmarkColor: AppColors.primary,
                labelStyle: TextStyle(
                  color: isSelected ? AppColors.primary : Colors.grey[700],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildFiltersSection(template) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.filter_list, color: AppColors.primary, size: 20),
              const SizedBox(width: 8),
              Text('Filtros Específicos', style: AppTypography.h3),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Filtros adicionais serão implementados em breve',
            style: AppTypography.caption.copyWith(color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }

  String _getFilterLabel(DateRangeFilter filter) {
    switch (filter) {
      case DateRangeFilter.last7Days:
        return 'Últimos 7 dias';
      case DateRangeFilter.last30Days:
        return 'Últimos 30 dias';
      case DateRangeFilter.last90Days:
        return 'Últimos 90 dias';
      case DateRangeFilter.thisMonth:
        return 'Este mês';
      case DateRangeFilter.lastMonth:
        return 'Mês passado';
      case DateRangeFilter.custom:
        return 'Personalizado';
    }
  }
}
