/**
 * 📍 ADICIONAR OCORRÊNCIA - DESIGN PREMIUM MINIMALISTA
 * 
 * Formulário redesenhado com:
 * - Pins redondos estilo Apple Maps
 * - Design clean e minimalista
 * - Interface intuitiva e indicativa
 * - Hierarquia visual clara
 */

import { useState } from 'react';
import { X, Camera, MapPin, Save, AlertCircle, Plus, Check, Sparkles, Sprout, ShieldAlert, Bug, Droplets, ClipboardList } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import CameraCapture from './CameraCapture';
import { PestScanner } from './PestScanner';
import { STORAGE_KEYS } from '../utils/constants';
import type { TipoOcorrenciaType, SeveridadeType, OccurrenceMarker } from '../types';

interface AdicionarOcorrenciaProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation?: { lat: number; lng: number };
}

export default function AdicionarOcorrencia({ 
  isOpen, 
  onClose,
  currentLocation = { lat: -23.5505, lng: -46.6333 }
}: AdicionarOcorrenciaProps) {
  const [tipo, setTipo] = useState<TipoOcorrenciaType>('outros');
  const [severidade, setSeveridade] = useState<SeveridadeType>('media');
  const [severidadePercentual, setSeveridadePercentual] = useState(50);
  const [notas, setNotas] = useState('');
  const [fotos, setFotos] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showPestScanner, setShowPestScanner] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Configuração dos tipos com pins estilo Apple Maps
  const tiposOcorrencia = [
    { 
      value: 'planta-daninha', 
      label: 'Planta Daninha', 
      Icon: Sprout,
      color: '#10B981', // Verde
      bgColor: '#ECFDF5'
    },
    { 
      value: 'doencas', 
      label: 'Doenças', 
      Icon: ShieldAlert,
      color: '#EF4444', // Vermelho
      bgColor: '#FEF2F2'
    },
    { 
      value: 'inseto', 
      label: 'Inseto/Praga', 
      Icon: Bug,
      color: '#F59E0B', // Laranja
      bgColor: '#FFFBEB'
    },
    { 
      value: 'nutricional', 
      label: 'Nutricional', 
      Icon: Droplets,
      color: '#84CC16', // Lima
      bgColor: '#F7FEE7'
    },
    { 
      value: 'outros', 
      label: 'Outros', 
      Icon: ClipboardList,
      color: '#0057FF', // Azul
      bgColor: '#EFF6FF'
    }
  ] as const;

  const severidades = [
    { 
      value: 'baixa', 
      label: 'Baixa', 
      color: '#10B981',
      dot: '⬤'
    },
    { 
      value: 'media', 
      label: 'Média', 
      color: '#F59E0B',
      dot: '⬤'
    },
    { 
      value: 'alta', 
      label: 'Alta', 
      color: '#EF4444',
      dot: '⬤'
    }
  ] as const;

  const handleAddFoto = (imageDataUrl: string) => {
    setFotos([...fotos, imageDataUrl]);
    toast.success('Foto adicionada');
  };

  const handleRemoveFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
  };

  const handleSalvar = async () => {
    if (!tipo || !severidade) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    try {
      setSalvando(true);

      const novaOcorrencia: OccurrenceMarker = {
        id: Date.now().toString(),
        tipo,
        severidade,
        severidadePercentual,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        notas: notas.trim() || undefined,
        fotos: fotos.length > 0 ? fotos : undefined,
        data: new Date().toISOString(),
        status: 'ativa'
      };

      const existingMarkers = localStorage.getItem(STORAGE_KEYS.DEMO_MARKERS);
      const markers = existingMarkers ? JSON.parse(existingMarkers) : [];
      markers.push(novaOcorrencia);
      localStorage.setItem(STORAGE_KEYS.DEMO_MARKERS, JSON.stringify(markers));

      window.dispatchEvent(new CustomEvent('occurrenceAdded', { detail: novaOcorrencia }));

      toast.success('Ocorrência registrada com sucesso!');

      handleReset();
      onClose();

    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar ocorrência');
    } finally {
      setSalvando(false);
    }
  };

  const handleReset = () => {
    setTipo('outros');
    setSeveridade('media');
    setSeveridadePercentual(50);
    setNotas('');
    setFotos([]);
  };

  const handleClose = () => {
    if (notas || fotos.length > 0) {
      if (!confirm('Descartar alterações?')) return;
    }
    handleReset();
    onClose();
  };

  const tipoSelecionado = tiposOcorrencia.find(t => t.value === tipo);
  const severidadeSelecionada = severidades.find(s => s.value === severidade);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md max-h-[90vh] p-0 gap-0 overflow-hidden z-[100]">
          {/* Header Minimalista com Acessibilidade */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b-0">
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-xl text-gray-900">Nova Ocorrência</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-gray-500">
              Registre uma ocorrência identificada no campo
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-180px)]">
            <div className="px-6 pb-6 space-y-8">
              {/* Tipo de Ocorrência - Pins estilo Apple Maps */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm text-gray-900">Tipo</h3>
                  <span className="text-xs text-red-500">*</span>
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  {tiposOcorrencia.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTipo(t.value as TipoOcorrenciaType)}
                      className="flex flex-col items-center gap-2 p-2 rounded-xl transition-all"
                    >
                      {/* Pin redondo estilo Apple Maps */}
                      <div 
                        className={`
                          relative w-12 h-12 rounded-full flex items-center justify-center
                          shadow-lg transition-all
                          ${tipo === t.value 
                            ? 'scale-110 shadow-xl' 
                            : 'scale-100 hover:scale-105'
                          }
                        `}
                        style={{ 
                          backgroundColor: t.color,
                          boxShadow: tipo === t.value 
                            ? `0 4px 20px ${t.color}40, 0 0 0 3px white, 0 0 0 5px ${t.color}` 
                            : `0 2px 8px ${t.color}30`
                        }}
                      >
                        <t.Icon className="w-6 h-6 text-white filter drop-shadow-sm" />
                        
                        {/* Checkmark */}
                        {tipo === t.value && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: t.color }}>
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <span 
                        className={`
                          text-xs text-center leading-tight transition-colors
                          ${tipo === t.value ? 'font-medium' : ''}
                        `}
                        style={{ 
                          color: tipo === t.value ? t.color : '#6B7280',
                          maxWidth: '60px'
                        }}
                      >
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divisor sutil */}
              <div className="h-px bg-gray-100"></div>

              {/* Severidade - Minimalista */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm text-gray-900">Severidade</h3>
                  <span className="text-xs text-red-500">*</span>
                </div>

                <div className="flex gap-2">
                  {severidades.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => {
                        setSeveridade(s.value as SeveridadeType);
                        setSeveridadePercentual(
                          s.value === 'baixa' ? 25 : s.value === 'media' ? 50 : 75
                        );
                      }}
                      className={`
                        flex-1 px-4 py-3 rounded-xl transition-all text-sm
                        ${severidade === s.value
                          ? 'shadow-md scale-105 font-medium'
                          : 'bg-gray-50 hover:bg-gray-100'
                        }
                      `}
                      style={{
                        backgroundColor: severidade === s.value ? `${s.color}15` : undefined,
                        color: severidade === s.value ? s.color : '#6B7280',
                        borderWidth: severidade === s.value ? '2px' : '0px',
                        borderColor: severidade === s.value ? s.color : 'transparent'
                      }}
                    >
                      <span className="mr-1.5" style={{ color: s.color }}>{s.dot}</span>
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Slider de Intensidade com Gradiente */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Intensidade</span>
                    <span 
                      className="font-medium px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: severidadeSelecionada ? `${severidadeSelecionada.color}15` : '#F3F4F6',
                        color: severidadeSelecionada?.color || '#6B7280'
                      }}
                    >
                      {severidadePercentual}%
                    </span>
                  </div>
                  <div className="relative h-2">
                    {/* Track com gradiente colorido (verde → laranja → vermelho) */}
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(to right, #10B981 0%, #F59E0B 50%, #EF4444 100%)',
                        opacity: 0.3
                      }}
                    ></div>
                    
                    {/* Track preenchido com gradiente até a posição atual */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-200"
                      style={{ 
                        width: `${severidadePercentual}%`,
                        background: 'linear-gradient(to right, #10B981 0%, #F59E0B 50%, #EF4444 100%)',
                        boxShadow: `0 0 8px ${severidadeSelecionada?.color || '#0057FF'}40`
                      }}
                    ></div>
                    
                    {/* Input range invisível por cima */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={severidadePercentual}
                      onChange={(e) => setSeveridadePercentual(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {/* Thumb (bolinha) customizado com cor dinâmica baseada na posição */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-lg transition-all duration-200 pointer-events-none"
                      style={{ 
                        left: `calc(${severidadePercentual}% - 10px)`,
                        backgroundColor: 'white',
                        border: `3px solid ${
                          severidadePercentual < 33 ? '#10B981' : 
                          severidadePercentual < 66 ? '#F59E0B' : 
                          '#EF4444'
                        }`,
                        boxShadow: `0 2px 8px ${
                          severidadePercentual < 33 ? '#10B981' : 
                          severidadePercentual < 66 ? '#F59E0B' : 
                          '#EF4444'
                        }40`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Divisor sutil */}
              <div className="h-px bg-gray-100"></div>

              {/* Fotos - Minimalista com Scanner IA */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900">
                    Fotos {fotos.length > 0 && <span className="text-gray-500">({fotos.length})</span>}
                  </h3>
                </div>

                {/* Hint para Scanner IA */}
                {fotos.length === 0 && (
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <p className="text-xs text-orange-800">
                      Use o botão <strong>Scanner IA</strong> para identificar ocorrências automaticamente
                    </p>
                  </div>
                )}

                {/* Grid de Fotos com Preview */}
                {fotos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {fotos.map((foto, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={foto}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl border-2 border-gray-100"
                        />
                        {/* Overlay com botão de remover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded-xl flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveFoto(index)}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm text-red-600 rounded-full hover:bg-white hover:scale-110 transition-all flex items-center justify-center shadow-lg"
                          >
                            <X className="w-5 h-5" strokeWidth={2.5} />
                          </button>
                        </div>
                        {/* Número da foto */}
                        <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                    
                    {/* Botão adicionar mais fotos */}
                    {fotos.length < 9 && (
                      <button
                        type="button"
                        onClick={() => setShowCamera(true)}
                        className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#0057FF] hover:bg-blue-50/50 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#0057FF] group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#0057FF] flex items-center justify-center transition-colors">
                          <Camera className="w-5 h-5 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-xs">Adicionar</span>
                      </button>
                    )}
                  </div>
                ) : (
                  /* Área vazia com drag & drop visual */
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCamera(true)}
                      className="w-full p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0057FF] hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-3 group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-[#0057FF] group-hover:to-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                        <Camera className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-900 mb-1">Adicionar Fotos</p>
                        <p className="text-xs text-gray-500">
                          Tire fotos para documentar a ocorrência
                        </p>
                      </div>
                    </button>
                    
                    {/* Botão Scanner IA - Sempre visível no canto */}
                    <button
                      type="button"
                      onClick={() => setShowPestScanner(true)}
                      className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                        color: 'white'
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs">Scanner IA</span>
                    </button>
                  </div>
                )}

                {/* Indicador de limite */}
                {fotos.length > 0 && (
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{fotos.length} de 9 fotos</span>
                    {fotos.length >= 9 && (
                      <span className="text-orange-600">Limite atingido</span>
                    )}
                  </div>
                )}
              </div>

              {/* Divisor sutil */}
              <div className="h-px bg-gray-100"></div>

              {/* Observações - Minimalista */}
              <div className="space-y-3">
                <h3 className="text-sm text-gray-900">Observações</h3>
                <Textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Descreva os detalhes da ocorrência..."
                  className="min-h-[80px] resize-none border-gray-200 focus:border-gray-300 text-sm"
                />
              </div>

              {/* Localização - Card clean */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 mb-0.5">Localização GPS</div>
                  <div className="text-sm text-gray-900 font-mono">
                    {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer fixo - Minimalista */}
          <div className="px-6 py-4 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={salvando}
                className="flex-1 border-gray-200 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleSalvar}
                disabled={salvando || !tipo || !severidade}
                className="flex-1 gap-2 shadow-sm"
                style={{
                  backgroundColor: tipoSelecionado?.color || '#0057FF',
                  color: 'white'
                }}
              >
                {salvando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Câmera */}
      <CameraCapture
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleAddFoto}
      />

      {/* Modal de Scanner de Pragas com IA */}
      <Dialog open={showPestScanner} onOpenChange={setShowPestScanner}>
        <DialogContent className="max-w-full max-h-[95vh] w-[95vw] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)'
                  }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-lg text-gray-900">Identificação de Pragas com IA</DialogTitle>
                  <DialogDescription className="text-xs text-gray-500 mt-0.5">
                    Tire uma foto e deixe a IA identificar a praga automaticamente
                  </DialogDescription>
                </div>
              </div>
              <button
                onClick={() => setShowPestScanner(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(95vh-120px)] px-6">
            <PestScanner 
              className="pb-6"
              onSaveAsOccurrence={(occurrence) => {
                // Preencher dados do formulário com o diagnóstico da IA
                if (occurrence.fotos && occurrence.fotos.length > 0) {
                  setFotos(occurrence.fotos);
                }
                if (occurrence.notas) {
                  setNotas(occurrence.notas);
                }
                if (occurrence.severidade) {
                  setSeveridade(occurrence.severidade);
                }
                if (occurrence.severidadePercentual) {
                  setSeveridadePercentual(occurrence.severidadePercentual);
                }
                
                setShowPestScanner(false);
                toast.success('Dados preenchidos com diagnóstico da IA!', {
                  description: 'Revise as informações e salve a ocorrência'
                });
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}