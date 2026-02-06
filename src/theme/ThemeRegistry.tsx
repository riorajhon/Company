'use client';

import { useMemo, useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

const ThemeModeContext = createContext<{
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}>({ mode: 'dark', setMode: () => {} });

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

const getDesignTokens = (mode: ThemeMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#00a3e0', light: '#4dd3ff', dark: '#0088c2' },
          background: { default: '#f5f6f8', paper: '#ffffff' },
          text: { primary: '#1a1d21', secondary: '#5c6470' },
        }
      : {
          primary: { main: '#00a3e0', light: '#4dd3ff', dark: '#0088c2' },
          background: { default: '#0f1419', paper: '#1e262f' },
          text: { primary: '#f0f2f5', secondary: '#8b95a5' },
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { textDecoration: 'none' },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      setModeState(stored);
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setModeState('light');
    }
  }, []);

  const setMode = useMemo(
    () => (m: ThemeMode) => {
      setModeState(m);
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', m);
      if (typeof document !== 'undefined') {
        if (m === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    },
    []
  );

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      if (mode === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, [mode, mounted]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (!mounted) {
    return <div style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
