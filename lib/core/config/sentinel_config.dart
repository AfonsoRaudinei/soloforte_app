class SentinelConfig {
  static const String baseUrl = 'https://services.sentinel-hub.com';
  static const String authUrl = 'https://services.sentinel-hub.com/oauth/token';
  static const String processUrl =
      'https://services.sentinel-hub.com/api/v1/process';
  static const String catalogUrl =
      'https://services.sentinel-hub.com/api/v1/catalog';
  static const String statisticsUrl =
      'https://services.sentinel-hub.com/api/v1/statistics';

  // OAUTH CREDENTIALS
  // Replace these with your actual credentials or pass them via --dart-define
  static String get clientId {
    return const String.fromEnvironment(
      'SENTINEL_CLIENT_ID',
      defaultValue: 'YOUR_CLIENT_ID_HERE',
    );
  }

  static String get clientSecret {
    return const String.fromEnvironment(
      'SENTINEL_CLIENT_SECRET',
      defaultValue: 'YOUR_CLIENT_SECRET_HERE',
    );
  }

  // Sentinel-2 L2A Collection ID
  static const String sentinel2CollectionId = 'sentinel-2-l2a';
}
