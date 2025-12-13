/**
 * 📱 TESTE DE RESPONSIVIDADE - SOLOFORTE
 * 
 * Componente para testar padding bottom e FAB em diferentes resoluções mobile:
 * - iPhone SE: 375×667px (tela pequena)
 * - iPhone 12/13/14: 390×844px (tela média)
 * - iPhone 14 Pro Max: 430×932px (tela grande)
 * 
 * Testa:
 * - pb-32 (128px) - atual
 * - pb-28 (112px) - otimizado
 * - pb-24 (96px) - mínimo
 */

import { useState } from 'react';
import { ArrowLeft, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

type ScreenSize = {
  name: string;
  width: number;
  height: number;
  description: string;
};

const screens: ScreenSize[] = [
  { name: 'iPhone SE', width: 375, height: 667, description: 'Tela pequena' },
  { name: 'iPhone 12', width: 390, height: 844, description: 'Tela média' },
  { name: 'iPhone 14 Pro', width: 393, height: 852, description: 'Tela média-grande' },
  { name: 'iPhone 14 Pro Max', width: 430, height: 932, description: 'Tela grande' },
];

const paddings = [
  { class: 'pb-24', value: 96, label: 'pb-24 (96px)' },
  { class: 'pb-28', value: 112, label: 'pb-28 (112px) ⭐ RECOMENDADO' },
  { class: 'pb-32', value: 128, label: 'pb-32 (128px) - ATUAL' },
];

interface ResponsiveTestProps {
  navigate?: (path: string) => void;
}

export default function ResponsiveTest({ navigate }: ResponsiveTestProps) {
  const [selectedScreen, setSelectedScreen] = useState<ScreenSize>(screens[0]);
  const [selectedPadding, setSelectedPadding] = useState(paddings[2]); // pb-32 atual

  // Cálculos do FAB
  const FAB_SIZE = 64; // h-16 = 64px
  const FAB_MARGIN = 24; // bottom-6 = 24px
  const FAB_TOTAL = FAB_SIZE + FAB_MARGIN; // 88px

  // Espaço livre acima do FAB
  const freeSpace = selectedPadding.value - FAB_TOTAL;

  // Percentual da tela ocupado pelo padding
  const paddingPercent = (selectedPadding.value / selectedScreen.height * 100).toFixed(1);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto scroll-smooth pb-32">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Smartphone className="h-6 w-6 text-blue-600" />
            <h1 className="text-gray-900">Teste de Responsividade</h1>
          </div>
          <p className="text-sm text-gray-600">
            Simule diferentes tamanhos de tela para validar o padding bottom e posicionamento do FAB
          </p>
        </div>

        {/* Seleção de Dispositivo */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Dispositivo</h2>
          <div className="grid grid-cols-2 gap-2">
            {screens.map((screen) => (
              <Button
                key={screen.name}
                variant={selectedScreen.name === screen.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedScreen(screen)}
                className="justify-start"
              >
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-xs">{screen.name}</span>
                  <span className="text-[10px] opacity-70">
                    {screen.width}×{screen.height}px
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Seleção de Padding */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Padding Bottom</h2>
          <div className="space-y-2">
            {paddings.map((padding) => (
              <Button
                key={padding.class}
                variant={selectedPadding.class === padding.class ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPadding(padding)}
                className="w-full justify-start"
              >
                {padding.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Análise Visual */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Análise</h2>
          
          {/* Visualização em escala */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="relative w-full" style={{ height: '400px' }}>
              {/* Tela do dispositivo */}
              <div className="absolute inset-0 border-2 border-gray-300 rounded-2xl bg-white overflow-hidden">
                {/* Área de conteúdo */}
                <div 
                  className="absolute inset-x-0 top-0 bg-gradient-to-b from-blue-50 to-white border-b-2 border-dashed border-gray-300"
                  style={{ 
                    bottom: `${(selectedPadding.value / selectedScreen.height) * 100}%` 
                  }}
                >
                  <div className="p-3 text-xs text-gray-600 text-center">
                    Área de Conteúdo Scrollável
                  </div>
                </div>

                {/* Área de padding (espaço para FAB) */}
                <div 
                  className="absolute inset-x-0 bottom-0 bg-yellow-100/50 border-t-2 border-dashed border-yellow-400"
                  style={{ 
                    height: `${(selectedPadding.value / selectedScreen.height) * 100}%` 
                  }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-medium text-yellow-700">
                    {selectedPadding.label}
                  </div>
                </div>

                {/* FAB simulado */}
                <div 
                  className="absolute right-2 bg-[#0057FF] rounded-full shadow-lg flex items-center justify-center"
                  style={{ 
                    bottom: `${(FAB_MARGIN / selectedScreen.height) * 100}%`,
                    width: `${(FAB_SIZE / selectedScreen.height) * 100}%`,
                    height: `${(FAB_SIZE / selectedScreen.height) * 100}%`,
                    maxWidth: '48px',
                    maxHeight: '48px',
                  }}
                >
                  <ArrowLeft className="h-4 w-4 text-white" />
                </div>

                {/* Labels de medidas */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-[10px] text-gray-600 border border-gray-200">
                  {selectedScreen.name}<br />
                  {selectedScreen.width}×{selectedScreen.height}px
                </div>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 mb-1">Altura da Tela</div>
              <div className="text-lg font-bold text-blue-900">{selectedScreen.height}px</div>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-xs text-purple-600 mb-1">Padding Bottom</div>
              <div className="text-lg font-bold text-purple-900">{selectedPadding.value}px</div>
              <div className="text-xs text-purple-600 mt-1">{paddingPercent}% da tela</div>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-xs text-orange-600 mb-1">FAB Total (h+margin)</div>
              <div className="text-lg font-bold text-orange-900">{FAB_TOTAL}px</div>
              <div className="text-xs text-orange-600 mt-1">
                {FAB_SIZE}px + {FAB_MARGIN}px
              </div>
            </div>

            <div className={`p-3 rounded-lg border ${
              freeSpace >= 24 
                ? 'bg-green-50 border-green-200' 
                : freeSpace >= 8 
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className={`text-xs mb-1 ${
                freeSpace >= 24 
                  ? 'text-green-600' 
                  : freeSpace >= 8 
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                Espaço Livre
              </div>
              <div className={`text-lg font-bold ${
                freeSpace >= 24 
                  ? 'text-green-900' 
                  : freeSpace >= 8 
                  ? 'text-yellow-900'
                  : 'text-red-900'
              }`}>
                {freeSpace}px
              </div>
              <div className={`text-xs mt-1 ${
                freeSpace >= 24 
                  ? 'text-green-600' 
                  : freeSpace >= 8 
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                {freeSpace >= 24 ? '✓ Ideal' : freeSpace >= 8 ? '⚠ Mínimo' : '✗ Insuficiente'}
              </div>
            </div>
          </div>
        </div>

        {/* Recomendações */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">💡 Recomendações</h2>
          
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <Badge variant="default" className="shrink-0 mt-0.5">
                Atual
              </Badge>
              <div>
                <strong className="text-gray-900">pb-32 (128px)</strong>: Espaço generoso ({freeSpace}px acima do FAB).
                {freeSpace >= 24 ? (
                  <span className="text-green-600"> ✓ Funciona bem!</span>
                ) : (
                  <span className="text-yellow-600"> ⚠ Pode ser excessivo em telas pequenas.</span>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="shrink-0 mt-0.5 bg-yellow-500 text-white">
                Ideal
              </Badge>
              <div>
                <strong className="text-gray-900">pb-28 (112px)</strong>: Espaço equilibrado (24px acima do FAB).
                <span className="text-blue-600"> Recomendado para otimizar espaço vertical.</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0 mt-0.5">
                Mínimo
              </Badge>
              <div>
                <strong className="text-gray-900">pb-24 (96px)</strong>: Espaço mínimo (8px acima do FAB).
                <span className="text-gray-600"> Funcional mas pode parecer apertado.</span>
              </div>
            </div>
          </div>

          {/* Decisão Final */}
          <div className="mt-4 p-3 bg-white rounded-lg border-2 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <strong className="text-gray-900">Decisão Final:</strong>
            </div>
            <p className="text-sm text-gray-700">
              {freeSpace >= 24 ? (
                <>
                  <strong className="text-green-600">pb-32 (128px) está ótimo!</strong> Mantém espaço confortável em todas as telas testadas.
                  {paddingPercent > '20' && selectedScreen.height < 700 && (
                    <> No entanto, em telas muito pequenas (altura {'<'} 700px) ocupa {paddingPercent}% da tela. Considere <strong>pb-28</strong> para otimizar.</>
                  )}
                </>
              ) : freeSpace >= 8 ? (
                <>
                  <strong className="text-yellow-600">pb-{selectedPadding.class.replace('pb-', '')} funciona</strong>, mas considere aumentar para <strong>pb-28</strong> para melhor conforto visual.
                </>
              ) : (
                <>
                  <strong className="text-red-600">pb-{selectedPadding.class.replace('pb-', '')} é insuficiente!</strong> Aumente para pelo menos <strong>pb-28 (112px)</strong>.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Exemplo Prático */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">📋 Exemplo de Conteúdo</h2>
          
          <div className="space-y-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-900">Item {i + 1}</div>
                <div className="text-xs text-gray-500">
                  Conteúdo de exemplo para testar scroll e padding bottom
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB Simulado (sempre visível) */}
      <button
        className="fixed bottom-6 right-6 z-[9999] h-16 w-16 bg-[#0057FF] text-white shadow-2xl flex items-center justify-center rounded-full hover:brightness-110 transition-all"
        title="FAB de Teste"
      >
        <ArrowLeft className="h-7 w-7" />
      </button>
    </div>
  );
}