import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'dart:math' as math;

class ExpandableFab extends StatefulWidget {
  final VoidCallback? onDrawArea;
  final VoidCallback? onNewOccurrence;
  final VoidCallback? onPestScanner;
  final VoidCallback? onNewReport;

  const ExpandableFab({
    super.key,
    this.onDrawArea,
    this.onNewOccurrence,
    this.onPestScanner,
    this.onNewReport,
  });

  @override
  State<ExpandableFab> createState() => _ExpandableFabState();
}

class _ExpandableFabState extends State<ExpandableFab>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _expandAnimation;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 250),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggle() {
    setState(() {
      _isExpanded = !_isExpanded;
      if (_isExpanded) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.bottomRight,
      clipBehavior: Clip.none,
      children: [
        // Backdrop
        if (_isExpanded)
          Positioned.fill(
            child: GestureDetector(
              onTap: _toggle,
              child: Container(color: Colors.black.withValues(alpha: 0.5)),
            ),
          ),

        // Action buttons (radial menu)
        ..._buildActionButtons(),

        // Main FAB
        FloatingActionButton(
          onPressed: _toggle,
          backgroundColor: AppColors.primary,
          child: AnimatedRotation(
            turns: _isExpanded ? 0.125 : 0, // 45 degrees when expanded
            duration: const Duration(milliseconds: 250),
            child: Icon(
              _isExpanded ? Icons.close : Icons.add,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }

  List<Widget> _buildActionButtons() {
    final actions = [
      _ActionButton(
        icon: Icons.edit,
        label: 'Desenhar Área',
        onPressed: () {
          _toggle();
          widget.onDrawArea?.call();
        },
        color: AppColors.primary,
      ),
      _ActionButton(
        icon: Icons.bug_report,
        label: 'Nova Ocorrência',
        onPressed: () {
          _toggle();
          widget.onNewOccurrence?.call();
        },
        color: AppColors.error,
      ),
      _ActionButton(
        icon: Icons.camera_alt,
        label: 'Scanner de Pragas',
        onPressed: () {
          _toggle();
          widget.onPestScanner?.call();
        },
        color: AppColors.success,
      ),
      _ActionButton(
        icon: Icons.description,
        label: 'Novo Relatório',
        onPressed: () {
          _toggle();
          widget.onNewReport?.call();
        },
        color: AppColors.warning,
      ),
    ];

    return List.generate(actions.length, (index) {
      // Calculate position in radial menu
      final angle = (math.pi / 2) * (index / (actions.length - 1)) + math.pi;
      final distance = 80.0;

      return AnimatedBuilder(
        animation: _expandAnimation,
        builder: (context, child) {
          final offset = Offset(
            math.cos(angle) * distance * _expandAnimation.value,
            math.sin(angle) * distance * _expandAnimation.value,
          );

          return Positioned(
            right: 28 - offset.dx,
            bottom: 28 - offset.dy,
            child: Transform.scale(
              scale: _expandAnimation.value,
              child: Opacity(opacity: _expandAnimation.value, child: child),
            ),
          );
        },
        child: actions[index],
      );
    });
  }
}

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onPressed;
  final Color color;

  const _ActionButton({
    required this.icon,
    required this.label,
    required this.onPressed,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.2),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: onPressed,
              customBorder: const CircleBorder(),
              child: Padding(
                padding: EdgeInsets.all(AppSpacing.md),
                child: Icon(icon, color: color, size: 24),
              ),
            ),
          ),
        ),
        SizedBox(height: AppSpacing.xs),
        Container(
          padding: EdgeInsets.symmetric(
            horizontal: AppSpacing.sm,
            vertical: AppSpacing.xs,
          ),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(AppSpacing.radiusSm),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.1),
                blurRadius: 4,
                offset: const Offset(0, 1),
              ),
            ],
          ),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: color,
            ),
          ),
        ),
      ],
    );
  }
}
