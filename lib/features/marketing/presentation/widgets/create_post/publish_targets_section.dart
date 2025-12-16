import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class PublishTargetsSection extends StatelessWidget {
  final bool publishToFeed;
  final bool publishToInstagram;
  final bool publishToFacebook;
  final bool publishToLinkedIn;
  final bool publishToTwitter;

  final Function(bool) onFeedChanged;
  final Function(bool) onInstagramChanged;
  final Function(bool) onFacebookChanged;
  final Function(bool) onLinkedInChanged;
  final Function(bool) onTwitterChanged;

  const PublishTargetsSection({
    super.key,
    required this.publishToFeed,
    required this.publishToInstagram,
    required this.publishToFacebook,
    required this.publishToLinkedIn,
    required this.publishToTwitter,
    required this.onFeedChanged,
    required this.onInstagramChanged,
    required this.onFacebookChanged,
    required this.onLinkedInChanged,
    required this.onTwitterChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Publicar em:', style: AppTypography.label),
        CheckboxListTile(
          value: publishToFeed,
          onChanged: (v) => onFeedChanged(v!),
          title: const Text('Feed SoloForte'),
          secondary: const Icon(Icons.rss_feed),
          dense: true,
          contentPadding: EdgeInsets.zero,
        ),
        CheckboxListTile(
          value: publishToInstagram,
          onChanged: (v) => onInstagramChanged(v!),
          title: const Text('Instagram'),
          secondary: const Icon(Icons.camera_alt, color: Colors.purple),
          dense: true,
          contentPadding: EdgeInsets.zero,
        ),
        CheckboxListTile(
          value: publishToFacebook,
          onChanged: (v) => onFacebookChanged(v!),
          title: const Text('Facebook'),
          secondary: const Icon(Icons.facebook, color: Colors.blue),
          dense: true,
          contentPadding: EdgeInsets.zero,
        ),
        CheckboxListTile(
          value: publishToLinkedIn,
          onChanged: (v) => onLinkedInChanged(v!),
          title: const Text('LinkedIn'),
          secondary: const Icon(Icons.business, color: Colors.blue),
          dense: true,
          contentPadding: EdgeInsets.zero,
        ),
        CheckboxListTile(
          value: publishToTwitter,
          onChanged: (v) => onTwitterChanged(v!),
          title: const Text('Twitter'),
          secondary: const Icon(Icons.alternate_email, color: Colors.lightBlue),
          dense: true,
          contentPadding: EdgeInsets.zero,
        ),
      ],
    );
  }
}
