import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/team/presentation/chat_controller.dart';
import 'package:intl/intl.dart';

class TeamChatListScreen extends ConsumerWidget {
  const TeamChatListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final chatState = ref.watch(teamChatControllerProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Comunicação da Equipe'),
        actions: [
          IconButton(
            icon: const Icon(Icons.campaign, color: Colors.orange),
            tooltip: 'Broadcast / Aviso Geral',
            onPressed: () => _showBroadcastDialog(context, ref),
          ),
        ],
      ),
      body: chatState.isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: chatState.conversations.length,
              itemBuilder: (context, index) {
                final conversation = chatState.conversations[index];
                return ListTile(
                  leading: CircleAvatar(
                    backgroundColor: conversation.isGroup
                        ? AppColors.primary
                        : Colors.grey,
                    child: Icon(
                      conversation.isGroup ? Icons.groups : Icons.person,
                      color: Colors.white,
                    ),
                  ),
                  title: Text(
                    conversation.isGroup
                        ? conversation.groupName!
                        : 'Membro ${conversation.participantIds.first}',
                    style: TextStyle(
                      fontWeight: conversation.unreadCount > 0
                          ? FontWeight.bold
                          : FontWeight.normal,
                    ),
                  ),
                  subtitle: Text(
                    conversation.lastMessage?.content ?? '',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontWeight: conversation.unreadCount > 0
                          ? FontWeight.bold
                          : FontWeight.normal,
                      color: conversation.unreadCount > 0
                          ? Colors.black87
                          : Colors.grey,
                    ),
                  ),
                  trailing: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      if (conversation.lastMessage != null)
                        Text(
                          DateFormat(
                            'HH:mm',
                          ).format(conversation.lastMessage!.timestamp),
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.grey,
                          ),
                        ),
                      if (conversation.unreadCount > 0)
                        Container(
                          margin: const EdgeInsets.only(top: 4),
                          padding: const EdgeInsets.all(6),
                          decoration: const BoxDecoration(
                            color: AppColors.primary,
                            shape: BoxShape.circle,
                          ),
                          child: Text(
                            '${conversation.unreadCount}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 10,
                            ),
                          ),
                        ),
                    ],
                  ),
                  onTap: () {
                    context.push(
                      '/dashboard/team/chat/${conversation.id}',
                      extra: {
                        'title': conversation.isGroup
                            ? conversation.groupName
                            : 'Chat Privado',
                      },
                    );
                  },
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // New Chat Logic
        },
        child: const Icon(Icons.message),
      ),
    );
  }

  void _showBroadcastDialog(BuildContext context, WidgetRef ref) {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Enviar Aviso Geral (Broadcast)'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Esta mensagem será enviada para TODOS os membros da equipe como um alerta.',
            ),
            const SizedBox(height: 16),
            TextField(
              controller: controller,
              decoration: const InputDecoration(
                labelText: 'Mensagem',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (controller.text.isNotEmpty) {
                Navigator.pop(context);
                await ref
                    .read(teamChatControllerProvider.notifier)
                    .sendBroadcast(controller.text);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Aviso enviado com sucesso!')),
                );
              }
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.orange),
            child: const Text(
              'Enviar para Todos',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
