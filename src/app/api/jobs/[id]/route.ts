import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { requireManager } from '@/lib/session';

type RouteParams = { params: Promise<{ id: string }> };

function serializeJob(j: Record<string, unknown> & { _id: { toString(): string }; createdAt?: Date; updatedAt?: Date; workLocation?: string; location?: string }) {
  return {
    ...j,
    _id: j._id.toString(),
    workLocation: j.workLocation ?? j.location ?? '',
    createdAt: j.createdAt?.toISOString(),
    updatedAt: j.updatedAt?.toISOString(),
  };
}

function canAccessJob(session: { user?: { id?: string; role?: string } }, job: { createdBy?: { toString(): string } }) {
  if (session?.user?.role === 'super_manager') return true;
  const createdBy = job.createdBy?.toString?.();
  return createdBy && session?.user?.id && createdBy === session.user.id;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await requireManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const { id } = await params;
    const job = await Job.findById(id).lean();
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    if (!canAccessJob(session, job as { createdBy?: { toString(): string } })) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(serializeJob(job as Parameters<typeof serializeJob>[0]));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await requireManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      workLocation,
      location,
      type,
      description,
      image,
      published,
      education,
      keyKnowledgeSkills,
      pay,
      benefits,
    } = body;
    const loc = workLocation ?? location;
    const update: Record<string, unknown> = {};
    if (title != null) update.title = title;
    if (loc != null) {
      update.workLocation = loc;
      update.location = loc;
    }
    if (type != null) update.type = type;
    if (description != null) update.description = description;
    if (image !== undefined) update.image = typeof image === 'string' ? image.trim() : '';
    if (published !== undefined) update.published = published !== false;
    if (education !== undefined) update.education = education ?? '';
    if (keyKnowledgeSkills !== undefined) update.keyKnowledgeSkills = Array.isArray(keyKnowledgeSkills) ? keyKnowledgeSkills : [];
    if (pay !== undefined) update.pay = pay ?? '';
    if (benefits !== undefined) update.benefits = Array.isArray(benefits) ? benefits : [];

    const existing = await Job.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    if (!canAccessJob(session, existing as { createdBy?: { toString(): string } })) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const job = await Job.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(serializeJob(job as Parameters<typeof serializeJob>[0]));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await requireManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const { id } = await params;
    const existing = await Job.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    if (!canAccessJob(session, existing as { createdBy?: { toString(): string } })) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
