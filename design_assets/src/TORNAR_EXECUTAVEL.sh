#!/bin/bash

# ============================================
# 🔧 TORNAR SCRIPTS EXECUTÁVEIS
# ============================================

echo "🔧 Tornando scripts executáveis..."

# Scripts principais
chmod +x EXECUTAR_P0_CREDENCIAIS.sh
chmod +x SCRIPT_SCAN_SECRETS.sh

# Validador
chmod +x scripts/validate-env.js

echo "✅ Scripts agora são executáveis!"
echo ""
echo "Você pode executar:"
echo "  ./EXECUTAR_P0_CREDENCIAIS.sh"
echo "  ./SCRIPT_SCAN_SECRETS.sh"
echo "  node scripts/validate-env.js"
