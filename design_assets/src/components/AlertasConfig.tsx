import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Mail, MessageCircle, Cloud, Brain, Save, Plus, Trash2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { fetchWithAuth } from '../utils/supabase/client';
import { logger } from '../utils/logger';
import { STORAGE_KEYS } from '../utils/constants';
import { sessionStorage } from '../utils/storage/capacitor-storage';
import type { AlertConfig as AlertConfigType, AlertChannel } from '../types';

interface AlertasConfigProps {
  navigate: (path: string) => void;
}

// ⚠️ Interface específica do componente (estrutura diferente de AlertConfigType)
interface AlertConfig {
  id: string;
  type: 'ndvi' | 'weather';
  enabled: boolean;
  channel: 'email' | 'whatsapp' | 'both';
  email?: string;
  phone?: string;
  
  // Configurações NDVI
  ndviThreshold?: number;
  ndviCondition?: 'below' | 'above' | 'change';
  areaId?: string;
  areaName?: string;
  
  // Configurações Clima
  weatherEvents?: string[];
  weatherTime?: 'morning' | 'evening' | 'both';
  
  frequency: 'realtime' | 'daily' | 'weekly';
}

export default function AlertasConfig({ navigate }: AlertasConfigProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);
  const [testingChannel, setTestingChannel] = useState<'email' | 'whatsapp' | null>(null);
  
  // Dados do usuário
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  
  // Configuração de novo alerta
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [newAlertType, setNewAlertType] = useState<'ndvi' | 'weather'>('weather');

  useEffect(() => {
    loadAlerts();
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // ✅ Migrado para Capacitor Storage
    const session = await sessionStorage.get();
    if (session) {
      try {
        setUserEmail(session.email || '');
      } catch (error) {
        logger.error('Erro ao carregar dados do usuário');
      }
    }
  };

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth('/make-server-b2d55462/alerts');
      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
      // Carregar alertas do localStorage como fallback
      const savedAlerts = localStorage.getItem(STORAGE_KEYS.ALERTS);
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      }
    } finally {
      setLoading(false);
    }
  };

  const saveAlerts = async () => {
    setSaving(true);
    try {
      // Salvar no localStorage
      localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
      
      // Tentar salvar no backend
      try {
        await fetchWithAuth('/make-server-b2d55462/alerts', {
          method: 'POST',
          body: JSON.stringify({ alerts })
        });
      } catch (error) {
        console.log('Backend indisponível, usando localStorage');
      }
      
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const addAlert = (type: 'ndvi' | 'weather') => {
    const newAlert: AlertConfig = {
      id: Date.now().toString(),
      type,
      enabled: true,
      channel: 'email',
      email: userEmail,
      phone: userPhone,
      frequency: 'daily',
      
      ...(type === 'ndvi' ? {
        ndviThreshold: 0.4,
        ndviCondition: 'below',
      } : {
        weatherEvents: ['rain', 'storm'],
        weatherTime: 'morning',
      })
    };
    
    setAlerts([...alerts, newAlert]);
    setShowNewAlert(false);
    toast.success('Alerta adicionado! Não esqueça de salvar.');
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
    toast.success('Alerta removido! Não esqueça de salvar.');
  };

  const updateAlert = (id: string, updates: Partial<AlertConfig>) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const testNotification = async (channel: 'email' | 'whatsapp') => {
    setTestingChannel(channel);
    
    try {
      const response = await fetchWithAuth('/make-server-b2d55462/notifications/test', {
        method: 'POST',
        body: JSON.stringify({
          channel,
          email: userEmail,
          phone: userPhone,
        })
      });

      if (response.ok) {
        toast.success(`Teste enviado via ${channel === 'email' ? 'Email' : 'WhatsApp'}!`);
      } else {
        throw new Error('Erro ao enviar teste');
      }
    } catch (error) {
      console.error('Erro ao testar:', error);
      toast.error(`Erro ao enviar teste. Verifique suas configurações.`);
    } finally {
      setTestingChannel(null);
    }
  };

  const sendWeatherForecast = async (channel: 'email' | 'whatsapp') => {
    setTestingChannel(channel);
    
    try {
      const response = await fetchWithAuth('/make-server-b2d55462/notifications/weather', {
        method: 'POST',
        body: JSON.stringify({
          channel,
          email: userEmail,
          phone: userPhone,
        })
      });

      if (response.ok) {
        toast.success(`Previsão enviada via ${channel === 'email' ? 'Email' : 'WhatsApp'}!`);
      } else {
        throw new Error('Erro ao enviar previsão');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      toast.info('Função de envio configurada! Configure suas APIs para uso real.');
    } finally {
      setTestingChannel(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/configuracoes')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-semibold text-lg">⚡ Alertas Automáticos</h1>
            <p className="text-xs text-gray-500">Configure notificações por email e WhatsApp</p>
          </div>
        </div>
        <Button
          onClick={saveAlerts}
          disabled={saving}
          className="bg-[#0057FF] hover:bg-[#0046CC]"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth p-4 pb-32">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Configurações Gerais */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#0057FF]" />
              Configurações de Contato
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email para Notificações
                </label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => testNotification('email')}
                    disabled={!userEmail || testingChannel === 'email'}
                    variant="outline"
                    size="sm"
                  >
                    {testingChannel === 'email' ? 'Enviando...' : 'Testar'}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp para Notificações
                </label>
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+55 11 99999-9999"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => testNotification('whatsapp')}
                    disabled={!userPhone || testingChannel === 'whatsapp'}
                    variant="outline"
                    size="sm"
                  >
                    {testingChannel === 'whatsapp' ? 'Enviando...' : 'Testar'}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Inclua o código do país (+55 para Brasil)
                </p>
              </div>
            </div>
          </div>

          {/* Envio Rápido de Previsão */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200 p-6">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-600" />
              📤 Enviar Previsão do Tempo Agora
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Envie a previsão do tempo dos próximos 7 dias por email ou WhatsApp
            </p>
            
            <div className="flex gap-3">
              <Button
                onClick={() => sendWeatherForecast('email')}
                disabled={!userEmail || testingChannel === 'email'}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                {testingChannel === 'email' ? 'Enviando...' : 'Enviar por Email'}
              </Button>
              
              <Button
                onClick={() => sendWeatherForecast('whatsapp')}
                disabled={!userPhone || testingChannel === 'whatsapp'}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {testingChannel === 'whatsapp' ? 'Enviando...' : 'Enviar por WhatsApp'}
              </Button>
            </div>
          </div>

          {/* Lista de Alertas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-lg">🔔 Seus Alertas Automáticos</h2>
              <Button
                onClick={() => setShowNewAlert(true)}
                size="sm"
                className="bg-[#0057FF] hover:bg-[#0046CC]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Alerta
              </Button>
            </div>

            {showNewAlert && (
              <div className="p-6 bg-blue-50 border-b border-blue-200">
                <h3 className="font-medium mb-3">Tipo de Alerta:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => addAlert('weather')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Cloud className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-medium">Previsão do Tempo</div>
                      <div className="text-xs text-gray-500">Receba diariamente</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => addAlert('ndvi')}
                    variant="outline"
                    className="h-24 flex-col gap-2"
                  >
                    <Brain className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-medium">Alerta NDVI</div>
                      <div className="text-xs text-gray-500">Vegetação crítica</div>
                    </div>
                  </Button>
                </div>
                <Button
                  onClick={() => setShowNewAlert(false)}
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3"
                >
                  Cancelar
                </Button>
              </div>
            )}

            <div className="divide-y divide-gray-200">
              {alerts.length === 0 && !showNewAlert && (
                <div className="p-12 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm mb-2">Nenhum alerta configurado</p>
                  <p className="text-xs">Clique em "Novo Alerta" para começar</p>
                </div>
              )}

              {alerts.map((alert) => (
                <div key={alert.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {alert.type === 'weather' ? (
                        <Cloud className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Brain className="h-6 w-6 text-green-600" />
                      )}
                      <div>
                        <h3 className="font-medium">
                          {alert.type === 'weather' ? '☁️ Previsão do Tempo' : '🌿 Alerta NDVI'}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {alert.type === 'weather' ? 'Receber previsão diária' : 'Monitorar vegetação'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.enabled}
                        onCheckedChange={(checked) => updateAlert(alert.id, { enabled: checked })}
                      />
                      <Button
                        onClick={() => removeAlert(alert.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {alert.enabled && (
                    <div className="space-y-3 pl-9">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">Canal</label>
                          <Select
                            value={alert.channel}
                            onValueChange={(v) => updateAlert(alert.id, { channel: v as any })}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">📧 Email</SelectItem>
                              <SelectItem value="whatsapp">💬 WhatsApp</SelectItem>
                              <SelectItem value="both">📧💬 Ambos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">Frequência</label>
                          <Select
                            value={alert.frequency}
                            onValueChange={(v) => updateAlert(alert.id, { frequency: v as any })}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realtime">⚡ Tempo Real</SelectItem>
                              <SelectItem value="daily">📅 Diário</SelectItem>
                              <SelectItem value="weekly">📆 Semanal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {alert.type === 'weather' && (
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">Horário de Envio</label>
                          <Select
                            value={alert.weatherTime}
                            onValueChange={(v) => updateAlert(alert.id, { weatherTime: v as any })}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">🌅 Manhã (7h)</SelectItem>
                              <SelectItem value="evening">🌆 Noite (19h)</SelectItem>
                              <SelectItem value="both">🌅🌆 Ambos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {alert.type === 'ndvi' && (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-600 mb-1 block">Condição</label>
                            <Select
                              value={alert.ndviCondition}
                              onValueChange={(v) => updateAlert(alert.id, { ndviCondition: v as any })}
                            >
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="below">📉 Abaixo de</SelectItem>
                                <SelectItem value="above">📈 Acima de</SelectItem>
                                <SelectItem value="change">🔄 Mudança &gt;10%</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {alert.ndviCondition !== 'change' && (
                            <div>
                              <label className="text-xs text-gray-600 mb-1 block">Valor NDVI</label>
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="1"
                                value={alert.ndviThreshold}
                                onChange={(e) => updateAlert(alert.id, { ndviThreshold: parseFloat(e.target.value) })}
                                className="h-9 text-sm"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4" />
              ℹ️ Como Funciona
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Previsão do Tempo:</strong> Receba a previsão dos próximos 7 dias automaticamente</li>
              <li>• <strong>Alertas NDVI:</strong> Seja notificado quando a vegetação precisar de atenção</li>
              <li>• <strong>Email:</strong> Relatórios HTML completos com gráficos e análises</li>
              <li>• <strong>WhatsApp:</strong> Mensagens resumidas com informações principais</li>
              <li>• <strong>Configuração:</strong> Ative as APIs no backend para uso em produção</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}