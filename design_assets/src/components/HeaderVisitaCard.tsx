/**
 * 📍 HEADER VISITA CARD - SOLOFORTE
 * 
 * Card fixo superior que exibe contexto ativo:
 * - Cliente atual
 * - Fazenda atual
 * - Talhão selecionado (se houver)
 * - Indicador de visita em andamento
 */

import { motion, AnimatePresence } from 'motion/react';
import { MapPin, User } from 'lucide-react';

interface Cliente {
  id: string;
  nome: string;
}

interface Fazenda {
  id: string;
  nome: string;
}

interface Talhao {
  id: string;
  nome: string;
}

interface HeaderVisitaCardProps {
  cliente?: Cliente | null;
  fazenda?: Fazenda | null;
  talhao?: Talhao | null;
  emVisita: boolean;
}

export function HeaderVisitaCard({ cliente, fazenda, talhao, emVisita }: HeaderVisitaCardProps) {
  // Só renderiza se estiver em visita ou tiver contexto ativo
  const shouldShow = emVisita && (cliente || fazenda);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-3 left-3 right-3 z-30 flex items-center justify-center px-safe"
        >
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2.5 shadow-lg border border-gray-100/50 max-w-[calc(100vw-24px)]">
            {/* Cliente */}
            {cliente && (
              <div className="flex items-center gap-1.5 min-w-0">
                <User className="h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {cliente.nome}
                </span>
              </div>
            )}

            {/* Separador */}
            {cliente && fazenda && (
              <span className="text-gray-300 flex-shrink-0">·</span>
            )}

            {/* Fazenda */}
            {fazenda && (
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="h-3.5 w-3.5 text-[#0057FF] flex-shrink-0" />
                <span className="text-sm font-medium text-[#0057FF] truncate">
                  {fazenda.nome}
                </span>
              </div>
            )}

            {/* Separador */}
            {talhao && (
              <span className="text-gray-300 flex-shrink-0">·</span>
            )}

            {/* Talhão */}
            {talhao && (
              <span className="text-sm text-gray-700 truncate">
                {talhao.nome}
              </span>
            )}

            {/* Indicador de visita ativa */}
            {emVisita && (
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="ml-2 w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50 flex-shrink-0"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
