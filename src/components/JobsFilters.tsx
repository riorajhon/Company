'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './JobsFilters.module.css';

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'];

export default function JobsFilters({
  currentType,
}: {
  currentType?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams?.toString() ?? '');
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/jobs?${next.toString()}`);
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label>Type</label>
        <select
          value={currentType ?? ''}
          onChange={(e) => updateFilter('type', e.target.value)}
        >
          <option value="">All</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
