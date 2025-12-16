import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/visits/presentation/visit_controller.dart';
import 'package:soloforte_app/features/visits/presentation/widgets/visit_summary_card.dart';

class CheckOutScreen extends ConsumerStatefulWidget {
  const CheckOutScreen({super.key});

  @override
  ConsumerState<CheckOutScreen> createState() => _CheckOutScreenState();
}

class _CheckOutScreenState extends ConsumerState<CheckOutScreen> {
  final TextEditingController _notesController = TextEditingController();
  final Map<String, bool> _checklist = {
    'Verificação de pragas': false,
    'Monitoramento de lavoura': false,
    'Análise de solo': false,
    'Recomendação técnica': false,
    'Registro fotográfico': false,
  };

  @override
  void dispose() {
    _notesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final visitState = ref.watch(visitControllerProvider);

    return visitState.when(
      data: (visit) {
        if (visit == null) {
          return const Scaffold(
            body: Center(child: Text("Nenhuma visita ativa para check-out.")),
          );
        }

        final duration = DateTime.now().difference(visit.checkInTime);
        final durationStr =
            "${duration.inHours}h ${duration.inMinutes.remainder(60)}m";

        return Scaffold(
          appBar: AppBar(
            title: const Text('Check-out da Visita'),
            centerTitle: true,
            leading: IconButton(
              icon: const Icon(Icons.close),
              onPressed: () => context.pop(),
            ),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Header / Resumo
                VisitSummaryCard(
                  clientName: visit.client.name,
                  duration: durationStr,
                  photosCount: visit.photos.length,
                  occurrencesCount: visit.occurrenceIds.length,
                ),
                const SizedBox(height: 24),

                // Photos Preview
                if (visit.photos.isNotEmpty) ...[
                  Text('Fotos da Visita', style: AppTypography.h3),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 100,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: visit.photos.length,
                      separatorBuilder: (context, index) =>
                          const SizedBox(width: 8),
                      itemBuilder: (context, index) {
                        return Container(
                          width: 100,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            image: DecorationImage(
                              image: FileImage(File(visit.photos[index])),
                              fit: BoxFit.cover,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 24),
                ],

                // Checklist
                Text('Atividades Realizadas', style: AppTypography.h3),
                const SizedBox(height: 8),
                Card(
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: BorderSide(color: Colors.grey.shade200),
                  ),
                  child: Column(
                    children: _checklist.keys.map((key) {
                      return CheckboxListTile(
                        value: _checklist[key],
                        onChanged: (val) {
                          setState(() {
                            _checklist[key] = val ?? false;
                          });
                        },
                        title: Text(key),
                        activeColor: AppColors.primary,
                        controlAffinity: ListTileControlAffinity.leading,
                        dense: true,
                      );
                    }).toList(),
                  ),
                ),
                const SizedBox(height: 24),

                // Observations
                Text('Observações Finais', style: AppTypography.h3),
                const SizedBox(height: 8),
                TextField(
                  controller: _notesController,
                  maxLines: 4,
                  decoration: InputDecoration(
                    hintText: 'Digite as observações gerais da visita...',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    filled: true,
                    fillColor: Colors.grey[50],
                  ),
                ),
                const SizedBox(height: 32),

                // Actions
                ElevatedButton(
                  onPressed: _isSubmitting ? null : _submitCheckOut,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: _isSubmitting
                      ? const CircularProgressIndicator(color: Colors.white)
                      : const Text(
                          'Encerrar Visita & Salvar',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                ),
                TextButton(
                  onPressed: () => context.pop(),
                  child: const Text('Voltar'),
                ),
              ],
            ),
          ),
        );
      },
      loading: () =>
          const Scaffold(body: Center(child: CircularProgressIndicator())),
      error: (e, _) => Scaffold(body: Center(child: Text('Erro: $e'))),
    );
  }

  bool _isSubmitting = false;

  Future<void> _submitCheckOut() async {
    setState(() {
      _isSubmitting = true;
    });

    try {
      await ref
          .read(visitControllerProvider.notifier)
          .checkOut(notes: _notesController.text, checklist: _checklist);

      if (mounted) {
        // Go back to Home/Dashboard.
        // Assuming /dashboard exists.
        // We popped ActiveVisit, now we are here.
        // A simple go/pop strategy.
        // Since we are likely pushed on top of ActiveVisit or replacing it?
        // Let's assume we replace or we navigate to root.
        context.go('/'); // Or dashboard

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Visita finalizada com sucesso!'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Erro ao finalizar: $e')));
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }
}
