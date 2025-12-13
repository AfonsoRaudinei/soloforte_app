/**
 * 👤 PROFILE CONTEXT
 * 
 * Gerencia foto de perfil e informações do usuário
 * Compartilhado entre todos os componentes
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProfileContextType {
  fotoPerfil: string | null;
  setFotoPerfil: (foto: string | null) => void;
  nomeUsuario: string;
  setNomeUsuario: (nome: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [fotoPerfil, setFotoPerfilState] = useState<string | null>(null);
  const [nomeUsuario, setNomeUsuarioState] = useState('Usuário');

  // Carregar foto de perfil do localStorage ao iniciar
  useEffect(() => {
    const savedFoto = localStorage.getItem('soloforte_foto_perfil');
    const savedNome = localStorage.getItem('soloforte_nome_usuario');
    
    if (savedFoto) {
      setFotoPerfilState(savedFoto);
    }
    if (savedNome) {
      setNomeUsuarioState(savedNome);
    }
  }, []);

  // Função para salvar foto no localStorage
  const setFotoPerfil = (foto: string | null) => {
    setFotoPerfilState(foto);
    if (foto) {
      localStorage.setItem('soloforte_foto_perfil', foto);
    } else {
      localStorage.removeItem('soloforte_foto_perfil');
    }
  };

  // Função para salvar nome no localStorage
  const setNomeUsuario = (nome: string) => {
    setNomeUsuarioState(nome);
    localStorage.setItem('soloforte_nome_usuario', nome);
  };

  return (
    <ProfileContext.Provider value={{ 
      fotoPerfil, 
      setFotoPerfil,
      nomeUsuario,
      setNomeUsuario
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile deve ser usado dentro de ProfileProvider');
  }
  return context;
}
