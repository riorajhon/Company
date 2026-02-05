import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Application } from '@/models/Application';
import { Job } from '@/models/Job';
import { requireManager } from '@/lib/session';

function canAccessJob(session: { user?: { id?: string; role?: string } }, job: { createdBy?: { toString(): string } }) {
  if (session?.user?.role === 'super_manager') return true;
  const createdBy = job.createdBy?.toString?.();
  return createdBy && session?.user?.id && createdBy === session.user.id;
}

/** GET ?jobId=... - list applications for a job (manager only, own jobs or super_manager) */
export async function GET(request: NextRequest) {
  const session = await requireManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    if (!jobId) {
      return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }
    const job = await Job.findById(jobId).lean();
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    if (!canAccessJob(session, job as { createdBy?: { toString(): string } })) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const apps = await Application.find({ jobId }).sort({ createdAt: -1 }).lean();
    type AppDoc = { _id: { toString(): string }; createdAt?: Date; updatedAt?: Date };
    const serialized = apps.map((a) => {
      const doc = a as AppDoc;
      return {
        ...a,
        _id: doc._id.toString(),
        createdAt: doc.createdAt?.toISOString(),
        updatedAt: doc.updatedAt?.toISOString(),
      };
    });
    return NextResponse.json(serialized);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
