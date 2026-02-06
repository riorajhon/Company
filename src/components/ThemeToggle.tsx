'use client';

import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '@/theme/ThemeRegistry';

export default function ThemeToggle({ variant }: { variant?: 'light' | 'dark' }) {
  const { mode, setMode } = useThemeMode();

  function toggle() {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }

  return (
    <IconButton
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
      color="inherit"
      size="small"
    >
      {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </IconButton>
  );
}
