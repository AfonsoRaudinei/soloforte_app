import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, TrendingDown, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { useNDVIAnalysis } from '../utils/hooks/useNDVIAnalysis';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

/**
 * 📊 NDVI Temporal Comparativo - Slider Interativo
 * 
 * Componente de análise temporal NDVI com:
 * - Slider de períodos (15, 30, 60 dias)
 * - Comparação side-by-side
 * - Gráfico de evolução
 * - Alertas inteligentes
 * - Classificação de vegetação
 * - Variação percentual com cores
 * 
 * Features:
 * - Animações suaves entre períodos
 * - Gradiente de cores NDVI (marrom → verde)
 * - Alertas automáticos de queda crítica
 * - Recomendações agronômicas
 * 
 * Usage:
 * ```tsx
 * <NDVITemporalSlider 
 *   talhaoId="xxx"
 *   fazendaId="yyy"
 *   onAlertClick={(alert) => showDetails(alert)}
 * />
 * ```
 */

interface NDVITemporalSliderProps {
  talhaoId?: string;
  fazendaId?: string;
  onAlertClick?: (alert: any) => void;
}

export function NDVITemporalSlider({
  talhaoId,
  fazendaId,
  onAlertClick,
}: NDVITemporalSliderProps) {
  const {
    comparison,
    alerts,
    selectedPeriod,
    setSelectedPeriod,
    loading,
    getNDVIColor,
    getNDVIClassification,
    getChartData,
  } = useNDVIAnalysis({ talhaoId, fazendaId });

  const [showChart, setShowChart] = useState(false);

  const periods = [
    { value: 15, label: '15 dias' },
    { value: 30, label: '30 dias' },
    { value: 60, label: '60 dias' },
  ];

  const currentComparison = comparison[selectedPeriod];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-[#0057FF]/30 border-t-[#0057FF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900">Análise NDVI Temporal</h3>
              <p className="text-sm text-gray-600">Comparação de saúde da vegetação</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowChart(!showChart)}
            className="px-4 py-2 bg-white/80 hover:bg-white rounded-lg text-sm transition-colors border border-gray-200"
          >
            {showChart ? '📊 Ocultar gráfico' : '📈 Ver evolução'}
          </button>
        </div>
      </div>

      {/* Slider de Períodos */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`flex-1 px-4 py-3 rounded-xl transition-all ${
                selectedPeriod === period.value
                  ? 'bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="text-xs opacity-80">Comparar</div>
              <div className="font-medium">{period.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparação Side-by-Side */}
      {currentComparison && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPeriod}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-6"
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Período Anterior */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-500 mb-2">
                  {currentComparison.anterior 
                    ? new Date(currentComparison.anterior.data).toLocaleDateString('pt-BR')
                    : 'Sem dados'}
                </div>
                
                {currentComparison.anterior ? (
                  <>
                    <div className="flex items-end gap-2 mb-2">
                      <div className="text-3xl text-gray-900">
                        {currentComparison.anterior.ndvi_medio.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">NDVI</div>
                    </div>
                    
                    <div
                      className="h-2 rounded-full mb-2"
                      style={{
                        background: `linear-gradient(90deg, #8B4513 0%, ${getNDVIColor(currentComparison.anterior.ndvi_medio)} 100%)`,
                      }}
                    />
                    
                    <div className="text-xs text-gray-600">
                      {getNDVIClassification(currentComparison.anterior.ndvi_medio)}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 text-sm">Dados indisponíveis</div>
                )}
              </div>

              {/* Período Atual */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-200">
                <div className="text-xs text-gray-600 mb-2">Atual (Hoje)</div>
                
                {currentComparison.atual ? (
                  <>
                    <div className="flex items-end gap-2 mb-2">
                      <div className="text-3xl text-gray-900">
                        {currentComparison.atual.ndvi_medio.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">NDVI</div>
                    </div>
                    
                    <div
                      className="h-2 rounded-full mb-2"
                      style={{
                        background: `linear-gradient(90deg, #8B4513 0%, ${getNDVIColor(currentComparison.atual.ndvi_medio)} 100%)`,
                      }}
                    />
                    
                    <div className="text-xs text-gray-700">
                      {getNDVIClassification(currentComparison.atual.ndvi_medio)}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 text-sm">Dados indisponíveis</div>
                )}
              </div>
            </div>

            {/* Variação */}
            {currentComparison.anterior && currentComparison.atual && (
              <div className={`p-4 rounded-xl border-2 ${
                currentComparison.severidade === 'critica' 
                  ? 'bg-red-50 border-red-300'
                  : currentComparison.severidade === 'atencao'
                  ? 'bg-orange-50 border-orange-300'
                  : currentComparison.severidade === 'positiva'
                  ? 'bg-green-50 border-green-300'
                  : 'bg-blue-50 border-blue-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {currentComparison.tendencia === 'crescimento' ? (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    ) : currentComparison.tendencia === 'queda' ? (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    ) : (
                      <Info className="w-6 h-6 text-blue-600" />
                    )}
                    
                    <div>
                      <div className="text-sm text-gray-600">Variação em {selectedPeriod} dias</div>
                      <div className={`text-2xl ${
                        currentComparison.variacao_percentual > 0 
                          ? 'text-green-700' 
                          : currentComparison.variacao_percentual < 0 
                          ? 'text-red-700' 
                          : 'text-gray-700'
                      }`}>
                        {currentComparison.variacao_percentual > 0 ? '+' : ''}
                        {currentComparison.variacao_percentual.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Variação absoluta</div>
                    <div className="text-lg text-gray-700">
                      {currentComparison.variacao_absoluta > 0 ? '+' : ''}
                      {currentComparison.variacao_absoluta.toFixed(3)}
                    </div>
                  </div>
                </div>

                {/* Badge de tendência */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                    currentComparison.severidade === 'critica'
                      ? 'bg-red-100 text-red-700'
                      : currentComparison.severidade === 'atencao'
                      ? 'bg-orange-100 text-orange-700'
                      : currentComparison.severidade === 'positiva'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {currentComparison.severidade === 'critica' && '⚠️ Atenção crítica'}
                    {currentComparison.severidade === 'atencao' && '⚠️ Requer atenção'}
                    {currentComparison.severidade === 'positiva' && '✅ Crescimento saudável'}
                    {currentComparison.severidade === 'normal' && 'ℹ️ Variação normal'}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Gráfico de Evolução */}
      <AnimatePresence>
        {showChart && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-700 mb-4">Evolução NDVI - Últimos 30 dias</div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={getChartData()}>
                  <defs>
                    <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="data" 
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                    stroke="#D1D5DB"
                  />
                  <YAxis 
                    domain={[0, 1]}
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                    stroke="#D1D5DB"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ndvi" 
                    stroke="#22C55E" 
                    strokeWidth={2}
                    fill="url(#ndviGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alertas */}
      {alerts.length > 0 && (
        <div className="px-6 pb-6">
          <div className="text-sm text-gray-700 mb-3">⚠️ Alertas Detectados ({alerts.length})</div>
          <div className="space-y-2">
            {alerts.slice(0, 3).map((alert) => (
              <button
                key={alert.id}
                onClick={() => onAlertClick?.(alert)}
                className={`w-full p-3 rounded-xl text-left transition-all hover:scale-[1.02] ${
                  alert.severidade === 'critica'
                    ? 'bg-red-50 border border-red-200 hover:bg-red-100'
                    : alert.severidade === 'atencao'
                    ? 'bg-orange-50 border border-orange-200 hover:bg-orange-100'
                    : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                    alert.severidade === 'critica' ? 'text-red-600' :
                    alert.severidade === 'atencao' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 mb-1">{alert.titulo}</div>
                    <div className="text-xs text-gray-600">{alert.descricao}</div>
                    {alert.recomendacao && (
                      <div className="text-xs text-gray-500 mt-1">
                        💡 {alert.recomendacao}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
