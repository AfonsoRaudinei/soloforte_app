import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/marketing/data/marketing_repository.dart';
import 'package:soloforte_app/features/marketing/domain/post_model.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/feed/feed_post_card.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/feed/ranking_widget.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final MarketingRepository _repository = MarketingRepository();
  List<Post> _posts = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadPosts();
  }

  Future<void> _loadPosts() async {
    // In a real app, we would fetch different streams for 'For You' vs 'Following'
    // Here we load mock posts and scheduled/draft posts

    // Create some initial mock posts if empty
    final existing = await _repository.getPosts(status: PostStatus.published);
    if (existing.isEmpty) {
      // Populate with dummy data for demo
      _posts = [
        Post(
          id: '1',
          title: 'Colheita Recorde na Soja',
          content:
              'Graças ao novo manejo de bioinsumos, conseguimos atingir 85 sc/ha nessa safra! #OrgulhoDoAgro #Soja',
          createdAt: DateTime.now().subtract(const Duration(hours: 2)),
          authorId: '1',
          authorName: 'João da Silva',
          likes: 124,
          comments: 12,
          status: PostStatus.published,
          tags: ['#Soja', '#Produtividade'],
          imageUrls: [
            'http://wrong.url.com/placeholder.png',
          ], // Will fallback to asset
        ),
        Post(
          id: '2',
          title: 'Dúvida sobre Adubação Foliar',
          content:
              'Alguém tem experiência com aplicação de Boro no estádio V4? Estou vendo resultados mistos.',
          createdAt: DateTime.now().subtract(const Duration(hours: 5)),
          authorId: '2',
          authorName: 'Mariana Agro',
          likes: 45,
          comments: 34,
          status: PostStatus.published,
          tags: ['#Duvida', '#Manejo'],
        ),
      ];
    } else {
      _posts = existing;
    }

    if (mounted) {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _refresh() async {
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 1));
    await _loadPosts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Comunidade SoloForte',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppColors.primary,
          unselectedLabelColor: Colors.grey,
          indicatorColor: AppColors.primary,
          tabs: const [
            Tab(text: 'Para Você'),
            Tab(text: 'Seguindo'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildFeedList(showRanking: true),
          _buildFeedList(showRanking: false),
        ],
      ),
    );
  }

  Widget _buildFeedList({required bool showRanking}) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    return RefreshIndicator(
      onRefresh: _refresh,
      child: CustomScrollView(
        slivers: [
          if (showRanking) const SliverToBoxAdapter(child: RankingWidget()),

          if (_posts.isEmpty)
            const SliverFillRemaining(
              child: Center(child: Text('Nenhuma publicação ainda.')),
            ),

          SliverList(
            delegate: SliverChildBuilderDelegate((context, index) {
              final post = _posts[index];
              return FeedPostCard(
                post: post,
                onLike: () {
                  // Logic to update repo would go here
                },
                onComment: () {
                  // Open comment modal
                  _showCommentsModal(context);
                },
                onShare: () {
                  // Share functionality
                },
                onFollow: () {
                  // Follow logic
                },
              );
            }, childCount: _posts.length),
          ),
          const SliverPadding(
            padding: EdgeInsets.only(bottom: 80),
          ), // Space for FAB
        ],
      ),
    );
  }

  void _showCommentsModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
          ),
          child: Container(
            height: 500,
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Text(
                  'Comentários',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
                const Divider(),
                Expanded(
                  child: ListView(
                    children: const [
                      ListTile(
                        leading: CircleAvatar(child: Text('A')),
                        title: Text('Ana Souza'),
                        subtitle: Text('Parabéns pelos resultados! 👏'),
                      ),
                      ListTile(
                        leading: CircleAvatar(child: Text('C')),
                        title: Text('Carlos Agrônomo'),
                        subtitle: Text('A aplicação foi via solo ou foliar?'),
                      ),
                    ],
                  ),
                ),
                TextField(
                  decoration: InputDecoration(
                    hintText: 'Adicione um comentário...',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    suffixIcon: const Icon(
                      Icons.send,
                      color: AppColors.primary,
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
