import 'dart:async';
import 'package:soloforte_app/features/support/domain/message_model.dart';

class BotResponse {
  final String text;
  final List<String> options; // For quick replies
  final MessageType type;
  final String? attachmentUrl;

  BotResponse({
    required this.text,
    this.options = const [],
    this.type = MessageType.text,
    this.attachmentUrl,
  });
}

class BotService {
  static List<String> get commandKeys => _commands.keys.toList();

  // Command registry
  static final Map<String, BotResponse> _commands = {
    '/help': BotResponse(
      text:
          'Comandos disponíveis:\n\n'
          '/tutorial - Ver tutoriais\n'
          '/status - Status do sistema\n'
          '/human - Falar com atendente\n'
          '/tickets - Meus chamados',
      options: ['/tutorial', '/status', '/tickets'],
    ),
    '/tutorial': BotResponse(
      text: 'Selecione um tema para o tutorial:',
      options: ['Plantio', 'Colheita', 'Relatórios', 'Financeiro'],
    ),
    '/status': BotResponse(
      text:
          '🟢 Todos os sistemas operando normalmente.\n'
          'API: Online\n'
          'Sync: 2min atrás',
    ),
    '/human': BotResponse(
      text:
          'Entendido. Estou transferindo você para um de nossos especialistas. Aguarde um momento...',
      type: MessageType.system,
    ),
  };

  // Keyword rules
  static final Map<String, BotResponse> _keywords = {
    'senha': BotResponse(
      text:
          'Para redefinir sua senha, vá em Configurações > Segurança ou clique no link abaixo.',
      options: ['Redefinir Senha', '/help'],
    ),
    'erro': BotResponse(
      text:
          'Sinto muito que esteja enfrentando problemas. Poderia descrever melhor o erro? Se possível, envie um print.',
      options: ['Enviar Print', '/human'],
    ),
    'preço': BotResponse(
      text: 'Nossos planos atuais podem ser visualizados na aba de Assinatura.',
    ),
  };

  Future<BotResponse?> processMessage(String message) async {
    final lowerMsg = message.trim().toLowerCase();

    // Check strict commands
    if (lowerMsg.startsWith('/')) {
      final command = lowerMsg.split(' ').first;
      return _commands[command] ??
          BotResponse(
            text: 'Comando não reconhecido. Digite /help para ver as opções.',
            options: ['/help'],
          );
    }

    // Check keywords
    for (final key in _keywords.keys) {
      if (lowerMsg.contains(key)) {
        return _keywords[key];
      }
    }

    // Default conversational AI mock
    return _mockAIResponse(lowerMsg);
  }

  BotResponse _mockAIResponse(String msg) {
    if (msg.contains('olá') || msg.contains('oi')) {
      return BotResponse(
        text:
            'Olá! Sou o assistente virtual do SoloForte. Como posso ajudar hoje?',
        options: ['/help', 'Relatar problema', 'Dúvidas'],
      );
    }

    return BotResponse(
      text:
          'Não tenho certeza se entendi. Você pode tentar refrasear ou usar um comando.',
      options: ['/help', '/human'],
    );
  }
}
