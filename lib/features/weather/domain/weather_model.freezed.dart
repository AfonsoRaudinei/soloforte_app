// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'weather_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

WeatherForecast _$WeatherForecastFromJson(Map<String, dynamic> json) {
  return _WeatherForecast.fromJson(json);
}

/// @nodoc
mixin _$WeatherForecast {
  double get currentTemp => throw _privateConstructorUsedError;
  double get feelsLike => throw _privateConstructorUsedError;
  double get humidity => throw _privateConstructorUsedError;
  double get windSpeed => throw _privateConstructorUsedError;
  String get windDirection => throw _privateConstructorUsedError;
  double get precipitation => throw _privateConstructorUsedError;
  double get visibility => throw _privateConstructorUsedError;
  int get cloudCover => throw _privateConstructorUsedError;
  double get uvIndex => throw _privateConstructorUsedError;
  String get condition => throw _privateConstructorUsedError;
  List<DailyForecast> get daily => throw _privateConstructorUsedError;
  List<HourlyForecast> get hourly => throw _privateConstructorUsedError;
  List<WeatherAlert> get alerts => throw _privateConstructorUsedError;

  /// Serializes this WeatherForecast to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of WeatherForecast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $WeatherForecastCopyWith<WeatherForecast> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WeatherForecastCopyWith<$Res> {
  factory $WeatherForecastCopyWith(
    WeatherForecast value,
    $Res Function(WeatherForecast) then,
  ) = _$WeatherForecastCopyWithImpl<$Res, WeatherForecast>;
  @useResult
  $Res call({
    double currentTemp,
    double feelsLike,
    double humidity,
    double windSpeed,
    String windDirection,
    double precipitation,
    double visibility,
    int cloudCover,
    double uvIndex,
    String condition,
    List<DailyForecast> daily,
    List<HourlyForecast> hourly,
    List<WeatherAlert> alerts,
  });
}

/// @nodoc
class _$WeatherForecastCopyWithImpl<$Res, $Val extends WeatherForecast>
    implements $WeatherForecastCopyWith<$Res> {
  _$WeatherForecastCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of WeatherForecast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? currentTemp = null,
    Object? feelsLike = null,
    Object? humidity = null,
    Object? windSpeed = null,
    Object? windDirection = null,
    Object? precipitation = null,
    Object? visibility = null,
    Object? cloudCover = null,
    Object? uvIndex = null,
    Object? condition = null,
    Object? daily = null,
    Object? hourly = null,
    Object? alerts = null,
  }) {
    return _then(
      _value.copyWith(
            currentTemp: null == currentTemp
                ? _value.currentTemp
                : currentTemp // ignore: cast_nullable_to_non_nullable
                      as double,
            feelsLike: null == feelsLike
                ? _value.feelsLike
                : feelsLike // ignore: cast_nullable_to_non_nullable
                      as double,
            humidity: null == humidity
                ? _value.humidity
                : humidity // ignore: cast_nullable_to_non_nullable
                      as double,
            windSpeed: null == windSpeed
                ? _value.windSpeed
                : windSpeed // ignore: cast_nullable_to_non_nullable
                      as double,
            windDirection: null == windDirection
                ? _value.windDirection
                : windDirection // ignore: cast_nullable_to_non_nullable
                      as String,
            precipitation: null == precipitation
                ? _value.precipitation
                : precipitation // ignore: cast_nullable_to_non_nullable
                      as double,
            visibility: null == visibility
                ? _value.visibility
                : visibility // ignore: cast_nullable_to_non_nullable
                      as double,
            cloudCover: null == cloudCover
                ? _value.cloudCover
                : cloudCover // ignore: cast_nullable_to_non_nullable
                      as int,
            uvIndex: null == uvIndex
                ? _value.uvIndex
                : uvIndex // ignore: cast_nullable_to_non_nullable
                      as double,
            condition: null == condition
                ? _value.condition
                : condition // ignore: cast_nullable_to_non_nullable
                      as String,
            daily: null == daily
                ? _value.daily
                : daily // ignore: cast_nullable_to_non_nullable
                      as List<DailyForecast>,
            hourly: null == hourly
                ? _value.hourly
                : hourly // ignore: cast_nullable_to_non_nullable
                      as List<HourlyForecast>,
            alerts: null == alerts
                ? _value.alerts
                : alerts // ignore: cast_nullable_to_non_nullable
                      as List<WeatherAlert>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$WeatherForecastImplCopyWith<$Res>
    implements $WeatherForecastCopyWith<$Res> {
  factory _$$WeatherForecastImplCopyWith(
    _$WeatherForecastImpl value,
    $Res Function(_$WeatherForecastImpl) then,
  ) = __$$WeatherForecastImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    double currentTemp,
    double feelsLike,
    double humidity,
    double windSpeed,
    String windDirection,
    double precipitation,
    double visibility,
    int cloudCover,
    double uvIndex,
    String condition,
    List<DailyForecast> daily,
    List<HourlyForecast> hourly,
    List<WeatherAlert> alerts,
  });
}

/// @nodoc
class __$$WeatherForecastImplCopyWithImpl<$Res>
    extends _$WeatherForecastCopyWithImpl<$Res, _$WeatherForecastImpl>
    implements _$$WeatherForecastImplCopyWith<$Res> {
  __$$WeatherForecastImplCopyWithImpl(
    _$WeatherForecastImpl _value,
    $Res Function(_$WeatherForecastImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of WeatherForecast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? currentTemp = null,
    Object? feelsLike = null,
    Object? humidity = null,
    Object? windSpeed = null,
    Object? windDirection = null,
    Object? precipitation = null,
    Object? visibility = null,
    Object? cloudCover = null,
    Object? uvIndex = null,
    Object? condition = null,
    Object? daily = null,
    Object? hourly = null,
    Object? alerts = null,
  }) {
    return _then(
      _$WeatherForecastImpl(
        currentTemp: null == currentTemp
            ? _value.currentTemp
            : currentTemp // ignore: cast_nullable_to_non_nullable
                  as double,
        feelsLike: null == feelsLike
            ? _value.feelsLike
            : feelsLike // ignore: cast_nullable_to_non_nullable
                  as double,
        humidity: null == humidity
            ? _value.humidity
            : humidity // ignore: cast_nullable_to_non_nullable
                  as double,
        windSpeed: null == windSpeed
            ? _value.windSpeed
            : windSpeed // ignore: cast_nullable_to_non_nullable
                  as double,
        windDirection: null == windDirection
            ? _value.windDirection
            : windDirection // ignore: cast_nullable_to_non_nullable
                  as String,
        precipitation: null == precipitation
            ? _value.precipitation
            : precipitation // ignore: cast_nullable_to_non_nullable
                  as double,
        visibility: null == visibility
            ? _value.visibility
            : visibility // ignore: cast_nullable_to_non_nullable
                  as double,
        cloudCover: null == cloudCover
            ? _value.cloudCover
            : cloudCover // ignore: cast_nullable_to_non_nullable
                  as int,
        uvIndex: null == uvIndex
            ? _value.uvIndex
            : uvIndex // ignore: cast_nullable_to_non_nullable
                  as double,
        condition: null == condition
            ? _value.condition
            : condition // ignore: cast_nullable_to_non_nullable
                  as String,
        daily: null == daily
            ? _value._daily
            : daily // ignore: cast_nullable_to_non_nullable
                  as List<DailyForecast>,
        hourly: null == hourly
            ? _value._hourly
            : hourly // ignore: cast_nullable_to_non_nullable
                  as List<HourlyForecast>,
        alerts: null == alerts
            ? _value._alerts
            : alerts // ignore: cast_nullable_to_non_nullable
                  as List<WeatherAlert>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$WeatherForecastImpl implements _WeatherForecast {
  const _$WeatherForecastImpl({
    required this.currentTemp,
    required this.feelsLike,
    required this.humidity,
    required this.windSpeed,
    required this.windDirection,
    required this.precipitation,
    required this.visibility,
    required this.cloudCover,
    required this.uvIndex,
    required this.condition,
    required final List<DailyForecast> daily,
    required final List<HourlyForecast> hourly,
    final List<WeatherAlert> alerts = const [],
  }) : _daily = daily,
       _hourly = hourly,
       _alerts = alerts;

  factory _$WeatherForecastImpl.fromJson(Map<String, dynamic> json) =>
      _$$WeatherForecastImplFromJson(json);

  @override
  final double currentTemp;
  @override
  final double feelsLike;
  @override
  final double humidity;
  @override
  final double windSpeed;
  @override
  final String windDirection;
  @override
  final double precipitation;
  @override
  final double visibility;
  @override
  final int cloudCover;
  @override
  final double uvIndex;
  @override
  final String condition;
  final List<DailyForecast> _daily;
  @override
  List<DailyForecast> get daily {
    if (_daily is EqualUnmodifiableListView) return _daily;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_daily);
  }

  final List<HourlyForecast> _hourly;
  @override
  List<HourlyForecast> get hourly {
    if (_hourly is EqualUnmodifiableListView) return _hourly;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_hourly);
  }

  final List<WeatherAlert> _alerts;
  @override
  @JsonKey()
  List<WeatherAlert> get alerts {
    if (_alerts is EqualUnmodifiableListView) return _alerts;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_alerts);
  }

  @override
  String toString() {
    return 'WeatherForecast(currentTemp: $currentTemp, feelsLike: $feelsLike, humidity: $humidity, windSpeed: $windSpeed, windDirection: $windDirection, precipitation: $precipitation, visibility: $visibility, cloudCover: $cloudCover, uvIndex: $uvIndex, condition: $condition, daily: $daily, hourly: $hourly, alerts: $alerts)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$WeatherForecastImpl &&
            (identical(other.currentTemp, currentTemp) ||
                other.currentTemp == currentTemp) &&
            (identical(other.feelsLike, feelsLike) ||
                other.feelsLike == feelsLike) &&
            (identical(other.humidity, humidity) ||
                other.humidity == humidity) &&
            (identical(other.windSpeed, windSpeed) ||
                other.windSpeed == windSpeed) &&
            (identical(other.windDirection, windDirection) ||
                other.windDirection == windDirection) &&
            (identical(other.precipitation, precipitation) ||
                other.precipitation == precipitation) &&
            (identical(other.visibility, visibility) ||
                other.visibility == visibility) &&
            (identical(other.cloudCover, cloudCover) ||
                other.cloudCover == cloudCover) &&
            (identical(other.uvIndex, uvIndex) || other.uvIndex == uvIndex) &&
            (identical(other.condition, condition) ||
                other.condition == condition) &&
            const DeepCollectionEquality().equals(other._daily, _daily) &&
            const DeepCollectionEquality().equals(other._hourly, _hourly) &&
            const DeepCollectionEquality().equals(other._alerts, _alerts));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    currentTemp,
    feelsLike,
    humidity,
    windSpeed,
    windDirection,
    precipitation,
    visibility,
    cloudCover,
    uvIndex,
    condition,
    const DeepCollectionEquality().hash(_daily),
    const DeepCollectionEquality().hash(_hourly),
    const DeepCollectionEquality().hash(_alerts),
  );

  /// Create a copy of WeatherForecast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$WeatherForecastImplCopyWith<_$WeatherForecastImpl> get copyWith =>
      __$$WeatherForecastImplCopyWithImpl<_$WeatherForecastImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$WeatherForecastImplToJson(this);
  }
}

abstract class _WeatherForecast implements WeatherForecast {
  const factory _WeatherForecast({
    required final double currentTemp,
    required final double feelsLike,
    required final double humidity,
    required final double windSpeed,
    required final String windDirection,
    required final double precipitation,
    required final double visibility,
    required final int cloudCover,
    required final double uvIndex,
    required final String condition,
    required final List<DailyForecast> daily,
    required final List<HourlyForecast> hourly,
    final List<WeatherAlert> alerts,
  }) = _$WeatherForecastImpl;

  factory _WeatherForecast.fromJson(Map<String, dynamic> json) =
      _$WeatherForecastImpl.fromJson;

  @override
  double get currentTemp;
  @override
  double get feelsLike;
  @override
  double get humidity;
  @override
  double get windSpeed;
  @override
  String get windDirection;
  @override
  double get precipitation;
  @override
  double get visibility;
  @override
  int get cloudCover;
  @override
  double get uvIndex;
  @override
  String get condition;
  @override
  List<DailyForecast> get daily;
  @override
  List<HourlyForecast> get hourly;
  @override
  List<WeatherAlert> get alerts;

  /// Create a copy of WeatherForecast
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$WeatherForecastImplCopyWith<_$WeatherForecastImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

DailyForecast _$DailyForecastFromJson(Map<String, dynamic> json) {
  return _DailyForecast.fromJson(json);
}

/// @nodoc
mixin _$DailyForecast {
  DateTime get date => throw _privateConstructorUsedError;
  double get maxTemp => throw _privateConstructorUsedError;
  double get minTemp => throw _privateConstructorUsedError;
  String get condition => throw _privateConstructorUsedError;
  double get precipitation => throw _privateConstructorUsedError;
  double get windSpeed => throw _privateConstructorUsedError;
  int get rainProbability => throw _privateConstructorUsedError;

  /// Serializes this DailyForecast to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of DailyForecast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $DailyForecastCopyWith<DailyForecast> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DailyForecastCopyWith<$Res> {
  factory $DailyForecastCopyWith(
    DailyForecast value,
    $Res Function(DailyForecast) then,
  ) = _$DailyForecastCopyWithImpl<$Res, DailyForecast>;
  @useResult
  $Res call({
    DateTime date,
    double maxTemp,
    double minTemp,
    String condition,
    double precipitation,
    double windSpeed,
    int rainProbability,
  });
}

/// @nodoc
class _$DailyForecastCopyWithImpl<$Res, $Val extends DailyForecast>
    implements $DailyForecastCopyWith<$Res> {
  _$DailyForecastCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of DailyForecast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? date = null,
    Object? maxTemp = null,
    Object? minTemp = null,
    Object? condition = null,
    Object? precipitation = null,
    Object? windSpeed = null,
    Object? rainProbability = null,
  }) {
    return _then(
      _value.copyWith(
            date: null == date
                ? _value.date
                : date // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            maxTemp: null == maxTemp
                ? _value.maxTemp
                : maxTemp // ignore: cast_nullable_to_non_nullable
                      as double,
            minTemp: null == minTemp
                ? _value.minTemp
                : minTemp // ignore: cast_nullable_to_non_nullable
                      as double,
            condition: null == condition
                ? _value.condition
                : condition // ignore: cast_nullable_to_non_nullable
                      as String,
            precipitation: null == precipitation
                ? _value.precipitation
                : precipitation // ignore: cast_nullable_to_non_nullable
                      as double,
            windSpeed: null == windSpeed
                ? _value.windSpeed
                : windSpeed // ignore: cast_nullable_to_non_nullable
                      as double,
            rainProbability: null == rainProbability
                ? _value.rainProbability
                : rainProbability // ignore: cast_nullable_to_non_nullable
                      as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$DailyForecastImplCopyWith<$Res>
    implements $DailyForecastCopyWith<$Res> {
  factory _$$DailyForecastImplCopyWith(
    _$DailyForecastImpl value,
    $Res Function(_$DailyForecastImpl) then,
  ) = __$$DailyForecastImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    DateTime date,
    double maxTemp,
    double minTemp,
    String condition,
    double precipitation,
    double windSpeed,
    int rainProbability,
  });
}

/// @nodoc
class __$$DailyForecastImplCopyWithImpl<$Res>
    extends _$DailyForecastCopyWithImpl<$Res, _$DailyForecastImpl>
    implements _$$DailyForecastImplCopyWith<$Res> {
  __$$DailyForecastImplCopyWithImpl(
    _$DailyForecastImpl _value,
    $Res Function(_$DailyForecastImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of DailyForecast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? date = null,
    Object? maxTemp = null,
    Object? minTemp = null,
    Object? condition = null,
    Object? precipitation = null,
    Object? windSpeed = null,
    Object? rainProbability = null,
  }) {
    return _then(
      _$DailyForecastImpl(
        date: null == date
            ? _value.date
            : date // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        maxTemp: null == maxTemp
            ? _value.maxTemp
            : maxTemp // ignore: cast_nullable_to_non_nullable
                  as double,
        minTemp: null == minTemp
            ? _value.minTemp
            : minTemp // ignore: cast_nullable_to_non_nullable
                  as double,
        condition: null == condition
            ? _value.condition
            : condition // ignore: cast_nullable_to_non_nullable
                  as String,
        precipitation: null == precipitation
            ? _value.precipitation
            : precipitation // ignore: cast_nullable_to_non_nullable
                  as double,
        windSpeed: null == windSpeed
            ? _value.windSpeed
            : windSpeed // ignore: cast_nullable_to_non_nullable
                  as double,
        rainProbability: null == rainProbability
            ? _value.rainProbability
            : rainProbability // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$DailyForecastImpl implements _DailyForecast {
  const _$DailyForecastImpl({
    required this.date,
    required this.maxTemp,
    required this.minTemp,
    required this.condition,
    required this.precipitation,
    required this.windSpeed,
    required this.rainProbability,
  });

  factory _$DailyForecastImpl.fromJson(Map<String, dynamic> json) =>
      _$$DailyForecastImplFromJson(json);

  @override
  final DateTime date;
  @override
  final double maxTemp;
  @override
  final double minTemp;
  @override
  final String condition;
  @override
  final double precipitation;
  @override
  final double windSpeed;
  @override
  final int rainProbability;

  @override
  String toString() {
    return 'DailyForecast(date: $date, maxTemp: $maxTemp, minTemp: $minTemp, condition: $condition, precipitation: $precipitation, windSpeed: $windSpeed, rainProbability: $rainProbability)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$DailyForecastImpl &&
            (identical(other.date, date) || other.date == date) &&
            (identical(other.maxTemp, maxTemp) || other.maxTemp == maxTemp) &&
            (identical(other.minTemp, minTemp) || other.minTemp == minTemp) &&
            (identical(other.condition, condition) ||
                other.condition == condition) &&
            (identical(other.precipitation, precipitation) ||
                other.precipitation == precipitation) &&
            (identical(other.windSpeed, windSpeed) ||
                other.windSpeed == windSpeed) &&
            (identical(other.rainProbability, rainProbability) ||
                other.rainProbability == rainProbability));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    date,
    maxTemp,
    minTemp,
    condition,
    precipitation,
    windSpeed,
    rainProbability,
  );

  /// Create a copy of DailyForecast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$DailyForecastImplCopyWith<_$DailyForecastImpl> get copyWith =>
      __$$DailyForecastImplCopyWithImpl<_$DailyForecastImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$DailyForecastImplToJson(this);
  }
}

abstract class _DailyForecast implements DailyForecast {
  const factory _DailyForecast({
    required final DateTime date,
    required final double maxTemp,
    required final double minTemp,
    required final String condition,
    required final double precipitation,
    required final double windSpeed,
    required final int rainProbability,
  }) = _$DailyForecastImpl;

  factory _DailyForecast.fromJson(Map<String, dynamic> json) =
      _$DailyForecastImpl.fromJson;

  @override
  DateTime get date;
  @override
  double get maxTemp;
  @override
  double get minTemp;
  @override
  String get condition;
  @override
  double get precipitation;
  @override
  double get windSpeed;
  @override
  int get rainProbability;

  /// Create a copy of DailyForecast
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$DailyForecastImplCopyWith<_$DailyForecastImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

HourlyForecast _$HourlyForecastFromJson(Map<String, dynamic> json) {
  return _HourlyForecast.fromJson(json);
}

/// @nodoc
mixin _$HourlyForecast {
  DateTime get time => throw _privateConstructorUsedError;
  double get temp => throw _privateConstructorUsedError;
  String get condition => throw _privateConstructorUsedError;
  int get rainProbability => throw _privateConstructorUsedError;
  double get precipitation => throw _privateConstructorUsedError;

  /// Serializes this HourlyForecast to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of HourlyForecast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $HourlyForecastCopyWith<HourlyForecast> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $HourlyForecastCopyWith<$Res> {
  factory $HourlyForecastCopyWith(
    HourlyForecast value,
    $Res Function(HourlyForecast) then,
  ) = _$HourlyForecastCopyWithImpl<$Res, HourlyForecast>;
  @useResult
  $Res call({
    DateTime time,
    double temp,
    String condition,
    int rainProbability,
    double precipitation,
  });
}

/// @nodoc
class _$HourlyForecastCopyWithImpl<$Res, $Val extends HourlyForecast>
    implements $HourlyForecastCopyWith<$Res> {
  _$HourlyForecastCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of HourlyForecast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? time = null,
    Object? temp = null,
    Object? condition = null,
    Object? rainProbability = null,
    Object? precipitation = null,
  }) {
    return _then(
      _value.copyWith(
            time: null == time
                ? _value.time
                : time // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            temp: null == temp
                ? _value.temp
                : temp // ignore: cast_nullable_to_non_nullable
                      as double,
            condition: null == condition
                ? _value.condition
                : condition // ignore: cast_nullable_to_non_nullable
                      as String,
            rainProbability: null == rainProbability
                ? _value.rainProbability
                : rainProbability // ignore: cast_nullable_to_non_nullable
                      as int,
            precipitation: null == precipitation
                ? _value.precipitation
                : precipitation // ignore: cast_nullable_to_non_nullable
                      as double,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$HourlyForecastImplCopyWith<$Res>
    implements $HourlyForecastCopyWith<$Res> {
  factory _$$HourlyForecastImplCopyWith(
    _$HourlyForecastImpl value,
    $Res Function(_$HourlyForecastImpl) then,
  ) = __$$HourlyForecastImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    DateTime time,
    double temp,
    String condition,
    int rainProbability,
    double precipitation,
  });
}

/// @nodoc
class __$$HourlyForecastImplCopyWithImpl<$Res>
    extends _$HourlyForecastCopyWithImpl<$Res, _$HourlyForecastImpl>
    implements _$$HourlyForecastImplCopyWith<$Res> {
  __$$HourlyForecastImplCopyWithImpl(
    _$HourlyForecastImpl _value,
    $Res Function(_$HourlyForecastImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of HourlyForecast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? time = null,
    Object? temp = null,
    Object? condition = null,
    Object? rainProbability = null,
    Object? precipitation = null,
  }) {
    return _then(
      _$HourlyForecastImpl(
        time: null == time
            ? _value.time
            : time // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        temp: null == temp
            ? _value.temp
            : temp // ignore: cast_nullable_to_non_nullable
                  as double,
        condition: null == condition
            ? _value.condition
            : condition // ignore: cast_nullable_to_non_nullable
                  as String,
        rainProbability: null == rainProbability
            ? _value.rainProbability
            : rainProbability // ignore: cast_nullable_to_non_nullable
                  as int,
        precipitation: null == precipitation
            ? _value.precipitation
            : precipitation // ignore: cast_nullable_to_non_nullable
                  as double,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$HourlyForecastImpl implements _HourlyForecast {
  const _$HourlyForecastImpl({
    required this.time,
    required this.temp,
    required this.condition,
    required this.rainProbability,
    required this.precipitation,
  });

  factory _$HourlyForecastImpl.fromJson(Map<String, dynamic> json) =>
      _$$HourlyForecastImplFromJson(json);

  @override
  final DateTime time;
  @override
  final double temp;
  @override
  final String condition;
  @override
  final int rainProbability;
  @override
  final double precipitation;

  @override
  String toString() {
    return 'HourlyForecast(time: $time, temp: $temp, condition: $condition, rainProbability: $rainProbability, precipitation: $precipitation)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$HourlyForecastImpl &&
            (identical(other.time, time) || other.time == time) &&
            (identical(other.temp, temp) || other.temp == temp) &&
            (identical(other.condition, condition) ||
                other.condition == condition) &&
            (identical(other.rainProbability, rainProbability) ||
                other.rainProbability == rainProbability) &&
            (identical(other.precipitation, precipitation) ||
                other.precipitation == precipitation));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    time,
    temp,
    condition,
    rainProbability,
    precipitation,
  );

  /// Create a copy of HourlyForecast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$HourlyForecastImplCopyWith<_$HourlyForecastImpl> get copyWith =>
      __$$HourlyForecastImplCopyWithImpl<_$HourlyForecastImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$HourlyForecastImplToJson(this);
  }
}

abstract class _HourlyForecast implements HourlyForecast {
  const factory _HourlyForecast({
    required final DateTime time,
    required final double temp,
    required final String condition,
    required final int rainProbability,
    required final double precipitation,
  }) = _$HourlyForecastImpl;

  factory _HourlyForecast.fromJson(Map<String, dynamic> json) =
      _$HourlyForecastImpl.fromJson;

  @override
  DateTime get time;
  @override
  double get temp;
  @override
  String get condition;
  @override
  int get rainProbability;
  @override
  double get precipitation;

  /// Create a copy of HourlyForecast
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$HourlyForecastImplCopyWith<_$HourlyForecastImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

WeatherAlert _$WeatherAlertFromJson(Map<String, dynamic> json) {
  return _WeatherAlert.fromJson(json);
}

/// @nodoc
mixin _$WeatherAlert {
  String get title => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  String get severity =>
      throw _privateConstructorUsedError; // 'low', 'medium', 'high', 'extreme'
  DateTime get effective => throw _privateConstructorUsedError;
  DateTime get expires => throw _privateConstructorUsedError;
  String get type => throw _privateConstructorUsedError;

  /// Serializes this WeatherAlert to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of WeatherAlert
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $WeatherAlertCopyWith<WeatherAlert> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WeatherAlertCopyWith<$Res> {
  factory $WeatherAlertCopyWith(
    WeatherAlert value,
    $Res Function(WeatherAlert) then,
  ) = _$WeatherAlertCopyWithImpl<$Res, WeatherAlert>;
  @useResult
  $Res call({
    String title,
    String description,
    String severity,
    DateTime effective,
    DateTime expires,
    String type,
  });
}

/// @nodoc
class _$WeatherAlertCopyWithImpl<$Res, $Val extends WeatherAlert>
    implements $WeatherAlertCopyWith<$Res> {
  _$WeatherAlertCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of WeatherAlert
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? description = null,
    Object? severity = null,
    Object? effective = null,
    Object? expires = null,
    Object? type = null,
  }) {
    return _then(
      _value.copyWith(
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
            description: null == description
                ? _value.description
                : description // ignore: cast_nullable_to_non_nullable
                      as String,
            severity: null == severity
                ? _value.severity
                : severity // ignore: cast_nullable_to_non_nullable
                      as String,
            effective: null == effective
                ? _value.effective
                : effective // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            expires: null == expires
                ? _value.expires
                : expires // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$WeatherAlertImplCopyWith<$Res>
    implements $WeatherAlertCopyWith<$Res> {
  factory _$$WeatherAlertImplCopyWith(
    _$WeatherAlertImpl value,
    $Res Function(_$WeatherAlertImpl) then,
  ) = __$$WeatherAlertImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String title,
    String description,
    String severity,
    DateTime effective,
    DateTime expires,
    String type,
  });
}

/// @nodoc
class __$$WeatherAlertImplCopyWithImpl<$Res>
    extends _$WeatherAlertCopyWithImpl<$Res, _$WeatherAlertImpl>
    implements _$$WeatherAlertImplCopyWith<$Res> {
  __$$WeatherAlertImplCopyWithImpl(
    _$WeatherAlertImpl _value,
    $Res Function(_$WeatherAlertImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of WeatherAlert
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? description = null,
    Object? severity = null,
    Object? effective = null,
    Object? expires = null,
    Object? type = null,
  }) {
    return _then(
      _$WeatherAlertImpl(
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        description: null == description
            ? _value.description
            : description // ignore: cast_nullable_to_non_nullable
                  as String,
        severity: null == severity
            ? _value.severity
            : severity // ignore: cast_nullable_to_non_nullable
                  as String,
        effective: null == effective
            ? _value.effective
            : effective // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        expires: null == expires
            ? _value.expires
            : expires // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$WeatherAlertImpl implements _WeatherAlert {
  const _$WeatherAlertImpl({
    required this.title,
    required this.description,
    required this.severity,
    required this.effective,
    required this.expires,
    required this.type,
  });

  factory _$WeatherAlertImpl.fromJson(Map<String, dynamic> json) =>
      _$$WeatherAlertImplFromJson(json);

  @override
  final String title;
  @override
  final String description;
  @override
  final String severity;
  // 'low', 'medium', 'high', 'extreme'
  @override
  final DateTime effective;
  @override
  final DateTime expires;
  @override
  final String type;

  @override
  String toString() {
    return 'WeatherAlert(title: $title, description: $description, severity: $severity, effective: $effective, expires: $expires, type: $type)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$WeatherAlertImpl &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.severity, severity) ||
                other.severity == severity) &&
            (identical(other.effective, effective) ||
                other.effective == effective) &&
            (identical(other.expires, expires) || other.expires == expires) &&
            (identical(other.type, type) || other.type == type));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    title,
    description,
    severity,
    effective,
    expires,
    type,
  );

  /// Create a copy of WeatherAlert
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$WeatherAlertImplCopyWith<_$WeatherAlertImpl> get copyWith =>
      __$$WeatherAlertImplCopyWithImpl<_$WeatherAlertImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$WeatherAlertImplToJson(this);
  }
}

abstract class _WeatherAlert implements WeatherAlert {
  const factory _WeatherAlert({
    required final String title,
    required final String description,
    required final String severity,
    required final DateTime effective,
    required final DateTime expires,
    required final String type,
  }) = _$WeatherAlertImpl;

  factory _WeatherAlert.fromJson(Map<String, dynamic> json) =
      _$WeatherAlertImpl.fromJson;

  @override
  String get title;
  @override
  String get description;
  @override
  String get severity; // 'low', 'medium', 'high', 'extreme'
  @override
  DateTime get effective;
  @override
  DateTime get expires;
  @override
  String get type;

  /// Create a copy of WeatherAlert
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$WeatherAlertImplCopyWith<_$WeatherAlertImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
