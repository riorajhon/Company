'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import styles from './JobsSearchBar.module.css';

export default function JobsSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQ = searchParams?.get('q') ?? '';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = (inputRef.current?.value ?? '').trim();
    const next = new URLSearchParams(searchParams?.toString() ?? '');
    if (q) next.set('q', q);
    else next.delete('q');
    router.push(`/jobs?${next.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        ref={inputRef}
        type="search"
        name="q"
        defaultValue={currentQ}
        placeholder="Job title, skills, or company"
        className={styles.input}
        aria-label="Search jobs"
      />
      <button type="submit" className={styles.btn}>Search</button>
    </form>
  );
}
