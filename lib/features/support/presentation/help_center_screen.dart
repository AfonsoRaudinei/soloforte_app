import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/support/data/help_articles_data.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class HelpCenterScreen extends StatefulWidget {
  const HelpCenterScreen({super.key});

  @override
  State<HelpCenterScreen> createState() => _HelpCenterScreenState();
}

class _HelpCenterScreenState extends State<HelpCenterScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<HelpArticle> _filteredArticles = mockArticles;
  String _selectedCategory = 'Todos';

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onSearchChanged);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged() {
    setState(() {
      _filterArticles();
    });
  }

  void _filterArticles() {
    final query = _searchController.text.toLowerCase();
    _filteredArticles = mockArticles.where((article) {
      final matchesSearch =
          article.title.toLowerCase().contains(query) ||
          article.content.toLowerCase().contains(query);
      final matchesCategory =
          _selectedCategory == 'Todos' || article.category == _selectedCategory;
      return matchesSearch && matchesCategory;
    }).toList();
  }

  void _onCategorySelected(String category) {
    setState(() {
      _selectedCategory = category;
      _filterArticles();
    });
  }

  @override
  Widget build(BuildContext context) {
    // Extract unique categories
    final categories = [
      'Todos',
      ...mockArticles.map((e) => e.category).toSet(),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Central de Ajuda')),
      body: Column(
        children: [
          // Search Header
          Container(
            padding: const EdgeInsets.all(16),
            color: AppColors.primary,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Como podemos ajudar?',
                  style: AppTypography.h3.copyWith(color: Colors.white),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    hintText: 'Buscar artigos, tutoriais...',
                    filled: true,
                    fillColor: Colors.white,
                    prefixIcon: const Icon(Icons.search),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                      borderSide: BorderSide.none,
                    ),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 20),
                  ),
                ),
              ],
            ),
          ),

          // Category Filter
          SizedBox(
            height: 60,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              scrollDirection: Axis.horizontal,
              itemCount: categories.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final category = categories[index];
                final isSelected = category == _selectedCategory;
                return ChoiceChip(
                  label: Text(category),
                  selected: isSelected,
                  onSelected: (_) => _onCategorySelected(category),
                  selectedColor: AppColors.primary.withOpacity(0.2),
                  labelStyle: TextStyle(
                    color: isSelected ? AppColors.primary : Colors.black87,
                    fontWeight: isSelected
                        ? FontWeight.bold
                        : FontWeight.normal,
                  ),
                );
              },
            ),
          ),

          // Content List
          Expanded(
            child: _filteredArticles.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(
                          Icons.search_off,
                          size: 64,
                          color: Colors.grey,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Nenhum artigo encontrado',
                          style: AppTypography.h3,
                        ),
                      ],
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: _filteredArticles.length,
                    separatorBuilder: (_, __) => const Divider(),
                    itemBuilder: (context, index) {
                      final article = _filteredArticles[index];
                      return ListTile(
                        title: Text(
                          article.title,
                          style: AppTypography.bodyLarge.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Text(
                          article.content,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        leading: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.grey.shade100,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Icon(
                            article.videoUrl != null
                                ? Icons.play_circle_fill
                                : Icons.article,
                            color: AppColors.primary,
                          ),
                        ),
                        trailing: const Icon(Icons.chevron_right),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  ArticleDetailScreen(article: article),
                            ),
                          );
                        },
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

class ArticleDetailScreen extends StatelessWidget {
  final HelpArticle article;

  const ArticleDetailScreen({super.key, required this.article});

  @override
  Widget build(BuildContext context) {
    YoutubePlayerController? controller;

    if (article.videoUrl != null) {
      final videoId = YoutubePlayer.convertUrlToId(article.videoUrl!);
      if (videoId != null) {
        controller = YoutubePlayerController(
          initialVideoId: videoId,
          flags: const YoutubePlayerFlags(autoPlay: false, mute: false),
        );
      }
    }

    return Scaffold(
      appBar: AppBar(title: Text(article.category)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(article.title, style: AppTypography.h2),
            const SizedBox(height: 16),
            if (controller != null) ...[
              YoutubePlayer(
                controller: controller,
                showVideoProgressIndicator: true,
                progressIndicatorColor: AppColors.primary,
              ),
              const SizedBox(height: 16),
            ],
            Text(
              article.content,
              style: AppTypography.bodyLarge.copyWith(height: 1.6),
            ),
            const SizedBox(height: 32),
            const Divider(),
            const SizedBox(height: 16),
            Text('Este artigo foi útil?', style: AppTypography.label),
            const SizedBox(height: 8),
            Row(
              children: [
                OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.thumb_up),
                  label: const Text('Sim'),
                ),
                const SizedBox(width: 12),
                OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.thumb_down),
                  label: const Text('Não'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
