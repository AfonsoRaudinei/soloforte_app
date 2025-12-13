/**
 * 🐛 SCANNER DE PRAGAS - SOLOFORTE
 * 
 * Sistema completo de identificação de pragas com IA:
 * - Interface intuitiva para captura de fotos
 * - Análise com GPT-4 Vision
 * - Resultados detalhados
 * - Histórico de diagnósticos
 * - Recomendações de tratamento
 */

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { Camera, Upload, Zap, Bug, AlertTriangle, CheckCircle, Clock, Trash2, Eye, MapPin, Leaf, FileText, Save } from 'lucide-react';
import { usePestScanner, type PestDiagnosis, type Treatment } from '../utils/hooks/usePestScanner';
import { toast } from 'sonner@2.0.3';
import { convertPestDiagnosisToOccurrence, canConvertToOccurrence, getDiagnosisSummary } from '../utils/pestToOccurrence';
import { STORAGE_KEYS } from '../utils/constants';

// ===================================
// TIPOS LOCAIS
// ===================================

interface PestScannerProps {
  className?: string;
  onSaveAsOccurrence?: (occurrence: any) => void; // Callback opcional para salvar como ocorrência
}

// ===================================
// COMPONENTE PRINCIPAL
// ===================================

export function PestScanner({ className = '', onSaveAsOccurrence }: PestScannerProps) {
  console.log('🐛 PestScanner: Componente montado');
  
  const {
    diagnoses,
    isAnalyzing,
    currentDiagnosis,
    scanImage,
    deleteDiagnosis,
    clearHistory,
    getStats,
    setCurrentDiagnosis,
  } = usePestScanner();

  console.log('🐛 PestScanner: Hook executado', { 
    diagnosesCount: diagnoses.length, 
    isAnalyzing, 
    hasCurrentDiagnosis: !!currentDiagnosis 
  });

  const [scanOptions, setScanOptions] = useState({
    cropType: '',
    location: '',
    farmName: '',
    additionalInfo: '',
  });
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('scan');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = getStats();
  
  console.log('🐛 PestScanner: Stats calculadas', stats);

  // ===================================
  // HANDLERS DE CAPTURA
  // ===================================

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error('Imagem muito grande. Máximo 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) {
      toast.error('Selecione uma imagem primeiro');
      return;
    }

    try {
      const fileName = `pest_scan_${Date.now()}.jpg`;
      const diagnosis = await scanImage(selectedImage, fileName, scanOptions);
      
      setActiveTab('result');
      setSelectedImage(null);
      
      // Limpar formulário
      setScanOptions({
        cropType: '',
        location: '',
        farmName: '',
        additionalInfo: '',
      });

    } catch (error) {
      console.error('Erro na análise:', error);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ===================================
  // COMPONENTES AUXILIARES
  // ===================================

  const SeverityBadge = ({ severity }: { severity: string }) => {
    const variants = {
      baixa: 'bg-green-100 text-green-800 border-green-200',
      média: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      alta: 'bg-orange-100 text-orange-800 border-orange-200',
      crítica: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
      <Badge className={variants[severity as keyof typeof variants] || variants.média}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const TreatmentCard = ({ treatment }: { treatment: Treatment }) => {
    const typeIcons = {
      químico: '🧪',
      biológico: '🌱',
      cultural: '🚜',
      mecânico: '⚙️',
    };

    return (
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{typeIcons[treatment.type]}</span>
            <h4 className="font-semibold">{treatment.name}</h4>
            <Badge variant="outline" className="ml-auto">
              Prioridade {treatment.priority}
            </Badge>
          </div>
          
          {treatment.activeIngredient && (
            <p className="text-sm text-gray-600 mb-1">
              <strong>Princípio ativo:</strong> {treatment.activeIngredient}
            </p>
          )}
          
          {treatment.dosage && (
            <p className="text-sm text-gray-600 mb-1">
              <strong>Dosagem:</strong> {treatment.dosage}
            </p>
          )}
          
          {treatment.applicationMethod && (
            <p className="text-sm text-gray-600 mb-1">
              <strong>Aplicação:</strong> {treatment.applicationMethod}
            </p>
          )}
          
          {treatment.waitingPeriod && (
            <p className="text-sm text-orange-600 mb-1">
              <strong>Carência:</strong> {treatment.waitingPeriod}
            </p>
          )}
          
          {treatment.notes && (
            <p className="text-sm text-blue-600 mt-2">
              💡 {treatment.notes}
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  const DiagnosisCard = ({ diagnosis }: { diagnosis: PestDiagnosis }) => {
    const statusIcons = {
      analyzing: <Clock className="w-4 h-4 text-yellow-500 animate-spin" />,
      completed: <CheckCircle className="w-4 h-4 text-green-500" />,
      error: <AlertTriangle className="w-4 h-4 text-red-500" />,
    };

    return (
      <Card className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setCurrentDiagnosis(diagnosis)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <img 
              src={diagnosis.imageUrl} 
              alt={diagnosis.imageName}
              className="w-16 h-16 object-cover rounded-lg"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {statusIcons[diagnosis.status]}
                <span className="text-sm text-gray-500">
                  {new Date(diagnosis.timestamp).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              {diagnosis.status === 'completed' && (
                <>
                  <h4 className="font-semibold truncate">{diagnosis.pestName}</h4>
                  <p className="text-sm text-gray-600 truncate">
                    {diagnosis.pestScientificName}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <SeverityBadge severity={diagnosis.severity || 'média'} />
                    <span className="text-sm text-blue-600">
                      {diagnosis.confidence}% confiança
                    </span>
                  </div>
                </>
              )}
              
              {diagnosis.status === 'analyzing' && (
                <p className="text-blue-600">Analisando imagem...</p>
              )}
              
              {diagnosis.status === 'error' && (
                <p className="text-red-600">Erro na análise</p>
              )}
              
              {diagnosis.location && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{diagnosis.location}</span>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteDiagnosis(diagnosis.id);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // ===================================
  // RENDER PRINCIPAL
  // ===================================

  return (
    <div className={`w-full mx-auto space-y-6 ${className}`}>
      {/* Header com Estatísticas */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Bug className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl text-green-800">
                Scanner de Pragas IA
              </CardTitle>
              <p className="text-green-600">
                Identificação inteligente de pragas agrícolas
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Diagnósticos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.avgConfidence}%</div>
              <div className="text-sm text-gray-600">Confiança Média</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.severityCounts.alta + stats.severityCounts.crítica}
              </div>
              <div className="text-sm text-gray-600">Casos Severos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.totalAnalyzing}</div>
              <div className="text-sm text-gray-600">Analisando</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Escanear
          </TabsTrigger>
          <TabsTrigger value="result" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Resultado
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Análises
          </TabsTrigger>
        </TabsList>

        {/* ABA: ESCANEAR */}
        <TabsContent value="scan" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              {/* Upload de Imagem */}
              <div className="space-y-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {!selectedImage ? (
                  <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center">
                    {/* Ícone de Câmera Grande no Centro */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative flex flex-col items-center justify-center"
                    >
                      {/* Círculo externo animado */}
                      <div className="absolute inset-0 rounded-full bg-[#0057FF]/20 animate-ping opacity-75"></div>
                      
                      {/* Botão principal */}
                      <div className="relative h-32 w-32 bg-[#0057FF] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#0046CC]">
                        <Camera className="h-16 w-16 text-white" />
                      </div>
                      
                      {/* Texto abaixo do botão */}
                      <div className="mt-6 text-center">
                        <p className="text-gray-800 mb-1">
                          Fotografar Praga
                        </p>
                        <p className="text-sm text-gray-500">
                          Toque para capturar
                        </p>
                      </div>
                    </button>
                    
                    {/* Dica visual */}
                    <div className="mt-8 flex items-center gap-2 text-xs text-gray-500 bg-white/60 px-4 py-2 rounded-full">
                      <Bug className="h-4 w-4" />
                      <span>Capture uma foto clara da praga</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0">
                    <div className="relative bg-black rounded-t-2xl">
                      <img
                        src={selectedImage}
                        alt="Imagem selecionada"
                        className="w-full h-auto mx-auto"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                        onClick={handleClearImage}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações Adicionais */}
              {selectedImage && (
                <div className="p-4 space-y-4 bg-gray-50 rounded-b-2xl">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Cultura
                    </label>
                    <select
                      value={scanOptions.cropType}
                      onChange={(e) => setScanOptions(prev => ({ ...prev, cropType: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
                    >
                      <option value="">Selecione a cultura</option>
                      <option value="soja">Soja</option>
                      <option value="milho">Milho</option>
                      <option value="algodao">Algodão</option>
                      <option value="feijao">Feijão</option>
                      <option value="cafe">Café</option>
                      <option value="cana">Cana-de-açúcar</option>
                      <option value="trigo">Trigo</option>
                      <option value="outro">Outra</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Localização
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Fazenda São João, MT"
                      value={scanOptions.location}
                      onChange={(e) => setScanOptions(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Nome da Fazenda
                    </label>
                    <input
                      type="text"
                      placeholder="Nome da propriedade"
                      value={scanOptions.farmName}
                      onChange={(e) => setScanOptions(prev => ({ ...prev, farmName: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Informações Extras
                    </label>
                    <input
                      type="text"
                      placeholder="Sintomas observados, etc."
                      value={scanOptions.additionalInfo}
                      onChange={(e) => setScanOptions(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
                    />
                  </div>

                  {/* Botão de Análise */}
                  <Button
                    onClick={handleAnalyzeImage}
                    disabled={isAnalyzing}
                    className="w-full h-14 bg-[#0057FF] hover:bg-[#0046CC] rounded-xl text-base mt-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Analisando com IA...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Analisar Praga
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA: RESULTADO */}
        <TabsContent value="result">
          {currentDiagnosis ? (
            <div className="space-y-6">
              {/* Resultado Principal */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bug className="w-5 h-5" />
                      Diagnóstico da Praga
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <SeverityBadge severity={currentDiagnosis.severity || 'média'} />
                      <Badge variant="outline">
                        {currentDiagnosis.confidence}% confiança
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Imagem */}
                    <div>
                      <img
                        src={currentDiagnosis.imageUrl}
                        alt={currentDiagnosis.imageName}
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>

                    {/* Informações */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {currentDiagnosis.pestName}
                        </h3>
                        <p className="text-gray-600 italic">
                          {currentDiagnosis.pestScientificName}
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Descrição</h4>
                        <p className="text-blue-700 text-sm">
                          {currentDiagnosis.description}
                        </p>
                      </div>

                      {/* Metadados */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {currentDiagnosis.cropType && (
                          <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-green-500" />
                            <span>{currentDiagnosis.cropType}</span>
                          </div>
                        )}
                        {currentDiagnosis.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>{currentDiagnosis.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tratamentos */}
              {currentDiagnosis.treatments && currentDiagnosis.treatments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tratamentos Recomendados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {currentDiagnosis.treatments.map((treatment, index) => (
                        <TreatmentCard key={index} treatment={treatment} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Medidas Preventivas */}
              {currentDiagnosis.preventiveMeasures && currentDiagnosis.preventiveMeasures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Medidas Preventivas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentDiagnosis.preventiveMeasures.map((measure, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Práticas Culturais */}
              {currentDiagnosis.culturalPractices && currentDiagnosis.culturalPractices.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Práticas Culturais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentDiagnosis.culturalPractices.map((practice, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Leaf className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Botão Salvar como Ocorrência Técnica */}
              {canConvertToOccurrence(currentDiagnosis) && (
                <Card className="border-2 border-[#0057FF] bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#0057FF] rounded-full">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Salvar no Relatório de Produtor
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Registre este diagnóstico como ocorrência técnica. Ele será adicionado ao mapa
                          e incluído automaticamente nos relatórios de produtor com todas as recomendações de tratamento.
                        </p>
                        <Button
                          onClick={() => {
                            const occurrence = convertPestDiagnosisToOccurrence(currentDiagnosis);
                            
                            // Salvar no localStorage (modo demo)
                            const currentMarkers = JSON.parse(localStorage.getItem(STORAGE_KEYS.DEMO_MARKERS) || '[]');
                            currentMarkers.push(occurrence);
                            localStorage.setItem(STORAGE_KEYS.DEMO_MARKERS, JSON.stringify(currentMarkers));
                            
                            // 🔔 Disparar evento para atualizar Dashboard
                            window.dispatchEvent(new Event('occurrenceAdded'));
                            
                            // Chamar callback se fornecido
                            if (onSaveAsOccurrence) {
                              onSaveAsOccurrence(occurrence);
                            }
                            
                            toast.success('✅ Diagnóstico salvo no relatório!', {
                              description: `${getDiagnosisSummary(currentDiagnosis)} • Visível no mapa e relatórios`,
                              duration: 5000,
                            });
                          }}
                          className="w-full bg-[#0057FF] hover:bg-[#0046CC] shadow-md"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salvar no Relatório
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bug className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Nenhum diagnóstico selecionado
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Escaneie uma imagem ou selecione um diagnóstico do histórico
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ABA: HISTÓRICO */}
        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Histórico de Diagnósticos ({diagnoses.length})
            </h3>
            {diagnoses.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearHistory}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Histórico
              </Button>
            )}
          </div>

          {diagnoses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum diagnóstico ainda</p>
                <p className="text-sm text-gray-500 mt-2">
                  Seus diagnósticos aparecerão aqui
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {diagnoses.map((diagnosis) => (
                  <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        {/* ABA: ESTATÍSTICAS */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Severidade */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Severidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.severityCounts).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SeverityBadge severity={severity} />
                        <span className="capitalize">{severity}</span>
                      </div>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pragas Mais Comuns */}
            <Card>
              <CardHeader>
                <CardTitle>Pragas Mais Identificadas</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.mostCommonPests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Dados insuficientes
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats.mostCommonPests.map((pest, index) => (
                      <div key={pest.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🐛</span>
                          <span className="truncate">{pest.name}</span>
                        </div>
                        <Badge variant="outline">{pest.count}x</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Alertas de Status */}
          <div className="space-y-4">
            {stats.totalErrors > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {stats.totalErrors} diagnóstico(s) com erro. Verifique a qualidade das imagens.
                </AlertDescription>
              </Alert>
            )}

            {stats.totalAnalyzing > 0 && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <Clock className="w-4 h-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  {stats.totalAnalyzing} diagnóstico(s) em análise.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PestScanner;