// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'report_history.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

SavedReport _$SavedReportFromJson(Map<String, dynamic> json) {
  return _SavedReport.fromJson(json);
}

/// @nodoc
mixin _$SavedReport {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  ReportTemplate get template => throw _privateConstructorUsedError;
  DateTime get createdAt => throw _privateConstructorUsedError;
  ReportConfiguration get configuration => throw _privateConstructorUsedError;
  String? get pdfPath => throw _privateConstructorUsedError;
  int? get fileSizeBytes => throw _privateConstructorUsedError;
  bool get isFavorite => throw _privateConstructorUsedError;
  String? get sharedLink => throw _privateConstructorUsedError;
  DateTime? get lastViewedAt => throw _privateConstructorUsedError;
  int get viewCount => throw _privateConstructorUsedError;

  /// Serializes this SavedReport to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of SavedReport
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $SavedReportCopyWith<SavedReport> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SavedReportCopyWith<$Res> {
  factory $SavedReportCopyWith(
    SavedReport value,
    $Res Function(SavedReport) then,
  ) = _$SavedReportCopyWithImpl<$Res, SavedReport>;
  @useResult
  $Res call({
    String id,
    String title,
    ReportTemplate template,
    DateTime createdAt,
    ReportConfiguration configuration,
    String? pdfPath,
    int? fileSizeBytes,
    bool isFavorite,
    String? sharedLink,
    DateTime? lastViewedAt,
    int viewCount,
  });
}

/// @nodoc
class _$SavedReportCopyWithImpl<$Res, $Val extends SavedReport>
    implements $SavedReportCopyWith<$Res> {
  _$SavedReportCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of SavedReport
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? template = null,
    Object? createdAt = null,
    Object? configuration = null,
    Object? pdfPath = freezed,
    Object? fileSizeBytes = freezed,
    Object? isFavorite = null,
    Object? sharedLink = freezed,
    Object? lastViewedAt = freezed,
    Object? viewCount = null,
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
            template: null == template
                ? _value.template
                : template // ignore: cast_nullable_to_non_nullable
                      as ReportTemplate,
            createdAt: null == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            configuration: null == configuration
                ? _value.configuration
                : configuration // ignore: cast_nullable_to_non_nullable
                      as ReportConfiguration,
            pdfPath: freezed == pdfPath
                ? _value.pdfPath
                : pdfPath // ignore: cast_nullable_to_non_nullable
                      as String?,
            fileSizeBytes: freezed == fileSizeBytes
                ? _value.fileSizeBytes
                : fileSizeBytes // ignore: cast_nullable_to_non_nullable
                      as int?,
            isFavorite: null == isFavorite
                ? _value.isFavorite
                : isFavorite // ignore: cast_nullable_to_non_nullable
                      as bool,
            sharedLink: freezed == sharedLink
                ? _value.sharedLink
                : sharedLink // ignore: cast_nullable_to_non_nullable
                      as String?,
            lastViewedAt: freezed == lastViewedAt
                ? _value.lastViewedAt
                : lastViewedAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            viewCount: null == viewCount
                ? _value.viewCount
                : viewCount // ignore: cast_nullable_to_non_nullable
                      as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$SavedReportImplCopyWith<$Res>
    implements $SavedReportCopyWith<$Res> {
  factory _$$SavedReportImplCopyWith(
    _$SavedReportImpl value,
    $Res Function(_$SavedReportImpl) then,
  ) = __$$SavedReportImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String title,
    ReportTemplate template,
    DateTime createdAt,
    ReportConfiguration configuration,
    String? pdfPath,
    int? fileSizeBytes,
    bool isFavorite,
    String? sharedLink,
    DateTime? lastViewedAt,
    int viewCount,
  });
}

/// @nodoc
class __$$SavedReportImplCopyWithImpl<$Res>
    extends _$SavedReportCopyWithImpl<$Res, _$SavedReportImpl>
    implements _$$SavedReportImplCopyWith<$Res> {
  __$$SavedReportImplCopyWithImpl(
    _$SavedReportImpl _value,
    $Res Function(_$SavedReportImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of SavedReport
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? template = null,
    Object? createdAt = null,
    Object? configuration = null,
    Object? pdfPath = freezed,
    Object? fileSizeBytes = freezed,
    Object? isFavorite = null,
    Object? sharedLink = freezed,
    Object? lastViewedAt = freezed,
    Object? viewCount = null,
  }) {
    return _then(
      _$SavedReportImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        template: null == template
            ? _value.template
            : template // ignore: cast_nullable_to_non_nullable
                  as ReportTemplate,
        createdAt: null == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        configuration: null == configuration
            ? _value.configuration
            : configuration // ignore: cast_nullable_to_non_nullable
                  as ReportConfiguration,
        pdfPath: freezed == pdfPath
            ? _value.pdfPath
            : pdfPath // ignore: cast_nullable_to_non_nullable
                  as String?,
        fileSizeBytes: freezed == fileSizeBytes
            ? _value.fileSizeBytes
            : fileSizeBytes // ignore: cast_nullable_to_non_nullable
                  as int?,
        isFavorite: null == isFavorite
            ? _value.isFavorite
            : isFavorite // ignore: cast_nullable_to_non_nullable
                  as bool,
        sharedLink: freezed == sharedLink
            ? _value.sharedLink
            : sharedLink // ignore: cast_nullable_to_non_nullable
                  as String?,
        lastViewedAt: freezed == lastViewedAt
            ? _value.lastViewedAt
            : lastViewedAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        viewCount: null == viewCount
            ? _value.viewCount
            : viewCount // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$SavedReportImpl implements _SavedReport {
  const _$SavedReportImpl({
    required this.id,
    required this.title,
    required this.template,
    required this.createdAt,
    required this.configuration,
    this.pdfPath,
    this.fileSizeBytes,
    this.isFavorite = false,
    this.sharedLink,
    this.lastViewedAt,
    this.viewCount = 0,
  });

  factory _$SavedReportImpl.fromJson(Map<String, dynamic> json) =>
      _$$SavedReportImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  @override
  final ReportTemplate template;
  @override
  final DateTime createdAt;
  @override
  final ReportConfiguration configuration;
  @override
  final String? pdfPath;
  @override
  final int? fileSizeBytes;
  @override
  @JsonKey()
  final bool isFavorite;
  @override
  final String? sharedLink;
  @override
  final DateTime? lastViewedAt;
  @override
  @JsonKey()
  final int viewCount;

  @override
  String toString() {
    return 'SavedReport(id: $id, title: $title, template: $template, createdAt: $createdAt, configuration: $configuration, pdfPath: $pdfPath, fileSizeBytes: $fileSizeBytes, isFavorite: $isFavorite, sharedLink: $sharedLink, lastViewedAt: $lastViewedAt, viewCount: $viewCount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SavedReportImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.template, template) ||
                other.template == template) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.configuration, configuration) ||
                other.configuration == configuration) &&
            (identical(other.pdfPath, pdfPath) || other.pdfPath == pdfPath) &&
            (identical(other.fileSizeBytes, fileSizeBytes) ||
                other.fileSizeBytes == fileSizeBytes) &&
            (identical(other.isFavorite, isFavorite) ||
                other.isFavorite == isFavorite) &&
            (identical(other.sharedLink, sharedLink) ||
                other.sharedLink == sharedLink) &&
            (identical(other.lastViewedAt, lastViewedAt) ||
                other.lastViewedAt == lastViewedAt) &&
            (identical(other.viewCount, viewCount) ||
                other.viewCount == viewCount));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    title,
    template,
    createdAt,
    configuration,
    pdfPath,
    fileSizeBytes,
    isFavorite,
    sharedLink,
    lastViewedAt,
    viewCount,
  );

  /// Create a copy of SavedReport
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$SavedReportImplCopyWith<_$SavedReportImpl> get copyWith =>
      __$$SavedReportImplCopyWithImpl<_$SavedReportImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$SavedReportImplToJson(this);
  }
}

abstract class _SavedReport implements SavedReport {
  const factory _SavedReport({
    required final String id,
    required final String title,
    required final ReportTemplate template,
    required final DateTime createdAt,
    required final ReportConfiguration configuration,
    final String? pdfPath,
    final int? fileSizeBytes,
    final bool isFavorite,
    final String? sharedLink,
    final DateTime? lastViewedAt,
    final int viewCount,
  }) = _$SavedReportImpl;

  factory _SavedReport.fromJson(Map<String, dynamic> json) =
      _$SavedReportImpl.fromJson;

  @override
  String get id;
  @override
  String get title;
  @override
  ReportTemplate get template;
  @override
  DateTime get createdAt;
  @override
  ReportConfiguration get configuration;
  @override
  String? get pdfPath;
  @override
  int? get fileSizeBytes;
  @override
  bool get isFavorite;
  @override
  String? get sharedLink;
  @override
  DateTime? get lastViewedAt;
  @override
  int get viewCount;

  /// Create a copy of SavedReport
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$SavedReportImplCopyWith<_$SavedReportImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ReportSchedule _$ReportScheduleFromJson(Map<String, dynamic> json) {
  return _ReportSchedule.fromJson(json);
}

/// @nodoc
mixin _$ReportSchedule {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  ReportTemplate get template => throw _privateConstructorUsedError;
  ReportConfiguration get configuration => throw _privateConstructorUsedError;
  ScheduleFrequency get frequency => throw _privateConstructorUsedError;
  DateTime get nextRunAt => throw _privateConstructorUsedError;
  DateTime? get lastRunAt => throw _privateConstructorUsedError;
  bool get isActive => throw _privateConstructorUsedError;
  List<String>? get emailRecipients => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;

  /// Serializes this ReportSchedule to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ReportSchedule
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ReportScheduleCopyWith<ReportSchedule> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ReportScheduleCopyWith<$Res> {
  factory $ReportScheduleCopyWith(
    ReportSchedule value,
    $Res Function(ReportSchedule) then,
  ) = _$ReportScheduleCopyWithImpl<$Res, ReportSchedule>;
  @useResult
  $Res call({
    String id,
    String title,
    ReportTemplate template,
    ReportConfiguration configuration,
    ScheduleFrequency frequency,
    DateTime nextRunAt,
    DateTime? lastRunAt,
    bool isActive,
    List<String>? emailRecipients,
    String? notes,
  });
}

/// @nodoc
class _$ReportScheduleCopyWithImpl<$Res, $Val extends ReportSchedule>
    implements $ReportScheduleCopyWith<$Res> {
  _$ReportScheduleCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ReportSchedule
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? template = null,
    Object? configuration = null,
    Object? frequency = null,
    Object? nextRunAt = null,
    Object? lastRunAt = freezed,
    Object? isActive = null,
    Object? emailRecipients = freezed,
    Object? notes = freezed,
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
            template: null == template
                ? _value.template
                : template // ignore: cast_nullable_to_non_nullable
                      as ReportTemplate,
            configuration: null == configuration
                ? _value.configuration
                : configuration // ignore: cast_nullable_to_non_nullable
                      as ReportConfiguration,
            frequency: null == frequency
                ? _value.frequency
                : frequency // ignore: cast_nullable_to_non_nullable
                      as ScheduleFrequency,
            nextRunAt: null == nextRunAt
                ? _value.nextRunAt
                : nextRunAt // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            lastRunAt: freezed == lastRunAt
                ? _value.lastRunAt
                : lastRunAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            isActive: null == isActive
                ? _value.isActive
                : isActive // ignore: cast_nullable_to_non_nullable
                      as bool,
            emailRecipients: freezed == emailRecipients
                ? _value.emailRecipients
                : emailRecipients // ignore: cast_nullable_to_non_nullable
                      as List<String>?,
            notes: freezed == notes
                ? _value.notes
                : notes // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ReportScheduleImplCopyWith<$Res>
    implements $ReportScheduleCopyWith<$Res> {
  factory _$$ReportScheduleImplCopyWith(
    _$ReportScheduleImpl value,
    $Res Function(_$ReportScheduleImpl) then,
  ) = __$$ReportScheduleImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String title,
    ReportTemplate template,
    ReportConfiguration configuration,
    ScheduleFrequency frequency,
    DateTime nextRunAt,
    DateTime? lastRunAt,
    bool isActive,
    List<String>? emailRecipients,
    String? notes,
  });
}

/// @nodoc
class __$$ReportScheduleImplCopyWithImpl<$Res>
    extends _$ReportScheduleCopyWithImpl<$Res, _$ReportScheduleImpl>
    implements _$$ReportScheduleImplCopyWith<$Res> {
  __$$ReportScheduleImplCopyWithImpl(
    _$ReportScheduleImpl _value,
    $Res Function(_$ReportScheduleImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ReportSchedule
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? template = null,
    Object? configuration = null,
    Object? frequency = null,
    Object? nextRunAt = null,
    Object? lastRunAt = freezed,
    Object? isActive = null,
    Object? emailRecipients = freezed,
    Object? notes = freezed,
  }) {
    return _then(
      _$ReportScheduleImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        template: null == template
            ? _value.template
            : template // ignore: cast_nullable_to_non_nullable
                  as ReportTemplate,
        configuration: null == configuration
            ? _value.configuration
            : configuration // ignore: cast_nullable_to_non_nullable
                  as ReportConfiguration,
        frequency: null == frequency
            ? _value.frequency
            : frequency // ignore: cast_nullable_to_non_nullable
                  as ScheduleFrequency,
        nextRunAt: null == nextRunAt
            ? _value.nextRunAt
            : nextRunAt // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        lastRunAt: freezed == lastRunAt
            ? _value.lastRunAt
            : lastRunAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        isActive: null == isActive
            ? _value.isActive
            : isActive // ignore: cast_nullable_to_non_nullable
                  as bool,
        emailRecipients: freezed == emailRecipients
            ? _value._emailRecipients
            : emailRecipients // ignore: cast_nullable_to_non_nullable
                  as List<String>?,
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
class _$ReportScheduleImpl implements _ReportSchedule {
  const _$ReportScheduleImpl({
    required this.id,
    required this.title,
    required this.template,
    required this.configuration,
    required this.frequency,
    required this.nextRunAt,
    this.lastRunAt,
    this.isActive = true,
    final List<String>? emailRecipients,
    this.notes,
  }) : _emailRecipients = emailRecipients;

  factory _$ReportScheduleImpl.fromJson(Map<String, dynamic> json) =>
      _$$ReportScheduleImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  @override
  final ReportTemplate template;
  @override
  final ReportConfiguration configuration;
  @override
  final ScheduleFrequency frequency;
  @override
  final DateTime nextRunAt;
  @override
  final DateTime? lastRunAt;
  @override
  @JsonKey()
  final bool isActive;
  final List<String>? _emailRecipients;
  @override
  List<String>? get emailRecipients {
    final value = _emailRecipients;
    if (value == null) return null;
    if (_emailRecipients is EqualUnmodifiableListView) return _emailRecipients;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  final String? notes;

  @override
  String toString() {
    return 'ReportSchedule(id: $id, title: $title, template: $template, configuration: $configuration, frequency: $frequency, nextRunAt: $nextRunAt, lastRunAt: $lastRunAt, isActive: $isActive, emailRecipients: $emailRecipients, notes: $notes)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ReportScheduleImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.template, template) ||
                other.template == template) &&
            (identical(other.configuration, configuration) ||
                other.configuration == configuration) &&
            (identical(other.frequency, frequency) ||
                other.frequency == frequency) &&
            (identical(other.nextRunAt, nextRunAt) ||
                other.nextRunAt == nextRunAt) &&
            (identical(other.lastRunAt, lastRunAt) ||
                other.lastRunAt == lastRunAt) &&
            (identical(other.isActive, isActive) ||
                other.isActive == isActive) &&
            const DeepCollectionEquality().equals(
              other._emailRecipients,
              _emailRecipients,
            ) &&
            (identical(other.notes, notes) || other.notes == notes));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    title,
    template,
    configuration,
    frequency,
    nextRunAt,
    lastRunAt,
    isActive,
    const DeepCollectionEquality().hash(_emailRecipients),
    notes,
  );

  /// Create a copy of ReportSchedule
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ReportScheduleImplCopyWith<_$ReportScheduleImpl> get copyWith =>
      __$$ReportScheduleImplCopyWithImpl<_$ReportScheduleImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$ReportScheduleImplToJson(this);
  }
}

abstract class _ReportSchedule implements ReportSchedule {
  const factory _ReportSchedule({
    required final String id,
    required final String title,
    required final ReportTemplate template,
    required final ReportConfiguration configuration,
    required final ScheduleFrequency frequency,
    required final DateTime nextRunAt,
    final DateTime? lastRunAt,
    final bool isActive,
    final List<String>? emailRecipients,
    final String? notes,
  }) = _$ReportScheduleImpl;

  factory _ReportSchedule.fromJson(Map<String, dynamic> json) =
      _$ReportScheduleImpl.fromJson;

  @override
  String get id;
  @override
  String get title;
  @override
  ReportTemplate get template;
  @override
  ReportConfiguration get configuration;
  @override
  ScheduleFrequency get frequency;
  @override
  DateTime get nextRunAt;
  @override
  DateTime? get lastRunAt;
  @override
  bool get isActive;
  @override
  List<String>? get emailRecipients;
  @override
  String? get notes;

  /// Create a copy of ReportSchedule
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ReportScheduleImplCopyWith<_$ReportScheduleImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
