/**
 * 🏷️ VISITA TAG - SOLOFORTE
 * 
 * Tag minimalista "Em visita" que aparece no header
 * Design: Discreta, animada, iOS-style
 * Funcionalidade: Clicável para finalizar visita
 */

import { motion } from 'motion/react';
import { Clock, MapPin, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VisitaTagProps {
  clienteNome: string;
  fazendaNome?: string;
  startTime: Date;
  onCheckOut: () => void;
}

export function VisitaTag({ clienteNome, fazendaNome, startTime, onCheckOut }: VisitaTagProps) {
  const [duration, setDuration] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // 🔍 DEBUG: Logar props recebidas
  console.log('🏷️ VisitaTag renderizado:', { clienteNome, fazendaNome, startTime });

  useEffect(() => {
    const updateDuration = () => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      if (hours > 0) {
        setDuration(`${hours}h${mins > 0 ? mins.toString().padStart(2, '0') : ''}`);
      } else {
        setDuration(`${mins}min`);
      }
    };

    updateDuration();
    const interval = setInterval(updateDuration, 30000); // Atualiza a cada 30s

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="relative">
      {/* Tag Principal */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onClick={() => setShowMenu(!showMenu)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 hover:shadow-green-500/40 active:scale-95 transition-all"
      >
        {/* Indicador pulsante */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-2 h-2 rounded-full bg-white"
        />

        {/* Texto */}
        <div className="flex items-center gap-1.5 text-white text-xs">
          <span className="font-medium">Em visita</span>
          
          {/* Nome da fazenda e cliente */}
          <span className="opacity-90">•</span>
          <span className="max-w-[140px] truncate">
            {fazendaNome} ({clienteNome})
          </span>

          {/* Duração */}
          {duration && (
            <>
              <span className="opacity-90">•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            </>
          )}
        </div>
      </motion.button>

      {/* Menu de Check-out */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="font-medium text-gray-900">Visita em andamento</span>
              </div>
            </div>

            {/* Detalhes */}
            <div className="px-4 py-3 space-y-2 bg-white">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Cliente:</span>
                <span className="font-medium text-gray-900">{clienteNome}</span>
              </div>
              {fazendaNome && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fazenda:</span>
                  <span className="font-medium text-gray-900">{fazendaNome}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duração:</span>
                <span className="font-medium text-gray-900">{duration}</span>
              </div>
            </div>

            {/* Botão de Check-out */}
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onCheckOut();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 active:scale-95 transition-all shadow-md"
              >
                <LogOut className="h-4 w-4" />
                <span>Finalizar Visita</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}