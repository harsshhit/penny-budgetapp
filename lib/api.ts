import { Category, RecurringTransaction, Transaction } from '@/types';

function reviveTransactionDates(items: any[]): Transaction[] {
  return items.map((t) => ({
    ...t,
    date: new Date(t.date),
    createdAt: new Date(t.createdAt),
    updatedAt: new Date(t.updatedAt),
  }));
}

function reviveRecurringDates(items: any[]): RecurringTransaction[] {
  return items.map((t) => ({
    ...t,
    nextDueDate: new Date(t.nextDueDate),
    createdAt: new Date(t.createdAt),
    updatedAt: new Date(t.updatedAt),
  }));
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load categories');
  return await res.json();
}

export async function createCategory(input: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return await res.json();
}

export async function updateCategoryApi(id: string, updates: Partial<Category>): Promise<Category> {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return await res.json();
}

export async function deleteCategoryApi(id: string): Promise<void> {
  const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete category');
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch('/api/transactions', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load transactions');
  const data = await res.json();
  return reviveTransactionDates(data);
}

export async function createTransaction(input: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Transaction> {
  const res = await fetch('/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, date: input.date.toISOString() }),
  });
  if (!res.ok) throw new Error('Failed to create transaction');
  const data = await res.json();
  return reviveTransactionDates([data])[0];
}

export async function uploadReceipt(file: File): Promise<string> {
  // Stub endpoint ignores the actual file for now
  const res = await fetch('/api/upload', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to upload receipt');
  const data = await res.json();
  return data.url as string;
}

export async function deleteTransactionApi(id: string): Promise<void> {
  const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete transaction');
}

export async function fetchRecurring(): Promise<RecurringTransaction[]> {
  const res = await fetch('/api/recurring', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load recurring');
  const data = await res.json();
  return reviveRecurringDates(data);
}

export async function createRecurring(input: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<RecurringTransaction> {
  const res = await fetch('/api/recurring', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, nextDueDate: input.nextDueDate.toISOString() }),
  });
  if (!res.ok) throw new Error('Failed to create recurring');
  const data = await res.json();
  return reviveRecurringDates([data])[0];
}

export async function updateRecurringApi(id: string, updates: Partial<RecurringTransaction>): Promise<RecurringTransaction> {
  const res = await fetch(`/api/recurring/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updates,
      nextDueDate: updates.nextDueDate ? updates.nextDueDate.toISOString() : undefined,
    }),
  });
  if (!res.ok) throw new Error('Failed to update recurring');
  const data = await res.json();
  return reviveRecurringDates([data])[0];
}

export async function deleteRecurringApi(id: string): Promise<void> {
  const res = await fetch(`/api/recurring/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete recurring');
}


