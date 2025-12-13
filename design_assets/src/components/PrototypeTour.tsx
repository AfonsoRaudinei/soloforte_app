import { useState, useEffect } from 'react';
import { X, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface PrototypeTourProps {
  onComplete: () => void;
}

const tourSteps = [
  {
    id: 1,
    title: '🎨 Bem-vindo ao Protótipo SoloForte',
    description: 'Este é um protótipo visual interativo com 15 sistemas completos. Todos os dados são simulados - explore livremente sem preocupações!',
    icon: '✨',
    duration: 'Tour: ~3 minutos'
  },
  {
    id: 2,
    title: '🗺️ Dashboard com Mapa Interativo',
    description: 'Desenhe áreas, adicione marcadores de ocorrências, alterne camadas (satélite, ruas, terreno) e visualize NDVI de saúde das plantas.',
    icon: '📍',
    tip: 'Use os botões na lateral direita para ferramentas de desenho'
  },
  {
    id: 3,
    title: '🤖 Scanner de Pragas IA',
    description: 'Tire fotos de pragas e receba análise automática com recomendações de tratamento. Simulado com GPT-4 Vision.',
    icon: '🐛',
    tip: 'Acesse via FAB (botão flutuante) no canto inferior direito'
  },
  {
    id: 4,
    title: '📊 Dashboard Executivo',
    description: 'Visualize KPIs, gráficos interativos, timeline de eventos e distribuição de severidade. Dados demo de 12 meses.',
    icon: '📈',
    tip: 'Passe o mouse sobre gráficos para ver tooltips'
  },
  {
    id: 5,
    title: '👥 Gestão de Equipes + Check-in',
    description: 'Gerencie colaboradores, veja check-ins no mapa em tempo real e acompanhe horas trabalhadas. GPS simulado.',
    icon: '⏰',
    tip: 'Check-in usa localização fixa em São Paulo para demo'
  },
  {
    id: 6,
    title: '🌿 Análise NDVI',
    description: 'Selecione áreas desenhadas e veja overlay colorido de saúde das plantas (verde = saudável, vermelho = problema).',
    icon: '🌱',
    tip: 'Desenhe uma área primeiro, depois clique em "Análise NDVI"'
  },
  {
    id: 7,
    title: '📱 FAB - Acesso Rápido',
    description: 'O botão flutuante muda de acordo com a tela. Clique para expandir e acessar todas as funcionalidades rapidamente.',
    icon: '🎯',
    tip: 'Disponível em todas as telas, exceto login'
  },
  {
    id: 8,
    title: '💾 Dados Simulados',
    description: 'Tudo que você criar (áreas, ocorrências, check-ins) é salvo no LocalStorage do navegador. Resetar: console → localStorage.clear()',
    icon: '🗂️',
    tip: 'Produtores demo: João Silva, Maria Santos, Pedro Oliveira'
  },
  {
    id: 9,
    title: '🎨 Temas & Configurações',
    description: 'Alterne entre modo claro/escuro, configure notificações e preferências de mapa nas Configurações.',
    icon: '⚙️',
    tip: 'Menu → Configurações → Toggle de tema'
  },
  {
    id: 10,
    title: '✅ Pronto para Explorar!',
    description: 'Você pode refazer este tour a qualquer momento nas Configurações. Aproveite a exploração e forneça feedback!',
    icon: '🚀',
    duration: 'Tempo médio de exploração: 15-30 min'
  }
];

export default function PrototypeTour({ onComplete }: PrototypeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const isLastStep = currentStep === tourSteps.length - 1;
  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsOpen(false);
    localStorage.setItem('soloforte_tour_completed', 'true');
    onComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{step.icon}</span>
            <DialogTitle className="text-xl">{step.title}</DialogTitle>
          </div>
          
          {/* Progress bar */}
          <div className="flex gap-1 mb-4">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  idx <= currentStep ? 'bg-[#0057FF]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <DialogDescription className="text-base leading-relaxed">
            {step.description}
          </DialogDescription>

          {step.tip && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <span className="font-medium">Dica:</span> {step.tip}
                </p>
              </div>
            </div>
          )}

          {step.duration && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ⏱️ {step.duration}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t">
            <div className="text-sm text-gray-500">
              {currentStep + 1} de {tourSteps.length}
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  size="sm"
                >
                  Anterior
                </Button>
              )}
              
              {!isLastStep && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  size="sm"
                >
                  Pular Tour
                </Button>
              )}

              <Button
                onClick={handleNext}
                size="sm"
                className="bg-[#0057FF] hover:bg-[#0046CC]"
              >
                {isLastStep ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Começar
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
