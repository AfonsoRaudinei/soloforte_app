import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class RadialMenu extends StatefulWidget {
  final VoidCallback onDrawTap;
  final VoidCallback onOccurrenceTap;
  final VoidCallback onScannerTap;
  final VoidCallback onReportTap;
  final VoidCallback onClose;

  const RadialMenu({
    super.key,
    required this.onDrawTap,
    required this.onOccurrenceTap,
    required this.onScannerTap,
    required this.onReportTap,
    required this.onClose,
  });

  @override
  State<RadialMenu> createState() => _RadialMenuState();
}

class _RadialMenuState extends State<RadialMenu>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _scaleAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutBack,
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleClose() {
    _controller.reverse().then((_) => widget.onClose());
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Backdrop
        GestureDetector(
          onTap: _handleClose,
          child: Container(
            color: Colors.black.withValues(alpha: 0.3),
            width: double.infinity,
            height: double.infinity,
          ),
        ),

        // Menu Items
        Positioned(
          bottom: 100, // Adjusted to be above the FAB
          left: 0,
          right: 0,
          child: Center(
            child: SizedBox(
              width: 300,
              height: 200,
              child: AnimatedBuilder(
                animation: _controller,
                builder: (context, child) {
                  return Stack(
                    alignment: Alignment.bottomCenter,
                    children: [
                      _buildMenuItem(
                        0,
                        Icons.edit,
                        'Desenhar',
                        widget.onDrawTap,
                      ),
                      _buildMenuItem(
                        1,
                        Icons.bug_report,
                        'Ocorrência',
                        widget.onOccurrenceTap,
                      ),
                      _buildMenuItem(
                        2,
                        Icons.qr_code_scanner,
                        'Scanner',
                        widget.onScannerTap,
                      ),
                      _buildMenuItem(
                        3,
                        Icons.description,
                        'Relatório',
                        widget.onReportTap,
                      ),
                    ],
                  );
                },
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMenuItem(
    int index,
    IconData icon,
    String label,
    VoidCallback onTap,
  ) {
    // Calculate position on an arc
    // Total arc: 180 degrees (PI)
    // 4 items, spaced evenly
    // We are using explicit offets for better control, so angle/radius calcs below are just for reference/future.

    // Adjust calculations if necessary to match visual expectation of "Radial"
    // Let's try explicit offsets for a semi-circle fan out
    final List<Offset> offsets = [
      const Offset(-100, -20), // Left
      const Offset(-40, -90), // Top-Left
      const Offset(40, -90), // Top-Right
      const Offset(100, -20), // Right
    ];

    final offset = offsets[index];
    final currentX = offset.dx * _scaleAnimation.value;
    final currentY = offset.dy * _scaleAnimation.value;

    return Transform.translate(
      offset: Offset(currentX, currentY),
      child: Transform.scale(
        scale: _scaleAnimation.value,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            GestureDetector(
              onTap: onTap,
              child: Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.2),
                      blurRadius: 8,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Icon(icon, color: AppColors.primary, size: 28),
              ),
            ),
            const SizedBox(height: 8),
            Material(
              color: Colors.transparent,
              child: Text(
                label,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  shadows: [Shadow(color: Colors.black, blurRadius: 4)],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
