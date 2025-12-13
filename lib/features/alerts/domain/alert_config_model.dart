import 'package:freezed_annotation/freezed_annotation.dart';

part 'alert_config_model.freezed.dart';
part 'alert_config_model.g.dart';

enum AlertType { weather, pest, ndvi, visit, report }

@freezed
class AlertConfig with _$AlertConfig {
  const factory AlertConfig({
    required String id,
    required AlertType type,
    required String title,
    required bool isEnabled,
    @Default(true) bool pushNotification,
    @Default(false) bool emailNotification,
    @Default(false) bool smsNotification,
    Map<String, dynamic>? conditions,
  }) = _AlertConfig;

  factory AlertConfig.fromJson(Map<String, dynamic> json) =>
      _$AlertConfigFromJson(json);
}
