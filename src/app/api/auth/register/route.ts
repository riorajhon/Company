import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';

/** Public sign up. New users are created with approved: false and cannot sign in until a super_manager approves. */
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, name' },
        { status: 400 }
      );
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
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }
    const hashed = await bcrypt.hash(password, 10);
    const isFirst = (await User.countDocuments()) === 0;
    const user = await User.create({
      email: emailNorm,
      password: hashed,
      name: String(name).trim(),
      role: isFirst ? 'super_manager' : 'manager',
      approved: isFirst,
    });
    return NextResponse.json({
      ok: true,
      user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role, approved: (user as { approved?: boolean }).approved },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
