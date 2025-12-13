import { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth, createClient } from '../supabase/client';
import { logger } from '../logger';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'support';
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface ChatSession {
  id: string;
  userId: string;
  status: 'open' | 'closed';
  createdAt: string;
  lastMessageAt: string;
  unreadCount: number;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [supportOnline, setSupportOnline] = useState(true); // Simular status
  const [supportTyping, setSupportTyping] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    // Escutar mudanças de autenticação
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Buscar ou criar sessão de chat
  const initializeChat = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await fetchWithAuth('/chat/session', {
        method: 'GET',
      });

      if (response.success) {
        setSession(response.session);
        setMessages(response.messages || []);
        logger.log('Chat inicializado:', response.session);
      }
    } catch (error) {
      if (isAuthenticated) {
        logger.error('Erro ao inicializar chat:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Enviar mensagem
  const sendMessage = useCallback(async (message: string, attachments?: string[]) => {
    if (!message.trim() && (!attachments || attachments.length === 0)) return;

    setSending(true);
    try {
      // Adicionar mensagem do usuário imediatamente para feedback visual
      const tempMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        senderId: 'user',
        senderName: 'Você',
        senderType: 'user',
        message: message.trim(),
        timestamp: new Date().toISOString(),
        read: true,
        attachments,
      };
      
      setMessages(prev => [...prev, tempMessage]);

      const response = await fetchWithAuth('/chat/send', {
        method: 'POST',
        body: {
          message: message.trim(),
          attachments,
          sessionId: session?.id,
        },
      });

      if (response.success) {
        // Atualizar com a mensagem real do backend
        setMessages(prev => prev.map(m => 
          m.id === tempMessage.id ? response.message : m
        ));
        logger.log('Mensagem enviada:', response.message);

        // Simular resposta do suporte (para demonstração)
        simulateSupportResponse(message);
      }
    } catch (error) {
      logger.error('Erro ao enviar mensagem:', error);
      // Remover mensagem temporária em caso de erro
      setMessages(prev => prev.filter(m => !m.id.startsWith('temp-')));
      throw error;
    } finally {
      setSending(false);
    }
  }, [session]);

  // Marcar mensagens como lidas
  const markAsRead = useCallback(async () => {
    if (!session) return;

    try {
      await fetchWithAuth('/chat/mark-read', {
        method: 'POST',
        body: { sessionId: session.id },
      });

      setMessages(prev =>
        prev.map(msg => ({ ...msg, read: true }))
      );
      
      if (session) {
        setSession({ ...session, unreadCount: 0 });
      }
    } catch (error) {
      logger.error('Erro ao marcar mensagens como lidas:', error);
    }
  }, [session]);

  // Simular resposta do suporte (demo)
  const simulateSupportResponse = (userMessage: string) => {
    setSupportTyping(true);

    setTimeout(() => {
      setSupportTyping(false);

      const responses = [
        'Obrigado por entrar em contato! Como posso ajudá-lo hoje?',
        'Recebi sua mensagem. Nossa equipe está analisando e responderá em breve.',
        'Entendi. Estou verificando isso para você.',
        'Ótima pergunta! Deixe-me buscar essas informações.',
        'Estamos aqui para ajudar. Pode me dar mais detalhes sobre sua dúvida?',
      ];

      // Respostas específicas baseadas em palavras-chave
      let responseText = '';
      const lowerMsg = userMessage.toLowerCase();

      if (lowerMsg.includes('ndvi') || lowerMsg.includes('análise')) {
        responseText = 'Para análise NDVI, acesse o Dashboard > Selecione uma área > Clique em "Analisar NDVI". Precisa de ajuda com alguma área específica?';
      } else if (lowerMsg.includes('mapa') || lowerMsg.includes('desenhar')) {
        responseText = 'Para desenhar áreas no mapa, use os botões de ferramentas no canto direito do Dashboard. Temos 7 ferramentas: polígono, retângulo, círculo, mão livre, recorte, importar KML e tirar foto!';
      } else if (lowerMsg.includes('relatório') || lowerMsg.includes('exportar')) {
        responseText = 'Você pode exportar relatórios em PDF ou Excel através da página de Relatórios. Quer que eu te mostre como?';
      } else if (lowerMsg.includes('equipe') || lowerMsg.includes('tarefas')) {
        responseText = 'O sistema de Gestão de Equipes permite criar tarefas, atribuir membros e acompanhar o progresso. Acesse através do menu FAB no Dashboard!';
      } else if (lowerMsg.includes('praga') || lowerMsg.includes('scanner')) {
        responseText = 'O Scanner de Pragas usa IA com GPT-4 Vision para identificar pragas. Tire uma foto clara da planta ou inseto e aguarde a análise!';
      } else {
        responseText = responses[Math.floor(Math.random() * responses.length)];
      }

      const supportMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: 'support-bot',
        senderName: 'Equipe SoloForte',
        senderType: 'support',
        message: responseText,
        timestamp: new Date().toISOString(),
        read: false,
      };

      setMessages(prev => [...prev, supportMessage]);
    }, 2000 + Math.random() * 2000); // 2-4 segundos
  };

  // Buscar histórico de mensagens
  const loadMoreMessages = useCallback(async () => {
    if (!session) return;

    try {
      const response = await fetchWithAuth(`/chat/messages/${session.id}`, {
        method: 'GET',
      });

      if (response.success) {
        setMessages(response.messages || []);
      }
    } catch (error) {
      logger.error('Erro ao carregar mensagens:', error);
    }
  }, [session]);

  // Inicializar chat ao montar
  useEffect(() => {
    if (isAuthenticated) {
      initializeChat();
    }
  }, [isAuthenticated, initializeChat]);

  return {
    messages,
    session,
    loading,
    sending,
    supportOnline,
    supportTyping,
    sendMessage,
    markAsRead,
    loadMoreMessages,
  };
}
