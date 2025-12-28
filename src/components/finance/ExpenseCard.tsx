import type { Expense } from '@/types';
import { formatCurrency, formatDate, getCategoryInfo } from '@/lib/finance-utils';
import { Badge } from '@/components/ui/badge';
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
        <div className="group relative flex flex-col md:grid md:grid-cols-[1fr_120px_100px_120px] items-center gap-4 px-4 py-2.5 rounded-none border border-transparent hover:border-border/40 hover:bg-muted/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Description & Date */}
            <div className="flex items-center gap-3 w-full min-w-0">
                <div className={cn(
                    "h-8 w-8 rounded-none flex items-center justify-center text-base shrink-0 transition-transform group-hover:scale-105",
                    isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"
                )}>
                    {category.icon}
                </div>
                <div className="min-w-0">
                    <h3 className="text-[13px] font-medium text-[#202124] dark:text-foreground truncate">{expense.description || category.name}</h3>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#5f6368] mt-0.5">{formatDate(expense.date)}</p>
                </div>
            </div>

            {/* Category */}
            <div className="hidden md:block">
                <Badge variant="outline" className="text-[10px] font-medium px-1.5 py-0 rounded-none border-border/40 bg-muted/30 uppercase tracking-tighter">
                    {category.name}
                </Badge>
            </div>

            {/* Amount */}
            <div className="w-full md:w-auto flex md:block items-center justify-between">
                <span className="md:hidden text-[10px] font-medium uppercase tracking-widest text-[#5f6368]">Amount</span>
                <div className={cn(
                    "text-[13px] font-medium tracking-tight",
                    isIncome ? "text-emerald-500" : "text-[#202124] dark:text-foreground"
                )}>
                    {isIncome ? '+' : '-'}{formatCurrency(expense.amount)}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="h-7 w-7 flex items-center justify-center hover:bg-muted/50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
                            <MoreVertical className="h-4 w-4 text-[#5f6368]" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border rounded-none shadow-lg">
                        <DropdownMenuItem onClick={() => onEdit(expense)} className="rounded-none">
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            <span className="text-[12px]">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete(expense.id)}
                            className="text-rose-500 focus:text-rose-500 rounded-none"
                        >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            <span className="text-[12px]">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
