# Flutter Wrapper
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.** { *; }
-keep class io.flutter.util.** { *; }
-keep class io.flutter.view.** { *; }
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

# Flutter Engine
-keep class io.flutter.embedding.** { *; }

# Dio (HTTP Client)
-keep class com.dio.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**

# Secure Storage
-keep class com.it_nomads.fluttersecurestorage.** { *; }

# Riverpod
-keepattributes *Annotation*
-keep class * extends riverpod.** { *; }

# Freezed & JSON Serialization
-keepattributes Signature
-keepattributes *Annotation*
-keep class * {
  @com.google.gson.annotations.SerializedName <fields>;
}
-keep class * extends com.google.gson.TypeAdapter

# Keep model classes
-keep class com.soloforte.app.**.model.** { *; }
-keep class com.soloforte.app.**.domain.** { *; }

# Geolocator
-keep class com.baseflow.geolocator.** { *; }

# Google Maps (if using)
-keep class com.google.android.gms.maps.** { *; }
-keep interface com.google.android.gms.maps.** { *; }

# Remove logging in release
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Optimization
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontpreverify
-verbose

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep setters/getters
-keepclassmembers public class * extends android.view.View {
   void set*(***);
   *** get*();
}

# Keep Parcelables
-keepclassmembers class * implements android.os.Parcelable {
  public static final android.os.Parcelable$Creator CREATOR;
}

# Keep Enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}
