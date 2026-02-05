'use client';

import { SessionProvider } from 'next-auth/react';
import ThemeRegistry from '@/theme/ThemeRegistry';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <SessionProvider>{children}</SessionProvider>
    </ThemeRegistry>
  );
}
