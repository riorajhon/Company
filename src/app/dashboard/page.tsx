import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { Application } from '@/models/Application';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getCounts() {
  await connectDB();
  const [jobCount, appCount] = await Promise.all([
    Job.countDocuments(),
    Application.countDocuments(),
  ]);
  return { jobCount, appCount };
}

export default async function DashboardPage() {
  const { jobCount, appCount } = await getCounts();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Overview</h1>
      <div className={styles.cards}>
        <Link href="/dashboard/jobs" className={styles.card}>
          <span className={styles.cardValue}>{jobCount}</span>
          <span className={styles.cardLabel}>Total jobs</span>
        </Link>
        <Link href="/dashboard/jobs" className={styles.card}>
          <span className={styles.cardValue}>{appCount}</span>
          <span className={styles.cardLabel}>Total applications</span>
        </Link>
      </div>
      <p className={styles.hint}>
        <Link href="/dashboard/jobs">Manage jobs</Link> to create, edit, or unpublish listings and accept applications.
      </p>
    </div>
  );
}
