import { useState } from 'react';
import type { Expense, TransactionType } from '@/types';
import { generateId } from '@/lib/finance-utils';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <Card className="glass-effect border-white/10 bg-white/5">
            <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{editingExpense ? 'Edit Transaction' : 'Add New Transaction'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Type</Label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
                                className="flex h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={formData.amount || ''}
                                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                                required
                                className="h-12 rounded-xl border-white/10 bg-black/40 px-4 font-bold text-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</Label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="flex h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
                            >
                                {DEFAULT_CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.icon} {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                                className="h-12 rounded-xl border-white/10 bg-black/40 px-4"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Add a note about this transaction..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                            className="rounded-xl border-white/10 bg-black/40 px-4 py-3 min-h-[100px]"
                        />
                    </div>

                    <div className="flex gap-4 pt-2">
                        <Button type="submit" className="flex-1 h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20">
                            {editingExpense ? 'Update' : 'Add'} Transaction
                        </Button>
                        {editingExpense && onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel} className="h-14 px-8 rounded-xl border-white/10 bg-white/5 hover:bg-white/10">
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
