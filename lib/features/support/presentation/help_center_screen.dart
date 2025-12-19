import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:go_router/go_router.dart';

class HelpCenterScreen extends StatefulWidget {
  const HelpCenterScreen({super.key});

  @override
  State<HelpCenterScreen> createState() => _HelpCenterScreenState();
}

class _HelpCenterScreenState extends State<HelpCenterScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(title: const Text('Central de Ajuda')),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Search Area
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.search, color: Colors.grey),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: _searchController,
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          hintText: 'Buscar ajuda...',
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Categories Grid
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('📚 Categorias', style: AppTypography.h3),
                  const Divider(),
                  const SizedBox(height: 16),
                  GridView.count(
                    crossAxisCount: 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    childAspectRatio: 1.5,
                    mainAxisSpacing: 16,
                    crossAxisSpacing: 16,
                    children: [
                      _buildCategoryCard('🚀', 'Primeiros Passos', 15),
                      _buildCategoryCard('🗺️', 'Mapas e Desenho', 12),
                      _buildCategoryCard('🛰️', 'NDVI e Imagens', 8),
                      _buildCategoryCard('📌', 'Ocorrências', 10),
                      _buildCategoryCard('🎥', 'Tutoriais em Vídeo', 20),
                    ],
                  ),
                ],
              ),
            ),

            // FAQ
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('❓ Perguntas Frequentes', style: AppTypography.h3),
                  const Divider(),
                  _buildFaqItem('Como desenhar uma área?'),
                  _buildFaqItem('Como ver o histórico NDVI?'),
                  _buildFaqItem('Como exportar relatório?'),
                  _buildFaqItem('Como adicionar produtor?'),
                  TextButton(
                    onPressed: () {},
                    child: const Text('Ver todas (45)'),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Contact Support
            Container(
              padding: const EdgeInsets.all(24),
              color: Colors.grey[50],
              width: double.infinity,
              child: Column(
                children: [
                  const Text(
                    'Não encontrou o que procurava?',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: () =>
                          context.push('/dashboard/support/create'),
                      icon: const Icon(Icons.chat_bubble_outline),
                      label: const Text('Falar com Suporte'),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        side: const BorderSide(color: AppColors.primary),
                        foregroundColor: AppColors.primary,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryCard(String emoji, String title, int count) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey[300]!),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(emoji, style: const TextStyle(fontSize: 24)),
          const SizedBox(height: 8),
          Text(
            title,
            style: const TextStyle(fontWeight: FontWeight.bold),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          Text(
            '$count artigos',
            style: const TextStyle(color: Colors.grey, fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildFaqItem(String question) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: const Icon(Icons.circle, size: 6, color: Colors.grey),
      title: Text(question),
      trailing: const Icon(Icons.chevron_right, size: 16),
      visualDensity: VisualDensity.compact,
      onTap: () {},
    );
  }
}
