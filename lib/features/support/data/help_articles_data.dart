class HelpArticle {
  final String id;
  final String title;
  final String category;
  final String content; // Markdown or simple text
  final String? videoUrl; // Youtube or direct link

  HelpArticle({
    required this.id,
    required this.title,
    required this.category,
    required this.content,
    this.videoUrl,
  });
}

final List<HelpArticle> mockArticles = [
  HelpArticle(
    id: '1',
    title: 'Como realizar o Check-in na fazenda?',
    category: 'Visitas',
    content:
        'Para realizar o check-in, navegue até a tela de visitas, selecione a visita agendada e clique no botão "Iniciar Visita". Certifique-se de que o GPS está ativado.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
  ),
  HelpArticle(
    id: '2',
    title: 'Entendendo os índices NDVI',
    category: 'Análise',
    content:
        'O NDVI (Índice de Vegetação da Diferença Normalizada) é um indicador simples de biomassa fotossinteticamente ativa. Valores altos indicam vegetação saudável.',
  ),
  HelpArticle(
    id: '3',
    title: 'Como exportar relatórios em PDF?',
    category: 'Relatórios',
    content:
        'Na tela de visualização do relatório, toque no ícone de compartilhamento no canto superior direito e selecione "Salvar como PDF".',
  ),
  HelpArticle(
    id: '4',
    title: 'Configurando alertas de clima',
    category: 'Configurações',
    content:
        'Vá em Configurações > Notificações e ative a chave "Alertas Meteorológicos" para receber avisos sobre tempestades e geadas.',
  ),
];
