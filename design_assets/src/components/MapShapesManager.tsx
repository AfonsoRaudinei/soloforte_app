import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Eye, EyeOff, Trash2, Edit3, MapPin, Circle } from 'lucide-react';
import { useMapShapes, MapShape } from '../utils/hooks/useMapShapes';
import { toast } from 'sonner@2.0.3';

/**
 * 🗺️ Gerenciador de Shapes do Mapa
 * 
 * Painel lateral que exibe todos os talhões salvos com:
 * - Lista de shapes com preview de cor
 * - Toggle de visibilidade individual
 * - Edição de nome e propriedades
 * - Exclusão com confirmação
 * - Estatísticas de área total
 * 
 * Usage:
 * ```tsx
 * <MapShapesManager 
 *   clienteId="xxx"
 *   fazendaId="yyy"
 *   onShapeSelect={(shape) => flyToShape(shape)}
 *   onVisibilityToggle={(shapeId, visible) => toggleLayer(shapeId, visible)}
 * />
 * ```
 */

interface MapShapesManagerProps {
  clienteId?: string;
  fazendaId?: string;
  onShapeSelect?: (shape: MapShape) => void;
  onVisibilityToggle?: (shapeId: string, visible: boolean) => void;
}

export function MapShapesManager({
  clienteId,
  fazendaId,
  onShapeSelect,
  onVisibilityToggle,
}: MapShapesManagerProps) {
  const { shapes, loading, deleteShape, updateShape } = useMapShapes({
    clienteId,
    fazendaId,
  });

  const [visibleShapes, setVisibleShapes] = useState<Set<string>>(
    new Set(shapes.map(s => s.id))
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  /**
   * Toggle visibilidade de um shape
   */
  const handleToggleVisibility = (shapeId: string) => {
    const isVisible = visibleShapes.has(shapeId);
    
    if (isVisible) {
      setVisibleShapes(prev => {
        const next = new Set(prev);
        next.delete(shapeId);
        return next;
      });
    } else {
      setVisibleShapes(prev => new Set(prev).add(shapeId));
    }

    if (onVisibilityToggle) {
      onVisibilityToggle(shapeId, !isVisible);
    }

    // Feedback tátil
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  /**
   * Seleciona um shape (zoom no mapa)
   */
  const handleSelectShape = (shape: MapShape) => {
    if (onShapeSelect) {
      onShapeSelect(shape);
    }

    toast.info(`📍 ${shape.nome}`, {
      description: shape.area_ha ? `${shape.area_ha.toFixed(2)} ha` : undefined,
      duration: 2000,
    });
  };

  /**
   * Inicia edição de nome
   */
  const handleStartEdit = (shape: MapShape) => {
    setEditingId(shape.id);
    setEditName(shape.nome);
  };

  /**
   * Salva edição de nome
   */
  const handleSaveEdit = async (shapeId: string) => {
    if (!editName.trim()) {
      toast.error('Nome não pode estar vazio');
      return;
    }

    const { success } = await updateShape(shapeId, { nome: editName.trim() });
    
    if (success) {
      setEditingId(null);
      setEditName('');
    }
  };

  /**
   * Cancela edição
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  /**
   * Remove shape com confirmação
   */
  const handleDelete = async (shape: MapShape) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o talhão "${shape.nome}"?`
    );

    if (!confirmed) return;

    const { success } = await deleteShape(shape.id);
    
    if (success) {
      // Remover dos visíveis
      setVisibleShapes(prev => {
        const next = new Set(prev);
        next.delete(shape.id);
        return next;
      });
    }
  };

  /**
   * Calcula área total
   */
  const totalArea = shapes
    .filter(s => s.area_ha)
    .reduce((sum, s) => sum + (s.area_ha || 0), 0);

  /**
   * Ícone por tipo de shape
   */
  const getShapeIcon = (tipo: string) => {
    switch (tipo) {
      case 'circle':
        return <Circle className="w-4 h-4" />;
      case 'polygon':
        return <Layers className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  if (!clienteId && !fazendaId) {
    return null;
  }

  return (
    <div className="absolute top-20 right-4 w-80 max-h-[calc(100vh-200px)] bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden z-10">
      {/* Header */}
      <div className="px-4 py-3 bg-white/50 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0057FF]" />
            <h3 className="text-gray-900">Talhões Salvos</h3>
          </div>
          <div className="text-xs text-gray-500">
            {shapes.length} {shapes.length === 1 ? 'talhão' : 'talhões'}
          </div>
        </div>
        
        {totalArea > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            Área total: <span className="text-[#0057FF]">{totalArea.toFixed(2)} ha</span>
          </div>
        )}
      </div>

      {/* Lista de Shapes */}
      <div className="overflow-y-auto max-h-[500px] p-3 space-y-2">
        {loading && shapes.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-[#0057FF]/30 border-t-[#0057FF] rounded-full animate-spin" />
          </div>
        ) : shapes.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            Nenhum talhão desenhado ainda
          </div>
        ) : (
          <AnimatePresence>
            {shapes.map((shape) => {
              const isVisible = visibleShapes.has(shape.id);
              const isEditing = editingId === shape.id;

              return (
                <motion.div
                  key={shape.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`p-3 rounded-xl border transition-all ${
                    isVisible
                      ? 'bg-white border-gray-200/50 shadow-sm'
                      : 'bg-gray-50 border-gray-200/30 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Cor do shape */}
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 border border-white shadow-sm"
                      style={{ backgroundColor: shape.cor || '#0057FF' }}
                    />

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(shape.id);
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          className="w-full px-2 py-1 text-sm bg-white border border-[#0057FF] rounded-lg outline-none"
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => handleSelectShape(shape)}
                          className="w-full text-left"
                        >
                          <div className="text-sm text-gray-900 truncate">
                            {shape.nome}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              {getShapeIcon(shape.tipo)}
                              <span className="capitalize">{shape.tipo}</span>
                            </div>
                            {shape.area_ha && (
                              <div className="text-xs text-gray-500">
                                {shape.area_ha.toFixed(2)} ha
                              </div>
                            )}
                          </div>
                          {shape.cultura && (
                            <div className="mt-1 text-xs text-gray-500">
                              🌱 {shape.cultura}
                              {shape.variedade && ` • ${shape.variedade}`}
                            </div>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(shape.id)}
                            className="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                            title="Salvar"
                          >
                            <span className="text-xs text-green-700">✓</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            title="Cancelar"
                          >
                            <span className="text-xs text-gray-600">✕</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToggleVisibility(shape.id)}
                            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                            title={isVisible ? 'Ocultar' : 'Mostrar'}
                          >
                            {isVisible ? (
                              <Eye className="w-4 h-4 text-gray-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={() => handleStartEdit(shape)}
                            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(shape)}
                            className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Badge de sincronização */}
                  {shape.synced === false && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-orange-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span>Aguardando sincronização</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
