// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'harvest_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Harvest {

 String get id; String get clientId; String get clientName; DateTime get date; String get cropType;// e.g., 'Soja', 'Milho', 'Algodão'
 double get quantityTon; String get storageLocation;
/// Create a copy of Harvest
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$HarvestCopyWith<Harvest> get copyWith => _$HarvestCopyWithImpl<Harvest>(this as Harvest, _$identity);

  /// Serializes this Harvest to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Harvest&&(identical(other.id, id) || other.id == id)&&(identical(other.clientId, clientId) || other.clientId == clientId)&&(identical(other.clientName, clientName) || other.clientName == clientName)&&(identical(other.date, date) || other.date == date)&&(identical(other.cropType, cropType) || other.cropType == cropType)&&(identical(other.quantityTon, quantityTon) || other.quantityTon == quantityTon)&&(identical(other.storageLocation, storageLocation) || other.storageLocation == storageLocation));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,clientId,clientName,date,cropType,quantityTon,storageLocation);

@override
String toString() {
  return 'Harvest(id: $id, clientId: $clientId, clientName: $clientName, date: $date, cropType: $cropType, quantityTon: $quantityTon, storageLocation: $storageLocation)';
}


}

/// @nodoc
abstract mixin class $HarvestCopyWith<$Res>  {
  factory $HarvestCopyWith(Harvest value, $Res Function(Harvest) _then) = _$HarvestCopyWithImpl;
@useResult
$Res call({
 String id, String clientId, String clientName, DateTime date, String cropType, double quantityTon, String storageLocation
});




}
/// @nodoc
class _$HarvestCopyWithImpl<$Res>
    implements $HarvestCopyWith<$Res> {
  _$HarvestCopyWithImpl(this._self, this._then);

  final Harvest _self;
  final $Res Function(Harvest) _then;

/// Create a copy of Harvest
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? clientId = null,Object? clientName = null,Object? date = null,Object? cropType = null,Object? quantityTon = null,Object? storageLocation = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,clientId: null == clientId ? _self.clientId : clientId // ignore: cast_nullable_to_non_nullable
as String,clientName: null == clientName ? _self.clientName : clientName // ignore: cast_nullable_to_non_nullable
as String,date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,cropType: null == cropType ? _self.cropType : cropType // ignore: cast_nullable_to_non_nullable
as String,quantityTon: null == quantityTon ? _self.quantityTon : quantityTon // ignore: cast_nullable_to_non_nullable
as double,storageLocation: null == storageLocation ? _self.storageLocation : storageLocation // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [Harvest].
extension HarvestPatterns on Harvest {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Harvest value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Harvest() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Harvest value)  $default,){
final _that = this;
switch (_that) {
case _Harvest():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Harvest value)?  $default,){
final _that = this;
switch (_that) {
case _Harvest() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String clientId,  String clientName,  DateTime date,  String cropType,  double quantityTon,  String storageLocation)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Harvest() when $default != null:
return $default(_that.id,_that.clientId,_that.clientName,_that.date,_that.cropType,_that.quantityTon,_that.storageLocation);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String clientId,  String clientName,  DateTime date,  String cropType,  double quantityTon,  String storageLocation)  $default,) {final _that = this;
switch (_that) {
case _Harvest():
return $default(_that.id,_that.clientId,_that.clientName,_that.date,_that.cropType,_that.quantityTon,_that.storageLocation);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String clientId,  String clientName,  DateTime date,  String cropType,  double quantityTon,  String storageLocation)?  $default,) {final _that = this;
switch (_that) {
case _Harvest() when $default != null:
return $default(_that.id,_that.clientId,_that.clientName,_that.date,_that.cropType,_that.quantityTon,_that.storageLocation);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Harvest implements Harvest {
  const _Harvest({required this.id, required this.clientId, required this.clientName, required this.date, required this.cropType, required this.quantityTon, required this.storageLocation});
  factory _Harvest.fromJson(Map<String, dynamic> json) => _$HarvestFromJson(json);

@override final  String id;
@override final  String clientId;
@override final  String clientName;
@override final  DateTime date;
@override final  String cropType;
// e.g., 'Soja', 'Milho', 'Algodão'
@override final  double quantityTon;
@override final  String storageLocation;

/// Create a copy of Harvest
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$HarvestCopyWith<_Harvest> get copyWith => __$HarvestCopyWithImpl<_Harvest>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$HarvestToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Harvest&&(identical(other.id, id) || other.id == id)&&(identical(other.clientId, clientId) || other.clientId == clientId)&&(identical(other.clientName, clientName) || other.clientName == clientName)&&(identical(other.date, date) || other.date == date)&&(identical(other.cropType, cropType) || other.cropType == cropType)&&(identical(other.quantityTon, quantityTon) || other.quantityTon == quantityTon)&&(identical(other.storageLocation, storageLocation) || other.storageLocation == storageLocation));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,clientId,clientName,date,cropType,quantityTon,storageLocation);

@override
String toString() {
  return 'Harvest(id: $id, clientId: $clientId, clientName: $clientName, date: $date, cropType: $cropType, quantityTon: $quantityTon, storageLocation: $storageLocation)';
}


}

/// @nodoc
abstract mixin class _$HarvestCopyWith<$Res> implements $HarvestCopyWith<$Res> {
  factory _$HarvestCopyWith(_Harvest value, $Res Function(_Harvest) _then) = __$HarvestCopyWithImpl;
@override @useResult
$Res call({
 String id, String clientId, String clientName, DateTime date, String cropType, double quantityTon, String storageLocation
});




}
/// @nodoc
class __$HarvestCopyWithImpl<$Res>
    implements _$HarvestCopyWith<$Res> {
  __$HarvestCopyWithImpl(this._self, this._then);

  final _Harvest _self;
  final $Res Function(_Harvest) _then;

/// Create a copy of Harvest
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? clientId = null,Object? clientName = null,Object? date = null,Object? cropType = null,Object? quantityTon = null,Object? storageLocation = null,}) {
  return _then(_Harvest(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,clientId: null == clientId ? _self.clientId : clientId // ignore: cast_nullable_to_non_nullable
as String,clientName: null == clientName ? _self.clientName : clientName // ignore: cast_nullable_to_non_nullable
as String,date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,cropType: null == cropType ? _self.cropType : cropType // ignore: cast_nullable_to_non_nullable
as String,quantityTon: null == quantityTon ? _self.quantityTon : quantityTon // ignore: cast_nullable_to_non_nullable
as double,storageLocation: null == storageLocation ? _self.storageLocation : storageLocation // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
