import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/marketing/domain/post_model.dart';
import 'package:timeago/timeago.dart' as timeago;

class FeedPostCard extends StatefulWidget {
  final Post post;
  final VoidCallback? onLike;
  final VoidCallback? onComment;
  final VoidCallback? onShare;
  final VoidCallback? onFollow;

  const FeedPostCard({
    super.key,
    required this.post,
    this.onLike,
    this.onComment,
    this.onShare,
    this.onFollow,
  });

  @override
  State<FeedPostCard> createState() => _FeedPostCardState();
}

class _FeedPostCardState extends State<FeedPostCard> {
  late bool isLiked;
  late int likeCount;
  bool isFollowing = false;

  @override
  void initState() {
    super.initState();
    // Simulate current user state
    isLiked = false;
    likeCount = widget.post.likes;
  }

  void _toggleLike() {
    setState(() {
      isLiked = !isLiked;
      likeCount += isLiked ? 1 : -1;
    });
    widget.onLike?.call();
  }

  void _toggleFollow() {
    setState(() {
      isFollowing = !isFollowing;
    });
    widget.onFollow?.call();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isFollowing
              ? 'Você agora segue ${widget.post.authorName}'
              : 'Você deixou de seguir ${widget.post.authorName}',
        ),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // HEADER
          Padding(
            padding: EdgeInsets.all(AppSpacing.sm),
            child: Row(
              children: [
                CircleAvatar(
                  backgroundColor: AppColors.primary.withOpacity(0.2),
                  child: Text(
                    widget.post.authorName[0],
                    style: const TextStyle(color: AppColors.primary),
                  ),
                ),
                SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.post.authorName,
                        style: AppTypography.label.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        timeago.format(widget.post.createdAt, locale: 'pt_BR'),
                        style: AppTypography.caption,
                      ),
                    ],
                  ),
                ),
                TextButton(
                  onPressed: _toggleFollow,
                  child: Text(
                    isFollowing ? 'Seguindo' : 'Seguir',
                    style: TextStyle(
                      color: isFollowing ? Colors.grey : AppColors.primary,
                      fontWeight: isFollowing
                          ? FontWeight.normal
                          : FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // CONTENT - Image
          if (widget.post.imageUrls.isNotEmpty)
            Container(
              height: 250,
              width: double.infinity,
              color: Colors.grey[200],
              child: widget.post.imageUrls.first.startsWith('http')
                  ? Image.network(
                      widget.post.imageUrls.first,
                      fit: BoxFit.cover,
                    )
                  : Image.asset(
                      'assets/images/placeholder_field.png',
                      fit: BoxFit.cover,
                      errorBuilder: (c, e, s) => const Center(
                        child: Icon(Icons.image, size: 50, color: Colors.grey),
                      ),
                    ),
            ),

          // CONTENT - Text
          Padding(
            padding: EdgeInsets.all(AppSpacing.md),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (widget.post.title.isNotEmpty)
                  Text(widget.post.title, style: AppTypography.h4),
                SizedBox(height: AppSpacing.xs),
                Text(widget.post.content, style: AppTypography.bodyMedium),

                // Tags
                if (widget.post.tags.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Wrap(
                      spacing: 4,
                      children: widget.post.tags
                          .map(
                            (tag) => Text(
                              tag,
                              style: const TextStyle(
                                color: AppColors.primary,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          )
                          .toList(),
                    ),
                  ),
              ],
            ),
          ),

          const Divider(height: 1),

          // FOOTER
          Padding(
            padding: EdgeInsets.symmetric(horizontal: AppSpacing.sm),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _InteractionButton(
                  icon: isLiked ? Icons.favorite : Icons.favorite_border,
                  label: '$likeCount Curtir',
                  color: isLiked ? Colors.red : Colors.grey,
                  onTap: _toggleLike,
                ),
                _InteractionButton(
                  icon: Icons.comment_outlined,
                  label: '${widget.post.comments} Coment.',
                  onTap: widget.onComment,
                ),
                _InteractionButton(
                  icon: Icons.share_outlined,
                  label: 'Compartilhar',
                  onTap: widget.onShare,
                ),
              ],
            ),
          ),
          SizedBox(height: AppSpacing.xs),
        ],
      ),
    );
  }
}

class _InteractionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback? onTap;
  final Color color;

  const _InteractionButton({
    required this.icon,
    required this.label,
    this.onTap,
    this.color = Colors.grey,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 8),
        child: Row(
          children: [
            Icon(icon, size: 20, color: color),
            const SizedBox(width: 4),
            Text(
              label,
              style: TextStyle(
                color: color,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
