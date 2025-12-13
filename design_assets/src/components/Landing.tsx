import { useState } from 'react';
import { MapPin, Sprout } from 'lucide-react';
import MapTilerComponent from './MapTilerComponent';
import logoSoloForte from 'figma:asset/efde325965e45239da55e7a356584a7096f3166f.png';

interface LandingProps {
  navigate: (path: string) => void;
}

// 🔥 VERSÃO VISUAL PURA - SEM LÓGICA, SEM LOOPS
export default function Landing({ navigate }: LandingProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Mapa fullscreen */}
      <div className="absolute inset-0">
        <MapTilerComponent
          center={[-15.7801, -47.9292]}
          zoom={4}
          minZoom={3}
          maxZoom={20}
          onMapReady={() => setMapLoaded(true)}
          onLocationUpdate={() => {}}
        />
      </div>

      {/* Overlay com conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-gradient-to-b from-black/50 via-transparent to-black/70 p-6">
        {/* Logo e título */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <img src={logoSoloForte} alt="SoloForte" className="h-24 w-auto drop-shadow-2xl animate-fade-in" />
          
          <div className="space-y-3 animate-fade-in">
            <h1 className="text-white text-5xl drop-shadow-lg">
              SoloForte
            </h1>
          </div>

        </div>

        {/* Botão de ação */}
        <div className="w-full max-w-sm pb-12">
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-[#0057FF] hover:bg-[#0046CC] text-white py-5 px-8 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl text-xl"
          >
            Começar
          </button>
        </div>
      </div>

      {/* Indicador de carregamento do mapa */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mx-auto" />
            <p className="text-white text-lg">Carregando mapa...</p>
          </div>
        </div>
      )}
    </div>
  );
}