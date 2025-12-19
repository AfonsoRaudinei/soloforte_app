import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/repositories/visit_repository_impl.dart';
import '../domain/entities/visit.dart';

final visitByIdProvider = FutureProvider.family<Visit?, String>((
  ref,
  id,
) async {
  final repository = ref.watch(visitRepositoryProvider);
  return repository.getVisitById(id);
});
