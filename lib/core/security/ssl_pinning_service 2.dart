import 'dart:io';
import 'package:crypto/crypto.dart';
import 'package:dio/dio.dart';
import 'package:dio/io.dart';

/// SSL Certificate Pinning Service
/// Protects against Man-in-the-Middle (MITM) attacks
class SslPinningService {
  // Certificate SHA-256 hashes (public key pinning)
  // TODO: Replace with your actual certificate hashes
  static const List<String> certificateHashes = [
    // Primary certificate
    'YOUR_PRIMARY_CERT_SHA256_HASH_HERE',
    // Backup certificate (for rotation)
    'YOUR_BACKUP_CERT_SHA256_HASH_HERE',
  ];

  /// Configure SSL pinning for Dio client
  static void configurePinning(Dio dio) {
    if (dio.httpClientAdapter is! IOHttpClientAdapter) {
      throw Exception('SSL pinning only works with IOHttpClientAdapter');
    }

    (dio.httpClientAdapter as IOHttpClientAdapter).onHttpClientCreate =
        (client) {
          client.badCertificateCallback = (cert, host, port) {
            // Extract public key from certificate
            final certDer = cert.der;
            final certHash = sha256.convert(certDer).toString();

            // Check if certificate hash matches any of our pinned hashes
            final isValid = certificateHashes.contains(certHash);

            if (!isValid) {
              print('⚠️ SSL Pinning: Certificate validation failed!');
              print('   Host: $host:$port');
              print('   Received hash: $certHash');
              print('   Expected one of: ${certificateHashes.join(', ')}');
            } else {
              print('✅ SSL Pinning: Certificate validated successfully');
            }

            return isValid;
          };

          return client;
        };
  }

  /// Validate certificate manually (for testing)
  static bool validateCertificate(X509Certificate cert) {
    final certHash = sha256.convert(cert.der).toString();
    return certificateHashes.contains(certHash);
  }

  /// Get certificate hash from URL (for setup)
  static Future<String> getCertificateHash(String url) async {
    final uri = Uri.parse(url);
    final socket = await SecureSocket.connect(
      uri.host,
      uri.port,
      onBadCertificate: (cert) => true, // Accept any cert for inspection
    );

    final cert = socket.peerCertificate;
    if (cert == null) {
      throw Exception('No certificate found');
    }

    final hash = sha256.convert(cert.der).toString();
    await socket.close();

    return hash;
  }
}

/// Exception thrown when SSL pinning fails
class SslPinningException implements Exception {
  final String message;
  final String? receivedHash;
  final List<String> expectedHashes;

  SslPinningException(
    this.message, {
    this.receivedHash,
    required this.expectedHashes,
  });

  @override
  String toString() {
    return 'SslPinningException: $message\n'
        'Received: $receivedHash\n'
        'Expected: ${expectedHashes.join(', ')}';
  }
}
