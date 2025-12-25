import type { Category } from '@/types';

export const DEFAULT_CATEGORIES: Category[] = [
    { id: 'food', name: 'Food & Dining', icon: '🍔', color: 'hsl(var(--chart-1))' },
    { id: 'transport', name: 'Transportation', icon: '🚗', color: 'hsl(var(--chart-2))' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'hsl(var(--chart-3))' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'hsl(var(--chart-4))' },
    { id: 'bills', name: 'Bills & Utilities', icon: '💡', color: 'hsl(var(--chart-5))' },
    { id: 'health', name: 'Healthcare', icon: '⚕️', color: 'hsl(var(--destructive))' },
    { id: 'education', name: 'Education', icon: '📚', color: 'hsl(var(--primary))' },
    { id: 'salary', name: 'Salary', icon: '💰', color: 'hsl(var(--chart-4))' },
    { id: 'investment', name: 'Investment', icon: '📈', color: 'hsl(var(--chart-2))' },
    { id: 'other', name: 'Other', icon: '📌', color: 'hsl(var(--muted-foreground))' },
];

export const CURRENCY_SYMBOL = '$';
export const DATE_FORMAT = 'MMM dd, yyyy';
