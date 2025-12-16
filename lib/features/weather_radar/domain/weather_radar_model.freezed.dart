// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'weather_radar_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

WeatherRadar _$WeatherRadarFromJson(Map<String, dynamic> json) {
  return _WeatherRadar.fromJson(json);
}

/// @nodoc
mixin _$WeatherRadar {
  String get id => throw _privateConstructorUsedError;
  DateTime get timestamp => throw _privateConstructorUsedError;
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;
  int get zoom => throw _privateConstructorUsedError;
  String get radarType =>
      throw _privateConstructorUsedError; // precipitation, clouds, temperature
  String? get imageUrl => throw _privateConstructorUsedError;
  Map<String, dynamic>? get metadata => throw _privateConstructorUsedError;

  /// Serializes this WeatherRadar to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of WeatherRadar
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $WeatherRadarCopyWith<WeatherRadar> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WeatherRadarCopyWith<$Res> {
  factory $WeatherRadarCopyWith(
    WeatherRadar value,
    $Res Function(WeatherRadar) then,
  ) = _$WeatherRadarCopyWithImpl<$Res, WeatherRadar>;
  @useResult
  $Res call({
    String id,
    DateTime timestamp,
    double latitude,
    double longitude,
    int zoom,
    String radarType,
    String? imageUrl,
    Map<String, dynamic>? metadata,
  });
}

/// @nodoc
class _$WeatherRadarCopyWithImpl<$Res, $Val extends WeatherRadar>
    implements $WeatherRadarCopyWith<$Res> {
  _$WeatherRadarCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of WeatherRadar
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? timestamp = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? zoom = null,
    Object? radarType = null,
    Object? imageUrl = freezed,
    Object? metadata = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            timestamp: null == timestamp
                ? _value.timestamp
                : timestamp // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            latitude: null == latitude
                ? _value.latitude
                : latitude // ignore: cast_nullable_to_non_nullable
                      as double,
            longitude: null == longitude
                ? _value.longitude
                : longitude // ignore: cast_nullable_to_non_nullable
                      as double,
            zoom: null == zoom
                ? _value.zoom
                : zoom // ignore: cast_nullable_to_non_nullable
                      as int,
            radarType: null == radarType
                ? _value.radarType
                : radarType // ignore: cast_nullable_to_non_nullable
                      as String,
            imageUrl: freezed == imageUrl
                ? _value.imageUrl
                : imageUrl // ignore: cast_nullable_to_non_nullable
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
abstract class _$$WeatherRadarImplCopyWith<$Res>
    implements $WeatherRadarCopyWith<$Res> {
  factory _$$WeatherRadarImplCopyWith(
    _$WeatherRadarImpl value,
    $Res Function(_$WeatherRadarImpl) then,
  ) = __$$WeatherRadarImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    DateTime timestamp,
    double latitude,
    double longitude,
    int zoom,
    String radarType,
    String? imageUrl,
    Map<String, dynamic>? metadata,
  });
}

/// @nodoc
class __$$WeatherRadarImplCopyWithImpl<$Res>
    extends _$WeatherRadarCopyWithImpl<$Res, _$WeatherRadarImpl>
    implements _$$WeatherRadarImplCopyWith<$Res> {
  __$$WeatherRadarImplCopyWithImpl(
    _$WeatherRadarImpl _value,
    $Res Function(_$WeatherRadarImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of WeatherRadar
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? timestamp = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? zoom = null,
    Object? radarType = null,
    Object? imageUrl = freezed,
    Object? metadata = freezed,
  }) {
    return _then(
      _$WeatherRadarImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        timestamp: null == timestamp
            ? _value.timestamp
            : timestamp // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        latitude: null == latitude
            ? _value.latitude
            : latitude // ignore: cast_nullable_to_non_nullable
                  as double,
        longitude: null == longitude
            ? _value.longitude
            : longitude // ignore: cast_nullable_to_non_nullable
                  as double,
        zoom: null == zoom
            ? _value.zoom
            : zoom // ignore: cast_nullable_to_non_nullable
                  as int,
        radarType: null == radarType
            ? _value.radarType
            : radarType // ignore: cast_nullable_to_non_nullable
                  as String,
        imageUrl: freezed == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
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
class _$WeatherRadarImpl implements _WeatherRadar {
  const _$WeatherRadarImpl({
    required this.id,
    required this.timestamp,
    required this.latitude,
    required this.longitude,
    required this.zoom,
    required this.radarType,
    this.imageUrl,
    final Map<String, dynamic>? metadata,
  }) : _metadata = metadata;

  factory _$WeatherRadarImpl.fromJson(Map<String, dynamic> json) =>
      _$$WeatherRadarImplFromJson(json);

  @override
  final String id;
  @override
  final DateTime timestamp;
  @override
  final double latitude;
  @override
  final double longitude;
  @override
  final int zoom;
  @override
  final String radarType;
  // precipitation, clouds, temperature
  @override
  final String? imageUrl;
  final Map<String, dynamic>? _metadata;
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
    return 'WeatherRadar(id: $id, timestamp: $timestamp, latitude: $latitude, longitude: $longitude, zoom: $zoom, radarType: $radarType, imageUrl: $imageUrl, metadata: $metadata)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$WeatherRadarImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.zoom, zoom) || other.zoom == zoom) &&
            (identical(other.radarType, radarType) ||
                other.radarType == radarType) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
            const DeepCollectionEquality().equals(other._metadata, _metadata));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    timestamp,
    latitude,
    longitude,
    zoom,
    radarType,
    imageUrl,
    const DeepCollectionEquality().hash(_metadata),
  );

  /// Create a copy of WeatherRadar
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$WeatherRadarImplCopyWith<_$WeatherRadarImpl> get copyWith =>
      __$$WeatherRadarImplCopyWithImpl<_$WeatherRadarImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$WeatherRadarImplToJson(this);
  }
}

abstract class _WeatherRadar implements WeatherRadar {
  const factory _WeatherRadar({
    required final String id,
    required final DateTime timestamp,
    required final double latitude,
    required final double longitude,
    required final int zoom,
    required final String radarType,
    final String? imageUrl,
    final Map<String, dynamic>? metadata,
  }) = _$WeatherRadarImpl;

  factory _WeatherRadar.fromJson(Map<String, dynamic> json) =
      _$WeatherRadarImpl.fromJson;

  @override
  String get id;
  @override
  DateTime get timestamp;
  @override
  double get latitude;
  @override
  double get longitude;
  @override
  int get zoom;
  @override
  String get radarType; // precipitation, clouds, temperature
  @override
  String? get imageUrl;
  @override
  Map<String, dynamic>? get metadata;

  /// Create a copy of WeatherRadar
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$WeatherRadarImplCopyWith<_$WeatherRadarImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
