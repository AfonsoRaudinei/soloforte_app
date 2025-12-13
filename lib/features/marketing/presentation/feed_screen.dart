import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/features/marketing/domain/feed_item.dart';

class FeedScreen extends StatelessWidget {
  const FeedScreen({super.key});

  static final List<FeedItem> _feedItems = [
    FeedItem(
      id: '1',
      title: 'Alta produtividade na soja: novas técnicas de manejo',
      imageUrl: 'https://via.placeholder.com/400x200',
      type: 'news',
      linkUrl: '#',
      summary: 'Descubra como produtores estão aumentando a produtividade...',
      publishDate: DateTime.now().subtract(const Duration(hours: 2)),
    ),
    FeedItem(
      id: '2',
      title: 'Oferta Especial: Fertilizantes Organominerais',
      imageUrl: 'https://via.placeholder.com/400x200',
      type: 'ad',
      linkUrl: '#',
      summary: 'Confira as condições especiais para a próxima safra.',
      publishDate: DateTime.now().subtract(const Duration(days: 1)),
    ),
    FeedItem(
      id: '3',
      title: 'Previsão de chuvas acima da média para o Centro-Oeste',
      imageUrl: 'https://via.placeholder.com/400x200',
      type: 'news',
      linkUrl: '#',
      summary: 'Meteorologia indica bons volumes para o início do plantio.',
      publishDate: DateTime.now().subtract(const Duration(days: 2)),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Notícias & Ofertas')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: _feedItems.length,
        separatorBuilder: (_, __) => const SizedBox(height: 16),
        itemBuilder: (context, index) {
          final item = _feedItems[index];
          return _FeedCard(item: item);
        },
      ),
    );
  }
}

class _FeedCard extends StatelessWidget {
  final FeedItem item;

  const _FeedCard({required this.item});

  @override
  Widget build(BuildContext context) {
    final isAd = item.type == 'ad';
    return Card(
      clipBehavior: Clip.antiAlias,
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: isAd
            ? BorderSide(color: Colors.orange.shade200, width: 2)
            : BorderSide.none,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 150,
            width: double.infinity,
            color: Colors.grey.shade300,
            child: const Center(
              child: Icon(Icons.image, size: 50, color: Colors.grey),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (isAd)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.orange,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text(
                      'PATROCINADO',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                if (isAd) const SizedBox(height: 8),
                Text(
                  item.title,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 8),
                Text(item.summary, style: const TextStyle(color: Colors.grey)),
                const SizedBox(height: 12),
                Text(
                  'Ler mais',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
