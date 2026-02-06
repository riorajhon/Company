import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { requireManager } from '@/lib/session';

function serializeJob(j: Record<string, unknown> & { _id: { toString(): string }; createdAt?: Date; updatedAt?: Date; workLocation?: string; location?: string; createdBy?: { toString(): string } }) {
  return {
    ...j,
    _id: j._id.toString(),
    workLocation: j.workLocation ?? j.location ?? '',
    createdBy: j.createdBy?.toString?.() ?? undefined,
    createdAt: j.createdAt?.toISOString(),
    updatedAt: j.updatedAt?.toISOString(),
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await requireManager();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const published = searchParams.get('published');
    const all = searchParams.get('all') === '1' || searchParams.get('all') === 'true';
    const filter: Record<string, unknown> = {};
    if (type) filter.type = type;
    if (!(session && all)) {
      if (published !== 'false') filter.published = true;
    }
    if (session?.user?.role === 'manager' && session?.user?.id) {
      filter.createdBy = session.user.id;
    }
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
    const serialized = (jobs as unknown as Array<Record<string, unknown> & { _id: { toString(): string }; createdAt?: Date; updatedAt?: Date; workLocation?: string; location?: string }>).map(serializeJob);
    return NextResponse.json(serialized);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await requireManager();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
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
    const loc = workLocation ?? location ?? '';
    if (!title || !type || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, type, description' },
        { status: 400 }
      );
    }
    if (!image || typeof image !== 'string' || !image.trim()) {
      return NextResponse.json(
        { error: 'Job image is required. Upload an image when posting a job.' },
        { status: 400 }
      );
    }
    const job = await Job.create({
      title,
      workLocation: loc,
      location: loc,
      type,
      description,
      image: (image as string).trim(),
      published: published !== false,
      education: education ?? '',
      keyKnowledgeSkills: Array.isArray(keyKnowledgeSkills) ? keyKnowledgeSkills : [],
      pay: pay ?? '',
      benefits: Array.isArray(benefits) ? benefits : [],
      createdBy: session.user?.id ?? undefined,
    });
    return NextResponse.json(serializeJob(job.toObject() as unknown as Parameters<typeof serializeJob>[0]));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
