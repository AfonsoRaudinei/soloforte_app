import { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import logoWatermark from 'figma:asset/88502792e1aa204edd8aab74c4453d15863f6d4c.png';

interface EsqueciSenhaProps {
  navigate: (path: string) => void;
}

export default function EsqueciSenha({ navigate }: EsqueciSenhaProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    setError('');

    if (!email) {
      setError('Por favor, insira seu email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido');
      return;
    }

    setLoading(true);

    // ✅ MOCK: Simular envio de email
    setTimeout(() => {
      console.log('✅ Email de recuperação enviado (demo):', email);
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleResetPassword();
    }
  };

  if (success) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-gray-800 mb-2">Email enviado!</h2>
          <p className="text-gray-600 mb-6">
            Enviamos um link de recuperação de senha para <strong>{email}</strong>
          </p>
          <p className="text-gray-500 mb-6">
            Verifique sua caixa de entrada e siga as instruções.
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Voltar para Login
          </Button>
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
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/login')}
              className="mr-3 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-gray-800">Recuperar Senha</h1>
              <p className="text-gray-500 mt-1">
                Enviaremos um link de recuperação
              </p>
            </div>
          </div>

          {/* Formulário */}
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
                  autoFocus
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

            {/* Botão */}
            <Button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Link de Recuperação'
              )}
            </Button>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              💡 <strong>Dica:</strong> Verifique também a pasta de spam caso não encontre o email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
