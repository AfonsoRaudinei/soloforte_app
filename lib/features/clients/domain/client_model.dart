import 'package:freezed_annotation/freezed_annotation.dart';

part 'client_model.freezed.dart';
part 'client_model.g.dart';

@freezed
abstract class Client with _$Client {
  const factory Client({
    required String id,
    required String name,
    required String email,
    required String phone,
    required String address,
    required String city,
    required String state,
    required String type, // 'producer', 'consultant'
    required int totalAreas,
    required double totalHectares,
    required String status, // 'active', 'inactive'
    required DateTime lastActivity,
    String? avatarUrl,
  }) = _Client;

  factory Client.fromJson(Map<String, dynamic> json) => _$ClientFromJson(json);
}
