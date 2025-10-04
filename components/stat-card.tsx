import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'income' | 'expense';
}

export function StatCard({ title, value, change, icon, variant = 'default' }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const showChange = change !== undefined && change !== 0;

  const getEmoji = () => {
    switch (title) {
      case 'Balance': return '💰';
      case 'Total Income': return '📈';
      case 'Total Expenses': return '📉';
      case 'Transactions': return '💳';
      default: return '📊';
    }
  };

  const getFunTitle = () => {
    switch (title) {
      case 'Balance': return 'Your Stack 💸';
      case 'Total Income': return 'Money In 🚀';
      case 'Total Expenses': return 'Money Out 💸';
      case 'Transactions': return 'Activity 📱';
      default: return title;
    }
  };

  return (
    <div className={cn(
      'relative p-6 rounded-2xl border transition-all duration-300',
      'bg-black/50 backdrop-blur-sm',
      variant === 'income' && 'border-violet-400/30',
      variant === 'expense' && 'border-violet-400/30',
      variant === 'default' && 'border-violet-400/20'
    )}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{getEmoji()}</span>
        {icon && (
          <div className="p-2 rounded-xl bg-violet-400/10 border border-violet-400/20">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-violet-400/70 text-sm font-medium">{getFunTitle()}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        
        {showChange && (
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium mt-2',
            isPositive ? 'text-violet-400' : 'text-violet-400/70'
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(change).toFixed(1)}% from last month</span>
          </div>
        )}
      </div>

      {/* Subtle glow effect */}
      <div className={cn(
        'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
        'hover:opacity-20 pointer-events-none',
        variant === 'income' && 'bg-violet-400',
        variant === 'expense' && 'bg-violet-400',
        variant === 'default' && 'bg-violet-400'
      )} />
    </div>
  );
}
