import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { Plus, FileText, Clock, Brain, Search, ChevronRight, MapPin, LogIn, Bug, Share2, ArrowLeft, Download, Filter, Calendar, TrendingUp, Eye, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useCheckIn } from '../utils/hooks/useCheckIn';
import { toast } from 'sonner@2.0.3';
import { STORAGE_KEYS } from '../utils/constants';
import Watermark from './shared/Watermark';
import type { ReportType, ReportPeriod, OccurrenceMarker } from '../types';

interface RelatoriosProps {
  navigate: (path: string) => void;
}

interface Relatorio {
  id: number;
  tipo: string;
  icone: any;
  titulo: string;
  cliente: string;
  data: string;
  status: string;
  duracao?: string;
  localizacao?: string;
}

// ✅ PERFORMANCE: Memorizar componente para evitar re-renders desnecessários
const Relatorios = memo(function Relatorios({ navigate }: RelatoriosProps) {
  const [showNewRelatorio, setShowNewRelatorio] = useState(false);
  const [filtro, setFiltro] = useState('tecnico');
  const [relatorioTipo, setRelatorioTipo] = useState('tecnico');
  const checkIn = useCheckIn();
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [pestOccurrencesCount, setPestOccurrencesCount] = useState(0);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedRelatorioForExport, setSelectedRelatorioForExport] = useState<Relatorio | null>(null);
  const [exportView, setExportView] = useState<'options' | 'html' | 'pdf'>('options');

  // Carregar contagem de ocorrências de pragas
  useEffect(() => {
    const loadPestOccurrences = () => {
      const markers = localStorage.getItem(STORAGE_KEYS.DEMO_MARKERS);
      if (markers) {
        const parsed: OccurrenceMarker[] = JSON.parse(markers);
        // Contar apenas ocorrências do tipo 'inseto' (vindas do scanner de pragas)
        const pestCount = parsed.filter(m => m.tipo === 'inseto').length;
        setPestOccurrencesCount(pestCount);
      }
    };

    loadPestOccurrences();

    // Escutar evento de nova ocorrência
    const handleOccurrenceAdded = () => {
      loadPestOccurrences();
    };

    window.addEventListener('occurrenceAdded', handleOccurrenceAdded);
    
    return () => {
      window.removeEventListener('occurrenceAdded', handleOccurrenceAdded);
    };
  }, []);

  // Carregar relatórios do localStorage + exemplos
  useEffect(() => {
    const savedRelatorios = localStorage.getItem('soloforte_relatorios');
    const parsed = savedRelatorios ? JSON.parse(savedRelatorios) : [];
    
    // Adicionar exemplos se não houver nenhum
    const exemplos = [
      {
        id: 1,
        tipo: 'tecnico',
        icone: FileText,
        titulo: 'Relatório Técnico - Fazenda Silva',
        cliente: 'João Silva',
        data: '10/10/2025',
        status: 'concluido',
      },
      {
        id: 2,
        tipo: 'visita',
        icone: LogIn,
        titulo: 'Visita - Fazenda Santos',
        cliente: 'Maria Santos',
        data: '08/10/2025',
        status: 'concluido',
        duracao: '2h 30min',
        localizacao: 'São Paulo, SP'
      },
      {
        id: 3,
        tipo: 'ia',
        icone: Brain,
        titulo: 'Análise IA - Saúde do Solo',
        cliente: 'Pedro Oliveira',
        data: '05/10/2025',
        status: 'concluido',
      },
    ];
    
    setRelatorios([...parsed, ...exemplos]);
  }, []);

  // ✅ PERFORMANCE: Memorizar relatórios filtrados
  const filtrados = useMemo(() => 
    relatorios.filter((r) => r.tipo === filtro),
    [relatorios, filtro]
  );

  // ✅ PERFORMANCE: Memorizar tabs (evita recalcular contagens)
  const tabs = useMemo(() => [
    { value: 'tecnico', label: 'Técnicos', icon: FileText, count: relatorios.filter(r => r.tipo === 'tecnico').length },
    { value: 'visita', label: 'Visitas', icon: LogIn, count: relatorios.filter(r => r.tipo === 'visita').length },
    { value: 'ia', label: 'IA', icon: Brain, count: relatorios.filter(r => r.tipo === 'ia').length },
  ], [relatorios]);
  
  // ✅ PERFORMANCE: Memorizar handlers
  const handleCreateRelatorio = useCallback(() => {
    // Se check-in estiver ativo e tipo for visita/campo, mostrar aviso
    if (checkIn.isActive && (relatorioTipo === 'visita' || relatorioTipo === 'campo')) {
      toast.info('Check-in ativo detectado!', {
        description: 'Os dados de localização e duração serão incluídos automaticamente no relatório.'
      });
    }
    
    const novoRelatorio: Relatorio = {
      id: Date.now(),
      tipo: relatorioTipo,
      icone: relatorioTipo === 'tecnico' ? FileText : relatorioTipo === 'visita' ? LogIn : Brain,
      titulo: `${relatorioTipo === 'tecnico' ? 'Relatório Técnico' : relatorioTipo === 'visita' ? 'Relatório de Visita' : 'Análise IA'} - ${new Date().toLocaleDateString('pt-BR')}`,
      cliente: 'Cliente',
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'pendente',
      ...(checkIn.isActive && {
        duracao: checkIn.formattedTime,
        localizacao: checkIn.location?.address || 'N/A'
      })
    };
    
    const novosRelatorios = [novoRelatorio, ...relatorios];
    setRelatorios(novosRelatorios);
    localStorage.setItem('soloforte_relatorios', JSON.stringify(novosRelatorios.filter(r => r.id >= 100)));
    
    toast.success('Relatório criado com sucesso!', {
      description: 'Abrindo editor...'
    });
    setShowNewRelatorio(false);
    
    // Salvar ID e navegar para o editor
    localStorage.setItem('soloforte_current_relatorio_id', novoRelatorio.id.toString());
    navigate('/relatorio-editor');
  }, [relatorioTipo, checkIn, relatorios, navigate]);

  // ✅ PERFORMANCE: Memorizar handler de abrir relatório
  const handleOpenRelatorio = useCallback((relatorioId: number) => {
    localStorage.setItem('soloforte_current_relatorio_id', relatorioId.toString());
    navigate('/relatorio-editor');
  }, [navigate]);

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col relative">
      <Watermark />
      {/* Header fixo */}
      <div className="bg-white sticky top-0 z-30">
        <div className="px-4 py-5">
          {/* Título e Subtítulo */}
          <div className="mb-4">
            <h1 className="text-gray-900">Relatórios</h1>
            <p className="text-gray-500 mt-1">Histórico e documentação</p>
          </div>

          {/* Campo de Busca */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar relatórios..."
              className="pl-10 h-11 rounded-lg bg-gray-50 border-gray-200 text-sm"
            />
          </div>

          {/* Barra de Ações com Ícones */}
          <div className="flex items-center gap-3">
            {/* Botão Documento */}
            <button 
              className="relative flex items-center justify-center h-12 w-12 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
              onClick={() => setFiltro('tecnico')}
            >
              <FileText className="h-5 w-5 text-gray-600" />
              {relatorios.filter(r => r.tipo === 'tecnico').length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-[#0057FF] text-white text-xs rounded-full flex items-center justify-center">
                  {relatorios.filter(r => r.tipo === 'tecnico').length}
                </span>
              )}
            </button>

            {/* Botão Compartilhar */}
            <button 
              className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
              onClick={() => toast.info('Função de compartilhamento em desenvolvimento')}
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>

            {/* Botão IA - Destaque */}
            <button
              className="flex items-center justify-center gap-2 h-12 flex-1 rounded-xl bg-[#0057FF] hover:bg-[#0046CC] transition-colors shadow-sm"
              onClick={() => setFiltro('ia')}
            >
              <Brain className="h-5 w-5 text-white" />
              <span className="text-white">IA</span>
            </button>

            {/* Botão Adicionar */}
            <button
              onClick={() => setShowNewRelatorio(true)}
              className="flex items-center justify-center h-12 w-12 rounded-full bg-[#0057FF] hover:bg-[#0046CC] transition-colors shadow-md"
            >
              <Plus className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Indicador de quantidade */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-2 w-2 bg-[#0057FF] rounded-full"></div>
            <span className="text-sm text-gray-500">
              {filtrados.length} {filtrados.length === 1 ? 'relatório' : 'relatórios'}
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo scrollável */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-4 pt-4">
          {/* Cards de Estatísticas e Integrações */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Card Check-In */}
            <div 
              onClick={() => navigate('/check-in')}
              className={`rounded-2xl p-4 cursor-pointer transition-all active:scale-95 ${
                checkIn.isActive 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg' 
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  checkIn.isActive ? 'bg-white/20' : 'bg-green-50'
                }`}>
                  <Clock className={`h-5 w-5 ${checkIn.isActive ? 'text-white' : 'text-green-600'}`} />
                </div>
                {checkIn.isActive && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
              <div className={checkIn.isActive ? 'text-white' : 'text-gray-900'}>
                {checkIn.isActive ? 'Ativo' : 'Check-In'}
              </div>
              <div className={`text-sm ${checkIn.isActive ? 'text-white/80' : 'text-gray-500'}`}>
                {checkIn.isActive ? checkIn.formattedTime : 'Registrar visita'}
              </div>
            </div>

            {/* Card Scanner de Pragas */}
            <div 
              onClick={() => navigate('/scanner-pragas')}
              className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all active:scale-95"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center">
                  <Bug className="h-5 w-5 text-red-600" />
                </div>
                {pestOccurrencesCount > 0 && (
                  <div className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {pestOccurrencesCount}
                  </div>
                )}
              </div>
              <div className="text-gray-900">Pragas</div>
              <div className="text-sm text-gray-500">
                {pestOccurrencesCount > 0 
                  ? `${pestOccurrencesCount} ${pestOccurrencesCount === 1 ? 'detectada' : 'detectadas'}`
                  : 'Escanear agora'
                }
              </div>
            </div>

            {/* Card Mapa/Ocorrências */}
            <div 
              onClick={() => navigate('/dashboard')}
              className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all active:scale-95"
            >
              <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-gray-900">Ocorrências</div>
              <div className="text-sm text-gray-500">Ver no mapa</div>
            </div>

            {/* Card Exportar/Compartilhar */}
            <div 
              onClick={() => {
                if (relatorios.filter(r => r.status === 'concluido').length === 0) {
                  toast.error('Nenhum relatório concluído para exportar');
                  return;
                }
                // Selecionar o primeiro relatório concluído
                const relatorio = relatorios.find(r => r.status === 'concluido');
                if (relatorio) {
                  setSelectedRelatorioForExport(relatorio);
                  setExportView('options');
                  setShowExportDialog(true);
                }
              }}
              className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all active:scale-95"
            >
              <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center mb-2">
                <Download className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-gray-900">Exportar</div>
              <div className="text-sm text-gray-500">HTML & PDF</div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-gradient-to-br from-[#0057FF] to-[#0041CC] rounded-2xl p-4 mb-6 shadow-lg">
            <div className="text-white/80 text-sm mb-2">Estatísticas do Mês</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-white text-2xl mb-1">{relatorios.length}</div>
                <div className="text-white/70 text-xs">Total</div>
              </div>
              <div>
                <div className="text-white text-2xl mb-1">
                  {relatorios.filter(r => r.status === 'concluido').length}
                </div>
                <div className="text-white/70 text-xs">Concluídos</div>
              </div>
              <div>
                <div className="text-white text-2xl mb-1">
                  {relatorios.filter(r => r.status === 'pendente').length}
                </div>
                <div className="text-white/70 text-xs">Pendentes</div>
              </div>
            </div>
          </div>

          {/* Lista de Relatórios */}
          <div className="space-y-3">
            {filtrados.map((relatorio) => (
              <div
                key={relatorio.id}
                onClick={() => handleOpenRelatorio(relatorio.id)}
                className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 cursor-pointer group active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  {/* Ícone */}
                  <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <relatorio.icone className="h-5 w-5 text-[#0057FF]" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 mb-1">
                      {relatorio.titulo}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span className="truncate">{relatorio.cliente}</span>
                      <span>•</span>
                      <span>{relatorio.data}</span>
                    </div>
                    
                    {/* Status */}
                    <div>
                      {relatorio.status === 'concluido' ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          ✓ Concluído
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-yellow-600">
                          ⏳ Pendente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Seta */}
                  <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>

          {filtrados.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mb-3">
                <FileText className="h-8 w-8 text-gray-300" />
              </div>
              <p className="text-gray-500 mb-1">Nenhum relatório encontrado</p>
              <p className="text-gray-400 text-sm">
                Crie seu primeiro relatório clicando no botão +
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Botão Voltar - Fixo no canto inferior direito */}
      <button
        onClick={() => navigate('/dashboard')}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 bg-[#0057FF] hover:bg-[#0046CC] rounded-full shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>

      {/* Dialog Novo Relatório */}
      <Dialog open={showNewRelatorio} onOpenChange={setShowNewRelatorio}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Relatório</DialogTitle>
            <DialogDescription>
              Crie um novo relatório técnico, histórico de campo ou análise para seus clientes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Aviso de check-in ativo */}
            {checkIn.isActive && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-medium text-green-900 mb-1">Check-in ativo detectado!</p>
                    <p className="text-sm text-green-700 mb-2">
                      Duração: {checkIn.formattedTime}
                    </p>
                    <p className="text-xs text-green-600">
                      Os dados de localização e duração serão incluídos automaticamente no relatório.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label className="block mb-2 text-gray-700">Tipo de Relatório</label>
              <Select value={relatorioTipo} onValueChange={setRelatorioTipo}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnico">📄 Relatório Técnico</SelectItem>
                  <SelectItem value="visita">📍 Relatório de Visita</SelectItem>
                  <SelectItem value="ia">🧠 Análise IA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Título</label>
              <Input className="h-12 rounded-xl" placeholder="Nome do relatório" />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Cliente</label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silva">Fazenda Silva</SelectItem>
                  <SelectItem value="santos">Fazenda Santos</SelectItem>
                  <SelectItem value="oliveira">Fazenda Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Descrição</label>
              <Textarea
                placeholder="Descreva o relatório..."
                className="min-h-[120px] rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Data</label>
              <Input type="date" className="h-12 rounded-xl" />
            </div>

            <Button 
              onClick={handleCreateRelatorio}
              className="w-full h-12 bg-[#0057FF] hover:bg-[#0046CC] rounded-xl"
            >
              Criar Relatório
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Exportar/Compartilhar */}
      <Dialog open={showExportDialog} onOpenChange={(open) => {
        setShowExportDialog(open);
        if (!open) setExportView('options');
      }}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {exportView === 'options' && 'Exportar Relatório'}
              {exportView === 'html' && 'Preview HTML'}
              {exportView === 'pdf' && 'Baixar PDF'}
            </DialogTitle>
            <DialogDescription>
              {exportView === 'options' && 'Escolha como deseja visualizar ou exportar'}
              {exportView === 'html' && 'Visualize o relatório antes de exportar'}
              {exportView === 'pdf' && 'Download do relatório em PDF'}
            </DialogDescription>
          </DialogHeader>

          {/* Tela de Opções */}
          {exportView === 'options' && selectedRelatorioForExport && (
            <div className="space-y-3 py-4">
              {/* Info do relatório */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-500 mb-1">Relatório selecionado</div>
                <div className="text-gray-900">{selectedRelatorioForExport.titulo}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {selectedRelatorioForExport.cliente} • {selectedRelatorioForExport.data}
                </div>
              </div>

              {/* Opções de Exportação */}
              <div className="space-y-2">
                {/* Visualizar HTML */}
                <button
                  onClick={() => setExportView('html')}
                  className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-200 hover:border-[#0057FF] rounded-xl transition-all active:scale-[0.98]"
                >
                  <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="h-6 w-6 text-[#0057FF]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900 mb-1">Visualizar HTML</div>
                    <div className="text-sm text-gray-500">Preview completo do relatório</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>

                {/* Baixar PDF */}
                <button
                  onClick={() => {
                    toast.success('📥 Download iniciado', {
                      description: `${selectedRelatorioForExport.titulo}.pdf`
                    });
                    setShowExportDialog(false);
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-200 hover:border-purple-500 rounded-xl transition-all active:scale-[0.98]"
                >
                  <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Download className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900 mb-1">Baixar PDF</div>
                    <div className="text-sm text-gray-500">Download direto em PDF</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>

                {/* Enviar por Email */}
                <button
                  onClick={() => {
                    toast.success('📧 Email', {
                      description: 'Funcionalidade em desenvolvimento'
                    });
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl transition-all active:scale-[0.98]"
                >
                  <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900 mb-1">Enviar por Email</div>
                    <div className="text-sm text-gray-500">Compartilhar via email</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          )}

          {/* Tela de Preview HTML */}
          {exportView === 'html' && selectedRelatorioForExport && (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Preview do Relatório em HTML */}
              <div className="flex-1 overflow-y-auto bg-white border rounded-xl p-6 my-4">
                {/* Header do Relatório */}
                <div className="border-b-2 border-[#0057FF] pb-4 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-[#0057FF] rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">SoloForte Agro-Tech</div>
                      <div className="text-gray-900">Relatório Profissional</div>
                    </div>
                  </div>
                  <h1 className="text-gray-900 text-xl mb-2">{selectedRelatorioForExport.titulo}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📅 {selectedRelatorioForExport.data}</span>
                    <span>👤 {selectedRelatorioForExport.cliente}</span>
                  </div>
                </div>

                {/* Conteúdo do Relatório */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-gray-900 mb-2">Resumo Executivo</h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Este relatório apresenta uma análise detalhada das condições da propriedade,
                      incluindo observações de campo, análises técnicas e recomendações específicas
                      para otimização da produção agrícola.
                    </p>
                  </div>

                  {selectedRelatorioForExport.duracao && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-sm text-green-900">⏱️ Duração: {selectedRelatorioForExport.duracao}</div>
                      {selectedRelatorioForExport.localizacao && (
                        <div className="text-sm text-green-700 mt-1">📍 {selectedRelatorioForExport.localizacao}</div>
                      )}
                    </div>
                  )}

                  <div>
                    <h2 className="text-gray-900 mb-2">Observações de Campo</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Condições climáticas favoráveis durante a visita</li>
                      <li>Solo com boa drenagem e estrutura adequada</li>
                      <li>Identificação de áreas com potencial de melhoria</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-gray-900 mb-2">Recomendações</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-900">
                        ✓ Implementar sistema de irrigação complementar<br/>
                        ✓ Realizar análise de solo semestral<br/>
                        ✓ Monitorar indicadores de pragas regularmente
                      </p>
                    </div>
                  </div>

                  {/* Rodapé */}
                  <div className="border-t pt-4 mt-6">
                    <div className="text-xs text-gray-400 text-center">
                      Relatório gerado por SoloForte • {new Date().toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => setExportView('options')}
                  variant="outline"
                  className="flex-1 h-11 rounded-xl"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => {
                    toast.success('📥 Download PDF', {
                      description: 'Gerando arquivo...'
                    });
                    setShowExportDialog(false);
                  }}
                  className="flex-1 h-11 bg-[#0057FF] hover:bg-[#0046CC] rounded-xl"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default Relatorios;