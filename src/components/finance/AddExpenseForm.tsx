import { useState } from 'react';
import type { Expense, TransactionType } from '@/types';
import { generateId } from '@/lib/finance-utils';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';


interface AddExpenseFormProps {
    onSubmit: (expense: Expense) => void;
    editingExpense?: Expense | null;
    onCancel?: () => void;
}

export function AddExpenseForm({ onSubmit, editingExpense, onCancel }: AddExpenseFormProps) {
    const [formData, setFormData] = useState<Partial<Expense>>(
        editingExpense || {
            amount: 0,
            category: DEFAULT_CATEGORIES[0].id,
            description: '',
            date: new Date().toISOString().split('T')[0],
            type: 'expense' as TransactionType,
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.amount || formData.amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const expense: Expense = {
            id: editingExpense?.id || generateId(),
            amount: Number(formData.amount),
            category: formData.category || DEFAULT_CATEGORIES[0].id,
            description: formData.description || '',
            date: formData.date || new Date().toISOString().split('T')[0],
            type: formData.type || 'expense',
        };

        onSubmit(expense);

        if (!editingExpense) {
            setFormData({
                amount: 0,
                category: DEFAULT_CATEGORIES[0].id,
                description: '',
                date: new Date().toISOString().split('T')[0],
                type: 'expense',
            });
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-[13px] font-medium text-[#202124] dark:text-foreground">
                {editingExpense ? 'Edit Transaction' : 'Create New Transaction'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="type" className="text-[11px] font-medium text-[#5f6368]">Type</Label>
                        <select
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
                            className="flex h-9 w-full rounded-none border border-border bg-background px-3 py-1 text-[13px] transition-colors focus:border-primary focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="amount" className="text-[11px] font-medium text-[#5f6368]">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={formData.amount || ''}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                            required
                            className="h-9 rounded-none border-border bg-background px-3 text-[13px]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="category" className="text-[11px] font-medium text-[#5f6368]">Category</Label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="flex h-9 w-full rounded-none border border-border bg-background px-3 py-1 text-[13px] transition-colors focus:border-primary focus:outline-none appearance-none cursor-pointer"
                        >
                            {DEFAULT_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="date" className="text-[11px] font-medium text-[#5f6368]">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            className="h-9 rounded-none border-border bg-background px-3 text-[13px]"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-[11px] font-medium text-[#5f6368]">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        placeholder="Add a note..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="rounded-none border-border bg-background px-3 py-2 min-h-[60px] text-[13px] text-foreground resize-none"
                    />
                </div>

                <div className="flex gap-3 pt-1">
                    <Button type="submit" className="flex-1 h-8 rounded-none text-[13px] font-medium bg-primary hover:bg-primary/90 text-white border-none">
                        {editingExpense ? 'Update' : 'Create'} Transaction
                    </Button>
                    {editingExpense && onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} className="h-8 px-4 rounded-none border-border bg-background hover:bg-muted text-[13px]">
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
