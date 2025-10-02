'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Category, TransactionType } from '@/types';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface QuickAddFormProps {
  categories: Category[];
  onSubmit: (data: {
    amount: number;
    type: TransactionType;
    categoryId: string;
    date: Date;
    description?: string;
    receiptFile?: File | null;
  }) => void;
  onCancel?: () => void;
}

export function QuickAddForm({ categories, onSubmit, onCancel }: QuickAddFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCategories = categories.filter(c => c.type === type);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      amount: parseFloat(amount),
      type,
      categoryId,
      date,
      description: description.trim() || undefined,
      receiptFile,
    });

    setAmount('');
    setCategoryId('');
    setDescription('');
    setDate(new Date());
    setReceiptFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={type === 'expense' ? 'default' : 'outline'}
          className={cn(
            'flex-1',
            type === 'expense'
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
          )}
          onClick={() => setType('expense')}
        >
          <TrendingDown className="w-4 h-4 mr-2" />
          Expense
        </Button>
        <Button
          type="button"
          variant={type === 'income' ? 'default' : 'outline'}
          className={cn(
            'flex-1',
            type === 'income'
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
          )}
          onClick={() => setType('income')}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Income
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount" className="text-zinc-300">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">$</span>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-8 text-lg bg-zinc-900 border-zinc-700 text-white"
          />
        </div>
        {errors.amount && <p className="text-sm text-rose-400">{errors.amount}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-zinc-300">Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {filteredCategories.map((category) => {
              const IconComponent = (Icons as any)[category.icon] || Icons.DollarSign;
              return (
                <SelectItem key={category.id} value={category.id} className="text-white">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-1.5 rounded"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: category.color }} />
                    </div>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {errors.categoryId && <p className="text-sm text-rose-400">{errors.categoryId}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date" className="text-zinc-300">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              className="bg-zinc-900 text-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-zinc-300">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Add a note..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-900 border-zinc-700 text-white resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="receipt" className="text-zinc-300">Receipt (Optional)</Label>
        <Input
          id="receipt"
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
          className="bg-zinc-900 border-zinc-700 text-white"
        />
      </div>

      <div className="flex gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className={cn(
            'flex-1',
            type === 'expense'
              ? 'bg-rose-600 hover:bg-rose-700'
              : 'bg-emerald-600 hover:bg-emerald-700'
          )}
        >
          Add Transaction
        </Button>
      </div>
    </form>
  );
}
