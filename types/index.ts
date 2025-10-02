export type TransactionType = 'income' | 'expense';

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon: string;
  userId?: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: Date;
  description?: string;
  receiptUrl?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurringTransaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  description?: string;
  frequency: Frequency;
  nextDueDate: Date;
  isActive: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryWithTransactions extends Category {
  totalAmount: number;
  transactionCount: number;
  percentage: number;
}

export interface MonthlyStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeChange: number;
  expenseChange: number;
  transactionCount: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}
