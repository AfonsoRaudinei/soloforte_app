/**
 * 🏡 FAZENDA DROPDOWN - SOLOFORTE
 * 
 * Dropdown minimalista para seleção de fazenda após escolher o produtor
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, MapPin } from 'lucide-react';

interface Fazenda {
  id: string;
  nome: string;
}

interface FazendaDropdownProps {
  fazendas: Fazenda[];
  onSelect: (fazenda: Fazenda) => void;
  className?: string;
  disabled?: boolean;
}

export function FazendaDropdown({
  fazendas,
  onSelect,
  className = '',
  disabled = false,
}: FazendaDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (fazenda: Fazenda) => {
    setSelectedId(fazenda.id);
    setIsOpen(false);
    onSelect(fazenda);
  };

  const selectedFazenda = fazendas.find(f => f.id === selectedId);

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white border-2 rounded-2xl transition-all ${
          disabled
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
            : 'border-gray-200 hover:border-green-500 hover:bg-green-50/50 active:scale-[0.98]'
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            disabled 
              ? 'bg-gray-200'
              : 'bg-gradient-to-br from-green-500 to-emerald-600'
          }`}>
            <MapPin className={`h-5 w-5 ${disabled ? 'text-gray-400' : 'text-white'}`} />
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-xs text-gray-500 mb-0.5">Fazenda</div>
            {selectedFazenda ? (
              <div className="text-sm font-semibold text-gray-900 truncate">
                {selectedFazenda.nome}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {disabled ? 'Selecione um produtor primeiro' : 'Selecionar fazenda'}
              </div>
            )}
          </div>
        </div>
        {!disabled && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </motion.div>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && !disabled && (
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
              className="absolute top-full left-0 right-0 mt-2 z-[101] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[300px] overflow-y-auto"
            >
              {fazendas.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  Nenhuma fazenda cadastrada
                </div>
              ) : (
                fazendas.map((fazenda) => (
                  <button
                    key={fazenda.id}
                    onClick={() => handleSelect(fazenda)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 active:bg-green-100 transition-colors relative border-b border-gray-50 last:border-b-0"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {fazenda.nome}
                      </div>
                    </div>
                    {selectedId === fazenda.id && (
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
