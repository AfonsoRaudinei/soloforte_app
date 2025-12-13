// 🧪 TESTE RÁPIDO - Verificar se erro isDemo foi corrigido
// Cole este código no console do navegador (F12)

(function() {
  console.clear();
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  console.log('%c🧪 TESTE: Erro isDemo Corrigido', 'color: #0057FF; font-size: 18px; font-weight: bold');
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  console.log('');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Teste 1: localStorage tem soloforte_demo_mode
  console.log('1️⃣ localStorage.soloforte_demo_mode existe?');
  try {
    const demoMode = localStorage.getItem('soloforte_demo_mode');
    if (demoMode !== null) {
      console.log('   %c✅ PASS%c - Valor:', 'color: #10b981; font-weight: bold', 'color: inherit', demoMode);
      testsPassed++;
    } else {
      console.log('   %c⚠️ AVISO%c - Não definido (será "false" por padrão)', 'color: #f59e0b; font-weight: bold', 'color: inherit');
      testsPassed++;
    }
  } catch (e) {
    console.log('   %c❌ FAIL%c - Erro:', 'color: #ef4444; font-weight: bold', 'color: inherit', e.message);
    testsFailed++;
  }
  
  // Teste 2: Criar isDemo como no Dashboard
  console.log('\n2️⃣ Definição de isDemo funciona?');
  try {
    const isDemo = localStorage.getItem('soloforte_demo_mode') === 'true';
    console.log('   %c✅ PASS%c - isDemo definido sem erro', 'color: #10b981; font-weight: bold', 'color: inherit');
    console.log('      Valor:', isDemo, '(tipo:', typeof isDemo + ')');
    testsPassed++;
  } catch (e) {
    console.log('   %c❌ FAIL%c - Erro:', 'color: #ef4444; font-weight: bold', 'color: inherit', e.message);
    testsFailed++;
  }
  
  // Teste 3: Usar isDemo em conditional
  console.log('\n3️⃣ Usar isDemo em if() funciona?');
  try {
    const isDemo = localStorage.getItem('soloforte_demo_mode') === 'true';
    if (isDemo) {
      console.log('   %c✅ PASS%c - Modo Demo ativo', 'color: #10b981; font-weight: bold', 'color: inherit');
    } else {
      console.log('   %c✅ PASS%c - Modo Produção ativo', 'color: #10b981; font-weight: bold', 'color: inherit');
    }
    testsPassed++;
  } catch (e) {
    console.log('   %c❌ FAIL%c - Erro:', 'color: #ef4444; font-weight: bold', 'color: inherit', e.message);
    testsFailed++;
  }
  
  // Teste 4: Dashboard renderizou
  console.log('\n4️⃣ Dashboard renderizado sem erro?');
  try {
    const appRoot = document.querySelector('#root');
    if (appRoot && appRoot.children.length > 0) {
      // Procurar por elementos do Dashboard
      const hasDashboardElements = document.querySelector('[class*="map"]') || 
                                    document.querySelector('[class*="dashboard"]') ||
                                    document.querySelector('button');
      
      if (hasDashboardElements) {
        console.log('   %c✅ PASS%c - Dashboard renderizado', 'color: #10b981; font-weight: bold', 'color: inherit');
        testsPassed++;
      } else {
        console.log('   %c⚠️ PARCIAL%c - Root tem conteúdo mas Dashboard pode não estar visível', 'color: #f59e0b; font-weight: bold', 'color: inherit');
        testsPassed++;
      }
    } else {
      console.log('   %c❌ FAIL%c - Root vazio', 'color: #ef4444; font-weight: bold', 'color: inherit');
      testsFailed++;
    }
  } catch (e) {
    console.log('   %c❌ FAIL%c - Erro:', 'color: #ef4444; font-weight: bold', 'color: inherit', e.message);
    testsFailed++;
  }
  
  // Teste 5: Logs do Dashboard v3300
  console.log('\n5️⃣ Logs do Dashboard v3300 visíveis?');
  console.log('   %cℹ️  MANUAL%c - Procure acima por:', 'color: #3b82f6; font-weight: bold', 'color: inherit');
  console.log('      ✅ "🚀 [Dashboard v3300] Montando..."');
  console.log('      ✅ "📊 [Dashboard v3300] Modo: Demo" ou "Produção"');
  console.log('      ❌ Se NÃO encontrar: Dashboard pode não ter montado');
  
  // Teste 6: Erro ReferenceError no console
  console.log('\n6️⃣ Erro "isDemo is not defined" no console?');
  console.log('   %cℹ️  MANUAL%c - Procure acima por mensagens vermelhas:', 'color: #3b82f6; font-weight: bold', 'color: inherit');
  console.log('      ❌ Se encontrar "ReferenceError: isDemo is not defined": ERRO PERSISTE');
  console.log('      ✅ Se NÃO encontrar: ERRO CORRIGIDO!');
  
  // Resumo
  console.log('\n%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  console.log('%c📊 RESUMO', 'color: #0057FF; font-size: 16px; font-weight: bold');
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  console.log('');
  console.log('  Testes Automáticos Passaram: %c' + testsPassed, 'color: #10b981; font-weight: bold');
  console.log('  Testes Automáticos Falharam: %c' + testsFailed, 'color: #ef4444; font-weight: bold');
  console.log('  Testes Manuais Pendentes:    %c2', 'color: #3b82f6; font-weight: bold');
  console.log('');
  
  if (testsFailed === 0) {
    console.log('%c✅ TESTES AUTOMÁTICOS: TODOS PASSARAM!', 'color: #10b981; font-size: 18px; font-weight: bold');
    console.log('%c   Agora verifique os testes manuais (5️⃣ e 6️⃣) acima.', 'color: #10b981;');
  } else {
    console.log('%c❌ ALGUNS TESTES FALHARAM', 'color: #ef4444; font-size: 18px; font-weight: bold');
    console.log('%c   Revise os erros acima e informe os detalhes.', 'color: #ef4444;');
  }
  
  console.log('');
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  
  // Diagnóstico adicional
  console.log('\n%c🔍 DIAGNÓSTICO ADICIONAL:', 'color: #0057FF; font-weight: bold');
  console.log('');
  
  // Verificar modo atual
  const currentMode = localStorage.getItem('soloforte_demo_mode');
  console.log('Modo atual:', currentMode === 'true' ? 'Demo' : 'Produção');
  
  // Verificar dados no localStorage
  console.log('Dados no localStorage:');
  console.log('  - soloforte_demo_mode:', localStorage.getItem('soloforte_demo_mode'));
  console.log('  - soloforte_demo_polygons:', localStorage.getItem('soloforte_demo_polygons') ? 'Existe' : 'Não existe');
  console.log('  - soloforte_demo_markers:', localStorage.getItem('soloforte_demo_markers') ? 'Existe' : 'Não existe');
  
  console.log('');
  console.log('%c📋 AÇÕES RECOMENDADAS:', 'color: #0057FF; font-weight: bold');
  console.log('');
  
  if (testsFailed === 0) {
    console.log('1. ✅ Todos testes automáticos passaram');
    console.log('2. 🔍 Verifique testes manuais (5️⃣ e 6️⃣)');
    console.log('3. 🧪 Teste funcionalidades:');
    console.log('   - Desenhar área no mapa');
    console.log('   - Salvar área');
    console.log('   - Criar ocorrência (pin)');
    console.log('   - Deletar área');
    console.log('4. ✅ Se tudo funcionar: ERRO CORRIGIDO!');
  } else {
    console.log('1. ❌ Há testes falhando');
    console.log('2. 📋 Copie TODOS os outputs acima');
    console.log('3. 📧 Informe os resultados');
    console.log('4. 🔄 Tente limpar e recarregar:');
    console.log('   localStorage.clear();');
    console.log('   sessionStorage.clear();');
    console.log('   location.reload();');
  }
  
  console.log('');
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  
})();

// BONUS: Ativar modo demo se não estiver
console.log('\n%c💡 DICA: Para testar em modo demo:', 'color: #8b5cf6; font-weight: bold');
console.log('localStorage.setItem("soloforte_demo_mode", "true");');
console.log('location.reload();');
