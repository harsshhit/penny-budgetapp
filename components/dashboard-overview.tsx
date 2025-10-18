'use client';

import { Transaction, Category } from '@/types';
import { getMonthlyStats, getChartData, getMonthlyTrend, formatCurrency } from '@/lib/analytics';
import { Wallet, TrendingUp, TrendingDown, Receipt } from 'lucide-react';
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
      

     

      {/* Charts section */}
      <div className="space-y-8">
        <div className="relative p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-violet-400/20 hover:border-violet-400/40 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📈</span>
            <h2 className="text-2xl font-bold text-white">Money Flow Trends</h2>
          </div>
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
            
          </Tabs>
        </div>
      </div>
    </div>
  );
}
