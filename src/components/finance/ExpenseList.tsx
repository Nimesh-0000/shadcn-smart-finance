import type { Expense } from '@/types';
import { ExpenseCard } from './ExpenseCard';

interface ExpenseListProps {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
    if (expenses.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
                <p className="text-muted-foreground">Add your first transaction to get started!</p>
            </div>
        );
    }

    // Sort by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="space-y-3">
            {sortedExpenses.map((expense) => (
                <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
