import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/shared/widgets/custom_text_input.dart';
import 'package:soloforte_app/shared/widgets/primary_button.dart';
import '../../domain/client_model.dart';
import 'package:soloforte_app/features/clients/presentation/clients_controller.dart';

class AddClientForm extends ConsumerStatefulWidget {
  final VoidCallback onSuccess;

  const AddClientForm({super.key, required this.onSuccess});

  @override
  ConsumerState<AddClientForm> createState() => _AddClientFormState();
}

class _AddClientFormState extends ConsumerState<AddClientForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _cityController = TextEditingController();
  final _stateController = TextEditingController();

  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);

      final newClient = Client(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        name: _nameController.text.trim(),
        email: _emailController.text.trim(),
        phone: _phoneController.text.trim(),
        address:
            '${_cityController.text.trim()} - ${_stateController.text.trim()}',
        city: _cityController.text.trim(),
        state: _stateController.text.trim(),
        type: 'producer', // Default
        totalAreas: 0,
        totalHectares: 0,
        status: 'active',
        lastActivity: DateTime.now(),
      );

      try {
        await ref.read(clientsControllerProvider.notifier).addClient(newClient);
        widget.onSuccess();
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Erro ao salvar: $e'),
              backgroundColor: AppColors.error,
            ),
          );
        }
      } finally {
        if (mounted) setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
        left: 24,
        right: 24,
        top: 24,
      ),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Novo Cliente',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 24),
            CustomTextInput(
              label: 'Nome Completo',
              controller: _nameController,
              validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
              prefixIcon: Icons.person_outline,
            ),
            const SizedBox(height: 16),
            CustomTextInput(
              label: 'Email',
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              prefixIcon: Icons.email_outlined,
              validator: (v) =>
                  v!.isNotEmpty && !v.contains('@') ? 'Inválido' : null,
            ),
            const SizedBox(height: 16),
            CustomTextInput(
              label: 'Telefone',
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              prefixIcon: Icons.phone_outlined,
              validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  flex: 3,
                  child: CustomTextInput(
                    label: 'Cidade',
                    controller: _cityController,
                    prefixIcon: Icons.location_city_outlined,
                    validator: (v) => v!.isEmpty ? 'Obrigatório' : null,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  flex: 1,
                  child: CustomTextInput(
                    label: 'UF',
                    controller: _stateController,
                    validator: (v) => v!.length != 2 ? 'UF' : null,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            PrimaryButton(
              text: 'SALVAR CLIENTE',
              isLoading: _isLoading,
              onPressed: _handleSubmit,
            ),
          ],
        ),
      ),
    );
  }
}
