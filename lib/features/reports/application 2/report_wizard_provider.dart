import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/features/reports/domain/report_configuration.dart';

/// Notifier para gerenciar o estado do wizard de criação de relatórios
class ReportWizardNotifier extends ChangeNotifier {
  int _currentStep = 0;
  ReportConfiguration _configuration = ReportConfiguration();

  int get currentStep => _currentStep;
  ReportConfiguration get configuration => _configuration;

  bool get canGoNext {
    switch (_currentStep) {
      case 0: // Tipo
        return _configuration.template != null;
      case 1: // Configuração
        return _configuration.dateRange != null &&
            _configuration.selectedAreaIds.isNotEmpty;
      case 2: // Personalização
        return true; // Sempre pode avançar
      case 3: // Preview
        return _configuration.isValid;
      default:
        return false;
    }
  }

  bool get canGoPrevious => _currentStep > 0;

  bool get isLastStep => _currentStep == 3;

  void nextStep() {
    if (canGoNext && _currentStep < 3) {
      _currentStep++;
      notifyListeners();
    }
  }

  void previousStep() {
    if (canGoPrevious) {
      _currentStep--;
      notifyListeners();
    }
  }

  void goToStep(int step) {
    if (step >= 0 && step <= 3) {
      _currentStep = step;
      notifyListeners();
    }
  }

  void updateConfiguration(ReportConfiguration config) {
    _configuration = config;
    notifyListeners();
  }

  void selectTemplate(ReportTemplate template) {
    _configuration = _configuration.copyWith(template: template);
    notifyListeners();
  }

  void setDateRange(DateTimeRange dateRange) {
    _configuration = _configuration.copyWith(dateRange: dateRange);
    notifyListeners();
  }

  void setSelectedAreas(List<String> areaIds) {
    _configuration = _configuration.copyWith(selectedAreaIds: areaIds);
    notifyListeners();
  }

  void setFilters(Map<String, dynamic> filters) {
    _configuration = _configuration.copyWith(filters: filters);
    notifyListeners();
  }

  void setSelectedMetrics(List<String> metrics) {
    _configuration = _configuration.copyWith(selectedMetrics: metrics);
    notifyListeners();
  }

  void setCustomTitle(String title) {
    _configuration = _configuration.copyWith(customTitle: title);
    notifyListeners();
  }

  void setLogoPath(String? path) {
    _configuration = _configuration.copyWith(logoPath: path);
    notifyListeners();
  }

  void setHeaderTemplate(String template) {
    _configuration = _configuration.copyWith(headerTemplate: template);
    notifyListeners();
  }

  void setIncludedSections(List<String> sections) {
    _configuration = _configuration.copyWith(includedSections: sections);
    notifyListeners();
  }

  void setGeneralNotes(String notes) {
    _configuration = _configuration.copyWith(generalNotes: notes);
    notifyListeners();
  }

  void reset() {
    _currentStep = 0;
    _configuration = ReportConfiguration();
    notifyListeners();
  }
}

/// Provider para o wizard de relatórios
final reportWizardProvider = ChangeNotifierProvider<ReportWizardNotifier>((
  ref,
) {
  return ReportWizardNotifier();
});
