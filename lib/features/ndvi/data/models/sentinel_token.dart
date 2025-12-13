import 'package:freezed_annotation/freezed_annotation.dart';

part 'sentinel_token.freezed.dart';
part 'sentinel_token.g.dart';

@freezed
class SentinelToken with _$SentinelToken {
  const factory SentinelToken({
    // ignore: invalid_annotation_target
    @JsonKey(name: 'access_token') required String accessToken,
    // ignore: invalid_annotation_target
    @JsonKey(name: 'expires_in') required int expiresIn,
    @Default(0) int receivedAt, // Timestamp in milliseconds
  }) = _SentinelToken;

  factory SentinelToken.fromJson(Map<String, dynamic> json) =>
      _$SentinelTokenFromJson(json);
}
