import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/notification_repository.dart';
import '../../domain/notification_model.dart';

final notificationRepositoryProvider = Provider<NotificationRepository>((ref) {
  return NotificationRepository();
});

final notificationsProvider =
    StateNotifierProvider<
      NotificationsNotifier,
      AsyncValue<List<NotificationModel>>
    >((ref) {
      final repository = ref.watch(notificationRepositoryProvider);
      return NotificationsNotifier(repository);
    });

final unreadCountProvider = Provider<int>((ref) {
  return ref
      .watch(notificationsProvider)
      .when(
        data: (notifications) => notifications.where((n) => !n.isRead).length,
        loading: () => 0,
        error: (_, __) => 0,
      );
});

class NotificationsNotifier
    extends StateNotifier<AsyncValue<List<NotificationModel>>> {
  final NotificationRepository _repository;

  NotificationsNotifier(this._repository) : super(const AsyncValue.loading()) {
    loadNotifications();
  }

  Future<void> loadNotifications() async {
    state = const AsyncValue.loading();
    try {
      final notifications = await _repository.loadNotifications();
      state = AsyncValue.data(notifications);
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }

  Future<void> markAsRead(String notificationId) async {
    await _repository.markAsRead(notificationId);
    await loadNotifications();
  }

  Future<void> markAllAsRead() async {
    await _repository.markAllAsRead();
    await loadNotifications();
  }

  Future<void> addNotification(NotificationModel notification) async {
    await _repository.addNotification(notification);
    await loadNotifications();
  }

  Future<void> clearAll() async {
    await _repository.clearAll();
    state = const AsyncValue.data([]);
  }
}
