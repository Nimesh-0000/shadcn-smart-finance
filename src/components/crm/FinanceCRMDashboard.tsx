import { useState } from 'react';
import { KPIGrid } from './KPIGrid';
import { FinancialCharts } from './FinancialCharts';
import { CustomerSnapshot } from './CustomerSnapshot';
import { OpenItemsList } from './OpenItemsList';
import { RiskPanel } from './RiskPanel';
import { AuditTrail } from './AuditTrail';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Calendar, Share2, Printer, Loader2 } from "lucide-react";
import { getDateRangeForScope } from '@/lib/finance-utils';
import { api } from "@/services/api";

export function FinanceCRMDashboard() {
    const [timeScope, setTimeScope] = useState('mtd');
    const [dates, setDates] = useState(getDateRangeForScope('mtd'));
    const [view, setView] = useState<'summary' | 'detail'>('summary');
    const [selectedDetail, setSelectedDetail] = useState<{ id: string, name: string } | null>(null);
    const [detailInvoices, setDetailInvoices] = useState<any[]>([]);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const handleTimeScopeChange = (val: string | null) => {
        if (!val) return;
        setTimeScope(val);
        if (val !== 'custom') {
            setDates(getDateRangeForScope(val));
        }
    };

    const handleDrillDown = async (id: string, name: string) => {
        setSelectedDetail({ id, name });
        setView('detail');
        setLoadingDetail(true);
        try {
            // If it's a numeric ID (customer), fetch their history
            if (!isNaN(Number(id))) {
                const data = await api.invoices.getByCustomer(id);
                setDetailInvoices(data);
            } else {
                setDetailInvoices([]);
            }
        } catch (err) {
            console.error("Failed to fetch detail view data:", err);
        } finally {
            setLoadingDetail(false);
        }
    };

    return (
        <div className="space-y-6 pb-12">
            {view === 'detail' ? (
                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="outline" size="sm" onClick={() => setView('summary')} className="h-8">
                            ← Back to Dashboard
                        </Button>
                        <h2 className="text-xl font-bold">Account History: {selectedDetail?.name}</h2>
                    </div>

                    <Card className="border-border overflow-hidden">
                        <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center justify-between">
                            <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Complete Transaction Ledger</span>
                            <Badge variant="secondary">Total Records: {detailInvoices.length}</Badge>
                        </div>
                        <CardContent className="p-0">
                            {loadingDetail ? (
                                <div className="flex items-center justify-center p-12">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : detailInvoices.length > 0 ? (
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-muted/10">
                                            <th className="px-4 py-3 font-medium text-muted-foreground border-b border-border">ID</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground border-b border-border">Due Date</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground border-b border-border text-right">Amount</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground border-b border-border text-center">Status</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground border-b border-border">Owner</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {detailInvoices.map((inv) => (
                                            <tr key={inv.id} className="hover:bg-muted/10 transition-colors">
                                                <td className="px-4 py-3 font-mono text-[12px]">#{inv.id.padStart(5, '0')}</td>
                                                <td className="px-4 py-3">{new Date(inv.dueDate).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 text-right font-bold">${inv.amount.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge variant={inv.status === 'PAID' ? 'outline' : inv.status === 'OVERDUE' ? 'destructive' : 'secondary'} className="text-[10px]">
                                                        {inv.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">{inv.owner}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center text-muted-foreground italic">
                                    No transaction records found for this entry.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <>
                    {/* Sub-header with Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 px-1 border-y border-[#f0f0f0] dark:border-border/50 bg-muted/5">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <Select value={timeScope} onValueChange={handleTimeScopeChange}>
                                    <SelectTrigger className="h-8 w-[140px] text-[13px] border-none shadow-none font-medium hover:bg-muted transition-colors">
                                        <SelectValue>
                                            {timeScope === 'today' ? 'Today' :
                                                timeScope === 'mtd' ? 'Month-to-Date' :
                                                    timeScope === 'qtd' ? 'Quarter-to-Date' : 'Custom Range'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="mtd">Month-to-Date</SelectItem>
                                        <SelectItem value="qtd">Quarter-to-Date</SelectItem>
                                        <SelectItem value="custom">Custom Range</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {timeScope === 'custom' && (
                                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <Input
                                        type="date"
                                        value={dates.start}
                                        onChange={(e) => setDates({ ...dates, start: e.target.value })}
                                        className="h-7 text-[11px] w-32 border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/20"
                                    />
                                    <span className="text-muted-foreground text-[11px] uppercase">to</span>
                                    <Input
                                        type="date"
                                        value={dates.end}
                                        onChange={(e) => setDates({ ...dates, end: e.target.value })}
                                        className="h-7 text-[11px] w-32 border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/20"
                                    />
                                </div>
                            )}
                            <div className="h-4 w-[1px] bg-border/50 hidden md:block" />
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <Select defaultValue="all">
                                    <SelectTrigger className="h-8 w-[140px] text-[13px] border-none shadow-none font-medium hover:bg-muted transition-colors">
                                        <SelectValue>All Regions</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Regions</SelectItem>
                                        <SelectItem value="na">North America</SelectItem>
                                        <SelectItem value="emea">EMEA</SelectItem>
                                        <SelectItem value="apac">APAC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 text-[12px] font-medium text-muted-foreground">
                                <Share2 className="mr-2 h-3 w-3" />
                                Share
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-[12px] font-medium text-muted-foreground" onClick={() => handleDrillDown('report', 'Full Financial Report')}>
                                <Printer className="mr-2 h-3 w-3" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* 1. Core Financial KPIs */}
                    <KPIGrid startDate={dates.start} endDate={dates.end} timeScope={timeScope} />

                    {/* 2 & 3. Trends and Risk */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                            <FinancialCharts />
                        </div>
                        <div className="lg:col-span-4">
                            <RiskPanel />
                        </div>
                    </div>

                    {/* 4. Open Items and Audit Trail */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                            <OpenItemsList />
                        </div>
                        <div className="lg:col-span-4">
                            <AuditTrail />
                        </div>
                    </div>

                    {/* 5. Customer Snapshot (Full Width for Table clarity) */}
                    <div className="grid grid-cols-1 gap-6">
                        <CustomerSnapshot onCustomerClick={handleDrillDown} />
                    </div>

                    {/* Data Source Indication (Trust & Clarity) */}
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Data Updated: 2 min ago
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                            Source: NetSuite ERP / CRM Core Service
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
