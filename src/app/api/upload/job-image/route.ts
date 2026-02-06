import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { requireManager } from '@/lib/session';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'jobs');
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];

function isImageFile(file: File): boolean {
  if (file.size === 0) return false;
  const t = file.type?.toLowerCase();
  if (t && (t.startsWith('image/') || ALLOWED_TYPES.includes(t))) return true;
  const ext = path.extname(file.name).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
}

export async function POST(request: NextRequest) {
  const session = await requireManager();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided. Use field name "image".' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }
    if (!isImageFile(file)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, WebP or GIF.' }, { status: 400 });
    }
    await mkdir(UPLOAD_DIR, { recursive: true });
    const ext = path.extname(file.name) || (file.type?.includes('png') ? '.png' : file.type?.includes('webp') ? '.webp' : '.jpg');
    const safeName = `${randomUUID()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, safeName);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));
    const url = `/uploads/jobs/${safeName}`;
    return NextResponse.json({ url });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Upload failed';
    console.error('Job image upload error:', e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
