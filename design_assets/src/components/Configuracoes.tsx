/**
 * ⚙️ CONFIGURAÇÕES - DESIGN PREMIUM MOBILE
 * 
 * Central completa de configurações do SoloForte
 * Todas as preferências e ajustes do aplicativo
 */

import { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  User,
  Bell,
  Map,
  MessageSquare,
  Globe,
  Moon,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Settings,
  Wifi,
  Download,
  Eye,
  AlertTriangle,
  Camera,
  Lock,
  Mail,
  Smartphone,
  Image as ImageIcon,
  Building2,
  Palette
} from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { useTheme } from '../utils/ThemeContext';
import { useProfile } from '../utils/ProfileContext';

interface ConfiguracoesProps {
  navigate: (path: string) => void;
}

export default function Configuracoes({ navigate }: ConfiguracoesProps) {
  const { visualStyle, setVisualStyle } = useTheme();
  const { fotoPerfil, setFotoPerfil } = useProfile();
  
  // Estados dos switches
  const [notificacoesPush, setNotificacoesPush] = useState(true);
  const [alertasAutomaticos, setAlertasAutomaticos] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [modoOffline, setModoOffline] = useState(false);
  const [sincronizacaoAuto, setSincronizacaoAuto] = useState(true);

  // Estados para logo da fazenda
  const [logoFazenda, setLogoFazenda] = useState<string | null>(null);
  
  const inputFotoPerfilRef = useRef<HTMLInputElement>(null);
  const inputLogoFazendaRef = useRef<HTMLInputElement>(null);

  const handleToggle = (setter: (value: boolean) => void, currentValue: boolean, label: string) => {
    setter(!currentValue);
    toast.success(`${label} ${!currentValue ? 'ativado' : 'desativado'}`);
  };

  const handleFotoPerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
        toast.success('📸 Foto de perfil atualizada!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoFazendaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFazenda(reader.result as string);
        toast.success('🏢 Logo da fazenda atualizado!', { 
          description: 'Este logo será usado como ícone do app' 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisualStyleChange = (style: 'ios' | 'material') => {
    setVisualStyle(style);
    toast.success(`🎨 Estilo visual alterado para ${style === 'ios' ? 'iOS' : 'Material Design'}`, {
      description: 'Algumas mudanças aparecerão após recarregar o app'
    });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header Gradiente */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-white/20 text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <h1 className="text-white">Configurações</h1>
          </div>
        </div>
        <p className="text-white/80 text-sm pl-[52px]">Gerencie todas as preferências do app</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5 pb-32">
          
          {/* PERFIL E IDENTIDADE VISUAL */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">PERFIL & IDENTIDADE</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Foto de Perfil */}
              <button 
                onClick={() => inputFotoPerfilRef.current?.click()}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg overflow-hidden">
                  {fotoPerfil ? (
                    <img src={fotoPerfil} alt="Perfil" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-6 w-6 text-white" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Foto de Perfil</p>
                  <p className="text-xs text-gray-500">Toque para alterar sua foto</p>
                </div>
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </button>
              <input 
                ref={inputFotoPerfilRef}
                type="file" 
                accept="image/*" 
                onChange={handleFotoPerfilChange}
                className="hidden"
              />

              {/* Logo da Fazenda/Empresa */}
              <button 
                onClick={() => inputLogoFazendaRef.current?.click()}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg overflow-hidden">
                  {logoFazenda ? (
                    <img src={logoFazenda} alt="Logo" className="h-full w-full object-cover" />
                  ) : (
                    <Building2 className="h-6 w-6 text-white" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Logo da Fazenda/Empresa</p>
                  <p className="text-xs text-gray-500">Será usado como ícone do app</p>
                </div>
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </button>
              <input 
                ref={inputLogoFazendaRef}
                type="file" 
                accept="image/*" 
                onChange={handleLogoFazendaChange}
                className="hidden"
              />

              {/* Meu Perfil */}
              <button 
                onClick={() => toast.info('👤 Editar Perfil Completo')}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Dados do Perfil</p>
                  <p className="text-xs text-gray-500">Nome, email, telefone</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* ESTILO VISUAL */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">ESTILO VISUAL</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* iOS Style */}
              <button 
                onClick={() => handleVisualStyleChange('ios')}
                className={`w-full flex items-center gap-3 p-4 border-b border-gray-100 transition-all ${
                  visualStyle === 'ios' 
                    ? 'bg-blue-50 border-l-4 border-l-[#0057FF]' 
                    : 'hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-lg">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    Estilo iOS
                    {visualStyle === 'ios' && (
                      <span className="text-xs bg-[#0057FF] text-white px-2 py-0.5 rounded-full">Ativo</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Design arredondado e minimalista</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  visualStyle === 'ios' 
                    ? 'border-[#0057FF] bg-[#0057FF]' 
                    : 'border-gray-300'
                }`}>
                  {visualStyle === 'ios' && (
                    <div className="h-2 w-2 bg-white rounded-full" />
                  )}
                </div>
              </button>

              {/* Material Design Style */}
              <button 
                onClick={() => handleVisualStyleChange('material')}
                className={`w-full flex items-center gap-3 p-4 transition-all ${
                  visualStyle === 'material' 
                    ? 'bg-blue-50 border-l-4 border-l-[#0057FF]' 
                    : 'hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    Estilo Material Design
                    {visualStyle === 'material' && (
                      <span className="text-xs bg-[#0057FF] text-white px-2 py-0.5 rounded-full">Ativo</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Design geométrico e moderno</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  visualStyle === 'material' 
                    ? 'border-[#0057FF] bg-[#0057FF]' 
                    : 'border-gray-300'
                }`}>
                  {visualStyle === 'material' && (
                    <div className="h-2 w-2 bg-white rounded-full" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* NOTIFICAÇÕES E ALERTAS */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">NOTIFICAÇÕES</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Notificações Push */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Notificações Push</p>
                  <p className="text-xs text-gray-500">Receber alertas no dispositivo</p>
                </div>
                <Switch
                  checked={notificacoesPush}
                  onCheckedChange={() => handleToggle(setNotificacoesPush, notificacoesPush, 'Notificações Push')}
                />
              </div>

              {/* Alertas Automáticos */}
              <div className="flex items-center gap-3 p-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Alertas Automáticos</p>
                  <p className="text-xs text-gray-500">Pragas, clima e condições</p>
                </div>
                <Switch
                  checked={alertasAutomaticos}
                  onCheckedChange={() => handleToggle(setAlertasAutomaticos, alertasAutomaticos, 'Alertas Automáticos')}
                />
              </div>
            </div>
          </div>

          {/* MAPAS E DADOS */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">MAPAS E DADOS</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Mapas Offline - NAVEGÁVEL */}
              <button 
                onClick={() => navigate('/mapas-offline')}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Mapas Offline</p>
                  <p className="text-xs text-gray-500">Gerenciar áreas baixadas</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              {/* Modo Offline */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                  <Wifi className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Modo Offline</p>
                  <p className="text-xs text-gray-500">Trabalhar sem internet</p>
                </div>
                <Switch
                  checked={modoOffline}
                  onCheckedChange={() => handleToggle(setModoOffline, modoOffline, 'Modo Offline')}
                />
              </div>

              {/* Sincronização Automática */}
              <div className="flex items-center gap-3 p-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Map className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Sincronização Automática</p>
                  <p className="text-xs text-gray-500">Atualizar dados ao conectar</p>
                </div>
                <Switch
                  checked={sincronizacaoAuto}
                  onCheckedChange={() => handleToggle(setSincronizacaoAuto, sincronizacaoAuto, 'Sincronização')}
                />
              </div>
            </div>
          </div>

          {/* APARÊNCIA */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">APARÊNCIA</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Idioma */}
              <button 
                onClick={() => toast.info('🌍 Selecionar Idioma')}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Idioma</p>
                  <p className="text-xs text-gray-500">Português (Brasil)</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              {/* Modo Escuro */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                  <Moon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Modo Escuro</p>
                  <p className="text-xs text-gray-500">Tema escuro para o app</p>
                </div>
                <Switch
                  checked={modoEscuro}
                  onCheckedChange={() => handleToggle(setModoEscuro, modoEscuro, 'Modo Escuro')}
                />
              </div>

              {/* Visualização do Dashboard */}
              <button 
                onClick={() => toast.info('👁️ Personalizar Dashboard')}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Personalizar Dashboard</p>
                  <p className="text-xs text-gray-500">Layout e widgets</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* SUPORTE E AJUDA */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">SUPORTE</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Suporte & Chat - NAVEGÁVEL */}
              <button 
                onClick={() => navigate('/chat')}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Suporte & Chat</p>
                  <p className="text-xs text-gray-500">Converse com nossa equipe</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              {/* Central de Ajuda */}
              <button 
                onClick={() => toast.info('❓ Central de Ajuda')}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Central de Ajuda</p>
                  <p className="text-xs text-gray-500">Tutoriais e perguntas frequentes</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              {/* Enviar Feedback */}
              <button 
                onClick={() => navigate('/feedback')}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Enviar Feedback</p>
                  <p className="text-xs text-gray-500">Compartilhe sua opinião</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* PRIVACIDADE E SEGURANÇA */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">PRIVACIDADE</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Privacidade */}
              <button 
                onClick={() => toast.info('🔒 Política de Privacidade')}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Privacidade</p>
                  <p className="text-xs text-gray-500">Seus dados e permissões</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              {/* Alterar Senha */}
              <button 
                onClick={() => toast.info('🔑 Alterar Senha')}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Alterar Senha</p>
                  <p className="text-xs text-gray-500">Segurança da conta</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* SOBRE */}
          <div>
            <h3 className="text-xs text-gray-500 mb-3 px-2">SOBRE</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Sobre o SoloForte */}
              <button 
                onClick={() => toast.info('ℹ️ SoloForte v2.5.0', { description: 'Última atualização: 06/11/2025' })}
                className="w-full flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Sobre o SoloForte</p>
                  <p className="text-xs text-gray-500">Versão 2.5.0</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              {/* Termos de Uso */}
              <button 
                onClick={() => toast.info('📄 Termos de Uso')}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Termos de Uso</p>
                  <p className="text-xs text-gray-500">Leia nossos termos</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* SAIR */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
              <button 
                onClick={() => toast.error('👋 Sair da conta', { description: 'Funcionalidade em desenvolvimento' })}
                className="w-full flex items-center gap-3 p-4 hover:bg-red-50 active:bg-red-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-red-600">Sair da Conta</p>
                  <p className="text-xs text-red-400">Fazer logout do aplicativo</p>
                </div>
                <ChevronRight className="h-5 w-5 text-red-400" />
              </button>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}