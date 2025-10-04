'use client';

import { useState, useEffect } from 'react';
import { Transaction, Category, RecurringTransaction } from '@/types';
import {
  fetchCategories,
  fetchTransactions,
  fetchRecurring,
  createTransaction,
  deleteTransactionApi,
  createCategory,
  updateCategoryApi,
  deleteCategoryApi,
  createRecurring,
  updateRecurringApi,
  deleteRecurringApi,
} from '@/lib/api';
import { DashboardOverview } from '@/components/dashboard-overview';
import { QuickAddForm } from '@/components/quick-add-form';
import { TransactionList } from '@/components/transaction-list';
import { CategoryManager } from '@/components/category-manager';
import { RecurringManager } from '@/components/recurring-manager';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { Landing } from '@/components/landing';
import { Navbar } from '@/components/navbar';
import { FloatingAddButton } from '@/components/floating-add-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recurring, setRecurring] = useState<RecurringTransaction[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      loadData();
    } else {
      setCategories([]);
      setTransactions([]);
      setRecurring([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const loadData = async () => {
    try {
      const [cats, txns, rec] = await Promise.all([
        fetchCategories(),
        fetchTransactions(),
        fetchRecurring(),
      ]);
      setCategories(cats);
      setTransactions(txns);
      setRecurring(rec);
    } catch (e) {
      // ignore for now, toast could be added
    }
  };

  const handleAddTransaction = (data: {
    amount: number;
    type: 'income' | 'expense';
    categoryId: string;
    date: Date;
    description?: string;
    receiptFile?: File | null;
  }) => {
    const doCreate = async () => {
      let receiptUrl: string | undefined = undefined;
      if (data.receiptFile) {
        try {
          const { uploadReceipt } = await import('@/lib/api');
          receiptUrl = await uploadReceipt(data.receiptFile);
        } catch {}
      }
      await createTransaction({
        amount: data.amount,
        type: data.type,
        categoryId: data.categoryId,
        date: data.date,
        description: data.description,
        receiptUrl,
      } as any);
    };

    doCreate()
      .then(() => {
        loadData();
        setShowQuickAdd(false);
        toast.success('Transaction added successfully');
      })
      .catch(() => toast.error('Failed to add transaction'));
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransactionApi(id)
      .then(() => {
        loadData();
        toast.success('Transaction deleted');
      })
      .catch(() => toast.error('Failed to delete transaction'));
  };

  const handleAddCategory = (category: Omit<Category, 'id' | 'createdAt'>) => {
    createCategory(category)
      .then(() => {
        loadData();
        toast.success('Category created successfully');
      })
      .catch(() => toast.error('Failed to create category'));
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    updateCategoryApi(id, updates)
      .then(() => {
        loadData();
        toast.success('Category updated successfully');
      })
      .catch(() => toast.error('Failed to update category'));
  };

  const handleDeleteCategory = (id: string) => {
    const hasTransactions = transactions.some(t => t.categoryId === id);
    if (hasTransactions) {
      toast.error('Cannot delete category with existing transactions');
      return;
    }
    deleteCategoryApi(id)
      .then(() => {
        loadData();
        toast.success('Category deleted');
      })
      .catch(() => toast.error('Failed to delete category'));
  };

  const handleAddRecurring = (data: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    createRecurring(data)
      .then(() => {
        loadData();
        toast.success('Recurring transaction created');
      })
      .catch(() => toast.error('Failed to create recurring'));
  };

  const handleUpdateRecurring = (id: string, updates: Partial<RecurringTransaction>) => {
    updateRecurringApi(id, updates)
      .then(() => {
        loadData();
        toast.success('Recurring transaction updated');
      })
      .catch(() => toast.error('Failed to update recurring'));
  };

  const handleDeleteRecurring = (id: string) => {
    deleteRecurringApi(id)
      .then(() => {
        loadData();
        toast.success('Recurring transaction deleted');
      })
      .catch(() => toast.error('Failed to delete recurring'));
  };

  if (!mounted) {
    return null;
  }

  if (status !== 'authenticated') {
    return <Landing />;
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        showTabs={true}
      />
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {currentTab === 'dashboard' && (
            <DashboardOverview transactions={transactions} categories={categories} />
          )}

          {currentTab === 'transactions' && (
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
          )}

          {currentTab === 'recurring' && (
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
          )}

          {currentTab === 'categories' && (
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
          )}

          {currentTab === 'settings' && (
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
          )}
        </div>
      </div>

      <FloatingAddButton onClick={() => setShowQuickAdd(true)} />

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
