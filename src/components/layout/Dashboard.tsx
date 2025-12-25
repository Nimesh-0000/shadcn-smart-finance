import { useState } from 'react';
import type { Expense, Budget, FilterOptions } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { calculateTotals, filterExpenses } from '@/lib/finance-utils';
import { Header } from './Header';
import { StatsCard } from '@/components/finance/StatsCard';
import { AddExpenseForm } from '@/components/finance/AddExpenseForm';
import { ExpenseList } from '@/components/finance/ExpenseList';
import { BudgetTracker } from '@/components/finance/BudgetTracker';
import { CategoryFilter } from '@/components/finance/CategoryFilter';
import { DeleteConfirmDialog } from '@/components/finance/DeleteConfirmDialog';
import { ExpenseChart } from '@/components/finance/ExpenseChart';
import { Separator } from '@/components/ui/separator';

export function Dashboard() {
    const [expenses, setExpenses] = useLocalStorage<Expense[]>('finance-expenses', []);
    const [budgets] = useLocalStorage<Budget[]>('finance-budgets', [
        { id: '1', category: 'food', limit: 500, period: 'monthly' },
        { id: '2', category: 'transport', limit: 200, period: 'monthly' },
        { id: '3', category: 'shopping', limit: 300, period: 'monthly' },
    ]);

    const [filters, setFilters] = useState<FilterOptions>({});
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);

    const filteredExpenses = filterExpenses(expenses, filters);
    const totals = calculateTotals(expenses);

    const handleAddExpense = (expense: Expense) => {
        if (editingExpense) {
            setExpenses(expenses.map(e => e.id === expense.id ? expense : e));
            setEditingExpense(null);
        } else {
            setExpenses([...expenses, expense]);
        }
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (id: string) => {
        setExpenseToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (expenseToDelete) {
            setExpenses(expenses.filter(e => e.id !== expenseToDelete));
            setExpenseToDelete(null);
        }
        setDeleteDialogOpen(false);
    };

    const handleCancelEdit = () => {
        setEditingExpense(null);
    };

    return (
        <div className="min-h-screen bg-background" data-scroll-section>
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StatsCard
                        title="Total Income"
                        amount={totals.income}
                        icon="💵"
                        variant="income"
                    />
                    <StatsCard
                        title="Total Expenses"
                        amount={totals.expense}
                        icon="💸"
                        variant="expense"
                    />
                    <StatsCard
                        title="Balance"
                        amount={totals.balance}
                        icon="💰"
                        variant="balance"
                    />
                </div>

                {/* Expense Chart */}
                <div className="mb-8">
                    <ExpenseChart expenses={expenses} />
                </div>

                <Separator className="my-8" />

                {/* Add/Edit Form */}
                <div className="mb-8">
                    <AddExpenseForm
                        onSubmit={handleAddExpense}
                        editingExpense={editingExpense}
                        onCancel={handleCancelEdit}
                    />
                </div>

                <Separator className="my-8" />

                {/* Filters and Budget */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <CategoryFilter filters={filters} onFilterChange={setFilters} />
                    </div>
                    <div>
                        <BudgetTracker budgets={budgets} expenses={expenses} />
                    </div>
                </div>

                {/* Expense List */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Recent Transactions
                        {filteredExpenses.length !== expenses.length && (
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                                ({filteredExpenses.length} of {expenses.length})
                            </span>
                        )}
                    </h2>
                    <ExpenseList
                        expenses={filteredExpenses}
                        onEdit={handleEditExpense}
                        onDelete={handleDeleteClick}
                    />
                </div>
            </main>

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
