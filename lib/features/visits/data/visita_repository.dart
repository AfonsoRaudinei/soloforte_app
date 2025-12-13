import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../domain/visita_model.dart';

class VisitaRepository {
  static const String _activeVisitKey = 'active_visit';
  static const String _visitHistoryKey = 'visit_history';

  // Salvar visita ativa
  Future<void> saveActiveVisit(Visita visita) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final json = visita.toJson();
      await prefs.setString(_activeVisitKey, jsonEncode(json));
    } catch (e) {
      debugPrint('Erro ao salvar visita ativa: $e');
    }
  }

  // Carregar visita ativa
  Future<Visita?> loadActiveVisit() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = prefs.getString(_activeVisitKey);

      if (jsonString == null) return null;

      final json = jsonDecode(jsonString) as Map<String, dynamic>;
      return Visita.fromJson(json);
    } catch (e) {
      debugPrint('Erro ao carregar visita ativa: $e');
      return null;
    }
  }

  // Limpar visita ativa
  Future<void> clearActiveVisit() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_activeVisitKey);
    } catch (e) {
      debugPrint('Erro ao limpar visita ativa: $e');
    }
  }

  // Adicionar ao histórico
  Future<void> addToHistory(Visita visita) async {
    try {
      final history = await loadHistory();
      history.insert(0, visita);

      // Manter apenas últimas 50 visitas
      if (history.length > 50) {
        history.removeRange(50, history.length);
      }

      final prefs = await SharedPreferences.getInstance();
      final jsonList = history.map((v) => v.toJson()).toList();
      await prefs.setString(_visitHistoryKey, jsonEncode(jsonList));
    } catch (e) {
      debugPrint('Erro ao adicionar ao histórico: $e');
    }
  }

  // Carregar histórico
  Future<List<Visita>> loadHistory() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = prefs.getString(_visitHistoryKey);

      if (jsonString == null) return [];

      final decoded = jsonDecode(jsonString) as List;
      return decoded
          .cast<Map<String, dynamic>>()
          .map((json) => Visita.fromJson(json))
          .toList();
    } catch (e) {
      debugPrint('Erro ao carregar histórico: $e');
      return [];
    }
  }
}
