import { formatCurrency } from '@/lib/finance-utils';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    amount: number;
    icon: string;
    variant?: 'income' | 'expense' | 'balance';
}

export function StatsCard({ title, amount, icon, variant = 'balance' }: StatsCardProps) {
    const isNegative = amount < 0;

    const getColors = () => {
        switch (variant) {
            case 'income':
                return {
                    text: 'text-emerald-500',
                    border: 'border-emerald-500',
                    icon: 'text-emerald-500'
                };
            case 'expense':
                return {
                    text: 'text-rose-500',
                    border: 'border-rose-500',
                    icon: 'text-rose-500'
                };
            default:
                return {
                    text: isNegative ? 'text-rose-500' : 'text-blue-500',
                    border: isNegative ? 'border-rose-500' : 'border-blue-500',
                    icon: isNegative ? 'text-rose-500' : 'text-blue-500'
                };
        }
    };

    const colors = getColors();

    return (
        <Card className="gcp-card relative bg-card overflow-hidden">
            <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#5f6368]">{title}</span>
                    <span className="text-base">{icon}</span>
                </div>

                <div className="space-y-0.5">
                    <h3 className="text-xl font-semibold text-[#202124] dark:text-foreground">
                        {formatCurrency(amount)}
                    </h3>
                    <div className={cn("flex items-center gap-1.5 text-[11px] font-medium", colors.text)}>
                        {variant === 'income' ? <TrendingUp className="h-3 w-3" /> : variant === 'expense' ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                        <span>{variant === 'income' ? '+12.5% last month' : variant === 'expense' ? '+8.2% last month' : 'Stable'}</span>
                    </div>
                </div>
            </div>

            {/* Subdued GCP indicator */}
            <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", variant === 'income' ? "bg-emerald-500" : variant === 'expense' ? "bg-rose-500" : "bg-blue-500")} />
        </Card>
    );
}
