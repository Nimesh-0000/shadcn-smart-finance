import { formatCurrency } from '@/lib/finance-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsCardProps {
    title: string;
    amount: number;
    icon: string;
    variant?: 'income' | 'expense' | 'balance';
}

export function StatsCard({ title, amount, icon, variant = 'balance' }: StatsCardProps) {
    const getVariantStyles = () => {
        if (variant === 'balance' && amount < 0) {
            return 'border-destructive/30 bg-destructive/5';
        }

        switch (variant) {
            case 'income':
                return 'border-chart-4/30 bg-chart-4/5';
            case 'expense':
                return 'border-destructive/30 bg-destructive/5';
            default:
                return 'border-primary/30 bg-primary/5';
        }
    };

    const getBadgeVariant = () => {
        if (variant === 'income') return 'default';
        if (variant === 'expense') return 'destructive';
        return amount >= 0 ? 'default' : 'destructive';
    };

    return (
        <Card className={`glass-effect border-white/10 transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-white/20 group ${getVariantStyles()}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{title}</CardTitle>
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2">
                    <div className={`text-3xl font-black tracking-tighter ${variant === 'balance' && amount < 0 ? 'text-destructive' : 'text-foreground'}`}>
                        {formatCurrency(amount)}
                    </div>
                    <Badge variant={getBadgeVariant()} className="text-[10px] font-bold px-1.5 h-4 min-w-4 flex items-center justify-center rounded-full">
                        {variant === 'income' ? '↑' : variant === 'expense' ? '↓' : amount >= 0 ? '✓' : '!'}
                    </Badge>
                </div>
                <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full w-2/3 opacity-50 ${variant === 'income' ? 'bg-chart-4' : variant === 'expense' ? 'bg-destructive' : 'bg-primary'}`} />
                </div>
            </CardContent>
        </Card>
    );
}
