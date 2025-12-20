import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../domain/usecases/calculate_dap.dart';
// import '../../domain/usecases/save_visit.dart';
// Note: We might need Client entity import if we construct Visit object here
// For now, using mock or strings as per existing state

part 'visit_form_provider.freezed.dart';
part 'visit_form_provider.g.dart';

@freezed
class VisitFormState with _$VisitFormState {
  const factory VisitFormState({
    required DateTime visitDate,
    DateTime? plantDate,
    @Default(0) int dap,
    String? selectedStageKey,
    @Default({}) Set<String> selectedCategories,
    @Default({}) Map<String, Map<String, String>> problemsData,
    @Default({}) Set<String> selectedNutrients,
    @Default([]) List<Map<String, dynamic>> photos,
    @Default('') String produtor,
    @Default('') String propriedade,
    @Default('') String area,
    @Default('') String cultivar,
    @Default('') String tecnico,
    @Default('') String obs,
    @Default('') String recommendations,
  }) = _VisitFormState;
}

@riverpod
class VisitFormController extends _$VisitFormController {
  @override
  VisitFormState build() {
    return VisitFormState(visitDate: DateTime.now());
  }

  void setVisitDate(DateTime date) {
    state = state.copyWith(visitDate: date);
    _calculateDAP();
  }

  void setPlantDate(DateTime date) {
    state = state.copyWith(plantDate: date);
    _calculateDAP();
  }

  void _calculateDAP() {
    if (state.plantDate != null) {
      final calculateDap = ref.read(calculateDapProvider);
      final dap = calculateDap(state.plantDate!, state.visitDate);
      state = state.copyWith(dap: dap);
    }
  }

  void setStage(String? stageKey) {
    state = state.copyWith(selectedStageKey: stageKey);
  }

  void toggleCategory(String key) {
    final newCategories = Set<String>.from(state.selectedCategories);
    final newProblemsData = Map<String, Map<String, String>>.from(
      state.problemsData,
    );
    final newNutrients = Set<String>.from(state.selectedNutrients);

    if (newCategories.contains(key)) {
      newCategories.remove(key);
      newProblemsData.remove(key);
      if (key == 'nutrients') newNutrients.clear();
    } else {
      newCategories.add(key);
    }

    state = state.copyWith(
      selectedCategories: newCategories,
      problemsData: newProblemsData,
      selectedNutrients: newNutrients,
    );
  }

  void setSeverity(String catKey, String subKey, String value) {
    final newProblemsData = Map<String, Map<String, String>>.from(
      state.problemsData,
    );
    if (!newProblemsData.containsKey(catKey)) {
      newProblemsData[catKey] = {};
    }

    final innerMap = Map<String, String>.from(newProblemsData[catKey]!);
    innerMap[subKey] = value;
    newProblemsData[catKey] = innerMap;

    state = state.copyWith(problemsData: newProblemsData);
  }

  void toggleNutrient(String nutrientId) {
    final newNutrients = Set<String>.from(state.selectedNutrients);
    if (newNutrients.contains(nutrientId)) {
      newNutrients.remove(nutrientId);
    } else {
      newNutrients.add(nutrientId);
    }
    state = state.copyWith(selectedNutrients: newNutrients);
  }

  void addMockPhoto() {
    final newPhotos = List<Map<String, dynamic>>.from(state.photos);
    newPhotos.add({
      'id': DateTime.now().toString(),
      'type': 'Geral',
      'category': 'Geral',
      'image': 'assets/images/mock_farm_1.jpg',
    });
    state = state.copyWith(photos: newPhotos);
  }

  void removePhoto(Map<String, dynamic> photo) {
    final newPhotos = List<Map<String, dynamic>>.from(state.photos);
    newPhotos.remove(photo);
    state = state.copyWith(photos: newPhotos);
  }

  // Text Field Updates - can be bound directly to controllers in UI,
  // but updating state here ensures it persists if fields are rebuilt.
  void updateProdutor(String value) => state = state.copyWith(produtor: value);
  void updatePropriedade(String value) =>
      state = state.copyWith(propriedade: value);
  void updateArea(String value) => state = state.copyWith(area: value);
  void updateCultivar(String value) => state = state.copyWith(cultivar: value);
  void updateTecnico(String value) => state = state.copyWith(tecnico: value);
  void updateObs(String value) => state = state.copyWith(obs: value);
  void updateRecommendations(String value) =>
      state = state.copyWith(recommendations: value);

  Future<void> saveVisit() async {
    // final saveVisit = ref.read(saveVisitProvider);
    // Construct Visit Entity from State
    // Implementation pending real Client object and proper ID generation
    // saveVisit(visitEntity);
  }
}
