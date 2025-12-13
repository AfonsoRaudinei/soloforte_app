import 'user_model.dart';

abstract class AuthRepository {
  Stream<User?> get authStateChanges;

  Future<User> login(String email, String password);

  Future<User> register(String name, String email, String password);

  Future<void> logout();

  Future<void> recoverPassword(String email);

  User? get currentUser;
}
