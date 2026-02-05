import { getServerSession } from 'next-auth';
import { authOptions, isManagerRole } from '@/lib/auth';

/** Get session in API route or server component. Returns null if not authenticated. */
export async function getSession() {
  return getServerSession(authOptions);
}

/** Require manager or super_manager. Returns session or null (caller should return 401). */
export async function requireManager() {
  const session = await getSession();
  if (!session?.user?.role || !isManagerRole(session.user.role)) return null;
  return session;
}

/** Require super_manager only. Returns session or null. */
export async function requireSuperManager() {
  const session = await getSession();
  if (session?.user?.role !== 'super_manager') return null;
  return session;
}
