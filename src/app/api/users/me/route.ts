import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { requireManager } from '@/lib/session';

/** GET - current user profile (avatar, linkedIn, phoneNumber, name, email). Managers only. */
export async function GET() {
  const session = await requireManager();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const user = await User.findById(session.user.id).select('-password').lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const u = user as unknown as { _id: { toString(): string }; email: string; name: string; role: string; avatar?: string; linkedIn?: string; phoneNumber?: string };
    return NextResponse.json({
      _id: u._id.toString(),
      email: u.email,
      name: u.name,
      role: u.role,
      avatar: u.avatar ?? '',
      linkedIn: u.linkedIn ?? '',
      phoneNumber: u.phoneNumber ?? '',
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

/** PATCH - update current user profile (avatar, linkedIn, phoneNumber). Managers only. */
export async function PATCH(request: NextRequest) {
  const session = await requireManager();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const { avatar, linkedIn, phoneNumber } = body;
    const update: Record<string, unknown> = {};
    if (avatar !== undefined) update.avatar = typeof avatar === 'string' ? avatar : '';
    if (linkedIn !== undefined) update.linkedIn = typeof linkedIn === 'string' ? linkedIn.trim() : '';
    if (phoneNumber !== undefined) update.phoneNumber = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'Nothing to update (avatar, linkedIn, phoneNumber)' }, { status: 400 });
    }
    const user = await User.findByIdAndUpdate(session.user.id, update, { new: true }).select('-password').lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const u = user as unknown as { _id: { toString(): string }; email: string; name: string; role: string; avatar?: string; linkedIn?: string; phoneNumber?: string };
    return NextResponse.json({
      _id: u._id.toString(),
      email: u.email,
      name: u.name,
      role: u.role,
      avatar: u.avatar ?? '',
      linkedIn: u.linkedIn ?? '',
      phoneNumber: u.phoneNumber ?? '',
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
