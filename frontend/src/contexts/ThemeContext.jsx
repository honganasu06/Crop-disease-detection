import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return 'light';
    
    // Check localStorage first, then system preference
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
    
    // Check system preference
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Update document class and localStorage
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.warn('Could not save theme to localStorage:', e);
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

