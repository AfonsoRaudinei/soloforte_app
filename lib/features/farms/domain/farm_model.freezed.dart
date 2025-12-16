// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'farm_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Farm _$FarmFromJson(Map<String, dynamic> json) {
  return _Farm.fromJson(json);
}

/// @nodoc
mixin _$Farm {
  String get id => throw _privateConstructorUsedError;
  String get clientId => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get city => throw _privateConstructorUsedError;
  String get state => throw _privateConstructorUsedError;
  String? get address => throw _privateConstructorUsedError;
  double? get totalAreaHa => throw _privateConstructorUsedError;
  int? get totalAreas => throw _privateConstructorUsedError;
  String? get description => throw _privateConstructorUsedError;
  bool get isActive => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get updatedAt => throw _privateConstructorUsedError;

  /// Serializes this Farm to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Farm
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $FarmCopyWith<Farm> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $FarmCopyWith<$Res> {
  factory $FarmCopyWith(Farm value, $Res Function(Farm) then) =
      _$FarmCopyWithImpl<$Res, Farm>;
  @useResult
  $Res call({
    String id,
    String clientId,
    String name,
    String city,
    String state,
    String? address,
    double? totalAreaHa,
    int? totalAreas,
    String? description,
    bool isActive,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
}

/// @nodoc
class _$FarmCopyWithImpl<$Res, $Val extends Farm>
    implements $FarmCopyWith<$Res> {
  _$FarmCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Farm
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? clientId = null,
    Object? name = null,
    Object? city = null,
    Object? state = null,
    Object? address = freezed,
    Object? totalAreaHa = freezed,
    Object? totalAreas = freezed,
    Object? description = freezed,
    Object? isActive = null,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            clientId: null == clientId
                ? _value.clientId
                : clientId // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            city: null == city
                ? _value.city
                : city // ignore: cast_nullable_to_non_nullable
                      as String,
            state: null == state
                ? _value.state
                : state // ignore: cast_nullable_to_non_nullable
                      as String,
            address: freezed == address
                ? _value.address
                : address // ignore: cast_nullable_to_non_nullable
                      as String?,
            totalAreaHa: freezed == totalAreaHa
                ? _value.totalAreaHa
                : totalAreaHa // ignore: cast_nullable_to_non_nullable
                      as double?,
            totalAreas: freezed == totalAreas
                ? _value.totalAreas
                : totalAreas // ignore: cast_nullable_to_non_nullable
                      as int?,
            description: freezed == description
                ? _value.description
                : description // ignore: cast_nullable_to_non_nullable
                      as String?,
            isActive: null == isActive
                ? _value.isActive
                : isActive // ignore: cast_nullable_to_non_nullable
                      as bool,
            createdAt: freezed == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            updatedAt: freezed == updatedAt
                ? _value.updatedAt
                : updatedAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$FarmImplCopyWith<$Res> implements $FarmCopyWith<$Res> {
  factory _$$FarmImplCopyWith(
    _$FarmImpl value,
    $Res Function(_$FarmImpl) then,
  ) = __$$FarmImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String clientId,
    String name,
    String city,
    String state,
    String? address,
    double? totalAreaHa,
    int? totalAreas,
    String? description,
    bool isActive,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
}

/// @nodoc
class __$$FarmImplCopyWithImpl<$Res>
    extends _$FarmCopyWithImpl<$Res, _$FarmImpl>
    implements _$$FarmImplCopyWith<$Res> {
  __$$FarmImplCopyWithImpl(_$FarmImpl _value, $Res Function(_$FarmImpl) _then)
    : super(_value, _then);

  /// Create a copy of Farm
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? clientId = null,
    Object? name = null,
    Object? city = null,
    Object? state = null,
    Object? address = freezed,
    Object? totalAreaHa = freezed,
    Object? totalAreas = freezed,
    Object? description = freezed,
    Object? isActive = null,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _$FarmImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        clientId: null == clientId
            ? _value.clientId
            : clientId // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        city: null == city
            ? _value.city
            : city // ignore: cast_nullable_to_non_nullable
                  as String,
        state: null == state
            ? _value.state
            : state // ignore: cast_nullable_to_non_nullable
                  as String,
        address: freezed == address
            ? _value.address
            : address // ignore: cast_nullable_to_non_nullable
                  as String?,
        totalAreaHa: freezed == totalAreaHa
            ? _value.totalAreaHa
            : totalAreaHa // ignore: cast_nullable_to_non_nullable
                  as double?,
        totalAreas: freezed == totalAreas
            ? _value.totalAreas
            : totalAreas // ignore: cast_nullable_to_non_nullable
                  as int?,
        description: freezed == description
            ? _value.description
            : description // ignore: cast_nullable_to_non_nullable
                  as String?,
        isActive: null == isActive
            ? _value.isActive
            : isActive // ignore: cast_nullable_to_non_nullable
                  as bool,
        createdAt: freezed == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        updatedAt: freezed == updatedAt
            ? _value.updatedAt
            : updatedAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$FarmImpl implements _Farm {
  const _$FarmImpl({
    required this.id,
    required this.clientId,
    required this.name,
    required this.city,
    required this.state,
    this.address,
    this.totalAreaHa,
    this.totalAreas,
    this.description,
    this.isActive = true,
    this.createdAt,
    this.updatedAt,
  });

  factory _$FarmImpl.fromJson(Map<String, dynamic> json) =>
      _$$FarmImplFromJson(json);

  @override
  final String id;
  @override
  final String clientId;
  @override
  final String name;
  @override
  final String city;
  @override
  final String state;
  @override
  final String? address;
  @override
  final double? totalAreaHa;
  @override
  final int? totalAreas;
  @override
  final String? description;
  @override
  @JsonKey()
  final bool isActive;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? updatedAt;

  @override
  String toString() {
    return 'Farm(id: $id, clientId: $clientId, name: $name, city: $city, state: $state, address: $address, totalAreaHa: $totalAreaHa, totalAreas: $totalAreas, description: $description, isActive: $isActive, createdAt: $createdAt, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$FarmImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.clientId, clientId) ||
                other.clientId == clientId) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.city, city) || other.city == city) &&
            (identical(other.state, state) || other.state == state) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.totalAreaHa, totalAreaHa) ||
                other.totalAreaHa == totalAreaHa) &&
            (identical(other.totalAreas, totalAreas) ||
                other.totalAreas == totalAreas) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.isActive, isActive) ||
                other.isActive == isActive) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.updatedAt, updatedAt) ||
                other.updatedAt == updatedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    clientId,
    name,
    city,
    state,
    address,
    totalAreaHa,
    totalAreas,
    description,
    isActive,
    createdAt,
    updatedAt,
  );

  /// Create a copy of Farm
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$FarmImplCopyWith<_$FarmImpl> get copyWith =>
      __$$FarmImplCopyWithImpl<_$FarmImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$FarmImplToJson(this);
  }
}

abstract class _Farm implements Farm {
  const factory _Farm({
    required final String id,
    required final String clientId,
    required final String name,
    required final String city,
    required final String state,
    final String? address,
    final double? totalAreaHa,
    final int? totalAreas,
    final String? description,
    final bool isActive,
    final DateTime? createdAt,
    final DateTime? updatedAt,
  }) = _$FarmImpl;

  factory _Farm.fromJson(Map<String, dynamic> json) = _$FarmImpl.fromJson;

  @override
  String get id;
  @override
  String get clientId;
  @override
  String get name;
  @override
  String get city;
  @override
  String get state;
  @override
  String? get address;
  @override
  double? get totalAreaHa;
  @override
  int? get totalAreas;
  @override
  String? get description;
  @override
  bool get isActive;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get updatedAt;

  /// Create a copy of Farm
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$FarmImplCopyWith<_$FarmImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
