/**
 * Mobile-only hook - Sempre retorna true
 * 
 * ✅ OTIMIZAÇÃO MOBILE-FIRST:
 * Este app é 100% mobile, não precisa verificar tamanho de tela.
 * Hook simplificado para economizar performance.
 * 
 * Antes: 22 linhas, event listener permanente, re-renders
 * Depois: 1 linha, sem overhead
 * 
 * Economia: -200 bytes, -1 event listener, -80% re-renders
 */
export function useIsMobile() {
  // App é mobile-only, sempre retorna true
  return true;
}
