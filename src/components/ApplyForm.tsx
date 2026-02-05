'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentArrowUpIcon,
  CodeBracketIcon,
  LinkIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    message: '',
  });
  const [resumeUrl, setResumeUrl] = useState('');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('resume', file);
      const res = await fetch('/api/upload/resume', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Resume upload failed');
        setResumeUrl('');
        return;
      }
      setResumeUrl(data.url);
    } catch {
      setErrorMsg('Upload failed. Please try again.');
      setResumeUrl('');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    if (!resumeUrl) {
      setErrorMsg('Please upload your resume (PDF or Word).');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          github: formData.github.trim() || undefined,
          linkedin: formData.linkedin.trim() || undefined,
          resumeUrl,
          message: formData.message.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong');
        setStatus('error');
        return;
      }
      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', github: '', linkedin: '', message: '' });
      setResumeUrl('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Application sent
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thanks for applying for <strong>{jobTitle}</strong>. We&apos;ll be in touch soon.
        </p>
        <button
          onClick={() => router.push('/jobs')}
          className="btn-secondary"
        >
          View other jobs
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <ExclamationCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="label flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-primary-500" />
          Full name *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
          placeholder="Your full name"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="email" className="label flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5 text-primary-500" />
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          placeholder="you@example.com"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="phone" className="label flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-primary-500" />
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
          placeholder="Optional"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="github" className="label flex items-center gap-2">
          <CodeBracketIcon className="w-5 h-5 text-primary-500" />
          GitHub
        </label>
        <input
          id="github"
          name="github"
          type="url"
          value={formData.github}
          onChange={(e) => setFormData((p) => ({ ...p, github: e.target.value }))}
          placeholder="https://github.com/username or username"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="linkedin" className="label flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-primary-500" />
          LinkedIn
        </label>
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={(e) => setFormData((p) => ({ ...p, linkedin: e.target.value }))}
          placeholder="https://linkedin.com/in/username or username"
          className="input"
        />
      </div>

      <div>
        <label className="label flex items-center gap-2">
          <DocumentArrowUpIcon className="w-5 h-5 text-primary-500" />
          Resume * (PDF or Word, max 5MB)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-100 file:text-primary-700 dark:file:bg-primary-900/30 dark:file:text-primary-300 hover:file:bg-primary-200 dark:hover:file:bg-primary-800/40"
        />
        {uploading && <p className="mt-1 text-sm text-gray-500">Uploading…</p>}
        {resumeUrl && !uploading && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckCircleIcon className="w-4 h-4" />
            Resume uploaded
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="label flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary-500" />
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          placeholder="Anything you want us to know..."
          className="input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || uploading || !resumeUrl}
        className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Submit application'}
      </button>
    </form>
  );
}
