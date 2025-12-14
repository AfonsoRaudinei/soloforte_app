import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:soloforte_app/core/presentation/widgets/premium_dialog.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class SaveAreaDialog extends StatefulWidget {
  final Function(String) onSave;
  final VoidCallback? onCancel;

  const SaveAreaDialog({super.key, required this.onSave, this.onCancel});

  @override
  State<SaveAreaDialog> createState() => _SaveAreaDialogState();
}

class _SaveAreaDialogState extends State<SaveAreaDialog> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PremiumDialog(
      title: 'Salvar Área',
      onClose: () {
        widget.onCancel?.call();
        Navigator.pop(context);
      },
      content: TextField(
        controller: _controller,
        decoration: InputDecoration(
          labelText: 'Nome da Área',
          hintText: 'Ex: Talhão 1 - Soja',
          filled: true,
          fillColor: Colors.grey[100],
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
        ),
        autofocus: true,
        onSubmitted: (value) {
          if (value.isNotEmpty) {
            HapticFeedback.selectionClick();
            widget.onSave(value);
            Navigator.pop(context);
          }
        },
      ),
      actions: [
        TextButton(
          onPressed: () {
            widget.onCancel?.call();
            Navigator.pop(context);
          },
          style: TextButton.styleFrom(foregroundColor: AppColors.textSecondary),
          child: const Text('Cancelar'),
        ),
        const SizedBox(width: 8),
        FilledButton(
          onPressed: () {
            if (_controller.text.isNotEmpty) {
              HapticFeedback.selectionClick();
              widget.onSave(_controller.text);
              Navigator.pop(context);
            }
          },
          style: FilledButton.styleFrom(
            backgroundColor: AppColors.primary,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          child: const Text('Salvar'),
        ),
      ],
    );
  }
}
