import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { STORAGE_KEYS } from './constants';

type ThemeMode = 'light' | 'dark';
type VisualStyle = 'ios' | 'microsoft';

interface ThemeContextType {
  mode: ThemeMode;
  visualStyle: VisualStyle;
  toggleMode: () => void;
  setVisualStyle: (style: VisualStyle) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [visualStyle, setVisualStyleState] = useState<VisualStyle>('ios');

  useEffect(() => {
    // Carregar preferências salvas
    const savedMode = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode;
    const savedStyle = localStorage.getItem(STORAGE_KEYS.VISUAL_STYLE) as VisualStyle;
    
    if (savedMode) setMode(savedMode);
    if (savedStyle) setVisualStyleState(savedStyle);
  }, []);

  useEffect(() => {
    // Aplicar classe dark no documento
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, mode);
  }, [mode]);

  useEffect(() => {
    // Aplicar classe de estilo visual
    document.documentElement.setAttribute('data-visual-style', visualStyle);
    localStorage.setItem(STORAGE_KEYS.VISUAL_STYLE, visualStyle);
  }, [visualStyle]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setVisualStyle = (style: VisualStyle) => {
    setVisualStyleState(style);
  };

  return (
    <ThemeContext.Provider value={{ mode, visualStyle, toggleMode, setVisualStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
