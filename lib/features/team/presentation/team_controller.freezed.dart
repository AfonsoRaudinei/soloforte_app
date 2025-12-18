// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'team_controller.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$TeamState {
  List<TeamMember> get allMembers => throw _privateConstructorUsedError;
  List<TeamMember> get filteredMembers => throw _privateConstructorUsedError;
  bool get isLoading => throw _privateConstructorUsedError;
  String? get error => throw _privateConstructorUsedError;
  TeamMemberStatus? get statusFilter => throw _privateConstructorUsedError;
  TeamMemberRole? get roleFilter => throw _privateConstructorUsedError;
  String get searchQuery => throw _privateConstructorUsedError;

  /// Create a copy of TeamState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TeamStateCopyWith<TeamState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TeamStateCopyWith<$Res> {
  factory $TeamStateCopyWith(TeamState value, $Res Function(TeamState) then) =
      _$TeamStateCopyWithImpl<$Res, TeamState>;
  @useResult
  $Res call({
    List<TeamMember> allMembers,
    List<TeamMember> filteredMembers,
    bool isLoading,
    String? error,
    TeamMemberStatus? statusFilter,
    TeamMemberRole? roleFilter,
    String searchQuery,
  });
}

/// @nodoc
class _$TeamStateCopyWithImpl<$Res, $Val extends TeamState>
    implements $TeamStateCopyWith<$Res> {
  _$TeamStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TeamState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? allMembers = null,
    Object? filteredMembers = null,
    Object? isLoading = null,
    Object? error = freezed,
    Object? statusFilter = freezed,
    Object? roleFilter = freezed,
    Object? searchQuery = null,
  }) {
    return _then(
      _value.copyWith(
            allMembers: null == allMembers
                ? _value.allMembers
                : allMembers // ignore: cast_nullable_to_non_nullable
                      as List<TeamMember>,
            filteredMembers: null == filteredMembers
                ? _value.filteredMembers
                : filteredMembers // ignore: cast_nullable_to_non_nullable
                      as List<TeamMember>,
            isLoading: null == isLoading
                ? _value.isLoading
                : isLoading // ignore: cast_nullable_to_non_nullable
                      as bool,
            error: freezed == error
                ? _value.error
                : error // ignore: cast_nullable_to_non_nullable
                      as String?,
            statusFilter: freezed == statusFilter
                ? _value.statusFilter
                : statusFilter // ignore: cast_nullable_to_non_nullable
                      as TeamMemberStatus?,
            roleFilter: freezed == roleFilter
                ? _value.roleFilter
                : roleFilter // ignore: cast_nullable_to_non_nullable
                      as TeamMemberRole?,
            searchQuery: null == searchQuery
                ? _value.searchQuery
                : searchQuery // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TeamStateImplCopyWith<$Res>
    implements $TeamStateCopyWith<$Res> {
  factory _$$TeamStateImplCopyWith(
    _$TeamStateImpl value,
    $Res Function(_$TeamStateImpl) then,
  ) = __$$TeamStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    List<TeamMember> allMembers,
    List<TeamMember> filteredMembers,
    bool isLoading,
    String? error,
    TeamMemberStatus? statusFilter,
    TeamMemberRole? roleFilter,
    String searchQuery,
  });
}

/// @nodoc
class __$$TeamStateImplCopyWithImpl<$Res>
    extends _$TeamStateCopyWithImpl<$Res, _$TeamStateImpl>
    implements _$$TeamStateImplCopyWith<$Res> {
  __$$TeamStateImplCopyWithImpl(
    _$TeamStateImpl _value,
    $Res Function(_$TeamStateImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TeamState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? allMembers = null,
    Object? filteredMembers = null,
    Object? isLoading = null,
    Object? error = freezed,
    Object? statusFilter = freezed,
    Object? roleFilter = freezed,
    Object? searchQuery = null,
  }) {
    return _then(
      _$TeamStateImpl(
        allMembers: null == allMembers
            ? _value._allMembers
            : allMembers // ignore: cast_nullable_to_non_nullable
                  as List<TeamMember>,
        filteredMembers: null == filteredMembers
            ? _value._filteredMembers
            : filteredMembers // ignore: cast_nullable_to_non_nullable
                  as List<TeamMember>,
        isLoading: null == isLoading
            ? _value.isLoading
            : isLoading // ignore: cast_nullable_to_non_nullable
                  as bool,
        error: freezed == error
            ? _value.error
            : error // ignore: cast_nullable_to_non_nullable
                  as String?,
        statusFilter: freezed == statusFilter
            ? _value.statusFilter
            : statusFilter // ignore: cast_nullable_to_non_nullable
                  as TeamMemberStatus?,
        roleFilter: freezed == roleFilter
            ? _value.roleFilter
            : roleFilter // ignore: cast_nullable_to_non_nullable
                  as TeamMemberRole?,
        searchQuery: null == searchQuery
            ? _value.searchQuery
            : searchQuery // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc

class _$TeamStateImpl implements _TeamState {
  const _$TeamStateImpl({
    final List<TeamMember> allMembers = const [],
    final List<TeamMember> filteredMembers = const [],
    this.isLoading = true,
    this.error = null,
    this.statusFilter = null,
    this.roleFilter = null,
    this.searchQuery = '',
  }) : _allMembers = allMembers,
       _filteredMembers = filteredMembers;

  final List<TeamMember> _allMembers;
  @override
  @JsonKey()
  List<TeamMember> get allMembers {
    if (_allMembers is EqualUnmodifiableListView) return _allMembers;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_allMembers);
  }

  final List<TeamMember> _filteredMembers;
  @override
  @JsonKey()
  List<TeamMember> get filteredMembers {
    if (_filteredMembers is EqualUnmodifiableListView) return _filteredMembers;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_filteredMembers);
  }

  @override
  @JsonKey()
  final bool isLoading;
  @override
  @JsonKey()
  final String? error;
  @override
  @JsonKey()
  final TeamMemberStatus? statusFilter;
  @override
  @JsonKey()
  final TeamMemberRole? roleFilter;
  @override
  @JsonKey()
  final String searchQuery;

  @override
  String toString() {
    return 'TeamState(allMembers: $allMembers, filteredMembers: $filteredMembers, isLoading: $isLoading, error: $error, statusFilter: $statusFilter, roleFilter: $roleFilter, searchQuery: $searchQuery)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TeamStateImpl &&
            const DeepCollectionEquality().equals(
              other._allMembers,
              _allMembers,
            ) &&
            const DeepCollectionEquality().equals(
              other._filteredMembers,
              _filteredMembers,
            ) &&
            (identical(other.isLoading, isLoading) ||
                other.isLoading == isLoading) &&
            (identical(other.error, error) || other.error == error) &&
            (identical(other.statusFilter, statusFilter) ||
                other.statusFilter == statusFilter) &&
            (identical(other.roleFilter, roleFilter) ||
                other.roleFilter == roleFilter) &&
            (identical(other.searchQuery, searchQuery) ||
                other.searchQuery == searchQuery));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_allMembers),
    const DeepCollectionEquality().hash(_filteredMembers),
    isLoading,
    error,
    statusFilter,
    roleFilter,
    searchQuery,
  );

  /// Create a copy of TeamState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TeamStateImplCopyWith<_$TeamStateImpl> get copyWith =>
      __$$TeamStateImplCopyWithImpl<_$TeamStateImpl>(this, _$identity);
}

abstract class _TeamState implements TeamState {
  const factory _TeamState({
    final List<TeamMember> allMembers,
    final List<TeamMember> filteredMembers,
    final bool isLoading,
    final String? error,
    final TeamMemberStatus? statusFilter,
    final TeamMemberRole? roleFilter,
    final String searchQuery,
  }) = _$TeamStateImpl;

  @override
  List<TeamMember> get allMembers;
  @override
  List<TeamMember> get filteredMembers;
  @override
  bool get isLoading;
  @override
  String? get error;
  @override
  TeamMemberStatus? get statusFilter;
  @override
  TeamMemberRole? get roleFilter;
  @override
  String get searchQuery;

  /// Create a copy of TeamState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TeamStateImplCopyWith<_$TeamStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
