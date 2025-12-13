/**
 * 💬 SUPORTE & CHAT - DESIGN PREMIUM MOBILE
 * 
 * Sistema de suporte com:
 * - Chat em tempo real
 * - Central de ajuda
 * - FAQ
 * - Tickets de suporte
 */

import { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  HelpCircle,
  MessageCircle,
  Clock,
  CheckCheck,
  Headphones
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface SuporteChatProps {
  navigate: (path: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export default function SuporteChat({ navigate }: SuporteChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Como podemos ajudar você hoje?',
      sender: 'support',
      timestamp: '10:30',
      status: 'read'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    toast.success('Mensagem enviada!');

    // Simular resposta automática
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Obrigado pela sua mensagem! Nossa equipe irá responder em breve.',
        sender: 'support',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1500);
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-100 bg-gradient-to-br from-teal-50 to-emerald-50">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-white/50"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-900">Suporte & Chat</h1>
          <p className="text-xs text-gray-500">Conversa com nossa equipe</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg">
          <Headphones className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => toast.info('📚 Central de Ajuda')}
            className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 hover:border-teal-300 transition-all active:scale-[0.98]"
          >
            <HelpCircle className="h-5 w-5 text-teal-600" />
            <span className="text-sm text-gray-700">FAQ</span>
          </button>
          <button
            onClick={() => toast.info('🎫 Abrir Ticket')}
            className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 hover:border-teal-300 transition-all active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5 text-teal-600" />
            <span className="text-sm text-gray-700">Novo Ticket</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-32">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#0057FF] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.timestamp}
                  </span>
                  {msg.sender === 'user' && msg.status && (
                    <CheckCheck className={`h-3 w-3 ${msg.status === 'read' ? 'text-blue-200' : 'text-blue-300'}`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-gray-100"
            onClick={() => toast.info('📎 Anexar arquivo')}
          >
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-full border-gray-200 focus:border-teal-500"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Tempo médio de resposta: ~5 minutos
        </p>
      </div>
    </div>
  );
}