import Link from 'next/link';

/** Placeholder logo – replace /public/logo.svg with your own asset */
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M10 12h12v2H10V12zm0 4h12v2H10v-2zm0 4h8v2h-8v-2z"
        fill="currentColor"
      />
      <circle cx="22" cy="20" r="3" fill="#00a3e0" />
    </svg>
  );
}

export default function Logo({ variant }: { variant?: 'light' | 'dark' }) {
  const isDarkBar = variant === 'dark';
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-3 transition-colors duration-200 ${
        isDarkBar
          ? 'text-slate-100 hover:text-white'
          : 'text-gray-900 dark:text-gray-100 hover:text-primary-500'
      }`}
    >
      <LogoIcon className={`w-8 h-8 ${isDarkBar ? 'text-primary-400' : 'text-primary-500'}`} />
      <span className="text-lg font-bold">Sobapps</span>
    </Link>
  );
}
