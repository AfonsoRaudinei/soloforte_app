import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/shared/widgets/primary_button.dart';

class ScannerScreen extends StatefulWidget {
  const ScannerScreen({super.key});

  @override
  State<ScannerScreen> createState() => _ScannerScreenState();
}

class _ScannerScreenState extends State<ScannerScreen> {
  bool _isAnalyzing = false;
  String? _result;

  void _takePhoto() async {
    setState(() => _isAnalyzing = true);

    // Simulate AI analysis
    await Future.delayed(const Duration(seconds: 3));

    if (mounted) {
      setState(() {
        _isAnalyzing = false;
        _result = 'Spodoptera frugiperda (Lagarta-do-cartucho)';
      });
      _showResultDialog();
    }
  }

  void _showResultDialog() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.bug_report, size: 60, color: Colors.red),
            const SizedBox(height: 16),
            Text(
              'Praga Detectada!',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              _result ?? '',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              'Probabilidade: 98%',
              style: TextStyle(color: Colors.grey),
            ),
            const SizedBox(height: 24),
            const Text(
              'Recomendação: Aplicar inseticida X na dose Y/ha. Monitorar área adjacente.',
            ),
            const SizedBox(height: 32),
            PrimaryButton(
              text: 'SALVAR OCORRÊNCIA',
              onPressed: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scanner de Pragas')),
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Camera Placeholder
          Center(
            child: Container(
              margin: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.white.withValues(alpha: 0.5),
                  width: 2,
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.camera_alt, color: Colors.white54, size: 60),
                    SizedBox(height: 16),
                    Text(
                      'Posicione a câmera sobre a folha',
                      style: TextStyle(color: Colors.white54),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Controls
          Positioned(
            bottom: 40,
            left: 0,
            right: 0,
            child: Center(
              child: _isAnalyzing
                  ? const CircularProgressIndicator(color: AppColors.primary)
                  : GestureDetector(
                      onTap: _takePhoto,
                      child: Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: AppColors.primary,
                            width: 4,
                          ),
                        ),
                        child: const Icon(
                          Icons.camera,
                          size: 40,
                          color: AppColors.primary,
                        ),
                      ),
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
