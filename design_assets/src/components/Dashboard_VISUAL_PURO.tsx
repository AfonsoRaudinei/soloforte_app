import { Button } from './ui/button';
import logoWatermark from 'figma:asset/88502792e1aa204edd8aab74c4453d15863f6d4c.png';
import MapTilerComponent from './MapTilerComponent';

interface DashboardProps {
  navigate: (path: string) => void;
  fabExpanded?: boolean;
  setFabExpanded?: (expanded: boolean) => void;
}

// 🔥 VERSÃO VISUAL PURA - SEM LÓGICA, SEM LOOPS, SEM useEffect
export default function Dashboard({ navigate, fabExpanded = false, setFabExpanded = () => {} }: DashboardProps) {
  // ✅ APENAS estados visuais básicos
  const [isLocating, setIsLocating] = useState(false);

  // ✅ Função simples de localização (apenas visual)
  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => setIsLocating(false), 1000);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      {/* Mapa */}
      <div className="absolute inset-0">
        <MapTilerComponent
          center={[-23.5505, -46.6333]}
          zoom={13}
          minZoom={3}
          maxZoom={20}
          onMapReady={() => {}}
          onLocationUpdate={() => {}}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoWatermark} alt="SoloForte" className="h-8 w-auto" />
            <div>
              <h1 className="text-white">Dashboard</h1>
              <p className="text-white/80 text-sm">Modo Demonstração</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/configuracoes')}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Botão de Localização */}
      <div className="absolute bottom-24 right-4 z-10">
        <Button
          onClick={handleLocate}
          disabled={isLocating}
          className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50"
          size="icon"
        >
          {isLocating ? (
            <div className="animate-spin">
              <Navigation className="h-5 w-5 text-[#0057FF]" />
            </div>
          ) : (
            <MapPin className="h-5 w-5 text-[#0057FF]" />
          )}
        </Button>
      </div>

      {/* Menu inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around">
          <Button variant="ghost" onClick={() => navigate('/clima')}>
            Clima
          </Button>
          <Button variant="ghost" onClick={() => navigate('/relatorios')}>
            Relatórios
          </Button>
          <Button variant="ghost" onClick={() => navigate('/clientes')}>
            Clientes
          </Button>
        </div>
      </div>
    </div>
  );
}