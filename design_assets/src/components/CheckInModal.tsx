/**
 * ✔️ CHECK-IN MODAL - SOLOFORTE
 * 
 * Modal minimalista para check-in rápido
 * - Dropdown de produtor integrado
 * - Dropdown de fazenda (cascata)
 * - Botão de confirmar check-in
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { ClienteDropdown, ClienteComFazendas, ClienteRecente } from './ClienteDropdown';
import { FazendaDropdown } from './FazendaDropdown';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientes: ClienteComFazendas[];
  clientesRecentes: ClienteRecente[];
  onCheckIn: (clienteId: string, fazendaId: string, clienteNome: string, fazendaNome: string) => void;
  onViewAll: () => void;
  onAddNew: () => void;
}

export function CheckInModal({
  isOpen,
  onClose,
  clientes,
  clientesRecentes,
  onCheckIn,
  onViewAll,
  onAddNew,
}: CheckInModalProps) {
  const [selectedCliente, setSelectedCliente] = useState<ClienteComFazendas | null>(null);
  const [selectedFazenda, setSelectedFazenda] = useState<{ id: string; nome: string } | null>(null);

  // Reset ao abrir
  useEffect(() => {
    if (isOpen) {
      setSelectedCliente(null);
      setSelectedFazenda(null);
    }
  }, [isOpen]);

  const handleClienteSelect = (cliente: ClienteComFazendas) => {
    setSelectedCliente(cliente);
    setSelectedFazenda(null);

    // Se tem apenas 1 fazenda, auto-seleciona
    if (cliente.fazendas.length === 1) {
      setSelectedFazenda(cliente.fazendas[0]);
    }
  };

  const handleFazendaSelect = (fazenda: { id: string; nome: string }) => {
    setSelectedFazenda(fazenda);
  };

  const handleConfirm = () => {
    if (!selectedCliente || !selectedFazenda) return;
    
    onCheckIn(
      selectedCliente.id,
      selectedFazenda.id,
      selectedCliente.nome,
      selectedFazenda.nome
    );
    
    onClose();
  };

  const canConfirm = selectedCliente && selectedFazenda;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[9999] bg-white rounded-3xl shadow-2xl max-w-md mx-auto overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Fazer Check-in
                  </h3>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Registrar entrada em cliente
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-sm"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-4 max-h-[60vh] overflow-y-auto pb-40">
              {/* Dropdown de Produtor */}
              <ClienteDropdown
                clientes={clientes}
                clientesRecentes={clientesRecentes}
                onSelect={handleClienteSelect}
                onViewAll={() => {
                  onClose();
                  onViewAll();
                }}
                onAddNew={() => {
                  onClose();
                  onAddNew();
                }}
              />

              {/* Dropdown de Fazenda */}
              <FazendaDropdown
                fazendas={selectedCliente?.fazendas || []}
                onSelect={handleFazendaSelect}
                disabled={!selectedCliente}
              />

              {/* Preview da Seleção */}
              {canConfirm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100"
                >
                  <div className="text-xs uppercase tracking-wide text-green-700 font-medium mb-2">
                    Check-in será realizado em:
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">
                      <span className="font-semibold">{selectedCliente.nome}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      📍 {selectedFazenda.nome}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 active:scale-95 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={!canConfirm}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  canConfirm
                    ? 'bg-gradient-to-r from-[#0057FF] to-[#0041CC] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Check className="h-5 w-5" />
                <span>Confirmar Check-in</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}