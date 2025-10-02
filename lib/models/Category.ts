import { Schema, model, models } from 'mongoose';

export interface ICategory {
  userId: string; // reference to user identifier
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    userId: { type: String, index: true, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    color: { type: String, required: true },
    icon: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CategorySchema.index({ userId: 1, name: 1, type: 1 }, { unique: false });

export const CategoryModel = models.Category || model<ICategory>('Category', CategorySchema);



