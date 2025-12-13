import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:timeago/timeago.dart' as timeago;
import '../providers/notifications_provider.dart';
import 'notification_item.dart';

class NotificationCenter extends ConsumerStatefulWidget {
  final VoidCallback? onClose;

  const NotificationCenter({super.key, this.onClose});

  @override
  ConsumerState<NotificationCenter> createState() => _NotificationCenterState();
}

class _NotificationCenterState extends ConsumerState<NotificationCenter> {
  bool showOnlyUnread = false;

  @override
  void initState() {
    super.initState();
    // Configurar locale para português
    timeago.setLocaleMessages('pt_BR', timeago.PtBrMessages());
  }

  @override
  Widget build(BuildContext context) {
    final notificationsAsync = ref.watch(notificationsProvider);
    final unreadCount = ref.watch(unreadCountProvider);

    return Container(
      height: MediaQuery.of(context).size.height * 0.8,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(AppSpacing.radius2xl),
        ),
      ),
      child: Column(
        children: [
          // Handle bar
          Padding(
            padding: EdgeInsets.all(AppSpacing.md),
            child: Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.gray300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
          ),

          // Header
          Padding(
            padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Notificações', style: AppTypography.h2),
                    if (unreadCount > 0)
                      Text(
                        '$unreadCount não lida${unreadCount > 1 ? 's' : ''}',
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.textSecondary,
                        ),
                      ),
                  ],
                ),
                Row(
                  children: [
                    // Filtro
                    IconButton(
                      icon: Icon(
                        showOnlyUnread
                            ? Icons.filter_alt
                            : Icons.filter_alt_outlined,
                        color: showOnlyUnread
                            ? AppColors.primary
                            : AppColors.gray500,
                      ),
                      onPressed: () {
                        setState(() {
                          showOnlyUnread = !showOnlyUnread;
                        });
                      },
                      tooltip: 'Mostrar apenas não lidas',
                    ),
                    // Marcar todas como lidas
                    if (unreadCount > 0)
                      IconButton(
                        icon: const Icon(Icons.done_all),
                        onPressed: () {
                          ref
                              .read(notificationsProvider.notifier)
                              .markAllAsRead();
                        },
                        tooltip: 'Marcar todas como lidas',
                      ),
                    // Fechar
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () {
                        widget.onClose?.call();
                        Navigator.pop(context);
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),

          Divider(height: 1, color: AppColors.gray200),

          // Lista de notificações
          Expanded(
            child: notificationsAsync.when(
              data: (notifications) {
                final filtered = showOnlyUnread
                    ? notifications.where((n) => !n.isRead).toList()
                    : notifications;

                if (filtered.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.notifications_none,
                          size: 64,
                          color: AppColors.gray300,
                        ),
                        SizedBox(height: AppSpacing.lg),
                        Text(
                          showOnlyUnread
                              ? 'Nenhuma notificação não lida'
                              : 'Nenhuma notificação',
                          style: AppTypography.bodyLarge.copyWith(
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  );
                }

                return ListView.separated(
                  padding: EdgeInsets.symmetric(vertical: AppSpacing.md),
                  itemCount: filtered.length,
                  separatorBuilder: (context, index) =>
                      Divider(height: 1, color: AppColors.gray100),
                  itemBuilder: (context, index) {
                    final notification = filtered[index];
                    return NotificationItem(
                      notification: notification,
                      onTap: () {
                        // Marcar como lida
                        if (!notification.isRead) {
                          ref
                              .read(notificationsProvider.notifier)
                              .markAsRead(notification.id);
                        }

                        // Navegar se tiver rota
                        if (notification.actionRoute != null) {
                          Navigator.pop(context);
                          context.push(notification.actionRoute!);
                        }
                      },
                    );
                  },
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) =>
                  Center(child: Text('Erro ao carregar notificações: $error')),
            ),
          ),
        ],
      ),
    );
  }
}
