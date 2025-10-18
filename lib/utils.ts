import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { ICategory } from './models/Category';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function getSafeCategoryId(categories: ICategory[], type: 'income' | 'expense'): string {
//   // Filter categories by type
//   const typeCategories = categories.filter(cat => cat.type === type);
  
//   if (typeCategories.length === 0) {
//     console.error(`No categories found for type: ${type}`);
//     return '';
//   }

//   // Try to find "Others" category first
//   const othersCategory = typeCategories.find(cat => cat.name === 'Others');
//   if (othersCategory?._id) {
//     return othersCategory._id.toString();
//   }

//   // Fallback to first available category
//   const firstCategory = typeCategories[0];
//   return firstCategory?._id?.toString() || '';
// }
