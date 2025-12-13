/**
 * ✅ TALHÃO SALVO MODAL - SOLOFORTE
 * 
 * Modal de confirmação pós-salvamento com animação premium
 * Design: iOS-style com glassmorphism e animações suaves
 */

import { Dialog, DialogContent } from './ui/dialog';
import { CheckCircle2, ExternalLink, MapPin, User, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface TalhaoSalvoModalProps {
  isOpen: boolean;
  onClose: () => void;
  talhaoNome: string;
  area: number;
  perimetro: number;
  clienteNome?: string;
  fazendaNome?: string;
  cultura?: string;
  safra?: string;
  onViewCliente?: () => void;
  onViewFazenda?: () => void;
}

export function TalhaoSalvoModal({
  isOpen,
  onClose,
  talhaoNome,
  area,
  perimetro,
  clienteNome,
  fazendaNome,
  cultura,
  safra,
  onViewCliente,
  onViewFazenda,
}: TalhaoSalvoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden border-0 bg-white/95 backdrop-blur-xl">
        {/* Animação de confetti/sucesso no fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-[#0057FF]/5 pointer-events-none" />
        
        <div className="relative">
          {/* Header com animação de sucesso */}
          <div className="px-6 pt-8 pb-6 text-center">
            {/* Ícone de sucesso animado */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.1 
              }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30"
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </motion.div>

            {/* Título com animação */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl text-gray-900 mb-2">
                Salvo com Sucesso! 🎉
              </h2>
              <p className="text-sm text-gray-600">
                Seu talhão foi salvo e vinculado
              </p>
            </motion.div>
          </div>

          {/* Informações do Talhão */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-6 pb-6"
          >
            {/* Card com informações principais */}
            <div className="bg-gradient-to-br from-[#0057FF]/5 to-[#0057FF]/10 rounded-2xl p-4 mb-4 border border-[#0057FF]/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0057FF] to-[#0041CC] flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{talhaoNome}</div>
                  <div className="text-sm text-gray-600">
                    {area.toFixed(2)} ha • {(perimetro / 1000).toFixed(2)} km
                  </div>
                </div>
              </div>

              {/* Cultura e Safra (se disponível) */}
              {(cultura || safra) && (
                <div className="flex gap-2 text-xs">
                  {cultura && (
                    <div className="px-2 py-1 bg-white/80 rounded-lg text-gray-700">
                      🌾 {cultura}
                    </div>
                  )}
                  {safra && (
                    <div className="px-2 py-1 bg-white/80 rounded-lg text-gray-700">
                      📅 {safra}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Vínculos */}
            <div className="space-y-2">
              {/* Cliente */}
              {clienteNome && (
                <button
                  onClick={() => {
                    onViewCliente?.();
                    onClose();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white hover:bg-gray-50 transition-all border border-gray-100 group shadow-sm hover:shadow-md"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#0057FF]/10 to-[#0057FF]/5 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-[#0057FF]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500">Cliente</div>
                    <div className="font-medium text-gray-900">{clienteNome}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[#0057FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}

              {/* Fazenda */}
              {fazendaNome && (
                <button
                  onClick={() => {
                    onViewFazenda?.();
                    onClose();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white hover:bg-gray-50 transition-all border border-gray-100 group shadow-sm hover:shadow-md"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500">Fazenda</div>
                    <div className="font-medium text-gray-900">{fazendaNome}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Footer com botão Fechar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="px-6 pb-6"
          >
            <Button
              onClick={onClose}
              className="w-full h-12 bg-gradient-to-r from-[#0057FF] to-[#0041CC] hover:from-[#0041CC] hover:to-[#002D99] text-white rounded-xl shadow-lg shadow-[#0057FF]/20 transition-all"
            >
              Entendido
            </Button>
          </motion.div>

          {/* Botão X no canto superior direito */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-sm"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
