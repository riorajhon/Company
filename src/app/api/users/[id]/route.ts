import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { requireSuperManager } from '@/lib/session';

type RouteParams = { params: Promise<{ id: string }> };

/** PATCH - update user (e.g. role). Super_manager only. */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await requireSuperManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { role, approved } = body;
    const update: Record<string, unknown> = {};
    if (role !== undefined) {
      if (!['manager', 'super_manager'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }
      update.role = role;
    }
    if (typeof approved === 'boolean') update.approved = approved;
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'Nothing to update (role or approved)' }, { status: 400 });
    }
    const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-password').lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const u = user as unknown as { _id: { toString(): string }; email: string; name: string; role: string; approved?: boolean };
    return NextResponse.json({
      _id: u._id.toString(),
      email: u.email,
      name: u.name,
      role: u.role,
      approved: u.approved ?? false,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

/** DELETE - delete user. Super_manager only. */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await requireSuperManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const { id } = await params;
    if (id === session.user.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
