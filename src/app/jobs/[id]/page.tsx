import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { Job, type JobLean } from '@/models/Job';
import { BriefcaseIcon, ListBulletIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getJob(id: string) {
  await connectDB();
  const job = await Job.findOne({ _id: id, published: true }).lean() as unknown as (JobLean & { location?: string }) | null;
  if (!job) return null;
  const workLocation = job.workLocation ?? job.location ?? '';
  return { ...job, _id: job._id.toString(), workLocation };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return { title: 'Job not found — Sobapps' };
  return { title: `${job.title} — Sobapps Careers`, description: job.description.slice(0, 160) };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const workLocation = job.workLocation ?? (job as { location?: string }).location ?? '';
  const keyKnowledgeSkills = (job as { keyKnowledgeSkills?: string[] }).keyKnowledgeSkills ?? [];
  const pay = (job as { pay?: string }).pay ?? '';
  const benefits = (job as { benefits?: string[] }).benefits ?? [];
  const requirements = job.requirements ?? [];

  const metaItems = [workLocation, job.type, pay].filter(Boolean);
  const tags = [
    ...keyKnowledgeSkills.filter(Boolean),
    ...requirements.filter(Boolean),
    ...benefits.filter(Boolean),
  ].filter(Boolean);

  return (
    <section className={`section ${styles.jobDetail}`}>
      <div className={`container ${styles.narrow}`}>
        <Link href="/jobs" className={styles.backLink}>← All jobs</Link>
        <div className={styles.applyTop}>
          <Link href={`/apply/${job._id}`} className={styles.btnApply}>Apply for this job</Link>
        </div>
        <div className={styles.jobHeader}>
          <h1 className={styles.jobTitle}>{job.title}</h1>
          {metaItems.length > 0 && (
            <div className={styles.metaRow}>
              {metaItems.map((item, i) => (
                <span key={i}>
                  {i > 0 && <span className={styles.metaSep}> · </span>}
                  <span className={styles.metaItem}>{item}</span>
                </span>
              ))}
            </div>
          )}
          {tags.length > 0 && (
            <div className={styles.tagRow}>
              {tags.map((t, i) => (
                <span key={i} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.jobBody}>
          <h2 className={styles.sectionTitle}>
            <BriefcaseIcon className={styles.sectionIcon} />
            About the job
          </h2>
          <div className={styles.prose} dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }} />

          {keyKnowledgeSkills.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <ListBulletIcon className={styles.sectionIcon} />
                Key knowledge &amp; skills
              </h2>
              <ul className={styles.list}>
                {keyKnowledgeSkills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {requirements.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <ListBulletIcon className={styles.sectionIcon} />
                Requirements
              </h2>
              <ul className={styles.list}>
                {requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}

          {benefits.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <CheckCircleIcon className={styles.sectionIcon} />
                Benefits
              </h2>
              <ul className={styles.benefitsList}>
                {benefits.map((b) => (
                  <li key={b} className={styles.benefitItem}>
                    <CheckCircleIcon className={styles.benefitIcon} />
                    {b}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
