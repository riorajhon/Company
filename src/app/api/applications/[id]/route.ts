import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Application } from '@/models/Application';
import { Job } from '@/models/Job';
import { requireManager } from '@/lib/session';

type RouteParams = { params: Promise<{ id: string }> };

function canAccessJob(session: { user?: { id?: string; role?: string } }, job: { createdBy?: { toString(): string } }) {
  if (session?.user?.role === 'super_manager') return true;
  const createdBy = job.createdBy?.toString?.();
  return createdBy && session?.user?.id && createdBy === session.user.id;
}

/** PATCH - update application status (accept/reject). Manager only, own job or super_manager. */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await requireManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;
    if (!status || !['accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Use "accepted" or "rejected".' },
        { status: 400 }
      );
    }
    const app = await Application.findById(id).lean();
    if (!app) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    const appDoc = app as { jobId?: string };
    const job = await Job.findById(appDoc.jobId).lean();
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    if (!canAccessJob(session, job as { createdBy?: { toString(): string } })) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const updated = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    return NextResponse.json({
      _id: updated._id.toString(),
      status: updated.status,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}
