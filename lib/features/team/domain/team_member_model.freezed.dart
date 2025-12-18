// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'team_member_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

TeamMemberLocation _$TeamMemberLocationFromJson(Map<String, dynamic> json) {
  return _TeamMemberLocation.fromJson(json);
}

/// @nodoc
mixin _$TeamMemberLocation {
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;
  DateTime get lastUpdate => throw _privateConstructorUsedError;
  int get batteryLevel => throw _privateConstructorUsedError;
  double get speed => throw _privateConstructorUsedError; // km/h
  double get heading => throw _privateConstructorUsedError;
  bool get isGpsEnabled => throw _privateConstructorUsedError;

  /// Serializes this TeamMemberLocation to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TeamMemberLocation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TeamMemberLocationCopyWith<TeamMemberLocation> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TeamMemberLocationCopyWith<$Res> {
  factory $TeamMemberLocationCopyWith(
    TeamMemberLocation value,
    $Res Function(TeamMemberLocation) then,
  ) = _$TeamMemberLocationCopyWithImpl<$Res, TeamMemberLocation>;
  @useResult
  $Res call({
    double latitude,
    double longitude,
    DateTime lastUpdate,
    int batteryLevel,
    double speed,
    double heading,
    bool isGpsEnabled,
  });
}

/// @nodoc
class _$TeamMemberLocationCopyWithImpl<$Res, $Val extends TeamMemberLocation>
    implements $TeamMemberLocationCopyWith<$Res> {
  _$TeamMemberLocationCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TeamMemberLocation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? latitude = null,
    Object? longitude = null,
    Object? lastUpdate = null,
    Object? batteryLevel = null,
    Object? speed = null,
    Object? heading = null,
    Object? isGpsEnabled = null,
  }) {
    return _then(
      _value.copyWith(
            latitude: null == latitude
                ? _value.latitude
                : latitude // ignore: cast_nullable_to_non_nullable
                      as double,
            longitude: null == longitude
                ? _value.longitude
                : longitude // ignore: cast_nullable_to_non_nullable
                      as double,
            lastUpdate: null == lastUpdate
                ? _value.lastUpdate
                : lastUpdate // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            batteryLevel: null == batteryLevel
                ? _value.batteryLevel
                : batteryLevel // ignore: cast_nullable_to_non_nullable
                      as int,
            speed: null == speed
                ? _value.speed
                : speed // ignore: cast_nullable_to_non_nullable
                      as double,
            heading: null == heading
                ? _value.heading
                : heading // ignore: cast_nullable_to_non_nullable
                      as double,
            isGpsEnabled: null == isGpsEnabled
                ? _value.isGpsEnabled
                : isGpsEnabled // ignore: cast_nullable_to_non_nullable
                      as bool,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TeamMemberLocationImplCopyWith<$Res>
    implements $TeamMemberLocationCopyWith<$Res> {
  factory _$$TeamMemberLocationImplCopyWith(
    _$TeamMemberLocationImpl value,
    $Res Function(_$TeamMemberLocationImpl) then,
  ) = __$$TeamMemberLocationImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    double latitude,
    double longitude,
    DateTime lastUpdate,
    int batteryLevel,
    double speed,
    double heading,
    bool isGpsEnabled,
  });
}

/// @nodoc
class __$$TeamMemberLocationImplCopyWithImpl<$Res>
    extends _$TeamMemberLocationCopyWithImpl<$Res, _$TeamMemberLocationImpl>
    implements _$$TeamMemberLocationImplCopyWith<$Res> {
  __$$TeamMemberLocationImplCopyWithImpl(
    _$TeamMemberLocationImpl _value,
    $Res Function(_$TeamMemberLocationImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TeamMemberLocation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? latitude = null,
    Object? longitude = null,
    Object? lastUpdate = null,
    Object? batteryLevel = null,
    Object? speed = null,
    Object? heading = null,
    Object? isGpsEnabled = null,
  }) {
    return _then(
      _$TeamMemberLocationImpl(
        latitude: null == latitude
            ? _value.latitude
            : latitude // ignore: cast_nullable_to_non_nullable
                  as double,
        longitude: null == longitude
            ? _value.longitude
            : longitude // ignore: cast_nullable_to_non_nullable
                  as double,
        lastUpdate: null == lastUpdate
            ? _value.lastUpdate
            : lastUpdate // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        batteryLevel: null == batteryLevel
            ? _value.batteryLevel
            : batteryLevel // ignore: cast_nullable_to_non_nullable
                  as int,
        speed: null == speed
            ? _value.speed
            : speed // ignore: cast_nullable_to_non_nullable
                  as double,
        heading: null == heading
            ? _value.heading
            : heading // ignore: cast_nullable_to_non_nullable
                  as double,
        isGpsEnabled: null == isGpsEnabled
            ? _value.isGpsEnabled
            : isGpsEnabled // ignore: cast_nullable_to_non_nullable
                  as bool,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TeamMemberLocationImpl
    with DiagnosticableTreeMixin
    implements _TeamMemberLocation {
  const _$TeamMemberLocationImpl({
    required this.latitude,
    required this.longitude,
    required this.lastUpdate,
    this.batteryLevel = 0,
    this.speed = 0.0,
    this.heading = 0.0,
    this.isGpsEnabled = true,
  });

  factory _$TeamMemberLocationImpl.fromJson(Map<String, dynamic> json) =>
      _$$TeamMemberLocationImplFromJson(json);

  @override
  final double latitude;
  @override
  final double longitude;
  @override
  final DateTime lastUpdate;
  @override
  @JsonKey()
  final int batteryLevel;
  @override
  @JsonKey()
  final double speed;
  // km/h
  @override
  @JsonKey()
  final double heading;
  @override
  @JsonKey()
  final bool isGpsEnabled;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'TeamMemberLocation(latitude: $latitude, longitude: $longitude, lastUpdate: $lastUpdate, batteryLevel: $batteryLevel, speed: $speed, heading: $heading, isGpsEnabled: $isGpsEnabled)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'TeamMemberLocation'))
      ..add(DiagnosticsProperty('latitude', latitude))
      ..add(DiagnosticsProperty('longitude', longitude))
      ..add(DiagnosticsProperty('lastUpdate', lastUpdate))
      ..add(DiagnosticsProperty('batteryLevel', batteryLevel))
      ..add(DiagnosticsProperty('speed', speed))
      ..add(DiagnosticsProperty('heading', heading))
      ..add(DiagnosticsProperty('isGpsEnabled', isGpsEnabled));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TeamMemberLocationImpl &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.lastUpdate, lastUpdate) ||
                other.lastUpdate == lastUpdate) &&
            (identical(other.batteryLevel, batteryLevel) ||
                other.batteryLevel == batteryLevel) &&
            (identical(other.speed, speed) || other.speed == speed) &&
            (identical(other.heading, heading) || other.heading == heading) &&
            (identical(other.isGpsEnabled, isGpsEnabled) ||
                other.isGpsEnabled == isGpsEnabled));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    latitude,
    longitude,
    lastUpdate,
    batteryLevel,
    speed,
    heading,
    isGpsEnabled,
  );

  /// Create a copy of TeamMemberLocation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TeamMemberLocationImplCopyWith<_$TeamMemberLocationImpl> get copyWith =>
      __$$TeamMemberLocationImplCopyWithImpl<_$TeamMemberLocationImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$TeamMemberLocationImplToJson(this);
  }
}

abstract class _TeamMemberLocation implements TeamMemberLocation {
  const factory _TeamMemberLocation({
    required final double latitude,
    required final double longitude,
    required final DateTime lastUpdate,
    final int batteryLevel,
    final double speed,
    final double heading,
    final bool isGpsEnabled,
  }) = _$TeamMemberLocationImpl;

  factory _TeamMemberLocation.fromJson(Map<String, dynamic> json) =
      _$TeamMemberLocationImpl.fromJson;

  @override
  double get latitude;
  @override
  double get longitude;
  @override
  DateTime get lastUpdate;
  @override
  int get batteryLevel;
  @override
  double get speed; // km/h
  @override
  double get heading;
  @override
  bool get isGpsEnabled;

  /// Create a copy of TeamMemberLocation
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TeamMemberLocationImplCopyWith<_$TeamMemberLocationImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

TeamMemberStats _$TeamMemberStatsFromJson(Map<String, dynamic> json) {
  return _TeamMemberStats.fromJson(json);
}

/// @nodoc
mixin _$TeamMemberStats {
  int get visitsThisMonth => throw _privateConstructorUsedError;
  int get activeTickets => throw _privateConstructorUsedError;
  double get averageRating => throw _privateConstructorUsedError;
  double get distanceTraveledKm => throw _privateConstructorUsedError; // km
  int get reportsSubmitted =>
      throw _privateConstructorUsedError; // Gamification
  int get experiencePoints => throw _privateConstructorUsedError;
  int get level => throw _privateConstructorUsedError;
  List<String> get badges => throw _privateConstructorUsedError;

  /// Serializes this TeamMemberStats to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TeamMemberStats
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TeamMemberStatsCopyWith<TeamMemberStats> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TeamMemberStatsCopyWith<$Res> {
  factory $TeamMemberStatsCopyWith(
    TeamMemberStats value,
    $Res Function(TeamMemberStats) then,
  ) = _$TeamMemberStatsCopyWithImpl<$Res, TeamMemberStats>;
  @useResult
  $Res call({
    int visitsThisMonth,
    int activeTickets,
    double averageRating,
    double distanceTraveledKm,
    int reportsSubmitted,
    int experiencePoints,
    int level,
    List<String> badges,
  });
}

/// @nodoc
class _$TeamMemberStatsCopyWithImpl<$Res, $Val extends TeamMemberStats>
    implements $TeamMemberStatsCopyWith<$Res> {
  _$TeamMemberStatsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TeamMemberStats
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? visitsThisMonth = null,
    Object? activeTickets = null,
    Object? averageRating = null,
    Object? distanceTraveledKm = null,
    Object? reportsSubmitted = null,
    Object? experiencePoints = null,
    Object? level = null,
    Object? badges = null,
  }) {
    return _then(
      _value.copyWith(
            visitsThisMonth: null == visitsThisMonth
                ? _value.visitsThisMonth
                : visitsThisMonth // ignore: cast_nullable_to_non_nullable
                      as int,
            activeTickets: null == activeTickets
                ? _value.activeTickets
                : activeTickets // ignore: cast_nullable_to_non_nullable
                      as int,
            averageRating: null == averageRating
                ? _value.averageRating
                : averageRating // ignore: cast_nullable_to_non_nullable
                      as double,
            distanceTraveledKm: null == distanceTraveledKm
                ? _value.distanceTraveledKm
                : distanceTraveledKm // ignore: cast_nullable_to_non_nullable
                      as double,
            reportsSubmitted: null == reportsSubmitted
                ? _value.reportsSubmitted
                : reportsSubmitted // ignore: cast_nullable_to_non_nullable
                      as int,
            experiencePoints: null == experiencePoints
                ? _value.experiencePoints
                : experiencePoints // ignore: cast_nullable_to_non_nullable
                      as int,
            level: null == level
                ? _value.level
                : level // ignore: cast_nullable_to_non_nullable
                      as int,
            badges: null == badges
                ? _value.badges
                : badges // ignore: cast_nullable_to_non_nullable
                      as List<String>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TeamMemberStatsImplCopyWith<$Res>
    implements $TeamMemberStatsCopyWith<$Res> {
  factory _$$TeamMemberStatsImplCopyWith(
    _$TeamMemberStatsImpl value,
    $Res Function(_$TeamMemberStatsImpl) then,
  ) = __$$TeamMemberStatsImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    int visitsThisMonth,
    int activeTickets,
    double averageRating,
    double distanceTraveledKm,
    int reportsSubmitted,
    int experiencePoints,
    int level,
    List<String> badges,
  });
}

/// @nodoc
class __$$TeamMemberStatsImplCopyWithImpl<$Res>
    extends _$TeamMemberStatsCopyWithImpl<$Res, _$TeamMemberStatsImpl>
    implements _$$TeamMemberStatsImplCopyWith<$Res> {
  __$$TeamMemberStatsImplCopyWithImpl(
    _$TeamMemberStatsImpl _value,
    $Res Function(_$TeamMemberStatsImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TeamMemberStats
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? visitsThisMonth = null,
    Object? activeTickets = null,
    Object? averageRating = null,
    Object? distanceTraveledKm = null,
    Object? reportsSubmitted = null,
    Object? experiencePoints = null,
    Object? level = null,
    Object? badges = null,
  }) {
    return _then(
      _$TeamMemberStatsImpl(
        visitsThisMonth: null == visitsThisMonth
            ? _value.visitsThisMonth
            : visitsThisMonth // ignore: cast_nullable_to_non_nullable
                  as int,
        activeTickets: null == activeTickets
            ? _value.activeTickets
            : activeTickets // ignore: cast_nullable_to_non_nullable
                  as int,
        averageRating: null == averageRating
            ? _value.averageRating
            : averageRating // ignore: cast_nullable_to_non_nullable
                  as double,
        distanceTraveledKm: null == distanceTraveledKm
            ? _value.distanceTraveledKm
            : distanceTraveledKm // ignore: cast_nullable_to_non_nullable
                  as double,
        reportsSubmitted: null == reportsSubmitted
            ? _value.reportsSubmitted
            : reportsSubmitted // ignore: cast_nullable_to_non_nullable
                  as int,
        experiencePoints: null == experiencePoints
            ? _value.experiencePoints
            : experiencePoints // ignore: cast_nullable_to_non_nullable
                  as int,
        level: null == level
            ? _value.level
            : level // ignore: cast_nullable_to_non_nullable
                  as int,
        badges: null == badges
            ? _value._badges
            : badges // ignore: cast_nullable_to_non_nullable
                  as List<String>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TeamMemberStatsImpl
    with DiagnosticableTreeMixin
    implements _TeamMemberStats {
  const _$TeamMemberStatsImpl({
    this.visitsThisMonth = 0,
    this.activeTickets = 0,
    this.averageRating = 0.0,
    this.distanceTraveledKm = 0.0,
    this.reportsSubmitted = 0,
    this.experiencePoints = 0,
    this.level = 1,
    final List<String> badges = const [],
  }) : _badges = badges;

  factory _$TeamMemberStatsImpl.fromJson(Map<String, dynamic> json) =>
      _$$TeamMemberStatsImplFromJson(json);

  @override
  @JsonKey()
  final int visitsThisMonth;
  @override
  @JsonKey()
  final int activeTickets;
  @override
  @JsonKey()
  final double averageRating;
  @override
  @JsonKey()
  final double distanceTraveledKm;
  // km
  @override
  @JsonKey()
  final int reportsSubmitted;
  // Gamification
  @override
  @JsonKey()
  final int experiencePoints;
  @override
  @JsonKey()
  final int level;
  final List<String> _badges;
  @override
  @JsonKey()
  List<String> get badges {
    if (_badges is EqualUnmodifiableListView) return _badges;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_badges);
  }

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'TeamMemberStats(visitsThisMonth: $visitsThisMonth, activeTickets: $activeTickets, averageRating: $averageRating, distanceTraveledKm: $distanceTraveledKm, reportsSubmitted: $reportsSubmitted, experiencePoints: $experiencePoints, level: $level, badges: $badges)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'TeamMemberStats'))
      ..add(DiagnosticsProperty('visitsThisMonth', visitsThisMonth))
      ..add(DiagnosticsProperty('activeTickets', activeTickets))
      ..add(DiagnosticsProperty('averageRating', averageRating))
      ..add(DiagnosticsProperty('distanceTraveledKm', distanceTraveledKm))
      ..add(DiagnosticsProperty('reportsSubmitted', reportsSubmitted))
      ..add(DiagnosticsProperty('experiencePoints', experiencePoints))
      ..add(DiagnosticsProperty('level', level))
      ..add(DiagnosticsProperty('badges', badges));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TeamMemberStatsImpl &&
            (identical(other.visitsThisMonth, visitsThisMonth) ||
                other.visitsThisMonth == visitsThisMonth) &&
            (identical(other.activeTickets, activeTickets) ||
                other.activeTickets == activeTickets) &&
            (identical(other.averageRating, averageRating) ||
                other.averageRating == averageRating) &&
            (identical(other.distanceTraveledKm, distanceTraveledKm) ||
                other.distanceTraveledKm == distanceTraveledKm) &&
            (identical(other.reportsSubmitted, reportsSubmitted) ||
                other.reportsSubmitted == reportsSubmitted) &&
            (identical(other.experiencePoints, experiencePoints) ||
                other.experiencePoints == experiencePoints) &&
            (identical(other.level, level) || other.level == level) &&
            const DeepCollectionEquality().equals(other._badges, _badges));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    visitsThisMonth,
    activeTickets,
    averageRating,
    distanceTraveledKm,
    reportsSubmitted,
    experiencePoints,
    level,
    const DeepCollectionEquality().hash(_badges),
  );

  /// Create a copy of TeamMemberStats
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TeamMemberStatsImplCopyWith<_$TeamMemberStatsImpl> get copyWith =>
      __$$TeamMemberStatsImplCopyWithImpl<_$TeamMemberStatsImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$TeamMemberStatsImplToJson(this);
  }
}

abstract class _TeamMemberStats implements TeamMemberStats {
  const factory _TeamMemberStats({
    final int visitsThisMonth,
    final int activeTickets,
    final double averageRating,
    final double distanceTraveledKm,
    final int reportsSubmitted,
    final int experiencePoints,
    final int level,
    final List<String> badges,
  }) = _$TeamMemberStatsImpl;

  factory _TeamMemberStats.fromJson(Map<String, dynamic> json) =
      _$TeamMemberStatsImpl.fromJson;

  @override
  int get visitsThisMonth;
  @override
  int get activeTickets;
  @override
  double get averageRating;
  @override
  double get distanceTraveledKm; // km
  @override
  int get reportsSubmitted; // Gamification
  @override
  int get experiencePoints;
  @override
  int get level;
  @override
  List<String> get badges;

  /// Create a copy of TeamMemberStats
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TeamMemberStatsImplCopyWith<_$TeamMemberStatsImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

TeamMember _$TeamMemberFromJson(Map<String, dynamic> json) {
  return _TeamMember.fromJson(json);
}

/// @nodoc
mixin _$TeamMember {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get email => throw _privateConstructorUsedError;
  String? get avatarUrl => throw _privateConstructorUsedError;
  String? get phoneNumber => throw _privateConstructorUsedError;
  TeamMemberRole get role => throw _privateConstructorUsedError;
  TeamMemberStatus get status =>
      throw _privateConstructorUsedError; // Áreas de Responsabilidade (IDs de Fazendas ou Talhões)
  List<String> get assignedAreaIds =>
      throw _privateConstructorUsedError; // Metadados de Rastreamento (Opcional, pois pode não ter localização recente)
  TeamMemberLocation? get lastLocation =>
      throw _privateConstructorUsedError; // Estatísticas de Desempenho
  TeamMemberStats get stats => throw _privateConstructorUsedError; // Metadata
  DateTime? get lastActiveAt => throw _privateConstructorUsedError;
  DateTime? get joinedAt => throw _privateConstructorUsedError;

  /// Serializes this TeamMember to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TeamMember
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TeamMemberCopyWith<TeamMember> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TeamMemberCopyWith<$Res> {
  factory $TeamMemberCopyWith(
    TeamMember value,
    $Res Function(TeamMember) then,
  ) = _$TeamMemberCopyWithImpl<$Res, TeamMember>;
  @useResult
  $Res call({
    String id,
    String name,
    String email,
    String? avatarUrl,
    String? phoneNumber,
    TeamMemberRole role,
    TeamMemberStatus status,
    List<String> assignedAreaIds,
    TeamMemberLocation? lastLocation,
    TeamMemberStats stats,
    DateTime? lastActiveAt,
    DateTime? joinedAt,
  });

  $TeamMemberLocationCopyWith<$Res>? get lastLocation;
  $TeamMemberStatsCopyWith<$Res> get stats;
}

/// @nodoc
class _$TeamMemberCopyWithImpl<$Res, $Val extends TeamMember>
    implements $TeamMemberCopyWith<$Res> {
  _$TeamMemberCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TeamMember
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
    Object? avatarUrl = freezed,
    Object? phoneNumber = freezed,
    Object? role = null,
    Object? status = null,
    Object? assignedAreaIds = null,
    Object? lastLocation = freezed,
    Object? stats = null,
    Object? lastActiveAt = freezed,
    Object? joinedAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            email: null == email
                ? _value.email
                : email // ignore: cast_nullable_to_non_nullable
                      as String,
            avatarUrl: freezed == avatarUrl
                ? _value.avatarUrl
                : avatarUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
            phoneNumber: freezed == phoneNumber
                ? _value.phoneNumber
                : phoneNumber // ignore: cast_nullable_to_non_nullable
                      as String?,
            role: null == role
                ? _value.role
                : role // ignore: cast_nullable_to_non_nullable
                      as TeamMemberRole,
            status: null == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as TeamMemberStatus,
            assignedAreaIds: null == assignedAreaIds
                ? _value.assignedAreaIds
                : assignedAreaIds // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            lastLocation: freezed == lastLocation
                ? _value.lastLocation
                : lastLocation // ignore: cast_nullable_to_non_nullable
                      as TeamMemberLocation?,
            stats: null == stats
                ? _value.stats
                : stats // ignore: cast_nullable_to_non_nullable
                      as TeamMemberStats,
            lastActiveAt: freezed == lastActiveAt
                ? _value.lastActiveAt
                : lastActiveAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            joinedAt: freezed == joinedAt
                ? _value.joinedAt
                : joinedAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
          )
          as $Val,
    );
  }

  /// Create a copy of TeamMember
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $TeamMemberLocationCopyWith<$Res>? get lastLocation {
    if (_value.lastLocation == null) {
      return null;
    }

    return $TeamMemberLocationCopyWith<$Res>(_value.lastLocation!, (value) {
      return _then(_value.copyWith(lastLocation: value) as $Val);
    });
  }

  /// Create a copy of TeamMember
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $TeamMemberStatsCopyWith<$Res> get stats {
    return $TeamMemberStatsCopyWith<$Res>(_value.stats, (value) {
      return _then(_value.copyWith(stats: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$TeamMemberImplCopyWith<$Res>
    implements $TeamMemberCopyWith<$Res> {
  factory _$$TeamMemberImplCopyWith(
    _$TeamMemberImpl value,
    $Res Function(_$TeamMemberImpl) then,
  ) = __$$TeamMemberImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String name,
    String email,
    String? avatarUrl,
    String? phoneNumber,
    TeamMemberRole role,
    TeamMemberStatus status,
    List<String> assignedAreaIds,
    TeamMemberLocation? lastLocation,
    TeamMemberStats stats,
    DateTime? lastActiveAt,
    DateTime? joinedAt,
  });

  @override
  $TeamMemberLocationCopyWith<$Res>? get lastLocation;
  @override
  $TeamMemberStatsCopyWith<$Res> get stats;
}

/// @nodoc
class __$$TeamMemberImplCopyWithImpl<$Res>
    extends _$TeamMemberCopyWithImpl<$Res, _$TeamMemberImpl>
    implements _$$TeamMemberImplCopyWith<$Res> {
  __$$TeamMemberImplCopyWithImpl(
    _$TeamMemberImpl _value,
    $Res Function(_$TeamMemberImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TeamMember
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
    Object? avatarUrl = freezed,
    Object? phoneNumber = freezed,
    Object? role = null,
    Object? status = null,
    Object? assignedAreaIds = null,
    Object? lastLocation = freezed,
    Object? stats = null,
    Object? lastActiveAt = freezed,
    Object? joinedAt = freezed,
  }) {
    return _then(
      _$TeamMemberImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        email: null == email
            ? _value.email
            : email // ignore: cast_nullable_to_non_nullable
                  as String,
        avatarUrl: freezed == avatarUrl
            ? _value.avatarUrl
            : avatarUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        phoneNumber: freezed == phoneNumber
            ? _value.phoneNumber
            : phoneNumber // ignore: cast_nullable_to_non_nullable
                  as String?,
        role: null == role
            ? _value.role
            : role // ignore: cast_nullable_to_non_nullable
                  as TeamMemberRole,
        status: null == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as TeamMemberStatus,
        assignedAreaIds: null == assignedAreaIds
            ? _value._assignedAreaIds
            : assignedAreaIds // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        lastLocation: freezed == lastLocation
            ? _value.lastLocation
            : lastLocation // ignore: cast_nullable_to_non_nullable
                  as TeamMemberLocation?,
        stats: null == stats
            ? _value.stats
            : stats // ignore: cast_nullable_to_non_nullable
                  as TeamMemberStats,
        lastActiveAt: freezed == lastActiveAt
            ? _value.lastActiveAt
            : lastActiveAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        joinedAt: freezed == joinedAt
            ? _value.joinedAt
            : joinedAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TeamMemberImpl with DiagnosticableTreeMixin implements _TeamMember {
  const _$TeamMemberImpl({
    required this.id,
    required this.name,
    required this.email,
    this.avatarUrl,
    this.phoneNumber,
    this.role = TeamMemberRole.technician,
    this.status = TeamMemberStatus.offline,
    final List<String> assignedAreaIds = const [],
    this.lastLocation,
    this.stats = const TeamMemberStats(),
    this.lastActiveAt,
    this.joinedAt,
  }) : _assignedAreaIds = assignedAreaIds;

  factory _$TeamMemberImpl.fromJson(Map<String, dynamic> json) =>
      _$$TeamMemberImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String email;
  @override
  final String? avatarUrl;
  @override
  final String? phoneNumber;
  @override
  @JsonKey()
  final TeamMemberRole role;
  @override
  @JsonKey()
  final TeamMemberStatus status;
  // Áreas de Responsabilidade (IDs de Fazendas ou Talhões)
  final List<String> _assignedAreaIds;
  // Áreas de Responsabilidade (IDs de Fazendas ou Talhões)
  @override
  @JsonKey()
  List<String> get assignedAreaIds {
    if (_assignedAreaIds is EqualUnmodifiableListView) return _assignedAreaIds;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_assignedAreaIds);
  }

  // Metadados de Rastreamento (Opcional, pois pode não ter localização recente)
  @override
  final TeamMemberLocation? lastLocation;
  // Estatísticas de Desempenho
  @override
  @JsonKey()
  final TeamMemberStats stats;
  // Metadata
  @override
  final DateTime? lastActiveAt;
  @override
  final DateTime? joinedAt;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'TeamMember(id: $id, name: $name, email: $email, avatarUrl: $avatarUrl, phoneNumber: $phoneNumber, role: $role, status: $status, assignedAreaIds: $assignedAreaIds, lastLocation: $lastLocation, stats: $stats, lastActiveAt: $lastActiveAt, joinedAt: $joinedAt)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'TeamMember'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('name', name))
      ..add(DiagnosticsProperty('email', email))
      ..add(DiagnosticsProperty('avatarUrl', avatarUrl))
      ..add(DiagnosticsProperty('phoneNumber', phoneNumber))
      ..add(DiagnosticsProperty('role', role))
      ..add(DiagnosticsProperty('status', status))
      ..add(DiagnosticsProperty('assignedAreaIds', assignedAreaIds))
      ..add(DiagnosticsProperty('lastLocation', lastLocation))
      ..add(DiagnosticsProperty('stats', stats))
      ..add(DiagnosticsProperty('lastActiveAt', lastActiveAt))
      ..add(DiagnosticsProperty('joinedAt', joinedAt));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TeamMemberImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.avatarUrl, avatarUrl) ||
                other.avatarUrl == avatarUrl) &&
            (identical(other.phoneNumber, phoneNumber) ||
                other.phoneNumber == phoneNumber) &&
            (identical(other.role, role) || other.role == role) &&
            (identical(other.status, status) || other.status == status) &&
            const DeepCollectionEquality().equals(
              other._assignedAreaIds,
              _assignedAreaIds,
            ) &&
            (identical(other.lastLocation, lastLocation) ||
                other.lastLocation == lastLocation) &&
            (identical(other.stats, stats) || other.stats == stats) &&
            (identical(other.lastActiveAt, lastActiveAt) ||
                other.lastActiveAt == lastActiveAt) &&
            (identical(other.joinedAt, joinedAt) ||
                other.joinedAt == joinedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    name,
    email,
    avatarUrl,
    phoneNumber,
    role,
    status,
    const DeepCollectionEquality().hash(_assignedAreaIds),
    lastLocation,
    stats,
    lastActiveAt,
    joinedAt,
  );

  /// Create a copy of TeamMember
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TeamMemberImplCopyWith<_$TeamMemberImpl> get copyWith =>
      __$$TeamMemberImplCopyWithImpl<_$TeamMemberImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$TeamMemberImplToJson(this);
  }
}

abstract class _TeamMember implements TeamMember {
  const factory _TeamMember({
    required final String id,
    required final String name,
    required final String email,
    final String? avatarUrl,
    final String? phoneNumber,
    final TeamMemberRole role,
    final TeamMemberStatus status,
    final List<String> assignedAreaIds,
    final TeamMemberLocation? lastLocation,
    final TeamMemberStats stats,
    final DateTime? lastActiveAt,
    final DateTime? joinedAt,
  }) = _$TeamMemberImpl;

  factory _TeamMember.fromJson(Map<String, dynamic> json) =
      _$TeamMemberImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get email;
  @override
  String? get avatarUrl;
  @override
  String? get phoneNumber;
  @override
  TeamMemberRole get role;
  @override
  TeamMemberStatus get status; // Áreas de Responsabilidade (IDs de Fazendas ou Talhões)
  @override
  List<String> get assignedAreaIds; // Metadados de Rastreamento (Opcional, pois pode não ter localização recente)
  @override
  TeamMemberLocation? get lastLocation; // Estatísticas de Desempenho
  @override
  TeamMemberStats get stats; // Metadata
  @override
  DateTime? get lastActiveAt;
  @override
  DateTime? get joinedAt;

  /// Create a copy of TeamMember
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TeamMemberImplCopyWith<_$TeamMemberImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
