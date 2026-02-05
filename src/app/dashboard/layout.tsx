import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import DashboardNav from './DashboardNav';
import styles from './layout.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/signin?callbackUrl=/dashboard');
  }
  const isSuper = session.user.role === 'super_manager';

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Dashboard</span>
          <span className={styles.sidebarRole}>{session.user.role === 'super_manager' ? 'Super Manager' : 'Manager'}</span>
        </div>
        <DashboardNav isSuper={isSuper} />
      </aside>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
