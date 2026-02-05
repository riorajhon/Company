'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';

type Job = {
  _id: string;
  title: string;
  location: string;
  type: string;
  published: boolean;
};

export default function DashboardJobRow({ job }: { job: Job }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this job? This cannot be undone.')) return;
    const res = await fetch(`/api/jobs/${job._id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to delete');
      return;
    }
    router.refresh();
  }

  return (
    <tr>
      <td>
        <Link href={`/jobs/${job._id}`} className={styles.jobTitleLink}>{job.title}</Link>
      </td>
      <td>{job.location}</td>
      <td>{job.type}</td>
      <td>
        <span className={job.published ? styles.badgeLive : styles.badgeDraft}>
          {job.published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td>
        <div className={styles.actions}>
          <a
            href={`/dashboard/jobs/${job._id}/applications`}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/dashboard/jobs/${job._id}/applications`);
            }}
          >
            Applications
          </a>
          <a
            href={`/dashboard/jobs/${job._id}/edit`}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/dashboard/jobs/${job._id}/edit`);
            }}
          >
            Edit
          </a>
          <button type="button" onClick={handleDelete} className={styles.danger}>Delete</button>
        </div>
      </td>
    </tr>
  );
}
