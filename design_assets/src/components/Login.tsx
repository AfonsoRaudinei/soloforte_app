import { useState } from 'react';
import { Mail, Lock, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import logo from 'figma:asset/ee6bc2d4005df96204a039ff5975bb09b82eb128.png';
import logoWatermark from 'figma:asset/88502792e1aa204edd8aab74c4453d15863f6d4c.png';
import { STORAGE_KEYS } from '../utils/constants';

interface LoginProps {
  navigate: (path: string) => void;
}

export default function Login({ navigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    // ✅ MOCK: Simular autenticação (visual apenas)
    setTimeout(() => {
      // Aceitar qualquer email/senha para demo
      const mockUser = {
        userId: 'demo-user-123',
        email: email,
        name: 'Usuário Demo',
        role: 'agronomist'
      };

      // Salvar no localStorage
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');

      console.log('✅ Login demo bem-sucedido');
      navigate('/dashboard');
    }, 800); // Simular delay de rede
  };

  const handleDemoAccess = () => {
    console.log('✅ Modo demonstração ativado');
    localStorage.setItem(STORAGE_KEYS.DEMO_MODE, 'true');
    navigate('/dashboard');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Marca d'água */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <img src={logoWatermark} alt="" className="w-1/2 max-w-md" />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Card de Login */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 mb-4 flex items-center justify-center">
              <img src={logo} alt="SoloForte" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-gray-800">SoloForte</h1>
            <p className="text-gray-500 mt-2">Bem-vindo de volta</p>
          </div>

          {/* Banner: Primeira vez? */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-900 mb-2">
                  <strong>Primeira vez?</strong> Explore sem cadastro!
                </p>
                <Button
                  onClick={handleDemoAccess}
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-300 hover:bg-blue-100 text-blue-700"
                >
                  ✨ Acessar Modo Demonstração
                </Button>
              </div>
            </div>
          </div>

          {/* Formulário de Login */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="seu@email.com"
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••"
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Link Esqueci Senha */}
            <div className="text-right">
              <button
                onClick={() => navigate('/esqueci-senha')}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Botão Login */}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Botão Criar Conta */}
            <Button
              onClick={() => navigate('/cadastro')}
              variant="outline"
              className="w-full h-12 border-2"
            >
              Criar Conta
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500">
            <p className="text-xs">
              Ao entrar, você concorda com nossos{' '}
              <button className="text-blue-600 hover:underline">
                Termos de Uso
              </button>
            </p>
          </div>
        </div>

        {/* Link Voltar */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/home')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
}
