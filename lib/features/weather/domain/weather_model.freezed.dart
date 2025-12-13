// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'weather_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$WeatherForecast {

 double get currentTemp; double get humidity; double get windSpeed; String get condition; List<DailyForecast> get daily;
/// Create a copy of WeatherForecast
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$WeatherForecastCopyWith<WeatherForecast> get copyWith => _$WeatherForecastCopyWithImpl<WeatherForecast>(this as WeatherForecast, _$identity);

  /// Serializes this WeatherForecast to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is WeatherForecast&&(identical(other.currentTemp, currentTemp) || other.currentTemp == currentTemp)&&(identical(other.humidity, humidity) || other.humidity == humidity)&&(identical(other.windSpeed, windSpeed) || other.windSpeed == windSpeed)&&(identical(other.condition, condition) || other.condition == condition)&&const DeepCollectionEquality().equals(other.daily, daily));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,currentTemp,humidity,windSpeed,condition,const DeepCollectionEquality().hash(daily));

@override
String toString() {
  return 'WeatherForecast(currentTemp: $currentTemp, humidity: $humidity, windSpeed: $windSpeed, condition: $condition, daily: $daily)';
}


}

/// @nodoc
abstract mixin class $WeatherForecastCopyWith<$Res>  {
  factory $WeatherForecastCopyWith(WeatherForecast value, $Res Function(WeatherForecast) _then) = _$WeatherForecastCopyWithImpl;
@useResult
$Res call({
 double currentTemp, double humidity, double windSpeed, String condition, List<DailyForecast> daily
});




}
/// @nodoc
class _$WeatherForecastCopyWithImpl<$Res>
    implements $WeatherForecastCopyWith<$Res> {
  _$WeatherForecastCopyWithImpl(this._self, this._then);

  final WeatherForecast _self;
  final $Res Function(WeatherForecast) _then;

/// Create a copy of WeatherForecast
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? currentTemp = null,Object? humidity = null,Object? windSpeed = null,Object? condition = null,Object? daily = null,}) {
  return _then(_self.copyWith(
currentTemp: null == currentTemp ? _self.currentTemp : currentTemp // ignore: cast_nullable_to_non_nullable
as double,humidity: null == humidity ? _self.humidity : humidity // ignore: cast_nullable_to_non_nullable
as double,windSpeed: null == windSpeed ? _self.windSpeed : windSpeed // ignore: cast_nullable_to_non_nullable
as double,condition: null == condition ? _self.condition : condition // ignore: cast_nullable_to_non_nullable
as String,daily: null == daily ? _self.daily : daily // ignore: cast_nullable_to_non_nullable
as List<DailyForecast>,
  ));
}

}


/// Adds pattern-matching-related methods to [WeatherForecast].
extension WeatherForecastPatterns on WeatherForecast {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _WeatherForecast value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _WeatherForecast() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _WeatherForecast value)  $default,){
final _that = this;
switch (_that) {
case _WeatherForecast():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _WeatherForecast value)?  $default,){
final _that = this;
switch (_that) {
case _WeatherForecast() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double currentTemp,  double humidity,  double windSpeed,  String condition,  List<DailyForecast> daily)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _WeatherForecast() when $default != null:
return $default(_that.currentTemp,_that.humidity,_that.windSpeed,_that.condition,_that.daily);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double currentTemp,  double humidity,  double windSpeed,  String condition,  List<DailyForecast> daily)  $default,) {final _that = this;
switch (_that) {
case _WeatherForecast():
return $default(_that.currentTemp,_that.humidity,_that.windSpeed,_that.condition,_that.daily);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double currentTemp,  double humidity,  double windSpeed,  String condition,  List<DailyForecast> daily)?  $default,) {final _that = this;
switch (_that) {
case _WeatherForecast() when $default != null:
return $default(_that.currentTemp,_that.humidity,_that.windSpeed,_that.condition,_that.daily);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _WeatherForecast implements WeatherForecast {
  const _WeatherForecast({required this.currentTemp, required this.humidity, required this.windSpeed, required this.condition, required final  List<DailyForecast> daily}): _daily = daily;
  factory _WeatherForecast.fromJson(Map<String, dynamic> json) => _$WeatherForecastFromJson(json);

@override final  double currentTemp;
@override final  double humidity;
@override final  double windSpeed;
@override final  String condition;
 final  List<DailyForecast> _daily;
@override List<DailyForecast> get daily {
  if (_daily is EqualUnmodifiableListView) return _daily;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_daily);
}


/// Create a copy of WeatherForecast
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$WeatherForecastCopyWith<_WeatherForecast> get copyWith => __$WeatherForecastCopyWithImpl<_WeatherForecast>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$WeatherForecastToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _WeatherForecast&&(identical(other.currentTemp, currentTemp) || other.currentTemp == currentTemp)&&(identical(other.humidity, humidity) || other.humidity == humidity)&&(identical(other.windSpeed, windSpeed) || other.windSpeed == windSpeed)&&(identical(other.condition, condition) || other.condition == condition)&&const DeepCollectionEquality().equals(other._daily, _daily));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,currentTemp,humidity,windSpeed,condition,const DeepCollectionEquality().hash(_daily));

@override
String toString() {
  return 'WeatherForecast(currentTemp: $currentTemp, humidity: $humidity, windSpeed: $windSpeed, condition: $condition, daily: $daily)';
}


}

/// @nodoc
abstract mixin class _$WeatherForecastCopyWith<$Res> implements $WeatherForecastCopyWith<$Res> {
  factory _$WeatherForecastCopyWith(_WeatherForecast value, $Res Function(_WeatherForecast) _then) = __$WeatherForecastCopyWithImpl;
@override @useResult
$Res call({
 double currentTemp, double humidity, double windSpeed, String condition, List<DailyForecast> daily
});




}
/// @nodoc
class __$WeatherForecastCopyWithImpl<$Res>
    implements _$WeatherForecastCopyWith<$Res> {
  __$WeatherForecastCopyWithImpl(this._self, this._then);

  final _WeatherForecast _self;
  final $Res Function(_WeatherForecast) _then;

/// Create a copy of WeatherForecast
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? currentTemp = null,Object? humidity = null,Object? windSpeed = null,Object? condition = null,Object? daily = null,}) {
  return _then(_WeatherForecast(
currentTemp: null == currentTemp ? _self.currentTemp : currentTemp // ignore: cast_nullable_to_non_nullable
as double,humidity: null == humidity ? _self.humidity : humidity // ignore: cast_nullable_to_non_nullable
as double,windSpeed: null == windSpeed ? _self.windSpeed : windSpeed // ignore: cast_nullable_to_non_nullable
as double,condition: null == condition ? _self.condition : condition // ignore: cast_nullable_to_non_nullable
as String,daily: null == daily ? _self._daily : daily // ignore: cast_nullable_to_non_nullable
as List<DailyForecast>,
  ));
}


}


/// @nodoc
mixin _$DailyForecast {

 DateTime get date; double get maxTemp; double get minTemp; String get condition; int get rainProbability;
/// Create a copy of DailyForecast
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$DailyForecastCopyWith<DailyForecast> get copyWith => _$DailyForecastCopyWithImpl<DailyForecast>(this as DailyForecast, _$identity);

  /// Serializes this DailyForecast to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is DailyForecast&&(identical(other.date, date) || other.date == date)&&(identical(other.maxTemp, maxTemp) || other.maxTemp == maxTemp)&&(identical(other.minTemp, minTemp) || other.minTemp == minTemp)&&(identical(other.condition, condition) || other.condition == condition)&&(identical(other.rainProbability, rainProbability) || other.rainProbability == rainProbability));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,date,maxTemp,minTemp,condition,rainProbability);

@override
String toString() {
  return 'DailyForecast(date: $date, maxTemp: $maxTemp, minTemp: $minTemp, condition: $condition, rainProbability: $rainProbability)';
}


}

/// @nodoc
abstract mixin class $DailyForecastCopyWith<$Res>  {
  factory $DailyForecastCopyWith(DailyForecast value, $Res Function(DailyForecast) _then) = _$DailyForecastCopyWithImpl;
@useResult
$Res call({
 DateTime date, double maxTemp, double minTemp, String condition, int rainProbability
});




}
/// @nodoc
class _$DailyForecastCopyWithImpl<$Res>
    implements $DailyForecastCopyWith<$Res> {
  _$DailyForecastCopyWithImpl(this._self, this._then);

  final DailyForecast _self;
  final $Res Function(DailyForecast) _then;

/// Create a copy of DailyForecast
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? date = null,Object? maxTemp = null,Object? minTemp = null,Object? condition = null,Object? rainProbability = null,}) {
  return _then(_self.copyWith(
date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,maxTemp: null == maxTemp ? _self.maxTemp : maxTemp // ignore: cast_nullable_to_non_nullable
as double,minTemp: null == minTemp ? _self.minTemp : minTemp // ignore: cast_nullable_to_non_nullable
as double,condition: null == condition ? _self.condition : condition // ignore: cast_nullable_to_non_nullable
as String,rainProbability: null == rainProbability ? _self.rainProbability : rainProbability // ignore: cast_nullable_to_non_nullable
as int,
  ));
}

}


/// Adds pattern-matching-related methods to [DailyForecast].
extension DailyForecastPatterns on DailyForecast {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _DailyForecast value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _DailyForecast() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _DailyForecast value)  $default,){
final _that = this;
switch (_that) {
case _DailyForecast():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _DailyForecast value)?  $default,){
final _that = this;
switch (_that) {
case _DailyForecast() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( DateTime date,  double maxTemp,  double minTemp,  String condition,  int rainProbability)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _DailyForecast() when $default != null:
return $default(_that.date,_that.maxTemp,_that.minTemp,_that.condition,_that.rainProbability);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( DateTime date,  double maxTemp,  double minTemp,  String condition,  int rainProbability)  $default,) {final _that = this;
switch (_that) {
case _DailyForecast():
return $default(_that.date,_that.maxTemp,_that.minTemp,_that.condition,_that.rainProbability);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( DateTime date,  double maxTemp,  double minTemp,  String condition,  int rainProbability)?  $default,) {final _that = this;
switch (_that) {
case _DailyForecast() when $default != null:
return $default(_that.date,_that.maxTemp,_that.minTemp,_that.condition,_that.rainProbability);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _DailyForecast implements DailyForecast {
  const _DailyForecast({required this.date, required this.maxTemp, required this.minTemp, required this.condition, required this.rainProbability});
  factory _DailyForecast.fromJson(Map<String, dynamic> json) => _$DailyForecastFromJson(json);

@override final  DateTime date;
@override final  double maxTemp;
@override final  double minTemp;
@override final  String condition;
@override final  int rainProbability;

/// Create a copy of DailyForecast
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$DailyForecastCopyWith<_DailyForecast> get copyWith => __$DailyForecastCopyWithImpl<_DailyForecast>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$DailyForecastToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _DailyForecast&&(identical(other.date, date) || other.date == date)&&(identical(other.maxTemp, maxTemp) || other.maxTemp == maxTemp)&&(identical(other.minTemp, minTemp) || other.minTemp == minTemp)&&(identical(other.condition, condition) || other.condition == condition)&&(identical(other.rainProbability, rainProbability) || other.rainProbability == rainProbability));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,date,maxTemp,minTemp,condition,rainProbability);

@override
String toString() {
  return 'DailyForecast(date: $date, maxTemp: $maxTemp, minTemp: $minTemp, condition: $condition, rainProbability: $rainProbability)';
}


}

/// @nodoc
abstract mixin class _$DailyForecastCopyWith<$Res> implements $DailyForecastCopyWith<$Res> {
  factory _$DailyForecastCopyWith(_DailyForecast value, $Res Function(_DailyForecast) _then) = __$DailyForecastCopyWithImpl;
@override @useResult
$Res call({
 DateTime date, double maxTemp, double minTemp, String condition, int rainProbability
});




}
/// @nodoc
class __$DailyForecastCopyWithImpl<$Res>
    implements _$DailyForecastCopyWith<$Res> {
  __$DailyForecastCopyWithImpl(this._self, this._then);

  final _DailyForecast _self;
  final $Res Function(_DailyForecast) _then;

/// Create a copy of DailyForecast
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? date = null,Object? maxTemp = null,Object? minTemp = null,Object? condition = null,Object? rainProbability = null,}) {
  return _then(_DailyForecast(
date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,maxTemp: null == maxTemp ? _self.maxTemp : maxTemp // ignore: cast_nullable_to_non_nullable
as double,minTemp: null == minTemp ? _self.minTemp : minTemp // ignore: cast_nullable_to_non_nullable
as double,condition: null == condition ? _self.condition : condition // ignore: cast_nullable_to_non_nullable
as String,rainProbability: null == rainProbability ? _self.rainProbability : rainProbability // ignore: cast_nullable_to_non_nullable
as int,
  ));
}


}

// dart format on
