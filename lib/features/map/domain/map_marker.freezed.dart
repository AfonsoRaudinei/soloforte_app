// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'map_marker.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

MapPoint _$MapPointFromJson(Map<String, dynamic> json) {
  return _MapPoint.fromJson(json);
}

/// @nodoc
mixin _$MapPoint {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;
  String get type =>
      throw _privateConstructorUsedError; // 'pest', 'disease', 'observation'
  DateTime? get timestamp => throw _privateConstructorUsedError;

  /// Serializes this MapPoint to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of MapPoint
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $MapPointCopyWith<MapPoint> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MapPointCopyWith<$Res> {
  factory $MapPointCopyWith(MapPoint value, $Res Function(MapPoint) then) =
      _$MapPointCopyWithImpl<$Res, MapPoint>;
  @useResult
  $Res call({
    String id,
    String title,
    String description,
    double latitude,
    double longitude,
    String type,
    DateTime? timestamp,
  });
}

/// @nodoc
class _$MapPointCopyWithImpl<$Res, $Val extends MapPoint>
    implements $MapPointCopyWith<$Res> {
  _$MapPointCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of MapPoint
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? description = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? type = null,
    Object? timestamp = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
            description: null == description
                ? _value.description
                : description // ignore: cast_nullable_to_non_nullable
                      as String,
            latitude: null == latitude
                ? _value.latitude
                : latitude // ignore: cast_nullable_to_non_nullable
                      as double,
            longitude: null == longitude
                ? _value.longitude
                : longitude // ignore: cast_nullable_to_non_nullable
                      as double,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as String,
            timestamp: freezed == timestamp
                ? _value.timestamp
                : timestamp // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$MapPointImplCopyWith<$Res>
    implements $MapPointCopyWith<$Res> {
  factory _$$MapPointImplCopyWith(
    _$MapPointImpl value,
    $Res Function(_$MapPointImpl) then,
  ) = __$$MapPointImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String title,
    String description,
    double latitude,
    double longitude,
    String type,
    DateTime? timestamp,
  });
}

/// @nodoc
class __$$MapPointImplCopyWithImpl<$Res>
    extends _$MapPointCopyWithImpl<$Res, _$MapPointImpl>
    implements _$$MapPointImplCopyWith<$Res> {
  __$$MapPointImplCopyWithImpl(
    _$MapPointImpl _value,
    $Res Function(_$MapPointImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of MapPoint
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? description = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? type = null,
    Object? timestamp = freezed,
  }) {
    return _then(
      _$MapPointImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        description: null == description
            ? _value.description
            : description // ignore: cast_nullable_to_non_nullable
                  as String,
        latitude: null == latitude
            ? _value.latitude
            : latitude // ignore: cast_nullable_to_non_nullable
                  as double,
        longitude: null == longitude
            ? _value.longitude
            : longitude // ignore: cast_nullable_to_non_nullable
                  as double,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as String,
        timestamp: freezed == timestamp
            ? _value.timestamp
            : timestamp // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$MapPointImpl implements _MapPoint {
  const _$MapPointImpl({
    required this.id,
    required this.title,
    required this.description,
    required this.latitude,
    required this.longitude,
    required this.type,
    this.timestamp,
  });

  factory _$MapPointImpl.fromJson(Map<String, dynamic> json) =>
      _$$MapPointImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  @override
  final String description;
  @override
  final double latitude;
  @override
  final double longitude;
  @override
  final String type;
  // 'pest', 'disease', 'observation'
  @override
  final DateTime? timestamp;

  @override
  String toString() {
    return 'MapPoint(id: $id, title: $title, description: $description, latitude: $latitude, longitude: $longitude, type: $type, timestamp: $timestamp)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$MapPointImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    title,
    description,
    latitude,
    longitude,
    type,
    timestamp,
  );

  /// Create a copy of MapPoint
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$MapPointImplCopyWith<_$MapPointImpl> get copyWith =>
      __$$MapPointImplCopyWithImpl<_$MapPointImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$MapPointImplToJson(this);
  }
}

abstract class _MapPoint implements MapPoint {
  const factory _MapPoint({
    required final String id,
    required final String title,
    required final String description,
    required final double latitude,
    required final double longitude,
    required final String type,
    final DateTime? timestamp,
  }) = _$MapPointImpl;

  factory _MapPoint.fromJson(Map<String, dynamic> json) =
      _$MapPointImpl.fromJson;

  @override
  String get id;
  @override
  String get title;
  @override
  String get description;
  @override
  double get latitude;
  @override
  double get longitude;
  @override
  String get type; // 'pest', 'disease', 'observation'
  @override
  DateTime? get timestamp;

  /// Create a copy of MapPoint
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$MapPointImplCopyWith<_$MapPointImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
