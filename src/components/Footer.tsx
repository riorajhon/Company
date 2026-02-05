'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container">
        <div className="flex flex-wrap justify-between gap-8 pb-8 mb-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <Logo />
            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Careers at Sobapps. Join our team.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Careers
              </h3>
              <div className="flex flex-col gap-2">
                <Link 
                  href="/jobs" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  Open jobs
                </Link>
                <Link 
                  href="/why-sobapp" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  Why join us
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  About us
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Company
              </h3>
              <div className="flex flex-col gap-2">
                <Link 
                  href="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  About us
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link 
                  href="/signin" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  Team sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © {year} Sobapps. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
