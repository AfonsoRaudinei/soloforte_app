import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:geolocator/geolocator.dart';
import '../domain/visit_model.dart';
import '../data/visit_repository.dart';
import '../../clients/domain/client_model.dart';

part 'visit_controller.g.dart';

@Riverpod(keepAlive: true)
class VisitController extends _$VisitController {
  @override
  Visit? build() {
    return null; // Null means no active visit
  }

  Future<void> checkIn(Client client) async {
    try {
      // Check permissions
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          throw Exception('Location permissions are denied');
        }
      }

      final position = await Geolocator.getCurrentPosition();

      final newVisit = Visit(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        client: client,
        checkInTime: DateTime.now(),
        latitude: position.latitude,
        longitude: position.longitude,
      );

      // Save to repo (although for active visit we mostly keep in state)
      await ref.read(visitRepositoryProvider).saveVisit(newVisit);
      state = newVisit;
    } catch (e) {
      throw Exception('Failed to check in: $e');
    }
  }

  Future<void> checkOut() async {
    final currentVisit = state;
    if (currentVisit == null) return;

    try {
      final completedVisit = currentVisit.copyWith(
        checkOutTime: DateTime.now(),
      );

      await ref.read(visitRepositoryProvider).saveVisit(completedVisit);
      state = null; // Clear active visit
    } catch (e) {
      throw Exception('Failed to check out: $e');
    }
  }
}
