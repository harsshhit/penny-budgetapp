'use client';

import { Transaction, Category } from '@/types';
import { TransactionItem } from './transaction-item';
import { format, isSameDay, isSameWeek, isSameMonth, startOfWeek, startOfMonth } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

function groupTransactionsByDate(transactions: Transaction[]) {
  const now = new Date();
  const groups: { title: string; transactions: Transaction[] }[] = [];

  const today: Transaction[] = [];
  const thisWeek: Transaction[] = [];
  const thisMonth: Transaction[] = [];
  const older: Transaction[] = [];

  transactions.forEach((txn) => {
    if (isSameDay(txn.date, now)) {
      today.push(txn);
    } else if (isSameWeek(txn.date, now, { weekStartsOn: 1 })) {
      thisWeek.push(txn);
    } else if (isSameMonth(txn.date, now)) {
      thisMonth.push(txn);
    } else {
      older.push(txn);
    }
  });

  if (today.length > 0) groups.push({ title: 'Today', transactions: today });
  if (thisWeek.length > 0) groups.push({ title: 'This Week', transactions: thisWeek });
  if (thisMonth.length > 0) groups.push({ title: 'This Month', transactions: thisMonth });
  if (older.length > 0) groups.push({ title: 'Older', transactions: older });

  return groups;
}

export function TransactionList({ transactions, categories, onEdit, onDelete }: TransactionListProps) {
  const sorted = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());
  const groups = groupTransactionsByDate(sorted);

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500">No transactions yet</p>
        <p className="text-sm text-zinc-600 mt-2">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-semibold text-zinc-400 mb-3">{group.title}</h3>
          <div className="space-y-2">
            {group.transactions.map((transaction) => {
              const category = categories.find((c) => c.id === transaction.categoryId);
              return (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  category={category}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
