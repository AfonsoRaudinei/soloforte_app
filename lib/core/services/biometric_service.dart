import 'package:local_auth/local_auth.dart' as la;

/// Biometric Authentication Service
/// Supports Face ID, Touch ID, and Fingerprint
class BiometricService {
  final la.LocalAuthentication _auth = la.LocalAuthentication();

  /// Check if device supports biometric authentication
  Future<bool> canAuthenticate() async {
    try {
      return await _auth.canCheckBiometrics && await _auth.isDeviceSupported();
    } catch (e) {
      return false;
    }
  }

  /// Get list of available biometric types
  Future<List<la.BiometricType>> getAvailableBiometrics() async {
    try {
      return await _auth.getAvailableBiometrics();
    } catch (e) {
      return [];
    }
  }

  /// Check if specific biometric type is available
  Future<bool> hasFaceID() async {
    final biometrics = await getAvailableBiometrics();
    return biometrics.contains(la.BiometricType.face);
  }

  Future<bool> hasFingerprint() async {
    final biometrics = await getAvailableBiometrics();
    return biometrics.contains(la.BiometricType.fingerprint);
  }

  Future<bool> hasIris() async {
    final biometrics = await getAvailableBiometrics();
    return biometrics.contains(la.BiometricType.iris);
  }

  /// Authenticate user with biometrics
  Future<bool> authenticate({
    required String reason,
    bool useErrorDialogs = true,
    bool stickyAuth = true,
    bool biometricOnly = false,
  }) async {
    // Temporary stub due to package version mismatch
    return false;
    /*
    try {
      return await _auth.authenticate(
        localizedReason: reason,
        options: la.AuthenticationOptions(
          useErrorDialogs: useErrorDialogs,
          stickyAuth: stickyAuth,
          biometricOnly: biometricOnly,
        ),
      );
    } on PlatformException catch (e) {
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
    */
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
  String getBiometricTypeName(la.BiometricType type) {
    switch (type) {
      case la.BiometricType.face:
        return 'Face ID';
      case la.BiometricType.fingerprint:
        return 'Impressão Digital';
      case la.BiometricType.iris:
        return 'Íris';
      case la.BiometricType.strong:
        return 'Biometria Forte';
      case la.BiometricType.weak:
        return 'Biometria Fraca';
    }
  }

  /// Get icon for biometric type
  String getBiometricIcon(la.BiometricType type) {
    switch (type) {
      case la.BiometricType.face:
        return '👤'; // or Icons.face
      case la.BiometricType.fingerprint:
        return '👆'; // or Icons.fingerprint
      case la.BiometricType.iris:
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
