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
/// import 'l10n/app_localizations.dart';
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
