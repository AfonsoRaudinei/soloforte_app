// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'sentinel_token.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

SentinelToken _$SentinelTokenFromJson(Map<String, dynamic> json) {
  return _SentinelToken.fromJson(json);
}

/// @nodoc
mixin _$SentinelToken {
  // ignore: invalid_annotation_target
  @JsonKey(name: 'access_token')
  String get accessToken => throw _privateConstructorUsedError; // ignore: invalid_annotation_target
  @JsonKey(name: 'expires_in')
  int get expiresIn => throw _privateConstructorUsedError;
  int get receivedAt => throw _privateConstructorUsedError;

  /// Serializes this SentinelToken to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of SentinelToken
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $SentinelTokenCopyWith<SentinelToken> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SentinelTokenCopyWith<$Res> {
  factory $SentinelTokenCopyWith(
    SentinelToken value,
    $Res Function(SentinelToken) then,
  ) = _$SentinelTokenCopyWithImpl<$Res, SentinelToken>;
  @useResult
  $Res call({
    @JsonKey(name: 'access_token') String accessToken,
    @JsonKey(name: 'expires_in') int expiresIn,
    int receivedAt,
  });
}

/// @nodoc
class _$SentinelTokenCopyWithImpl<$Res, $Val extends SentinelToken>
    implements $SentinelTokenCopyWith<$Res> {
  _$SentinelTokenCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of SentinelToken
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? accessToken = null,
    Object? expiresIn = null,
    Object? receivedAt = null,
  }) {
    return _then(
      _value.copyWith(
            accessToken: null == accessToken
                ? _value.accessToken
                : accessToken // ignore: cast_nullable_to_non_nullable
                      as String,
            expiresIn: null == expiresIn
                ? _value.expiresIn
                : expiresIn // ignore: cast_nullable_to_non_nullable
                      as int,
            receivedAt: null == receivedAt
                ? _value.receivedAt
                : receivedAt // ignore: cast_nullable_to_non_nullable
                      as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$SentinelTokenImplCopyWith<$Res>
    implements $SentinelTokenCopyWith<$Res> {
  factory _$$SentinelTokenImplCopyWith(
    _$SentinelTokenImpl value,
    $Res Function(_$SentinelTokenImpl) then,
  ) = __$$SentinelTokenImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    @JsonKey(name: 'access_token') String accessToken,
    @JsonKey(name: 'expires_in') int expiresIn,
    int receivedAt,
  });
}

/// @nodoc
class __$$SentinelTokenImplCopyWithImpl<$Res>
    extends _$SentinelTokenCopyWithImpl<$Res, _$SentinelTokenImpl>
    implements _$$SentinelTokenImplCopyWith<$Res> {
  __$$SentinelTokenImplCopyWithImpl(
    _$SentinelTokenImpl _value,
    $Res Function(_$SentinelTokenImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of SentinelToken
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? accessToken = null,
    Object? expiresIn = null,
    Object? receivedAt = null,
  }) {
    return _then(
      _$SentinelTokenImpl(
        accessToken: null == accessToken
            ? _value.accessToken
            : accessToken // ignore: cast_nullable_to_non_nullable
                  as String,
        expiresIn: null == expiresIn
            ? _value.expiresIn
            : expiresIn // ignore: cast_nullable_to_non_nullable
                  as int,
        receivedAt: null == receivedAt
            ? _value.receivedAt
            : receivedAt // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$SentinelTokenImpl implements _SentinelToken {
  const _$SentinelTokenImpl({
    @JsonKey(name: 'access_token') required this.accessToken,
    @JsonKey(name: 'expires_in') required this.expiresIn,
    this.receivedAt = 0,
  });

  factory _$SentinelTokenImpl.fromJson(Map<String, dynamic> json) =>
      _$$SentinelTokenImplFromJson(json);

  // ignore: invalid_annotation_target
  @override
  @JsonKey(name: 'access_token')
  final String accessToken;
  // ignore: invalid_annotation_target
  @override
  @JsonKey(name: 'expires_in')
  final int expiresIn;
  @override
  @JsonKey()
  final int receivedAt;

  @override
  String toString() {
    return 'SentinelToken(accessToken: $accessToken, expiresIn: $expiresIn, receivedAt: $receivedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SentinelTokenImpl &&
            (identical(other.accessToken, accessToken) ||
                other.accessToken == accessToken) &&
            (identical(other.expiresIn, expiresIn) ||
                other.expiresIn == expiresIn) &&
            (identical(other.receivedAt, receivedAt) ||
                other.receivedAt == receivedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, accessToken, expiresIn, receivedAt);

  /// Create a copy of SentinelToken
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$SentinelTokenImplCopyWith<_$SentinelTokenImpl> get copyWith =>
      __$$SentinelTokenImplCopyWithImpl<_$SentinelTokenImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$SentinelTokenImplToJson(this);
  }
}

abstract class _SentinelToken implements SentinelToken {
  const factory _SentinelToken({
    @JsonKey(name: 'access_token') required final String accessToken,
    @JsonKey(name: 'expires_in') required final int expiresIn,
    final int receivedAt,
  }) = _$SentinelTokenImpl;

  factory _SentinelToken.fromJson(Map<String, dynamic> json) =
      _$SentinelTokenImpl.fromJson;

  // ignore: invalid_annotation_target
  @override
  @JsonKey(name: 'access_token')
  String get accessToken; // ignore: invalid_annotation_target
  @override
  @JsonKey(name: 'expires_in')
  int get expiresIn;
  @override
  int get receivedAt;

  /// Create a copy of SentinelToken
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$SentinelTokenImplCopyWith<_$SentinelTokenImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
