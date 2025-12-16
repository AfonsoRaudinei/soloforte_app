// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'client_history_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

ClientHistory _$ClientHistoryFromJson(Map<String, dynamic> json) {
  return _ClientHistory.fromJson(json);
}

/// @nodoc
mixin _$ClientHistory {
  String get id => throw _privateConstructorUsedError;
  String get clientId => throw _privateConstructorUsedError;
  String get actionType =>
      throw _privateConstructorUsedError; // 'visit', 'occurrence', 'report', 'call', 'whatsapp', 'email', 'created', 'updated'
  DateTime get timestamp => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  String? get relatedId =>
      throw _privateConstructorUsedError; // ID da visita, ocorrência, relatório, etc.
  String? get userId =>
      throw _privateConstructorUsedError; // Quem executou a ação
  Map<String, dynamic>? get metadata => throw _privateConstructorUsedError;

  /// Serializes this ClientHistory to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ClientHistory
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ClientHistoryCopyWith<ClientHistory> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ClientHistoryCopyWith<$Res> {
  factory $ClientHistoryCopyWith(
    ClientHistory value,
    $Res Function(ClientHistory) then,
  ) = _$ClientHistoryCopyWithImpl<$Res, ClientHistory>;
  @useResult
  $Res call({
    String id,
    String clientId,
    String actionType,
    DateTime timestamp,
    String description,
    String? relatedId,
    String? userId,
    Map<String, dynamic>? metadata,
  });
}

/// @nodoc
class _$ClientHistoryCopyWithImpl<$Res, $Val extends ClientHistory>
    implements $ClientHistoryCopyWith<$Res> {
  _$ClientHistoryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ClientHistory
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? clientId = null,
    Object? actionType = null,
    Object? timestamp = null,
    Object? description = null,
    Object? relatedId = freezed,
    Object? userId = freezed,
    Object? metadata = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            clientId: null == clientId
                ? _value.clientId
                : clientId // ignore: cast_nullable_to_non_nullable
                      as String,
            actionType: null == actionType
                ? _value.actionType
                : actionType // ignore: cast_nullable_to_non_nullable
                      as String,
            timestamp: null == timestamp
                ? _value.timestamp
                : timestamp // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            description: null == description
                ? _value.description
                : description // ignore: cast_nullable_to_non_nullable
                      as String,
            relatedId: freezed == relatedId
                ? _value.relatedId
                : relatedId // ignore: cast_nullable_to_non_nullable
                      as String?,
            userId: freezed == userId
                ? _value.userId
                : userId // ignore: cast_nullable_to_non_nullable
                      as String?,
            metadata: freezed == metadata
                ? _value.metadata
                : metadata // ignore: cast_nullable_to_non_nullable
                      as Map<String, dynamic>?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ClientHistoryImplCopyWith<$Res>
    implements $ClientHistoryCopyWith<$Res> {
  factory _$$ClientHistoryImplCopyWith(
    _$ClientHistoryImpl value,
    $Res Function(_$ClientHistoryImpl) then,
  ) = __$$ClientHistoryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String clientId,
    String actionType,
    DateTime timestamp,
    String description,
    String? relatedId,
    String? userId,
    Map<String, dynamic>? metadata,
  });
}

/// @nodoc
class __$$ClientHistoryImplCopyWithImpl<$Res>
    extends _$ClientHistoryCopyWithImpl<$Res, _$ClientHistoryImpl>
    implements _$$ClientHistoryImplCopyWith<$Res> {
  __$$ClientHistoryImplCopyWithImpl(
    _$ClientHistoryImpl _value,
    $Res Function(_$ClientHistoryImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ClientHistory
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? clientId = null,
    Object? actionType = null,
    Object? timestamp = null,
    Object? description = null,
    Object? relatedId = freezed,
    Object? userId = freezed,
    Object? metadata = freezed,
  }) {
    return _then(
      _$ClientHistoryImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        clientId: null == clientId
            ? _value.clientId
            : clientId // ignore: cast_nullable_to_non_nullable
                  as String,
        actionType: null == actionType
            ? _value.actionType
            : actionType // ignore: cast_nullable_to_non_nullable
                  as String,
        timestamp: null == timestamp
            ? _value.timestamp
            : timestamp // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        description: null == description
            ? _value.description
            : description // ignore: cast_nullable_to_non_nullable
                  as String,
        relatedId: freezed == relatedId
            ? _value.relatedId
            : relatedId // ignore: cast_nullable_to_non_nullable
                  as String?,
        userId: freezed == userId
            ? _value.userId
            : userId // ignore: cast_nullable_to_non_nullable
                  as String?,
        metadata: freezed == metadata
            ? _value._metadata
            : metadata // ignore: cast_nullable_to_non_nullable
                  as Map<String, dynamic>?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ClientHistoryImpl implements _ClientHistory {
  const _$ClientHistoryImpl({
    required this.id,
    required this.clientId,
    required this.actionType,
    required this.timestamp,
    required this.description,
    this.relatedId,
    this.userId,
    final Map<String, dynamic>? metadata,
  }) : _metadata = metadata;

  factory _$ClientHistoryImpl.fromJson(Map<String, dynamic> json) =>
      _$$ClientHistoryImplFromJson(json);

  @override
  final String id;
  @override
  final String clientId;
  @override
  final String actionType;
  // 'visit', 'occurrence', 'report', 'call', 'whatsapp', 'email', 'created', 'updated'
  @override
  final DateTime timestamp;
  @override
  final String description;
  @override
  final String? relatedId;
  // ID da visita, ocorrência, relatório, etc.
  @override
  final String? userId;
  // Quem executou a ação
  final Map<String, dynamic>? _metadata;
  // Quem executou a ação
  @override
  Map<String, dynamic>? get metadata {
    final value = _metadata;
    if (value == null) return null;
    if (_metadata is EqualUnmodifiableMapView) return _metadata;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(value);
  }

  @override
  String toString() {
    return 'ClientHistory(id: $id, clientId: $clientId, actionType: $actionType, timestamp: $timestamp, description: $description, relatedId: $relatedId, userId: $userId, metadata: $metadata)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ClientHistoryImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.clientId, clientId) ||
                other.clientId == clientId) &&
            (identical(other.actionType, actionType) ||
                other.actionType == actionType) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.relatedId, relatedId) ||
                other.relatedId == relatedId) &&
            (identical(other.userId, userId) || other.userId == userId) &&
            const DeepCollectionEquality().equals(other._metadata, _metadata));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    clientId,
    actionType,
    timestamp,
    description,
    relatedId,
    userId,
    const DeepCollectionEquality().hash(_metadata),
  );

  /// Create a copy of ClientHistory
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ClientHistoryImplCopyWith<_$ClientHistoryImpl> get copyWith =>
      __$$ClientHistoryImplCopyWithImpl<_$ClientHistoryImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ClientHistoryImplToJson(this);
  }
}

abstract class _ClientHistory implements ClientHistory {
  const factory _ClientHistory({
    required final String id,
    required final String clientId,
    required final String actionType,
    required final DateTime timestamp,
    required final String description,
    final String? relatedId,
    final String? userId,
    final Map<String, dynamic>? metadata,
  }) = _$ClientHistoryImpl;

  factory _ClientHistory.fromJson(Map<String, dynamic> json) =
      _$ClientHistoryImpl.fromJson;

  @override
  String get id;
  @override
  String get clientId;
  @override
  String get actionType; // 'visit', 'occurrence', 'report', 'call', 'whatsapp', 'email', 'created', 'updated'
  @override
  DateTime get timestamp;
  @override
  String get description;
  @override
  String? get relatedId; // ID da visita, ocorrência, relatório, etc.
  @override
  String? get userId; // Quem executou a ação
  @override
  Map<String, dynamic>? get metadata;

  /// Create a copy of ClientHistory
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ClientHistoryImplCopyWith<_$ClientHistoryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
