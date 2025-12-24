import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_pt.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'generated/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[Locale('pt')];

  /// Nome da aplicação
  ///
  /// In pt, this message translates to:
  /// **'SoloForte'**
  String get appTitle;

  /// No description provided for @errorLocation.
  ///
  /// In pt, this message translates to:
  /// **'Erro ao obter localização.'**
  String get errorLocation;

  /// No description provided for @locationDisabled.
  ///
  /// In pt, this message translates to:
  /// **'Serviços de localização desativados.'**
  String get locationDisabled;

  /// No description provided for @locationPermissionDenied.
  ///
  /// In pt, this message translates to:
  /// **'Permissão de localização negada.'**
  String get locationPermissionDenied;

  /// No description provided for @locationPermissionDeniedForever.
  ///
  /// In pt, this message translates to:
  /// **'Permissões de localização permanentemente negadas.'**
  String get locationPermissionDeniedForever;

  /// No description provided for @synced.
  ///
  /// In pt, this message translates to:
  /// **'Sincronizado'**
  String get synced;

  /// No description provided for @offlineMode.
  ///
  /// In pt, this message translates to:
  /// **'Modo Offline'**
  String get offlineMode;

  /// No description provided for @noOccurrences.
  ///
  /// In pt, this message translates to:
  /// **'Sem ocorrências'**
  String get noOccurrences;

  /// No description provided for @activeOccurrences.
  ///
  /// In pt, this message translates to:
  /// **'Ocorrências Ativas'**
  String get activeOccurrences;

  /// No description provided for @severity.
  ///
  /// In pt, this message translates to:
  /// **'Severidade'**
  String get severity;

  /// No description provided for @noAreasRegistered.
  ///
  /// In pt, this message translates to:
  /// **'Nenhuma área cadastrada'**
  String get noAreasRegistered;

  /// No description provided for @visitInProgress.
  ///
  /// In pt, this message translates to:
  /// **'Em andamento: {clientName}'**
  String visitInProgress(String clientName);

  /// No description provided for @layers.
  ///
  /// In pt, this message translates to:
  /// **'Camadas'**
  String get layers;

  /// No description provided for @optionsEditDelete.
  ///
  /// In pt, this message translates to:
  /// **'Opções: Editar / Excluir'**
  String get optionsEditDelete;

  /// No description provided for @areaMenu.
  ///
  /// In pt, this message translates to:
  /// **'Menu da Área'**
  String get areaMenu;

  /// No description provided for @daysAgo.
  ///
  /// In pt, this message translates to:
  /// **'{days}d atrás'**
  String daysAgo(int days);

  /// No description provided for @hoursAgo.
  ///
  /// In pt, this message translates to:
  /// **'{hours}h atrás'**
  String hoursAgo(int hours);

  /// No description provided for @minutesAgo.
  ///
  /// In pt, this message translates to:
  /// **'{minutes}m atrás'**
  String minutesAgo(int minutes);

  /// No description provided for @now.
  ///
  /// In pt, this message translates to:
  /// **'Agora'**
  String get now;

  /// No description provided for @visitInProgressTitle.
  ///
  /// In pt, this message translates to:
  /// **'Visita em Andamento'**
  String get visitInProgressTitle;

  /// No description provided for @visitSavedPdfGenerated.
  ///
  /// In pt, this message translates to:
  /// **'Visita Salva! PDF gerado.'**
  String get visitSavedPdfGenerated;

  /// No description provided for @save.
  ///
  /// In pt, this message translates to:
  /// **'Salvar'**
  String get save;

  /// No description provided for @observations.
  ///
  /// In pt, this message translates to:
  /// **'Observações'**
  String get observations;

  /// No description provided for @generalObservationsHint.
  ///
  /// In pt, this message translates to:
  /// **'Observações gerais...'**
  String get generalObservationsHint;

  /// No description provided for @recommendations.
  ///
  /// In pt, this message translates to:
  /// **'Recomendações'**
  String get recommendations;

  /// No description provided for @technicalRecommendationsHint.
  ///
  /// In pt, this message translates to:
  /// **'Recomendações técnicas...'**
  String get technicalRecommendationsHint;

  /// No description provided for @visitInfo.
  ///
  /// In pt, this message translates to:
  /// **'Informações da Visita'**
  String get visitInfo;

  /// No description provided for @producer.
  ///
  /// In pt, this message translates to:
  /// **'Produtor'**
  String get producer;

  /// No description provided for @property.
  ///
  /// In pt, this message translates to:
  /// **'Propriedade'**
  String get property;

  /// No description provided for @date.
  ///
  /// In pt, this message translates to:
  /// **'Data'**
  String get date;

  /// No description provided for @areaHa.
  ///
  /// In pt, this message translates to:
  /// **'Área (ha)'**
  String get areaHa;

  /// No description provided for @cultivar.
  ///
  /// In pt, this message translates to:
  /// **'Cultivar'**
  String get cultivar;

  /// No description provided for @planting.
  ///
  /// In pt, this message translates to:
  /// **'Plantio'**
  String get planting;

  /// No description provided for @select.
  ///
  /// In pt, this message translates to:
  /// **'Selecionar'**
  String get select;

  /// No description provided for @dapDays.
  ///
  /// In pt, this message translates to:
  /// **'DAP: {days} dias'**
  String dapDays(int days);

  /// No description provided for @technician.
  ///
  /// In pt, this message translates to:
  /// **'Técnico'**
  String get technician;

  /// No description provided for @locationGps.
  ///
  /// In pt, this message translates to:
  /// **'Local (GPS)'**
  String get locationGps;

  /// No description provided for @typeHere.
  ///
  /// In pt, this message translates to:
  /// **'Digite...'**
  String get typeHere;

  /// No description provided for @photos.
  ///
  /// In pt, this message translates to:
  /// **'Fotos'**
  String get photos;

  /// No description provided for @addPhoto.
  ///
  /// In pt, this message translates to:
  /// **'Adicionar Foto'**
  String get addPhoto;

  /// No description provided for @catDisease.
  ///
  /// In pt, this message translates to:
  /// **'Doença'**
  String get catDisease;

  /// No description provided for @catInsects.
  ///
  /// In pt, this message translates to:
  /// **'Insetos'**
  String get catInsects;

  /// No description provided for @catWeeds.
  ///
  /// In pt, this message translates to:
  /// **'Ervas Daninhas'**
  String get catWeeds;

  /// No description provided for @catNutrients.
  ///
  /// In pt, this message translates to:
  /// **'Nutrientes'**
  String get catNutrients;

  /// No description provided for @catWater.
  ///
  /// In pt, this message translates to:
  /// **'Água'**
  String get catWater;

  /// No description provided for @idIncidence.
  ///
  /// In pt, this message translates to:
  /// **'Incidência'**
  String get idIncidence;

  /// No description provided for @idSeverity.
  ///
  /// In pt, this message translates to:
  /// **'Severidade'**
  String get idSeverity;

  /// No description provided for @idDefoliation.
  ///
  /// In pt, this message translates to:
  /// **'Desfolha'**
  String get idDefoliation;

  /// No description provided for @idInfestation.
  ///
  /// In pt, this message translates to:
  /// **'Infestação'**
  String get idInfestation;

  /// No description provided for @idLodging.
  ///
  /// In pt, this message translates to:
  /// **'Acamamento'**
  String get idLodging;

  /// No description provided for @sevNone.
  ///
  /// In pt, this message translates to:
  /// **'Nenhum'**
  String get sevNone;

  /// No description provided for @sevLow.
  ///
  /// In pt, this message translates to:
  /// **'Baixa'**
  String get sevLow;

  /// No description provided for @sevMedium.
  ///
  /// In pt, this message translates to:
  /// **'Média'**
  String get sevMedium;

  /// No description provided for @sevHigh.
  ///
  /// In pt, this message translates to:
  /// **'Alta'**
  String get sevHigh;

  /// No description provided for @nutNitrogen.
  ///
  /// In pt, this message translates to:
  /// **'Nitrogênio'**
  String get nutNitrogen;

  /// No description provided for @nutPhosphorus.
  ///
  /// In pt, this message translates to:
  /// **'Fósforo'**
  String get nutPhosphorus;

  /// No description provided for @nutPotassium.
  ///
  /// In pt, this message translates to:
  /// **'Potássio'**
  String get nutPotassium;

  /// No description provided for @nutCalcium.
  ///
  /// In pt, this message translates to:
  /// **'Cálcio'**
  String get nutCalcium;

  /// No description provided for @nutMagnesium.
  ///
  /// In pt, this message translates to:
  /// **'Magnésio'**
  String get nutMagnesium;

  /// No description provided for @nutSulfur.
  ///
  /// In pt, this message translates to:
  /// **'Enxofre'**
  String get nutSulfur;

  /// No description provided for @nutBoron.
  ///
  /// In pt, this message translates to:
  /// **'Boro'**
  String get nutBoron;

  /// No description provided for @nutZinc.
  ///
  /// In pt, this message translates to:
  /// **'Zinco'**
  String get nutZinc;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['pt'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'pt':
      return AppLocalizationsPt();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
