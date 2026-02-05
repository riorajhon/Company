'use client';

import { useRouter } from 'next/navigation';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import styles from './page.module.css';

type Application = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  status: string;
  createdAt?: string;
};

export default function ApplicationRow({
  application,
  leadingCell,
}: {
  application: Application;
  leadingCell?: React.ReactNode;
}) {
  const router = useRouter();
  const isPending = application.status === 'pending';

  async function updateStatus(status: 'accepted' | 'rejected') {
    const res = await fetch(`/api/applications/${application._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to update');
      return;
    }
    router.refresh();
  }

  const date = application.createdAt
    ? new Date(application.createdAt).toLocaleDateString(undefined, { dateStyle: 'short' })
    : '—';

  return (
    <tr>
      {leadingCell != null ? <td>{leadingCell}</td> : null}
      <td>{application.fullName}</td>
      <td>
        <div className="flex flex-col gap-0.5 text-sm">
          <a href={`mailto:${application.email}`} className="text-primary-500 hover:underline">{application.email}</a>
          {application.phone && <span className="text-gray-600 dark:text-gray-400">{application.phone}</span>}
          {application.github && (
            <a href={application.github.startsWith('http') ? application.github : `https://github.com/${application.github}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline truncate max-w-[200px]">GitHub</a>
          )}
          {application.linkedin && (
            <a href={application.linkedin.startsWith('http') ? application.linkedin : `https://linkedin.com/in/${application.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline truncate max-w-[200px]">LinkedIn</a>
          )}
        </div>
      </td>
      <td>
        {application.resumeUrl ? (
          <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-500 hover:underline text-sm">
            <DocumentArrowDownIcon className="w-4 h-4" />
            Resume
          </a>
        ) : (
          '—'
        )}
      </td>
      <td>
        <span className={styles[`badge${application.status.charAt(0).toUpperCase()}${application.status.slice(1)}`] ?? styles.badgePending}>
          {application.status}
        </span>
      </td>
      <td>{date}</td>
      <td>
        {isPending && (
          <div className={styles.actions}>
            <button type="button" onClick={() => updateStatus('accepted')} className={styles.accept}>
              Accept
            </button>
            <button type="button" onClick={() => updateStatus('rejected')} className={styles.reject}>
              Reject
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
