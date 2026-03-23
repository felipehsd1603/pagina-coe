import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
type FontSize = 'normal' | 'large' | 'x-large';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'aegea-portal-theme';
const FONT_KEY = 'aegea-portal-font-size';
const CONTRAST_KEY = 'aegea-portal-high-contrast';
const MOTION_KEY = 'aegea-portal-reduced-motion';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialFontSize(): FontSize {
  if (typeof window === 'undefined') return 'normal';
  const stored = localStorage.getItem(FONT_KEY);
  if (stored === 'normal' || stored === 'large' || stored === 'x-large') return stored;
  return 'normal';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [fontSize, setFontSizeState] = useState<FontSize>(getInitialFontSize);
  const [highContrast, setHighContrast] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem(CONTRAST_KEY) === 'true' : false,
  );
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(MOTION_KEY);
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-normal', 'font-large', 'font-x-large');
    root.classList.add(`font-${fontSize}`);
    localStorage.setItem(FONT_KEY, fontSize);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem(CONTRAST_KEY, String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reducedMotion);
    localStorage.setItem(MOTION_KEY, String(reducedMotion));
  }, [reducedMotion]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);
  const setFontSize = useCallback((size: FontSize) => setFontSizeState(size), []);
  const toggleHighContrast = useCallback(() => setHighContrast((v) => !v), []);
  const toggleReducedMotion = useCallback(() => setReducedMotion((v) => !v), []);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, fontSize, setFontSize, highContrast, toggleHighContrast, reducedMotion, toggleReducedMotion }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
