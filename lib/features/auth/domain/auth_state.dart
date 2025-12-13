/// Authentication State
class AuthState {
  final String userId;
  final String email;
  final String name;
  final String token;
  final String refreshToken;

  const AuthState({
    required this.userId,
    required this.email,
    required this.name,
    required this.token,
    required this.refreshToken,
  });

  AuthState.authenticated({
    required this.userId,
    required this.email,
    required this.name,
    required this.token,
    required this.refreshToken,
  });

  Map<String, dynamic> toJson() => {
    'userId': userId,
    'email': email,
    'name': name,
    'token': token,
    'refreshToken': refreshToken,
  };

  factory AuthState.fromJson(Map<String, dynamic> json) => AuthState(
    userId: json['userId'] as String,
    email: json['email'] as String,
    name: json['name'] as String,
    token: json['token'] as String,
    refreshToken: json['refreshToken'] as String,
  );
}
