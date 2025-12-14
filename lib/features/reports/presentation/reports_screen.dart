import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/reports/presentation/tabs/crop_summary_tab.dart';
import 'package:soloforte_app/features/reports/presentation/tabs/custom_report_tab.dart';
import 'package:soloforte_app/features/reports/presentation/tabs/ndvi_analysis_tab.dart';
import 'package:soloforte_app/features/reports/presentation/tabs/pest_report_tab.dart';
import 'package:soloforte_app/features/reports/presentation/tabs/weekly_report_tab.dart';
import 'package:soloforte_app/features/reports/application/report_service.dart';
import 'package:soloforte_app/features/map/application/drawing_controller.dart';

class ReportsScreen extends ConsumerStatefulWidget {
  const ReportsScreen({super.key});

  @override
  ConsumerState<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends ConsumerState<ReportsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isExporting = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _exportCurrentReport() async {
    if (_isExporting) return;

    setState(() => _isExporting = true);

    try {
      final reportService = ref.read(reportServiceProvider);
      final currentTab = _tabController.index;

      switch (currentTab) {
        case 0: // Weekly Report
          final data = await reportService.getWeeklyReport();
          await reportService.generateAndShareWeeklyReport(data);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Relatório Semanal exportado com sucesso!'),
              ),
            );
          }
          break;

        case 1: // NDVI Analysis
          final savedAreas = ref.read(drawingControllerProvider).savedAreas;
          if (savedAreas.isEmpty) {
            if (mounted) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(
                    'Crie uma área no mapa antes de exportar o relatório NDVI',
                  ),
                  backgroundColor: Colors.orange,
                ),
              );
            }
            return;
          }

          // For NDVI, we use the existing method that takes area, date, imageBytes, and stats
          // We'll need to fetch these separately or modify the method
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text(
                  'Use o botão de compartilhar na tela de detalhes NDVI',
                ),
                backgroundColor: Colors.blue,
              ),
            );
          }
          break;

        case 2: // Crop Summary
          final data = await reportService.getCropSummary();
          await reportService.generateAndShareCropSummary(data);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Resumo de Safra exportado com sucesso!'),
              ),
            );
          }
          break;

        case 3: // Pest Report
          final data = await reportService.getPestReport();
          await reportService.generateAndSharePestReport(data);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Relatório de Pragas exportado com sucesso!'),
              ),
            );
          }
          break;

        case 4: // Custom Report
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text(
                  'Use o botão "Gerar Relatório" dentro da aba Personalizado',
                ),
                backgroundColor: Colors.blue,
              ),
            );
          }
          break;
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao exportar relatório: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isExporting = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text('Relatórios'),
        backgroundColor: Colors.white,
        elevation: 0,
        foregroundColor: Colors.black,
        actions: [
          IconButton(
            icon: _isExporting
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Icon(Icons.download_rounded),
            onPressed: _isExporting ? null : _exportCurrentReport,
            tooltip: 'Exportar PDF',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          labelColor: AppColors.primary,
          unselectedLabelColor: Colors.grey,
          indicatorColor: AppColors.primary,
          indicatorWeight: 3,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold),
          tabs: const [
            Tab(text: 'Semanal'),
            Tab(text: 'NDVI'),
            Tab(text: 'Safra'),
            Tab(text: 'Pragas'),
            Tab(text: 'Personalizado'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [
          WeeklyReportTab(),
          NdviAnalysisTab(),
          CropSummaryTab(),
          PestReportTab(),
          CustomReportTab(),
        ],
      ),
    );
  }
}
