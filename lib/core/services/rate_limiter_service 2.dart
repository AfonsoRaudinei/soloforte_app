import 'dart:math';

/// Rate Limiter Service
/// Protects against brute force attacks and API abuse
class RateLimiter {
  final Map<String, List<DateTime>> _requests = {};
  final Duration window;
  final int maxRequests;

  RateLimiter({
    this.window = const Duration(minutes: 1),
    this.maxRequests = 10,
  });

  /// Throttle a function call
  Future<T> throttle<T>(String key, Future<T> Function() fn) async {
    final now = DateTime.now();
    final requests = _requests[key] ?? [];

    // Remove old requests outside window
    requests.removeWhere((time) => now.difference(time) > window);

    // Check if limit exceeded
    if (requests.length >= maxRequests) {
      final oldestRequest = requests.first;
      final waitTime = window - now.difference(oldestRequest);

      throw RateLimitException(
        'Too many requests. Try again in ${waitTime.inSeconds}s',
        retryAfter: waitTime,
      );
    }

    // Add current request
    requests.add(now);
    _requests[key] = requests;

    return await fn();
  }

  /// Clear all rate limit data
  void clear() {
    _requests.clear();
  }

  /// Clear rate limit for specific key
  void clearKey(String key) {
    _requests.remove(key);
  }
}

/// Retry Policy with Exponential Backoff
class RetryPolicy {
  static Future<T> withBackoff<T>(
    Future<T> Function() fn, {
    int maxAttempts = 3,
    Duration initialDelay = const Duration(seconds: 1),
    bool Function(dynamic)? shouldRetry,
  }) async {
    int attempt = 0;

    while (true) {
      try {
        return await fn();
      } catch (e) {
        attempt++;

        // Check if should retry
        if (shouldRetry != null && !shouldRetry(e)) {
          rethrow;
        }

        if (attempt >= maxAttempts) {
          rethrow;
        }

        // Exponential backoff: 1s, 2s, 4s, 8s...
        final delay = initialDelay * pow(2, attempt - 1);
        await Future.delayed(delay);
      }
    }
  }
}

/// Rate Limit Exception
class RateLimitException implements Exception {
  final String message;
  final Duration retryAfter;

  RateLimitException(this.message, {required this.retryAfter});

  @override
  String toString() => 'RateLimitException: $message';
}
