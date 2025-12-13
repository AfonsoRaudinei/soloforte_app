#!/bin/bash

# 🔒 Build Release com Obfuscation - Android

echo "🚀 Building Android Release with Obfuscation..."

# Clean
echo "🧹 Cleaning..."
flutter clean
flutter pub get

# Build APK com obfuscation
echo "📦 Building APK..."
flutter build apk \
  --release \
  --obfuscate \
  --split-debug-info=build/app/outputs/symbols \
  --dart-define=ENV=prod \
  --target-platform android-arm64

echo "✅ APK built successfully!"
echo "📍 Location: build/app/outputs/flutter-apk/app-release.apk"
echo "🔐 Symbols: build/app/outputs/symbols"

# Build App Bundle (para Google Play)
echo "📦 Building App Bundle..."
flutter build appbundle \
  --release \
  --obfuscate \
  --split-debug-info=build/app/outputs/symbols-bundle \
  --dart-define=ENV=prod

echo "✅ App Bundle built successfully!"
echo "📍 Location: build/app/outputs/bundle/release/app-release.aab"

# Informações
echo ""
echo "📊 Build Info:"
echo "   - Obfuscation: ✅ Enabled"
echo "   - ProGuard: ✅ Enabled"
echo "   - R8: ✅ Enabled"
echo "   - Debug Symbols: Stripped"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Guarde os símbolos em build/app/outputs/symbols"
echo "   - Necessário para debugging de crashes"
echo "   - Upload para Firebase Crashlytics/Sentry"
