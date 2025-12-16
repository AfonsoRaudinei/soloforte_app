import 'dart:async';
import 'package:soloforte_app/features/support/domain/message_model.dart';
import 'package:soloforte_app/features/support/data/bot_service.dart';

/// Service interface defining methods for real-time chat
abstract class IChatService {
  Stream<List<Message>> get messagesStream;
  Stream<bool> get isTypingStream;
  Stream<bool> get isOnlineStream;
  Stream<List<String>> get quickRepliesStream;

  Future<void> connect();
  Future<void> disconnect();
  Future<void> sendMessage(
    String text, {
    MessageType type = MessageType.text,
    String? attachmentUrl,
  });
  void sendTypingStatus(bool isTyping);
  void markAsRead(String messageId);
}

/// Simulated WebSocket Implementation
class ChatWebSocketService implements IChatService {
  final _messagesController = StreamController<List<Message>>.broadcast();
  final _typingController = StreamController<bool>.broadcast();
  final _onlineController = StreamController<bool>.broadcast();
  final _quickRepliesController = StreamController<List<String>>.broadcast();

  final _botService = BotService();
  final List<Message> _currentMessages = [];
  bool _isConnected = false;

  @override
  Stream<List<Message>> get messagesStream => _messagesController.stream;

  @override
  Stream<bool> get isTypingStream => _typingController.stream;

  @override
  Stream<bool> get isOnlineStream => _onlineController.stream;

  @override
  Stream<List<String>> get quickRepliesStream => _quickRepliesController.stream;

  @override
  Future<void> connect() async {
    // Simulate WebSocket connection delay
    await Future.delayed(const Duration(milliseconds: 800));
    _isConnected = true;
    _onlineController.add(true);

    // Load initial history (mock)
    _currentMessages.addAll([
      Message(
        id: '1',
        senderId: 'agent',
        text: 'Olá! Bem-vindo ao suporte SoloForte.',
        timestamp: DateTime.now().subtract(const Duration(hours: 1)),
        isMe: false,
        status: MessageStatus.read,
      ),
      Message(
        id: '2',
        senderId: 'agent',
        text: 'Como posso ajudar você com sua lavoura hoje?',
        timestamp: DateTime.now().subtract(const Duration(minutes: 59)),
        isMe: false,
        status: MessageStatus.read,
      ),
    ]);
    _emitMessages();

    // Initial suggestions
    _quickRepliesController.add(['/help', 'Nova Ocorrência', 'Sair']);
  }

  @override
  Future<void> disconnect() async {
    _isConnected = false;
    _onlineController.add(false);
    // In a real app, close socket here
  }

  @override
  Future<void> sendMessage(
    String text, {
    MessageType type = MessageType.text,
    String? attachmentUrl,
  }) async {
    if (!_isConnected) await connect();

    final newMessage = Message(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      senderId: 'me',
      text: text,
      timestamp: DateTime.now(),
      isMe: true,
      status: MessageStatus.sending,
      type: type,
      attachmentUrl: attachmentUrl,
    );

    _currentMessages.add(newMessage);
    _emitMessages();
    // Clear suggestions on user input
    _quickRepliesController.add([]);

    // Simulate Network Delay & Server Ack
    await Future.delayed(const Duration(milliseconds: 600));
    _updateMessageStatus(newMessage.id, MessageStatus.sent);

    // Simulate Delivery
    await Future.delayed(const Duration(milliseconds: 800));
    _updateMessageStatus(newMessage.id, MessageStatus.delivered);

    // Simulate Agent Reading (trigger read receipt)
    await Future.delayed(const Duration(seconds: 2));
    _updateMessageStatus(newMessage.id, MessageStatus.read);

    // Trigger Bot Response
    _handleBotResponse(text);
  }

  void _handleBotResponse(String userMessage) async {
    // Simulate thinking delay
    await Future.delayed(const Duration(seconds: 1));
    _typingController.add(true);

    final response = await _botService.processMessage(userMessage);

    if (response != null) {
      await Future.delayed(const Duration(seconds: 2)); // Typing duration
      _typingController.add(false);

      _receiveMessage(
        text: response.text,
        type: response.type,
        attachmentUrl: response.attachmentUrl,
      );

      if (response.options.isNotEmpty) {
        _quickRepliesController.add(response.options);
      }
    } else {
      _typingController.add(false);
    }
  }

  void _receiveMessage({
    required String text,
    MessageType type = MessageType.text,
    String? attachmentUrl,
  }) {
    if (!_isConnected) return;

    final msg = Message(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      senderId: 'agent',
      text: text,
      timestamp: DateTime.now(),
      isMe: false,
      status: MessageStatus
          .read, // Bot msgs come as 'read' usually or we don't track them
      type: type,
      attachmentUrl: attachmentUrl,
    );

    _currentMessages.add(msg);
    _emitMessages();
  }

  @override
  void sendTypingStatus(bool isTyping) {
    // In real app, send socket event 'typing'
    // For local UI, we don't need to listen to our own typing,
    // but sending it to server would be here.
  }

  @override
  void markAsRead(String messageId) {
    // Send 'read' event to server
    // For mock, just update local status if it is not me
    // Actually we don't usually mark incoming messages as 'read' on our side visually
    // except maybe to clear badges.
    // But for the OTHER person, we send a read receipt.
  }

  void _updateMessageStatus(String id, MessageStatus status) {
    final index = _currentMessages.indexWhere((m) => m.id == id);
    if (index != -1) {
      _currentMessages[index] = _currentMessages[index].copyWith(
        status: status,
      );
      _emitMessages();
    }
  }

  void _emitMessages() {
    // Create copy and sort if needed
    _messagesController.add(List.from(_currentMessages));
  }

  void dispose() {
    _messagesController.close();
    _typingController.close();
    _onlineController.close();
    _quickRepliesController.close();
  }
}
