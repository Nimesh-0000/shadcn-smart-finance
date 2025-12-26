import type { Expense } from '@/types';
import { formatCurrency, formatDate, getCategoryInfo } from '@/lib/finance-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpenseCardProps {
    expense: Expense;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
    const category = getCategoryInfo(expense.category);
    const isIncome = expense.type === 'income';

    return (
        <div className="group relative flex flex-col md:grid md:grid-cols-[1fr_120px_100px_120px] items-center gap-4 px-6 py-4 rounded-2xl border border-transparent hover:border-border/40 hover:bg-card/50 hover:shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Description & Date */}
            <div className="flex items-center gap-4 w-full min-w-0">
                <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110",
                    isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"
                )}>
                    {category.icon}
                </div>
                <div className="min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate">{expense.description || category.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-0.5">{formatDate(expense.date)}</p>
                </div>
            </div>

            {/* Category */}
            <div className="hidden md:block">
                <Badge variant="outline" className="text-[10px] font-bold px-2 py-0.5 rounded-lg border-border/40 bg-muted/30 uppercase tracking-tighter">
                    {category.name}
                </Badge>
            </div>

            {/* Amount */}
            <div className="w-full md:w-auto flex md:block items-center justify-between">
                <span className="md:hidden text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Amount</span>
                <div className={cn(
                    "text-sm font-bold tracking-tight",
                    isIncome ? "text-emerald-500" : "text-foreground"
                )}>
                    {isIncome ? '+' : '-'}{formatCurrency(expense.amount)}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/40 rounded-xl">
                        <DropdownMenuItem onClick={() => onEdit(expense)} className="rounded-lg">
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            <span className="text-xs">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete(expense.id)}
                            className="text-rose-500 focus:text-rose-500 rounded-lg"
                        >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            <span className="text-xs">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
