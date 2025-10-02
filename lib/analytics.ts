import { Transaction, Category, MonthlyStats, CategoryWithTransactions, ChartData } from '@/types';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

export function getMonthlyStats(
  transactions: Transaction[],
  month: Date = new Date()
): MonthlyStats {
  const start = startOfMonth(month);
  const end = endOfMonth(month);

  const currentMonthTxns = transactions.filter(
    t => t.date >= start && t.date <= end
  );

  const prevMonth = subMonths(month, 1);
  const prevStart = startOfMonth(prevMonth);
  const prevEnd = endOfMonth(prevMonth);

  const prevMonthTxns = transactions.filter(
    t => t.date >= prevStart && t.date <= prevEnd
  );

  const currentIncome = currentMonthTxns
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentExpense = currentMonthTxns
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const prevIncome = prevMonthTxns
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const prevExpense = prevMonthTxns
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const incomeChange = prevIncome > 0
    ? ((currentIncome - prevIncome) / prevIncome) * 100
    : 0;

  const expenseChange = prevExpense > 0
    ? ((currentExpense - prevExpense) / prevExpense) * 100
    : 0;

  return {
    totalIncome: currentIncome,
    totalExpense: currentExpense,
    balance: currentIncome - currentExpense,
    incomeChange,
    expenseChange,
    transactionCount: currentMonthTxns.length,
  };
}

export function getCategoryBreakdown(
  transactions: Transaction[],
  categories: Category[],
  month: Date = new Date()
): CategoryWithTransactions[] {
  const start = startOfMonth(month);
  const end = endOfMonth(month);

  const monthTxns = transactions.filter(
    t => t.date >= start && t.date <= end
  );

  const categoryMap = new Map<string, CategoryWithTransactions>();

  categories.forEach(cat => {
    categoryMap.set(cat.id, {
      ...cat,
      totalAmount: 0,
      transactionCount: 0,
      percentage: 0,
    });
  });

  monthTxns.forEach(txn => {
    const cat = categoryMap.get(txn.categoryId);
    if (cat) {
      cat.totalAmount += txn.amount;
      cat.transactionCount++;
    }
  });

  const result = Array.from(categoryMap.values())
    .filter(cat => cat.transactionCount > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const total = result.reduce((sum, cat) => sum + cat.totalAmount, 0);
  result.forEach(cat => {
    cat.percentage = total > 0 ? (cat.totalAmount / total) * 100 : 0;
  });

  return result;
}

export function getChartData(
  transactions: Transaction[],
  categories: Category[],
  type: 'income' | 'expense',
  month: Date = new Date()
): ChartData[] {
  const breakdown = getCategoryBreakdown(transactions, categories, month);

  return breakdown
    .filter(cat => cat.type === type)
    .map(cat => ({
      name: cat.name,
      value: cat.totalAmount,
      color: cat.color,
    }));
}

export function getMonthlyTrend(
  transactions: Transaction[],
  monthsBack: number = 6
): Array<{ month: string; income: number; expense: number }> {
  const result = [];
  const now = new Date();

  for (let i = monthsBack - 1; i >= 0; i--) {
    const targetMonth = subMonths(now, i);
    const start = startOfMonth(targetMonth);
    const end = endOfMonth(targetMonth);

    const monthTxns = transactions.filter(
      t => t.date >= start && t.date <= end
    );

    const income = monthTxns
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTxns
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    result.push({
      month: format(targetMonth, 'MMM'),
      income,
      expense,
    });
  }

  return result;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}
