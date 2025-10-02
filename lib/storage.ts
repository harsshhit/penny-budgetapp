import { Category, Transaction, RecurringTransaction } from '@/types';
import { DEFAULT_CATEGORIES } from './default-categories';

const STORAGE_KEYS = {
  CATEGORIES: 'penny_categories',
  TRANSACTIONS: 'penny_transactions',
  RECURRING: 'penny_recurring_transactions',
  USER_ID: 'penny_user_id',
};

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getUserId(): string {
  if (typeof window === 'undefined') return 'default_user';

  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    userId = generateId();
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  }
  return userId;
}

export function initializeCategories(): Category[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (stored) {
    return JSON.parse(stored);
  }

  const categories: Category[] = DEFAULT_CATEGORIES.map(cat => ({
    ...cat,
    id: generateId(),
    createdAt: new Date(),
  }));

  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  return categories;
}

export function getCategories(): Category[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return stored ? JSON.parse(stored) : initializeCategories();
}

export function saveCategory(category: Omit<Category, 'id' | 'createdAt'>): Category {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: generateId(),
    createdAt: new Date(),
  };
  categories.push(newCategory);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return null;

  categories[index] = { ...categories[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== id);
  if (filtered.length === categories.length) return false;

  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
  return true;
}

export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  if (!stored) return [];

  return JSON.parse(stored, (key, value) => {
    if (key === 'date' || key === 'createdAt' || key === 'updatedAt') {
      return new Date(value);
    }
    return value;
  });
}

export function saveTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
  const transactions = getTransactions();
  const newTransaction: Transaction = {
    ...transaction,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  transactions.push(newTransaction);
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  return newTransaction;
}

export function updateTransaction(id: string, updates: Partial<Transaction>): Transaction | null {
  const transactions = getTransactions();
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) return null;

  transactions[index] = {
    ...transactions[index],
    ...updates,
    updatedAt: new Date(),
  };
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  return transactions[index];
}

export function deleteTransaction(id: string): boolean {
  const transactions = getTransactions();
  const filtered = transactions.filter(t => t.id !== id);
  if (filtered.length === transactions.length) return false;

  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
  return true;
}

export function getRecurringTransactions(): RecurringTransaction[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.RECURRING);
  if (!stored) return [];

  return JSON.parse(stored, (key, value) => {
    if (key === 'nextDueDate' || key === 'createdAt' || key === 'updatedAt') {
      return new Date(value);
    }
    return value;
  });
}

export function saveRecurringTransaction(
  transaction: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt'>
): RecurringTransaction {
  const recurring = getRecurringTransactions();
  const newRecurring: RecurringTransaction = {
    ...transaction,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  recurring.push(newRecurring);
  localStorage.setItem(STORAGE_KEYS.RECURRING, JSON.stringify(recurring));
  return newRecurring;
}

export function updateRecurringTransaction(
  id: string,
  updates: Partial<RecurringTransaction>
): RecurringTransaction | null {
  const recurring = getRecurringTransactions();
  const index = recurring.findIndex(r => r.id === id);
  if (index === -1) return null;

  recurring[index] = {
    ...recurring[index],
    ...updates,
    updatedAt: new Date(),
  };
  localStorage.setItem(STORAGE_KEYS.RECURRING, JSON.stringify(recurring));
  return recurring[index];
}

export function deleteRecurringTransaction(id: string): boolean {
  const recurring = getRecurringTransactions();
  const filtered = recurring.filter(r => r.id !== id);
  if (filtered.length === recurring.length) return false;

  localStorage.setItem(STORAGE_KEYS.RECURRING, JSON.stringify(filtered));
  return true;
}
