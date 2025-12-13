/**
 * 🔖 HOOK: CLIENTES RECENTES - SOLOFORTE
 * 
 * Gerencia lista de clientes visitados recentemente
 * Persistência: localStorage + Supabase (futuro)
 */

import { useState, useEffect } from 'react';

export interface ClienteRecente {
  clienteId: string;
  clienteNome: string;
  fazendaId: string;
  fazendaNome: string;
  ultimaVisita: string; // ISO timestamp
}

const STORAGE_KEY = 'soloforte_clientes_recentes';
const MAX_RECENTES = 5;

export function useClientesRecentes() {
  const [recentes, setRecentes] = useState<ClienteRecente[]>([]);

  // Carregar do localStorage ao montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ClienteRecente[];
        setRecentes(parsed);
      }
    } catch (error) {
      console.error('Erro ao carregar clientes recentes:', error);
    }
  }, []);

  // Adicionar cliente aos recentes
  const adicionarRecente = (cliente: Omit<ClienteRecente, 'ultimaVisita'>) => {
    const novoRecente: ClienteRecente = {
      ...cliente,
      ultimaVisita: new Date().toISOString(),
    };

    setRecentes(prev => {
      // Remover duplicatas (mesmo cliente + fazenda)
      const filtrados = prev.filter(
        r => !(r.clienteId === cliente.clienteId && r.fazendaId === cliente.fazendaId)
      );

      // Adicionar no início e limitar a MAX_RECENTES
      const novosRecentes = [novoRecente, ...filtrados].slice(0, MAX_RECENTES);

      // Salvar no localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novosRecentes));
      } catch (error) {
        console.error('Erro ao salvar clientes recentes:', error);
      }

      return novosRecentes;
    });
  };

  // Limpar todos os recentes
  const limparRecentes = () => {
    setRecentes([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar recentes:', error);
    }
  };

  return {
    recentes,
    adicionarRecente,
    limparRecentes,
  };
}
