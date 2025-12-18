import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/team/presentation/chat_controller.dart';
import 'package:intl/intl.dart';

class TeamChatDetailScreen extends ConsumerStatefulWidget {
  final String conversationId;
  final String title;

  const TeamChatDetailScreen({
    super.key,
    required this.conversationId,
    required this.title,
  });

  @override
  ConsumerState<TeamChatDetailScreen> createState() =>
      _TeamChatDetailScreenState();
}

class _TeamChatDetailScreenState extends ConsumerState<TeamChatDetailScreen> {
  final _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final messagesAsync = ref.watch(
      chatMessagesProvider(widget.conversationId),
    );

    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Column(
        children: [
          Expanded(
            child: messagesAsync.when(
              data: (messages) => ListView.builder(
                padding: const EdgeInsets.all(16),
                reverse:
                    false, // We usually want reverse for chat, but mock list is top-down
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final msg = messages[index];
                  final isMe = msg.senderId == 'me';
                  return Align(
                    alignment: isMe
                        ? Alignment.centerRight
                        : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: isMe ? AppColors.primary : Colors.grey[200],
                        borderRadius: BorderRadius.circular(12).copyWith(
                          bottomRight: isMe ? Radius.zero : null,
                          bottomLeft: !isMe ? Radius.zero : null,
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (!isMe &&
                              widget.title.contains(
                                'Equipe',
                              )) // Show name in group
                            Text(
                              'Membro ${msg.senderId}',
                              style: const TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: Colors.black54,
                              ),
                            ),
                          Text(
                            msg.content,
                            style: TextStyle(
                              color: isMe ? Colors.white : Colors.black87,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            DateFormat('HH:mm').format(msg.timestamp),
                            style: TextStyle(
                              fontSize: 10,
                              color: isMe ? Colors.white70 : Colors.black54,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (err, stack) => Center(child: Text('Erro: $err')),
            ),
          ),
          _buildInputArea(),
        ],
      ),
    );
  }

  Widget _buildInputArea() {
    return Container(
      padding: const EdgeInsets.all(8),
      color: Colors.white,
      child: Row(
        children: [
          IconButton(icon: const Icon(Icons.attach_file), onPressed: () {}),
          Expanded(
            child: TextField(
              controller: _textController,
              decoration: const InputDecoration(
                hintText: 'Digite sua mensagem...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(20)),
                ),
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.send, color: AppColors.primary),
            onPressed: () async {
              if (_textController.text.trim().isNotEmpty) {
                final content = _textController.text;
                _textController.clear();
                // Call repo to send
                await ref
                    .read(teamChatRepositoryProvider)
                    .sendMessage(widget.conversationId, content);
                // Refresh provider
                ref.invalidate(chatMessagesProvider(widget.conversationId));
              }
            },
          ),
        ],
      ),
    );
  }
}
