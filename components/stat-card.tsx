import { Card, CardContent } from '@/components/ui/card';
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

  const variantStyles = {
    default: 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700',
    income: 'bg-gradient-to-br from-emerald-900/40 to-zinc-900 border-emerald-700/50',
    expense: 'bg-gradient-to-br from-rose-900/40 to-zinc-900 border-rose-700/50',
  };

  return (
    <Card className={cn('border', variantStyles[variant])}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
            {showChange && (
              <div className={cn(
                'flex items-center gap-1 mt-2 text-sm font-medium',
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              )}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(change).toFixed(1)}%</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="p-3 rounded-xl bg-white/5">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
