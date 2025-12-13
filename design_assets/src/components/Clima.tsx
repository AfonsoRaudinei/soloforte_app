import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { Cloud, Droplets, Wind, Sun, ArrowLeft, Share2, Copy, MapPin, Navigation, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';

interface ClimaProps {
  navigate: (path: string) => void;
}

// 🔥 VERSÃO VISUAL PURA - SEM LÓGICA, SEM LOOPS
// Dados mockados inline
const MOCK_DATA = {
  atual: {
    temp: 28,
    sensacao: 30,
    description: 'Parcialmente nublado',
    humidity: 65,
    windSpeed: 15,
    pressure: 1013,
  },
  previsao: [
    { dia: 'Seg', temp: 29, icon: '☀️', chuva: 10 },
    { dia: 'Ter', temp: 27, icon: '⛅', chuva: 30 },
    { dia: 'Qua', temp: 25, icon: '🌧️', chuva: 70 },
    { dia: 'Qui', temp: 26, icon: '⛅', chuva: 40 },
    { dia: 'Sex', temp: 28, icon: '☀️', chuva: 20 },
  ],
};

export default function Clima({ navigate }: ClimaProps) {
  const [cidade, setCidade] = useState('São Paulo, SP');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Lista de cidades brasileiras mais comuns
  const cidadesSugeridas = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Brasília, DF',
    'Salvador, BA',
    'Fortaleza, CE',
    'Belo Horizonte, MG',
    'Manaus, AM',
    'Curitiba, PR',
    'Recife, PE',
    'Porto Alegre, RS',
    'Goiânia, GO',
    'Belém, PA',
    'Guarulhos, SP',
    'Campinas, SP',
    'São Luís, MA',
  ];

  // Filtrar cidades pela busca
  const cidadesFiltradas = searchQuery
    ? cidadesSugeridas.filter(c => 
        c.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cidadesSugeridas;

  // 📍 Detectar localização atual via GPS
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('❌ GPS não disponível', {
        description: 'Seu dispositivo não suporta geolocalização'
      });
      return;
    }

    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        
        // Mock: converter coordenadas em nome de cidade
        // Em produção, usar API de geocoding reverso
        setCidade(`Localização Atual (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`);
        setLocationModalOpen(false);
        
        toast.success('📍 Localização detectada!', {
          description: 'Buscando previsão para sua localização'
        });
      },
      (error) => {
        setIsLocating(false);
        console.error('Erro ao obter localização:', error);
        
        if (error.code === error.PERMISSION_DENIED) {
          toast.error('❌ Permissão negada', {
            description: 'Ative a localização nas configurações'
          });
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          toast.error('❌ Localização indisponível', {
            description: 'Não foi possível obter sua localização'
          });
        } else if (error.code === error.TIMEOUT) {
          toast.error('❌ Tempo esgotado', {
            description: 'Tente novamente'
          });
        } else {
          toast.error('❌ Erro ao obter localização');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Selecionar cidade da lista
  const handleSelectCity = (city: string) => {
    setCidade(city);
    setLocationModalOpen(false);
    setSearchQuery('');
    toast.success('📍 Cidade alterada', {
      description: `Mostrando clima de ${city}`
    });
  };

  // 📋 Copiar dados para área de transferência  
  const handleCopyToClipboard = async () => {
    const text = `
🌤️ PREVISÃO DO TEMPO - ${cidade}
Gerado via SoloForte

📍 AGORA:
Temperatura: ${MOCK_DATA.atual.temp}°C
Sensação térmica: ${MOCK_DATA.atual.sensacao}°C
Condição: ${MOCK_DATA.atual.description}
Umidade: ${MOCK_DATA.atual.humidity}%
Vento: ${MOCK_DATA.atual.windSpeed} km/h
Pressão: ${MOCK_DATA.atual.pressure} hPa

📅 PRÓXIMOS 5 DIAS:
${MOCK_DATA.previsao.map(d => `${d.dia}: ${d.temp}°C ${d.icon} (Chuva: ${d.chuva}%)`).join('\n')}

---
Dados gerados em ${new Date().toLocaleString('pt-BR')}
    `.trim();

    try {
      // Tenta usar a API moderna de clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success('✅ Copiado!', {
          description: 'Previsão copiada para área de transferência',
        });
        setShareModalOpen(false);
      } else {
        // Fallback: criar textarea temporário
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (success) {
          toast.success('✅ Copiado!', {
            description: 'Previsão copiada para área de transferência',
          });
          setShareModalOpen(false);
        } else {
          throw new Error('Falha ao copiar');
        }
      }
    } catch (error) {
      console.error('Erro ao copiar:', error);
      toast.error('❌ Erro ao copiar', {
        description: 'Tente novamente ou use outra forma de compartilhamento',
      });
    }
  };

  // 📱 Compartilhamento via Web Share API
  const handleQuickShare = async () => {
    const texto = `🌤️ Previsão do Tempo - SoloForte\n\n📍 ${cidade}\n🌡️ ${MOCK_DATA.atual.temp}°C - ${MOCK_DATA.atual.description}\n💧 Umidade: ${MOCK_DATA.atual.humidity}%\n💨 Vento: ${MOCK_DATA.atual.windSpeed} km/h\n🌅 Sensação térmica: ${MOCK_DATA.atual.sensacao}°C`;

    try {
      // Tenta compartilhar nativamente se disponível
      if (navigator.share && navigator.canShare && navigator.canShare({ text: texto })) {
        await navigator.share({
          title: 'Previsão do Tempo - SoloForte',
          text: texto,
        });
        toast.success('✅ Previsão compartilhada!');
        return;
      }
      
      // Fallback: copiar para clipboard com método robusto
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(texto);
        toast.success('📋 Previsão copiada!', {
          description: 'Cole onde quiser compartilhar'
        });
      } else {
        // Fallback: criar textarea temporário
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (success) {
          toast.success('📋 Previsão copiada!', {
            description: 'Cole onde quiser compartilhar'
          });
        } else {
          throw new Error('Falha ao copiar');
        }
      }
    } catch (error) {
      const errorName = (error as Error).name;
      
      // Usuário cancelou o compartilhamento (normal, não mostra erro)
      if (errorName === 'AbortError') {
        return;
      }
      
      // Permissão negada - tenta fallback com textarea
      if (errorName === 'NotAllowedError') {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = texto;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          
          const success = document.execCommand('copy');
          document.body.removeChild(textarea);
          
          if (success) {
            toast.success('📋 Previsão copiada!', {
              description: 'Cole onde quiser compartilhar'
            });
          } else {
            throw new Error('Falha ao copiar');
          }
        } catch (clipboardError) {
          console.error('Erro no fallback:', clipboardError);
          toast.error('❌ Erro ao copiar', {
            description: 'Tente novamente'
          });
        }
        return;
      }
      
      // Outros erros
      console.error('Erro ao compartilhar:', error);
      toast.error('❌ Erro ao compartilhar', {
        description: 'Tente novamente ou use outra forma de compartilhamento'
      });
    }
  };

  // 📄 Copiar texto completo (versão detalhada)
  const handleCopyDetailed = () => {
    handleCopyToClipboard();
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto scroll-smooth pb-32">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg">Clima</h1>
              <button 
                onClick={() => setLocationModalOpen(true)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0057FF] transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>{cidade}</span>
              </button>
            </div>
          </div>
          
          {/* Botão Compartilhar */}
          <Button
            variant="default"
            size="sm"
            onClick={handleQuickShare}
            className="bg-[#0057FF] hover:bg-[#0041CC] text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {/* Clima Atual */}
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-6xl mb-2">{MOCK_DATA.atual.temp}°</div>
              <div className="text-xl text-blue-100">{MOCK_DATA.atual.description}</div>
              <div className="text-sm text-blue-200 mt-1">
                Sensação térmica: {MOCK_DATA.atual.sensacao}°
              </div>
            </div>
            <Sun className="h-20 w-20 text-yellow-300" />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-blue-400">
            <div className="text-center">
              <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <div className="text-2xl">{MOCK_DATA.atual.humidity}%</div>
              <div className="text-xs text-blue-200">Umidade</div>
            </div>
            <div className="text-center">
              <Wind className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <div className="text-2xl">{MOCK_DATA.atual.windSpeed}</div>
              <div className="text-xs text-blue-200">km/h</div>
            </div>
            <div className="text-center">
              <Cloud className="h-6 w-6 mx-auto mb-2 text-blue-200" />
              <div className="text-2xl">{MOCK_DATA.atual.pressure}</div>
              <div className="text-xs text-blue-200">hPa</div>
            </div>
          </div>
        </Card>

        {/* Previsão 5 dias */}
        <Card className="p-4">
          <h2 className="text-lg mb-4">Previsão para 5 dias</h2>
          <div className="grid grid-cols-5 gap-2">
            {MOCK_DATA.previsao.map((dia, idx) => (
              <div key={idx} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-sm text-gray-600 mb-2">{dia.dia}</div>
                <div className="text-3xl mb-2">{dia.icon}</div>
                <div className="text-lg mb-1">{dia.temp}°</div>
                <div className="text-xs text-blue-600">{dia.chuva}%</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="hoje" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hoje">Hoje</TabsTrigger>
            <TabsTrigger value="semana">Semana</TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
          </TabsList>

          <TabsContent value="hoje" className="mt-4">
            <Card className="p-4">
              <p className="text-gray-600">
                Previsão detalhada para hoje em {cidade}
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="semana" className="mt-4">
            <Card className="p-4">
              <p className="text-gray-600">
                Previsão extendida para os próximos 7 dias
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="mt-4">
            <Card className="p-4">
              <p className="text-gray-600">
                Nenhum alerta meteorológico ativo no momento
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* FAB Compartilhar */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShareModalOpen(true)}
          className="h-14 w-14 rounded-full bg-[#0057FF] hover:bg-[#0046CC] shadow-2xl hover:scale-110 active:scale-95 transition-all"
          size="icon"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </div>

      {/* Modal de Compartilhamento */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-[#0057FF]" />
              Compartilhar Previsão
            </DialogTitle>
            <DialogDescription>
              Escolha como deseja compartilhar a previsão do tempo para {cidade}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {/* Compartilhamento Rápido */}
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => {
                handleQuickShare();
                setShareModalOpen(false);
              }}
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 text-[#0057FF]">
                <Share2 className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">Compartilhar Agora</div>
                <div className="text-xs text-gray-500">Via WhatsApp, SMS, email, etc</div>
              </div>
            </Button>

            {/* Copiar Texto Detalhado */}
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={handleCopyDetailed}
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 text-green-600">
                <Copy className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">Copiar Texto Completo</div>
                <div className="text-xs text-gray-500">Previsão detalhada formatada</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Localização */}
      <Dialog open={locationModalOpen} onOpenChange={setLocationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#0057FF]" />
              Escolha a Cidade
            </DialogTitle>
            <DialogDescription>
              Selecione a cidade para a qual deseja ver a previsão do tempo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {/* Busca */}
            <Input
              type="text"
              placeholder="Digite o nome da cidade"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />

            {/* Lista de Cidades */}
            <div className="max-h-40 overflow-y-auto">
              {isLocating ? (
                <div className="flex items-center justify-center p-4">
                  <Navigation className="h-5 w-5 animate-spin text-gray-500" />
                  <span className="ml-2 text-gray-500">Detectando localização...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-3"
                    onClick={handleDetectLocation}
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 text-[#0057FF]">
                      <Navigation className="h-5 w-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Detectar Localização</div>
                      <div className="text-xs text-gray-500">Usar GPS para encontrar sua localização atual</div>
                    </div>
                  </Button>

                  {cidadesFiltradas.map((city, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-3"
                      onClick={() => handleSelectCity(city)}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-gray-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{city}</div>
                        <div className="text-xs text-gray-500">Selecione para ver a previsão</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}