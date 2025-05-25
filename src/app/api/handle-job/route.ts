import { db } from '@/db/database';
import { pdfExports } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { fileName, tempUrl, reference } = body;
  // console.log("✅ /api/handle-job called", body);

  if (!fileName || !tempUrl) {
    return NextResponse.json({ error: 'Missing fileName or tempUrl' }, { status: 400 });
  }

  await db.insert(pdfExports).values({
    fileName,
    tempUrl,
    reference,
  });

  return NextResponse.json({ success: true });
}
