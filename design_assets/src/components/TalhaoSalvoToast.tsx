/**
 * 🎉 TALHÃO SALVO TOAST - SOLOFORTE
 * 
 * Toast customizado com animação e link para cliente/fazenda
 * Design: Premium, iOS-style, com gradiente azul
 */

import { CheckCircle2, ExternalLink, MapPin, User } from 'lucide-react';

interface TalhaoSalvoToastProps {
  talhaoNome: string;
  area: number;
  clienteNome?: string;
  fazendaNome?: string;
  onViewCliente?: () => void;
  onViewFazenda?: () => void;
}

export function TalhaoSalvoToast({
  talhaoNome,
  area,
  clienteNome,
  fazendaNome,
  onViewCliente,
  onViewFazenda,
}: TalhaoSalvoToastProps) {
  return (
    <div className="w-full">
      {/* Header com ícone de sucesso */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
          <CheckCircle2 className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 mb-1">
            Talhão Salvo com Sucesso! 🎉
          </div>
          <div className="text-sm text-gray-600">
            <strong className="text-[#0057FF]">{talhaoNome}</strong> • {area.toFixed(2)} ha
          </div>
        </div>
      </div>

      {/* Links para Cliente e Fazenda */}
      {(clienteNome || fazendaNome) && (
        <div className="pl-[52px] space-y-2">
          {/* Cliente */}
          {clienteNome && onViewCliente && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewCliente();
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-gradient-to-r from-[#0057FF]/5 to-[#0057FF]/10 hover:from-[#0057FF]/10 hover:to-[#0057FF]/20 transition-all group"
            >
              <User className="h-4 w-4 text-[#0057FF] flex-shrink-0" />
              <span className="text-sm text-gray-700 flex-1 text-left">
                Cliente: <strong>{clienteNome}</strong>
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-[#0057FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          {/* Fazenda */}
          {fazendaNome && onViewFazenda && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewFazenda();
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/10 hover:from-green-500/10 hover:to-emerald-500/20 transition-all group"
            >
              <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 flex-1 text-left">
                Fazenda: <strong>{fazendaNome}</strong>
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
