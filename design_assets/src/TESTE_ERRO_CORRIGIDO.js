// 🧪 TESTE RÁPIDO - Verificar se erro foi corrigido
// Cole este código no console do navegador (F12)

(function() {
  console.clear();
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  console.log('%c🧪 TESTE: Erro import.meta.env.DEV', 'color: #0057FF; font-size: 18px; font-weight: bold');
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  console.log('');
  
  let testsPassed = 0;
  let testsFailed = 0;
  
  // Teste 1: import.meta existe
  console.log('1️⃣ import.meta existe?');
  try {
    const hasImportMeta = typeof import.meta !== 'undefined';
    if (hasImportMeta) {
      console.log('   %c✅ PASS%c - import.meta está disponível', 'color: #10b981; font-weight: bold', 'color: inherit');
      testsPassed++;
    } else {
      console.log('   %c⚠️ AVISO%c - import.meta não disponível (normal em alguns ambientes)', 'color: #f59e0b; font-weight: bold', 'color: inherit');
      testsPassed++;
    }
  } catch (e) {
    console.log('   %c❌ FAIL%c - Erro ao verificar:', 'color: #ef4444; font-weight: bold', 'color: inherit', e.message);
    testsFailed++;
  }
  
  // Teste 2: Expressão segura não lança erro
  console.log('\n2️⃣ Expressão segura funciona sem erro?');
  try {
    const safeCheck = (typeof import.meta !== 'undefined' && import.meta.env?.DEV);
    console.log('   %c✅ PASS%c - Expressão executada sem erro', 'color: #10b981; font-weight: bold', 'color: inherit');
    console.log('      Resultado:', safeCheck);
    testsPassed++;
  } catch (e) {
    console.log('   %c❌ FAIL%c - Erro:', 'color: #ef4444; font-weight: bold', 'color: inherit', e.message);
    testsFailed++;
  }
  
  // Teste 3: App.tsx carregado
  console.log('\n3️⃣ App.tsx carregou sem erro?');
  try {
    // Verificar se há elemento root
    const appRoot = document.querySelector('#root');
    if (appRoot && appRoot.children.length > 0) {
      console.log('   %c✅ PASS%c - Aplicação renderizada', 'color: #10b981; font-weight: bold', 'color: inherit');
      testsPassed++;
    } else {
      console.log('   %c❌ FAIL%c - Root vazio ou não encontrado', 'color: #ef4444; font-weight: bold', 'color: inherit');
      testsFailed++;
    }
  } catch (e) {
    console.log('   %c❌ FAIL%c - Erro:', 'color: #ef4444; font-weight: bold', 'color: inherit', e.message);
    testsFailed++;
  }
  
  // Teste 4: Verificar console por erros
  console.log('\n4️⃣ Console limpo (sem TypeError)?');
  console.log('   %cℹ️  MANUAL%c - Verifique se NÃO há mensagens de erro vermelhas acima', 'color: #3b82f6; font-weight: bold', 'color: inherit');
  console.log('      ❌ Procure por: "TypeError: Cannot read properties of undefined"');
  console.log('      ✅ Se não encontrar: TESTE PASSOU');
  
  // Teste 5: Versão 3300 ativa
  console.log('\n5️⃣ Versão 3300 detectada nos logs?');
  console.log('   %cℹ️  MANUAL%c - Procure por mensagens:', 'color: #3b82f6; font-weight: bold', 'color: inherit');
  console.log('      ✅ "🚀 [App v3300] Iniciando..."');
  console.log('      ✅ "🚀 [Dashboard v3300] Montando..."');
  
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
    console.log('%c   Agora verifique os testes manuais acima.', 'color: #10b981;');
  } else {
    console.log('%c❌ ALGUNS TESTES FALHARAM', 'color: #ef4444; font-size: 18px; font-weight: bold');
    console.log('%c   Revise os erros acima e informe os detalhes.', 'color: #ef4444;');
  }
  
  console.log('');
  console.log('%c═══════════════════════════════════════', 'color: #0057FF; font-weight: bold');
  
  // Instruções
  console.log('\n%c📋 PRÓXIMOS PASSOS:', 'color: #0057FF; font-weight: bold');
  console.log('');
  console.log('1. Verifique os resultados acima');
  console.log('2. Se todos testes passaram: ✅ Erro corrigido!');
  console.log('3. Se há falhas: Copie as mensagens de erro e informe');
  console.log('4. Teste interação com a aplicação');
  console.log('');
  
})();
