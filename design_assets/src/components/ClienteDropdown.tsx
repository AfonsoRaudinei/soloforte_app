/**
 * 🧑‍🌾 CLIENTE DROPDOWN - SOLOFORTE
 * 
 * Dropdown minimalista iOS-style para seleção rápida de produtor
 * Features:
 * - Lista de produtores recentes (top 5)
 * - Contador de fazendas por produtor
 * - Opção "Ver todos" (abre sheet completo)
 * - Opção "+ Adicionar novo"
 * - Animação suave slide + fade
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, User, Plus, List } from 'lucide-react';

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

interface ClienteDropdownProps {
  clientes: ClienteComFazendas[];
  clientesRecentes: ClienteRecente[];
  onSelect: (cliente: ClienteComFazendas) => void;
  onViewAll: () => void;
  onAddNew: () => void;
  className?: string;
}

export function ClienteDropdown({
  clientes,
  clientesRecentes,
  onSelect,
  onViewAll,
  onAddNew,
  className = '',
}: ClienteDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Criar lista de clientes recentes únicos (remover duplicatas)
  const clientesRecentesUnicos = Array.from(
    new Map(
      clientesRecentes.map(r => [r.clienteId, r])
    ).values()
  ).slice(0, 5);

  // Pegar dados completos dos clientes recentes
  const clientesRecentesCompletos = clientesRecentesUnicos
    .map(recente => clientes.find(c => c.id === recente.clienteId))
    .filter(Boolean) as ClienteComFazendas[];

  const handleSelect = (cliente: ClienteComFazendas) => {
    setSelectedId(cliente.id);
    setIsOpen(false);
    onSelect(cliente);
  };

  const selectedCliente = clientes.find(c => c.id === selectedId);

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#0057FF] hover:bg-blue-50/50 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0057FF] to-[#0041CC] flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-xs text-gray-500 mb-0.5">Produtor</div>
            {selectedCliente ? (
              <>
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {selectedCliente.nome}
                </div>
                <div className="text-xs text-gray-500">
                  {selectedCliente.fazendas.length} fazenda{selectedCliente.fazendas.length !== 1 ? 's' : ''}
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Selecionar produtor</div>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[100]"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-2 z-[101] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[400px] overflow-y-auto"
            >
              {/* Produtores Recentes */}
              {clientesRecentesCompletos.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                      Recentes
                    </span>
                  </div>
                  {clientesRecentesCompletos.map((cliente) => (
                    <button
                      key={cliente.id}
                      onClick={() => handleSelect(cliente)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 active:bg-blue-100 transition-colors relative"
                    >
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#0057FF] to-[#0041CC] flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {cliente.nome}
                        </div>
                        <div className="text-xs text-gray-500">
                          {cliente.fazendas.length} fazenda{cliente.fazendas.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      {selectedId === cliente.id && (
                        <Check className="h-4 w-4 text-[#0057FF] flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </>
              )}

              {/* Separador */}
              {clientesRecentesCompletos.length > 0 && (
                <div className="h-px bg-gray-200" />
              )}

              {/* Ações */}
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                  Ações
                </span>
              </div>

              {/* Ver Todos */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewAll();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <List className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900">
                    Ver todos os produtores
                  </div>
                  <div className="text-xs text-gray-500">
                    {clientes.length} cadastrado{clientes.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </button>

              {/* Adicionar Novo */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAddNew();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 active:bg-green-100 transition-colors border-t border-gray-100"
              >
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Plus className="h-4 w-4 text-green-700" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-green-700">
                    Adicionar novo produtor
                  </div>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
