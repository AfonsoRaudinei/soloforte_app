import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/auth_repository.dart';
import '../domain/user_model.dart';

class MockAuthRepository implements AuthRepository {
  final _controller = StreamController<User?>.broadcast();
  User? _currentUser;

  MockAuthRepository() {
    // Simulate initial check
    Future.delayed(const Duration(milliseconds: 500), () {
      _controller.add(null);
    });
  }

  @override
  Stream<User?> get authStateChanges => _controller.stream;

  @override
  User? get currentUser => _currentUser;

  @override
  Future<User> login(String email, String password) async {
    await Future.delayed(const Duration(seconds: 2)); // Simulate network

    if (email == 'error@test.com') {
      throw Exception('Credenciais inválidas');
    }

    final user = User(
      id: '1',
      email: email,
      name: 'Usuário Demo',
      avatarUrl: 'https://i.pravatar.cc/300',
    );

    _currentUser = user;
    _controller.add(user);
    return user;
  }

  @override
  Future<User> register(String name, String email, String password) async {
    await Future.delayed(const Duration(seconds: 2));

    final user = User(id: '2', email: email, name: name);

    _currentUser = user;
    _controller.add(user);
    return user;
  }

  @override
  Future<void> logout() async {
    await Future.delayed(const Duration(milliseconds: 500));
    _currentUser = null;
    _controller.add(null);
  }

  @override
  Future<void> recoverPassword(String email) async {
    await Future.delayed(const Duration(seconds: 1));
  }
}

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return MockAuthRepository();
});
