import { Schema, model, models } from 'mongoose';

export interface IRecurringTransaction {
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDueDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RecurringTransactionSchema = new Schema<IRecurringTransaction>(
  {
    userId: { type: String, index: true, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    categoryId: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], required: true },
    nextDueDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

RecurringTransactionSchema.index({ userId: 1, nextDueDate: 1, isActive: 1 });

export const RecurringTransactionModel =
  models.RecurringTransaction || model<IRecurringTransaction>('RecurringTransaction', RecurringTransactionSchema);



