/**
 * 🔍 TALHÃO FILTER BAR - SOLOFORTE
 * 
 * Barra de filtros para talhões por Cliente/Fazenda
 * Design: Clean, mobile-first, dropdown nativo iOS/Android
 */

import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';

export interface Cliente {
  id: string;
  nome: string;
}

export interface Fazenda {
  id: string;
  nome: string;
  cliente_id: string;
}

interface TalhaoFilterBarProps {
  clientes: Cliente[];
  fazendas: Fazenda[];
  selectedClienteId: string | null;
  selectedFazendaId: string | null;
  onClienteChange: (clienteId: string | null) => void;
  onFazendaChange: (fazendaId: string | null) => void;
  visibleCount: number;
  totalCount: number;
}

export function TalhaoFilterBar({
  clientes,
  fazendas,
  selectedClienteId,
  selectedFazendaId,
  onClienteChange,
  onFazendaChange,
  visibleCount,
  totalCount,
}: TalhaoFilterBarProps) {
  // Filtrar fazendas do cliente selecionado
  const fazendasFiltradas = selectedClienteId
    ? fazendas.filter(f => f.cliente_id === selectedClienteId)
    : fazendas;

  const handleLimparFiltros = () => {
    onClienteChange(null);
    onFazendaChange(null);
  };

  const temFiltroAtivo = selectedClienteId || selectedFazendaId;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-gray-200/50">
      {/* Header com ícone e contador */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#0057FF]" />
          <span className="text-sm text-gray-900">Filtros</span>
        </div>
        
        {/* Contador de talhões visíveis */}
        <div className="flex items-center gap-2">
          <div className="text-xs">
            <span className="text-gray-600">Visíveis: </span>
            <span className="text-[#0057FF] font-medium">{visibleCount}</span>
            <span className="text-gray-400"> / {totalCount}</span>
          </div>
          
          {temFiltroAtivo && (
            <Button
              onClick={handleLimparFiltros}
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </div>

      {/* Filtros lado a lado */}
      <div className="grid grid-cols-2 gap-2">
        {/* Dropdown Cliente */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-600 px-1">Cliente</label>
          <select
            value={selectedClienteId || ''}
            onChange={(e) => {
              const newClienteId = e.target.value || null;
              onClienteChange(newClienteId);
              // Limpar fazenda se trocar de cliente
              if (newClienteId !== selectedClienteId) {
                onFazendaChange(null);
              }
            }}
            className="w-full h-9 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0057FF]/20 focus:border-[#0057FF] appearance-none cursor-pointer transition-all"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              paddingRight: '28px',
            }}
          >
            <option value="">Todos os clientes</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Fazenda */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-600 px-1">Fazenda</label>
          <select
            value={selectedFazendaId || ''}
            onChange={(e) => onFazendaChange(e.target.value || null)}
            disabled={!selectedClienteId && fazendasFiltradas.length === 0}
            className="w-full h-9 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0057FF]/20 focus:border-[#0057FF] appearance-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              paddingRight: '28px',
            }}
          >
            <option value="">
              {selectedClienteId ? 'Todas as fazendas' : 'Selecione um cliente'}
            </option>
            {fazendasFiltradas.map((fazenda) => (
              <option key={fazenda.id} value={fazenda.id}>
                {fazenda.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Indicador visual de filtro ativo */}
      {temFiltroAtivo && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-2 rounded-full bg-[#0057FF] animate-pulse" />
            <span className="text-gray-600">
              Filtrando por:{' '}
              {selectedClienteId && (
                <span className="text-gray-900 font-medium">
                  {clientes.find(c => c.id === selectedClienteId)?.nome}
                </span>
              )}
              {selectedClienteId && selectedFazendaId && ' → '}
              {selectedFazendaId && (
                <span className="text-gray-900 font-medium">
                  {fazendas.find(f => f.id === selectedFazendaId)?.nome}
                </span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
