'use client';

import { useState } from 'react';
import { Category, TransactionType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, updates: Partial<Category>) => void;
  onDelete: (id: string) => void;
}

const AVAILABLE_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
];

const AVAILABLE_ICONS = [
  'DollarSign', 'Briefcase', 'Code', 'TrendingUp', 'Utensils', 'Car',
  'Home', 'Zap', 'Heart', 'Film', 'ShoppingBag', 'GraduationCap',
  'Smartphone', 'Laptop', 'Plane', 'Coffee', 'Gift', 'Music',
];

export function CategoryManager({ categories, onAdd, onUpdate, onDelete }: CategoryManagerProps) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [color, setColor] = useState(AVAILABLE_COLORS[0]);
  const [icon, setIcon] = useState(AVAILABLE_ICONS[0]);

  const resetForm = () => {
    setName('');
    setType('expense');
    setColor(AVAILABLE_COLORS[0]);
    setIcon(AVAILABLE_ICONS[0]);
    setEditingId(null);
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setType(category.type);
    setColor(category.color);
    setIcon(category.icon);
    setEditingId(category.id);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingId) {
      onUpdate(editingId, { name, type, color, icon });
    } else {
      onAdd({ name, type, color, icon, isDefault: false });
    }

    resetForm();
    setOpen(false);
  };

  const userCategories = categories.filter(c => !c.isDefault);
  const IconComponent = (Icons as any)[icon] || Icons.DollarSign;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Custom Categories</h3>
        <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Category' : 'Add Category'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Category name"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as TransactionType)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-9 gap-2">
                  {AVAILABLE_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={cn(
                        'w-8 h-8 rounded-lg transition-transform',
                        color === c && 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110'
                      )}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-6 gap-2">
                  {AVAILABLE_ICONS.map((iconName) => {
                    const Icon = (Icons as any)[iconName] || Icons.DollarSign;
                    return (
                      <button
                        key={iconName}
                        type="button"
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          icon === iconName
                            ? 'bg-violet-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        )}
                        onClick={() => setIcon(iconName)}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                    <IconComponent className="w-6 h-6" style={{ color }} />
                  </div>
                  <span className="font-medium">{name || 'Category Name'}</span>
                </div>
              </div>

              <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                {editingId ? 'Update' : 'Add'} Category
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-2">
        {userCategories.map((category) => {
          const Icon = (Icons as any)[category.icon] || Icons.DollarSign;
          return (
            <div
              key={category.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 group"
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                <Icon className="w-5 h-5" style={{ color: category.color }} />
              </div>
              <span className="flex-1 font-medium text-white">{category.name}</span>
              <span className="text-sm text-zinc-500 capitalize">{category.type}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-white"
                  onClick={() => handleEdit(category)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-rose-400"
                  onClick={() => onDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
        {userCategories.length === 0 && (
          <p className="text-center text-zinc-500 py-8">No custom categories yet</p>
        )}
      </div>
    </div>
  );
}
