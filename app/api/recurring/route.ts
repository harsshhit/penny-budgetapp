import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { RecurringTransactionModel } from '@/lib/models/RecurringTransaction';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  const items = await RecurringTransactionModel.find({ userId: auth.userId }).sort({ nextDueDate: 1 });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { amount, type, categoryId, description, frequency, nextDueDate, isActive } = body;
  await connectToDatabase();
  const created = await RecurringTransactionModel.create({
    userId: auth.userId,
    amount,
    type,
    categoryId,
    description,
    frequency,
    nextDueDate,
    isActive: isActive ?? true,
  });
  return NextResponse.json(created, { status: 201 });
}


