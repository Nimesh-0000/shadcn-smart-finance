import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Invoice } from "@/types";

export function OpenItemsList() {
    const [openInvoices, setOpenInvoices] = useState<Invoice[]>([]);
    const [overdueInvoices, setOverdueInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [open, overdue] = await Promise.all([
                api.invoices.getOpen(),
                api.invoices.getOverdue()
            ]);
            setOpenInvoices(open);
            setOverdueInvoices(overdue);
        } catch (err) {
            console.error("Failed to fetch invoices:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReassign = async (invoiceId: string, currentOwner: string) => {
        const confirm = window.confirm(`Reassign invoice ${invoiceId} (Current: ${currentOwner})?`);
        if (confirm) {
            try {
                // Demo: toggle between Nimesh (1) and Sarah (2)
                const newOwnerId = currentOwner === 'Nimesh Lokhande' ? '2' : '1';
                await api.invoices.reassignOwner(invoiceId, newOwnerId, 'Admin (Nimesh)');
                loadData();
            } catch (err) {
                console.error("Reassignment failed:", err);
                alert("Ownership reassignment failed.");
            }
        }
    };

    const InvoiceTable = ({ data, type }: { data: Invoice[], type: 'open' | 'overdue' }) => (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                            No {type} items found.
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((invoice) => (
                        <TableRow key={invoice.id} className="group cursor-pointer">
                            <TableCell className="font-mono text-[12px]">#{invoice.id.padStart(5, '0')}</TableCell>
                            <TableCell className="font-medium">{invoice.customerName}</TableCell>
                            <TableCell className={cn(
                                "font-bold",
                                type === 'overdue' ? "text-rose-600" : "text-foreground"
                            )}>
                                ${invoice.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-[12px]">
                                {new Date(invoice.dueDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Badge variant={type === 'overdue' ? 'destructive' : 'secondary'} className="text-[10px] h-5 uppercase">
                                    {invoice.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                        {invoice.owner.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="text-[12px]">{invoice.owner}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleReassign(invoice.id, invoice.owner);
                                    }}
                                    className="p-1 hover:bg-primary/10 rounded transition-colors text-primary"
                                    title="Reassign Owner"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );

    return (
        <Card className="shadow-lg border-[#dadce0] dark:border-border h-full bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider">
                    Detailed Open & Overdue Items
                </CardTitle>
                {!loading && (
                    <div className="flex gap-2">
                        <Badge variant="destructive" className="h-5">{overdueInvoices.length} Overdue</Badge>
                        <Badge variant="outline" className="h-5">{openInvoices.length} Open</Badge>
                    </div>
                )}
            </CardHeader>
            <CardContent className="p-0">
                {loading ? (
                    <div className="flex items-center justify-center p-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
                    </div>
                ) : (
                    <Tabs defaultValue="overdue" className="w-full">
                        <div className="px-4 border-b">
                            <TabsList className="bg-transparent border-b-0 h-10 p-0 gap-6">
                                <TabsTrigger
                                    value="overdue"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 h-10 text-[13px] font-bold"
                                >
                                    OVERDUE ITEMS
                                </TabsTrigger>
                                <TabsTrigger
                                    value="open"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 h-10 text-[13px] font-bold"
                                >
                                    OPEN ITEMS
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="overdue" className="m-0 border-0">
                            <InvoiceTable data={overdueInvoices} type="overdue" />
                        </TabsContent>
                        <TabsContent value="open" className="m-0 border-0">
                            <InvoiceTable data={openInvoices} type="open" />
                        </TabsContent>
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
}
