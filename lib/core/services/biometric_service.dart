import 'package:local_auth/local_auth.dart';
import 'package:flutter/services.dart';

/// Biometric Authentication Service
/// Supports Face ID, Touch ID, and Fingerprint
class BiometricService {
  final LocalAuthentication _auth = LocalAuthentication();

  /// Check if device supports biometric authentication
  Future<bool> canAuthenticate() async {
    try {
      return await _auth.canCheckBiometrics && await _auth.isDeviceSupported();
    } catch (e) {
      return false;
    }
  }

  /// Get list of available biometric types
  Future<List<BiometricType>> getAvailableBiometrics() async {
    try {
      return await _auth.getAvailableBiometrics();
    } catch (e) {
      return [];
    }
  }

  /// Check if specific biometric type is available
  Future<bool> hasFaceID() async {
    final biometrics = await getAvailableBiometrics();
    return biometrics.contains(BiometricType.face);
  }

  Future<bool> hasFingerprint() async {
    final biometrics = await getAvailableBiometrics();
    return biometrics.contains(BiometricType.fingerprint);
  }

  Future<bool> hasIris() async {
    final biometrics = await getAvailableBiometrics();
    return biometrics.contains(BiometricType.iris);
  }

  /// Authenticate user with biometrics
  Future<bool> authenticate({
    required String reason,
    bool useErrorDialogs = true,
    bool stickyAuth = true,
    bool biometricOnly = false,
  }) async {
    try {
      return await _auth.authenticate(
        localizedReason: reason,
        options: AuthenticationOptions(
          useErrorDialogs: useErrorDialogs,
          stickyAuth: stickyAuth,
          biometricOnly: biometricOnly,
        ),
      );
    } on PlatformException catch (e) {
      // Handle specific errors
      if (e.code == 'NotAvailable') {
        throw BiometricNotAvailableException();
      } else if (e.code == 'NotEnrolled') {
        throw BiometricNotEnrolledException();
      } else if (e.code == 'LockedOut') {
        throw BiometricLockedOutException();
      } else if (e.code == 'PermanentlyLockedOut') {
        throw BiometricPermanentlyLockedOutException();
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /// Stop authentication (if in progress)
  Future<void> stopAuthentication() async {
    try {
      await _auth.stopAuthentication();
    } catch (e) {
      // Ignore errors
    }
  }

  /// Get biometric type name for display
  String getBiometricTypeName(BiometricType type) {
    switch (type) {
      case BiometricType.face:
        return 'Face ID';
      case BiometricType.fingerprint:
        return 'Impressão Digital';
      case BiometricType.iris:
        return 'Íris';
      case BiometricType.strong:
        return 'Biometria Forte';
      case BiometricType.weak:
        return 'Biometria Fraca';
    }
  }

  /// Get icon for biometric type
  String getBiometricIcon(BiometricType type) {
    switch (type) {
      case BiometricType.face:
        return '👤'; // or Icons.face
      case BiometricType.fingerprint:
        return '👆'; // or Icons.fingerprint
      case BiometricType.iris:
        return '👁️';
      default:
        return '🔐';
    }
  }
}

// Custom Exceptions
class BiometricNotAvailableException implements Exception {
  @override
  String toString() => 'Biometria não disponível neste dispositivo';
}

class BiometricNotEnrolledException implements Exception {
  @override
  String toString() =>
      'Nenhuma biometria cadastrada. Configure nas configurações do dispositivo.';
}

class BiometricLockedOutException implements Exception {
  @override
  String toString() =>
      'Muitas tentativas falhadas. Tente novamente mais tarde.';
}

class BiometricPermanentlyLockedOutException implements Exception {
  @override
  String toString() => 'Biometria bloqueada permanentemente. Use senha.';
}

class BiometricAuthFailedException implements Exception {
  @override
  String toString() => 'Autenticação biométrica falhou';
}
