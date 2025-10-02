import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { CategoryModel } from '@/lib/models/Category';
import { DEFAULT_CATEGORIES } from '@/lib/default-categories';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  let categories = await CategoryModel.find({ userId: auth.userId }).sort({ createdAt: -1 });
  if (categories.length === 0) {
    await CategoryModel.insertMany(
      DEFAULT_CATEGORIES.map((c) => ({ ...c, userId: auth.userId }))
    );
    categories = await CategoryModel.find({ userId: auth.userId }).sort({ createdAt: -1 });
  }
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { name, type, color, icon } = body;
  await connectToDatabase();
  const created = await CategoryModel.create({ userId: auth.userId, name, type, color, icon, isDefault: false });
  return NextResponse.json(created, { status: 201 });
}


