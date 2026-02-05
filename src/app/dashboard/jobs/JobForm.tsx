'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ListBulletIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { BENEFITS_OPTIONS } from '@/models/Job';
import styles from './JobForm.module.css';

type JobFormData = {
  title: string;
  education: string;
  keyKnowledgeSkillsText: string;
  type: string;
  pay: string;
  benefits: string[];
  workLocation: string;
  description: string;
  requirementsText: string;
  published: boolean;
};

const defaultJob: JobFormData = {
  title: '',
  education: '',
  keyKnowledgeSkillsText: '',
  type: 'Full-time',
  pay: '',
  benefits: [],
  workLocation: '',
  description: '',
  requirementsText: '',
  published: true,
};

type InitialData = Partial<JobFormData> & { keyKnowledgeSkills?: string[]; requirements?: string[] };

export default function JobForm({
  jobId,
  initial,
}: {
  jobId?: string;
  initial?: InitialData;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState<JobFormData>(() => {
    const base = { ...defaultJob, ...initial };
    return {
      ...base,
      keyKnowledgeSkillsText: Array.isArray(initial?.keyKnowledgeSkills)
        ? initial.keyKnowledgeSkills.join('\n')
        : (initial?.keyKnowledgeSkillsText ?? ''),
      requirementsText: Array.isArray(initial?.requirements)
        ? initial.requirements.join('\n')
        : (initial?.requirementsText ?? ''),
      benefits: initial?.benefits ?? [],
    };
  });

  const typeOptions = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const url = jobId ? `/api/jobs/${jobId}` : '/api/jobs';
      const method = jobId ? 'PUT' : 'POST';
      const body = {
        title: form.title.trim(),
        workLocation: form.workLocation.trim(),
        type: form.type,
        description: form.description.trim(),
        requirements: form.requirementsText.split('\n').map((s) => s.trim()).filter(Boolean),
        published: form.published,
        education: form.education.trim(),
        keyKnowledgeSkills: form.keyKnowledgeSkillsText.split('\n').map((s) => s.trim()).filter(Boolean),
        pay: form.pay.trim(),
        benefits: form.benefits,
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong');
        setStatus('error');
        return;
      }
      router.push('/dashboard/jobs');
      router.refresh();
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  function toggleBenefit(b: string) {
    setForm((f) => ({
      ...f,
      benefits: f.benefits.includes(b) ? f.benefits.filter((x) => x !== b) : [...f.benefits, b],
    }));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}

      <label className={styles.label}>
        <span className={styles.labelWithIcon}>
          <BriefcaseIcon className="w-5 h-5" />
          Job title *
        </span>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
          placeholder="e.g. Senior Frontend Developer"
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelWithIcon}>
          <MapPinIcon className="w-5 h-5" />
          Work location *
        </span>
          <input
            type="text"
            value={form.workLocation}
            onChange={(e) => setForm((f) => ({ ...f, workLocation: e.target.value }))}
            required
            placeholder="e.g. New York, NY or Remote"
            className={styles.input}
          />
      </label>

      <label className={styles.label}>
        <span className={styles.labelWithIcon}>
          <AcademicCapIcon className="w-5 h-5" />
          Education
        </span>
          <input
            type="text"
            value={form.education}
            onChange={(e) => setForm((f) => ({ ...f, education: e.target.value }))}
            placeholder="e.g. Bachelor's in Computer Science"
            className={styles.input}
          />
      </label>

      <label className={styles.label}>
        <span className={styles.labelWithIcon}>
          <ListBulletIcon className="w-5 h-5" />
          Key knowledge &amp; skills
        </span>
        <span className={styles.hint}>One item per line. You can use spaces and multiple lines (e.g. &quot;Proficiency in REST APIs&quot;).</span>
        <textarea
          value={form.keyKnowledgeSkillsText}
          onChange={(e) => setForm((f) => ({ ...f, keyKnowledgeSkillsText: e.target.value }))}
          rows={5}
          placeholder="React&#10;TypeScript&#10;Node.js&#10;Proficiency in REST APIs&#10;..."
          className={styles.input}
        />
      </label>

      <div className={styles.row}>
        <label className={styles.label}>
          <span className={styles.labelWithIcon}>
            <BriefcaseIcon className="w-5 h-5" />
            Job type *
          </span>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className={styles.input}
          >
            {typeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          <span className={styles.labelWithIcon}>
            <CurrencyDollarIcon className="w-5 h-5" />
            Pay
          </span>
          <input
            type="text"
            value={form.pay}
            onChange={(e) => setForm((f) => ({ ...f, pay: e.target.value }))}
            placeholder="e.g. $80,000 - $120,000"
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.benefitsSection}>
        <span className={styles.labelWithIcon}>
          <CheckCircleIcon className="w-5 h-5" />
          Benefits
        </span>
        <div className={styles.benefitsGrid}>
          {BENEFITS_OPTIONS.map((b) => (
            <label key={b} className={styles.benefitCheck}>
              <input
                type="checkbox"
                checked={form.benefits.includes(b)}
                onChange={() => toggleBenefit(b)}
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      <label className={styles.label}>
        Description *
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          required
          rows={8}
          placeholder="Describe the job, responsibilities, and what you offer..."
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Requirements
        <span className={styles.hint}>One requirement per line. You can use spaces and multiple lines (e.g. &quot;5+ years experience in React&quot;).</span>
        <textarea
          value={form.requirementsText}
          onChange={(e) => setForm((f) => ({ ...f, requirementsText: e.target.value }))}
          rows={5}
          placeholder="5+ years experience in React&#10;Proficiency in TypeScript&#10;Strong communication skills&#10;..."
          className={styles.input}
        />
      </label>

      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
        />
        <span>Published (visible on public job list)</span>
      </label>

      <div className={styles.actions}>
        <button type="submit" disabled={status === 'loading'} className={styles.submit}>
          {status === 'loading' ? 'Saving…' : jobId ? 'Update job' : 'Create job'}
        </button>
        <Link href="/dashboard/jobs" className={styles.cancel}>Cancel</Link>
      </div>
    </form>
  );
}
