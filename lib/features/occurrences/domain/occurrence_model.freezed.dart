// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'occurrence_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Occurrence {

 String get id; String get title; String get description; String get type;// 'pest', 'disease', 'deficiency', 'weed', 'other'
 double get severity;// 0.0 to 1.0
 String get areaName; DateTime get date; String get status;// 'active', 'monitoring', 'resolved'
 String get imageUrl; double get latitude; double get longitude;
/// Create a copy of Occurrence
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$OccurrenceCopyWith<Occurrence> get copyWith => _$OccurrenceCopyWithImpl<Occurrence>(this as Occurrence, _$identity);

  /// Serializes this Occurrence to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Occurrence&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.description, description) || other.description == description)&&(identical(other.type, type) || other.type == type)&&(identical(other.severity, severity) || other.severity == severity)&&(identical(other.areaName, areaName) || other.areaName == areaName)&&(identical(other.date, date) || other.date == date)&&(identical(other.status, status) || other.status == status)&&(identical(other.imageUrl, imageUrl) || other.imageUrl == imageUrl)&&(identical(other.latitude, latitude) || other.latitude == latitude)&&(identical(other.longitude, longitude) || other.longitude == longitude));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,description,type,severity,areaName,date,status,imageUrl,latitude,longitude);

@override
String toString() {
  return 'Occurrence(id: $id, title: $title, description: $description, type: $type, severity: $severity, areaName: $areaName, date: $date, status: $status, imageUrl: $imageUrl, latitude: $latitude, longitude: $longitude)';
}


}

/// @nodoc
abstract mixin class $OccurrenceCopyWith<$Res>  {
  factory $OccurrenceCopyWith(Occurrence value, $Res Function(Occurrence) _then) = _$OccurrenceCopyWithImpl;
@useResult
$Res call({
 String id, String title, String description, String type, double severity, String areaName, DateTime date, String status, String imageUrl, double latitude, double longitude
});




}
/// @nodoc
class _$OccurrenceCopyWithImpl<$Res>
    implements $OccurrenceCopyWith<$Res> {
  _$OccurrenceCopyWithImpl(this._self, this._then);

  final Occurrence _self;
  final $Res Function(Occurrence) _then;

/// Create a copy of Occurrence
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? title = null,Object? description = null,Object? type = null,Object? severity = null,Object? areaName = null,Object? date = null,Object? status = null,Object? imageUrl = null,Object? latitude = null,Object? longitude = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,severity: null == severity ? _self.severity : severity // ignore: cast_nullable_to_non_nullable
as double,areaName: null == areaName ? _self.areaName : areaName // ignore: cast_nullable_to_non_nullable
as String,date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,imageUrl: null == imageUrl ? _self.imageUrl : imageUrl // ignore: cast_nullable_to_non_nullable
as String,latitude: null == latitude ? _self.latitude : latitude // ignore: cast_nullable_to_non_nullable
as double,longitude: null == longitude ? _self.longitude : longitude // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [Occurrence].
extension OccurrencePatterns on Occurrence {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Occurrence value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Occurrence() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Occurrence value)  $default,){
final _that = this;
switch (_that) {
case _Occurrence():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Occurrence value)?  $default,){
final _that = this;
switch (_that) {
case _Occurrence() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String title,  String description,  String type,  double severity,  String areaName,  DateTime date,  String status,  String imageUrl,  double latitude,  double longitude)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Occurrence() when $default != null:
return $default(_that.id,_that.title,_that.description,_that.type,_that.severity,_that.areaName,_that.date,_that.status,_that.imageUrl,_that.latitude,_that.longitude);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String title,  String description,  String type,  double severity,  String areaName,  DateTime date,  String status,  String imageUrl,  double latitude,  double longitude)  $default,) {final _that = this;
switch (_that) {
case _Occurrence():
return $default(_that.id,_that.title,_that.description,_that.type,_that.severity,_that.areaName,_that.date,_that.status,_that.imageUrl,_that.latitude,_that.longitude);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String title,  String description,  String type,  double severity,  String areaName,  DateTime date,  String status,  String imageUrl,  double latitude,  double longitude)?  $default,) {final _that = this;
switch (_that) {
case _Occurrence() when $default != null:
return $default(_that.id,_that.title,_that.description,_that.type,_that.severity,_that.areaName,_that.date,_that.status,_that.imageUrl,_that.latitude,_that.longitude);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Occurrence implements Occurrence {
  const _Occurrence({required this.id, required this.title, required this.description, required this.type, required this.severity, required this.areaName, required this.date, required this.status, required this.imageUrl, required this.latitude, required this.longitude});
  factory _Occurrence.fromJson(Map<String, dynamic> json) => _$OccurrenceFromJson(json);

@override final  String id;
@override final  String title;
@override final  String description;
@override final  String type;
// 'pest', 'disease', 'deficiency', 'weed', 'other'
@override final  double severity;
// 0.0 to 1.0
@override final  String areaName;
@override final  DateTime date;
@override final  String status;
// 'active', 'monitoring', 'resolved'
@override final  String imageUrl;
@override final  double latitude;
@override final  double longitude;

/// Create a copy of Occurrence
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$OccurrenceCopyWith<_Occurrence> get copyWith => __$OccurrenceCopyWithImpl<_Occurrence>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$OccurrenceToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Occurrence&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.description, description) || other.description == description)&&(identical(other.type, type) || other.type == type)&&(identical(other.severity, severity) || other.severity == severity)&&(identical(other.areaName, areaName) || other.areaName == areaName)&&(identical(other.date, date) || other.date == date)&&(identical(other.status, status) || other.status == status)&&(identical(other.imageUrl, imageUrl) || other.imageUrl == imageUrl)&&(identical(other.latitude, latitude) || other.latitude == latitude)&&(identical(other.longitude, longitude) || other.longitude == longitude));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,title,description,type,severity,areaName,date,status,imageUrl,latitude,longitude);

@override
String toString() {
  return 'Occurrence(id: $id, title: $title, description: $description, type: $type, severity: $severity, areaName: $areaName, date: $date, status: $status, imageUrl: $imageUrl, latitude: $latitude, longitude: $longitude)';
}


}

/// @nodoc
abstract mixin class _$OccurrenceCopyWith<$Res> implements $OccurrenceCopyWith<$Res> {
  factory _$OccurrenceCopyWith(_Occurrence value, $Res Function(_Occurrence) _then) = __$OccurrenceCopyWithImpl;
@override @useResult
$Res call({
 String id, String title, String description, String type, double severity, String areaName, DateTime date, String status, String imageUrl, double latitude, double longitude
});




}
/// @nodoc
class __$OccurrenceCopyWithImpl<$Res>
    implements _$OccurrenceCopyWith<$Res> {
  __$OccurrenceCopyWithImpl(this._self, this._then);

  final _Occurrence _self;
  final $Res Function(_Occurrence) _then;

/// Create a copy of Occurrence
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? title = null,Object? description = null,Object? type = null,Object? severity = null,Object? areaName = null,Object? date = null,Object? status = null,Object? imageUrl = null,Object? latitude = null,Object? longitude = null,}) {
  return _then(_Occurrence(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,severity: null == severity ? _self.severity : severity // ignore: cast_nullable_to_non_nullable
as double,areaName: null == areaName ? _self.areaName : areaName // ignore: cast_nullable_to_non_nullable
as String,date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,imageUrl: null == imageUrl ? _self.imageUrl : imageUrl // ignore: cast_nullable_to_non_nullable
as String,latitude: null == latitude ? _self.latitude : latitude // ignore: cast_nullable_to_non_nullable
as double,longitude: null == longitude ? _self.longitude : longitude // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}

// dart format on
