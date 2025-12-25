import type { Budget, Expense } from '@/types';
import { getBudgetStatus, formatCurrency, getCategoryInfo } from '@/lib/finance-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BudgetTrackerProps {
    budgets: Budget[];
    expenses: Expense[];
}

export function BudgetTracker({ budgets, expenses }: BudgetTrackerProps) {
    if (budgets.length === 0) {
        return (
            <Card className="glass-effect border-white/10 bg-white/5">
                <CardHeader>
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Budget Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <div className="text-4xl mb-2">🎯</div>
                        <p>Set budgets to track your spending</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glass-effect border-white/10 bg-white/5 h-full">
            <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Budget Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {budgets.map((budget) => {
                    const status = getBudgetStatus(budget, expenses);
                    const category = getCategoryInfo(budget.category);

                    return (
                        <div key={budget.id} className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                                        {category.icon}
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">{category.name}</span>
                                </div>
                                <Badge variant={status.isOverBudget ? 'destructive' : 'default'} className="text-[10px] font-bold h-5 px-2 uppercase tracking-tighter">
                                    {status.isOverBudget ? 'Target Exceeded' : 'On Track'}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-muted-foreground">
                                        {formatCurrency(status.spent)} / {formatCurrency(budget.limit)}
                                    </span>
                                    <span className={status.isOverBudget ? 'text-destructive' : 'text-muted-foreground'}>
                                        {status.percentage.toFixed(0)}%
                                    </span>
                                </div>

                                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ease-out rounded-full ${status.isOverBudget
                                            ? 'bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                                            : status.percentage > 80
                                                ? 'bg-chart-5 shadow-[0_0_10px_rgba(var(--chart-5),0.5)]'
                                                : 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]'
                                            }`}
                                        style={{ width: `${Math.min(status.percentage, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
