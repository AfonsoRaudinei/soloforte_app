// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'analysis_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Analysis _$AnalysisFromJson(Map<String, dynamic> json) {
  return _Analysis.fromJson(json);
}

/// @nodoc
mixin _$Analysis {
  String get id => throw _privateConstructorUsedError;
  String get code => throw _privateConstructorUsedError; // e.g., AN-2023-001
  Client get client => throw _privateConstructorUsedError; // Snapshot of client
  GeoArea get area => throw _privateConstructorUsedError; // Snapshot of area
  AnalysisType get type => throw _privateConstructorUsedError;
  AnalysisStatus get status => throw _privateConstructorUsedError;
  DateTime get date => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;

  /// Serializes this Analysis to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Analysis
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AnalysisCopyWith<Analysis> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AnalysisCopyWith<$Res> {
  factory $AnalysisCopyWith(Analysis value, $Res Function(Analysis) then) =
      _$AnalysisCopyWithImpl<$Res, Analysis>;
  @useResult
  $Res call({
    String id,
    String code,
    Client client,
    GeoArea area,
    AnalysisType type,
    AnalysisStatus status,
    DateTime date,
    String? notes,
  });

  $ClientCopyWith<$Res> get client;
  $GeoAreaCopyWith<$Res> get area;
}

/// @nodoc
class _$AnalysisCopyWithImpl<$Res, $Val extends Analysis>
    implements $AnalysisCopyWith<$Res> {
  _$AnalysisCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Analysis
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? code = null,
    Object? client = null,
    Object? area = null,
    Object? type = null,
    Object? status = null,
    Object? date = null,
    Object? notes = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            code: null == code
                ? _value.code
                : code // ignore: cast_nullable_to_non_nullable
                      as String,
            client: null == client
                ? _value.client
                : client // ignore: cast_nullable_to_non_nullable
                      as Client,
            area: null == area
                ? _value.area
                : area // ignore: cast_nullable_to_non_nullable
                      as GeoArea,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as AnalysisType,
            status: null == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as AnalysisStatus,
            date: null == date
                ? _value.date
                : date // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            notes: freezed == notes
                ? _value.notes
                : notes // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }

  /// Create a copy of Analysis
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $ClientCopyWith<$Res> get client {
    return $ClientCopyWith<$Res>(_value.client, (value) {
      return _then(_value.copyWith(client: value) as $Val);
    });
  }

  /// Create a copy of Analysis
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $GeoAreaCopyWith<$Res> get area {
    return $GeoAreaCopyWith<$Res>(_value.area, (value) {
      return _then(_value.copyWith(area: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$AnalysisImplCopyWith<$Res>
    implements $AnalysisCopyWith<$Res> {
  factory _$$AnalysisImplCopyWith(
    _$AnalysisImpl value,
    $Res Function(_$AnalysisImpl) then,
  ) = __$$AnalysisImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String code,
    Client client,
    GeoArea area,
    AnalysisType type,
    AnalysisStatus status,
    DateTime date,
    String? notes,
  });

  @override
  $ClientCopyWith<$Res> get client;
  @override
  $GeoAreaCopyWith<$Res> get area;
}

/// @nodoc
class __$$AnalysisImplCopyWithImpl<$Res>
    extends _$AnalysisCopyWithImpl<$Res, _$AnalysisImpl>
    implements _$$AnalysisImplCopyWith<$Res> {
  __$$AnalysisImplCopyWithImpl(
    _$AnalysisImpl _value,
    $Res Function(_$AnalysisImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Analysis
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? code = null,
    Object? client = null,
    Object? area = null,
    Object? type = null,
    Object? status = null,
    Object? date = null,
    Object? notes = freezed,
  }) {
    return _then(
      _$AnalysisImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        code: null == code
            ? _value.code
            : code // ignore: cast_nullable_to_non_nullable
                  as String,
        client: null == client
            ? _value.client
            : client // ignore: cast_nullable_to_non_nullable
                  as Client,
        area: null == area
            ? _value.area
            : area // ignore: cast_nullable_to_non_nullable
                  as GeoArea,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as AnalysisType,
        status: null == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as AnalysisStatus,
        date: null == date
            ? _value.date
            : date // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        notes: freezed == notes
            ? _value.notes
            : notes // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$AnalysisImpl implements _Analysis {
  const _$AnalysisImpl({
    required this.id,
    required this.code,
    required this.client,
    required this.area,
    required this.type,
    required this.status,
    required this.date,
    this.notes,
  });

  factory _$AnalysisImpl.fromJson(Map<String, dynamic> json) =>
      _$$AnalysisImplFromJson(json);

  @override
  final String id;
  @override
  final String code;
  // e.g., AN-2023-001
  @override
  final Client client;
  // Snapshot of client
  @override
  final GeoArea area;
  // Snapshot of area
  @override
  final AnalysisType type;
  @override
  final AnalysisStatus status;
  @override
  final DateTime date;
  @override
  final String? notes;

  @override
  String toString() {
    return 'Analysis(id: $id, code: $code, client: $client, area: $area, type: $type, status: $status, date: $date, notes: $notes)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AnalysisImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.code, code) || other.code == code) &&
            (identical(other.client, client) || other.client == client) &&
            (identical(other.area, area) || other.area == area) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.date, date) || other.date == date) &&
            (identical(other.notes, notes) || other.notes == notes));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    code,
    client,
    area,
    type,
    status,
    date,
    notes,
  );

  /// Create a copy of Analysis
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AnalysisImplCopyWith<_$AnalysisImpl> get copyWith =>
      __$$AnalysisImplCopyWithImpl<_$AnalysisImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AnalysisImplToJson(this);
  }
}

abstract class _Analysis implements Analysis {
  const factory _Analysis({
    required final String id,
    required final String code,
    required final Client client,
    required final GeoArea area,
    required final AnalysisType type,
    required final AnalysisStatus status,
    required final DateTime date,
    final String? notes,
  }) = _$AnalysisImpl;

  factory _Analysis.fromJson(Map<String, dynamic> json) =
      _$AnalysisImpl.fromJson;

  @override
  String get id;
  @override
  String get code; // e.g., AN-2023-001
  @override
  Client get client; // Snapshot of client
  @override
  GeoArea get area; // Snapshot of area
  @override
  AnalysisType get type;
  @override
  AnalysisStatus get status;
  @override
  DateTime get date;
  @override
  String? get notes;

  /// Create a copy of Analysis
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AnalysisImplCopyWith<_$AnalysisImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
