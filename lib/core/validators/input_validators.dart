/// Input validators for forms and data validation
class Validators {
  // Email validation
  static String? email(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email é obrigatório';
    }

    final emailRegex = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );

    if (!emailRegex.hasMatch(value)) {
      return 'Email inválido';
    }

    return null;
  }

  // Password validation
  static String? password(String? value) {
    if (value == null || value.isEmpty) {
      return 'Senha é obrigatória';
    }

    if (value.length < 8) {
      return 'Senha deve ter no mínimo 8 caracteres';
    }

    if (!value.contains(RegExp(r'[A-Z]'))) {
      return 'Senha deve conter ao menos uma letra maiúscula';
    }

    if (!value.contains(RegExp(r'[0-9]'))) {
      return 'Senha deve conter ao menos um número';
    }

    return null;
  }

  // CPF validation
  static String? cpf(String? value) {
    if (value == null || value.isEmpty) {
      return 'CPF é obrigatório';
    }

    // Remove non-numeric characters
    final cpfNumbers = value.replaceAll(RegExp(r'[^0-9]'), '');

    if (cpfNumbers.length != 11) {
      return 'CPF deve ter 11 dígitos';
    }

    // Check if all digits are the same
    if (RegExp(r'^(\d)\1{10}$').hasMatch(cpfNumbers)) {
      return 'CPF inválido';
    }

    // Validate CPF algorithm
    if (!_validateCPF(cpfNumbers)) {
      return 'CPF inválido';
    }

    return null;
  }

  // CNPJ validation
  static String? cnpj(String? value) {
    if (value == null || value.isEmpty) {
      return 'CNPJ é obrigatório';
    }

    final cnpjNumbers = value.replaceAll(RegExp(r'[^0-9]'), '');

    if (cnpjNumbers.length != 14) {
      return 'CNPJ deve ter 14 dígitos';
    }

    if (!_validateCNPJ(cnpjNumbers)) {
      return 'CNPJ inválido';
    }

    return null;
  }

  // Phone validation
  static String? phone(String? value) {
    if (value == null || value.isEmpty) {
      return 'Telefone é obrigatório';
    }

    final phoneNumbers = value.replaceAll(RegExp(r'[^0-9]'), '');

    if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      return 'Telefone inválido';
    }

    return null;
  }

  // Required field
  static String? required(String? value, {String fieldName = 'Campo'}) {
    if (value == null || value.trim().isEmpty) {
      return '$fieldName é obrigatório';
    }
    return null;
  }

  // Min length
  static String? minLength(
    String? value,
    int min, {
    String fieldName = 'Campo',
  }) {
    if (value == null || value.length < min) {
      return '$fieldName deve ter no mínimo $min caracteres';
    }
    return null;
  }

  // Max length
  static String? maxLength(
    String? value,
    int max, {
    String fieldName = 'Campo',
  }) {
    if (value != null && value.length > max) {
      return '$fieldName deve ter no máximo $max caracteres';
    }
    return null;
  }

  // Numeric validation
  static String? numeric(String? value) {
    if (value == null || value.isEmpty) {
      return 'Valor é obrigatório';
    }

    if (double.tryParse(value) == null) {
      return 'Valor deve ser numérico';
    }

    return null;
  }

  // URL validation
  static String? url(String? value) {
    if (value == null || value.isEmpty) {
      return 'URL é obrigatória';
    }

    final urlRegex = RegExp(
      r'^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$',
    );

    if (!urlRegex.hasMatch(value)) {
      return 'URL inválida';
    }

    return null;
  }

  // Combine multiple validators
  static String? Function(String?) combine(
    List<String? Function(String?)> validators,
  ) {
    return (value) {
      for (final validator in validators) {
        final result = validator(value);
        if (result != null) return result;
      }
      return null;
    };
  }

  // Private helper methods
  static bool _validateCPF(String cpf) {
    // Calculate first digit
    int sum = 0;
    for (int i = 0; i < 9; i++) {
      sum += int.parse(cpf[i]) * (10 - i);
    }
    int digit1 = 11 - (sum % 11);
    if (digit1 >= 10) digit1 = 0;

    // Calculate second digit
    sum = 0;
    for (int i = 0; i < 10; i++) {
      sum += int.parse(cpf[i]) * (11 - i);
    }
    int digit2 = 11 - (sum % 11);
    if (digit2 >= 10) digit2 = 0;

    return digit1 == int.parse(cpf[9]) && digit2 == int.parse(cpf[10]);
  }

  static bool _validateCNPJ(String cnpj) {
    // CNPJ validation algorithm
    final weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    final weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    int sum = 0;
    for (int i = 0; i < 12; i++) {
      sum += int.parse(cnpj[i]) * weights1[i];
    }
    int digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    sum = 0;
    for (int i = 0; i < 13; i++) {
      sum += int.parse(cnpj[i]) * weights2[i];
    }
    int digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return digit1 == int.parse(cnpj[12]) && digit2 == int.parse(cnpj[13]);
  }
}

/// Input sanitization utilities
class InputSanitizer {
  // Remove HTML tags
  static String removeHtml(String input) {
    return input.replaceAll(RegExp(r'<[^>]*>'), '');
  }

  // Remove SQL injection patterns
  static String sanitizeSql(String input) {
    return input.replaceAll("'", "''").replaceAll(';', '').replaceAll('--', '');
  }

  // Remove script tags
  static String removeScripts(String input) {
    return input.replaceAll(
      RegExp(r'<script[^>]*>.*?</script>', caseSensitive: false),
      '',
    );
  }

  // Trim and normalize whitespace
  static String normalize(String input) {
    return input.trim().replaceAll(RegExp(r'\s+'), ' ');
  }

  // Remove special characters (keep only alphanumeric)
  static String alphanumeric(String input) {
    return input.replaceAll(RegExp(r'[^a-zA-Z0-9\s]'), '');
  }
}
