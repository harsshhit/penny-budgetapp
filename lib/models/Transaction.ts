import { Schema, model, models } from 'mongoose';

export interface ITransaction {
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  date: Date;
  description?: string;
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, index: true, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    categoryId: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    receiptUrl: { type: String },
  },
  { timestamps: true }
);

TransactionSchema.index({ userId: 1, date: -1 });

export const TransactionModel = models.Transaction || model<ITransaction>('Transaction', TransactionSchema);



