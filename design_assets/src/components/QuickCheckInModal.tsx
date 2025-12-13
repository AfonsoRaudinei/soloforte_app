import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, User, MapPin, Plus } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'sonner';

/**
 * 🎯 Quick Check-In Modal - Iteração 12
 * 
 * Modal minimalista com busca inteligente:
 * - 1 campo de busca unificado
 * - Auto-sugestão em tempo real
 * - Seleção direta → Check-in automático
 * - Estilo iOS translúcido
 */

interface Cliente {
  id: string;
  nome: string;
  fazendas?: { id: string; nome: string }[];
}

interface Fazenda {
  id: string;
  nome: string;
  cliente_id: string;
  cliente?: string | { nome: string };
}

interface QuickCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCliente: (clienteId: string, clienteNome: string, fazendaId?: string) => void;
  emVisita?: boolean;
  visitaAtual?: {
    clienteNome: string;
    fazendaNome: string;
  } | null;
  onEncerrarVisita?: () => void;
}

export function QuickCheckInModal({ 
  isOpen, 
  onClose, 
  onSelectCliente,
  emVisita,
  visitaAtual,
  onEncerrarVisita
}: QuickCheckInModalProps) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus no campo ao abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Buscar clientes e fazendas em tempo real
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Verificar se Supabase está configurado
        if (!supabase || (supabase as any).supabaseUrl?.includes('your-project-id')) {
          // Usar dados mockados
          const mockClientes: Cliente[] = [
            { id: '1', nome: 'João Silva', fazendas: [{}, {}] },
            { id: '2', nome: 'Maria Santos', fazendas: [{}] },
            { id: '3', nome: 'Pedro Costa', fazendas: [{}, {}, {}] },
          ];
          
          const mockFazendas: Fazenda[] = [
            { id: '1', nome: 'Fazenda Esperança', cliente_id: '1', cliente: { nome: 'João Silva' } },
            { id: '2', nome: 'Fazenda Vista Alegre', cliente_id: '1', cliente: { nome: 'João Silva' } },
            { id: '3', nome: 'Fazenda Bom Jesus', cliente_id: '2', cliente: { nome: 'Maria Santos' } },
            { id: '4', nome: 'Fazenda Santa Cruz', cliente_id: '3', cliente: { nome: 'Pedro Costa' } },
            { id: '5', nome: 'Fazenda Nova Vida', cliente_id: '3', cliente: { nome: 'Pedro Costa' } },
            { id: '6', nome: 'Fazenda Sol Nascente', cliente_id: '3', cliente: { nome: 'Pedro Costa' } },
          ];
          
          // Filtrar por termo de busca
          const filteredClientes = searchTerm 
            ? mockClientes.filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            : mockClientes;
          
          const filteredFazendas = searchTerm
            ? mockFazendas.filter(f => f.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            : mockFazendas;
          
          setClientes(filteredClientes.slice(0, 5));
          setFazendas(filteredFazendas.slice(0, 5));
          setLoading(false);
          return;
        }
        
        // Buscar clientes
        let clientesQuery = supabase
          .from('clientes')
          .select('id, nome')
          .order('nome');
        
        if (searchTerm) {
          clientesQuery = clientesQuery.ilike('nome', `%${searchTerm}%`);
        }
        
        const { data: clientesData, error: clientesError } = await clientesQuery.limit(5);
        
        if (clientesError) throw clientesError;
        
        // Buscar fazendas
        let fazendasQuery = supabase
          .from('fazendas')
          .select('id, nome, cliente_id, clientes(nome)')
          .order('nome');
        
        if (searchTerm) {
          fazendasQuery = fazendasQuery.ilike('nome', `%${searchTerm}%`);
        }
        
        const { data: fazendasData, error: fazendasError } = await fazendasQuery.limit(5);
        
        if (fazendasError) throw fazendasError;
        
        // Contar fazendas por cliente
        const { data: fazendasCount } = await supabase
          .from('fazendas')
          .select('cliente_id');
        
        const countMap = new Map<string, number>();
        fazendasCount?.forEach(f => {
          countMap.set(f.cliente_id, (countMap.get(f.cliente_id) || 0) + 1);
        });
        
        // Adicionar contador aos clientes
        const clientesComCount = (clientesData || []).map(c => ({
          ...c,
          fazendas: Array(countMap.get(c.id) || 0).fill({})
        }));
        
        setClientes(clientesComCount);
        setFazendas(fazendasData || []);
        
      } catch (error: any) {
        // Silenciar erros de fetch/configuração
        if (error?.message?.includes('Failed to fetch') || error?.message?.includes('fetch')) {
          console.warn('⚠️ Supabase não acessível - usando dados mockados');
          
          // Fallback para dados mockados
          const mockClientes: Cliente[] = [
            { id: '1', nome: 'João Silva', fazendas: [{}, {}] },
            { id: '2', nome: 'Maria Santos', fazendas: [{}] },
            { id: '3', nome: 'Pedro Costa', fazendas: [{}, {}, {}] },
          ];
          
          const mockFazendas: Fazenda[] = [
            { id: '1', nome: 'Fazenda Esperança', cliente_id: '1', cliente: { nome: 'João Silva' } },
            { id: '2', nome: 'Fazenda Vista Alegre', cliente_id: '1', cliente: { nome: 'João Silva' } },
            { id: '3', nome: 'Fazenda Bom Jesus', cliente_id: '2', cliente: { nome: 'Maria Santos' } },
            { id: '4', nome: 'Fazenda Santa Cruz', cliente_id: '3', cliente: { nome: 'Pedro Costa' } },
            { id: '5', nome: 'Fazenda Nova Vida', cliente_id: '3', cliente: { nome: 'Pedro Costa' } },
            { id: '6', nome: 'Fazenda Sol Nascente', cliente_id: '3', cliente: { nome: 'Pedro Costa' } },
          ];
          
          const filteredClientes = searchTerm 
            ? mockClientes.filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            : mockClientes;
          
          const filteredFazendas = searchTerm
            ? mockFazendas.filter(f => f.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            : mockFazendas;
          
          setClientes(filteredClientes.slice(0, 5));
          setFazendas(filteredFazendas.slice(0, 5));
        } else {
          console.error('Erro ao buscar dados:', error);
          toast.error('Erro ao carregar clientes');
        }
      } finally {
        setLoading(false);
      }
    };
    
    const debounce = setTimeout(fetchData, 300);
    return () => clearTimeout(debounce);
    
  }, [searchTerm, isOpen]);

  const handleSelectCliente = (cliente: Cliente) => {
    // 🎯 Feedback tátil + visual
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    
    onSelectCliente(cliente.id, cliente.nome);
    handleClose();
  };

  const handleSelectFazenda = (fazenda: Fazenda) => {
    // 🎯 Feedback tátil + visual
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    
    const clienteNome = typeof fazenda.cliente === 'object' ? fazenda.cliente.nome : 'Cliente';
    onSelectCliente(fazenda.cliente_id, clienteNome, fazenda.id);
    handleClose();
  };

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-6">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg shadow-black/10 border border-white/10 overflow-hidden">
            
            {/* Header */}
            <div className="px-6 pt-6 pb-4 bg-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Fazer Check-in</h3>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-gray-100/50 hover:bg-gray-200/50 flex items-center justify-center transition-all active:scale-95"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              {/* 🎯 Banner "Em Visita" */}
              {emVisita && visitaAtual && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <div>
                        <div className="text-xs text-green-700">Em visita</div>
                        <div className="text-sm text-gray-900">
                          {visitaAtual.clienteNome} – {visitaAtual.fazendaNome}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onEncerrarVisita?.();
                        handleClose();
                      }}
                      className="text-xs px-3 py-1.5 bg-white/50 hover:bg-white/80 rounded-lg transition-all active:scale-95"
                    >
                      Encerrar
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* 🎯 Search Field - DESTAQUE MÁXIMO */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 opacity-80" style={{ pointerEvents: 'none' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite o nome do produtor ou fazenda..."
                  className="w-full pl-11 pr-4 py-3.5 bg-white/85 backdrop-blur-sm rounded-xl border border-white/30 focus:border-[#0057FF]/50 focus:ring-4 focus:ring-[#0057FF]/10 outline-none transition-all placeholder:text-[#9CA3AF] shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                  style={{ fontSize: '16px' }} 
                />
              </div>
            </div>

            {/* Results - 🎯 PADDING EXTRA PARA EVITAR SOBREPOSIÇÃO COM DOCK */}
            <div className="max-h-[400px] overflow-y-auto px-6 py-4 pb-24">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-[#0057FF]/30 border-t-[#0057FF] rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Clientes */}
                  {clientes.length > 0 && (
                    <div className="space-y-2">
                      {/* 🎯 Subtítulo com estilo refinado */}
                      <div className="text-[13px] text-[#6B7280] px-2 py-1 tracking-tight">
                        Produtores
                      </div>
                      <div className="space-y-1.5">
                        {clientes.map((cliente) => (
                          <button
                            key={cliente.id}
                            onClick={() => handleSelectCliente(cliente)}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-white/50 hover:bg-white/80 rounded-xl transition-all duration-100 active:scale-[0.98] border border-transparent hover:border-[#0057FF]/20"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#0057FF]/10 flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-[#0057FF] opacity-80" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-gray-900">{cliente.nome}</div>
                              {cliente.fazendas && cliente.fazendas.length > 0 && (
                                <div className="text-xs text-gray-500">
                                  {cliente.fazendas.length} {cliente.fazendas.length === 1 ? 'fazenda' : 'fazendas'}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🎯 Divisor entre categorias */}
                  {clientes.length > 0 && fazendas.length > 0 && (
                    <div className="h-px bg-white/20 my-3" />
                  )}

                  {/* Fazendas */}
                  {fazendas.length > 0 && (
                    <div className="space-y-2">
                      {/* 🎯 Subtítulo com estilo refinado */}
                      <div className="text-[13px] text-[#6B7280] px-2 py-1 tracking-tight">
                        Fazendas
                      </div>
                      <div className="space-y-1.5">
                        {fazendas.map((fazenda) => (
                          <button
                            key={fazenda.id}
                            onClick={() => handleSelectFazenda(fazenda)}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-white/50 hover:bg-white/80 rounded-xl transition-all duration-100 active:scale-[0.98] border border-transparent hover:border-[#0057FF]/20"
                          >
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-green-600 opacity-80" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-gray-900">{fazenda.nome}</div>
                              {fazenda.cliente && (
                                <div className="text-xs text-gray-500">
                                  {typeof fazenda.cliente === 'object' ? fazenda.cliente.nome : fazenda.cliente}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {!loading && clientes.length === 0 && fazendas.length === 0 && (
                    <div className="text-center py-12">
                      {searchTerm ? (
                        <>
                          <div className="text-gray-400 mb-4">Nenhum resultado encontrado</div>
                          <button
                            onClick={handleClose}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0057FF] text-white rounded-xl hover:bg-[#0046CC] transition-colors active:scale-[0.98]"
                          >
                            <Plus className="w-4 h-4" />
                            Adicionar novo cliente
                          </button>
                        </>
                      ) : (
                        <div className="text-gray-400">Digite para buscar...</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}