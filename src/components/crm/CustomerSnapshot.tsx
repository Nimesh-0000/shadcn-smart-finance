import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Loader2 } from "lucide-react";
import { api } from "@/services/api";
import type { Customer } from "@/types";

interface CustomerSnapshotProps {
    onCustomerClick: (id: string, name: string) => void;
}

export function CustomerSnapshot({ onCustomerClick }: CustomerSnapshotProps) {
    const [revCustomers, setRevCustomers] = useState<Customer[]>([]);
    const [outCustomers, setOutCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [rev, out] = await Promise.all([
                api.dashboard.getTopRevenueCustomers(),
                api.dashboard.getTopOutstandingCustomers()
            ]);
            setRevCustomers(rev);
            setOutCustomers(out);
        } catch (err) {
            console.error("Failed to fetch customer data:", err);
        } finally {
            setLoading(false);
        }
    };

    const renderTable = (data: Customer[], title: string, metric: 'revenue' | 'outstanding') => (
        <div className="flex-1 min-w-[300px]">
            <div className="px-4 py-3 bg-muted/20 border-b border-border flex items-center justify-between">
                <h3 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">{title}</h3>
            </div>
            <table className="w-full text-left text-[13px] border-collapse">
                <tbody className="divide-y divide-border">
                    {data.map((customer) => (
                        <tr
                            key={customer.id}
                            className="hover:bg-muted/30 transition-colors group cursor-pointer"
                            onClick={() => onCustomerClick(customer.id.toString(), customer.name)}
                        >
                            <td className="px-4 py-3">
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-[11px] text-muted-foreground">{customer.region}</div>
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums font-mono">
                                {metric === 'revenue' ? (
                                    <span className="text-emerald-500 font-bold">
                                        ${customer.totalRevenue?.toLocaleString()}
                                    </span>
                                ) : (
                                    <span className="text-rose-500 font-bold">
                                        ${customer.outstandingBalance?.toLocaleString()}
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-3 text-right">
                                <div className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink className="h-3 w-3 text-primary" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <Card className="shadow-sm border-border overflow-hidden">
            <CardHeader className="pb-0 border-b border-border bg-muted/5">
                <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-[14px] font-bold flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        CUSTOMER PERFORMANCE & RISK
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-mono">REAL-TIME RANKING</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {loading ? (
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border">
                        {renderTable(revCustomers, "Top Revenue Drivers", "revenue")}
                        {renderTable(outCustomers, "Highest Outstanding Balance", "outstanding")}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
