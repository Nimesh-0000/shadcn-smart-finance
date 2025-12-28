import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, UserMinus, Clock, Loader2 } from "lucide-react";
import { api } from "@/services/api";
import type { Risk } from "@/types";

interface RiskItemProps {
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    icon: React.ReactNode;
}

function RiskItem({ title, description, severity, icon }: RiskItemProps) {
    const severityColors = {
        high: "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400",
        medium: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400",
        low: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
    };

    return (
        <div className={`p-3 rounded-lg border flex gap-3 transition-opacity hover:opacity-90 cursor-pointer ${severityColors[severity]}`}>
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="min-w-0">
                <h4 className="text-[13px] font-bold leading-none mb-1">{title}</h4>
                <p className="text-[11px] leading-tight opacity-90">{description}</p>
            </div>
        </div>
    );
}

export function RiskPanel() {
    const [risks, setRisks] = useState<Risk[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.dashboard.getRisks()
            .then(data => {
                setRisks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch risks:", err);
                setLoading(false);
            });
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'OVERDUE': return <AlertTriangle className="h-4 w-4" />;
            case 'UNASSIGNED': return <UserMinus className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    return (
        <Card className="shadow-sm border-[#dadce0] dark:border-border h-full bg-slate-50/30 dark:bg-slate-900/10">
            <CardHeader className="pb-2">
                <CardTitle className="text-[14px] font-medium text-muted-foreground uppercase tracking-tight flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Risk & Exceptions
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                ) : risks.length > 0 ? (
                    risks.map((risk) => (
                        <RiskItem
                            key={risk.id}
                            severity={risk.severity}
                            title={risk.title}
                            description={risk.description}
                            icon={getIcon(risk.type)}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground text-[12px]">
                        No critical exceptions detected.
                    </div>
                )}

                <div className="pt-2">
                    <button className="w-full py-2 text-[11px] font-bold uppercase tracking-widest text-primary hover:bg-muted/50 rounded transition-colors bg-white/50 dark:bg-black/20 border border-dashed border-primary/30">
                        View All Exceptions
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
