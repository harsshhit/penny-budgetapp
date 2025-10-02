'use client';

import { Transaction, Category } from '@/types';
import { StatCard } from './stat-card';
import { CategoryChart } from './category-chart';
import { TrendChart } from './trend-chart';
import { getMonthlyStats, getChartData, getMonthlyTrend, formatCurrency } from '@/lib/analytics';
import { Wallet, TrendingUp, TrendingDown, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardOverviewProps {
  transactions: Transaction[];
  categories: Category[];
}

export function DashboardOverview({ transactions, categories }: DashboardOverviewProps) {
  const stats = getMonthlyStats(transactions);
  const expenseData = getChartData(transactions, categories, 'expense');
  const incomeData = getChartData(transactions, categories, 'income');
  const trendData = getMonthlyTrend(transactions);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Balance"
          value={formatCurrency(stats.balance)}
          icon={<Wallet className="w-5 h-5 text-violet-400" />}
          variant="default"
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(stats.totalIncome)}
          change={stats.incomeChange}
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
          variant="income"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpense)}
          change={stats.expenseChange}
          icon={<TrendingDown className="w-5 h-5 text-rose-400" />}
          variant="expense"
        />
        <StatCard
          title="Transactions"
          value={stats.transactionCount.toString()}
          icon={<Receipt className="w-5 h-5 text-blue-400" />}
          variant="default"
        />
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Spending Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart data={trendData} />
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="expenses" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-zinc-800">
              <TabsTrigger value="expenses" className="data-[state=active]:bg-zinc-900">
                Expenses
              </TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-zinc-900">
                Income
              </TabsTrigger>
            </TabsList>
            <TabsContent value="expenses" className="mt-6">
              <CategoryChart data={expenseData} />
            </TabsContent>
            <TabsContent value="income" className="mt-6">
              <CategoryChart data={incomeData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
