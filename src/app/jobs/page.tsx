import { connectDB } from '@/lib/db';
import { Job, type JobLean } from '@/models/Job';
import JobCard from '@/components/JobCard';
import JobsSearchBar from '@/components/JobsSearchBar';
import styles from './page.module.css';

export const metadata = {
  title: 'Open jobs — Sobapps Careers',
  description: 'Browse open positions at Sobapps.',
};

export const dynamic = 'force-dynamic';

async function getJobs(searchParams: { q?: string }) {
  await connectDB();
  const filter: Record<string, unknown> = { published: true };
  if (searchParams.q?.trim()) {
    const q = (searchParams.q as string).trim();
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') },
    ];
  }
  const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean() as unknown as JobLean[];
  return jobs.map((j) => ({
    ...j,
    _id: j._id.toString(),
    workLocation: j.workLocation ?? (j as { location?: string }).location ?? '',
    keyKnowledgeSkills: j.keyKnowledgeSkills ?? [],
    requirements: j.requirements ?? [],
    benefits: j.benefits ?? [],
  }));
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const jobs = await getJobs(params);

  return (
    <>
      <section className={styles.jobsHero}>
        <div className="container">
          <h1 className={styles.pageTitle}>Open jobs at Sobapps</h1>
          <p className={styles.subtitle}>Find a job that fits. Use search to narrow results.</p>
          <JobsSearchBar />
        </div>
      </section>

      <section className={`section ${styles.jobsSection}`}>
        <div className="container">
          <p className={styles.resultsCount}>
            {jobs.length} {jobs.length === 1 ? 'result' : 'results'}
          </p>
          <div className={styles.jobList}>
            {jobs.length === 0 ? (
              <p className={styles.noJobs}>No positions match your search.</p>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  id={job._id}
                  title={job.title}
                  location={job.workLocation ?? ''}
                  type={job.type}
                  keyKnowledgeSkills={job.keyKnowledgeSkills}
                  requirements={job.requirements}
                  benefits={job.benefits}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
