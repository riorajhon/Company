import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { Application } from '@/models/Application';
import { getSession } from '@/lib/session';
import ApplicationRow from '../jobs/[id]/applications/ApplicationRow';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getApplicationsWithJobs() {
  await connectDB();
  const session = await getSession();
  if (!session?.user) return { applications: [], jobTitles: {} as Record<string, string> };

  const jobFilter: Record<string, unknown> = {};
  if (session.user.role === 'manager' && session.user.id) {
    jobFilter.createdBy = session.user.id;
  }
  const jobs = await Job.find(jobFilter).select('_id title').lean();
  type JobDoc = { _id: { toString(): string }; title: string };
  const jobIds = (jobs as unknown as JobDoc[]).map((j) => j._id.toString());
  const jobTitles: Record<string, string> = {};
  (jobs as unknown as JobDoc[]).forEach((j) => {
    jobTitles[j._id.toString()] = j.title;
  });

  if (jobIds.length === 0) {
    return { applications: [], jobTitles };
  }

  const apps = await Application.find({ jobId: { $in: jobIds } }).sort({ createdAt: -1 }).lean();
  type AppDoc = {
    _id: { toString(): string };
    jobId: string;
    fullName?: string;
    name?: string;
    email: string;
    phone?: string;
    github?: string;
    linkedin?: string;
    resumeUrl?: string;
    status: string;
    createdAt?: Date;
  };
  const applications = (apps as unknown as AppDoc[]).map((a) => ({
    _id: a._id.toString(),
    jobId: a.jobId,
    fullName: a.fullName || a.name || '',
    email: a.email,
    phone: a.phone,
    github: a.github,
    linkedin: a.linkedin,
    resumeUrl: a.resumeUrl,
    status: a.status,
    createdAt: a.createdAt?.toISOString(),
  }));

  return { applications, jobTitles };
}

export default async function AllApplicationsPage() {
  const { applications, jobTitles } = await getApplicationsWithJobs();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Applications</h1>
        <p className={styles.subtitle}>
          All applications for your jobs. You can also open a job and click &quot;Applications&quot; to see only that job&apos;s bids.
        </p>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Job</th>
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
                <td colSpan={7} className={styles.empty}>
                  No applications yet. Applications will appear here when candidates apply to your jobs.
                  <br />
                  <Link href="/dashboard/jobs">View your jobs</Link>
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <ApplicationRow
                  key={app._id}
                  application={app}
                  leadingCell={
                    <Link href={`/dashboard/jobs/${app.jobId}/applications`} className={styles.jobLink}>
                      {jobTitles[app.jobId] ?? app.jobId}
                    </Link>
                  }
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
