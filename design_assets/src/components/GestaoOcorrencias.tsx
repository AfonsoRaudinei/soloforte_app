/**
 * 📋 GESTÃO DE OCORRÊNCIAS - SOLOFORTE
 * 
 * Interface completa para gerenciar ocorrências registradas:
 * - Visualizar lista de ocorrências
 * - Filtrar por tipo, severidade, status
 * - Editar e excluir ocorrências
 * - Adicionar follow-ups
 * - Exportar dados
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, MapPin, Calendar, Filter, Search, Trash2, Edit, Eye, Plus, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { STORAGE_KEYS } from '../utils/constants';
import AdicionarOcorrencia from './AdicionarOcorrencia';
import type { OccurrenceMarker, TipoOcorrenciaType, SeveridadeType } from '../types';

interface GestaoOcorrenciasProps {
  navigate: (path: string) => void;
}

export default function GestaoOcorrencias({ navigate }: GestaoOcorrenciasProps) {
  const [ocorrencias, setOcorrencias] = useState<OccurrenceMarker[]>([]);
  const [filteredOcorrencias, setFilteredOcorrencias] = useState<OccurrenceMarker[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTipo, setFilterTipo] = useState<TipoOcorrenciaType | 'todas'>('todas');
  const [filterSeveridade, setFilterSeveridade] = useState<SeveridadeType | 'todas'>('todas');
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<OccurrenceMarker | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAdicionarOcorrencia, setShowAdicionarOcorrencia] = useState(false);

  // Carregar ocorrências
  useEffect(() => {
    loadOcorrencias();

    // Escutar evento de nova ocorrência
    const handleOccurrenceAdded = () => {
      loadOcorrencias();
    };

    window.addEventListener('occurrenceAdded', handleOccurrenceAdded);
    
    return () => {
      window.removeEventListener('occurrenceAdded', handleOccurrenceAdded);
    };
  }, []);

  // Filtrar ocorrências
  useEffect(() => {
    let filtered = [...ocorrencias];

    // Filtro de busca
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.notas?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.produtorNome?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.fazenda?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro de tipo
    if (filterTipo !== 'todas') {
      filtered = filtered.filter(o => o.tipo === filterTipo);
    }

    // Filtro de severidade
    if (filterSeveridade !== 'todas') {
      filtered = filtered.filter(o => o.severidade === filterSeveridade);
    }

    setFilteredOcorrencias(filtered);
  }, [ocorrencias, searchQuery, filterTipo, filterSeveridade]);

  const loadOcorrencias = () => {
    const markersData = localStorage.getItem(STORAGE_KEYS.DEMO_MARKERS);
    if (markersData) {
      const parsed: OccurrenceMarker[] = JSON.parse(markersData);
      setOcorrencias(parsed.reverse()); // Mais recentes primeiro
    }
  };

  const handleDeleteOcorrencia = (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta ocorrência?')) return;

    const updated = ocorrencias.filter(o => o.id !== id);
    localStorage.setItem(STORAGE_KEYS.DEMO_MARKERS, JSON.stringify(updated));
    setOcorrencias(updated);
    setShowDetails(false);
    toast.success('Ocorrência excluída com sucesso');
    window.dispatchEvent(new CustomEvent('occurrenceAdded'));
  };

  const getIconForTipo = (tipo: TipoOcorrenciaType) => {
    const icons = {
      'planta-daninha': '🌿',
      'doencas': '🦠',
      'inseto': '🐛',
      'nutricional': '🌱',
      'outros': '📋'
    };
    return icons[tipo] || '📋';
  };

  const getSeveridadeColor = (severidade: SeveridadeType) => {
    const colors = {
      'baixa': 'bg-green-100 text-green-800 border-green-200',
      'media': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'alta': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[severidade] || colors.media;
  };

  const getTipoLabel = (tipo: TipoOcorrenciaType) => {
    const labels = {
      'planta-daninha': 'Planta Daninha',
      'doencas': 'Doenças',
      'inseto': 'Inseto',
      'nutricional': 'Nutricional',
      'outros': 'Outros'
    };
    return labels[tipo] || 'Outros';
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div>
                <h1 className="text-xl text-gray-900">Gestão de Ocorrências</h1>
                <p className="text-sm text-gray-600">{ocorrencias.length} registros</p>
              </div>
            </div>

            <Button
              onClick={() => setShowAdicionarOcorrencia(true)}
              className="bg-[#0057FF] hover:bg-[#0046CC] gap-2"
            >
              <Camera className="w-4 h-4" />
              Nova Ocorrência
            </Button>
          </div>

          {/* Busca e Filtros */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por notas, produtor, fazenda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="todas">Todos os tipos</option>
                <option value="planta-daninha">🌿 Planta Daninha</option>
                <option value="doencas">🦠 Doenças</option>
                <option value="inseto">🐛 Inseto</option>
                <option value="nutricional">🌱 Nutricional</option>
                <option value="outros">📋 Outros</option>
              </select>

              <select
                value={filterSeveridade}
                onChange={(e) => setFilterSeveridade(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="todas">Todas severidades</option>
                <option value="baixa">🟢 Baixa</option>
                <option value="media">🟡 Média</option>
                <option value="alta">🔴 Alta</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Ocorrências */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3 pb-24">
          {filteredOcorrencias.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-gray-600 mb-1">Nenhuma ocorrência encontrada</p>
                <p className="text-sm text-gray-500">
                  {searchQuery || filterTipo !== 'todas' || filterSeveridade !== 'todas'
                    ? 'Tente ajustar os filtros'
                    : 'Registre uma nova ocorrência para começar'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOcorrencias.map((ocorrencia) => (
              <Card
                key={ocorrencia.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedOcorrencia(ocorrencia);
                  setShowDetails(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Ícone do Tipo */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                        {getIconForTipo(ocorrencia.tipo)}
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 truncate">
                            {getTipoLabel(ocorrencia.tipo)}
                          </h3>
                          {ocorrencia.notas && (
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {ocorrencia.notas}
                            </p>
                          )}
                        </div>
                        <Badge className={getSeveridadeColor(ocorrencia.severidade)}>
                          {ocorrencia.severidade}
                        </Badge>
                      </div>

                      {/* Metadados */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        {ocorrencia.data && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(ocorrencia.data).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {ocorrencia.lat.toFixed(4)}, {ocorrencia.lng.toFixed(4)}
                        </div>
                        {ocorrencia.fotos && ocorrencia.fotos.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            {ocorrencia.fotos.length} foto{ocorrencia.fotos.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Modal de Detalhes */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedOcorrencia && getIconForTipo(selectedOcorrencia.tipo)}</span>
              Detalhes da Ocorrência
            </DialogTitle>
            <DialogDescription className="sr-only">
              Visualize e edite informações detalhadas sobre esta ocorrência
            </DialogDescription>
          </DialogHeader>

          {selectedOcorrencia && (
            <div className="space-y-6">
              {/* Tipo e Severidade */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-1 block">Tipo</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    {getTipoLabel(selectedOcorrencia.tipo)}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-1 block">Severidade</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <Badge className={getSeveridadeColor(selectedOcorrencia.severidade)}>
                      {selectedOcorrencia.severidade}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Localização */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Localização</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {selectedOcorrencia.lat.toFixed(6)}, {selectedOcorrencia.lng.toFixed(6)}
                  </span>
                </div>
              </div>

              {/* Notas */}
              {selectedOcorrencia.notas && (
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Notas</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm">
                    {selectedOcorrencia.notas}
                  </div>
                </div>
              )}

              {/* Fotos */}
              {selectedOcorrencia.fotos && selectedOcorrencia.fotos.length > 0 && (
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">
                    Fotos ({selectedOcorrencia.fotos.length})
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedOcorrencia.fotos.map((foto, index) => (
                      <img
                        key={index}
                        src={foto}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Data */}
              {selectedOcorrencia.data && (
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Data de Registro</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {new Date(selectedOcorrencia.data).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              )}

              {/* Ações */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    // Implementar edição
                    toast.info('Função de edição em desenvolvimento');
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteOcorrencia(selectedOcorrencia.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Adicionar Ocorrência */}
      <AdicionarOcorrencia
        isOpen={showAdicionarOcorrencia}
        onClose={() => {
          setShowAdicionarOcorrencia(false);
          loadOcorrencias(); // Recarregar lista
        }}
        currentLocation={{ lat: -23.5505, lng: -46.6333 }}
      />
    </div>
  );
}
