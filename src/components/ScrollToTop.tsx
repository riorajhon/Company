'use client';

import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 shadow-lg transition-all duration-200 hover:scale-105"
    >
      <ChevronUpIcon className="w-6 h-6" strokeWidth={2} />
    </button>
  );
}
