// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'team_chat_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

TeamMessage _$TeamMessageFromJson(Map<String, dynamic> json) {
  return _TeamMessage.fromJson(json);
}

/// @nodoc
mixin _$TeamMessage {
  String get id => throw _privateConstructorUsedError;
  String get conversationId => throw _privateConstructorUsedError;
  String get senderId => throw _privateConstructorUsedError;
  String get content => throw _privateConstructorUsedError;
  TeamMessageType get type => throw _privateConstructorUsedError;
  DateTime get timestamp => throw _privateConstructorUsedError;
  bool get isRead => throw _privateConstructorUsedError;

  /// Serializes this TeamMessage to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TeamMessage
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TeamMessageCopyWith<TeamMessage> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TeamMessageCopyWith<$Res> {
  factory $TeamMessageCopyWith(
    TeamMessage value,
    $Res Function(TeamMessage) then,
  ) = _$TeamMessageCopyWithImpl<$Res, TeamMessage>;
  @useResult
  $Res call({
    String id,
    String conversationId,
    String senderId,
    String content,
    TeamMessageType type,
    DateTime timestamp,
    bool isRead,
  });
}

/// @nodoc
class _$TeamMessageCopyWithImpl<$Res, $Val extends TeamMessage>
    implements $TeamMessageCopyWith<$Res> {
  _$TeamMessageCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TeamMessage
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? conversationId = null,
    Object? senderId = null,
    Object? content = null,
    Object? type = null,
    Object? timestamp = null,
    Object? isRead = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            conversationId: null == conversationId
                ? _value.conversationId
                : conversationId // ignore: cast_nullable_to_non_nullable
                      as String,
            senderId: null == senderId
                ? _value.senderId
                : senderId // ignore: cast_nullable_to_non_nullable
                      as String,
            content: null == content
                ? _value.content
                : content // ignore: cast_nullable_to_non_nullable
                      as String,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as TeamMessageType,
            timestamp: null == timestamp
                ? _value.timestamp
                : timestamp // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            isRead: null == isRead
                ? _value.isRead
                : isRead // ignore: cast_nullable_to_non_nullable
                      as bool,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$TeamMessageImplCopyWith<$Res>
    implements $TeamMessageCopyWith<$Res> {
  factory _$$TeamMessageImplCopyWith(
    _$TeamMessageImpl value,
    $Res Function(_$TeamMessageImpl) then,
  ) = __$$TeamMessageImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String conversationId,
    String senderId,
    String content,
    TeamMessageType type,
    DateTime timestamp,
    bool isRead,
  });
}

/// @nodoc
class __$$TeamMessageImplCopyWithImpl<$Res>
    extends _$TeamMessageCopyWithImpl<$Res, _$TeamMessageImpl>
    implements _$$TeamMessageImplCopyWith<$Res> {
  __$$TeamMessageImplCopyWithImpl(
    _$TeamMessageImpl _value,
    $Res Function(_$TeamMessageImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TeamMessage
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? conversationId = null,
    Object? senderId = null,
    Object? content = null,
    Object? type = null,
    Object? timestamp = null,
    Object? isRead = null,
  }) {
    return _then(
      _$TeamMessageImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        conversationId: null == conversationId
            ? _value.conversationId
            : conversationId // ignore: cast_nullable_to_non_nullable
                  as String,
        senderId: null == senderId
            ? _value.senderId
            : senderId // ignore: cast_nullable_to_non_nullable
                  as String,
        content: null == content
            ? _value.content
            : content // ignore: cast_nullable_to_non_nullable
                  as String,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as TeamMessageType,
        timestamp: null == timestamp
            ? _value.timestamp
            : timestamp // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        isRead: null == isRead
            ? _value.isRead
            : isRead // ignore: cast_nullable_to_non_nullable
                  as bool,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TeamMessageImpl implements _TeamMessage {
  const _$TeamMessageImpl({
    required this.id,
    required this.conversationId,
    required this.senderId,
    required this.content,
    this.type = TeamMessageType.text,
    required this.timestamp,
    this.isRead = false,
  });

  factory _$TeamMessageImpl.fromJson(Map<String, dynamic> json) =>
      _$$TeamMessageImplFromJson(json);

  @override
  final String id;
  @override
  final String conversationId;
  @override
  final String senderId;
  @override
  final String content;
  @override
  @JsonKey()
  final TeamMessageType type;
  @override
  final DateTime timestamp;
  @override
  @JsonKey()
  final bool isRead;

  @override
  String toString() {
    return 'TeamMessage(id: $id, conversationId: $conversationId, senderId: $senderId, content: $content, type: $type, timestamp: $timestamp, isRead: $isRead)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TeamMessageImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.conversationId, conversationId) ||
                other.conversationId == conversationId) &&
            (identical(other.senderId, senderId) ||
                other.senderId == senderId) &&
            (identical(other.content, content) || other.content == content) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp) &&
            (identical(other.isRead, isRead) || other.isRead == isRead));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    conversationId,
    senderId,
    content,
    type,
    timestamp,
    isRead,
  );

  /// Create a copy of TeamMessage
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TeamMessageImplCopyWith<_$TeamMessageImpl> get copyWith =>
      __$$TeamMessageImplCopyWithImpl<_$TeamMessageImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$TeamMessageImplToJson(this);
  }
}

abstract class _TeamMessage implements TeamMessage {
  const factory _TeamMessage({
    required final String id,
    required final String conversationId,
    required final String senderId,
    required final String content,
    final TeamMessageType type,
    required final DateTime timestamp,
    final bool isRead,
  }) = _$TeamMessageImpl;

  factory _TeamMessage.fromJson(Map<String, dynamic> json) =
      _$TeamMessageImpl.fromJson;

  @override
  String get id;
  @override
  String get conversationId;
  @override
  String get senderId;
  @override
  String get content;
  @override
  TeamMessageType get type;
  @override
  DateTime get timestamp;
  @override
  bool get isRead;

  /// Create a copy of TeamMessage
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TeamMessageImplCopyWith<_$TeamMessageImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

TeamConversation _$TeamConversationFromJson(Map<String, dynamic> json) {
  return _TeamConversation.fromJson(json);
}

/// @nodoc
mixin _$TeamConversation {
  String get id => throw _privateConstructorUsedError;
  List<String> get participantIds => throw _privateConstructorUsedError;
  bool get isGroup => throw _privateConstructorUsedError;
  String? get groupName => throw _privateConstructorUsedError;
  TeamMessage? get lastMessage => throw _privateConstructorUsedError;
  int get unreadCount => throw _privateConstructorUsedError;
  DateTime? get updatedAt => throw _privateConstructorUsedError;

  /// Serializes this TeamConversation to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of TeamConversation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $TeamConversationCopyWith<TeamConversation> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TeamConversationCopyWith<$Res> {
  factory $TeamConversationCopyWith(
    TeamConversation value,
    $Res Function(TeamConversation) then,
  ) = _$TeamConversationCopyWithImpl<$Res, TeamConversation>;
  @useResult
  $Res call({
    String id,
    List<String> participantIds,
    bool isGroup,
    String? groupName,
    TeamMessage? lastMessage,
    int unreadCount,
    DateTime? updatedAt,
  });

  $TeamMessageCopyWith<$Res>? get lastMessage;
}

/// @nodoc
class _$TeamConversationCopyWithImpl<$Res, $Val extends TeamConversation>
    implements $TeamConversationCopyWith<$Res> {
  _$TeamConversationCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of TeamConversation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? participantIds = null,
    Object? isGroup = null,
    Object? groupName = freezed,
    Object? lastMessage = freezed,
    Object? unreadCount = null,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            participantIds: null == participantIds
                ? _value.participantIds
                : participantIds // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            isGroup: null == isGroup
                ? _value.isGroup
                : isGroup // ignore: cast_nullable_to_non_nullable
                      as bool,
            groupName: freezed == groupName
                ? _value.groupName
                : groupName // ignore: cast_nullable_to_non_nullable
                      as String?,
            lastMessage: freezed == lastMessage
                ? _value.lastMessage
                : lastMessage // ignore: cast_nullable_to_non_nullable
                      as TeamMessage?,
            unreadCount: null == unreadCount
                ? _value.unreadCount
                : unreadCount // ignore: cast_nullable_to_non_nullable
                      as int,
            updatedAt: freezed == updatedAt
                ? _value.updatedAt
                : updatedAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
          )
          as $Val,
    );
  }

  /// Create a copy of TeamConversation
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $TeamMessageCopyWith<$Res>? get lastMessage {
    if (_value.lastMessage == null) {
      return null;
    }

    return $TeamMessageCopyWith<$Res>(_value.lastMessage!, (value) {
      return _then(_value.copyWith(lastMessage: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$TeamConversationImplCopyWith<$Res>
    implements $TeamConversationCopyWith<$Res> {
  factory _$$TeamConversationImplCopyWith(
    _$TeamConversationImpl value,
    $Res Function(_$TeamConversationImpl) then,
  ) = __$$TeamConversationImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    List<String> participantIds,
    bool isGroup,
    String? groupName,
    TeamMessage? lastMessage,
    int unreadCount,
    DateTime? updatedAt,
  });

  @override
  $TeamMessageCopyWith<$Res>? get lastMessage;
}

/// @nodoc
class __$$TeamConversationImplCopyWithImpl<$Res>
    extends _$TeamConversationCopyWithImpl<$Res, _$TeamConversationImpl>
    implements _$$TeamConversationImplCopyWith<$Res> {
  __$$TeamConversationImplCopyWithImpl(
    _$TeamConversationImpl _value,
    $Res Function(_$TeamConversationImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of TeamConversation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? participantIds = null,
    Object? isGroup = null,
    Object? groupName = freezed,
    Object? lastMessage = freezed,
    Object? unreadCount = null,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _$TeamConversationImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        participantIds: null == participantIds
            ? _value._participantIds
            : participantIds // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        isGroup: null == isGroup
            ? _value.isGroup
            : isGroup // ignore: cast_nullable_to_non_nullable
                  as bool,
        groupName: freezed == groupName
            ? _value.groupName
            : groupName // ignore: cast_nullable_to_non_nullable
                  as String?,
        lastMessage: freezed == lastMessage
            ? _value.lastMessage
            : lastMessage // ignore: cast_nullable_to_non_nullable
                  as TeamMessage?,
        unreadCount: null == unreadCount
            ? _value.unreadCount
            : unreadCount // ignore: cast_nullable_to_non_nullable
                  as int,
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
class _$TeamConversationImpl implements _TeamConversation {
  const _$TeamConversationImpl({
    required this.id,
    required final List<String> participantIds,
    this.isGroup = false,
    this.groupName,
    this.lastMessage,
    this.unreadCount = 0,
    this.updatedAt,
  }) : _participantIds = participantIds;

  factory _$TeamConversationImpl.fromJson(Map<String, dynamic> json) =>
      _$$TeamConversationImplFromJson(json);

  @override
  final String id;
  final List<String> _participantIds;
  @override
  List<String> get participantIds {
    if (_participantIds is EqualUnmodifiableListView) return _participantIds;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_participantIds);
  }

  @override
  @JsonKey()
  final bool isGroup;
  @override
  final String? groupName;
  @override
  final TeamMessage? lastMessage;
  @override
  @JsonKey()
  final int unreadCount;
  @override
  final DateTime? updatedAt;

  @override
  String toString() {
    return 'TeamConversation(id: $id, participantIds: $participantIds, isGroup: $isGroup, groupName: $groupName, lastMessage: $lastMessage, unreadCount: $unreadCount, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TeamConversationImpl &&
            (identical(other.id, id) || other.id == id) &&
            const DeepCollectionEquality().equals(
              other._participantIds,
              _participantIds,
            ) &&
            (identical(other.isGroup, isGroup) || other.isGroup == isGroup) &&
            (identical(other.groupName, groupName) ||
                other.groupName == groupName) &&
            (identical(other.lastMessage, lastMessage) ||
                other.lastMessage == lastMessage) &&
            (identical(other.unreadCount, unreadCount) ||
                other.unreadCount == unreadCount) &&
            (identical(other.updatedAt, updatedAt) ||
                other.updatedAt == updatedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    const DeepCollectionEquality().hash(_participantIds),
    isGroup,
    groupName,
    lastMessage,
    unreadCount,
    updatedAt,
  );

  /// Create a copy of TeamConversation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TeamConversationImplCopyWith<_$TeamConversationImpl> get copyWith =>
      __$$TeamConversationImplCopyWithImpl<_$TeamConversationImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$TeamConversationImplToJson(this);
  }
}

abstract class _TeamConversation implements TeamConversation {
  const factory _TeamConversation({
    required final String id,
    required final List<String> participantIds,
    final bool isGroup,
    final String? groupName,
    final TeamMessage? lastMessage,
    final int unreadCount,
    final DateTime? updatedAt,
  }) = _$TeamConversationImpl;

  factory _TeamConversation.fromJson(Map<String, dynamic> json) =
      _$TeamConversationImpl.fromJson;

  @override
  String get id;
  @override
  List<String> get participantIds;
  @override
  bool get isGroup;
  @override
  String? get groupName;
  @override
  TeamMessage? get lastMessage;
  @override
  int get unreadCount;
  @override
  DateTime? get updatedAt;

  /// Create a copy of TeamConversation
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TeamConversationImplCopyWith<_$TeamConversationImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
