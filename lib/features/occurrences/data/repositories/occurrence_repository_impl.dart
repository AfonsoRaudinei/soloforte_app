import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../domain/entities/occurrence.dart';
import '../../domain/repositories/occurrence_repository.dart';
import '../data_sources/occurrence_local_data_source.dart';
import '../dtos/occurrence_dto.dart';

part 'occurrence_repository_impl.g.dart';

class OccurrenceRepositoryImpl implements OccurrenceRepository {
  final OccurrenceLocalDataSource _dataSource;

  OccurrenceRepositoryImpl(this._dataSource);

  @override
  Future<List<Occurrence>> getOccurrences() async {
    final dtos = await _dataSource.getOccurrences();
    return dtos.map((e) => e.toDomain()).toList();
  }

  @override
  Future<Occurrence?> getOccurrenceById(String id) async {
    final dto = await _dataSource.getOccurrenceById(id);
    return dto?.toDomain();
  }

  @override
  Future<void> createOccurrence(Occurrence occurrence) async {
    await _dataSource.saveOccurrence(OccurrenceDto.fromDomain(occurrence));
  }

  @override
  Future<void> updateOccurrence(Occurrence occurrence) async {
    await _dataSource.saveOccurrence(OccurrenceDto.fromDomain(occurrence));
  }

  @override
  Future<void> deleteOccurrence(String id) async {
    await _dataSource.deleteOccurrence(id);
  }
}

@Riverpod(keepAlive: true)
OccurrenceRepository occurrenceRepository(OccurrenceRepositoryRef ref) {
  return OccurrenceRepositoryImpl(OccurrenceLocalDataSourceImpl());
}
