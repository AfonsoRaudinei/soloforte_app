import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:soloforte_app/features/team/data/team_chat_repository.dart';
import 'package:soloforte_app/features/team/domain/team_chat_model.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'chat_controller.freezed.dart';

@freezed
class ChatState with _$ChatState {
  const factory ChatState({
    @Default([]) List<TeamConversation> conversations,
    @Default(false) bool isLoading,
    String? error,
  }) = _ChatState;
}

class ChatController extends StateNotifier<ChatState> {
  final TeamChatRepository _repository;

  ChatController(this._repository) : super(const ChatState()) {
    loadConversations();
  }

  Future<void> loadConversations() async {
    state = state.copyWith(isLoading: true);
    try {
      final conversations = await _repository.getConversations();
      state = state.copyWith(conversations: conversations, isLoading: false);
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  Future<void> sendBroadcast(String message) async {
    state = state.copyWith(isLoading: true);
    try {
      await _repository.sendBroadcast(message);
      state = state.copyWith(isLoading: false);
      // In real app, trigger a refresh or show success not via state error
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }
}

final teamChatRepositoryProvider = Provider<TeamChatRepository>((ref) {
  return MockTeamChatRepository();
});

final teamChatControllerProvider =
    StateNotifierProvider<ChatController, ChatState>((ref) {
      return ChatController(ref.watch(teamChatRepositoryProvider));
    });

// For individual chat screens using FutureProvider family
final chatMessagesProvider = FutureProvider.family<List<TeamMessage>, String>((
  ref,
  conversationId,
) async {
  final repo = ref.watch(teamChatRepositoryProvider);
  return repo.getMessages(conversationId);
});
