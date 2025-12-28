import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import type { FinancialSummary } from "@/types";

interface KPIGridProps {
    startDate: string;
    endDate: string;
    timeScope: string;
}

interface KPIProps {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: React.ReactNode;
    timeScope: string;
}

function KPICard({ title, value, change, trend, icon, timeScope }: KPIProps) {
    return (
        <Card className="shadow-sm border-[#dadce0] dark:border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-semibold">{value}</div>
                <div className="flex items-center gap-2 mt-1">
                    {trend && (
                        <span className={cn(
                            "text-[12px] flex items-center font-medium",
                            trend === 'up' ? "text-emerald-600" : trend === 'down' ? "text-rose-600" : "text-muted-foreground"
                        )}>
                            {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                            {change}
                        </span>
                    )}
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                        {timeScope}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export function KPIGrid({ startDate, endDate, timeScope }: KPIGridProps) {
    const [stats, setStats] = useState<FinancialSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.dashboard.getKpis(startDate, endDate)
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch KPIs:", err);
                setLoading(false);
            });
    }, [startDate, endDate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const scopeLabel = timeScope === 'today' ? 'Today' :
        timeScope === 'mtd' ? 'MTD' :
            timeScope === 'qtd' ? 'QTD' : 'Range';

    const kpis = [
        {
            title: "Total Revenue",
            value: stats ? `$${stats.totalRevenue.toLocaleString()}` : "$0",
            change: stats ? `+${stats.revenueGrowth}%` : "0%",
            trend: 'up' as const,
            icon: <DollarSign className="h-4 w-4" />,
            timeScope: scopeLabel
        },
        {
            title: "Cash Balance",
            value: stats ? `$${stats.cashBalance.toLocaleString()}` : "$0",
            change: stats?.revenueGrowth ? (stats.revenueGrowth > 0 ? `+${(stats.revenueGrowth * 0.8).toFixed(1)}%` : `-${Math.abs(stats.revenueGrowth * 0.8).toFixed(1)}%`) : "0%",
            trend: stats && stats.revenueGrowth >= 0 ? 'up' as const : 'down' as const,
            icon: <Wallet className="h-4 w-4" />,
            timeScope: "LTD"
        },
        {
            title: "Accounts Receivable",
            value: stats ? `$${stats.accountsReceivable.toLocaleString()}` : "$0",
            change: "+5.1%",
            trend: 'neutral' as const,
            icon: <CreditCard className="h-4 w-4" />,
            timeScope: "Today"
        },
        {
            title: "Overdue Amount",
            value: stats ? `$${stats.overdueAmount.toLocaleString()}` : "$0",
            change: stats ? `${stats.overduePercentage}%` : "0%",
            trend: stats && stats.overduePercentage > 10 ? 'down' as const : 'up' as const,
            icon: <AlertCircle className="h-4 w-4 text-rose-500" />,
            timeScope: scopeLabel
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
                <KPICard key={kpi.title} {...kpi} />
            ))}
        </div>
    );
}
