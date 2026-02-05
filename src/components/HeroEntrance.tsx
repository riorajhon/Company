'use client';

import { useEffect, useState } from 'react';

export default function HeroEntrance({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={mounted ? 'animate-hero animate-visible' : 'animate-hero'}>
      {children}
    </div>
  );
}
