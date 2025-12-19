// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Portuguese (`pt`).
class AppLocalizationsPt extends AppLocalizations {
  AppLocalizationsPt([String locale = 'pt']) : super(locale);

  @override
  String get appTitle => 'SoloForte';

  @override
  String get errorLocation => 'Erro ao obter localização.';

  @override
  String get locationDisabled => 'Serviços de localização desativados.';

  @override
  String get locationPermissionDenied => 'Permissão de localização negada.';

  @override
  String get locationPermissionDeniedForever =>
      'Permissões de localização permanentemente negadas.';

  @override
  String get synced => 'Sincronizado';

  @override
  String get offlineMode => 'Modo Offline';

  @override
  String get noOccurrences => 'Sem ocorrências';

  @override
  String get activeOccurrences => 'Ocorrências Ativas';

  @override
  String get severity => 'Severidade';

  @override
  String get noAreasRegistered => 'Nenhuma área cadastrada';

  @override
  String visitInProgress(String clientName) {
    return 'Em andamento: $clientName';
  }

  @override
  String get layers => 'Camadas';

  @override
  String get optionsEditDelete => 'Opções: Editar / Excluir';

  @override
  String get areaMenu => 'Menu da Área';

  @override
  String daysAgo(int days) {
    return '${days}d atrás';
  }

  @override
  String hoursAgo(int hours) {
    return '${hours}h atrás';
  }

  @override
  String minutesAgo(int minutes) {
    return '${minutes}m atrás';
  }

  @override
  String get now => 'Agora';
}
