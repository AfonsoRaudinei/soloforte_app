// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'visita_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Visita _$VisitaFromJson(Map<String, dynamic> json) {
  return _Visita.fromJson(json);
}

/// @nodoc
mixin _$Visita {
  String get id => throw _privateConstructorUsedError;
  String get clienteId => throw _privateConstructorUsedError;
  String get fazendaId => throw _privateConstructorUsedError;
  String get clienteNome => throw _privateConstructorUsedError;
  String get fazendaNome => throw _privateConstructorUsedError;
  DateTime get startTime => throw _privateConstructorUsedError;
  DateTime? get endTime => throw _privateConstructorUsedError;
  int? get durationMinutes => throw _privateConstructorUsedError;
  String get status =>
      throw _privateConstructorUsedError; // em_andamento, concluida, cancelada
  String? get observacoes => throw _privateConstructorUsedError;
  List<String>? get fotos => throw _privateConstructorUsedError;
  String? get talhaoId => throw _privateConstructorUsedError;
  String? get talhaoNome => throw _privateConstructorUsedError;

  /// Serializes this Visita to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Visita
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $VisitaCopyWith<Visita> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $VisitaCopyWith<$Res> {
  factory $VisitaCopyWith(Visita value, $Res Function(Visita) then) =
      _$VisitaCopyWithImpl<$Res, Visita>;
  @useResult
  $Res call({
    String id,
    String clienteId,
    String fazendaId,
    String clienteNome,
    String fazendaNome,
    DateTime startTime,
    DateTime? endTime,
    int? durationMinutes,
    String status,
    String? observacoes,
    List<String>? fotos,
    String? talhaoId,
    String? talhaoNome,
  });
}

/// @nodoc
class _$VisitaCopyWithImpl<$Res, $Val extends Visita>
    implements $VisitaCopyWith<$Res> {
  _$VisitaCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Visita
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? clienteId = null,
    Object? fazendaId = null,
    Object? clienteNome = null,
    Object? fazendaNome = null,
    Object? startTime = null,
    Object? endTime = freezed,
    Object? durationMinutes = freezed,
    Object? status = null,
    Object? observacoes = freezed,
    Object? fotos = freezed,
    Object? talhaoId = freezed,
    Object? talhaoNome = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            clienteId: null == clienteId
                ? _value.clienteId
                : clienteId // ignore: cast_nullable_to_non_nullable
                      as String,
            fazendaId: null == fazendaId
                ? _value.fazendaId
                : fazendaId // ignore: cast_nullable_to_non_nullable
                      as String,
            clienteNome: null == clienteNome
                ? _value.clienteNome
                : clienteNome // ignore: cast_nullable_to_non_nullable
                      as String,
            fazendaNome: null == fazendaNome
                ? _value.fazendaNome
                : fazendaNome // ignore: cast_nullable_to_non_nullable
                      as String,
            startTime: null == startTime
                ? _value.startTime
                : startTime // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            endTime: freezed == endTime
                ? _value.endTime
                : endTime // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            durationMinutes: freezed == durationMinutes
                ? _value.durationMinutes
                : durationMinutes // ignore: cast_nullable_to_non_nullable
                      as int?,
            status: null == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String,
            observacoes: freezed == observacoes
                ? _value.observacoes
                : observacoes // ignore: cast_nullable_to_non_nullable
                      as String?,
            fotos: freezed == fotos
                ? _value.fotos
                : fotos // ignore: cast_nullable_to_non_nullable
                      as List<String>?,
            talhaoId: freezed == talhaoId
                ? _value.talhaoId
                : talhaoId // ignore: cast_nullable_to_non_nullable
                      as String?,
            talhaoNome: freezed == talhaoNome
                ? _value.talhaoNome
                : talhaoNome // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$VisitaImplCopyWith<$Res> implements $VisitaCopyWith<$Res> {
  factory _$$VisitaImplCopyWith(
    _$VisitaImpl value,
    $Res Function(_$VisitaImpl) then,
  ) = __$$VisitaImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String clienteId,
    String fazendaId,
    String clienteNome,
    String fazendaNome,
    DateTime startTime,
    DateTime? endTime,
    int? durationMinutes,
    String status,
    String? observacoes,
    List<String>? fotos,
    String? talhaoId,
    String? talhaoNome,
  });
}

/// @nodoc
class __$$VisitaImplCopyWithImpl<$Res>
    extends _$VisitaCopyWithImpl<$Res, _$VisitaImpl>
    implements _$$VisitaImplCopyWith<$Res> {
  __$$VisitaImplCopyWithImpl(
    _$VisitaImpl _value,
    $Res Function(_$VisitaImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Visita
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? clienteId = null,
    Object? fazendaId = null,
    Object? clienteNome = null,
    Object? fazendaNome = null,
    Object? startTime = null,
    Object? endTime = freezed,
    Object? durationMinutes = freezed,
    Object? status = null,
    Object? observacoes = freezed,
    Object? fotos = freezed,
    Object? talhaoId = freezed,
    Object? talhaoNome = freezed,
  }) {
    return _then(
      _$VisitaImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        clienteId: null == clienteId
            ? _value.clienteId
            : clienteId // ignore: cast_nullable_to_non_nullable
                  as String,
        fazendaId: null == fazendaId
            ? _value.fazendaId
            : fazendaId // ignore: cast_nullable_to_non_nullable
                  as String,
        clienteNome: null == clienteNome
            ? _value.clienteNome
            : clienteNome // ignore: cast_nullable_to_non_nullable
                  as String,
        fazendaNome: null == fazendaNome
            ? _value.fazendaNome
            : fazendaNome // ignore: cast_nullable_to_non_nullable
                  as String,
        startTime: null == startTime
            ? _value.startTime
            : startTime // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        endTime: freezed == endTime
            ? _value.endTime
            : endTime // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        durationMinutes: freezed == durationMinutes
            ? _value.durationMinutes
            : durationMinutes // ignore: cast_nullable_to_non_nullable
                  as int?,
        status: null == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String,
        observacoes: freezed == observacoes
            ? _value.observacoes
            : observacoes // ignore: cast_nullable_to_non_nullable
                  as String?,
        fotos: freezed == fotos
            ? _value._fotos
            : fotos // ignore: cast_nullable_to_non_nullable
                  as List<String>?,
        talhaoId: freezed == talhaoId
            ? _value.talhaoId
            : talhaoId // ignore: cast_nullable_to_non_nullable
                  as String?,
        talhaoNome: freezed == talhaoNome
            ? _value.talhaoNome
            : talhaoNome // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$VisitaImpl implements _Visita {
  const _$VisitaImpl({
    required this.id,
    required this.clienteId,
    required this.fazendaId,
    required this.clienteNome,
    required this.fazendaNome,
    required this.startTime,
    this.endTime,
    this.durationMinutes,
    this.status = 'em_andamento',
    this.observacoes,
    final List<String>? fotos,
    this.talhaoId,
    this.talhaoNome,
  }) : _fotos = fotos;

  factory _$VisitaImpl.fromJson(Map<String, dynamic> json) =>
      _$$VisitaImplFromJson(json);

  @override
  final String id;
  @override
  final String clienteId;
  @override
  final String fazendaId;
  @override
  final String clienteNome;
  @override
  final String fazendaNome;
  @override
  final DateTime startTime;
  @override
  final DateTime? endTime;
  @override
  final int? durationMinutes;
  @override
  @JsonKey()
  final String status;
  // em_andamento, concluida, cancelada
  @override
  final String? observacoes;
  final List<String>? _fotos;
  @override
  List<String>? get fotos {
    final value = _fotos;
    if (value == null) return null;
    if (_fotos is EqualUnmodifiableListView) return _fotos;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  final String? talhaoId;
  @override
  final String? talhaoNome;

  @override
  String toString() {
    return 'Visita(id: $id, clienteId: $clienteId, fazendaId: $fazendaId, clienteNome: $clienteNome, fazendaNome: $fazendaNome, startTime: $startTime, endTime: $endTime, durationMinutes: $durationMinutes, status: $status, observacoes: $observacoes, fotos: $fotos, talhaoId: $talhaoId, talhaoNome: $talhaoNome)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$VisitaImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.clienteId, clienteId) ||
                other.clienteId == clienteId) &&
            (identical(other.fazendaId, fazendaId) ||
                other.fazendaId == fazendaId) &&
            (identical(other.clienteNome, clienteNome) ||
                other.clienteNome == clienteNome) &&
            (identical(other.fazendaNome, fazendaNome) ||
                other.fazendaNome == fazendaNome) &&
            (identical(other.startTime, startTime) ||
                other.startTime == startTime) &&
            (identical(other.endTime, endTime) || other.endTime == endTime) &&
            (identical(other.durationMinutes, durationMinutes) ||
                other.durationMinutes == durationMinutes) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.observacoes, observacoes) ||
                other.observacoes == observacoes) &&
            const DeepCollectionEquality().equals(other._fotos, _fotos) &&
            (identical(other.talhaoId, talhaoId) ||
                other.talhaoId == talhaoId) &&
            (identical(other.talhaoNome, talhaoNome) ||
                other.talhaoNome == talhaoNome));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    clienteId,
    fazendaId,
    clienteNome,
    fazendaNome,
    startTime,
    endTime,
    durationMinutes,
    status,
    observacoes,
    const DeepCollectionEquality().hash(_fotos),
    talhaoId,
    talhaoNome,
  );

  /// Create a copy of Visita
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$VisitaImplCopyWith<_$VisitaImpl> get copyWith =>
      __$$VisitaImplCopyWithImpl<_$VisitaImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$VisitaImplToJson(this);
  }
}

abstract class _Visita implements Visita {
  const factory _Visita({
    required final String id,
    required final String clienteId,
    required final String fazendaId,
    required final String clienteNome,
    required final String fazendaNome,
    required final DateTime startTime,
    final DateTime? endTime,
    final int? durationMinutes,
    final String status,
    final String? observacoes,
    final List<String>? fotos,
    final String? talhaoId,
    final String? talhaoNome,
  }) = _$VisitaImpl;

  factory _Visita.fromJson(Map<String, dynamic> json) = _$VisitaImpl.fromJson;

  @override
  String get id;
  @override
  String get clienteId;
  @override
  String get fazendaId;
  @override
  String get clienteNome;
  @override
  String get fazendaNome;
  @override
  DateTime get startTime;
  @override
  DateTime? get endTime;
  @override
  int? get durationMinutes;
  @override
  String get status; // em_andamento, concluida, cancelada
  @override
  String? get observacoes;
  @override
  List<String>? get fotos;
  @override
  String? get talhaoId;
  @override
  String? get talhaoNome;

  /// Create a copy of Visita
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$VisitaImplCopyWith<_$VisitaImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
