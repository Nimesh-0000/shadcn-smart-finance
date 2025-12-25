export type TransactionType = 'income' | 'expense';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO date string
  type: TransactionType;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: 'monthly' | 'weekly';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface FilterOptions {
  category?: string;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
}
