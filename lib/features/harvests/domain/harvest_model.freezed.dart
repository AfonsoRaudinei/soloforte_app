// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'harvest_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Harvest _$HarvestFromJson(Map<String, dynamic> json) {
  return _Harvest.fromJson(json);
}

/// @nodoc
mixin _$Harvest {
  String get id => throw _privateConstructorUsedError;
  String get areaId => throw _privateConstructorUsedError;
  String get areaName => throw _privateConstructorUsedError;
  String get cropType =>
      throw _privateConstructorUsedError; // e.g. "Soybean", "Corn"
  DateTime get plantedDate => throw _privateConstructorUsedError;
  DateTime? get harvestDate => throw _privateConstructorUsedError;
  double get plantedAreaHa => throw _privateConstructorUsedError;
  double get totalProductionBags => throw _privateConstructorUsedError; // Sacas
  double get totalCost => throw _privateConstructorUsedError;
  String get status =>
      throw _privateConstructorUsedError; // 'planned', 'active', 'harvested'
  List<String> get notes => throw _privateConstructorUsedError;

  /// Serializes this Harvest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Harvest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $HarvestCopyWith<Harvest> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $HarvestCopyWith<$Res> {
  factory $HarvestCopyWith(Harvest value, $Res Function(Harvest) then) =
      _$HarvestCopyWithImpl<$Res, Harvest>;
  @useResult
  $Res call({
    String id,
    String areaId,
    String areaName,
    String cropType,
    DateTime plantedDate,
    DateTime? harvestDate,
    double plantedAreaHa,
    double totalProductionBags,
    double totalCost,
    String status,
    List<String> notes,
  });
}

/// @nodoc
class _$HarvestCopyWithImpl<$Res, $Val extends Harvest>
    implements $HarvestCopyWith<$Res> {
  _$HarvestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Harvest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? areaId = null,
    Object? areaName = null,
    Object? cropType = null,
    Object? plantedDate = null,
    Object? harvestDate = freezed,
    Object? plantedAreaHa = null,
    Object? totalProductionBags = null,
    Object? totalCost = null,
    Object? status = null,
    Object? notes = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            areaId: null == areaId
                ? _value.areaId
                : areaId // ignore: cast_nullable_to_non_nullable
                      as String,
            areaName: null == areaName
                ? _value.areaName
                : areaName // ignore: cast_nullable_to_non_nullable
                      as String,
            cropType: null == cropType
                ? _value.cropType
                : cropType // ignore: cast_nullable_to_non_nullable
                      as String,
            plantedDate: null == plantedDate
                ? _value.plantedDate
                : plantedDate // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            harvestDate: freezed == harvestDate
                ? _value.harvestDate
                : harvestDate // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            plantedAreaHa: null == plantedAreaHa
                ? _value.plantedAreaHa
                : plantedAreaHa // ignore: cast_nullable_to_non_nullable
                      as double,
            totalProductionBags: null == totalProductionBags
                ? _value.totalProductionBags
                : totalProductionBags // ignore: cast_nullable_to_non_nullable
                      as double,
            totalCost: null == totalCost
                ? _value.totalCost
                : totalCost // ignore: cast_nullable_to_non_nullable
                      as double,
            status: null == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String,
            notes: null == notes
                ? _value.notes
                : notes // ignore: cast_nullable_to_non_nullable
                      as List<String>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$HarvestImplCopyWith<$Res> implements $HarvestCopyWith<$Res> {
  factory _$$HarvestImplCopyWith(
    _$HarvestImpl value,
    $Res Function(_$HarvestImpl) then,
  ) = __$$HarvestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String areaId,
    String areaName,
    String cropType,
    DateTime plantedDate,
    DateTime? harvestDate,
    double plantedAreaHa,
    double totalProductionBags,
    double totalCost,
    String status,
    List<String> notes,
  });
}

/// @nodoc
class __$$HarvestImplCopyWithImpl<$Res>
    extends _$HarvestCopyWithImpl<$Res, _$HarvestImpl>
    implements _$$HarvestImplCopyWith<$Res> {
  __$$HarvestImplCopyWithImpl(
    _$HarvestImpl _value,
    $Res Function(_$HarvestImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Harvest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? areaId = null,
    Object? areaName = null,
    Object? cropType = null,
    Object? plantedDate = null,
    Object? harvestDate = freezed,
    Object? plantedAreaHa = null,
    Object? totalProductionBags = null,
    Object? totalCost = null,
    Object? status = null,
    Object? notes = null,
  }) {
    return _then(
      _$HarvestImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        areaId: null == areaId
            ? _value.areaId
            : areaId // ignore: cast_nullable_to_non_nullable
                  as String,
        areaName: null == areaName
            ? _value.areaName
            : areaName // ignore: cast_nullable_to_non_nullable
                  as String,
        cropType: null == cropType
            ? _value.cropType
            : cropType // ignore: cast_nullable_to_non_nullable
                  as String,
        plantedDate: null == plantedDate
            ? _value.plantedDate
            : plantedDate // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        harvestDate: freezed == harvestDate
            ? _value.harvestDate
            : harvestDate // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        plantedAreaHa: null == plantedAreaHa
            ? _value.plantedAreaHa
            : plantedAreaHa // ignore: cast_nullable_to_non_nullable
                  as double,
        totalProductionBags: null == totalProductionBags
            ? _value.totalProductionBags
            : totalProductionBags // ignore: cast_nullable_to_non_nullable
                  as double,
        totalCost: null == totalCost
            ? _value.totalCost
            : totalCost // ignore: cast_nullable_to_non_nullable
                  as double,
        status: null == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String,
        notes: null == notes
            ? _value._notes
            : notes // ignore: cast_nullable_to_non_nullable
                  as List<String>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$HarvestImpl implements _Harvest {
  const _$HarvestImpl({
    required this.id,
    required this.areaId,
    required this.areaName,
    required this.cropType,
    required this.plantedDate,
    required this.harvestDate,
    required this.plantedAreaHa,
    required this.totalProductionBags,
    required this.totalCost,
    required this.status,
    final List<String> notes = const [],
  }) : _notes = notes;

  factory _$HarvestImpl.fromJson(Map<String, dynamic> json) =>
      _$$HarvestImplFromJson(json);

  @override
  final String id;
  @override
  final String areaId;
  @override
  final String areaName;
  @override
  final String cropType;
  // e.g. "Soybean", "Corn"
  @override
  final DateTime plantedDate;
  @override
  final DateTime? harvestDate;
  @override
  final double plantedAreaHa;
  @override
  final double totalProductionBags;
  // Sacas
  @override
  final double totalCost;
  @override
  final String status;
  // 'planned', 'active', 'harvested'
  final List<String> _notes;
  // 'planned', 'active', 'harvested'
  @override
  @JsonKey()
  List<String> get notes {
    if (_notes is EqualUnmodifiableListView) return _notes;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_notes);
  }

  @override
  String toString() {
    return 'Harvest(id: $id, areaId: $areaId, areaName: $areaName, cropType: $cropType, plantedDate: $plantedDate, harvestDate: $harvestDate, plantedAreaHa: $plantedAreaHa, totalProductionBags: $totalProductionBags, totalCost: $totalCost, status: $status, notes: $notes)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$HarvestImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.areaId, areaId) || other.areaId == areaId) &&
            (identical(other.areaName, areaName) ||
                other.areaName == areaName) &&
            (identical(other.cropType, cropType) ||
                other.cropType == cropType) &&
            (identical(other.plantedDate, plantedDate) ||
                other.plantedDate == plantedDate) &&
            (identical(other.harvestDate, harvestDate) ||
                other.harvestDate == harvestDate) &&
            (identical(other.plantedAreaHa, plantedAreaHa) ||
                other.plantedAreaHa == plantedAreaHa) &&
            (identical(other.totalProductionBags, totalProductionBags) ||
                other.totalProductionBags == totalProductionBags) &&
            (identical(other.totalCost, totalCost) ||
                other.totalCost == totalCost) &&
            (identical(other.status, status) || other.status == status) &&
            const DeepCollectionEquality().equals(other._notes, _notes));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    areaId,
    areaName,
    cropType,
    plantedDate,
    harvestDate,
    plantedAreaHa,
    totalProductionBags,
    totalCost,
    status,
    const DeepCollectionEquality().hash(_notes),
  );

  /// Create a copy of Harvest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$HarvestImplCopyWith<_$HarvestImpl> get copyWith =>
      __$$HarvestImplCopyWithImpl<_$HarvestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$HarvestImplToJson(this);
  }
}

abstract class _Harvest implements Harvest {
  const factory _Harvest({
    required final String id,
    required final String areaId,
    required final String areaName,
    required final String cropType,
    required final DateTime plantedDate,
    required final DateTime? harvestDate,
    required final double plantedAreaHa,
    required final double totalProductionBags,
    required final double totalCost,
    required final String status,
    final List<String> notes,
  }) = _$HarvestImpl;

  factory _Harvest.fromJson(Map<String, dynamic> json) = _$HarvestImpl.fromJson;

  @override
  String get id;
  @override
  String get areaId;
  @override
  String get areaName;
  @override
  String get cropType; // e.g. "Soybean", "Corn"
  @override
  DateTime get plantedDate;
  @override
  DateTime? get harvestDate;
  @override
  double get plantedAreaHa;
  @override
  double get totalProductionBags; // Sacas
  @override
  double get totalCost;
  @override
  String get status; // 'planned', 'active', 'harvested'
  @override
  List<String> get notes;

  /// Create a copy of Harvest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$HarvestImplCopyWith<_$HarvestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
