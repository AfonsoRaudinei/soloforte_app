import 'package:flutter/material.dart';

const Map<String, dynamic> visitStages = {
  'VE': {
    'icon': '🌱',
    'name': 'VE - Emergência',
    'description': 'Cotilédones rompem o solo',
    'dap': '0 DAP',
    'attention': [
      'Absorção de água: mínimo 50% do peso',
      'Temperatura ideal: 20-30°C',
    ],
  },
  'VC': {
    'icon': '🌿',
    'name': 'VC - Cotilédones',
    'description': 'Cotilédones totalmente abertos',
    'dap': '3 DAP',
    'attention': [
      'Uso de reservas dos cotilédones',
      'Cuidado com plantas daninhas',
    ],
  },
  'V1': {
    'icon': '🍃',
    'name': 'V1 - 1ª Trifoliolada',
    'description': '1ª folha trifoliolada desenvolvida',
    'dap': '8 DAP',
    'attention': ['Monitorar lagarta e pulgão', 'Fixação de N₂ iniciando'],
  },
  'V2': {
    'icon': '🍃',
    'name': 'V2 - 2ª Trifoliolada',
    'description': '2ª folha trifoliolada',
    'dap': '13 DAP',
    'attention': [
      'Crescimento vegetativo intenso',
      'Aumento demanda nutricional',
    ],
  },
  'V3': {
    'icon': '🍃',
    'name': 'V3 - 3ª Trifoliolada',
    'description': '3ª folha trifoliolada',
    'dap': '18 DAP',
    'attention': [
      'Período crítico competição daninhas',
      'Crescimento radicular ativo',
    ],
  },
  'V4': {
    'icon': '🍃',
    'name': 'V4 - 4ª Trifoliolada',
    'description': '4ª folha trifoliolada',
    'dap': '20-25 DAP',
    'attention': [
      'Máximo crescimento vegetativo',
      'Controle de lagartas e percevejos',
    ],
  },
  'R1': {
    'icon': '🌸',
    'name': 'R1 - Florescimento',
    'description': 'Uma flor aberta',
    'dap': '35-45 DAP',
    'attention': [
      'Início fase reprodutiva',
      'Déficit hídrico crítico',
      'Atenção ao Boro',
    ],
  },
  'R2': {
    'icon': '🌼',
    'name': 'R2 - Floração Plena',
    'description': 'Flor aberta no terço superior',
    'dap': '50-60 DAP',
    'attention': ['Máxima demanda hídrica', 'Monitorar desfolhadoras'],
  },
  'R3': {
    'icon': '🫘',
    'name': 'R3 - Formação Vagens',
    'description': 'Vagem com 1cm',
    'dap': '60-70 DAP',
    'attention': ['Monitoramento de percevejos intensificado'],
  },
  'R5.1': {
    'icon': '🫛',
    'name': 'R5.1 - Início Enchimento',
    'description': 'Grãos 10% de granação',
    'dap': '80-90 DAP',
    'attention': [
      'Máximo desenvolvimento foliar/raízes',
      'Translocação intensa',
    ],
  },
  'R7': {
    'icon': '🌾',
    'name': 'R7 - Início Maturação',
    'description': 'Uma vagem madura',
    'dap': '110-120 DAP',
    'attention': ['Início da senescência', 'Planejar dessecação'],
  },
  'R8': {
    'icon': '🌾',
    'name': 'R8 - Maturação Plena',
    'description': '95% vagens maduras',
    'dap': '115-130 DAP',
    'attention': ['Ponto de colheita', 'Umidade 13-15%'],
  },
};

const Map<String, dynamic> visitCategories = {
  'doenca': {
    'icon': '🦠',
    'title': 'Doença',
    'color': Color(0xFF34C759),
    'type': 'multi',
    'levels': [
      {'id': 'incidencia', 'name': 'Incidência'},
      {'id': 'severidade', 'name': 'Severidade'},
    ],
  },
  'insetos': {
    'icon': '🐛',
    'title': 'Insetos',
    'color': Color(0xFFFF2D55),
    'type': 'multi',
    'levels': [
      {'id': 'desfolha', 'name': 'Desfolha'},
      {'id': 'infestacao', 'name': 'Infestação'},
      {'id': 'acamamento', 'name': 'Acamamento'},
    ],
  },
  'ervas': {
    'icon': '🌾',
    'title': 'Ervas Daninhas',
    'color': Color(0xFFFF9500),
    'type': 'standard',
  },
  'nutrientes': {
    'icon': 'Ⓝ',
    'title': 'Nutrientes',
    'color': Color(0xFF8E8E93),
    'type': 'nutrients',
  },
  'agua': {
    'icon': '💧',
    'title': 'Água',
    'color': Color(0xFF30B0C7),
    'type': 'severity',
  },
};

const List<Map<String, String>> nutrientsList = [
  {'id': 'N', 'name': 'Nitrogênio', 'symbol': 'N'},
  {'id': 'P', 'name': 'Fósforo', 'symbol': 'P'},
  {'id': 'K', 'name': 'Potássio', 'symbol': 'K'},
  {'id': 'Ca', 'name': 'Cálcio', 'symbol': 'Ca'},
  {'id': 'Mg', 'name': 'Magnésio', 'symbol': 'Mg'},
  {'id': 'S', 'name': 'Enxofre', 'symbol': 'S'},
  {'id': 'B', 'name': 'Boro', 'symbol': 'B'},
  {'id': 'Zn', 'name': 'Zinco', 'symbol': 'Zn'},
];
