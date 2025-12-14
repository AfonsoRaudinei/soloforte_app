/// Design System Spacing - Extraído do projeto React
/// Baseado em Tailwind CSS v4 spacing scale
/// Base: --spacing: 0.25rem (4px)
class AppSpacing {
  // Base spacing unit: 4px
  static const double base = 4.0;

  // Spacing Scale (múltiplos de 4px)
  static const double xs = base * 1; // 4px
  static const double sm = base * 2; // 8px
  static const double md = base * 3; // 12px
  static const double lg = base * 4; // 16px
  static const double xl = base * 5; // 20px
  static const double xxl = base * 6; // 24px
  static const double xxxl = base * 8; // 32px

  // Specific Sizes (do CSS)
  static const double spacing0 = 0;
  static const double spacing1 = base * 1; // 4px
  static const double spacing2 = base * 2; // 8px
  static const double spacing3 = base * 3; // 12px
  static const double spacing4 = base * 4; // 16px
  static const double spacing5 = base * 5; // 20px
  static const double spacing6 = base * 6; // 24px
  static const double spacing8 = base * 8; // 32px
  static const double spacing10 = base * 10; // 40px
  static const double spacing12 = base * 12; // 48px
  static const double spacing16 = base * 16; // 64px
  static const double spacing20 = base * 20; // 80px
  static const double spacing24 = base * 24; // 96px
  static const double spacing32 = base * 32; // 128px

  // Border Radius (do CSS: --radius-*)
  static const double radiusXs = 2.0; // --radius-xs: 0.125rem
  static const double radiusSm = 4.0; // default small
  static const double radiusMd = 8.0; // default medium
  static const double radiusLg = 12.0; // default large
  static const double radiusXl = 16.0; // default xl
  static const double radius2xl = 16.0; // --radius-2xl: 1rem
  static const double radius3xl = 24.0; // --radius-3xl: 1.5rem
  static const double radiusFull = 9999.0; // circular

  // Container Sizes (do CSS: --container-*)
  static const double containerXs = 320.0; // --container-xs: 20rem
  static const double containerSm = 384.0; // --container-sm: 24rem
  static const double containerMd = 448.0; // --container-md: 28rem
  static const double containerLg = 512.0; // --container-lg: 32rem
  static const double containerXl = 576.0;
  static const double container2xl = 672.0; // --container-2xl: 42rem
  static const double container4xl = 896.0; // --container-4xl: 56rem
  static const double container7xl = 1280.0; // --container-7xl: 80rem
}
