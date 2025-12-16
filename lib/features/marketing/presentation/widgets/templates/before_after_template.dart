import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class BeforeAfterTemplate extends StatefulWidget {
  const BeforeAfterTemplate({super.key});

  @override
  State<BeforeAfterTemplate> createState() => _BeforeAfterTemplateState();
}

class _BeforeAfterTemplateState extends State<BeforeAfterTemplate> {
  double _splitPosition = 0.5;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1, // Square for feed
      child: Stack(
        children: [
          // Background (After Image)
          Positioned.fill(
            child: Container(
              color: Colors.green[200],
              child: const Center(
                child: Text(
                  'DEPOIS',
                  style: TextStyle(
                    fontSize: 40,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),

          // Foreground (Before Image) - Clipped
          Positioned.fill(
            child: ClipRect(
              child: Align(
                alignment: Alignment.centerLeft,
                widthFactor: _splitPosition,
                child: Container(
                  width: 400, // Ideally match container width
                  height: double.infinity,
                  color: Colors.brown[300],
                  child: const Center(
                    child: Text(
                      'ANTES',
                      style: TextStyle(
                        fontSize: 40,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),

          // Divider Slider
          Positioned(
            left: (400 * _splitPosition) - 15, // Approximate centering
            top: 0,
            bottom: 0,
            child: GestureDetector(
              onHorizontalDragUpdate: (details) {
                setState(() {
                  // Mock width 400 for demo logic
                  double delta = details.delta.dx / 400;
                  _splitPosition = (_splitPosition + delta).clamp(0.0, 1.0);
                });
              },
              child: Container(
                width: 30,
                color: Colors.transparent,
                child: Center(
                  child: Container(
                    width: 4,
                    color: Colors.white,
                    child: Center(
                      child: Container(
                        width: 30,
                        height: 30,
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.code,
                          size: 20,
                          color: AppColors.primary,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),

          // Static Labels for print
          const Positioned(
            top: 20,
            left: 20,
            child: Text(
              'Antes',
              style: TextStyle(
                color: Colors.white,
                backgroundColor: Colors.black26,
              ),
            ),
          ),
          const Positioned(
            top: 20,
            right: 20,
            child: Text(
              'Depois',
              style: TextStyle(
                color: Colors.white,
                backgroundColor: Colors.black26,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
