import { useState } from 'react';
import type { Expense, Budget, FilterOptions } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { calculateTotals, filterExpenses } from '@/lib/finance-utils';
import { DashboardLayout } from './DashboardLayout';
import { StatsCard } from '@/components/finance/StatsCard';
import { AddExpenseForm } from '@/components/finance/AddExpenseForm';
import { ExpenseList } from '@/components/finance/ExpenseList';
import { BudgetTracker } from '@/components/finance/BudgetTracker';
import { CategoryFilter } from '@/components/finance/CategoryFilter';
import { DeleteConfirmDialog } from '@/components/finance/DeleteConfirmDialog';
import { ExpenseChart } from '@/components/finance/ExpenseChart';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

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
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* GCP Style Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                    <div>
                        <h1 className="text-xl font-normal text-[#202124] dark:text-foreground">Financial Overview</h1>
                        <p className="text-[14px] text-[#5f6368] mt-1">Manage and monitor your project's financial resources and global transaction history.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-8 text-[13px] border-[#dadce0] rounded hover:bg-muted text-primary px-3">
                            <Download className="mr-2 h-4 w-4" />
                            Report PDF
                        </Button>
                        <Button className="h-8 text-[13px] bg-primary hover:bg-primary/90 rounded text-white px-3 border-none shadow-none">
                            <FileText className="mr-2 h-4 w-4" />
                            Create Analysis
                        </Button>
                    </div>
                </div>

                {/* GCP Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        title="Budget Usage"
                        amount={totals.balance}
                        icon="💰"
                        variant="balance"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Primary Analytics Section */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="gcp-card h-fit overflow-hidden p-0 border-border">
                            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                                <h3 className="text-[16px] font-medium text-[#202124] dark:text-foreground">Activity Timeline</h3>
                                <Button variant="ghost" size="sm" className="h-7 text-[12px] text-primary hover:bg-primary/5">View all</Button>
                            </div>
                            <div className="p-4">
                                <ExpenseChart expenses={expenses} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[18px] font-normal text-[#202124] dark:text-foreground">
                                    Recent Transactions History
                                    {filteredExpenses.length !== expenses.length && (
                                        <span className="text-[13px] font-normal text-[#5f6368] ml-3">
                                            ({filteredExpenses.length} filters applied)
                                        </span>
                                    )}
                                </h2>
                                <CategoryFilter filters={filters} onFilterChange={setFilters} />
                            </div>

                            <div className="gcp-card p-0 overflow-hidden border-border bg-background">
                                <ExpenseList
                                    expenses={filteredExpenses}
                                    onEdit={handleEditExpense}
                                    onDelete={handleDeleteClick}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Secondary Context Section (Sidebar in GCP) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Quick Action Area */}
                        <div className="gcp-card border-border bg-[#f8f9fa] dark:bg-[#202124]">
                            <h3 className="text-[16px] font-medium text-[#202124] dark:text-foreground mb-4">Resource Management</h3>
                            <AddExpenseForm
                                onSubmit={handleAddExpense}
                                editingExpense={editingExpense}
                                onCancel={handleCancelEdit}
                            />
                        </div>

                        {/* Resource Tracking */}
                        <div className="gcp-card border-border">
                            <h3 className="text-[16px] font-medium text-[#202124] dark:text-foreground mb-4">Quota & Budgets</h3>
                            <BudgetTracker budgets={budgets} expenses={expenses} />
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
            />
        </DashboardLayout>
    );
}
