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

  @override
  String get visitInProgressTitle => 'Visita em Andamento';

  @override
  String get visitSavedPdfGenerated => 'Visita Salva! PDF gerado.';

  @override
  String get save => 'Salvar';

  @override
  String get observations => 'Observações';

  @override
  String get generalObservationsHint => 'Observações gerais...';

  @override
  String get recommendations => 'Recomendações';

  @override
  String get technicalRecommendationsHint => 'Recomendações técnicas...';

  @override
  String get visitInfo => 'Informações da Visita';

  @override
  String get producer => 'Produtor';

  @override
  String get property => 'Propriedade';

  @override
  String get date => 'Data';

  @override
  String get areaHa => 'Área (ha)';

  @override
  String get cultivar => 'Cultivar';

  @override
  String get planting => 'Plantio';

  @override
  String get select => 'Selecionar';

  @override
  String dapDays(int days) {
    return 'DAP: $days dias';
  }

  @override
  String get technician => 'Técnico';

  @override
  String get locationGps => 'Local (GPS)';

  @override
  String get typeHere => 'Digite...';

  @override
  String get photos => 'Fotos';

  @override
  String get addPhoto => 'Adicionar Foto';

  @override
  String get catDisease => 'Doença';

  @override
  String get catInsects => 'Insetos';

  @override
  String get catWeeds => 'Ervas Daninhas';

  @override
  String get catNutrients => 'Nutrientes';

  @override
  String get catWater => 'Água';

  @override
  String get idIncidence => 'Incidência';

  @override
  String get idSeverity => 'Severidade';

  @override
  String get idDefoliation => 'Desfolha';

  @override
  String get idInfestation => 'Infestação';

  @override
  String get idLodging => 'Acamamento';

  @override
  String get sevNone => 'Nenhum';

  @override
  String get sevLow => 'Baixa';

  @override
  String get sevMedium => 'Média';

  @override
  String get sevHigh => 'Alta';

  @override
  String get nutNitrogen => 'Nitrogênio';

  @override
  String get nutPhosphorus => 'Fósforo';

  @override
  String get nutPotassium => 'Potássio';

  @override
  String get nutCalcium => 'Cálcio';

  @override
  String get nutMagnesium => 'Magnésio';

  @override
  String get nutSulfur => 'Enxofre';

  @override
  String get nutBoron => 'Boro';

  @override
  String get nutZinc => 'Zinco';
}
