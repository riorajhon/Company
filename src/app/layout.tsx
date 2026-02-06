import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Providers from '@/components/Providers';
import HideScrollbar from '@/components/HideScrollbar';

export const metadata: Metadata = {
  title: 'Sobapps — Careers | Join Our Team',
  description: 'Explore open jobs at Sobapps. We\'re hiring tech talent — find your next opportunity and grow with us.',
};

const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>
          <HideScrollbar />
          <Header />
          <main className="bg-gray-50 dark:bg-gray-900">{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
