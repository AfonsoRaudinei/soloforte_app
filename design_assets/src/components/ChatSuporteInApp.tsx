import { useState, useEffect, useRef, memo } from 'react';
import { X, Send, Paperclip, User, Headphones, Circle, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';
import { useChat } from '../utils/hooks/useChat';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { logger } from '../utils/logger';

interface ChatSuporteInAppProps {
  navigate: (path: string) => void;
}

const ChatSuporteInApp = memo(function ChatSuporteInApp({ navigate }: ChatSuporteInAppProps) {
  const { visualStyle, mode } = useTheme();
  const isIOS = visualStyle === 'ios';
  const isDark = mode === 'dark';
  
  const {
    messages,
    loading,
    sending,
    supportOnline,
    supportTyping,
    sendMessage,
    markAsRead,
  } = useChat();

  const [messageInput, setMessageInput] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, supportTyping]);

  // Marcar como lido quando abrir
  useEffect(() => {
    markAsRead();
  }, [markAsRead]);

  // Ajustar altura do textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [messageInput]);

  const handleSend = async () => {
    if (!messageInput.trim() && attachments.length === 0) return;

    try {
      await sendMessage(messageInput, attachments);
      setMessageInput('');
      setAttachments([]);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      toast.error('Erro ao enviar mensagem');
      logger.error('Erro ao enviar mensagem:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = () => {
    toast.info('Upload de arquivos em desenvolvimento');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`;
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const formatFullTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`h-screen w-screen flex flex-col bg-background ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div 
        className={`sticky top-0 z-50 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b px-4 py-3 shadow-sm`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className={isIOS ? 'rounded-full' : 'rounded-lg'}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className={`h-10 w-10 ${isDark ? 'bg-[#0057FF]/20' : 'bg-[#0057FF]/10'}`}>
                  <AvatarFallback className="bg-transparent">
                    <Headphones className="h-5 w-5 text-[#0057FF]" />
                  </AvatarFallback>
                </Avatar>
                <Circle 
                  className={`h-3 w-3 absolute -bottom-0.5 -right-0.5 ${
                    supportOnline ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'
                  }`}
                />
              </div>
              
              <div>
                <h1 className="font-semibold text-foreground">Suporte SoloForte</h1>
                <p className="text-xs text-muted-foreground">
                  {supportTyping ? (
                    <span className="text-[#0057FF]">Digitando...</span>
                  ) : supportOnline ? (
                    'Online'
                  ) : (
                    'Offline'
                  )}
                </p>
              </div>
            </div>
          </div>

          {supportOnline && (
            <Badge variant="outline" className="border-green-500 text-green-600">
              <Circle className="h-2 w-2 fill-green-500 mr-1" />
              Ativo
            </Badge>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth px-4 py-6 space-y-4 pb-32"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse space-y-3 w-full max-w-md">
              <div className={`h-16 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-2xl`} />
              <div className={`h-16 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-2xl ml-auto w-3/4`} />
              <div className={`h-16 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-2xl w-4/5`} />
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className={`rounded-full p-6 mb-4 ${
              isDark ? 'bg-[#0057FF]/20' : 'bg-[#0057FF]/10'
            }`}>
              <Headphones className="h-12 w-12 text-[#0057FF]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Bem-vindo ao Suporte</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Estamos aqui para ajudar! Envie sua dúvida ou problema e nossa equipe responderá rapidamente.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isUser = msg.senderType === 'user';
              const showAvatar = index === 0 || messages[index - 1]?.senderType !== msg.senderType;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {showAvatar ? (
                    <Avatar className={`h-8 w-8 flex-shrink-0 ${
                      isUser 
                        ? isDark ? 'bg-[#0057FF]/20' : 'bg-[#0057FF]/10'
                        : isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <AvatarFallback className="bg-transparent">
                        {isUser ? (
                          <User className={`h-4 w-4 ${isUser ? 'text-[#0057FF]' : 'text-gray-500'}`} />
                        ) : (
                          <Headphones className="h-4 w-4 text-gray-500" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8 flex-shrink-0" />
                  )}

                  {/* Message Bubble */}
                  <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                    {showAvatar && !isUser && (
                      <span className="text-xs text-muted-foreground mb-1 px-3">
                        {msg.senderName}
                      </span>
                    )}
                    
                    <div
                      className={`px-4 py-2.5 ${
                        isIOS
                          ? 'rounded-3xl'
                          : isUser
                          ? 'rounded-2xl rounded-tr-sm'
                          : 'rounded-2xl rounded-tl-sm'
                      } ${
                        isUser
                          ? 'bg-[#0057FF] text-white'
                          : isDark
                          ? 'bg-gray-800 text-gray-100'
                          : 'bg-white text-gray-900 border border-gray-200'
                      } shadow-sm`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {msg.message}
                      </p>
                    </div>

                    <span className={`text-xs text-muted-foreground mt-1 px-3`}>
                      {formatFullTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {supportTyping && (
              <div className="flex gap-3">
                <Avatar className={`h-8 w-8 flex-shrink-0 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <AvatarFallback className="bg-transparent">
                    <Headphones className="h-4 w-4 text-gray-500" />
                  </AvatarFallback>
                </Avatar>

                <div className={`px-4 py-3 rounded-2xl ${
                  isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'
                }`}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className={`sticky bottom-0 border-t ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } px-4 py-3 safe-area-bottom`}>
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAttachment}
            className={`flex-shrink-0 ${isIOS ? 'rounded-full' : 'rounded-lg'}`}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Text Input */}
          <div className={`flex-1 ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          } ${isIOS ? 'rounded-3xl' : 'rounded-2xl'} px-4 py-2`}>
            <Textarea
              ref={textareaRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className={`min-h-[40px] max-h-32 resize-none border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isDark ? 'placeholder:text-gray-400' : 'placeholder:text-gray-500'
              }`}
              rows={1}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={(!messageInput.trim() && attachments.length === 0) || sending}
            className={`flex-shrink-0 h-10 w-10 p-0 bg-[#0057FF] hover:bg-[#0057FF]/90 ${
              isIOS ? 'rounded-full' : 'rounded-xl'
            } ${
              (!messageInput.trim() && attachments.length === 0) || sending
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
          {[
            { label: '❓ Como usar NDVI?', msg: 'Como faço para usar a análise NDVI?' },
            { label: '🗺️ Desenhar áreas', msg: 'Como desenho áreas no mapa?' },
            { label: '📊 Exportar relatório', msg: 'Como exporto relatórios?' },
            { label: '👥 Gestão de Equipes', msg: 'Como funciona a gestão de equipes?' },
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                setMessageInput(action.msg);
                textareaRef.current?.focus();
              }}
              className={`flex-shrink-0 px-3 py-1.5 text-xs ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } ${isIOS ? 'rounded-full' : 'rounded-lg'} transition-colors`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .safe-area-bottom {
          padding-bottom: max(12px, env(safe-area-inset-bottom));
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
});

export default ChatSuporteInApp;