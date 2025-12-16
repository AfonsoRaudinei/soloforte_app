// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'client_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Client _$ClientFromJson(Map<String, dynamic> json) {
  return _Client.fromJson(json);
}

/// @nodoc
mixin _$Client {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get email => throw _privateConstructorUsedError;
  String get phone => throw _privateConstructorUsedError;
  String? get cpfCnpj => throw _privateConstructorUsedError;
  String get address => throw _privateConstructorUsedError;
  String get city => throw _privateConstructorUsedError;
  String get state => throw _privateConstructorUsedError;
  String get type =>
      throw _privateConstructorUsedError; // 'producer', 'consultant'
  String get status =>
      throw _privateConstructorUsedError; // 'active', 'inactive'
  DateTime get lastActivity => throw _privateConstructorUsedError;
  String? get avatarUrl => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;
  List<String> get farmIds => throw _privateConstructorUsedError;

  /// Serializes this Client to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Client
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ClientCopyWith<Client> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ClientCopyWith<$Res> {
  factory $ClientCopyWith(Client value, $Res Function(Client) then) =
      _$ClientCopyWithImpl<$Res, Client>;
  @useResult
  $Res call({
    String id,
    String name,
    String email,
    String phone,
    String? cpfCnpj,
    String address,
    String city,
    String state,
    String type,
    String status,
    DateTime lastActivity,
    String? avatarUrl,
    String? notes,
    List<String> farmIds,
  });
}

/// @nodoc
class _$ClientCopyWithImpl<$Res, $Val extends Client>
    implements $ClientCopyWith<$Res> {
  _$ClientCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Client
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
    Object? phone = null,
    Object? cpfCnpj = freezed,
    Object? address = null,
    Object? city = null,
    Object? state = null,
    Object? type = null,
    Object? status = null,
    Object? lastActivity = null,
    Object? avatarUrl = freezed,
    Object? notes = freezed,
    Object? farmIds = null,
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
            phone: null == phone
                ? _value.phone
                : phone // ignore: cast_nullable_to_non_nullable
                      as String,
            cpfCnpj: freezed == cpfCnpj
                ? _value.cpfCnpj
                : cpfCnpj // ignore: cast_nullable_to_non_nullable
                      as String?,
            address: null == address
                ? _value.address
                : address // ignore: cast_nullable_to_non_nullable
                      as String,
            city: null == city
                ? _value.city
                : city // ignore: cast_nullable_to_non_nullable
                      as String,
            state: null == state
                ? _value.state
                : state // ignore: cast_nullable_to_non_nullable
                      as String,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as String,
            status: null == status
                ? _value.status
                : status // ignore: cast_nullable_to_non_nullable
                      as String,
            lastActivity: null == lastActivity
                ? _value.lastActivity
                : lastActivity // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            avatarUrl: freezed == avatarUrl
                ? _value.avatarUrl
                : avatarUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
            notes: freezed == notes
                ? _value.notes
                : notes // ignore: cast_nullable_to_non_nullable
                      as String?,
            farmIds: null == farmIds
                ? _value.farmIds
                : farmIds // ignore: cast_nullable_to_non_nullable
                      as List<String>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ClientImplCopyWith<$Res> implements $ClientCopyWith<$Res> {
  factory _$$ClientImplCopyWith(
    _$ClientImpl value,
    $Res Function(_$ClientImpl) then,
  ) = __$$ClientImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String name,
    String email,
    String phone,
    String? cpfCnpj,
    String address,
    String city,
    String state,
    String type,
    String status,
    DateTime lastActivity,
    String? avatarUrl,
    String? notes,
    List<String> farmIds,
  });
}

/// @nodoc
class __$$ClientImplCopyWithImpl<$Res>
    extends _$ClientCopyWithImpl<$Res, _$ClientImpl>
    implements _$$ClientImplCopyWith<$Res> {
  __$$ClientImplCopyWithImpl(
    _$ClientImpl _value,
    $Res Function(_$ClientImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Client
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
    Object? phone = null,
    Object? cpfCnpj = freezed,
    Object? address = null,
    Object? city = null,
    Object? state = null,
    Object? type = null,
    Object? status = null,
    Object? lastActivity = null,
    Object? avatarUrl = freezed,
    Object? notes = freezed,
    Object? farmIds = null,
  }) {
    return _then(
      _$ClientImpl(
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
        phone: null == phone
            ? _value.phone
            : phone // ignore: cast_nullable_to_non_nullable
                  as String,
        cpfCnpj: freezed == cpfCnpj
            ? _value.cpfCnpj
            : cpfCnpj // ignore: cast_nullable_to_non_nullable
                  as String?,
        address: null == address
            ? _value.address
            : address // ignore: cast_nullable_to_non_nullable
                  as String,
        city: null == city
            ? _value.city
            : city // ignore: cast_nullable_to_non_nullable
                  as String,
        state: null == state
            ? _value.state
            : state // ignore: cast_nullable_to_non_nullable
                  as String,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as String,
        status: null == status
            ? _value.status
            : status // ignore: cast_nullable_to_non_nullable
                  as String,
        lastActivity: null == lastActivity
            ? _value.lastActivity
            : lastActivity // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        avatarUrl: freezed == avatarUrl
            ? _value.avatarUrl
            : avatarUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        notes: freezed == notes
            ? _value.notes
            : notes // ignore: cast_nullable_to_non_nullable
                  as String?,
        farmIds: null == farmIds
            ? _value._farmIds
            : farmIds // ignore: cast_nullable_to_non_nullable
                  as List<String>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ClientImpl extends _Client {
  const _$ClientImpl({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    this.cpfCnpj,
    required this.address,
    required this.city,
    required this.state,
    required this.type,
    required this.status,
    required this.lastActivity,
    this.avatarUrl,
    this.notes,
    final List<String> farmIds = const [],
  }) : _farmIds = farmIds,
       super._();

  factory _$ClientImpl.fromJson(Map<String, dynamic> json) =>
      _$$ClientImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String email;
  @override
  final String phone;
  @override
  final String? cpfCnpj;
  @override
  final String address;
  @override
  final String city;
  @override
  final String state;
  @override
  final String type;
  // 'producer', 'consultant'
  @override
  final String status;
  // 'active', 'inactive'
  @override
  final DateTime lastActivity;
  @override
  final String? avatarUrl;
  @override
  final String? notes;
  final List<String> _farmIds;
  @override
  @JsonKey()
  List<String> get farmIds {
    if (_farmIds is EqualUnmodifiableListView) return _farmIds;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_farmIds);
  }

  @override
  String toString() {
    return 'Client(id: $id, name: $name, email: $email, phone: $phone, cpfCnpj: $cpfCnpj, address: $address, city: $city, state: $state, type: $type, status: $status, lastActivity: $lastActivity, avatarUrl: $avatarUrl, notes: $notes, farmIds: $farmIds)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ClientImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.phone, phone) || other.phone == phone) &&
            (identical(other.cpfCnpj, cpfCnpj) || other.cpfCnpj == cpfCnpj) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.city, city) || other.city == city) &&
            (identical(other.state, state) || other.state == state) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.lastActivity, lastActivity) ||
                other.lastActivity == lastActivity) &&
            (identical(other.avatarUrl, avatarUrl) ||
                other.avatarUrl == avatarUrl) &&
            (identical(other.notes, notes) || other.notes == notes) &&
            const DeepCollectionEquality().equals(other._farmIds, _farmIds));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    name,
    email,
    phone,
    cpfCnpj,
    address,
    city,
    state,
    type,
    status,
    lastActivity,
    avatarUrl,
    notes,
    const DeepCollectionEquality().hash(_farmIds),
  );

  /// Create a copy of Client
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ClientImplCopyWith<_$ClientImpl> get copyWith =>
      __$$ClientImplCopyWithImpl<_$ClientImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ClientImplToJson(this);
  }
}

abstract class _Client extends Client {
  const factory _Client({
    required final String id,
    required final String name,
    required final String email,
    required final String phone,
    final String? cpfCnpj,
    required final String address,
    required final String city,
    required final String state,
    required final String type,
    required final String status,
    required final DateTime lastActivity,
    final String? avatarUrl,
    final String? notes,
    final List<String> farmIds,
  }) = _$ClientImpl;
  const _Client._() : super._();

  factory _Client.fromJson(Map<String, dynamic> json) = _$ClientImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get email;
  @override
  String get phone;
  @override
  String? get cpfCnpj;
  @override
  String get address;
  @override
  String get city;
  @override
  String get state;
  @override
  String get type; // 'producer', 'consultant'
  @override
  String get status; // 'active', 'inactive'
  @override
  DateTime get lastActivity;
  @override
  String? get avatarUrl;
  @override
  String? get notes;
  @override
  List<String> get farmIds;

  /// Create a copy of Client
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ClientImplCopyWith<_$ClientImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
