import { connectDB } from '@/lib/db';
import '@/models/User'; // register User schema so populate('createdBy') works
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
  const jobs = await Job.find(filter).sort({ createdAt: -1 }).populate('createdBy', 'avatar name').lean();
  return jobs.map((j) => {
    const job = j as unknown as JobLean & { createdBy?: { _id: unknown; avatar?: string; name?: string }; image?: string };
    const creator = job.createdBy;
    return {
      ...job,
      _id: job._id.toString(),
      workLocation: job.workLocation ?? (job as { location?: string }).location ?? '',
      keyKnowledgeSkills: job.keyKnowledgeSkills ?? [],
      benefits: job.benefits ?? [],
      image: job.image ?? '',
      posterAvatar: creator?.avatar ?? '',
      posterName: creator?.name ?? '',
    };
  });
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
                  image={job.image}
                  posterAvatar={job.posterAvatar}
                  posterName={job.posterName}
                  keyKnowledgeSkills={job.keyKnowledgeSkills}
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
