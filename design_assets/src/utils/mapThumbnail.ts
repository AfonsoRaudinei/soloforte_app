/**
 * 🗺️ GERADOR DE MINIATURAS DE MAPAS
 * 
 * Utilidade para capturar thumbnails de:
 * - Polígonos/Talhões
 * - Pins de ocorrências
 * - Mapas completos para relatórios
 */

import type { Point, Polygon, OccurrenceMarker } from '../types';

// ============================================
// CONFIGURAÇÕES
// ============================================

const THUMBNAIL_CONFIG = {
  width: 300,
  height: 200,
  quality: 0.8,
  format: 'image/jpeg' as const,
  padding: 20, // pixels de margem
};

// ============================================
// GERAÇÃO DE MINIATURA DE POLÍGONO
// ============================================

/**
 * Gera miniatura de um polígono usando Canvas
 */
export function generatePolygonThumbnail(polygon: Polygon): string {
  const { width, height, quality, format, padding } = THUMBNAIL_CONFIG;
  
  try {
    // Criar canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context não disponível');
    }
    
    // Fundo
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);
    
    // Calcular bounds do polígono
    const bounds = calculateBounds(polygon.points);
    
    // Escalar pontos para o canvas
    const scaledPoints = scalePoints(
      polygon.points,
      bounds,
      width - padding * 2,
      height - padding * 2,
      padding
    );
    
    // Desenhar polígono
    ctx.beginPath();
    ctx.fillStyle = polygon.color + '40'; // 25% opacidade
    ctx.strokeStyle = polygon.color;
    ctx.lineWidth = 2;
    
    scaledPoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Desenhar vértices
    ctx.fillStyle = polygon.color;
    scaledPoints.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Adicionar texto com área
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${polygon.area.toFixed(2)} ha`, padding, height - padding);
    
    // Converter para data URL
    return canvas.toDataURL(format, quality);
  } catch (error) {
    console.error('Erro ao gerar miniatura do polígono:', error);
    return '';
  }
}

// ============================================
// GERAÇÃO DE MINIATURA DE OCORRÊNCIA
// ============================================

/**
 * Gera miniatura de uma ocorrência (pin no mapa)
 */
export function generateOccurrenceThumbnail(
  occurrence: OccurrenceMarker,
  nearbyPolygons?: Polygon[]
): string {
  const { width, height, quality, format, padding } = THUMBNAIL_CONFIG;
  
  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context não disponível');
    }
    
    // Fundo
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);
    
    // Se houver polígonos próximos, desenhar
    if (nearbyPolygons && nearbyPolygons.length > 0) {
      const allPoints = [
        ...nearbyPolygons.flatMap(p => p.points),
        { x: occurrence.lat, y: occurrence.lng },
      ];
      
      const bounds = calculateBounds(allPoints);
      
      // Desenhar cada polígono
      nearbyPolygons.forEach(polygon => {
        const scaledPoints = scalePoints(
          polygon.points,
          bounds,
          width - padding * 2,
          height - padding * 2,
          padding
        );
        
        ctx.beginPath();
        ctx.fillStyle = '#90EE90' + '40'; // Verde claro 25% opacidade
        ctx.strokeStyle = '#90EE90';
        ctx.lineWidth = 1;
        
        scaledPoints.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    }
    
    // Desenhar pin da ocorrência no centro
    const pinX = width / 2;
    const pinY = height / 2;
    
    // Cor do pin baseado na severidade
    const pinColor = occurrence.severidade === 'alta' ? '#ef4444' :
                     occurrence.severidade === 'media' ? '#f59e0b' :
                     '#10b981';
    
    // Desenhar pin (formato de gota)
    ctx.fillStyle = pinColor;
    ctx.beginPath();
    ctx.arc(pinX, pinY - 5, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(pinX, pinY - 5);
    ctx.lineTo(pinX - 5, pinY + 5);
    ctx.lineTo(pinX + 5, pinY + 5);
    ctx.closePath();
    ctx.fill();
    
    // Adicionar texto com tipo
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    
    const tipoLabel = occurrence.tipo === 'inseto' ? '🐛 Inseto' :
                      occurrence.tipo === 'doencas' ? '🍃 Doença' :
                      occurrence.tipo === 'planta-daninha' ? '🌿 Daninha' :
                      occurrence.tipo === 'nutricional' ? '⚗️ Nutricional' :
                      '⚠️ Outro';
    
    ctx.fillText(tipoLabel, width / 2, height - padding);
    
    return canvas.toDataURL(format, quality);
  } catch (error) {
    console.error('Erro ao gerar miniatura da ocorrência:', error);
    return '';
  }
}

// ============================================
// GERAÇÃO DE MINIATURA COMPLETA (RELATÓRIO)
// ============================================

/**
 * Gera miniatura completa com múltiplos polígonos e ocorrências
 */
export function generateReportThumbnail(
  polygons: Polygon[],
  occurrences: OccurrenceMarker[]
): string {
  const { width, height, quality, format, padding } = THUMBNAIL_CONFIG;
  
  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context não disponível');
    }
    
    // Fundo
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);
    
    // Calcular bounds de todos os elementos
    const allPoints = [
      ...polygons.flatMap(p => p.points),
      ...occurrences.map(o => ({ x: o.lat, y: o.lng })),
    ];
    
    if (allPoints.length === 0) {
      ctx.fillStyle = '#999';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Sem dados para exibir', width / 2, height / 2);
      return canvas.toDataURL(format, quality);
    }
    
    const bounds = calculateBounds(allPoints);
    
    // Desenhar polígonos
    polygons.forEach((polygon, index) => {
      const scaledPoints = scalePoints(
        polygon.points,
        bounds,
        width - padding * 2,
        height - padding * 2,
        padding
      );
      
      ctx.beginPath();
      ctx.fillStyle = polygon.color + '40';
      ctx.strokeStyle = polygon.color;
      ctx.lineWidth = 2;
      
      scaledPoints.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Label do talhão
      if (scaledPoints.length > 0) {
        const centerX = scaledPoints.reduce((sum, p) => sum + p.x, 0) / scaledPoints.length;
        const centerY = scaledPoints.reduce((sum, p) => sum + p.y, 0) / scaledPoints.length;
        
        ctx.fillStyle = '#333';
        ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(polygon.name, centerX, centerY);
      }
    });
    
    // Desenhar ocorrências
    occurrences.forEach(occurrence => {
      const occPoint = { x: occurrence.lat, y: occurrence.lng };
      const scaledPoints = scalePoints(
        [occPoint],
        bounds,
        width - padding * 2,
        height - padding * 2,
        padding
      );
      
      if (scaledPoints.length > 0) {
        const pinX = scaledPoints[0].x;
        const pinY = scaledPoints[0].y;
        
        const pinColor = occurrence.severidade === 'alta' ? '#ef4444' :
                         occurrence.severidade === 'media' ? '#f59e0b' :
                         '#10b981';
        
        // Pin
        ctx.fillStyle = pinColor;
        ctx.beginPath();
        ctx.arc(pinX, pinY, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
    
    // Legenda
    ctx.fillStyle = '#333';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(
      `${polygons.length} talhão(ões) • ${occurrences.length} ocorrência(s)`,
      padding,
      height - padding
    );
    
    return canvas.toDataURL(format, quality);
  } catch (error) {
    console.error('Erro ao gerar miniatura do relatório:', error);
    return '';
  }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

function calculateBounds(points: Point[]): Bounds {
  if (points.length === 0) {
    return { minX: 0, maxX: 1, minY: 0, maxY: 1 };
  }
  
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  
  points.forEach(point => {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  });
  
  // Adicionar margem de 10%
  const marginX = (maxX - minX) * 0.1;
  const marginY = (maxY - minY) * 0.1;
  
  return {
    minX: minX - marginX,
    maxX: maxX + marginX,
    minY: minY - marginY,
    maxY: maxY + marginY,
  };
}

function scalePoints(
  points: Point[],
  bounds: Bounds,
  targetWidth: number,
  targetHeight: number,
  offset: number
): Point[] {
  const scaleX = targetWidth / (bounds.maxX - bounds.minX);
  const scaleY = targetHeight / (bounds.maxY - bounds.minY);
  const scale = Math.min(scaleX, scaleY);
  
  const centerOffsetX = (targetWidth - (bounds.maxX - bounds.minX) * scale) / 2;
  const centerOffsetY = (targetHeight - (bounds.maxY - bounds.minY) * scale) / 2;
  
  return points.map(point => ({
    x: (point.x - bounds.minX) * scale + offset + centerOffsetX,
    y: (point.y - bounds.minY) * scale + offset + centerOffsetY,
  }));
}

// ============================================
// EXPORT PRINCIPAL
// ============================================

export const MapThumbnail = {
  generatePolygonThumbnail,
  generateOccurrenceThumbnail,
  generateReportThumbnail,
};
