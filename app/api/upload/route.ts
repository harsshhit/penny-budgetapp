import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function POST() {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // Stub: return a placeholder URL
  const url = `https://via.placeholder.com/600x400.png?text=Receipt+${Date.now()}`;
  return NextResponse.json({ url });
}


