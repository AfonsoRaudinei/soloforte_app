// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'hr_models.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

TimeEntry _$TimeEntryFromJson(Map<String, dynamic> json) {
  return _TimeEntry.fromJson(json);
}

/// @nodoc
mixin _$TimeEntry {
  String get id => throw _privateConstructorUsedError;
  String get memberId => throw _privateConstructorUsedError;
  DateTime get startTime => throw _privateConstructorUsedError;
  DateTime? get endTime => throw _privateConstructorUsedError;
  TimeEntryType get type => throw _privateConstructorUsedError;
  String? get location => throw _privateConstructorUsedError;

  /// Serializes this TimeEntry to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TimeEntry
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TimeEntryCopyWith<TimeEntry> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TimeEntryCopyWith<$Res> {
  factory $TimeEntryCopyWith(TimeEntry value, $Res Function(TimeEntry) then) =
      _$TimeEntryCopyWithImpl<$Res, TimeEntry>;
  @useResult
  $Res call({
    String id,
    String memberId,
    DateTime startTime,
    DateTime? endTime,
    TimeEntryType type,
    String? location,
  });
}

/// @nodoc
class _$TimeEntryCopyWithImpl<$Res, $Val extends TimeEntry>
    implements $TimeEntryCopyWith<$Res> {
  _$TimeEntryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TimeEntry
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? memberId = null,
    Object? startTime = null,
    Object? endTime = freezed,
    Object? type = null,
    Object? location = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            memberId: null == memberId
                ? _value.memberId
                : memberId // ignore: cast_nullable_to_non_nullable
                      as String,
            startTime: null == startTime
                ? _value.startTime
                : startTime // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            endTime: freezed == endTime
                ? _value.endTime
                : endTime // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as TimeEntryType,
            location: freezed == location
                ? _value.location
                : location // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TimeEntryImplCopyWith<$Res>
    implements $TimeEntryCopyWith<$Res> {
  factory _$$TimeEntryImplCopyWith(
    _$TimeEntryImpl value,
    $Res Function(_$TimeEntryImpl) then,
  ) = __$$TimeEntryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String memberId,
    DateTime startTime,
    DateTime? endTime,
    TimeEntryType type,
    String? location,
  });
}

/// @nodoc
class __$$TimeEntryImplCopyWithImpl<$Res>
    extends _$TimeEntryCopyWithImpl<$Res, _$TimeEntryImpl>
    implements _$$TimeEntryImplCopyWith<$Res> {
  __$$TimeEntryImplCopyWithImpl(
    _$TimeEntryImpl _value,
    $Res Function(_$TimeEntryImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TimeEntry
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? memberId = null,
    Object? startTime = null,
    Object? endTime = freezed,
    Object? type = null,
    Object? location = freezed,
  }) {
    return _then(
      _$TimeEntryImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        memberId: null == memberId
            ? _value.memberId
            : memberId // ignore: cast_nullable_to_non_nullable
                  as String,
        startTime: null == startTime
            ? _value.startTime
            : startTime // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        endTime: freezed == endTime
            ? _value.endTime
            : endTime // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as TimeEntryType,
        location: freezed == location
            ? _value.location
            : location // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TimeEntryImpl with DiagnosticableTreeMixin implements _TimeEntry {
  const _$TimeEntryImpl({
    required this.id,
    required this.memberId,
    required this.startTime,
    this.endTime,
    this.type = TimeEntryType.regular,
    this.location,
  });

  factory _$TimeEntryImpl.fromJson(Map<String, dynamic> json) =>
      _$$TimeEntryImplFromJson(json);

  @override
  final String id;
  @override
  final String memberId;
  @override
  final DateTime startTime;
  @override
  final DateTime? endTime;
  @override
  @JsonKey()
  final TimeEntryType type;
  @override
  final String? location;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'TimeEntry(id: $id, memberId: $memberId, startTime: $startTime, endTime: $endTime, type: $type, location: $location)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'TimeEntry'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('memberId', memberId))
      ..add(DiagnosticsProperty('startTime', startTime))
      ..add(DiagnosticsProperty('endTime', endTime))
      ..add(DiagnosticsProperty('type', type))
      ..add(DiagnosticsProperty('location', location));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TimeEntryImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.memberId, memberId) ||
                other.memberId == memberId) &&
            (identical(other.startTime, startTime) ||
                other.startTime == startTime) &&
            (identical(other.endTime, endTime) || other.endTime == endTime) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.location, location) ||
                other.location == location));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    memberId,
    startTime,
    endTime,
    type,
    location,
  );

  /// Create a copy of TimeEntry
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TimeEntryImplCopyWith<_$TimeEntryImpl> get copyWith =>
      __$$TimeEntryImplCopyWithImpl<_$TimeEntryImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$TimeEntryImplToJson(this);
  }
}

abstract class _TimeEntry implements TimeEntry {
  const factory _TimeEntry({
    required final String id,
    required final String memberId,
    required final DateTime startTime,
    final DateTime? endTime,
    final TimeEntryType type,
    final String? location,
  }) = _$TimeEntryImpl;

  factory _TimeEntry.fromJson(Map<String, dynamic> json) =
      _$TimeEntryImpl.fromJson;

  @override
  String get id;
  @override
  String get memberId;
  @override
  DateTime get startTime;
  @override
  DateTime? get endTime;
  @override
  TimeEntryType get type;
  @override
  String? get location;

  /// Create a copy of TimeEntry
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TimeEntryImplCopyWith<_$TimeEntryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ApprovalRequest _$ApprovalRequestFromJson(Map<String, dynamic> json) {
  return _ApprovalRequest.fromJson(json);
}

/// @nodoc
mixin _$ApprovalRequest {
  String get id => throw _privateConstructorUsedError;
  String get memberId => throw _privateConstructorUsedError;
  String get memberName => throw _privateConstructorUsedError;
  RequestType get type => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  DateTime get date => throw _privateConstructorUsedError;
  RequestStatus get status => throw _privateConstructorUsedError;
  double? get amount => throw _privateConstructorUsedError; // For reimbursement
  DateTime? get startDate => throw _privateConstructorUsedError; // For vacation
  DateTime? get endDate => throw _privateConstructorUsedError;

  /// Serializes this ApprovalRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ApprovalRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ApprovalRequestCopyWith<ApprovalRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ApprovalRequestCopyWith<$Res> {
  factory $ApprovalRequestCopyWith(
    ApprovalRequest value,
    $Res Function(ApprovalRequest) then,
  ) = _$ApprovalRequestCopyWithImpl<$Res, ApprovalRequest>;
  @useResult
  $Res call({
    String id,
    String memberId,
    String memberName,
    RequestType type,
    String description,
    DateTime date,
    RequestStatus status,
    double? amount,
    DateTime? startDate,
    DateTime? endDate,
  });
}

/// @nodoc
class _$ApprovalRequestCopyWithImpl<$Res, $Val extends ApprovalRequest>
    implements $ApprovalRequestCopyWith<$Res> {
  _$ApprovalRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ApprovalRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? memberId = null,
    Object? memberName = null,
    Object? type = null,
    Object? description = null,
    Object? date = null,
    Object? status = null,
    Object? amount = freezed,
    Object? startDate = freezed,
    Object? endDate = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            memberId: null == memberId
                ? _value.memberId
                : memberId // ignore: cast_nullable_to_non_nullable
                      as String,
            memberName: null == memberName
                ? _value.memberName
                : memberName // ignore: cast_nullable_to_non_nullable
                      as String,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as RequestType,
            description: null == description
                ? _value.description
                : description // ignore: cast_nullable_to_non_nullable
                      as String,
            date: null == date
                ? _value.date
                : date // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            status: null == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as RequestStatus,
            amount: freezed == amount
                ? _value.amount
                : amount // ignore: cast_nullable_to_non_nullable
                      as double?,
            startDate: freezed == startDate
                ? _value.startDate
                : startDate // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            endDate: freezed == endDate
                ? _value.endDate
                : endDate // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ApprovalRequestImplCopyWith<$Res>
    implements $ApprovalRequestCopyWith<$Res> {
  factory _$$ApprovalRequestImplCopyWith(
    _$ApprovalRequestImpl value,
    $Res Function(_$ApprovalRequestImpl) then,
  ) = __$$ApprovalRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String memberId,
    String memberName,
    RequestType type,
    String description,
    DateTime date,
    RequestStatus status,
    double? amount,
    DateTime? startDate,
    DateTime? endDate,
  });
}

/// @nodoc
class __$$ApprovalRequestImplCopyWithImpl<$Res>
    extends _$ApprovalRequestCopyWithImpl<$Res, _$ApprovalRequestImpl>
    implements _$$ApprovalRequestImplCopyWith<$Res> {
  __$$ApprovalRequestImplCopyWithImpl(
    _$ApprovalRequestImpl _value,
    $Res Function(_$ApprovalRequestImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ApprovalRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? memberId = null,
    Object? memberName = null,
    Object? type = null,
    Object? description = null,
    Object? date = null,
    Object? status = null,
    Object? amount = freezed,
    Object? startDate = freezed,
    Object? endDate = freezed,
  }) {
    return _then(
      _$ApprovalRequestImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        memberId: null == memberId
            ? _value.memberId
            : memberId // ignore: cast_nullable_to_non_nullable
                  as String,
        memberName: null == memberName
            ? _value.memberName
            : memberName // ignore: cast_nullable_to_non_nullable
                  as String,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as RequestType,
        description: null == description
            ? _value.description
            : description // ignore: cast_nullable_to_non_nullable
                  as String,
        date: null == date
            ? _value.date
            : date // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        status: null == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as RequestStatus,
        amount: freezed == amount
            ? _value.amount
            : amount // ignore: cast_nullable_to_non_nullable
                  as double?,
        startDate: freezed == startDate
            ? _value.startDate
            : startDate // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        endDate: freezed == endDate
            ? _value.endDate
            : endDate // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ApprovalRequestImpl
    with DiagnosticableTreeMixin
    implements _ApprovalRequest {
  const _$ApprovalRequestImpl({
    required this.id,
    required this.memberId,
    required this.memberName,
    required this.type,
    required this.description,
    required this.date,
    required this.status,
    this.amount,
    this.startDate,
    this.endDate,
  });

  factory _$ApprovalRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$ApprovalRequestImplFromJson(json);

  @override
  final String id;
  @override
  final String memberId;
  @override
  final String memberName;
  @override
  final RequestType type;
  @override
  final String description;
  @override
  final DateTime date;
  @override
  final RequestStatus status;
  @override
  final double? amount;
  // For reimbursement
  @override
  final DateTime? startDate;
  // For vacation
  @override
  final DateTime? endDate;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'ApprovalRequest(id: $id, memberId: $memberId, memberName: $memberName, type: $type, description: $description, date: $date, status: $status, amount: $amount, startDate: $startDate, endDate: $endDate)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'ApprovalRequest'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('memberId', memberId))
      ..add(DiagnosticsProperty('memberName', memberName))
      ..add(DiagnosticsProperty('type', type))
      ..add(DiagnosticsProperty('description', description))
      ..add(DiagnosticsProperty('date', date))
      ..add(DiagnosticsProperty('status', status))
      ..add(DiagnosticsProperty('amount', amount))
      ..add(DiagnosticsProperty('startDate', startDate))
      ..add(DiagnosticsProperty('endDate', endDate));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ApprovalRequestImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.memberId, memberId) ||
                other.memberId == memberId) &&
            (identical(other.memberName, memberName) ||
                other.memberName == memberName) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.date, date) || other.date == date) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    memberId,
    memberName,
    type,
    description,
    date,
    status,
    amount,
    startDate,
    endDate,
  );

  /// Create a copy of ApprovalRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ApprovalRequestImplCopyWith<_$ApprovalRequestImpl> get copyWith =>
      __$$ApprovalRequestImplCopyWithImpl<_$ApprovalRequestImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$ApprovalRequestImplToJson(this);
  }
}

abstract class _ApprovalRequest implements ApprovalRequest {
  const factory _ApprovalRequest({
    required final String id,
    required final String memberId,
    required final String memberName,
    required final RequestType type,
    required final String description,
    required final DateTime date,
    required final RequestStatus status,
    final double? amount,
    final DateTime? startDate,
    final DateTime? endDate,
  }) = _$ApprovalRequestImpl;

  factory _ApprovalRequest.fromJson(Map<String, dynamic> json) =
      _$ApprovalRequestImpl.fromJson;

  @override
  String get id;
  @override
  String get memberId;
  @override
  String get memberName;
  @override
  RequestType get type;
  @override
  String get description;
  @override
  DateTime get date;
  @override
  RequestStatus get status;
  @override
  double? get amount; // For reimbursement
  @override
  DateTime? get startDate; // For vacation
  @override
  DateTime? get endDate;

  /// Create a copy of ApprovalRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ApprovalRequestImplCopyWith<_$ApprovalRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

SOSAlert _$SOSAlertFromJson(Map<String, dynamic> json) {
  return _SOSAlert.fromJson(json);
}

/// @nodoc
mixin _$SOSAlert {
  String get id => throw _privateConstructorUsedError;
  String get memberId => throw _privateConstructorUsedError;
  DateTime get timestamp => throw _privateConstructorUsedError;
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;
  bool get resolved => throw _privateConstructorUsedError;
  String? get note => throw _privateConstructorUsedError;

  /// Serializes this SOSAlert to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of SOSAlert
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $SOSAlertCopyWith<SOSAlert> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SOSAlertCopyWith<$Res> {
  factory $SOSAlertCopyWith(SOSAlert value, $Res Function(SOSAlert) then) =
      _$SOSAlertCopyWithImpl<$Res, SOSAlert>;
  @useResult
  $Res call({
    String id,
    String memberId,
    DateTime timestamp,
    double latitude,
    double longitude,
    bool resolved,
    String? note,
  });
}

/// @nodoc
class _$SOSAlertCopyWithImpl<$Res, $Val extends SOSAlert>
    implements $SOSAlertCopyWith<$Res> {
  _$SOSAlertCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of SOSAlert
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? memberId = null,
    Object? timestamp = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? resolved = null,
    Object? note = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            memberId: null == memberId
                ? _value.memberId
                : memberId // ignore: cast_nullable_to_non_nullable
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
            resolved: null == resolved
                ? _value.resolved
                : resolved // ignore: cast_nullable_to_non_nullable
                      as bool,
            note: freezed == note
                ? _value.note
                : note // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$SOSAlertImplCopyWith<$Res>
    implements $SOSAlertCopyWith<$Res> {
  factory _$$SOSAlertImplCopyWith(
    _$SOSAlertImpl value,
    $Res Function(_$SOSAlertImpl) then,
  ) = __$$SOSAlertImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String memberId,
    DateTime timestamp,
    double latitude,
    double longitude,
    bool resolved,
    String? note,
  });
}

/// @nodoc
class __$$SOSAlertImplCopyWithImpl<$Res>
    extends _$SOSAlertCopyWithImpl<$Res, _$SOSAlertImpl>
    implements _$$SOSAlertImplCopyWith<$Res> {
  __$$SOSAlertImplCopyWithImpl(
    _$SOSAlertImpl _value,
    $Res Function(_$SOSAlertImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of SOSAlert
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? memberId = null,
    Object? timestamp = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? resolved = null,
    Object? note = freezed,
  }) {
    return _then(
      _$SOSAlertImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        memberId: null == memberId
            ? _value.memberId
            : memberId // ignore: cast_nullable_to_non_nullable
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
        resolved: null == resolved
            ? _value.resolved
            : resolved // ignore: cast_nullable_to_non_nullable
                  as bool,
        note: freezed == note
            ? _value.note
            : note // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$SOSAlertImpl with DiagnosticableTreeMixin implements _SOSAlert {
  const _$SOSAlertImpl({
    required this.id,
    required this.memberId,
    required this.timestamp,
    required this.latitude,
    required this.longitude,
    this.resolved = false,
    this.note,
  });

  factory _$SOSAlertImpl.fromJson(Map<String, dynamic> json) =>
      _$$SOSAlertImplFromJson(json);

  @override
  final String id;
  @override
  final String memberId;
  @override
  final DateTime timestamp;
  @override
  final double latitude;
  @override
  final double longitude;
  @override
  @JsonKey()
  final bool resolved;
  @override
  final String? note;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'SOSAlert(id: $id, memberId: $memberId, timestamp: $timestamp, latitude: $latitude, longitude: $longitude, resolved: $resolved, note: $note)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'SOSAlert'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('memberId', memberId))
      ..add(DiagnosticsProperty('timestamp', timestamp))
      ..add(DiagnosticsProperty('latitude', latitude))
      ..add(DiagnosticsProperty('longitude', longitude))
      ..add(DiagnosticsProperty('resolved', resolved))
      ..add(DiagnosticsProperty('note', note));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SOSAlertImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.memberId, memberId) ||
                other.memberId == memberId) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.resolved, resolved) ||
                other.resolved == resolved) &&
            (identical(other.note, note) || other.note == note));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    memberId,
    timestamp,
    latitude,
    longitude,
    resolved,
    note,
  );

  /// Create a copy of SOSAlert
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$SOSAlertImplCopyWith<_$SOSAlertImpl> get copyWith =>
      __$$SOSAlertImplCopyWithImpl<_$SOSAlertImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$SOSAlertImplToJson(this);
  }
}

abstract class _SOSAlert implements SOSAlert {
  const factory _SOSAlert({
    required final String id,
    required final String memberId,
    required final DateTime timestamp,
    required final double latitude,
    required final double longitude,
    final bool resolved,
    final String? note,
  }) = _$SOSAlertImpl;

  factory _SOSAlert.fromJson(Map<String, dynamic> json) =
      _$SOSAlertImpl.fromJson;

  @override
  String get id;
  @override
  String get memberId;
  @override
  DateTime get timestamp;
  @override
  double get latitude;
  @override
  double get longitude;
  @override
  bool get resolved;
  @override
  String? get note;

  /// Create a copy of SOSAlert
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$SOSAlertImplCopyWith<_$SOSAlertImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
