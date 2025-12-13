// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'harvest_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Harvest _$HarvestFromJson(Map<String, dynamic> json) => _Harvest(
  id: json['id'] as String,
  clientId: json['clientId'] as String,
  clientName: json['clientName'] as String,
  date: DateTime.parse(json['date'] as String),
  cropType: json['cropType'] as String,
  quantityTon: (json['quantityTon'] as num).toDouble(),
  storageLocation: json['storageLocation'] as String,
);

Map<String, dynamic> _$HarvestToJson(_Harvest instance) => <String, dynamic>{
  'id': instance.id,
  'clientId': instance.clientId,
  'clientName': instance.clientName,
  'date': instance.date.toIso8601String(),
  'cropType': instance.cropType,
  'quantityTon': instance.quantityTon,
  'storageLocation': instance.storageLocation,
};
