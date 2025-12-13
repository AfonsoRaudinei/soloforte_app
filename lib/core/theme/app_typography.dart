import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

/// Design System Typography - Extraído do projeto React
/// Baseado em Tailwind CSS v4 text sizes
class AppTypography {
  // Font Weights (do CSS: --font-weight-*)
  static const FontWeight normal = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight semibold = FontWeight.w600;
  static const FontWeight bold = FontWeight.w700;
  static const FontWeight black = FontWeight.w900;

  // Headings (do CSS: h1, h2, h3, h4)
  static TextStyle get h1 => GoogleFonts.inter(
    fontSize: 24, // --text-2xl: 1.5rem
    fontWeight: medium,
    height: 1.5,
    color: AppColors.textPrimary,
  );

  static TextStyle get h2 => GoogleFonts.inter(
    fontSize: 20, // --text-xl: 1.25rem
    fontWeight: medium,
    height: 1.5,
    color: AppColors.textPrimary,
  );

  static TextStyle get h3 => GoogleFonts.inter(
    fontSize: 18, // --text-lg: 1.125rem
    fontWeight: medium,
    height: 1.5,
    color: AppColors.textPrimary,
  );

  static TextStyle get h4 => GoogleFonts.inter(
    fontSize: 16, // --text-base: 1rem
    fontWeight: medium,
    height: 1.5,
    color: AppColors.textPrimary,
  );

  // Body Text (do CSS: p, input)
  static TextStyle get bodyLarge => GoogleFonts.inter(
    fontSize: 16, // --text-base
    fontWeight: normal,
    height: 1.5,
    color: AppColors.textPrimary,
  );

  static TextStyle get bodyMedium => GoogleFonts.inter(
    fontSize: 14, // --text-sm: 0.875rem
    fontWeight: normal,
    height: 1.43, // calc(1.25 / 0.875)
    color: AppColors.textPrimary,
  );

  static TextStyle get bodySmall => GoogleFonts.inter(
    fontSize: 12, // --text-xs: 0.75rem
    fontWeight: normal,
    height: 1.33, // calc(1 / 0.75)
    color: AppColors.textSecondary,
  );

  // Labels & Buttons (do CSS: label, button)
  static TextStyle get label => GoogleFonts.inter(
    fontSize: 14, // --text-sm
    fontWeight: medium,
    height: 1.43,
    color: AppColors.textPrimary,
  );

  static TextStyle get button => GoogleFonts.inter(
    fontSize: 16, // --text-base
    fontWeight: semibold,
    height: 1.5,
    color: Colors.white,
  );

  static TextStyle get buttonSmall => GoogleFonts.inter(
    fontSize: 14, // --text-sm
    fontWeight: semibold,
    height: 1.43,
    color: Colors.white,
  );

  // Caption & Helper Text
  static TextStyle get caption => GoogleFonts.inter(
    fontSize: 12, // --text-xs
    fontWeight: normal,
    height: 1.33,
    color: AppColors.textSecondary,
  );

  static TextStyle get overline => GoogleFonts.inter(
    fontSize: 10,
    fontWeight: medium,
    height: 1.6,
    letterSpacing: 0.5,
    color: AppColors.textSecondary,
  );

  // Display Sizes (para títulos grandes)
  static TextStyle get display1 => GoogleFonts.inter(
    fontSize: 48, // --text-5xl: 3rem
    fontWeight: bold,
    height: 1.0,
    color: AppColors.textPrimary,
  );

  static TextStyle get display2 => GoogleFonts.inter(
    fontSize: 36, // --text-4xl: 2.25rem
    fontWeight: bold,
    height: 1.11, // calc(2.5 / 2.25)
    color: AppColors.textPrimary,
  );

  static TextStyle get display3 => GoogleFonts.inter(
    fontSize: 30, // --text-3xl: 1.875rem
    fontWeight: bold,
    height: 1.2, // calc(2.25 / 1.875)
    color: AppColors.textPrimary,
  );
}
