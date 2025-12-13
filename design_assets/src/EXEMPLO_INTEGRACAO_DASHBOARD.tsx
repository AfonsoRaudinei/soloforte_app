/**
 * 🌟 EXEMPLO DE INTEGRAÇÃO - DASHBOARD PREMIUM
 * 
 * Este arquivo demonstra como integrar todos os componentes
 * implementados (P0 + P2) em um Dashboard funcional.
 * 
 * Features Integradas:
 * ✅ P0 - Cache Offline (IndexedDB)
 * ✅ P0 - Persistência de Shapes
 * ✅ P0 - Middleware de Erros
 * ✅ P2 - NDVI Temporal Comparativo
 * ✅ P2 - IA + Clima Integrado
 * ✅ P2 - Clustering de Ícones
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Map as MapIcon, BarChart3, Brain, Settings } from 'lucide-react';

// P0 - Offline & Persistence
import { OfflineIndicator } from './components/OfflineIndicator';
import { MapShapesManager } from './components/MapShapesManager';
import { MapDrawingToolbar } from './components/MapDrawingToolbar';
import { useMapShapes } from './utils/hooks/useMapShapes';
import { useOfflineSync } from './utils/hooks/useOfflineSync';

// P2 - Diferencial Competitivo
import { NDVITemporalSlider } from './components/NDVITemporalSlider';
import { IAClimaPanel } from './components/IAClimaPanel';
import { MapClusterMarker, ClusterLegend, ClusterStats } from './components/MapClusterMarker';
import { useMapClustering, useClusteringStats } from './utils/hooks/useMapClustering';
import { useNDVIAnalysis } from './utils/hooks/useNDVIAnalysis';
import { useIAClimaAnalysis } from './utils/hooks/useIAClimaAnalysis';

export function DashboardPremiumIntegrado() {
  // Estado global
  const [activeTab, setActiveTab] = useState<'mapa' | 'analise' | 'ia'>('mapa');
  const [mapZoom, setMapZoom] = useState(10);
  const [selectedTalhao, setSelectedTalhao] = useState<string | null>(null);

  // Dados mockados de exemplo
  const clienteId = 'cliente-exemplo-001';
  const fazendaId = 'fazenda-esperanca-001';
  
  const fazendasMock = Array.from({ length: 150 }, (_, i) => ({
    id: `fazenda-${i}`,
    lat: -23.5 + (Math.random() - 0.5) * 2,
    lng: -46.6 + (Math.random() - 0.5) * 2,
    type: 'fazenda' as const,
    data: { nome: `Fazenda ${i + 1}` },
  }));

  // Hooks P0 - Offline & Persistence
  const { isOnline, pendingSync, cacheStats } = useOfflineSync();
  const { shapes, saveShape, deleteShape } = useMapShapes({
    clienteId,
    fazendaId,
  });

  // Hooks P2 - Análise NDVI
  const { 
    comparison, 
    alerts: ndviAlerts,
    getNDVIColor 
  } = useNDVIAnalysis({
    talhaoId: selectedTalhao || undefined,
    fazendaId,
  });

  // Hooks P2 - IA + Clima
  const {
    recommendations,
    riskScore,
    riskAnalysis,
  } = useIAClimaAnalysis({
    talhaoId: selectedTalhao || undefined,
    fazendaId,
    cultura: 'Soja',
  });

  // Hooks P2 - Clustering
  const { 
    clusters, 
    toggleCluster, 
    getClusterColor, 
    getClusterSize 
  } = useMapClustering({
    markers: fazendasMock,
    zoomLevel: mapZoom,
    clusterRadius: 60,
  });

  const clusteringStats = useClusteringStats(fazendasMock, clusters);

  // Tabs de navegação
  const tabs = [
    { id: 'mapa', label: 'Mapa & Shapes', icon: MapIcon },
    { id: 'analise', label: 'NDVI Temporal', icon: BarChart3 },
    { id: 'ia', label: 'IA + Clima', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Offline Indicator */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#0057FF]">SoloForte Premium</h1>
            <p className="text-sm text-gray-600">
              Dashboard Integrado v521 - Exemplo Completo
            </p>
          </div>
          
          {/* ✅ P0: Offline Indicator */}
          <OfflineIndicator />
        </div>

        {/* Navegação por Tabs */}
        <div className="flex gap-2 mt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="p-6 max-w-7xl mx-auto">
        
        {/* TAB 1: Mapa & Shapes */}
        {activeTab === 'mapa' && (
          <div className="space-y-6">
            {/* Banner de Status */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900 mb-2">🗺️ Mapa com Clustering Inteligente</h2>
                  <p className="text-sm text-gray-600">
                    {clusters.length} clusters ativos • {fazendasMock.length} fazendas • Zoom {mapZoom}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Cache:</span>
                    <span className="text-[#0057FF] ml-2">{cacheStats.talhoes} talhões</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Shapes:</span>
                    <span className="text-green-600 ml-2">{shapes.length} salvos</span>
                  </div>
                  {pendingSync > 0 && (
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                      {pendingSync} pendentes
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Container do Mapa (Mockado) */}
            <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] overflow-hidden">
              {/* ✅ P2: Cluster Legend */}
              <ClusterLegend />

              {/* ✅ P2: Cluster Stats (debug) */}
              <ClusterStats stats={clusteringStats} />

              {/* Mapa simulado com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                  <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">
                    Integre com Leaflet ou Google Maps aqui
                  </p>
                  <p className="text-sm text-gray-400">
                    Use os componentes MapClusterMarker para renderizar os clusters
                  </p>
                  
                  {/* Exemplo de clusters visíveis */}
                  <div className="mt-6 flex gap-4 justify-center">
                    {clusters.slice(0, 3).map((cluster, i) => (
                      <div
                        key={cluster.id}
                        className="relative"
                        style={{
                          transform: `translateX(${i * 80}px) translateY(${Math.sin(i) * 40}px)`,
                        }}
                      >
                        <MapClusterMarker
                          cluster={cluster}
                          color={getClusterColor(cluster)}
                          size={getClusterSize(cluster.count)}
                          onClick={() => toggleCluster(cluster.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ✅ P0: Map Shapes Manager */}
              <MapShapesManager
                clienteId={clienteId}
                fazendaId={fazendaId}
                onShapeSelect={(shape) => setSelectedTalhao(shape.id)}
              />

              {/* ✅ P0: Drawing Toolbar */}
              <MapDrawingToolbar
                clienteId={clienteId}
                fazendaId={fazendaId}
              />
            </div>

            {/* Zoom Control (Mock) */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Zoom:</span>
              <input
                type="range"
                min="1"
                max="18"
                value={mapZoom}
                onChange={(e) => setMapZoom(Number(e.target.value))}
                className="flex-1 max-w-xs"
              />
              <span className="text-sm text-gray-700">{mapZoom}</span>
            </div>
          </div>
        )}

        {/* TAB 2: NDVI Temporal */}
        {activeTab === 'analise' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
              <h2 className="text-gray-900 mb-2">📊 Análise NDVI Temporal Comparativa</h2>
              <p className="text-sm text-gray-600">
                Compare a evolução da saúde da vegetação em diferentes períodos
              </p>
            </div>

            {/* ✅ P2: NDVI Temporal Slider */}
            <NDVITemporalSlider
              talhaoId={selectedTalhao || undefined}
              fazendaId={fazendaId}
              onAlertClick={(alert) => {
                console.log('Alerta clicado:', alert);
                alert('Alerta: ' + alert.titulo);
              }}
            />

            {/* Resumo de Alertas */}
            {ndviAlerts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">⚠️ Resumo de Alertas NDVI</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ndviAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-xl border-2 ${
                        alert.severidade === 'critica'
                          ? 'bg-red-50 border-red-300'
                          : alert.severidade === 'atencao'
                          ? 'bg-orange-50 border-orange-300'
                          : 'bg-blue-50 border-blue-300'
                      }`}
                    >
                      <div className="text-sm text-gray-900 mb-1">{alert.titulo}</div>
                      <div className="text-xs text-gray-600">{alert.descricao}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IA + Clima */}
        {activeTab === 'ia' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
              <h2 className="text-gray-900 mb-2">🤖 Inteligência Artificial + Clima</h2>
              <p className="text-sm text-gray-600">
                Recomendações preditivas baseadas em NDVI × Meteorologia × Histórico
              </p>
              {riskScore > 0 && (
                <div className="mt-3">
                  <span className="text-sm text-gray-600">Score de Risco Geral: </span>
                  <span className={`text-2xl ${
                    riskScore < 30 ? 'text-green-600' :
                    riskScore < 60 ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {riskScore}/100
                  </span>
                </div>
              )}
            </div>

            {/* ✅ P2: IA + Clima Panel */}
            <IAClimaPanel
              talhaoId={selectedTalhao || undefined}
              fazendaId={fazendaId}
              cultura="Soja"
            />

            {/* Grid de Recomendações */}
            {recommendations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">
                  🎯 Todas as Recomendações ({recommendations.length})
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-900">{rec.titulo}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rec.prioridade === 'critica' ? 'bg-red-100 text-red-700' :
                          rec.prioridade === 'alta' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {rec.prioridade}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{rec.descricao}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        Confiança: {rec.confianca}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer com Informações de Desenvolvimento */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-4">📚 Guia de Integração</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong>P0 - Fundação:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• Cache Offline com IndexedDB ({cacheStats.clientes} clientes, {cacheStats.fazendas} fazendas)</li>
                <li>• Persistência de Shapes ({shapes.length} talhões salvos)</li>
                <li>• Middleware de Erros (useSupabaseSafeQuery + retry automático)</li>
              </ul>
            </div>
            <div>
              <strong>P2 - Diferencial Competitivo:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• NDVI Temporal (3 períodos: 15, 30, 60 dias)</li>
                <li>• IA + Clima ({recommendations.length} recomendações ativas)</li>
                <li>• Clustering ({clusters.length} clusters para {fazendasMock.length} fazendas)</li>
              </ul>
            </div>
            <div>
              <strong>Status de Conexão:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li className={isOnline ? 'text-green-600' : 'text-orange-600'}>
                  • {isOnline ? '🟢 Online' : '🟠 Offline'} 
                  {pendingSync > 0 && ` (${pendingSync} operações pendentes)`}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            💡 <strong>Dica:</strong> Este é um exemplo completo de integração. 
            Adapte os hooks e componentes conforme necessário para seu caso de uso.
            Todos os componentes são modulares e podem ser usados independentemente.
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPremiumIntegrado;
