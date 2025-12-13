import { useState } from 'react';
import { User, Mail, Lock, Building2, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import logo from 'figma:asset/ee6bc2d4005df96204a039ff5975bb09b82eb128.png';
import logoWatermark from 'figma:asset/88502792e1aa204edd8aab74c4453d15863f6d4c.png';
import { STORAGE_KEYS } from '../utils/constants';

interface CadastroProps {
  navigate: (path: string) => void;
}

export default function Cadastro({ navigate }: CadastroProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCadastro = async () => {
    setError('');

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido');
      return;
    }

    setLoading(true);

    // ✅ MOCK: Simular criação de conta
    setTimeout(() => {
      const mockUser = {
        userId: 'new-user-' + Date.now(),
        email: email,
        name: name,
        company: company,
        role: 'agronomist'
      };

      // Salvar no localStorage
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');

      console.log('✅ Cadastro demo bem-sucedido');
      setSuccess(true);

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleCadastro();
    }
  };

  if (success) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-gray-800 mb-2">Conta criada com sucesso!</h2>
          <p className="text-gray-600 mb-4">
            Bem-vindo ao SoloForte, <strong>{name}</strong>!
          </p>
          <p className="text-gray-500">
            Redirecionando para o dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Marca d'água */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <img src={logoWatermark} alt="" className="w-1/2 max-w-md" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card de Cadastro */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <img src={logo} alt="SoloForte" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-gray-800">Criar Conta</h1>
            <p className="text-gray-500 mt-2">Junte-se ao SoloForte</p>
          </div>

          {/* Formulário */}
          <div className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-gray-700 mb-2">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="João Silva"
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
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

            {/* Empresa */}
            <div>
              <label className="block text-gray-700 mb-2">Empresa/Fazenda</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nome da propriedade"
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-gray-700 mb-2">
                Senha <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mínimo 6 caracteres"
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-gray-700 mb-2">
                Confirmar Senha <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite a senha novamente"
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Botão Criar Conta */}
            <Button
              onClick={handleCadastro}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Já tem conta?</span>
              </div>
            </div>

            {/* Link Login */}
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full h-12 border-2"
            >
              Fazer Login
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500">
            <p className="text-xs">
              Ao criar uma conta, você concorda com nossos{' '}
              <button className="text-blue-600 hover:underline">
                Termos de Uso
              </button>
              {' '}e{' '}
              <button className="text-blue-600 hover:underline">
                Política de Privacidade
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
