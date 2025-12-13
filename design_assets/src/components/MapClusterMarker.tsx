import { motion } from 'motion/react';
import { MapPin, Users } from 'lucide-react';

/**
 * 🗺️ Marcador de Cluster para Mapa
 * 
 * Componente visual para exibir clusters de marcadores:
 * - Círculo escalável com contador
 * - Cores baseadas no tipo predominante
 * - Animação de pulso ao clicar
 * - Expansão suave dos marcadores individuais
 * 
 * Usage:
 * ```tsx
 * <MapClusterMarker 
 *   cluster={cluster}
 *   onClick={() => toggleCluster(cluster.id)}
 *   isExpanded={false}
 * />
 * ```
 */

interface MapClusterMarkerProps {
  cluster: {
    id: string;
    lat: number;
    lng: number;
    count: number;
    markers: any[];
  };
  color?: string;
  size?: number;
  onClick?: () => void;
  isExpanded?: boolean;
}

export function MapClusterMarker({
  cluster,
  color = '#0057FF',
  size = 50,
  onClick,
  isExpanded = false,
}: MapClusterMarkerProps) {
  if (cluster.count === 1) {
    // Marcador individual
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative group"
        style={{
          width: 32,
          height: 32,
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all"
          style={{ backgroundColor: color }}
        >
          <MapPin className="w-4 h-4 text-white" />
        </div>
        
        {/* Pulso de hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"
          style={{
            backgroundColor: color,
            opacity: 0.2,
          }}
        />
      </motion.button>
    );
  }

  // Cluster com múltiplos marcadores
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Círculo externo (borda) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: color,
          opacity: 0.2,
        }}
        animate={isExpanded ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />

      {/* Círculo principal */}
      <div
        className="absolute inset-0 rounded-full flex flex-col items-center justify-center shadow-xl border-3 border-white"
        style={{
          backgroundColor: color,
        }}
      >
        {/* Ícone */}
        <Users className="w-5 h-5 text-white mb-0.5" />
        
        {/* Contador */}
        <div className="text-sm text-white">
          {cluster.count > 999 ? '999+' : cluster.count}
        </div>
      </div>

      {/* Pulso animado ao hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          backgroundColor: color,
        }}
        initial={{ scale: 1, opacity: 0 }}
        whileHover={{ scale: 1.4, opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Badge de tipo (se predominante) */}
      {cluster.markers[0]?.type && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center text-xs shadow-md" style={{ borderColor: color }}>
          {cluster.markers[0].type === 'cliente' && '👤'}
          {cluster.markers[0].type === 'fazenda' && '🏡'}
          {cluster.markers[0].type === 'talhao' && '🌾'}
          {cluster.markers[0].type === 'ocorrencia' && '⚠️'}
        </div>
      )}
    </motion.button>
  );
}

/**
 * 🎨 Cluster Spider (expansão em círculo)
 */
interface ClusterSpiderProps {
  cluster: {
    id: string;
    lat: number;
    lng: number;
    markers: any[];
  };
  onMarkerClick?: (marker: any) => void;
  color?: string;
}

export function ClusterSpider({ cluster, onMarkerClick, color = '#0057FF' }: ClusterSpiderProps) {
  const count = cluster.markers.length;
  const radius = 80; // pixels

  return (
    <div className="relative" style={{ width: 200, height: 200 }}>
      {/* Marcadores expandidos em círculo */}
      {cluster.markers.map((marker, index) => {
        const angle = (360 / count) * index;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.button
            key={marker.id}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ scale: 1, x, y }}
            exit={{ scale: 0, x: 0, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: index * 0.03,
            }}
            onClick={() => onMarkerClick?.(marker)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg border-2 border-white flex items-center justify-center hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
          >
            <MapPin className="w-4 h-4 text-white" />
          </motion.button>
        );
      })}

      {/* Centro do spider */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="text-white text-sm">{count}</span>
      </div>
    </div>
  );
}

/**
 * 📊 Legenda de Clusters
 */
export function ClusterLegend() {
  const legend = [
    { type: 'cliente', color: '#0057FF', label: 'Produtores', icon: '👤' },
    { type: 'fazenda', color: '#10B981', label: 'Fazendas', icon: '🏡' },
    { type: 'talhao', color: '#F59E0B', label: 'Talhões', icon: '🌾' },
    { type: 'ocorrencia', color: '#EF4444', label: 'Ocorrências', icon: '⚠️' },
  ];

  return (
    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-3 z-10">
      <div className="text-xs text-gray-600 mb-2">Clusters no Mapa</div>
      <div className="space-y-2">
        {legend.map(item => (
          <div key={item.type} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <span className="text-xs text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500">
        💡 Clique em um cluster para expandir
      </div>
    </div>
  );
}

/**
 * 📈 Estatísticas de Clustering (Debug/Admin)
 */
interface ClusterStatsProps {
  stats: {
    totalMarkers: number;
    totalClusters: number;
    avgMarkersPerCluster: string;
    largestClusterSize: number;
    reductionPercent: string;
  };
}

export function ClusterStats({ stats }: ClusterStatsProps) {
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-3 z-10 text-xs">
      <div className="text-gray-700 mb-2">📊 Clustering Stats</div>
      <div className="space-y-1 text-gray-600">
        <div>Marcadores: {stats.totalMarkers}</div>
        <div>Clusters: {stats.totalClusters}</div>
        <div>Média/cluster: {stats.avgMarkersPerCluster}</div>
        <div>Maior cluster: {stats.largestClusterSize}</div>
        <div className="text-green-600">
          Redução: {stats.reductionPercent}%
        </div>
      </div>
    </div>
  );
}
