import { useState } from 'react';
import { motion } from 'motion/react';
import { Pencil, Square, Circle, Save, X } from 'lucide-react';
import { useMapShapes } from '../utils/hooks/useMapShapes';
import { toast } from 'sonner@2.0.3';
import { DrawingInstructionCard } from './DrawingInstructionCard';

/**
 * 🎨 Toolbar de Desenho no Mapa
 * 
 * Barra de ferramentas para desenhar shapes no mapa:
 * - Mão livre (polygon)
 * - Retângulo (polygon)
 * - Círculo/Pivô (circle)
 * - Salvar shape com nome
 * 
 * Features:
 * - Integração com useMapShapes
 * - Preview de cor antes de salvar
 * - Cálculo automático de área
 * - Feedback visual durante desenho
 * - ✅ Card de instruções otimizado (pointer-events, auto-minimização)
 * 
 * Usage:
 * ```tsx
 * <MapDrawingToolbar 
 *   clienteId="xxx"
 *   fazendaId="yyy"
 *   onToolSelect={(tool) => setActiveTool(tool)}
 *   onShapeSaved={(shape) => addToMap(shape)}
 * />
 * ```
 */

export type DrawingTool = 'polygon' | 'rectangle' | 'circle' | null;

interface MapDrawingToolbarProps {
  clienteId?: string;
  fazendaId?: string;
  onToolSelect?: (tool: DrawingTool) => void;
  currentCoords?: Array<{ lat: number; lng: number }>;
  onSaveRequest?: () => void;
  onCancelRequest?: () => void;
}

export function MapDrawingToolbar({
  clienteId,
  fazendaId,
  onToolSelect,
  currentCoords,
  onSaveRequest,
  onCancelRequest,
}: MapDrawingToolbarProps) {
  const [activeTool, setActiveTool] = useState<DrawingTool>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [shapeName, setShapeName] = useState('');
  const [cultura, setCultura] = useState('');
  
  const { saveShape, loading } = useMapShapes({ clienteId, fazendaId });

  /**
   * Seleciona ferramenta de desenho
   */
  const handleToolSelect = (tool: DrawingTool) => {
    setActiveTool(tool);
    
    if (onToolSelect) {
      onToolSelect(tool);
    }

    // Feedback tátil
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    toast.info(
      tool === 'polygon' ? '✏️ Desenho livre ativado' :
      tool === 'rectangle' ? '◻️ Retângulo ativado' :
      tool === 'circle' ? '⭕ Círculo ativado' :
      'Ferramenta desativada'
    );
  };

  /**
   * Cancela desenho atual
   */
  const handleCancel = () => {
    setActiveTool(null);
    setShowSaveModal(false);
    setShapeName('');
    setCultura('');
    
    if (onCancelRequest) {
      onCancelRequest();
    }
  };

  /**
   * Abre modal de salvamento
   */
  const handleSaveClick = () => {
    if (!currentCoords || currentCoords.length < 3) {
      toast.error('Desenhe um talhão antes de salvar');
      return;
    }

    setShowSaveModal(true);
  };

  /**
   * Salva shape com nome
   */
  const handleSave = async () => {
    if (!shapeName.trim()) {
      toast.error('Digite um nome para o talhão');
      return;
    }

    if (!currentCoords || currentCoords.length < 3) {
      toast.error('Coordenadas inválidas');
      return;
    }

    const { success } = await saveShape({
      nome: shapeName.trim(),
      tipo: activeTool === 'circle' ? 'circle' : 'polygon',
      coordenadas: currentCoords,
      cultura: cultura.trim() || undefined,
    });

    if (success) {
      // Resetar estado
      handleCancel();
      
      if (onSaveRequest) {
        onSaveRequest();
      }
    }
  };

  const tools = [
    {
      id: 'polygon' as const,
      icon: Pencil,
      label: 'Mão livre',
      color: '#0057FF',
    },
    {
      id: 'rectangle' as const,
      icon: Square,
      label: 'Retângulo',
      color: '#10B981',
    },
    {
      id: 'circle' as const,
      icon: Circle,
      label: 'Pivô',
      color: '#F59E0B',
    },
  ];

  return (
    <>
      {/* ✅ Card de Instruções Otimizado - pointer-events: none */}
      <DrawingInstructionCard
        isDrawing={activeTool !== null}
        pointCount={currentCoords?.length || 0}
        toolType={activeTool || 'polygon'}
      />

      {/* Toolbar de ferramentas */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-white/20 px-3 py-2 z-10">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <motion.button
              key={tool.id}
              onClick={() => handleToolSelect(isActive ? null : tool.id)}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-[#0057FF] text-white shadow-lg scale-110'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
              whileTap={{ scale: 0.95 }}
              title={tool.label}
            >
              <Icon className="w-5 h-5" />
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-full border-2 border-[#0057FF]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Botões de ação (quando há desenho ativo) */}
        {activeTool && currentCoords && currentCoords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200"
          >
            <button
              onClick={handleSaveClick}
              className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all shadow-lg"
              title="Salvar talhão"
            >
              <Save className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleCancel}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-lg"
              title="Cancelar"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal de salvamento */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSaveModal(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
          >
            <h3 className="text-gray-900 mb-4">Salvar Talhão</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Nome do talhão *
                </label>
                <input
                  type="text"
                  value={shapeName}
                  onChange={(e) => setShapeName(e.target.value)}
                  placeholder="Ex: Talhão A1"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 outline-none transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Cultura (opcional)
                </label>
                <input
                  type="text"
                  value={cultura}
                  onChange={(e) => setCultura(e.target.value)}
                  placeholder="Ex: Soja, Milho, Café..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 outline-none transition-all"
                />
              </div>

              {currentCoords && currentCoords.length > 0 && (
                <div className="text-sm text-gray-500">
                  📍 {currentCoords.length} pontos desenhados
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={loading || !shapeName.trim()}
                className="flex-1 px-4 py-3 bg-[#0057FF] hover:bg-[#0046CC] text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}