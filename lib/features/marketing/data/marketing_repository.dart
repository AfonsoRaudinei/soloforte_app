import 'package:soloforte_app/features/marketing/domain/post_model.dart';

class MarketingRepository {
  // Mock Data
  final List<Post> _posts = [];

  Future<void> savePost(Post post) async {
    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 500));

    final index = _posts.indexWhere((p) => p.id == post.id);
    if (index >= 0) {
      _posts[index] = post;
    } else {
      _posts.add(post);
    }
  }

  Future<void> deletePost(String id) async {
    await Future.delayed(const Duration(milliseconds: 300));
    _posts.removeWhere((p) => p.id == id);
  }

  Future<List<Post>> getPosts({required PostStatus status}) async {
    await Future.delayed(const Duration(milliseconds: 300));
    return _posts.where((p) => p.status == status).toList();
  }

  // Singleton pattern for mock consistency across screens
  static final MarketingRepository _instance = MarketingRepository._internal();
  factory MarketingRepository() => _instance;
  MarketingRepository._internal();
}
