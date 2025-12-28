import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, Cell } from 'recharts';
import { Loader2 } from "lucide-react";
import { api } from "@/services/api";
import type { ArAging, RevenueTrendData } from "@/types";

const cashFlowData = [
    { month: 'Oct', inflow: 950000, outflow: 820000 },
    { month: 'Nov', inflow: 1100000, outflow: 950000 },
    { month: 'Dec', inflow: 1050000, outflow: 880000 },
];

export function FinancialCharts() {
    const [aging, setAging] = useState<ArAging | null>(null);
    const [trend, setTrend] = useState<RevenueTrendData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            api.dashboard.getArAging(),
            api.dashboard.getRevenueTrend()
        ])
            .then(([agingData, trendData]) => {
                setAging(agingData);
                setTrend(trendData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch dashboard charts data:", err);
                setLoading(false);
            });
    }, []);

    const agingData = aging ? [
        { range: '0-30 Days', amount: aging.current0_30, color: '#fbbf24' },  // Warm amber
        { range: '31-60 Days', amount: aging.overdue31_60, color: '#f59e0b' }, // Orange-amber
        { range: '61-90 Days', amount: aging.overdue61_90, color: '#ea580c' }, // Deep orange
        { range: '90+ Days', amount: aging.overdue90Plus, color: '#dc2626' },  // Warm red
    ] : [];

    const totalOutstanding = aging ?
        aging.current0_30 + aging.overdue31_60 + aging.overdue61_90 + aging.overdue90Plus : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card className="shadow-sm border-[#dadce0] dark:border-border">
                <CardHeader className="pb-2">
                    <CardTitle className="text-[14px] font-medium text-muted-foreground uppercase tracking-tight">Revenue Trend (Monthly)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trend}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    formatter={(value: any) => [`$${(value as number)?.toLocaleString()}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Cash Inflow vs Outflow */}
            <Card className="shadow-sm border-[#dadce0] dark:border-border">
                <CardHeader className="pb-2">
                    <CardTitle className="text-[14px] font-medium text-muted-foreground uppercase tracking-tight">Cash Inflow vs Outflow</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cashFlowData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Bar dataKey="inflow" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Inflow" />
                                <Bar dataKey="outflow" fill="#dc2626" radius={[4, 4, 0, 0]} name="Outflow" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* AR Aging */}
            <Card className="lg:col-span-2 shadow-sm border-[#dadce0] dark:border-border">
                <CardHeader className="pb-2">
                    <CardTitle className="text-[14px] font-medium text-muted-foreground uppercase tracking-tight">Accounts Receivable Aging</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="h-[180px] w-full flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart layout="vertical" data={agingData} margin={{ left: -20, right: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#555', fontWeight: 500 }} width={100} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        formatter={(value: any) => [`$${(value as number)?.toLocaleString()}`, 'Amount']}
                                    />
                                    <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={20}>
                                        {agingData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-4 px-2">
                        <div className="text-[12px] text-muted-foreground italic">
                            Total Outstanding: <span className="font-semibold text-foreground">${totalOutstanding.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-4">
                            {agingData.map((d) => (
                                <div key={d.range} className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className="text-[11px] text-muted-foreground font-medium">{d.range}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
