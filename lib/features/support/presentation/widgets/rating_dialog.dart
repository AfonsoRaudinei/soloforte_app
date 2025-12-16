import 'package:flutter/material.dart';

class RatingDialog extends StatefulWidget {
  const RatingDialog({super.key});

  @override
  State<RatingDialog> createState() => _RatingDialogState();
}

class _RatingDialogState extends State<RatingDialog> {
  int _rating = 0;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Center(child: Text('Avalie o Atendimento')),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Como foi sua experiência com este suporte?',
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(5, (index) {
              return IconButton(
                iconSize: 32,
                onPressed: () {
                  setState(() {
                    _rating = index + 1;
                  });
                },
                icon: Icon(
                  index < _rating ? Icons.star : Icons.star_border,
                  color: Colors.amber,
                ),
              );
            }),
          ),
          if (_rating > 0) ...[
            const SizedBox(height: 16),
            Text(
              _rating == 5
                  ? 'Excelente!'
                  : _rating >= 3
                  ? 'Bom'
                  : 'Ruim',
              style: TextStyle(
                color: _rating == 5 ? Colors.green : Colors.grey,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Pular'),
        ),
        ElevatedButton(
          onPressed: _rating == 0
              ? null
              : () {
                  // Return result or send to API
                  Navigator.pop(context, _rating);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Obrigado pela sua avaliação!'),
                    ),
                  );
                },
          child: const Text('Enviar'),
        ),
      ],
    );
  }
}
