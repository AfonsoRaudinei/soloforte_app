import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class AnimatedWeatherIcon extends StatelessWidget {
  final String condition;
  final double size;

  const AnimatedWeatherIcon({
    super.key,
    required this.condition,
    this.size = 64,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(width: size, height: size, child: _buildIcon());
  }

  Widget _buildIcon() {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return const Icon(Icons.wb_sunny, color: Colors.amber)
            .animate(onPlay: (controller) => controller.repeat())
            .rotate(duration: 10.seconds)
            .scale(
              begin: const Offset(0.9, 0.9),
              end: const Offset(1.1, 1.1),
              duration: 2.seconds,
              curve: Curves.easeInOut,
            )
            .then()
            .scale(
              begin: const Offset(1.1, 1.1),
              end: const Offset(0.9, 0.9),
              duration: 2.seconds,
              curve: Curves.easeInOut,
            );

      case 'cloudy':
        return Stack(
          alignment: Alignment.center,
          children: [
            const Positioned(
                  right: 0,
                  top: 0,
                  child: Icon(Icons.circle, color: Colors.amber, size: 24),
                )
                .animate(onPlay: (controller) => controller.repeat())
                .slide(
                  duration: 4.seconds,
                  begin: const Offset(-0.1, 0),
                  end: const Offset(0.1, 0),
                  curve: Curves.easeInOut,
                )
                .then()
                .slide(
                  duration: 4.seconds,
                  begin: const Offset(0.1, 0),
                  end: const Offset(-0.1, 0),
                  curve: Curves.easeInOut,
                ),
            const Icon(Icons.cloud, color: Colors.white)
                .animate(onPlay: (controller) => controller.repeat())
                .moveY(
                  begin: 0,
                  end: -5,
                  duration: 2.seconds,
                  curve: Curves.easeInOut,
                )
                .then()
                .moveY(
                  begin: -5,
                  end: 0,
                  duration: 2.seconds,
                  curve: Curves.easeInOut,
                ),
          ],
        );

      case 'rain':
        return Stack(
          alignment: Alignment.center,
          children: [
            const Icon(Icons.cloud, color: Colors.grey),
            Positioned(
              bottom: 0,
              child:
                  const Icon(
                        Icons.water_drop,
                        color: Colors.lightBlueAccent,
                        size: 20,
                      )
                      .animate(onPlay: (controller) => controller.repeat())
                      .fadeIn(duration: 500.ms)
                      .moveY(begin: -10, end: 10, duration: 800.ms)
                      .fadeOut(duration: 500.ms),
            ),
          ],
        );

      default:
        // Default animated cloud
        return const Icon(Icons.wb_cloudy, color: Colors.white)
            .animate(onPlay: (controller) => controller.repeat())
            .shimmer(duration: 2.seconds, color: Colors.white70);
    }
  }
}
