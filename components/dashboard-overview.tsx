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
    <div className="space-y-8">
      

      {/* Stats grid with interesting layout */}
      <div className="grid gap-6 md:gap-8">
        {/* Top row - Balance card takes full width */}
        <div className="col-span-full">
          <StatCard
            title="Balance"
            value={formatCurrency(stats.balance)}
            icon={<Wallet className="w-6 h-6 text-violet-400" />}
            variant="default"
          />
        </div>
        
        {/* Bottom row - 3 cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Total Income"
            value={formatCurrency(stats.totalIncome)}
            change={stats.incomeChange}
            icon={<TrendingUp className="w-5 h-5 text-violet-400" />}
            variant="income"
          />
          <StatCard
            title="Total Expenses"
            value={formatCurrency(stats.totalExpense)}
            change={stats.expenseChange}
            icon={<TrendingDown className="w-5 h-5 text-violet-400" />}
            variant="expense"
          />
          <StatCard
            title="Transactions"
            value={stats.transactionCount.toString()}
            icon={<Receipt className="w-5 h-5 text-violet-400" />}
            variant="default"
          />
        </div>
      </div>

      {/* Charts section */}
      <div className="space-y-8">
        <div className="relative p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-violet-400/20 hover:border-violet-400/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📈</span>
            <h2 className="text-2xl font-bold text-white">Money Flow Trends</h2>
          </div>
          <TrendChart data={trendData} />
        </div>

        <div className="relative p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-violet-400/20 hover:border-violet-400/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎯</span>
            <h2 className="text-2xl font-bold text-white">Where Your Money Goes</h2>
          </div>
          <Tabs defaultValue="expenses" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-black/50 border border-violet-400/20">
              <TabsTrigger 
                value="expenses" 
                className="data-[state=active]:bg-violet-400/20 data-[state=active]:text-violet-400 text-white"
              >
                💸 Spending
              </TabsTrigger>
              <TabsTrigger 
                value="income" 
                className="data-[state=active]:bg-violet-400/20 data-[state=active]:text-violet-400 text-white"
              >
                🚀 Income
              </TabsTrigger>
            </TabsList>
            <TabsContent value="expenses" className="mt-6">
              <CategoryChart data={expenseData} />
            </TabsContent>
            <TabsContent value="income" className="mt-6">
              <CategoryChart data={incomeData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
