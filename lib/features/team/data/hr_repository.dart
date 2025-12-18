import 'package:soloforte_app/features/team/domain/hr_models.dart';

abstract class HRRepository {
  // Time Clock
  Future<List<TimeEntry>> getTodayEntries(String memberId);
  Future<void> clockIn(String memberId, String location);
  Future<void> clockOut(String memberId, String entryId);

  // Approvals
  Future<List<ApprovalRequest>> getPendingRequests();
  Future<void> approveRequest(String requestId);
  Future<void> rejectRequest(String requestId);

  // SOS
  Future<void> sendSOS(String memberId, double lat, double long);
}

class MockHRRepository implements HRRepository {
  final List<TimeEntry> _mockEntries = [
    TimeEntry(
      id: 'te1',
      memberId: 'me',
      startTime: DateTime.now().subtract(const Duration(hours: 4)),
      location: 'Sede Fazenda Sol',
    ),
  ];

  final List<ApprovalRequest> _mockRequests = [
    ApprovalRequest(
      id: 'r1',
      memberId: '2',
      memberName: 'Ana Silva',
      type: RequestType.vacation,
      description: 'Férias de Verão',
      date: DateTime.now(),
      status: RequestStatus.pending,
      startDate: DateTime.now().add(const Duration(days: 10)),
      endDate: DateTime.now().add(const Duration(days: 25)),
    ),
    ApprovalRequest(
      id: 'r2',
      memberId: '3',
      memberName: 'Roberto Santos',
      type: RequestType.reimbursement,
      description: 'Combustível Visita Técnica',
      date: DateTime.now().subtract(const Duration(days: 1)),
      status: RequestStatus.pending,
      amount: 150.00,
    ),
  ];

  @override
  Future<List<TimeEntry>> getTodayEntries(String memberId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _mockEntries; // Return the mock list, realistically would filter by member/date
  }

  @override
  Future<void> clockIn(String memberId, String location) async {
    await Future.delayed(const Duration(milliseconds: 500));
    _mockEntries.add(
      TimeEntry(
        id: DateTime.now().toString(),
        memberId: memberId,
        startTime: DateTime.now(),
        location: location,
      ),
    );
  }

  @override
  Future<void> clockOut(String memberId, String entryId) async {
    await Future.delayed(const Duration(milliseconds: 500));
    final index = _mockEntries.indexWhere((e) => e.id == entryId);
    if (index != -1) {
      _mockEntries[index] = _mockEntries[index].copyWith(
        endTime: DateTime.now(),
      );
    }
  }

  @override
  Future<List<ApprovalRequest>> getPendingRequests() async {
    await Future.delayed(const Duration(milliseconds: 600));
    return _mockRequests
        .where((r) => r.status == RequestStatus.pending)
        .toList();
  }

  @override
  Future<void> approveRequest(String requestId) async {
    await Future.delayed(const Duration(milliseconds: 400));
    final index = _mockRequests.indexWhere((r) => r.id == requestId);
    if (index != -1) {
      _mockRequests[index] = _mockRequests[index].copyWith(
        status: RequestStatus.approved,
      );
    }
  }

  @override
  Future<void> rejectRequest(String requestId) async {
    await Future.delayed(const Duration(milliseconds: 400));
    final index = _mockRequests.indexWhere((r) => r.id == requestId);
    if (index != -1) {
      _mockRequests[index] = _mockRequests[index].copyWith(
        status: RequestStatus.rejected,
      );
    }
  }

  @override
  Future<void> sendSOS(String memberId, double lat, double long) async {
    await Future.delayed(const Duration(seconds: 1));
    // Simulate API call to emergency services
  }
}
