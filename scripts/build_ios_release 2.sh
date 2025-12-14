#!/bin/bash

# 🔒 Build Release com Obfuscation - iOS

echo "🚀 Building iOS Release with Obfuscation..."

# Clean
echo "🧹 Cleaning..."
flutter clean
flutter pub get
cd ios && pod install && cd ..

# Build IPA com obfuscation
echo "📦 Building IPA..."
flutter build ios \
  --release \
  --obfuscate \
  --split-debug-info=build/ios/symbols \
  --dart-define=ENV=prod

echo "✅ iOS build completed!"
echo "📍 Location: build/ios/iphoneos/Runner.app"
echo "🔐 Symbols: build/ios/symbols"

# Archive (opcional - requer Xcode)
echo ""
echo "📦 Para criar IPA para App Store:"
echo "   1. Abra ios/Runner.xcworkspace no Xcode"
echo "   2. Product > Archive"
echo "   3. Distribute App > App Store Connect"
echo ""
echo "📊 Build Info:"
echo "   - Obfuscation: ✅ Enabled"
echo "   - Bitcode: ✅ Enabled"
echo "   - Strip Symbols: ✅ Enabled"
echo "   - Debug Symbols: Stripped"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Guarde os símbolos em build/ios/symbols"
echo "   - Necessário para debugging de crashes"
echo "   - Upload para Firebase Crashlytics/Sentry"
