'use client';

import { useState, useEffect } from 'react';
import { Transaction, Category, RecurringTransaction } from '@/types';
import {
  getCategories,
  getTransactions,
  getRecurringTransactions,
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  saveCategory,
  updateCategory,
  deleteCategory,
  saveRecurringTransaction,
  updateRecurringTransaction,
  deleteRecurringTransaction,
  initializeCategories,
} from '@/lib/storage';
import { DashboardOverview } from '@/components/dashboard-overview';
import { QuickAddForm } from '@/components/quick-add-form';
import { TransactionList } from '@/components/transaction-list';
import { CategoryManager } from '@/components/category-manager';
import { RecurringManager } from '@/components/recurring-manager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, LayoutDashboard, Receipt, ChartBar as BarChart3, Settings, Repeat } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recurring, setRecurring] = useState<RecurringTransaction[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeCategories();
    loadData();
  }, []);

  const loadData = () => {
    setCategories(getCategories());
    setTransactions(getTransactions());
    setRecurring(getRecurringTransactions());
  };

  const handleAddTransaction = (data: {
    amount: number;
    type: 'income' | 'expense';
    categoryId: string;
    date: Date;
    description?: string;
  }) => {
    saveTransaction({
      ...data,
      userId: 'default_user',
    });
    loadData();
    setShowQuickAdd(false);
    toast.success('Transaction added successfully');
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    loadData();
    toast.success('Transaction deleted');
  };

  const handleAddCategory = (category: Omit<Category, 'id' | 'createdAt'>) => {
    saveCategory(category);
    loadData();
    toast.success('Category created successfully');
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    updateCategory(id, updates);
    loadData();
    toast.success('Category updated successfully');
  };

  const handleDeleteCategory = (id: string) => {
    const hasTransactions = transactions.some(t => t.categoryId === id);
    if (hasTransactions) {
      toast.error('Cannot delete category with existing transactions');
      return;
    }
    deleteCategory(id);
    loadData();
    toast.success('Category deleted');
  };

  const handleAddRecurring = (data: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    saveRecurringTransaction(data);
    loadData();
    toast.success('Recurring transaction created');
  };

  const handleUpdateRecurring = (id: string, updates: Partial<RecurringTransaction>) => {
    updateRecurringTransaction(id, updates);
    loadData();
    toast.success('Recurring transaction updated');
  };

  const handleDeleteRecurring = (id: string) => {
    deleteRecurringTransaction(id);
    loadData();
    toast.success('Recurring transaction deleted');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Penny
            </h1>
            <p className="text-zinc-400 mt-1">Smart budget tracking made simple</p>
          </div>
          <Button
            onClick={() => setShowQuickAdd(true)}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-zinc-800">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-zinc-800">
              <Receipt className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="recurring" className="data-[state=active]:bg-zinc-800">
              <Repeat className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Recurring</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-zinc-800">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-zinc-800">
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview transactions={transactions} categories={categories} />
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">All Transactions</CardTitle>
                  <Button
                    onClick={() => setShowQuickAdd(true)}
                    className="bg-violet-600 hover:bg-violet-700"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TransactionList
                  transactions={transactions}
                  categories={categories}
                  onDelete={handleDeleteTransaction}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recurring">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <RecurringManager
                  recurring={recurring}
                  categories={categories}
                  onAdd={handleAddRecurring}
                  onUpdate={handleUpdateRecurring}
                  onDelete={handleDeleteRecurring}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <CategoryManager
                  categories={categories}
                  onAdd={handleAddCategory}
                  onUpdate={handleUpdateCategory}
                  onDelete={handleDeleteCategory}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">About Penny</h3>
                    <p className="text-zinc-400">
                      Penny is a modern budget tracking application designed to help you take control
                      of your finances. Track your income and expenses, visualize your spending
                      patterns, and make informed financial decisions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Data Storage</h3>
                    <p className="text-zinc-400">
                      All your data is stored locally in your browser. Your financial information
                      never leaves your device, ensuring complete privacy and security.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Version</h3>
                    <p className="text-zinc-400">Penny v1.0.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showQuickAdd} onOpenChange={setShowQuickAdd}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <QuickAddForm
            categories={categories}
            onSubmit={handleAddTransaction}
            onCancel={() => setShowQuickAdd(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
