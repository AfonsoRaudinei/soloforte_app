import { useState } from 'react';
import { ArrowLeft, Cloud, Droplets, Wind, Zap, CloudRain } from 'lucide-react';

interface RadarClimaProps {
  navigate: (path: string) => void;
}

export default function RadarClima({ navigate }: RadarClimaProps) {
  const [cidade] = useState('São Paulo');

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 overflow-y-auto scroll-smooth pb-32">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Voltar
          </button>
          <h1 className="text-gray-800">🌦️ Radar de Clima</h1>
          <p className="text-gray-500">{cidade}</p>
        </div>

        {/* Radar Principal */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Círculos do Radar */}
            <div className="absolute inset-0 opacity-30">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0057FF" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#0057FF" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#0057FF" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="#0057FF" strokeWidth="0.5" />
                
                {/* Linhas do Radar */}
                <line x1="50" y1="10" x2="50" y2="90" stroke="#0057FF" strokeWidth="0.3" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#0057FF" strokeWidth="0.3" />
                <line x1="20" y1="20" x2="80" y2="80" stroke="#0057FF" strokeWidth="0.3" />
                <line x1="80" y1="20" x2="20" y2="80" stroke="#0057FF" strokeWidth="0.3" />
              </svg>
            </div>

            {/* Simulação de Nuvens */}
            <div className="absolute inset-0">
              {/* Nuvem 1 - Leve */}
              <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-blue-200/60 rounded-full blur-md animate-pulse"></div>
              
              {/* Nuvem 2 - Moderada */}
              <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-400/60 rounded-full blur-md" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Nuvem 3 - Forte */}
              <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-blue-600/60 rounded-full blur-md" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Centro do Radar */}
            <div className="text-center z-10">
              <div className="relative">
                <Cloud className="h-20 w-20 text-[#0057FF] mx-auto mb-4 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#0057FF] rounded-full"></div>
                </div>
              </div>
              <p className="text-gray-700 font-medium">Radar Meteorológico</p>
              <p className="text-gray-500 text-sm mt-1">Atualizado em tempo real</p>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-3">Intensidade de Precipitação</p>
            <div className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-md shadow-sm"></div>
                <span className="text-gray-700">Leve</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-400 rounded-md shadow-sm"></div>
                <span className="text-gray-700">Moderada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-md shadow-sm"></div>
                <span className="text-gray-700">Forte</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-600 rounded-md shadow-sm"></div>
                <span className="text-gray-700">Severa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Cobertura de Nuvens */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Cloud className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Cobertura</p>
                <p className="text-gray-900 font-semibold">65%</p>
              </div>
            </div>
          </div>

          {/* Umidade */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Droplets className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Umidade</p>
                <p className="text-gray-900 font-semibold">70%</p>
              </div>
            </div>
          </div>

          {/* Velocidade do Vento */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Wind className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Vento</p>
                <p className="text-gray-900 font-semibold">12 km/h</p>
              </div>
            </div>
          </div>

          {/* Tempestades */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Raios</p>
                <p className="text-gray-900 font-semibold">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Previsão de Precipitação */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-[#0057FF]" />
            Previsão de Precipitação (próximas horas)
          </h3>
          
          <div className="space-y-3">
            {[
              { hora: 'Agora', probabilidade: 10, intensidade: 'Sem chuva' },
              { hora: '13:00', probabilidade: 20, intensidade: 'Sem chuva' },
              { hora: '14:00', probabilidade: 35, intensidade: 'Possível chuva leve' },
              { hora: '15:00', probabilidade: 60, intensidade: 'Chuva provável' },
              { hora: '16:00', probabilidade: 75, intensidade: 'Chuva moderada' },
              { hora: '17:00', probabilidade: 45, intensidade: 'Chuva leve' },
              { hora: '18:00', probabilidade: 20, intensidade: 'Sem chuva' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-600">{item.hora}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          item.probabilidade >= 70
                            ? 'bg-blue-600'
                            : item.probabilidade >= 40
                            ? 'bg-blue-400'
                            : 'bg-blue-200'
                        }`}
                        style={{ width: `${item.probabilidade}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-gray-600 text-right">{item.probabilidade}%</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.intensidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">ℹ️</div>
            <div className="flex-1">
              <p className="text-sm text-blue-900 mb-1">
                <strong>Radar em Tempo Real</strong>
              </p>
              <p className="text-sm text-blue-700">
                Os dados do radar são atualizados a cada 10 minutos. Use as informações para planejar suas atividades agrícolas com segurança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}