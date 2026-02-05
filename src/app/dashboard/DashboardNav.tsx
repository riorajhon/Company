'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './layout.module.css';

const links: { href: string; label: string }[] = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/jobs', label: 'Jobs' },
  { href: '/dashboard/jobs/new', label: 'Post a job' },
  { href: '/dashboard/applications', label: 'Applications' },
];

export default function DashboardNav({
  isSuper,
}: {
  isSuper: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function goTo(href: string) {
    router.push(href);
  }

  return (
    <nav className={styles.sidebarNav}>
      {links.map(({ href, label }) => {
        let isActive = pathname === href;
        if (href === '/dashboard/applications') isActive = pathname === '/dashboard/applications' || pathname.includes('/applications');
        if (href === '/dashboard/jobs') isActive = (pathname === '/dashboard/jobs' || pathname.startsWith('/dashboard/jobs/')) && pathname !== '/dashboard/jobs/new';
        if (href === '/dashboard/jobs/new') isActive = pathname === '/dashboard/jobs/new';
        return (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              goTo(href);
            }}
            className={isActive ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink}
          >
            {label}
          </a>
        );
      })}
      {isSuper && (
        <a
          href="/dashboard/users"
          onClick={(e) => {
            e.preventDefault();
            goTo('/dashboard/users');
          }}
          className={pathname.startsWith('/dashboard/users') ? `${styles.sidebarLink} ${styles.sidebarLinkActive}` : styles.sidebarLink}
        >
          User management
        </a>
      )}
    </nav>
  );
}
