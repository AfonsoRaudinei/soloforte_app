import { useState, useEffect } from 'react';
import { ArrowLeft, Save, FileText, Download, Edit3, Eye, Calendar, User, MapPin, Clock, FileCheck, Sparkles, AlertCircle, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { STORAGE_KEYS } from '../utils/constants';
import type { OccurrenceMarker } from '../types';

interface RelatorioEditorProps {
  relatorioId: number;
  navigate: (path: string) => void;
  onBack: () => void;
}

interface RelatorioData {
  id: number;
  tipo: string;
  titulo: string;
  cliente: string;
  data: string;
  status: string;
  duracao?: string;
  localizacao?: string;
  descricao?: string;
  observacoes?: string;
  recomendacoes?: string;
  conclusao?: string;
}

export default function RelatorioEditor({ relatorioId, navigate, onBack }: RelatorioEditorProps) {
  const [modo, setModo] = useState<'visualizar' | 'editar'>('visualizar');
  const [relatorio, setRelatorio] = useState<RelatorioData | null>(null);
  const [editando, setEditando] = useState<RelatorioData | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [pestOccurrences, setPestOccurrences] = useState<OccurrenceMarker[]>([]);

  // Carregar relatório
  useEffect(() => {
    const loadRelatorio = () => {
      const saved = localStorage.getItem('soloforte_relatorios');
      const relatorios = saved ? JSON.parse(saved) : [];
      
      const found = relatorios.find((r: any) => r.id === relatorioId);
      
      if (found) {
        setRelatorio(found);
        setEditando(found);
      } else {
        // Relatório de exemplo
        const exemplo: RelatorioData = {
          id: relatorioId,
          tipo: 'tecnico',
          titulo: 'Relatório Técnico - Fazenda Silva',
          cliente: 'João Silva',
          data: '10/10/2025',
          status: 'concluido',
          duracao: '2h 30min',
          localizacao: 'São Paulo, SP',
          descricao: 'Visita técnica realizada na Fazenda Silva para análise de solo e diagnóstico de pragas.',
          observacoes: 'Solo apresenta boa umidade. Foram identificadas 3 áreas com necessidade de correção de pH.',
          recomendacoes: '1. Aplicar calcário nas áreas identificadas\n2. Realizar nova análise em 30 dias\n3. Monitorar pragas semanalmente',
          conclusao: 'Propriedade em bom estado geral. Recomenda-se seguir o plano de correção sugerido.'
        };
        setRelatorio(exemplo);
        setEditando(exemplo);
      }
    };

    loadRelatorio();
  }, [relatorioId]);

  // Carregar ocorrências de pragas
  useEffect(() => {
    const loadPestOccurrences = () => {
      const markers = localStorage.getItem(STORAGE_KEYS.DEMO_MARKERS);
      if (markers) {
        const parsed: OccurrenceMarker[] = JSON.parse(markers);
        const pestOnly = parsed.filter(m => m.tipo === 'inseto');
        setPestOccurrences(pestOnly);
      }
    };

    loadPestOccurrences();
  }, []);

  // Salvar alterações
  const handleSalvar = async () => {
    if (!editando) return;

    setSalvando(true);

    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salvar no localStorage
      const saved = localStorage.getItem('soloforte_relatorios');
      let relatorios = saved ? JSON.parse(saved) : [];
      
      const index = relatorios.findIndex((r: any) => r.id === relatorioId);
      if (index !== -1) {
        relatorios[index] = { ...relatorios[index], ...editando };
      } else {
        relatorios.push(editando);
      }
      
      localStorage.setItem('soloforte_relatorios', JSON.stringify(relatorios));

      setRelatorio(editando);
      setModo('visualizar');

      toast.success('Relatório salvo!', {
        description: 'Todas as alterações foram salvas com sucesso.'
      });
    } catch (error) {
      toast.error('Erro ao salvar', {
        description: 'Não foi possível salvar o relatório.'
      });
    } finally {
      setSalvando(false);
    }
  };

  // Exportar relatório
  const handleExportar = () => {
    toast.success('Exportando relatório...', {
      description: 'O arquivo PDF será gerado em instantes.'
    });

    // Simular exportação
    setTimeout(() => {
      toast.success('Relatório exportado!', {
        description: 'O arquivo foi salvo na pasta de downloads.'
      });
    }, 2000);
  };

  // Alternar modo
  const toggleModo = () => {
    if (modo === 'editar') {
      // Cancelar edição - restaurar dados originais
      setEditando(relatorio);
      setModo('visualizar');
      toast.info('Edição cancelada');
    } else {
      setModo('editar');
    }
  };

  if (!relatorio || !editando) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Carregando relatório...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto scroll-smooth flex flex-col pb-32">
      {/* Header fixo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#0057FF]" />
                  <h1 className="text-gray-800">Relatório</h1>
                </div>
                <p className="text-sm text-gray-500">
                  {modo === 'editar' ? 'Editando' : 'Visualizando'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle Visualizar/Editar */}
              <Button
                variant={modo === 'editar' ? 'default' : 'outline'}
                onClick={toggleModo}
                className={modo === 'editar' ? 'bg-[#0057FF] hover:bg-[#0046CC]' : ''}
              >
                {modo === 'editar' ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Cancelar
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar
                  </>
                )}
              </Button>

              {/* Botão Salvar (apenas no modo editar) */}
              {modo === 'editar' && (
                <Button
                  onClick={handleSalvar}
                  disabled={salvando}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {salvando ? (
                    <>
                      <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </>
                  )}
                </Button>
              )}

              {/* Botão Exportar (apenas no modo visualizar) */}
              {modo === 'visualizar' && (
                <Button
                  onClick={handleExportar}
                  variant="outline"
                  className="border-[#0057FF] text-[#0057FF] hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge className={relatorio.status === 'concluido' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
              {relatorio.status === 'concluido' ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Concluído
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  Pendente
                </>
              )}
            </Badge>
            <Badge variant="outline">{relatorio.tipo === 'tecnico' ? '📄 Técnico' : relatorio.tipo === 'visita' ? '📍 Visita' : '🧠 IA'}</Badge>
          </div>
        </div>
      </div>

      {/* Conteúdo scrollável */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Informações Básicas */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="h-5 w-5 text-[#0057FF]" />
              <h2 className="text-gray-800">Informações Básicas</h2>
            </div>

            <div className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Título</label>
                {modo === 'editar' ? (
                  <Input
                    value={editando.titulo}
                    onChange={(e) => setEditando({ ...editando, titulo: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Título do relatório"
                  />
                ) : (
                  <p className="text-gray-800 p-3 bg-gray-50 rounded-xl">{relatorio.titulo}</p>
                )}
              </div>

              {/* Cliente */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Cliente/Fazenda</label>
                {modo === 'editar' ? (
                  <Input
                    value={editando.cliente}
                    onChange={(e) => setEditando({ ...editando, cliente: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Nome do cliente"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">{relatorio.cliente}</span>
                  </div>
                )}
              </div>

              {/* Data e Metadados */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Data</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">{relatorio.data}</span>
                  </div>
                </div>

                {relatorio.duracao && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Duração</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-800">{relatorio.duracao}</span>
                    </div>
                  </div>
                )}

                {relatorio.localizacao && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Localização</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-800 text-sm">{relatorio.localizacao}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Descrição */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-[#0057FF]" />
              <h2 className="text-gray-800">Descrição</h2>
            </div>

            {modo === 'editar' ? (
              <Textarea
                value={editando.descricao || ''}
                onChange={(e) => setEditando({ ...editando, descricao: e.target.value })}
                className="min-h-[120px] rounded-xl"
                placeholder="Descrição detalhada do relatório..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed p-4 bg-gray-50 rounded-xl">
                {relatorio.descricao || 'Sem descrição'}
              </p>
            )}
          </Card>

          {/* Análises de Pragas IA (se houver) */}
          {pestOccurrences.length > 0 && (
            <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-green-600" />
                <h2 className="text-gray-800">Análises de Pragas IA Incluídas</h2>
                <Badge className="bg-green-100 text-green-700 ml-auto">
                  {pestOccurrences.length} {pestOccurrences.length === 1 ? 'diagnóstico' : 'diagnósticos'}
                </Badge>
              </div>

              <div className="space-y-3">
                {pestOccurrences.slice(0, 3).map((occ, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      {occ.imageUrl && (
                        <img
                          src={occ.imageUrl}
                          alt="Praga"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-gray-800 mb-1">{occ.nome}</h4>
                        <p className="text-sm text-gray-600">{occ.descricao}</p>
                        {occ.severidade && (
                          <Badge className="mt-2" variant={occ.severidade === 'Alta' ? 'destructive' : 'default'}>
                            {occ.severidade}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {pestOccurrences.length > 3 && (
                  <p className="text-sm text-gray-600 text-center py-2">
                    + {pestOccurrences.length - 3} {pestOccurrences.length - 3 === 1 ? 'diagnóstico adicional' : 'diagnósticos adicionais'}
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Observações */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <h2 className="text-gray-800">Observações de Campo</h2>
            </div>

            {modo === 'editar' ? (
              <Textarea
                value={editando.observacoes || ''}
                onChange={(e) => setEditando({ ...editando, observacoes: e.target.value })}
                className="min-h-[120px] rounded-xl"
                placeholder="Observações importantes identificadas durante a visita..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed p-4 bg-gray-50 rounded-xl">
                {relatorio.observacoes || 'Sem observações'}
              </p>
            )}
          </Card>

          {/* Recomendações */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-[#0057FF]" />
              <h2 className="text-gray-800">Recomendações Técnicas</h2>
            </div>

            {modo === 'editar' ? (
              <Textarea
                value={editando.recomendacoes || ''}
                onChange={(e) => setEditando({ ...editando, recomendacoes: e.target.value })}
                className="min-h-[150px] rounded-xl bg-white"
                placeholder="Recomendações técnicas para o produtor..."
              />
            ) : (
              <div className="text-gray-700 leading-relaxed p-4 bg-white rounded-xl whitespace-pre-line">
                {relatorio.recomendacoes || 'Sem recomendações'}
              </div>
            )}
          </Card>

          {/* Conclusão */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <Check className="h-5 w-5 text-green-600" />
              <h2 className="text-gray-800">Conclusão</h2>
            </div>

            {modo === 'editar' ? (
              <Textarea
                value={editando.conclusao || ''}
                onChange={(e) => setEditando({ ...editando, conclusao: e.target.value })}
                className="min-h-[100px] rounded-xl bg-white"
                placeholder="Conclusão e próximos passos..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed p-4 bg-white rounded-xl">
                {relatorio.conclusao || 'Sem conclusão'}
              </p>
            )}
          </Card>

          {/* Status */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="h-5 w-5 text-[#0057FF]" />
              <h2 className="text-gray-800">Status do Relatório</h2>
            </div>

            {modo === 'editar' ? (
              <Select
                value={editando.status}
                onValueChange={(value) => setEditando({ ...editando, status: value })}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">⏳ Pendente</SelectItem>
                  <SelectItem value="concluido">✅ Concluído</SelectItem>
                  <SelectItem value="revisao">🔍 Em Revisão</SelectItem>
                  <SelectItem value="aprovado">✓ Aprovado</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center gap-2">
                <Badge className={
                  relatorio.status === 'concluido' ? 'bg-green-100 text-green-700 text-base py-2 px-4' :
                  relatorio.status === 'aprovado' ? 'bg-blue-100 text-blue-700 text-base py-2 px-4' :
                  relatorio.status === 'revisao' ? 'bg-orange-100 text-orange-700 text-base py-2 px-4' :
                  'bg-yellow-100 text-yellow-700 text-base py-2 px-4'
                }>
                  {relatorio.status === 'concluido' ? '✅ Concluído' :
                   relatorio.status === 'aprovado' ? '✓ Aprovado' :
                   relatorio.status === 'revisao' ? '🔍 Em Revisão' :
                   '⏳ Pendente'}
                </Badge>
              </div>
            )}
          </Card>

          {/* Ações finais */}
          <div className="flex items-center gap-3 pt-4 pb-8">
            {modo === 'editar' ? (
              <>
                <Button
                  onClick={handleSalvar}
                  disabled={salvando}
                  className="flex-1 h-14 bg-green-600 hover:bg-green-700 rounded-xl"
                >
                  {salvando ? (
                    <>
                      <div className="h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Salvando Alterações...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={toggleModo}
                  className="h-14 px-6 rounded-xl"
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <Button
                onClick={handleExportar}
                className="flex-1 h-14 bg-[#0057FF] hover:bg-[#0046CC] rounded-xl"
              >
                <Download className="h-5 w-5 mr-2" />
                Exportar Relatório PDF
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}