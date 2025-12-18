import 'package:soloforte_app/features/team/domain/team_chat_model.dart';

abstract class TeamChatRepository {
  Future<List<TeamConversation>> getConversations();
  Future<List<TeamMessage>> getMessages(String conversationId);
  Future<void> sendMessage(String conversationId, String content);
  Future<void> sendBroadcast(String content);
}

class MockTeamChatRepository implements TeamChatRepository {
  final _mockConversations = [
    TeamConversation(
      id: 'g1',
      isGroup: true,
      groupName: 'Equipe Técnica (Geral)',
      participantIds: ['1', '2', '3', '4', '5'],
      unreadCount: 3,
      updatedAt: DateTime.now().subtract(const Duration(minutes: 5)),
      lastMessage: TeamMessage(
        id: 'm1',
        conversationId: 'g1',
        senderId: '1', // Carlos
        content: 'Pessoal, atenção para a previsão de chuva amanhã.',
        timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
        type: TeamMessageType.text,
      ),
    ),
    TeamConversation(
      id: 'c1',
      participantIds: ['2'], // Ana Silva
      unreadCount: 0,
      updatedAt: DateTime.now().subtract(const Duration(hours: 1)),
      lastMessage: TeamMessage(
        id: 'm2',
        conversationId: 'c1',
        senderId: '2',
        content: 'Já finalizei o relatório do talhão 5.',
        timestamp: DateTime.now().subtract(const Duration(hours: 1)),
        type: TeamMessageType.text,
      ),
    ),
  ];

  final Map<String, List<TeamMessage>> _mockMessages = {
    'g1': [
      TeamMessage(
        id: 'm1_1',
        conversationId: 'g1',
        senderId: '2',
        content: 'Bom dia, equipe!',
        timestamp: DateTime.now().subtract(const Duration(hours: 4)),
        type: TeamMessageType.text,
      ),
      TeamMessage(
        id: 'm1_2',
        conversationId: 'g1',
        senderId: '1',
        content: 'Pessoal, atenção para a previsão de chuva amanhã.',
        timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
        type: TeamMessageType.text,
      ),
    ],
    'c1': [
      TeamMessage(
        id: 'm2_1',
        conversationId: 'c1',
        senderId: 'me',
        content: 'Ana, como está o andamento?',
        timestamp: DateTime.now().subtract(const Duration(hours: 2)),
        type: TeamMessageType.text,
      ),
      TeamMessage(
        id: 'm2_2',
        conversationId: 'c1',
        senderId: '2',
        content: 'Já finalizei o relatório do talhão 5.',
        timestamp: DateTime.now().subtract(const Duration(hours: 1)),
        type: TeamMessageType.text,
      ),
    ],
  };

  @override
  Future<List<TeamConversation>> getConversations() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _mockConversations;
  }

  @override
  Future<List<TeamMessage>> getMessages(String conversationId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _mockMessages[conversationId] ?? [];
  }

  @override
  Future<void> sendMessage(String conversationId, String content) async {
    await Future.delayed(const Duration(milliseconds: 300));
    final msg = TeamMessage(
      id: DateTime.now().toString(),
      conversationId: conversationId,
      senderId: 'me',
      content: content,
      timestamp: DateTime.now(),
      type: TeamMessageType.text,
    );
    // In a real app we would update the list, but for mock display we might just return success
    // or append locally if stream based.
    if (_mockMessages.containsKey(conversationId)) {
      _mockMessages[conversationId]!.add(msg);
    }
  }

  @override
  Future<void> sendBroadcast(String content) async {
    await Future.delayed(const Duration(seconds: 1));
    // Simulate sending to everyone
  }
}
