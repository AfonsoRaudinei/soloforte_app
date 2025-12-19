import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:soloforte_app/features/visits/data/visit_repository.dart';
import 'package:soloforte_app/features/visits/domain/visit_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FirestoreVisitRepository implements VisitRepository {
  final FirebaseFirestore _firestore;

  FirestoreVisitRepository(this._firestore);

  @override
  Future<List<Visit>> getVisits() async {
    try {
      final snapshot = await _firestore
          .collection('visits')
          .orderBy('checkInTime', descending: true)
          .get();
      return snapshot.docs.map((doc) {
        final data = doc.data();
        // Robustly handle Timestamps
        if (data['checkInTime'] is Timestamp) {
          data['checkInTime'] = (data['checkInTime'] as Timestamp)
              .toDate()
              .toIso8601String();
        }
        if (data['checkOutTime'] is Timestamp) {
          data['checkOutTime'] = (data['checkOutTime'] as Timestamp)
              .toDate()
              .toIso8601String();
        }
        return Visit.fromJson({...data, 'id': doc.id});
      }).toList();
    } catch (e) {
      print('Error fetching visits: $e');
      return [];
    }
  }

  @override
  Future<void> saveVisit(Visit visit) async {
    if (visit.id.isNotEmpty) {
      await _firestore.collection('visits').doc(visit.id).set(visit.toJson());
    } else {
      await _firestore.collection('visits').add(visit.toJson());
    }
  }

  @override
  Future<Visit?> getActiveVisit() async {
    // TODO: Implement syncing logic. For now, we rely on local repository for active visit.
    return null;
  }

  @override
  Future<Visit?> getVisitById(String id) async {
    try {
      final doc = await _firestore.collection('visits').doc(id).get();
      if (!doc.exists) return null;
      final data = doc.data()!;
      if (data['checkInTime'] is Timestamp) {
        data['checkInTime'] = (data['checkInTime'] as Timestamp)
            .toDate()
            .toIso8601String();
      }
      if (data['checkOutTime'] is Timestamp) {
        data['checkOutTime'] = (data['checkOutTime'] as Timestamp)
            .toDate()
            .toIso8601String();
      }
      return Visit.fromJson({...data, 'id': doc.id});
    } catch (e) {
      return null;
    }
  }
}

// Provider override would happen in main or here via a specific provider
final firestoreVisitRepositoryProvider = Provider<VisitRepository>((ref) {
  return FirestoreVisitRepository(FirebaseFirestore.instance);
});
