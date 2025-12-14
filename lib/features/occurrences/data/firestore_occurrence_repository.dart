import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:soloforte_app/features/occurrences/data/occurrence_repository.dart';
import 'package:soloforte_app/features/occurrences/domain/occurrence_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FirestoreOccurrenceRepository implements OccurrenceRepository {
  final FirebaseFirestore _firestore;

  FirestoreOccurrenceRepository(this._firestore);

  @override
  Future<List<Occurrence>> getOccurrences() async {
    try {
      final snapshot = await _firestore
          .collection('occurrences')
          .orderBy('date', descending: true)
          .get();
      return snapshot.docs.map((doc) {
        final data = doc.data();
        // Robustly handle 'date': could be String (ISO8601) or Timestamp
        if (data['date'] is Timestamp) {
          data['date'] = (data['date'] as Timestamp).toDate().toIso8601String();
        }
        return Occurrence.fromJson({...data, 'id': doc.id});
      }).toList();
    } catch (e) {
      // Fallback/Log
      print('Error fetching occurrences: $e');
      return [];
    }
  }

  @override
  Future<Occurrence?> getOccurrenceById(String id) async {
    try {
      final doc = await _firestore.collection('occurrences').doc(id).get();
      if (doc.exists && doc.data() != null) {
        return Occurrence.fromJson({...doc.data()!, 'id': doc.id});
      }
      return null;
    } catch (e) {
      print('Error fetching occurrence $id: $e');
      return null;
    }
  }

  @override
  Future<void> createOccurrence(Occurrence occurrence) async {
    // ID creation managed by Firestore usually, but if model has ID, use .doc(id).set()
    if (occurrence.id.isNotEmpty) {
      await _firestore
          .collection('occurrences')
          .doc(occurrence.id)
          .set(occurrence.toJson());
    } else {
      await _firestore.collection('occurrences').add(occurrence.toJson());
    }
  }

  @override
  Future<void> updateOccurrence(Occurrence occurrence) async {
    await _firestore
        .collection('occurrences')
        .doc(occurrence.id)
        .update(occurrence.toJson());
  }

  @override
  Future<void> deleteOccurrence(String id) async {
    await _firestore.collection('occurrences').doc(id).delete();
  }
}

// Provider
// Provider
final firestoreOccurrenceRepositoryProvider = Provider<OccurrenceRepository>((
  ref,
) {
  return FirestoreOccurrenceRepository(FirebaseFirestore.instance);
});
