import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { requireSuperManager } from '@/lib/session';

/** GET - list all users (super_manager only) */
export async function GET() {
  const session = await requireSuperManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const users = await User.find({}).select('-password').sort({ createdAt: -1 }).lean();
    type UserDoc = { _id: { toString(): string }; email: string; name: string; role: string; approved?: boolean; createdAt?: Date };
    const serialized = users.map((u) => {
      const doc = u as unknown as UserDoc;
      return {
        _id: doc._id.toString(),
        email: doc.email,
        name: doc.name,
        role: doc.role,
        approved: doc.approved ?? false,
        createdAt: doc.createdAt?.toISOString(),
      };
    });
    return NextResponse.json(serialized);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

/** POST - create user (super_manager only). Body: email, password, name, role (manager | super_manager) */
export async function POST(request: NextRequest) {
  const session = await requireSuperManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const { email, password, name, role } = body;
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, name, role' },
        { status: 400 }
      );
    }
    if (!['manager', 'super_manager'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
    const emailNorm = String(email).trim().toLowerCase();
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }
    const existing = await User.findOne({ email: emailNorm });
    if (existing) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: emailNorm,
      password: hashed,
      name: String(name).trim(),
      role,
      approved: true,
    });
    return NextResponse.json({
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
