import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { Application } from '@/models/Application';
import { getSession } from '@/lib/session';
import ApplicationRow from './ApplicationRow';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

function canAccessJob(session: { user?: { id?: string; role?: string } } | null, job: { createdBy?: { toString(): string } }) {
  if (!session?.user) return false;
  if (session.user.role === 'super_manager') return true;
  const createdBy = job.createdBy?.toString?.();
  return !!createdBy && !!session.user.id && createdBy === session.user.id;
}

async function getJob(id: string) {
  await connectDB();
  const session = await getSession();
  const job = await Job.findById(id).lean();
  if (!job) return null;
  const j = job as unknown as { _id: { toString(): string }; title: string; createdBy?: { toString(): string } };
  if (!canAccessJob(session, j)) return null;
  return { _id: j._id.toString(), title: j.title };
}

async function getApplications(jobId: string) {
  await connectDB();
  const apps = await Application.find({ jobId }).sort({ createdAt: -1 }).lean();
  type AppDoc = { _id: { toString(): string }; fullName?: string; name?: string; email: string; phone?: string; github?: string; linkedin?: string; resumeUrl?: string; status: string; createdAt?: Date };
  return (apps as unknown as AppDoc[]).map((a) => ({
    _id: a._id.toString(),
    fullName: a.fullName || a.name || '',
    email: a.email,
    phone: a.phone,
    github: a.github,
    linkedin: a.linkedin,
    resumeUrl: a.resumeUrl,
    status: a.status,
    createdAt: a.createdAt?.toISOString(),
  }));
}

export default async function JobApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [job, applications] = await Promise.all([getJob(id), getApplications(id)]);
  if (!job) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/dashboard/jobs" className={styles.back}>← Jobs</Link>
        <h1 className={styles.title}>Applications: {job.title}</h1>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Applied</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>No applications yet.</td>
              </tr>
            ) : (
              applications.map((app) => (
                <ApplicationRow key={app._id} application={app} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
