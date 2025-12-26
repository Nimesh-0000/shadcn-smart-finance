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
            <div className="glass-card flex flex-col items-center justify-center py-20 border-dashed bg-muted/20">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-4xl mb-4">
                    📊
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">No transactions yet</h3>
                <p className="text-muted-foreground text-center max-w-xs">
                    Get started by adding your first income or expense transaction.
                </p>
            </div>
        );
    }

    // Sort by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="space-y-4">
            {/* Table Header - GCP Style */}
            <div className="hidden md:grid grid-cols-[1fr_120px_100px_120px] gap-4 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 border-b border-border/40">
                <div>Description & Date</div>
                <div>Category</div>
                <div>Amount</div>
                <div className="text-right">Actions</div>
            </div>

            <div className="space-y-2">
                {sortedExpenses.map((expense) => (
                    <ExpenseCard
                        key={expense.id}
                        expense={expense}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}
