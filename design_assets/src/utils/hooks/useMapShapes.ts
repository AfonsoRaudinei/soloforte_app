import { useState, useCallback, useEffect } from 'react';
import { useSupabaseSafeQuery, useSupabaseSafeMutation } from './useSupabaseSafeQuery';
import { saveToCache, getFromCache, addToSyncQueue } from '../offlineDB';
import { toast } from 'sonner@2.0.3';

/**
 * 🗺️ Sistema de Persistência de Shapes no Mapa
 * 
 * Gerencia talhões desenhados no mapa com:
 * - Persistência em Supabase (public.talhoes)
 * - Cache offline automático
 * - Sincronização bidirecional
 * - Suporte para múltiplos tipos de shapes
 * - Cálculo automático de área
 * 
 * Tipos de shapes suportados:
 * - polygon (mão livre + retângulo)
 * - circle (pivôs)
 * - polyline (linhas)
 * 
 * Usage:
 * ```tsx
 * const { shapes, loading, saveShape, deleteShape, updateShape } = useMapShapes({
 *   clienteId: 'xxx',
 *   fazendaId: 'yyy'
 * });
 * ```
 */

export interface MapShape {
  id: string;
  nome: string;
  tipo: 'polygon' | 'circle' | 'polyline';
  coordenadas: Array<{ lat: number; lng: number }> | { lat: number; lng: number; radius: number };
  area_ha?: number;
  cor?: string;
  cliente_id?: string;
  fazenda_id?: string;
  talhao_id?: string;
  cultura?: string;
  variedade?: string;
  data_plantio?: string;
  observacoes?: string;
  ativo?: boolean;
  created_at?: string;
  updated_at?: string;
  synced?: boolean;
}

interface UseMapShapesOptions {
  clienteId?: string;
  fazendaId?: string;
  autoLoad?: boolean;
}

/**
 * Hook principal para gerenciar shapes do mapa
 */
export function useMapShapes(options: UseMapShapesOptions = {}) {
  const { clienteId, fazendaId, autoLoad = true } = options;
  
  const [shapes, setShapes] = useState<MapShape[]>([]);
  const { insert, update, remove, loading: mutationLoading } = useSupabaseSafeMutation<MapShape>();

  /**
   * Query para carregar shapes do Supabase
   */
  const { 
    data: fetchedShapes, 
    loading: queryLoading, 
    refetch 
  } = useSupabaseSafeQuery<MapShape>({
    table: 'talhoes',
    query: (table) => {
      let query = table.select('*').eq('ativo', true);
      
      if (clienteId) {
        query = query.eq('cliente_id', clienteId);
      }
      
      if (fazendaId) {
        query = query.eq('fazenda_id', fazendaId);
      }
      
      return query.order('created_at', { ascending: false });
    },
    cacheKey: 'talhoes',
    enableCache: true,
    silent: true,
  });

  /**
   * Atualiza estado local quando dados são carregados
   */
  useEffect(() => {
    if (fetchedShapes && fetchedShapes.length > 0) {
      setShapes(fetchedShapes);
      console.log(`🗺️ ${fetchedShapes.length} shape(s) carregado(s)`);
    }
  }, [fetchedShapes]);

  /**
   * Calcula área de um polígono em hectares
   * Fórmula de Shoelace (para coordenadas lat/lng)
   */
  const calculateArea = useCallback((coords: Array<{ lat: number; lng: number }>): number => {
    if (coords.length < 3) return 0;

    // Converter para metros usando aproximação
    // 1° latitude ≈ 111 km
    // 1° longitude ≈ 111 km * cos(latitude)
    
    const METERS_PER_DEGREE_LAT = 111000;
    
    let area = 0;
    const n = coords.length;
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      
      const lat1 = coords[i].lat;
      const lng1 = coords[i].lng;
      const lat2 = coords[j].lat;
      const lng2 = coords[j].lng;
      
      // Converter para metros
      const y1 = lat1 * METERS_PER_DEGREE_LAT;
      const x1 = lng1 * METERS_PER_DEGREE_LAT * Math.cos(lat1 * Math.PI / 180);
      const y2 = lat2 * METERS_PER_DEGREE_LAT;
      const x2 = lng2 * METERS_PER_DEGREE_LAT * Math.cos(lat2 * Math.PI / 180);
      
      area += x1 * y2 - x2 * y1;
    }
    
    area = Math.abs(area / 2);
    
    // Converter m² para hectares (1 ha = 10.000 m²)
    return area / 10000;
  }, []);

  /**
   * Calcula área de um círculo em hectares
   */
  const calculateCircleArea = useCallback((radius: number): number => {
    // Área = π * r²
    const areaM2 = Math.PI * Math.pow(radius, 2);
    return areaM2 / 10000; // Converter para hectares
  }, []);

  /**
   * Gera cor aleatória para novo shape
   */
  const getRandomColor = useCallback((): string => {
    const colors = [
      '#0057FF', // Azul SoloForte
      '#10B981', // Verde
      '#F59E0B', // Laranja
      '#EF4444', // Vermelho
      '#8B5CF6', // Roxo
      '#EC4899', // Rosa
      '#06B6D4', // Ciano
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  /**
   * Salva um novo shape
   */
  const saveShape = useCallback(async (
    shape: Omit<MapShape, 'id' | 'created_at' | 'updated_at' | 'synced'>
  ): Promise<{ success: boolean; shapeId?: string }> => {
    try {
      // Calcular área automaticamente se for polígono
      let area_ha = shape.area_ha;
      
      if (shape.tipo === 'polygon' && Array.isArray(shape.coordenadas)) {
        area_ha = calculateArea(shape.coordenadas);
      } else if (shape.tipo === 'circle' && 'radius' in shape.coordenadas) {
        area_ha = calculateCircleArea((shape.coordenadas as any).radius);
      }

      // Gerar cor se não fornecida
      const cor = shape.cor || getRandomColor();

      const newShape: any = {
        ...shape,
        area_ha,
        cor,
        cliente_id: clienteId || shape.cliente_id,
        fazenda_id: fazendaId || shape.fazenda_id,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Tentar salvar no Supabase
      if (navigator.onLine) {
        const { data, error } = await insert('talhoes', newShape, { 
          showToast: true,
          silent: false 
        });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          const savedShape = data[0];
          
          // Atualizar estado local
          setShapes(prev => [savedShape, ...prev]);
          
          // Salvar no cache
          await saveToCache('talhoes', data);
          
          console.log(`✅ Shape salvo: ${savedShape.nome} (${area_ha?.toFixed(2)} ha)`);
          
          return { success: true, shapeId: savedShape.id };
        }
      } else {
        // Offline - salvar localmente e adicionar à fila
        const tempId = `temp_${Date.now()}`;
        const offlineShape = { ...newShape, id: tempId, synced: false };
        
        setShapes(prev => [offlineShape, ...prev]);
        await addToSyncQueue('talhoes', 'INSERT', offlineShape);
        
        toast.info('📡 Shape salvo offline', {
          description: 'Será sincronizado quando voltar online',
        });
        
        return { success: true, shapeId: tempId };
      }

      return { success: false };

    } catch (error: any) {
      console.error('❌ Erro ao salvar shape:', error);
      toast.error('❌ Erro ao salvar talhão');
      return { success: false };
    }
  }, [clienteId, fazendaId, insert, calculateArea, calculateCircleArea, getRandomColor]);

  /**
   * Atualiza um shape existente
   */
  const updateShape = useCallback(async (
    shapeId: string,
    updates: Partial<MapShape>
  ): Promise<{ success: boolean }> => {
    try {
      const updatedData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      if (navigator.onLine) {
        const { data, error } = await update('talhoes', shapeId, updatedData, {
          showToast: true,
        });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Atualizar estado local
          setShapes(prev => 
            prev.map(s => s.id === shapeId ? { ...s, ...data[0] } : s)
          );
          
          console.log(`✅ Shape atualizado: ${shapeId}`);
          return { success: true };
        }
      } else {
        // Offline - atualizar localmente e adicionar à fila
        setShapes(prev => 
          prev.map(s => s.id === shapeId ? { ...s, ...updatedData, synced: false } : s)
        );
        
        await addToSyncQueue('talhoes', 'UPDATE', { id: shapeId, ...updatedData });
        
        toast.info('📡 Atualização salva offline');
        return { success: true };
      }

      return { success: false };

    } catch (error: any) {
      console.error('❌ Erro ao atualizar shape:', error);
      toast.error('❌ Erro ao atualizar talhão');
      return { success: false };
    }
  }, [update]);

  /**
   * Remove um shape (soft delete)
   */
  const deleteShape = useCallback(async (shapeId: string): Promise<{ success: boolean }> => {
    try {
      if (navigator.onLine) {
        // Soft delete - marcar como inativo
        const { data, error } = await update('talhoes', shapeId, { 
          ativo: false,
          updated_at: new Date().toISOString(),
        }, {
          showToast: true,
        });

        if (error) {
          throw error;
        }

        // Remover do estado local
        setShapes(prev => prev.filter(s => s.id !== shapeId));
        
        console.log(`🗑️ Shape removido: ${shapeId}`);
        return { success: true };
      } else {
        // Offline
        setShapes(prev => prev.filter(s => s.id !== shapeId));
        
        await addToSyncQueue('talhoes', 'UPDATE', { 
          id: shapeId, 
          ativo: false,
          updated_at: new Date().toISOString(),
        });
        
        toast.info('📡 Remoção salva offline');
        return { success: true };
      }
    } catch (error: any) {
      console.error('❌ Erro ao remover shape:', error);
      toast.error('❌ Erro ao remover talhão');
      return { success: false };
    }
  }, [update]);

  /**
   * Limpa todos os shapes (para trocar de fazenda, por exemplo)
   */
  const clearShapes = useCallback(() => {
    setShapes([]);
  }, []);

  /**
   * Recarrega shapes do servidor
   */
  const reloadShapes = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    shapes,
    loading: queryLoading || mutationLoading,
    saveShape,
    updateShape,
    deleteShape,
    clearShapes,
    reloadShapes,
  };
}

/**
 * 🎨 Hook para converter shape para formato do mapa (Leaflet/Google Maps)
 */
export function useShapeConverter() {
  /**
   * Converte shape para formato Leaflet Polygon
   */
  const toLeafletPolygon = useCallback((shape: MapShape) => {
    if (shape.tipo !== 'polygon' || !Array.isArray(shape.coordenadas)) {
      return null;
    }

    return {
      id: shape.id,
      positions: shape.coordenadas.map(c => [c.lat, c.lng]),
      color: shape.cor || '#0057FF',
      fillOpacity: 0.3,
      weight: 2,
      metadata: {
        nome: shape.nome,
        area_ha: shape.area_ha,
        cultura: shape.cultura,
      },
    };
  }, []);

  /**
   * Converte shape para formato Leaflet Circle
   */
  const toLeafletCircle = useCallback((shape: MapShape) => {
    if (shape.tipo !== 'circle' || !('radius' in shape.coordenadas)) {
      return null;
    }

    const coords = shape.coordenadas as { lat: number; lng: number; radius: number };

    return {
      id: shape.id,
      center: [coords.lat, coords.lng],
      radius: coords.radius,
      color: shape.cor || '#0057FF',
      fillOpacity: 0.3,
      weight: 2,
      metadata: {
        nome: shape.nome,
        area_ha: shape.area_ha,
      },
    };
  }, []);

  /**
   * Converte coordenadas do mapa para formato de shape
   */
  const fromLeafletToShape = useCallback((
    coords: Array<[number, number]>,
    tipo: 'polygon' | 'polyline'
  ): Array<{ lat: number; lng: number }> => {
    return coords.map(([lat, lng]) => ({ lat, lng }));
  }, []);

  return {
    toLeafletPolygon,
    toLeafletCircle,
    fromLeafletToShape,
  };
}
