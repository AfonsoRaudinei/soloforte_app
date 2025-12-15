// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'event_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$EventRecurrence {

 String get frequency;// 'daily', 'weekly', 'monthly'
 int get interval; DateTime? get endDate; List<DateTime> get exceptionDates;
/// Create a copy of EventRecurrence
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$EventRecurrenceCopyWith<EventRecurrence> get copyWith => _$EventRecurrenceCopyWithImpl<EventRecurrence>(this as EventRecurrence, _$identity);

  /// Serializes this EventRecurrence to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is EventRecurrence&&(identical(other.frequency, frequency) || other.frequency == frequency)&&(identical(other.interval, interval) || other.interval == interval)&&(identical(other.endDate, endDate) || other.endDate == endDate)&&const DeepCollectionEquality().equals(other.exceptionDates, exceptionDates));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,frequency,interval,endDate,const DeepCollectionEquality().hash(exceptionDates));

@override
String toString() {
  return 'EventRecurrence(frequency: $frequency, interval: $interval, endDate: $endDate, exceptionDates: $exceptionDates)';
}


}

/// @nodoc
abstract mixin class $EventRecurrenceCopyWith<$Res>  {
  factory $EventRecurrenceCopyWith(EventRecurrence value, $Res Function(EventRecurrence) _then) = _$EventRecurrenceCopyWithImpl;
@useResult
$Res call({
 String frequency, int interval, DateTime? endDate, List<DateTime> exceptionDates
});




}
/// @nodoc
class _$EventRecurrenceCopyWithImpl<$Res>
    implements $EventRecurrenceCopyWith<$Res> {
  _$EventRecurrenceCopyWithImpl(this._self, this._then);

  final EventRecurrence _self;
  final $Res Function(EventRecurrence) _then;

/// Create a copy of EventRecurrence
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? frequency = null,Object? interval = null,Object? endDate = freezed,Object? exceptionDates = null,}) {
  return _then(_self.copyWith(
frequency: null == frequency ? _self.frequency : frequency // ignore: cast_nullable_to_non_nullable
as String,interval: null == interval ? _self.interval : interval // ignore: cast_nullable_to_non_nullable
as int,endDate: freezed == endDate ? _self.endDate : endDate // ignore: cast_nullable_to_non_nullable
as DateTime?,exceptionDates: null == exceptionDates ? _self.exceptionDates : exceptionDates // ignore: cast_nullable_to_non_nullable
as List<DateTime>,
  ));
}

}


/// Adds pattern-matching-related methods to [EventRecurrence].
extension EventRecurrencePatterns on EventRecurrence {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _EventRecurrence value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _EventRecurrence() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _EventRecurrence value)  $default,){
final _that = this;
switch (_that) {
case _EventRecurrence():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _EventRecurrence value)?  $default,){
final _that = this;
switch (_that) {
case _EventRecurrence() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String frequency,  int interval,  DateTime? endDate,  List<DateTime> exceptionDates)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _EventRecurrence() when $default != null:
return $default(_that.frequency,_that.interval,_that.endDate,_that.exceptionDates);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String frequency,  int interval,  DateTime? endDate,  List<DateTime> exceptionDates)  $default,) {final _that = this;
switch (_that) {
case _EventRecurrence():
return $default(_that.frequency,_that.interval,_that.endDate,_that.exceptionDates);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String frequency,  int interval,  DateTime? endDate,  List<DateTime> exceptionDates)?  $default,) {final _that = this;
switch (_that) {
case _EventRecurrence() when $default != null:
return $default(_that.frequency,_that.interval,_that.endDate,_that.exceptionDates);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _EventRecurrence implements EventRecurrence {
  const _EventRecurrence({required this.frequency, required this.interval, this.endDate, final  List<DateTime> exceptionDates = const []}): _exceptionDates = exceptionDates;
  factory _EventRecurrence.fromJson(Map<String, dynamic> json) => _$EventRecurrenceFromJson(json);

@override final  String frequency;
// 'daily', 'weekly', 'monthly'
@override final  int interval;
@override final  DateTime? endDate;
 final  List<DateTime> _exceptionDates;
@override@JsonKey() List<DateTime> get exceptionDates {
  if (_exceptionDates is EqualUnmodifiableListView) return _exceptionDates;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_exceptionDates);
}


/// Create a copy of EventRecurrence
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$EventRecurrenceCopyWith<_EventRecurrence> get copyWith => __$EventRecurrenceCopyWithImpl<_EventRecurrence>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$EventRecurrenceToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _EventRecurrence&&(identical(other.frequency, frequency) || other.frequency == frequency)&&(identical(other.interval, interval) || other.interval == interval)&&(identical(other.endDate, endDate) || other.endDate == endDate)&&const DeepCollectionEquality().equals(other._exceptionDates, _exceptionDates));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,frequency,interval,endDate,const DeepCollectionEquality().hash(_exceptionDates));

@override
String toString() {
  return 'EventRecurrence(frequency: $frequency, interval: $interval, endDate: $endDate, exceptionDates: $exceptionDates)';
}


}

/// @nodoc
abstract mixin class _$EventRecurrenceCopyWith<$Res> implements $EventRecurrenceCopyWith<$Res> {
  factory _$EventRecurrenceCopyWith(_EventRecurrence value, $Res Function(_EventRecurrence) _then) = __$EventRecurrenceCopyWithImpl;
@override @useResult
$Res call({
 String frequency, int interval, DateTime? endDate, List<DateTime> exceptionDates
});




}
/// @nodoc
class __$EventRecurrenceCopyWithImpl<$Res>
    implements _$EventRecurrenceCopyWith<$Res> {
  __$EventRecurrenceCopyWithImpl(this._self, this._then);

  final _EventRecurrence _self;
  final $Res Function(_EventRecurrence) _then;

/// Create a copy of EventRecurrence
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? frequency = null,Object? interval = null,Object? endDate = freezed,Object? exceptionDates = null,}) {
  return _then(_EventRecurrence(
frequency: null == frequency ? _self.frequency : frequency // ignore: cast_nullable_to_non_nullable
as String,interval: null == interval ? _self.interval : interval // ignore: cast_nullable_to_non_nullable
as int,endDate: freezed == endDate ? _self.endDate : endDate // ignore: cast_nullable_to_non_nullable
as DateTime?,exceptionDates: null == exceptionDates ? _self._exceptionDates : exceptionDates // ignore: cast_nullable_to_non_nullable
as List<DateTime>,
  ));
}


}


/// @nodoc
mixin _$ChecklistItem {

 String get id; String get label; bool get isCompleted;
/// Create a copy of ChecklistItem
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ChecklistItemCopyWith<ChecklistItem> get copyWith => _$ChecklistItemCopyWithImpl<ChecklistItem>(this as ChecklistItem, _$identity);

  /// Serializes this ChecklistItem to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ChecklistItem&&(identical(other.id, id) || other.id == id)&&(identical(other.label, label) || other.label == label)&&(identical(other.isCompleted, isCompleted) || other.isCompleted == isCompleted));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,label,isCompleted);

@override
String toString() {
  return 'ChecklistItem(id: $id, label: $label, isCompleted: $isCompleted)';
}


}

/// @nodoc
abstract mixin class $ChecklistItemCopyWith<$Res>  {
  factory $ChecklistItemCopyWith(ChecklistItem value, $Res Function(ChecklistItem) _then) = _$ChecklistItemCopyWithImpl;
@useResult
$Res call({
 String id, String label, bool isCompleted
});




}
/// @nodoc
class _$ChecklistItemCopyWithImpl<$Res>
    implements $ChecklistItemCopyWith<$Res> {
  _$ChecklistItemCopyWithImpl(this._self, this._then);

  final ChecklistItem _self;
  final $Res Function(ChecklistItem) _then;

/// Create a copy of ChecklistItem
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? label = null,Object? isCompleted = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,label: null == label ? _self.label : label // ignore: cast_nullable_to_non_nullable
as String,isCompleted: null == isCompleted ? _self.isCompleted : isCompleted // ignore: cast_nullable_to_non_nullable
as bool,
  ));
}

}


/// Adds pattern-matching-related methods to [ChecklistItem].
extension ChecklistItemPatterns on ChecklistItem {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ChecklistItem value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ChecklistItem() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ChecklistItem value)  $default,){
final _that = this;
switch (_that) {
case _ChecklistItem():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ChecklistItem value)?  $default,){
final _that = this;
switch (_that) {
case _ChecklistItem() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String label,  bool isCompleted)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ChecklistItem() when $default != null:
return $default(_that.id,_that.label,_that.isCompleted);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String label,  bool isCompleted)  $default,) {final _that = this;
switch (_that) {
case _ChecklistItem():
return $default(_that.id,_that.label,_that.isCompleted);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String label,  bool isCompleted)?  $default,) {final _that = this;
switch (_that) {
case _ChecklistItem() when $default != null:
return $default(_that.id,_that.label,_that.isCompleted);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ChecklistItem implements ChecklistItem {
  const _ChecklistItem({required this.id, required this.label, this.isCompleted = false});
  factory _ChecklistItem.fromJson(Map<String, dynamic> json) => _$ChecklistItemFromJson(json);

@override final  String id;
@override final  String label;
@override@JsonKey() final  bool isCompleted;

/// Create a copy of ChecklistItem
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ChecklistItemCopyWith<_ChecklistItem> get copyWith => __$ChecklistItemCopyWithImpl<_ChecklistItem>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ChecklistItemToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ChecklistItem&&(identical(other.id, id) || other.id == id)&&(identical(other.label, label) || other.label == label)&&(identical(other.isCompleted, isCompleted) || other.isCompleted == isCompleted));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,label,isCompleted);

@override
String toString() {
  return 'ChecklistItem(id: $id, label: $label, isCompleted: $isCompleted)';
}


}

/// @nodoc
abstract mixin class _$ChecklistItemCopyWith<$Res> implements $ChecklistItemCopyWith<$Res> {
  factory _$ChecklistItemCopyWith(_ChecklistItem value, $Res Function(_ChecklistItem) _then) = __$ChecklistItemCopyWithImpl;
@override @useResult
$Res call({
 String id, String label, bool isCompleted
});




}
/// @nodoc
class __$ChecklistItemCopyWithImpl<$Res>
    implements _$ChecklistItemCopyWith<$Res> {
  __$ChecklistItemCopyWithImpl(this._self, this._then);

  final _ChecklistItem _self;
  final $Res Function(_ChecklistItem) _then;

/// Create a copy of ChecklistItem
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? label = null,Object? isCompleted = null,}) {
  return _then(_ChecklistItem(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,label: null == label ? _self.label : label // ignore: cast_nullable_to_non_nullable
as String,isCompleted: null == isCompleted ? _self.isCompleted : isCompleted // ignore: cast_nullable_to_non_nullable
as bool,
  ));
}


}


/// @nodoc
mixin _$Event {

 String get id; String get title; String get description; DateTime get startTime; DateTime get endTime; EventType get type; EventStatus get status; String get location;// Relations
 String? get clientId; String? get clientName; String? get areaId; String? get areaName;// Details
 List<String> get participants; List<ChecklistItem> get checklist; List<String> get attachmentUrls; String? get notes;// Recurrence
 EventRecurrence? get recurrence;// Integrations & Metadata
 Map<String, dynamic>? get weatherForecast; DateTime? get completedAt; DateTime? get createdAt; DateTime? get updatedAt;
/// Create a copy of Event
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$EventCopyWith<Event> get copyWith => _$EventCopyWithImpl<Event>(this as Event, _$identity);

  /// Serializes this Event to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Event&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.description, description) || other.description == description)&&(identical(other.startTime, startTime) || other.startTime == startTime)&&(identical(other.endTime, endTime) || other.endTime == endTime)&&(identical(other.type, type) || other.type == type)&&(identical(other.status, status) || other.status == status)&&(identical(other.location, location) || other.location == location)&&(identical(other.clientId, clientId) || other.clientId == clientId)&&(identical(other.clientName, clientName) || other.clientName == clientName)&&(identical(other.areaId, areaId) || other.areaId == areaId)&&(identical(other.areaName, areaName) || other.areaName == areaName)&&const DeepCollectionEquality().equals(other.participants, participants)&&const DeepCollectionEquality().equals(other.checklist, checklist)&&const DeepCollectionEquality().equals(other.attachmentUrls, attachmentUrls)&&(identical(other.notes, notes) || other.notes == notes)&&(identical(other.recurrence, recurrence) || other.recurrence == recurrence)&&const DeepCollectionEquality().equals(other.weatherForecast, weatherForecast)&&(identical(other.completedAt, completedAt) || other.completedAt == completedAt)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hashAll([runtimeType,id,title,description,startTime,endTime,type,status,location,clientId,clientName,areaId,areaName,const DeepCollectionEquality().hash(participants),const DeepCollectionEquality().hash(checklist),const DeepCollectionEquality().hash(attachmentUrls),notes,recurrence,const DeepCollectionEquality().hash(weatherForecast),completedAt,createdAt,updatedAt]);

@override
String toString() {
  return 'Event(id: $id, title: $title, description: $description, startTime: $startTime, endTime: $endTime, type: $type, status: $status, location: $location, clientId: $clientId, clientName: $clientName, areaId: $areaId, areaName: $areaName, participants: $participants, checklist: $checklist, attachmentUrls: $attachmentUrls, notes: $notes, recurrence: $recurrence, weatherForecast: $weatherForecast, completedAt: $completedAt, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class $EventCopyWith<$Res>  {
  factory $EventCopyWith(Event value, $Res Function(Event) _then) = _$EventCopyWithImpl;
@useResult
$Res call({
 String id, String title, String description, DateTime startTime, DateTime endTime, EventType type, EventStatus status, String location, String? clientId, String? clientName, String? areaId, String? areaName, List<String> participants, List<ChecklistItem> checklist, List<String> attachmentUrls, String? notes, EventRecurrence? recurrence, Map<String, dynamic>? weatherForecast, DateTime? completedAt, DateTime? createdAt, DateTime? updatedAt
});


$EventRecurrenceCopyWith<$Res>? get recurrence;

}
/// @nodoc
class _$EventCopyWithImpl<$Res>
    implements $EventCopyWith<$Res> {
  _$EventCopyWithImpl(this._self, this._then);

  final Event _self;
  final $Res Function(Event) _then;

/// Create a copy of Event
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? title = null,Object? description = null,Object? startTime = null,Object? endTime = null,Object? type = null,Object? status = null,Object? location = null,Object? clientId = freezed,Object? clientName = freezed,Object? areaId = freezed,Object? areaName = freezed,Object? participants = null,Object? checklist = null,Object? attachmentUrls = null,Object? notes = freezed,Object? recurrence = freezed,Object? weatherForecast = freezed,Object? completedAt = freezed,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,startTime: null == startTime ? _self.startTime : startTime // ignore: cast_nullable_to_non_nullable
as DateTime,endTime: null == endTime ? _self.endTime : endTime // ignore: cast_nullable_to_non_nullable
as DateTime,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as EventType,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as EventStatus,location: null == location ? _self.location : location // ignore: cast_nullable_to_non_nullable
as String,clientId: freezed == clientId ? _self.clientId : clientId // ignore: cast_nullable_to_non_nullable
as String?,clientName: freezed == clientName ? _self.clientName : clientName // ignore: cast_nullable_to_non_nullable
as String?,areaId: freezed == areaId ? _self.areaId : areaId // ignore: cast_nullable_to_non_nullable
as String?,areaName: freezed == areaName ? _self.areaName : areaName // ignore: cast_nullable_to_non_nullable
as String?,participants: null == participants ? _self.participants : participants // ignore: cast_nullable_to_non_nullable
as List<String>,checklist: null == checklist ? _self.checklist : checklist // ignore: cast_nullable_to_non_nullable
as List<ChecklistItem>,attachmentUrls: null == attachmentUrls ? _self.attachmentUrls : attachmentUrls // ignore: cast_nullable_to_non_nullable
as List<String>,notes: freezed == notes ? _self.notes : notes // ignore: cast_nullable_to_non_nullable
as String?,recurrence: freezed == recurrence ? _self.recurrence : recurrence // ignore: cast_nullable_to_non_nullable
as EventRecurrence?,weatherForecast: freezed == weatherForecast ? _self.weatherForecast : weatherForecast // ignore: cast_nullable_to_non_nullable
as Map<String, dynamic>?,completedAt: freezed == completedAt ? _self.completedAt : completedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of Event
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$EventRecurrenceCopyWith<$Res>? get recurrence {
    if (_self.recurrence == null) {
    return null;
  }

  return $EventRecurrenceCopyWith<$Res>(_self.recurrence!, (value) {
    return _then(_self.copyWith(recurrence: value));
  });
}
}


/// Adds pattern-matching-related methods to [Event].
extension EventPatterns on Event {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Event value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Event() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Event value)  $default,){
final _that = this;
switch (_that) {
case _Event():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Event value)?  $default,){
final _that = this;
switch (_that) {
case _Event() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String title,  String description,  DateTime startTime,  DateTime endTime,  EventType type,  EventStatus status,  String location,  String? clientId,  String? clientName,  String? areaId,  String? areaName,  List<String> participants,  List<ChecklistItem> checklist,  List<String> attachmentUrls,  String? notes,  EventRecurrence? recurrence,  Map<String, dynamic>? weatherForecast,  DateTime? completedAt,  DateTime? createdAt,  DateTime? updatedAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Event() when $default != null:
return $default(_that.id,_that.title,_that.description,_that.startTime,_that.endTime,_that.type,_that.status,_that.location,_that.clientId,_that.clientName,_that.areaId,_that.areaName,_that.participants,_that.checklist,_that.attachmentUrls,_that.notes,_that.recurrence,_that.weatherForecast,_that.completedAt,_that.createdAt,_that.updatedAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String title,  String description,  DateTime startTime,  DateTime endTime,  EventType type,  EventStatus status,  String location,  String? clientId,  String? clientName,  String? areaId,  String? areaName,  List<String> participants,  List<ChecklistItem> checklist,  List<String> attachmentUrls,  String? notes,  EventRecurrence? recurrence,  Map<String, dynamic>? weatherForecast,  DateTime? completedAt,  DateTime? createdAt,  DateTime? updatedAt)  $default,) {final _that = this;
switch (_that) {
case _Event():
return $default(_that.id,_that.title,_that.description,_that.startTime,_that.endTime,_that.type,_that.status,_that.location,_that.clientId,_that.clientName,_that.areaId,_that.areaName,_that.participants,_that.checklist,_that.attachmentUrls,_that.notes,_that.recurrence,_that.weatherForecast,_that.completedAt,_that.createdAt,_that.updatedAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String title,  String description,  DateTime startTime,  DateTime endTime,  EventType type,  EventStatus status,  String location,  String? clientId,  String? clientName,  String? areaId,  String? areaName,  List<String> participants,  List<ChecklistItem> checklist,  List<String> attachmentUrls,  String? notes,  EventRecurrence? recurrence,  Map<String, dynamic>? weatherForecast,  DateTime? completedAt,  DateTime? createdAt,  DateTime? updatedAt)?  $default,) {final _that = this;
switch (_that) {
case _Event() when $default != null:
return $default(_that.id,_that.title,_that.description,_that.startTime,_that.endTime,_that.type,_that.status,_that.location,_that.clientId,_that.clientName,_that.areaId,_that.areaName,_that.participants,_that.checklist,_that.attachmentUrls,_that.notes,_that.recurrence,_that.weatherForecast,_that.completedAt,_that.createdAt,_that.updatedAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Event implements Event {
  const _Event({required this.id, required this.title, required this.description, required this.startTime, required this.endTime, required this.type, this.status = EventStatus.scheduled, required this.location, this.clientId, this.clientName, this.areaId, this.areaName, final  List<String> participants = const [], final  List<ChecklistItem> checklist = const [], final  List<String> attachmentUrls = const [], this.notes, this.recurrence, final  Map<String, dynamic>? weatherForecast, this.completedAt, this.createdAt, this.updatedAt}): _participants = participants,_checklist = checklist,_attachmentUrls = attachmentUrls,_weatherForecast = weatherForecast;
  factory _Event.fromJson(Map<String, dynamic> json) => _$EventFromJson(json);

@override final  String id;
@override final  String title;
@override final  String description;
@override final  DateTime startTime;
@override final  DateTime endTime;
@override final  EventType type;
@override@JsonKey() final  EventStatus status;
@override final  String location;
// Relations
@override final  String? clientId;
@override final  String? clientName;
@override final  String? areaId;
@override final  String? areaName;
// Details
 final  List<String> _participants;
// Details
@override@JsonKey() List<String> get participants {
  if (_participants is EqualUnmodifiableListView) return _participants;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_participants);
}

 final  List<ChecklistItem> _checklist;
@override@JsonKey() List<ChecklistItem> get checklist {
  if (_checklist is EqualUnmodifiableListView) return _checklist;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_checklist);
}

 final  List<String> _attachmentUrls;
@override@JsonKey() List<String> get attachmentUrls {
  if (_attachmentUrls is EqualUnmodifiableListView) return _attachmentUrls;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_attachmentUrls);
}

@override final  String? notes;
// Recurrence
@override final  EventRecurrence? recurrence;
// Integrations & Metadata
 final  Map<String, dynamic>? _weatherForecast;
// Integrations & Metadata
@override Map<String, dynamic>? get weatherForecast {
  final value = _weatherForecast;
  if (value == null) return null;
  if (_weatherForecast is EqualUnmodifiableMapView) return _weatherForecast;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableMapView(value);
}

@override final  DateTime? completedAt;
@override final  DateTime? createdAt;
@override final  DateTime? updatedAt;

/// Create a copy of Event
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$EventCopyWith<_Event> get copyWith => __$EventCopyWithImpl<_Event>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$EventToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Event&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.description, description) || other.description == description)&&(identical(other.startTime, startTime) || other.startTime == startTime)&&(identical(other.endTime, endTime) || other.endTime == endTime)&&(identical(other.type, type) || other.type == type)&&(identical(other.status, status) || other.status == status)&&(identical(other.location, location) || other.location == location)&&(identical(other.clientId, clientId) || other.clientId == clientId)&&(identical(other.clientName, clientName) || other.clientName == clientName)&&(identical(other.areaId, areaId) || other.areaId == areaId)&&(identical(other.areaName, areaName) || other.areaName == areaName)&&const DeepCollectionEquality().equals(other._participants, _participants)&&const DeepCollectionEquality().equals(other._checklist, _checklist)&&const DeepCollectionEquality().equals(other._attachmentUrls, _attachmentUrls)&&(identical(other.notes, notes) || other.notes == notes)&&(identical(other.recurrence, recurrence) || other.recurrence == recurrence)&&const DeepCollectionEquality().equals(other._weatherForecast, _weatherForecast)&&(identical(other.completedAt, completedAt) || other.completedAt == completedAt)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hashAll([runtimeType,id,title,description,startTime,endTime,type,status,location,clientId,clientName,areaId,areaName,const DeepCollectionEquality().hash(_participants),const DeepCollectionEquality().hash(_checklist),const DeepCollectionEquality().hash(_attachmentUrls),notes,recurrence,const DeepCollectionEquality().hash(_weatherForecast),completedAt,createdAt,updatedAt]);

@override
String toString() {
  return 'Event(id: $id, title: $title, description: $description, startTime: $startTime, endTime: $endTime, type: $type, status: $status, location: $location, clientId: $clientId, clientName: $clientName, areaId: $areaId, areaName: $areaName, participants: $participants, checklist: $checklist, attachmentUrls: $attachmentUrls, notes: $notes, recurrence: $recurrence, weatherForecast: $weatherForecast, completedAt: $completedAt, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class _$EventCopyWith<$Res> implements $EventCopyWith<$Res> {
  factory _$EventCopyWith(_Event value, $Res Function(_Event) _then) = __$EventCopyWithImpl;
@override @useResult
$Res call({
 String id, String title, String description, DateTime startTime, DateTime endTime, EventType type, EventStatus status, String location, String? clientId, String? clientName, String? areaId, String? areaName, List<String> participants, List<ChecklistItem> checklist, List<String> attachmentUrls, String? notes, EventRecurrence? recurrence, Map<String, dynamic>? weatherForecast, DateTime? completedAt, DateTime? createdAt, DateTime? updatedAt
});


@override $EventRecurrenceCopyWith<$Res>? get recurrence;

}
/// @nodoc
class __$EventCopyWithImpl<$Res>
    implements _$EventCopyWith<$Res> {
  __$EventCopyWithImpl(this._self, this._then);

  final _Event _self;
  final $Res Function(_Event) _then;

/// Create a copy of Event
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? title = null,Object? description = null,Object? startTime = null,Object? endTime = null,Object? type = null,Object? status = null,Object? location = null,Object? clientId = freezed,Object? clientName = freezed,Object? areaId = freezed,Object? areaName = freezed,Object? participants = null,Object? checklist = null,Object? attachmentUrls = null,Object? notes = freezed,Object? recurrence = freezed,Object? weatherForecast = freezed,Object? completedAt = freezed,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(_Event(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,startTime: null == startTime ? _self.startTime : startTime // ignore: cast_nullable_to_non_nullable
as DateTime,endTime: null == endTime ? _self.endTime : endTime // ignore: cast_nullable_to_non_nullable
as DateTime,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as EventType,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as EventStatus,location: null == location ? _self.location : location // ignore: cast_nullable_to_non_nullable
as String,clientId: freezed == clientId ? _self.clientId : clientId // ignore: cast_nullable_to_non_nullable
as String?,clientName: freezed == clientName ? _self.clientName : clientName // ignore: cast_nullable_to_non_nullable
as String?,areaId: freezed == areaId ? _self.areaId : areaId // ignore: cast_nullable_to_non_nullable
as String?,areaName: freezed == areaName ? _self.areaName : areaName // ignore: cast_nullable_to_non_nullable
as String?,participants: null == participants ? _self._participants : participants // ignore: cast_nullable_to_non_nullable
as List<String>,checklist: null == checklist ? _self._checklist : checklist // ignore: cast_nullable_to_non_nullable
as List<ChecklistItem>,attachmentUrls: null == attachmentUrls ? _self._attachmentUrls : attachmentUrls // ignore: cast_nullable_to_non_nullable
as List<String>,notes: freezed == notes ? _self.notes : notes // ignore: cast_nullable_to_non_nullable
as String?,recurrence: freezed == recurrence ? _self.recurrence : recurrence // ignore: cast_nullable_to_non_nullable
as EventRecurrence?,weatherForecast: freezed == weatherForecast ? _self._weatherForecast : weatherForecast // ignore: cast_nullable_to_non_nullable
as Map<String, dynamic>?,completedAt: freezed == completedAt ? _self.completedAt : completedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of Event
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$EventRecurrenceCopyWith<$Res>? get recurrence {
    if (_self.recurrence == null) {
    return null;
  }

  return $EventRecurrenceCopyWith<$Res>(_self.recurrence!, (value) {
    return _then(_self.copyWith(recurrence: value));
  });
}
}

// dart format on
