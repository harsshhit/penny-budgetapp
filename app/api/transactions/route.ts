import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { TransactionModel } from '@/lib/models/Transaction';
import { RecurringTransactionModel } from '@/lib/models/RecurringTransaction';
import { addDays, addWeeks, addMonths, addYears, isBefore } from 'date-fns';
import { requireAuth } from '@/lib/auth';

async function materializeRecurring(userId: string) {
  const now = new Date();
  const due = await RecurringTransactionModel.find({ userId, isActive: true, nextDueDate: { $lte: now } });
  for (const r of due) {
    await TransactionModel.create({
      userId,
      amount: r.amount,
      type: r.type,
      categoryId: r.categoryId,
      date: r.nextDueDate,
      description: r.description,
    });
    let next = r.nextDueDate;
    switch (r.frequency) {
      case 'daily':
        next = addDays(next, 1);
        break;
      case 'weekly':
        next = addWeeks(next, 1);
        break;
      case 'monthly':
        next = addMonths(next, 1);
        break;
      case 'yearly':
        next = addYears(next, 1);
        break;
    }
    while (isBefore(next, now)) {
      switch (r.frequency) {
        case 'daily':
          next = addDays(next, 1);
          break;
        case 'weekly':
          next = addWeeks(next, 1);
          break;
        case 'monthly':
          next = addMonths(next, 1);
          break;
        case 'yearly':
          next = addYears(next, 1);
          break;
      }
    }
    await RecurringTransactionModel.updateOne({ _id: r._id }, { $set: { nextDueDate: next } });
  }
}

export async function GET() {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  await materializeRecurring(auth.userId);
  const items = await TransactionModel.find({ userId: auth.userId }).sort({ date: -1 });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { amount, type, categoryId, date, description, receiptUrl } = body;
  await connectToDatabase();
  const created = await TransactionModel.create({
    userId: auth.userId,
    amount,
    type,
    categoryId,
    date,
    description,
    receiptUrl,
  });
  return NextResponse.json(created, { status: 201 });
}


