import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/support/data/chat_service.dart';
import 'package:soloforte_app/features/support/data/bot_service.dart';
import 'package:soloforte_app/features/support/data/storage_service.dart';
import 'package:soloforte_app/features/support/domain/message_model.dart';
import 'package:soloforte_app/features/support/domain/ticket_model.dart';
import 'package:soloforte_app/shared/widgets/custom_text_input.dart';

class ChatScreen extends StatefulWidget {
  final Ticket? ticket;
  const ChatScreen({super.key, this.ticket});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _controller = TextEditingController();
  final _scrollController = ScrollController();
  final _chatService = ChatWebSocketService();
  final _storageService = StorageService();

  // State for typing indicator
  bool _isAgentTyping = false;
  bool _isAgentOnline = false;
  List<String> _quickReplies = [];

  @override
  void initState() {
    super.initState();
    _connectChat();
  }

  Future<void> _connectChat() async {
    _chatService.isTypingStream.listen((isTyping) {
      if (mounted) setState(() => _isAgentTyping = isTyping);
      if (isTyping) _scrollToBottom();
    });

    _chatService.isOnlineStream.listen((isOnline) {
      if (mounted) setState(() => _isAgentOnline = isOnline);
    });

    _chatService.quickRepliesStream.listen((replies) {
      if (mounted) setState(() => _quickReplies = replies);
      // Wait for keyboard frame adjust then scroll
      if (replies.isNotEmpty) _scrollToBottom();
    });

    // Listen to messages to scroll down on new ones
    _chatService.messagesStream.listen((_) {
      _scrollToBottom();
    });

    await _chatService.connect();
  }

  void _scrollToBottom() {
    // Small delay to ensure list rendered
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _chatService.dispose();
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _sendMessage({
    String? text,
    MessageType type = MessageType.text,
    String? attachmentUrl,
  }) {
    final msgText = text ?? _controller.text;
    if (msgText.trim().isEmpty && type == MessageType.text) return;

    _chatService.sendMessage(msgText, type: type, attachmentUrl: attachmentUrl);
    if (type == MessageType.text && text == null) _controller.clear();
  }

  Future<void> _showAttachmentMenu() async {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Anexar', style: AppTypography.h3),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _AttachmentOption(
                  icon: Icons.camera_alt,
                  label: 'Câmera',
                  color: Colors.purple,
                  onTap: () => _handleImageSelection(ImageSource.camera),
                ),
                _AttachmentOption(
                  icon: Icons.image,
                  label: 'Galeria',
                  color: Colors.blue,
                  onTap: () => _handleImageSelection(ImageSource.gallery),
                ),
                _AttachmentOption(
                  icon: Icons.description,
                  label: 'Documento',
                  color: Colors.orange,
                  onTap: _handleFileSelection,
                ),
                _AttachmentOption(
                  icon: Icons.location_on,
                  label: 'Localização',
                  color: Colors.green,
                  onTap: _handleLocationSelection,
                ),
              ],
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Future<void> _handleImageSelection(ImageSource source) async {
    Navigator.pop(context);
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: source);

    if (pickedFile != null) {
      // Show uploading indicator logic could go here
      final url = await _storageService.uploadFile(
        File(pickedFile.path),
        'images',
      );
      _sendMessage(
        text: 'Imagem enviada',
        type: MessageType.image,
        attachmentUrl: url,
      ); // In real app, might want to send the file path first or partial upload
    }
  }

  Future<void> _handleFileSelection() async {
    Navigator.pop(context);
    final result = await FilePicker.platform.pickFiles();

    if (result != null && result.files.single.path != null) {
      final file = File(result.files.single.path!);
      final url = await _storageService.uploadFile(file, 'docs');
      // Use filename as text
      _sendMessage(
        text: result.files.single.name,
        type: MessageType.file,
        attachmentUrl: url,
      );
    }
  }

  void _handleLocationSelection() {
    Navigator.pop(context);
    // Mock location sending
    _sendMessage(
      text: 'Minha localização atual',
      type: MessageType.location,
      attachmentUrl: '-23.550520,-46.633308', // São Paulo Lat,Long
    );
  }

  Future<void> _loadOlderMessages() async {
    // Mock loading older messages
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Mensagens antigas carregadas')),
      );
    }
  }

  void _showMessageOptions(Message message) {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              ListTile(
                leading: const Icon(Icons.copy),
                title: const Text('Copiar'),
                onTap: () {
                  Clipboard.setData(ClipboardData(text: message.text));
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Mensagem copiada!')),
                  );
                },
              ),
              ListTile(
                leading: const Icon(Icons.reply),
                title: const Text('Encaminhar'),
                onTap: () {
                  Navigator.pop(context);
                  // Implement forward logic
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(
                        'Funcionalidade de encaminhar não implementada.',
                      ),
                    ),
                  );
                },
              ),
              ListTile(
                leading: const Icon(Icons.delete),
                title: const Text('Excluir'),
                onTap: () {
                  Navigator.pop(context);
                  // Implement delete logic
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(
                        'Funcionalidade de excluir não implementada.',
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Stack(
              children: [
                const CircleAvatar(
                  backgroundImage: NetworkImage(
                    'https://i.pravatar.cc/150?img=32',
                  ), // Mock Avatar
                ),
                Positioned(
                  right: 0,
                  bottom: 0,
                  child: Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: _isAgentOnline ? Colors.green : Colors.grey,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Suporte SoloForte', style: TextStyle(fontSize: 16)),
                Text(
                  _isAgentOnline ? 'Online agora' : 'Offline',
                  style: TextStyle(
                    fontSize: 12,
                    color: _isAgentOnline
                        ? Colors.green.shade100
                        : Colors.white70,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: StreamBuilder<List<Message>>(
              stream: _chatService.messagesStream,
              builder: (context, snapshot) {
                final messages = snapshot.data ?? [];

                return RefreshIndicator(
                  onRefresh: _loadOlderMessages,
                  child: ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: messages.length + (_isAgentTyping ? 1 : 0),
                    itemBuilder: (context, index) {
                      if (index == messages.length) {
                        return const _TypingIndicator(); // Show at the end
                      }

                      final msg = messages[index];
                      return _MessageBubble(
                        message: msg,
                        onLongPress: () => _showMessageOptions(msg),
                      );
                    },
                  ),
                );
              },
            ),
          ),
          if (_quickReplies.isNotEmpty)
            Container(
              height: 50,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: _quickReplies.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  return ActionChip(
                    label: Text(_quickReplies[index]),
                    backgroundColor: AppColors.primary.withOpacity(0.1),
                    labelStyle: const TextStyle(color: AppColors.primary),
                    onPressed: () => _sendMessage(text: _quickReplies[index]),
                  );
                },
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                IconButton(
                  onPressed: _showAttachmentMenu,
                  icon: const Icon(Icons.add_circle, color: AppColors.primary),
                ),
                Expanded(
                  child: CustomTextInput(
                    label: '',
                    controller: _controller,
                    hint: 'Escreva sua mensagem...',
                    onChanged: (val) {
                      // Logic to send 'user typing' status could go here
                      _chatService.sendTypingStatus(val.isNotEmpty);

                      // Command Autocomplete
                      if (val.startsWith('/')) {
                        final commands = BotService.commandKeys
                            .where((cmd) => cmd.startsWith(val.toLowerCase()))
                            .toList();
                        setState(() {
                          _quickReplies = commands;
                        });
                      } else if (_quickReplies.any((r) => r.startsWith('/')) &&
                          !val.startsWith('/')) {
                        // Clear commands if we stopped typing one
                        setState(() {
                          _quickReplies = [];
                        });
                      }
                    },
                    suffixIcon: _controller.text.isEmpty
                        ? IconButton(
                            onPressed: () {
                              // TODO: Implement voice recording
                            },
                            icon: const Icon(Icons.mic, color: Colors.grey),
                          )
                        : null,
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: () => _sendMessage(),
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

class _MessageBubble extends StatelessWidget {
  final Message message;
  final VoidCallback? onLongPress;

  const _MessageBubble({required this.message, this.onLongPress});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPress: onLongPress,
      child: Align(
        alignment: message.isMe ? Alignment.centerRight : Alignment.centerLeft,
        child: Container(
          constraints: BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width * 0.75,
          ),
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          decoration: BoxDecoration(
            color: message.isMe ? AppColors.primary : Colors.grey.shade200,
            borderRadius: BorderRadius.circular(16).copyWith(
              bottomRight: message.isMe ? Radius.zero : null,
              bottomLeft: !message.isMe ? Radius.zero : null,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              _buildContent(context),
              const SizedBox(height: 4),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (message.isMe) ...[
                    _buildStatusIcon(message.status),
                    const SizedBox(width: 4),
                  ],
                  Text(
                    _formatTime(message.timestamp),
                    style: TextStyle(
                      fontSize: 10,
                      color: message.isMe ? Colors.white70 : Colors.black54,
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

  Widget _buildContent(BuildContext context) {
    switch (message.type) {
      case MessageType.image:
        return _ImageMessage(
          url: message.attachmentUrl,
          text: message.text,
          isMe: message.isMe,
        );
      case MessageType.file:
        return _FileMessage(
          filename: message.text,
          url: message.attachmentUrl,
          isMe: message.isMe,
        );
      case MessageType.location:
        return _LocationMessage(
          coordinates: message.attachmentUrl,
          isMe: message.isMe,
        );
      case MessageType.audio:
        return Text(
          "Audio msg placeholder",
          style: TextStyle(color: message.isMe ? Colors.white : Colors.black87),
        );
      case MessageType.text:
      default:
        return Text(
          message.text,
          style: TextStyle(color: message.isMe ? Colors.white : Colors.black87),
        );
    }
  }

  String _formatTime(DateTime time) {
    return "${time.hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')}";
  }

  Widget _buildStatusIcon(MessageStatus status) {
    switch (status) {
      case MessageStatus.sending:
        return const Icon(Icons.access_time, size: 12, color: Colors.white70);
      case MessageStatus.sent:
        return const Icon(Icons.check, size: 12, color: Colors.white70);
      case MessageStatus.delivered:
        return const Icon(
          Icons.done_all,
          size: 12,
          color: Colors.white70,
        ); // Two ticks
      case MessageStatus.read:
        return const Icon(
          Icons.done_all,
          size: 12,
          color: Colors.lightBlueAccent,
        ); // Blue ticks
    }
  }
}

class _ImageMessage extends StatelessWidget {
  final String? url;
  final String text;
  final bool isMe;

  const _ImageMessage({
    required this.url,
    required this.text,
    required this.isMe,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (url != null)
          Container(
            constraints: const BoxConstraints(maxWidth: 200, maxHeight: 200),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              image: DecorationImage(
                image: NetworkImage(url!),
                fit: BoxFit.cover,
              ),
            ),
          )
        else
          Container(
            width: 200,
            height: 150,
            color: Colors.grey.shade300,
            child: const Icon(Icons.broken_image, color: Colors.grey),
          ),
        if (text.isNotEmpty && text != 'Imagem enviada') ...[
          const SizedBox(height: 8),
          Text(
            text,
            style: TextStyle(color: isMe ? Colors.white : Colors.black87),
          ),
        ],
      ],
    );
  }
}

class _FileMessage extends StatelessWidget {
  final String filename;
  final String? url;
  final bool isMe;

  const _FileMessage({required this.filename, this.url, required this.isMe});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: isMe ? Colors.white24 : Colors.grey.shade300,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(
            Icons.description,
            color: isMe ? Colors.white : Colors.black54,
          ),
        ),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              filename,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: isMe ? Colors.white : Colors.black87,
              ),
            ),
            Text(
              'PDF • 1.2 MB',
              style: TextStyle(
                fontSize: 10,
                color: isMe ? Colors.white70 : Colors.black54,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _LocationMessage extends StatelessWidget {
  final String? coordinates;
  final bool isMe;

  const _LocationMessage({required this.coordinates, required this.isMe});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 200,
          height: 120,
          decoration: BoxDecoration(
            color: Colors.grey.shade300,
            borderRadius: BorderRadius.circular(12),
            // In real app, use google maps static api or flutter map with markers
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Icon(Icons.map, size: 50, color: Colors.grey.shade500),
              const Icon(Icons.location_on, size: 30, color: Colors.red),
            ],
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Localização compartilhada',
          style: TextStyle(color: isMe ? Colors.white : Colors.black87),
        ),
      ],
    );
  }
}

class _AttachmentOption extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _AttachmentOption({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircleAvatar(
            radius: 24,
            backgroundColor: color.withOpacity(0.1),
            child: Icon(icon, color: color),
          ),
          const SizedBox(height: 8),
          Text(label, style: AppTypography.caption),
        ],
      ),
    );
  }
}

class _TypingIndicator extends StatelessWidget {
  const _TypingIndicator();

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: Colors.grey.shade200,
          borderRadius: BorderRadius.circular(
            16,
          ).copyWith(bottomLeft: Radius.zero),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            _Dot(delay: 0),
            const SizedBox(width: 4),
            _Dot(delay: 200),
            const SizedBox(width: 4),
            _Dot(delay: 400),
          ],
        ),
      ),
    );
  }
}

class _Dot extends StatefulWidget {
  final int delay;
  const _Dot({required this.delay});

  @override
  State<_Dot> createState() => _DotState();
}

class _DotState extends State<_Dot> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    )..repeat(reverse: true);

    Future.delayed(Duration(milliseconds: widget.delay), () {
      if (mounted) _controller.forward();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _controller,
      child: Container(
        width: 8,
        height: 8,
        decoration: const BoxDecoration(
          color: Colors.grey,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
