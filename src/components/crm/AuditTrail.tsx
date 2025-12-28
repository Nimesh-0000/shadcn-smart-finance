import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, User, Clock, Loader2 } from "lucide-react";
import type { AuditLog } from "@/types";

// In a real scenario, we'd have api.audit.getLatest()
// For now we'll maintain the mock but structure it for live data

export function AuditTrail() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetch
        setTimeout(() => {
            setLogs([
                { id: 'l1', entityType: 'Invoice', entityId: 'inv_2', action: 'Owner reassigned from Sarah K. to Nimesh L.', timestamp: '2023-12-27T10:30:00Z', userId: 'admin_1' },
                { id: 'l2', entityType: 'Payment', entityId: 'pay_12', action: 'Payment of $4,500 recorded for Global Tech Corp', timestamp: '2023-12-26T15:45:00Z', userId: 'nimesh_l' },
                { id: 'l3', entityType: 'Invoice', entityId: 'inv_5', action: 'Status updated to Overdue', timestamp: '2023-12-25T09:00:00Z', userId: 'system' },
                { id: 'l4', entityType: 'Customer', entityId: 'c_2', action: 'Credit limit increased to $100k', timestamp: '2023-12-24T14:20:00Z', userId: 'sarah_k' },
            ]);
            setLoading(false);
        }, 500);
    }, []);

    return (
        <Card className="shadow-sm border-[#dadce0] dark:border-border h-full bg-slate-50/20 dark:bg-slate-900/5">
            <CardHeader className="pb-2 border-b border-[#f0f0f0] dark:border-border/50">
                <CardTitle className="text-[13px] font-medium text-muted-foreground uppercase tracking-tight flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Read-Only Audit Trail
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="divide-y divide-[#f0f0f0] dark:divide-border/50">
                        {logs.map((log) => (
                            <div key={log.id} className="p-3 hover:bg-muted/10 transition-colors">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                        {log.entityType}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-[12px] leading-tight mb-1 text-foreground/90 font-medium">
                                    {log.action}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {log.userId}
                                    </span>
                                    <span className="text-border">•</span>
                                    <span>ID: {log.entityId}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="p-3 border-t border-[#f0f0f0] dark:border-border/50 text-center">
                    <button className="text-[11px] text-primary font-bold uppercase hover:underline">
                        View Full System Logs
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
