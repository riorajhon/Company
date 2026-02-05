import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { Job, type JobLean } from '@/models/Job';
import ApplyForm from '@/components/ApplyForm';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getJob(id: string) {
  await connectDB();
  const job = await Job.findOne({ _id: id, published: true }).lean() as unknown as JobLean | null;
  if (!job) return null;
  return { ...job, _id: job._id.toString() };
}

export async function generateMetadata({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await getJob(jobId);
  if (!job) return { title: 'Apply — Sobapps' };
  return { title: `Apply: ${job.title} — Sobapps` };
}

export default async function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await getJob(jobId);
  if (!job) notFound();
  const workLocation = job.workLocation ?? (job as { location?: string }).location ?? '';

  return (
    <section className="section apply-page">
      <div className={`container ${styles.narrow}`}>
        <Link href={`/jobs/${jobId}`} className={styles.backLink}>← Back to job</Link>
        <h1 className={styles.pageTitle}>Apply for {job.title}</h1>
        <p className={styles.subtitle}>{[workLocation, job.type].filter(Boolean).join(' · ')}</p>
        <ApplyForm jobId={jobId} jobTitle={job.title} />
      </div>
    </section>
  );
}
