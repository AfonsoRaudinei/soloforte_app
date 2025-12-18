// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hr_models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TimeEntryImpl _$$TimeEntryImplFromJson(Map<String, dynamic> json) =>
    _$TimeEntryImpl(
      id: json['id'] as String,
      memberId: json['memberId'] as String,
      startTime: DateTime.parse(json['startTime'] as String),
      endTime: json['endTime'] == null
          ? null
          : DateTime.parse(json['endTime'] as String),
      type:
          $enumDecodeNullable(_$TimeEntryTypeEnumMap, json['type']) ??
          TimeEntryType.regular,
      location: json['location'] as String?,
    );

Map<String, dynamic> _$$TimeEntryImplToJson(_$TimeEntryImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'memberId': instance.memberId,
      'startTime': instance.startTime.toIso8601String(),
      'endTime': instance.endTime?.toIso8601String(),
      'type': _$TimeEntryTypeEnumMap[instance.type]!,
      'location': instance.location,
    };

const _$TimeEntryTypeEnumMap = {
  TimeEntryType.regular: 'regular',
  TimeEntryType.overtime: 'overtime',
  TimeEntryType.breakTime: 'breakTime',
};

_$ApprovalRequestImpl _$$ApprovalRequestImplFromJson(
  Map<String, dynamic> json,
) => _$ApprovalRequestImpl(
  id: json['id'] as String,
  memberId: json['memberId'] as String,
  memberName: json['memberName'] as String,
  type: $enumDecode(_$RequestTypeEnumMap, json['type']),
  description: json['description'] as String,
  date: DateTime.parse(json['date'] as String),
  status: $enumDecode(_$RequestStatusEnumMap, json['status']),
  amount: (json['amount'] as num?)?.toDouble(),
  startDate: json['startDate'] == null
      ? null
      : DateTime.parse(json['startDate'] as String),
  endDate: json['endDate'] == null
      ? null
      : DateTime.parse(json['endDate'] as String),
);

Map<String, dynamic> _$$ApprovalRequestImplToJson(
  _$ApprovalRequestImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  'memberId': instance.memberId,
  'memberName': instance.memberName,
  'type': _$RequestTypeEnumMap[instance.type]!,
  'description': instance.description,
  'date': instance.date.toIso8601String(),
  'status': _$RequestStatusEnumMap[instance.status]!,
  'amount': instance.amount,
  'startDate': instance.startDate?.toIso8601String(),
  'endDate': instance.endDate?.toIso8601String(),
};

const _$RequestTypeEnumMap = {
  RequestType.vacation: 'vacation',
  RequestType.reimbursement: 'reimbursement',
  RequestType.overtime: 'overtime',
  RequestType.leave: 'leave',
};

const _$RequestStatusEnumMap = {
  RequestStatus.pending: 'pending',
  RequestStatus.approved: 'approved',
  RequestStatus.rejected: 'rejected',
};

_$SOSAlertImpl _$$SOSAlertImplFromJson(Map<String, dynamic> json) =>
    _$SOSAlertImpl(
      id: json['id'] as String,
      memberId: json['memberId'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      resolved: json['resolved'] as bool? ?? false,
      note: json['note'] as String?,
    );

Map<String, dynamic> _$$SOSAlertImplToJson(_$SOSAlertImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'memberId': instance.memberId,
      'timestamp': instance.timestamp.toIso8601String(),
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'resolved': instance.resolved,
      'note': instance.note,
    };
