import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './utils/ThemeContext';
import { ProfileProvider } from './utils/ProfileContext';
import { MobileOnlyGuard } from './components/MobileOnlyGuard';
import FloatingActionButton from './components/FloatingActionButton';

// ✅ Componentes visuais - imports diretos (SEM lazy loading para evitar loops)
import Landing from './components/Landing';
import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import EsqueciSenha from './components/EsqueciSenha';
import Dashboard from './components/Dashboard';
import Agenda from './components/Agenda';
import Clima from './components/Clima';
import Relatorios from './components/Relatorios';
import RelatorioEditor from './components/RelatorioEditor';
import Clientes from './components/Clientes';
import Configuracoes from './components/Configuracoes';
import Feedback from './components/Feedback';
import AlertasConfig from './components/AlertasConfig';
import CheckInOut from './components/CheckInOut';
import RadarClima from './components/RadarClima';
import PragasPage from './components/pages/PragasPage';
import DashboardExecutivo from './components/pages/DashboardExecutivo';
import GestaoEquipes from './components/pages/GestaoEquipes';
import GestaoClientesPage from './components/pages/GestaoClientesPage';
import ChatSuporteInApp from './components/ChatSuporteInApp';
import SuporteChat from './components/SuporteChat';
import Publicacao from './components/Marketing';
import MapasOffline from './components/MapasOffline';
import NotificationCenter from './components/NotificationCenter';
import GestaoOcorrencias from './components/GestaoOcorrencias';
import ResponsiveTest from './components/ResponsiveTest';

// 🔥 VERSÃO VISUAL RESTAURADA - COM FAB, SEM LOOPS
export default function App() {
  // ✅ Estados de navegação
  const [currentRoute, setCurrentRoute] = useState('/');
  const [fabExpanded, setFabExpanded] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);

  // ✅ Debug: rastrear mudanças no estado do NotificationCenter
  useEffect(() => {
    console.log('🔵 App: notificationCenterOpen mudou para:', notificationCenterOpen);
  }, [notificationCenterOpen]);

  const navigate = (path: string) => {
    setCurrentRoute(path);
    setFabExpanded(false);
    setNotificationCenterOpen(false);
  };

  // ✅ Escutar evento para fechar NotificationCenter (disparado pelo FAB)
  useEffect(() => {
    const handleCloseNotifications = () => {
      setNotificationCenterOpen(false);
    };

    window.addEventListener('close-notification-center', handleCloseNotifications);
    return () => window.removeEventListener('close-notification-center', handleCloseNotifications);
  }, []);

  return (
    <ThemeProvider>
      <ProfileProvider>
        <MobileOnlyGuard>
          <div className="app-container h-screen w-screen relative">
            {/* Rotas */}
            {currentRoute === '/' && <Landing navigate={navigate} />}
            {currentRoute === '/landing' && <Landing navigate={navigate} />}
            {currentRoute === '/home' && <Home navigate={navigate} />}
            {currentRoute === '/login' && <Login navigate={navigate} />}
            {currentRoute === '/cadastro' && <Cadastro navigate={navigate} />}
            {currentRoute === '/esqueci-senha' && <EsqueciSenha navigate={navigate} />}
            {currentRoute === '/dashboard' && (
              <Dashboard 
                navigate={navigate} 
                fabExpanded={fabExpanded} 
                setFabExpanded={setFabExpanded}
                onOpenNotifications={() => {
                  console.log('🔔 App: onOpenNotifications chamada - Abrindo NotificationCenter');
                  setNotificationCenterOpen(true);
                }}
              />
            )}
            {currentRoute === '/agenda' && <Agenda navigate={navigate} />}
            {currentRoute === '/clima' && <Clima navigate={navigate} />}
            {currentRoute === '/relatorios' && <Relatorios navigate={navigate} />}
            {currentRoute === '/relatorios/novo' && <RelatorioEditor navigate={navigate} />}
            {currentRoute === '/clientes' && <Clientes navigate={navigate} />}
            {currentRoute === '/configuracoes' && <Configuracoes navigate={navigate} />}
            {currentRoute === '/feedback' && <Feedback navigate={navigate} />}
            {currentRoute === '/alertas' && <AlertasConfig navigate={navigate} />}
            {currentRoute === '/configuracoes/alertas' && <AlertasConfig navigate={navigate} />}
            {currentRoute === '/check-in' && <CheckInOut navigate={navigate} />}
            {currentRoute === '/radar-clima' && <RadarClima navigate={navigate} />}
            {currentRoute === '/pragas' && <PragasPage navigate={navigate} />}
            {currentRoute === '/dashboard-executivo' && <DashboardExecutivo navigate={navigate} />}
            {currentRoute === '/analise-dados' && <DashboardExecutivo navigate={navigate} />}
            {currentRoute === '/gestao-equipes' && <GestaoEquipes navigate={navigate} />}
            {currentRoute === '/equipes' && <GestaoEquipes navigate={navigate} />}
            {currentRoute === '/gerenciamento-usuarios' && <GestaoEquipes navigate={navigate} />}
            {currentRoute === '/gestao-clientes' && <GestaoClientesPage navigate={navigate} />}
            {currentRoute === '/clientes-fazendas' && <GestaoClientesPage navigate={navigate} />}
            {currentRoute === '/chat' && <ChatSuporteInApp navigate={navigate} />}
            {currentRoute === '/suporte' && <SuporteChat navigate={navigate} />}
            {currentRoute === '/marketing' && <Publicacao navigate={navigate} />}
            {currentRoute === '/mapas-offline' && <MapasOffline navigate={navigate} />}
            {currentRoute === '/ocorrencias' && <GestaoOcorrencias navigate={navigate} />}
            {currentRoute === '/responsive-test' && <ResponsiveTest navigate={navigate} />}

            {/* ✅ Central de Notificações */}
            <NotificationCenter 
              isOpen={notificationCenterOpen}
              onClose={() => {
                console.log('🟡 App: onClose do NotificationCenter chamado (pode ser X do sheet ou FAB)');
                setNotificationCenterOpen(false);
              }}
              navigate={navigate}
            />

            {/* ✅ FAB RESTAURADO */}
            <FloatingActionButton
              currentRoute={currentRoute}
              onNavigate={navigate}
              fabExpanded={fabExpanded}
              onToggleFab={() => setFabExpanded(!fabExpanded)}
              onOpenNotifications={() => setNotificationCenterOpen(true)}
              onCloseNotifications={() => {
                console.log('🟢 App: Fechando NotificationCenter via FAB');
                setNotificationCenterOpen(false);
              }}
              notificationCenterOpen={notificationCenterOpen}
            />

            <Toaster position="top-center" />
          </div>
        </MobileOnlyGuard>
      </ProfileProvider>
    </ThemeProvider>
  );
}