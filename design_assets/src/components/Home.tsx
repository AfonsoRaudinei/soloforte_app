import { useState } from 'react';
import { Play, LayoutDashboard } from 'lucide-react';
import logoWatermark from 'figma:asset/88502792e1aa204edd8aab74c4453d15863f6d4c.png';
import logoSoloForte from 'figma:asset/19285b162366486e51bd00e7a92c210e528f6246.png';
import MapTilerComponent from './MapTilerComponent';

interface HomeProps {
  navigate: (path: string) => void;
}

// 🔥 VERSÃO VISUAL PURA - SEM LÓGICA, SEM LOOPS
export default function Home({ navigate }: HomeProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Mapa de fundo */}
      <div className="absolute inset-0 opacity-30">
        <MapTilerComponent
          center={[-15.7801, -47.9292]}
          zoom={4}
          minZoom={3}
          maxZoom={20}
          onMapReady={() => {}}
          onLocationUpdate={() => {}}
        />
      </div>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
        {/* Logo e título */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <img src={logoSoloForte} alt="SoloForte" className="h-20 w-auto drop-shadow-2xl" />
          
          <div className="space-y-3">
            <h1 className="text-white text-4xl">
              SoloForte
            </h1>
            <p className="text-white/90 text-lg max-w-md">
              Transforme complexidade em decisões simples e produtivas
            </p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="w-full max-w-sm space-y-3 pb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-[#0057FF] hover:bg-[#0046CC] text-white py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
          >
            <Play className="h-5 w-5" />
            <span className="text-lg">Modo Demonstração</span>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-4 px-6 rounded-xl border border-white/30 transition-all flex items-center justify-center gap-3"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-lg">Fazer Login</span>
          </button>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2 left-2 opacity-30">
        <img src={logoWatermark} alt="" className="h-6 w-auto" />
      </div>
    </div>
  );
}