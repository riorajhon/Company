'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CreateUserForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'manager' | 'super_manager'>('manager');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create user');
        setLoading(false);
        return;
      }
      setSuccess(`User ${data.email} created.`);
      setName('');
      setEmail('');
      setPassword('');
      setLoading(false);
      router.refresh();
    } catch {
      setError('Network error.');
      setLoading(false);
    }
  }

  return (
    <div className={styles.formSection}>
      <h2>Create user</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@company.com" />
          </label>
          <label>
            Password (min 8)
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="••••••••" />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value as 'manager' | 'super_manager')}>
              <option value="manager">Manager</option>
              <option value="super_manager">Super Manager</option>
            </select>
          </label>
          <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create user'}</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  );
}
