import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { Job, type JobLean } from '@/models/Job';
import {
  BriefcaseIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  LightBulbIcon,
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const COMPANY_NAME = 'Sobapps';

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
  const education = (job as { education?: string }).education ?? '';

  return (
    <section className={`section ${styles.jobDetail}`}>
      <div className={`container ${styles.narrow}`}>
        <Link href="/jobs" className={styles.backLink}>← All jobs</Link>

        {/* Header: title then company | location | salary - type */}
        <header className={styles.jobHeader}>
          <h1 className={styles.jobTitle}>{job.title}</h1>
          <div className={styles.metaLine}>
            <span className={styles.metaItem}>
              <Link href="/about" className={styles.companyLink}>
                {COMPANY_NAME}
                <ArrowTopRightOnSquareIcon className={styles.extIcon} aria-hidden />
              </Link>
            </span>
            {workLocation && (
              <>
                <span className={styles.metaSep}>|</span>
                <span className={styles.metaItem}>{workLocation}</span>
              </>
            )}
            {(pay || job.type) && (
              <>
                <span className={styles.metaSep}>|</span>
                <span className={styles.metaItem}>
                  {pay && <span>{pay}</span>}
                  {pay && job.type && ' - '}
                  {job.type && <span>{job.type}</span>}
                </span>
              </>
            )}
          </div>
          <p className={styles.responseRate}>
            Typically responds within a few days
          </p>
          <div className={styles.actionRow}>
            <Link href={`/apply/${job._id}`} className={styles.btnApply}>Apply now</Link>
          </div>
        </header>

        {/* Profile insights */}
        <div className={styles.block}>
          <h2 className={styles.blockTitle}>Profile insights</h2>
          <p className={styles.blockSub}>Here&apos;s how the job qualifications align with your profile.</p>

          {(keyKnowledgeSkills.length > 0 || education) && (
            <div className={styles.insightsGrid}>
              {keyKnowledgeSkills.length > 0 && (
                <div className={styles.insightItem}>
                  <LightBulbIcon className={styles.insightIcon} aria-hidden />
                  <span className={styles.insightLabel}>Skills</span>
                  <div className={styles.pillRow}>
                    {keyKnowledgeSkills.filter(Boolean).slice(0, 6).map((s, i) => (
                      <span key={i} className={styles.pillSkill}>{s} (Required)</span>
                    ))}
                    {keyKnowledgeSkills.filter(Boolean).length > 6 && (
                      <button type="button" className={styles.showMore}>+ show more</button>
                    )}
                  </div>
                </div>
              )}
              {education && (
                <div className={styles.insightItem}>
                  <AcademicCapIcon className={styles.insightIcon} aria-hidden />
                  <span className={styles.insightLabel}>Education</span>
                  <span className={styles.pillEducation}>
                    <CheckCircleIcon className={styles.pillCheck} aria-hidden />
                    {education} (Required)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Job details */}
        <div className={styles.block}>
          <h2 className={styles.blockTitle}>Job details</h2>
          <p className={styles.blockSub}>Here&apos;s how the job details align with your profile.</p>
          <div className={styles.detailsGrid}>
            {pay && (
              <div className={styles.detailRow}>
                <CurrencyDollarIcon className={styles.detailIcon} aria-hidden />
                <span className={styles.detailLabel}>Pay</span>
                <span className={styles.pillPay}>
                  <CheckCircleIcon className={styles.pillCheck} aria-hidden />
                  {pay}
                </span>
              </div>
            )}
            {job.type && (
              <div className={styles.detailRow}>
                <BriefcaseIcon className={styles.detailIcon} aria-hidden />
                <span className={styles.detailLabel}>Job type</span>
                <span className={styles.pillJobType}>{job.type}</span>
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Benefits</h2>
            <p className={styles.blockSub}>Pulled from the full job description</p>
            <ul className={styles.benefitsList}>
              {benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Full job description */}
        <div className={styles.block}>
          <h2 className={styles.blockTitle}>Full job description</h2>
          <h3 className={styles.aboutSub}>About {COMPANY_NAME}</h3>
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }}
          />
        </div>
      </div>
    </section>
  );
}
