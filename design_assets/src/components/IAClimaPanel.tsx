import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, CloudRain, Thermometer, Wind, Droplets, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useIAClimaAnalysis, IARecommendation } from '../utils/hooks/useIAClimaAnalysis';

/**
 * 🤖 Painel IA + Clima Integrado
 * 
 * Interface de análise preditiva que exibe:
 * - Score de risco geral (0-100)
 * - Análise de riscos individuais
 * - Recomendações priorizadas
 * - Dados meteorológicos atuais
 * - Janelas ideais de operação
 * 
 * Features:
 * - Cards de risco com cores semafóricas
 * - Recomendações expandíveis
 * - Ações sugeridas com checkboxes
 * - Atualização em tempo real
 * 
 * Usage:
 * ```tsx
 * <IAClimaPanel 
 *   talhaoId="xxx"
 *   fazendaId="yyy"
 *   cultura="Soja"
 * />
 * ```
 */

interface IACli maPanelProps {
  talhaoId?: string;
  fazendaId?: string;
  cultura?: string;
}

export function IAClimaPanel({ talhaoId, fazendaId, cultura }: IAClimaPanelProps) {
  const {
    climateData,
    recommendations,
    riskAnalysis,
    riskScore,
    loading,
    runAnalysis,
  } = useIAClimaAnalysis({ talhaoId, fazendaId, cultura });

  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  const hoje = climateData[0];

  if (loading && !riskAnalysis) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-[#0057FF]/30 border-t-[#0057FF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header - Score de Risco Geral */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Análise Preditiva IA</h3>
                <p className="text-sm text-gray-600">Cruzamento NDVI × Clima × Histórico</p>
              </div>
            </div>
            
            <button
              onClick={() => runAnalysis()}
              className="px-4 py-2 bg-white/80 hover:bg-white rounded-lg text-sm transition-colors border border-gray-200 flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Atualizar
            </button>
          </div>
        </div>

        {/* Score Visual */}
        <div className="px-6 pb-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
            <div className="text-sm text-gray-600 mb-2">Score de Risco Geral</div>
            <div className="flex items-end gap-4">
              <div className={`text-5xl ${
                riskScore < 30 ? 'text-green-600' :
                riskScore < 60 ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {riskScore}
              </div>
              <div className="flex-1 mb-3">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${riskScore}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${
                      riskScore < 30 ? 'bg-green-500' :
                      riskScore < 60 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Baixo</span>
                  <span>Médio</span>
                  <span>Alto</span>
                </div>
              </div>
            </div>
            
            <div className={`mt-3 text-sm ${
              riskScore < 30 ? 'text-green-700' :
              riskScore < 60 ? 'text-orange-700' :
              'text-red-700'
            }`}>
              {riskScore < 30 && '✅ Condições favoráveis. Manter monitoramento rotineiro.'}
              {riskScore >= 30 && riskScore < 60 && '⚠️ Atenção moderada. Algumas ações preventivas recomendadas.'}
              {riskScore >= 60 && '🚨 Atenção crítica. Ações imediatas necessárias.'}
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Análise Individual */}
      {riskAnalysis && (
        <div className="grid grid-cols-2 gap-3">
          {/* Estresse Hídrico */}
          <div className={`p-4 rounded-xl border-2 ${
            riskAnalysis.estresse_hidrico > 70 ? 'bg-red-50 border-red-300' :
            riskAnalysis.estresse_hidrico > 40 ? 'bg-orange-50 border-orange-300' :
            'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Droplets className={`w-4 h-4 ${
                riskAnalysis.estresse_hidrico > 70 ? 'text-red-600' :
                riskAnalysis.estresse_hidrico > 40 ? 'text-orange-600' :
                'text-green-600'
              }`} />
              <span className="text-xs text-gray-600">Estresse Hídrico</span>
            </div>
            <div className="text-2xl text-gray-900 mb-1">
              {riskAnalysis.estresse_hidrico}%
            </div>
            <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  riskAnalysis.estresse_hidrico > 70 ? 'bg-red-500' :
                  riskAnalysis.estresse_hidrico > 40 ? 'bg-orange-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${riskAnalysis.estresse_hidrico}%` }}
              />
            </div>
          </div>

          {/* Risco de Geada */}
          <div className={`p-4 rounded-xl border-2 ${
            riskAnalysis.risco_geada > 70 ? 'bg-red-50 border-red-300' :
            riskAnalysis.risco_geada > 40 ? 'bg-orange-50 border-orange-300' :
            'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className={`w-4 h-4 ${
                riskAnalysis.risco_geada > 70 ? 'text-red-600' :
                riskAnalysis.risco_geada > 40 ? 'text-orange-600' :
                'text-green-600'
              }`} />
              <span className="text-xs text-gray-600">Risco de Geada</span>
            </div>
            <div className="text-2xl text-gray-900 mb-1">
              {riskAnalysis.risco_geada}%
            </div>
            <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  riskAnalysis.risco_geada > 70 ? 'bg-red-500' :
                  riskAnalysis.risco_geada > 40 ? 'bg-orange-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${riskAnalysis.risco_geada}%` }}
              />
            </div>
          </div>

          {/* Risco de Pragas */}
          <div className={`p-4 rounded-xl border-2 ${
            riskAnalysis.risco_pragas > 70 ? 'bg-red-50 border-red-300' :
            riskAnalysis.risco_pragas > 40 ? 'bg-orange-50 border-orange-300' :
            'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-4 h-4 ${
                riskAnalysis.risco_pragas > 70 ? 'text-red-600' :
                riskAnalysis.risco_pragas > 40 ? 'text-orange-600' :
                'text-green-600'
              }`} />
              <span className="text-xs text-gray-600">Risco de Pragas</span>
            </div>
            <div className="text-2xl text-gray-900 mb-1">
              {riskAnalysis.risco_pragas}%
            </div>
            <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  riskAnalysis.risco_pragas > 70 ? 'bg-red-500' :
                  riskAnalysis.risco_pragas > 40 ? 'bg-orange-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${riskAnalysis.risco_pragas}%` }}
              />
            </div>
          </div>

          {/* Condições de Aplicação */}
          <div className={`p-4 rounded-xl border-2 ${
            riskAnalysis.condicoes_aplicacao > 70 ? 'bg-green-50 border-green-300' :
            riskAnalysis.condicoes_aplicacao > 40 ? 'bg-orange-50 border-orange-300' :
            'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Wind className={`w-4 h-4 ${
                riskAnalysis.condicoes_aplicacao > 70 ? 'text-green-600' :
                riskAnalysis.condicoes_aplicacao > 40 ? 'text-orange-600' :
                'text-red-600'
              }`} />
              <span className="text-xs text-gray-600">Cond. Aplicação</span>
            </div>
            <div className="text-2xl text-gray-900 mb-1">
              {riskAnalysis.condicoes_aplicacao}%
            </div>
            <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  riskAnalysis.condicoes_aplicacao > 70 ? 'bg-green-500' :
                  riskAnalysis.condicoes_aplicacao > 40 ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${riskAnalysis.condicoes_aplicacao}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Dados Climáticos Atuais */}
      {hoje && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="text-sm text-gray-700 mb-3">☁️ Condições Meteorológicas</div>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-xs text-gray-500 mb-1">Temp.</div>
              <div className="text-lg text-gray-900">{hoje.temp_media.toFixed(1)}°C</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Chuva</div>
              <div className="text-lg text-gray-900">{hoje.precipitacao_mm.toFixed(0)} mm</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Umidade</div>
              <div className="text-lg text-gray-900">{hoje.umidade_rel.toFixed(0)}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Vento</div>
              <div className="text-lg text-gray-900">{hoje.vento_km_h.toFixed(0)} km/h</div>
            </div>
          </div>
        </div>
      )}

      {/* Recomendações */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="text-sm text-gray-700">
              🎯 Recomendações ({recommendations.length})
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                isExpanded={expandedRec === rec.id}
                onToggle={() => setExpandedRec(expandedRec === rec.id ? null : rec.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Card de recomendação individual
 */
function RecommendationCard({
  recommendation,
  isExpanded,
  onToggle,
}: {
  recommendation: IARecommendation;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const prioridadeColor = {
    critica: 'red',
    alta: 'orange',
    media: 'blue',
    baixa: 'gray',
  }[recommendation.prioridade];

  return (
    <div className="px-6 py-4">
      <button
        onClick={onToggle}
        className="w-full text-left"
      >
        <div className="flex items-start gap-3">
          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-${prioridadeColor}-500`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-900">{recommendation.titulo}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-${prioridadeColor}-100 text-${prioridadeColor}-700`}>
                {recommendation.prioridade}
              </span>
            </div>
            <div className="text-xs text-gray-600">{recommendation.descricao}</div>
            
            {recommendation.janela_ideal && (
              <div className="text-xs text-green-600 mt-1">
                ⏰ Janela ideal: {new Date(recommendation.janela_ideal.inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {new Date(recommendation.janela_ideal.fim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Detalhes Expandidos */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 pt-3 border-t border-gray-100"
          >
            {/* Justificativa */}
            <div className="mb-3">
              <div className="text-xs text-gray-600 mb-2">📋 Justificativa:</div>
              <ul className="space-y-1">
                {recommendation.justificativa.map((item, i) => (
                  <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ações Sugeridas */}
            <div>
              <div className="text-xs text-gray-600 mb-2">✅ Ações Sugeridas:</div>
              <div className="space-y-2">
                {recommendation.acoes_sugeridas.map((acao, i) => (
                  <label key={i} className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="mt-0.5" />
                    <span>{acao}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Confiança */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">Confiança da IA:</span>
              <span className="text-xs text-gray-700">{recommendation.confianca}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
