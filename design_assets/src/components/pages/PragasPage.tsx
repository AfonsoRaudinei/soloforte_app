/**
 * 🐛 PÁGINA DE SCANNER DE PRAGAS - SOLOFORTE
 * 
 * Página dedicada ao sistema de identificação de pragas com IA
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import PestScanner from '../PestScanner';
import { toast } from 'sonner@2.0.3';
import type { NavigateFunction } from '../../types';

interface PragasPageProps {
  navigate?: NavigateFunction;
}

export function PragasPage({ navigate }: PragasPageProps) {
  console.log('🐛 PragasPage montado');
  
  const handleBack = () => {
    if (navigate) {
      navigate('/dashboard');
    }
  };

  // Callback quando uma ocorrência é salva
  const handleSaveAsOccurrence = (occurrence: any) => {
    console.log('💾 Salvando ocorrência:', occurrence);
    // Recarregar marcadores se necessário
    window.dispatchEvent(new CustomEvent('occurrenceAdded', { detail: occurrence }));
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Scanner de Pragas
                </h1>
                <p className="text-sm text-gray-600">
                  Identificação inteligente com IA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal - Scrollável */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
          {console.log('🔍 Tentando renderizar PestScanner...')}
          <PestScanner onSaveAsOccurrence={handleSaveAsOccurrence} />
          {console.log('✅ PestScanner renderizado')}
        </div>
      </div>
    </div>
  );
}

export default PragasPage;