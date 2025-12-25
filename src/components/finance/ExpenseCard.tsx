import type { Expense } from '@/types';
import { formatCurrency, formatDate, getCategoryInfo } from '@/lib/finance-utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

interface ExpenseCardProps {
    expense: Expense;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
    const category = getCategoryInfo(expense.category);
    const isIncome = expense.type === 'income';

    return (
        <Card className="glass-effect border-white/10 bg-white/5 transition-all hover:scale-[1.01] hover:bg-white/10 group animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="text-3xl flex-shrink-0 h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="font-bold truncate text-sm tracking-tight">{expense.description || category.name}</h3>
                                <Badge variant={isIncome ? 'default' : 'secondary'} className="text-[10px] font-bold h-4 px-1.5 uppercase tracking-tighter bg-white/10 text-muted-foreground border-none">
                                    {category.name}
                                </Badge>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{formatDate(expense.date)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className={`text-xl font-black tracking-tighter ${isIncome ? 'text-chart-4' : 'text-foreground'}`}>
                            {isIncome ? '+' : '-'}{formatCurrency(expense.amount)}
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10">
                                    <MoreVertical className="h-5 w-5 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-xl border-white/10 rounded-xl">
                                <DropdownMenuItem onClick={() => onEdit(expense)} className="rounded-lg">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDelete(expense.id)}
                                    className="text-destructive focus:text-destructive rounded-lg"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
