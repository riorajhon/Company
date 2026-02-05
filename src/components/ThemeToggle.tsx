'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeMode } from '@/theme/ThemeRegistry';

export default function ThemeToggle() {
  const { mode, setMode } = useThemeMode();

  function toggle() {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }

  return (
    <button
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
    >
      {mode === 'dark' ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
}
