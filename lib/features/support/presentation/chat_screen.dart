import 'package:flutter/material.dart';
import 'package:soloforte_app/features/support/domain/message_model.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/shared/widgets/custom_text_input.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _controller = TextEditingController();
  final List<Message> _messages = [
    Message(
      id: '1',
      senderId: 'agent',
      text: 'Olá! Como posso ajudar você hoje?',
      timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
      isMe: false,
    ),
  ];

  void _sendMessage() {
    if (_controller.text.trim().isEmpty) return;

    setState(() {
      _messages.add(
        Message(
          id: DateTime.now().toString(),
          senderId: 'me',
          text: _controller.text,
          timestamp: DateTime.now(),
          isMe: true,
        ),
      );
      _controller.clear();
    });

    // Mock bot response
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _messages.add(
            Message(
              id: DateTime.now().toString(),
              senderId: 'agent',
              text:
                  'Obrigado pelo contato. Um especialista irá responder em breve.',
              timestamp: DateTime.now(),
              isMe: false,
            ),
          );
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Chat Suporte')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return Align(
                  alignment: msg.isMe
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 10,
                    ),
                    decoration: BoxDecoration(
                      color: msg.isMe
                          ? AppColors.primary
                          : Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(16).copyWith(
                        bottomRight: msg.isMe ? Radius.zero : null,
                        bottomLeft: !msg.isMe ? Radius.zero : null,
                      ),
                    ),
                    child: Text(
                      msg.text,
                      style: TextStyle(
                        color: msg.isMe ? Colors.white : Colors.black87,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: CustomTextInput(
                    label: '',
                    controller: _controller,
                    hint: 'Escreva sua mensagem...',
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: _sendMessage,
                  icon: const Icon(Icons.send, color: AppColors.primary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
