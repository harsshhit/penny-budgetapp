'use client';

import { useState } from 'react';
import { RecurringTransaction, Category, Frequency } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Calendar as CalendarIcon, CreditCard as Edit2, Trash2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/analytics';
import * as Icons from 'lucide-react';

interface RecurringManagerProps {
  recurring: RecurringTransaction[];
  categories: Category[];
  onAdd: (transaction: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, updates: Partial<RecurringTransaction>) => void;
  onDelete: (id: string) => void;
}

export function RecurringManager({ recurring, categories, onAdd, onUpdate, onDelete }: RecurringManagerProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [nextDueDate, setNextDueDate] = useState<Date>(new Date());

  const resetForm = () => {
    setAmount('');
    setType('expense');
    setCategoryId('');
    setDescription('');
    setFrequency('monthly');
    setNextDueDate(new Date());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0 || !categoryId) return;

    onAdd({
      amount: parseFloat(amount),
      type,
      categoryId,
      description: description.trim() || undefined,
      frequency,
      nextDueDate,
      isActive: true,
      userId: 'default_user',
    });

    resetForm();
    setOpen(false);
  };

  const filteredCategories = categories.filter(c => c.type === type);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recurring Transactions</h3>
        <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Recurring
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Recurring Transaction</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={type === 'expense' ? 'default' : 'outline'}
                  className={cn(
                    'flex-1',
                    type === 'expense'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  )}
                  onClick={() => setType('expense')}
                >
                  Expense
                </Button>
                <Button
                  type="button"
                  variant={type === 'income' ? 'default' : 'outline'}
                  className={cn(
                    'flex-1',
                    type === 'income'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  )}
                  onClick={() => setType('income')}
                >
                  Income
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {filteredCategories.map((category) => {
                      const IconComponent = (Icons as any)[category.icon] || Icons.DollarSign;
                      return (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" style={{ color: category.color }} />
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Next Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(nextDueDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700">
                    <Calendar
                      mode="single"
                      selected={nextDueDate}
                      onSelect={(date) => date && setNextDueDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add a note..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 resize-none"
                  rows={2}
                />
              </div>

              <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                Add Recurring Transaction
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-2">
        {recurring.map((item) => {
          const category = categories.find(c => c.id === item.categoryId);
          const IconComponent = category?.icon
            ? (Icons as any)[category.icon] || Icons.DollarSign
            : Icons.DollarSign;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 group"
            >
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${category?.color}20` }}
              >
                <IconComponent className="w-5 h-5" style={{ color: category?.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">{category?.name}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
                  <Clock className="w-3 h-3" />
                  <span className="capitalize">{item.frequency}</span>
                  <span>•</span>
                  <span>Next: {format(item.nextDueDate, 'MMM dd')}</span>
                </div>
                {item.description && (
                  <p className="text-sm text-zinc-500 mt-1">{item.description}</p>
                )}
              </div>

              <div className="text-right">
                <p
                  className={cn(
                    'font-semibold',
                    item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  )}
                >
                  {item.type === 'income' ? '+' : '-'}
                  {formatCurrency(item.amount)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={item.isActive}
                  onCheckedChange={(checked) => onUpdate(item.id, { isActive: checked })}
                  className="data-[state=checked]:bg-violet-600"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
        {recurring.length === 0 && (
          <p className="text-center text-zinc-500 py-8">No recurring transactions yet</p>
        )}
      </div>
    </div>
  );
}
