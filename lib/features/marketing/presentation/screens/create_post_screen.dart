import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

import 'package:soloforte_app/features/marketing/presentation/screens/image_editor_screen.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/content_input/rich_text_input.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/create_post/image_picker_section.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/create_post/publish_targets_section.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/create_post/scheduling_section.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/create_post/templates_section.dart';
import 'package:soloforte_app/features/marketing/services/scheduling_service.dart';
import 'package:soloforte_app/features/marketing/services/social_share_service.dart';

import 'package:soloforte_app/features/marketing/domain/post_model.dart';
import 'package:soloforte_app/features/marketing/data/marketing_repository.dart';
import 'package:uuid/uuid.dart';

class CreatePostScreen extends StatefulWidget {
  final Post? draft;
  const CreatePostScreen({super.key, this.draft});

  @override
  State<CreatePostScreen> createState() => _CreatePostScreenState();
}

class _CreatePostScreenState extends State<CreatePostScreen> {
  final TextEditingController _textController = TextEditingController();
  final List<XFile> _selectedImages = [];
  final ImagePicker _picker = ImagePicker();
  final SocialShareService _socialShareService = SocialShareService();
  final SchedulingService _schedulingService = SchedulingService();
  final MarketingRepository _repository = MarketingRepository();

  bool _publishToFeed = true;
  bool _publishToInstagram = true;
  bool _publishToFacebook = true;
  bool _publishToLinkedIn = false;
  bool _publishToTwitter = false;

  bool _isScheduled = false;
  DateTime _scheduledDate = DateTime.now().add(const Duration(days: 1));
  TimeOfDay _scheduledTime = const TimeOfDay(hour: 14, minute: 0);

  @override
  void initState() {
    super.initState();
    if (widget.draft != null) {
      _textController.text = widget.draft!.content;
      // In a real app we would download images here to populate _selectedImages
    }
  }

  Future<void> _pickImage(ImageSource source) async {
    if (_selectedImages.length >= 10) return;
    try {
      final XFile? image = await _picker.pickImage(source: source);
      if (image != null) {
        setState(() {
          _selectedImages.add(image);
        });
      }
    } catch (e) {
      debugPrint('Error picking image: $e');
    }
  }

  void _removeImage(int index) {
    setState(() {
      _selectedImages.removeAt(index);
    });
  }

  void _openImageEditor(XFile image) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ImageEditorScreen(imageFile: image),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Nova Publicação'),
        actions: [
          IconButton(
            icon: const Icon(Icons.check),
            onPressed: () => _handlePublish(),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ImagePickerSection(
              selectedImages: _selectedImages,
              onPickImage: _pickImage,
              onRemoveImage: _removeImage,
              onEditImage: _openImageEditor,
            ),
            SizedBox(height: AppSpacing.lg),

            const TemplatesSection(),
            SizedBox(height: AppSpacing.lg),

            // Text Input
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Escreva sua mensagem', style: AppTypography.label),
                SizedBox(height: AppSpacing.sm),
                RichTextInput(controller: _textController, maxLength: 500),
              ],
            ),
            SizedBox(height: AppSpacing.lg),

            // Data Integration Chips (Still inline as it's simple)
            _buildDataIntegrationSection(),
            SizedBox(height: AppSpacing.lg),

            PublishTargetsSection(
              publishToFeed: _publishToFeed,
              publishToInstagram: _publishToInstagram,
              publishToFacebook: _publishToFacebook,
              publishToLinkedIn: _publishToLinkedIn,
              publishToTwitter: _publishToTwitter,
              onFeedChanged: (v) => setState(() => _publishToFeed = v),
              onInstagramChanged: (v) =>
                  setState(() => _publishToInstagram = v),
              onFacebookChanged: (v) => setState(() => _publishToFacebook = v),
              onLinkedInChanged: (v) => setState(() => _publishToLinkedIn = v),
              onTwitterChanged: (v) => setState(() => _publishToTwitter = v),
            ),
            SizedBox(height: AppSpacing.lg),

            SchedulingSection(
              isScheduled: _isScheduled,
              scheduledDate: _scheduledDate,
              scheduledTime: _scheduledTime,
              onScheduledChanged: (v) => setState(() => _isScheduled = v),
              onDateChanged: (v) => setState(() => _scheduledDate = v),
              onTimeChanged: (v) => setState(() => _scheduledTime = v),
              onSuggestionSelected: (v) => setState(() => _scheduledTime = v),
            ),
            SizedBox(height: AppSpacing.xl),

            // Bottom Actions
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: _saveDraft,
                    child: const Text('Salvar Rascunho'),
                  ),
                ),
                SizedBox(width: AppSpacing.md),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => _handlePublish(),
                    child: const Text('Publicar'),
                  ),
                ),
              ],
            ),
            SizedBox(height: AppSpacing.xl),
          ],
        ),
      ),
    );
  }

  Widget _buildDataIntegrationSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Adicionar Dados (opcional)',
          style: AppTypography.caption.copyWith(fontWeight: FontWeight.bold),
        ),
        SizedBox(height: AppSpacing.sm),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            ActionChip(
              avatar: const Icon(Icons.bar_chart, size: 16),
              label: const Text('Incluir gráfico NDVI'),
              onPressed: () {},
            ),
            ActionChip(
              avatar: const Icon(Icons.location_on, size: 16),
              label: const Text('Marcar localização'),
              onPressed: () {},
            ),
            ActionChip(
              avatar: const Icon(Icons.person, size: 16),
              label: const Text('Marcar produtor'),
              onPressed: () {},
            ),
            ActionChip(
              avatar: const Icon(Icons.tag, size: 16),
              label: const Text('Adicionar hashtags'),
              onPressed: () {},
            ),
          ],
        ),
      ],
    );
  }

  Future<void> _saveDraft() async {
    final draftPost = Post(
      id: widget.draft?.id ?? const Uuid().v4(),
      title: 'Rascunho',
      content: _textController.text,
      createdAt: DateTime.now(),
      authorId: 'user_123',
      authorName: 'Produtor Demo',
      imageUrls: _selectedImages.map((e) => e.path).toList(),
      status: PostStatus.draft,
      scheduledTo: null,
    );

    await _repository.savePost(draftPost);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Rascunho salvo com sucesso!')),
      );
      Navigator.pop(context);
    }
  }

  Future<void> _handlePublish() async {
    if (_isScheduled) {
      // Schedule
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Agendando publicação...')));

      final scheduledDateTime = DateTime(
        _scheduledDate.year,
        _scheduledDate.month,
        _scheduledDate.day,
        _scheduledTime.hour,
        _scheduledTime.minute,
      );

      await _schedulingService.schedulePost(
        title: 'Post Agendado',
        content: _textController.text,
        imageUrls: _selectedImages.map((e) => e.path).toList(),
        scheduledDate: scheduledDateTime,
        toFeed: _publishToFeed,
        toExternal:
            _publishToInstagram ||
            _publishToFacebook ||
            _publishToLinkedIn ||
            _publishToTwitter,
      );

      if (mounted) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Agendamento salvo com sucesso!')),
        );
      }
    } else {
      // Publish Now
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Preparando publicação...')));

      await _socialShareService.publishMultiple(
        imagePaths: _selectedImages.map((e) => e.path).toList(),
        text: _textController.text,
        toInstagram: _publishToInstagram,
        toFacebook: _publishToFacebook,
        toLinkedIn: _publishToLinkedIn,
        toTwitter: _publishToTwitter,
      );

      if (mounted) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Postagem iniciada! Verifique os apps abertos.'),
          ),
        );
      }
    }
  }
}
