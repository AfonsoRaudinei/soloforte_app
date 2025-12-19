import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/visits/presentation/providers/visit_form_provider.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/active_visit/phenology_card.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/active_visit/problem_category_selector.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/active_visit/problem_details_form.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/active_visit/visit_header.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/active_visit/visit_photo_section.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/active_visit/visit_section.dart';
import 'package:soloforte_app/l10n/generated/app_localizations.dart';

class ActiveVisitScreen extends ConsumerStatefulWidget {
  const ActiveVisitScreen({super.key});

  @override
  ConsumerState<ActiveVisitScreen> createState() => _ActiveVisitScreenState();
}

class _ActiveVisitScreenState extends ConsumerState<ActiveVisitScreen> {
  // Form Controllers
  late TextEditingController _produtorCtrl;
  late TextEditingController _propriedadeCtrl;
  late TextEditingController _areaCtrl;
  late TextEditingController _cultivarCtrl;
  late TextEditingController _obsCtrl;
  late TextEditingController _recCtrl;
  late TextEditingController _tecnicoCtrl;
  final _locationCtrl = TextEditingController(text: "-23.5505, -46.6333");

  @override
  void initState() {
    super.initState();
    _produtorCtrl = TextEditingController();
    _propriedadeCtrl = TextEditingController();
    _areaCtrl = TextEditingController();
    _cultivarCtrl = TextEditingController();
    _obsCtrl = TextEditingController();
    _recCtrl = TextEditingController();
    _tecnicoCtrl = TextEditingController();

    // Sync controllers with state changes
    _produtorCtrl.addListener(() {
      ref.read(visitFormControllerProvider.notifier).updateProdutor(_produtorCtrl.text);
    });
    _propriedadeCtrl.addListener(() {
      ref
          .read(visitFormControllerProvider.notifier)
          .updatePropriedade(_propriedadeCtrl.text);
    });
    _areaCtrl.addListener(() {
      ref.read(visitFormControllerProvider.notifier).updateArea(_areaCtrl.text);
    });
    _cultivarCtrl.addListener(() {
      ref.read(visitFormControllerProvider.notifier).updateCultivar(_cultivarCtrl.text);
    });
    _obsCtrl.addListener(() {
      ref.read(visitFormControllerProvider.notifier).updateObs(_obsCtrl.text);
    });
    _recCtrl.addListener(() {
      ref.read(visitFormControllerProvider.notifier).updateRecommendations(_recCtrl.text);
    });
    _tecnicoCtrl.addListener(() {
      ref.read(visitFormControllerProvider.notifier).updateTecnico(_tecnicoCtrl.text);
    });
  }

  @override
  void dispose() {
    _produtorCtrl.dispose();
    _propriedadeCtrl.dispose();
    _areaCtrl.dispose();
    _cultivarCtrl.dispose();
    _obsCtrl.dispose();
    _recCtrl.dispose();
    _tecnicoCtrl.dispose();
    _locationCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(visitFormControllerProvider);
    final notifier = ref.read(visitFormControllerProvider.notifier);

    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.visitInProgressTitle),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 1,
        titleTextStyle: AppTypography.h4.copyWith(color: AppColors.textPrimary),
        leading: IconButton(
          icon: const Icon(Icons.close, color: AppColors.textPrimary),
          onPressed: () => context.pop(),
        ),
        actions: [
          TextButton.icon(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                    AppLocalizations.of(context)!.visitSavedPdfGenerated,
                  ),
                ),
              );
              context.pop();
            },
            icon: const Icon(Icons.save_alt, size: 18),
            label: Text(AppLocalizations.of(context)!.save),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            VisitHeader(
              produtorCtrl: _produtorCtrl,
              propriedadeCtrl: _propriedadeCtrl,
              areaCtrl: _areaCtrl,
              cultivarCtrl: _cultivarCtrl,
              tecnicoCtrl: _tecnicoCtrl,
              locationCtrl: _locationCtrl,
              visitDate: state.visitDate,
              plantDate: state.plantDate,
              dap: state.dap,
              onDateTap: () async {
                final d = await showDatePicker(
                  context: context,
                  initialDate: state.visitDate,
                  firstDate: DateTime(2020),
                  lastDate: DateTime(2030),
                );
                if (d != null) notifier.setVisitDate(d);
              },
              onPlantDateTap: () async {
                final d = await showDatePicker(
                  context: context,
                  initialDate: state.plantDate ?? DateTime.now(),
                  firstDate: DateTime(2020),
                  lastDate: DateTime.now(),
                );
                if (d != null) notifier.setPlantDate(d);
              },
            ),
            const SizedBox(height: 16),
            PhenologyCard(
              selectedStageKey: state.selectedStageKey,
              onStageChanged: notifier.setStage,
            ),
            const SizedBox(height: 16),
            ProblemCategorySelector(
              selectedCategories: state.selectedCategories,
              onToggleCategory: notifier.toggleCategory,
            ),
            if (state.selectedCategories.isNotEmpty) ...[
              const SizedBox(height: 16),
              ProblemDetailsForm(
                selectedCategories: state.selectedCategories,
                problemsData: state.problemsData,
                selectedNutrients: state.selectedNutrients,
                onSeverityChanged: notifier.setSeverity,
                onToggleNutrient: notifier.toggleNutrient,
              ),
            ],
            const SizedBox(height: 16),
            VisitPhotoSection(
              photos: state.photos,
              onAddPhoto: notifier.addMockPhoto,
              onDeletePhoto: notifier.removePhoto,
            ),
            const SizedBox(height: 16),
            _buildTextSection(
              AppLocalizations.of(context)!.observations,
              _obsCtrl,
              AppLocalizations.of(context)!.generalObservationsHint,
            ),
            const SizedBox(height: 16),
            _buildTextSection(
              AppLocalizations.of(context)!.recommendations,
              _recCtrl,
              AppLocalizations.of(context)!.technicalRecommendationsHint,
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildTextSection(
    String title,
    TextEditingController ctrl,
    String hint,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        VisitSectionHeader(title: title),
        VisitSectionCard(
          child: TextField(
            controller: ctrl,
            maxLines: 4,
            decoration: InputDecoration(
              hintText: hint,
              border: InputBorder.none,
            ),
          ),
        ),
      ],
    );
  }
}
