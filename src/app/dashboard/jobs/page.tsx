import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { getSession } from '@/lib/session';
import DashboardJobRow from './DashboardJobRow';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getJobs() {
  await connectDB();
  const session = await getSession();
  const filter: Record<string, unknown> = {};
  if (session?.user?.role === 'manager' && session?.user?.id) {
    filter.createdBy = session.user.id;
  }
  const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
  type JobDoc = { _id: { toString(): string }; title: string; workLocation?: string; location?: string; type: string; published: boolean; createdAt?: Date; createdBy?: { toString(): string } };
  return (jobs as unknown as JobDoc[]).map((j) => ({
    _id: j._id.toString(),
    title: j.title,
    location: j.workLocation ?? j.location ?? '',
    type: j.type,
    published: j.published,
    createdAt: j.createdAt?.toISOString(),
  }));
}

export default async function DashboardJobsPage() {
  const jobs = await getJobs();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Jobs</h1>
        <Link href="/dashboard/jobs/new" className={styles.newBtn}>Post a job</Link>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>No jobs yet. <Link href="/dashboard/jobs/new">Post your first job</Link>.</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <DashboardJobRow key={job._id} job={job} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
