import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  isDarkMode: boolean;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme') as ThemeMode;
    return savedMode || 'system';
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply theme changes
  useEffect(() => {
    localStorage.setItem('theme', mode);
    
    const applyTheme = () => {
      let darkModeOn = false;
      
      if (mode === 'system') {
        darkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        darkModeOn = mode === 'dark';
      }
      
      setIsDarkMode(darkModeOn);
      
      if (darkModeOn) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    applyTheme();
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'system') {
        applyTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, isDarkMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};