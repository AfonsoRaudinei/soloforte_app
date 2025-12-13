import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { X, Trash2, Edit2, Save, Download, ChevronDown, ChevronUp, Info, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import type { Point, Polygon } from '../types';
import { TalhaoVinculoModal } from './TalhaoVinculoModal';

interface MapDrawingProps {
  activeTool: string | null;
  onToolComplete: () => void;
  onPolygonSave: (polygon: Polygon) => void;
  savedPolygons: Polygon[];
  onPolygonDelete: (id: string) => void;
  onClearAll?: () => void; // ✅ NOVO: Callback para limpar todos os polígonos
  onAnalyzeWithAI?: (polygon: Polygon) => void; // ✅ NOVO: Callback para analisar área com IA
}

const MapDrawing = memo(function MapDrawing({
  activeTool,
  onToolComplete,
  onPolygonSave,
  savedPolygons,
  onPolygonDelete,
  onClearAll,
  onAnalyzeWithAI,
}: MapDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [tempPolygon, setTempPolygon] = useState<Polygon | null>(null);
  const [selectedPolygon, setSelectedPolygon] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [cropMode, setCropMode] = useState(false);
  const [cropPolygon, setCropPolygon] = useState<Point[]>([]);

  // ✅ NOVO: Estados para melhorias
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [currentArea, setCurrentArea] = useState<number>(0); // Área em tempo real
  const MAX_AREA_HA = 1000; // Limite máximo de área (1000 ha)

  // ✅ NOVO: Estados para controle de edição de polígonos
  const [editingPolygonId, setEditingPolygonId] = useState<string | null>(null);
  const [editingPoints, setEditingPoints] = useState<Point[]>([]);
  const [originalPoints, setOriginalPoints] = useState<Point[]>([]);
  const [draggedVertexIndex, setDraggedVertexIndex] = useState<number | null>(null);
  const [isDraggingVertex, setIsDraggingVertex] = useState(false);
  
  // ✅ NOVO: Estado para controlar modal de vínculo
  const [showVinculoModal, setShowVinculoModal] = useState(false);
  const [polygonToSave, setPolygonToSave] = useState<Polygon | null>(null);
  
  // Coordenadas base (centro de São Paulo como exemplo)
  const baseLatLng = { lat: -23.5505, lng: -46.6333 };
  // Estado para armazenar polígonos normalizados com coordenadas x,y
  const [normalizedPolygons, setNormalizedPolygons] = useState<Polygon[]>([]);

  // Helper para conversão de unidades
  const formatAreaUnits = (hectares: number) => {
    return {
      ha: hectares.toFixed(2),
      m2: (hectares * 10000).toFixed(0),
      km2: (hectares / 100).toFixed(4),
      alqPaulista: (hectares / 2.42).toFixed(3),
      alqMineiro: (hectares / 4.84).toFixed(3),
    };
  };

  // Detectar auto-interseção (linha cruza com ela mesma)
  const hasSelfintersection = useCallback((points: Point[]): boolean => {
    if (points.length < 4) return false;
    
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 2; j < points.length - 1; j++) {
        if (i === 0 && j === points.length - 2) continue; // Ignora primeira e última linha
        
        const intersects = lineSegmentsIntersect(
          points[i], points[i + 1],
          points[j], points[j + 1]
        );
        
        if (intersects) {
          console.log(`⚠️ Auto-interseção detectada entre segmentos ${i} e ${j}`);
          return true;
        }
      }
    }
    return false;
  }, []);

  // Detectar interseção entre dois segmentos de linha
  const lineSegmentsIntersect = (p1: Point, p2: Point, p3: Point, p4: Point): boolean => {
    const ccw = (A: Point, B: Point, C: Point) => {
      return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
    };
    
    return ccw(p1, p3, p4) !== ccw(p2, p3, p4) && ccw(p1, p2, p3) !== ccw(p1, p2, p4);
  };

  // Detectar sobreposição com polígonos existentes
  const hasOverlapWithExisting = useCallback((points: Point[]): boolean => {
    if (points.length < 3) return false;
    
    for (const polygon of normalizedPolygons) {
      // Verificar se algum ponto está dentro do polígono existente
      for (const point of points) {
        if (pointInPolygon(point, polygon.points)) {
          console.log(`⚠️ Sobreposição detectada com polígono: ${polygon.name}`);
          return true;
        }
      }
      
      // Verificar se algum ponto do polígono existente está dentro do novo
      for (const existingPoint of polygon.points) {
        if (pointInPolygon(existingPoint, points)) {
          console.log(`⚠️ Sobreposição detectada com polígono: ${polygon.name}`);
          return true;
        }
      }
      
      // Verificar interseção de segmentos
      for (let i = 0; i < points.length - 1; i++) {
        for (let j = 0; j < polygon.points.length - 1; j++) {
          if (lineSegmentsIntersect(
            points[i], points[i + 1],
            polygon.points[j], polygon.points[j + 1]
          )) {
            console.log(`⚠️ Interseção de linhas detectada com polígono: ${polygon.name}`);
            return true;
          }
        }
      }
    }
    
    return false;
  }, [normalizedPolygons]);

  // Verificar se um ponto está dentro de um polígono (Ray Casting)
  const pointInPolygon = (point: Point, polygon: Point[]): boolean => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      
      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // Converter lat/lng para pixel x/y (inverso do pixelToLatLng)
  const latLngToPixel = (lat: number, lng: number): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    // Usar a mesma escala do pixelToLatLng para manter consistência
    const scale = 0.00005;
    const x = (lng - baseLatLng.lng) / scale + canvas.width / 2;
    const y = canvas.height / 2 - (lat - baseLatLng.lat) / scale;
    return { x, y };
  };

  // Desenhar um polígono
  const drawPolygon = useCallback((
    ctx: CanvasRenderingContext2D,
    points: Point[],
    color: string,
    isSelected: boolean,
    opacity: number = 0.3,
    hasError: boolean = false,
    isEditable: boolean = false
  ) => {
    if (points.length === 0) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point, i) => {
      if (i > 0) ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();

    // Cor de erro sobrescreve outras cores
    const finalColor = hasError ? '#FF0000' : (isSelected ? '#FF0000' : color);
    const finalOpacity = hasError ? 0.4 : opacity;

    // Preencher
    ctx.fillStyle = finalColor + Math.floor(finalOpacity * 255).toString(16).padStart(2, '0');
    ctx.fill();

    // Contorno mais grosso se tiver erro
    ctx.strokeStyle = finalColor;
    ctx.lineWidth = hasError ? 4 : (isSelected ? 3 : 2);
    ctx.stroke();

    // Desenhar vértices (maior e com estilo especial se editável)
    points.forEach((point, index) => {
      const pointRadius = isEditable ? 8 : (hasError ? 6 : 4);
      
      // ✅ NOVO: Círculo externo para pontos editáveis (indica que são clicáveis)
      if (isEditable) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointRadius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = finalColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Círculo principal
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = finalColor;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // ✅ NOVO: Número do ponto para pontos editáveis
      if (isEditable && points.length > 2) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px -apple-system';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), point.x, point.y);
      }
    });
  }, []);

  // Normalizar polígonos importados (converter lat/lng para x/y)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const normalized = savedPolygons.map(polygon => {
      // Verificar se o polígono precisa de normalização (se x e y são 0)
      const needsNormalization = polygon.points.some(p => p.x === 0 && p.y === 0);
      
      if (needsNormalization) {
        console.log(`Normalizando polígono importado: ${polygon.name}`);
        // Converter lat/lng para x/y
        const normalizedPoints = polygon.points.map(point => {
          if (point.lat !== undefined && point.lng !== undefined) {
            const { x, y } = latLngToPixel(point.lat, point.lng);
            console.log(`  Convertendo (${point.lat}, ${point.lng}) => (${x}, ${y})`);
            return { ...point, x, y };
          }
          return point;
        });
        return { ...polygon, points: normalizedPoints };
      }
      
      return polygon;
    });

    setNormalizedPolygons(normalized);
  }, [savedPolygons]);

  // ✅ NOVO: Ref para completeShape (para evitar dependência circular)
  const completeShapeRef = useRef<((type: string, points: Point[]) => void) | null>(null);

  // ✅ NOVO: Atalhos de teclado
  useEffect(() => {
    if (!activeTool || activeTool !== 'polygon') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Backspace ou Delete: remover último ponto
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (currentPoints.length > 0) {
          e.preventDefault();
          const newPoints = currentPoints.slice(0, -1);
          setCurrentPoints(newPoints);
          
          toast.info('Último ponto removido', {
            description: `${newPoints.length} pontos restantes`,
            duration: 1500,
          });
        }
      }
      
      // Enter: finalizar desenho (se tiver pontos suficientes)
      if (e.key === 'Enter') {
        if (currentPoints.length >= 3) {
          e.preventDefault();
          completeShapeRef.current?.('polygon', currentPoints);
        }
      }
      
      // Escape: cancelar desenho
      if (e.key === 'Escape') {
        if (currentPoints.length > 0) {
          e.preventDefault();
          setCurrentPoints([]);
          setCurrentArea(0);
          toast.info('Desenho cancelado');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeTool, currentPoints]);

  // ✅ NOVO: Calcular área em tempo real enquanto desenha
  useEffect(() => {
    if (currentPoints.length >= 3) {
      const area = calculateArea(currentPoints);
      setCurrentArea(area);
    } else {
      setCurrentArea(0);
    }
  }, [currentPoints]);

  // Efeito para canvas e desenho
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Redimensionar canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Re-normalizar polígonos ao redimensionar
      const normalized = savedPolygons.map(polygon => {
        const needsNormalization = polygon.points.some(p => 
          p.lat !== undefined && p.lng !== undefined
        );
        
        if (needsNormalization) {
          const normalizedPoints = polygon.points.map(point => {
            if (point.lat !== undefined && point.lng !== undefined) {
              const { x, y } = latLngToPixel(point.lat, point.lng);
              return { ...point, x, y };
            }
            return point;
          });
          return { ...polygon, points: normalizedPoints };
        }
        
        return polygon;
      });
      
      setNormalizedPolygons(normalized);
      
      // Redesenhar tudo
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar polígonos normalizados
        normalized.forEach((polygon) => {
          drawPolygon(ctx, polygon.points, polygon.color, polygon.id === selectedPolygon, 0.3, false, false);
        });

        // Desenhar polígono temporário
        if (tempPolygon) {
          drawPolygon(ctx, tempPolygon.points, tempPolygon.color, false, 0.5, false, false);
        }

        // Desenhar pontos atuais (editável)
        if (currentPoints.length > 0) {
          drawPolygon(ctx, currentPoints, '#0057FF', false, 0.3, false, true);
        }
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [savedPolygons, currentPoints, tempPolygon, selectedPolygon]);
  
  // Redesenhar quando normalizedPolygons, currentPoints ou tempPolygon mudarem
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar polígonos salvos (usar normalizados)
    normalizedPolygons.forEach((polygon) => {
      // Não desenhar o polígono que está sendo editado (será desenhado separadamente)
      if (polygon.id === editingPolygonId) return;
      
      drawPolygon(ctx, polygon.points, polygon.color, polygon.id === selectedPolygon, 0.3, false, false);
    });

    // ✅ NOVO: Desenhar polígono em edição com handles brancos arrastáveis
    if (editingPolygonId && editingPoints.length > 0) {
      const editingPoly = savedPolygons.find(p => p.id === editingPolygonId);
      const color = editingPoly?.color || '#0057FF';
      
      // Desenhar o polígono com opacidade maior e handles editáveis
      drawPolygon(ctx, editingPoints, color, false, 0.5, false, true);
      
      // Desenhar handles brancos maiores para arrastar (estilo QGIS)
      editingPoints.forEach((point, index) => {
        // Handle externo (branco, maior)
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Handle interno (cor do polígono, menor)
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Número do vértice
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px -apple-system';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), point.x, point.y);
      });
    }

    // Desenhar polígono temporário
    if (tempPolygon) {
      drawPolygon(ctx, tempPolygon.points, tempPolygon.color, false, 0.5, false, false);
    }

    // Desenhar pontos atuais com detecção de erro
    if (currentPoints.length > 0) {
      const hasSelfIntersection = hasSelfintersection(currentPoints);
      const hasOverlap = hasOverlapWithExisting(currentPoints);
      const hasError = hasSelfIntersection || hasOverlap;
      
      // ✅ Polígono em edição é editável (pontos clicáveis)
      drawPolygon(ctx, currentPoints, '#0057FF', false, 0.3, hasError, true);
      
      // Mostrar alerta visual no topo do canvas
      if (hasError) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
        ctx.fillRect(10, 10, canvas.width - 20, 60);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px -apple-system, system-ui, sans-serif';
        ctx.textAlign = 'center';
        const errorMsg = hasSelfIntersection 
          ? '⚠️ ERRO: Linhas cruzando!' 
          : '⚠️ ERRO: Sobrepõe área existente!';
        ctx.fillText(errorMsg, canvas.width / 2, 25);
        
        // ✅ NOVO: Instrução de como corrigir
        ctx.font = '12px -apple-system, system-ui, sans-serif';
        ctx.fillText('Clique nos pontos vermelhos para removê-los', canvas.width / 2, 45);
      }
    }
  }, [normalizedPolygons, currentPoints, tempPolygon, selectedPolygon, editingPolygonId, editingPoints, hasSelfintersection, hasOverlapWithExisting, savedPolygons]);

  // Converter pixel para lat/lng (simulado)
  const pixelToLatLng = (x: number, y: number): { lat: number; lng: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return baseLatLng;

    // Conversão com escala ajustada para medições mais realistas
    // 1 pixel = aproximadamente 0.00005 graus (cerca de 5.5 metros no equador)
    const scale = 0.00005;
    return {
      lat: baseLatLng.lat + (canvas.height / 2 - y) * scale,
      lng: baseLatLng.lng + (x - canvas.width / 2) * scale,
    };
  };

  // Calcular área usando fórmula de Shoelace para polígonos em coordenadas geográficas
  const calculateArea = (points: Point[]): number => {
    if (points.length < 3) {
      console.warn('calculateArea: Polígono precisa de pelo menos 3 pontos');
      return 0;
    }

    // Verificar se todos os pontos têm coordenadas válidas
    const validPoints = points.filter(p => p.lat !== undefined && p.lng !== undefined);
    if (validPoints.length < 3) {
      console.error('calculateArea: Pontos sem coordenadas lat/lng', points);
      return 0;
    }

    let area = 0;
    const earthRadius = 6371000; // metros

    for (let i = 0; i < validPoints.length; i++) {
      const j = (i + 1) % validPoints.length;
      const p1 = validPoints[i];
      const p2 = validPoints[j];

      const lat1 = (p1.lat! * Math.PI) / 180;
      const lat2 = (p2.lat! * Math.PI) / 180;
      const lng1 = (p1.lng! * Math.PI) / 180;
      const lng2 = (p2.lng! * Math.PI) / 180;

      area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }

    area = (area * earthRadius * earthRadius) / 2;
    area = Math.abs(area);

    // Converter para hectares
    const hectares = area / 10000;
    
    console.log(`calculateArea: ${validPoints.length} pontos válidos, área = ${hectares.toFixed(2)} ha`);
    return hectares;
  };

  // Calcular perímetro usando distância Haversine
  const calculatePerimeter = (points: Point[]): number => {
    if (points.length < 2) {
      console.warn('calculatePerimeter: Polígono precisa de pelo menos 2 pontos');
      return 0;
    }

    // Verificar se todos os pontos têm coordenadas válidas
    const validPoints = points.filter(p => p.lat !== undefined && p.lng !== undefined);
    if (validPoints.length < 2) {
      console.error('calculatePerimeter: Pontos sem coordenadas lat/lng', points);
      return 0;
    }

    let perimeter = 0;
    const earthRadius = 6371000; // metros

    for (let i = 0; i < validPoints.length; i++) {
      const j = (i + 1) % validPoints.length;
      const p1 = validPoints[i];
      const p2 = validPoints[j];

      const lat1 = (p1.lat! * Math.PI) / 180;
      const lat2 = (p2.lat! * Math.PI) / 180;
      const dLat = lat2 - lat1;
      const dLng = ((p2.lng! - p1.lng!) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      perimeter += earthRadius * c;
    }

    console.log(`calculatePerimeter: ${validPoints.length} pontos válidos, perímetro = ${perimeter.toFixed(0)} m`);
    return perimeter;
  };



  // ✅ NOVO: Verificar se clicou próximo a um ponto existente
  const findNearbyPoint = useCallback((x: number, y: number, points: Point[], threshold: number = 15): number => {
    for (let i = 0; i < points.length; i++) {
      const distance = Math.sqrt(Math.pow(points[i].x - x, 2) + Math.pow(points[i].y - y, 2));
      if (distance <= threshold) {
        return i; // Retorna o índice do ponto próximo
      }
    }
    return -1; // Nenhum ponto próximo
  }, []);

  // Manipuladores de eventos do canvas
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activeTool) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const latLng = pixelToLatLng(x, y);

    const newPoint: Point = { x, y, lat: latLng.lat, lng: latLng.lng };

    if (activeTool === 'crop') {
      // Modo de recorte
      setCropMode(true);
      setCropPolygon([...cropPolygon, newPoint]);
    } else if (activeTool === 'polygon') {
      // ✅ NOVO: Verificar se clicou próximo a um ponto existente para deletá-lo
      const nearbyIndex = findNearbyPoint(x, y, currentPoints);
      
      if (nearbyIndex !== -1) {
        // Deletar o ponto clicado
        const updatedPoints = currentPoints.filter((_, index) => index !== nearbyIndex);
        setCurrentPoints(updatedPoints);
        
        toast.info('Ponto removido', {
          description: `${currentPoints.length - 1} pontos restantes`,
          duration: 2000,
        });
      } else {
        // Adicionar novo ponto
        setCurrentPoints([...currentPoints, newPoint]);
      }
    } else if (activeTool === 'freehand') {
      setIsDrawing(true);
      setCurrentPoints([newPoint]);
    } else if (activeTool === 'rectangle' || activeTool === 'circle') {
      if (currentPoints.length === 0) {
        setCurrentPoints([newPoint]);
      } else if (currentPoints.length === 1) {
        completeShape(activeTool, [...currentPoints, newPoint]);
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activeTool) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const latLng = pixelToLatLng(x, y);

    // ✅ NOVO: Mudar cursor se estiver sobre um ponto editável
    if (activeTool === 'polygon' && currentPoints.length > 0) {
      const nearbyIndex = findNearbyPoint(x, y, currentPoints);
      canvas.style.cursor = nearbyIndex !== -1 ? 'pointer' : 'crosshair';
    }

    if (activeTool === 'freehand' && isDrawing) {
      setCurrentPoints([...currentPoints, { x, y, lat: latLng.lat, lng: latLng.lng }]);
    } else if ((activeTool === 'rectangle' || activeTool === 'circle') && currentPoints.length === 1) {
      // Mostrar preview
      const start = currentPoints[0];
      const preview = generateShapePoints(activeTool, start, { x, y, lat: latLng.lat, lng: latLng.lng });
      setTempPolygon({
        id: 'temp',
        name: 'Preview',
        points: preview,
        type: activeTool,
        area: 0,
        perimeter: 0,
        color: '#0057FF',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleCanvasMouseUp = () => {
    if (activeTool === 'freehand' && isDrawing) {
      setIsDrawing(false);
      completeShape('freehand', currentPoints);
    }
  };

  // Completar forma desenhada
  const completeShape = useCallback((type: string, points: Point[]) => {
    // Círculo e retângulo precisam de apenas 2 pontos iniciais
    const minPoints = (type === 'circle' || type === 'rectangle') ? 2 : 3;
    
    if (points.length < minPoints) {
      toast.warning('Pontos insuficientes', {
        description: `Desenhe pelo menos ${minPoints} pontos para criar a área`,
        duration: 3000,
      });
      setCurrentPoints([]);
      setTempPolygon(null);
      return;
    }

    // Para círculo e retângulo, gerar os pontos da forma
    let finalPoints = points;
    if (type === 'circle' || type === 'rectangle') {
      finalPoints = generateShapePoints(type, points[0], points[1]);
    }

    // Garantir que todos os pontos têm lat/lng
    const validPoints = finalPoints.filter(p => p.lat !== undefined && p.lng !== undefined);
    if (validPoints.length < 3) {
      toast.error('Erro ao calcular coordenadas', {
        description: 'Não foi possível processar os pontos. Tente desenhar novamente.',
        duration: 3000,
      });
      setCurrentPoints([]);
      setTempPolygon(null);
      return;
    }

    const area = calculateArea(validPoints);
    const perimeter = calculatePerimeter(validPoints);

    // Validar medidas
    if (area === 0 || perimeter === 0) {
      toast.error('Área muito pequena', {
        description: 'A área desenhada é muito pequena. Tente desenhar uma área maior.',
        duration: 3000,
      });
      setCurrentPoints([]);
      setTempPolygon(null);
      return;
    }

    // Validar auto-interseção
    if (hasSelfintersection(validPoints)) {
      toast.error('Área com auto-interseção', {
        description: 'A área desenhada cruza com ela mesma. Redesenhe sem cruzar as linhas.',
        duration: 4000,
      });
      setCurrentPoints([]);
      setTempPolygon(null);
      return;
    }

    // Validar sobreposião com áreas existentes
    if (hasOverlapWithExisting(validPoints)) {
      toast.error('Área sobrepõe outra existente', {
        description: 'A área desenhada sobrepõe uma área já cadastrada. Escolha outro local.',
        duration: 4000,
      });
      setCurrentPoints([]);
      setTempPolygon(null);
      return;
    }

    const newPolygon: Polygon = {
      id: `poly_${Date.now()}`,
      name: `Área ${savedPolygons.length + 1}`,
      points: validPoints,
      type: type as any,
      area,
      perimeter,
      color: getRandomColor(),
      createdAt: new Date().toISOString(),
    };

    toast.success('Área desenhada com sucesso!', {
      description: `${area.toFixed(2)} ha • ${perimeter.toFixed(0)} m de perímetro`,
      duration: 3000,
    });

    // ✅ NOVO: Abrir modal de vínculo ao invés de salvar diretamente
    setPolygonToSave(newPolygon);
    setShowVinculoModal(true);
    setCurrentPoints([]);
    setTempPolygon(null);
    setShowInfo(true);
    onToolComplete();
  }, [hasSelfintersection, hasOverlapWithExisting, savedPolygons, onPolygonSave, onToolComplete]);

  // ✅ Atualizar ref quando completeShape mudar
  useEffect(() => {
    completeShapeRef.current = completeShape;
  }, [completeShape]);

  // Gerar pontos para retângulo ou círculo
  const generateShapePoints = (type: string, start: Point, end: Point): Point[] => {
    if (type === 'rectangle') {
      const topRight = pixelToLatLng(end.x, start.y);
      const bottomLeft = pixelToLatLng(start.x, end.y);
      
      const points = [
        start,
        { x: end.x, y: start.y, lat: topRight.lat, lng: topRight.lng },
        end,
        { x: start.x, y: end.y, lat: bottomLeft.lat, lng: bottomLeft.lng },
      ];
      
      console.log('generateShapePoints: Retângulo gerado com 4 pontos', points);
      return points;
    } else if (type === 'circle') {
      const centerX = (start.x + end.x) / 2;
      const centerY = (start.y + end.y) / 2;
      const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)) / 2;
      const points: Point[] = [];
      const segments = 32;

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const latLng = pixelToLatLng(x, y);
        points.push({ x, y, lat: latLng.lat, lng: latLng.lng });
      }
      
      console.log(`generateShapePoints: Círculo gerado com ${segments} pontos, raio = ${radius.toFixed(0)}px`);
      return points;
    }
    return [];
  };

  // Finalizar polígono (duplo clique)
  const handleCanvasDoubleClick = () => {
    if (activeTool === 'polygon' && currentPoints.length >= 3) {
      completeShape('polygon', currentPoints);
    } else if (activeTool === 'crop' && cropPolygon.length >= 3) {
      // Finalizar recorte
      completeCrop();
    }
  };

  // Completar recorte
  const completeCrop = () => {
    if (cropPolygon.length < 3 || !selectedPolygon) {
      alert('Desenhe uma área de recorte e selecione um polígono');
      setCropPolygon([]);
      setCropMode(false);
      onToolComplete();
      return;
    }

    // Encontrar o polígono selecionado (usar normalizado)
    const polygon = normalizedPolygons.find(p => p.id === selectedPolygon);
    if (!polygon) {
      alert('Selecione um polígono para recortar');
      setCropPolygon([]);
      setCropMode(false);
      onToolComplete();
      return;
    }

    // Implementação simplificada: manter apenas os pontos dentro da área de recorte
    const croppedPoints = polygon.points.filter(point => 
      isPointInPolygon(point, cropPolygon)
    );

    if (croppedPoints.length < 3) {
      alert('Recorte resultaria em área inválida');
      setCropPolygon([]);
      setCropMode(false);
      onToolComplete();
      return;
    }

    // Criar novo polígono recortado
    const area = calculateArea(croppedPoints);
    const perimeter = calculatePerimeter(croppedPoints);

    const newPolygon: Polygon = {
      id: `poly_${Date.now()}`,
      name: `${polygon.name} (recortado)`,
      points: croppedPoints,
      type: polygon.type,
      area,
      perimeter,
      color: polygon.color,
      createdAt: new Date().toISOString(),
    };

    onPolygonSave(newPolygon);
    setCropPolygon([]);
    setCropMode(false);
    setSelectedPolygon(null);
    onToolComplete();
  };

  // Verificar se ponto está dentro do polígono (algoritmo ray casting)
  const isPointInPolygon = (point: Point, polygon: Point[]): boolean => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      
      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // Cores aleatórias para polígonos
  const getRandomColor = () => {
    const colors = ['#0057FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Calcular área total
  const totalArea = savedPolygons.reduce((sum, p) => sum + p.area, 0);

  // Exportar para KML
  const exportToKML = () => {
    if (savedPolygons.length === 0) {
      alert('Nenhuma área para exportar');
      return;
    }

    let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>SoloForte - Áreas Exportadas</name>
    <description>Áreas desenhadas no SoloForte</description>
`;

    savedPolygons.forEach((polygon) => {
      const coords = polygon.points
        .map(p => `${p.lng},${p.lat},0`)
        .join(' ');

      kml += `
    <Placemark>
      <name>${polygon.name}</name>
      <description>Área: ${polygon.area.toFixed(2)} ha | Perímetro: ${polygon.perimeter.toFixed(0)} m</description>
      <Style>
        <LineStyle>
          <color>ff${polygon.color.slice(5, 7)}${polygon.color.slice(3, 5)}${polygon.color.slice(1, 3)}</color>
          <width>2</width>
        </LineStyle>
        <PolyStyle>
          <color>4d${polygon.color.slice(5, 7)}${polygon.color.slice(3, 5)}${polygon.color.slice(1, 3)}</color>
        </PolyStyle>
      </Style>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>${coords}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>`;
    });

    kml += `
  </Document>
</kml>`;

    // Criar download
    const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soloforte_areas_${new Date().toISOString().split('T')[0]}.kml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Atualizar nome do polígono
  const handleUpdatePolygonName = (polygonId: string, newName: string) => {
    const polygon = savedPolygons.find(p => p.id === polygonId);
    if (polygon) {
      const updated = { ...polygon, name: newName };
      onPolygonSave(updated);
    }
    setEditingName(null);
  };

  // ✅ NOVO: Funções para modo de edição pós-desenho
  const startEditingPolygon = (polygonId: string) => {
    const polygon = normalizedPolygons.find(p => p.id === polygonId);
    if (!polygon) return;
    
    setEditingPolygonId(polygonId);
    setEditingPoints([...polygon.points]); // Cópia dos pontos
    setOriginalPoints([...polygon.points]); // Salvar pontos originais para cancelamento
    setSelectedPolygon(null); // Desseleciona
    
    toast.info('Modo de edição ativado', {
      description: 'Arraste os handles brancos para ajustar os vértices',
      duration: 3000,
    });
  };

  const saveEditedPolygon = () => {
    if (!editingPolygonId) return;
    
    const polygon = savedPolygons.find(p => p.id === editingPolygonId);
    if (!polygon) return;

    // Recalcular área e perímetro
    const area = calculateArea(editingPoints);
    const perimeter = calculatePerimeter(editingPoints);

    const updatedPolygon: Polygon = {
      ...polygon,
      points: editingPoints,
      area,
      perimeter,
    };

    onPolygonSave(updatedPolygon);
    setEditingPolygonId(null);
    setEditingPoints([]);
    
    toast.success('Talhão atualizado!', {
      description: `Nova área: ${area.toFixed(2)} ha`,
      duration: 3000,
    });
  };

  const cancelEditingPolygon = () => {
    setEditingPolygonId(null);
    setEditingPoints([]);
    setDraggedVertexIndex(null);
    setIsDraggingVertex(false);
    
    toast.info('Edição cancelada');
  };

  // ✅ NOVO: Handlers de drag para editar vértices
  const handleEditMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editingPolygonId || editingPoints.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Verificar se clicou próximo a um vértice
    const nearbyIndex = findNearbyPoint(x, y, editingPoints, 20); // Threshold maior para edição
    
    if (nearbyIndex !== -1) {
      setDraggedVertexIndex(nearbyIndex);
      setIsDraggingVertex(true);
    }
  };

  const handleEditMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editingPolygonId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Mudar cursor se estiver sobre um vértice
    if (draggedVertexIndex === null) {
      const nearbyIndex = findNearbyPoint(x, y, editingPoints, 20);
      canvas.style.cursor = nearbyIndex !== -1 ? 'move' : 'default';
    }

    // Se estiver arrastando, atualizar a posição do ponto
    if (isDraggingVertex && draggedVertexIndex !== null) {
      const latLng = pixelToLatLng(x, y);
      const updatedPoints = [...editingPoints];
      updatedPoints[draggedVertexIndex] = {
        x,
        y,
        lat: latLng.lat,
        lng: latLng.lng,
      };
      setEditingPoints(updatedPoints);
      canvas.style.cursor = 'move';
    }
  };

  const handleEditMouseUp = () => {
    if (isDraggingVertex) {
      setDraggedVertexIndex(null);
      setIsDraggingVertex(false);
    }
  };

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        onMouseDown={editingPolygonId ? handleEditMouseDown : handleCanvasMouseDown}
        onMouseMove={editingPolygonId ? handleEditMouseMove : handleCanvasMouseMove}
        onMouseUp={editingPolygonId ? handleEditMouseUp : handleCanvasMouseUp}
        onDoubleClick={handleCanvasDoubleClick}
      />

      {/* Informações de medição e controles */}
      {activeTool && (currentPoints.length > 0 || cropPolygon.length > 0) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col gap-2 items-center">
          {/* ✅ NOVO: Área em tempo real */}
          {activeTool === 'polygon' && currentArea > 0 && (
            <div className={`backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 transition-colors ${
              currentArea > MAX_AREA_HA ? 'bg-red-500/95' : 
              currentArea > MAX_AREA_HA * 0.8 ? 'bg-yellow-500/95' : 
              'bg-green-500/95'
            }`}>
              <div className="flex items-center gap-2">
                <p className="text-white text-sm">
                  <strong>Área:</strong> {currentArea.toFixed(2)} ha
                </p>
                {currentArea > MAX_AREA_HA * 0.8 && (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertTriangle className="h-4 w-4 text-white animate-pulse" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          {currentArea > MAX_AREA_HA 
                            ? `Área excede o limite de ${MAX_AREA_HA} ha!`
                            : `Próximo do limite de ${MAX_AREA_HA} ha`}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-white text-xs mt-0.5">
                {(currentArea * 10000).toFixed(0)} m² • {(currentArea / 2.42).toFixed(3)} alq.
              </p>
            </div>
          )}

          {/* Instruções */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2">
            <p className="text-sm text-gray-700 text-center">
              {activeTool === 'polygon' && (
                <>
                  <span className="font-semibold">{currentPoints.length} pontos</span>
                  {currentPoints.length >= 3 ? (
                    <span className="text-green-600 ml-2">• Pronto para finalizar</span>
                  ) : (
                    <span className="text-gray-500 ml-2">• Mínimo 3 pontos</span>
                  )}
                </>
              )}
              {activeTool === 'freehand' && 'Desenhe livremente e solte para finalizar'}
              {activeTool === 'rectangle' && currentPoints.length === 0 && 'Clique para definir o primeiro canto'}
              {activeTool === 'rectangle' && currentPoints.length === 1 && 'Clique para definir o segundo canto'}
              {activeTool === 'circle' && currentPoints.length === 0 && 'Clique para definir o centro'}
              {activeTool === 'circle' && currentPoints.length === 1 && 'Clique para definir o raio'}
              {activeTool === 'crop' && `Pontos: ${cropPolygon.length} | Desenhe área de recorte`}
            </p>
          </div>

          {/* Dicas de correção */}
          {activeTool === 'polygon' && currentPoints.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-700 space-y-1">
              <div>💡 <strong>Clique</strong> em um ponto numerado para removê-lo</div>
              <div>⌨️ <strong>Backspace</strong> remove o último ponto</div>
              <div className="flex gap-2">
                <span>✅ <strong>Enter</strong> finaliza</span>
                <span>❌ <strong>Esc</strong> cancela</span>
              </div>
            </div>
          )}

          {/* Botões de ação */}
          {activeTool === 'polygon' && currentPoints.length >= 3 && (
            <div className="flex gap-2">
              <Button
                onClick={() => completeShape('polygon', currentPoints)}
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                Finalizar Desenho
              </Button>
              
              <Button
                onClick={() => {
                  setCurrentPoints([]);
                  toast.info('Desenho cancelado');
                }}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                size="sm"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          )}

          {activeTool === 'crop' && cropPolygon.length >= 3 && (
            <Button
              onClick={() => handleCanvasDoubleClick()}
              className="bg-[#0057FF] hover:bg-[#0046CC] text-white shadow-lg"
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              Finalizar Recorte
            </Button>
          )}
        </div>
      )}

      {/* ✅ NOVO: UI de Salvar/Cancelar quando estiver editando um polígono */}
      {editingPolygonId && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col gap-2 items-center">
          <div className="bg-blue-500/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2">
            <p className="text-white text-sm text-center">
              <strong>✏️ Editando Vértices</strong>
            </p>
            <p className="text-white text-xs text-center mt-0.5">
              Arraste os handles brancos para ajustar
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={saveEditedPolygon}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Edição
            </Button>
            
            <Button
              onClick={cancelEditingPolygon}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 bg-white/95"
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Lista de polígonos */}
      {savedPolygons.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-sm z-30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-800">Áreas Desenhadas ({savedPolygons.length})</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={exportToKML}
                className="text-[#0057FF] hover:text-[#0046CC] p-1"
                title="Exportar KML"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showInfo ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {showInfo && (
            <>
              <div className="space-y-2 max-h-64 overflow-y-auto mb-3">
                {savedPolygons.map((polygon) => (
                  <div
                    key={polygon.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPolygon === polygon.id
                        ? 'border-[#0057FF] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPolygon(polygon.id === selectedPolygon ? null : polygon.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className="h-3 w-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: polygon.color }}
                        />
                        {editingName === polygon.id ? (
                          <Input
                            autoFocus
                            defaultValue={polygon.name}
                            onBlur={(e) => handleUpdatePolygonName(polygon.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdatePolygonName(polygon.id, e.currentTarget.value);
                              } else if (e.key === 'Escape') {
                                setEditingName(null);
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-6 text-sm px-2"
                          />
                        ) : (
                          <span className="text-sm text-gray-700 flex-1">{polygon.name}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingName(polygon.id);
                          }}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          title="Renomear"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditingPolygon(polygon.id);
                          }}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="Editar Vértices"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Deseja realmente excluir "${polygon.name}"?`)) {
                              onPolygonDelete(polygon.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Excluir"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <p>📐 Área: <strong>{polygon.area.toFixed(2)} ha</strong></p>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="right" className="text-xs">
                              <div className="space-y-1">
                                <p><strong>Conversões de Área:</strong></p>
                                <p>• {formatAreaUnits(polygon.area).ha} hectares (ha)</p>
                                <p>• {formatAreaUnits(polygon.area).m2} metros² (m²)</p>
                                <p>• {formatAreaUnits(polygon.area).km2} quilômetros² (km²)</p>
                                <p>• {formatAreaUnits(polygon.area).alqPaulista} alqueires paulista</p>
                                <p>• {formatAreaUnits(polygon.area).alqMineiro} alqueires mineiro</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="ml-5 text-[10px] text-gray-500">
                        {(polygon.area * 10000).toFixed(0)} m² • {(polygon.area / 2.42).toFixed(3)} alq. paulista
                      </p>
                      <p>📏 Perímetro: <strong>{polygon.perimeter.toFixed(0)} m</strong> ({(polygon.perimeter / 1000).toFixed(2)} km)</p>
                      <p className="capitalize">🔷 Tipo: {polygon.type === 'freehand' ? 'Forma Livre' : polygon.type === 'circle' ? 'Pivô' : polygon.type === 'rectangle' ? 'Retângulo' : 'Polígono'}</p>
                    </div>
                    
                    {/* ✅ NOVO: Botão Analisar com IA */}
                    {onAnalyzeWithAI && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAnalyzeWithAI(polygon);
                          }}
                          size="sm"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all"
                        >
                          <Sparkles className="h-3.5 w-3.5 mr-2" />
                          Analisar área com IA
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-800">
                    <strong>Área Total:</strong>
                  </p>
                  <p className="text-sm text-[#0057FF]">
                    <strong>{totalArea.toFixed(2)} ha</strong>
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                  <p>{(totalArea * 10000).toFixed(0)} m² • {(totalArea / 100).toFixed(2)} km²</p>
                  <p>{(totalArea / 2.42).toFixed(3)} alqueires paulista • {(totalArea / 4.84).toFixed(3)} alq. mineiro</p>
                </div>

                {/* ✅ NOVO: Botão Limpar Todos */}
                {onClearAll && savedPolygons.length > 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Button
                      onClick={() => setShowClearConfirm(true)}
                      variant="outline"
                      size="sm"
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Limpar Todos os Desenhos
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ✅ NOVO: AlertDialog de confirmação para limpar todos */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ Limpar Todos os Desenhos?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Você está prestes a <strong className="text-red-600">excluir permanentemente</strong> todos os {savedPolygons.length} desenhos salvos.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                <p className="font-semibold mb-1">📊 Dados que serão perdidos:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>{savedPolygons.length} talhões/áreas</li>
                  <li>{totalArea.toFixed(2)} ha de área total mapeada</li>
                  <li>Todas as coordenadas e medições</li>
                  <li>Nomes e configurações dos desenhos</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                💡 <strong>Dica:</strong> Se quiser manter algum desenho, cancele esta ação e exclua apenas os desenhos indesejados individualmente.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (onClearAll) {
                  onClearAll();
                  setShowClearConfirm(false);
                  toast.success('Todos os desenhos foram removidos', {
                    description: `${savedPolygons.length} áreas excluídas`,
                    duration: 3000,
                  });
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, Limpar Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ NOVO: Modal de Vínculo de Talhão */}
      <TalhaoVinculoModal
        open={showVinculoModal}
        onOpenChange={setShowVinculoModal}
        polygon={polygonToSave}
      />
    </div>
  );
});

export default MapDrawing;