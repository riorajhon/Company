import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import JobForm from '../../JobForm';
import styles from '../../page.module.css';

export const dynamic = 'force-dynamic';

async function getJob(id: string) {
  await connectDB();
  const job = await Job.findById(id).lean();
  if (!job) return null;
  const j = job as unknown as {
    _id: { toString(): string };
    title: string;
    workLocation?: string;
    location?: string;
    type: string;
    description: string;
    requirements: string[];
    published: boolean;
    education?: string;
    keyKnowledgeSkills?: string[];
    pay?: string;
    benefits?: string[];
  };
  return {
    _id: j._id.toString(),
    title: j.title,
    workLocation: j.workLocation ?? j.location ?? '',
    type: j.type,
    description: j.description,
    requirements: j.requirements ?? [],
    published: j.published,
    education: j.education ?? '',
    keyKnowledgeSkills: j.keyKnowledgeSkills ?? [],
    pay: j.pay ?? '',
    benefits: j.benefits ?? [],
  };
}

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Edit job</h1>
      <JobForm
        jobId={job._id}
        initial={{
          title: job.title,
          workLocation: job.workLocation,
          type: job.type,
          description: job.description,
          requirements: job.requirements,
          published: job.published,
          education: job.education,
          keyKnowledgeSkills: job.keyKnowledgeSkills,
          pay: job.pay,
          benefits: job.benefits,
        }}
      />
    </div>
  );
}
