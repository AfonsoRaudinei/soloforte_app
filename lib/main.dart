import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'core/theme/app_theme.dart';
import 'core/router.dart';
import 'core/services/push_notification_service.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/generated/app_localizations.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // Initialize Push Notifications
  await PushNotificationService().initialize();

  /*
  await SentryFlutter.init((options) {
    // Use EnvConfig for DSN
    options.dsn = EnvConfig.sentryDsn;

    // Environment from EnvConfig
    options.environment = EnvConfig.environment;

    // Performance monitoring
    options.tracesSampleRate = 1.0;
    options.enableAutoPerformanceTracing = true;

    // Screenshots on errors
    options.attachScreenshot = true;
    options.screenshotQuality = SentryScreenshotQuality.medium;

    // User interaction tracking
    options.enableUserInteractionTracing = true;

    // Debug mode
    options.debug = false;
  }, appRunner: () => runApp(const ProviderScope(child: SoloForteApp())));
  */
  runApp(const ProviderScope(child: SoloForteApp()));
}

class SoloForteApp extends ConsumerWidget {
  const SoloForteApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      title: 'SoloForte',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routerConfig: router,
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: AppLocalizations.supportedLocales,
    );
  }
}
