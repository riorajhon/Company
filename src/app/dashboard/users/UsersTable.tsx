'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type UserRow = {
  _id: string;
  email: string;
  name: string;
  role: string;
  approved?: boolean;
  createdAt?: string;
};

export default function UsersTable({ users, currentUserId }: { users: UserRow[]; currentUserId: string }) {
  const router = useRouter();

  async function changeRole(userId: string, role: string) {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to update');
      return;
    }
    router.refresh();
  }

  async function approveUser(userId: string) {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to approve');
      return;
    }
    router.refresh();
  }

  async function deleteUser(userId: string) {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to delete');
      return;
    }
    router.refresh();
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Approved</th>
          <th>Change role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <span className={styles[`badge${user.role === 'super_manager' ? 'Super_manager' : 'Manager'}`]}>
                {user.role.replace('_', ' ')}
              </span>
            </td>
            <td>
              {user.approved ? (
                <span className={styles.badgeApproved}>Yes</span>
              ) : (
                <button
                  type="button"
                  onClick={() => approveUser(user._id)}
                  className={styles.approveBtn}
                >
                  Approve
                </button>
              )}
            </td>
            <td>
              <select
                value={user.role}
                onChange={(e) => changeRole(user._id, e.target.value)}
                disabled={user._id === currentUserId}
              >
                <option value="manager">Manager</option>
                <option value="super_manager">Super Manager</option>
              </select>
            </td>
            <td>
              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={() => deleteUser(user._id)}
                  disabled={user._id === currentUserId}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
