// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'alert_config_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

AlertConfig _$AlertConfigFromJson(Map<String, dynamic> json) {
  return _AlertConfig.fromJson(json);
}

/// @nodoc
mixin _$AlertConfig {
  String get id => throw _privateConstructorUsedError;
  AlertType get type => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  bool get isEnabled => throw _privateConstructorUsedError;
  bool get pushNotification => throw _privateConstructorUsedError;
  bool get emailNotification => throw _privateConstructorUsedError;
  bool get smsNotification => throw _privateConstructorUsedError;
  Map<String, dynamic>? get conditions => throw _privateConstructorUsedError;

  /// Serializes this AlertConfig to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AlertConfig
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AlertConfigCopyWith<AlertConfig> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AlertConfigCopyWith<$Res> {
  factory $AlertConfigCopyWith(
    AlertConfig value,
    $Res Function(AlertConfig) then,
  ) = _$AlertConfigCopyWithImpl<$Res, AlertConfig>;
  @useResult
  $Res call({
    String id,
    AlertType type,
    String title,
    bool isEnabled,
    bool pushNotification,
    bool emailNotification,
    bool smsNotification,
    Map<String, dynamic>? conditions,
  });
}

/// @nodoc
class _$AlertConfigCopyWithImpl<$Res, $Val extends AlertConfig>
    implements $AlertConfigCopyWith<$Res> {
  _$AlertConfigCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AlertConfig
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? title = null,
    Object? isEnabled = null,
    Object? pushNotification = null,
    Object? emailNotification = null,
    Object? smsNotification = null,
    Object? conditions = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as AlertType,
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
            isEnabled: null == isEnabled
                ? _value.isEnabled
                : isEnabled // ignore: cast_nullable_to_non_nullable
                      as bool,
            pushNotification: null == pushNotification
                ? _value.pushNotification
                : pushNotification // ignore: cast_nullable_to_non_nullable
                      as bool,
            emailNotification: null == emailNotification
                ? _value.emailNotification
                : emailNotification // ignore: cast_nullable_to_non_nullable
                      as bool,
            smsNotification: null == smsNotification
                ? _value.smsNotification
                : smsNotification // ignore: cast_nullable_to_non_nullable
                      as bool,
            conditions: freezed == conditions
                ? _value.conditions
                : conditions // ignore: cast_nullable_to_non_nullable
                      as Map<String, dynamic>?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$AlertConfigImplCopyWith<$Res>
    implements $AlertConfigCopyWith<$Res> {
  factory _$$AlertConfigImplCopyWith(
    _$AlertConfigImpl value,
    $Res Function(_$AlertConfigImpl) then,
  ) = __$$AlertConfigImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    AlertType type,
    String title,
    bool isEnabled,
    bool pushNotification,
    bool emailNotification,
    bool smsNotification,
    Map<String, dynamic>? conditions,
  });
}

/// @nodoc
class __$$AlertConfigImplCopyWithImpl<$Res>
    extends _$AlertConfigCopyWithImpl<$Res, _$AlertConfigImpl>
    implements _$$AlertConfigImplCopyWith<$Res> {
  __$$AlertConfigImplCopyWithImpl(
    _$AlertConfigImpl _value,
    $Res Function(_$AlertConfigImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of AlertConfig
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? title = null,
    Object? isEnabled = null,
    Object? pushNotification = null,
    Object? emailNotification = null,
    Object? smsNotification = null,
    Object? conditions = freezed,
  }) {
    return _then(
      _$AlertConfigImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as AlertType,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        isEnabled: null == isEnabled
            ? _value.isEnabled
            : isEnabled // ignore: cast_nullable_to_non_nullable
                  as bool,
        pushNotification: null == pushNotification
            ? _value.pushNotification
            : pushNotification // ignore: cast_nullable_to_non_nullable
                  as bool,
        emailNotification: null == emailNotification
            ? _value.emailNotification
            : emailNotification // ignore: cast_nullable_to_non_nullable
                  as bool,
        smsNotification: null == smsNotification
            ? _value.smsNotification
            : smsNotification // ignore: cast_nullable_to_non_nullable
                  as bool,
        conditions: freezed == conditions
            ? _value._conditions
            : conditions // ignore: cast_nullable_to_non_nullable
                  as Map<String, dynamic>?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$AlertConfigImpl implements _AlertConfig {
  const _$AlertConfigImpl({
    required this.id,
    required this.type,
    required this.title,
    required this.isEnabled,
    this.pushNotification = true,
    this.emailNotification = false,
    this.smsNotification = false,
    final Map<String, dynamic>? conditions,
  }) : _conditions = conditions;

  factory _$AlertConfigImpl.fromJson(Map<String, dynamic> json) =>
      _$$AlertConfigImplFromJson(json);

  @override
  final String id;
  @override
  final AlertType type;
  @override
  final String title;
  @override
  final bool isEnabled;
  @override
  @JsonKey()
  final bool pushNotification;
  @override
  @JsonKey()
  final bool emailNotification;
  @override
  @JsonKey()
  final bool smsNotification;
  final Map<String, dynamic>? _conditions;
  @override
  Map<String, dynamic>? get conditions {
    final value = _conditions;
    if (value == null) return null;
    if (_conditions is EqualUnmodifiableMapView) return _conditions;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(value);
  }

  @override
  String toString() {
    return 'AlertConfig(id: $id, type: $type, title: $title, isEnabled: $isEnabled, pushNotification: $pushNotification, emailNotification: $emailNotification, smsNotification: $smsNotification, conditions: $conditions)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AlertConfigImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.isEnabled, isEnabled) ||
                other.isEnabled == isEnabled) &&
            (identical(other.pushNotification, pushNotification) ||
                other.pushNotification == pushNotification) &&
            (identical(other.emailNotification, emailNotification) ||
                other.emailNotification == emailNotification) &&
            (identical(other.smsNotification, smsNotification) ||
                other.smsNotification == smsNotification) &&
            const DeepCollectionEquality().equals(
              other._conditions,
              _conditions,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    type,
    title,
    isEnabled,
    pushNotification,
    emailNotification,
    smsNotification,
    const DeepCollectionEquality().hash(_conditions),
  );

  /// Create a copy of AlertConfig
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AlertConfigImplCopyWith<_$AlertConfigImpl> get copyWith =>
      __$$AlertConfigImplCopyWithImpl<_$AlertConfigImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AlertConfigImplToJson(this);
  }
}

abstract class _AlertConfig implements AlertConfig {
  const factory _AlertConfig({
    required final String id,
    required final AlertType type,
    required final String title,
    required final bool isEnabled,
    final bool pushNotification,
    final bool emailNotification,
    final bool smsNotification,
    final Map<String, dynamic>? conditions,
  }) = _$AlertConfigImpl;

  factory _AlertConfig.fromJson(Map<String, dynamic> json) =
      _$AlertConfigImpl.fromJson;

  @override
  String get id;
  @override
  AlertType get type;
  @override
  String get title;
  @override
  bool get isEnabled;
  @override
  bool get pushNotification;
  @override
  bool get emailNotification;
  @override
  bool get smsNotification;
  @override
  Map<String, dynamic>? get conditions;

  /// Create a copy of AlertConfig
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AlertConfigImplCopyWith<_$AlertConfigImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
