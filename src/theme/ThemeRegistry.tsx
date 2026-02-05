'use client';

import { useMemo, useState, useEffect, createContext, useContext } from 'react';

type ThemeMode = 'light' | 'dark';

const ThemeModeContext = createContext<{
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}>({ mode: 'dark', setMode: () => {} });

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      setModeState(stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setModeState('light');
    }
  }, []);

  const setMode = useMemo(
    () => (m: ThemeMode) => {
      setModeState(m);
      localStorage.setItem('theme', m);
      if (m === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    []
  );

  // Apply theme on mount
  useEffect(() => {
    if (mounted) {
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [mode, mounted]);

  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}
