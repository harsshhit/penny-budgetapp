import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { RecurringTransactionModel } from '@/lib/models/RecurringTransaction';
import { requireAuth } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = params;
  await connectToDatabase();
  const updated = await RecurringTransactionModel.findOneAndUpdate(
    { _id: id, userId: auth.userId },
    await req.json(),
    { new: true }
  );
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = params;
  await connectToDatabase();
  const res = await RecurringTransactionModel.deleteOne({ _id: id, userId: auth.userId });
  if (res.deletedCount === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}


