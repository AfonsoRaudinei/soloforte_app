import { useState, useCallback, useMemo, useEffect } from 'react';

/**
 * 🗺️ Sistema de Clustering de Ícones para Mapa
 * 
 * Agrupa marcadores próximos para otimizar visualização:
 * - Algoritmo baseado em grid-based clustering
 * - Ajuste dinâmico por nível de zoom
 * - Contadores visuais por cluster
 * - Expansão suave ao clicar
 * 
 * Benefits:
 * - Performance: 1000+ marcadores sem lag
 * - UX: Mapa limpo e organizado
 * - Interatividade: Click to expand
 * 
 * Usage:
 * ```tsx
 * const { clusters, expandCluster } = useMapClustering({
 *   markers: fazendas,
 *   zoomLevel: 10,
 *   clusterRadius: 50
 * });
 * ```
 */

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type?: 'cliente' | 'fazenda' | 'talhao' | 'ocorrencia';
  data?: any;
}

export interface MapCluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  markers: MapMarker[];
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

interface UseMapClusteringOptions {
  markers: MapMarker[];
  zoomLevel: number;
  clusterRadius?: number; // pixels
  minZoomForClustering?: number;
  maxZoomForClustering?: number;
}

/**
 * Hook principal de clustering
 */
export function useMapClustering(options: UseMapClusteringOptions) {
  const {
    markers = [],
    zoomLevel,
    clusterRadius = 60,
    minZoomForClustering = 1,
    maxZoomForClustering = 14,
  } = options;

  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());

  /**
   * Determina se deve aplicar clustering no zoom atual
   */
  const shouldCluster = useMemo(() => {
    return zoomLevel >= minZoomForClustering && zoomLevel <= maxZoomForClustering;
  }, [zoomLevel, minZoomForClustering, maxZoomForClustering]);

  /**
   * Calcula distância euclidiana entre dois pontos (aproximação)
   */
  const getDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const latDiff = lat2 - lat1;
    const lngDiff = lng2 - lng1;
    
    // Aproximação rápida (suficiente para clustering visual)
    // 1 grau ≈ 111 km
    const latDist = latDiff * 111;
    const lngDist = lngDiff * 111 * Math.cos(lat1 * Math.PI / 180);
    
    return Math.sqrt(latDist * latDist + lngDist * lngDist);
  }, []);

  /**
   * Converte raio de pixels para graus (aproximação baseada em zoom)
   */
  const pixelsToDegreesRadius = useCallback((pixels: number, zoom: number): number => {
    // Fórmula aproximada: 156543.03392 * Math.cos(latitude) / Math.pow(2, zoom) = meters per pixel
    // Simplificação: radius em graus ≈ pixels / (2^zoom * scale_factor)
    const baseScale = 256; // Tamanho do tile em pixels
    const metersPerPixel = 156543.03392 / Math.pow(2, zoom);
    const radiusMeters = pixels * metersPerPixel;
    const radiusDegrees = radiusMeters / 111000; // 111km por grau
    
    return radiusDegrees;
  }, []);

  /**
   * Algoritmo de clustering grid-based (mais rápido que k-means)
   */
  const clusterMarkers = useCallback((markers: MapMarker[]): MapCluster[] => {
    if (!shouldCluster || markers.length === 0) {
      // Sem clustering - retornar marcadores individuais
      return markers.map(marker => ({
        id: `single-${marker.id}`,
        lat: marker.lat,
        lng: marker.lng,
        count: 1,
        markers: [marker],
        bounds: {
          north: marker.lat,
          south: marker.lat,
          east: marker.lng,
          west: marker.lng,
        },
      }));
    }

    const radiusDegrees = pixelsToDegreesRadius(clusterRadius, zoomLevel);
    const clusters: MapCluster[] = [];
    const processed = new Set<string>();

    // Grid-based clustering
    markers.forEach(marker => {
      if (processed.has(marker.id)) return;

      // Encontrar todos os marcadores próximos
      const nearbyMarkers: MapMarker[] = [marker];
      processed.add(marker.id);

      markers.forEach(other => {
        if (processed.has(other.id)) return;

        const distance = getDistance(marker.lat, marker.lng, other.lat, other.lng);
        
        if (distance <= radiusDegrees * 111) { // Converter para km
          nearbyMarkers.push(other);
          processed.add(other.id);
        }
      });

      // Calcular centroide do cluster
      const sumLat = nearbyMarkers.reduce((sum, m) => sum + m.lat, 0);
      const sumLng = nearbyMarkers.reduce((sum, m) => sum + m.lng, 0);
      const centerLat = sumLat / nearbyMarkers.length;
      const centerLng = sumLng / nearbyMarkers.length;

      // Calcular bounds
      const lats = nearbyMarkers.map(m => m.lat);
      const lngs = nearbyMarkers.map(m => m.lng);

      clusters.push({
        id: `cluster-${centerLat}-${centerLng}`,
        lat: centerLat,
        lng: centerLng,
        count: nearbyMarkers.length,
        markers: nearbyMarkers,
        bounds: {
          north: Math.max(...lats),
          south: Math.min(...lats),
          east: Math.max(...lngs),
          west: Math.min(...lngs),
        },
      });
    });

    return clusters;
  }, [shouldCluster, zoomLevel, clusterRadius, getDistance, pixelsToDegreesRadius]);

  /**
   * Computa clusters
   */
  const clusters = useMemo(() => {
    return clusterMarkers(markers);
  }, [markers, clusterMarkers]);

  /**
   * Filtra clusters expandidos
   */
  const visibleClusters = useMemo(() => {
    return clusters.map(cluster => {
      if (cluster.count === 1 || expandedClusters.has(cluster.id)) {
        // Mostrar marcadores individuais
        return {
          ...cluster,
          expanded: true,
        };
      }
      return {
        ...cluster,
        expanded: false,
      };
    });
  }, [clusters, expandedClusters]);

  /**
   * Expande/colapsa um cluster
   */
  const toggleCluster = useCallback((clusterId: string) => {
    setExpandedClusters(prev => {
      const next = new Set(prev);
      if (next.has(clusterId)) {
        next.delete(clusterId);
      } else {
        next.add(clusterId);
      }
      return next;
    });
  }, []);

  /**
   * Limpa clusters expandidos (útil ao mudar zoom)
   */
  const resetExpanded = useCallback(() => {
    setExpandedClusters(new Set());
  }, []);

  /**
   * Auto-reset ao mudar zoom significativamente
   */
  useEffect(() => {
    resetExpanded();
  }, [Math.floor(zoomLevel / 2), resetExpanded]);

  /**
   * Obtém cor do cluster baseada no tipo predominante
   */
  const getClusterColor = useCallback((cluster: MapCluster): string => {
    const types = cluster.markers.map(m => m.type || 'default');
    const typeCounts = types.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const predominantType = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    const colorMap: Record<string, string> = {
      cliente: '#0057FF',
      fazenda: '#10B981',
      talhao: '#F59E0B',
      ocorrencia: '#EF4444',
      default: '#6B7280',
    };

    return colorMap[predominantType] || colorMap.default;
  }, []);

  /**
   * Retorna tamanho do cluster baseado na quantidade
   */
  const getClusterSize = useCallback((count: number): number => {
    if (count < 10) return 40;
    if (count < 50) return 50;
    if (count < 100) return 60;
    return 70;
  }, []);

  return {
    clusters: visibleClusters,
    totalMarkers: markers.length,
    totalClusters: clusters.length,
    shouldCluster,
    toggleCluster,
    resetExpanded,
    getClusterColor,
    getClusterSize,
  };
}

/**
 * 🎨 Hook para animar transições de clusters
 */
export function useClusterAnimations() {
  const [animatingClusters, setAnimatingClusters] = useState<Set<string>>(new Set());

  const animateCluster = useCallback((clusterId: string, duration: number = 300) => {
    setAnimatingClusters(prev => new Set(prev).add(clusterId));
    
    setTimeout(() => {
      setAnimatingClusters(prev => {
        const next = new Set(prev);
        next.delete(clusterId);
        return next;
      });
    }, duration);
  }, []);

  const isAnimating = useCallback((clusterId: string) => {
    return animatingClusters.has(clusterId);
  }, [animatingClusters]);

  return {
    animateCluster,
    isAnimating,
  };
}

/**
 * 📊 Hook para estatísticas de clustering
 */
export function useClusteringStats(markers: MapMarker[], clusters: MapCluster[]) {
  return useMemo(() => {
    const totalMarkers = markers.length;
    const totalClusters = clusters.length;
    const avgMarkersPerCluster = totalClusters > 0 
      ? totalMarkers / totalClusters 
      : 0;
    
    const largestCluster = clusters.reduce((max, cluster) => 
      cluster.count > max.count ? cluster : max
    , { count: 0 } as MapCluster);

    const reductionPercent = totalMarkers > 0
      ? ((totalMarkers - totalClusters) / totalMarkers * 100)
      : 0;

    return {
      totalMarkers,
      totalClusters,
      avgMarkersPerCluster: avgMarkersPerCluster.toFixed(1),
      largestClusterSize: largestCluster.count,
      reductionPercent: reductionPercent.toFixed(1),
    };
  }, [markers, clusters]);
}
