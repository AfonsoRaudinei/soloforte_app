import '../../../core/api/api_client.dart';
import '../../../core/services/secure_storage_service.dart';
import '../domain/auth_state.dart';

class AuthService {
  final ApiClient _api;

  AuthService(this._api);

  // Login
  Future<AuthState> login(String email, String password) async {
    try {
      final response = await _api.post(
        '/auth/login',
        data: {'email': email, 'password': password},
      );

      final data = response.data;

      // Save tokens securely
      await SecureStorageService.saveAuthToken(data['token']);
      await SecureStorageService.saveRefreshToken(data['refreshToken']);
      await SecureStorageService.saveUserId(data['user']['id']);
      await SecureStorageService.saveUserEmail(data['user']['email']);

      return AuthState.authenticated(
        userId: data['user']['id'],
        email: data['user']['email'],
        name: data['user']['name'],
        token: data['token'],
        refreshToken: data['refreshToken'],
      );
    } catch (e) {
      throw AuthException('Login failed: $e');
    }
  }

  // Register
  Future<AuthState> register({
    required String name,
    required String email,
    required String password,
    required String phone,
  }) async {
    try {
      final response = await _api.post(
        '/auth/register',
        data: {
          'name': name,
          'email': email,
          'password': password,
          'phone': phone,
        },
      );

      final data = response.data;

      await SecureStorageService.saveAuthToken(data['token']);
      await SecureStorageService.saveRefreshToken(data['refreshToken']);
      await SecureStorageService.saveUserId(data['user']['id']);
      await SecureStorageService.saveUserEmail(data['user']['email']);

      return AuthState.authenticated(
        userId: data['user']['id'],
        email: data['user']['email'],
        name: data['user']['name'],
        token: data['token'],
        refreshToken: data['refreshToken'],
      );
    } catch (e) {
      throw AuthException('Registration failed: $e');
    }
  }

  // Logout
  Future<void> logout() async {
    try {
      await _api.post('/auth/logout');
    } catch (e) {
      // Continue even if API call fails
    } finally {
      await SecureStorageService.clearAll();
    }
  }

  // Check if logged in
  Future<AuthState?> checkAuth() async {
    try {
      final token = await SecureStorageService.getAuthToken();
      if (token == null) return null;

      final userId = await SecureStorageService.getUserId();
      final email = await SecureStorageService.getUserEmail();

      if (userId == null || email == null) return null;

      // Verify token with backend
      final response = await _api.get('/auth/me');
      final data = response.data;

      return AuthState.authenticated(
        userId: data['id'],
        email: data['email'],
        name: data['name'],
        token: token,
        refreshToken: await SecureStorageService.getRefreshToken() ?? '',
      );
    } catch (e) {
      await SecureStorageService.clearAll();
      return null;
    }
  }

  // Forgot password
  Future<void> forgotPassword(String email) async {
    await _api.post('/auth/forgot-password', data: {'email': email});
  }

  // Reset password
  Future<void> resetPassword(String token, String newPassword) async {
    await _api.post(
      '/auth/reset-password',
      data: {'token': token, 'password': newPassword},
    );
  }

  // Biometric Login
  Future<AuthState> loginWithBiometric(BiometricService biometric) async {
    try {
      // 1. Check if biometric is available
      if (!await biometric.canAuthenticate()) {
        throw BiometricNotAvailableException();
      }

      // 2. Authenticate with biometric
      final authenticated = await biometric.authenticate(
        reason: 'Autentique-se para acessar o SoloForte',
        biometricOnly: true,
      );

      if (!authenticated) {
        throw BiometricAuthFailedException();
      }

      // 3. Get stored token
      final token = await SecureStorageService.getAuthToken();
      if (token == null) {
        throw Exception(
          'No stored credentials. Please login with email/password first.',
        );
      }

      // 4. Verify token with backend
      final authState = await checkAuth();
      if (authState == null) {
        throw Exception('Token validation failed');
      }
      return authState;
    } catch (e) {
      throw AuthException('Biometric login failed: $e');
    }
  }

  // Enable biometric for future logins
  Future<void> enableBiometric() async {
    await SecureStorageService.write('biometric_enabled', 'true');
  }

  // Disable biometric
  Future<void> disableBiometric() async {
    await SecureStorageService.delete('biometric_enabled');
  }

  // Check if biometric is enabled
  Future<bool> isBiometricEnabled() async {
    final enabled = await SecureStorageService.read('biometric_enabled');
    return enabled == 'true';
  }
}

class AuthException implements Exception {
  final String message;
  AuthException(this.message);

  @override
  String toString() => message;
}
