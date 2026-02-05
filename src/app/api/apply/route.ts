import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Application } from '@/models/Application';
import { Job } from '@/models/Job';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { jobId, fullName, email, phone, github, linkedin, resumeUrl, message } = body;
    if (!jobId || !fullName || !email || !resumeUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: jobId, fullName, email, resumeUrl (upload a resume first)' },
        { status: 400 }
      );
    }
    const job = await Job.findOne({ _id: jobId, published: true });
    if (!job) {
      return NextResponse.json({ error: 'Job not found or not open' }, { status: 404 });
    }
    await Application.create({
      jobId,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      github: github ? String(github).trim() : undefined,
      linkedin: linkedin ? String(linkedin).trim() : undefined,
      resumeUrl: String(resumeUrl).trim(),
      message: message ? String(message).trim() : undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
