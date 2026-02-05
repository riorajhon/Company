'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/why-sobapp', label: 'Why join us' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <div className="container">
          <div className="flex items-center justify-between h-14">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 md:hidden"
              aria-label="Open menu"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-8 flex-1">
              {nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === href
                      ? 'text-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {status === 'authenticated' ? (
                <>
                  <Link
                    href="/dashboard"
                    className="hidden lg:inline-flex text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/jobs/new"
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Post a job
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="hidden lg:inline-flex btn-secondary text-sm px-4 py-2"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/jobs"
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Open jobs
                  </Link>
                  <Link
                    href="/signin"
                    className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              <div className="space-y-1">
                {nav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      pathname === href
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                {status === 'authenticated' ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/jobs/new"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Post a job
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setMobileOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
