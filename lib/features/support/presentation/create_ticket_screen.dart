import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/support/data/ticket_repository.dart';
import 'package:soloforte_app/features/support/domain/ticket_model.dart';

class CreateTicketScreen extends StatefulWidget {
  const CreateTicketScreen({super.key});

  @override
  State<CreateTicketScreen> createState() => _CreateTicketScreenState();
}

class _CreateTicketScreenState extends State<CreateTicketScreen> {
  final _formKey = GlobalKey<FormState>();
  final _subjectController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _repo = TicketRepository();

  TicketCategory _selectedCategory = TicketCategory.technical;
  TicketPriority _selectedPriority = TicketPriority.normal;
  bool _isLoading = false;

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final ticket = await _repo.createTicket(
        subject: _subjectController.text,
        description: _descriptionController.text,
        category: _selectedCategory,
        priority: _selectedPriority,
      );

      if (mounted) {
        // Navigate to chat with the new ticket context
        context.pushReplacement('/dashboard/support/chat', extra: ticket);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Erro ao criar ticket: $e')));
      }
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => context.pop(),
        ),
        title: const Text('Novo Ticket'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Como podemos ajudar?', style: AppTypography.h3),
              const SizedBox(height: 24),

              Text('Categoria *', style: AppTypography.h4),
              const SizedBox(height: 8),
              DropdownButtonFormField<TicketCategory>(
                initialValue: _selectedCategory,
                items: TicketCategory.values.map((c) {
                  return DropdownMenuItem(value: c, child: Text(c.label));
                }).toList(),
                onChanged: (val) {
                  if (val != null) setState(() => _selectedCategory = val);
                },
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 16,
                  ),
                ),
              ),
              const SizedBox(height: 4),
              // Helper text for mocked categories
              Text(
                '📱 Dúvida sobre uso, 🐛 Reportar erro, etc.',
                style: TextStyle(color: Colors.grey[600], fontSize: 12),
              ),
              const SizedBox(height: 24),

              Text('Assunto *', style: AppTypography.h4),
              const SizedBox(height: 8),
              TextFormField(
                controller: _subjectController,
                validator: (v) => v?.isEmpty == true ? 'Obrigatório' : null,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Como ver histórico NDVI?',
                ),
              ),
              const SizedBox(height: 24),

              Text('Descreva sua dúvida *', style: AppTypography.h4),
              const SizedBox(height: 8),
              TextFormField(
                controller: _descriptionController,
                maxLines: 5,
                validator: (v) => v?.isEmpty == true ? 'Obrigatório' : null,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: 'Não consigo encontrar...',
                ),
              ),
              const SizedBox(height: 24),

              Text('Anexos (opcional)', style: AppTypography.h4),
              const SizedBox(height: 8),
              Row(
                children: [
                  _buildAttachButton(Icons.camera_alt),
                  const SizedBox(width: 12),
                  _buildAttachButton(Icons.attach_file),
                  const SizedBox(width: 12),
                  TextButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.add),
                    label: const Text('Adicionar'),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              Text('Prioridade', style: AppTypography.h4),
              const SizedBox(height: 8),
              SegmentedButton<TicketPriority>(
                segments: const [
                  ButtonSegment(
                    value: TicketPriority.low,
                    label: Text('Baixa'),
                  ),
                  ButtonSegment(
                    value: TicketPriority.normal,
                    label: Text('Normal'),
                  ),
                  ButtonSegment(
                    value: TicketPriority.urgent,
                    label: Text('Urgente'),
                  ),
                ],
                selected: {_selectedPriority},
                onSelectionChanged: (newSelection) {
                  setState(() => _selectedPriority = newSelection.first);
                },
                style: ButtonStyle(
                  backgroundColor: WidgetStateProperty.resolveWith<Color?>((
                    states,
                  ) {
                    if (states.contains(WidgetState.selected)) {
                      if (_selectedPriority == TicketPriority.urgent) {
                        return Colors.red[100];
                      }
                      if (_selectedPriority == TicketPriority.low) {
                        return Colors.grey[200];
                      }
                      return Colors.blue[100];
                    }
                    return null;
                  }),
                ),
              ),

              const SizedBox(height: 24),
              const Divider(),
              const SizedBox(height: 16),

              // Tip Box
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.blue[50],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.lightbulb, color: Colors.amber, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'Antes de abrir ticket:',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    _buildBulletPoint('Consulte a Central de Ajuda'),
                    _buildBulletPoint('Veja tutoriais em vídeo'),
                    _buildBulletPoint('Pergunte à comunidade'),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => context.pop(),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                      child: const Text('Cancelar'),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _isLoading ? null : _submit,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                      child: _isLoading
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2,
                              ),
                            )
                          : const Text('Abrir Ticket'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAttachButton(IconData icon) {
    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Icon(icon, color: Colors.grey),
    );
  }

  Widget _buildBulletPoint(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        children: [
          const Text('• ', style: TextStyle(fontWeight: FontWeight.bold)),
          Text(text),
        ],
      ),
    );
  }
}
