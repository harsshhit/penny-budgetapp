import { Transaction, Category } from '@/types';
import { formatCurrency } from '@/lib/analytics';
import { format } from 'date-fns';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Trash2, CreditCard as Edit2 } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  category?: Category;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

export function TransactionItem({ transaction, category, onEdit, onDelete }: TransactionItemProps) {
  const IconComponent = category?.icon
    ? (Icons as any)[category.icon] || Icons.DollarSign
    : Icons.DollarSign;

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group">
      <div
        className="p-3 rounded-xl"
        style={{ backgroundColor: `${category?.color}20` }}
      >
        <IconComponent className="w-5 h-5" style={{ color: category?.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">
              {category?.name || 'Unknown Category'}
            </p>
            <p className="text-sm text-zinc-400 mt-0.5">
              {format(transaction.date, 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="text-right">
            <p
              className={cn(
                'font-semibold text-lg',
                transaction.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
              )}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </div>

        {transaction.description && (
          <p className="text-sm text-zinc-500 mt-1 truncate">{transaction.description}</p>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-white"
            onClick={() => onEdit(transaction)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-rose-400"
            onClick={() => onDelete(transaction.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
