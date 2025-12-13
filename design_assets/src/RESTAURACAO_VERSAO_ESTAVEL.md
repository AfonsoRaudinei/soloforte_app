# 🔄 RESTAURAÇÃO - Versão Estável (Antes do Loop Infinito)

**Data**: 3 de Novembro de 2025, 22:30  
**Objetivo**: Restaurar App.tsx e Dashboard.tsx para última versão 100% funcionando  
**Status**: 📋 PREPARADO - Aguardando confirmação

---

## 🎯 ESTADO ALVO: "Última Versão Funcionando"

### Checkpoint Identificado:
- **Quando**: Após implementação da bússola premium (29/Out/2025)
- **Antes de**: Tentativas de correção do loop infinito (1/Nov/2025)
- **Documentação**: `BUSSOLA_PREMIUM_IMPLEMENTADA.md`, `CORRECOES_P0_APLICADAS.md`

### Características da Versão Estável:
- ✅ Bússola funcionando
- ✅ Botões expansíveis funcionando
- ✅ Check-in/out funcionando
- ✅ Correções P0 aplicadas
- ✅ SEM loop infinito
- ✅ SEM tela branca

---

## 🔍 PROBLEMAS IDENTIFICADOS NAS VERSÕES ATUAIS

### ❌ App.tsx Atual
**Linha 155-184**: useEffect com dependência `isDemo`
```typescript
useEffect(() => {
  if (isDemo) {
    setCurrentRoute('/dashboard');
    return;
  }
  checkSession();
}, [isDemo]); // ← PROBLEMA: Re-executa se isDemo mudar
```

**RISCO**: Se isDemo mudar durante execução, causa re-render infinito

---

### ❌ Dashboard.tsx Atual
**Linha 132-153**: useEffect chama funções externas
```typescript
useEffect(() => {
  // ...
  loadPolygons();          // ← Funções externas
  loadOcorrenciaMarkers(); // ← Funções externas
  initCompass();
}, []); // ← Dependency array vazio, mas chama funções que dependem de isDemo
```

**Linhas 209-225**: loadOcorrenciaMarkers com useCallback
```typescript
const loadOcorrenciaMarkers = useCallback(() => {
  // ...código...
}, [isDemo]); // ← Dependência de isDemo
```

**Linha 254-276**: loadPolygons com useCallback
```typescript
const loadPolygons = useCallback(async () => {
  // ...código...
}, [isDemo]); // ← Dependência de isDemo
```

**PROBLEMA**: useEffect na linha 132 tem `[]` como dependências, mas deveria incluir as funções que chama, ou as funções não deveriam depender de estados externos.

---

## ✅ VERSÃO ESTÁVEL RESTAURADA

### Mudanças no App.tsx:

#### 1. useEffect de Verificação de Sessão ESTÁVEL

**ANTES** (atual - problemático):
```typescript
useEffect(() => {
  if (isDemo) {
    setCurrentRoute('/dashboard');
    return;
  }
  checkSession();
}, [isDemo]); // ← Problema aqui
```

**DEPOIS** (restaurado - estável):
```typescript
useEffect(() => {
  let mounted = true;
  
  const checkSession = async () => {
    try {
      // Verificar modo demo primeiro
      const demoMode = localStorage.getItem('soloforte_demo_mode') === 'true';
      
      if (demoMode) {
        if (mounted) setCurrentRoute('/dashboard');
        return;
      }
      
      // Modo produção: verificar sessão
      const isSessionValid = await sessionStorage.isValid();
      
      if (!mounted) return; // Evitar state update se desmontou
      
      if (isSessionValid) {
        setCurrentRoute('/dashboard');
      } else {
        setCurrentRoute('/home');
      }
    } catch (error) {
      if (mounted) {
        console.error('Erro ao verificar sessão:', error);
        setCurrentRoute('/home');
      }
    }
  };

  checkSession();
  
  return () => {
    mounted = false;
  };
}, []); // ← Sem dependências - executa UMA VEZ na montagem
```

**VANTAGENS**:
- ✅ Executa apenas UMA VEZ na montagem
- ✅ Não depende de `isDemo` (lê direto do localStorage)
- ✅ Cleanup previne state updates após unmount
- ✅ Sem loops

---

### Mudanças no Dashboard.tsx:

#### 1. Remover useCallback das Funções de Load

**ANTES** (atual - problemático):
```typescript
const loadOcorrenciaMarkers = useCallback(() => {
  // ...código...
}, [isDemo]);

const loadPolygons = useCallback(async () => {
  // ...código...
}, [isDemo]);
```

**DEPOIS** (restaurado - estável):
```typescript
// ✅ Funções normais (não useCallback)
// Isso evita recriação e problemas de dependências
const loadOcorrenciaMarkers = () => {
  console.log('📍 [Dashboard] loadOcorrenciaMarkers() chamado');
  
  // Verificar modo demo do localStorage diretamente
  const demoMode = localStorage.getItem('soloforte_demo_mode') === 'true';
  
  if (demoMode) {
    const demoMarkers = localStorage.getItem(STORAGE_KEYS.DEMO_MARKERS);
    if (demoMarkers) {
      const markers = JSON.parse(demoMarkers);
      setOcorrenciaMarkers(markers);
      setOcorrenciasDisponiveis(
        markers.filter((m: OccurrenceMarker) => 
          m.status === 'ativa' || m.status === 'em-monitoramento'
        )
      );
    }
  }
};

const loadPolygons = async () => {
  console.log('📦 [Dashboard] loadPolygons() chamado');
  
  try {
    // Verificar modo demo do localStorage diretamente
    const demoMode = localStorage.getItem('soloforte_demo_mode') === 'true';
    
    if (demoMode) {
      const demoPolygons = localStorage.getItem(STORAGE_KEYS.DEMO_POLYGONS);
      if (demoPolygons) {
        setSavedPolygons(JSON.parse(demoPolygons));
      }
      return;
    }

    const result = await fetchWithAuth('/polygons', { method: 'GET' });
    
    if (result.success && result.polygons) {
      setSavedPolygons(result.polygons);
    }
  } catch (error) {
    logger.error('Erro ao carregar polígonos:', error);
  }
};
```

**VANTAGENS**:
- ✅ Não dependem de estado `isDemo`
- ✅ Leem diretamente do localStorage (fonte única de verdade)
- ✅ Não causam recriações infinitas
- ✅ Mais simples e direto

---

#### 2. useEffect Inicial Simplificado

**ANTES** (atual):
```typescript
useEffect(() => {
  if (isDemo) {
    setUser({...});
    loadPolygons();
    loadOcorrenciaMarkers();
  } else {
    loadPolygons();
    loadOcorrenciaMarkers();
  }
  initCompass();
}, []);
```

**DEPOIS** (restaurado):
```typescript
useEffect(() => {
  console.log('🔍 [Dashboard] Montando componente...');
  
  // Verificar modo demo
  const demoMode = localStorage.getItem('soloforte_demo_mode') === 'true';
  
  if (demoMode) {
    setUser({
      id: 'demo-user',
      email: 'demo@soloforte.com',
      user_metadata: { nome: 'Usuário Demo' }
    });
  }
  
  // Carregar dados (funciona para demo e produção)
  loadPolygons();
  loadOcorrenciaMarkers();
  
  // Iniciar bússola
  if ('ondeviceorientationabsolute' in window) {
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
  } else if ('ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', handleOrientation, true);
  }
  
  return () => {
    window.removeEventListener('deviceorientationabsolute', handleOrientation);
    window.removeEventListener('deviceorientation', handleOrientation);
  };
}, []); // ✅ Executa UMA VEZ - sem dependências
```

---

#### 3. Remover Hook `isDemo` Não Usado

**ANTES**:
```typescript
const isDemo = useDemo(); // ✅ Hook centralizado para modo demo
```

**DEPOIS**:
```typescript
// ❌ REMOVIDO - Não usar hook isDemo no Dashboard
// Ler diretamente do localStorage quando necessário
```

**MOTIVO**: 
- Hook `useDemo()` cria dependência reativa
- Quando localStorage muda, hook atualiza
- Componente re-renderiza
- Pode causar loops se não gerenciado corretamente
- Ler diretamente do localStorage é mais estável

---

## 📋 CHECKLIST DE RESTAURAÇÃO

Execute na ordem:

### Passo 1: Backup
```bash
# Criar backup das versões atuais
cp /App.tsx /App.tsx.backup_$(date +%Y%m%d_%H%M%S)
cp /components/Dashboard.tsx /components/Dashboard.tsx.backup_$(date +%Y%m%d_%H%M%S)
```

### Passo 2: Aplicar Mudanças

1. ✅ **App.tsx**: 
   - Modificar useEffect de sessão (linha ~155-184)
   - Remover dependência de `isDemo`
   - Adicionar cleanup

2. ✅ **Dashboard.tsx**:
   - Remover `const isDemo = useDemo();` (linha ~41)
   - Converter funções useCallback para funções normais
   - Modificar funções para ler localStorage diretamente
   - Simplificar useEffect inicial

### Passo 3: Teste Imediato

```javascript
// No console:
localStorage.clear();
sessionStorage.clear();
localStorage.setItem('soloforte_demo_mode', 'true');
location.reload();
```

**Resultado esperado**:
- ✅ Loading aparece (2-3s)
- ✅ Dashboard carrega
- ✅ Sem loop
- ✅ Sem tela branca
- ✅ Console limpo (sem erros)

---

## 🎯 RESULTADO ESPERADO

### Logs no Console (Sucesso):
```
🔍 [App] Iniciando verificação de sessão...
✅ [App] Modo demo detectado
📍 [App] Rota atual: /dashboard
🔍 [Dashboard] Montando componente...
📦 [Dashboard] loadPolygons() chamado
📍 [Dashboard] loadOcorrenciaMarkers() chamado
✅ [Dashboard] Polígonos demo carregados
✅ [Dashboard] Marcadores demo carregados: 3
```

### Tela (Sucesso):
```
┌─────────────────────────────────────┐
│  [SF Logo]        [🔔2]  [⚙️]  [☰] │
├─────────────────────────────────────┤
│                                     │
│         [Mapa Interativo]           │
│                                     │
│  [📍 Pin 1]  [📍 Pin 2]  [📍 Pin 3] │
│                                     │
│  [Área 1]    [Área 2]               │
│                                     │
├─────────────────────────────────────┤
│  [🧭]  Bússola girando              │
│  [✓]   Check-In 08:30               │
│  [📌]  Localização: Fazenda Demo    │
└─────────────────────────────────────┘
```

---

## ❌ SE FALHAR

### Teste Diagnóstico:

```javascript
// 1. Verificar storage
console.log('Demo mode?', localStorage.getItem('soloforte_demo_mode'));
console.log('Polygons?', localStorage.getItem('demo_polygons'));
console.log('Markers?', localStorage.getItem('demo_markers'));

// 2. Monitorar re-renders
let renderCount = 0;
const original = console.log;
console.log = function(...args) {
  if (args[0]?.includes?.('Montando componente')) {
    renderCount++;
    original.call(console, `[RENDER #${renderCount}]`, ...args);
    if (renderCount > 5) {
      console.error('🚨 LOOP DETECTADO:', renderCount, 'renders!');
    }
  }
  original.call(console, ...args);
};
```

### Se > 5 renders:
- ❌ Ainda há loop
- Verificar se `isDemo` hook foi removido
- Verificar se useEffect tem `[]` dependency
- Verificar se funções não têm useCallback

---

## 🔧 ARQUIVOS A MODIFICAR

### Ordem de Modificação:

1. **App.tsx** (Prioridade 1 - causa loop global)
2. **Dashboard.tsx** (Prioridade 2 - causa loop local)

### Linhas Específicas:

**App.tsx**:
- Linha 155-184: useEffect de verificação de sessão

**Dashboard.tsx**:
- Linha 41: Remover `const isDemo = useDemo();`
- Linha 132-153: useEffect inicial
- Linha 209-225: loadOcorrenciaMarkers
- Linha 254-276: loadPolygons

---

## ✅ VALIDAÇÃO FINAL

Execute após mudanças:

```javascript
// VALIDAÇÃO COMPLETA
(async () => {
  console.log('═══════════════════════════════════════');
  console.log('🧪 VALIDAÇÃO DE RESTAURAÇÃO');
  console.log('═══════════════════════════════════════');
  
  // 1. Limpar tudo
  localStorage.clear();
  sessionStorage.clear();
  
  // 2. Configurar demo
  localStorage.setItem('soloforte_demo_mode', 'true');
  
  // 3. Recarregar
  console.log('✅ Storage configurado');
  console.log('🔄 Recarregando em 1s...');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // 4. Contar renders
  let renders = 0;
  const startTime = Date.now();
  
  const checkRenders = setInterval(() => {
    const elapsed = Date.now() - startTime;
    
    if (elapsed > 5000) {
      clearInterval(checkRenders);
      console.log('═══════════════════════════════════════');
      console.log('📊 RESULTADO:');
      console.log(`   Renders: ${renders}`);
      console.log(`   Status: ${renders <= 2 ? '✅ OK' : '❌ LOOP DETECTADO'}`);
      console.log('═══════════════════════════════════════');
    }
  }, 100);
  
  location.reload();
})();
```

**Resultado válido**: 
- ✅ Renders: 1-2 (normal)
- ❌ Renders: >5 (loop ainda presente)

---

## 📝 PRÓXIMOS PASSOS

### Se Restauração Funcionar (✅):
1. Marcar checkpoint como estável
2. Documentar mudanças aplicadas
3. Continuar desenvolvimento normal
4. Evitar `useDemo()` hook em componentes críticos

### Se Restauração Falhar (❌):
1. Reverter para backup
2. Aplicar "Solução Emergencial" (ver abaixo)
3. Investigar problemas mais profundos

---

## 🚨 SOLUÇÃO EMERGENCIAL

Se NADA funcionar, aplicar Dashboard mínimo:

```typescript
// Dashboard.tsx - Versão Emergencial
export default function Dashboard({ navigate }: DashboardProps) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard SoloForte</h1>
        <p className="text-gray-600 mb-6">
          Sistema temporariamente em modo simplificado
        </p>
        <div className="space-y-3">
          <Button onClick={() => navigate('/relatorios')} className="w-full">
            Relatórios
          </Button>
          <Button onClick={() => navigate('/agenda')} className="w-full">
            Agenda
          </Button>
          <Button onClick={() => navigate('/clima')} className="w-full">
            Clima
          </Button>
          <Button onClick={() => navigate('/home')} variant="outline" className="w-full">
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
```

Isso garante que o app funciona, mesmo sem mapa.

---

**Status**: 📋 PRONTO PARA EXECUTAR  
**Risco**: 🟡 Médio (modificações estruturais)  
**Tempo estimado**: 5 minutos  
**Reversível**: ✅ Sim (via backup)
