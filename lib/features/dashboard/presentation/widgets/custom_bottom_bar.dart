import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class CustomBottomBar extends StatelessWidget {
  final VoidCallback? onProfileTap;
  final VoidCallback? onCameraTap;
  final VoidCallback? onAddTap;
  final bool isMenuOpen;

  const CustomBottomBar({
    super.key,
    this.onProfileTap,
    this.onCameraTap,
    this.onAddTap,
    this.isMenuOpen = false,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 24,
      left: 0,
      right: 0,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _buildBottomButton(icon: Icons.person_outline, onTap: onProfileTap),
            _buildBottomButton(
              icon: Icons.camera_alt_outlined,
              onTap: onCameraTap,
              size: 64,
            ),
            _buildBottomButton(
              icon: isMenuOpen ? Icons.close : Icons.add,
              onTap: onAddTap,
              color: isMenuOpen ? Colors.grey : AppColors.primary,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomButton({
    required IconData icon,
    VoidCallback? onTap,
    double size = 56,
    Color? color,
  }) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color ?? AppColors.primary,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: (color ?? AppColors.primary).withValues(alpha: 0.3),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          customBorder: const CircleBorder(),
          child: Icon(icon, color: Colors.white, size: size == 64 ? 32 : 24),
        ),
      ),
    );
  }
}
