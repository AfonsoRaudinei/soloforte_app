import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/map/presentation/widgets/premium_glass_container.dart';

class PremiumDialog extends StatefulWidget {
  final String title;
  final Widget content;
  final List<Widget>? actions;
  final VoidCallback? onClose;

  const PremiumDialog({
    super.key,
    required this.title,
    required this.content,
    this.actions,
    this.onClose,
  });

  static Future<T?> show<T>({
    required BuildContext context,
    required WidgetBuilder builder,
  }) {
    return showGeneralDialog<T>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black.withValues(alpha: 0.5),
      transitionDuration: const Duration(milliseconds: 300),
      pageBuilder: (context, animation, secondaryAnimation) => builder(context),
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: 5 * animation.value,
            sigmaY: 5 * animation.value,
          ),
          child: ScaleTransition(
            scale: CurvedAnimation(
              parent: animation,
              curve: Curves.easeOutBack,
            ),
            child: FadeTransition(opacity: animation, child: child),
          ),
        );
      },
    );
  }

  @override
  State<PremiumDialog> createState() => _PremiumDialogState();
}

class _PremiumDialogState extends State<PremiumDialog> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Material(
        color: Colors.transparent,
        child: PremiumGlassContainer(
          margin: const EdgeInsets.symmetric(horizontal: 32),
          borderRadius: 24,
          padding: const EdgeInsets.all(24),
          color: Colors.white.withValues(
            alpha: 0.95,
          ), // Highly opaque for readability
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      widget.title,
                      style: AppTypography.h3,
                      textAlign: TextAlign.center,
                    ),
                  ),
                  if (widget.onClose != null)
                    GestureDetector(
                      onTap: widget.onClose,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: Colors.grey[200],
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.close, size: 16),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 16),
              widget.content,
              if (widget.actions != null) ...[
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: widget.actions!,
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
