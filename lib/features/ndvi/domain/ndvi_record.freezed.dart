// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'ndvi_record.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

NDVIRecord _$NDVIRecordFromJson(Map<String, dynamic> json) {
  return _NDVIRecord.fromJson(json);
}

/// @nodoc
mixin _$NDVIRecord {
  String get id => throw _privateConstructorUsedError;
  DateTime get date => throw _privateConstructorUsedError;
  String get imageUrl => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  double get averageValue => throw _privateConstructorUsedError;

  /// Serializes this NDVIRecord to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of NDVIRecord
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NDVIRecordCopyWith<NDVIRecord> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NDVIRecordCopyWith<$Res> {
  factory $NDVIRecordCopyWith(
    NDVIRecord value,
    $Res Function(NDVIRecord) then,
  ) = _$NDVIRecordCopyWithImpl<$Res, NDVIRecord>;
  @useResult
  $Res call({
    String id,
    DateTime date,
    String imageUrl,
    String description,
    double averageValue,
  });
}

/// @nodoc
class _$NDVIRecordCopyWithImpl<$Res, $Val extends NDVIRecord>
    implements $NDVIRecordCopyWith<$Res> {
  _$NDVIRecordCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of NDVIRecord
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? date = null,
    Object? imageUrl = null,
    Object? description = null,
    Object? averageValue = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            date: null == date
                ? _value.date
                : date // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            imageUrl: null == imageUrl
                ? _value.imageUrl
                : imageUrl // ignore: cast_nullable_to_non_nullable
                      as String,
            description: null == description
                ? _value.description
                : description // ignore: cast_nullable_to_non_nullable
                      as String,
            averageValue: null == averageValue
                ? _value.averageValue
                : averageValue // ignore: cast_nullable_to_non_nullable
                      as double,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$NDVIRecordImplCopyWith<$Res>
    implements $NDVIRecordCopyWith<$Res> {
  factory _$$NDVIRecordImplCopyWith(
    _$NDVIRecordImpl value,
    $Res Function(_$NDVIRecordImpl) then,
  ) = __$$NDVIRecordImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    DateTime date,
    String imageUrl,
    String description,
    double averageValue,
  });
}

/// @nodoc
class __$$NDVIRecordImplCopyWithImpl<$Res>
    extends _$NDVIRecordCopyWithImpl<$Res, _$NDVIRecordImpl>
    implements _$$NDVIRecordImplCopyWith<$Res> {
  __$$NDVIRecordImplCopyWithImpl(
    _$NDVIRecordImpl _value,
    $Res Function(_$NDVIRecordImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of NDVIRecord
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? date = null,
    Object? imageUrl = null,
    Object? description = null,
    Object? averageValue = null,
  }) {
    return _then(
      _$NDVIRecordImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        date: null == date
            ? _value.date
            : date // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        imageUrl: null == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
                  as String,
        description: null == description
            ? _value.description
            : description // ignore: cast_nullable_to_non_nullable
                  as String,
        averageValue: null == averageValue
            ? _value.averageValue
            : averageValue // ignore: cast_nullable_to_non_nullable
                  as double,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$NDVIRecordImpl implements _NDVIRecord {
  const _$NDVIRecordImpl({
    required this.id,
    required this.date,
    required this.imageUrl,
    required this.description,
    required this.averageValue,
  });

  factory _$NDVIRecordImpl.fromJson(Map<String, dynamic> json) =>
      _$$NDVIRecordImplFromJson(json);

  @override
  final String id;
  @override
  final DateTime date;
  @override
  final String imageUrl;
  @override
  final String description;
  @override
  final double averageValue;

  @override
  String toString() {
    return 'NDVIRecord(id: $id, date: $date, imageUrl: $imageUrl, description: $description, averageValue: $averageValue)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NDVIRecordImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.date, date) || other.date == date) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.averageValue, averageValue) ||
                other.averageValue == averageValue));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, id, date, imageUrl, description, averageValue);

  /// Create a copy of NDVIRecord
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NDVIRecordImplCopyWith<_$NDVIRecordImpl> get copyWith =>
      __$$NDVIRecordImplCopyWithImpl<_$NDVIRecordImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$NDVIRecordImplToJson(this);
  }
}

abstract class _NDVIRecord implements NDVIRecord {
  const factory _NDVIRecord({
    required final String id,
    required final DateTime date,
    required final String imageUrl,
    required final String description,
    required final double averageValue,
  }) = _$NDVIRecordImpl;

  factory _NDVIRecord.fromJson(Map<String, dynamic> json) =
      _$NDVIRecordImpl.fromJson;

  @override
  String get id;
  @override
  DateTime get date;
  @override
  String get imageUrl;
  @override
  String get description;
  @override
  double get averageValue;

  /// Create a copy of NDVIRecord
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NDVIRecordImplCopyWith<_$NDVIRecordImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
