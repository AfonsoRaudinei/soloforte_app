import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Clock, Camera, CheckCircle, Circle, Calendar, TrendingUp, Download, User, Building2, Eye, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { fetchWithAuth } from '../utils/supabase/client';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { CheckInRecord, CheckInStatus } from '../types';

interface CheckInOutProps {
  navigate: (path: string) => void;
}

// Lista de produtores disponíveis
const PRODUTORES = [
  {
    id: '1',
    nome: 'João Silva',
    fazenda: 'Fazenda São João',
    cidade: 'Rio Verde, GO'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    fazenda: 'Fazenda Santa Maria',
    cidade: 'Jataí, GO'
  },
  {
    id: '3',
    nome: 'Pedro Oliveira',
    fazenda: 'Fazenda Boa Vista',
    cidade: 'Mineiros, GO'
  },
];

// ⚠️ Interface específica do componente (estrutura diferente de CheckInRecord)
interface Visit {
  id: string;
  type: 'checkin' | 'checkout';
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  client?: string;
  property?: string;
  notes?: string;
  photo?: string;
  duration?: number; // em minutos
}

interface ActiveVisit {
  id: string;
  checkinTime: string;
  location: string;
  client: string;
  property: string;
}

export default function CheckInOut({ navigate }: CheckInOutProps) {
  const [activeVisit, setActiveVisit] = useState<ActiveVisit | null>(null);
  const [visitHistory, setVisitHistory] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'current' | 'history' | 'reports'>('current');
  
  // NOVO: Estado para seleção de produtor
  const [selectedProdutor, setSelectedProdutor] = useState<string>('');
  const [showProdutorSelect, setShowProdutorSelect] = useState(false);
  const [showVistaRapida, setShowVistaRapida] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Carregar visita ativa e histórico
  useEffect(() => {
    loadActiveVisit();
    loadVisitHistory();
    getCurrentLocation();
  }, []);

  // Timer para visita ativa
  useEffect(() => {
    if (!activeVisit) return;

    const interval = setInterval(() => {
      const start = new Date(activeVisit.checkinTime).getTime();
      const now = new Date().getTime();
      const elapsed = Math.floor((now - start) / 1000); // segundos
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeVisit]);

  const getCurrentLocation = () => {
    // Verificar se geolocalização está disponível e permitida
    if (!('geolocation' in navigator)) {
      console.log('Geolocalização não suportada - usando modo demo');
      toast.info('📍 Usando localização demo (GPS não disponível)');
      setCurrentLocation({
        lat: -23.5505,
        lng: -46.6333,
        address: 'São Paulo, SP (Demo)'
      });
      return;
    }

    // Verificar permissões antes de tentar acessar
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
          console.log('Geolocalização bloqueada por permissões - usando modo demo');
          toast.info('📍 Usando localização demo (permissão GPS bloqueada)');
          setCurrentLocation({
            lat: -23.5505,
            lng: -46.6333,
            address: 'São Paulo, SP (Demo)'
          });
          return;
        }
        
        // Tentar obter localização
        attemptGeolocation();
      }).catch(() => {
        // Se query de permissões falhar, tentar obter localização mesmo assim
        attemptGeolocation();
      });
    } else {
      // Navegador não suporta Permissions API, tentar obter localização
      attemptGeolocation();
    }
  };

  const attemptGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding simples
        const address = await reverseGeocode(latitude, longitude);
        
        setCurrentLocation({
          lat: latitude,
          lng: longitude,
          address: address
        });
        
        toast.success('📍 Localização GPS obtida com sucesso!');
      },
      (error) => {
        let errorMessage = 'Usando localização demo';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('Geolocalização: Permissão negada - usando modo demo');
            errorMessage = 'Permissão GPS negada. Usando localização demo.';
            break;
          case error.POSITION_UNAVAILABLE:
            console.log('Geolocalização: Posição indisponível - usando modo demo');
            errorMessage = 'GPS indisponível. Usando localização demo.';
            break;
          case error.TIMEOUT:
            console.log('Geolocalização: Timeout - usando modo demo');
            errorMessage = 'Timeout ao obter GPS. Usando localização demo.';
            break;
          default:
            console.log('Geolocalização: Erro -', error.message, '- usando modo demo');
            errorMessage = 'GPS não disponível. Usando localização demo.';
            break;
        }
        
        toast.info('📍 ' + errorMessage);
        
        // Localização padrão (demo)
        setCurrentLocation({
          lat: -23.5505,
          lng: -46.6333,
          address: 'São Paulo, SP (Demo)'
        });
      },
      {
        enableHighAccuracy: false, // Desabilitar alta precisão para evitar erros
        timeout: 5000,             // Timeout reduzido para 5s
        maximumAge: 60000          // Aceitar cache de até 1 minuto
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // Em produção, usar API de geocoding real
      // Por enquanto, endereço simulado
      return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    } catch (error) {
      return 'Localização não identificada';
    }
  };

  const loadActiveVisit = async () => {
    try {
      // Buscar do localStorage primeiro
      const saved = localStorage.getItem('soloforte_active_visit');
      if (saved) {
        setActiveVisit(JSON.parse(saved));
        return;
      }

      // Tentar buscar do backend
      const response = await fetchWithAuth('/make-server-b2d55462/visits/active');
      if (response.ok) {
        const data = await response.json();
        if (data.visit) {
          setActiveVisit(data.visit);
          localStorage.setItem('soloforte_active_visit', JSON.stringify(data.visit));
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao carregar visita ativa:', errorMessage, error);
    }
  };

  const loadVisitHistory = async () => {
    try {
      // Buscar do localStorage primeiro
      const saved = localStorage.getItem('soloforte_visit_history');
      if (saved) {
        setVisitHistory(JSON.parse(saved));
      }

      // Tentar buscar do backend
      const response = await fetchWithAuth('/make-server-b2d55462/visits/history');
      if (response.ok) {
        const data = await response.json();
        if (data.visits) {
          setVisitHistory(data.visits);
          localStorage.setItem('soloforte_visit_history', JSON.stringify(data.visits));
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao carregar histórico:', errorMessage, error);
    }
  };

  const handleCheckIn = async () => {
    if (!currentLocation) {
      toast.error('Aguardando localização...');
      return;
    }

    // Verificar se produtor foi selecionado
    if (!selectedProdutor) {
      toast.error('Selecione um produtor antes de fazer check-in');
      return;
    }

    setLoading(true);
    try {
      const produtor = PRODUTORES.find(p => p.id === selectedProdutor);
      if (!produtor) {
        toast.error('Produtor não encontrado');
        return;
      }

      const visit: ActiveVisit = {
        id: Date.now().toString(),
        checkinTime: new Date().toISOString(),
        location: currentLocation.address,
        client: produtor.nome,
        property: produtor.fazenda
      };

      // Salvar localmente
      setActiveVisit(visit);
      localStorage.setItem('soloforte_active_visit', JSON.stringify(visit));

      // Tentar salvar no backend
      try {
        await fetchWithAuth('/make-server-b2d55462/visits/checkin', {
          method: 'POST',
          body: JSON.stringify({
            location: currentLocation,
            notes: notes,
            photo: photoUrl,
            client: produtor.nome,
            property: produtor.fazenda
          })
        });
      } catch (err) {
        console.log('Backend indisponível, usando storage local');
      }

      toast.success(`✅ Check-in realizado em ${produtor.fazenda}!`);
      setNotes('');
      setPhotoUrl(null);
      setSelectedProdutor('');
      setShowProdutorSelect(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro no check-in:', errorMessage, error);
      toast.error('Erro ao fazer check-in: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!activeVisit) return;

    setLoading(true);
    try {
      const duration = elapsedTime / 60; // minutos

      const visitRecord: Visit = {
        id: activeVisit.id,
        type: 'checkout',
        timestamp: new Date().toISOString(),
        location: currentLocation || {
          lat: 0,
          lng: 0,
          address: activeVisit.location
        },
        client: activeVisit.client,
        property: activeVisit.property,
        notes: notes,
        photo: photoUrl,
        duration: Math.round(duration)
      };

      // Adicionar ao histórico
      const newHistory = [visitRecord, ...visitHistory];
      setVisitHistory(newHistory);
      localStorage.setItem('soloforte_visit_history', JSON.stringify(newHistory));

      // Limpar visita ativa
      setActiveVisit(null);
      localStorage.removeItem('soloforte_active_visit');

      // Tentar salvar no backend
      try {
        await fetchWithAuth('/make-server-b2d55462/visits/checkout', {
          method: 'POST',
          body: JSON.stringify({
            visitId: activeVisit.id,
            location: currentLocation,
            notes: notes,
            photo: photoUrl,
            duration: Math.round(duration)
          })
        });
      } catch (err) {
        console.log('Backend indisponível, usando storage local');
      }

      toast.success(`✅ Check-out realizado! Duração: ${formatDuration(Math.round(duration))}`);
      setNotes('');
      setPhotoUrl(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro no check-out:', errorMessage, error);
      toast.error('Erro ao fazer check-out: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const exportReport = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    const totalVisits = visitHistory.length;
    const totalHours = visitHistory.reduce((sum, v) => sum + (v.duration || 0), 0) / 60;

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Visitas - ${today}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; }
    h1 { color: #0057FF; }
    .summary { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: 600; }
    .print-btn { background: #0057FF; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; margin: 20px 0; }
    @media print { .print-btn { display: none; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Imprimir Relatório</button>
  <h1>📊 Relatório de Visitas</h1>
  <p>Gerado em: ${today}</p>
  
  <div class="summary">
    <h2>Resumo</h2>
    <p><strong>Total de Visitas:</strong> ${totalVisits}</p>
    <p><strong>Horas Trabalhadas:</strong> ${totalHours.toFixed(1)}h</p>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Data</th>
        <th>Horário</th>
        <th>Cliente/Propriedade</th>
        <th>Duração</th>
        <th>Localização</th>
      </tr>
    </thead>
    <tbody>
      ${visitHistory.map(v => `
        <tr>
          <td>${new Date(v.timestamp).toLocaleDateString('pt-BR')}</td>
          <td>${new Date(v.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
          <td>${v.client || 'N/A'} - ${v.property || 'N/A'}</td>
          <td>${v.duration ? formatDuration(v.duration) : 'N/A'}</td>
          <td>${v.location.address}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <p style="text-align: center; color: #6b7280; margin-top: 40px;">
    <strong>SoloForte</strong> - Gestão de Visitas e Consultoria 🌱
  </p>
</body>
</html>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
    toast.success('Relatório gerado!');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-semibold text-lg">📍 Check-in / Check-out</h1>
            <p className="text-xs text-gray-500">Registre suas visitas às propriedades</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 flex gap-1">
        <button
          onClick={() => setSelectedTab('current')}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
            selectedTab === 'current'
              ? 'text-[#0057FF] border-[#0057FF]'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <Clock className="h-4 w-4 inline mr-2" />
          Atual
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
            selectedTab === 'history'
              ? 'text-[#0057FF] border-[#0057FF]'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <Calendar className="h-4 w-4 inline mr-2" />
          Histórico
        </button>
        <button
          onClick={() => setSelectedTab('reports')}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
            selectedTab === 'reports'
              ? 'text-[#0057FF] border-[#0057FF]'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <TrendingUp className="h-4 w-4 inline mr-2" />
          Relatórios
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth p-4 pb-32">
        {selectedTab === 'current' && (
          <div className="max-w-2xl mx-auto space-y-4">
            
            {/* Status Card */}
            {activeVisit ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-green-900">Visita em Andamento</h2>
                    <p className="text-sm text-green-700">Check-in realizado</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                {/* Timer */}
                <div className="bg-white rounded-xl p-6 mb-4 text-center">
                  <div className="text-5xl font-bold text-[#0057FF] mb-2 font-mono">
                    {formatTime(elapsedTime)}
                  </div>
                  <p className="text-sm text-gray-500">Tempo decorrido</p>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">{activeVisit.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">
                      Iniciado às {new Date(activeVisit.checkinTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">{activeVisit.client}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">{activeVisit.property}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Circle className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Nenhuma visita ativa</h2>
                    <p className="text-sm text-gray-500">Faça check-in ao chegar na propriedade</p>
                  </div>
                </div>

                {currentLocation && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-blue-900 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">Localização Atual:</span>
                    </div>
                    <p className="text-sm text-blue-700">{currentLocation.address}</p>
                  </div>
                )}
              </div>
            )}

            {/* Photo */}
            {photoUrl && (
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Foto anexada</span>
                  <button
                    onClick={() => setPhotoUrl(null)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Remover
                  </button>
                </div>
                <img
                  src={photoUrl}
                  alt="Foto"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Notes */}
            <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Observações (opcional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Área norte com problema de irrigação..."
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {!photoUrl && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoCapture}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full h-14 text-base"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Adicionar Foto (opcional)
                  </Button>
                </>
              )}

              {activeVisit ? (
                <Button
                  onClick={handleCheckOut}
                  disabled={loading}
                  className="w-full h-16 text-lg bg-red-600 hover:bg-red-700"
                >
                  {loading ? 'Processando...' : '🚪 Fazer Check-out'}
                </Button>
              ) : (
                <>
                  {/* Seleção de Produtor */}
                  <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
                    <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
                      <User className="h-4 w-4 text-[#0057FF]" />
                      Selecione o Produtor
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {PRODUTORES.map((produtor) => (
                        <button
                          key={produtor.id}
                          onClick={() => setSelectedProdutor(produtor.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedProdutor === produtor.id
                              ? 'bg-[#0057FF] text-white shadow-lg scale-[1.02]'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className={`font-medium ${selectedProdutor === produtor.id ? 'text-white' : 'text-gray-900'}`}>
                                {produtor.nome}
                              </p>
                              <p className={`text-sm ${selectedProdutor === produtor.id ? 'text-blue-100' : 'text-gray-500'}`}>
                                {produtor.fazenda}
                              </p>
                              <p className={`text-xs ${selectedProdutor === produtor.id ? 'text-blue-200' : 'text-gray-400'}`}>
                                📍 {produtor.cidade}
                              </p>
                            </div>
                            {selectedProdutor === produtor.id && (
                              <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckIn}
                    disabled={loading || !currentLocation || !selectedProdutor}
                    className="w-full h-16 text-lg bg-[#0057FF] hover:bg-[#0046CC]"
                  >
                    {loading ? 'Processando...' : '📍 Fazer Check-in'}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'history' && (
          <div className="max-w-2xl mx-auto space-y-3">
            {visitHistory.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-gray-200">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 mb-2">Nenhuma visita registrada</p>
                <p className="text-sm text-gray-400">Seus registros aparecerão aqui</p>
              </div>
            ) : (
              visitHistory.map((visit) => (
                <div key={visit.id} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {visit.client || 'Cliente'} - {visit.property || 'Propriedade'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(visit.timestamp).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    {visit.duration && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#0057FF]">
                          {formatDuration(visit.duration)}
                        </p>
                        <p className="text-xs text-gray-500">duração</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(visit.timestamp).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs">{visit.location.address}</span>
                    </div>
                    {visit.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 mt-2">
                        <p className="text-xs text-gray-700">{visit.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {selectedTab === 'reports' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">Total Visitas</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{visitHistory.length}</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Horas Total</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {(visitHistory.reduce((sum, v) => sum + (v.duration || 0), 0) / 60).toFixed(1)}h
                </p>
              </div>
            </div>

            {/* Export Button */}
            <Button
              onClick={exportReport}
              className="w-full h-14 bg-[#0057FF] hover:bg-[#0046CC]"
            >
              <Download className="h-5 w-5 mr-2" />
              Exportar Relatório Completo
            </Button>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Últimas 5 Visitas</h3>
              <div className="space-y-3">
                {visitHistory.slice(0, 5).map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(visit.timestamp).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-xs text-gray-500">{visit.client || 'Cliente'}</p>
                    </div>
                    <div className="text-right">
                      {visit.duration && (
                        <p className="text-sm font-medium text-[#0057FF]">
                          {formatDuration(visit.duration)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {visitHistory.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhuma visita registrada ainda
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}