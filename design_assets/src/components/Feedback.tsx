import { useState } from 'react';
import { Send, Bug, Lightbulb, Heart, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FeedbackProps {
  navigate: (path: string) => void;
}

export default function Feedback({ navigate }: FeedbackProps) {
  const [tipo, setTipo] = useState('');
  const [pagina, setPagina] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const feedbackStats = [
    { tipo: 'Bug', count: 12, icon: Bug, color: 'bg-red-50 text-red-600' },
    { tipo: 'Sugestão', count: 28, icon: Lightbulb, color: 'bg-yellow-50 text-yellow-600' },
    { tipo: 'Elogios', count: 45, icon: Heart, color: 'bg-green-50 text-green-600' },
  ];

  const handleEnviar = () => {
    if (tipo && mensagem) {
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        setTipo('');
        setPagina('');
        setMensagem('');
      }, 3000);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto scroll-smooth pb-32">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-800">Feedback</h1>
          <p className="text-gray-500">Ajude-nos a melhorar o SoloForte</p>
        </div>

        {/* Estatísticas de Feedback */}
        <div className="mb-8">
          <h2 className="mb-4 text-gray-700">Resumo de Feedbacks</h2>
          <div className="grid grid-cols-3 gap-3">
            {feedbackStats.map((stat) => (
              <div
                key={stat.tipo}
                className={`${stat.color} rounded-2xl p-4 text-center`}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl mb-1">{stat.count}</div>
                <div className="text-sm">{stat.tipo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário de Feedback */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {!enviado ? (
            <>
              <h2 className="mb-6 text-gray-800">Enviar Feedback</h2>

              <div className="space-y-4">
                {/* Tipo de Feedback */}
                <div>
                  <label className="block mb-2 text-gray-700">Tipo de Feedback</label>
                  <Select value={tipo} onValueChange={setTipo}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">
                        <div className="flex items-center gap-2">
                          <Bug className="h-4 w-4 text-red-600" />
                          <span>Bug</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="sugestao">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600" />
                          <span>Sugestão</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="elogio">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-green-600" />
                          <span>Elogios</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Página (apenas se for bug) */}
                {tipo === 'bug' && (
                  <div>
                    <label className="block mb-2 text-gray-700">Página com Problema</label>
                    <Select value={pagina} onValueChange={setPagina}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Selecione a página" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="login">Login</SelectItem>
                        <SelectItem value="relatorios">Relatórios</SelectItem>
                        <SelectItem value="agenda">Agenda</SelectItem>
                        <SelectItem value="clima">Clima</SelectItem>
                        <SelectItem value="clientes">Clientes</SelectItem>
                        <SelectItem value="configuracoes">Configurações</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Mensagem */}
                <div>
                  <label className="block mb-2 text-gray-700">
                    {tipo === 'bug' ? 'Descreva o problema' : 
                     tipo === 'sugestao' ? 'Sua sugestão' : 
                     'Sua mensagem'}
                  </label>
                  <Textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder={
                      tipo === 'bug' 
                        ? 'Detalhe o problema encontrado...' 
                        : tipo === 'sugestao'
                        ? 'Como podemos melhorar?'
                        : 'Compartilhe sua experiência...'
                    }
                    className="min-h-[150px] rounded-xl resize-none"
                  />
                  <div className="text-right text-gray-400 mt-1">
                    {mensagem.length}/500
                  </div>
                </div>

                {/* Botão Enviar */}
                <Button
                  onClick={handleEnviar}
                  disabled={!tipo || !mensagem}
                  className="w-full h-12 bg-[#0057FF] hover:bg-[#0046CC] rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                  Enviar Feedback
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-gray-800 mb-2">Obrigado!</h2>
              <p className="text-gray-600">
                Seu feedback foi enviado com sucesso. Ele é muito importante para nós!
              </p>
            </div>
          )}
        </div>

        {/* Feedbacks Recentes */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-700">Principais Problemas Resolvidos</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 mb-1">Carregamento do mapa otimizado</div>
                  <div className="text-gray-500">
                    Resolvido problema de lentidão no carregamento
                  </div>
                  <div className="text-gray-400 mt-2">Baseado em 8 feedbacks</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 mb-1">Nova funcionalidade de filtros</div>
                  <div className="text-gray-500">
                    Adicionado filtros avançados nos relatórios
                  </div>
                  <div className="text-gray-400 mt-2">Baseado em 15 sugestões</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 mb-1">Melhorias na interface</div>
                  <div className="text-gray-500">
                    Interface mais intuitiva e responsiva
                  </div>
                  <div className="text-gray-400 mt-2">Baseado em 12 feedbacks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}