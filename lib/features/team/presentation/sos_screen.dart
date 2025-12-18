import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/features/team/presentation/hr_controller.dart';
import 'dart:async';

class SOSScreen extends ConsumerStatefulWidget {
  const SOSScreen({super.key});

  @override
  ConsumerState<SOSScreen> createState() => _SOSScreenState();
}

class _SOSScreenState extends ConsumerState<SOSScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  Timer? _countdownTimer;
  int _secondsRemaining = 5;
  bool _isCountingDown = false;
  bool _alertSent = false;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _animationController.dispose();
    _countdownTimer?.cancel();
    super.dispose();
  }

  void _startCountdown() {
    setState(() {
      _isCountingDown = true;
      _secondsRemaining = 5;
    });

    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (mounted) {
        setState(() {
          if (_secondsRemaining > 0) {
            _secondsRemaining--;
          } else {
            _sendAlert();
            timer.cancel();
          }
        });
      }
    });
  }

  void _cancelCountdown() {
    _countdownTimer?.cancel();
    setState(() {
      _isCountingDown = false;
      _secondsRemaining = 5;
    });
  }

  Future<void> _sendAlert() async {
    // 1. Get Location (Mock)
    // 2. Send via Controller
    await ref.read(hrControllerProvider.notifier).sendSOS(-23.55, -46.63);
    if (mounted) {
      setState(() {
        _isCountingDown = false;
        _alertSent = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_alertSent) {
      return Scaffold(
        backgroundColor: Colors.red[900],
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.check_circle, color: Colors.white, size: 80),
              const SizedBox(height: 24),
              const Text(
                'ALERTA ENVIADO!',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 32.0),
                child: Text(
                  'A central de segurança e seu gerente foram notificados com sua localização atual.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              ),
              const SizedBox(height: 48),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.red[900],
                  padding: const EdgeInsets.symmetric(
                    horizontal: 32,
                    vertical: 16,
                  ),
                ),
                child: const Text('FECHAR'),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: _isCountingDown ? Colors.red : Colors.grey[900],
      appBar: AppBar(
        title: const Text('Segurança e SOS'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (_isCountingDown) ...[
              Text(
                'ENVIANDO EM',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.7),
                  fontSize: 20,
                  letterSpacing: 2,
                ),
              ),
              Text(
                '$_secondsRemaining',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 120,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                'Toque para cancelar',
                style: TextStyle(color: Colors.white),
              ),
            ] else ...[
              const Text(
                'EM CASO DE EMERGÊNCIA',
                style: TextStyle(color: Colors.white60, letterSpacing: 1.5),
              ),
              const SizedBox(height: 8),
              const Text(
                'PRESSIONE O BOTÃO',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],

            const SizedBox(height: 48),

            GestureDetector(
              onTap: () {
                if (_isCountingDown) {
                  _cancelCountdown();
                } else {
                  _startCountdown();
                }
              },
              child: AnimatedBuilder(
                animation: _animationController,
                builder: (context, child) {
                  return Container(
                    width: 200,
                    height: 200,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.red,
                      border: Border.all(color: Colors.redAccent, width: 8),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.red.withOpacity(0.6),
                          blurRadius: _isCountingDown
                              ? 50
                              : 20 + (_animationController.value * 20),
                          spreadRadius: _isCountingDown
                              ? 10
                              : 5 + (_animationController.value * 10),
                        ),
                      ],
                    ),
                    child: Center(
                      child: Icon(
                        _isCountingDown ? Icons.close : Icons.sos,
                        size: 80,
                        color: Colors.white,
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
