'use client';

import { useState, useEffect } from 'react';
import { Transaction, RecurringTransaction } from '@/types';
import {
  fetchCategories,
  fetchTransactions,
  fetchRecurring,
  createTransaction,
} from '@/lib/api';


import { useSession } from 'next-auth/react';
import { Landing } from '@/components/landing';
import { Navbar } from '@/components/navbar';
import { toast } from 'sonner';

export default function Home() {
  const { data: session, status } = useSession();
  // const [categories, setCategories] = useState<Category[]>([]);
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
      // setCategories([]);
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
      // setCategories(cats);
      setTransactions(txns);
      setRecurring(rec);
    } catch (e) {
      // ignore for now, toast could be added
    }
  };

  const handleAddTransaction = async (data: {
    amount: number;
    type: 'income' | 'expense';
    categoryId?: string;
    date: Date;
    description?: string;
    receiptFile?: File | null;
  }) => {
    try {
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
        categoryId: data.categoryId ?? '', // Provide categoryId or fallback to empty string
        date: data.date,
        description: data.description,
        receiptUrl,
      });

      toast.success('Transaction added');
      setShowQuickAdd(false);
      loadData();
    } catch (e) {
      toast.error('Failed to add transaction');
    }
  };





 

  

  


 

 

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
     
<div>Hello </div>

      
    </div>
  );
}
