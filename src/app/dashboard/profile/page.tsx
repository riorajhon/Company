import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import ProfileForm from './ProfileForm';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session?.user?.id) redirect('/signin?callbackUrl=/dashboard/profile');

  await connectDB();
  const user = await User.findById(session.user.id).select('avatar linkedIn phoneNumber').lean();
  const u = user as unknown as { avatar?: string; linkedIn?: string; phoneNumber?: string } | null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Profile</h1>
      <p className={styles.sub}>Update your avatar, LinkedIn, and phone number.</p>
      <ProfileForm
        initialAvatar={u?.avatar ?? ''}
        initialLinkedIn={u?.linkedIn ?? ''}
        initialPhoneNumber={u?.phoneNumber ?? ''}
      />
    </div>
  );
}
