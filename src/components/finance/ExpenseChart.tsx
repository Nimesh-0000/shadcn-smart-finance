import type { Expense } from '@/types';
import { getCategoryInfo } from '@/lib/finance-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ExpenseChartProps {
    expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
    // Calculate expenses by category
    const categoryData = expenses
        .filter(e => e.type === 'expense')
        .reduce((acc, expense) => {
            const existing = acc.find(item => item.category === expense.category);
            if (existing) {
                existing.amount += expense.amount;
            } else {
                acc.push({
                    category: expense.category,
                    amount: expense.amount,
                });
            }
            return acc;
        }, [] as { category: string; amount: number }[]);

    // Transform data for chart with category names and colors
    const chartData = categoryData.map(item => {
        const categoryInfo = getCategoryInfo(item.category);
        return {
            name: `${categoryInfo.icon} ${categoryInfo.name}`,
            amount: item.amount,
            color: categoryInfo.color,
        };
    }).sort((a, b) => b.amount - a.amount); // Sort by amount descending

    if (chartData.length === 0) {
        return (
            <Card className="glass-effect border-white/10 bg-white/5">
                <CardHeader>
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expenses by Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                        <div className="text-4xl mb-4 animate-pulse">📊</div>
                        <p className="font-medium">No expense data to display</p>
                        <p className="text-sm opacity-60 mt-1">Add some expenses to see the chart</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl">
                    <p className="font-bold text-sm tracking-tight">{payload[0].payload.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Amount: <span className="font-black text-primary text-base">
                            ${payload[0].value.toFixed(2)}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="glass-effect border-white/10 bg-white/5 overflow-hidden">
            <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            className="text-[10px] font-bold fill-muted-foreground"
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            className="text-[10px] font-bold fill-muted-foreground"
                            tickFormatter={(value) => `$${value}`}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                        <Bar dataKey="amount" radius={[12, 12, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
