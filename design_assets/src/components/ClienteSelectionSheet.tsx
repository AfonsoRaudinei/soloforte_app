/**
 * 🎯 CLIENT SELECTION SHEET - SOLOFORTE
 * 
 * Bottom sheet iOS-style para seleção de cliente/fazenda
 * Features:
 * - Lista de clientes recentes (top 5)
 * - Botão para selecionar outro cliente (dropdown completo)
 * - Animação suave de entrada/saída
 * - Design minimalista e limpo
 */

import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ChevronRight, Plus, X, User, Building2, Clock } from 'lucide-react';
import { useState } from 'react';

export interface ClienteComFazendas {
  id: string;
  nome: string;
  fazendas: Array<{ id: string; nome: string }>;
}

export interface ClienteRecente {
  clienteId: string;
  clienteNome: string;
  fazendaId: string;
  fazendaNome: string;
  ultimaVisita: string;
}

interface ClienteSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  clientes: ClienteComFazendas[];
  clientesRecentes: ClienteRecente[];
  onSelectClienteFazenda: (clienteId: string, fazendaId: string, clienteNome: string, fazendaNome: string) => void;
}

export function ClienteSelectionSheet({
  isOpen,
  onClose,
  clientes,
  clientesRecentes,
  onSelectClienteFazenda,
}: ClienteSelectionSheetProps) {
  const [selectedCliente, setSelectedCliente] = useState<ClienteComFazendas | null>(null);
  const [showAllClientes, setShowAllClientes] = useState(false);

  const handleSelectRecente = (recente: ClienteRecente) => {
    onSelectClienteFazenda(
      recente.clienteId,
      recente.fazendaId,
      recente.clienteNome,
      recente.fazendaNome
    );
    onClose();
  };

  const handleSelectCliente = (cliente: ClienteComFazendas) => {
    if (cliente.fazendas.length === 1) {
      // Se tem apenas 1 fazenda, seleciona direto
      onSelectClienteFazenda(
        cliente.id,
        cliente.fazendas[0].id,
        cliente.nome,
        cliente.fazendas[0].nome
      );
      onClose();
    } else {
      // Se tem múltiplas fazendas, abre seleção
      setSelectedCliente(cliente);
    }
  };

  const handleSelectFazenda = (fazenda: { id: string; nome: string }) => {
    if (!selectedCliente) return;
    
    onSelectClienteFazenda(
      selectedCliente.id,
      fazenda.id,
      selectedCliente.nome,
      fazenda.nome
    );
    onClose();
  };

  const handleBack = () => {
    if (showAllClientes) {
      setShowAllClientes(false);
    } else if (selectedCliente) {
      setSelectedCliente(null);
    } else {
      onClose();
    }
  };

  // Formatar tempo relativo
  const formatTempoRelativo = (isoDate: string) => {
    const diff = Date.now() - new Date(isoDate).getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor(diff / (1000 * 60));

    if (dias > 0) return `${dias}d atrás`;
    if (horas > 0) return `${horas}h atrás`;
    if (minutos > 0) return `${minutos}min atrás`;
    return 'Agora';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBack}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 font-semibold">
                    {selectedCliente 
                      ? 'Selecione a fazenda' 
                      : showAllClientes
                      ? 'Todos os clientes'
                      : 'Em qual cliente você está?'}
                  </h3>
                  {selectedCliente && (
                    <p className="text-sm text-gray-600 mt-0.5">
                      {selectedCliente.nome}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleBack}
                  className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 pb-32">
              {selectedCliente ? (
                // Lista de fazendas do cliente selecionado
                <div className="space-y-2">
                  {selectedCliente.fazendas.map((fazenda) => (
                    <button
                      key={fazenda.id}
                      onClick={() => handleSelectFazenda(fazenda)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 active:scale-[0.98] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-900 font-medium">{fazenda.nome}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              ) : showAllClientes ? (
                // Lista completa de clientes
                <div className="space-y-2">
                  {clientes.map((cliente) => (
                    <button
                      key={cliente.id}
                      onClick={() => handleSelectCliente(cliente)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 active:scale-[0.98] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-gray-900 font-medium">{cliente.nome}</div>
                          <div className="text-xs text-gray-500">
                            {cliente.fazendas.length} fazenda{cliente.fazendas.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              ) : (
                // Lista de recentes + botão para ver todos
                <div className="space-y-4">
                  {/* Clientes Recentes */}
                  {clientesRecentes.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-1">
                        Recentes
                      </h4>
                      <div className="space-y-2">
                        {clientesRecentes.map((recente, index) => (
                          <button
                            key={`${recente.clienteId}-${recente.fazendaId}-${index}`}
                            onClick={() => handleSelectRecente(recente)}
                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 active:scale-[0.98] transition-all border border-blue-100/50"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0057FF] to-[#0041CC] flex items-center justify-center flex-shrink-0">
                                <MapPin className="h-5 w-5 text-white" />
                              </div>
                              <div className="text-left flex-1 min-w-0">
                                <div className="text-gray-900 font-medium truncate">
                                  {recente.fazendaNome}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5">
                                  <span className="truncate">{recente.clienteNome}</span>
                                  <span className="text-gray-400">•</span>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatTempoRelativo(recente.ultimaVisita)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botão Selecionar Outro Cliente */}
                  <div>
                    {clientesRecentes.length > 0 && (
                      <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-1">
                        Outros
                      </h4>
                    )}
                    <button
                      onClick={() => setShowAllClientes(true)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 active:scale-[0.98] transition-all border-2 border-dashed border-gray-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Plus className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="text-gray-900 font-medium">Selecionar outro cliente</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Safe Area para iOS */}
            <div className="h-safe-bottom bg-white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}