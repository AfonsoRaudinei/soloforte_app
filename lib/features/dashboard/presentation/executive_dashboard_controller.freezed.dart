// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'executive_dashboard_controller.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$DashboardAlert {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  String get message => throw _privateConstructorUsedError;
  AlertSeverity get severity => throw _privateConstructorUsedError;
  AlertType get type => throw _privateConstructorUsedError;
  DateTime? get date => throw _privateConstructorUsedError;
  String? get actionRoute => throw _privateConstructorUsedError;

  /// Create a copy of DashboardAlert
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $DashboardAlertCopyWith<DashboardAlert> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DashboardAlertCopyWith<$Res> {
  factory $DashboardAlertCopyWith(
    DashboardAlert value,
    $Res Function(DashboardAlert) then,
  ) = _$DashboardAlertCopyWithImpl<$Res, DashboardAlert>;
  @useResult
  $Res call({
    String id,
    String title,
    String message,
    AlertSeverity severity,
    AlertType type,
    DateTime? date,
    String? actionRoute,
  });
}

/// @nodoc
class _$DashboardAlertCopyWithImpl<$Res, $Val extends DashboardAlert>
    implements $DashboardAlertCopyWith<$Res> {
  _$DashboardAlertCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of DashboardAlert
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? message = null,
    Object? severity = null,
    Object? type = null,
    Object? date = freezed,
    Object? actionRoute = freezed,
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
            message: null == message
                ? _value.message
                : message // ignore: cast_nullable_to_non_nullable
                      as String,
            severity: null == severity
                ? _value.severity
                : severity // ignore: cast_nullable_to_non_nullable
                      as AlertSeverity,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as AlertType,
            date: freezed == date
                ? _value.date
                : date // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            actionRoute: freezed == actionRoute
                ? _value.actionRoute
                : actionRoute // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$DashboardAlertImplCopyWith<$Res>
    implements $DashboardAlertCopyWith<$Res> {
  factory _$$DashboardAlertImplCopyWith(
    _$DashboardAlertImpl value,
    $Res Function(_$DashboardAlertImpl) then,
  ) = __$$DashboardAlertImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String title,
    String message,
    AlertSeverity severity,
    AlertType type,
    DateTime? date,
    String? actionRoute,
  });
}

/// @nodoc
class __$$DashboardAlertImplCopyWithImpl<$Res>
    extends _$DashboardAlertCopyWithImpl<$Res, _$DashboardAlertImpl>
    implements _$$DashboardAlertImplCopyWith<$Res> {
  __$$DashboardAlertImplCopyWithImpl(
    _$DashboardAlertImpl _value,
    $Res Function(_$DashboardAlertImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of DashboardAlert
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? message = null,
    Object? severity = null,
    Object? type = null,
    Object? date = freezed,
    Object? actionRoute = freezed,
  }) {
    return _then(
      _$DashboardAlertImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        message: null == message
            ? _value.message
            : message // ignore: cast_nullable_to_non_nullable
                  as String,
        severity: null == severity
            ? _value.severity
            : severity // ignore: cast_nullable_to_non_nullable
                  as AlertSeverity,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as AlertType,
        date: freezed == date
            ? _value.date
            : date // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        actionRoute: freezed == actionRoute
            ? _value.actionRoute
            : actionRoute // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc

class _$DashboardAlertImpl implements _DashboardAlert {
  const _$DashboardAlertImpl({
    required this.id,
    required this.title,
    required this.message,
    required this.severity,
    required this.type,
    this.date,
    this.actionRoute,
  });

  @override
  final String id;
  @override
  final String title;
  @override
  final String message;
  @override
  final AlertSeverity severity;
  @override
  final AlertType type;
  @override
  final DateTime? date;
  @override
  final String? actionRoute;

  @override
  String toString() {
    return 'DashboardAlert(id: $id, title: $title, message: $message, severity: $severity, type: $type, date: $date, actionRoute: $actionRoute)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$DashboardAlertImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.message, message) || other.message == message) &&
            (identical(other.severity, severity) ||
                other.severity == severity) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.date, date) || other.date == date) &&
            (identical(other.actionRoute, actionRoute) ||
                other.actionRoute == actionRoute));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    title,
    message,
    severity,
    type,
    date,
    actionRoute,
  );

  /// Create a copy of DashboardAlert
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$DashboardAlertImplCopyWith<_$DashboardAlertImpl> get copyWith =>
      __$$DashboardAlertImplCopyWithImpl<_$DashboardAlertImpl>(
        this,
        _$identity,
      );
}

abstract class _DashboardAlert implements DashboardAlert {
  const factory _DashboardAlert({
    required final String id,
    required final String title,
    required final String message,
    required final AlertSeverity severity,
    required final AlertType type,
    final DateTime? date,
    final String? actionRoute,
  }) = _$DashboardAlertImpl;

  @override
  String get id;
  @override
  String get title;
  @override
  String get message;
  @override
  AlertSeverity get severity;
  @override
  AlertType get type;
  @override
  DateTime? get date;
  @override
  String? get actionRoute;

  /// Create a copy of DashboardAlert
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$DashboardAlertImplCopyWith<_$DashboardAlertImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$ExecutiveDashboardState {
  List<DashboardAlert> get alerts => throw _privateConstructorUsedError;
  bool get isLoading => throw _privateConstructorUsedError;
  String? get error =>
      throw _privateConstructorUsedError; // Add KPI data holders here if we want them dynamic later
  double get averageNdvi => throw _privateConstructorUsedError;
  int get overdueOccurrencesCount => throw _privateConstructorUsedError;
  int get todayEventsCount => throw _privateConstructorUsedError;
  List<Map<String, dynamic>> get teamProductivity =>
      throw _privateConstructorUsedError;
  Map<String, dynamic> get summaryData => throw _privateConstructorUsedError;
  List<Map<String, dynamic>> get goals => throw _privateConstructorUsedError;

  /// Create a copy of ExecutiveDashboardState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ExecutiveDashboardStateCopyWith<ExecutiveDashboardState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ExecutiveDashboardStateCopyWith<$Res> {
  factory $ExecutiveDashboardStateCopyWith(
    ExecutiveDashboardState value,
    $Res Function(ExecutiveDashboardState) then,
  ) = _$ExecutiveDashboardStateCopyWithImpl<$Res, ExecutiveDashboardState>;
  @useResult
  $Res call({
    List<DashboardAlert> alerts,
    bool isLoading,
    String? error,
    double averageNdvi,
    int overdueOccurrencesCount,
    int todayEventsCount,
    List<Map<String, dynamic>> teamProductivity,
    Map<String, dynamic> summaryData,
    List<Map<String, dynamic>> goals,
  });
}

/// @nodoc
class _$ExecutiveDashboardStateCopyWithImpl<
  $Res,
  $Val extends ExecutiveDashboardState
>
    implements $ExecutiveDashboardStateCopyWith<$Res> {
  _$ExecutiveDashboardStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ExecutiveDashboardState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? alerts = null,
    Object? isLoading = null,
    Object? error = freezed,
    Object? averageNdvi = null,
    Object? overdueOccurrencesCount = null,
    Object? todayEventsCount = null,
    Object? teamProductivity = null,
    Object? summaryData = null,
    Object? goals = null,
  }) {
    return _then(
      _value.copyWith(
            alerts: null == alerts
                ? _value.alerts
                : alerts // ignore: cast_nullable_to_non_nullable
                      as List<DashboardAlert>,
            isLoading: null == isLoading
                ? _value.isLoading
                : isLoading // ignore: cast_nullable_to_non_nullable
                      as bool,
            error: freezed == error
                ? _value.error
                : error // ignore: cast_nullable_to_non_nullable
                      as String?,
            averageNdvi: null == averageNdvi
                ? _value.averageNdvi
                : averageNdvi // ignore: cast_nullable_to_non_nullable
                      as double,
            overdueOccurrencesCount: null == overdueOccurrencesCount
                ? _value.overdueOccurrencesCount
                : overdueOccurrencesCount // ignore: cast_nullable_to_non_nullable
                      as int,
            todayEventsCount: null == todayEventsCount
                ? _value.todayEventsCount
                : todayEventsCount // ignore: cast_nullable_to_non_nullable
                      as int,
            teamProductivity: null == teamProductivity
                ? _value.teamProductivity
                : teamProductivity // ignore: cast_nullable_to_non_nullable
                      as List<Map<String, dynamic>>,
            summaryData: null == summaryData
                ? _value.summaryData
                : summaryData // ignore: cast_nullable_to_non_nullable
                      as Map<String, dynamic>,
            goals: null == goals
                ? _value.goals
                : goals // ignore: cast_nullable_to_non_nullable
                      as List<Map<String, dynamic>>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ExecutiveDashboardStateImplCopyWith<$Res>
    implements $ExecutiveDashboardStateCopyWith<$Res> {
  factory _$$ExecutiveDashboardStateImplCopyWith(
    _$ExecutiveDashboardStateImpl value,
    $Res Function(_$ExecutiveDashboardStateImpl) then,
  ) = __$$ExecutiveDashboardStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    List<DashboardAlert> alerts,
    bool isLoading,
    String? error,
    double averageNdvi,
    int overdueOccurrencesCount,
    int todayEventsCount,
    List<Map<String, dynamic>> teamProductivity,
    Map<String, dynamic> summaryData,
    List<Map<String, dynamic>> goals,
  });
}

/// @nodoc
class __$$ExecutiveDashboardStateImplCopyWithImpl<$Res>
    extends
        _$ExecutiveDashboardStateCopyWithImpl<
          $Res,
          _$ExecutiveDashboardStateImpl
        >
    implements _$$ExecutiveDashboardStateImplCopyWith<$Res> {
  __$$ExecutiveDashboardStateImplCopyWithImpl(
    _$ExecutiveDashboardStateImpl _value,
    $Res Function(_$ExecutiveDashboardStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ExecutiveDashboardState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? alerts = null,
    Object? isLoading = null,
    Object? error = freezed,
    Object? averageNdvi = null,
    Object? overdueOccurrencesCount = null,
    Object? todayEventsCount = null,
    Object? teamProductivity = null,
    Object? summaryData = null,
    Object? goals = null,
  }) {
    return _then(
      _$ExecutiveDashboardStateImpl(
        alerts: null == alerts
            ? _value._alerts
            : alerts // ignore: cast_nullable_to_non_nullable
                  as List<DashboardAlert>,
        isLoading: null == isLoading
            ? _value.isLoading
            : isLoading // ignore: cast_nullable_to_non_nullable
                  as bool,
        error: freezed == error
            ? _value.error
            : error // ignore: cast_nullable_to_non_nullable
                  as String?,
        averageNdvi: null == averageNdvi
            ? _value.averageNdvi
            : averageNdvi // ignore: cast_nullable_to_non_nullable
                  as double,
        overdueOccurrencesCount: null == overdueOccurrencesCount
            ? _value.overdueOccurrencesCount
            : overdueOccurrencesCount // ignore: cast_nullable_to_non_nullable
                  as int,
        todayEventsCount: null == todayEventsCount
            ? _value.todayEventsCount
            : todayEventsCount // ignore: cast_nullable_to_non_nullable
                  as int,
        teamProductivity: null == teamProductivity
            ? _value._teamProductivity
            : teamProductivity // ignore: cast_nullable_to_non_nullable
                  as List<Map<String, dynamic>>,
        summaryData: null == summaryData
            ? _value._summaryData
            : summaryData // ignore: cast_nullable_to_non_nullable
                  as Map<String, dynamic>,
        goals: null == goals
            ? _value._goals
            : goals // ignore: cast_nullable_to_non_nullable
                  as List<Map<String, dynamic>>,
      ),
    );
  }
}

/// @nodoc

class _$ExecutiveDashboardStateImpl implements _ExecutiveDashboardState {
  const _$ExecutiveDashboardStateImpl({
    final List<DashboardAlert> alerts = const [],
    this.isLoading = true,
    this.error = null,
    this.averageNdvi = 0.0,
    this.overdueOccurrencesCount = 0,
    this.todayEventsCount = 0,
    final List<Map<String, dynamic>> teamProductivity = const [],
    final Map<String, dynamic> summaryData = const {},
    final List<Map<String, dynamic>> goals = const [],
  }) : _alerts = alerts,
       _teamProductivity = teamProductivity,
       _summaryData = summaryData,
       _goals = goals;

  final List<DashboardAlert> _alerts;
  @override
  @JsonKey()
  List<DashboardAlert> get alerts {
    if (_alerts is EqualUnmodifiableListView) return _alerts;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_alerts);
  }

  @override
  @JsonKey()
  final bool isLoading;
  @override
  @JsonKey()
  final String? error;
  // Add KPI data holders here if we want them dynamic later
  @override
  @JsonKey()
  final double averageNdvi;
  @override
  @JsonKey()
  final int overdueOccurrencesCount;
  @override
  @JsonKey()
  final int todayEventsCount;
  final List<Map<String, dynamic>> _teamProductivity;
  @override
  @JsonKey()
  List<Map<String, dynamic>> get teamProductivity {
    if (_teamProductivity is EqualUnmodifiableListView)
      return _teamProductivity;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_teamProductivity);
  }

  final Map<String, dynamic> _summaryData;
  @override
  @JsonKey()
  Map<String, dynamic> get summaryData {
    if (_summaryData is EqualUnmodifiableMapView) return _summaryData;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_summaryData);
  }

  final List<Map<String, dynamic>> _goals;
  @override
  @JsonKey()
  List<Map<String, dynamic>> get goals {
    if (_goals is EqualUnmodifiableListView) return _goals;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_goals);
  }

  @override
  String toString() {
    return 'ExecutiveDashboardState(alerts: $alerts, isLoading: $isLoading, error: $error, averageNdvi: $averageNdvi, overdueOccurrencesCount: $overdueOccurrencesCount, todayEventsCount: $todayEventsCount, teamProductivity: $teamProductivity, summaryData: $summaryData, goals: $goals)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ExecutiveDashboardStateImpl &&
            const DeepCollectionEquality().equals(other._alerts, _alerts) &&
            (identical(other.isLoading, isLoading) ||
                other.isLoading == isLoading) &&
            (identical(other.error, error) || other.error == error) &&
            (identical(other.averageNdvi, averageNdvi) ||
                other.averageNdvi == averageNdvi) &&
            (identical(
                  other.overdueOccurrencesCount,
                  overdueOccurrencesCount,
                ) ||
                other.overdueOccurrencesCount == overdueOccurrencesCount) &&
            (identical(other.todayEventsCount, todayEventsCount) ||
                other.todayEventsCount == todayEventsCount) &&
            const DeepCollectionEquality().equals(
              other._teamProductivity,
              _teamProductivity,
            ) &&
            const DeepCollectionEquality().equals(
              other._summaryData,
              _summaryData,
            ) &&
            const DeepCollectionEquality().equals(other._goals, _goals));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_alerts),
    isLoading,
    error,
    averageNdvi,
    overdueOccurrencesCount,
    todayEventsCount,
    const DeepCollectionEquality().hash(_teamProductivity),
    const DeepCollectionEquality().hash(_summaryData),
    const DeepCollectionEquality().hash(_goals),
  );

  /// Create a copy of ExecutiveDashboardState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ExecutiveDashboardStateImplCopyWith<_$ExecutiveDashboardStateImpl>
  get copyWith =>
      __$$ExecutiveDashboardStateImplCopyWithImpl<
        _$ExecutiveDashboardStateImpl
      >(this, _$identity);
}

abstract class _ExecutiveDashboardState implements ExecutiveDashboardState {
  const factory _ExecutiveDashboardState({
    final List<DashboardAlert> alerts,
    final bool isLoading,
    final String? error,
    final double averageNdvi,
    final int overdueOccurrencesCount,
    final int todayEventsCount,
    final List<Map<String, dynamic>> teamProductivity,
    final Map<String, dynamic> summaryData,
    final List<Map<String, dynamic>> goals,
  }) = _$ExecutiveDashboardStateImpl;

  @override
  List<DashboardAlert> get alerts;
  @override
  bool get isLoading;
  @override
  String? get error; // Add KPI data holders here if we want them dynamic later
  @override
  double get averageNdvi;
  @override
  int get overdueOccurrencesCount;
  @override
  int get todayEventsCount;
  @override
  List<Map<String, dynamic>> get teamProductivity;
  @override
  Map<String, dynamic> get summaryData;
  @override
  List<Map<String, dynamic>> get goals;

  /// Create a copy of ExecutiveDashboardState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ExecutiveDashboardStateImplCopyWith<_$ExecutiveDashboardStateImpl>
  get copyWith => throw _privateConstructorUsedError;
}
