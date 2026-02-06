'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ProfileForm.module.css';

interface ProfileFormProps {
  initialAvatar: string;
  initialLinkedIn: string;
  initialPhoneNumber: string;
}

export default function ProfileForm({
  initialAvatar,
  initialLinkedIn,
  initialPhoneNumber,
}: ProfileFormProps) {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [linkedIn, setLinkedIn] = useState(initialLinkedIn);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'ok'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const formData = new FormData();
      formData.set('avatar', file);
      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Upload failed');
        setStatus('error');
        return;
      }
      setAvatar(data.url);
      const patchRes = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: data.url }),
        credentials: 'include',
      });
      if (!patchRes.ok) {
        setErrorMsg('Avatar saved but profile update failed');
        setStatus('error');
        return;
      }
      setStatus('ok');
    } catch {
      setErrorMsg('Network error');
      setStatus('error');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkedIn: linkedIn.trim(),
          phoneNumber: phoneNumber.trim(),
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Update failed');
        setStatus('error');
        return;
      }
      setLinkedIn(data.linkedIn ?? '');
      setPhoneNumber(data.phoneNumber ?? '');
      setStatus('ok');
    } catch {
      setErrorMsg('Network error');
      setStatus('error');
    }
  }

  return (
    <>
      <div className={styles.avatarSection}>
        <label className={styles.avatarLabel}>Avatar</label>
        <div className={styles.avatarRow}>
          <div className={styles.avatarPreview}>
            {avatar ? (
              <Image src={avatar} alt="Your avatar" width={96} height={96} className={styles.avatarImg} />
            ) : (
              <span className={styles.avatarPlaceholder}>No photo</span>
            )}
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleAvatarChange}
              className={styles.fileInput}
              aria-label="Upload avatar"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={status === 'loading'}
              className={styles.uploadBtn}
            >
              {status === 'loading' ? 'Uploading…' : 'Upload photo'}
            </button>
            <p className={styles.hint}>JPEG, PNG, WebP or GIF. Max 2MB.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        {status === 'ok' && <p className={styles.success}>Profile updated.</p>}

        <label className={styles.label}>
          LinkedIn URL
          <input
            type="url"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Phone number
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 234 567 8900"
            className={styles.input}
          />
        </label>
        <button type="submit" disabled={status === 'loading'} className={styles.submit}>
          {status === 'loading' ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </>
  );
}
