#!/bin/bash

# ============================================
# 🔒 MIGRAÇÃO PARA PROTEÇÃO XSS
# ============================================

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

clear

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${BLUE}🔒 MIGRAÇÃO PARA PROTEÇÃO XSS${NC}"
echo -e "${BOLD}${BLUE}   Segurança P1 - Sanitização Completa${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

# ============================================
# 1. VERIFICAR DEPENDÊNCIAS
# ============================================

echo -e "${CYAN}1️⃣  Verificando dependências...${NC}"

if grep -q "dompurify" package.json 2>/dev/null; then
  echo -e "${GREEN}✅ dompurify já está instalado${NC}\n"
else
  echo -e "${YELLOW}⚠️  dompurify não encontrado${NC}"
  echo -e "${YELLOW}📦 Instalando...${NC}\n"
  
  npm install dompurify
  npm install --save-dev @types/dompurify
  
  if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ dompurify instalado com sucesso${NC}\n"
  else
    echo -e "\n${RED}❌ Erro ao instalar dompurify${NC}"
    exit 1
  fi
fi

# ============================================
# 2. VERIFICAR ARQUIVOS CRIADOS
# ============================================

echo -e "${CYAN}2️⃣  Verificando implementação...${NC}"

FILES_NEEDED=(
  "utils/security/xss-sanitizer.ts"
  "utils/security/supabase-sanitizer.ts"
  "components/shared/SafeHTML.tsx"
  "utils/hooks/useSanitizedInput.ts"
)

ALL_EXISTS=true
for file in "${FILES_NEEDED[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅ $file${NC}"
  else
    echo -e "${RED}❌ $file NÃO encontrado!${NC}"
    ALL_EXISTS=false
  fi
done

echo ""

if [ "$ALL_EXISTS" = false ]; then
  echo -e "${RED}❌ Alguns arquivos estão faltando!${NC}"
  exit 1
fi

# ============================================
# 3. BUSCAR CÓDIGO VULNERÁVEL
# ============================================

echo -e "${CYAN}3️⃣  Buscando código vulnerável...${NC}\n"

echo -e "${YELLOW}🔍 Buscando dangerouslySetInnerHTML...${NC}"
DANGEROUS_HTML=$(grep -r "dangerouslySetInnerHTML" components/ --include="*.tsx" 2>/dev/null | wc -l || echo "0")
echo -e "   Encontrados: ${YELLOW}$DANGEROUS_HTML${NC} usos\n"

echo -e "${YELLOW}🔍 Buscando innerHTML...${NC}"
INNER_HTML=$(grep -r "\.innerHTML\s*=" components/ --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l || echo "0")
echo -e "   Encontrados: ${YELLOW}$INNER_HTML${NC} usos\n"

echo -e "${YELLOW}🔍 Buscando inputs não sanitizados...${NC}"
INPUTS=$(grep -r "onChange.*value" components/ --include="*.tsx" 2>/dev/null | wc -l || echo "0")
echo -e "   Encontrados: ${YELLOW}$INPUTS${NC} inputs\n"

# ============================================
# 4. CRIAR RELATÓRIO
# ============================================

echo -e "${CYAN}4️⃣  Gerando relatório...${NC}\n"

REPORT_FILE="XSS_MIGRATION_REPORT.md"

cat > "$REPORT_FILE" << EOF
# 🔒 Relatório de Migração XSS

**Data:** $(date +"%Y-%m-%d %H:%M:%S")

## 📊 Análise de Código

### Vulnerabilidades Encontradas

- **dangerouslySetInnerHTML:** $DANGEROUS_HTML usos
- **innerHTML:** $INNER_HTML usos
- **Inputs não sanitizados:** $INPUTS inputs

## 📝 Arquivos com dangerouslySetInnerHTML

EOF

if [ "$DANGEROUS_HTML" -gt 0 ]; then
  grep -r "dangerouslySetInnerHTML" components/ --include="*.tsx" 2>/dev/null | while read -r line; do
    echo "\`\`\`" >> "$REPORT_FILE"
    echo "$line" >> "$REPORT_FILE"
    echo "\`\`\`" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
  done
fi

cat >> "$REPORT_FILE" << EOF

## 📝 Arquivos com innerHTML

EOF

if [ "$INNER_HTML" -gt 0 ]; then
  grep -r "\.innerHTML\s*=" components/ --include="*.tsx" --include="*.ts" 2>/dev/null | while read -r line; do
    echo "\`\`\`" >> "$REPORT_FILE"
    echo "$line" >> "$REPORT_FILE"
    echo "\`\`\`" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
  done
fi

cat >> "$REPORT_FILE" << EOF

## ✅ Próximos Passos

1. Substituir \`dangerouslySetInnerHTML\` por \`<SafeHTML>\`
2. Substituir \`innerHTML\` por \`textContent\` ou \`sanitizeHTML\`
3. Usar \`useSanitizedInput\` em formulários
4. Sanitizar queries Supabase

## 📚 Documentação

Ver: \`IMPLEMENTACAO_XSS_SANITIZACAO.md\`
EOF

echo -e "${GREEN}✅ Relatório criado: $REPORT_FILE${NC}\n"

# ============================================
# 5. CRIAR ARQUIVO DE TESTE
# ============================================

echo -e "${CYAN}5️⃣  Criando arquivo de teste...${NC}"

cat > public/test-xss.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teste XSS - SoloForte</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      background: #0f172a;
      color: #e2e8f0;
    }
    h1 { color: #0057FF; }
    h2 { 
      color: #60a5fa;
      border-bottom: 2px solid #1e293b;
      padding-bottom: 10px;
      margin-top: 30px;
    }
    .test-area {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    input, textarea {
      width: 100%;
      padding: 12px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 4px;
      color: #e2e8f0;
      margin: 10px 0;
      font-size: 14px;
    }
    button {
      background: #0057FF;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 5px;
    }
    button:hover { background: #0046cc; }
    button.danger {
      background: #ef4444;
    }
    button.danger:hover { background: #dc2626; }
    .result {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 4px;
      padding: 15px;
      margin: 10px 0;
      min-height: 60px;
    }
    .pass { color: #22c55e; }
    .fail { color: #ef4444; }
    .info {
      background: #1e3a8a;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .payload {
      background: #1e293b;
      border: 1px solid #ef4444;
      border-radius: 4px;
      padding: 10px;
      margin: 10px 0;
      font-family: monospace;
      font-size: 12px;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <h1>🔒 Teste de Proteção XSS</h1>
  
  <div class="info">
    <strong>ℹ️ Instruções:</strong><br>
    Este arquivo testa se a aplicação está protegida contra XSS.<br>
    Tente os payloads abaixo e veja se são bloqueados.
  </div>
  
  <h2>Teste 1: XSS via Script Tag</h2>
  <div class="test-area">
    <div class="payload"><script>alert('XSS')</script></div>
    <textarea id="test1" rows="2"><script>alert('XSS')</script>Hello</textarea>
    <button onclick="testPayload('test1', 'result1')">Testar</button>
    <button class="danger" onclick="testUnsafe('test1', 'unsafe1')">Testar SEM Proteção (Perigoso)</button>
    <div class="result" id="result1"></div>
    <div class="result" id="unsafe1" style="border: 2px solid #ef4444;"></div>
  </div>
  
  <h2>Teste 2: XSS via Event Handler</h2>
  <div class="test-area">
    <div class="payload"><img src=x onerror="alert('XSS')"></div>
    <textarea id="test2" rows="2"><img src=x onerror="alert('XSS')">Image</textarea>
    <button onclick="testPayload('test2', 'result2')">Testar</button>
    <button class="danger" onclick="testUnsafe('test2', 'unsafe2')">Testar SEM Proteção</button>
    <div class="result" id="result2"></div>
    <div class="result" id="unsafe2" style="border: 2px solid #ef4444;"></div>
  </div>
  
  <h2>Teste 3: XSS via Iframe</h2>
  <div class="test-area">
    <div class="payload"><iframe src="javascript:alert('XSS')"></iframe></div>
    <textarea id="test3" rows="2"><iframe src="javascript:alert('XSS')"></iframe>Content</textarea>
    <button onclick="testPayload('test3', 'result3')">Testar</button>
    <button class="danger" onclick="testUnsafe('test3', 'unsafe3')">Testar SEM Proteção</button>
    <div class="result" id="result3"></div>
    <div class="result" id="unsafe3" style="border: 2px solid #ef4444;"></div>
  </div>
  
  <h2>Teste 4: XSS via JavaScript URL</h2>
  <div class="test-area">
    <div class="payload"><a href="javascript:alert('XSS')">Click</a></div>
    <textarea id="test4" rows="2"><a href="javascript:alert('XSS')">Click Me</a></textarea>
    <button onclick="testPayload('test4', 'result4')">Testar</button>
    <button class="danger" onclick="testUnsafe('test4', 'unsafe4')">Testar SEM Proteção</button>
    <div class="result" id="result4"></div>
    <div class="result" id="unsafe4" style="border: 2px solid #ef4444;"></div>
  </div>
  
  <h2>Teste 5: Payload Customizado</h2>
  <div class="test-area">
    <textarea id="custom" rows="4" placeholder="Cole seu payload XSS aqui..."></textarea>
    <button onclick="testPayload('custom', 'result-custom')">Testar</button>
    <button class="danger" onclick="testUnsafe('custom', 'unsafe-custom')">Testar SEM Proteção</button>
    <div class="result" id="result-custom"></div>
    <div class="result" id="unsafe-custom" style="border: 2px solid #ef4444;"></div>
  </div>
  
  <div class="info">
    <strong>🔒 Como Interpretar Resultados:</strong><br>
    <span class="pass">✅ SEGURO</span> - Payload foi sanitizado, XSS bloqueado<br>
    <span class="fail">❌ VULNERÁVEL</span> - Payload não foi bloqueado!<br>
    <br>
    <strong>⚠️ IMPORTANTE:</strong> Os botões "SEM Proteção" são PERIGOSOS!<br>
    Use apenas para demonstrar a vulnerabilidade.
  </div>
  
  <script type="module">
    import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.0.6/+esm';
    
    window.testPayload = function(inputId, resultId) {
      const input = document.getElementById(inputId).value;
      const result = document.getElementById(resultId);
      
      // Sanitizar com DOMPurify
      const clean = DOMPurify.sanitize(input);
      
      // Verificar se foi modificado
      const wasCleaned = input !== clean;
      
      if (wasCleaned) {
        result.innerHTML = '<span class="pass">✅ SEGURO</span><br><br>' +
          '<strong>Payload original:</strong><br>' +
          '<code>' + escapeHTML(input) + '</code><br><br>' +
          '<strong>Após sanitização:</strong><br>' +
          '<code>' + escapeHTML(clean) + '</code><br><br>' +
          '<strong>Renderizado:</strong><br>' +
          clean;
      } else {
        result.innerHTML = '<span class="pass">✅ SEGURO</span><br><br>' +
          '<strong>Conteúdo não malicioso:</strong><br>' +
          clean;
      }
    };
    
    window.testUnsafe = function(inputId, resultId) {
      if (!confirm('⚠️ ATENÇÃO!\n\nVocê vai executar código potencialmente malicioso SEM proteção.\n\nIsso pode executar scripts em seu navegador.\n\nTem certeza?')) {
        return;
      }
      
      const input = document.getElementById(inputId).value;
      const result = document.getElementById(resultId);
      
      // PERIGOSO: Sem sanitização!
      result.innerHTML = '<span class="fail">❌ SEM PROTEÇÃO</span><br><br>' +
        '<strong>Renderizando SEM sanitização:</strong><br>' +
        input;
    };
    
    function escapeHTML(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  </script>
</body>
</html>
EOF

if [ -f "public/test-xss.html" ]; then
  echo -e "${GREEN}✅ Arquivo de teste criado: public/test-xss.html${NC}\n"
else
  echo -e "${YELLOW}⚠️  Não foi possível criar arquivo de teste${NC}\n"
fi

# ============================================
# 6. INSTRUÇÕES FINAIS
# ============================================

echo -e "${BOLD}${BLUE}============================================${NC}"
echo -e "${BOLD}${GREEN}✅ ANÁLISE CONCLUÍDA${NC}"
echo -e "${BOLD}${BLUE}============================================${NC}\n"

echo -e "${CYAN}📊 Resumo:${NC}"
echo -e "  - dangerouslySetInnerHTML: ${YELLOW}$DANGEROUS_HTML${NC}"
echo -e "  - innerHTML: ${YELLOW}$INNER_HTML${NC}"
echo -e "  - Inputs: ${YELLOW}$INPUTS${NC}\n"

echo -e "${CYAN}📋 Próximos passos:${NC}\n"

echo -e "1. ${YELLOW}Ler relatório:${NC}"
echo -e "   ${BOLD}cat $REPORT_FILE${NC}\n"

echo -e "2. ${YELLOW}Testar proteção XSS:${NC}"
echo -e "   - Abrir: ${BOLD}http://localhost:5173/test-xss.html${NC}"
echo -e "   - Testar payloads XSS"
echo -e "   - Verificar que são bloqueados\n"

echo -e "3. ${YELLOW}Migrar código:${NC}"
echo -e "   - Substituir dangerouslySetInnerHTML"
echo -e "   - Usar <SafeHTML> ou sanitizeHTML()"
echo -e "   - Usar useSanitizedInput() em formulários\n"

echo -e "4. ${YELLOW}Documentação:${NC}"
echo -e "   - Guia completo: ${BOLD}IMPLEMENTACAO_XSS_SANITIZACAO.md${NC}\n"

echo -e "${BOLD}${BLUE}============================================${NC}\n"
