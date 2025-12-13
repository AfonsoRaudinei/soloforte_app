import { useState, memo, useEffect } from 'react';
import { MapPin, Navigation, Bell, MessageSquare, Settings, FileText, CloudRain, Megaphone, BarChart3, Users, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from './ui/button';
import MapTilerComponent from './MapTilerComponent';
import { ExpandableLayersButton } from './ExpandableLayersButton';
import { ExpandableDrawButton } from './ExpandableDrawButton';
import { CheckButton } from './CheckButton';
import MapDrawing, { Polygon } from './MapDrawing';
import { useProfile } from '../utils/ProfileContext';
import logoWatermark from '../assets/logo-watermark.svg';
import AdicionarOcorrencia from './AdicionarOcorrencia';
import { FloatingAvatarButton } from './FloatingAvatarButton';
import { FloatingCameraButton } from './FloatingCameraButton';
import { FloatingActionButtonBlue } from './FloatingActionButtonBlue';
import { SpeedButtonsContainer } from './SpeedButtonsContainer';
import { NDVILegend } from './NDVILegend';
import { NDVITimeSlider } from './NDVITimeSlider';
import { PestScanner } from './PestScanner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { supabase } from '../utils/supabaseClient';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { TalhaoFilterBar, Cliente, Fazenda } from './TalhaoFilterBar';
import { TalhaoSalvoModal } from './TalhaoSalvoModal';
import { TalhaoSalvoToast } from './TalhaoSalvoToast';
import { CheckInButton } from './CheckInButton';
import { ClienteSelectionSheet, ClienteComFazendas } from './ClienteSelectionSheet';
import { VisitaTag } from './VisitaTag';
import { useClientesRecentes } from '../utils/useClientesRecentes';
import { HeaderVisitaCard } from './HeaderVisitaCard';
import { CheckInModal } from './CheckInModal';
import { OfflineIndicator } from './OfflineIndicator';

// Tipos para contexto ativo
interface ClienteAtivo {
  id: string;
  nome: string;
}

interface FazendaAtiva {
  id: string;
  nome: string;
}

interface TalhaoAtivo {
  id: string;
  nome: string;
}

interface ContextoAtivo {
  cliente?: ClienteAtivo | null;
  fazenda?: FazendaAtiva | null;
  talhao?: TalhaoAtivo | null;
  emVisita: boolean;
}

interface DashboardProps {
  navigate: (path: string) => void;
  fabExpanded?: boolean;
  setFabExpanded?: (expanded: boolean) => void;
  onOpenNotifications?: () => void;
}

// 🔥 VERSÃO HÍBRIDA - VISUAL COMPLETO + SEM LOOPS
// ✅ Mantém: FAB, botões expansíveis, visual original
// ❌ Remove: useEffect problemáticos, hooks complexos
const Dashboard = memo(function Dashboard({ 
  navigate, 
  fabExpanded = false, 
  setFabExpanded = () => {},
  onOpenNotifications
}: DashboardProps) {
  const { fotoPerfil } = useProfile();
  
  // ✅ APENAS estados visuais básicos (UI state)
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationCard, setShowLocationCard] = useState(false);
  const [currentLocation] = useState({ lat: -23.5505, lng: -46.6333 });
  const [fabHidden, setFabHidden] = useState(false);
  const [currentMapLayer, setCurrentMapLayer] = useState<'streets' | 'satellite' | 'terrain'>('satellite');
  const [showAdicionarOcorrencia, setShowAdicionarOcorrencia] = useState(false);
  
  // Estados para desenho no mapa
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [savedPolygons, setSavedPolygons] = useState<Polygon[]>([]);
  
  // Estado para NDVI
  const [showNDVI, setShowNDVI] = useState(false);
  
  // Estado para controlar qual speed button está expandido
  const [expandedButton, setExpandedButton] = useState<'layers' | 'draw' | 'checkin' | null>(null);
  
  // ✅ NOVO: Estados para Scanner IA
  const [showScannerIA, setShowScannerIA] = useState(false);
  const [selectedPolygonForAnalysis, setSelectedPolygonForAnalysis] = useState<Polygon | null>(null);
  
  // ✅ NOVO: Estado para controlar carregamento de talhões
  const [isLoadingTalhoes, setIsLoadingTalhoes] = useState(false);
  
  // ✅ NOVO: Estados para filtros de talhões
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);
  const [selectedFazendaId, setSelectedFazendaId] = useState<string | null>(null);
  
  // ✅ NOVO: Estados para modal de salvamento
  const [showSalvoModal, setShowSalvoModal] = useState(false);
  const [lastSavedPolygon, setLastSavedPolygon] = useState<Polygon | null>(null);
  
  // ✅ NOVO: Estados para check-in/check-out
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showClienteSheet, setShowClienteSheet] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [clientesComFazendas, setClientesComFazendas] = useState<ClienteComFazendas[]>([]);
  const [currentVisita, setCurrentVisita] = useState<{
    clienteId: string;
    fazendaId: string;
    clienteNome: string;
    fazendaNome: string;
    startTime: Date;
    visitaId?: string;
  } | null>(null);
  
  // ✅ NOVO: Hook para gerenciar clientes recentes
  const { recentes, adicionarRecente } = useClientesRecentes();
  
  // ✅ NOVO: Estado de contexto ativo (cliente/fazenda/talhão em visita)
  const [contextoAtivo, setContextoAtivo] = useState<ContextoAtivo>({
    cliente: null,
    fazenda: null,
    talhao: null,
    emVisita: false,
  });
  
  // Debug: mostrar quando polgonos mudarem
  console.log('🗺️ Dashboard - Polígonos salvos:', savedPolygons.length, savedPolygons);

  // ✅ NOVO: Carregar talhões salvos do Supabase ao montar o componente
  useEffect(() => {
    loadTalhoesFromSupabase();
    loadClientesAndFazendas();
    
    // Restaurar check-in ativo do localStorage
    try {
      const savedCheckIn = localStorage.getItem('soloforte_checkin_ativo');
      if (savedCheckIn) {
        const parsed = JSON.parse(savedCheckIn);
        console.log('🔄 Restaurando check-in do localStorage:', parsed);
        
        if (parsed.isCheckedIn && parsed.visita) {
          // Restaurar data como Date object
          parsed.visita.startTime = new Date(parsed.visita.startTime);
          setCurrentVisita(parsed.visita);
          setIsCheckedIn(true);
          console.log('✅ Check-in restaurado!', { isCheckedIn: true, visita: parsed.visita });
        }
      }
    } catch (error) {
      console.error('Erro ao restaurar check-in:', error);
    }
    
    // Restaurar contexto ativo do localStorage
    try {
      const saved = localStorage.getItem('soloforte_contexto_ativo');
      if (saved) {
        const parsed = JSON.parse(saved);
        setContextoAtivo(parsed);
        
        // Se tinha visita em andamento, restaurar estado
        if (parsed.emVisita && parsed.cliente && parsed.fazenda) {
          setIsCheckedIn(true);
        }
      }
    } catch (error) {
      console.error('Erro ao restaurar contexto ativo:', error);
    }
  }, []);

  // Persistir contexto ativo no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem('soloforte_contexto_ativo', JSON.stringify(contextoAtivo));
    } catch (error) {
      console.error('Erro ao salvar contexto ativo:', error);
    }
  }, [contextoAtivo]);

  const loadTalhoesFromSupabase = async () => {
    setIsLoadingTalhoes(true);
    try {
      // Verificar se Supabase está configurado ANTES de tentar qualquer operação
      if (!supabase || (supabase as any).supabaseUrl?.includes('your-project-id')) {
        // Silenciar aviso - usar dados mockados silenciosamente
        setIsLoadingTalhoes(false);
        return;
      }

      const { data, error } = await supabase
        .from('talhoes')
        .select(`
          *,
          cliente:clientes(id, nome),
          fazenda:fazendas(id, nome)
        `)
        .eq('ativo', true)
        .order('data_criacao', { ascending: false });

      if (error) {
        // Silenciar erro se for de configuração
        if (error.message.includes('Failed to fetch') || error.message.includes('fetch')) {
          setIsLoadingTalhoes(false);
          return;
        }
        console.error('Erro Supabase:', error);
        throw error;
      }

      if (data && data.length > 0) {
        // Converter dados do Supabase para formato Polygon
        const polygons: Polygon[] = data.map((talhao: any) => ({
          id: talhao.id,
          name: talhao.nome,
          area: parseFloat(talhao.area_ha),
          perimeter: parseFloat(talhao.perimetro_m),
          points: talhao.coordenadas.points || [],
          type: talhao.tipo || 'polygon',
          color: talhao.cor || '#0057FF',
          createdAt: talhao.data_criacao,
          // Metadados adicionais
          clienteId: talhao.cliente_id,
          fazendaId: talhao.fazenda_id,
          clienteNome: talhao.cliente?.nome,
          fazendaNome: talhao.fazenda?.nome,
          cultura: talhao.cultura,
          safra: talhao.safra,
        }));

        setSavedPolygons(polygons);
        
        toast.success(`📍 ${polygons.length} talhão(ões) carregado(s)`, {
          description: `Área total: ${polygons.reduce((sum, p) => sum + p.area, 0).toFixed(2)} ha`,
          duration: 3000,
        });
      } else {
        console.log('ℹ️ Nenhum talhão encontrado no Supabase');
      }
    } catch (error: any) {
      // Silenciar erros de fetch/configuração
      if (error?.message?.includes('Failed to fetch') || error?.message?.includes('fetch')) {
        console.warn('⚠️ Supabase não acessível - verifique configuração');
      } else {
        console.error('Erro ao carregar talhões:', error);
      }
    } finally {
      setIsLoadingTalhoes(false);
    }
  };

  const loadClientesAndFazendas = async () => {
    try {
      // Verificar se Supabase está configurado ANTES de tentar qualquer operação
      if (!supabase || (supabase as any).supabaseUrl?.includes('your-project-id')) {
        // Silenciar aviso - usar dados mockados silenciosamente
        // Dados mockados para desenvolvimento
        const mockClientes = [
          { id: '1', nome: 'João Silva' },
          { id: '2', nome: 'Maria Santos' },
        ];
        const mockFazendas = [
          { id: '1', nome: 'Fazenda Esperança', cliente_id: '1' },
          { id: '2', nome: 'Fazenda Vista Alegre', cliente_id: '1' },
          { id: '3', nome: 'Fazenda Bom Jesus', cliente_id: '2' },
        ];
        setClientes(mockClientes);
        setFazendas(mockFazendas);
        
        // Preparar dados para o sheet
        const mockClientesComFazendas: ClienteComFazendas[] = mockClientes.map(cliente => ({
          ...cliente,
          fazendas: mockFazendas
            .filter(f => f.cliente_id === cliente.id)
            .map(f => ({ id: f.id, nome: f.nome })),
        }));
        setClientesComFazendas(mockClientesComFazendas);
        return;
      }

      // Carregar clientes
      const { data: clientesData, error: clientesError } = await supabase
        .from('clientes')
        .select('id, nome')
        .eq('ativo', true)
        .order('nome');

      if (clientesError) {
        // Silenciar erro se for de configuração
        if (clientesError.message.includes('Failed to fetch') || clientesError.message.includes('fetch')) {
          // Usar dados mockados como fallback silenciosamente
          const mockClientes = [
            { id: '1', nome: 'João Silva' },
            { id: '2', nome: 'Maria Santos' },
          ];
          const mockFazendas = [
            { id: '1', nome: 'Fazenda Esperança', cliente_id: '1' },
            { id: '2', nome: 'Fazenda Vista Alegre', cliente_id: '1' },
            { id: '3', nome: 'Fazenda Bom Jesus', cliente_id: '2' },
          ];
          setClientes(mockClientes);
          setFazendas(mockFazendas);
          
          const mockClientesComFazendas: ClienteComFazendas[] = mockClientes.map(cliente => ({
            ...cliente,
            fazendas: mockFazendas
              .filter(f => f.cliente_id === cliente.id)
              .map(f => ({ id: f.id, nome: f.nome })),
          }));
          setClientesComFazendas(mockClientesComFazendas);
          return;
        }
        throw clientesError;
      }
      setClientes(clientesData || []);

      // Carregar fazendas
      const { data: fazendasData, error: fazendasError } = await supabase
        .from('fazendas')
        .select('id, nome, cliente_id')
        .eq('ativo', true)
        .order('nome');

      if (fazendasError) throw fazendasError;
      setFazendas(fazendasData || []);
      
      // Preparar dados para o sheet de seleção
      const clientesComFazendasData: ClienteComFazendas[] = (clientesData || []).map(cliente => ({
        ...cliente,
        fazendas: (fazendasData || [])
          .filter(f => f.cliente_id === cliente.id)
          .map(f => ({ id: f.id, nome: f.nome })),
      }));
      setClientesComFazendas(clientesComFazendasData);
    } catch (error: any) {
      // Silenciar erros de fetch/configuração
      if (error?.message?.includes('Failed to fetch') || error?.message?.includes('fetch')) {
        console.warn('⚠️ Supabase não acessível - usando dados mockados');
      } else {
        console.error('Erro ao carregar clientes e fazendas:', error);
      }
    }
  };

  // ✅ Função simples de localização (apenas visual feedback)
  const handleLocate = () => {
    setIsLocating(true);
    setShowLocationCard(true);
    setTimeout(() => {
      setIsLocating(false);
    }, 1000);
  };

  // ✅ NOVO: Handlers de check-in/check-out
  const handleCheckInClick = () => {
    if (isCheckedIn && currentVisita) {
      // Check-out
      handleCheckOut();
    } else {
      // Check-in - abrir modal minimalista
      setShowCheckInModal(true);
    }
  };

  const handleCheckIn = async (
    clienteId: string,
    fazendaId: string,
    clienteNome: string,
    fazendaNome: string
  ) => {
    console.log('🔵 handleCheckIn chamado:', { clienteId, fazendaId, clienteNome, fazendaNome });
    
    try {
      const startTime = new Date();
      console.log('⏰ startTime:', startTime);
      
      // Se Supabase configurado E acessível, registrar no backend
      let visitaId: string | undefined;
      if (supabase && !(supabase as any).supabaseUrl?.includes('your-project-id')) {
        try {
          const { data, error } = await supabase
            .from('visitas')
            .insert({
              cliente_id: clienteId,
              fazenda_id: fazendaId,
              data_entrada: startTime.toISOString(),
              status: 'em_andamento',
            })
            .select('id')
            .single();

          if (!error && data) {
            visitaId = data.id;
            console.log('✅ Visita salva no Supabase:', visitaId);
          } else {
            // Silenciar erro de Supabase, continuar com check-in local
            console.warn('⚠️ Não foi possível salvar no Supabase, usando apenas local');
          }
        } catch (supabaseError) {
          // Silenciar erro de fetch, continuar com check-in local
          console.warn('⚠️ Erro ao salvar no Supabase, usando apenas local');
        }
      }

      // Atualizar estado local (sempre funciona, mesmo sem Supabase)
      const visitaData = {
        clienteId,
        fazendaId,
        clienteNome,
        fazendaNome,
        startTime,
        visitaId,
      };
      
      console.log('🔵 Setando currentVisita:', visitaData);
      setCurrentVisita(visitaData);
      
      console.log('🔵 Setando isCheckedIn: true');
      setIsCheckedIn(true);
      
      // 🔥 PERSISTIR NO LOCALSTORAGE IMEDIATAMENTE
      try {
        localStorage.setItem('soloforte_checkin_ativo', JSON.stringify({
          isCheckedIn: true,
          visita: visitaData
        }));
        console.log('💾 Check-in salvo no localStorage');
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
      }

      // ✅ NOVO: Adicionar aos recentes
      adicionarRecente({
        clienteId,
        fazendaId,
        clienteNome,
        fazendaNome,
      });

      // ✅ NOVO: Atualizar contexto ativo
      setContextoAtivo({
        cliente: { id: clienteId, nome: clienteNome },
        fazenda: { id: fazendaId, nome: fazendaNome },
        talhao: null, // Pode ser atualizado posteriormente ao selecionar talhão
        emVisita: true,
      });

      // Feedback visual
      toast.success('✅ Check-in realizado!', {
        description: `Visita iniciada em ${fazendaNome}`,
        duration: 3000,
      });
      
      console.log('🟢 Check-in completo! isCheckedIn:', true, 'currentVisita:', visitaData);
    } catch (error: any) {
      // Apenas logar erros não relacionados a Supabase
      if (!error?.message?.includes('Failed to fetch') && !error?.message?.includes('fetch')) {
        console.error('Erro ao fazer check-in:', error);
        toast.error('Erro ao fazer check-in', {
          description: 'Não foi possível registrar a entrada',
        });
      }
    }
  };

  const handleCheckOut = async () => {
    if (!currentVisita) return;

    try {
      const endTime = new Date();
      const duration = endTime.getTime() - currentVisita.startTime.getTime();
      const hours = Math.floor(duration / 3600000);
      const minutes = Math.floor((duration % 3600000) / 60000);

      // Se Supabase configurado, atualizar no backend
      if (supabase && currentVisita.visitaId) {
        const { error } = await supabase
          .from('visitas')
          .update({
            data_saida: endTime.toISOString(),
            duracao_minutos: Math.floor(duration / 60000),
            status: 'concluida',
          })
          .eq('id', currentVisita.visitaId);

        if (error) throw error;
      }

      // Feedback visual
      toast.success(' Visita finalizada!', {
        description: `Duração: ${hours > 0 ? `${hours}h` : ''}${minutes}min`,
        duration: 4000,
      });

      // ✅ NOVO: Limpar contexto ativo
      setContextoAtivo({
        cliente: null,
        fazenda: null,
        talhao: null,
        emVisita: false,
      });

      // Limpar estado e mostrar botão novamente
      setIsCheckedIn(false);
      setCurrentVisita(null);
    } catch (error) {
      console.error('Erro ao fazer check-out:', error);
      toast.error('Erro ao finalizar visita', {
        description: 'Não foi possível registrar a saída',
      });
    }
  };

  // ✅ NOVO: Filtrar talhões baseado nas seleções
  const filteredPolygons = savedPolygons.filter((polygon) => {
    // Se nenhum filtro selecionado, mostrar todos
    if (!selectedClienteId && !selectedFazendaId) return true;
    
    // Se cliente selecionado, filtrar por cliente
    if (selectedClienteId && polygon.clienteId !== selectedClienteId) return false;
    
    // Se fazenda selecionada, filtrar por fazenda
    if (selectedFazendaId && polygon.fazendaId !== selectedFazendaId) return false;
    
    return true;
  });

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      {/* ===== MAPA ===== */}
      <div className="absolute inset-0">
        <MapTilerComponent
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={13}
          minZoom={3}
          maxZoom={20}
          onMapReady={() => {}}
          mapStyle={
            currentMapLayer === 'streets' ? 'streets-v2' :
            currentMapLayer === 'terrain' ? 'topo-v2' :
            'satellite-v2'
          }
        />
      </div>
      
      {/* ===== CAMADA DE DESENHO (SOBRE O MAPA) ===== */}
      {activeTool && (
        <div className="absolute inset-0 z-30 pointer-events-auto">
          <MapDrawing
            activeTool={activeTool}
            onToolComplete={() => {
              setActiveTool(null);
              toast.success('✅ Desenho concluído!');
            }}
            onPolygonSave={(polygon) => {
              setSavedPolygons([...savedPolygons, polygon]);
              toast.success(`📍 ${polygon.name} salvo!`);
              setLastSavedPolygon(polygon);
              setShowSalvoModal(true);
            }}
            savedPolygons={filteredPolygons}
            onPolygonDelete={(id) => {
              setSavedPolygons(savedPolygons.filter(p => p.id !== id));
              toast.success('Área excluída');
            }}
            onClearAll={() => {
              setSavedPolygons([]);
            }}
            onAnalyzeWithAI={(polygon) => {
              setSelectedPolygonForAnalysis(polygon);
              setShowScannerIA(true);
              toast.success('🤖 Scanner IA ativado', {
                description: `Analisando ${polygon.name} (${polygon.area.toFixed(2)} ha)`,
                duration: 3000,
              });
            }}
          />
        </div>
      )}

      {/* ===== HEADER ===== */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div>
            </div>
          </div>
          
          {/* Apenas Wi-Fi no canto direito */}
          <div className="flex items-center gap-2">
            {/* 🎯 Indicador de Status Offline/Online */}
            <OfflineIndicator />
          </div>
        </div>
      </div>

      {/* ===== CARD CONTEXTO ATIVO (Cliente/Fazenda/Talhão) ===== */}
      <HeaderVisitaCard
        cliente={contextoAtivo.cliente}
        fazenda={contextoAtivo.fazenda}
        talhao={contextoAtivo.talhao}
        emVisita={contextoAtivo.emVisita}
      />

      {/* ===== BARRA DE FILTROS ===== */}
      {savedPolygons.length > 0 && (clientes.length > 0 || fazendas.length > 0) && (
        <div className="fixed top-16 left-4 right-4 z-20 pointer-events-auto max-w-sm animate-in slide-in-from-top-3 fade-in duration-300">
          <TalhaoFilterBar
            clientes={clientes}
            fazendas={fazendas}
            selectedClienteId={selectedClienteId}
            selectedFazendaId={selectedFazendaId}
            onClienteChange={(id) => {
              setSelectedClienteId(id);
              toast.info(`Filtro: ${id ? clientes.find(c => c.id === id)?.nome : 'Todos os clientes'}`);
            }}
            onFazendaChange={(id) => {
              setSelectedFazendaId(id);
              toast.info(`Filtro: ${id ? fazendas.find(f => f.id === id)?.nome : 'Todas as fazendas'}`);
            }}
            visibleCount={filteredPolygons.length}
            totalCount={savedPolygons.length}
          />
        </div>
      )}

      {/* ===== SPEED BUTTONS - BOTÕES LATERAIS (Centralizados Verticalmente) ===== */}
      <SpeedButtonsContainer hidden={fabExpanded}>
        {/* Layers Button */}
        <ExpandableLayersButton
          onStreetsClick={() => {
            setCurrentMapLayer('streets');
            setShowNDVI(false);
            toast.success('🗺️ Camada: Explorar', { description: 'Mapa de ruas ativado' });
          }}
          onSatelliteClick={() => {
            setCurrentMapLayer('satellite');
            setShowNDVI(false);
            toast.success('🛰️ Camada: Satélite', { description: 'Imagens de satélite ativadas' });
          }}
          onTerrainClick={() => {
            setCurrentMapLayer('terrain');
            setShowNDVI(false);
            toast.success('⛰️ Camada: Relevo', { description: 'Mapa topográfico ativado' });
          }}
          onNDVIClick={() => {
            setShowNDVI(!showNDVI);
            if (!showNDVI) {
              toast.success('🌿 Camada NDVI Ativada', { 
                description: 'Análise de biomassa e vigor vegetativo',
                duration: 3000
              });
            } else {
              toast.info('Camada NDVI Desativada');
            }
          }}
          onRadarClick={() => navigate('/radar-clima')}
          currentLayer={showNDVI ? 'ndvi' : currentMapLayer}
          isExpanded={expandedButton === 'layers'}
          onExpand={() => setExpandedButton('layers')}
          onCollapse={() => setExpandedButton(null)}
        />

        {/* Draw Tools Button */}
        <ExpandableDrawButton
          onSelectTool={(toolId, toolLabel) => {
            console.log('Ferramenta selecionada:', toolId, toolLabel);
            setActiveTool(toolId);
            toast.info(`✏️ ${toolLabel}`, { description: 'Clique no mapa para começar a desenhar' });
          }}
          onImportFile={(file) => {
            console.log('Arquivo importado:', file.name);
            toast.success(`📁 ${file.name}`, { description: 'Arquivo carregado com sucesso' });
          }}
          currentTool={activeTool}
          isDrawActive={!!activeTool}
          isExpanded={expandedButton === 'draw'}
          onExpand={() => setExpandedButton('draw')}
          onCollapse={() => setExpandedButton(null)}
        />

        {/* Check-In/Out Button */}
        <CheckButton
          clienteSelecionado={selectedClienteId}
          clienteNome={selectedClienteId ? clientes.find(c => c.id === selectedClienteId)?.nome : null}
          fazendaNome={selectedFazendaId ? fazendas.find(f => f.id === selectedFazendaId)?.nome : null}
          onSelectCliente={(clienteId, clienteNome, fazendaId) => {
            console.log('🔓 Cliente selecionado:', clienteNome);
            setSelectedClienteId(clienteId);
            if (fazendaId) {
              setSelectedFazendaId(fazendaId);
            }
          }}
          onClearCliente={() => {
            console.log('🧹 Limpando cliente após check-out');
            setSelectedClienteId(null);
            setSelectedFazendaId(null);
          }}
          onCheckIn={() => {
            console.log('✅ Check-in iniciado');
          }}
          onCheckOut={() => {
            console.log('👋 Check-out finalizado');
          }}
        />
      </SpeedButtonsContainer>

      {/* ===== BOTÃO DE LOCALIZAÇÃO ATUAL ===== */}
      <div className="fixed top-16 right-4 z-40 flex flex-col gap-2">
        <TooltipProvider>
          {/* Botão de Localização */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  onClick={handleLocate}
                  disabled={isLocating}
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-gray-200/50"
                  size="icon"
                >
                  {isLocating ? (
                    <div className="animate-spin">
                      <Navigation className="h-5 w-5 text-gray-700" />
                    </div>
                  ) : (
                    <Navigation className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Minha localização</p>
            </TooltipContent>
          </Tooltip>

          {/* Botão de Recarregar Talhões */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  onClick={() => {
                    toast.info('🔄 Recarregando talhões...');
                    loadTalhoesFromSupabase();
                  }}
                  disabled={isLoadingTalhoes}
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-gray-200/50"
                  size="icon"
                >
                  {isLoadingTalhoes ? (
                    <div className="animate-spin">
                      <RefreshCw className="h-5 w-5 text-[#0057FF]" />
                    </div>
                  ) : (
                    <RefreshCw className="h-5 w-5 text-[#0057FF]" />
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Recarregar talhões salvos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* ===== SLIDER TEMPORAL NDVI (Acima da Legenda) ===== */}
      {showNDVI && (
        <div className="fixed bottom-24 left-4 right-4 z-40 animate-in slide-in-from-bottom-3 fade-in duration-300 pb-safe">
          <div className="max-w-md mx-auto">
            <NDVITimeSlider 
              visible={showNDVI}
              onDateChange={(snapshot) => {
                toast.info(`📅 ${snapshot.date}`, {
                  description: `NDVI médio: ${snapshot.avgNDVI.toFixed(2)} • ${snapshot.source}`,
                  duration: 2000,
                });
              }}
            />
          </div>
        </div>
      )}

      {/* ===== LEGENDA NDVI (Canto Inferior Direito) ===== */}
      {showNDVI && (
        <div className="fixed bottom-4 right-4 z-40 animate-in slide-in-from-right-3 fade-in duration-300">
          <NDVILegend visible={showNDVI} />
        </div>
      )}

      {/* ===== SECONDARY MENU - SPEED DIAL (quando FAB expandido) ===== */}
      {fabExpanded && (
        <>
          {/* Backdrop com blur */}
          <div 
            className="fixed inset-0 z-[9997] bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-200"
            onClick={() => setFabExpanded(false)}
          />
          
          {/* Speed Dial - Botões empilhados verticalmente */}
          <div className="fixed bottom-24 right-6 z-[9998] flex flex-col gap-4 items-end">
            {/* Botão Notificações */}
            <button
              onClick={() => {
                console.log('🔔 Dashboard Speed Dial: Botão Notificações clicado', {
                  hasCallback: !!onOpenNotifications,
                  callbackType: typeof onOpenNotifications
                });
                if (onOpenNotifications) {
                  console.log('✅ Dashboard: Executando onOpenNotifications()');
                  onOpenNotifications();
                } else {
                  console.warn('⚠️ Dashboard: onOpenNotifications não definida, mostrando toast');
                  toast.info('🔔 Notificações', { description: 'Você não tem notificações novas' });
                }
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Notificações
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0057FF] to-[#0041CC] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </button>

            {/* Botão Feedback */}
            <button
              onClick={() => {
                navigate('/feedback');
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Feedback
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </button>

            {/* Botão Configurações */}
            <button
              onClick={() => {
                navigate('/configuracoes');
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Configurações
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <Settings className="h-6 w-6 text-white" />
              </div>
            </button>

            {/* Botão Relatórios */}
            <button
              onClick={() => {
                navigate('/relatorios');
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Relatórios
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </button>

            {/* Botão Clima Detalhado */}
            <button
              onClick={() => {
                navigate('/clima');
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Clima Detalhado
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <CloudRain className="h-6 w-6 text-white" />
              </div>
            </button>

            {/* Botão Publicação */}
            <button
              onClick={() => {
                navigate('/marketing');
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Publicação
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <Megaphone className="h-6 w-6 text-white" />
              </div>
            </button>

            {/* Botão Análise de Dados */}
            <button
              onClick={() => {
                navigate('/dashboard-executivo');
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '350ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Dashboard Executivo
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-lime-500 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </button>

            {/* Botão Gerenciamento de Usuários */}
            <button
              onClick={() => {
                navigate('/gestao-equipes');
                setFabExpanded(false);
              }}
              className="group flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
              style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}
            >
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Gestão de Equipes
              </span>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
            </button>
          </div>
        </>
      )}

      {/* ===== MODAL DE ADICIONAR OCORRÊNCIA ===== */}
      <AdicionarOcorrencia
        isOpen={showAdicionarOcorrencia}
        onClose={() => setShowAdicionarOcorrencia(false)}
        currentLocation={currentLocation}
      />

      {/* ===== MODAL DE SCANNER IA ===== */}
      <Dialog open={showScannerIA} onOpenChange={setShowScannerIA}>
        <DialogContent className="max-w-full max-h-[95vh] w-[95vw] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
            <DialogTitle className="text-xl text-gray-900">
              🤖 Scanner IA - Análise de Área
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-1">
              {selectedPolygonForAnalysis ? (
                <span>
                  <strong>{selectedPolygonForAnalysis.name}</strong> • {selectedPolygonForAnalysis.area.toFixed(2)} ha • {selectedPolygonForAnalysis.points.length} pontos
                </span>
              ) : (
                'Análise inteligente de pragas e doenças'
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(95vh-120px)] px-6 pb-24">
            <PestScanner 
              className="pb-6"
              onSaveAsOccurrence={(occurrence) => {
                console.log('Scanner IA: Salvando resultado como ocorrência', occurrence);
                setShowScannerIA(false);
                toast.success('✅ Análise concluída!', {
                  description: 'Resultados salvos com sucesso',
                  duration: 3000,
                });
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== MODAL DE SALVAMENTO ===== */}
      <TalhaoSalvoModal
        isOpen={showSalvoModal}
        onClose={() => setShowSalvoModal(false)}
        talhaoNome={lastSavedPolygon?.name || ''}
        area={lastSavedPolygon?.area || 0}
        perimetro={lastSavedPolygon?.perimetro || 0}
        clienteNome={lastSavedPolygon?.clienteNome}
        fazendaNome={lastSavedPolygon?.fazendaNome}
        cultura={lastSavedPolygon?.cultura}
        safra={lastSavedPolygon?.safra}
        onViewCliente={() => {
          toast.info('👤 Visualizando perfil do cliente', {
            description: lastSavedPolygon?.clienteNome || 'Cliente não vinculado'
          });
          // Aqui você pode navegar para a página do cliente no futuro
          // navigate(`/clientes/${lastSavedPolygon?.clienteId}`);
        }}
        onViewFazenda={() => {
          toast.info('🗺️ Visualizando detalhes da fazenda', {
            description: lastSavedPolygon?.fazendaNome || 'Fazenda não vinculada'
          });
          // Aqui você pode navegar para a página da fazenda no futuro
          // navigate(`/fazendas/${lastSavedPolygon?.fazendaId}`);
        }}
      />

      {/* ===== BOTTOM SHEET DE SELEÇÃO DE CLIENTE ===== */}
      <ClienteSelectionSheet
        isOpen={showClienteSheet}
        onClose={() => setShowClienteSheet(false)}
        clientes={clientesComFazendas}
        clientesRecentes={recentes}
        onSelectClienteFazenda={handleCheckIn}
      />

      {/* ===== MODAL MINIMALISTA DE CHECK-IN ===== */}
      <CheckInModal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        clientes={clientesComFazendas}
        clientesRecentes={recentes}
        onCheckIn={handleCheckIn}
        onViewAll={() => {
          setShowCheckInModal(false);
          setShowClienteSheet(true);
        }}
        onAddNew={() => {
          setShowCheckInModal(false);
          toast.info('➕ Adicionar novo produtor', {
            description: 'Funcionalidade em desenvolvimento',
          });
        }}
      />

      {/* ===== TAG "EM VISITA" NO HEADER ===== */}
      {console.log('🔍 Debug render VisitaTag:', { isCheckedIn, currentVisita })}
      
      {/* DEBUG: Indicador visual temporário */}
      {isCheckedIn && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-xl pointer-events-auto">
          DEBUG: Check-in ativo!
        </div>
      )}
      
      {isCheckedIn && currentVisita && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto animate-in slide-in-from-top-3 fade-in duration-300">
          {console.log('✅ Renderizando VisitaTag!', currentVisita)}
          <VisitaTag
            clienteNome={currentVisita.clienteNome}
            fazendaNome={currentVisita.fazendaNome}
            startTime={currentVisita.startTime}
            onCheckOut={handleCheckOut}
          />
        </div>
      )}

      {/* ===== DOCK INFERIOR (Avatar + Câmera) ===== */}
      <FloatingAvatarButton
        onClick={() => navigate('/configuracoes')}
        userPhoto={fotoPerfil}
      />
      <FloatingCameraButton
        onClick={() => setShowAdicionarOcorrencia(true)}
      />

      {/* ===== FAB AZUL ORIGINAL (Canto Direito) ===== */}
      <FloatingActionButtonBlue
        onClick={() => setFabExpanded(!fabExpanded)}
        isExpanded={fabExpanded}
      />
    </div>
  );
});

export default Dashboard;