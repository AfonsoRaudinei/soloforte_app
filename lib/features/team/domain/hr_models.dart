import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'hr_models.freezed.dart';
part 'hr_models.g.dart';

@freezed
class TimeEntry with _$TimeEntry {
  const factory TimeEntry({
    required String id,
    required String memberId,
    required DateTime startTime,
    DateTime? endTime,
    @Default(TimeEntryType.regular) TimeEntryType type,
    String? location,
  }) = _TimeEntry;

  factory TimeEntry.fromJson(Map<String, dynamic> json) =>
      _$TimeEntryFromJson(json);
}

enum TimeEntryType { regular, overtime, breakTime }

@freezed
class ApprovalRequest with _$ApprovalRequest {
  const factory ApprovalRequest({
    required String id,
    required String memberId,
    required String memberName,
    required RequestType type,
    required String description,
    required DateTime date,
    required RequestStatus status,
    double? amount, // For reimbursement
    DateTime? startDate, // For vacation
    DateTime? endDate, // For vacation
  }) = _ApprovalRequest;

  factory ApprovalRequest.fromJson(Map<String, dynamic> json) =>
      _$ApprovalRequestFromJson(json);
}

enum RequestType { vacation, reimbursement, overtime, leave }

enum RequestStatus { pending, approved, rejected }

@freezed
class SOSAlert with _$SOSAlert {
  const factory SOSAlert({
    required String id,
    required String memberId,
    required DateTime timestamp,
    required double latitude,
    required double longitude,
    @Default(false) bool resolved,
    String? note,
  }) = _SOSAlert;

  factory SOSAlert.fromJson(Map<String, dynamic> json) =>
      _$SOSAlertFromJson(json);
}
