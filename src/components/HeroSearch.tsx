'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/jobs?q=${encodeURIComponent(q.trim())}` : '/jobs');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-center mt-6">
      <input
        type="text"
        placeholder="Job title or skills"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search jobs"
        className="input min-w-[280px] flex-1"
      />
      <button type="submit" className="btn-primary flex items-center gap-2 px-6 py-3">
        <MagnifyingGlassIcon className="w-5 h-5" />
        Search jobs
      </button>
    </form>
  );
}
