'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function HideScrollbar() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (pathname === '/') {
      root.classList.add('hide-scrollbar');
      document.body.classList.add('hide-scrollbar');
    } else {
      root.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
    }
    return () => {
      root.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
    };
  }, [pathname]);

  return null;
}
