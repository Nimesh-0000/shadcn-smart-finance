import type { Expense, Budget, FilterOptions } from '@/types';
import { DEFAULT_CATEGORIES } from './constants';

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}

export function getCategoryInfo(categoryId: string) {
    return DEFAULT_CATEGORIES.find(cat => cat.id === categoryId) || DEFAULT_CATEGORIES[DEFAULT_CATEGORIES.length - 1];
}

export function calculateTotals(expenses: Expense[]) {
    const income = expenses
        .filter(e => e.type === 'income')
        .reduce((sum, e) => sum + e.amount, 0);

    const expenseTotal = expenses
        .filter(e => e.type === 'expense')
        .reduce((sum, e) => sum + e.amount, 0);

    return {
        income,
        expense: expenseTotal,
        balance: income - expenseTotal,
    };
}

export function filterExpenses(expenses: Expense[], filters: FilterOptions): Expense[] {
    return expenses.filter(expense => {
        if (filters.category && expense.category !== filters.category) return false;
        if (filters.type && expense.type !== filters.type) return false;
        if (filters.startDate && expense.date < filters.startDate) return false;
        if (filters.endDate && expense.date > filters.endDate) return false;
        return true;
    });
}

export function getCategorySpending(expenses: Expense[], category: string): number {
    return expenses
        .filter(e => e.type === 'expense' && e.category === category)
        .reduce((sum, e) => sum + e.amount, 0);
}

export function getBudgetStatus(budget: Budget, expenses: Expense[]): {
    spent: number;
    remaining: number;
    percentage: number;
    isOverBudget: boolean;
} {
    const spent = getCategorySpending(expenses, budget.category);
    const remaining = budget.limit - spent;
    const percentage = (spent / budget.limit) * 100;

    return {
        spent,
        remaining,
        percentage: Math.min(percentage, 100),
        isOverBudget: spent > budget.limit,
    };
}

export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getDateRangeForScope(scope: string): { start: string, end: string } {
    const now = new Date();
    let start = new Date(now);
    let end = new Date(now);

    switch (scope) {
        case 'today':
            // start and end are already 'now'
            break;
        case 'mtd':
            start.setDate(1);
            break;
        case 'qtd':
            const month = now.getMonth();
            const quarterStartMonth = Math.floor(month / 3) * 3;
            start.setMonth(quarterStartMonth);
            start.setDate(1);
            break;
        default:
            // Default to MTD if unknown
            start.setDate(1);
    }

    // Format as YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    return {
        start: formatDate(start),
        end: formatDate(end)
    };
}
