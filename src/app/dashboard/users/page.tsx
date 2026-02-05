import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import UsersTable from './UsersTable';
import CreateUserForm from './CreateUserForm';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getUsers() {
  await connectDB();
  const users = await User.find({}).select('-password').sort({ createdAt: -1 }).lean();
  type UserDoc = { _id: { toString(): string }; email: string; name: string; role: string; approved?: boolean; createdAt?: Date };
  return (users as unknown as UserDoc[]).map((u) => ({
    _id: u._id.toString(),
    email: u.email,
    name: u.name,
    role: u.role,
    approved: u.approved ?? false,
    createdAt: u.createdAt?.toISOString(),
  }));
}

export default async function DashboardUsersPage() {
  const session = await getSession();
  if (!session?.user || session.user.role !== 'super_manager') {
    redirect('/dashboard');
  }
  const users = await getUsers();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>User management</h1>
      <p className={styles.sub}>Create and manage manager and super manager accounts.</p>
      <CreateUserForm />
      <div className={styles.tableWrap}>
        <UsersTable users={users} currentUserId={session.user.id} />
      </div>
    </div>
  );
}
