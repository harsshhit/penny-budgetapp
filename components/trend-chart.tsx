'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/lib/analytics';

interface TrendChartProps {
  data: Array<{ month: string; income: number; expense: number }>;
}

export function TrendChart({ data }: TrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-violet-400/70 space-y-3">
        <span className="text-4xl">📊</span>
        <p className="text-lg font-medium">No data yet</p>
        <p className="text-sm">Start adding transactions to see your trends!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 2" stroke="#a855f7" strokeOpacity={0.2} />
          <XAxis
            dataKey="month"
            stroke="#a855f7"
            strokeOpacity={0.7}
            style={{ fontSize: '13px', fontWeight: '500' }}
            tick={{ fill: '#a855f7' }}
          />
          <YAxis
            stroke="#a855f7"
            strokeOpacity={0.7}
            style={{ fontSize: '13px', fontWeight: '500' }}
            tick={{ fill: '#a855f7' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#000000',
              border: '1px solid #a855f7',
              borderRadius: '12px',
              color: '#fff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            }}
            formatter={(value: number) => [formatCurrency(value), '']}
            labelStyle={{ color: '#a855f7', fontWeight: '600' }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingBottom: '20px' }}
            formatter={(value) => (
              <span className="text-violet-400 text-sm font-medium capitalize">
                {value === 'income' ? '💰 Income' : '💸 Expenses'}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#a855f7"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncome)"
            dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#9333ea"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorExpense)"
            dot={{ fill: '#9333ea', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#9333ea', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
