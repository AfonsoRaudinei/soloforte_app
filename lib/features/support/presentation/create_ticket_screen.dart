import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/support/data/ticket_repository.dart';
import 'package:soloforte_app/features/support/domain/ticket_model.dart';
import 'package:soloforte_app/shared/widgets/custom_text_input.dart';

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
      appBar: AppBar(title: const Text('Novo Chamado')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Categoria', style: AppTypography.label),
              const SizedBox(height: 8),
              DropdownButtonFormField<TicketCategory>(
                value: _selectedCategory,
                items: TicketCategory.values.map((c) {
                  return DropdownMenuItem(value: c, child: Text(c.label));
                }).toList(),
                onChanged: (val) {
                  if (val != null) setState(() => _selectedCategory = val);
                },
                decoration: const InputDecoration(border: OutlineInputBorder()),
              ),
              const SizedBox(height: 16),

              Text('Prioridade', style: AppTypography.label),
              const SizedBox(height: 8),
              SegmentedButton<TicketPriority>(
                segments: const [
                  ButtonSegment(
                    value: TicketPriority.low,
                    label: Text('Baixa'),
                    icon: Icon(Icons.low_priority),
                  ),
                  ButtonSegment(
                    value: TicketPriority.normal,
                    label: Text('Normal'),
                  ),
                  ButtonSegment(
                    value: TicketPriority.urgent,
                    label: Text('Urgente'),
                    icon: Icon(Icons.warning, color: Colors.red),
                  ),
                ],
                selected: {_selectedPriority},
                onSelectionChanged: (newSelection) {
                  setState(() => _selectedPriority = newSelection.first);
                },
              ),
              const SizedBox(height: 16),

              CustomTextInput(
                label: 'Assunto',
                controller: _subjectController,
                validator: (v) => v?.isEmpty == true ? 'Obrigatório' : null,
              ),
              const SizedBox(height: 16),

              CustomTextInput(
                label: 'Descrição Detalhada',
                controller: _descriptionController,
                maxLines: 5,
                validator: (v) => v?.isEmpty == true ? 'Obrigatório' : null,
                hint:
                    'Descreva seu problema com o máximo de detalhes possível...',
              ),
              const SizedBox(height: 32),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _submit,
                  child: _isLoading
                      ? const CircularProgressIndicator()
                      : const Text('Criar Chamado'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
