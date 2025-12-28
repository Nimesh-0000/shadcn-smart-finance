import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useTheme } from '@/hooks/useTheme';
import { FinanceCRMDashboard } from '@/components/crm/FinanceCRMDashboard';
import { Button } from '@/components/ui/button';
import { Download, FileText, Plus } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

export function Dashboard() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // High-contrast warm color combination (Oranges, Reds, Yellows)
    const gradientColors = isDark
        ? ['#ff8a65', '#ffd54f', '#ff5252', '#ffcc80', '#ff8a65'] // Vibrant warm for dark
        : ['#f4511e', '#fbc02d', '#e53935', '#fb8c00', '#f4511e']; // Deep warm for light

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* GCP Style Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
                        <h1 className="text-[18px] font-normal leading-tight text-[#202124] dark:text-foreground">
                            Hello{' '}
                            <GradientText colors={gradientColors} animationSpeed={12}>
                                Alex Morgan
                            </GradientText>
                        </h1>
                        <p className="text-[12px] text-[#5f6368] mt-1">Manage and monitor your project's financial resources and resource allocation.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-8 text-[13px] border-[#dadce0] rounded hover:bg-muted text-primary px-3">
                            <Download className="mr-2 h-4 w-4" />
                            Financial Report
                        </Button>
                        <Button variant="outline" className="h-8 text-[13px] border-[#dadce0] rounded hover:bg-muted text-primary px-3">
                            <FileText className="mr-2 h-4 w-4" />
                            Credit Review
                        </Button>
                        <Button
                            className="h-8 text-[13px] bg-primary dark:bg-blue-600 hover:bg-primary/90 rounded text-white px-3 border-none shadow-none"
                            onClick={() => {
                                setIsCreateDialogOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Invoice
                        </Button>
                    </div>
                </div>

                {/* Finance CRM Dashboard Content */}
                <FinanceCRMDashboard />
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Invoice</DialogTitle>
                        <DialogDescription>
                            Generate a new invoice for a customer.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {/* 
                            Placeholder for Invoice Form or reuse AddExpenseForm adaptation 
                            Keeping it simple as per requirements (mostly read-oriented dashboard)
                        */}
                        <div className="text-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
                            Invoice Generation Form Placeholder
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

export default Dashboard;
